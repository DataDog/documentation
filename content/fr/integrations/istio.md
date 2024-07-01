---
app_id: istio
app_uuid: de5b5443-5038-46cf-a052-0484348776d6
assets:
  dashboards:
    Istio Overview 1.5: assets/dashboards/istio_1_5_overview.json
    Istio Overview 1.5 (OpenMetrics): assets/dashboards/istio_1_5_openmetrics_overview.json
    Istio base dashboard: assets/dashboards/istio_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - istio.mixer.process.cpu_seconds_total
      - istio.mesh.request.count
      - istio.galley.endpoint_no_pod
      metadata_path: metadata.csv
      prefix: istio.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Istio
  logs:
    source: istio
  monitors:
    Failed sidecar injections: assets/monitors/failed_sidecar_injection.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data store
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/istio/README.md
display_on_public_website: true
draft: false
git_integration_title: istio
integration_id: istio
integration_title: Istio
integration_version: 4.3.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: istio
public_title: Istio
short_description: Récupérez des métriques de schéma de performance, le débit de requêtes,
  des métriques custom, et plus encore.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Store
  - Category::Log Collection
  configuration: README.md#Setup
  description: Récupérez des métriques de schéma de performance, le débit de requêtes,
    des métriques custom, et plus encore.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Istio
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

#### Envoy

Si vous voulez surveiller les proxies Envoy dans Istio, configurez l'[intégration Envoy][6].

### Configuration

