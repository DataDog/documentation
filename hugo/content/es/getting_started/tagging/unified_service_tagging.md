---
algolia:
  tags:
  - unified service tags
  - unified
  - unified service
  - service tags
description: Conecte la telemetría a través de trazas, métricas y registros utilizando
  etiquetas estandarizadas de entorno, servicio y versión para un monitoreo consistente.
further_reading:
- link: /getting_started/tagging/using_tags
  tag: Documentación
  text: Aprenda cómo usar etiquetas en la aplicación de Datadog
- link: /tracing/version_tracking
  tag: Documentación
  text: Utilice etiquetas de versión dentro de Datadog APM para monitorear implementaciones
- link: https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/
  tag: Blog
  text: Aprenda más sobre Autodiscovery
title: Etiquetado unificado de servicios
---
## Descripción General {#overview}

El etiquetado unificado de servicios une la telemetría de Datadog utilizando tres [etiquetas reservadas][1]: `env`, `service` y `version`.

Con estas tres etiquetas, puede:

- Identificar el impacto de la implementación con métricas de trazas y contenedores filtradas por versión
- Navegar sin problemas a través de trazas, métricas y registros con etiquetas consistentes
- Ver datos del servicio basados en el entorno o la versión de manera unificada

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="Etiquetado unificado de servicios" video=true >}}

**Notas**:

- Se espera que la etiqueta `version` cambie con cada nueva implementación de la aplicación. Dos versiones diferentes del código de su aplicación deben tener etiquetas `version` distintas.
- El servicio oficial de un registro se establece por defecto en la imagen corta del contenedor si no hay una configuración de registros de Autodiscovery presente. Para anular el servicio oficial de un registro, agregue [etiquetas de Docker/anotaciones de pod][2] de Autodiscovery. Por ejemplo: `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`
- La información del host se excluye para los tramos de base de datos y caché porque el host asociado con el tramo no es el host de la base de datos/caché.

### Requisitos {#requirements}

- El etiquetado unificado de servicios requiere la configuración de un [Datadog Agent][3] que sea 6.19.x/7.19.x o superior.

- El etiquetado unificado de servicios requiere una versión de kit de desarrollo de software que soporte nuevas configuraciones de las [etiquetas reservadas][1]. Se puede encontrar más información por idioma en las [instrucciones de configuración][4].


| Idioma         | Versión mínima de kit de desarrollo de software |
|--------------|------------|
| .NET    |  1.17.0+       |
| C++    |  0.1.0+       |
| Go         |  1.24.0+       |
| Java   |  0.50.0+      |
| Node    |  0.20.3+       |
| PHP  |  0.47.0+      |
| Python  |  0.38.0+      |
| Ruby  |  0.34.0+      |

- La etiquetación unificada de servicios requiere conocimiento sobre la configuración de etiquetas. Si no está seguro de cómo configurar etiquetas, lea la documentación de [Introducción a la Etiquetación][1] y [Asignación de Etiquetas][5] antes de proceder a la configuración.

## Configuración {#configuration}

Para comenzar a configurar la etiquetación unificada de servicios, elija su entorno:

