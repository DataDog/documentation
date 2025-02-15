---
title: Instrument Azure App Service - Linux Containers
further_reading:
- link: "/integrations/azure_app_services/"
  tag: "Documentation"
  text: "Azure App Service"
- link: "/integrations/azure_app_service_environment/"
  tag: "Documentation"
  text: "Azure App Service Environment"
---

<div class="alert alert-info">To instrument your Azure App Service containers with <code>serverless-init</code>, see <a href="/serverless/guide/azure_app_service_linux_containers_serverless_init">Instrument Azure App Service - Linux Container with serverless-init</a>.</div>

### Prerequisites

This document assumes that your application is set up for sidecars according to Azure's [Configure a sidecar container for custom container in Azure App Service][1] tutorial.

## Setup

### Application

{{< tabs >}}
{{% tab "Node.js" %}}
#### Tracing
Instrument your main application with the `dd-trace-js` library. See [Tracing Node.js applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
The Datadog sidecar uses file tailing to collect logs. Datadog recommends writing application logs to `/home/LogFiles/` because this directory is persisted across restarts. 

You can also create a subdirectory, such as `/home/LogFiles/myapp`, if you want more control over what is sent to Datadog. However, if you do not tail all log files in `/home/LogFiles`, then Azure App Service application logs related to startups and errors are not collected.

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs#code-examples
[3]: /logs/log_collection/nodejs/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### Tracing
Instrument your main application with the `dd-trace-py` library. See [Tracing Python applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
The Datadog sidecar uses file tailing to collect logs. Datadog recommends writing application logs to `/home/LogFiles/` because this directory is persisted across restarts. 

You can also create a subdirectory, such as `/home/LogFiles/myapp`, if you want more control over what is sent to Datadog. However, if you do not tail all log files in `/home/LogFiles`, then Azure App Service application logs related to startups and errors are not collected.

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python#code-examples
[3]: /logs/log_collection/python/
[4]: /tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### Tracing
Instrument your main application with the `dd-trace-java` library. See [Tracing Java applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
The Datadog sidecar uses file tailing to collect logs. Datadog recommends writing application logs to `/home/LogFiles/` because this directory is persisted across restarts. 

You can also create a subdirectory, such as `/home/LogFiles/myapp`, if you want more control over what is sent to Datadog. However, if you do not tail all log files in `/home/LogFiles`, then Azure App Service application logs related to startups and errors are not collected.

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[3]: /logs/log_collection/java/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab ".NET" %}}
#### Tracing
Instrument your main application with the `dd-trace-dotnet` library.

1. Add the following lines to the Dockerfile for your main application. This installs and configures the Datadog tracer within your application container.
   {{< code-block lang="dockerfile" >}}
   RUN mkdir -p /datadog/tracer
   RUN mkdir -p /home/LogFiles/dotnet

   ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.51.0/datadog-dotnet-apm-2.51.0.tar.gz /datadog/tracer
   RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.51.0.tar.gz
   {{< /code-block >}}

2. Build the image and push it to your preferred container registry.

**Full example Dockerfile**

{{< highlight dockerfile "hl_lines=22-27" >}}
# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the remaining source code
COPY . .

# Build the application
RUN dotnet publish -c Release -o out

# Stage 2: Create a runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy the build output from stage 1
COPY --from=build /app/out ./

# Datadog specific
RUN mkdir -p /datadog/tracer
RUN mkdir -p /home/LogFiles/dotnet

ADD https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.51.0/datadog-dotnet-apm-2.51.0.tar.gz /datadog/tracer
RUN cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.51.0.tar.gz

# Set the entry point for the application
ENTRYPOINT ["dotnet", "<your dotnet app>.dll"]
{{< /highlight >}}

For more information, see [Tracing .NET Applications][1].

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
The Datadog sidecar uses file tailing to collect logs. Datadog recommends writing application logs to `/home/LogFiles/` because this directory is persisted across restarts. 

You can also create a subdirectory, such as `/home/LogFiles/myapp`, if you want more control over what is sent to Datadog. However, if you do not tail all log files in `/home/LogFiles`, then Azure App Service application logs related to startups and errors are not collected.

To set up logging in your application, see [C# Log Collection][3]. To set up trace log correlation, see [Correlating .NET Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=dotnet#code-examples
[3]: /logs/log_collection/csharp
[4]: /tracing/other_telemetry/connect_logs_and_traces/dotnet

{{% /tab %}}
{{% tab "Go" %}}
#### Tracing
Instrument your main application with the `dd-trace-go` library. See [Tracing Go applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
The Datadog sidecar uses file tailing to collect logs. Datadog recommends writing application logs to `/home/LogFiles/` because this directory is persisted across restarts. 

You can also create a subdirectory, such as `/home/LogFiles/myapp`, if you want more control over what is sent to Datadog. However, if you do not tail all log files in `/home/LogFiles`, then Azure App Service application logs related to startups and errors are not collected.

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[3]: /logs/log_collection/go/
[4]: /tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### Tracing
Instrument your main application with the `dd-trace-php` library. See [Tracing PHP applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
The Datadog sidecar uses file tailing to collect logs. Datadog recommends writing application logs to `/home/LogFiles/` because this directory is persisted across restarts. 

You can also create a subdirectory, such as `/home/LogFiles/myapp`, if you want more control over what is sent to Datadog. However, if you do not tail all log files in `/home/LogFiles`, then Azure App Service application logs related to startups and errors are not collected.

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[3]: /logs/log_collection/php/
[4]: /tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### Sidecar container

1. In the Azure Portal, go to **Deployment Center** and select **Add**.
2. In the **Edit container** form, provide the following:
   - **Image source**: Docker Hub or other registries
   - **Image type**: Public
   - **Registry server URL**: `index.docker.io`
   - **Image and tag**: `datadog/serverless-init:latest`
   - **Port**: 8126
3. Select **Apply**.

### Application settings

In your **App settings** in Azure, set the following environment variables:

- `DD_API_KEY`: Your [Datadog API key][3]
- `DD_SERVICE`: How you want to tag your service. For example, `sidecar-azure`
- `DD_ENV`: How you want to tag your env. For example, `prod`
- `DD_SERVERLESS_LOG_PATH`: Where you write your logs. For example, `/home/LogFiles/*.log` or `/home/LogFiles/myapp/*.log`

<details open>
<summary>
<h4>For .NET applications: Additional required environment variables</h4>
</summary>

If you are setting up monitoring for a .NET application, configure the following **required** environment variables.

| Variable name | Value |
| ------------- | ----- |
| `DD_DOTNET_TRACER_HOME` | `/datadog/tracer` |
| `DD_TRACE_LOG_DIRECTORY` | `/home/Logfiles/dotnet` |
| `CORECLR_ENABLE_PROFILING` | `1` |
| `CORECLR_PROFILER` | `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` |
| `CORECLR_PROFILER_PATH` | `/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so` |
</details>

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
 transports: [new transports.File({ filename: `/home/LogFiles/app.log`}),
  ],
});

app.get("/", (_, res) => {
 logger.info("Welcome!");
 res.sendStatus(200);
});

app.get("/hello", (_, res) => {
 logger.info("Hello!");
 metricPrefix = "nodejs-azure-sidecar";
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
```python
from flask import Flask, Response
from datadog import initialize, statsd
import ddtrace
import logging

ddtrace.patch(logging=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
         '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
         '- %(message)s')
logging.basicConfig(filename='/home/LogFiles/app.log', format=FORMAT)
log = logging.getLogger(__name__)
log.level = logging.INFO

options = {
   'statsd_host':'127.0.0.1',
   'statsd_port':8125
}

initialize(**options)

app = Flask(__name__)

@app.route("/")
def home():
   statsd.increment('page.views')
   log.info('Hello Datadog!!')
   return Response('💜 Hello Datadog!! 💜', status=200, mimetype='application/json')

app.run(host="0.0.0.0", port=8080)
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
   private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").port(8125).build();
   private static final Log logger = LogFactory.getLog(HelloController.class);
   @GetMapping("/")
   public String index() {
       Statsd.incrementCounter("page.views");
       logger.info("Hello Azure!");
       return "💜 Hello Azure! 💜";
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
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

const logDir = "/home/LogFiles"

var logFile *os.File
var logCounter int
var dogstatsdClient *statsd.Client

func handler(w http.ResponseWriter, r *http.Request) {
   log.Println("Hello Datadog!")
   span := tracer.StartSpan("maincontainer", tracer.ResourceName("/handler"))
   defer span.Finish()
   logCounter++
   writeLogsToFile(fmt.Sprintf("received request %d", logCounter), span.Context())
   dogstatsdClient.Incr("request.count", []string{}, 1)
   fmt.Fprintf(w, "💜 Hello Datadog! 💜")
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
   logFilePath := filepath.Join(logDir, "app.log")
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

$stream = new StreamHandler('/home/LogFiles/app.log', Logger::DEBUG);
$stream->setFormatter($formatter);

$log->pushHandler($stream);

$log->pushProcessor(function ($record) {
 $record['message'] .= sprintf(
     ' [dd.trace_id=%s dd.span_id=%s]',
     \DDTrace\logs_correlation_trace_id(),
     \dd_trace_peek_span_id()
 );
 return $record;
});

$log->info("Hello Datadog!");
echo '💜 Hello Datadog! 💜';

$log->info("sending a metric");
$statsd->increment('page.views', 1, array('environment'=>'dev'));

?>

```
{{% /tab %}}
{{< /tabs >}}

[1]: https://learn.microsoft.com/en-us/azure/app-service/tutorial-custom-container-sidecar
[2]: https://docs.datadoghq.com/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: https://app.datadoghq.com/organization-settings/api-keys
