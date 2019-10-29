---
aliases:
  - /fr/integrations/awsebs/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: 'Surveillez l''âge des snapshots, l''IOPS, les durées de lecture/écriture, et plus encore.'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ebs/'
git_integration_title: amazon_ebs
has_logo: true
integration_title: "Amazon\_Elastic\_Block\_Store"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ebs
public_title: "Intégration Datadog/Amazon\_Elastic\_Block\_Store"
short_description: 'Surveillez l''âge des snapshots, l''IOPS, les durées de lecture/écriture, et plus encore.'
version: '1.0'
---
## Présentation

Amazon EBS fournit des volumes de stockage permanent en mode bloc à utiliser avec les instances Amazon EC2 dans le cloud AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'EBS.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `EBS` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS EBS][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ebs" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS EBS n'inclut aucun événement.

### Checks de service
L'intégration AWS EBS n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

## Pour aller plus loin

* [Métriques clés pour la surveillance d'Amazon EBS][6]
* [Collecte des métriques d'Amazon EBS][7]
* [Surveillance des volumes d'Amazon EBS avec Datadog][8]

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_ebs
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ebs/amazon_ebs_metadata.csv
[5]: https://docs.datadoghq.com/fr/help
[6]: https://www.datadoghq.com/blog/amazon-ebs-monitoring
[7]: https://www.datadoghq.com/blog/collecting-amazon-ebs-metrics
[8]: https://www.datadoghq.com/blog/monitoring-amazon-ebs-volumes-with-datadog


{{< get-dependencies >}}