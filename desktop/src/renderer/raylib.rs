use millisecond::prelude::*;
use raylib::core::drawing::{RaylibDraw, RaylibTextureModeExt};
use raylib::core::texture::{RaylibRenderTexture2D, RaylibTexture2D};

pub struct Raylib {
    raylib_handle: raylib::prelude::RaylibHandle,
    raylib_thread: raylib::prelude::RaylibThread,

    playing: bool,
    end_time: u64,
    end_time_formatted: String,

    render_texture: Option<raylib::core::texture::RenderTexture2D>,
}

impl Raylib {
    pub fn new() -> Self {
        let (rl, thread) = raylib::init()
            .resizable()
            .vsync()
            .log_level(raylib::consts::TraceLogLevel::LOG_NONE)
            .title("Hello, World")
            .build();

        return Self {
            raylib_handle: rl,
            raylib_thread: thread,
            playing: true,
            end_time: 0,
            end_time_formatted: "0".to_string(),
            render_texture: None,
        };
    }

    fn create_render_texture(
        &mut self,
        width: u32,
        height: u32,
    ) -> Result<(), raylib::core::error::Error> {
        let target = self
            .raylib_handle
            .load_render_texture(&self.raylib_thread, width, height)?;
        target.set_texture_filter(
            &self.raylib_thread,
            raylib::consts::TextureFilter::TEXTURE_FILTER_BILINEAR,
        );

        self.render_texture = Some(target);
        return Ok(());
    }

    fn update_title(&self, runtime: &crate::runtime::Runtime) {
        let current_time = runtime.current_time() as u64;
        let current_time_formatted =
            core::time::Duration::from_millis(current_time).pretty_with(MillisecondOption {
                format: millisecond::pretty::OutputFormat::Colon,
                seconds: SecondsOptions::CombineWith {
                    precision: Some(2),
                    fixed_width: true,
                },
                ..Default::default()
            });

        let window_title = format!(
            "{} - {} / {}",
            if self.playing { "Playing" } else { "Paused" },
            current_time_formatted,
            self.end_time_formatted
        );
        self.raylib_handle
            .set_window_title(&self.raylib_thread, &window_title);
    }

    fn handle_inputs(&mut self, runtime: &mut crate::runtime::Runtime) -> Result<bool, String> {
        if let Some(key) = self.raylib_handle.get_key_pressed() {
            match key {
                raylib::consts::KeyboardKey::KEY_Q => {
                    return Ok(false);
                }
                raylib::consts::KeyboardKey::KEY_R => {
                    runtime.seek_to(0.0).map(|_| true)?;
                }
                raylib::consts::KeyboardKey::KEY_RIGHT => {
                    runtime.seek_by(500.0).map(|_| true)?;
                }
                raylib::consts::KeyboardKey::KEY_LEFT => {
                    runtime.seek_by(-500.0).map(|_| true)?;
                }
                raylib::consts::KeyboardKey::KEY_SPACE => {
                    self.playing = !self.playing;
                }

                _ => {}
            }
        }

        return Ok(true);
    }

