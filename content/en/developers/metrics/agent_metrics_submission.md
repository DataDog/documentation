---
title: Metric submission with a custom Agent Check
kind: documentation
further_reading:
- link: "developers/write_agent_check/?tab=agentv6"
  tag: "Documentation"
  text: "Write an Agent Custom Check"
---

Different functions are available depending of the [Metric Type][1] to send metrics to Datadog through a custom Agent Check.

**Note**: Depending of the function used, the submission metric type and the actual metric type stored within Datadog might differ:

{{< tabs >}}
{{% tab "Count" %}}

### `monotonic_count()`

This functions is used to track a raw counter that **always increases**. You shouldn't normalize the values to a rate, or calculate the deltas before submitting, as the Agent does it for you. Samples that have a lower value than the previous sample are ignored (it usually means that the underlying raw counter has been reset). It can be called multiple times during a check's execution.

Example: Submitting samples 2, 3, 6, 7 sends 5 (i.e. 7-2) during the first check execution; then, submitting samples 10, 11 on the same `monotonic_count` sends 4 (i.e. 11-7) during the second check execution.

**Note**: Metrics submitted with this function are stored with a **COUNT** metric type in Datadog. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).

Find below the function usage:

```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
| ---------     | ----            | -------- | ------------- | -----------                                                                         |
| `name`        | String          | yes      | -             | The name of the metric.                                                             |
| `value`       | float           | yes      | -             | The value for the metric.                                                           |
| `tags`        | list of strings | no       | `None`        | A list of tags to associate with this metric.                                       |
| `hostname`    | string          | no       | current host  | A hostname to associate with this metric. Defaults to the current host.             |
| `device_name` | String          | no       | `None`        | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

### `count()`

This function submits the number of events that occurred during the check interval. It can be called multiple times during a check's execution, each sample being added to the value that is sent.

**Note**: Metrics submitted with this function are stored with a **COUNT** metric type in Datadog. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).

Find below the function usage:

```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
| ---------     | ----            | -------- | ------------- | -----------                                                                         |
| `name`        | String          | yes      | -             | The name of the metric.                                                             |
| `value`       | float           | yes      | -             | The value for the metric.                                                           |
| `tags`        | list of strings | no       | `None`        | A list of tags to associate with this metric.                                       |
| `hostname`    | string          | no       | current host  | A hostname to associate with this metric. Defaults to the current host.             |
| `device_name` | String          | no       | `None`        | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

### `increment()`/`decrement()`

Those **deprecated** functions are used to modify a count of events identified by a metric key string by 1 at each call. It can be called multiple times during a check's execution, and is handled by the aggregator Counter class. If you want to increment/decrement by more than one, you must use the `count()` function.

**Note**: Metrics submitted with this function are stored with a **RATE** type in Datadog. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to 1 for Agent checks—so the value is generally the raw count value).

Find below the functions usage:

```python
self.increment(name, value=1, tags=None, hostname=None, device_name=None)
```

```python
self.decrement(name, value=1, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
| ---------     | ----            | -------- | ------------- | -----------                                                                         |
| `name`        | String          | yes      | -             | The name of the metric.                                                             |
| `value`       | float           | yes      | 1             | The increment/decrement value for the metric.                                       |
| `tags`        | list of strings | no       | `None`        | A list of tags to associate with this metric.                                       |
| `hostname`    | string          | no       | current host  | A hostname to associate with this metric. Defaults to the current host.             |
| `device_name` | String          | no       | `None`        | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

{{% /tab %}}
{{% tab "Gauge" %}}

### `gauge()`
This function submits the value of a metric at a given timestamp. If called multiple times during a check's execution for a metric only the last sample is used.

**Note**: Metrics submitted with this function are stored with a **GAUGE** metric type in Datadog.

Find below the function usage:

```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
| ---------     | ----            | -------- | ------------- | -----------                                                                         |
| `name`        | String          | yes      | -             | The name of the metric.                                                             |
| `value`       | float           | yes      | -             | The value for the metric.                                                           |
| `tags`        | list of strings | no       | `None`        | A list of tags to associate with this metric.                                       |
| `hostname`    | string          | no       | current host  | A hostname to associate with this metric. Defaults to the current host.             |
| `device_name` | String          | no       | `None`        | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

{{% /tab %}}
{{% tab "Rate" %}}

### `rate()`

This function submits the sampled raw value of your counter. You shouldn't normalize the values to a rate, or calculate the deltas before submitting, as the Agent does both for you. This function should only be called once during a check, otherwise it throws away any value that is less than a previously submitted value.

**Note**: Metrics submitted with this function are stored as a **GAUGE** metric type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value between samples.

Find below the function usage:

```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
| ---------     | ----            | -------- | ------------- | -----------                                                                         |
| `name`        | String          | yes      | -             | The name of the metric.                                                             |
| `value`       | float           | yes      | -             | The value for the metric.                                                           |
| `tags`        | list of strings | no       | `None`        | A list of tags to associate with this metric.                                       |
| `hostname`    | string          | no       | current host  | A hostname to associate with this metric. Defaults to the current host.             |
| `device_name` | String          | no       | `None`        | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

{{% /tab %}}

{{% tab "Histogram" %}}

### `histogram()`

This function submits the sample of a histogram metric that occurred during the check interval. It can be called multiple times during a check's execution, each sample being added to the statistical distribution of the set of values for this metric.

**Note**: All metric aggregation produced are stored as a **GAUGE** metric type in Datadog, except the `<METRIC_NAME>.count` that is stored as a **RATE** metric type in Datadog.

Find below the function usage:

```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
| ---------     | ----            | -------- | ------------- | -----------                                                                         |
| `name`        | String          | yes      | -             | The name of the metric.                                                             |
| `value`       | float           | yes      | -             | The value for the metric.                                                           |
| `tags`        | list of strings | no       | `None`        | A list of tags to associate with this metric.                                       |
| `hostname`    | string          | no       | current host  | A hostname to associate with this metric. Defaults to the current host.             |
| `device_name` | String          | no       | `None`        | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

{{% /tab %}}
{{< /tabs >}}


## Example

Here is an example of a dummy Agent check sending all metrics type periodically, refer to the dedicated [Writing a custom Agent check][1] documentation to learn more.

1. Create a new directory `metrics_example.d/` in the [`conf.d/` folder][2] of your Agent.

2. In your `metrics_example.d/` folder, create an empty configuration file named `metrics_example.yaml` with the following content:

    ```yaml
    instances: [{}]
    ```

3. Go now in the `/datadog-agent/checks.d/` folder.
2. Create within this folder a custom check file named `metrics_example.py` with the content below:

    ```python
    import time

    try:
      from checks import AgentCheck
    except ImportError:
      from datadog_checks.checks import AgentCheck

    __version__ = "1.0.0"


    class MyClass(AgentCheck):
      def check(self, instance):

    ```

3. [Restart the Agent][3]

4. Check that your custom check is correctly running with the [Agent Status command][4]. You should see something like this:

    ```
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)



        (...)
    ```
5. Finally go into your [Datadog Service Check summary page][5] to see your Service Check reporting.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/metrics_type
[2]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#agent-information
[5]: https://app.datadoghq.com/check/summary
