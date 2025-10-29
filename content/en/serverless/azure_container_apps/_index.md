---
title: Azure Container Apps
further_reading:
  - link: "/serverless/guide/disable_serverless"
    tag: "Documentation"
    text: "Disable Serverless Monitoring"
  - link: 'https://www.datadoghq.com/blog/azure-container-apps/'
    tag: 'Blog'
    text: 'Collect traces, logs, and custom metrics from Container Apps services'
  - link: 'http://datadoghq.com/blog/azure-well-architected-serverless-applications-best-practices/'
    tag: 'Blog'
    text: 'Build secure and scalable Azure serverless applications with the Well-Architected Framework'
---

<div class="alert alert-info">To instrument your Azure Container Apps applications with an in-container Datadog Agent, see <a href="/serverless/guide/aca_serverless_init">Azure Container Apps with serverless-init</a>.</div>

## Overview
Azure Container Apps is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides standard metrics and log collection for Container Apps through the [Azure integration][1]. Datadog also provides a solution for instrumenting your Container Apps applications with a purpose-built Agent to enable tracing, custom metrics, and direct log collection.

{{< img src="serverless/azure_container_apps/aca_top_2.png" alt="Datadog UI, Serverless Monitoring page with Azure Container Apps selected." style="width:100%;" >}}

## Setup

### Azure integration

Install the [Datadog-Azure integration][4] to collect metrics and logs.

### Application

