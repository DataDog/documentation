---
aliases:
  - /fr/integrations/awsbilling/
  - /fr/integrations/faq/using-datadog-s-aws-billing-integration-to-monitor-your-cloudwatch-usage/
categories:
  - cloud
  - Cost Management
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez les dépenses réelles et estimées sur votre compte AWS.
doc_link: https://docs.datadoghq.com/integrations/amazon_billing/
draft: false
git_integration_title: amazon_billing
has_logo: true
integration_id: amazon-billing
integration_title: AWS Billing
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_billing
public_title: "Intégration Datadog/AWS\_Billing"
short_description: Surveillez les dépenses réelles et estimées sur votre compte AWS.
version: '1.0'
---
## Présentation

AWS Billing vous permet de surveiller vos prévisions et vos coûts de facturation pour l'infrastructure AWS, y compris l'utilisation de CloudWatch.

Activez cette intégration pour visualiser dans Datadog vos métriques de facturation.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Billing` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez l'autorisation suivante à votre [stratégie IAM Datadog][3] afin de recueillir vos métriques AWS Billing. Pour en savoir plus, consultez la section relative aux [stratégies AWS Budgets][4] de la documentation AWS.

    | Autorisation AWS       | Description                      |
    | -------------------- | -------------------------------- |
    | `budgets:ViewBudget` | utilisée pour afficher les métriques sur les budgets AWS |

3. Activez les métriques Billing depuis la [console AWS][5].
4. Installez l'[intégration Datadog/AWS Billing][6].
5. [Créez un budget AWS][7] afin de commencer à recevoir des [métriques](#metriques).

**Remarque** : les métriques AWS Budgets ne peuvent être recueillies qu'à partir de votre compte AWS principal.

### Collecte de logs

#### Activer le logging

Configurez AWS Billing de façon à ce que les logs soient envoyés vers un compartiment S3 ou vers CloudWatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_billing` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][8].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs CloudWatch qui contient vos logs AWS Billing dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][9]
    - [Ajouter un déclencheur manuel sur le groupe de logs CloudWatch][10]

## Surveiller l'utilisation de CloudWatch

Après avoir configuré vos autorisations AWS afin d'ajouter l'autorisation `budgets:ViewBudget`, vous pouvez surveiller la facturation CloudWatch à l'aide de cette intégration.

Les métriques AWS Billing sont disponibles environ toutes les 4 heures. Vous devrez peut-être patienter 4 heures pour que les métriques soient recueillies par Datadog.

Dès que les métriques sont disponibles, consultez `aws.billing.estimated_charges` et `aws.billing.forecasted_charges`. Vous pouvez utiliser ces métriques pour suivre votre utilisation de CloudWatch en affinant le contexte avec `service:amazoncloudwatch`. Vous pouvez visualiser les dépenses associées à un compte AWS spécifique à l'aide de `max:account_id`.

AWS considère que la métrique `aws.billing.estimated_charges` représente la facture CloudWatch du mois en cours. La valeur est réinitialisée à 0 au début de chaque mois. La métrique `aws.billing.forecasted_charges` indique votre facture CloudWatch estimée à la fin du mois, en fonction de l'utilisation actuelle.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_billing" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Billing n'inclut aucun événement.

### Checks de service

L'intégration AWS Billing n'inclut aucun check de service.

## Dépannage

### Aucune métrique n'est recueillie dans le cadre de l'intégration AWS Billing.

Vérifiez les éléments ci-dessous pour tenter de résoudre votre problème :

1. Assurez-vous que votre stratégie IAM dispose de l'autorisation `budgets:ViewBudget`.
2. Vérifiez que les métriques de facturation sont activées dans votre compte payeur.

**Remarque** : les métriques AWS Billing sont recueillies toutes les 4 ou 8 heures par Datadog.

### Métriques manquantes

Si les métriques `aws.billing.actual_spend`, `aws.billing.forecasted_spend` ou `aws.billing.budget_limit` sont manquantes, [créez un budget AWS][7] afin de commencer à recevoir ces métriques dans Datadog.

**Remarque** : les métriques AWS Billing sont recueillies toutes les 4 ou 8 heures par Datadog.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/cost-management/latest/userguide/security-iam.html
[5]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_billing
[7]: https://console.aws.amazon.com/billing/home?#/createbudget
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[9]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[10]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_billing/amazon_billing_metadata.csv