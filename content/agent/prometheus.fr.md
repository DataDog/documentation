---
title: Écrire un check Prometheus
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collectez vos logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collectez vos processus
- link: "tracing"
  tag: "Documentation"
  text: Collectez vos traces
---

## Aperçu

Cette page examine d'abord l'interface `PrometheusCheck`, puis propose une check Prometheus simple qui collecte les métriques de synchronisation et les événements d'état à partir de [Kube DNS][1].

## l'interface des checks Prometheus

`PrometheusCheck` est une [class mère][2] qui fournit une structure et quelques aides pour collecter des métriques, des événements et des check de services exposés via Prometheus. La configuration minimale pour les contrôles basés sur cette classe sont:

- Remplacer `self.NAMESPACE`
- Remplacer `self.metrics_mapper`
- Implémenter la methode `check()`
ET/OU
- Créer une méthode portant le nom de la métrique prometheus qu'ils vont gérer (voir `self.prometheus_metric_name`)

## Votre premier check Prometheus
Écrivons un simple check kube_dns:

### Configuration

<div class="alert alert-warning">Le nom de vos fichiers de configuration et du check doivent être identique. Si votre check s'appelle <code>mycheck.py</code> votre  fichier de configuration <em>doit</em> s'appeler <code>mycheck.yaml</code>.
</div>

La configuration d'un check Prometheus est presque la même que celle d'un check d'agent classique. Reportez-vous à la [documentation de check d'agent dédiée pour en savoir plus][3]

La principale différence est d'inclure la variable `prometheus_endpoint` dans votre fichier` check.yaml`. Cela va dans `conf.d/kube_dns.yaml`:

```yaml
init_config:

instances:
    # url of the metrics endpoint of prometheus
  - prometheus_endpoint: http://localhost:10055/metrics
```

### Écrire votre check Prometheus
Toutes les check Prometheus héritent de la classe `PrometheusCheck` qui se trouve dans `checks/prometheus_check.py`: 

```python
from checks.prometheus_check import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
```

#### Remplacer `self.NAMESPACE`

`NAMESPACE` est le préfixe que les métriques auront. Il doit être codé en dur dans la classe de votre check:

```python
from checks.prometheus_check import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
    def __init__(self, name, init_config, agentConfig, instances=None):
        super(KubeDNSCheck, self).__init__(name, init_config, agentConfig, instances)
        self.NAMESPACE = 'kubedns'
```

#### Remplacer `self.metrics_mapper`

`metrics_mapper` est un dictionnaire où la clé est la métrique à récupérer et la valeur est le nom de la métrique correspondante dans Datadog.
La raison du remplacement de cette métrique par le check Prometheus n'est pas comptabilisée comme [une métrique custom] [4]:

```python
from checks.prometheus_check import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
    def __init__(self, name, init_config, agentConfig, instances=None):
        super(KubeDNSCheck, self).__init__(name, init_config, agentConfig, instances)
        self.NAMESPACE = 'kubedns'
        self.metrics_mapper = {
            #metrics have been renamed to kubedns in kubernetes 1.6.0
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count'
        }
```

#### Implémenter une méthode de check

De `instance` nous avons juste besoin de` endpoint` qui est l'endpoint des métriques à utiliser pour interroger les métriques de Prometheus:

```python
def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
```

##### Exceptions

Si un check ne peut pas être effectuée en raison d'une configuration incorrecte, d'une erreur de programmation ou parce qu'il ne peut collecter aucune statistique, il devrait générer une exception significative. Cette exception est enregistrée et est affichée dans  [ la commande info de l'agent][5] pour faciliter le débogage. Par exemple:

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find prometheus_endpoint in config file.
          - Collected 0 metrics & 0 events

Améliorez votre méthode `check ()` avec `CheckException`:

```python
from checks import CheckException

def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
    if endpoint is None:
    raise CheckException("Unable to find prometheus_endpoint in config file.")
```

Ensuite, dès que vous avez des données de disponibles, vous avez juste besoin de flush:

```python
from checks import CheckException

def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
    if endpoint is None:
    raise CheckException("Unable to find prometheus_endpoint in config file.")
    # By default we send the buckets.
    if send_buckets is not None and str(send_buckets).lower() == 'false':
        send_buckets = False
    else:
        send_buckets = True

    self.process(endpoint, send_histograms_buckets=send_buckets, instance=instance)
```

### Synthèse

```python
from checks import CheckException
from checks.prometheus_check import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
    """
    Collect kube-dns metrics from Prometheus
    """
    def __init__(self, name, init_config, agentConfig, instances=None):
        super(KubeDNSCheck, self).__init__(name, init_config, agentConfig, instances)
        self.NAMESPACE = 'kubedns'

        self.metrics_mapper = {
            # metrics have been renamed to kubedns in kubernetes 1.6.0
            'kubedns_kubedns_dns_response_size_bytes': 'response_size.bytes',
            'kubedns_kubedns_dns_request_duration_seconds': 'request_duration.seconds',
            'kubedns_kubedns_dns_request_count_total': 'request_count',
            'kubedns_kubedns_dns_error_count_total': 'error_count',
            'kubedns_kubedns_dns_cachemiss_count_total': 'cachemiss_count',
        }

    def check(self, instance):
        endpoint = instance.get('prometheus_endpoint')
        if endpoint is None:
            raise CheckException("Unable to find prometheus_endpoint in config file.")

        send_buckets = instance.get('send_histograms_buckets', True)
        # By default we send the buckets.
        if send_buckets is not None and str(send_buckets).lower() == 'false':
            send_buckets = False
        else:
            send_buckets = True

        self.process(endpoint, send_histograms_buckets=send_buckets, instance=instance)
```

## En apprendre plus

Vous pouvez améliorer votre check Prometheus avec les méthodes suivantes:

### `self.ignore_metrics`

Certaines métriques sont ignorées car elles sont en double ou introduisent une très forte cardinalité. Les métriques incluses dans cette liste seront silencieusement ignorées sans un log de debug   `Unable to handle metric`

### `self.labels_mapper`

Si le dictionnaire `labels_mapper` est fourni, les noms des labels des métriques dans le` labels_mapper` utiliseront la valeur correspondante comme nom de tag lors de l'envoi des gauges.

### `self.exclude_labels`

`exclude_labels` est un tableau de noms de labels à exclure. Ces labels ne seront simplement pas ajoutées en tant que tags lors de l'envoi de la métrique.

### `self.type_overrides`

`type_overrides` est un dictionnaire dans lequel les clés sont des noms de métrique Prometheus et les valeurs sont un type de métrique (un nom de type string) à utiliser à la place de celui indiqué dans la contenu de l'envoie. Il peut être utilisé pour forcer un type sur des métriques non typées.
Note: il est vide dans la classe mère mais devra être surchargé/codé en dur dans la vérification finale de votre check pour ne pas être compté comme une métrique custom.

## En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: https://github.com/DataDog/dd-agent/blob/master/checks/prometheus_check.py
[3]: /agent/agent_checks/#configuration
[4]: /getting_started/custom_metrics
[5]: /agent/faq/agent-commands/#agent-status-and-information
