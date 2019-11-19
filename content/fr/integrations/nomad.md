---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - provisioning
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/nomad/README.md'
display_name: Nomad
git_integration_title: nomad
guid: 09fec09d-69ef-435f-bb0d-f586652b9bc7
integration_id: nomad
integration_title: Nomad
is_public: true
kind: integration
maintainer: irabinovitch
manifest_version: 1.0.0
metric_prefix: nomad
metric_to_check: nomad.client.host.cpu.user
name: nomad
public_title: Intégration Datadog/Nomad
short_description: Planifier et déployer facilement des applications à n'importe quelle échelle
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Rassemblez des métriques à partir de vos clusters Nomad pour :

* Visualiser et surveiller les performances de vos clusters
* Envoyer des alertes sur la disponibilité et la santé des clusters

## Implémentation

### Installation

Nomad transmet des métriques à Datadog via DogStatsD. Pour activer l'intégration Nomad, [installez l'Agent Datadog][1] sur chaque client et chaque host du serveur.

### Configuration

Une fois l'installation de l'Agent Datadog effectuée, ajoutez une strophe de télémétrie à la configuration Nomad pour vos clients et serveurs :

```
telemetry {
  publish_allocation_metrics = true
  publish_node_metrics       = true
  datadog_address = "localhost:8125"
  disable_hostname = true
  collection_interval = "10s"
}
```

Rechargez ou redémarrez ensuite l'agent Nomad sur chaque host. Les métriques Nomad devraient alors commencer à être envoyées à votre compte Datadog.

## Données collectées
### Métriques
{{< get-metrics-from-git "nomad" >}}


### Événements
Le check Nomad n'inclut aucun événement.

### Checks de service
Le check Nomad n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://github.com/DataDog/integrations-extras/blob/master/nomad/metadata.csv
[3]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}