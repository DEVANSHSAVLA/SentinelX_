# 📱 Google Cloud Console OAuth 2.0 Setup Guide for Expo Mobile & LAN

To ensure Google OAuth 2.0 works seamlessly across **Web**, **Desktop**, **Mobile Web (Wi-Fi)**, and **Expo Go Native App**, add the following exact URLs and Native Schemes to your Google Cloud Console.

---

## 🛠️ Google Cloud Console Setup Steps:

1. Open [Google Cloud Console Credentials Page](https://console.cloud.google.com/apis/credentials).
2. Select your project containing Client ID: `90338982833-i1sg24l3hoh1tl2ot2f659ufj9d06uek.apps.googleusercontent.com`.
3. Click on your **OAuth 2.0 Client ID** to edit settings.

---

## 🌐 1. Authorized JavaScript Origins
Add these exact origin URLs under **Authorized JavaScript origins**:

```text
http://localhost:3000
http://localhost:5173
http://localhost:8082
http://10.177.200.94:3000
http://10.177.200.94:5173
http://10.177.200.94:8082
```

---

## 🔁 2. Authorized Redirect URIs
Add these exact callback URLs under **Authorized redirect URIs**:

```text
http://localhost:3000
http://localhost:3000/
http://localhost:5173
http://localhost:5173/
http://localhost:8082
http://localhost:8082/
http://10.177.200.94:3000
http://10.177.200.94:3000/
http://10.177.200.94:5173
http://10.177.200.94:5173/
http://10.177.200.94:8082
http://10.177.200.94:8082/
```

---

## 📱 3. Expo Go Native App Schemes & Deep Links
For physical Mobile devices running **Expo Go App**:

### A. Expo AuthSession Redirect URI (Android & iOS Expo Go)
```text
https://auth.expo.io/@anonymous/sentinelx-mobile
exp://10.177.200.94:8082
exp://10.177.200.94:8082/--/oauthredirect
```

### B. Custom Native Scheme for Standalone Android/iOS App
If building a standalone APK/IPA via Expo EA:
- **Android Package Name**: `com.sentinelx.mobile`
- **iOS Bundle Identifier**: `com.sentinelx.mobile`
- **Custom Scheme**: `sentinelx://oauth`

---

## 🚀 Quick Summary Matrix

| Platform / Device | Target URL / URI | Google Console Entry |
| :--- | :--- | :--- |
| **Command Centre Web** | `http://localhost:3000` | JavaScript Origin & Redirect URI |
| **Desktop App** | `http://localhost:5173` | JavaScript Origin & Redirect URI |
| **Mobile Web (LAN Wi-Fi)** | `http://10.177.200.94:8082` | JavaScript Origin & Redirect URI |
| **Expo Go Native App** | `exp://10.177.200.94:8082` | AuthSession Redirect URI |
