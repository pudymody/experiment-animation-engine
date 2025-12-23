mod runtime;

const SCENE: &str = "scene.demo.js";

fn main() -> Result<(), String> {
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
