export interface UserProfile {
  id: string;
  name: string;
  role: "primary_nri" | "spouse" | "resident_parent";
  email: string;
  location: string;
  pan: string;
  aadhaarMasked: string;
  ckycNumber: string;
  taxResidency: string;
  relation?: string;
  isPOA?: boolean;
  fatherName?: string;
  dob?: string;
  indianAddress?: string;
  subRegistrarOffice?: string;
}

export const DEMO_USERS: Record<string, UserProfile> = {
  brijal: {
    id: "usr_brijal",
    name: "Brijal Patel",
    role: "primary_nri",
    email: "brijal.patel@siliconvalley.io",
    location: "San Jose, California, USA",
    pan: "ABCPM1234D",
    aadhaarMasked: "XXXX-XXXX-4521",
    ckycNumber: "40029104928104",
    taxResidency: "NRI (RNOR Period Expired Mar 2023)",
    fatherName: "Rameshchandra Patel",
    dob: "18 Oct 1984",
    indianAddress: "Flat 4B, Oberoi Woods, Mohan Gokhale Rd, Goregaon East, Mumbai 400063, Maharashtra",
    subRegistrarOffice: "Bandra Sub-Registrar Office, Mumbai",
  },
  shagun: {
    id: "usr_shagun",
    name: "Shagun Patel",
    role: "spouse",
    email: "shagun.patel@california.org",
    location: "San Jose, California, USA",
    pan: "BCQPM5678E",
    aadhaarMasked: "XXXX-XXXX-8912",
    ckycNumber: "40029104928199",
    taxResidency: "NRI (RNOR Expired)",
    relation: "Family Member (Co-Investor & POA)",
    isPOA: true,
  },
};

export interface BankAccount {
  id: string;
  bankName: string;
  accountType: "NRE Savings" | "NRO Savings" | "FCNR (B) Deposit" | "Fixed Deposit" | "Resident Savings";
  accountNumberMasked: string;
  balanceINR: number;
  balanceForeign?: { amount: number; currency: string };
  interestRate: string;
  status: "active" | "kyc_expired" | "dormant";
  maturityDate?: string;
  nominee: string;
  branch: string;
  alerts?: string;
}

export const DEMO_ACCOUNTS: BankAccount[] = [
  {
    id: "acc_hdfc_nre",
    bankName: "HDFC Bank",
    accountType: "NRE Savings",
    accountNumberMasked: "50100294821034",
    balanceINR: 1240000,
    interestRate: "3.50% p.a.",
    status: "active",
    nominee: "Shagun Patel (100%)",
    branch: "Nariman Point, Mumbai",
  },
  {
    id: "acc_sbi_nro",
    bankName: "State Bank of India",
    accountType: "NRO Savings",
    accountNumberMasked: "20194820194812",
    balanceINR: 320000,
    interestRate: "2.75% p.a.",
    status: "kyc_expired",
    nominee: "Shagun Patel (Family)",
    branch: "Fort Branch, Mumbai",
    alerts: "Periodic KYC overdue since Nov 2024. Account restricted for outward debits.",
  },
  {
    id: "acc_axis_fd",
    bankName: "Axis Bank",
    accountType: "Fixed Deposit",
    accountNumberMasked: "91802004810293",
    balanceINR: 2500000,
    interestRate: "7.10% p.a. (Cumulative)",
    status: "active",
    maturityDate: "18 Jan 2027",
    nominee: "Shagun Patel",
    branch: "BKC, Mumbai",
  },
  {
    id: "acc_icici_fcnr",
    bankName: "ICICI Bank",
    accountType: "FCNR (B) Deposit",
    accountNumberMasked: "000401928301",
    balanceINR: 1500300,
    balanceForeign: { amount: 18000, currency: "USD" },
    interestRate: "5.25% USD Yield (Tax Free)",
    status: "active",
    maturityDate: "10 Oct 2026",
    nominee: "Shagun Patel",
    branch: "Overseas Branch, Mumbai",
  },
  {
    id: "acc_bob_savings",
    bankName: "Bank of Baroda",
    accountType: "Resident Savings",
    accountNumberMasked: "01820100029381",
    balanceINR: 44000,
    interestRate: "2.75% p.a.",
    status: "dormant",
    nominee: "None Registered",
    branch: "Alkapuri, Vadodara",
    alerts: "FEMA Violation Alert: Old resident account un-redesignated after NRI transition.",
  },
  {
    id: "acc_kotak_nre",
    bankName: "Kotak Mahindra Bank",
    accountType: "NRE Savings",
    accountNumberMasked: "748291039401",
    balanceINR: 860000,
    interestRate: "4.00% p.a.",
    status: "active",
    nominee: "Shagun Patel",
    branch: "Khar West, Mumbai",
  },
];

