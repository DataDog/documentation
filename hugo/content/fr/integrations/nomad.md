---
assets:
  dashboards:
    Nomad Overview: assets/dashboards/overview.json
  metrics_metadata: metadata.csv
  monitors:
    Nomad Excessive Leadership Losses: assets/monitors/nomad_excessive_leadership_losses.json
    Nomad Heartbeats Received: assets/monitors/nomad_heartbeats_received.json
    Nomad Job Is Failing: assets/monitors/nomad_job_is_failing.json
    Nomad No Jobs Running: assets/monitors/nomad_no_jobs_running.json
    Nomad Pending Jobs: assets/monitors/nomad_pending_jobs.json
  service_checks: assets/service_checks.json
categories:
- provisioning
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/nomad/README.md
display_name: Nomad
draft: false
git_integration_title: nomad
guid: 09fec09d-69ef-435f-bb0d-f586652b9bc7
integration_id: nomad
integration_title: Nomad
integration_version: ''
is_public: true
custom_kind: integration
maintainer: irabinovitch
manifest_version: 1.0.0
metric_prefix: nomad
metric_to_check: nomad.client.host.cpu.user
name: nomad
public_title: Intégration Datadog/Nomad
short_description: Planifiez et déployez facilement des applications à n'importe quelle
  échelle
support: contrib
supported_os:
- linux
- mac_os
- windows
---



![Dashboard Nomad][1]

## Présentation

Rassemblez des métriques à partir de vos clusters Nomad pour :

- Visualiser et surveiller les performances de vos clusters
- Envoyer des alertes sur la disponibilité et la santé des clusters

Les monitors recommandés vous permettent de recevoir une notification lorsque différents événements Nomad se produisent.

## Configuration

### Installation

Nomad transmet des métriques à Datadog par l'intermédiaire de DogStatsD. Pour activer l'intégration Nomad, [installez l'Agent Datadog][2] sur chaque client et chaque host du serveur.

### Configuration

Une fois l'installation de l'Agent Datadog effectuée, ajoutez un bloc télémétrie à la configuration Nomad pour vos clients et serveurs :

```conf
telemetry {
  publish_allocation_metrics = true
  publish_node_metrics       = true
  datadog_address = "localhost:8125"
  disable_hostname = true
  collection_interval = "10s"
}
```

Rechargez ou redémarrez ensuite l'Agent Nomad sur chaque host. Les métriques Nomad devraient alors commencer à être envoyées à votre compte Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "nomad" >}}


### Événements

Le check Nomad n'inclut aucun événement.

### Checks de service

Le check Nomad n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/nomad/images/dashboard_overview.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://github.com/DataDog/integrations-extras/blob/master/nomad/metadata.csv
[4]: https://docs.datadoghq.com/fr/help/