---
title: Custom OpenMetrics Check
further_reading:
- link: "/agent/kubernetes/prometheus"
  tag: "Documentation"
  text: "Configuring an OpenMetrics Check"
- link: "/developers/custom_checks/write_agent_check/"
  tag: "Documentation"
  text: "Write a Custom Check"
- link: "/developers/integrations/"
  tag: "Documentation"
  text: "Introduction to Agent-based Integrations"
aliases:
  - /developers/openmetrics/
  - /developers/prometheus/
---

## Overview

This page dives into the `OpenMetricsBaseCheckV2` interface for more advanced usage, including an example of a simple check that collects timing metrics and status events from [Kong][1]. For details on configuring a basic OpenMetrics check, see [Kubernetes Prometheus and OpenMetrics metrics collection][2].

**Note**: `OpenMetricsBaseCheckV2` is available in Agent v`7.26.x`+ and requires Python 3.

<div class="alert alert-info">
If you are looking for the legacy implementation or <code>OpenMetricsBaseCheck</code> interface custom check guide, please see <a href="https://docs.datadoghq.com/developers/faq/legacy-openmetrics/">Custom Legacy OpenMetrics Check</a>.
</div>

## Advanced usage: OpenMetrics check interface

If you have more advanced needs than the generic check, such as metrics preprocessing, you can write a custom `OpenMetricsBaseCheckV2`. It's the [base class][3] of the generic check, and it provides a structure and some helpers to collect metrics, events, and service checks exposed with Prometheus. The minimal configuration for checks based on this class include:

- Creating a default instance with `namespace` and `metrics` mapping.
- Implementing the `check()` method AND/OR:
- Creating a method named after the OpenMetric metric handled (see `self.prometheus_metric_name`).

See this [example in the Kong integration][4] where the Prometheus metric `kong_upstream_target_health` value is used as service check.

## Writing a custom OpenMetrics check

This is a simple example of writing a Kong check to illustrate usage of the `OpenMetricsBaseCheckV2` class. The example below replicates the functionality of the following generic Openmetrics check:

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
The names of the configuration and check files must match. If your check is called <code>mycheck.py</code> your configuration file <em>must</em> be named <code>mycheck.yaml</code>.
</div>

Configuration for an Openmetrics check is almost the same as a regular [Agent check][5]. The main difference is to include the variable `openmetrics_endpoint` in your `check.yaml` file. This goes into `conf.d/kong.yaml`:

```yaml
init_config:

instances:
    # URL of the Prometheus metrics endpoint
  - openmetrics_endpoint: http://localhost:8001/status/
```

### Writing the check

All OpenMetrics checks inherit from the [`OpenMetricsBaseCheckV2` class][6]:

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
```

## Define the integration namespace

The value of `__NAMESPACE__` will prefix all metrics and service checks collected by this integration.

```python
from datadog_checks.base import OpenMetricsBaseCheckV2

class KongCheck(OpenMetricsBaseCheckV2):
    __NAMESPACE__ = "kong"

```

#### Define a metrics mapping

The [metrics][7] mapping allows you to rename the metric name and override the native metric type.

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

#### Define a default instance

A default instance is the basic configuration used for the check. The default instance should override `metrics`, and `openmetrics_endpoint`.
[Override][8] the `get_default_config` in OpenMetricsBaseCheckV2 with your default instance.

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


#### Implementing the check method

If you want to implement additional features, override the `check()` function.

From `instance`, use `endpoint`, which is the Prometheus or OpenMetrics metrics endpoint to poll metrics from:

```python
def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
```


##### Exceptions

If a check cannot run because of improper configuration, a programming error, or because it could not collect any metrics, it should raise a meaningful exception. This exception is logged and is shown in the Agent [status command][9] for debugging. For example:

    $ sudo /etc/init.d/datadog-agent info

      Checks
      ======

        my_custom_check
        ---------------
          - instance #0 [ERROR]: Unable to find openmetrics_endpoint in config file.
          - Collected 0 metrics & 0 events

Improve your `check()` method with `ConfigurationError`:

```python
from datadog_checks.base import ConfigurationError

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")
```

Then as soon as you have data available, flush:

```python

def check(self, instance):
    endpoint = instance.get('openmetrics_endpoint')
    if endpoint is None:
        raise ConfigurationError("Unable to find openmetrics_endpoint in config file.")

    super().check(instance)
```

### Putting it all together

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

## Going further

To read more about Prometheus and OpenMetrics base integrations, see the integrations [developer docs][10].

To see all configuration options available in Openmetrics, see the [conf.yaml.example][11].
You can improve your OpenMetrics check by including default values for additional configuration options:

`exclude_metrics`
: Some metrics are ignored because they are duplicates or introduce a high cardinality. Metrics included in this list are silently skipped without an `Unable to handle metric` debug line in the logs.
In order to exclude all metrics but the ones matching a specific filter, you can use a negative lookahead regex like: ` - ^(?!foo).*$`

`share_labels`
: If the `share_labels` mapping is provided, the mapping allows for the sharing of labels across multiple metrics. The keys represent the
exposed metrics from which to share labels, and the values are mappings that configure the sharing behavior. Each mapping must have at least one of the following keys: `labels`, `match`, or `values`.

`exclude_labels`
: `exclude_labels` is an array of labels to exclude. Those labels are not added as tags when submitting the metric.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/integrations-core/blob/master/kube_dns/datadog_checks/kube_dns/kube_dns.py
[2]: /agent/kubernetes/prometheus/
[3]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2
[4]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/kong/datadog_checks/kong/check.py#L22-L45
[5]: /developers/integrations/
[6]: https://github.com/DataDog/integrations-core/tree/master/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py
[7]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example#L65-L104
[8]: https://github.com/DataDog/integrations-core/blob/459e8c12a9c828a0b3faff59df69c2e1f083309c/datadog_checks_base/datadog_checks/base/checks/openmetrics/v2/base.py#L86-L87
[9]: /agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[10]: https://datadoghq.dev/integrations-core/base/openmetrics/
[11]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