Modifiez le fichier `istio.d/conf.yaml` (dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][7]) pour vous connecter à Istio. Consultez le [fichier d'exemple istio.d/conf.yaml][8] pour découvrir toutes les options de configuration disponibles.

#### Collecte de métriques
Pour surveiller le déploiement `istiod` et `istio-proxy` dans Istio `v1.5+`, deux composants clés contribuent à la collecte des métriques au format Prometheus. Conformément à l'[architecture Istio][9], il s'agit du **plan de données** (les conteneurs sidecar `istio-proxy`) et du **plan de contrôle** (le service `istiod` qui gère les proxies). Ils sont tous les deux exécutés en tant que checks d'Agent `istio`. Toutefois, chacun possède ses responsabilités et est configuré de façon distincte, comme décrit ci-dessous.

##### Configuration du plan de données
Pour surveiller le plan de données Istio, l'Agent comprend un fichier [`istio.d/auto_conf.yaml`][10] permettant de configurer automatiquement la surveillance pour chacun des conteneurs sidecar `istio-proxy`. L'Agent initialise ce check pour chaque conteneur sidecar qu'il détecte automatiquement. Cette configuration active la transmission de métriques `istio.mesh.*` pour les données exposées par chacun de ces conteneurs sidecar.

Pour personnaliser le plan de données de l'intégration, créez un [fichier de configuration][11] équivalent pour Istio. Définissez les valeurs de `ad_identifiers` et de `istio_mesh_endpoint` correctement afin de configurer l'intégration lorsqu'un conteneur sidecar `istio-proxy` est détecté. Référez-vous au fichier [`istio.d/auto_conf.yaml`][10] et à l'[exemple de fichier de configuration][8] fournis pour découvrir toutes les options de configuration disponibles. Lors de la personnalisation, définissez les valeurs de `use_openmetrics: true` et `exclude_labels` comme suit :
```yaml
    exclude_labels:
      - source_version
      - destination_version
      - source_canonical_revision
      - destination_canonical_revision
      - source_principal
      - destination_principal
      - source_cluster
      - destination_cluster
      - source_canonical_service
      - destination_canonical_service
      - source_workload_namespace
      - destination_workload_namespace
      - request_protocol
      - connection_security_policy
```

##### Configuration du plan de contrôle
Pour surveiller le plan de contrôle Istio et transmettre les métriques `mixer`, `galley`, `pilot` et `citadel`, vous devez configurer l'Agent de façon à ce qu'il surveille le déploiement `istiod`. Dans Istio `v1.5+`, appliquez les annotations Autodiscovery suivantes en tant qu'annotations de pod pour le déploiement `istiod` dans l‛espace de nommage `istio-system` :

```yaml
ad.datadoghq.com/discovery.check_names: '["istio"]'
ad.datadoghq.com/discovery.init_configs: '[{}]'
ad.datadoghq.com/discovery.instances: |
     [
       {
         "istiod_endpoint": "http://%%host%%:15014/metrics",
         "use_openmetrics": "true"
       }
     ]
```
La méthode à suivre pour appliquer ces annotations varie en fonction de la [stratégie de déploiement Istio (Istioctl, Helm ou Operator)][12] utilisée. Pour déterminer l'approche à suivre pour appliquer ces annotations de pod, consultez la documentation Istio.

Dans ces annotations, la valeur `<IDENTIFICATEUR_CONTENEUR>` est utilisée pour `discovery`, afin d'appliquer le nom du conteneur par défaut pour les pods du déploiement `istiod`. Si le nom de votre conteneur est différent, ajustez la valeur en conséquence.

##### OpenMetrics V2 et V1
<div class="alert alert-warning">
<b>Remarque importante</b> : lorsque plusieurs instances de Datadog recueillent des métriques Istio, veillez à utiliser la même implémentation d'OpenMetrics pour l'ensemble des instances. Dans le cas contraire, les données des métriques ne seront pas cohérentes sur le site Datadog.
</div>

Lorsque vous activez l'option de configuration `use_openmetrics`, l'intégration Istio utilise l'implémentation OpenMetrics V2 du check.

Dans OpenMetrics V2, les métriques sont envoyées par défaut avec une précision renforcée. De plus, leur comportement est plus proche des types de métriques Prometheus. Par exemple, les métriques Prometheus qui se terminent par `_count` et `_sum` sont envoyées en tant que `monotonic_count` par défaut.

La version 2 d'OpenMetrics corrige des problèmes de performance et de qualité de la version 1. Cette nouvelle version bénéficie notamment de la prise en charge de types de métriques natives, d'une configuration améliorée et de types de métriques custom.

Définissez l'option de configuration `use_openmetrics` sur `false` pour utiliser l'implémentation OpenMetrics V1. Pour découvrir les paramètres de configuration d'OpenMetrics V1, consultez [le fichier `conf.yaml.example`][13].

#### Désactivez l'injection de sidecar pour les pods de l'Agent Datadog

Si vous installez l'[Agent Datadog dans un conteneur][14], Datadog vous recommande de désactiver au préalable l'injection de sidecar Istio.

_Versions d'Istio >= 1.10 :_

Ajoutez l'**étiquette** `sidecar.istio.io/inject: "false"` au DaemonSet `datadog-agent` :

```yaml
# (...)
spec:
  template:
    metadata:
      labels:
        sidecar.istio.io/inject: "false"
    # (...)
```

Vous pouvez également utiliser la commande `kubectl patch`.

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"labels":{"sidecar.istio.io/inject":"false"}}}}}'
```

_Versions d'Istio <= 1.9 :_

Ajoutez l'**annotation** `sidecar.istio.io/inject: "false"` au DaemonSet `datadog-agent` :

```yaml
# (...)
spec:
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
    # (...)
```

Avec la commande `kubectl patch` :

```shell
kubectl patch daemonset datadog-agent -p '{"spec":{"template":{"metadata":{"annotations":{"sidecar.istio.io/inject":"false"}}}}}'
```

#### Collecte de logs

Istio propose deux types de logs : les logs d'accès Envoy recueillis via l'[intégration Envoy][15], ainsi que les [logs Istio][16].

_Disponible à partir des versions > 6.0 de l'Agent_

Consultez les [modèles d'intégration Autodiscovery][4] pour découvrir comment appliquer les paramètres ci-dessous. Par défaut, la collecte des logs est désactivée dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][17].

| Paramètre      | Valeur                                                |
| -------------- | ---------------------------------------------------- |
| `<CONFIG_LOG>` | `{"source": "istio", "service": "<NOM_SERVICE>"}`   |

### Validation

[Lancez la sous-commande `info` de l'Agent][18] et cherchez `istio` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "istio" >}}


### Événements

Le check Istio n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "istio" >}}


## Dépannage

### Erreur « Invalid chunk length »
Si vous rencontrez l'erreur suivante lors de l'implémentation OpenMetricsBaseCheck (V1) d'Istio (intégration d'Istio version `3.13.0` ou antérieure) :

```python
  Error: ("Connection broken: InvalidChunkLength(got length b'', 0 bytes read)",
  InvalidChunkLength(got length b'', 0 bytes read))
