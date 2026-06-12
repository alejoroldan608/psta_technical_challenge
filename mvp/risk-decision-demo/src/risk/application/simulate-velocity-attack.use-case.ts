import { RequiredAction } from "../domain/required-action";
import { ReasonCode } from "../domain/reason-code";
import { RiskLevel } from "../domain/risk-level";

export interface VelocityAttackInput {
  accountId: string;
  transactions: number;
  amountRange: string;
  uniqueNewBeneficiaries: number;
  windowMinutes: number;
}

export interface VelocityAttackResult {
  accountId: string;
  riskLevel: RiskLevel;
  requiredAction: RequiredAction;
  reasonCodes: ReasonCode[];
  domainEvent: string;
  explanation: string;
}

export class SimulateVelocityAttackUseCase {
  execute(input: VelocityAttackInput): VelocityAttackResult {
    const isVelocityPattern =
      input.transactions >= 7 &&
      input.uniqueNewBeneficiaries >= 7 &&
      input.windowMinutes <= 3;

    if (!isVelocityPattern) {
      return {
        accountId: input.accountId,
        riskLevel: RiskLevel.MEDIUM,
        requiredAction: RequiredAction.STRONG_AUTH_REQUIRED,
        reasonCodes: [ReasonCode.MULTIPLE_RECENT_TRANSACTIONS],
        domainEvent: "RiskLevelEscalated",
        explanation:
          "Se detecta actividad inusual, pero aún no alcanza el umbral definido para bloqueo automático."
      };
    }

    return {
      accountId: input.accountId,
      riskLevel: RiskLevel.CRITICAL,
      requiredAction: RequiredAction.ACCOUNT_BLOCK,
      reasonCodes: [
        ReasonCode.VELOCITY_PATTERN,
        ReasonCode.STRUCTURED_AMOUNTS,
        ReasonCode.MULTIPLE_NEW_BENEFICIARIES
      ],
      domainEvent: "AccountBlocked",
      explanation:
        "Se detecta patrón de velocidad: varias transferencias en pocos minutos, montos similares y beneficiarios nuevos."
    };
  }
}