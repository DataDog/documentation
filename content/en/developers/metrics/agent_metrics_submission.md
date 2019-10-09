---
title: "Metric Submission: Custom Agent Check"
kind: documentation
disable_toc: true
further_reading:
- link: "developers/write_agent_check/?tab=agentv6"
  tag: "Documentation"
  text: "Write an Agent Custom Check"
---

Functions are used to submit metrics with a [custom Agent check][1]. Different functions are available depending on the [metric type][2]. Depending on the function used, the submission and actual metric type stored within Datadog might differ.

{{< tabs >}}
{{% tab "Count" %}}

### `monotonic_count()`

This function is used to track a raw counter that always increases. The Datadog Agent calculates the delta between each submission. Samples that have a lower value than the previous sample are ignored. Lower values usually indicate the underlying raw counter has been reset. The function can be called multiple times during a check's execution.

For example, submitting samples 2, 3, 6, 7 sends a value of 5 (7-2) during the first check execution. Submitting the samples 10, 11 on the same `monotonic_count` sends a value of 4 (11-7) during the second check execution.

**Note**: Metrics submitted with this function are stored with a `COUNT` metric type in Datadog. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).

Function template:
```python
self.monotonic_count(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | String          | Yes      | -             | The name of the metric.                                                             |
| `value`       | Float           | Yes      | -             | The value for the metric.                                                           |
| `tags`        | List of strings | No       | -             | A list of tags to associate with this metric.                                       |
| `hostname`    | String          | No       | Current host  | A hostname to associate with this metric.                                           |
| `device_name` | String          | No       | -             | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

### `count()`

This function submits the number of events that occurred during the check interval. It can be called multiple times during a check's execution, each sample being added to the value that is sent.

**Note**: Metrics submitted with this function are stored with a `COUNT` metric type in Datadog. Each value in the stored timeseries is a delta of the counter's value between samples (not time-normalized).

Function template:
```python
self.count(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | String          | Yes      | -             | The name of the metric.                                                             |
| `value`       | Float           | Yes      | -             | The value for the metric.                                                           |
| `tags`        | List of strings | No       | -             | A list of tags to associate with this metric.                                       |
| `hostname`    | String          | No       | current host  | A hostname to associate with this metric.                                           |
| `device_name` | String          | No       | -             | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

### `increment() / decrement()`

These **deprecated** functions are used to modify a count of events identified by a metric key string by `1` at each call. It can be called multiple times during a check's execution, and is handled by the aggregator `Counter` class. If you want to increment/decrement by more than one, use the `count()` function.

**Note**: Metrics submitted with these functions are stored with a `RATE` type in Datadog. Each value in the stored timeseries is a delta of the counter's value between samples (time-normalized by the aggregation interval which defaults to `10 seconds` for Agent checks. The value is generally the raw count value).

Function templates:
```python
self.increment(name, value=1, tags=None, hostname=None, device_name=None)
```

```python
self.decrement(name, value=1, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | String          | Yes      | -             | The name of the metric.                                                             |
| `value`       | Float           | Yes      | `1`           | The increment/decrement value for the metric.                                       |
| `tags`        | List of strings | No       | -             | A list of tags to associate with this metric.                                       |
| `hostname`    | String          | No       | current host  | A hostname to associate with this metric.                                           |
| `device_name` | String          | No       | -             | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

{{% /tab %}}
{{% tab "Gauge" %}}

### `gauge()`

This function submits the value of a metric at a given timestamp. If called multiple times during a check's execution for a metric only the last sample is used.

**Note**: Metrics submitted with this function are stored with a `GAUGE` metric type in Datadog.

Function template:
```python
self.gauge(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | String          | Yes      | -             | The name of the metric.                                                             |
| `value`       | Float           | Yes      | -             | The value for the metric.                                                           |
| `tags`        | List of strings | No       | -             | A list of tags to associate with this metric.                                       |
| `hostname`    | String          | No       | current host  | A hostname to associate with this metric.                                           |
| `device_name` | String          | No       | -             | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

{{% /tab %}}
{{% tab "Rate" %}}

### `rate()`

This function submits the sampled raw value of your counter. The Datadog Agent calculates the delta of that counter value between two submission, and divides it by the submission interval to get the rate. This function should only be called once during a check, otherwise it throws away any value that is less than a previously submitted value.

**Note**: Metrics submitted with this function are stored as a `GAUGE` metric type in Datadog. Each value in the stored timeseries is a time-normalized delta of the counter's value between samples.

Function template:
```python
self.rate(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | String          | Yes      | -             | The name of the metric.                                                             |
| `value`       | Float           | Yes      | -             | The value for the metric.                                                           |
| `tags`        | List of strings | No       | -             | A list of tags to associate with this metric.                                       |
| `hostname`    | String          | No       | current host  | A hostname to associate with this metric.                                           |
| `device_name` | String          | No       | -             | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

{{% /tab %}}

{{% tab "Histogram" %}}

### `histogram()`

This function submits the sample of a histogram metric that occurred during the check interval. It can be called multiple times during a check's execution, each sample being added to the statistical distribution of the set of values for this metric.

**Note**: All metric aggregation produced are stored as a `GAUGE` metric type in Datadog, except the `<METRIC_NAME>.count` that is stored as a `RATE` metric type in Datadog.

Function template:
```python
self.histogram(name, value, tags=None, hostname=None, device_name=None)
```

| Parameter     | Type            | Required | Default Value | Description                                                                         |
|---------------|-----------------|----------|---------------|-------------------------------------------------------------------------------------|
| `name`        | String          | Yes      | -             | The name of the metric.                                                             |
| `value`       | Float           | Yes      | -             | The value for the metric.                                                           |
| `tags`        | List of strings | No       | -             | A list of tags to associate with this metric.                                       |
| `hostname`    | String          | No       | current host  | A hostname to associate with this metric.                                           |
| `device_name` | String          | No       | -             | Deprecated. Adds a tag in the form `device:<DEVICE_NAME>` to the tags list instead. |

{{% /tab %}}
{{< /tabs >}}

## Tutorial

Follow the steps below to create a [custom Agent check][2] that sends all metric types periodically:

1. Create the directory `metrics_example.d/` in the `conf.d/` folder at the root of your [Agent's configuration directory][3].

2. In `metrics_example.d/` folder, create an empty configuration file named `metrics_example.yaml` with the following content:

    ```yaml
    instances: [{}]
    ```

3. Up one level from the `conf.d/` folder, go to the `checks.d/` folder. Create a custom check file named `metrics_example.py` with the content below:

    ```python
    import random

    try:
        from checks import AgentCheck
    except ImportError:
        from datadog_checks.checks import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.count(
                "example_metric.count",
                2,
                tags="metric_submission_type:count",
            )
            self.decrement(
                "example_metric.decrement",
                tags="metric_submission_type:count",
            )
            self.increment(
                "example_metric.increment",
                tags="metric_submission_type:count",
            )
            self.rate(
                "example_metric.rate",
                1,
                tags="metric_submission_type:rate",
            )
            self.gauge(
                "example_metric.gauge",
                random.randint(0, 10),
                tags="metric_submission_type:gauge",
            )
            self.monotonic_count(
                "example_metric.monotonic_count",
                2,
                tags="metric_submission_type:monotonic_count",
            )

            # Calling the functions below twice simulates
            # several metrics submissions during one Agent run.
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags="metric_submission_type:histogram",
            )
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags="metric_submission_type:histogram",
            )
    ```

4. [Restart the Agent][4].

5. Validate your custom check is running correctly with the [Agent's status subcommand][5]. Look for `metrics_example` under the Checks section:

    ```
    =========
    Collector
    =========

      Running Checks
      ==============

        (...)

        metrics_example (1.0.0)
        -----------------------
          Instance ID: metrics_example:d884b5186b651429 [OK]
          Total Runs: 2
          Metric Samples: Last Run: 8, Total: 16
          Events: Last Run: 0, Total: 0
          Service Checks: Last Run: 0, Total: 0
          Average Execution Time : 2ms

        (...)
    ```
6. Verify your metrics are reporting to Datadog on your [Metric Summary page][6]:

{{< img src="developers/metrics/agent_metrics_submission/metrics_metrics_summary.png" alt="Metrics in metric summary" responsive="true" style="width:80%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/write_agent_check
[2]: /developers/metrics/metrics_type
[3]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: /agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/?tab=agentv6#agent-information
[6]: https://app.datadoghq.com/metric/summary
