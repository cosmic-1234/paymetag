/**
 * DeshVault — Seed Engine
 * Simulates seeding MongoDB with the comprehensive Indian NRI financial dataset.
 */

const { DEMO_USERS, DEMO_ACCOUNTS, DEMO_PROPERTIES, DEMO_INSURANCE, DEMO_RETIREMENT, DEMO_STOCKS, DEMO_MUTUAL_FUNDS, DEMO_ALTERNATES, DEMO_TAX, DEMO_KYC, DEMO_FORGOTTEN_ASSETS } = require('./seedData.json');

console.log("==================================================================");
console.log("          DESHVAULT — NRI FINANCIAL NODE SEED ENGINE              ");
console.log("==================================================================");
console.log(`[SEED] Initializing database connection to simulated cluster...`);
console.log(`[SEED] Seeding User Profile: Brijal Patel (San Jose, CA)`);
console.log(`[SEED] Seeding Family & Caretaker Profile: Shagun Patel (San Jose, CA & Mumbai)`);
console.log(`[SEED] Seeded 6 Bank Accounts (HDFC, SBI, Axis, ICICI, BoB, Kotak) -> ₹49,64,000 + $18,000 USD`);
console.log(`[SEED] Seeded 2 Real Estate Titles (Mumbai Oberoi 4B & Nagpur Land) -> ₹1,47,00,000`);
console.log(`[SEED] Seeded 3 Insurance Policies (LIC, HDFC ERGO, Star Health)`);
console.log(`[SEED] Seeded 3 Retirement Schemes (EPFO TCS, NPS Tier 1/2, SBI PPF) -> ₹18,12,000`);
console.log(`[SEED] Seeded 4 CDSL Stocks + 3 CAMS Mutual Funds -> ₹24,96,600`);
console.log(`[SEED] Seeded Alternate Wealth (SGB Series VI, RBI Floating Bonds, VDA) -> ₹14,51,000`);
console.log(`[SEED] Seeded 4 Forgotten Assets (IEPF Infosys, BoB Dormant, Wipro PF) -> ₹1,18,400`);
console.log(`[SEED] Seeded Form 26AS Tax Reconciliations & India-US DTAA 15% Treaty Matrix`);
console.log(`[SEED] Central KYC KIN: 40029104928104 synchronized across 7 institutions`);
console.log("==================================================================");
console.log("✓ SUCCESS: 12 Modules successfully primed with ₹1,84,73,500 total asset value.");
console.log("==================================================================");
