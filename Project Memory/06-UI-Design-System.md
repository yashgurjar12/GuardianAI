# 🎨 UI Design System

# GuardianAI – Modern Mobile Design System

> **Project:** GuardianAI  
> **Version:** 1.0  
> **Platform:** Android (React Native + Expo)  
> **Design Style:** Modern • Minimal • Light Theme • Material 3 Inspired

---

# 📖 Overview

The GuardianAI Design System provides a consistent visual language for the application.

The primary goal is to create an interface that is:

- Clean
- Premium
- Easy to use
- Accessible
- Emergency-focused
- Visually trustworthy

The design emphasizes **clarity over complexity**, ensuring users can quickly access important safety features during stressful situations.

---

# 🎯 Design Principles

## 1. Simplicity

Every screen should be easy to understand.

Avoid unnecessary buttons and information.

---

## 2. Safety First

Emergency actions must always receive the highest visual priority.

The SOS button should always be immediately noticeable.

---

## 3. Consistency

Use the same

- Colors
- Typography
- Buttons
- Icons
- Cards
- Spacing

throughout the application.

---

## 4. Accessibility

The interface should be usable by everyone.

- Large touch targets
- High contrast
- Readable typography

---

## 5. Mobile First

Design exclusively for smartphones.

---

# 🎨 Color System

## Primary Colors

| Token | Color | Usage |
|--------|--------|------|
| Primary | #2563EB | Buttons, Links |
| Primary Light | #DBEAFE | Background Highlights |
| Primary Dark | #1E40AF | Active States |

---

## Emergency Colors

| Token | Color |
|--------|--------|
| SOS | #EF4444 |
| SOS Dark | #DC2626 |
| Danger Background | #FEE2E2 |
| Danger Border | #FCA5A5 |

---

## Success Colors

| Token | Color |
|--------|--------|
| Success | #22C55E |
| Success Light | #DCFCE7 |

---

## Warning Colors

| Token | Color |
|--------|--------|
| Warning | #F59E0B |
| Warning Background | #FEF3C7 |

---

## Neutral Colors

| Token | Color |
|--------|--------|
| Background | #F8FAFC |
| Surface | #FFFFFF |
| Border | #E2E8F0 |
| Divider | #CBD5E1 |

---

## Text Colors

| Token | Color |
|--------|--------|
| Heading | #0F172A |
| Body | #334155 |
| Secondary | #64748B |
| Disabled | #94A3B8 |

---

## Emergency Screen Colors (Dark Theme)

| Token | Color | Usage |
|--------|--------|------|
| Emergency Bg | #0D0D0D | SOS, Emergency Active backgrounds |
| Emergency Card | #1A1A2E | Cards on dark screens |
| Emergency Text | #FFFFFF | Text on dark screens |

---

# 🖋 Typography

Font Family

```
Poppins (Google Fonts)
- Poppins_400Regular
- Poppins_500Medium
- Poppins_600SemiBold
- Poppins_700Bold
```

Fallback

```
System Font
```

---

## Heading

| Style | Size | Weight |
|---------|------|--------|
| H1 | 32 | 700 |
| H2 | 28 | 700 |
| H3 | 24 | 700 |
| H4 | 20 | 600 |
| H5 | 18 | 600 |

---

## Body

| Style | Size | Weight |
|---------|------|--------|
| Large | 18 | 400 |
| Medium | 16 | 400 |
| Small | 14 | 400 |
| Caption | 12 | 400 |

---

## Font Weight

| Weight | Usage |
|---------|------|
| 700 | Headings |
| 600 | Buttons, Labels |
| 500 | Labels |
| 400 | Body |

---

# 📏 Spacing System

Use an **8-point grid**.

| Token | Value |
|--------|------|
| XS | 4 |
| SM | 8 |
| MD | 16 |
| LG | 24 |
| XL | 32 |
| XXL | 48 |

Never use random spacing values.

---

# 📦 Border Radius

| Token | Radius |
|--------|---------| 
| Small | 8 |
| Medium | 12 |
| Large | 20 |
| Extra Large | 28 |
| Circle | 999 |

Cards should use:

```
20px
```

---

# ☁ Elevation (Shadows)

| Preset | Opacity | Radius | Elevation |
|--------|---------|--------|-----------|
| Small | 0.05 | 4 | 2 |
| Medium | 0.08 | 12 | 4 |
| Large | 0.12 | 20 | 8 |
| SOS | 0.40 (Red) | 24 | 12 |

Avoid heavy shadows.

---

# 🔘 Buttons

## Primary Button

Background

```
#2563EB (Blue)
```

Text

```
White
```

Radius

```
12px
```

Height

```
56px
```

---

## Secondary Button

White background

Blue border (1.5px)

---

