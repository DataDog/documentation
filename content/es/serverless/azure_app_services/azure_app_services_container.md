---
further_reading:
- link: /integrations/azure_app_services/
  tag: Documentación
  text: Azure App Service
- link: /integrations/azure_app_service_environment/
  tag: Documentación
  text: Entorno de Azure App Service
title: 'Instrumentar Azure App Service: contenedores de Linux'
---

<div class="alert alert-info">Para instrumentar tus contenedores Azure App Service con <code>serverless-init</code>, consulta <a href="/serverless/guide/azure_app_service_linux_containers_serverless_init">Instrumentar Azure App Service- Contenedor Linux con serverless-init</a>.</div>

### Requisitos previos

Este documento asume que tu aplicación está configurada para sidecars según el tutorial de Azure [Configurar un contenedor de sidecar para un contenedor personalizado en Azure App Service][1].

## Configuración

### Aplicación

{{< tabs >}}
{{% tab "Node.js" %}}
#### Rastreo
Instrumenta tu aplicación principal con la biblioteca `dd-trace-js`. Para obtener instrucciones, consulta [Rastreo de aplicaciones Node.js][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar Datadog utiliza el seguimiento de archivos para recopilar logs. Datadog recomienda escribir logs de aplicación en `/home/LogFiles/`, ya que este directorio persiste en los reinicios. 

También puedes crear un subdirectorio, como `/home/LogFiles/myapp`, si quieres tener un mayor control sobre lo que se envía a Datadog. Sin embargo, si no adaptas todos los archivos de logs en `/home/LogFiles`, no se recopilarán los logs de la aplicación Azure App Service asociados a los inicios y los errores.

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de Node.js][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas (traces) de Node.js][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs#code-examples
[3]: /es/logs/log_collection/nodejs/?tab=winston30
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs
{{% /tab %}}
{{% tab "Python" %}}
#### Rastreo
Instrumenta tu aplicación principal con la biblioteca `dd-trace-py`. Para obtener instrucciones, consulta [Rastreo de aplicaciones Python][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar Datadog utiliza el seguimiento de archivos para recopilar logs. Datadog recomienda escribir logs de aplicación en `/home/LogFiles/`, ya que este directorio persiste en los reinicios. 

También puedes crear un subdirectorio, como `/home/LogFiles/myapp`, si quieres tener un mayor control sobre lo que se envía a Datadog. Sin embargo, si no adaptas todos los archivos de logs en `/home/LogFiles`, no se recopilarán los logs de la aplicación Azure App Service asociados a los inicios y los errores.

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de Node.js][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas (traces) de Node.js][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python#code-examples
[3]: /es/logs/log_collection/python/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/python
{{% /tab %}}
{{% tab "Java" %}}
#### Rastreo
Instrumenta tu aplicación principal con la biblioteca `dd-trace-java`. Para obtener instrucciones, consulta [Rastreo de aplicaciones Java][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar Datadog utiliza el seguimiento de archivos para recopilar logs. Datadog recomienda escribir logs de aplicación en `/home/LogFiles/`, ya que este directorio persiste en los reinicios. 

También puedes crear un subdirectorio, como `/home/LogFiles/myapp`, si quieres tener un mayor control sobre lo que se envía a Datadog. Sin embargo, si no adaptas todos los archivos de logs en `/home/LogFiles`, no se recopilarán los logs de la aplicación Azure App Service asociados a los inicios y los errores.

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de Node.js][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas (traces) de Node.js][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java#code-examples
[3]: /es/logs/log_collection/java/?tab=winston30
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/java
{{% /tab %}}
{{% tab ".NET" %}}
#### Rastreo
Instrumenta tu aplicación principal con la biblioteca `dd-trace-dotnet`.

1. Añade las siguientes líneas al archivo Docker de tu aplicación principal. Esto instala y configura el rastreador Datadog en tu contenedor de aplicación.
   {{< code-block lang="dockerfile" >}}
   EJECUTAR mkdir -p /datadog/tracer
   EJECUTAR mkdir -p /home/LogFiles/dotnet

   AÑADIR https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.51.0/datadog-dotnet-apm-2.51.0.tar.gz /datadog/tracer
   EJECUTAR cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.51.0.tar.gz
   {{< /code-block >}}

2. Crea la imagen y envíala a tu registro preferido de contenedor.

**Ejemplo de archivo Docker completo**

{{< highlight dockerfile "hl_lines=22-27" >}}
# Etapa 1: Crear la aplicación
DESDE mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar el archivo del proyecto y restaurar las dependencias
COPIAR *.csproj ./
EJECUTAR dotnet restore

# Copiar el código fuente restante
COPIAR . .

# Crear la aplicación
EJECUTAR dotnet publish -c Release -o out

# Etapa 2: Crear una imagen de tiempo de ejecución
DESDE mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copiar el resultado de la creación de la etapa 1
COPIAR --from=build /app/out ./

# Específico de Datadog
EJECUTAR mkdir -p /datadog/tracer
EJECUTAR mkdir -p /home/LogFiles/dotnet

AÑADIR https://github.com/DataDog/dd-trace-dotnet/releases/download/v2.51.0/datadog-dotnet-apm-2.51.0.tar.gz /datadog/tracer
EJECUTAR cd /datadog/tracer && tar -zxf datadog-dotnet-apm-2.51.0.tar.gz

# Definir el punto de entrada de la aplicación
PUNTO DE ENTRADA ["dotnet", "<your dotnet app>.dll"]
{{< /highlight >}}

Para obtener más información, consulta [Rastreo de aplicaciones .NET][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar Datadog utiliza el seguimiento de archivos para recopilar logs. Datadog recomienda escribir logs de aplicación en `/home/LogFiles/`, ya que este directorio persiste en los reinicios. 

También puedes crear un subdirectorio, como `/home/LogFiles/myapp`, si quieres tener un mayor control sobre lo que se envía a Datadog. Sin embargo, si no adaptas todos los archivos de logs en `/home/LogFiles`, no se recopilarán los logs de la aplicación Azure App Service asociados a los inicios y los errores.

Para configurar el registro en tu aplicación, consulta [Recopilación de logs de C#][3]. Para configurar la correlación de logs y trazas, consulta [Correlación de logs y trazas de .NET][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=dotnet#code-examples
[3]: /es/logs/log_collection/csharp
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet

{{% /tab %}}
{{% tab "Go" %}}
#### Rastreo
Instrumenta tu aplicación principal con la biblioteca `dd-trace-go`. Para obtener instrucciones, consulta [Rastreo de aplicaciones Go][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar Datadog utiliza el seguimiento de archivos para recopilar logs. Datadog recomienda escribir logs de aplicación en `/home/LogFiles/`, ya que este directorio persiste en los reinicios. 

También puedes crear un subdirectorio, como `/home/LogFiles/myapp`, si quieres tener un mayor control sobre lo que se envía a Datadog. Sin embargo, si no adaptas todos los archivos de logs en `/home/LogFiles`, no se recopilarán los logs de la aplicación Azure App Service asociados a los inicios y los errores.

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de Node.js][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas de Node.js][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go#code-examples
[3]: /es/logs/log_collection/go/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab "PHP" %}}
#### Rastreo
Instrumenta tu aplicación principal con la biblioteca `dd-trace-php`. Para obtener instrucciones, consulta [Rastreo de aplicaciones PHP][1].

#### Métricas
Las métricas personalizadas también se recopilan a través del rastreador. Consulta los [ejemplos de código][2].

#### Logs
El sidecar Datadog utiliza el seguimiento de archivos para recopilar logs. Datadog recomienda escribir logs de aplicación en `/home/LogFiles/`, ya que este directorio persiste en los reinicios. 

También puedes crear un subdirectorio, como `/home/LogFiles/myapp`, si quieres tener un mayor control sobre lo que se envía a Datadog. Sin embargo, si no adaptas todos los archivos de logs en `/home/LogFiles`, no se recopilarán los logs de la aplicación Azure App Service asociados a los inicios y los errores.

Para configurar la generación de logs en tu aplicación, consulta [Recopilación de logs de Node.js][3]. Para configurar la correlación de logs de rastreo, consulta [Correlación de logs y trazas de Node.js][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/#getting-started
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=php#code-examples
[3]: /es/logs/log_collection/php/
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### Contenedor de sidecar

1. En el portal Azure, ve a **Centro de despliegue** y selecciona **Añadir**.
2. En el formulario **Editar contenedor**, indica lo siguiente:
   - **Fuente de la imagen**: Docker Hub u otros registros
   - **Tipo de imagen**: Pública
   - **URL del servidor de registro**: `index.docker.io`
   - **Imagen y etiqueta (tag)**: `datadog/serverless-init:latest`
   - **Puerto**: 8126
3. Selecciona **Aplicar** (Solicitar).

### Parámetros de la aplicación

En los **parámetros de tu aplicación** en Azure, define las siguientes variables de entorno:

- `DD_API_KEY`: Tu [clave de API Datadog][3]
- `DD_SERVICE`: cómo quieres etiquetar tu servicio. Por ejemplo, `sidecar-azure`
- `DD_ENV`: cómo quieres etiquetar tu entorno. Por ejemplo, `prod`
- `DD_SERVERLESS_LOG_PATH`: dónde escribes tus logs. Por ejemplo, `/home/LogFiles/*.log` o `/home/LogFiles/myapp/*.log`

<details open>
<summary>
<h4>Para aplicaciones .NET: variables de entorno adicionales requeridas</h4>
</summary>

Si estás configurando la monitorización de una aplicación .NET, configura las siguientes variables de entorno **requeridas**.

| Nombre de la variable | Valor |
| ------------- | ----- |
| `DD_DOTNET_TRACER_HOME` |`/datadog/tracer` | 
| `DD_TRACE_LOG_DIRECTORY` |`/home/Logfiles/dotnet` | 
| `CORECLR_ENABLE_PROFILING` |`1` | 
| `CORECLR_PROFILER` |`{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` | 
| `CORECLR_PROFILER_PATH` |`/datadog/tracer/Datadog.Trace.ClrProfiler.Native.so` | 
</details>

## Ejemplo de aplicación
El siguiente ejemplo contiene una única aplicación con rastreo, métricas y logs configurados.

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
[2]: https://docs.datadoghq.com/es/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: https://app.datadoghq.com/organization-settings/api-keys