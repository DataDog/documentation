---
aliases:
- /fr/integrations/awslambda/
- /fr/serverless/real-time-enhanced-metrics/
categories:
- cloud
- aws
- log collection
ddtype: crawler
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
kind: integration
manifest_version: '1.0'
name: amazon_lambda
public_title: Intégration Datadog/Amazon Lambda
short_description: Mesurez les temps d'exécution, les erreurs et les nombres d'appels
  de vos fonctions Lambda, ainsi que d'autres paramètres.
version: '1.0'
---

<div class="alert alert-warning">Cette documentation aborde uniquement l'ingestion de métriques AWS Lambda depuis Amazon CloudWatch. Consultez la <a href="https://docs.datadoghq.com/serverless">documentation relative à l'Informatique sans serveur</a> pour en savoir plus.</div>

## Présentation

Amazon Lambda est un service de calcul qui exécute du code en réponse à des événements et qui gère automatiquement les ressources de calcul requises par ce code.

Activez cette intégration pour commencer à recueillir des métriques CloudWatch. Cette page décrit également la marche à suivre pour configurer l'envoi de métriques custom, le logging et le tracing pour vos fonctions Lambda.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

{{< img src="integrations/amazon_lambda/lambda_metrics.png" alt="Diagramme de l'architecture de collecte de métriques runtime depuis AWS Lambda" >}}

