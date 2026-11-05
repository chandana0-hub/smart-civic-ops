---
name: CivicFlow AI
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#4c546f'
  on-tertiary: '#ffffff'
  tertiary-container: '#656c89'
  on-tertiary-container: '#eeefff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#bec5e5'
  on-tertiary-fixed: '#131a33'
  on-tertiary-fixed-variant: '#3e4660'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
  telemetry-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system serves municipal command centers, civic directors, and autonomous public infrastructure agents. The aesthetic balances civic institutional trust with high-velocity agentic intelligence: calm, authoritative, deeply precise, and vigilant.

The visual style is **Corporate Modern with High-Density Precision**:
- **Structured Dual-Tone Architecture**: A permanent midnight-slate navigation rail grounding the workspace, contrasted against a clinical, razor-sharp light command deck.
- **Agentic Telemetry**: AI operations are differentiated using precise electric cyan conduits, pulsing micro-indicators, and mono-spaced execution threads rather than decorative gimmicks.
- **Mission-Critical Legibility**: Visual ergonomics prioritize zero-latency scanning under emergency condition stress, avoiding visual noise while maintaining clear information hierarchy.

## Colors

The palette enforces a clear separation between the command chrome, operational canvas, actionable state, and agent activity:

- **Chrome & Infrastructure Neutral**:
  - Rail & Global Nav Surface: Deep Navy `#0B132B` and Elevated Navy `#1C2541`. Text on dark surfaces utilizes `#F8FAFC` and muted `#94A3B8`.
  - Workspace Canvas: `#F8FAFC`.
  - Panel & Card Surface: `#FFFFFF`.
  - Structural Boundaries: `#E2E8F0` on light canvas, `#1E293B` on dark canvas.
- **Brand & Action**:
  - Primary Civic Blue (`#2563EB`): Authoritative primary actions, critical selection states, verified institutional operations.
  - Vivid Agentic Cyan (`#06B6D4` / `#0EA5E9`): Autonomous agent workflows, telemetry streaming, dynamic route recalculations, automated dispatches.
- **Operational Status & Triage**:
  - Amber (Pending / In Review): Surface `#FEF3C7`, Border `#FDE68A`, Text `#B45309`.
  - Emerald (Resolved / Operational): Surface `#ECFDF5`, Border `#A7F3D0`, Text `#047857`.
  - Rose (Critical Incident / Immediate Priority): Surface `#FFF1F2`, Border `#FECDD3`, Text `#BE123C`.

## Typography

The type system pairs **Plus Jakarta Sans** for executive headers and section landmarks with **Inter** for data grids, dense telemetry streams, and analytical tables. **JetBrains Mono** is reserved strictly for GPS geo-coordinates, agent transaction IDs, device MAC addresses, and timestamp streams.

Numerical representations within high-frequency municipal monitors must enforce tabular figures (`font-variant-numeric: tabular-nums`) to prevent layout shifts during live metrics streaming.

## Layout & Spacing

A 12-column fluid grid system paired with strict horizontal layout constraints anchors the user interface:

- **Desktop (>= 1280px)**: A permanent vertical navigation sidebar (pinned at 260px or collapsed at 72px) with an operational canvas stretching 100% of remaining width. Grid columns use `gutter-lg` (24px) and page margins of `margin-lg` (32px).
- **Tablet (768px - 1279px)**: The navigation collapses into an icon-only quick access rail. Gutters step down to `gutter` (16px), margins adjust to 24px. Grid structures contract into 6 columns.
- **Mobile (< 768px)**: Emergency mobile triage mode. Bottom sheet interaction replaces side inspectors. Single-column stacked cards with `margin` (16px) margins and `space-sm` (8px) module gaps.

All card interiors follow a compact 8pt base grid for rapid telemetry scans: `space-sm` (8px) for inner status rows, `space-md` (16px) for module padding, and `space-lg` (24px) for distinct functional zone separations.

## Elevation & Depth

Visual hierarchy leverages flat architectural discipline supported by calibrated atmospheric drop shadows:

