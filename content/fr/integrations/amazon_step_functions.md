---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Step\_Functions."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_step_functions/'
git_integration_title: amazon_step_functions
has_logo: true
integration_title: "Amazon\_Step\_Functions"
is_public: true
kind: integration
manifest_version: 1
name: amazon_step_functions
public_title: "Intégration Datadog/Amazon\_Step\_Functions"
short_description: "Surveillez des métriques clés d'Amazon\_Step\_Functions."
version: 1
---
## Présentation
Amazon Step Functions (états) vous permet de coordonner les composants d'applications distribuées et de microservices à l'aide de workflows visuels.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Step Functions.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Step Functions` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Step Functions][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_step_functions" >}}


### Événements
L'intégration Amazon Step Functions n'inclut aucun événement.

### Checks de service
L'intégration Amazon Step Functions n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-step-functions
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_step_functions/amazon_step_functions_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}