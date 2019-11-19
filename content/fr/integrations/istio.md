---
assets:
  dashboards:
    Istio base dashboard: assets/dashboards/istio_overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
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
* Visualisez les ressources consommées par Istio

## Implémentation

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Istio est intégré à l'Agent Datadog. [Installez l'Agent Datadog][2] sur vos serveurs Istio ou dans votre cluster et connectez-le à Istio.

### Configuration

Modifiez le fichier `istio.d/conf.yaml` (dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour connecter l'Agent à Istio. Consultez le [fichier d'exemple istio.d/conf.yaml][4]) pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

Ajoutez ce bloc de configuration à votre fichier `istio.d/conf.yaml` pour commencer à recueillir vos métriques Istio :

```
init_config:

instances:
  - istio_mesh_endpoint: http://istio-telemetry.istio-system:42422/metrics
    mixer_endpoint: http://istio-telemetry.istio-system:15014/metrics
    galley_endpoint: http://istio-galley.istio-system:15014/metrics
    pilot_endpoint: http://istio-pilot.istio-system:15014/metrics
    citadel_endpoint: http://istio-citadel.istio-system:15014/metrics
    send_histograms_buckets: true
```

Chaque endpoint est facultatif, mais au moins l'un d'eux doit être configuré. Consultez la [documentation Istio][5] pour en savoir plus sur l'adaptateur Prometheus.

##### Désactiver l'injection de sidecar

Si vous installez l'[Agent Datadog dans un conteneur][10], Datadog vous conseille de désactiver l'injection de sidecar d'Istio au préalable.

Ajoutez l'annotation `sidecar.istio.io/inject: "false"` au DaemonSet `datadog-agent` :

```
...
spec:
  ...
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
    ...
```

Vous pouvez également utiliser la commande `kubectl patch`.

```
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### Collecte de logs

Istio contient deux types de logs : les logs d'accès Envoy recueillis via l'[intégration Envoy][12], ainsi que les [logs Istio][11].

**Disponible à partir des versions > 6.0 de l'Agent**

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans votre [configuration daemonSet][4] :

    ```
      (...)
        env:
          (...)
          - name: DD_LOGS_ENABLED
              value: "true"
          - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
              value: "true"
      (...)
    ```

2. Assurez-vous que le socket Docker est monté sur l'Agent Datadog comme dans [ce manifeste][5]. Si vous n'utilisez pas Docker, montez le répertoire `/var/log/pods`.

3. [Redémarrez l'Agent][2].


### Validation

[Lancez la sous-commande `info` de l'Agent][6] et cherchez `istio` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "istio" >}}


### Événements
Le check Istio n'inclut aucun événement.

### Checks de service
Le check Istio n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][8].

## Pour aller plus loin
Documentation, liens et articles supplémentaires utiles :

- [Surveiller votre maillage de services Istio avec Datadog][9]

[1]: https://docs.datadoghq.com/fr/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[5]: https://istio.io/docs/tasks/telemetry/metrics/querying-metrics
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[8]: https://docs.datadoghq.com/fr/help
[9]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[10]: https://docs.datadoghq.com/fr/agent/kubernetes
[11]: https://istio.io/docs/tasks/telemetry/logs/collecting-logs/
[12]: https://docs.datadoghq.com/fr/integrations/envoy/#log-collection


{{< get-dependencies >}}