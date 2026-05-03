# Setmore Authentication Flow - Technical Implementation

## Overview

This project is a responsive, multi-step authentication interface built for the FULL Creative UI/UX Developer technical assessment. The application manages three distinct authentication states (Initial SSO, Email Login, and OTP Verification) within a single-page architecture.

## Architectural Decisions

### 1. Vanilla JavaScript State Machine

I deliberately avoided heavy frontend frameworks (like React or Angular) for this implementation. A simple authentication flow does not require the overhead of a Virtual DOM or a 100kb+ JavaScript bundle.

- **Routing:** Implemented a lightweight Vanilla JS state machine to handle DOM manipulation and view transitions without triggering page reloads.
- **UX Enhancements:** The OTP verification screen includes custom auto-advance logic, backspace handling, and paste-formatting to eliminate friction during the critical verification step. It also forces numeric keypads on mobile devices via `pattern="\d*"`.

### 2. Modular CSS Architecture

To ensure scalability and maintainability, the CSS is broken down into a strict modular architecture rather than a single monolithic stylesheet.

- `variables.css`: Centralized design tokens (colors, typography scales, spacing units) mapped directly from the Figma specifications.
- `base.css`: Standard browser resets and global typography rules.
- `layout.css`: Macro-level structural rules, positioning, and responsive media queries.
- `components.css`: Micro-level styling for individual UI elements (buttons, inputs, widgets) using a BEM-inspired naming convention to prevent styling collisions.

### 3. Responsive Web Design (RWD) Strategy

The layout is built on a single, fluid HTML DOM. I avoided the anti-pattern of duplicating HTML structures for different devices.

- **Desktop:** Utilizes an absolute-positioned floating widget layout with CSS Glassmorphism (`backdrop-filter`) for the app promo.
- **Mobile (Max-width: 768px):** Uses CSS media queries to dynamically morph the desktop container into a native-feeling bottom-sheet.
- **State-Driven Mobile Layouts:** When the user enters the form states (Email/OTP), JavaScript injects a global body class that triggers a CSS override, morphing the bottom-sheet into a full-screen mobile takeover view, optimizing vertical real estate and handling safe-area insets (`env(safe-area-inset-top)`).

## How to Run

No build steps or dependencies are required.

1. Unzip the directory.
2. Open `index.html` in any modern web browser.

---

_Developed by Harish MK_