```

Utilisez l'implémentation Openmetrics V2 de l'intégration Istio afin de résoudre cette erreur.

Remarque : vous devez effectuer au minimum une mise à niveau vers l'Agent `7.31.0` et Python 3. Consultez la rubrique [Configuration](#configuration) relative à l'activation d'Openmetrics V2.


### Utilisation de l'intégration OpenMetrics générique dans un déploiement Istio

Si l'injection de sidecar proxy Istio est activée, la surveillance d'autres métriques Prometheus à l'aide de l'[intégration Openmetrics][21] par le biais du même endpoint de métriques que `istio_mesh_endpoint` peut engendrer une forte utilisation de métriques custom et la collecte de métriques en double.

Pour veiller à ce que votre configuration OpenMetrics ne recueille pas des métriques redondantes, deux options s'offrent à vous :

1. Utilisez une expression spécifique pour l'option de configuration `metrics`, afin de renvoyer uniquement les métriques pertinentes.
2. Sinon, si vous utilisez le wildcard `*` pour `metrics`, vous pouvez envisager d'utiliser les options d'intégration OpenMetrics suivantes afin d'exclure les métriques déjà prises en charge par les intégrations Istio et Envoy.

#### Configuration d'Openmetrics V2 avec la collecte générique de métriques

Veillez à exclure les métriques Istio et Envoy de votre configuration pour éviter qu'un nombre élevé de métriques custom ne vous soit facturé. Utilisez `exclude_metrics` si vous utilisez la configuration Openmetrics V2 (`openmetrics_endpoint` activé).

```yaml
## Chaque instance est programmée indépendamment des autres.
#
instances:
  - openmetrics_endpoint: <ENDPOINT_OPENMETRICS>
    metrics: [*]
    exclude_metrics:
      - istio_*
      - envoy_*

```

#### Configuration d'Openmetrics V1 (ancienne version) avec la collecte générique de métriques

Veillez à exclure les métriques Istio et Envoy de votre configuration pour éviter qu'un nombre élevé de métriques custom ne vous soit facturé. Utilisez `ignore_metrics` si vous utilisez la configuration Openmetrics V1 (`prometheus_url` activé).

```yaml
instances:
  - prometheus_url: <URL_PROMETHEUS>
    metrics:
      - *
    ignore_metrics:
      - istio_*
      - envoy_*
```

Besoin d'aide ? Contactez [l'assistance Datadog][22].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller votre maillage de services Istio avec Datadog][23]
- [Découvrir comment Datadog recueille des métriques clés pour surveiller Istio][24]
- [Comment surveiller Istio avec Datadog][20]

[1]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[2]: https://docs.datadoghq.com/fr/tracing/setup_overview/proxy_setup/?tab=istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[5]: https://app.datadoghq.com/account/settings#agent
[6]: https://github.com/DataDog/integrations-core/tree/master/envoy#istio
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/conf.yaml.example
[9]: https://istio.io/latest/docs/ops/deployment/architecture/
[10]: https://github.com/DataDog/integrations-core/blob/master/istio/datadog_checks/istio/data/auto_conf.yaml
[11]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=file#configuration
[12]: https://istio.io/latest/docs/setup/install/
[13]: https://github.com/DataDog/integrations-core/blob/7.32.x/istio/datadog_checks/istio/data/conf.yaml.example
[14]: https://docs.datadoghq.com/fr/agent/kubernetes/
[15]: https://docs.datadoghq.com/fr/integrations/envoy/#log-collection
[16]: https://istio.io/v1.4/docs/tasks/observability/logs/collecting-logs/
[17]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[18]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[19]: https://github.com/DataDog/integrations-core/blob/master/istio/metadata.csv
[20]: https://github.com/DataDog/integrations-core/blob/master/istio/assets/service_checks.json
[21]: https://docs.datadoghq.com/fr/integrations/openmetrics/
[22]: https://docs.datadoghq.com/fr/help/
[23]: https://www.datadoghq.com/blog/monitor-istio-with-datadog
[24]: https://www.datadoghq.com/blog/istio-metrics/