export interface PropertyItem {
  id: string;
  title: string;
  type: "Residential Apartment" | "Agricultural Land" | "Commercial Unit";
  location: string;
  city: string;
  state: string;
  coordinates: [number, number]; // lat, lng
  area: string;
  purchaseYear: number;
  purchasePrice: number;
  currentValuation: number;
  encumbranceStatus: "clear" | "disputed";
  coOwners: string[];
  rentalStatus?: { tenantName: string; monthlyRent: number; leaseExpiry: string };
  documents: { name: string; status: "verified" | "pending" | "disputed"; type: string }[];
  alertMessage?: string;
}

export const DEMO_PROPERTIES: PropertyItem[] = [
  {
    id: "prop_mumbai_oberoi",
    title: "Flat 4B, Oberoi Realty Woods",
    type: "Residential Apartment",
    location: "A-Wing, Oberoi Woods, Mohan Gokhale Rd, Goregaon East",
    city: "Mumbai",
    state: "Maharashtra",
    coordinates: [19.1688, 72.8647],
    area: "950 sq.ft (RERA Carpet)",
    purchaseYear: 2018,
    purchasePrice: 7800000,
    currentValuation: 11200000,
    encumbranceStatus: "clear",
    coOwners: ["Brijal Patel (50%)", "Shagun Patel (50%)"],
    rentalStatus: {
      tenantName: "Infosys Senior Executive",
      monthlyRent: 30000,
      leaseExpiry: "31 Aug 2026",
    },
    documents: [
      { name: "Registered Sale Deed (Bandra Sub-Registrar)", status: "verified", type: "PDF" },
      { name: "Index-II Title Verification Extract", status: "verified", type: "PDF" },
      { name: "Society NOC & Share Certificate #42", status: "verified", type: "PDF" },
      { name: "BMC Property Tax 2024-25 Receipt", status: "verified", type: "PDF" },
    ],
  },
  {
    id: "prop_nagpur_land",
    title: "Ancestral Agricultural Parcel",
    type: "Agricultural Land",
    location: "Gat No. 142/2, Katol Road, Kalmeshwar Taluka",
    city: "Nagpur",
    state: "Maharashtra",
    coordinates: [21.2335, 78.9168],
    area: "2.40 Acres",
    purchaseYear: 1988,
    purchasePrice: 420000,
    currentValuation: 3500000,
    encumbranceStatus: "disputed",
    coOwners: ["Brijal Patel (50%)", "Shagun Patel (50%)"],
    documents: [
      { name: "7/12 Extract (Satbara Utara - Revenue Record)", status: "disputed", type: "PDF" },
      { name: "Mutation Entry Notice (Ferfar #891)", status: "pending", type: "PDF" },
      { name: "Land Survey Map (Mojani)", status: "verified", type: "PDF" },
    ],
    alertMessage: "Boundary survey challenge filed by adjacent occupant in Kalmeshwar Tehsil office.",
  },
];

export interface InsurancePolicy {
  id: string;
  provider: string;
  policyName: string;
  policyNumber: string;
  type: "Life / Endowment" | "Health Floater" | "Critical Illness";
  sumAssured: number;
  annualPremium: number;
  dueDate: string;
  status: "active" | "due_soon" | "lapsed";
  surrenderValue?: number;
  nominee: string;
  nomineeStatus: "registered" | "missing_contingent" | "unregistered";
  daysLeft?: number;
}

