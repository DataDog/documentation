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
description: 'Surveillez la taille de file d''attente, la taille moyenne des messages, le nombre de messages, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_sqs/'
git_integration_title: amazon_sqs
has_logo: true
integration_title: "AWS\_SQS"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_sqs
public_title: "Intégration Datadog/AWS\_SQS"
short_description: 'Surveillez la taille de file d''attente, la taille moyenne des messages, le nombre de messages, et plus encore. more.'
version: '1.0'
---
{{< img src="integrations/amazon_sqs/sqsdashboard.png" alt="Dashboard SQS" responsive="true" popup="true">}}

## Présentation

La solution Amazon Simple Queue Service (SQS) est un service de file d'attente de messagerie entièrement géré, rapide, fiable et évolutif.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de SQS.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `SQS` est cochée dans la section concernant la collecte des métriques.

2. Ajoutez ces autorisations à votre [stratégie IAM Datadog][3] afin de recueillir des métriques d'Amazon SQS :

    * `sqs:ListQueues` : utilisé pour répertorier les files d'attente actives.
    * `tag:GetResources` : récupère les tags personnalisés appliqués aux files d'attente SQS.

    Pour en savoir plus sur les stratégies SQS, consultez [la documentation disponible sur le site d'AWS][4].

3. Installez l'[intégration Datadog/AWS SQS][5].


## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_sqs" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS SQS n'inclut aucun événement.

### Checks de service
L'intégration AWS SQS n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/#installation
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sqs.html
[5]: https://app.datadoghq.com/account/settings#integrations/amazon_sqs
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_sqs/amazon_sqs_metadata.csv
[7]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}