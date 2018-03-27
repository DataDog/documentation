---
title: Writing a Prometheus Check
kind: documentation
further_reading:
- link: "logs/"
  tag: "Documentation"
  text: Collect your logs
- link: "graphing/infrastructure/process"
  tag: "Documentation"
  text: Collect your processes
- link: "tracing"
  tag: "Documentation"
  text: Collect your traces
---

## Overview

This page first looks at the generic `Prometheus` check, the fastest and simplest way to scrape custom metrics from Prometheus endpoints, then dives into the `PrometheusCheck` interface for more advanced usage. Finally, we include an example of a simple check that collects timing metrics and status events from [Kube DNS](https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py).

## Generic Prometheus check

Starting with version 6.1.0, the Agent includes a new [Prometheus](https://github.com/DataDog/integrations-core/tree/master/prometheus) check capable of scraping Prometheus endpoints with only a few lines of configuration.

### Configuration

Edit the `prometheus.yaml` file to add the different instances you want to retrieve custom metrics from.

The minimal configuration of an instance includes:

* A `prometheus_url` that points to the metric route. **Note:** this must be unique.
* A `namespace` that is prepended to all metrics to avoid metric name collisions.
* A list of `metrics` that you want to retrieve as custom metrics. For each metric you can either add it to the list `- metric_name` or rename it by specifying a new metric name `- metric_name: renamed`.

Note: It's possible to use a `*` wildcard such as `- metric*` that would fetch all matching metrics. Use with caution; this can potentially generate a lot of custom metrics!

Your metrics are collected in the form `namespace.metric_name`. By default, you get a service check named `namespace.prometheus.health` to indicate the health of the Prometheus endpoint.

### Advanced settings

For a comprehensive list of settings refer to the [example configuration](https://github.com/DataDog/integrations-core/blob/master/prometheus/conf.yaml.example).

### Auto-discovery

You can configure the Prometheus check using [Autodiscovery](https://docs.datadoghq.com/agent/autodiscovery/) to quickly collect Prometheus metrics exposed by a container or pod.

Example of Autodiscovery using pod annotations on a `linkerd` pod:

```yaml
annotations:
    ad.datadoghq.com/l5d.check_names: '["prometheus"]'
    ad.datadoghq.com/l5d.init_configs: '[{}]'
    ad.datadoghq.com/l5d.instances: '[{"prometheus_url": "http://%%host%%:9990/admin/metrics/prometheus", "namespace": "linkerd", "metrics": ["jvm:thread:daemon_count"], "type_overrides": {"jvm:thread:daemon_count": "gauge"}}]'
```

### From custom to official integration

By default, all metrics retrieved by the generic Prometheus check are considered custom metrics. If you are monitoring off-the-shelf software and think it deserves an official integration, please don't hesitate to contribute.

Official integrations have their own dedicated directories. There's a default instance mechanism in the generic check to hardcode the default configuration and metrics metadata. For an example, reference the [kube-proxy](https://github.com/DataDog/integrations-core/tree/master/kube_proxy) integration.

## Advanced usage: Prometheus check interface

If you have more advanced needs than the generic check (metrics preprocessing for example) you can write a custom `PrometheusCheck`. It's [the mother class](https://github.com/DataDog/dd-agent/blob/master/checks/prometheus_check.py) of the generic check and it provides a structure and some helpers to collect metrics, events, and service checks exposed via Prometheus. Minimal configuration for checks based on this class include:


- Overriding `self.NAMESPACE`
- Overriding `self.metrics_mapper`
- Implementing the `check()` method
AND/OR
- Create method named after the Prometheus metric they will handle (see `self.prometheus_metric_name`)

## Writing a custom Prometheus check

This is a simple example of writing a kube DNS check to illustrate the `PrometheusCheck` class usage. The example below replicates the functionality of the following generic Prometheus check:

```yaml
instances:
  - prometheus_url: http://localhost:10055/metrics
    namespace: "kubedns"
    metrics:
      - kubedns_kubedns_dns_response_size_bytes: response_size.bytes
      - kubedns_kubedns_dns_request_duration_seconds: request_duration.seconds
      - kubedns_kubedns_dns_request_count_total: request_count
      - kubedns_kubedns_dns_error_count_total: error_count
      - kubedns_kubedns_dns_cachemiss_count_total: cachemiss_count
```

### Configuration

<div class="alert alert-warning">
The names of the configuration and check files must match. If your check is called <code>mycheck.py</code> your configuration file <em>must</em> be named <code>mycheck.yaml</code>.
</div>

Configuration for a Prometheus check is almost the same as a regular [Agent Check](/agent/agent_checks/#configuration). The main difference is to include the variable `prometheus_endpoint` in your `check.yaml` file. This goes into `conf.d/kube_dns.yaml`:

```yaml
init_config:

instances:
    # url of the metrics endpoint of prometheus
  - prometheus_endpoint: http://localhost:10055/metrics
```

### Writing the check
All Prometheus checks inherit from the `PrometheusCheck` class found in `checks/prometheus_check.py`:

```python
from datadog_checks.checks.prometheus import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
```

#### Overriding `self.NAMESPACE`

`NAMESPACE` is the prefix metrics will have. It needs to be hardcoded in your check class:

```python
from datadog_checks.checks.prometheus import PrometheusCheck

class KubeDNSCheck(PrometheusCheck):
    def __init__(self, name, init_config, agentConfig, instances=None):
        super(KubeDNSCheck, self).__init__(name, init_config, agentConfig, instances)
        self.NAMESPACE = 'kubedns'
```

#### Overriding `self.metrics_mapper`

`metrics_mapper` is a dictionary where the key is the metric to capture and the value is the corresponding metric name in Datadog.
The reason for the override is so metrics reported by the Prometheus checks are not counted as [custom metric](/getting_started/custom_metrics):

```python
from datadog_checks.checks.prometheus import PrometheusCheck

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

#### Implementing the check method

From `instance` we just need `endpoint` which is the Prometheus metrics endpoint to poll metrics from:

```python
def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
```

##### Exceptions

If a check cannot run because of improper configuration, programming error, or because it could not collect any metrics, it should raise a meaningful exception. This exception is logged and is shown in the Agent [info command](/agent/faq/agent-commands/#agent-status-and-information) for easy debugging. For example:

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find prometheus_endpoint in config file.
          - Collected 0 metrics & 0 events

Improve your `check()` method with `CheckException`:

```python
from datadog_checks.errors import CheckException

def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
    if endpoint is None:
        raise CheckException("Unable to find prometheus_endpoint in config file.")
```

Then as soon as you have data available you just need to flush:

```python
from datadog_checks.errors import CheckException

def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
    if endpoint is None:
        raise CheckException("Unable to find prometheus_endpoint in config file.")
    # By default, we send the buckets.
    if send_buckets is not None and str(send_buckets).lower() == 'false':
        send_buckets = False
    else:
        send_buckets = True

    self.process(endpoint, send_histograms_buckets=send_buckets, instance=instance)
```

### Putting It All Together

```python
from datadog_checks.errors import CheckException
from datadog_checks.checks.prometheus import PrometheusCheck

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
        # By default, we send the buckets.
        if send_buckets is not None and str(send_buckets).lower() == 'false':
            send_buckets = False
        else:
            send_buckets = True

        self.process(endpoint, send_histograms_buckets=send_buckets, instance=instance)
```


## Going further

You can improve your Prometheus check with the following methods:

### `self.ignore_metrics`

Some metrics are ignored because they are duplicates or introduce a very high cardinality. Metrics included in this list will be silently skipped without a `Unable to handle metric` debug line in the logs.

### `self.labels_mapper`

If the `labels_mapper` dictionary is provided, the metrics labels in `labels_mapper` will use the corresponding value as tag name when sending the gauges.

### `self.exclude_labels`

`exclude_labels` is an array of labels to exclude. Those labels will not be added as tags when submitting the metric.

### `self.type_overrides`

`type_overrides` is a dictionary where the keys are Prometheus metric names and the values are a metric type (name as string) to use instead of the one listed in the payload. It can be used to force a type on untyped metrics.
Note: it is empty in the mother class but will need to be overloaded/hardcoded in the final check not to be counted as custom metric.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
