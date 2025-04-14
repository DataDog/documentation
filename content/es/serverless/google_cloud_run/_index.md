---
further_reading:
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recopila trazas, logs y métricas personalizadas de servicios de Cloud Run
title: Google Cloud Run
---

## Información general

Google Cloud Run es una plataforma serverless totalmente gestionada para desplegar y escalar aplicaciones basadas en contenedores. Datadog proporciona monitorización y recopilación de logs para Cloud Run a través de la [integración de Google Cloud][1].

<div class="alert alert-info">Para instrumentar tus aplicaciones de Google Cloud Run con <code>serverless-init</code>, consulta <a href="/serverless/guide/gcr_serverless_init">Instrumentar Google Cloud Run con serverless-init</a>.</div>

## Configuración

### Aplicación

{{< tabs >}}
{{% tab "Node.js" %}}
#### Rastreo

En tu aplicación principal, añade la biblioteca `dd-trace-js`. Consulta [Rastreo de aplicaciones Node.js][1] para obtener instrucciones.

Establece `ENV NODE_OPTIONS="--require dd-trace/init"`. Esto especifica que el módulo `dd-trace/init` es necesario cuando se inicia el proceso en Node.js.

#### Métricas
La biblioteca de rastreo también recopila métricas personalizadas. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog recopila logs a través de un volumen compartido. Para reenviar logs desde tu contenedor principal al sidecar, configura tu aplicación para escribir todos los logs en una localización como `shared-volume/logs/*.log` siguiendo los pasos que se indican a continuación. Debes seguir la configuración de la interfaz de usuario de GCP para añadir la variable de entorno `DD_SERVERLESS_LOG_PATH` y un Montaje de volumen compartido tanto al contenedor principal como al sidecar. Si decides desplegar con YAML o Terraform, las variables de entorno, el check de estado y el montaje de volumen ya están añadidos.

