#[derive(rquickjs::class::Trace, rquickjs::JsLifetime)]
#[rquickjs::class]
pub(super) struct GlueRenderer<'js> {
    fill_style: rquickjs::String<'js>,
    stroke_style: rquickjs::String<'js>,
    line_width: f64,

    pub actions: std::vec::Vec<Action>,
}

#[derive(Debug, Clone, rquickjs::class::Trace)]
pub enum Action {
    FillStyle(String),
    StrokeStyle(String),
    LineWidth(f64),
    FillRect {
        x: f64,
        y: f64,
        width: f64,
        height: f64,
    },
    BeginPath,
    Fill,
    Stroke,
    ClosePath,
    MoveTo(f64, f64),
    LineTo(f64, f64),
    Arc {
        x: f64,
        y: f64,
        radius: f64,
        start_angle: f64,
        end_angle: f64,
        counterclockwise: bool,
    },
}

#[rquickjs::methods]
impl<'js> GlueRenderer<'js> {
    #[qjs(constructor)]
    pub fn new(fill_style: rquickjs::String<'js>, stroke_style: rquickjs::String<'js>) -> Self {
        return Self {
            fill_style: fill_style,
            stroke_style: stroke_style,
            line_width: 0.0,
            actions: std::vec::Vec::new(),
        };
    }
    #[qjs(skip)]
    pub fn take(&mut self) -> std::vec::Vec<Action> {
        let current_frame = self.actions.clone();
        self.actions.clear();
        return current_frame;
    }

    #[qjs(get, rename = "fillStyle")]
    pub fn get_fill_style(&mut self) -> rquickjs::String<'js> {
        return self.fill_style.clone();
    }

    #[qjs(set, rename = "fillStyle")]
    pub fn set_fill_style(&mut self, val: rquickjs::String<'js>) {
        self.fill_style = val;
        self.actions.push(Action::FillStyle(
            self.fill_style
                .to_string()
                .expect("Could not convert js string for fillStyle into rust string"),
        ))
    }

    #[qjs(get, rename = "strokeStyle")]
    pub fn get_stroke_style(&mut self) -> rquickjs::String<'js> {
        return self.stroke_style.clone();
    }

    #[qjs(set, rename = "strokeStyle")]
    pub fn set_stroke_style(&mut self, val: rquickjs::String<'js>) {
        self.stroke_style = val;
        self.actions.push(Action::StrokeStyle(
            self.stroke_style
                .to_string()
                .expect("Could not convert js string for fillStyle into rust string"),
        ))
    }

    #[qjs(get, rename = "lineWidth")]
    pub fn get_line_width(&mut self) -> f64 {
        return self.line_width;
    }

    #[qjs(set, rename = "lineWidth")]
    pub fn set_line_width(&mut self, val: f64) {
        self.line_width = val;
        self.actions.push(Action::LineWidth(self.line_width));
    }

    #[qjs(rename = "fillRect")]
    pub fn fill_rect(&mut self, x: f64, y: f64, width: f64, height: f64) {
        self.actions.push(Action::FillRect {
            x: x,
            y: y,
            width: width,
            height: height,
        });
    }

    #[qjs(rename = "beginPath")]
    pub fn begin_path(&mut self) {
        self.actions.push(Action::BeginPath);
    }

    #[qjs(rename = "fill")]
    pub fn fill(&mut self) {
        self.actions.push(Action::Fill);
    }

    #[qjs(rename = "stroke")]
    pub fn stroke(&mut self) {
        self.actions.push(Action::Stroke);
    }

    #[qjs(rename = "closePath")]
    pub fn close_path(&mut self) {
        self.actions.push(Action::ClosePath);
    }

    #[qjs(rename = "moveTo")]
    pub fn move_to(&mut self, x: f64, y: f64) {
        self.actions.push(Action::MoveTo(x, y));
    }

    #[qjs(rename = "lineTo")]
    pub fn line_to(&mut self, x: f64, y: f64) {
        self.actions.push(Action::LineTo(x, y));
    }

    #[qjs(rename = "arc")]
    pub fn arc(
        &mut self,
        x: f64,
        y: f64,
        radius: f64,
        start_angle: f64,
        end_angle: f64,
        counterclockwise: rquickjs::function::Opt<bool>,
    ) {
        let counterclockwise_val = counterclockwise.into_inner().unwrap_or(false);
        self.actions.push(Action::Arc {
            x: x,
            y: y,
            radius: radius,
            start_angle: start_angle,
            end_angle: end_angle,
            counterclockwise: counterclockwise_val,
        });
    }
}
