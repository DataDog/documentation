---
title: "Metric Submission: Custom Agent Check"
aliases:
  - /developers/metrics/agent_metrics_submission/
  - /metrics/agent_metrics_submission
further_reading:
- link: /developers/custom_checks/write_agent_check/
  tag: Documentation
  text: Write an Agent Custom Check
---

Functions are used to submit metrics with a [custom Agent check][1]. Different functions are available depending on the [metric type][2]. Depending on the function used, the submission and actual metric type stored within Datadog might differ.

## Functions

{{< tabs >}}
{{% tab "Count" %}}

### `monotonic_count()`

This function is used to track a raw COUNT metric that always increases. The Datadog Agent calculates the delta between each submission. Samples that have a lower value than the previous sample are ignored. Lower values usually indicate the underlying raw COUNT metric has been reset. The function can be called multiple times during a check's execution.

For example, submitting samples 2, 3, 6, 7 sends a value of 5 (7-2) during the first check execution. Submitting the samples 10, 11 on the same `monotonic_count` sends a value of 4 (11-7) during the second check execution.

**Note**: Metrics submitted with this function are stored with a `COUNT` metric type in Datadog. Each value in the stored timeseries is a delta of the metric's value between samples (not time-normalized).

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

**Note**: Metrics submitted with this function are stored with a `COUNT` metric type in Datadog. Each value in the stored timeseries is a delta of the metric's value between samples (not time-normalized).

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

This function submits the sampled raw value of your RATE metric. The Datadog Agent calculates the delta of that metric's value between two submission, and divides it by the submission interval to get the rate. This function should only be called once during a check, otherwise it throws away any value that is less than a previously submitted value.

**Note**: Metrics submitted with this function are stored as a `GAUGE` metric type in Datadog. Each value in the stored timeseries is a time-normalized delta of the metric's value between samples.

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

This function submits the sample of a histogram metric that occurred during the check interval. It can be called multiple times during a check's execution. Each sample is added to the statistical distribution of the set of values for this metric.

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

    from datadog_checks.base import AgentCheck

    __version__ = "1.0.0"

    class MyClass(AgentCheck):
        def check(self, instance):
            self.count(
                "example_metric.count",
                2,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.decrement",
                -1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.count(
                "example_metric.increment",
                1,
                tags=["env:dev","metric_submission_type:count"],
            )
            self.rate(
                "example_metric.rate",
                1,
                tags=["env:dev","metric_submission_type:rate"],
            )
            self.gauge(
                "example_metric.gauge",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:gauge"],
            )
            self.monotonic_count(
                "example_metric.monotonic_count",
                2,
                tags=["env:dev","metric_submission_type:monotonic_count"],
            )

            # Calling the functions below twice simulates
            # several metrics submissions during one Agent run.
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
            self.histogram(
                "example_metric.histogram",
                random.randint(0, 10),
                tags=["env:dev","metric_submission_type:histogram"],
            )
    ```

4. [Restart the Agent][4].
5. Validate your custom check is running correctly with the [Agent's status subcommand][5]. Look for `metrics_example` under the Checks section:

    ```text
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

6. Verify your metrics are reporting to Datadog on your [Metric Summary page][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/custom_checks/write_agent_check/
[2]: /metrics/types/
[3]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[4]: /agent/configuration/agent-commands/#restart-the-agent
[5]: /agent/configuration/agent-commands/#agent-information
[6]: https://app.datadoghq.com/metric/summary