## Danger Button

Used only for

- SOS
- Delete
- Emergency

Background

```
#EF4444 (Red)
```

---

# 🚨 SOS Button

The most important component.

Specifications

Size

```
120px diameter
```

Shape

```
Circle
```

Color

```
#EF4444 (Red)
```

Shadow

```
SOS shadow preset (red glow)
```

Animation

```
Pulsing scale (1.0 → 1.15)
Outer glow rings (opacity 0.3 → 0.6)
```

Text

```
"SOS" (32px, bold)
"Hold for Help" (11px, subtitle)
```

Should always appear on the Home Screen.

---

# 🧾 Cards

Cards should have

- White background (#FFFFFF)
- Rounded corners (20px)
- Soft shadow (medium preset)
- Internal padding (16px)

Variants:
- Default (no accent)
- Danger (left red border)
- Success (left green border)
- Warning (left yellow border)

---

# 🏷 Status Badge

Safe

🟢 Green (#22C55E bg: #DCFCE7)

Warning

🟡 Yellow (#F59E0B bg: #FEF3C7)

Alert

🔴 Red (#EF4444 bg: #FEE2E2)

Info

🔵 Blue (#2563EB bg: #DBEAFE)

---

# 📍 Home Screen Layout

```
Greeting + Notification Bell

↓

Safe Status Card + Risk Score

↓

Large SOS Button (pulsing)

↓

Quick Actions Grid (4 items)

↓

Today's Route Card

↓

AI Insight Preview

↓

Bottom Navigation
```

---

# 🤖 AI Twin Screen

Contains

- Profile Summary + Risk Ring
- LIVE AI Insights Feed
- Today's Journey Timeline
- Weekly Activity Bar Chart
- Behaviour Summary Grid (4 stats)

Cards should use rounded layouts.

---

# 🗺 Safe Route Screen

Layout

```
Search Bar

↓

Dark Map Placeholder

↓

Recommended Route Card (with safety score)

↓

Alternative Route Card

↓

Nearby Safe Places Grid (2-column)

↓

Start Navigation Button
```

---

# ⚠ Route Deviation Screen

Dark background for urgency.

Show

- Warning Circle (amber glow)
- Alert Title & Description
- Risk Level Bar (Low → Medium → High)
- Route Details Card
- Action Buttons (I'm Safe / Send SOS)

---

# 📜 History Screen

Card layout with filter chips (All, Trips, Alerts, Safe).

Grouped by date.

Each card shows

- Navigation icon
- Route name
- Time & Duration
- Status Badge
- Risk Score

---

# 👤 Profile Screen

Sections

- User Card (avatar, name, email, status)
- Trusted Contacts (with call buttons)
- Settings Menu Tiles
- Logout Button
- App Version

---

# ⚙ Settings Screen

Sections

- Emergency Contacts (add/view)
- Notifications (push, SMS, email, vibration toggles)
- Safety (auto-activate night, fake call, silent SOS)
- About App

---

# 🔍 Search Bar

Rounded

Height

```
52px
```

Leading Icon

Search (lucide)

Trailing Icon

MapPin (lucide)

---

# 📊 Progress Ring (Risk Score)

SVG-based circular progress.

Dynamic color:
- 0-30: Green
- 31-60: Yellow
- 61-100: Red

---

# 🎭 Icons

Use

**Lucide React Native**

Icon Size

| Type | Size |
|--------|------|
| Small | 18 |
| Medium | 24 |
| Large | 32 |

---

# ✨ Animations

Keep animations subtle.

Implemented:

- SOS Button: Pulse + Glow
- Splash: Fade + Spring scale
- Emergency Banner: Blink
- Countdown: Pulse rings

---

# 📱 Bottom Navigation

Four Tabs

```
🏠 Home
🗺 Safe Route
🤖 AI Twin
👤 Profile
```

Selected: #2563EB (Blue)

Unselected: #94A3B8 (Gray)

Tab bar: White, elevated, no top border

---

# 📥 Input Fields

Height

```
56px
```

Radius

```
12px
```

Border

```
#E2E8F0 (Gray, 1.5px)
```

Focus

```
#2563EB (Blue border + light blue bg)
```

---

# 🧩 Component Library

Implemented Components

- PrimaryButton
- SecondaryButton
- SOSButton
- Card (with variants)
- StatusBadge
- ProgressRing
- SearchBar
- SettingTile

---

# 📌 Conclusion

The GuardianAI Design System establishes a modern, accessible, and consistent visual identity for the application. By combining Material 3 principles, a clean light theme (with dark emergency screens), reusable UI components, and a safety-first approach, the interface delivers a professional user experience while remaining intuitive during emergency situations. This design system serves as the foundation for all future frontend development and ensures consistency as new features are added.