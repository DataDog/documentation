---
assets:
  dashboards:
    PerimeterX Overview: assets/dashboards/PerimeterX_Bot_Defender_Dashboard.json
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - security
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/perimeterx/README.md'
display_name: PerimeterX
draft: true
git_integration_title: perimeterx
guid: 6e3a9bc2-6766-4b24-9edf-12811d821d41
integration_id: perimeterx
integration_title: PerimeterX
is_beta: false
is_public: false
kind: integration
maintainer: support@perimeterx.com
manifest_version: 1.0.0
metric_prefix: perimeterx.
metric_to_check: ''
name: perimeterx
public_title: Intégration Datadog/PerimeterX
short_description: Intégrez les logs et métriques de PerimeterX à Datadog
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Cette intégration permet aux clients de [PerimeterX][https://www.perimeterx.com/] d'envoyer leurs logs et événements PerimeterX à Datadog.

## Configuration

Toute la configuration est prise en charge par PerimeterX. Consultez la [documentation de PerimeterX][1] relative aux intégrations tierces.

### Installation

Aucune installation n'est requise sur votre host.

### Configuration

1. Générez une nouvelle clé d'API d'intégration depuis votre [portail Datadog][2]
2. Ouvrez un ticket d'assistance auprès de [PerimeterX][3] et demandez l'intégration de l'exportation des logs Datadog. L'assistance aura besoin des informations suivantes :
   - Votre clé d'API d'intégration Datadog
   - Une précision des éléments à envoyer (métriques et/ou logs)
   - Les ID d'application PerimeterX à envoyer à Datadog

### Validation

Après confirmation par l'assistance de PerimeterX que l'intégration avec Datadog a bien été effectuée, procédez comme suit pour vérifier que tout fonctionne correctement :

1. Connectez-vous à votre portail Datadog.
2. Accédez à Logs -> Search
3. Effectuez une recherche avec le filtre de requête "Source:perimeterx".
4. Confirmez que vous recevez les logs de PerimeterX (il se peut que les logs mettent quelques minutes à apparaître).

## Données collectées

### Métriques

PerimeterX n'inclut aucune métrique pour les [requêtes][4].

### Checks de service

PerimeterX n'inclut aucun check de service.

### Événements

PerimeterX n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.perimeterx.com/pxconsole/docs/data-integration-to-third-party-apps
[2]: https://app.datadoghq.com/account/settings#api
[3]: mailto:support@perimeterx.com
[4]: https://docs.perimeterx.com/pxconsole/docs/data-schema-metrics
[5]: https://docs.datadoghq.com/fr/help/