---
aliases: []
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    CoreDNS: assets/dashboards/coredns.json
  logs:
    source: coredns
  metrics_metadata: metadata.csv
  monitors:
    '[CoreDNS] Cache hits count low': assets/monitors/coredns_cache_hits_low.json
    '[CoreDNS] Request duration high': assets/monitors/coredns_request_duration_high.json
  service_checks: assets/service_checks.json
categories:
- containers
- network
- autodiscovery
- log collection
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/coredns/README.md
display_name: CoreDNS
draft: false
git_integration_title: coredns
guid: 9b316155-fc8e-4cb0-8bd5-8af270759cfb
integration_id: coredns
integration_title: CoreDNS
integration_version: 2.2.0
is_public: true
custom_kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: coredns.
metric_to_check: coredns.request_count
name: coredns
public_title: Intégration Datadog/CoreDNS
short_description: CoreDNS recueille des métriques relatives au DNS dans Kubernetes.
support: core
supported_os:
- linux
---



## Présentation

Recueillez des métriques de CoreDNS en temps réel pour visualiser et surveiller les échecs de DNS et les hits et miss de cache.

## Configuration

### Installation

Le check CoreDNS est inclus avec le paquet de l'[Agent Datadog][1] : vous n'avez donc rien d'autre à installer sur vos serveurs.

**Note** : la version actuelle du check (1.11.0+) utilise [OpenMetrics][2] (OpenMetricsBaseCheckV2) pour la collecte de métriques, ce qui nécessite Python 3. Si votre host ne peut pas utiliser Python 3, ou si vous souhaitez utiliser l'ancienne version de ce check (OpenMetricsBaseCheckV1), consultez la [configuration][3] suivante. Les utilisateurs d'Autodiscovery se servant du fichier `coredns.d/auto_conf.yaml` n'ont toutefois pas besoin d'utiliser cette configuration, car ce fichier active par défaut l'option `prometheus_url` pour la version OpenMetricsBaseCheckV1 du check. Consultez le fichier d'exemple [coredns.d/auto_conf.yaml][4] pour découvrir les options de configuration par défaut et le fichier d'exemple [coredns.d/conf.yaml.example][20] pour découvrir toutes les options de configuration disponibles.

**Remarque** : la version OpenMetricsBaseCheckV2 du check CoreDNS envoie désormais les métriques `.bucket` et les échantillons d'histogramme `.sum` et `.count` sous la forme de counts monotones. Ces métriques étaient auparavant transmises sous la forme de gauges avec le check OpenMetricsBaseCheckV1. Consultez le fichier [metadata.csv][5] pour consulter la liste des métriques disponibles pour chaque version.

### Procédure à suivre
{{< tabs >}}
{{% tab "Docker" %}}
#### Docker

Pour configurer ce check lorsque l'Agent est exécuté sur un conteneur :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```yaml
LABEL "com.datadoghq.ad.check_names"='["coredns"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"openmetrics_endpoint":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]'
```

Pour activer l'ancienne version du check (OpenMetricsBaseCheckV1), remplacez `openmetrics_endpoint` par `prometheus_url` :

```yaml
LABEL "com.datadoghq.ad.instances"='[{"prometheus_url":"http://%%host%%:9153/metrics", "tags":["dns-pod:%%host%%"]}]' 
```

**Remarques** :

- Le fichier `coredns.d/auto_conf.yaml` transmis active par défaut l'option de l'ancien check OpenMetricsBaseCheckV1, à savoir `prometheus_url`.
- Le tag `dns-pod` surveille l'IP du pod DNS cible. Les autres tags sont associés au dd-agent qui interroge les informations à l'aide de la découverte de services.
- Les annotations de découverte de services doivent être effectuées sur le pod. En cas de déploiement, ajoutez les annotations aux métadonnées des spécifications du modèle. Ne les ajoutez pas au niveau des spécifications extérieures.

#### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Docker][2].

Définissez ensuite des [intégrations de logs][5] en tant qu'étiquettes Docker :

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"coredns","service":"<NOM_SERVICE>"}]'
```

[1]: http://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation
[3]: https://docs.datadoghq.com/fr/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