    fn draw_frame(&mut self, actions: &std::vec::Vec<crate::runtime::glue_renderer::Action>) {
        if self.render_texture.is_none() {
            return;
        }

        let screen_width: f32 = self.raylib_handle.get_screen_width() as f32;
        let screen_height: f32 = self.raylib_handle.get_screen_height() as f32;
        let mut target = self.render_texture.as_mut().unwrap();
        let scene_width = target.width() as f32;
        let scene_height = target.height() as f32;

        let scale: f32 =
            (screen_width / scene_width as f32).min(screen_height / scene_height as f32);

        let mut d = self.raylib_handle.begin_drawing(&self.raylib_thread);

        d.clear_background(raylib::prelude::Color::BLACK);

        d.draw_texture_mode(&self.raylib_thread, &mut target, |mut draw_handle| {
            draw_handle.clear_background(raylib::prelude::Color::WHITE);

            let mut fill_style: raylib::core::color::Color = raylib::core::color::Color::WHITE;
            let mut stroke_style: raylib::core::color::Color = raylib::core::color::Color::BLACK;
            let mut line_width: f64 = 1.0;

            let mut subpath: std::vec::Vec<(i32, i32, i32, i32)> = std::vec::Vec::new();
            let mut origin: (i32, i32) = (0, 0);

            for action in actions {
                match action {
                    crate::runtime::glue_renderer::Action::FillStyle(r, g, b, a) => {
                        fill_style = raylib::core::color::Color::new(*r, *g, *b, *a);
                    }
                    crate::runtime::glue_renderer::Action::StrokeStyle(r, g, b, a) => {
                        stroke_style = raylib::core::color::Color::new(*r, *g, *b, *a);
                    }
                    crate::runtime::glue_renderer::Action::LineWidth(width) => {
                        line_width = *width;
                    }
                    crate::runtime::glue_renderer::Action::FillRect {
                        x,
                        y,
                        width,
                        height,
                    } => {
                        draw_handle.draw_rectangle(
                            *x as i32,
                            *y as i32,
                            *width as i32,
                            *height as i32,
                            fill_style,
                        );
                    }
                    crate::runtime::glue_renderer::Action::BeginPath => {
                        subpath.clear();
                    }
                    crate::runtime::glue_renderer::Action::Fill => {
                        // FIX: This doesnt handle shapes correctly, it doesnt even allow holes
                        let points: Vec<delaunator::Point> = subpath
                            .iter()
                            .map(|x| {
                                [
                                    delaunator::Point {
                                        x: x.0 as f64,
                                        y: x.1 as f64,
                                    },
                                    delaunator::Point {
                                        x: x.2 as f64,
                                        y: x.3 as f64,
                                    },
                                ]
                            })
                            .flatten()
                            .collect();

                        let result = delaunator::triangulate(&points);
                        for chunk in result
                            .triangles
                            .iter()
                            .map(|i| {
                                raylib::core::math::Vector2::new(
                                    points[*i].x as f32,
                                    points[*i].y as f32,
                                )
                            })
                            .collect::<std::vec::Vec<raylib::core::math::Vector2>>()
                            .as_slice()
                            .chunks(3)
                        {
                            draw_handle.draw_triangle(chunk[0], chunk[1], chunk[2], fill_style);
                        }
                    }
                    crate::runtime::glue_renderer::Action::Stroke => {
                        for line in &subpath {
                            draw_handle.draw_line_ex(
                                raylib::core::math::Vector2::new(line.0 as f32, line.1 as f32),
                                raylib::core::math::Vector2::new(line.2 as f32, line.3 as f32),
                                line_width as f32,
                                stroke_style,
                            );
                        }
                    }
                    crate::runtime::glue_renderer::Action::ClosePath => {
                        if subpath.len() > 1 {
                            let start = subpath[0];
                            let end = subpath
                                .last()
                                .expect("len returned greather than zero, but not last item");
                            subpath.push((end.2, end.3, start.0, start.1));
                        }
                    }
                    crate::runtime::glue_renderer::Action::MoveTo(x, y) => {
                        origin = (*x as i32, *y as i32);
                    }
                    crate::runtime::glue_renderer::Action::LineTo(x, y) => {
                        subpath.push((origin.0, origin.1, *x as i32, *y as i32));
                        origin = (*x as i32, *y as i32);
                    }
                    crate::runtime::glue_renderer::Action::Arc {
                        x,
                        y,
                        radius,
                        start_angle,
                        end_angle,
                        counterclockwise,
                    } => {
                        draw_handle.draw_circle_sector_lines(
                            raylib::core::math::Vector2::new(*x as f32, *y as f32),
                            *radius as f32,
                            (*start_angle * 180.0 / std::f64::consts::PI) as f32,
                            (*end_angle * 180.0 / std::f64::consts::PI) as f32,
                            0,
                            stroke_style,
                        );
                    }
                }
            }
        });

        d.draw_texture_pro(
            target.texture(),
            raylib::core::math::Rectangle::new(0.0, 0.0, scene_width, -scene_height),
            raylib::core::math::Rectangle::new(
                (screen_width - (scene_width * scale)) * 0.5,
                (screen_height - (scene_height * scale)) * 0.5,
                scene_width * scale,
                scene_height * scale,
            ),
            raylib::core::math::Vector2::new(0.0, 0.0),
            0.0,
            raylib::prelude::Color::WHITE,
        )
    }

    pub fn render(&mut self, runtime: &mut crate::runtime::Runtime) -> Result<(), String> {
        self.raylib_handle.set_target_fps(runtime.get_fps() as u32);

        self.end_time = runtime.end_time() as u64;
        self.end_time_formatted =
            core::time::Duration::from_millis(self.end_time).pretty_with(MillisecondOption {
                format: millisecond::pretty::OutputFormat::Colon,
                seconds: SecondsOptions::CombineWith {
                    precision: Some(2),
                    fixed_width: true,
                },
                ..Default::default()
            });

        let _ = self
            .create_render_texture(runtime.width() as u32, runtime.height() as u32)
            .map_err(|x| x.to_string())?;

        while !self.raylib_handle.window_should_close() {
            if !self.handle_inputs(runtime)? {
                break;
            }

            let mut dt = self.raylib_handle.get_frame_time() * 1000.0;
            if runtime.has_finished() {
                self.playing = false;
            }

            if !self.playing {
                dt = 0.0;
            }

            let actions = runtime.seek_by(dt as f64)?;

            self.update_title(runtime);

            self.draw_frame(&actions);
        }

        return Ok(());
    }
}
