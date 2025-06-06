---
title: Google Cloud Run Services
aliases:
    - /serverless/gcp/gcr
further_reading:
- link: 'https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/'
  tag: 'Blog'
  text: 'Instrument Google Cloud Run applications with the new Datadog Agent sidecar'
---

## Overview

[Google Cloud Run][1] is a fully managed serverless platform for deploying and scaling container-based applications in Google Cloud. Datadog provides metrics and logs collection for these services through the [Google Cloud Integration][2]. This page describes the process of instrumenting your application code running in Google Cloud Run. Datadog only supports Google Cloud Run Services, not Google Cloud Run Jobs.

## Setup

<div class="alert alert-info">To instrument your Google Cloud Run applications with in-process instrumentation, see <a href="./google_cloud_run_in_process">Google Cloud Run In-Process</a>. For details on the tradeoffs between the Sidecar instrumentation described here and In-Process instrumentation, see <a href="/serverless/google_cloud#sidecar-vs-in-process-instrumentation-for-google-cloud-run">Sidecar vs. In-Process Instrumentation for Google Cloud Run</a>.</div>

The recommended process for instrumenting Google Cloud Run applications is to install a tracer and use a [Sidecar][3] to collect the custom metrics and traces from your application. The application is configured to write its logs to a volume shared with the sidecar which then forwards them to Datadog.

### Applications

Set up a Datadog tracing library, configure the application to send `dogstatsd` metrics to port `8125`, and send correctly-formatted logs to the shared volume.

For custom metrics, use the [Distribution Metrics][4] to correctly aggregate data from multiple Google Cloud Run instances.

{{< tabs >}}
{{% tab "Node.js" %}}
Add the `dd-trace-js` [library][1] to your application.

#### app.js
```js
// The tracer includes a dogstatsd client. The tracer is actually started with `NODE_OPTIONS`
// so that we can take advantage of startup tracing.
// The tracer will inject the current trace ID into logs with `DD_LOGS_INJECTION`.
// The tracer will send profiling information with `DD_PROFILING_ENABLED`.
const tracer = require('dd-trace').init();

const express = require("express");
const app = express();

const { createLogger, format, transports } = require('winston');

// We can use the DD_SERVERLESS_LOG_PATH environment variable if it is available.
// While this is not necessary, it the log forwarding configuration centralized
// in the cloud run configuration.
const logFilename = process.env.DD_SERVERLESS_LOG_PATH?.replace("*.log", "app.log") || "/shared-logs/logs/app.log";
console.log(`writing logs to ${logFilename}`);

const logger = createLogger({
	level: 'info',
	exitOnError: false,
	format: format.json(),
	transports: [new transports.File({ filename: logFilename })],
});

app.get("/", (_, res) => {
	logger.info("Hello!");
	tracer.dogstatsd.distribution("our-sample-app.sample-metric", 1);

	res.status(200).json({ msg: "A traced endpoint with custom metrics" });
});

const port = process.env.PORT || 8080;
app.listen(port);
```

You can use `npm install dd-trace` to add the tracer to your package.

#### Dockerfile

Your `Dockerfile` can look something like this. This creates a minimal application container with metrics, traces, logs, and profiling.

**Note**: The Dockerfile needs to be built for the x86_64 architecture (use the `--platform linux/arm64` parameter for `docker build`).

```dockerfile
FROM node:22-slim

COPY app.js package.json package-lock.json .
RUN npm ci --only=production

# Initialize the tracer
ENV NODE_OPTIONS="--require dd-trace/init"

EXPOSE 8080

CMD ["node", "app.js"]
```

#### Details
The `dd-trace-js` library provides support for [Tracing][1], [Metrics][2], and [Profiling][3].

Set the `NODE_OPTIONS="--require dd-trace/init"` environment variable in your docker container to include the `dd-trace/init` module when the Node.js process starts.

