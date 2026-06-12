import express from "express";
import { EvaluateRiskUseCase } from "./risk/application/evaluate-risk.use-case";
import { SimulateVelocityAttackUseCase } from "./risk/application/simulate-velocity-attack.use-case";
import { RiskScoringService } from "./risk/domain/risk-scoring.service";
import { RiskController } from "./risk/interfaces/risk.controller";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const riskScoringService = new RiskScoringService();
const evaluateRiskUseCase = new EvaluateRiskUseCase(riskScoringService);
const simulateVelocityAttackUseCase = new SimulateVelocityAttackUseCase();

const riskController = new RiskController(
  evaluateRiskUseCase,
  simulateVelocityAttackUseCase
);

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "risk-decision-demo"
  });
});

app.use(riskController.router);

app.listen(port, () => {
  console.log(`Risk Decision Demo running on http://localhost:${port}`);
});