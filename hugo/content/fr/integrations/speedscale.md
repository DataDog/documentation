---
app_id: speedscale
app_uuid: 35e3ad0c-9189-4453-b3c3-2b4aefa7c176
assets:
  dashboards:
    speedscale: assets/dashboards/SpeedscaleOverview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: speedscale.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10271
    source_type_name: Speedscale
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Speedscale
  sales_email: support@speedscale.com
  support_email: support@speedscale.com
categories:
- containers
- kubernetes
- orchestration
- testing
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/speedscale/README.md
display_on_public_website: true
draft: false
git_integration_title: speedscale
integration_id: speedscale
integration_title: Speedscale
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: speedscale
public_title: Speedscale
short_description: Publiez les résultats d'analyses de trafic Speedscale sur Datadog.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Containers
  - Category::Kubernetes
  - Category::Orchestration
  - Category::Testing
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Publiez les résultats d'analyses de trafic Speedscale sur Datadog.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Speedscale
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->
## Présentation

Cette intégration vous permet de publier les résultats d'analyses de trafic [Speedscale][1] sur la plateforme Datadog. Vous pouvez ainsi étudier simultanément vos données d'observabilité avec les résultats d'une analyse Speedscale précise, afin de déterminer plus facilement la cause à l'origine de vos lenteurs. Identifiez et corrigez des problèmes de performance potentiels avant qu'ils n'impactent vos environnements de production grâce à l'intégration Datadog/Speedscale.

## Formule et utilisation

### Dépannage de la solution Browser

1. Pour utiliser cette intégration, vous avez besoin d'une [clé d'API][2] Datadog afin d'envoyer des événements à Datadog.

    Il est recommandé d'enregistrer la valeur de votre clé d'API au sein d'une variable d'environnement. Dans la majorité des cas, cette variable d'environnement sera stockée dans votre système d'intégration continue. Toutefois, si vous effectuez un test ponctuel, utilisez la commande suivante pour accéder à la clé d'API depuis votre terminal :

   ```
   export DDOG_API_KEY=0
   ```

2. Récupérez l'ID du rapport que vous souhaitez importer dans Datadog. Pour un environnement de CI, utilisez l'ID de rapport associé au hash de votre commit. Stockez cet ID au sein d'une variable d'environnement :

   ```
   export SPD_REPORT_ID=0
   ```

3. Après avoir récupéré l'ID d'un rapport spécifique et votre clé d'API Datadog, exécutez la commande `speedctl` pour exporter le rapport de l'analyse de trafic sous la forme d'un événement Datadog.

   ```
   speedctl export datadog ${SPD_REPORT_ID} --apiKey ${DDOG_API_KEY}
   {"status":"ok",...}
   ```
### Validation

Consultez le [flux d'événements][2] Datadog pour passer en revue votre rapport exporté.

## Real User Monitoring

### Analyse d'entonnoirs

Speedscale n'inclut aucune métrique.

### Aide

Speedscale n'inclut aucun check de service.

### Aide

L'intégration Speedscale envoie des événements à votre [flux d'événements Datadog][3] à la fin d'une analyse de trafic. Vous pouvez ainsi déterminer plus facilement l'incidence du trafic sur vos métriques.

## Aide

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://docs.speedscale.com/reference/integrations/datadog/
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[3]: https://app.datadoghq.com/event/stream
[4]: https://docs.datadoghq.com/fr/help/