{{< tabs >}}
{{% tab "Node.js" %}}
#### Tracing
Instrument your main application with the `dd-trace-js` library. See [Tracing Node.js applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
As an alternative to collecting logs through the Azure integration, you can use the Datadog sidecar with file tailing to collect application logs. Ensure that the logging path used in your application matches the path set in `DD_SERVERLESS_LOG_PATH` when setting up your sidecar in the [Instrumentation](#instrumentation) section.

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/nodejs/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### Tracing
Instrument your main application with the `dd-trace-py` library. See [Tracing Python applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
As an alternative to collecting logs through the Azure integration, you can use the Datadog sidecar with file tailing to collect application logs. Ensure that the logging path used in your application matches the path set in `DD_SERVERLESS_LOG_PATH` when setting up your sidecar in the [Instrumentation](#instrumentation) section.

To set up logging in your application, see [Python Log Collection][3]. To set up trace log correlation, see [Correlating Python Logs and Traces][4].

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
As an alternative to collecting logs through the Azure integration, you can use the Datadog sidecar with file tailing to collect application logs. Ensure that the logging path used in your application matches the path set in `DD_SERVERLESS_LOG_PATH` when setting up your sidecar in the [Instrumentation](#instrumentation) section.

To set up logging in your application, see [Java Log Collection][3]. To set up trace log correlation, see [Correlating Java Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[3]: /logs/log_collection/java/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab "Go" %}}
#### Tracing
Instrument your main application with the `dd-trace-go` library. See [Tracing Go applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
As an alternative to collecting logs through the Azure integration, you can use the Datadog sidecar with file tailing to collect application logs. Ensure that the logging path used in your application matches the path set in `DD_SERVERLESS_LOG_PATH` when setting up your sidecar in the [Instrumentation](#instrumentation) section.

To set up logging in your application, see [Go Log Collection][3]. To set up trace log correlation, see [Correlating Go Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[3]: /logs/log_collection/go/
[4]: /tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab ".NET" %}}
#### Tracing
Instrument your main application with the `dd-trace-dotnet` library. See [Tracing .NET applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
Instead of collecting logs through the Azure integration, alternatively you can use the Datadog sidecar with file tailing to collect application logs. Ensure that the logging path used in your application matches the path set in `DD_SERVERLESS_LOG_PATH` when setting up your sidecar in the [Instrumentation](#instrumentation) section.

To set up logging in your application, see [.NET Log Collection][3]. To set up trace log correlation, see [Correlating .NET Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=dotnet#code-examples
[3]: /logs/log_collection/csharp/
[4]: /tracing/other_telemetry/connect_logs_and_traces/dotnet
{{% /tab %}}
{{% tab "PHP" %}}
#### Tracing
Instrument your main application with the `dd-trace-php` library. See [Tracing PHP applications][1] for instructions.

#### Metrics
Custom metrics are also collected through the tracer. See the [code examples][2].

#### Logs
As an alternative to collecting logs through the Azure integration, you can use the Datadog sidecar with file tailing to collect application logs. Ensure that the logging path used in your application matches the path set in `DD_SERVERLESS_LOG_PATH` when setting up your sidecar in the [Instrumentation](#instrumentation) section.

To set up logging in your application, see [PHP Log Collection][3]. To set up trace log correlation, see [Correlating PHP Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[3]: /logs/log_collection/php/
[4]: /tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### Instrumentation

{{< tabs >}}
{{% tab "Terraform" %}}

The [Datadog Terraform module for Container Apps][1] wraps the [`azurerm_container_app`][2] resource and automatically configures your Container App for Datadog Serverless Monitoring by adding required environment variables and the serverless-init sidecar.

If you don't already have Terraform set up, [install Terraform][3], create a new directory, and make a file called `main.tf`.

Then, add the following to your Terraform configuration, updating it as necessary based on your needs:

```tf
variable "datadog_api_key" {
  description = "Your Datadog API key"
  type        = string
  sensitive   = true
}

provider "azurerm" {
  features {}
  subscription_id = "00000000-0000-0000-0000-000000000000" // Replace with your subscription ID
}

resource "azurerm_container_app_environment" "my_env" {
    name                = "my-container-app-env" // Replace with your container app environment name
    resource_group_name = "my-resource-group"    // Replace with your resource group name
    location            = "eastus"
}

module "my_container_app" {
  source  = "DataDog/container-app-datadog/azurerm"
  version = "~> 1.0"

  name                         = "my-container-app" // Replace with your container app name
  resource_group_name          = "my-resource-group" // Replace with your resource group name
  container_app_environment_id = azurerm_container_app_environment.my_env.id

  datadog_api_key = var.datadog_api_key
  datadog_site    = "datadoghq.com" // Replace with your Datadog site
  datadog_service = "my-service"    // Replace with your service name
  datadog_env     = "dev"           // Replace with your environment (e.g. prod, staging, dev)
  datadog_version = "0.1.0"         // Replace with your application version

  revision_mode         = "Single"
  workload_profile_name = "Consumption"
  ingress = {
    external_enabled = true
    target_port      = 8080
    traffic_weight = [{
      percentage      = 100
      latest_revision = true
    }]
  }
  template = {
    container = [{
      cpu    = 0.5
      memory = "1Gi"
      image  = "docker.io/your-docker-image:latest" // Replace with your Docker image
      name   = "main"
    }]
  }
}
```

Finally, run `terraform apply`, and follow any prompts.

The [Datadog Container App module][1] only deploys the Container App resource, so you need to build and push your container separately.

[1]: https://registry.terraform.io/modules/DataDog/container-app-datadog/azurerm/latest
[2]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/container_app
[3]: https://developer.hashicorp.com/terraform/install


{{% /tab %}}
{{% tab "Manual" %}}


### Application environment variables
Because Azure Container Apps is built on Kubernetes, you cannot share environment variables between containers.

| Name | Description |
| ---- | ----------- |
| `DD_SERVICE` | How you want to tag your service. For example, `sidecar-azure`. |
| `DD_ENV` | How you want to tag your env. For example, `prod`.|
| `DD_VERSION` | How you want to tag your application version. |

### Sidecar container
1. In the Azure Portal, navigate to **Application** > **Revisions and replicas**. Select **Create new revision**.
2. On the **Container** tab, under **Container image**, select **Add**. Choose **App container**.
3. In the **Add a container** form, provide the following:
   - **Name**: `datadog`
   - **Image source**: Docker Hub or other registries
   - **Image type**: `Public`
   - **Registry login server**: `docker.io`
   - **Image and tag**: `datadog/serverless-init:latest`
   - Define your container resource allocation based on your usage.
4. Add a volume mount using [replica-scoped storage][2]. Use type "Ephemeral storage" when creating your volume. Ensure that the name and mount path matches the mount you configured in the application container.
5. Set the environment variables in the following table:

#### Sidecar Environment variables
| Name | Description |
| ---- | ----------- |
| `DD_AZURE_SUBSCRIPTION_ID` | **Required**. Your Azure subscription ID. |
| `DD_AZURE_RESOURCE_GROUP` | **Required**. Your Azure resource group. |
| `DD_API_KEY` | **Required**. Your [Datadog API key][3]. |
| `DD_SITE`  | Your Datadog site: `{{< region-param key="dd_site" code="true" >}}`
| `DD_SERVICE` | How you want to tag your service. For example, `sidecar-azure`. |
| `DD_ENV` | How you want to tag your env. For example, `prod`.|
| `DD_VERSION` | How you want to tag your application version. |
| `DD_SERVERLESS_LOG_PATH` | If using the agent for log collection, where you write your logs. For example, `/LogFiles/*.log`. This must match the logging path set up in [Application](#application) |

### Logging

If using the Datadog Agent for log collection, add a volume mount to the sidecar container *and* your application containers using [replica-scoped storage][2]. Use type **Ephemeral storage** when creating your volume. The examples on this page use the volume name `logs` and the mount path `/LogFiles`.

{{< img src="serverless/azure_container_apps/aca-volume-mount.png" alt="Adding a volume mount to a container in Azure" style="width:60%;" >}}

{{% /tab %}}
{{< /tabs >}}


### Example application

The following examples assume that you set the mount path to `/LogFiles` and write logs to `/LogFiles/app.log`.

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
 transports: [new transports.File({ filename: `/LogFiles/app.log`}),
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
```py
from flask import Flask, Response
from datadog import initialize, statsd
import ddtrace
import logging

ddtrace.patch(logging=True)

FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
         '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
         '- %(message)s')
logging.basicConfig(filename='/LogFiles/app.log', format=FORMAT)
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
   return Response('Datadog Self Monitoring 💜', status=200, mimetype='application/json')

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
   "github.com/DataDog/dd-trace-go/v2/ddtrace"
   "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

const logDir = "/LogFiles"

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
           .WriteTo.File(new RenderedCompactJsonFormatter(), "/LogFiles/app.log")
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

$stream = new StreamHandler('/LogFiles/app.log', Logger::DEBUG);
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


[1]: /integrations/azure/#log-collection
[2]: https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts?pivots=azure-cli&tabs=smb#replica-scoped-storage
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /integrations/azure/