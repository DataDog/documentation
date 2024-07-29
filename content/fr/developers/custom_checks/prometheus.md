---
title: Check OpenMetrics personnalisé
further_reading:
  - link: /agent/kubernetes/prometheus
    tag: Documentation
    text: Configurer un check OpenMetrics
  - link: /developers/custom_checks/write_agent_check/
    tag: Documentation
    text: Écrire un check custom
  - link: /developers/integrations/
    tag: Documentation
    text: Présentation des intégrations basées sur l'Agent
aliases:
  - /fr/developers/openmetrics/
  - /fr/developers/prometheus/
---
## Présentation

Cette page présente l'interface `OpenMetricsBaseCheckV2` en détail pour une utilisation plus avancée, avec notamment un exemple de check simple qui recueille des métriques de temps et des statuts d'événements depuis [Kong][1]. Pour en savoir plus sur la configuration d'un check OpenMetrics de base, consultez la section [Collecte de métriques Prometheus et OpenMetrics avec Kubernetes][2].

**Remarque** : `OpenMetricsBaseCheckV2` est disponible à partir de la version `7.26.x` de l'Agent et nécessite Python 3.

<div class="alert alert-info">
Pour consulter l'ancienne version de l'implémentation ou du guide sur le check custom de l'interface <code>OpenMetricsBaseCheck</code>, consultez la section relative à l'<a href="https://docs.datadoghq.com/developers/faq/legacy-openmetrics/">ancien check custom OpenMetrics</a>.
</div>

## Utilisation avancée : interface de check OpenMetrics

Si vous avez besoin de fonctionnalités plus avancées que celles offertes par le check générique, telles que le prétraitement de métriques, vous pouvez écrire un check `OpenMetricsBaseCheckV2` custom. Il s'agit de la [classe de base][3] du check générique qui fournit une structure et certains auxiliaires permettant de recueillir des métriques, des événements et des checks de service exposés via Prometheus. Les checks basés sur cette classe nécessitent d'effectuer les opérations de configuration suivantes :

- Création d'une instance par défaut avec le mappage `namespace` et `metrics`
- Implémentation de la méthode `check()` et/ou
- Création d'une méthode portant le nom de la métrique OpenMetric gérée (voir `self.prometheus_metric_name`)