Application [logs][4] need to be sent to a file that the sidecar container can access. The container setup is detailed [below](#containers). [Log and trace correlation][5] is possible when logging is combined with the `dd-trace-js` library. The sidecar finds log files based on the `DD_SERVERLESS_LOG_PATH` environment variable, usually `/shared-logs/logs/*.log` which forwards all of the files ending in `.log` in the `/shared-logs/logs` directory. The application container needs the `DD_LOGS_INJECTION` environment variable to be set since it is using `NODE_OPTIONS` to actually start the tracer. If you do not use `NODE_OPTIONS`, call the `dd-trace` `init` method with the `logInjection: true` configuration parameter:

```js
const tracer = require('dd-trace').init({
	logInjection: true,
});
```

Set `DD_PROFILING_ENABLED` to enable [Profiling][3].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /profiler/enabling/nodejs/
[4]: /logs/log_collection/nodejs/?tab=winston30
[5]: /tracing/other_telemetry/connect_logs_and_traces/nodejs

{{% /tab %}}
{{% tab "Python" %}}
See the [Sample App][6] for an example of metrics, tracing, and logging in a Python app. It includes a deploy script that uses Terraform.

The `dd-trace-py` library provides support for [tracing][1]. The `datadog-py` library handles custom [metrics][3].

Wrap the application in `ddtrace-run` to automatically apply tracing instrumentation to the code. This is usually done with `ddtrace-run python app.py`. The [Sample App][6] includes a `Dockerfile` which uses this pattern.

Application [Logs][4] need to be sent to a file that the sidecar container can access. The container setup is detailed [below](#containers). The sidecar finds log files based on the `DD_SERVERLESS_LOG_PATH` environment variable, usually `/shared-logs/logs/*.log` which forwards all of the files ending in `.log` in the `/shared-logs/logs` directory.

[Log and Trace Correlation][5] is not supported for Google Cloud Run services written in Python.

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?tab=python#code-examples
[4]: /logs/log_collection/python/
[5]: /tracing/other_telemetry/connect_logs_and_traces/python
[6]: https://github.com/DataDog/serverless-gcp-sample-apps/tree/aleksandr.pasechnik/gcp-docs-refresh/cloud-run/sidecar/python

{{% /tab %}}
{{% tab "Java" %}}
#### Example Code
```java
// add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{% tab "Go" %}}
#### Example Code
```go
// add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{% tab ".NET" %}}
#### Example Code
```csharp
// add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{% tab "PHP" %}}
#### Example Code
```php
// add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{< /tabs >}}

### Containers

A sidecar `gcr.io/datadoghq/serverless-init:latest` container is used to collect telemetry from your application container and send it to datadog. The sidecar container is configured with a healthcheck for correct starup, and a shared volume for log forwarding, and the environment variables documented [below](#environment-variables).

#### Environment Variables

| Variable | Container | Description |
| -------- | --------- | ----------- |
| `DD_SERVERLESS_LOG_PATH` | Sidecar (and Application, see notes) | The path where the agent looks for logs. For example `/shared-logs/logs/*.log`. - **Required** |
| `DD_API_KEY`| Sidecar | [Datadog API key][5] - **Required**|
| `DD_SITE` | Sidecar | [Datadog site][6] - **Required** |
| `DD_LOGS_INJECTION` | Sidecar *and* Application | When `true`, enrich all logs with trace data for supported loggers in [Java][7], [Node][8], [.NET][9], and [PHP][10]. See additional docs for [Python][11], [Go][12], and [Ruby][13]. See also the details for your runtime above. |
| `DD_SERVICE`      | Sidecar *and* Application | See [Unified Service Tagging][14].                                  |
| `DD_VERSION`      | Sidecar | See [Unified Service Tagging][14].                                  |
| `DD_ENV`          | Sidecar | See [Unified Service Tagging][14].                                  |
| `DD_TAGS`         | Sidecar | See [Unified Service Tagging][14]. |
| `DD_HEALTH_PORT` | Sidecar | The port for sidecar health checks. For example `9999` |

The `DD_SERVERLESS_LOG_PATH` environment variable is not required on the application. But it can be set there and then used to configure the application's log filename. This avoids manually synchronizing the Cloud Run service's log path with the application code that writes to it.

The `DD_LOGS_ENABLED` environment variable is not required.

The `DD_SERVICE` lable needs to be set on the Sidecar and the Application. The service value should also be set on the `service` label applied to the Google Cloud Run service. This ensures that the Google Cloud integration correctly picks up the Cloud Run service. More information about Google Cloud labels can be found in the [official docs][15].
{{< tabs >}}
{{% tab "GCR UI" %}}
1. On the Cloud Run service page, select **Edit & Deploy New Revision**.
1. Open the **Volumes** main tab and create a new volume for log forwarding.
    1. Make an `In-Memory` volume called `shared-logs`.
    1. You may set a size limit if necessary.
1. Open the **Containers** main tab and click **Add Container** to add a new `gcr.io/datadoghq/serverless-init:latest` sidecar container.
1. Click **Add health check** to add a `Startup check` for the container.
    1. Select the `TCP` **probe type**.
    2. Choose any free port (`9999`, for example). We will need this port number shortly for the `DD_HEALTH_PORT` variable.
1. Click the **Variables & Secrets** tab and add the required environment variables.
    - The `DD_HEALTH_PORT` variable should be the port for the TCP health check you configured.
    - The `DD_SERVERLESS_LOG_PATH` variable should be set to `/shared-logs/logs/*.log` where `/shared-logs` is the volume mount point we will use in the next step.
    - See the table above for the other required and suggested [Environment Variables](#environment-variables).
1. Click the **Volume Mounts** tab and add the logs volume mount.
    - Mount it at the location that matches the prefix of `DD_SERVERLESS_LOG_PATH`, for example `/shared-logs` for a `/shared-logs/logs/*.log` log path.
1. Edit the application container.
1. Click the **Volume Mounts** tab and add the logs volume mount.
    - Mount it to the same location that you did for the sidecar container, for example `/shared-logs`.
1. Click the **Variables & Secrets** tab and set the `DD_SERVICE` and `DD_LOGS_INJECTION` environment variables as you did for the sidecar.
1. Click the **Settings** tab and set the **Container start up order** to **Depends on** the sidecar container.
1. **Deploy** the application.

### Add a `service` label
Add a `service` label which matches the `DD_SERVICE` value on the containers to the Google Cloud service. Access this through the service list, by selecting the service and then clicking the **Labels** button.

{{% /tab %}}
{{% tab "YAML deploy" %}}
1. Step
1. by
1. step
1. instructions
    - with some details.
{{% /tab %}}
{{% tab "Terraform" %}}
The [Python Sample App][1] includes an example of a Terraform configuration. The app uses the `google_cloud_run_v2_service` [resource][2] from the `hashicorp/google` provider.

**Note**: The `service` value needs to be set in multiple locations. The shared log volume needs to be connected to both the application and the sidecar containers.

[1]: https://github.com/DataDog/serverless-gcp-sample-apps/tree/aleksandr.pasechnik/gcp-docs-refresh/cloud-run/sidecar/python
[2]: https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_run_v2_service

{{% /tab %}}
{{< /tabs >}}



## Futher Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/run/docs/overview/what-is-cloud-run
[2]: /integrations/google_cloud_platform
[3]: https://cloud.google.com/run/docs/deploying#sidecars
[4]: /metrics/distributions
[5]: /account_management/api-app-keys/#api-keys
[6]: /getting_started/site/
[7]: /tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[8]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[9]: /tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[10]: /tracing/other_telemetry/connect_logs_and_traces/php
[11]: /tracing/other_telemetry/connect_logs_and_traces/python
[12]: /tracing/other_telemetry/connect_logs_and_traces/go
[13]: /tracing/other_telemetry/connect_logs_and_traces/ruby
[14]: /getting_started/tagging/unified_service_tagging/
[15]: https://cloud.google.com/run/docs/configuring/services/labels
