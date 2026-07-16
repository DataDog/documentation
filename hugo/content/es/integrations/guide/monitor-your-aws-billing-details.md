---
aliases:
- /es/integrations/faq/how-do-i-monitor-my-aws-billing-details
title: Monitorizar tus detalles de facturación de AWS
---

Las métricas de facturación pueden recopilarse de AWS con la integración de Datadog y Facturación de AWS. Consulta la integración de [facturación de Amazon][5] en Datadog para obtener más información. 

Para empezar a recopilar métricas de facturación:

1. Asegúrate de que `Billing` está habilitado en la pestaña `Metric Collection` en la página de [Configuración de AWS][1], e incluye el permiso `budgets:ViewBudget` en tu política de AWS y Datadog.

2. [Habilita las métricas de facturación][2] dentro de la consola de AWS.

Las siguientes métricas están disponibles utilizando la integración de Datadog y la facturación de AWS:

| Nombre                            | Unidades   | Descripción                                                                                                                                        |
| -----                           | ------  | ------                                                                                                                                             |
| `aws.billing.actual_spend`      | dólares | Los gastos reales del período presupuestario                                                                                                   |
| `aws.billing.budget_limit`      | dólares | El límite de gasto para tu período presupuestario                                                                                                          |
| `aws.billing.estimated_charges` | dólares | Los cargos estimados por el uso de AWS. Puede tratarse de cargos estimados para un servicio o un resumen de cargos estimados para todos los servicios. |
| `aws.billing.forecasted_spend`  | dólares | Los gastos previstos para el periodo presupuestario                                                                                               |

Para una monitorización de costes más sólida a través de una serie de servicios en la nube además de AWS, Datadog admite la integración de terceros con [CloudHealth][3]. [En esta entrada del blog][4] se explica con más detalle cómo [CloudHealth][3] se integra con Datadog para permitir la visibilidad de los costes en toda tu infraestructura alojado.

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[3]: /es/integrations/cloudhealth/
[4]: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog
[5]: https://app.datadoghq.com/integrations/amazon-billing