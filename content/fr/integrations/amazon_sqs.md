---
aliases:
  - /fr/integrations/awssqs/
categories:
  - cloud
  - processing
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez la taille de la file d''attente, la taille moyenne des messages, le nombre de messages, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_sqs/'
draft: false
git_integration_title: amazon_sqs
has_logo: true
integration_title: Amazon SQS
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_sqs
public_title: "Intégration Datadog/Amazon\_SQS"
short_description: 'Surveillez la taille de la file d''attente, la taille moyenne des messages, le nombre de messages, et plus encore.'
version: '1.0'
---
{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="Dashboard SQS" popup="true">}}

## Présentation

La solution Amazon Simple Queue Service (SQS) est un service de file d'attente de messagerie entièrement géré, rapide, fiable et évolutif.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de SQS.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `SQS` est cochée dans la section concernant la collecte des métriques.
2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon SQS :

    - `sqs:ListQueues` : utilisé pour répertorier les files d'attente actives.
    - `tag:GetResources` : récupère les tags personnalisés appliqués aux files d'attente SQS.

    Pour en savoir plus sur les stratégies SQS, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS SQS][5].

### Collecte de logs

#### Activer la journalisation SQS

Consultez la page [Journalisation des appels d'API Amazon SQS à l'aide d'AWS CloudTrail][6] pour configurer votre journal de suivi. Lorsque vous définissez un journal de suivi, sélectionnez un compartiment S3 dans lequel écrire les logs :

{{< img src="integrations/amazon_cloudtrail/cloudtrail_logging.png" alt="Journalisation Cloudtrail" popup="true" style="width:70%;">}}

#### Envoyer des logs à Datadog

1. Si vous ne l'avez pas déjà fait, configurez [la fonction Lambda de collecte de logs AWS avec Datadog][7].
2. Une fois la fonction Lambda installée, ajoutez manuellement un déclencheur sur le compartiment S3 qui contient vos logs d'Amazon SQS dans la console AWS. Dans votre Lambda, cliquez sur S3 dans la liste des déclencheurs :
   {{< img src="integrations/amazon_s3/s3_trigger_configuration.png" alt="Configuration déclencheur S3" popup="true" style="width:70%;">}}
   Configurez votre déclencheur en choisissant le compartiment S3 qui contient vos logs SQS et remplacez le type d'événement par `Object Created (All)`. Cliquez ensuite sur le bouton Add.
   {{< img src="integrations/amazon_s3/s3_lambda_trigger_configuration.png" alt="Configuration déclencheur Lambda S3" popup="true" style="width:70%;">}}

Utilisez ensuite le [Log Explorer de Datadog][8] pour visualiser vos logs.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_sqs" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements

L'intégration AWS SQS n'inclut aucun événement.

### Checks de service

L'intégration AWS SQS n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sqs.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_sqs
[6]: https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/logging-using-cloudtrail.html
[7]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#create-a-new-lambda-function
[8]: https://app.datadoghq.com/logs
[9]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sqs/amazon_sqs_metadata.csv
[10]: https://docs.datadoghq.com/fr/help/