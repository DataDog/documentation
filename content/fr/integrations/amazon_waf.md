---
aliases:
  - /fr/integrations/awswaf/
categories:
  - cloud
  - security
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: Surveillez le nombre de requêtes autorisées ou bloquées.
doc_link: https://docs.datadoghq.com/integrations/amazon_waf/
draft: false
git_integration_title: amazon_waf
has_logo: true
integration_id: amazon-waf
integration_title: Amazon Web Application Firewall
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_waf
public_title: Intégration Datadog/Amazon Web Application Firewall
short_description: Surveillez le nombre de requêtes autorisées ou bloquées.
version: '1.0'
---
## Présentation

AWS WAF est un pare-feu d'applications Web qui vous aide à protéger vos applications contre les failles Web les plus courantes.

Activez cette intégration pour visualiser dans Datadog vos métriques de WAF.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `WAF` est cochée dans la section concernant la collecte des métriques. Si vous utilisez le nouvel endpoint [WAFV2][3], vérifiez que l'option `WAFV2` est cochée.

2. Installez l'[intégration Datadog/AWS WAF][4].

### Collecte de logs

#### Logs d'audit

Activez les logs d'audit Web Application Firewall pour obtenir des informations détaillées sur le trafic lié à vos contrôles d'accès Web (ACL Web) :

1. Créez un `Amazon Kinesis Data Firehose` dont le nom commence par `aws-waf-logs-`.
2. Dans la destination du `Amazon Kinesis Data Firehose`, choisissez `Amazon S3` et ajoutez le préfixe `waf`.
3. Sélectionnez l'ACL Web souhaité et envoyez ses logs vers le Firehose que vous venez de créer ([étapes détaillées][5]).

Les logs WAF sont recueillis et envoyés vers un compartiment S3.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][6].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 contenant vos logs WAF dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs WAF et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" popup="true" style="width:70%;">}}

**Remarque** : le Forwarder Lambda de Datadog convertit automatiquement les tableaux d'objets imbriqués dans les logs WAF au format `key:value` pour une plus grande facilité d'utilisation.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_waf" >}}


**Remarque** : Datadog recueille les métriques `aws.waf.*` et `waf.*` pour permettre la compatibilité avec l'ancien format des API de métriques CloudWatch pour WAF.

Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS WAF n'inclut aucun événement.

### Checks de service

L'intégration AWS WAF n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][8].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.aws.amazon.com/waf/latest/APIReference/Welcome.html
[4]: https://app.datadoghq.com/account/settings#integrations/amazon_waf
[5]: https://docs.aws.amazon.com/waf/latest/developerguide/logging.html
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#set-up-the-datadog-lambda-function
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_waf/amazon_waf_metadata.csv
[8]: https://docs.datadoghq.com/fr/help/