export const DEMO_INSURANCE: InsurancePolicy[] = [
  {
    id: "ins_lic_jeevan",
    provider: "Life Insurance Corporation of India (LIC)",
    policyName: "Jeevan Anand (With Profits)",
    policyNumber: "849201948",
    type: "Life / Endowment",
    sumAssured: 2500000,
    annualPremium: 42000,
    dueDate: "10 Oct 2026",
    daysLeft: 23,
    status: "due_soon",
    nominee: "Shagun Patel (Co-Insured / Family)",
    nomineeStatus: "registered",
  },
  {
    id: "ins_hdfc_ergo",
    provider: "HDFC ERGO General Insurance",
    policyName: "Optima Secure Family Floater",
    policyNumber: "281049281048",
    type: "Health Floater",
    sumAssured: 1000000,
    annualPremium: 31500,
    dueDate: "15 Apr 2027",
    status: "active",
    nominee: "Shagun Patel (Family)",
    nomineeStatus: "missing_contingent",
  },
  {
    id: "ins_star_health",
    provider: "Star Health & Allied Insurance",
    policyName: "Comprehensive Health Classic",
    policyNumber: "SH9102839102",
    type: "Critical Illness",
    sumAssured: 500000,
    annualPremium: 14000,
    dueDate: "12 Dec 2023",
    status: "lapsed",
    surrenderValue: 28000,
    nominee: "Unregistered",
    nomineeStatus: "unregistered",
  },
];

export interface RetirementAsset {
  type: "EPFO" | "NPS" | "PPF";
  identifier: string;
  identifierLabel: string;
  institution: string;
  balanceINR: number;
  details: Record<string, string | number>;
  status: "active" | "unclaimed" | "mature";
  actionRequired?: string;
}

export const DEMO_RETIREMENT: RetirementAsset[] = [
  {
    type: "EPFO",
    identifier: "100294829191",
    identifierLabel: "UAN (Universal Account Number)",
    institution: "Employees' Provident Fund Organisation (EPFO)",
    balanceINR: 482000,
    status: "unclaimed",
    details: {
      "Previous Employer": "Tata Consultancy Services Ltd (TCS)",
      "Member ID": "MH/BAN/0019283/000/01928",
      "Employee Share": 290000,
      "Employer Share": 192000,
      "Last Contribution": "August 2022 (Pre-Migration)",
      "Interest Accrual": "8.25% p.a. (Non-tax-exempt post-employment)",
    },
    actionRequired: "File Form 19 for non-resident withdrawal or transfer to international scheme.",
  },
  {
    type: "NPS",
    identifier: "110293849144",
    identifierLabel: "PRAN (Permanent Retirement Account Number)",
    institution: "National Pension System Trust (CRA: Protean)",
    balanceINR: 390000,
    status: "active",
    details: {
      "Tier-1 Corpus": 310000,
      "Tier-2 Liquid": 80000,
      "Asset Allocation": "E (Equity 50%) / C (Corp Bonds 30%) / G (Govt 20%)",
      "Pension Fund Manager": "HDFC Pension Management Co.",
      "Projected Corpus at 60": 8450000,
    },
  },
  {
    type: "PPF",
    identifier: "30291049281",
    identifierLabel: "PPF Passbook Account No.",
    institution: "State Bank of India (Fort Branch)",
    balanceINR: 940000,
    status: "active",
    details: {
      "Opening Year": "2016",
      "15-Year Maturity": "March 2031",
      "Interest Rate": "7.10% p.a. (Tax Free under Sec 10(11))",
      "Current FY Deposit": "₹1,50,000 (Maxed out)",
      "Tenure Progress": "9 of 15 Years (60%)",
    },
  },
];

export interface EquityHolding {
  ticker: string;
  name: string;
  shares: number;
  avgBuyPrice: number;
  cmp: number;
  currentValue: number;
  gainLossINR: number;
  gainLossPercent: number;
  depository: "CDSL" | "NSDL";
}

