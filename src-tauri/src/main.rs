// Prevents additional console window on Windows in release builds
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

#[tauri::command]
fn launch_game(path: String) -> Result<String, String> {
    #[cfg(target_os = "windows")]
    {
        Command::new("cmd")
            .args(["/C", "start", "", &path])
            .spawn()
            .map_err(|e| format!("Erreur lors du lancement: {}", e))?;
    }
    
    #[cfg(not(target_os = "windows"))]
    {
        Command::new(&path)
            .spawn()
            .map_err(|e| format!("Erreur lors du lancement: {}", e))?;
    }
    
    Ok("Jeu lancé avec succès".to_string())
}

#[tauri::command]
fn launch_game_command(command: String) -> Result<String, String> {
    #[cfg(target_os = "windows")]
    {
        Command::new("cmd")
            .args(["/C", &command])
            .spawn()
            .map_err(|e| format!("Erreur lors du lancement: {}", e))?;
    }
    
    #[cfg(not(target_os = "windows"))]
    {
        Command::new("sh")
            .args(["-c", &command])
            .spawn()
            .map_err(|e| format!("Erreur lors du lancement: {}", e))?;
    }
    
    Ok("Jeu lancé avec succès".to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![launch_game, launch_game_command])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

