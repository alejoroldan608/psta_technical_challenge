import { RequiredAction } from "./required-action";
import { ReasonCode } from "./reason-code";
import { RiskDecision, RiskDecisionInput } from "./risk-decision";
import { RiskLevel } from "./risk-level";
import { RiskThresholds } from "./risk-thresholds";

export class RiskScoringService {
  evaluate(input: RiskDecisionInput): RiskDecision {
    let score = 0;
    const reasonCodes: ReasonCode[] = [];

    if (input.amount <= RiskThresholds.lowAmountMax) {
      score += 0.05;
      reasonCodes.push(ReasonCode.LOW_AMOUNT);
    }

    if (
      input.amount > RiskThresholds.lowAmountMax &&
      input.amount <= RiskThresholds.mediumAmountMax
    ) {
      score += 0.2;
      reasonCodes.push(ReasonCode.MEDIUM_AMOUNT);
    }

    if (input.amount > RiskThresholds.mediumAmountMax) {
      score += 0.35;
      reasonCodes.push(ReasonCode.HIGH_AMOUNT);
    }

    if (!input.deviceKnown) {
      score += 0.2;
      reasonCodes.push(ReasonCode.UNKNOWN_DEVICE);
    }

    if (!input.usualLocation) {
      score += 0.15;
      reasonCodes.push(ReasonCode.UNUSUAL_LOCATION);
    }

    if (input.newBeneficiary) {
      score += 0.15;
      reasonCodes.push(ReasonCode.NEW_BENEFICIARY);
    }

    if (input.sessionTrustLevel === "LOW") {
      score += 0.2;
      reasonCodes.push(ReasonCode.LOW_SESSION_TRUST);
    }

    if (input.transactionsLast10Min >= RiskThresholds.recentTransactionsWarning) {
      score += 0.25;
      reasonCodes.push(ReasonCode.MULTIPLE_RECENT_TRANSACTIONS);
    }

    const normalizedScore = Math.min(Number(score.toFixed(2)), 1);
    const riskLevel = this.resolveRiskLevel(normalizedScore);
    const requiredAction = this.resolveRequiredAction(riskLevel);

    return {
      score: normalizedScore,
      riskLevel,
      requiredAction,
      suggestedFactor: this.resolveSuggestedFactor(requiredAction),
      reasonCodes,
      auditEvent: "RiskScoreCalculated"
    };
  }

  private resolveRiskLevel(score: number): RiskLevel {
    if (score >= RiskThresholds.criticalRiskScore) return RiskLevel.CRITICAL;
    if (score >= RiskThresholds.highRiskScore) return RiskLevel.HIGH;
    if (score >= RiskThresholds.mediumRiskScore) return RiskLevel.MEDIUM;
    return RiskLevel.LOW;
  }

  private resolveRequiredAction(riskLevel: RiskLevel): RequiredAction {
    switch (riskLevel) {
      case RiskLevel.LOW:
        return RequiredAction.SILENT_AUTH;
      case RiskLevel.MEDIUM:
        return RequiredAction.STRONG_AUTH_REQUIRED;
      case RiskLevel.HIGH:
        return RequiredAction.HOLD_FOR_REVIEW;
      case RiskLevel.CRITICAL:
        return RequiredAction.ACCOUNT_BLOCK;
    }
  }

  private resolveSuggestedFactor(action: RequiredAction): string {
    switch (action) {
      case RequiredAction.ALLOW:
      case RequiredAction.SILENT_AUTH:
        return "SILENT_OR_SESSION_TRUST";
      case RequiredAction.STRONG_AUTH_REQUIRED:
        return "PUSH_OR_BIOMETRIC";
      case RequiredAction.HOLD_FOR_REVIEW:
        return "STEP_UP_AUTH_AND_REVIEW";
      case RequiredAction.ACCOUNT_BLOCK:
        return "NO_FACTOR_ACCOUNT_BLOCKED";
    }
  }
}