---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez les métriques clés d'Amazon\_Inspector."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_inspector/'
git_integration_title: amazon_inspector
has_logo: true
integration_title: "Amazon\_Inspector"
is_public: true
kind: Lighthouse
manifest_version: 1
name: amazon_inspector
public_title: "Intégration Datadog/Amazon\_Inspector"
short_description: "Surveillez les métriques clés d'Amazon\_Inspector."
version: 1
---
## Présentation
Amazon Inspector est un service d'évaluation pour la vulnérabilité de la sécurité qui permet de renforcer la sécurité et la conformité des ressources déployées sur AWS

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d’Inspector.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Inspector` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Inspector][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_inspector" >}}


### Événements
L'intégration Amazon Inspector n'inclut aucun événement.

### Checks de service
L'intégration Amazon Inspector n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-inspector
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_inspector/amazon_inspector_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}