Consultez cet [exemple dans l'intégration Kong][4], qui utilise la valeur de métrique Prometheus `kong_upstream_target_health` comme check de service.

## Écrire un check OpenMetrics custom

Voici un exemple simple de check Kong écrit afin d'illustrer l'utilisation de la classe `OpenMetricsBaseCheckV2`. L'exemple ci-dessous reproduit les fonctionnalités du check OpenMetrics générique suivant :

```yaml
instances:
  - openmetrics_endpoint: http://localhost:8001/status/
    namespace: "kong"
    metrics:
      - kong_bandwidth: bandwidth
      - kong_http_consumer_status: http.consumer.status
      - kong_http_status: http.status
      - kong_latency:
          name: latency
          type: counter
      - kong_memory_lua_shared_dict_bytes: memory.lua.shared_dict.bytes
      - kong_memory_lua_shared_dict_total_bytes: memory.lua.shared_dict.total_bytes
      - kong_nginx_http_current_connections: nginx.http.current_connections
      - kong_nginx_stream_current_connections: nginx.stream.current_connections
      - kong_stream_status: stream.status
```

### Configuration

<div class="alert alert-warning">
Vos fichiers de configuration et de check doivent porter le même nom. Si votre check s'appelle <code>moncheck.py</code>, votre fichier de configuration <em>doit</em> s'appeler <code>moncheck.yaml</code>.
</div>

La configuration d'un check OpenMetrics est pratiquement identique à celle d'un [check de l'Agent][5] standard. La principale différence réside dans l'ajout de la variable `openmetrics_endpoint` à votre fichier `check.yaml`. Le code suivant doit être ajouté à `conf.d/kong.yaml` :

```yaml
init_config:

instances:
    # URL de l'endpoint de métriques de Prometheus
  - openmetrics_endpoint: http://localhost:8001/status/
```

### Écrire le check

Tous les checks OpenMetrics héritent de la [classe `OpenMetricsBaseCheckV2`][6] :

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
```

## Définir l'espace de nommage de l'intégration

La valeur de `__NAMESPACE__` sera ajoutée en préfixe de toutes les métriques et de tous les checks de service recueillis par cette intégration.

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

```

#### Définir un mappage de métriques

Le mappage de [métriques][7] vous permet de modifier le nom des métriques et de remplacer le type de métrique natif.

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map =  {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }
```

#### Définir une instance par défaut

La configuration de base de ce check repose sur une instance par défaut. Celle-ci doit remplacer `metrics` et `openmetrics_endpoint`.
[Remplacez][8] le paramètre `get_default_config` du check OpenMetricsBaseCheckV2 par votre instance par défaut.

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map = {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }

      def get_default_config(self):
            return {'metrics': self.metrics_map}
```


#### Implémenter la méthode de check

Si vous souhaitez implémenter d'autres fonctionnalités, remplacez la fonction `check()`. 

Depuis `instance`, utilisez `endpoint`, qui correspond à l'endpoint de métriques Prometheus ou OpenMetrics à partir duquel les métriques sont récupérées :

```python
def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
```


##### Exceptions

Si l'exécution d'un check échoue en raison d'une erreur de configuration ou de programmation, ou si le check ne parvient pas à recueillir des métriques, il doit générer une exception descriptive. Cette exception est loguée et affichée dans la [commande status][9] de l'Agent pour faciliter le debugging. Exemple :

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find openmetrics_endpoint in config file.
          - Collected 0 metrics & 0 events

Améliorez votre méthode `check()` avec `ConfigurationError` :

```python
from datadog_checks.base import ConfigurationError

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")
```

Ensuite, les données sont transmises dès qu'elles sont disponibles :

```python

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")

    super().check(instance)
```

### Synthèse

```python
from datadog_checks.base import OpenMetricsBaseCheckV2
from datadog_checks.base import ConfigurationError

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

    def __init__(self, name, init_config, instances):
        super(KongCheck, self).__init__(name, init_config, instances)

        self.metrics_map = {
            'kong_bandwidth': 'bandwidth',
            'kong_http_consumer_status': 'http.consumer.status',
            'kong_http_status': 'http.status',
            'kong_latency': {
                'name': 'latency',
                'type': 'counter',
            },
            'kong_memory_lua_shared_dict_bytes': 'memory.lua.shared_dict.bytes',
            'kong_memory_lua_shared_dict_total_bytes': 'memory.lua.shared_dict.total_bytes',
            'kong_nginx_http_current_connections': 'nginx.http.current_connections',
            'kong_nginx_stream_current_connections': 'nginx.stream.current_connections',
            'kong_stream_status': 'stream.status',
        }

      def get_default_config(self):
            return {'metrics': self.metrics_map}

      def check(self, instance):
          endpoint = instance.get('openmetrics_endpoint')
          if endpoint is None:
              raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")

          super().check(instance)

```

## Concepts avancés

Pour en savoir plus sur les intégrations Prometheus et OpenMetrics de base, consultez la [documentation pour développeurs][10].

Pour découvrir toutes les options de configuration disponibles dans OpenMetrics, consultez le fichier [conf.yaml.example][11]. Vous pouvez améliorer votre check OpenMetrics en incluant des valeurs par défaut pour d'autres options de configuration :

`exclude_metrics`
: Certaines métriques sont ignorées, car elles sont en double ou génèrent une cardinalité élevée. Les métriques incluses dans cette liste sont simplement ignorées, sans que la ligne de debugging `Unable to handle metric` soit ajoutée dans les logs. Pour exclure toutes les métriques, à l'exception de celles correspondant à un filtre spécifique, vous pouvez utiliser une expression régulière d'assertion avant négative comme ` - ^(?!foo).*$`.

`share_labels`
: Si le mappage `share_labels` est défini, il permet de partager des étiquettes entre plusieurs métriques. Les clés représentent les métriques exposées à partir desquelles les étiquettes sont partagées, tandis que les valeurs correspondent aux mappages qui configurent le comportement de partage. Chaque mappage doit inclure au moins l'une des clés suivantes : `labels`, `match` ou `values`.

`exclude_labels`
: `exclude_labels` est un tableau d'étiquettes à exclure. Ces étiquettes ne sont pas ajoutées en tant que tags lors de l'envoi de la métrique.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: /fr/agent/kubernetes/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2
[4]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/kong/datadog_checks/kong/check.py#L22-L45
[5]: /fr/developers/integrations/
[6]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py
[7]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L65-L104
[8]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py#L86-L87
[9]: /fr/agent/guide/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: https://datadoghq.dev/integrations-core/base/openmetrics/
[11]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example