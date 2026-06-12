import { RequiredAction } from "./required-action";
import { ReasonCode } from "./reason-code";
import { RiskLevel } from "./risk-level";

export type SessionTrustLevel = "LOW" | "MEDIUM" | "HIGH";

export interface RiskDecisionInput {
  customerId: string;
  accountId: string;
  amount: number;
  deviceKnown: boolean;
  usualLocation: boolean;
  newBeneficiary: boolean;
  sessionTrustLevel: SessionTrustLevel;
  transactionsLast10Min: number;
}

export interface RiskDecision {
  score: number;
  riskLevel: RiskLevel;
  requiredAction: RequiredAction;
  suggestedFactor: string;
  reasonCodes: ReasonCode[];
  auditEvent: string;
}