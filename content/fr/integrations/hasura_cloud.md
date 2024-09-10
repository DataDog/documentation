---
assets:
  dashboards:
    Hasura Cloud Datadog Integration Dashboard: assets/dashboards/hasura_cloud.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - monitoring
  - log collection
  - cloud
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/hasura_cloud/README.md
display_name: Hasura Cloud
draft: false
git_integration_title: hasura_cloud
guid: fa26fe8b-6dbf-43fc-9597-a7dd1b56abaa
integration_id: hasura-cloud
integration_title: Hasura Cloud
integration_version: ''
is_public: true
custom_kind: integration
maintainer: support@hasura.io
manifest_version: 1.0.0
metric_prefix: hasura_cloud.
metric_to_check:
  - hasura_cloud.requests_per_minute
  - hasura_cloud.average_execution_time
  - hasura_cloud.success_rate
name: hasura_cloud
public_title: "Intégration Datadog/Hasura\_Cloud"
short_description: Surveillez votre projet Hasura Cloud
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

[Hasura Cloud][1] permet d'obtenir une API GraphQL évolutive, hautement disponible, globalement distribuée, sécurisée et prête pour la production pour vos sources de données.

L'intégration Datadog optimise votre visibilité sur Hasura Cloud en exportant les logs et métriques de votre projet Hasura Cloud vers votre dashboard Datadog.

## Configuration

Pour configurer l'intégration Datadog/Hasura Cloud pour votre projet Hasura Cloud, spécifiez votre clé d'API et votre région Datadog dans Hasura Cloud.

Consultez la [documentation d'Hasura Cloud][2] afin de configurer l'intégration Datadog pour votre projet Hasura Cloud.

Une fois cette première étape effectuée, accédez à la [section Logs][3] de Datadog et créez des facettes pour les champs de premier niveau suivants :

* `operation_name`
* `operation_type`
* `error_code`
* `is_error`

Consultez la [documentation relative aux facettes de logs Datadog][4] pour découvrir comment créer des facettes à partir de logs.

## Données collectées

### Métriques
{{< get-metrics-from-git "hasura_cloud" >}}


### Checks de service

L'intégration Hasura Cloud n'inclut aucun check de service.

### Événements

L'intégration Hasura Cloud n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://hasura.io/cloud/
[2]: https://hasura.io/docs/latest/graphql/cloud/metrics/integrations/datadog.html
[3]: http://app.datadoghq.com/logs
[4]: https://docs.datadoghq.com/fr/logs/explorer/facets/#create-facets
[5]: https://docs.datadoghq.com/fr/help/