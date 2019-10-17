---
aliases:
  - /fr/integrations/awsopsworks/
categories:
  - cloud
  - provisioning
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez l'utilisation des ressources AWS\_OpsWorks."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ops_works/'
git_integration_title: amazon_ops_works
has_logo: true
integration_title: "Amazon\_OpsWorks"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ops_works
public_title: "Intégration Datadog/Amazon\_OpsWorks"
short_description: "Surveillez l'utilisation des ressources AWS\_OpsWorks."
version: '1.0'
---
## Présentation

AWS OpsWorks est un service de gestion d'applications qui facilite le déploiement et l'exploitation d'applications de tout type et de toute taille.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'OpsWorks.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].
### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `OpsWorks` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS OpsWork][3].


## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ops_works" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS OpsWork n'inclut aucun événement.

### Checks de service
L'intégration AWS OpsWork n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_ops_works
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ops_works/amazon_ops_works_metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}