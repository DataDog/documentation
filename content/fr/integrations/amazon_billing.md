---
aliases:
  - /fr/integrations/awsbilling/
categories:
  - cloud
  - Cost Management
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez les dépenses réelles et estimées sur votre compte AWS.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_billing/'
git_integration_title: amazon_billing
has_logo: true
integration_title: "AWS\_Billing"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_billing
public_title: "Intégration Datadog/AWS\_Billing"
short_description: Surveillez les dépenses réelles et estimées sur votre compte AWS.
version: '1.0'
---
## Présentation

Amazon Billing vous permet de surveiller vos prévisions et vos coûts de facturation pour l'infrastructure AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Billing.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Installation

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Billing` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon Billing :

    * `budgets:ViewBudget` : utilisé pour afficher les métriques sur les budgets AWS.

    Pour en savoir plus sur les stratégies Budgets, consultez [la documentation disponible sur le site d'AWS][4].

3. Activez des métriques Billing au sein de la [console AWS][5].

4. Installez l'[intégration Datadog/AWS Billing][6].

5. [Créez un budget AWS][8] afin de commencer à recevoir vos [métriques](#metriques) AWS Budgets.

**Les métriques AWS Budgets ne peuvent être recueillies qu'à partir du compte principal AWS.**

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_billing" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Billing n'inclut aucun événement.

### Checks de service
L'intégration AWS Billing n'inclut aucun check de service.

## Dépannage

### Aucune métrique n'est recueillie dans le cadre de l'intégration AWS Billing
Vérifiez les éléments ci-dessous pour tenter de résoudre votre problème d'intégration :

1. Assurez-vous que votre stratégie IAM comporte `budgets:ViewBudget`.
2. Vérifiez que les métriques de facturation sont activées dans votre compte payeur.
3. Notez que les métriques AWS Billing sont collectées toutes les 4 ou 8 heures par Datadog.

### `aws.billing.actual_spend`, `aws.billing.forecasted_spend` et `aws.billing.budget_limit` n'apparaissent pas sur Datadog

[Créez des budgets AWS][8] afin d'afficher ces métriques sur votre application Datadog. 
Sachez que les métriques AWS Billing sont recueillies toutes les 4 ou 8 heures par Datadog.

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_budgets.html
[5]: http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics
[6]: https://app.datadoghq.com/account/settings#integrations/amazon_billing
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_billing/amazon_billing_metadata.csv
[8]: https://console.aws.amazon.com/billing/home?#/createbudget


{{< get-dependencies >}}