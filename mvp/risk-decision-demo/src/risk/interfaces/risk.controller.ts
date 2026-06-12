import { Router, Request, Response } from "express";
import { EvaluateRiskUseCase } from "../application/evaluate-risk.use-case";
import { SimulateVelocityAttackUseCase } from "../application/simulate-velocity-attack.use-case";

export class RiskController {
  public readonly router = Router();

  constructor(
    private readonly evaluateRiskUseCase: EvaluateRiskUseCase,
    private readonly simulateVelocityAttackUseCase: SimulateVelocityAttackUseCase
  ) {
    this.router.post("/risk/decision", this.evaluateRisk.bind(this));
    this.router.post("/risk/simulate/velocity-attack", this.simulateVelocityAttack.bind(this));
  }

  private evaluateRisk(req: Request, res: Response): void {
    const decision = this.evaluateRiskUseCase.execute(req.body);

    res.status(200).json({
      data: decision
    });
  }

  private simulateVelocityAttack(req: Request, res: Response): void {
    const result = this.simulateVelocityAttackUseCase.execute(req.body);

    res.status(200).json({
      data: result
    });
  }
}