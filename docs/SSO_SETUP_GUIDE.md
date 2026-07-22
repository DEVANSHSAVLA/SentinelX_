# SentinelX Enterprise SSO Setup Guide
## Complete Production Step-by-Step Configuration for Google, Microsoft, and Apple Authentication

This document provides exact instructions to configure production OAuth 2.0 and OpenID Connect credentials for **Google Cloud Console**, **Microsoft Entra ID (Azure AD)**, and **Apple Developer Portal**.

---

### 1. 🔵 Google Identity Setup (Google Cloud Console)

1. **Access Google Console**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/) and sign in with your administrator account.
2. **Create New Project**:
   - Click the project dropdown at the top bar -> **New Project**.
   - Project Name: `SentinelX-Public-Safety` -> Click **Create**.
3. **Configure OAuth Consent Screen**:
   - Navigate to **APIs & Services** -> **OAuth consent screen**.
   - User Type: Select **External** (or **Internal** if restricted to your organization).
   - App Name: `SentinelX National Security Platform`.
   - User Support Email: `admin@sentinelx.gov.in`.
   - Developer Contact Information: `devops@sentinelx.gov.in`.
   - Scopes: Add `.../auth/userinfo.email`, `.../auth/userinfo.profile`, `openid`.
4. **Create OAuth 2.0 Client ID**:
   - Navigate to **APIs & Services** -> **Credentials**.
   - Click **Create Credentials** -> **OAuth client ID**.
   - Application Type: **Web application**.
   - Name: `SentinelX-Web-and-Mobile-Client`.
5. **Authorized Origins & Redirect URIs**:
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (Web App)
     - `http://localhost:5173` (Desktop App)
     - `http://localhost:8082` (Mobile Web App)
     - `https://your-production-domain.gov.in`
   - **Authorized redirect URIs**:
     - `http://localhost:8030/api/v1/auth/google/callback`
6. **Save Credentials**:
   - Copy **Client ID** and **Client Secret**.
   - Add to `.env` file:
     ```env
     VITE_GOOGLE_CLIENT_ID="10823749811-sentinelx-google-auth.apps.googleusercontent.com"
     GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
     ```

---

### 2. 🔴 Microsoft Entra ID Setup (Azure Portal)

1. **Access Azure Portal**:
   - Go to [Azure Portal](https://portal.azure.com/) -> Search for **Microsoft Entra ID** (formerly Azure Active Directory).
2. **Register Application**:
   - Click **App registrations** in the left sidebar -> **New registration**.
   - Name: `SentinelX-Enterprise-SSO`.
   - Supported account types: Select **Accounts in any organizational directory and personal Microsoft accounts**.
3. **Configure Redirect URI**:
   - Platform: Select **Web**.
   - Redirect URI: `http://localhost:8030/api/v1/auth/microsoft/callback`.
   - Click **Register**.
4. **Create Client Secret**:
   - In your newly registered app menu, click **Certificates & secrets** -> **New client secret**.
   - Description: `SentinelX Production Gateway Key`.
   - Expires: Select 24 months -> Click **Add**.
   - Copy Secret **Value** immediately.
5. **Configure API Permissions**:
   - Click **API permissions** -> **Add a permission** -> **Microsoft Graph**.
   - Select **Delegated permissions** -> Check `User.Read` and `openid`.
   - Click **Grant admin consent**.
6. **Save Credentials**:
   - Add to `.env` file:
     ```env
     VITE_MICROSOFT_CLIENT_ID="your-azure-application-client-id"
     MICROSOFT_TENANT_ID="common"
     MICROSOFT_CLIENT_SECRET="your-azure-client-secret-value"
     ```

---

### 3. 🍏 Sign in with Apple Setup (Apple Developer Portal)

1. **Access Apple Developer Console**:
   - Go to [Apple Developer Portal](https://developer.apple.com/account/) (Requires paid Apple Developer Program Membership).
2. **Register App ID**:
   - Navigate to **Certificates, Identifiers & Profiles** -> **Identifiers** -> Click **+**.
   - Select **App IDs** -> App -> Name: `SentinelX Mobile` -> Bundle ID: `com.sentinelx.app`.
   - Under Capabilities, check **Sign in with Apple** -> Click **Save**.
3. **Register Services ID (For Web & Android)**:
   - Go to **Identifiers** -> Select **Services IDs** from top-right dropdown -> Click **+**.
   - Description: `SentinelX Auth Service`.
   - Identifier: `com.sentinelx.authservice`.
   - Check **Sign in with Apple** -> Click **Configure**.
   - Primary App ID: Select `com.sentinelx.app`.
   - Domains and Subdomains: `sentinelx.gov.in`, `localhost`.
   - Return URLs: `http://localhost:8030/api/v1/auth/apple/callback`.
4. **Generate Apple Auth Private Key (.p8)**:
   - Navigate to **Keys** -> Click **+**.
   - Key Name: `SentinelX Apple Auth Key`.
   - Check **Sign in with Apple** -> Configure -> Select `com.sentinelx.app` -> Click **Continue** -> **Register**.
   - Download `.p8` key file. Note your **Key ID** and **Team ID**.
5. **Save Credentials**:
   - Add to `.env` file:
     ```env
     VITE_APPLE_CLIENT_ID="com.sentinelx.authservice"
     APPLE_TEAM_ID="YOUR_10_DIGIT_TEAM_ID"
     APPLE_KEY_ID="YOUR_10_DIGIT_KEY_ID"
     APPLE_PRIVATE_KEY_PATH="./keys/AuthKey_YOURKEYID.p8"
     ```

---

### 🔐 Environment Variables Checklist (.env)

```env
# Google Identity OAuth 2.0
VITE_GOOGLE_CLIENT_ID=10823749811-sentinelx-google-auth.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Microsoft Entra ID OAuth 2.0
VITE_MICROSOFT_CLIENT_ID=your_microsoft_client_id
MICROSOFT_TENANT_ID=common
MICROSOFT_CLIENT_SECRET=your_microsoft_client_secret

# Apple Developer OAuth 2.0
VITE_APPLE_CLIENT_ID=com.sentinelx.authservice
APPLE_TEAM_ID=your_apple_team_id
APPLE_KEY_ID=your_apple_key_id
```