- **Base Canvas (Level 0)**: Flat `#F8FAFC`. Zero elevation.
- **Interactive Card & Surface (Level 1)**: Solid `#FFFFFF`, structural border `1px solid #E2E8F0`, and ambient drop shadow `0 1px 3px 0 rgba(11, 19, 43, 0.04), 0 1px 2px -1px rgba(11, 19, 43, 0.02)`.
- **Floating Inspectors & Flyouts (Level 2)**: Solid `#FFFFFF`, border `1px solid #CBD5E1`, elevated shadow `0 10px 15px -3px rgba(11, 19, 43, 0.08), 0 4px 6px -4px rgba(11, 19, 43, 0.03)`.
- **Critical Modal & Triage Overlays (Level 3)**: Center stage on backdrop `#0B132B` at 45% alpha blur (`backdrop-filter: blur(4px)`). Shadow `0 20px 25px -5px rgba(11, 19, 43, 0.15), 0 8px 10px -6px rgba(11, 19, 43, 0.08)`.
- **Agent Active Glow**: When an AI agent performs live operations on a node, cards transition from structural gray border to a vibrant Cyan trace (`0 0 0 1px #06B6D4, 0 0 12px rgba(6, 182, 212, 0.15)`).

## Shapes

The system uses a compact corner philosophy (`Soft` / level 1) to convey architectural precision and maximize usable screen real estate:

- Standard structural panels, cards, data grids, and input containers maintain `4px` (`0.25rem`) corner rounding.
- Flyout modals, dropdown menus, and large surface overlays use `8px` (`0.5rem`).
- Micro status badges, pill tags, and dynamic incident markers utilize full pill rounds (`9999px`) to create an immediate shape distinction between functional layout containers and metadata labels.

## Components

### Buttons
- **Primary Civic**: Solid `#2563EB`, text `#FFFFFF`, border radius `4px`. Subtle hover state to `#1D4ED8`. Focus state displays an outer ring: `ring-2 ring-offset-2 ring-blue-600`.
- **Agent Action**: Solid gradient or accent fill `#0891B2` with `#06B6D4` highlight, text `#FFFFFF`. Applied exclusively to prompt executions, automated dispatch triggers, and agent simulation overrides.
- **Secondary / Ghost**: Background `#FFFFFF`, border `1px solid #E2E8F0`, text `#1E293B`. Hover transitions to `#F1F5F9`.

### Badges & Triage Chips
- Designed with compact height (22px), `9999px` border radius, micro typography (`label-sm`), and a 6px status circle indicator:
  - **Pending**: Background `#FEF3C7`, text `#B45309`, indicator solid `#F59E0B`.
  - **Resolved / Stable**: Background `#ECFDF5`, text `#047857`, indicator solid `#10B981`.
  - **Emergency Critical**: Background `#FFF1F2`, text `#BE123C`, indicator pulsing `#F43F5E`.
  - **Agent Automated**: Background `#E0F2FE`, text `#0369A1`, indicator `#0EA5E9`.

### Data-Dense Incident Cards
- Built with a `#FFFFFF` foundation, crisp `1px solid #E2E8F0` frame, and divided horizontal slots:
  - Header: Timestamp (`JetBrains Mono`), sector ID, and severity badge.
  - Body: Incident summary, autonomous agent reasoning excerpt in high-readability Inter, live field asset tags.
  - Action footer: Telemetry confidence score (`98.4% Autonomous Confidence`) with one-click human verification action.

### Input Fields & Controls
- Form inputs feature `#FFFFFF` fill, `#CBD5E1` border, 36px height, and `4px` radius.
- Active focus invokes a civic blue border (`#2563EB`) with a diffuse box-shadow (`0 0 0 3px rgba(37, 99, 235, 0.12)`).
- Checkboxes and radio buttons enforce crisp `#2563EB` selected fills with white check indicators.

### Agentic Activity Stream & Telemetry Rail
- Vertical event line running an ultra-thin 1.5px conduit in `#06B6D4` (active) or `#E2E8F0` (idle).
- Nodes contain micro log chips with machine timestamps, model generation tags, and operational dispatch triggers for transparent auditability.