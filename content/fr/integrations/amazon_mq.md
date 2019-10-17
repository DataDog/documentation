---
aliases:
  - /fr/integrations/awsmq/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'AWS\_MQ."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_mq/'
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-amazonmq-metrics-with-datadog'
    tag: Blog
    text: "Surveiller les métriques d'Amazon\_MQ avec Datadog"
git_integration_title: amazon_mq
has_logo: true
integration_title: "Amazon\_MQ"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_mq
public_title: "Intégration Datadog/Amazon\_MQ"
short_description: Surveillez des métriques clés d'AWS Amazon MQ.
version: '1.0'
---
## Présentation

Amazon MQ est un service d'agent de messages géré pour Apache ActiveMQ qui facilite la configuration et l'utilisation des agents de messages dans le cloud.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'Amazon MQ.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `MQ` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS Amazon MQ][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_mq" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Amazon MQ n'inclut aucun événement.

### Checks de service
L'intégration AWS Amazon MQ n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_mq
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_mq/amazon_mq_metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}