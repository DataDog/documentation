---
title: Instrumenting Google Cloud Run Containers with Sidecar
aliases:
  - /serverless/google_cloud_run/containers_sidecar/
further_reading:
- link: 'https://www.datadoghq.com/blog/instrument-cloud-run-with-datadog-sidecar/'
  tag: 'Blog'
  text: 'Instrument Google Cloud Run applications with the new Datadog Agent sidecar'
- link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
  tag: 'Blog'
  text: 'Collect traces, logs, and custom metrics from Cloud Run services'

---

## Overview

Google Cloud Run is a fully managed serverless platform for deploying and scaling container-based applications.

This page provides instructions for instrumenting your Google Cloud Run containers with the Datadog Agent, which enables tracing, custom metrics, and direct log collection. The Datadog Agent runs in a sidecar container.

<div class="alert alert-info">To instrument your Google Cloud Run applications with an in-process approach, see <a href="/serverless/google_cloud_run/containers/in_process">Instrument Google Cloud Run In-Process</a>.</div>

<div class="alert alert-info">
<strong>Have you set up your <a href="/integrations/google-cloud-platform/">Google Cloud integration</a>?</strong> Datadog recommends setting up the integration, which collects metrics and logs from Google Cloud services, before proceeding on to instrumentation. Remember to add the <code>cloud asset viewer</code> role to your service account and enable the Cloud Asset Inventory API in Google Cloud.
</div>

## Setup

### Application

{{< tabs >}}
{{% tab "Node.js" %}}
#### Tracing

In your main application, add the `dd-trace-js` library. See [Tracing Node.js applications][1] for instructions.

Set `ENV NODE_OPTIONS="--require dd-trace/init"`. This specifies that the `dd-trace/init` module is required when the Node.js process starts.

#### Profiling
The profiler is shipped within the `dd-trace-js` library. If you are already using APM to collect traces for your application, you can skip installing the library and go directly to enabling the profiler. See [Enabling the Node.js Profiler][5].

#### Metrics
The `dd-trace-js` library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container. If you decide to deploy using YAML or Terraform, the environment variables, health check, and volume mount are already added.

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/nodejs/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[5]: https://docs.datadoghq.com/profiler/enabling/nodejs?tab=environmentvariables

{{% /tab %}}
{{% tab "Python" %}}
#### Tracing

In your main application, add the `dd-trace-py` library. See [Tracing Python Applications][1] for instructions. You can also use [Tutorial - Enabling Tracing for a Python Application and Datadog Agent in Containers][5].

#### Profiling
The profiler is shipped within the `dd-trace-py` library. If you are already using APM to collect traces for your application, you can skip installing the library and go directly to enabling the profiler. See [Enabling the Python Profiler][7].

#### Metrics
The `dd-trace-py` library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container. If you decide to deploy using YAML or Terraform, the environment variables, health check, and volume mount are already added.

