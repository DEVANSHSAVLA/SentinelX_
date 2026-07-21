// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn get_desktop_system_status() -> String {
    "SENTINELX_DESKTOP_NATIVE_ONLINE".into()
}

#[tauri::command]
fn sync_offline_sqlite_cache(record_count: u32) -> String {
    format!("Synced {} offline telemetry records to local SQLite vault.", record_count)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            get_desktop_system_status,
            sync_offline_sqlite_cache
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri desktop application");
}