export const DEMO_STOCKS: EquityHolding[] = [
  {
    ticker: "RELIANCE",
    name: "Reliance Industries Ltd",
    shares: 120,
    avgBuyPrice: 2095,
    cmp: 2480,
    currentValue: 297600,
    gainLossINR: 46200,
    gainLossPercent: 18.4,
    depository: "CDSL",
  },
  {
    ticker: "INFY",
    name: "Infosys Ltd",
    shares: 80,
    avgBuyPrice: 1742,
    cmp: 1850,
    currentValue: 148000,
    gainLossINR: 8640,
    gainLossPercent: 6.2,
    depository: "CDSL",
  },
  {
    ticker: "HDFCBANK",
    name: "HDFC Bank Ltd",
    shares: 150,
    avgBuyPrice: 1736,
    cmp: 1700,
    currentValue: 255000,
    gainLossINR: -5400,
    gainLossPercent: -2.1,
    depository: "CDSL",
  },
  {
    ticker: "TATAMOTORS",
    name: "Tata Motors Ltd",
    shares: 200,
    avgBuyPrice: 479,
    cmp: 630,
    currentValue: 126000,
    gainLossINR: 30200,
    gainLossPercent: 31.5,
    depository: "CDSL",
  },
];

export interface MutualFundHolding {
  fundName: string;
  category: string;
  folio: string;
  investedINR: number;
  currentValueINR: number;
  gainLossPercent: number;
  sipAmount?: number;
  registrar: "CAMS" | "KFintech";
  xirr: number;
}

export const DEMO_MUTUAL_FUNDS: MutualFundHolding[] = [
  {
    fundName: "Parag Parikh Flexi Cap Fund - Direct (G)",
    category: "Flexi Cap Equity (US + India)",
    folio: "10928391/44",
    investedINR: 620000,
    currentValueINR: 840000,
    gainLossPercent: 35.48,
    sipAmount: 10000,
    registrar: "CAMS",
    xirr: 18.2,
  },
  {
    fundName: "Axis Bluechip Fund - Direct (G)",
    category: "Large Cap Equity",
    folio: "91028391/02",
    investedINR: 280000,
    currentValueINR: 320000,
    gainLossPercent: 14.28,
    registrar: "KFintech",
    xirr: 10.8,
  },
  {
    fundName: "SBI Nifty Index Fund - Direct (G)",
    category: "Passive Large Cap",
    folio: "49201948/11",
    investedINR: 420000,
    currentValueINR: 510000,
    gainLossPercent: 21.42,
    sipAmount: 5000,
    registrar: "CAMS",
    xirr: 13.9,
  },
];

export interface AlternateAsset {
  category: "Sovereign Gold Bonds" | "RBI Bonds" | "Digital Gold" | "Crypto (Declared)";
  title: string;
  holdingDetails: string;
  purchaseCostINR: number;
  currentValueINR: number;
  yieldInfo: string;
  complianceTag: string;
}

export const DEMO_ALTERNATES: AlternateAsset[] = [
  {
    category: "Sovereign Gold Bonds",
    title: "SGB 2020-21 Series VI",
    holdingDetails: "20 Units (Grams) in Demat via RBI E-Kuber",
    purchaseCostINR: 108000,
    currentValueINR: 144000,
    yieldInfo: "2.50% p.a. Semi-Annual Interest credited to NRE + Sovereign Guarantee",
    complianceTag: "Tax-exempt upon sovereign maturity",
  },
  {
    category: "RBI Bonds",
    title: "RBI Floating Rate Savings Bonds (FRSB 2020)",
    holdingDetails: "Bond Ledger Account (BLA #009281)",
    purchaseCostINR: 500000,
    currentValueINR: 500000,
    yieldInfo: "8.05% Floating Coupon (Repurchase option at maturity in 2030)",
    complianceTag: "Non-transferable Indian instrument",
  },
  {
    category: "Digital Gold",
    title: "MMTC-PAMP 24K 999.9 Purity",
    holdingDetails: "18.50 Grams physically vaulted in New Delhi",
    purchaseCostINR: 98000,
    currentValueINR: 127000,
    yieldInfo: "Real-time bullion spot peg",
    complianceTag: "Insured physical bullion backing",
  },
  {
    category: "Crypto (Declared)",
    title: "Declared Digital Assets (CoinDCX / WazirX)",
    holdingDetails: "0.0800 BTC + 1.2000 ETH",
    purchaseCostINR: 450000,
    currentValueINR: 680000,
    yieldInfo: "Crypto holdings disclosed under Schedule VDA",
    complianceTag: "Fully Declared for Indian ITR & US Form 8938",
  },
];

