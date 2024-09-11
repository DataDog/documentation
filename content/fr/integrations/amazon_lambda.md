---
aliases:
- /fr/integrations/awslambda/
- /fr/serverless/real-time-enhanced-metrics/
categories:
- aws
- cloud
- log collection
- tracing
dependencies: []
description: Mesurez les temps d'exécution, les erreurs et les nombres d'appels de
  vos fonctions Lambda, ainsi que d'autres paramètres.
doc_link: https://docs.datadoghq.com/integrations/amazon_lambda/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/how-to-monitor-lambda-functions/
  tag: Blog
  text: Comment surveiller des fonctions Lambda
- link: https://www.datadoghq.com/blog/datadog-lambda-layer/
  tag: Blog
  text: 'Couche Lambda Datadog : surveiller des métriques custom sans serveur'
- link: https://www.datadoghq.com/blog/datadog-lambda-extension/
  tag: Blog
  text: Présentation de l'extension Lambda Datadog
git_integration_title: amazon_lambda
has_logo: true
integration_id: amazon-lambda
integration_title: Amazon Lambda
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
monitors:
  lambda_high_error_rate: assets/monitors/lambda_high_error_rate.json
  lambda_high_iterator_rate: assets/monitors/lambda_high_iterator_rate.json
  lambda_high_throttles: assets/monitors/lambda_high_throttles.json
  lambda_timeout: assets/monitors/lambda_timeout.json
name: amazon_lambda
public_title: Intégration Datadog/Amazon Lambda
short_description: Mesurez les temps d'exécution, les erreurs et les nombres d'appels
  de vos fonctions Lambda, ainsi que d'autres paramètres.
version: '1.0'
---

<div class="alert alert-warning">Cette documentation aborde uniquement l'ingestion de métriques AWS Lambda depuis Amazon CloudWatch. Consultez la <a href="/serverless">documentation relative à l'Informatique sans serveur Datadog</a> pour recueillir en temps réel des données de télémétrie depuis vos fonctions Lambda.</div>

## Présentation

Amazon Lambda est un service de calcul qui exécute du code en réponse à des événements et qui gère automatiquement les ressources de calcul requises par ce code.

Activez cette intégration pour commencer à recueillir des métriques CloudWatch. Cette page décrit également la marche à suivre pour configurer l'envoi de métriques custom, le logging et le tracing pour vos fonctions Lambda.

## Implémentation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

#### Métriques AWS Lambda

1. Sur la [page de l'intégration AWS][2], vérifiez que `Lambda` est activé dans l'onglet `Metric Collection`.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon Lambda. Pour en savoir plus, consultez la section relative aux [stratégies Lambda][4] de la documentation AWS.

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `lambda:List*`     | Énumère les tags, les métadonnées et les fonctions Lambda.   |
    | `tag:GetResources` | Récupère des tags personnalisés appliqués aux fonctions Lambda. |
    | `cloudtrail:LookupEvents` | Use CloudTrail History to detect changes to lambda functions |

3. Installez l'[intégration Datadog/AWS Lambda][5].

Une fois l'installation terminée, vous pouvez consulter l'ensemble de vos fonctions Lambda depuis l'[interface Serverless de Datadog][6]. Cette page regroupe en une vue unique les métriques, les traces et les logs de vos fonctions Lambda AWS qui exécutent des applications sans serveur. Pour en savoir plus sur cette fonctionnalité, consultez la [documentation relative aux fonctions sans serveur de Datadog][7].

## Données collectées

<div class="alert alert-warning">Si vous utilisez des extensions AWS Lambda, la métrique <em>duration</em> transmise par AWS inclut la durée <em>post_runtime_extensions_duration</em> utilisée par les extensions Lambda <a href="https://aws.amazon.com/blogs/compute/performance-and-functionality-improvements-for-aws-lambda-extensions/">effectuant des activités après l'envoi de la réponse de la fonction</a>. Pour surveiller les performances réelles de la fonction, utilisez le calcul <em>durée - post_runtime_extensions_duration</em> ou la <a href="https://docs.datadoghq.com/serverless/enhanced_lambda_metrics/">métrique optimisée Datadog</a> <em>aws.lambda.enhanced.runtime_duration</em>.</div>

Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de la fonction et les groupes de sécurité.

### Métriques
{{< get-metrics-from-git "amazon_lambda" >}}


### Événements

L'intégration Lambda AWS recueille les événements de déploiement Lambda à partir d'AWS CloudTrail si [le suivi des déploiements sans serveur Datadog][9] est activé.

### Checks de service

L'intégration AWS Lambda n'inclut aucun check de service.

### Métriques Lambda optimisées transmises en temps réel

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][10].

### Métriques custom

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][11].

### Collecte de logs

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][12].

### Collecte de traces

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][13].

### Lambda@Edge

Datadog ajoute automatiquement les tags `at_edge`, `edge_master_name` et `edge_master_arn` sur vos métriques Lambda afin d'obtenir une vue agrégée de vos métriques et logs de fonctions Lambda lorsqu'elles sont exécutées dans des emplacements Edge.

Le tracing distribué n'est _pas_ pris en charge pour les fonctions Lambda@Edge.

## Fonctionnalités de surveillance prêtes à l'emploi

L'intégration AWS Lambda propose des fonctionnalités de surveillance prêtes à l'emploi vous permettant de surveiller et d'optimiser vos performances.

- Dashboard AWS Lambda : bénéficiez d'une vue d'ensemble détaillée de vos fonctions Lambda grâce au [dashboard AWS Lambda][14] prête à l'emploi.
- Monitors recommandés : activez les [monitors AWS Lambda recommandés][15] pour détecter des problèmes de façon proactive et recevoir des alertes en temps opportun.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][16].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



[1]: /fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: /fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html
[5]: https://app.datadoghq.com/integrations/amazon-lambda
[6]: https://app.datadoghq.com/functions
[7]: /fr/serverless
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[9]: /fr/serverless/deployment_tracking
[10]: /fr/serverless/enhanced_lambda_metrics/
[11]: /fr/serverless/custom_metrics/#custom-metrics
[12]: /fr/serverless/forwarder/
[13]: /fr/serverless/distributed_tracing/
[14]: https://app.datadoghq.com/screen/integration/98/aws-lambda
[15]: https://app.datadoghq.com/monitors/recommended
[16]: /fr/help/