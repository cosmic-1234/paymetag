# iNRI (app.goinri.com) — UI & UX Architecture Specification

**Target Platform:** [app.goinri.com](https://app.goinri.com/) / [goinri.com](https://goinri.com/)  
**Company:** Techbloom India Pvt. Ltd. / Techbloom, Inc. (YC Backed • AMFI Reg. 273414 • US SEC RIA)  
**Primary Audience:** Non-Resident Indians (NRIs), OCIs, and Global Indian Expats (US, UK, UAE, Canada, Singapore)  
**Document Type:** Comprehensive UI/UX Design System, Component Anatomy & Interaction Breakdown  

---

## 1. Executive Summary & Brand Positioning

iNRI positions itself as a **"financial super-app and investment ecosystem for global Indian expats"**. Unlike standard domestic Indian wealth apps (Zerodha, Groww) or traditional bank portals (HDFC, SBI NetBanking), iNRI's UI/UX specifically caters to the cross-border cognitive load of NRIs.

### Core Value Pillars Reflected in the UI:
1. **Zero-Friction Cross-Border Onboarding:** Clean KYC, PAN, and NRE/NRO banking integration.
2. **Dual-Residency Tax & Investment Compliance:** Clear visual delineation between Indian domestic rules and foreign tax reporting (US IRS FBAR / FATCA / PFIC, UK HMRC, UAE).
3. **Hybrid Model (Digital Super-App + Human Marketplace):** Seamless transition between self-serve digital investment tools and bookable human Chartered Accountants / advocates.
4. **AI-Native Guidance (Reva):** Persistent AI agent companion embedded in the primary navigation for 24/7 regulatory and portfolio inquiries.

---

## 2. Visual Identity & Design System

### 2.1 Color Palette & Design Tokens

iNRI uses a curated **Royal Purple / Amethyst** primary palette paired with warm off-whites, neutral slate typography, and vibrant status accents.

| Token / Usage | Hex / Value | Visual Impression & Context |
|---|---|---|
| **Theme / Brand Primary** | `#7743a5` | Main brand identity color, featured in meta-theme and key iconography. |
| **Primary Accent Purple** | `#7B45E0` | Active navigation states, primary buttons, highlighted icons. |
| **Deep Royal Purple** | `#3C0E66` | Contrast accents, dark rotating geometry, institutional anchors. |
| **Soft Lavender Tint** | `#B193CB` | Secondary accents, multi-tone spinner gradients. |
| **Active Highlight Background** | `#F2EFFF` | Rounded pill background for active navigation icons on desktop & mobile. |
| **Light Canvas Background** | `#F7F7F7` / `bg-neutral50` | Primary app canvas background, reducing eye strain vs stark white. |
| **Glassmorphic Surface** | `linear-gradient(145deg, rgba(255,255,255,0.8), rgba(245,245,245,0.6))` | Sidebar, mobile topbar, and floating bottom navigation bar backdrop. |
| **Border Tokens** | `#ECE8F6`, `#E8E6EA`, `rgba(0,0,0,0.06)` | Ultra-delicate hairline borders preventing visual clashing. |
| **Text Primary** | `#1A1A1A` / `#434343` | Charcoal black for high contrast readable financial figures. |
| **Text Secondary / Inactive** | `#A0A0A0`, `text-gray-400` | Inactive tab labels, secondary metadata, helper text. |
| **Success / Online Ping** | `#22C55E` (Green) | Reva AI online pulse indicator (`shadow-[0_0_5px_rgba(34,197,94,0.5)]`). |
| **CTA Hover Gradient** | `from-purple-700 via-purple-600 to-blue-600` | Gradient text and button glow effects. |

### 2.2 Dark Mode & Theme Hydration
- **Theme Storage:** Checked via client script on initial render from `localStorage.getItem('theme')`.
- **System Fallback:** Supports automatic `window.matchMedia('(prefers-color-scheme: dark)')` fallback.
- **Classes:** Applies `.light-theme` or `.dark-theme` directly to `document.documentElement` and `document.body` with CSS variables:
  - `--color-bg-primary`
  - `--color-bg-tertiary`
  - `--color-text-primary`
  - `--color-primary-purple`
  - `--color-highlight`
  - `--color-border-primary`
  - `--color-bg-button` / `--color-text-button`

---

## 3. Typography Hierarchy

iNRI pairs a modern sans-serif workhorse with a luxury serif display face:

1. **Primary Interface Font — `Inter` (Google Fonts):**
   - Weights: `300` (Light), `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
   - Usage: Financial tables, buttons, metrics, navigation labels, inputs, and form controls.
2. **Editorial & Luxury Header Font — `Playfair Display` (Google Fonts):**
   - Weights: `500`, `600`, `700`.
   - Usage: Marketing hero headings, high-net-worth portfolio milestone banners, and investment tier designations, giving the platform a private-wealth banking feel.

---

## 4. Layout Architecture & Viewport Adaptations

### 4.1 Desktop Layout (`>= 768px`)

```
+---------------------------------------------------------------------------------------+
| [iNRI + YC]   |  [ Search / Ask Reva...                      ]  [ USD/INR ] [ Login ] |
|---------------|-----------------------------------------------------------------------|
|  (H) Home     |                                                                       |
|  ---          |  HERO / STATS OVERVIEW                                                |
|  ($) Invest   |  +---------------------+ +--------------------+ +-------------------+ |
|  ---          |  | Indian Net Worth    | | Mutual Funds (SIP) | | Tax Compliance    | |
|  (Doc) Tax    |  | ₹ 1.42 Cr           | | ₹ 48.5 L           | | AY 2025-26 Filed  | |
|  ---          |  +---------------------+ +--------------------+ +-------------------+ |
|  (Mkt) Store  |                                                                       |
|  ---          |  ACTIVE SERVICES & DISCOVERY                                          |
|  (Reva AI)    |  - Mutual Funds (Regular with advisory)                               |
|               |  - GIFT City Offshore Funds                                           |
|  [ Login ]    |  - Cross-Border Tax Filing (US-India / UK-India)                      |
|               |  - NRE/NRO Bank Account Setup & Repatriation (15CA/CB)                |
+---------------------------------------------------------------------------------------+
```

1. **Collapsible Glassmorphic Left Sidebar (`#app-sidebar`):**
   - **Widths:** Progressive responsive width: `md:w-[68px]`, `lg:w-[76px]`, `xl:w-[84px]`.
   - **Visual Styling:** Frosted glass effect (`backdrop-blur-md`, subtle inset highlights `inset 2px 2px 2px rgba(255,255,255,0.7)`, outer drop shadow `10px 0 30px rgba(0,0,0,0.08)`).
   - **Glow Accents:** Embedded ambient `.glow-point` and `.glow-point-accent` pseudo-elements.
   - **Top Lockup:** iNRI brand logo + Y Combinator badge (`logo_with_YC.webp`).
   - **Quick Command Trigger:** Optional search pill `"Search or ask..."` with purple magnifying glass.
   - **Vertical Navigation Stack:**
     - **Home:** House icon (`text-[var(--color-primary-purple)]` when active, wrapped in soft purple pill `#F2EFFF`).
     - **Investments:** Currency shield / coin icon (`M12 6v12...`).
     - **Taxation:** Document with verified checklist icon.
     - **Marketplace:** Service storefront icon.
     - **Reva AI Assistant:** Floating robot assistant avatar with live pulse animation.
   - **Hover States:** Smooth tooltip card sliding out to the right (`group-hover:opacity-100`, `z-50`, rounded border).
   - **Bottom Utility:** Login/Logout button with arrow exit icon.

2. **Main Content Canvas (`#main-content-wrapper`):**
   - Fluid offset using CSS variable `md:ml-[var(--sidebar-w)]` and `md:w-[calc(100%-var(--sidebar-w))]`.
   - Smooth transition animations (`transition-all duration-300 ease-in-out`).

---

### 4.2 Mobile & Tablet Layout (`< 768px`)

```
+----------------------------------------------------+
| [iNRI + YC Logo]                  [ Login ]  [ = ] |
+----------------------------------------------------+
|                                                    |
|  MAIN SCROLLABLE FEED                              |
|  - Asset Overview                                  |
|  - Quick Tax Alerts                                |
|  - Investment Recommendations                      |
|                                                    |
+----------------------------------------------------+
|   (H)        ($)         (( Reva ))      (Doc)     |
|  Home     Investments    Ask Reva         Tax      |
+----------------------------------------------------+
```

1. **Sticky Top Bar (`header.sticky`):**
   - Frosted glass finish with `backdrop-blur-md` and `linear-gradient(145deg, rgba(255,255,255,0.8), rgba(245,245,245,0.6))`.
   - Brand logo on left (120px).
   - Quick action CTA button on right ("Login" with underline hover and pill styling) + mobile hamburger drawer toggle.

2. **Floating Bottom Navigation Bar:**
   - Positioned fixed at bottom (`fixed bottom-0 left-0 right-0 z-50 md:hidden`).
   - **Geometry:** Top rounded corners (`rounded-t-2xl`), frosted white backdrop (`bg-white/80`, `backdrop-blur-md`, border-top `#ECE8F6`).
   - **5 Primary Touch Targets:**
     1. **Home:** Active state gets `#F2EFFF` rounded-xl box, `#7B45E0` icon, and bold purple label.
     2. **Investment:** Coin outline icon with `#A0A0A0` inactive tint.
     3. **Ask Reva (Center Hero Item):** Elevated 40px circular container with `robot-assistant.png` avatar, giving it immediate thumb reachability.
     4. **Taxation:** Document outline icon.
     5. **Marketplace:** Storefront outline icon.

---

## 5. Subsystem & Module Breakdown

### 5.1 Home / Command Center (`/`)
- **Consolidated Net Worth Card:** Real-time valuation of assets in India with one-touch currency toggle (₹ INR / $ USD / AED / GBP).
- **KYC & Bank Status Indicator:** Status of linked NRE/NRO accounts, CKYC KIN registration, and PAN-Aadhaar linking.
- **Actionable Notification Feed:** Flags upcoming Indian tax deadlines (Advance Tax, ITR-2), pending bank re-KYC, and SIP auto-debits.

### 5.2 Investments (`/investments`)
- **Mutual Fund Folios:** Regular mutual fund distribution with AMFI compliance (Reg. No. 273414). Curated portfolios for US/Canada NRIs (factoring in FATCA & PFIC restrictions).
- **GIFT City Alternative Funds:** Dollar-denominated investments through Gujarat International Finance Tec-City (GIFT City) with zero Indian capital gains tax.
- **Portfolio Management Services (PMS):** High-ticket equity advisory for HNIs with Indian portfolio tracking.
- **SIP Engine:** Automated rupee-cost averaging via linked NRE/NRO auto-debits.

### 5.3 Taxation & Cross-Border Compliance (`/taxation`)
- **Dual-Country Tax Returns:** Coordination between Indian Income Tax (ITR-2/ITR-3) and foreign tax authorities (US IRS Form 1040, Schedule B, FBAR Form 114, Form 8938, PFIC Form 8621).
- **Lower TDS Certificates (Form 13):** Streamlined digital application to reduce property sale TDS from standard 20%-30% down to actual capital gains liability (often 3%-5%).
- **Repatriation Services (Form 15CA & 15CB):** CA-certified capital transfers under the $1 Million USD annual FEMA remittance window.

### 5.4 Services Marketplace (`/marketplace`)
- **Vetted NRI Professional Network:** Curated directory of Chartered Accountants, Property Lawyers, and Concierge agents.
- **Statutory Document Services:**
  - NRI PAN Card application and correction.
  - OCI (Overseas Citizen of India) application & renewal.
  - Indian Passport renewal and police verification guidance.
  - NRE/NRO bank account opening assistance with major commercial banks.

### 5.5 Reva AI Assistant (`/ask-reva` / Embedded Drawer)
- **Visual Presentation:** Friendly, modern AI persona represented by an animated avatar with an emerald-green live status beacon.
- **Domain Specialization:** Trained specifically on:
  - RBI Master Directions & FEMA rules.
  - DTAA (Double Tax Avoidance Agreement) articles between India and USA/UK/UAE/Canada.
  - Mutual fund PFIC implications for US green card holders and citizens.
  - Repatriation mechanics and bank documentation.

---

## 6. Micro-Interactions & Animation Details

1. **3D Tilt & Perspective Lift on Interactive Buttons:**
   - Buttons utilize Tailwind classes: `hover:scale-105 hover:translate-y-[-4px] hover:shadow-md active:scale-[0.99] perspective-1000 transition-all duration-300`.
   - Gives a tangible, tactile feel to critical financial actions.
2. **Rotating Triangle Loading Screen:**
   - Custom SVG preloader featuring 3 interlocking rotating triangles in brand colors:
     - Triangle 1: Primary purple `#7743a5`
     - Triangle 2: Light lavender `#b193cb`
     - Triangle 3: Deep plum `#3c0e66`
   - Smooth 360-degree rotation animation (`1s infinite linear`).
3. **Glassmorphic Glow Points:**
   - Sidebar contains ambient decorative elements (`.glow-point`, `.glow-point-accent`) creating subtle light refractions along borders.
4. **Pulsing Status Dots:**
   - Reva AI and alert badges feature dual rings: an inner solid green dot and an outer `animate-ping` opacity ring (`bg-purple-400/20` and `bg-green-500`).

---

## 7. Comparative Analysis: iNRI vs. DeshBoard

| Dimension | **iNRI (`app.goinri.com`)** | **DeshBoard (`deshvault`)** |
|---|---|---|
| **Primary Color Theme** | Royal Amethyst & Purple (`#7743a5`, `#7B45E0`) | Sovereign Institutional Navy & Cobalt (`#0D2266`, `#3451D1`) |
| **Typography** | `Inter` + `Playfair Display` (Luxury serif display) | `Inter` + `JetBrains Mono` (High-density fintech tabular ledger) |
| **Operational Model** | Certified Mutual Fund Distributor (AMFI) + Marketplace | Read-Only Sovereign Command Center (RBI Account Aggregator) |
| **Hero 3D Feature** | Glassmorphic glow cards & animated AI persona (Reva) | Interactive Three.js WebGL Global Asset Corridor Globe |
| **Liabilities & Loans** | Focus on investments, taxes, and service marketplace | Dedicated NRI Home Loan, EMI schedules & Sec 24(b) deduction engine |
| **Multi-Tenancy** | Individual NRI account login | Family Trust Graph Switcher (Primary NRI $\leftrightarrow$ Caretaker) |
| **Statutory Generator** | Form 13 Lower TDS & Form 15CA/CB documentation | 1-Click US IRS FBAR (FinCEN 114) CSV generator & CKYC 3D smart card |

---

## 8. Key Takeaways & Recommendations for DeshBoard

1. **Adopt iNRI's Micro-Interaction Warmth:** While DeshBoard's institutional navy is authoritative and secure, adopting iNRI-style tactile button lift (`perspective-1000`, `hover:translate-y-[-2px]`) makes financial workflows feel more responsive.
2. **Mobile Floating Navigation Excellence:** iNRI’s 5-tab rounded glassmorphic bottom bar with the center-elevated AI agent is an ergonomic pattern for one-handed mobile NRI usage.
3. **Marketplace Integration Opportunity:** Integrating a vetted NRI CA / legal concierge directory into DeshBoard's existing **Will & Succession** and **Forgotten Assets** modules bridges automated discovery with professional execution.
4. **Typography Pairing:** Introducing an editorial serif accent (such as *Playfair Display* or *Newsreader*) for high-level net worth banners can further elevate DeshBoard's private-wealth atmosphere.