export interface TaxOverview {
  pan: string;
  status: string;
  residency: string;
  ay: string;
  filingStatus: string;
  refundApprovedINR: number;
  totalTdsDeductedINR: number;
  inflowSources: { source: string; amountINR: number; tdsDeductedINR: number }[];
  dtaaTreaty: {
    country: string;
    article: string;
    reducedTdsRate: string;
    standardRate: string;
    savingINR: number;
  };
  fbarFatca: {
    obligationMet: boolean;
    aggregateBalanceUSD: number;
    thresholdUSD: number;
    filingDeadline: string;
  };
}

export const DEMO_TAX: TaxOverview = {
  pan: "ABCPM1234D",
  status: "ITR-2 Filed & Processed",
  residency: "Non-Resident Indian (NRI under Sec 6(1) IT Act)",
  ay: "AY 2025-26",
  filingStatus: "Intimation u/s 143(1) received. Refund dispatched.",
  refundApprovedINR: 18400,
  totalTdsDeductedINR: 82000,
  inflowSources: [
    { source: "Rental Income (Goregaon Flat)", amountINR: 360000, tdsDeductedINR: 36000 },
    { source: "Fixed Deposit Interest (Axis & ICICI)", amountINR: 144000, tdsDeductedINR: 43200 },
    { source: "Dividend Inflow (CDSL Demat)", amountINR: 12000, tdsDeductedINR: 2800 },
  ],
  dtaaTreaty: {
    country: "United States (US-India DTAA)",
    article: "Article 10 (Dividends) & Article 11 (Interest)",
    reducedTdsRate: "15.00%",
    standardRate: "30.00% + Surcharge",
    savingINR: 27800,
  },
  fbarFatca: {
    obligationMet: false,
    aggregateBalanceUSD: 221650,
    thresholdUSD: 10000,
    filingDeadline: "15 April 2026",
  },
};

export interface KycInstitution {
  institution: string;
  category: "Banking" | "Depository" | "Asset Management" | "Insurance";
  ckycStatus: "verified" | "expired" | "action_required";
  lastVerified: string;
  expiryOrDue: string;
  issueDetails?: string;
}

export const DEMO_KYC: KycInstitution[] = [
  {
    institution: "HDFC Bank Ltd",
    category: "Banking",
    ckycStatus: "verified",
    lastVerified: "14 Jan 2024",
    expiryOrDue: "14 Jan 2027",
  },
  {
    institution: "State Bank of India",
    category: "Banking",
    ckycStatus: "expired",
    lastVerified: "12 Nov 2021",
    expiryOrDue: "Overdue (Nov 2024)",
    issueDetails: "Overseas address proof & FATCA self-certification missing.",
  },
  {
    institution: "Axis Bank Ltd",
    category: "Banking",
    ckycStatus: "action_required",
    lastVerified: "18 Jun 2022",
    expiryOrDue: "Due within 30 Days",
    issueDetails: "Re-KYC notice issued for NRO fixed deposit ledger.",
  },
  {
    institution: "CAMS (Mutual Funds)",
    category: "Asset Management",
    ckycStatus: "verified",
    lastVerified: "04 May 2024",
    expiryOrDue: "04 May 2029",
  },
  {
    institution: "CDSL (Zerodha Broking)",
    category: "Depository",
    ckycStatus: "verified",
    lastVerified: "19 Feb 2024",
    expiryOrDue: "19 Feb 2029",
  },
  {
    institution: "LIC of India",
    category: "Insurance",
    ckycStatus: "action_required",
    lastVerified: "10 Oct 2019",
    expiryOrDue: "Immediate",
    issueDetails: "Policyholder address still registered as resident Pune address.",
  },
  {
    institution: "Kotak Mahindra Bank",
    category: "Banking",
    ckycStatus: "verified",
    lastVerified: "01 Aug 2023",
    expiryOrDue: "01 Aug 2026",
  },
];

