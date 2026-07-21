# SentinelX Desktop Application Setup & Build Guide (Tauri 2.0)

## Overview
SentinelX Desktop is a native cross-platform application supporting **Windows 11/10**, **macOS (Apple Silicon & Intel)**, and **Linux (Ubuntu/Debian)**. It is built using **Tauri 2.0** with a Rust backend and React 18 + Vite frontend.

---

## Prerequisites
1. **Node.js**: v20.x LTS or higher
2. **Rust & Cargo**: Stable toolchain (`rustc --version >= 1.75`)
3. **OS-Specific Build Tools**:
   - **Windows**: Visual Studio 2022 with C++ Build Tools & WiX Toolset.
   - **macOS**: Xcode Command Line Tools (`xcode-select --install`).
   - **Linux**: `libgtk-3-dev`, `libwebkit2gtk-4.0-dev`, `libayatana-appindicator3-dev`.

---

## Development Setup

```bash
# 1. Navigate to desktop app directory
cd apps/desktop

# 2. Install Node dependencies
npm install

# 3. Launch Tauri dev server with hot reload
npm run tauri dev
```

---

## Packaging Production Installers

```bash
# Compile native installers for current host platform
npm run tauri build
```

Generated installer artifacts:
- **Windows**: `apps/desktop/src-tauri/target/release/bundle/msi/SentinelX_Desktop_2.0.0_x64_en-US.msi`
- **macOS**: `apps/desktop/src-tauri/target/release/bundle/dmg/SentinelX_Desktop_2.0.0_aarch64.dmg`
- **Linux**: `apps/desktop/src-tauri/target/release/bundle/appimage/SentinelX_Desktop_2.0.0_amd64.AppImage`
