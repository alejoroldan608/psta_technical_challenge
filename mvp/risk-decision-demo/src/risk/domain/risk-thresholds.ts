export const RiskThresholds = {
  /*
   * Valores demostrativos para el MVP.
   * En una implementación real, estos umbrales deberían venir de configuración
   * versionada y validada con equipos de fraude, riesgo y cumplimiento.
   */
  lowAmountMax: 100_000,
  mediumAmountMax: 1_000_000,

  mediumRiskScore: 0.35,
  highRiskScore: 0.75,
  criticalRiskScore: 0.9,

  recentTransactionsWarning: 5
} as const;