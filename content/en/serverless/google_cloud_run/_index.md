---
title: Google Cloud Run
further_reading:

- link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
  tag: 'Blog'
  text: 'Collect traces, logs, and custom metrics from Cloud Run services'

---

## Overview

Google Cloud Run is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Cloud Run through the [Google Cloud integration][1]. 

<div class="alert alert-info">To instrument your Google Cloud Run applications with <code>serverless-init</code>, see <a href="/serverless/guide/gcr_serverless_init">Instrument Google Cloud Run with serverless-init</a>.</div>

## Setup

### Application

{{< tabs >}}
{{% tab "Node.js" %}}
#### Tracing

In your main application, add the `dd-trace-js` library. See [Tracing Node.js applications][1] for instructions.

#### Metrics
The tracing library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. to forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log`. 

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/nodejs/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/nodejs

{{% /tab %}}
{{% tab "Python" %}}
#### Tracing

In your main application, add the `dd-trace-py` library. See [Tracing Python applications][1] for instructions. You can also use [Tutorial - Enabling tracing for a Python application and Datadog Agent in containers][5].

#### Metrics
The tracing library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. to forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log`. 

To set up logging in your application, see [Python Log Collection][3]. [Python logging best practices][6] can also be helpful. To set up trace log correlation, see [Correlating Python Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/python
[4]: /tracing/other_telemetry/connect_logs_and_traces/python
[5]: /tracing/guide/tutorial-enable-python-containers/
[6]: https://www.datadoghq.com/blog/python-logging-best-practices/

{{% /tab %}}
{{% tab "Java" %}}
#### Tracing

In your main application, add the `dd-trace-java` library. Follow the instructions in [Tracing Java applications][1] or use the following example Dockerfile to add and start the tracing library with automatic instrumentation:

```dockerfile
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY target/cloudrun-java-1.jar cloudrun-java-1.jar


#Add the datadog tracer
ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar


EXPOSE 8080


#Start the datadog tracer via the javaagent argument
ENTRYPOINT [ "java", "-javaagent:dd-java-agent.jar", "-jar", "cloudrun-java-1.jar" ]
```

#### Metrics
To collect custom metrics, [install the Java DogStatsD client][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. to forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log`. 

To set up logging in your application, see [Java Log Collection][3]. To set up trace log correlation, see [Correlating Java Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /developers/dogstatsd/?tab=hostagent&code-lang=java#install-the-dogstatsd-client
[3]: /logs/log_collection/java/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/java

{{% /tab %}}
{{% tab "Go" %}}
#### Tracing

In your main application, add the `dd-trace-go` library. See [Tracing Go applications][1] for instructions.

#### Metrics
The tracing library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. to forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log`. 

To set up logging in your application, see [Go Log Collection][3]. To set up trace log correlation, see [Correlating Go Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/go
[4]: /tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab ".NET" %}}
#### Tracing

In your main application, add the .NET tracing library. See [Tracing .NET applications][1] for instructions.

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

#### Metrics
The tracing library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. to forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log`. 

To set up logging in your application, see [C# Log Collection][3]. To set up trace log correlation, see [Correlating .NET Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux#enable-the-tracer-for-your-service
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /log_collection/csharp/?tab=serilog
[4]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/?tab=serilog
{{% /tab %}}
{{% tab "PHP" %}}
In your main application, add the `dd-trace-php` library. See [Tracing PHP applications][1] for instructions.

#### Metrics
The tracing library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. to forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log`. 

To set up logging in your application, see [PHP Log Collection][3]. To set up trace log correlation, see [Correlating PHP Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/php
[4]: /tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### Sidecar container

1. In Cloud Run, select **Edit & Deploy New Revision**.
1. At the bottom of the page, select **Add Container**.
1. For **Container image URL**, select `gcr.io/datadoghq/serverless-init:1.2.5`
1. Go to **Volume Mounts** and set up a volume mount for logs. Ensure that the mount path matches your application's write location. For example:
   {{< img src="serverless/gcr/volume_mount.png" width="80%" alt="Volume Mounts tab. Under Mounted volumes, Volume Mount 1. For Name 1, 'shared-logs (In-Memory)' is selected. For Mount path 1, '/shared-volume' is selected.">}}
1. Go to **Settings** and add a startup check.
   - **Select health check type**: Startup check
   - **Select probe type**: TCP
   - **Port**: Enter a port number. Make note of this, as it is used in the next step.
1. Go to **Variables & Secrets** and add the following environment variables as name-value pairs:
   - `DD_SERVICE`: A name your service. For example, `gcr-sidecar-test`.
   - `DD_ENV`: A name for your environment. For example, `dev`.
   - `DD_SERVERLESS_LOG_PATH`: Your log path. For example, `/shared-volume/logs/*.log`.
   - `DD_API_KEY`: Your [Datadog API key][2].
   - `DD_HEALTH_PORT`: The port you selected for the startup check in the previous step.

### Main container
1. Go to **Volume Mounts** and add the same shared volume as you did for the sidecar container.
   **Note**: Save your changes by selecting **Done**. Do not deploy changes until the final step.
1. Go to **Variables & Secrets** and add the following environment variables as name-value pairs:
   - `DD_SERVICE`: The same `DD_SERVICE` that you set for the sidecar.
   - `DD_ENV`: The same `DD_ENV` that you set for the sidecar.
1. Go to **Settings**. In the **Container start up order** drop-down menu, select your sidecar.
1. Deploy your main application.

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
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
   "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
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