- [Contenedorizado](#containerized-environment)
- [No contenedorizado](#non-containerized-environment)
- [Serverless](#serverless-environment)
- [OpenTelemetry](#opentelemetry)

### Entorno en contenedores {#containerized-environment}

En entornos en contenedores, `env`, `service` y `version` se configuran a través de las variables de entorno o etiquetas del servicio (por ejemplo, etiquetas de despliegue y de pod en Kubernetes, etiquetas de contenedor de Docker). El Agente de Datadog detecta esta configuración de etiquetado y la aplica a los datos que recopila de los contenedores.

Para configurar el etiquetado unificado de servicios en un entorno en contenedores:

1. Habilitar [Autodiscovery][6]. Esto permite que el Agente de Datadog identifique automáticamente los servicios que se ejecutan en un contenedor específico y recopile datos de esos servicios para mapear las variables de entorno a las etiquetas `env`, `service,` y `version`.

2. Si está utilizando [Docker][2], asegúrese de que el Agente pueda acceder al [socket de Docker][7] de su contenedor. Esto permite que el Agente detecte las variables de entorno y las mapee a las etiquetas estándar.

3. Configure su entorno que corresponde a su servicio de orquestación de contenedores basado en configuración completa o configuración parcial como se detalla a continuación.

#### Configuración {#configuration-1}

{{< tabs >}}
{{% tab "Kubernetes" %}}

Si desplegó el Agente de Clúster de Datadog con el [Controlador de Admisión][1] habilitado, el Controlador de Admisión modifica los manifiestos de pod e inyecta todas las variables de entorno requeridas (basado en las condiciones de mutación configuradas). En ese caso, la configuración manual de las variables de entorno `DD_` en los manifiestos de pod no es necesaria. Para más información, consulte la [documentación del Controlador de Admisión][1].

##### Configuración completa {#full-configuration}

Para obtener el rango completo de etiquetado unificado de servicios al usar Kubernetes, agregue variables de entorno tanto al nivel del objeto de despliegue como al nivel de especificación de plantilla de pod:

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

También puede usar las variables de entorno de Atributos de Recursos de OpenTelemetry para establecer las etiquetas `env`, `service` y `version`:

```yaml
  containers:
  -  ...
     env:
         - name: OTEL_RESOURCE_ATTRIBUTES
           value: "service.name=<SERVICE>,service.version=<VERSION>,deployment.environment=<ENV>"
         - name: OTEL_SERVICE_NAME
           value: "<SERVICE>"
```
<div class="alert alert-danger">El <code>OTEL_SERVICE_NAME</code> la variable de entorno tiene prioridad sobre la <code>service.name</code> atributo en el <code>OTEL_RESOURCE_ATTRIBUTES</code> variable de entorno.</div>

##### Configuración parcial {#partial-configuration}

###### Métricas a nivel de pod {#pod-level-metrics}

Para configurar métricas a nivel de pod, agregue las siguientes etiquetas estándar (`tags.datadoghq.com`) a la especificación del pod de un Deployment, StatefulSet o Job:

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>" 
```
Estas etiquetas cubren métricas de CPU, memoria, red y disco a nivel de pod en Kubernetes, y se pueden usar para inyectar `DD_ENV`, `DD_SERVICE` y `DD_VERSION` en el contenedor de su servicio a través de la [API descendente de Kubernetes][2].

Si tiene múltiples contenedores por pod, puede especificar etiquetas estándar por contenedor:

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version 
```

###### Métricas de estado {#state-metrics}

Para configurar [Métricas de Estado de Kubernetes][3]:

1. Establezca `join_standard_tags` en `true` en su archivo de configuración. Consulte este [archivo de configuración de ejemplo][4] para la ubicación de la configuración.

2. Agregue las mismas etiquetas estándar a la colección de etiquetas para el recurso padre, por ejemplo: `Deployment`.

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

###### SDK de Datadog y cliente de StatsD {#datadog-sdk-and-statsd-client}

Para configurar las variables de entorno del [SDK de Datadog][5] y del [cliente de StatsD][6], use la [API descendente de Kubernetes][2] en el formato a continuación:

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

##### Etiquetado automático de versiones para datos de APM en entornos contenedorizados {#automatic-version-tagging-for-apm-data-in-containerized-environments}

<div class="alert alert-info">Esta función solo está habilitada para <a href="https://docs.datadoghq.com/tracing/">Application Performance Monitoring (APM)</a> datos.</div>

Puede usar la etiqueta `version` en APM para [monitorear implementaciones][7] e identificar implementaciones de código defectuosas a través de [Detección Automática de Implementaciones Defectuosas][8].

Para los datos de APM, Datadog establece la etiqueta `version` para usted en el siguiente orden de prioridad. Si configura manualmente `version`, Datadog no sobrescribirá su valor de `version`.

| Prioridad         | Valor de versión |
|--------------|------------|
| 1    |  {your version value}       |
| 2   | {image_tag}_{first_7_digits_of_git_commit_sha}       |
| 3         |  {image_tag} o {first_7_digits_of_git_commit_sha} si solo uno está disponible      |

Requisitos: 
- Datadog Agent Version 7.52.0 o superior
- Si sus servicios se ejecutan en un entorno contenedorizado y `image_tag` es suficiente para el seguimiento de nuevos despliegues de versiones, no se requiere configuración adicional.
- Si sus servicios no se están ejecutando en un entorno contenedorizado, o si también desea incluir el Git SHA, [incorpore información de Git en sus artefactos de construcción][9].


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
##### Configuración completa {#full-configuration-1}

Establezca las variables de entorno `DD_ENV`, `DD_SERVICE` y `DD_VERSION` y las etiquetas de Docker correspondientes para su contenedor para obtener la gama completa de unified service tagging.

Los valores para `service` y `version` se pueden proporcionar en el Dockerfile:

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION> 

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>" 
```

Dado que `env` probablemente se determina en el momento de la implementación, puede inyectar la variable de entorno y la etiqueta más tarde:

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

También puede preferir establecer todo en el momento de la implementación:

```shell
docker run -e DD_ENV="<ENV>" \
           -e DD_SERVICE="<SERVICE>" \
           -e DD_VERSION="<VERSION>" \ 
           -l com.datadoghq.tags.env="<ENV>" \
           -l com.datadoghq.tags.service="<SERVICE>" \
           -l com.datadoghq.tags.version="<VERSION>" \ 
           ...
```

##### Configuración parcial {#partial-configuration-1}

Si su servicio no necesita las variables de entorno de Datadog (por ejemplo, software de terceros como Redis, PostgreSQL, NGINX y aplicaciones que no son rastreadas por APM), puede usar las etiquetas de Docker:

```yaml
com.datadoghq.tags.env
com.datadoghq.tags.service
com.datadoghq.tags.version 
```

Como se explica en la configuración completa, estas etiquetas se pueden establecer en un Dockerfile o como argumentos para lanzar el contenedor.

##### Etiquetado automático de versiones para datos de APM en entornos contenedorizados {#automatic-version-tagging-for-apm-data-in-containerized-environments-1}

<div class="alert alert-info">Esta función solo está habilitada para <a href="/tracing/">Application Performance Monitoring (APM)</a> datos.</div>

Puede usar la etiqueta `version` en APM para [monitorear despliegues][1] e identificar despliegues de código defectuosos a través de [Detección Automática de Implementaciones Defectuosas][2].

Para los datos de APM, Datadog establece la etiqueta `version` para usted en el siguiente orden de prioridad. Si configura manualmente `version`, Datadog no sobrescribirá su valor de `version`.

| Prioridad         | Valor de versión |
|--------------|------------|
| 1    |  {tu valor de versión}       |
| 2   | {etiqueta_de_imagen}_{primeros_7_dígitos_del_sha_del_commit_de_git}       |
| 3         |  {etiqueta_de_imagen} o {primeros_7_dígitos_del_sha_del_commit_de_git} si solo uno está disponible      |

Requisitos: 
- Versión del Agente de Datadog 7.52.0 o superior
- Si sus servicios se ejecutan en un entorno contenedorizado y `image_tag` es suficiente para rastrear nuevos despliegues de versiones, no se requiere configuración adicional.
- Si sus servicios no se están ejecutando en un entorno contenedorizado, o si también desea incluir el SHA de Git, [inserte información de Git en sus artefactos de construcción][3].
 

[1]: /es/tracing/services/deployment_tracking/
[2]: /es/watchdog/faulty_deployment_detection/
[3]: /es/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}

{{% tab "ECS" %}}

<div class="alert alert-danger">
En ECS Fargate usando Fluent Bit o FireLens, el etiquetado unificado de servicios solo está disponible para métricas y trazas, no para la recolección de registros.
</div>

##### Configuración completa {#full-configuration-2}

Establezca las variables de entorno `DD_ENV`, `DD_SERVICE` y `DD_VERSION` (opcional con etiquetado automático de versiones) y las etiquetas de Docker correspondientes en el entorno de ejecución del contenedor de cada servicio para obtener el rango completo de etiquetado unificado de servicios. Por ejemplo, puede establecer toda esta configuración en un solo lugar a través de la definición de tarea de ECS:

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
En ECS Fargate, debe agregar estas etiquetas a su contenedor de aplicación, <strong>no</strong> al contenedor del Datadog Agent.
</div>

##### Configuración parcial {#partial-configuration-2}

Si su servicio no necesita las variables de entorno de Datadog (por ejemplo, software de terceros como Redis, PostgreSQL, NGINX y aplicaciones que no son rastreadas por APM), puede usar las etiquetas de Docker en su definición de tarea de ECS:

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

##### Etiquetado automático de versiones para datos de APM en entornos contenedorizados {#automatic-version-tagging-for-apm-data-in-containerized-environments-2}

<div class="alert alert-info">Esta función solo está habilitada para <a href="/tracing/">Application Performance Monitoring (APM)</a> datos.</div>

Puede usar la etiqueta `version` en APM para [monitorear despliegues][1] e identificar despliegues de código defectuosos a través de [Detección Automática de Implementaciones Defectuosas][2].

Para los datos de APM, Datadog establece la etiqueta `version` para usted en el siguiente orden de prioridad. Si configura manualmente `version`, Datadog no sobrescribirá su valor de `version`.

| Prioridad         | Valor de versión |
|--------------|------------|
| 1    |  {tu valor de versión}       |
| 2   | {etiqueta_de_imagen}_{primeros_7_dígitos_del_sha_del_commit_de_git}       |
| 3         |  {etiqueta_de_imagen} o {primeros_7_dígitos_del_sha_del_commit_de_git} si solo uno está disponible      |

Requisitos: 
- Versión del Agente de Datadog 7.52.0 o superior
- Si sus servicios se ejecutan en un entorno contenedorizado y `image_tag` es suficiente para rastrear nuevos despliegues de versiones, no se requiere configuración adicional.
- Si sus servicios no se están ejecutando en un entorno contenedorizado, o si también desea incluir el SHA de Git, [inserte información de Git en sus artefactos de construcción][3].

[1]: /es/tracing/services/deployment_tracking/
[2]: /es/watchdog/faulty_deployment_detection/
[3]: /es/integrations/guide/source-code-integration/?tab=go#embed-git-information-in-your-build-artifacts

{{% /tab %}}
{{% /tabs %}}

### Entorno no contenedorizado {#non-containerized-environment}

Dependiendo de cómo construya e implemente los binarios o ejecutables de sus servicios, puede tener varias opciones disponibles para establecer variables de entorno. Dado que puede ejecutar uno o más servicios por host, Datadog recomienda limitar estas variables de entorno a un solo proceso.

Para formar un único punto de configuración para toda la telemetría emitida directamente desde el tiempo de ejecución de sus servicios para [traces][8], [logs][9], [RUM resources][10], [Synthetics tests][11], [StatsD metrics][12] o métricas del sistema, ya sea:

1. Exporta las variables de entorno en el comando para tu ejecutable:

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. O utiliza [Chef][13], [Ansible][14] u otra herramienta de orquestación para poblar el archivo de configuración systemd o initd de un servicio con las variables de entorno `DD`. Cuando el proceso del servicio se inicia, tiene acceso a esas variables.

   {{< tabs >}}
   {{% tab "Trazas" %}}

   Al configurar sus trazas para etiquetado unificado de servicios:

   1. Configure el [SDK de Datadog][1] con `DD_ENV` para mantener la definición de `env` más cerca de la aplicación que genera las trazas. Este método permite que la etiqueta `env` se obtenga automáticamente de una etiqueta en los metadatos del span.

   2. Configure spans con `DD_VERSION` para agregar la versión a todos los spans que caen bajo el servicio que pertenece al SDK (generalmente `DD_SERVICE`). Esto significa que si su servicio crea spans con el nombre de un servicio externo, esos spans no reciben `version` como etiqueta.

      Mientras la versión esté presente en los spans, se agrega a las métricas de trazas generadas a partir de esos spans. La versión puede ser añadida manualmente en el código o automáticamente por el SDK de Datadog. Cuando se configura, estos son utilizados por el APM y los [clientes de DogStatsD][2] para etiquetar los datos de trazas y las métricas de StatsD con `env`, `service` y `version`. Si está habilitado, el SDK de Datadog también inyecta los valores de estas variables en sus logs.

      **Nota**: Solo puede haber **un servicio por span**. Las métricas de trazas generalmente tienen un solo servicio también. Sin embargo, si tiene un servicio diferente definido en las etiquetas de sus hosts, esa etiqueta de servicio configurada aparece en todas las métricas de trazas emitidas desde ese host.

[1]: /es/tracing/setup/
[2]: /es/extend/dogstatsd/
   {{% /tab %}}

   {{% tab "Registros" %}}

   Si está utilizando [logs y trazas conectados][1], habilite la inyección automática de logs si es compatible con su SDK de Datadog. Luego, el SDK de Datadog inyecta automáticamente `env`, `service` y `version` en sus registros, eliminando así la configuración manual para esos campos en otros lugares.

[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

   {{% tab "RUM y Reproducción de Sesiones" %}}

   Si está utilizando [RUM y trazas conectadas][1], especifique la aplicación del navegador en el campo `service`, defina el entorno en el campo `env` y enumere las versiones en el campo `version` de su archivo de inicialización.

   Cuando [cree una aplicación RUM][2], confirme los nombres de `env` y `service`.


[1]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[2]: /es/real_user_monitoring/application_monitoring/browser/setup/
   {{% /tab %}}

   {{% tab "Synthetics" %}}

   Si está utilizando [pruebas de navegador sintéticas conectadas y trazas][1], especifique una URL para enviar encabezados en la sección **Integración APM para Pruebas de Navegador** de la [página de Configuración de Integración][2].

   Puede usar `*` para comodines, por ejemplo: `https://*.datadoghq.com`.

[1]: /es/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

   {{% tab "Custom Metrics" %}}

   Las etiquetas se agregan de manera acumulativa para [métricas StatsD personalizadas][1]. Por ejemplo, si tiene dos valores diferentes para `env`, las métricas se etiquetan con ambos entornos. No hay un orden en el que una etiqueta anule a otra del mismo nombre.

   Si su servicio tiene acceso a `DD_ENV`, `DD_SERVICE` y `DD_VERSION`, entonces el cliente DogStatsD agrega automáticamente las etiquetas correspondientes a sus métricas personalizadas.

   **Nota**: Los clientes DogStatsD de Datadog para .NET y PHP no admiten esta funcionalidad.

[1]: /es/metrics/
   {{% /tab %}}

   {{% tab "Métricas del Sistema" %}}

   Puede agregar etiquetas `env` y `service` a sus métricas de infraestructura. En contextos no contenedorizados, la etiquetación para métricas de servicio se configura a nivel del Agente.

   Debido a que esta configuración no cambia para cada invocación del proceso de un servicio, no se recomienda agregar `version`.

#### Servicio único por servidor {#single-service-per-host}

Establezca la siguiente configuración en el [archivo de configuración principal del Agente][1]:

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

Esta configuración garantiza el etiquetado consistente de `env` y `service` para todos los datos emitidos por el Agente.

#### Múltiples servicios por servidor {#multiple-services-per-host}

Establezca la siguiente configuración en el [archivo de configuración principal del Agente][1]:

```yaml
env: <ENV>
```

Para obtener etiquetas `service` únicas en métricas de CPU, memoria y disco I/O a nivel de proceso, configure una [verificación de proceso][2] en la carpeta de configuración del Agente (por ejemplo, en la carpeta `conf.d` bajo `process.d/conf.yaml`):

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

**Nota**: Si ya tiene una etiqueta `service` configurada globalmente en el archivo de configuración principal de su Agente, las métricas del proceso están etiquetadas con dos servicios. Dado que esto puede causar confusión al interpretar las métricas, se recomienda configurar la etiqueta `service` solo en la configuración de la verificación de proceso.

[1]: /es/agent/configuration/agent-configuration-files
[2]: /es/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### Serverless environment {#serverless-environment}

Para más información sobre funciones de AWS Lambda, consulte [cómo conectar su telemetría de Lambda usando etiquetas][15].

### OpenTelemetry {#opentelemetry}

Al usar OpenTelemetry, mapee los siguientes [atributos de recurso][16] a sus convenciones correspondientes de Datadog:

| Convención de OpenTelemetry | Convención de Datadog |
| --- | --- |
| `deployment.environment` <sup>1</sup>  | `env` |
| `deployment.environment.name` <sup>2</sup> | `env` |
| `service.name` | `service` |
| `service.version` | `version` |

1: `deployment.environment` está en desuso en favor de `deployment.environment.name` en [convenciones semánticas de OpenTelemetry v1.27.0][17].  
2: `deployment.environment.name` es compatible con Datadog Agent 7.58.0+ y Datadog Exporter v0.110.0+.

<div class="alert alert-danger">Variables de entorno específicas de Datadog como <code>DD_SERVICE</code>, <code>DD_ENV</code> o <code>DD_VERSION</code> no son compatibles de forma predeterminada en su configuración de OpenTelemetry.</div>

{{< tabs >}}
{{% tab "Variables de entorno" %}}

Para establecer atributos de recursos utilizando variables de entorno, configure `OTEL_RESOURCE_ATTRIBUTES` con los valores apropiados:

```shell
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-service,deployment.environment=production,service.version=1.2.3"
```

{{% /tab %}}

{{% tab "SDK" %}}

Para establecer atributos de recursos en el código de su aplicación, cree un `Resource` con los atributos deseados y asócialo con su `TracerProvider`.

Aquí hay un ejemplo usando Python:

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

{{% tab "Collector" %}}

Para establecer atributos de recursos desde el OpenTelemetry Collector, use el [procesador de transformación][100] en su archivo de configuración del Collector. El procesador de transformación le permite modificar los atributos de los datos de telemetría recopilados antes de enviarlos al exportador de Datadog:

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

## Lectura adicional {#further-reading}

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