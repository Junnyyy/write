use tauri::{App, TitleBarStyle, WebviewUrl, WebviewWindowBuilder};

pub fn create_main_window(app: &mut App) -> tauri::Result<()> {
    let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
        .title("")
        .inner_size(1100.0, 700.0);

    #[cfg(target_os = "macos")]
    let win_builder = win_builder.title_bar_style(TitleBarStyle::Transparent);

    let window = win_builder.build().unwrap();

    #[cfg(target_os = "macos")]
    {
        use cocoa::appkit::{NSColor, NSWindow};
        use cocoa::base::{id, nil};

        let ns_window = window.ns_window().unwrap() as id;
        unsafe {
            let bg_color = NSColor::colorWithRed_green_blue_alpha_(nil, 1.0, 1.0, 1.0, 1.0);
            ns_window.setBackgroundColor_(bg_color);
        }
    }

    Ok(())
}
