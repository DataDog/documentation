---
aliases:
- /fr/integrations/awsredshift/
categories:
- aws
- cloud
- data store
- log collection
dependencies: []
description: Surveillez des métriques clés d'Amazon Redshift.
doc_link: https://docs.datadoghq.com/integrations/amazon_redshift/
draft: false
git_integration_title: amazon_redshift
has_logo: true
integration_id: amazon-redshift
integration_title: Amazon Redshift
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_redshift
public_title: Intégration Datadog/Amazon Redshift
short_description: Surveillez des métriques clés d'Amazon Redshift.
version: '1.0'
---

## Présentation

Amazon Redshift est un service d'entrepôt de données entièrement géré qui stocke des pétaoctets de données et simplifie et rentabilise l'analyse de toutes vos données.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Redshift.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans la [page de l'intégration AWS][2], vérifiez que `Redshift` est activé dans l'onglet `Metric Collection`.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon Redshift :

    - `redshift:DescribeClusters` : répertorie tous les clusters Redshift de votre compte.
    - `redshift:DescribeLoggingStatus` : récupère le compartiment S3 au sein duquel sont stockés les logs Redshift.
    - `tag:GetResources` : récupère les tags personnalisés sur vos clusters Redshift.

    Pour en savoir plus, consultez la section relative aux [stratégies Redshift][4] de la documentation AWS.

3. Installez l'[intégration Datadog/AWS Redshift][5].

### Collecte de logs

#### Activer le logging

Commencez par activer la journalisation sur votre cluster Redshift pour recueillir vos logs. Les logs Redshift peuvent être écrits dans un compartiment AWS S3 et [lus par une fonction Lambda][6]. Pour en savoir plus, consultez [Configuration de l'audit à l'aide de la console][7].

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][8] dans votre compte AWS.
2. Une fois la fonction Lambda installée, vous pouvez recueillir vos logs Redshift de deux façons :

    - Solution automatique : les logs Redshift sont automatiquement gérés si vous accordez les autorisations nécessaires à Datadog. Consultez la section [Configurer automatiquement des déclencheurs][9] pour en savoir plus sur la configuration de la collecte automatique de logs sur la fonction Lambda du Forwarder Datadog.
    - Solution manuelle : dans la console AWS, ajoutez un déclencheur sur le compartiment S3 qui contient vos logs Redshift. Consultez les [étapes de l'installation manuelle](#etapes-de-l-installation-manuelle).

#### Étapes de l'installation manuelle

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda du Forwarder Datadog][8] dans votre compte AWS.
2. Une fois configuré, accédez à la fonction Lambda du Forwarder Datadog. Dans la section Présentation de Functions, cliquez sur **Add Trigger**.
3. Sélectionnez le déclencheur **S3** pour la Trigger Configuration.
4. Sélectionnez le compartiment S3 où se trouvent vos logs Redshift.
5. Ne changez pas le type d'événements `All object create events`.
6. Cliquez sur **Add** pour ajouter le déclencheur à votre fonction Lambda.

Accédez au [Log Explorer][10] pour commencer à explorer vos logs.

Pour en savoir plus sur la collecte de logs de services AWS, consultez la section [Envoyer des logs de services AWS avec la fonction Lambda Datadog][11].

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_redshift" >}}


Chacune des métriques récupérées à partir d'AWS se voit assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS Redshift n'inclut aucun événement.

### Checks de service

L'intégration AWS Redshift n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html
[5]: https://app.datadoghq.com/integrations/amazon-redshift
[6]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tabs=awsconsole#collecting-logs-from-s3-buckets
[7]: https://docs.aws.amazon.com/redshift/latest/mgmt/db-auditing-console.html
[8]: https://docs.datadoghq.com/fr/logs/guide/forwarder/
[9]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tabs=awsconsole#automatically-set-up-triggers
[10]: https://app.datadoghq.com/logs
[11]: https://docs.datadoghq.com/fr/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_redshift/amazon_redshift_metadata.csv
[13]: https://docs.datadoghq.com/fr/help/