export interface ForgottenAssetItem {
  id: string;
  authority: "IEPF (MCA)" | "RBI UDGAM (Dormant Bank)" | "EPFO Unclaimed" | "Insurance Surrender";
  assetTitle: string;
  entityName: string;
  claimableAmountINR: number;
  period: string;
  claimProcess: string;
  status: "claimable" | "in_review" | "settled";
}

export const DEMO_FORGOTTEN_ASSETS: ForgottenAssetItem[] = [
  {
    id: "fa_iepf_infy",
    authority: "IEPF (MCA)",
    assetTitle: "Unclaimed Dividend & 80 Transferred Shares",
    entityName: "Infosys Limited",
    claimableAmountINR: 18400,
    period: "FY 2018-19 to FY 2020-21",
    claimProcess: "MCA IEPF Form 5 submission with verification from company registrar.",
    status: "claimable",
  },
  {
    id: "fa_bob_dormant",
    authority: "RBI UDGAM (Dormant Bank)",
    assetTitle: "Inoperative Resident Savings Account Balance",
    entityName: "Bank of Baroda (Alkapuri)",
    claimableAmountINR: 44000,
    period: "Inactive since 2019",
    claimProcess: "Branch visit or NRO redesignation affidavit with passport notarization.",
    status: "claimable",
  },
  {
    id: "fa_wipro_pf",
    authority: "EPFO Unclaimed",
    assetTitle: "Unsettled PF Account Balance (Pre-TCS tenure)",
    entityName: "Wipro Technologies (Karnataka)",
    claimableAmountINR: 62000,
    period: "Tenure: 2015-2017",
    claimProcess: "Online EPFO portal transfer to active UAN or Form 19 composite claim.",
    status: "claimable",
  },
  {
    id: "fa_lic_surrender",
    authority: "Insurance Surrender",
    assetTitle: "Lapsed Star Health / LIC Paid-up Policy Reserve",
    entityName: "Star Health / LIC",
    claimableAmountINR: 28000,
    period: "Lapsed 2023",
    claimProcess: "Policy revival under special grace campaign or cash surrender payout.",
    status: "claimable",
  },
];

export interface UrgentAlert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  module: string;
  route: string;
  actionText: string;
  impactINR?: number;
}

export const DEMO_ALERTS: UrgentAlert[] = [
  {
    id: "alt_sbi_kyc",
    severity: "critical",
    title: "SBI NRO Account Locked Due to Expired KYC",
    description: "₹3,20,000 balance restricted from international outward transfers. Complete Video Re-KYC.",
    module: "All Accounts",
    route: "/dashboard/accounts",
    actionText: "Initiate Video Re-KYC",
    impactINR: 320000,
  },
  {
    id: "alt_will_missing",
    severity: "warning",
    title: "No Registered Indian Will on File",
    description: "₹1.12 Cr Mumbai flat & bank assets lack succession protection. Intestate risk flagged.",
    module: "Will & Succession",
    route: "/dashboard/will",
    actionText: "Draft NRI Will",
    impactINR: 11200000,
  },
  {
    id: "alt_iepf_claim",
    severity: "info",
    title: "Recoverable Asset: ₹18,400 Found at IEPF",
    description: "Infosys unclaimed dividends transferred to Govt IEPF fund. Ready for Form 5 filing.",
    module: "Forgotten Assets",
    route: "/dashboard/forgotten",
    actionText: "Start Recovery",
    impactINR: 18400,
  },
  {
    id: "alt_lic_premium",
    severity: "warning",
    title: "LIC Jeevan Anand Premium Due in 23 Days",
    description: "Annual premium of ₹42,000 due. Avoid policy lapse and forfeiture of accumulated bonus.",
    module: "Insurance",
    route: "/dashboard/insurance",
    actionText: "Pay via NRE BillPay",
    impactINR: 42000,
  },
  {
    id: "alt_fbar_threshold",
    severity: "info",
    title: "US FBAR Obligation Threshold Exceeded",
    description: "Total Indian bank balances ($221,650) exceed FinCEN $10,000 threshold. Filing due April 15.",
    module: "Income Tax",
    route: "/dashboard/tax",
    actionText: "Download FBAR Sheet",
  },
];
