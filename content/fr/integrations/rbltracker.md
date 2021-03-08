---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/rbltracker/README.md'
display_name: RBLTracker
draft: false
git_integration_title: rbltracker
guid: 94218bd0-8cc3-4686-8b67-ea9110b77092
integration_id: rbltracker
integration_title: RBLTracker
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.1
metric_prefix: ''
metric_to_check: ''
name: rbltracker
public_title: Intégration Datadog/RBLTracker
short_description: RBLTracker permet la surveillance simple et en temps réel de listes noires.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

RBLTracker permet la surveillance simple et en temps réel de listes noires pour votre boîte de messagerie, votre site Web et vos réseaux sociaux.

Associez votre compte [RBLTracker][1] à Datadog pour :

- Envoyer les événements d'ajout à une liste de RBLTracker vers votre dashboard.
- Envoyer les événements de suppression d'une liste de RBLTracker vers votre dashboard.

## Configuration

Pour configurer RBLTracker à l'aide de Webhooks :

1. Dans Datadog, [copiez votre clé d'API][2] depuis la section **Integrations -> APIs**.
2. Dans [RBLTracker][1], créez un nouveau type de contact Datadog depuis la section **Manage -> Contacts** du portail de RBLTracker.
3. Collez la **clé d'API** Datadog.
4. (Facultatif) ajustez la fréquence de contact pour ce nouveau contact.

RBLTracker enverra les alertes d'ajout à une liste et de suppression d'une liste vers votre dashboard d'événements Datadog. Cliquez [ici][3] pour consulter le guide d'intégration complet (en anglais).

## Données collectées

### Métriques

Le check RBLTracker n'inclut aucune métrique.

### Événements

Envoie vos événements d'ajout à une liste et de suppression d'une liste vers votre [flux d'événements Datadog][4].

### Checks de service

Le check RBLTracker n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://rbltracker.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://rbltracker.com/docs/adding-a-datadog-contact-type
[4]: https://docs.datadoghq.com/fr/events/
[5]: https://docs.datadoghq.com/fr/help/