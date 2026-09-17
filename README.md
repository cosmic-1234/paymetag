# DeshVault — NRI Financial Command Center

**DeshVault** is an institutional-grade, single-source-of-truth wealth, compliance, and asset management command center for Non-Resident Indians (NRIs) residing in the United States, UAE, Canada, and Singapore.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Three.js**, it brings together all 12 fragmented Indian financial modules into a unified command dashboard.

---

## 🏛️ Key Capabilities & The 12 Modules

1. **All Bank Accounts (`/dashboard/accounts`)**:
   - Live synchronization across NRE, NRO, FCNR(B) and Fixed Deposits (HDFC, SBI, Axis, ICICI, BoB, Kotak).
   - Real-time FEMA Section 6 alerts (e.g. resident account dormancy and redesignation to NRO).
   - Interactive CERSAI Remote Video Re-KYC workflow to resolve SBI account freeze.

2. **Real Estate & Land Vault (`/dashboard/property`)**:
   - Geocoded portfolio tracking: Mumbai Oberoi Woods Flat 4B (₹1.12 Cr) & Nagpur Agricultural Land (₹35L).
   - Maharashtra State Land Revenue extract inspection (7/12 Satbara Utara, Index-II, Sale Deed).
   - Revenue mutation dispute alerts with empanelled local advocate consultation hooks.

3. **Demat & Mutual Funds (`/dashboard/investments`)**:
   - CDSL Demat holdings (Reliance, Infosys, HDFC Bank, Tata Motors) with live P&L and PINS tags.
   - CAMS / KFintech mutual fund portfolio with active SIP schedules and XIRR (+14.3%).

4. **Gold, Bonds & Declared Crypto (`/dashboard/alternates`)**:
   - Sovereign Gold Bonds (SGB 2020-21 Series VI) with 2.5% semi-annual interest credits.
   - RBI Floating Rate Savings Bonds (FRSB 2020) @ 8.05%.
   - MMTC-PAMP 24K vaulted bullion.
   - Declared Virtual Digital Assets (0.08 BTC + 1.2 ETH) declared under Indian Schedule VDA and US FATCA Form 8938.

5. **Retirement Savings (`/dashboard/retirement`)**:
   - Dormant TCS EPFO UAN tracking with Form 19 non-resident withdrawal pipeline.
   - National Pension System (NPS) PRAN tier balances and age-60 corpus projection.
   - SBI 15-Year Public Provident Fund (PPF) maturity tracking (March 2031).

6. **Insurance Portfolio & Nominee Audit (`/dashboard/insurance`)**:
   - Total Indian life cover (₹25L) & family floater health cover (₹10L).
   - LIC Jeevan Anand premium payment workflow via NRE BillPay.
   - Nominee integrity audit identifying missing contingent nominees.

7. **Income Tax & DTAA Compliance (`/dashboard/tax`)**:
   - AY 2025-26 ITR-2 processed refund status (₹18,400).
   - Form 26AS / AIS live matching.
   - India-USA DTAA Article 10/11 treaty optimization (15% dividend TDS vs 30% domestic).
   - Automated US FinCEN Form 114 (FBAR) data generation for accounts exceeding $10,000 threshold.

8. **Central KYC (CKYC) Registry Matrix (`/dashboard/kyc`)**:
   - 14-digit CKYC KIN (`40029104928104`) smart card with holographic 3D tilt.
   - Cross-institutional status matrix across 7 entities.
   - Simulated 3-step biometric Video Re-KYC workflow.

9. **Will & Succession Registry (`/dashboard/will`)**:
   - Intestate exposure alert for ₹1.84 Cr of Indian assets.
   - Registered General Power of Attorney ledger (Ramesh Mehta, Father in Mumbai).
   - Directory of verified NRI succession advocates.

10. **Forgotten Assets Recovery Engine (`/dashboard/forgotten`)**:
    - Traced ₹1,18,400 in unclaimed capital (IEPF Infosys dividends, BoB dormant savings, Wipro PF).
    - PAN deep-scan engine across MCA IEPF and RBI UDGAM.
    - 1-click IEPF Form 5 restitution workflow.

11. **India Inflow & LRS Repatriation (`/dashboard/income`)**:
    - Monthly recurring inflow breakdown (Rental ₹30k/mo + FD Interest ₹12k/mo + Dividends).
    - Outward remittance ledger with Form 15CA & 15CB CA certification.
    - Interactive FEMA LRS remittance net calculator.

12. **Family Trust Graph Switcher**:
    - Dynamic perspective toggle in the top bar between **Shrirang Mehta (Primary NRI, US)**, **Priya Mehta (Spouse)**, and **Ramesh Mehta (Father / Local POA Caretaker in Mumbai)**.

---

## 🎨 Visual System & 3D WebGL Aesthetics

- **Three.js WebGL Global Asset Globe**: Displays real-time capital flow arcs connecting foreign NRI hubs (San Jose, Dubai, London, Singapore) to Indian financial centers (Mumbai, Bengaluru, Delhi).
- **Holographic 3D Card Tilt**: Physics-based mouse tilt with specular light refraction on CKYC cards and wealth certificates.
- **Atmospheric Dust Canvas**: Subtle floating ambient particles without any childish or cartoonish elements.
- **Fintech Typography**: Inter + JetBrains Mono tabular figures + Classic Editorial display accents.

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Seed Engine
```bash
npm run seed
```

### 3. Launch Command Center
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
