import { RiskDecision, RiskDecisionInput } from "../domain/risk-decision";
import { RiskScoringService } from "../domain/risk-scoring.service";

export class EvaluateRiskUseCase {
  constructor(private readonly riskScoringService: RiskScoringService) {}

  execute(input: RiskDecisionInput): RiskDecision {
    return this.riskScoringService.evaluate(input);
  }
}