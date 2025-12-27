mod renderer;
mod runtime;

const SCENE: &str = "scene.demo.js";

fn main() -> Result<(), String> {
    let mut executor = runtime::Runtime::from_file(SCENE).map_err(|x| x.to_string())?;
    executor.set_fps(60.0);

    let mut renderer = renderer::raylib::Raylib::new();
    return renderer.render(&mut executor).map_err(|x| x.to_string());
}

fn example_abstract() -> Result<(), String> {
    let mut executor = runtime::Runtime::from_file(SCENE)?;
    executor.set_fps(60.0);

    while let Some(frame) = executor.frames() {
        match frame {
            Err(e) => return Err(e),
            Ok(actions) => {
                println!("{:?}", actions);
                println!("{:?} / {:?}", executor.current_time(), executor.end_time());
            }
        }
    }

    Ok(())
}
