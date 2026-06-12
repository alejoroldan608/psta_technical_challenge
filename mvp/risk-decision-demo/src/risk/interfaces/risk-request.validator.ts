import { RiskDecisionInput } from "../domain/risk-decision";

export function validateRiskDecisionRequest(body: unknown): string[] {
  const errors: string[] = [];
  const input = body as Partial<RiskDecisionInput>;

  if (!input.customerId) errors.push("customerId is required");
  if (!input.accountId) errors.push("accountId is required");

  if (typeof input.amount !== "number" || input.amount <= 0) {
    errors.push("amount must be a positive number");
  }

  if (typeof input.deviceKnown !== "boolean") {
    errors.push("deviceKnown must be boolean");
  }

  if (typeof input.usualLocation !== "boolean") {
    errors.push("usualLocation must be boolean");
  }

  if (typeof input.newBeneficiary !== "boolean") {
    errors.push("newBeneficiary must be boolean");
  }

  if (
    input.sessionTrustLevel !== "LOW" &&
    input.sessionTrustLevel !== "MEDIUM" &&
    input.sessionTrustLevel !== "HIGH"
  ) {
    errors.push("sessionTrustLevel must be LOW, MEDIUM or HIGH");
  }

  if (
    typeof input.transactionsLast10Min !== "number" ||
    input.transactionsLast10Min < 0
  ) {
    errors.push("transactionsLast10Min must be a number greater than or equal to 0");
  }

  return errors;
}