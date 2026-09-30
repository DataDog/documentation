---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - notification
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/split/README.md'
display_name: Split
draft: false
git_integration_title: split
guid: 2c48dd0b-418f-4ca7-9b8d-54c857587db4
integration_id: split
integration_title: Split
is_public: true
custom_kind: integration
maintainer: jeremy-lq
manifest_version: 1.0.0
name: split
public_title: Intégration Datadog/Split
short_description: Plateforme d'expérimentation de fonctionnalités pour équipes d'ingénierie et de conception produit.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[Split][1] est une plateforme de gestion des [déploiements contrôlés][2] conçue pour aider les entreprises de toute taille à assurer une expérience utilisateur exceptionnelle et à réduire les risques en fournissant un moyen simple et sécurisé de déployer des fonctionnalités de façon dynamique.

Intégrez Split à Datadog pour :

- Voir les changements de fonctionnalités en contexte en incluant les changelogs Split dans votre flux d'événements
- Corréler l'impact des fonctionnalités avec les performances des applications
- Prévenir les problèmes critiques avant qu'ils ne se produisent en désactivant les fonctionnalités de façon proactive en fonction des métriques et alertes Datadog

## Configuration

- **Dans Datadog** : créez une clé d'API <span class="hidden-api-key">\${api_key}</span>.

- **Dans Split** : accédez à **Admin Settings**, cliquez sur **Integrations** et accédez au Marketplace. Cliquez sur l'option Add correspondant à Datadog.<br/>

![Capture d'écran de Split][3]

- Collez votre clé d'API Datadog et cliquez sur l'option Save.

![Capture d'écran de Split][4]

Les données Split devraient maintenant être transmises à Datadog.

## Données collectées

### Métriques

Le check Split n'inclut aucune métrique.

### Événements

Envoyez vos événements d'ajout à une liste et de suppression d'une liste Split vers votre [flux d'événements Datadog][5].

### Checks de service

Le check Split n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: http://www.split.io
[2]: http://www.split.io/articles/controlled-rollout
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/in-split.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/split/images/integrations-datadog.png
[5]: https://docs.datadoghq.com/fr/events/
[6]: https://docs.datadoghq.com/fr/help/