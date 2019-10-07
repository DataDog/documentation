---
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_Translate."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_translate/'
git_integration_title: amazon_translate
has_logo: true
integration_title: Amazon Translate
is_public: true
kind: integration
manifest_version: 1
name: amazon_translate
public_title: "Intégration Datadog/Amazon\_Translate"
short_description: "Surveillez des métriques clés d'Amazon\_Translate."
version: 1
---
## Présentation
Amazon Translate est un service de traduction par machine neurale pour la traduction de texte de l'anglais ou vers l'anglais sur un ensemble de langues prises en charge.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Translate.

## Implémentation
### Installation
Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques
1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Translate` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/Amazon Translate][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_translate" >}}


### Événements
L'intégration Amazon Translate n'inclut aucun événement.

### Checks de service
L'intégration Amazon Translate n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-translate
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_translate/amazon_translate_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}