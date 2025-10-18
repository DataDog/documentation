---
algolia:
  tags:
  - etiquetas (tags) de servicios unificadas
  - unificado
  - servicio unificado
  - etiquetas (tags) de servicios
description: Conecta la telemetría a través de trazas, métricas y logs utilizando
  etiquetas estandarizadas de entorno, servicio y versión para una monitorización
  coherente.
further_reading:
- link: /getting_started/tagging/using_tags
  tag: Documentación
  text: Descubre cómo utilizar las etiquetas (tags) en la aplicación de Datadog
- link: /tracing/version_tracking
  tag: Documentación
  text: Uso de etiquetas (tags) de versión en APM de Datadog para monitorizar despliegues
- link: https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/
  tag: Blog
  text: Más información sobre Autodiscovery
title: Etiquetado de servicios unificado
---

## Información general

El etiquetado de servicios unificado asocia la telemetría de Datadog utilizando tres [etiquetas (tags) reservadas][1]: `env`, `service` y `version`.

Estas tres etiquetas (tags) te permiten:

- Identificar el impacto del despliegues con métricas de rastreo y de contenedor filtradas por versión
- Navegar sin problemas a través de trazas (traces), métricas y logs con etiquetas (tags) coherentes
- Ver datos de servicios basados en el entorno o la versión de manera unificada

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="Etiquetado de servicios unificado" video=true >}}

**Notas**:

- Se espera que la etiqueta (tag) de `version` cambie con cada nuevo despliegue de la aplicación. Dos versiones diferentes del código de tu aplicación deberían tener diferentes etiquetas de `version`.
- El servicio oficial de un log es por defecto la imagen corta del contenedor, si no hay una configuración de logs de Autodiscovery presente. Para reemplazar el servicio oficial de un log, añade [etiquetas (labels) de Docker/anotaciones de pod][2] de Autodiscovery. Por ejemplo: `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`
- La información del host se excluye para la base de datos y los tramos (spans) de caché porque el host asociado con el tramo no es el host de base de datos/caché.

### Requisitos

- El etiquetado de servicios unificado requiere la configuración de un [Datadog Agent ][3] de 6.19.x/7.19.x o posterior.

- El etiquetado de servicios unificado requiere una versión de rastreador que admita nuevas configuraciones de las [etiquetas reservadas][1]. Obtén más información por idioma en las [instrucciones de configuración][4].


| Lenguaje         | Versión mínima del rastreador |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  v0.1.0 o posterior       |
| Go         |  1.24.0 o posterior       |
| Java   |  0.50.0 o posterior      |
| Node    |  0.20.3 o posterior       |
| PHP  |  0.47.0 o posterior      |
| Python  |  0.38.0 o posterior      |
| Ruby  |  0.34.0 o posterior      |

- Para llevar a cabo el etiquetado de servicios unificado, es necesario conocer la configuración de etiquetas (tags). Si no sabes muy bien cómo configurar etiquetas, lee antes la documentación [Empezando con el etiquetado][1] y [Asignación de etiquetas][5].

## Configuración

Para empezar a configurar el etiquetado de servicios unificado, elige tu entorno:

