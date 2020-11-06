---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Istio Overview 1.5: assets/dashboards/istio_1_5_overview.json
    Istio base dashboard: assets/dashboards/istio_overview.json
  logs:
    source: istio
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/istio/README.md'
description: L'intégration Istio recueille des données à partir du mixer et du maillage de services Istio.
display_name: Istio
draft: false
git_integration_title: istio
guid: d8bd53c0-0884-4357-9517-11858bf6aa9d
integration_id: istio
integration_title: Istio
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: istio.
metric_to_check:
  - istio.mixer.process.cpu_seconds_total
  - istio.mesh.request.count
  - istio.galley.endpoint_no_pod
name: istio
public_title: Intégration Datadog/Istio
short_description: 'Récupérez des métriques de schéma de performance, le débit de requêtes, des métriques custom, et plus encore.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Utilisez l'Agent Datadog pour surveiller les performances d'Istio.

- Recueillez des métriques sur les applications et les types de requêtes transmises.
- Étudiez l'utilisation de la bande passante par les applications.
- Visualisez les ressources consommées par Istio

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Istio est intégré à l'Agent Datadog. [Installez l'Agent Datadog][2] sur vos serveurs Istio ou dans votre cluster et connectez-le à Istio.

### Configuration

Modifiez le fichier `istio.d/conf.yaml` (dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][3] pour connecter l'Agent à Istio. Consultez le [fichier d'exemple istio.d/conf.yaml][4]) pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

Ajoutez l'un des blocs de configuration ci-dessous à votre fichier `istio.d/conf.yaml` pour commencer à recueillir des métriques Istio pour votre version prise en charge :

1. Pour surveiller le déploiement `istiod` dans Istio `v1.5+`, utilisez la configuration suivante :

    ```yaml
    init_config:

    instances:
      - istiod_endpoint: http://istiod.istio-system:15014/metrics
    ```

   Pour surveiller des métriques de maillage Istio, continuez à utiliser `istio_mesh_endpoint`. Les métriques de maillage Istio sont désormais uniquement disponibles à partir des conteneurs `istio-proxy`, qui sont directement pris en charge via Autodiscovery. Référez-vous à [`istio.d/auto_conf.yaml`][5].

   **Remarque** : veillez à bien activer la [version 1 de la télémétrie][6] pour Istio `v1.6` ou ultérieur de façon à recueillir les métriques de maillage.

2. Pour surveiller Istio `v1.4` ou une version antérieure, utilisez la configuration suivante :
    ```yaml
    init_config:

    instances:
      - istio_mesh_endpoint: http://istio-telemetry.istio-system:42422/metrics
        mixer_endpoint: http://istio-telemetry.istio-system:15014/metrics
        galley_endpoint: http://istio-galley.istio-system:15014/metrics
        pilot_endpoint: http://istio-pilot.istio-system:15014/metrics
        citadel_endpoint: http://istio-citadel.istio-system:15014/metrics
        send_histograms_buckets: true
    ```

Chaque endpoint est facultatif, mais au moins l'un d'eux doit être configuré. Consultez la [documentation Istio][7] pour en savoir plus sur l'adaptateur Prometheus.

Remarque : l'étiquette Prometheus `connectionID` est exclue.

##### Désactiver l'injection de sidecar

Si vous installez l'[Agent Datadog dans un conteneur][8], Datadog vous conseille de désactiver l'injection de sidecar d'Istio au préalable.

Ajoutez l'annotation `sidecar.istio.io/inject: "false"` au DaemonSet `datadog-agent` :

```yaml
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

```text
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### Collecte de logs

Istio contient deux types de logs : les logs d'accès Envoy recueillis via l'[intégration Envoy][9], ainsi que les [logs Istio][10].

_Disponible à partir des versions > 6.0 de l'Agent_

Consultez les [modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous.
La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][11].

| Paramètre      | Valeur                                                |
| -------------- | ---------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "istio", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande `info` de l'Agent][12] et cherchez `istio` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "istio" >}}


### Événements

Le check Istio n'inclut aucun événement.

### Checks de service

Pour Istio `1.5` ou une version ultérieure :

**istio.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques. Si ce n'est pas le cas, renvoie `OK`.

Pour toutes les autres versions d'Istio :

**istio.pilot.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques. Si ce n'est pas le cas, renvoie `OK`.

**istio.galley.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques. Si ce n'est pas le cas, renvoie `OK`.

**istio.citadel.prometheus.health** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à se connecter aux endpoints de métriques. Si ce n'est pas le cas, renvoie `OK`.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][14].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller votre maillage de services Istio avec Datadog][15]
- [Découvrir comment Datadog recueille des métriques clés pour surveiller Istio][16]

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[6]: https://istio.io/latest/docs/tasks/observability/mixer/metrics/collecting-metrics/#before-you-begin
[7]: https://istio.io/docs/tasks/telemetry/metrics/querying-metrics
[8]: https://docs.datadoghq.com/fr/agent/kubernetes/
[9]: https://docs.datadoghq.com/fr/integrations/envoy/#log-collection
[10]: https://istio.io/docs/tasks/telemetry/logs/collecting-logs/
[11]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[12]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[14]: https://docs.datadoghq.com/fr/help/
[15]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[16]: https://www.datadoghq.com/blog/istio-metrics/