Para configurar el registro en tu aplicación, consulta [Recopilación de logs de Node.js][3]. Para configurar la correlación de logs y trazas (traces), consulta [Correlación de logs y trazas de Node.js][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /es/logs/log_collection/nodejs/?tab=winston30
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs

{{% /tab %}}
{{% tab "Python" %}}
#### Rastreo

En tu aplicación principal, añade la biblioteca `dd-trace-py`. Consulta [Rastreo de aplicaciones Python ][1] para obtener instrucciones. También puedes utilizar [Tutorial: Activación del rastreo para una aplicación Python y Datadog Agent en contenedores][5].

#### Métricas
La biblioteca de rastreo también recopila métricas personalizadas. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog recopila logs a través de un volumen compartido. Para reenviar logs desde tu contenedor principal al sidecar, configura tu aplicación para escribir todos los logs en una localización como `shared-volume/logs/*.log` siguiendo los pasos que se indican a continuación. Debes seguir la configuración de la interfaz de usuario de GCP para añadir la variable de entorno `DD_SERVERLESS_LOG_PATH` y un Montaje de volumen compartido tanto al contenedor principal como al sidecar. Si decides desplegar con YAML o Terraform, las variables de entorno, el check de estado y el montaje de volumen ya están añadidos.

Para configurar el registro en tu aplicación, consulta [Recopilación de logs de Python][3]. También puede ser útil el documento [Prácticas recomendadas de registro de Python][6]. Para configurar la correlación de logs y trazas, consulta [Correlación de logs y trazas de Python][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /es/logs/log_collection/python
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/python
[5]: /es/tracing/guide/tutorial-enable-python-containers/
[6]: https://www.datadoghq.com/blog/python-logging-best-practices/

{{% /tab %}}
{{% tab "Java" %}}
#### Rastreo

En tu aplicación principal, añade la biblioteca `dd-trace-java`. Sigue las instrucciones de [Rastreo de aplicaciones Java][1] o utiliza el siguiente archivo Docker de ejemplo para añadir e iniciar la biblioteca de rastreo con la instrumentación automática:

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

#### Métricas
Para recopilar métricas personalizadas, [instala el cliente Java DogStatsD][2].

#### Logs
El sidecar de Datadog recopila logs a través de un volumen compartido. Para reenviar logs desde tu contenedor principal al sidecar, configura tu aplicación para escribir todos los logs en una localización como `shared-volume/logs/*.log` siguiendo los pasos que se indican a continuación. Debes seguir la configuración de la interfaz de usuario de GCP para añadir la variable de entorno `DD_SERVERLESS_LOG_PATH` y un Montaje de volumen compartido tanto al contenedor principal como al sidecar. Si decides desplegar con YAML o Terraform, las variables de entorno, el check de estado y el montaje de volumen ya están añadidos.

Para configurar el registro en tu aplicación, consulta [Recopilación de logs de Java][3]. Para configurar la correlación de logs y trazas, consulta [Correlación de logs y trazas de Java][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /es/developers/dogstatsd/?tab=hostagent&code-lang=java#install-the-dogstatsd-client
[3]: /es/logs/log_collection/java/?tab=winston30
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/java

{{% /tab %}}
{{% tab "Go" %}}
#### Rastreo

En tu aplicación principal, añade la biblioteca `dd-trace-go`. Consulta [Rastreo de aplicaciones Go][1] para obtener instrucciones.

#### Métricas
La biblioteca de rastreo también recopila métricas personalizadas. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog recopila logs a través de un volumen compartido. Para reenviar logs desde tu contenedor principal al sidecar, configura tu aplicación para escribir todos los logs en una localización como `shared-volume/logs/*.log` siguiendo los pasos que se indican a continuación. Debes seguir la configuración de la interfaz de usuario de GCP para añadir la variable de entorno `DD_SERVERLESS_LOG_PATH` y un Montaje de volumen compartido tanto al contenedor principal como al sidecar. Si decides desplegar con YAML o Terraform, las variables de entorno, el check de estado y el montaje de volumen ya están añadidos.

Para configurar el registro en tu aplicación, consulta [Recopilación de logs de Go][3]. Para configurar la correlación de logs y trazas, consulta [Correlación de logs y trazas de Go][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /es/logs/log_collection/go
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab ".NET" %}}
#### Rastreo

En tu aplicación principal, añade la biblioteca de rastreo de .NET. Consulta [Rastreo de aplicaciones .NET][1] para obtener instrucciones.

Ejemplo de archivo Docker:

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

#### Métricas
La biblioteca de rastreo también recopila métricas personalizadas. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog recopila logs a través de un volumen compartido. Para reenviar logs desde tu contenedor principal al sidecar, configura tu aplicación para escribir todos los logs en una localización como `shared-volume/logs/*.log` siguiendo los pasos que se indican a continuación. Debes seguir la configuración de la interfaz de usuario de GCP para añadir la variable de entorno `DD_SERVERLESS_LOG_PATH` y un Montaje de volumen compartido tanto al contenedor principal como al sidecar. Si decides desplegar con YAML o Terraform, las variables de entorno, el check de estado y el montaje de volumen ya están añadidos.

Para configurar el registro en tu aplicación, consulta [Recopilación de logs de C#][3]. Para configurar la correlación de logs y trazas, consulta [Correlación de logs y trazas de .NET][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux#enable-the-tracer-for-your-service
[2]: https://www.datadoghq.com/blog/statsd-for-net-dogstatsd/
[3]: /es/log_collection/csharp/?tab=serilog
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet/?tab=serilog
{{% /tab %}}
{{% tab "PHP" %}}
En tu aplicación principal, añade la biblioteca `dd-trace-php`. Consulta [Rastreo de aplicaciones PHP][1] para obtener instrucciones.

#### Métricas
La biblioteca de rastreo también recopila métricas personalizadas. Consulta los [ejemplos de código][2].

#### Logs
El sidecar de Datadog recopila logs a través de un volumen compartido. Para reenviar logs desde tu contenedor principal al sidecar, configura tu aplicación para escribir todos los logs en una localización como `shared-volume/logs/*.log` siguiendo los pasos que se indican a continuación. Debes seguir la configuración de la interfaz de usuario de GCP para añadir la variable de entorno `DD_SERVERLESS_LOG_PATH` y un Montaje de volumen compartido tanto al contenedor principal como al sidecar. Si decides desplegar con YAML o Terraform, las variables de entorno, el check de estado y el montaje de volumen ya están añadidos.

Para configurar el registro en tu aplicación, consulta [Recopilación de logs de PHP][3]. Para configurar la correlación de logs y trazas, consulta [Correlación de logs y trazas de PHP][4].

[1]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/php/
[2]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /es/logs/log_collection/php
[4]: /es/tracing/other_telemetry/connect_logs_and_traces/php
{{% /tab %}}
{{< /tabs >}}

### Contenedores
{{< tabs >}}
{{% tab "GCR UI" %}}

#### Contenedor sidecar

1. En Cloud Run, selecciona **Edit & Deploy New Revision** (Editar y desplegar nueva revisión).
1. En la parte inferior de la página, selecciona **Add Container** (Añadir contenedor).
1. En **Container image URL** (URL del contenedor de la imagen), selecciona `gcr.io/datadoghq/serverless-init:latest`.
1. Ve a **Volume Mounts** (Montaje de volumen) y configura un montaje de volumen para logs. Asegúrate de que la ruta de montaje coincide con la localización de escritura de tu aplicación. Por ejemplo:
   {{< img src="serverless/gcr/volume_mount.png" width="80%" alt="Pestaña Montaje de volumen. En Volumen montado, Montaje de volumen 1. En Nombre 1, 'shared-logs (In-Memory)' está seleccionado. En Ruta de montaje 1, '/shared-volume' está seleccionado.">}}
1. Ve a **Settings** (Configuración) y añade un check de inicio.
   - **Select health check type** (Seleccionar el tipo de check de estado): check de inicio
   - **Select probe type** (Seleccionar el tipo de sonda): TCP
   - **Port** (Puerto): introduce un número de puerto. Toma nota de esto, ya que se utiliza en el siguiente paso.
1. Ve a **Variables & Secrets** (Variables y secretos) y añade las siguientes variables de entorno como pares nombre-valor:
   - `DD_SERVICE`: un nombre para tu servicio. Por ejemplo, `gcr-sidecar-test`.
   - `DD_ENV`: un nombre para tu entorno. Por ejemplo, `dev`.
   - `DD_SERVERLESS_LOG_PATH`: tu ruta de log. Por ejemplo, `/shared-volume/logs/*.log`.
   - `DD_API_KEY`: tu [clave de API de Datadog][1].
   - `DD_HEALTH_PORT`: el puerto que seleccionaste para el check de inicio en el paso anterior.

   Para consultar la lista de todas las variables de entorno, incluidas las etiquetas adicionales, consulta [variables de entorno](#environment-variables).

#### Contenedor principal

1. Ve a **Volume Mounts** (Montajes de volumen) y añade el mismo volumen compartido que hiciste para el contenedor sidecar.
   **Nota**: Guarda los cambios seleccionando **Done** (Hecho). No despliegues los cambios hasta el último paso.
1. Ve a **Variables & Secrets** (Variables y secretos) y añade la misma variable de entorno `DD_SERVICE` que estableciste para el contenedor sidecar.
1. Ve a **Settings** (Configuración). En el menú desplegable **Container start up order** (Orden de inicio del contenedor), selecciona tu sidecar.
1. Despliega tu aplicación principal.

[1]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{% tab "Despliegue YAML" %}}
Para desplegar tu servicio de Cloud Run con la especificación de servicio YAML, utiliza el siguiente archivo de ejemplo de configuración. En este ejemplo, las variables de entorno, el check de estado de inicio y el montaje de volumen ya están añadidos. Si no deseas habilitar los logs, elimina el volumen compartido. Asegúrate de que el puerto de contenedor para el contenedor principal es el mismo que el expuesto en tu archivo Docker/servicio.

1. Crea un archivo YAML que contenga lo siguiente:

   ```yaml
   apiVersion: serving.knative.dev/v1
   kind: Service
   metadata:
     name: '<SERVICE_NAME>'
     labels:
       cloud.googleapis.com/location: '<LOCATION>'
   spec:
     template:
       metadata:
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
                 value: datadoghq.com
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
   En este ejemplo, las variables de entorno, el check de estado de inicio y el montaje de volumen ya están añadidos. Si no quieres habilitar los logs, elimina el volumen compartido. Asegúrate de que el puerto de contenedor para el contenedor principal es el mismo que el expuesto en tu archivo Docker/servicio.
1. Suministra los valores de parámetro:
   - `<SERVICE_NAME>`: un nombre para tu servicio. Por ejemplo, `gcr-sidecar-test`. Consulta [Etiquetado de servicios unificado][2].
   - `<LOCATION>`: la región en la que estás desplegando tu servicio. Por ejemplo, `us-central`.
   - `<DATADOG_SITE>`: tu [sitio de Datadog][3], {{< region-param key="dd_site" code="true" >}}.
   - `<API_KEY>`: tu [clave de API de Datadog][1].
   - `<VERSION>`: el número de versión de tu despliegue. Consulta [Etiquetado de servicios unificado][2].
   - `<CONTAINER_IMAGE>`: la imagen del código que estás desplegando en Cloud Run. Por ejemplo, `us-docker.pkg.dev/cloudrun/container/hello`.
   - `<SERVICE_ACCOUNT>`: el nombre de tu cuenta de servicio de Google Cloud.

1. Ejecuta:
   ```bash
   gcloud run services replace <FILENAME>.yaml
   ```

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/tagging/unified_service_tagging/
[3]: /es/getting_started/site/

{{% /tab %}}
{{% tab "Despliegue de Terraform" %}}
Para desplegar tu servicio de Cloud Run con Terraform, utiliza el siguiente archivo de ejemplo de configuración. En este ejemplo, las variables de entorno, el check de estado de inicio y el montaje de volumen ya están añadidos. Si no deseas habilitar los logs, elimina el volumen compartido. Asegúrate de que el puerto de contenedor para el contenedor principal es el mismo que el expuesto en tu archivo Docker/servicio. Si no deseas permitir el acceso público, elimina la sección Política de IAM.

```
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

Suministra los valores de parámetro:
- `<PROJECT_ID>`: tu ID de proyecto de Google Cloud.
- `<LOCATION>`: la región en la que estás desplegando tu servicio. Por ejemplo, `us-central1`.
- `<SERVICE_NAME>`: un nombre para tu servicio. Por ejemplo, `gcr-sidecar-test`. Consulta [Etiquetado de servicios unificado][2].
- `<CONTAINER_IMAGE>`: la imagen del código que estás desplegando en Cloud Run.
- `<DATADOG_SITE>`: tu [sitio de Datadog][3], {{< region-param key="dd_site" code="true" >}}.
- `<API_KEY>`: tu [clave de API de Datadog][1].
- `<VERSION>`: el número de versión de tu despliegue. Consulta [Etiquetado de servicios unificado][2].

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /es/getting_started/tagging/unified_service_tagging/
[3]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Variables de entorno

| Variable | Descripción |
| -------- | ----------- |
|`DD_API_KEY`| [Clave de API de Datadog][4]: **obligatoria**|
| `DD_SITE` | [Sitio de Datadog][5]: **obligatorio** |
| `DD_LOGS_INJECTION`| Cuando es true, mejora todos los logs con datos de traza (trace) para los registradores admitidos en [Java][6], [Node][7], [.NET][8] y [PHP][9]. Ver documentación adicional para [Python][10], [Go][11] y [Ruby][12]. |
| `DD_SERVICE`      | Consulta [Etiquetado de servicios unificado][13].                                  |
| `DD_VERSION`      | Consulta [Etiquetado de servicios unificado][13].                                  |
| `DD_ENV`          | Consulta [Etiquetado de servicios unificado][13].                                  |
| `DD_SOURCE`       | Consulta [Etiquetado de servicios unificado][13].                                  |
| `DD_TAGS`         | Consulta [Etiquetado de servicios unificado][13]. |

No utilices la variable de entorno `DD_LOGS_ENABLED`. Esta variable sólo se utiliza para el método de instalación [serverless-init][14].

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

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/integrations/google_cloud_platform/#log-collection
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://hub.docker.com/r/datadog/serverless-init
[4]: /es/account_management/api-app-keys/#api-keys
[5]: /es/getting_started/site/
[6]: /es/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[7]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs
[8]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[9]: /es/tracing/other_telemetry/connect_logs_and_traces/php
[10]: /es/tracing/other_telemetry/connect_logs_and_traces/python
[11]: /es/tracing/other_telemetry/connect_logs_and_traces/go
[12]: /es/tracing/other_telemetry/connect_logs_and_traces/ruby
[13]: /es/getting_started/tagging/unified_service_tagging/
[14]: /es/serverless/guide/gcr_serverless_init