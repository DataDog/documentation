---
title: Writing a custom OpenMetrics Check
kind: documentation
further_reading:
- link: "agent/prometheus"
  tag: "Documentation"
  text: "Configuring an OpenMetrics Check"
- link: "developers/agent_checks"
  tag: "Documentation"
  text: "Write a Custom Check"
- link: "developers/integrations/"
  tag: "Documentation"
  text: "Create a new Integration"
aliases:
  - /developers/openmetrics/
---

## Overview

This page dives into the `OpenMetricsBaseCheck` interface for more advanced usage, including an example of a simple check that collects timing metrics and status events from [Kube DNS][1]. For information on configuring a basic OpenMetrics check, see the [Agent Documentation][2].

## Advanced usage: OpenMetrics check interface

If you have more advanced needs than the generic check (for example, metrics preprocessing), you can write a custom `OpenMetricsBaseCheck`. It's [the base class][3] of the generic check, and it provides a structure and some helpers to collect metrics, events, and service checks exposed via Prometheus. The minimal configuration for checks based on this class include:

- Overriding `self.NAMESPACE`
- Overriding `self.metrics_mapper`
- Implementing the `check()` method
AND/OR
- Create a method named after the OpenMetric metric they will handle (see `self.prometheus_metric_name`)

## Writing a custom Prometheus check

This is a simple example of writing a Kube DNS check to illustrate usage of the `OpenMetricsBaseCheck` class. The example below replicates the functionality of the following generic Prometheus check:

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

Configuration for a Prometheus check is almost the same as a regular [Agent check][4]. The main difference is to include the variable `prometheus_endpoint` in your `check.yaml` file. This goes into `conf.d/kube_dns.yaml`:

```yaml
init_config:

instances:
    # URL of the metrics endpoint of Prometheus
  - prometheus_endpoint: http://localhost:10055/metrics
```

### Writing the check

All OpenMetrics checks inherit from the `OpenMetricsBaseCheck` class found in `checks/openmetrics_check.py`:

```python
from datadog_checks.checks.openmetrics import OpenMetricsBasicCheck

class KubeDNSCheck(OpenMetricsBasicCheck):
```

#### Overriding `self.NAMESPACE`

`NAMESPACE` is the metrics prefix. It needs to be hardcoded in your check class:

```python
from datadog_checks.checks.openmetrics import OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
    def __init__(self, name, init_config, agentConfig, instances=None):
        super(KubeDNSCheck, self).__init__(name, init_config, agentConfig, instances)
        self.NAMESPACE = 'kubedns'
```

#### Overriding `self.metrics_mapper`

`metrics_mapper` is a dictionary where the key is the metric to capture, and the value is the corresponding metric name in Datadog.
The reason for the override is so that metrics reported by the OpenMetrics checks are not counted as [custom metric][5]:

```python
from datadog_checks.checks.openmetrics import OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
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

From `instance`, use `endpoint`, which is the Prometheus or OpenMetrics metrics endpoint to poll metrics from:

```python
def check(self, instance):
    endpoint = instance.get('prometheus_endpoint')
```

##### Exceptions

If a check cannot run because of improper configuration, a programming error, or because it could not collect any metrics, it should raise a meaningful exception. This exception is logged and is shown in the Agent [status command][6] for easy debugging. For example:

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

Then as soon as you have data available, flush:

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
from datadog_checks.checks.openmetrics import OpenMetricsBaseCheck

class KubeDNSCheck(OpenMetricsBaseCheck):
    """
    Collect kube-dns metrics from Prometheus endpoint
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

You can improve your OpenMetrics check with the following methods:

### `self.ignore_metrics`

Some metrics are ignored because they are duplicates or introduce a very high cardinality. Metrics included in this list are silently skipped without an `Unable to handle metric` debug line in the logs.

### `self.labels_mapper`

If the `labels_mapper` dictionary is provided, the metrics labels in `labels_mapper` use the corresponding value as tag name when sending the gauges.

### `self.exclude_labels`

`exclude_labels` is an array of labels to exclude. Those labels will not be added as tags when submitting the metric.

### `self.type_overrides`

`type_overrides` is a dictionary where the keys are Prometheus or OpenMetrics metric names, and the values are a metric type (name as string) to use instead of the one listed in the payload. This can be used to force a type on untyped metrics.
Available types are: `counter`, `gauge`, `summary`, `untyped`, and `histogram`.

**Note**: This value is empty in the base class, but needs to be overloaded/hardcoded in the final check to not be counted as a custom metric.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: /agent/prometheus
[3]: https://github.com/DataDog/dd-agent/blob/master/checks/prometheus_check.py
[4]: /agent/agent_checks/#configuration
[5]: /developers/metrics/custom_metrics
[6]: /agent/guide/agent-commands/#agent-status-and-information
