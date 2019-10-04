---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/istio/README.md'
description: L'intégration Istio recueille des données à partir du mélangeur et du maillage du service Istio.
display_name: Istio
git_integration_title: istio
guid: d8bd53c0-0884-4357-9517-11858bf6aa9d
integration_id: istio
integration_title: Istio
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: istio.
metric_to_check: istio.mixer.process.cpu_seconds_total
name: istio
public_title: Intégration Datadog/Istio
short_description: 'Récupérez des métriques de schéma de performance, le débit de requêtes, des métriques custom, et plus encore. and more.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Utilisez l'Agent Datadog pour surveiller les performances d'Istio.

* Recueillez des métriques sur les applications et les types de requêtes transmises.
* Étudiez l'utilisation de la bande passante par les applications.
* Découvrez la consommation de ressources d'Istio.

## Implémentation

### Installation

Istio est intégré à l'Agent Datadog. Il vous suffit donc d'[installer l'Agent][1] sur vos serveurs Istio ou dans votre cluster et de le rediriger vers Istio.

### Configuration

#### Connecter l'Agent

Modifiez le fichier `istio.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][2] pour l'associer à Istio. Consultez le [fichier d'exemple istio.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles :

```
init_config:

instances:
  - istio_mesh_endpoint: http://istio-telemetry.istio-system:42422/metrics
    mixer_endpoint: http://istio-telemetry.istio-system:15014/metrics
    galley_endpoint: http://istio-galley.istio-system:15014/metrics
    pilot_endpoint: http://istio-pilot.istio-system:15014/metrics
    send_histograms_buckets: true
```

Les deux premiers endpoints sont requis pour garantir le fonctionnement du check. Consultez la [documentation Istio][4] (en anglais) pour en savoir plus sur l'adaptateur Prometheus.

### Validation

[Lancez la sous-commande `info` de l'Agent][5] et cherchez `istio` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "istio" >}}


### Événements
Le check Istio n'inclut aucun événement.

### Checks de service
Le check Istio n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][7].

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

- [Surveiller le maillage de votre service Istio avec Datadog][8]

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[4]: https://istio.io/docs/tasks/telemetry/metrics/querying-metrics
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[7]: https://docs.datadoghq.com/fr/help
[8]: https://www.datadoghq.com/blog/monitor-istio-with-datadog


{{< get-dependencies >}}