Pour configurer ce check lorsque l'Agent est exécuté sur Kubernetes :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'annotations de pod sur votre conteneur d'application. Vous pouvez également configurer des modèles avec [un fichier, une configmap ou un stockage key/value][2].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.check_names: '["coredns"]'
    ad.datadoghq.com/coredns.init_configs: '[{}]'
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "openmetrics_endpoint": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
  labels:
    name: coredns
spec:
  containers:
    - name: coredns
```

Pour activer l'ancienne version du check (OpenMetricsBaseCheckV1), remplacez `openmetrics_endpoint` par `prometheus_url` :

```yaml
    ad.datadoghq.com/coredns.instances: |
      [
        {
          "prometheus_url": "http://%%host%%:9153/metrics", 
          "tags": ["dns-pod:%%host%%"]
        }
      ]
```

**Remarques** :

- Le fichier `coredns.d/auto_conf.yaml` transmis active par défaut l'option de l'ancien check OpenMetricsBaseCheckV1, à savoir `prometheus_url`.
- Le tag `dns-pod` correspond à l'IP du pod DNS cible. Les autres tags sont associés à l'Agent Datadog qui interroge les informations à l'aide de la découverte de services.
- Les annotations de découverte de services doivent être effectuées sur le pod. En cas de déploiement, ajoutez les annotations aux métadonnées des spécifications du modèle. Ne les ajoutez pas au niveau des spécifications extérieures.

#### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs avec Kubernetes][3].

Définissez ensuite des [intégrations de logs][4] en tant qu'annotations de pod. Cette configuration peut également être réalisée avec [un fichier, une configmap ou un stockage key/value][5].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: coredns
  annotations:
    ad.datadoghq.com/coredns.logs: '[{"source": "coredns", "service": "<NOM_SERVICE>"}]'
  labels:
    name: coredns
```

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=daemonset
[4]: https://docs.datadoghq.com/fr/agent/kubernetes/log/?tab=kubernetes#examples---datadog-redis-integration
[5]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/?tab=file
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

Pour configurer ce check lorsque l'Agent est exécuté sur ECS :

##### Collecte de métriques

Définissez des [modèles d'intégration Autodiscovery][1] en tant qu'étiquettes Docker sur votre conteneur d'application :

```json
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"coredns\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"openmetrics_endpoint\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
    }
  }]
}
```

Pour activer l'ancienne version du check (OpenMetricsBaseCheckV1), remplacez `openmetrics_endpoint` par `prometheus_url` :

```json
      "com.datadoghq.ad.instances": "[{\"prometheus_url\":\"http://%%host%%:9153/metrics\", \"tags\":[\"dns-pod:%%host%%\"]}]"
```

**Remarques** :

- Le fichier `coredns.d/auto_conf.yaml` transmis active par défaut l'option de l'ancien check OpenMetricsBaseCheckV1, à savoir `prometheus_url`.
- Le tag `dns-pod` correspond à l'IP du pod DNS cible. Les autres tags sont associés à l'Agent Datadog qui interroge les informations à l'aide de la découverte de services.
- Les annotations de découverte de services doivent être effectuées sur le pod. En cas de déploiement, ajoutez les annotations aux métadonnées des spécifications du modèle. Ne les ajoutez pas au niveau des spécifications extérieures.

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Amazon ECS][2].

Définissez ensuite des [intégrations de logs][5] en tant qu'étiquettes Docker :

```yaml
{
  "containerDefinitions": [{
    "name": "coredns",
    "image": "coredns:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"coredns\",\"service\":\"<NOM_SERVICE>\"}]"
    }
  }]
}
```
[1]: https://docs.datadoghq.com/fr/agent/amazon_ecs/?tab=awscli#process-collection
[2]: https://docs.datadoghq.com/fr/agent/amazon_ecs/logs/?tab=linux
[3]: https://docs.datadoghq.com/fr/agent/amazon_ecs/logs/?tab=linux#activate-log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande `status` de l'Agent][6] et cherchez `coredns` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "coredns" >}}


### Événements

Le check CoreDNS n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "coredns" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].


[20]:https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/conf.yaml.example

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/fr/integrations/openmetrics
[3]: https://github.com/DataDog/integrations-core/blob/7.32.x/coredns/datadog_checks/coredns/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/coredns/datadog_checks/coredns/data/auto_conf.yaml
[5]: https://github.com/DataDog/integrations-core/blob/master/coredns/metadata.csv
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: http://docs.datadoghq.com/help