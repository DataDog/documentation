---
aliases:
  - /fr/integrations/awsses/
categories:
  - cloud
  - Collaboration
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez les e-mails non délivrés, les tentatives d''envoi, les messages rejetés, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ses/'
draft: false
git_integration_title: amazon_ses
has_logo: true
integration_title: Amazon SES
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ses
public_title: "Intégration Datadog/Amazon\_SES"
short_description: 'Surveillez les e-mails non délivrés, les tentatives d''envoi, les messages rejetés, et plus encore.'
version: '1.0'
---
## Présentation

Amazon Simple Email Service (SES) est un service économique d'envoi d'e-mails.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de SES.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `SES` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon SES :

    - `ses:GetSendQuota` : ajoute des métriques sur les quotas d'envoi.
    - `ses:GetSendStatistics` : ajoute des métriques sur les statistiques d'envoi.

    Pour en savoir plus sur les stratégies SES, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS SES][5].

### Collecte de logs

#### Activer le logging

Configurez Amazon SES de façon à ce que ses logs soient envoyés vers un compartiment S3 ou vers Cloudwatch.

**Remarque** : si vous envoyez vos logs vers un compartiment S3, assurez-vous que `amazon_ses` est défini en tant que _Target prefix_.

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez la [fonction Lambda de collecte de logs AWS avec Datadog][6].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 ou sur le groupe de logs Cloudwatch qui contient vos logs Amazon SES dans la console AWS :

    - [Ajouter un déclencheur manuel sur le compartiment S3][7]
    - [Ajouter un déclencheur manuel sur le groupe de logs Cloudwatch][8]

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_ses" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS SES n'inclut aucun événement.

### Checks de service

L'intégration AWS SES n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ses.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_ses
[6]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#set-up-the-datadog-lambda-function
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-s3-buckets
[8]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/?tab=allpermissions#collecting-logs-from-cloudwatch-log-group
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ses/amazon_ses_metadata.csv
[10]: https://docs.datadoghq.com/fr/help/