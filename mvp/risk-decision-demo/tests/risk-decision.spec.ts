import { describe, expect, it } from "@jest/globals";
import { SimulateVelocityAttackUseCase } from "../src/risk/application/simulate-velocity-attack.use-case";
import { ReasonCode } from "../src/risk/domain/reason-code";
import { RequiredAction } from "../src/risk/domain/required-action";
import { RiskLevel } from "../src/risk/domain/risk-level";
import { RiskScoringService } from "../src/risk/domain/risk-scoring.service";

describe("RiskScoringService", () => {
  const service = new RiskScoringService();

  it("returns low risk for a usual low amount transaction", () => {
    const result = service.evaluate({
      customerId: "C123",
      accountId: "A456",
      amount: 50000,
      deviceKnown: true,
      usualLocation: true,
      newBeneficiary: false,
      sessionTrustLevel: "HIGH",
      transactionsLast10Min: 0
    });

    expect(result.riskLevel).toBe(RiskLevel.LOW);
    expect(result.requiredAction).toBe(RequiredAction.SILENT_AUTH);
    expect(result.reasonCodes).toContain(ReasonCode.LOW_AMOUNT);
  });

  it("requires strong authentication for a medium risk transaction", () => {
    const result = service.evaluate({
      customerId: "C123",
      accountId: "A456",
      amount: 800000,
      deviceKnown: false,
      usualLocation: false,
      newBeneficiary: true,
      sessionTrustLevel: "MEDIUM",
      transactionsLast10Min: 2
    });

    expect(result.score).toBe(0.7);
    expect(result.riskLevel).toBe(RiskLevel.MEDIUM);
    expect(result.requiredAction).toBe(RequiredAction.STRONG_AUTH_REQUIRED);
    expect(result.reasonCodes).toContain(ReasonCode.UNKNOWN_DEVICE);
    expect(result.reasonCodes).toContain(ReasonCode.UNUSUAL_LOCATION);
    expect(result.reasonCodes).toContain(ReasonCode.NEW_BENEFICIARY);
  });
});

describe("SimulateVelocityAttackUseCase", () => {
  const useCase = new SimulateVelocityAttackUseCase();

  it("blocks the account when a velocity attack pattern is detected", () => {
    const result = useCase.execute({
      accountId: "A456",
      transactions: 7,
      amountRange: "190000-210000",
      uniqueNewBeneficiaries: 7,
      windowMinutes: 3
    });

    expect(result.riskLevel).toBe(RiskLevel.CRITICAL);
    expect(result.requiredAction).toBe(RequiredAction.ACCOUNT_BLOCK);
    expect(result.domainEvent).toBe("AccountBlocked");
    expect(result.reasonCodes).toContain(ReasonCode.VELOCITY_PATTERN);
  });
});