To set up logging in your application, see [Python Log Collection][3]. [Python Logging Best Practices][6] can also be helpful. To set up trace log correlation, see [Correlating Python Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/python
[4]: /tracing/other_telemetry/connect_logs_and_traces/python
[5]: /tracing/guide/tutorial-enable-python-containers/
[6]: https://www.datadoghq.com/blog/python-logging-best-practices/
[7]: https://docs.datadoghq.com/profiler/enabling/python

{{% /tab %}}
{{% tab "Java" %}}
#### Tracing

In your main application, add the `dd-trace-java` library. Follow the instructions in [Tracing Java Applications][1] or use the following example Dockerfile to add and start the `dd-trace-java` library with automatic instrumentation:

```dockerfile
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY target/cloudrun-java-1.jar cloudrun-java-1.jar


# Add the Datadog tracer
ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar


EXPOSE 8080


# Start the Datadog tracer with the javaagent argument
ENTRYPOINT [ "java", "-javaagent:dd-java-agent.jar", "-jar", "cloudrun-java-1.jar" ]
```
#### Profiling
The profiler is shipped within the `dd-trace-java` library. If you are already using APM to collect traces for your application, you can skip installing the library and go directly to enabling the profiler. See [Enabling the Java Profiler][5].

#### Metrics
To collect custom metrics, [install the Java DogStatsD client][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container. If you decide to deploy using YAML or Terraform, the environment variables, health check, and volume mount are already added.

To set up logging in your application, see [Java Log Collection][3]. To set up trace log correlation, see [Correlating Java Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /developers/dogstatsd/?tab=hostagent&code-lang=java#install-the-dogstatsd-client
[3]: /logs/log_collection/java/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/java
[5]: https://docs.datadoghq.com/profiler/enabling/java?tab=datadogprofiler

{{% /tab %}}
{{% tab "Go" %}}
#### Tracing

In your main application, add the `dd-trace-go` library. See [Tracing Go Applications][1] for instructions.

#### Profiling
The profiler is shipped within the `dd-trace-go` library. If you are already using APM to collect traces for your application, you can skip installing the library and go directly to enabling the profiler. See [Enabling the Go Profiler][5].

#### Metrics
The `dd-trace-go` library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container. If you decide to deploy using YAML or Terraform, the environment variables, health check, and volume mount are already added.

To set up logging in your application, see [Go Log Collection][3]. To set up trace log correlation, see [Correlating Go Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/go
[4]: /tracing/other_telemetry/connect_logs_and_traces/go
[5]: https://docs.datadoghq.com/profiler/enabling/go

{{% /tab %}}
{{% tab ".NET" %}}
#### Tracing

In your main application, add the `dd-trace-dotnet` library. See [Tracing .NET Applications][1] for instructions.

Example Dockerfile:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0-jammy
WORKDIR /app
COPY ./bin/Release/net8.0/publish /app

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.56.0/datadog-dotnet-apm_2.56.0_amd64.deb /opt/datadog/datadog-dotnet-apm_2.56.0_amd64.deb
RUN dpkg -i /opt/datadog/datadog-dotnet-apm_2.56.0_amd64.deb
RUN mkdir -p /shared-volume/logs/

ENV CORECLR_ENABLE_PROFILING=1
ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
ENV DD_DOTNET_TRACER_HOME=/opt/datadog/

ENV DD_TRACE_DEBUG=true

ENTRYPOINT ["dotnet", "dotnet.dll"]
```
#### Profiling
The profiler is shipped within the `dd-trace-dotnet` library. If you are already using APM to collect traces for your application, you can skip installing the library and go directly to enabling the profiler. See [Enabling the .NET Profiler][5].
The above Dockerfile example also has the environment variables that enable the profiler.

#### Metrics
The `dd-trace-dotnet` library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container. If you decide to deploy using YAML or Terraform, the environment variables, health check, and volume mount are already added.

To set up logging in your application, see [C# Log Collection][3]. To set up trace log correlation, see [Correlating .NET Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux#enable-the-tracer-for-your-service
[2]: https://www.datadoghq.com/blog/statsd-for-net-dogstatsd/
[3]: /log_collection/csharp/?tab=serilog
[4]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/?tab=serilog
[5]: https://docs.datadoghq.com/profiler/enabling/dotnet?tab=nuget

{{% /tab %}}
{{% tab "PHP" %}}
In your main application, add the `dd-trace-php` library. See [Tracing PHP Applications][1] for instructions.

#### Metrics
The `dd-trace-php` library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container. If you decide to deploy using YAML or Terraform, the environment variables, health check, and volume mount are already added.

To set up logging in your application, see [PHP Log Collection][3]. To set up trace log correlation, see [Correlating PHP Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/php
[4]: /tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### Containers
{{< tabs >}}
{{% tab "GCR UI" %}}

#### Sidecar container

1. In Cloud Run, select **Edit & Deploy New Revision**.
1. At the bottom of the page, select **Add Container**.
1. For **Container image URL**, select `gcr.io/datadoghq/serverless-init:latest`.
1. Go to **Volume Mounts** and set up a volume mount for logs. Ensure that the mount path matches your application's write location. For example:
   {{< img src="serverless/gcr/volume_mount.png" width="80%" alt="Volume Mounts tab. Under Mounted volumes, Volume Mount 1. For Name 1, 'shared-logs (In-Memory)' is selected. For Mount path 1, '/shared-volume' is selected.">}}
1. Go to **Settings** and add a startup check.
   - **Select health check type**: Startup check
   - **Select probe type**: TCP
   - **Port**: Enter a port number. Make note of this, as it is used in the next step.
1. Go to **Variables & Secrets** and add the following environment variables as name-value pairs:
   - `DD_SERVICE`: A name for your service. For example, `gcr-sidecar-test`.
   - `DD_ENV`: A name for your environment. For example, `dev`.
   - `DD_SERVERLESS_LOG_PATH`: Your log path. For example, `/shared-volume/logs/*.log`.
   - `DD_API_KEY`: Your [Datadog API key][1].
   - `DD_HEALTH_PORT`: The port you selected for the startup check in the previous step.

   For a list of all environment variables, including additional tags, see [Environment variables](#environment-variables).

#### Main container

1. Go to **Volume Mounts** and add the same shared volume as you did for the sidecar container.
   **Note**: Save your changes by selecting **Done**. Do not deploy changes until the final step.
1. Go to **Variables & Secrets** and add the same `DD_SERVICE` environment variable that you set for the sidecar container.
1. Go to **Settings**. In the **Container start up order** drop-down menu, select your sidecar.
1. Deploy your main application.

#### Add a service label in Google Cloud

In your Cloud Run service's info panel, add a label with the following key and value:

| Key      | Value                                                       |
|-----------|-------------------------------------------------------------|
| `service` | The name of your service. Matches the value provided as the `DD_SERVICE` environment variable. |

See [Configure labels for services][2] in the Cloud Run documentation for instructions.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://cloud.google.com/run/docs/configuring/services/labels

{{% /tab %}}
{{% tab "YAML deploy" %}}
To deploy your Cloud Run service with YAML service specification, use the following example configuration file.

1. Create a YAML file that contains the following:

   ```yaml
   apiVersion: serving.knative.dev/v1
   kind: Service
   metadata:
     name: '<SERVICE_NAME>'
     labels:
       cloud.googleapis.com/location: '<LOCATION>'
       service: '<SERVICE_NAME>'
   spec:
     template:
       metadata:
         labels:
           service: '<SERVICE_NAME>'
         annotations:
           autoscaling.knative.dev/maxScale: '100' # The maximum number of instances that can be created for this service. https://cloud.google.com/run/docs/reference/rest/v1/RevisionTemplate
           run.googleapis.com/container-dependencies: '{"run-sidecar-1":["serverless-init-1"]}' # Configure container start order for sidecar deployments https://cloud.google.com/run/docs/configuring/services/containers#container-ordering
           run.googleapis.com/startup-cpu-boost: 'true' # The startup CPU boost feature for revisions provides additional CPU during instance startup time and for 10 seconds after the instance has started. https://cloud.google.com/run/docs/configuring/services/cpu#startup-boost
       spec:
         containers:
           - env:
               - name: DD_SERVICE
                 value: '<SERVICE_NAME>'
             image: '<CONTAINER_IMAGE>'
             name: run-sidecar-1
             ports:
               - containerPort: 8080
                 name: http1
             resources:
               limits:
                 cpu: 1000m
                 memory: 512Mi
             startupProbe:
               failureThreshold: 1
               periodSeconds: 240
               tcpSocket:
                 port: 8080
               timeoutSeconds: 240
             volumeMounts:
               - mountPath: /shared-volume
                 name: shared-volume
           - env:
               - name: DD_SERVERLESS_LOG_PATH
                 value: shared-volume/logs/*.log
               - name: DD_SITE
                 value: '<DATADOG_SITE>'
               - name: DD_ENV
                 value: serverless
               - name: DD_API_KEY
                 value: '<API_KEY>'
               - name: DD_SERVICE
                 value: '<SERVICE_NAME>'
               - name: DD_VERSION
                 value: '<VERSION>'
               - name: DD_LOG_LEVEL
                 value: debug
               - name: DD_LOGS_INJECTION
                 value: 'true'
               - name: DD_HEALTH_PORT
                 value: '12345'
             image: gcr.io/datadoghq/serverless-init:latest
             name: serverless-init-1
             resources:
               limits:
                 cpu: 1000m
                 memory: 512Mi # Can be updated to a higher memory if needed
             startupProbe:
               failureThreshold: 3
               periodSeconds: 10
               tcpSocket:
                 port: 12345
               timeoutSeconds: 1
             volumeMounts:
               - mountPath: /shared-volume
                 name: shared-volume
         volumes:
           - emptyDir:
               medium: Memory
               sizeLimit: 512Mi
             name: shared-volume
     traffic: # make this revision and all future ones serve 100% of the traffic as soon as possible, overriding any established traffic split
       - latestRevision: true
         percent: 100
   ```
   In this example, the environment variables, startup health check, and volume mount are already added. If you don't want to enable logs, remove the shared volume. Ensure the container port for the main container is the same as the one exposed in your Dockerfile/service.
1. Supply placeholder values:
   - `<SERVICE_NAME>`: A name for your service. For example, `gcr-sidecar-test`. See [Unified Service Tagging][2].
   - `<LOCATION>`: The region you are deploying your service in. For example, `us-central`.
   - `<DATADOG_SITE>`: Your [Datadog site][3], {{< region-param key="dd_site" code="true" >}}.
   - `<API_KEY>`: Your [Datadog API key][1].
   - `<VERSION>`: The version number of your deployment. See [Unified Service Tagging][2].
   - `<CONTAINER_IMAGE>`: The image of the code you are deploying to Cloud Run. For example, `us-docker.pkg.dev/cloudrun/container/hello`.

1. Run:
   ```bash
   gcloud run services replace <FILENAME>.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/tagging/unified_service_tagging/
[3]: /getting_started/site/

{{% /tab %}}
{{% tab "Terraform deploy" %}}
To deploy your Cloud Run service with Terraform, use the following example configuration file. In this example, the environment variables, startup health check, and volume mount are already added. If you don't want to enable logs, remove the shared volume. Ensure the container port for the main container is the same as the one exposed in your Dockerfile/service. If you do not want to allow public access, remove the IAM policy section.

```terraform
provider "google" {
  project = "<PROJECT_ID>"
  region  = "<LOCATION>"  # example: us-central1
}

resource "google_cloud_run_service" "terraform_with_sidecar" {
  name     = "<SERVICE_NAME>"
  location = "<LOCATION>"

  template {
    metadata {
      annotations = {
        # Correctly formatted container-dependencies annotation
        "run.googleapis.com/container-dependencies" = jsonencode({main-app = ["sidecar-container"]})
      }
      labels = {
        service = "<SERVICE_NAME>"
      }
    }
    spec {
      # Define shared volume
      volumes {
        name = "shared-volume"
        empty_dir {
          medium = "Memory"
        }
      }

      # Main application container
      containers {
        name  = "main-app"
        image = "<CONTAINER_IMAGE>"

        # Expose a port for the main container
        ports {
          container_port = 8080
        }
        # Mount the shared volume
        volume_mounts {
          name      = "shared-volume"
          mount_path = "/shared-volume"
        }

        # Startup Probe for TCP Health Check
        startup_probe {
          tcp_socket {
            port = 8080
          }
          initial_delay_seconds = 0  # Delay before the probe starts
          period_seconds        = 10   # Time between probes
          failure_threshold     = 3   # Number of failures before marking as unhealthy
          timeout_seconds       = 1  # Number of failures before marking as unhealthy
        }

        # Environment variables for the main container
        env {
          name  = "DD_SERVICE"
          value = "<SERVICE_NAME>"
        }

        # Resource limits for the main container
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
      }

      # Sidecar container
      containers {
        name  = "sidecar-container"
        image = "gcr.io/datadoghq/serverless-init:latest"

        # Mount the shared volume
        volume_mounts {
          name      = "shared-volume"
          mount_path = "/shared-volume"
        }

        # Startup Probe for TCP Health Check
        startup_probe {
          tcp_socket {
            port = 12345
          }
          initial_delay_seconds = 0  # Delay before the probe starts
          period_seconds        = 10   # Time between probes
          failure_threshold     = 3   # Number of failures before marking as unhealthy
          timeout_seconds       = 1
        }

        # Environment variables for the sidecar container
        env {
          name  = "DD_SITE"
          value = "<DATADOG_SITE>"
        }
        env {
          name  = "DD_SERVERLESS_LOG_PATH"
          value = "shared-volume/logs/*.log"
        }
        env {
          name  = "DD_ENV"
          value = "serverless"
        }
        env {
          name  = "DD_API_KEY"
          value = "<API_KEY>"
        }
        env {
          name  = "DD_SERVICE"
          value = "<SERVICE_NAME>"
        }
        env {
          name  = "DD_VERSION"
          value = "<VERSION>"
        }
        env {
          name  = "DD_LOG_LEVEL"
          value = "debug"
        }
        env {
          name  = "DD_LOGS_INJECTION"
          value = "true"
        }
        env {
          name  = "DD_HEALTH_PORT"
          value = "12345"
        }

        # Resource limits for the sidecar
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
      }
    }
  }

  # Define traffic splitting
  traffic {
    percent         = 100
    latest_revision = true
  }
}

# IAM Member to allow public access (optional, adjust as needed)
resource "google_cloud_run_service_iam_member" "invoker" {
  service  = google_cloud_run_service.terraform_with_sidecar.name
  location = google_cloud_run_service.terraform_with_sidecar.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
```

Supply placeholder values:
- `<PROJECT_ID>`: Your Google Cloud project ID.
- `<LOCATION>`: The region you are deploying your service in. For example, `us-central1`.
- `<SERVICE_NAME>`: A name for your service. For example, `gcr-sidecar-test`. See [Unified Service Tagging][2].
- `<CONTAINER_IMAGE>`: The image of the code you are deploying to Cloud Run.
- `<DATADOG_SITE>`: Your [Datadog site][3], {{< region-param key="dd_site" code="true" >}}.
- `<API_KEY>`: Your [Datadog API key][1].
- `<VERSION>`: The version number of your deployment. See [Unified Service Tagging][2].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/tagging/unified_service_tagging/
[3]: /getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Environment variables

| Variable | Description |
| -------- | ----------- |
|`DD_API_KEY`| [Datadog API key][4] - **Required**|
| `DD_SITE` | [Datadog site][5] - **Required** |
| `DD_LOGS_INJECTION`| When true, enrich all logs with trace data for supported loggers in [Java][6], [Node][7], [.NET][8], and [PHP][9]. See additional docs for [Python][10], [Go][11], and [Ruby][12]. |
| `DD_SERVICE`      | See [Unified Service Tagging][13].                                  |
| `DD_VERSION`      | See [Unified Service Tagging][13].                                  |
| `DD_ENV`          | See [Unified Service Tagging][13].                                  |
| `DD_SOURCE`       | See [Unified Service Tagging][13].                                  |
| `DD_TAGS`         | See [Unified Service Tagging][13]. |

Do not use the `DD_LOGS_ENABLED` environment variable. This variable is only used for [in-process container instrumentation][14].

## Example application

The following example contains a single app with tracing, metrics, and logs set up.

{{< tabs >}}
{{% tab "Node.js" %}}

```js
const tracer = require('dd-trace').init({
 logInjection: true,
});
const express = require("express");
const app = express();
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
 level: 'info',
 exitOnError: false,
 format: format.json(),
 transports: [new transports.File({ filename: `/shared-volume/logs/app.log`}),
  ],
});

app.get("/", (_, res) => {
 logger.info("Welcome!");
 res.sendStatus(200);
});

app.get("/hello", (_, res) => {
 logger.info("Hello!");
 metricPrefix = "nodejs-cloudrun";
 // Send three unique metrics, just so we're testing more than one single metric
 metricsToSend = ["sample_metric_1", "sample_metric_2", "sample_metric_3"];
 metricsToSend.forEach((metric) => {
   for (let i = 0; i < 20; i++) {
     tracer.dogstatsd.distribution(`${metricPrefix}.${metric}`, 1);
   }
 });
 res.status(200).json({ msg: "Sending metrics to Datadog" });
});

const port = process.env.PORT || 8080;
app.listen(port);
```

{{% /tab %}}
{{% tab "Python" %}}

### app.py

```python
import ddtrace
from flask import Flask, render_template, request
import logging
from datadog import initialize, statsd

ddtrace.patch(logging=True)
app = Flask(__name__)
options = {
   'statsd_host':'127.0.0.1',
   'statsd_port':8125
}
FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
         '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
         '- %(message)s')
logging.basicConfig(level=logging.DEBUG, filename='app.log', format=FORMAT)
logger = logging.getLogger(__name__)
logger.level = logging.INFO

ddlogs = []

@ddtrace.tracer.wrap(service="dd_gcp_log_forwader")
@app.route('/', methods=["GET"])
def index():
   log = request.args.get("log")
   if log != None:
       with tracer.trace('sending_logs') as span:
           statsd.increment('dd.gcp.logs.sent')
           span.set_tag('logs', 'nina')
           logger.info(log)
           ddlogs.append(log)
   return render_template("home.html", logs=ddlogs)

if __name__ == '__main__':
   tracer.configure(port=8126)
   initialize(**options)
   app.run(debug=True)
```

### Home.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Datadog Test</title>
</head>
<body>
   <h1>Welcome to Datadog!💜</h1>
   <form action="">
       <input type="text" name="log" placeholder="Enter Log">
       <button>Add Log</button>
   </form>
   <h3>Logs Sent to Datadog:</h3>
   <ul>
   {% for log in logs%}
       {% if log %}
       <li>{{ log }}</li>
       {% endif %}
   {% endfor %}
   </ul>
</body>
</html>
```
{{% /tab %}}
{{% tab "Java" %}}

```java
package com.example.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

@RestController
public class HelloController {
   Private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();
   private static final Log logger = LogFactory.getLog(HelloController.class);
   @GetMapping("/")
   public String index() {
       Statsd.incrementCounter("page.views");
       logger.info("Hello Cloud Run!");
       return "💜 Hello Cloud Run! 💜";
   }
}
```

{{% /tab %}}
{{% tab "Go" %}}
```go
package main


import (
   "fmt"
   "log"
   "net/http"
   "os"
   "path/filepath"


   "github.com/DataDog/datadog-go/v5/statsd"
   "github.com/DataDog/dd-trace-go/v2/ddtrace"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)


const logDir = "/shared-volume/logs"

var logFile *os.File
var logCounter int
var dogstatsdClient *statsd.Client

func handler(w http.ResponseWriter, r *http.Request) {
   log.Println("Yay!! Main container works")
   span := tracer.StartSpan("maincontainer", tracer.ResourceName("/handler"))
   defer span.Finish()
   logCounter++
   writeLogsToFile(fmt.Sprintf("received request %d", logCounter), span.Context())
   dogstatsdClient.Incr("request.count", []string{"test-tag"}, 1)
}

func writeLogsToFile(log_msg string, context ddtrace.SpanContext) {
   span := tracer.StartSpan(
       "writeLogToFile",
       tracer.ResourceName("/writeLogsToFile"),
       tracer.ChildOf(context))
   defer span.Finish()
   _, err := logFile.WriteString(log_msg + "\n")
   if err != nil {
       log.Println("Error writing to log file:", err)
   }
}

func main() {
   log.Print("Main container started...")

   err := os.MkdirAll(logDir, 0755)
   if err != nil {
       panic(err)
   }
   logFilePath := filepath.Join(logDir, "maincontainer.log")
   log.Println("Saving logs in ", logFilePath)
   logFileLocal, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
   if err != nil {
       panic(err)
   }
   defer logFileLocal.Close()

   logFile = logFileLocal

   dogstatsdClient, err = statsd.New("localhost:8125")
   if err != nil {
       panic(err)
   }
   defer dogstatsdClient.Close()

   tracer.Start()
   defer tracer.Stop()

   http.HandleFunc("/", handler)
   log.Fatal(http.ListenAndServe(":8080", nil))
}
```
{{% /tab %}}
{{% tab ".NET" %}}
```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Serilog;
using Serilog.Formatting.Json;
using Serilog.Formatting.Compact;
using Serilog.Sinks.File;
using StatsdClient;


namespace dotnet.Pages;


public class IndexModel : PageModel
{
   private readonly static DogStatsdService _dsd;
   static IndexModel()
   {
       var dogstatsdConfig = new StatsdConfig
       {
           StatsdServerName = "127.0.0.1",
           StatsdPort = 8125,
       };


       _dsd = new DogStatsdService();
       _dsd.Configure(dogstatsdConfig);


       Log.Logger = new LoggerConfiguration()
           .WriteTo.File(new RenderedCompactJsonFormatter(), "/shared-volume/logs/app.log")
           .CreateLogger();
   }
   public void OnGet()
   {
       _dsd.Increment("page.views");
       Log.Information("Hello Cloud Run!");
   }
}
```
{{% /tab %}}
{{% tab "PHP" %}}

```php
<?php


require __DIR__ . '/vendor/autoload.php';


use DataDog\DogStatsd;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Monolog\Formatter\JsonFormatter;


$statsd = new DogStatsd(
   array('host' => '127.0.0.1',
         'port' => 8125,
    )
 );


$log = new logger('datadog');
$formatter = new JsonFormatter();


$stream = new StreamHandler('/shared-volume/logs/app.log', Logger::DEBUG);
$stream->setFormatter($formatter);


$log->pushHandler($stream);


$log->info("Hello Datadog!");
echo '💜 Hello Datadog! 💜';


$log->info("sending a metric");
$statsd->increment('page.views', 1, array('environment'=>'dev'));


?>
```

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/google_cloud_platform/#log-collection
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://hub.docker.com/r/datadog/serverless-init
[4]: /account_management/api-app-keys/#api-keys
[5]: /getting_started/site/
[6]: /tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[7]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[8]: /tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[9]: /tracing/other_telemetry/connect_logs_and_traces/php
[10]: /tracing/other_telemetry/connect_logs_and_traces/python
[11]: /tracing/other_telemetry/connect_logs_and_traces/go
[12]: /tracing/other_telemetry/connect_logs_and_traces/ruby
[13]: /getting_started/tagging/unified_service_tagging/
[14]: /serverless/google_cloud_run/containers/in_process
[15]: https://cloud.google.com/run/docs/configuring/services/labels
