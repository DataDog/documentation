---
assets:
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - incidents
  - monitoring
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/cortex/README.md
display_name: cortex
draft: false
git_integration_title: cortex
guid: 3c59d4a9-6f2a-4f86-91e7-84a1a3e4f43b
integration_id: cortex
integration_title: Cortex
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@getcortexapp.com
manifest_version: 1.0.0
metric_prefix: cortex.
metric_to_check: ''
name: cortex
public_title: Cortex
short_description: Créez des incidents Datadog directement depuis le tableau de bord de Cortex.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

L'intégration [Cortex][1] vous permet de déclencher des incidents Datadog directement depuis le tableau de bord de Cortex.

## Configuration

Pour configurer cette intégration, vous devez disposer d'un compte Cortex ainsi que d'une clé d'API et d'une clé d'application Datadog.

### Configuration

1. Contactez Cortex pour bénéficier d'une démonstration si vous n'êtes pas encore client.
2. Créez une [clé d'API Datadog][2].
3. Créez une [clé d'application Datadog][3].
4. Ajoutez la clé d'API et la clé d'application Datadog à l'[intégration Datadog/Cortex][4].

### Validation

1. Accédez à la [page d'accueil de Cortex][5].
2. Cliquez sur un service existant ou [créez-en un][6].
3. Depuis la barre latérale sous « INTEGRATIONS », cliquez sur « See all » et choisissez « Datadog ».
4. Cliquez sur le bouton rouge « Trigger Incident » situé au-dessus de « Incidents ».
5. Entrez les informations demandées dans le formulaire, puis cliquez sur le bouton vert « Trigger Incident ».
6. Le message suivant devrait apparaître : « Incident has been triggered! Click here to see it in Datadog. » (L'incident a bien été généré ! Cliquez ici pour le consulter dans Datadog.)
7. Le nouvel incident devrait également s'afficher dans la section « Incidents ».

## Données collectées

### Métriques

Cortex n'inclut aucune métrique.

### Checks de service

Cortex n'inclut aucun check de service.

### Événements

Cortex n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [support@getcortexapp.com][7].

[1]: https://www.getcortexapp.com/
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#application-keys
[4]: https://app.getcortexapp.com/admin/settings/datadog
[5]: https://app.getcortexapp.com/admin/index
[6]: https://app.getcortexapp.com/admin/service/new
[7]: mailto:support@getcortexapp.com