 
# 👥 Roles & Permissions

# GuardianAI Frontend Prototype

---

# 📌 Overview

Since this project is currently in the frontend prototype stage, roles define which screens and interface elements are visible to different users.

No backend authentication or authorization is implemented in this phase.

---

# 👤 User Roles

The application contains three primary roles.

1. Guest
2. Registered User
3. Administrator (Prototype)

---

# 👤 Guest

A guest user has not logged into the application.

### Accessible Screens

- Splash
- Login
- Sign Up
- About App

### Permissions

| Permission | Access |
|------------|--------|
| View Splash | ✅ |
| Login | ✅ |
| Register | ✅ |
| Home Dashboard | ❌ |
| AI Twin | ❌ |
| Safe Route | ❌ |
| SOS | ❌ |
| Profile | ❌ |

---

# 👩 Registered User

The primary application user.

### Accessible Screens

- Home
- AI Twin
- Safe Route
- History
- Profile
- Settings
- SOS

### Permissions

| Permission | Access |
|------------|--------|
| Dashboard | ✅ |
| Smart SOS | ✅ |
| AI Twin | ✅ |
| Safe Route | ✅ |
| History | ✅ |
| Edit Profile | ✅ |
| View Notifications | ✅ |
| Settings | ✅ |

---

# 🛡 Administrator

Prototype only.

Designed for future dashboard implementation.

### Accessible Modules

- Dashboard
- User List
- Reports
- Analytics

---

# Permission Matrix

| Feature | Guest | User | Admin |
|----------|:----:|:----:|:-----:|
| Login | ✅ | ❌ | ❌ |
| Register | ✅ | ❌ | ❌ |
| Home | ❌ | ✅ | ✅ |
| SOS Screen | ❌ | ✅ | ✅ |
| AI Twin | ❌ | ✅ | ✅ |
| Safe Route | ❌ | ✅ | ✅ |
| Route Alert | ❌ | ✅ | ✅ |
| History | ❌ | ✅ | ✅ |
| Profile | ❌ | ✅ | ✅ |
| Settings | ❌ | ✅ | ✅ |
| Dashboard | ❌ | ❌ | ✅ |

---

# 📱 Navigation by Role

## Guest

```text
Splash

↓

Login

↓

Register
```

---

## User

```text
Home

├── SOS

├── AI Twin

├── Safe Route

├── History

└── Profile
```

---

## Admin

```text
Dashboard

├── Analytics

├── Reports

├── Users

└── Settings
```

---

# 🎨 UI Visibility Rules

## Guest

Hide

- Bottom Navigation
- SOS Button
- AI Cards
- Profile

---

## User

Show

- Floating SOS Button
- Bottom Navigation
- AI Dashboard
- Safe Route Card
- History Card
- Profile

---

## Admin

Future Version

Dashboard includes

- Statistics Cards
- Graphs
- User Reports
- Heatmaps
- System Analytics

---

# 🔒 Frontend Access Rules

During UI development:

- Authentication is simulated.
- Roles are controlled using mock data.
- Navigation is role-based.
- No API validation is required.

---

# 📌 Mock User

```json
{
  "name": "Sarah Johnson",
  "role": "user",
  "status": "Safe",
  "riskScore": 12
}
```

---

# 📖 Conclusion

The role-based UI structure ensures that each type of user experiences a clean, focused interface. During the prototype phase, permissions are represented through conditional screen visibility, making the application ready for future backend authentication and authorization.