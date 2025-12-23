pub mod glue_renderer;
use rquickjs::CatchResultExt;

fn print(s: String) {
    println!("{s}");
}

const BRIDGE_JS: &str = r#"import scene from "scene";
globalThis.__scene = new scene();
globalThis.__update = function(t){
    globalThis.__scene.update(t);
};

globalThis.__renderer = new GlueRenderer("white", "black")
globalThis.__draw = function(){
    globalThis.__scene.draw(globalThis.__renderer);
};"#;

fn caught_error_to_string(err: rquickjs::CaughtError) -> std::string::String {
    match err {
        rquickjs::CaughtError::Error(e) => e.to_string(),
        rquickjs::CaughtError::Exception(e) => e.to_string(),
        rquickjs::CaughtError::Value(e) => e
            .into_string()
            .ok_or(String::from("???"))
            .map(|x| x.to_string().map_err(|err| err.to_string()))
            .flatten()
            .unwrap_or(String::from("???")),
    }
}

pub struct Runtime {
    ctx: rquickjs::Context,
    current_time: f64,
    end_time: f64,
    fps: f64,
}

impl Runtime {
    pub fn from_file(path: &str) -> std::result::Result<Self, String> {
        let file: Vec<u8> = std::fs::read(path).map_err(|err| err.to_string())?;
        return Self::new(file);
    }

    pub fn new(scene: Vec<u8>) -> std::result::Result<Self, String> {
        let rt = rquickjs::Runtime::new().map_err(|err| err.to_string())?;

        let resolver = (
            rquickjs::loader::BuiltinResolver::default()
                .with_module("scene")
                .with_module("engine"),
            rquickjs::loader::FileResolver::default().with_path("./"),
        );
        let loader = (
            rquickjs::loader::BuiltinLoader::default()
                .with_module("scene", scene)
                .with_module("engine", include_bytes!("engine.js")),
            rquickjs::loader::ModuleLoader::default(),
            rquickjs::loader::ScriptLoader::default(),
        );
        rt.set_loader(resolver, loader);

        let ctx = rquickjs::Context::custom::<(
            rquickjs::context::intrinsic::BigInt,
            rquickjs::context::intrinsic::Date,
            rquickjs::context::intrinsic::Eval,
            rquickjs::context::intrinsic::Json,
            rquickjs::context::intrinsic::MapSet,
            rquickjs::context::intrinsic::Promise,
            rquickjs::context::intrinsic::Proxy,
            rquickjs::context::intrinsic::RegExp,
            rquickjs::context::intrinsic::RegExpCompiler,
            rquickjs::context::intrinsic::TypedArrays,
            rquickjs::context::intrinsic::WeakRef,
        )>(&rt)
        .map_err(|err| err.to_string())?;

        ctx.with(|ctx| -> Result<(), String> {
            let globals = ctx.globals();
            globals
                .set(
                    "__print",
                    rquickjs::Function::new(ctx.clone(), print)
                        .catch(&ctx)
                        .map_err(caught_error_to_string)?
                        .with_name("__print")
                        .catch(&ctx)
                        .map_err(caught_error_to_string)?,
                )
                .catch(&ctx)
                .map_err(caught_error_to_string)?;

            return Ok(());
        })?;

        ctx.with(|ctx| -> Result<(), String> {
            rquickjs::Class::<glue_renderer::GlueRenderer>::define(&ctx.globals())
                .catch(&ctx)
                .map_err(caught_error_to_string)?;
            return Ok(());
        })?;

        ctx.with(|ctx| -> Result<(), String> {
            rquickjs::Module::evaluate(ctx.clone(), "main", BRIDGE_JS)
                .catch(&ctx)
                .map_err(caught_error_to_string)?
                .finish::<()>()
                .catch(&ctx)
                .map_err(caught_error_to_string)?;
            return Ok(());
        })?;

        let mut end_time: f64 = 0.0;
        ctx.with(|ctx| -> Result<(), String> {
            let globals = ctx.globals();
            let scene: rquickjs::Object = globals
                .get("__scene")
                .catch(&ctx)
                .map_err(caught_error_to_string)?;
            end_time = scene
                .get("endTime")
                .catch(&ctx)
                .map_err(caught_error_to_string)?;
            return Ok(());
        })?;

        return Ok(Self {
            ctx: ctx,
            current_time: 0.0,
            end_time: end_time,
            fps: 0.0,
        });
    }

    pub fn set_fps(&mut self, fps: f64) {
        self.fps = fps;
    }

    pub fn current_time(&self) -> f64 {
        return self.current_time;
    }

    pub fn end_time(&self) -> f64 {
        return self.end_time;
    }

    fn process_frame(&self) -> Result<std::vec::Vec<glue_renderer::Action>, String> {
        return self.ctx.with(
            |ctx| -> Result<std::vec::Vec<glue_renderer::Action>, String> {
                let globals = ctx.globals();
                let update: rquickjs::Function = globals
                    .get("__update")
                    .catch(&ctx)
                    .map_err(caught_error_to_string)?;
                update
                    .call::<(f64,), ()>((self.current_time,))
                    .catch(&ctx)
                    .map_err(caught_error_to_string)?;

                let draw_fn: rquickjs::Function = globals
                    .get("__draw")
                    .catch(&ctx)
                    .map_err(caught_error_to_string)?;

                draw_fn
                    .call::<(), ()>(())
                    .catch(&ctx)
                    .map_err(caught_error_to_string)?;

                let glue_renderer: rquickjs::Class<glue_renderer::GlueRenderer> = globals
                    .get("__renderer")
                    .catch(&ctx)
                    .map_err(caught_error_to_string)?;

                let mut actions = glue_renderer
                    .try_borrow_mut()
                    .catch(&ctx)
                    .map_err(caught_error_to_string)?;

                return Ok(actions.take());
            },
        );
    }

    pub fn seek_to(&mut self, to: f64) -> Result<std::vec::Vec<glue_renderer::Action>, String> {
        self.current_time = to.clamp(0.0, self.end_time);
        return self.process_frame();
    }

    pub fn seek_by(&mut self, by: f64) -> Result<std::vec::Vec<glue_renderer::Action>, String> {
        self.current_time = (self.current_time + by).clamp(0.0, self.end_time);
        return self.process_frame();
    }

    pub fn advance(&mut self) -> Result<std::vec::Vec<glue_renderer::Action>, String> {
        self.current_time = (self.current_time + 1000.0 / self.fps).clamp(0.0, self.end_time);
        return self.process_frame();
    }

    pub fn frames(&mut self) -> Option<Result<std::vec::Vec<glue_renderer::Action>, String>> {
        if self.has_finished() {
            return None;
        }

        return Some(self.advance());
    }

    pub fn has_finished(&self) -> bool {
        return self.current_time >= self.end_time;
    }
}
