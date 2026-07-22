# 📱 Google Cloud Console OAuth 2.0 Setup Guide for Expo Mobile & LAN

Google Cloud Console strictly requires all Authorized JavaScript Origins to end with a **public top-level domain** (such as `.com` or `.io`) and rejects raw IP addresses like `http://10.177.200.94:3000`.

To bypass this restriction for local Wi-Fi testing, use **`nip.io`** (a free public DNS wildcard domain that maps any IP address to a valid `.io` domain).

---

## 🛠️ Exact Google Cloud Console Inputs

### 🌐 1. Authorized JavaScript Origins
Paste these exact URLs under **Authorized JavaScript origins**:

```text
http://localhost:3000
http://localhost:5173
http://localhost:8082
http://127.0.0.1:3000
http://127.0.0.1:5173
http://127.0.0.1:8082
http://10-177-200-94.nip.io:3000
http://10-177-200-94.nip.io:5173
http://10-177-200-94.nip.io:8082
```

---

### 🔁 2. Authorized Redirect URIs
Paste these exact URLs under **Authorized redirect URIs**:

```text
http://localhost:3000
http://localhost:5173
http://localhost:8082
http://127.0.0.1:3000
http://127.0.0.1:5173
http://127.0.0.1:8082
http://10-177-200-94.nip.io:3000
http://10-177-200-94.nip.io:5173
http://10-177-200-94.nip.io:8082
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

## 💡 How `nip.io` Works:
`10-177-200-94.nip.io` automatically resolves to your local Wi-Fi IP address `10.177.200.94` while ending in `.io`, satisfying Google Cloud Console's domain validation requirement with **zero errors**.