- [contenedorizado](#containerized-environment)
- [no contenedorizado](#non-containerized-environment)
- [Serverless](#serverless-environment)
- [OpenTelemetry](#opentelemetry)

### Entorno contenedorizado

En entornos contenedorizados, `env`, `service` y `version` se configuran a través de variables de entorno o etiquetas (labels) del servicio; por ejemplo, etiquetas del despliegue de Kubernetes y del pod o etiquetas del contenedor de Docker. El Datadog Agent detecta esta configuración de etiquetado y la aplica a los datos que recopila de los contenedores.

Para configurar el etiquetado de servicios unificado en un entorno contenedorizado:

1. Activa [Autodiscovery][6]. Esto permitirá al Datadog Agent identificar automáticamente los servicios que se ejecutan en un contenedor concreto y recopilar datos de esos servicios para asignar variables de entorno a las etiquetas (tags) `env`, `service,` y `version`. 

2. Si utilizas [Docker][2], asegúrate de que el Agent pueda acceder al [socket de Docker][7] de tu contenedor. Esto permitirá al Agent detectar las variables de entorno y asignarlas a etiquetas (tags) estándar.

3. Configura el entorno que corresponda a tu servicio de orquestación de contenedores, según la configuración completa o parcial, tal y como se indica a continuación.

#### Configuración

{{< tabs >}}
{{% tab "Kubernetes" %}}

Si has implementado el Agent de clúster de Datadog con el [controlador de admisión][1] activado, este último mutará los manifiestos del pod e introducirá todas las variables de entorno requeridas (en función de las condiciones de mutación establecidas). En ese caso, no será necesaria la configuración manual de las variables de entorno `DD_` en los manifiestos del pod. Para obtener más información, consulta la [documentación del controlador de admisión][1].

##### Configuración completa

Para obtener todo el rango del etiquetado de servicios unificado al utilizar Kubernetes, añade variables de entorno tanto a nivel del objeto del despliegue como a nivel de las especificaciones de la plantilla del pod:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "<ENV>"
    tags.datadoghq.com/service: "<SERVICE>"
    tags.datadoghq.com/version: "<VERSION>" 
...
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
  containers:
  -  ...
     env:
          - name: DD_ENV
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/env']
          - name: DD_SERVICE
            valueFrom:
              fieldRef:
                fieldPath: metadata.labels['tags.datadoghq.com/service']
          - name: DD_VERSION 
            valueFrom: 
              fieldRef: 
                fieldPath: metadata.labels['tags.datadoghq.com/version']
```

También puedes utilizar las variables de atributos de recursos de OpenTelemetry para configurar las etiquetas (tags) `env`, `service` y `version`:

```yaml
  containers:
  -  ...
     env:
         - name: OTEL_RESOURCE_ATTRIBUTES
           value: "service.name=<SERVICE>,service.version=<VERSION>,deployment.environment=<ENV>"
         - name: OTEL_SERVICE_NAME
           value: "<SERVICE>"
```
<div class="alert alert-danger">La variable de entorno <code>OTEL_SERVICE_NAME</code> tiene prioridad sobre el atributo <code>service.name</code> de la variable de entorno <code>OTEL_RESOURCE_ATTRIBUTES</code>.</div>

##### Configuración parcial

###### Métricas a nivel del pod

Para configurar métricas a nivel del pod, añade las siguientes etiquetas (labels) estándar (`tags.datadoghq.com`) a las especificaciones del pod de un despliegue, StatefulSet o tarea:

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
```
Estas etiquetas (labels) abarcan la CPU, la memoria, la red y las métricas de disco de Kubernetes a nivel del pod, y pueden utilizarse para introducir `DD_ENV`, `DD_SERVICE` y `DD_VERSION` en el contenedor de tu servicio a través de la [API descendente de Kubernetes][2].

Si tienes varios contenedores en cada pod, podrás especificar etiquetas (labels) estándar según el contenedor:

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version 
```

###### Métricas de estado

Para configurar [métricas de estado de Kubernetes][3]:

1. Configura `join_standard_tags` como `true` en tu archivo de configuración. Para conocer la localización de los parámetros, consulta este [archivo de configuración de ejemplo][4].

2. Añade las mismas etiquetas (labels) estándar a la colección de etiquetas del recurso principal. Por ejemplo: `Deployment`.

  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
  spec:
    template:
      metadata:
        labels:
          tags.datadoghq.com/env: "<ENV>"
          tags.datadoghq.com/service: "<SERVICE>"
          tags.datadoghq.com/version: "<VERSION>" 
  ```

###### Rastreador de APM y cliente StatsD

Para configurar las variables de entorno del [rastreador de APM][5] y del [cliente StatsD][6], utiliza la [API descendente de Kubernetes][2] con el siguiente formato:

```yaml
containers:
-  ...
    env:
        - name: DD_ENV
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/env']
        - name: DD_SERVICE
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['tags.datadoghq.com/service']
        - name: DD_VERSION 
          valueFrom: 
            fieldRef: 
              fieldPath: metadata.labels['tags.datadoghq.com/version'] 
```

##### Etiquetado automático de versiones para datos de APM en entornos contenedorizados

<div class="alert alert-info">Esta función sólo está habilitada para los datos de <a href="https://docs.datadoghq.com/tracing/">Application Performance Monitoring (APM)</a>.</div>

Puedes utilizar la etiqueta (tag) `version` en APM para [monitorizar despliegues][7] e identificar despliegues de código fallidos mediante la [detección automática de despliegues fallidos][8].

Para datos de APM, Datadog configura la etiqueta (tag) `version` en el siguiente orden de prioridad. Si configuras `version` manualmente, Datadog no anula su valor `version`.

| Prioridad         | Valor de versión |
|--------------|------------|
| 1    |  {tu valor de versión}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} o {first_7_digits_of_git_commit_sha} si sólo uno está disponible      |

Requisitos: 
- Datadog Agent versión 7.52.0 o posterior
- Si tus servicios se ejecutan en un entorno contenedorizado y `image_tag` es suficiente para el seguimiento de los despliegues de nuevas versiones, no es necesaria ninguna configuración adicional.
- Si tus servicios no se ejecutan en un entorno contenedorizado o si también te gustaría incluir el git SHA, [integra información de Git en tus artefactos de creación][9] 


[1]: /es/agent/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[3]: /es/agent/kubernetes/data_collected/#kube-state-metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[5]: /es/tracing/send_traces/
[6]: /es/integrations/statsd/
[7]: /es/tracing/services/deployment_tracking/
[8]: /es/watchdog/faulty_deployment_detection/
[9]: /es/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "Docker" %}}
##### Configuración completa

Configura las variables de entorno `DD_ENV`, `DD_SERVICE` y `DD_VERSION` y las etiquetas (labels) de Docker correspondientes a tu contenedor, para acceder a todo el rango del etiquetado de servicios unificado.

Los valores de `service` y `version` pueden proporcionarse en el archivo de Docker:

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION> 

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>" 
```

Puesto que `env` probablemente se determine en el momento del despliegue, puedes introducir la etiqueta (label) y la variable de entorno más adelante:

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

Si lo prefieres, también puedes configurar todo en el momento del despliegue:

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \ 
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \ 
           ...
```

##### Configuración parcial

Si tu servicio no necesita las variables de entorno de Datadog (por ejemplo, si se trata de un software de terceros como Redis, PostgreSQL, NGINX y aplicaciones sin rastreo de APM), puedes utilizar simplemente las etiquetas (labels) de Docker:

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version 
```

Como se explica en la configuración completa, estas etiquetas (labels) se pueden configurar en un archivo de Docker o como argumentos para iniciar el contenedor.

##### Etiquetado automático de versiones para datos de APM en entornos contenedorizados

<div class="alert alert-info">Esta función sólo está habilitada para los datos de <a href="/tracing/">Application Performance Monitoring (APM)</a>.</div>

Puedes utilizar la etiqueta (tag) `version` en APM para [monitorizar despliegues][1] e identificar despliegues de código fallidos mediante la [detección automática de despliegues fallidos][2].

Para datos de APM, Datadog configura la etiqueta (tag) `version` en el siguiente orden de prioridad. Si configuras `version` manualmente, Datadog no anula su valor `version`.

| Prioridad         | Valor de versión |
|--------------|------------|
| 1    |  {tu valor de versión}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} o {first_7_digits_of_git_commit_sha} si sólo uno está disponible      |

Requisitos: 
- Datadog Agent versión 7.52.0 o posterior
- Si tus servicios se ejecutan en un entorno contenedorizado y `image_tag` es suficiente para el seguimiento de los despliegues de nuevas versiones, no es necesaria ninguna configuración adicional.
- Si tus servicios no se ejecutan en un entorno contenedorizado o si también te gustaría incluir el git SHA, [integra información de Git en tus artefactos de creación][3] 


[1]: /es/tracing/services/deployment_tracking/
[2]: /es/watchdog/faulty_deployment_detection/
[3]: /es/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "ECS" %}}

<div class="alert alert-danger">
En ECS Fargate con Fluent Bit o FireLens, el etiquetado de servicios unificado solo está disponible para métricas y trazas, no para la recopilación de logs.
</div>

##### Configuración completa

Configura las variables de entorno `DD_ENV`, `DD_SERVICE` y `DD_VERSION` (con el etiquetado automático de versiones opcional) y las etiquetas (labels) de Docker correspondientes en el entorno de ejecución de cada contenedor de servicio, para obtener el rango completo del etiquetado de servicios unificado. Por ejemplo, puedes definir toda esta configuración en un mismo lugar a través de tu definición de tareas de ECS.

```
"environment": [
  {
    "name": "DD_ENV",
    "value": "<ENV>"
  },
  {
    "name": "DD_SERVICE",
    "value": "<SERVICE>"
  },
  {
    "name": "DD_VERSION",
    "value": "<VERSION>"
  }

],
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```
<div class="alert alert-danger">
En ECS Fargate, debes añadir estas etiquetas a tu contenedor de aplicaciones, <strong>no</strong> al contenedor del Datadog Agent.
</div>

##### Configuración parcial

Si tu servicio no necesita las variables de entorno de Datadog (por ejemplo, si se trata de un software de terceros como Redis, PostgreSQL, NGINX y aplicaciones sin rastreo de APM), puedes utilizar simplemente las etiquetas (labels) de Docker en tu definición de tareas de ECS:

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### Etiquetado automático de versiones para datos de APM en entornos contenedorizados

<div class="alert alert-info">Esta función sólo está habilitada para los datos de <a href="/tracing/">Application Performance Monitoring (APM)</a>.</div>

Puedes utilizar la etiqueta (tag) `version` en APM para [monitorizar despliegues][1] e identificar despliegues de código fallidos mediante la [detección automática de despliegues fallidos][2].

Para datos de APM, Datadog configura la etiqueta (tag) `version` en el siguiente orden de prioridad. Si configuras `version` manualmente, Datadog no anula su valor `version`.

| Prioridad         | Valor de versión |
|--------------|------------|
| 1    |  {tu valor de versión}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} o {first_7_digits_of_git_commit_sha} si sólo uno está disponible      |

Requisitos: 
- Datadog Agent versión 7.52.0 o posterior
- Si tus servicios se ejecutan en un entorno contenedorizado y `image_tag` es suficiente para el seguimiento de los despliegues de nuevas versiones, no es necesaria ninguna configuración adicional.
- Si tus servicios no se ejecutan en un entorno contenedorizado o si también te gustaría incluir el git SHA, [integra información de Git en tus artefactos de creación][3] 

[1]: /es/tracing/services/deployment_tracking/
[2]: /es/watchdog/faulty_deployment_detection/
[3]: /es/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}
{{% /tabs %}}

### Entorno no contenedorizado

Según cómo crees e implementes los archivos binarios o ejecutables de tus servicios, tendrás distintas opciones disponibles para configurar las variables de entorno. Dado que puedes ejecutar uno o varios servicios por host, Datadog recomienda definir el contexto de estas variables de entorno en un solo proceso.

Para crear un único punto de configuración de toda la telemetría emitida directamente desde la herramienta de gestión de [trazas][8], [logs][9], [recursos RUM][10], [tests Synthetic][11], [métricas de StatsD][12] o métricas del sistema de tus servicios, tienes dos opciones:

1. Exportar las variables de entorno en el comando de tu ejecutable:

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. También puedes utilizar [Chef][13], [Ansible][14] u otra herramienta de orquestación para rellenar el archivo de configuración systemd o initd de un servicio con las variables de entorno `DD`. Cuando se inicie el proceso del servicio, este tendrá acceso a las variables.

   {{< tabs >}}
   {{% tab "Trazas" %}}

   Al configurar tus trazas para llevar a cabo el etiquetado de servicios unificado:

   1. Configura el [rastreador de APM][1] con `DD_ENV` para que la definición de `env` sea lo más parecida posible a la aplicación que genera las trazas. Este método permite que la etiqueta (tag) `env` se obtenga automáticamente de una etiqueta de los metadatos del tramo.

   2. Configura tramos con `DD_VERSION` para añadir la versión a todos los tramos del servicio que pertenece al rastreador (generalmente, `DD_SERVICE`). De este modo, si tu servicio crea tramos con el nombre de un servicio externo, esos tramos no recibirán `version` como etiqueta (tag).

      Siempre que la versión esté presente en tramos, se añadirá a las métricas de rastreo generadas a partir de esos tramos. La versión se puede añadir al código manualmente o bien automáticamente mediante el rastreador de APM. Cuando están configurados, APM y los [clientes DogStatsD][2] los utilizan para etiquetar datos de trazas y métricas de StatsD con `env`, `service` y `version`. Si el rastreador de APM está habilitado, también introducirá los valores de estas variables en tus logs.

      **Nota**: Solo puede haber **un servicio por tramo**. Por lo general, las métricas de rastreo también tienen un único servicio. Sin embargo, si tienes otro servicio definido en las etiquetas (tags) de tus hosts, esa etiqueta de servicio configurada aparecerá en todas las métricas de rastreo emitidas desde ese host.

[1]: /es/tracing/setup/
[2]: /es/developers/dogstatsd/
   {{% /tab %}}

   {{% tab "Logs" %}}

 Si utilizas [trazas y logs conectados][1], activa la introducción automática de logs siempre que tu rastreador de APM lo permita. De esta forma, el rastreador de APM introducirá automáticamente `env`, `service` y `version` en tus logs, lo que significa que no tendrás que configurar esos campos manualmente en otros lugares.

[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

   {{% tab "RUM y Session Replay" %}}

Si utilizas [RUM y trazas conectados][1], especifica la aplicación de navegador en el campo `service` , define el entorno en el campo `env` y enumera las versiones en el campo `version` de tu archivo de inicialización.

   Cuando [crees una aplicación de RUM][2], confirma los nombres de `env` y `service`.


[1]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[2]: /es/real_user_monitoring/browser/setup/
   {{% /tab %}}

   {{% tab "Synthetics" %}}

Si utilizas [trazas y tests conectados del navegador Synthetic][1], especifica una URL a la que haya que enviar las cabeceras en la sección **APM Integration for Browser Tests** (Integración de APM para tests de navegador) de la [página de configuración de integraciones][2].

   Puedes utilizar `*` como comodín. Ejemplo: `https://*.datadoghq.com`.

[1]: /es/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

   {{% tab "Métricas personalizadas" %}}

Las etiquetas (tags) se añaden solo a modo de anexo en el caso de las [métricas de StatsD personalizadas][1]. Por ejemplo, si tienes dos valores distintos para `env`, las métricas se etiquetan con ambos entornos. No existe ningún orden que haga que una etiqueta reemplace a otra con el mismo nombre.

Si tu servicio tiene acceso a `DD_ENV`, `DD_SERVICE` y `DD_VERSION`, el cliente DogStatsD añadirá automáticamente las etiquetas (tags) correspondientes a tus métricas personalizadas.

   **Nota**: Los clientes DogStatsD de Datadog en .NET y PHP no admiten esta funcionalidad.

[1]: /es/metrics/
   {{% /tab %}}

   {{% tab "Métricas de sistema" %}}

Puedes añadir etiquetas (tags) `env` y `service` a las métricas de tu infraestructura. En contextos no contenedorizados, el etiquetado de las métricas de servicios se configura a nivel del Agent.

   Dado que esta configuración no cambia en cada invocación del proceso de un servicio, no recomendamos añadir `version`.

#### Un solo servicio por host

Define la siguiente configuración en el [archivo de configuración principal][1] del Agent:

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

Esta configuración garantiza el etiquetado uniforme de `env` y `service` en todos los datos emitidos por el Agent.

#### Varios servicios por host

Define la siguiente configuración en el [archivo de configuración principal][1] del Agent:

```yaml
env: <ENV>
```

Para obtener etiquetas (tags) de `service` únicas en las métricas de CPU, de memoria y de E/S de disco a nivel del proceso, deberás configurar un [check del proceso][2] en la carpeta de configuración del Agent (por ejemplo, en la carpeta `conf.d` en `process.d/conf.yaml`):

```yaml
init_config:
instances:
    - name: web-app
      search_string: ["/bin/web-app"]
      exact_match: false
      service: web-app
    - name: nginx
      search_string: ["nginx"]
      exact_match: false
      service: nginx-web-app
```

**Nota**: Si ya tienes una etiqueta (tag) `service` configurada globalmente en el archivo de configuración principal de tu Agent, las métricas del proceso se etiquetan con dos servicios. Como esto puede resultar confuso para la interpretación de las métricas, se recomienda establecer la etiqueta `service` únicamente en la configuración del check del proceso.

[1]: /es/agent/configuration/agent-configuration-files
[2]: /es/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### Entorno serverless

Para obtener más información sobre las funciones de AWS Lambda, consulta [cómo conectar tu telemetría de Lambda mediante el uso de etiquetas (tags)][15].

### OpenTelemetry

Cuando utilices OpenTelemetry, asigna los siguientes [atributos de recursos][16] a sus correspondientes convenciones de Datadog:

| Convención de OpenTelemetry | Convención de Datadog |
| --- | --- |
| `deployment.environment` <sup>1</sup>  | `env` |
| `deployment.environment.name` <sup>2</sup> | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

1: `deployment.environment` queda obsoleto en favor de `deployment.environment.name` en [convenciones semánticas de OpenTelemetry v1.27.0][17].  
2: `deployment.environment.name` es compatible con el Datadog Agent v7.58.0 o posterior y con Datadog Exporter v0.110.0 o posterior.

<div class="alert alert-danger">Las variables de entorno específicas de Datadog como <code>DD_SERVICE</code>, <code>DD_ENV</code> o <code>DD_VERSION</code> no se admiten predefinidas en la configuración de OpenTelemetry.</div>

{{< tabs >}}
{{% tab "Environment variables" %}}

Para definir atributos de recursos utilizando variables de entorno, configura `OTEL_RESOURCE_ATTRIBUTES` con los valores adecuados:

```shell
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-service,deployment.environment=production,service.version=1.2.3"
```

{{% /tab %}}

{{% tab "SDK" %}}

Para definir los atributos de los recursos en el código de tu aplicación, crea un `Resource` con los atributos elegidos y asócialo a tu `TracerProvider`.

El siguiente es un ejemplo de uso de Python:

```python
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider

resource = Resource(attributes={
   "service.name": "<SERVICE>",
   "deployment.environment": "<ENV>",
   "service.version": "<VERSION>"
})
tracer_provider = TracerProvider(resource=resource)
```

{{% /tab %}}

{{% tab "Recopilador" %}}

Para definir atributos de recursos desde el recopilador OpenTelemetry, utiliza el [procesador de transformación][100] en el archivo de configuración de tu recopilador. El procesador de transformación permite modificar los atributos de los datos de telemetría recopilados antes de enviarlos al exportador de Datadog:

```yaml
processors:
  transform:
    trace_statements:
      - context: resource
        statements:
          - set(attributes["service.name"], "my-service")
          - set(attributes["deployment.environment"], "production")
          - set(attributes["service.version"], "1.2.3")
...
```

[100]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor

{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/
[2]: /es/agent/docker/integrations/?tab=docker
[3]: /es/getting_started/agent
[4]: /es/tracing/setup
[5]: /es/getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments
[6]: /es/getting_started/agent/autodiscovery
[7]: /es/agent/docker/?tab=standard#optional-collection-agents
[8]: /es/getting_started/tracing/
[9]: /es/getting_started/logs/
[10]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[11]: /es/getting_started/synthetics/
[12]: /es/integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /es/serverless/configuration/#connect-telemetry-using-tags
[16]: https://opentelemetry.io/docs/languages/js/resources/
[17]: https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.27.0