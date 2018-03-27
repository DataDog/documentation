---
aliases:
  - /fr/integrations/awsbilling/
categories:
  - cloud
  - Cost Management
  - aws
ddtype: crawler
description: Surveiller les dépenses réelles et estimées sur votre compte AWS.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_billing/'
git_integration_title: amazon_billing
has_logo: true
integration_title: AWS Billing
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_billing
public_title: Intégration Datadog-AWS Billing
short_description: Surveiller les dépenses réelles et estimées sur votre compte AWS.
version: '1.0'
---
## Aperçu

Amazon Billing vous permet de suivre vos prévisions et vos coûts de facturation de l'infrastructure AWS.

Activez cette intégration pour voir dans Datadog toutes vos métriques de Billing.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Installation

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `Billing` est coché dans la partie "metric collection".

2. Ajoutez ces permissions votre politique [IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter les métriques Amazon Billing.

    * `budgets:ViewBudget`: Permet d'afficher les métriques sur les budgets AWS

    Pour plus d'information sur les polices Budgets, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_budgets.html).

3. Activer les métriques Billing dans la [Console AWS](http://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html#turning_on_billing_metrics).

4. Installez l'intégration [Datadog - AWS Billing](https://app.datadoghq.com/account/settings#integrations/amazon_billing).

**Les statistiques AWS Budgets ne peuvent être collectées qu'à partir du compte principal AWS.**

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_billing" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Billing n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS Billing n'inclut aucun check de service pour le moment.

## Troubleshooting

### Aucune métrique n'est colletée pour l'intégration AWS Billing.
Voici une liste de vérification que vous pouvez appliquer pour résoudre votre problème d'intégration:

1. Assurez-vous que votre policy IAM comporte `budgets:ViewBudget`
2. Vérifiez que les métriques de facturation sont activées dans votre compte payeur
3. Notez que les statistiques AWS Billing sont collectées toutes les 4 ou 8 heures par Datadog.

### `aws.billing.actual_spend` `aws.billing.forecasted_spend` `aws.billing.budget_limit` n'apparaissent pas sur Datadog 

[Créez un budget AWS](https://console.aws.amazon.com/billing/home?#/createbudget) afin de commencer à voir ces métriques sur votre application Datadog.
Sachez que les métriques AWS Billing sont collectées toutes les 4 ou 8 heures par Datadog.

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)