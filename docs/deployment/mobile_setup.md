# SentinelX Mobile Application Setup & Build Guide (Flutter)

## Overview
SentinelX Mobile is a cross-platform mobile client supporting **Android** and **iOS** devices. Built with **Flutter**, it provides real-time citizen safety alerts, biometric unlock, camera counterfeit scanning, and Section 65B evidence package inspection.

---

## Prerequisites
1. **Flutter SDK**: v3.19.x or higher (`flutter doctor`)
2. **Android Studio**: Android SDK & NDK for Android APK/AAB build.
3. **Xcode**: Xcode 15+ for iOS IPA compilation (requires macOS host).

---

## Development & Local Execution

```bash
# 1. Navigate to mobile app directory
cd apps/mobile

# 2. Fetch Flutter dependencies
flutter pub get

# 3. Launch app on connected emulator or physical device
flutter run
```

---

## Production App Builds

```bash
# Build Android APK
flutter build apk --release

# Build Android App Bundle (Google Play Store)
flutter build appbundle --release

# Build iOS IPA (Apple App Store)
flutter build ipa --release
```