#### Métriques AWS Lambda

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Lambda` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez les autorisations suivantes à votre [stratégie IAM Datadog][3] afin de recueillir des métriques Amazon Lambda. Pour en savoir plus, consultez la section relative aux [stratégies Lambda][4] de la documentation AWS.

    | Autorisation AWS     | Description                                  |
    | ------------------ | -------------------------------------------- |
    | `lambda:List*`     | Énumère les tags, les métadonnées et les fonctions Lambda.   |
    | `tag:GetResources` | Récupère des tags personnalisés appliqués aux fonctions Lambda. |
    | `cloudtrail:LookupEvents` | Use CloudTrail History to detect changes to lambda functions |

3. Installez l'[intégration Datadog/AWS Lambda][5].

Une fois l'installation terminée, vous pouvez consulter l'ensemble de vos fonctions Lambda depuis l'[interface Serverless de Datadog][6]. Cette page regroupe en une vue unique les métriques, les traces et les logs de vos fonctions Lambda AWS qui exécutent des applications sans serveur. Pour en savoir plus sur cette fonctionnalité, consultez la [documentation relative aux fonctions sans serveur de Datadog][7].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_lambda" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de la fonction et les groupes de sécurité.

Les métriques custom sont uniquement taguées avec le nom de la fonction.

### Événements

L'intégration AWS Lambda n'inclut aucun événement.

### Checks de service

L'intégration AWS Lambda n'inclut aucun check de service.

## Sans serveur

#### Métriques Lambda optimisées transmises en temps réel

Datadog génère en temps réel des métriques runtime Lambda prêtes à l'emploi pour les runtimes Node.js, Python et Ruby. Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][9].

##### Activation des métriques Lambda optimisées transmises en temps réel

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][9].

### Collecte de logs

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][10].

### Collecte de traces

Datadog prend en charge le tracing distribué pour vos fonctions AWS Lambda, via l'[APM Datadog][11] ou [AWS X-Ray][12]. Vous pouvez utiliser l'un de ces ensembles de bibliothèques client pour générer des traces. L'[APM Datadog][11] associe ensuite automatiquement les traces des applications s'exécutant sur des hosts, des conteneurs et des fonctions sans serveur. Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][13].

#### Tracing avec l'APM Datadog

Les bibliothèques de tracing [Node.js][14], [Python][15] et [Ruby][16] Datadog prennent en charge le tracing distribué pour AWS Lambda. D'autres runtimes seront prochainement compatibles. La meilleure façon d'ajouter des fonctionnalités de tracing à votre application consiste à utiliser la [bibliothèque Lambda Datadog][17], qui comprend la bibliothèque de tracing Datadog en tant que dépendance. Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][13].

#### Configurer le tracing de fonctions AWS Lambda et de hosts

Lorsque cela est approprié, Datadog associe les traces AWS X-Ray aux traces de l'APM Datadog natives. Vos traces peuvent ainsi dresser un tableau complet des requêtes qui franchissent les limites de votre infrastructure, qu'il s'agisse de fonctions Lambda AWS, de conteneurs, de hosts sur site ou de services gérés. Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][18].

#### Organiser votre infrastructure avec les tags

Tout [tag][19] appliqué à votre fonction Lambda devient automatiquement une nouvelle dimension que vous pouvez utiliser pour filtrer vos traces. Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][20].

### Intégrations sans serveur

Les intégrations de fonctions Lambda suivantes fournissent des fonctionnalités supplémentaires pour la surveillance d'applications sans serveur. Pour en savoir plus, consultez la documentation relative à l'informatique sans serveur :

- [AWS Step Functions][21]
- [Amazon EFS pour Lambda][22]
- [Lambda@Edge][23]

### Métriques custom

Installez la bibliothèque Lambda Datadog pour recueillir et envoyer des métriques custom. Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][24].

#### Passer aux métriques de distribution

Les métriques de distribution vous permettent de sélectionner l'agrégation souhaitée au moment de créer votre graphique ou de formuler votre requête, et non au moment d'envoyer la métrique. Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][25].

#### Tagging de métriques custom

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][26].

#### Métriques custom synchrones et asynchrones

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][27].

##### Activer les métriques custom asynchrones

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][28].

#### Exemple de code pour l'envoi de métriques custom

Dans le code de votre fonction, vous devez importer les méthodes nécessaires à partir de la couche Lambda et ajouter un wrapper autour du gestionnaire de votre fonction. Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][29].

#### Exécution dans un VPC

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][30].

#### Bibliothèques tierces

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][31].

#### [OBSOLÈTE] CloudWatch Logs

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][32].

### Couche Lambda Datadog

Pour en savoir plus, consultez la [documentation relative à l'informatique sans serveur][33].

#### Installer et utiliser la couche Lambda Datadog

Pour en savoir plus, consultez la [documentation relative au sans serveur][33].

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][34].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/lambda/latest/dg/lambda-permissions.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_lambda
[6]: https://app.datadoghq.com/functions
[7]: https://docs.datadoghq.com/fr/serverless
[8]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_lambda/amazon_lambda_metadata.csv
[9]: /fr/serverless/enhanced_lambda_metrics/
[10]: /fr/serverless/forwarder/
[11]: https://docs.datadoghq.com/fr/tracing/
[12]: https://docs.datadoghq.com/fr/integrations/amazon_xray/
[13]: /fr/serverless/distributed_tracing/
[14]: https://docs.datadoghq.com/fr/tracing/setup/nodejs/
[15]: https://docs.datadoghq.com/fr/tracing/setup/python/
[16]: https://docs.datadoghq.com/fr/tracing/setup/ruby/
[17]: /fr/serverless/datadog_lambda_library/
[18]: /fr/tracing/serverless_functions/#tracing-across-aws-lambda-and-hosts
[19]: https://docs.datadoghq.com/fr/tagging/
[20]: /fr/tracing/serverless_functions/#organizing-your-serverless-infrastructure-with-tags
[21]: /fr/serverless/serverless_integrations#aws-step-functions
[22]: /fr/serverless/serverless_integrations#amazon-efs-for-lambda
[23]: /fr/serverless/serverless_integrations#lambda-edge
[24]: /fr/serverless/custom_metrics/#custom-metrics
[25]: /fr/serverless/custom_metrics/#understanding-distribution-metrics
[26]: /fr/serverless/custom_metrics/#tagging-custom-metrics
[27]: /fr/serverless/custom_metrics/#synchronous-vs-asynchronous-custom-metrics
[28]: /fr/serverless/custom_metrics/#enabling-asynchronous-custom-metrics
[29]: /fr/serverless/custom_metrics/#custom-metrics-sample-code
[30]: /fr/serverless/custom_metrics/#running-in-a-vpc
[31]: /fr/serverless/custom_metrics/#using-third-party-libraries
[32]: /fr/serverless/custom_metrics/#deprecated-using-cloudwatch-logs
[33]: /fr/serverless/installation/
[34]: https://docs.datadoghq.com/fr/help/