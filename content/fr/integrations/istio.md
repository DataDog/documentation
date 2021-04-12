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
  monitors:
    Failed sidecar injections: assets/monitors/failed_sidecar_injection.json
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

Datadog surveille chaque aspect de votre environnement Istio, afin que vous puissiez :
- Évaluer la santé d'Envoy et du plan de contrôle Istio grâce aux logs ([voir ci-dessous](#collecte-de-logs))
- Consulter en détail les performances de votre maillage de services avec des métriques sur les requêtes, la bande passante et la consommation de ressources ([voir ci-dessous](#metriques)).
- Mapper les communications réseau entre les conteneurs, pods et services sur le maillage avec la solution [Network Performance Monitoring][1]
- Plonger au cœur des traces distribuées pour les applications qui effectuent des transactions sur le maillage avec l'[APM][2]

Pour en savoir plus sur la surveillance de votre environnement Istio avec Datadog, [consultez l'article du blog à ce sujet][3] (en anglais).

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][4] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

Istio est fourni avec l'Agent Datadog. [Installez l'Agent Datadog][5] sur vos serveurs Istio ou dans votre cluster et pointez-le vers Istio.

### Configuration

Modifiez le fichier `istio.d/conf.yaml` (dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][6] pour vous connecter à Istio. Consultez le [fichier d'exemple istio.d/conf.yaml][7]) pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques

Ajoutez l'un des blocs de configuration ci-dessous à votre fichier `istio.d/conf.yaml` pour commencer à recueillir des métriques Istio pour votre version prise en charge :

1. Pour surveiller le déploiement `istiod` dans Istio `v1.5+`, utilisez la configuration suivante :

    ```yaml
    init_config:

    instances:
      - istiod_endpoint: http://istiod.istio-system:15014/metrics
    ```

   Pour surveiller des métriques de maillage Istio, continuez à utiliser `istio_mesh_endpoint`. Les métriques de maillage Istio sont désormais uniquement disponibles sur les conteneurs `istio-proxy`, qui sont directement pris en charge via Autodiscovery. Référez-vous au fichier [`istio.d/auto_conf.yaml`][8].

   **REMARQUE** : veillez à bien activer la [version 1 de la télémétrie][9] pour Istio `v1.6` ou les versions ultérieures de façon à recueillir les métriques de maillage.

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

Chaque endpoint est facultatif, mais vous devez configurer au moins l'un des deux. Consultez la [documentation Istio][10] (en anglais) pour en savoir plus sur l'adaptateur Prometheus.

Remarque : l'étiquette Prometheus `connectionID` est exclue.

##### Désactivez l'injection de sidecar pour les pods de l'Agent Datadog

Si vous installez l'[Agent Datadog dans un conteneur][11], nous vous conseillons de désactiver au préalable l'injection de sidecar d'Istio.

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

Istio contient deux types de logs : les logs d'accès Envoy recueillis via l'[intégration Envoy][12], ainsi que les [logs Istio][13].

_Disponible à partir des versions > 6.0 de l'Agent_

Consultez les [modèles d'intégration Autodiscovery][4] pour découvrir comment appliquer les paramètres ci-dessous. Par défaut, la collecte des logs est désactivée dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][14].

| Paramètre      | Valeur                                                |
| -------------- | ---------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "istio", "service": "<NOM_SERVICE>"}` |

### Validation

[Lancez la sous-commande `info` de l'Agent][15] et cherchez `istio` dans la section Checks.

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

Besoin d'aide ? Contactez [l'assistance Datadog][17].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller votre maillage de services Istio avec Datadog][18]
- [Découvrir comment Datadog recueille des métriques clés pour surveiller Istio][19]
- [Comment surveiller Istio avec Datadog][3]

[1]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[2]: https://docs.datadoghq.com/fr/tracing/setup_overview/proxy_setup/?tab=istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[8]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[9]: https://istio.io/v1.1/docs/tasks/telemetry/
[10]: https://istio.io/docs/tasks/telemetry/metrics/querying-metrics
[11]: https://docs.datadoghq.com/fr/agent/kubernetes/
[12]: https://docs.datadoghq.com/fr/integrations/envoy/#log-collection
[13]: https://istio.io/docs/tasks/telemetry/logs/collecting-logs/
[14]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[15]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[16]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[17]: https://docs.datadoghq.com/fr/help/
[18]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[19]: https://www.datadoghq.com/blog/istio-metrics/