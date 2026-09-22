"use client";

import React, { createContext, useContext, useState } from "react";
import {
  DEMO_USERS,
  DEMO_ACCOUNTS,
  DEMO_ACCOUNTS_BY_USER,
  DEMO_PROPERTIES,
  DEMO_LOANS,
  DEMO_INSURANCE,
  DEMO_RETIREMENT,
  DEMO_STOCKS,
  DEMO_MUTUAL_FUNDS,
  DEMO_ALTERNATES,
  DEMO_TAX,
  DEMO_KYC,
  DEMO_FORGOTTEN_ASSETS,
  DEMO_ALERTS,
  UserProfile,
  BankAccount,
  LoanItem,
  UrgentAlert,
  ForgottenAssetItem,
  KycInstitution,
} from "./mockData";

interface AppContextType {
  activeUser: UserProfile;
  setActiveUser: (user: UserProfile) => void;
  currency: "INR" | "USD";
  setCurrency: (c: "INR" | "USD") => void;
  accounts: BankAccount[];
  loans: LoanItem[];
  alerts: UrgentAlert[];
  forgottenAssets: ForgottenAssetItem[];
  kycList: KycInstitution[];
  dismissAlert: (id: string) => void;
  resolveKyc: (institution: string) => void;
  redesignateAccount: (accountId: string) => void;
  claimForgottenAsset: (assetId: string) => void;
  totalNetWorthINR: number;
  totalLiquidINR: number;
  totalRealEstateINR: number;
  totalInvestmentsINR: number;
  totalRetirementINR: number;
  totalAlternatesINR: number;
  totalForgottenINR: number;
  totalLoansINR: number;
  healthScore: number;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeUser, setActiveUserState] = useState<UserProfile>(DEMO_USERS.brijal);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [accounts, setAccounts] = useState<BankAccount[]>(DEMO_ACCOUNTS_BY_USER.usr_brijal);
  const [loans, setLoans] = useState<LoanItem[]>(DEMO_LOANS.filter(l => l.userId === "usr_brijal"));
  const [alerts, setAlerts] = useState<UrgentAlert[]>(DEMO_ALERTS);
  const [forgottenAssets, setForgottenAssets] = useState<ForgottenAssetItem[]>(DEMO_FORGOTTEN_ASSETS);
  const [kycList, setKycList] = useState<KycInstitution[]>(DEMO_KYC);

  const setActiveUser = (user: UserProfile) => {
    setActiveUserState(user);
    if (DEMO_ACCOUNTS_BY_USER[user.id]) {
      setAccounts(DEMO_ACCOUNTS_BY_USER[user.id]);
    }
    setLoans(DEMO_LOANS.filter((l) => l.userId === user.id));
  };

  // Compute live aggregates
  const totalLiquidINR = accounts.reduce((acc, a) => acc + a.balanceINR, 0);
  const totalRealEstateINR = DEMO_PROPERTIES.reduce((acc, p) => acc + p.currentValuation, 0);
  const stocksVal = DEMO_STOCKS.reduce((acc, s) => acc + s.currentValue, 0);
  const mfVal = DEMO_MUTUAL_FUNDS.reduce((acc, m) => acc + m.currentValueINR, 0);
  const totalInvestmentsINR = stocksVal + mfVal;
  const totalRetirementINR = DEMO_RETIREMENT.reduce((acc, r) => acc + r.balanceINR, 0);
  const totalAlternatesINR = DEMO_ALTERNATES.reduce((acc, a) => acc + a.currentValueINR, 0);
  const totalForgottenINR = forgottenAssets
    .filter((f) => f.status === "claimable")
    .reduce((acc, f) => acc + f.claimableAmountINR, 0);

  const totalLoansINR = loans
    .filter((l) => l.status === "active")
    .reduce((acc, l) => acc + l.outstandingBalanceINR, 0);

  const totalNetWorthINR =
    totalLiquidINR +
    totalRealEstateINR +
    totalInvestmentsINR +
    totalRetirementINR +
    totalAlternatesINR;

  // Health Score Calculation based on unresolved flags
  let healthScore = 100;
  const hasKycExpired = accounts.some((a) => a.status === "kyc_expired");
  const hasDormant = accounts.some((a) => a.status === "dormant");
  const hasDisputedProperty = DEMO_PROPERTIES.some((p) => p.encumbranceStatus === "disputed");

  if (hasKycExpired) healthScore -= 12;
  if (hasDormant) healthScore -= 6;
  if (hasDisputedProperty) healthScore -= 10;
  // Intestate will penalty
  healthScore -= 10;

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const resolveKyc = (institution: string) => {
    setKycList((prev) =>
      prev.map((k) => (k.institution === institution ? { ...k, ckycStatus: "verified" as const } : k))
    );
    setAccounts((prev) =>
      prev.map((a) => (a.bankName.includes(institution) ? { ...a, status: "active" as const } : a))
    );
  };

  const redesignateAccount = (accountId: string) => {
    setAccounts((prev) =>
      prev.map((a) =>
        a.id === accountId
          ? {
              ...a,
              accountType: "NRO Savings" as const,
              status: "active" as const,
              alerts: undefined,
            }
          : a
      )
    );
  };

  const claimForgottenAsset = (assetId: string) => {
    setForgottenAssets((prev) =>
      prev.map((f) => (f.id === assetId ? { ...f, status: "settled" as const } : f))
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeUser,
        setActiveUser,
        currency,
        setCurrency,
        accounts,
        loans,
        alerts,
        forgottenAssets,
        kycList,
        dismissAlert,
        resolveKyc,
        redesignateAccount,
        claimForgottenAsset,
        totalNetWorthINR,
        totalLiquidINR,
        totalRealEstateINR,
        totalInvestmentsINR,
        totalRetirementINR,
        totalAlternatesINR,
        totalForgottenINR,
        totalLoansINR,
        healthScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
