---
further_reading:
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: Blog
  text: Recopila trazas, logs y métricas personalizadas de servicios de Container
    Apps
title: Azure Container Apps
---

<div class="alert alert-info">Para instrumentar tus aplicaciones Azure Container Apps con <code>serverless-init</code>, consulta <a href="/serverless/guide/aca_serverless_init">Azure Container Apps con serverless-init3</a>.</div>

## Información general
Azure Container Apps es una plataforma serverless totalmente gestionada que sirve para desplegar y escalar aplicaciones basadas en contenedores. Datadog ofrece monitorización y recopilación de logs para Container Apps a través de la [integración de Azure][1]. Datadog también brinda una solución para instrumentar las aplicaciones de Container Apps con un Agent especialmente diseñado para habilitar el rastreo, las métricas personalizadas y la recopilación directa de logs.

## Configuración

### Contenedor de aplicación

{{< tabs >}}
{{% tab "Node.js" %}}
#### Rastreo
Instrumenta tu aplicación principal con la librería `dd-trace-js`. Para obtener instrucciones, consulta [Rastreo de aplicaciones Node.js][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog utiliza el seguimiento de archivos para recopilar logs.

En Azure, añade un volumen de montaje al contenedor auxiliar *y* a tus contenedores de aplicación utilizando el [almacenamiento de alcance de réplica][5]. Utiliza el tipo "Almacenamiento efímero" cuando crees tu volumen. Los ejemplos en esta página utilizan el nombre de volumen `logs` y la ruta de montaje `/LogFiles`.

{{< img src="serverless/azure_container_apps/aca-volume-mount.png" alt="Adición de un montaje de volumen a un contenedor en Azure" style="width:60%;" >}}

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de Node.js][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas de Node.js][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /es/logs/log_collection/nodejs/?tab=winston30
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs
[5]: https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts?pivots=azure-cli&tabs=smb#replica-scoped-storage
{{% /tab %}}
{{% tab "Python" %}}
#### Rastreo
Instrumenta tu aplicación principal con la librería `dd-trace-py`. Para obtener instrucciones, consulta [Rastreo de aplicaciones Python][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog utiliza el seguimiento de archivos para recopilar logs.

En Azure, añade un volumen de montaje al contenedor auxiliar *y* a tus contenedores de aplicación utilizando el [almacenamiento de alcance de réplica][5]. Utiliza el tipo "Almacenamiento efímero" cuando crees tu volumen. Los ejemplos en esta página utilizan el nombre de volumen `logs` y la ruta de montaje `/LogFiles`.

{{< img src="serverless/azure_container_apps/aca-volume-mount.png" alt="Adición de un montaje de volumen a un contenedor en Azure" style="width:60%;" >}}

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de Python][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas de Python][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python#code-examples
[3]: /es/logs/log_collection/python/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/python
[5]: https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts?pivots=azure-cli&tabs=smb#replica-scoped-storage
{{% /tab %}}
{{% tab "Java" %}}
#### Rastreo
Instrumenta tu aplicación principal con la librería `dd-trace-java`. Para obtener instrucciones, consulta [Rastreo de aplicaciones Java][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog utiliza el seguimiento de archivos para recopilar logs.

En Azure, añade un volumen de montaje al contenedor auxiliar *y* a tus contenedores de aplicación utilizando el [almacenamiento de alcance de réplica][5]. Utiliza el tipo "Almacenamiento efímero" cuando crees tu volumen. Los ejemplos en esta página utilizan el nombre de volumen `logs` y la ruta de montaje `/LogFiles`.

{{< img src="serverless/azure_container_apps/aca-volume-mount.png" alt="Adición de un montaje de volumen a un contenedor en Azure" style="width:60%;" >}}

Para configurar el registro en tu aplicación, consulta [Recopilación de logs de Java][3]. Para configurar la correlación de logs y trazas, consulta [Correlación de logs y trazas de Java][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[3]: /es/logs/log_collection/java/?tab=winston30
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/java
[5]: https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts?pivots=azure-cli&tabs=smb#replica-scoped-storage
{{% /tab %}}
{{% tab "Go" %}}
#### Rastreo
Instrumenta tu aplicación principal con la librería `dd-trace-go`. Para obtener instrucciones, consulta [Rastreo de aplicaciones Go][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog utiliza el seguimiento de archivos para recopilar logs.

En Azure, añade un volumen de montaje al contenedor auxiliar *y* a tus contenedores de aplicación utilizando el [almacenamiento de alcance de réplica][5]. Utiliza el tipo "Almacenamiento efímero" cuando crees tu volumen. Los ejemplos en esta página utilizan el nombre de volumen `logs` y la ruta de montaje `/LogFiles`.

{{< img src="serverless/azure_container_apps/aca-volume-mount.png" alt="Adición de un montaje de volumen a un contenedor en Azure" style="width:60%;" >}}

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de Go][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas de Go][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[3]: /es/logs/log_collection/go/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/go
[5]: https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts?pivots=azure-cli&tabs=smb#replica-scoped-storage
{{% /tab %}}
{{% tab ".NET" %}}
#### Rastreo
Instrumenta tu aplicación principal con la librería `dd-trace-dotnet`. Para obtener instrucciones, consulta [Rastreo de aplicaciones .NET][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog utiliza el seguimiento de archivos para recopilar logs.

En Azure, añade un volumen de montaje al contenedor auxiliar *y* a tus contenedores de aplicación utilizando el [almacenamiento de alcance de réplica][5]. Utiliza el tipo "Almacenamiento efímero" cuando crees tu volumen. Los ejemplos en esta página utilizan el nombre de volumen `logs` y la ruta de montaje `/LogFiles`.

{{< img src="serverless/azure_container_apps/aca-volume-mount.png" alt="Adición de un montaje de volumen a un contenedor en Azure" style="width:60%;" >}}

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de .NET][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas de .NET][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=dotnet#code-examples
[3]: /es/logs/log_collection/csharp/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet
[5]: https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts?pivots=azure-cli&tabs=smb#replica-scoped-storage
{{% /tab %}}
{{% tab "PHP" %}}
#### Rastreo
Instrumenta tu aplicación principal con la librería `dd-trace-php`. Para obtener instrucciones, consulta [Rastreo de aplicaciones PHP][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog utiliza el seguimiento de archivos para recopilar logs.

En Azure, añade un volumen de montaje al contenedor auxiliar *y* a tus contenedores de aplicación utilizando el [almacenamiento de alcance de réplica][5]. Utiliza el tipo "Almacenamiento efímero" cuando crees tu volumen. Los ejemplos en esta página utilizan el nombre de volumen `logs` y la ruta de montaje `/LogFiles`.

{{< img src="serverless/azure_container_apps/aca-volume-mount.png" alt="Adición de un montaje de volumen a un contenedor en Azure" style="width:60%;" >}}

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de PHP][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas de PHP][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[3]: /es/logs/log_collection/php/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/php
[5]: https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts?pivots=azure-cli&tabs=smb#replica-scoped-storage
{{% /tab %}}
{{< /tabs >}}

#### Variables de entorno
Dado que Azure Container Apps se basa en Kubernetes, no puedes compartir variables de entorno entre contenedores. Debes configurar variables de entorno de Datadog tanto en tu aplicación como en los contenedores de sidecars.

| Nombre | Descripción |
| ---- | ----------- |
| `DD_SERVICE` | Cómo quieres etiquetar tu servicio. Por ejemplo, `sidecar-azure`. |
| `DD_ENV` | Cómo quieres etiquetar tu entorno. Por ejemplo, `prod`.|
| `DD_VERSION` | Cómo quieres etiquetar tu versión. |

### Contenedor de sidecar
1. En el Portal Azure, ve a **Aplicación** > **Revisiones y réplicas**. Selecciona **Crear nueva revisión**.
2. En la pestaña **Contenedor**, bajo **Imagen de contenedor**, selecciona **Añadir** y luego selecciona **Contenedor de aplicación**.
3. En el formulario **Añadir un contenedor**, indica lo siguiente:
   - **Nombre**: `datadog`
   - **Fuente de la imagen**: Docker Hub u otros registros
   - **Tipo de imagen**: `Public`
   - **Servidor de inicio de sesión de registro**: `docker.io`
   - **Imagen y etiqueta (tag)**: `datadog/serverless-init:latest`
   - Define tu asignación de recursos de contenedor en función de tu uso.
4. Añade un volumen de montaje utilizando [almacenamiento de alcance de réplica][2]. Utiliza el tipo "Almacenamiento efímero" al crear el volumen. Asegúrate de que el nombre y la ruta de montaje coinciden con el montaje que configuraste en el contenedor de la aplicación.
5. Configura las variables de entorno de la siguiente tabla:

#### Variables de entorno
| Nombre | Descripción |
| ---- | ----------- |
| `DD_AZURE_SUBSCRIPTION_ID` | **Requerido**. Tu ID de suscripción a Azure. |
| `DD_AZURE_RESOURCE_GROUP` | **Requerido**. Tu grupo de recursos Azure. |
| `DD_API_KEY` | **Requerido**. Tu [clave de API Datadog][3]. |
| `DD_SITE`  | Tu sitio de Datadog: `{{< region-param key="dd_site" code="true" >}}`
| `DD_SERVICE` | Cómo quieres etiquetar tu servicio. Por ejemplo, `sidecar-azure`. |
| `DD_ENV` | Cómo quieres etiquetar tu entorno. Por ejemplo, `prod`.|
| `DD_VERSION` | Cómo quieres etiquetar tu versión. |
| `DD_SERVERLESS_LOG_PATH` | Dónde escribes tus logs. Por ejemplo, `/LogFiles/*.log`. |

### Ejemplo de aplicación

En los siguientes ejemplos, imagina que configuras la ruta de montaje en `/LogFiles` y que escribes logs en `/LogFiles/app.log`.

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/integrations/azure/#log-collection
[2]: https://learn.microsoft.com/en-us/azure/container-apps/storage-mounts?pivots=azure-cli&tabs=smb#replica-scoped-storage
[3]: https://app.datadoghq.com/organization-settings/api-keys
