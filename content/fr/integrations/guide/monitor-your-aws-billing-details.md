---
aliases:
- /fr/integrations/faq/how-do-i-monitor-my-aws-billing-details

title: Surveiller votre facture AWS
---

Vous avez la possibilité de recueillir des métriques de facturation depuis AWS à l'aide de l'intégration Datadog/AWS Billing. Consultez l'intégration [Amazon Billing][5] dans Datadog pour en savoir plus.

Pour commencer à recueillir vos métriques de facturation :

1. Assurez-vous que l'option `Billing` est activée dans l'onglet `Metric Collection` de la [page de configuration AWS][1], et ajoutez l'autorisation `budgets:ViewBudget` dans votre stratégie AWS pour Datadog.

2. [Activez les métriques Billing][2] depuis la console AWS.

Les métriques suivantes sont disponibles via l'intégration Datadog/AWS Billing :

| Nom                            | Unités   | Description                                                                                                                                        |
| -----                           | ------  | ------                                                                                                                                             |
| `aws.billing.actual_spend`      | dollars | Les coûts réels pour votre période budgétaire                                                                                                   |
| `aws.billing.budget_limit`      | dollars | La limite de coûts pour votre période budgétaire                                                                                                          |
| `aws.billing.estimated_charges` | dollars | Les coûts estimés pour votre utilisation d'AWS. Il peut s'agir des coûts estimés pour un seul service ou du total des coûts estimés pour l'ensemble des services. |
| `aws.billing.forecasted_spend`  | dollars | Les coûts prévus pour votre période budgétaire                                                                                               |

Si vous souhaitez effectuer une surveillance plus poussée des coûts associés à différents services cloud en plus d'AWS, Datadog propose une intégration tierce avec [CloudHealth][3]. [Cet article de blog][4] décrit plus en détail comment [CloudHealth][3] peut être intégré à Datadog pour optimiser votre visibilité sur les coûts de votre infrastructure hébergée.

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[3]: /fr/integrations/cloudhealth/
[4]: https://www.datadoghq.com/blog/monitor-cloudhealth-assets-datadog
[5]: https://app.datadoghq.com/integrations/amazon-billing