---
title: (LEGACY) Troubleshooting
disable_toc: false
aliases:
  - /observability_pipelines/troubleshooting/
further_reading:
  - link: /observability_pipelines/legacy/monitoring/
    tag: Documentation
    text: Monitor the health of your pipelines
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

## 概要
If you experience unexpected behavior with Datadog Observability Pipelines (OP), there are a few common issues you can investigate, and this guide may help resolve issues quickly. If you continue to have trouble, reach out to [Datadog support][3] for further assistance.

## Investigate diagnostic logs

The Observability Pipelines Worker emits internal logs about its own health. In the Observability Pipelines UI, you can investigate any internal error logs that the Worker process emits for all of its individual components. To see these diagnostic logs:

1. Navigate to [Observability Pipelines][1].
1. Click into the pipeline you want to investigate.
1. Click on a component to see the component's side panel.
1. Click the **Diagnostic Logs** tab to view error logs that the Worker is emitting. Click on a log record to investigate it in the Log Explorer. If there are no logs listed, then the component is not emitting any error logs.

### Get more detailed logs

If you need more details about the internal logs the OP Worker collects, you can increase the level of the logs using the `VECTOR_LOG` environment variable. By default, this is set to `INFO`, which means that `INFO`, `WARNING`, and `ERROR` messages show in the console.

If you set this to `DEBUG`, you get more detailed information about the Worker's internal processes (including HTTP requests made and the responses received). Datadog support may ask you for `DEBUG` logs to help with troubleshooting your issues. These logs also appear in the Log Explorer and [diagnostic logs](#investigate-diagnostic-logs).

## Inspect events flowing through your pipeline to identify setup issues

With OP Worker v1.4.0+, you can `tap` into the data that is going through your sources, transforms, and sinks so that you can see the raw data flowing through each individual component of your pipeline.

### Enable the Observability Pipelines Worker API

 The Observability Pipelines Worker API allows you to interact with the Worker's processes with the `tap` command. If you are using the Helm charts provided in the [setup guides][2], then the API has already been enabled. Otherwise, make sure the environment variable `DD_OP_API_ENABLED` is set to `true`. This sets up the API to listen on `localhost` and port `8686`, which is what the CLI for `tap` is expecting.

### Use `tap` to see your data

If you are on the same host as the Worker, run the following command to `tap` the output:

```
observability-pipelines-worker tap <source or transform name>
```

If you are using a containerized environment, use the `docker exec` or `kubectl exec` command to get a shell into the container to run the above `tap` command.

### Example of using `tap`

Add the following example configuration, where the `cleanup` transform makes the `log` attribute a copy of the `message`:

```
sources:
  demo:
    type: demo_logs
    format: json

transforms:
  cleanup:
    type: remap
    inputs:
      - demo
    source: |-
      .log = .message

sinks:
  blackhole:
    type: blackhole
  inputs:
    - cleanup
  print_interval_secs: 0
```

Use the following command to run the example configuration and see the output of the `cleanup` transform:

```
observability-pipelines-worker tap cleanup
```

The expected output should be similar to the following, where the `log` attribute is a copy of the `message` attribute:

```
[tap] Pattern 'cleanup' successfully matched.
{"log":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","message":"{\"host\":\"121.142.241.212\",\"user-identifier\":\"meln1ks\",\"datetime\":\"25/Aug/2023:00:07:53\",\"method\":\"OPTION\",\"request\":\"/observability/metrics/production\",\"protocol\":\"HTTP/1.0\",\"status\":\"550\",\"bytes\":3185,\"referer\":\"https://make.us/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:53.429855261Z"}
{"log":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","message":"{\"host\":\"117.214.24.224\",\"user-identifier\":\"Karimmove\",\"datetime\":\"25/Aug/2023:00:07:54\",\"method\":\"HEAD\",\"request\":\"/do-not-access/needs-work\",\"protocol\":\"HTTP/2.0\",\"status\":\"503\",\"bytes\":41730,\"referer\":\"https://some.org/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:54.430584949Z"}
{"log":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","message":"{\"host\":\"108.145.218.149\",\"user-identifier\":\"shaneIxD\",\"datetime\":\"25/Aug/2023:00:07:55\",\"method\":\"DELETE\",\"request\":\"/this/endpoint/prints/money\",\"protocol\":\"HTTP/2.0\",\"status\":\"403\",\"bytes\":18340,\"referer\":\"https://up.de/wp-admin\"}","service":"vector","source_type":"demo_logs","timestamp":"2023-08-25T00:07:55.430085107Z"}
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines/
[2]: /observability_pipelines/legacy/setup/
[3]: /help
