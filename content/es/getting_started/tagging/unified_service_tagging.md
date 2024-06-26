---
algolia:
  tags:
  - etiquetas de servicio unificadas
  - unificado
  - servicio unificado
  - etiquetas (tags) de servicio
further_reading:
- link: /getting_started/tagging/using_tags
  tag: Documentación
  text: Descubre cómo utilizar las etiquetas (tags) en la aplicación de Datadog
- link: /tracing/version_tracking
  tag: Documentación
  text: Utiliza las etiquetas de versión en APM de Datadog para monitorizar implementaciones
- link: https://www.datadoghq.com/blog/autodiscovery-docker-monitoring/
  tag: Blog
  text: Más información sobre Autodiscovery
kind: documentación
title: Etiquetado de servicios unificado
---

## Información general

El etiquetado de servicios unificado asocia la telemetría de Datadog utilizando tres [etiquetas reservadas][1]: `env`, `service` y `version`.

Estas tres etiquetas te permiten:

- Identificar el impacto de la implementación con métricas de rastreo y de contenedor filtradas por versión
- Navegar sin problemas a través de trazas (traces), métricas y logs con etiquetas coherentes
- Ver datos de servicios basados en el entorno o la versión de manera unificada

{{< img src="tagging/unified_service_tagging/overview.mp4" alt="Etiquetado de servicios unificado" video=true >}}

**Notas**:

- Se espera que la etiqueta (tag) de `version` cambie con cada nueva implementación de la aplicación. Dos versiones diferentes del código de tu aplicación deberían tener diferentes etiquetas de `version`.
- El servicio oficial de un log es por defecto la imagen corta del contenedor, si no hay una configuración de logs de Autodiscovery presente. Para reemplazar el servicio oficial de un log, añade [etiquetas Docker/anotaciones de pod][2] de Autodiscovery. Por ejemplo: `"com.datadoghq.ad.logs"='[{"service": "service-name"}]'`
- La información del host se excluye para la base de datos y los tramos (spans) de caché porque el host asociado con el tramo no es el host de base de datos/caché.

### Requisitos

- El etiquetado de servicios unificado requiere la configuración de un [Datadog Agent ][3] de 6.19.x/7.19.x o posterior.

- El etiquetado de servicios unificado requiere una versión de rastreador que admita nuevas configuraciones de las [etiquetas reservadas][1]. Obtén más información por idioma en las [instrucciones de configuración][4].


| Idioma         | Versión mínima del rastreador |
|--------------|------------|
| .NET    |  1.17.0 o posterior       |
| C++    |  1.1.4 o posterior       |
| Go         |  1.24.0 o posterior       |
| Java   |  0.50.0 o posterior      |
| Node    |  0.20.3 o posterior       |
| PHP  |  0.47.0 o posterior      |
| Python  |  0.38.0 o posterior      |
| Ruby  |  0.34.0 o posterior      |

- Para llevar a cabo el etiquetado de servicios unificado, es necesario conocer la configuración de etiquetas. Si no sabes muy bien cómo configurar etiquetas, lee antes la documentación [Empezando con las etiquetas][1] y [Asignación de etiquetas][5].

## Configuración

Para empezar a configurar el etiquetado de servicios unificado, elige tu entorno:

- [contenedorizado](#containerized-environment)
- [no contenedorizado](#non-containerized-environment)

### Entorno contenedorizado

En entornos contenedorizados, `env`, `service` y `version` se configuran a través de variables de entorno o etiquetas del servicio; por ejemplo, etiquetas de la implementación de Kubernetes y del pod o etiquetas del contenedor de Docker. El Datadog Agent detecta esta configuración de etiquetado y la aplica a los datos que recopila de los contenedores.

Para configurar el etiquetado de servicios unificado en un entorno contenedorizado:

1. Activa [Autodiscovery][6]. Esto permitirá al Datadog Agent identificar automáticamente los servicios que se ejecutan en un contenedor concreto y recopilar datos de esos servicios para asignar variables de entorno a las etiquetas `env`, `service,` y `version`. 

2. Si utilizas [Docker][2], asegúrate de que el Agent pueda acceder al [socket de Docker][7] de tu contenedor. Esto permitirá al Agent detectar las variables de entorno y asignarlas a etiquetas estándar.

3. Configura el entorno que corresponda a tu servicio de orquestación de contenedores, según la configuración completa o parcial, tal y como se indica a continuación.

#### Configuración

{{< tabs >}}
{{% tab "Kubernetes" %}}

Si has implementado el Agent de clúster de Datadog con el [controlador de admisión][1] activado, este último mutará los manifiestos del pod e introducirá todas las variables de entorno requeridas (en función de las condiciones de mutación establecidas). En ese caso, no será necesaria la configuración manual de las variables de entorno `DD_` en los manifiestos del pod. Para obtener más información, consulta la [documentación del controlador de admisión][1].

##### Configuración completa

Para obtener todo el rango del etiquetado de servicios unificado al utilizar Kubernetes, añade variables de entorno tanto a nivel del objeto de implementación como a nivel de las especificaciones de la plantilla del pod:

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

##### Configuración parcial

###### Métricas a nivel del pod

Para configurar métricas a nivel del pod, añade las siguientes etiquetas (labels) estándar (`tags.datadoghq.com`) a las especificaciones del pod de una implementación, StatefulSet o tarea:

```yaml
template:
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
```
Estas etiquetas abarcan la CPU, la memoria, la red y las métricas de disco de Kubernetes a nivel del pod, y pueden utilizarse para introducir `DD_ENV`, `DD_SERVICE` y `DD_VERSION` en el contenedor de tu servicio a través de la [API descendente de Kubernetes][2].

Si tienes varios contenedores en cada pod, podrás especificar etiquetas estándar según el contenedor:

```yaml
tags.datadoghq.com/<container-name>.env
tags.datadoghq.com/<container-name>.service
tags.datadoghq.com/<container-name>.version
```

###### Métricas de estado

Para configurar [métricas de estado de Kubernetes][3]:

1. Establece `join_standard_tags` como `true` en tu archivo de configuración. Consulta este [archivo de configuración de ejemplo][4] para conocer la localización de los ajustes.

2. Añade las mismas etiquetas estándar a la colección de etiquetas del recurso superior. Por ejemplo: `Deployment`.

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


[1]: /es/agent/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information/#capabilities-of-the-downward-api
[3]: /es/agent/kubernetes/data_collected/#kube-state-metrics
[4]: https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/datadog_checks/kubernetes_state/data/conf.yaml.example
[5]: /es/tracing/send_traces/
[6]: /es/integrations/statsd/
{{% /tab %}}

{{% tab "Docker" %}}
##### Configuración completa

Establece las variables de entorno `DD_ENV`, `DD_SERVICE` y `DD_VERSION` y las etiquetas (labels) de Docker correspondientes para tu contenedor, a fin fin de acceder a todo el rango del etiquetado de servicios unificado.

Los valores de `service` y `version` pueden proporcionarse en el archivo de Docker:

```yaml
ENV DD_SERVICE <SERVICE>
ENV DD_VERSION <VERSION>

LABEL com.datadoghq.tags.service="<SERVICE>"
LABEL com.datadoghq.tags.version="<VERSION>"
```

Puesto que `env` probablemente se determine en el momento de la implementación, puedes introducir la etiqueta (label) y la variable de entorno más adelante:

```shell
docker run -e DD_ENV=<ENV> -l com.datadoghq.tags.env=<ENV> ...
```

Si lo prefieres, también puedes configurar todo en el momento de la implementación:

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

Como se explica en la configuración completa, estas etiquetas (labels) se pueden establecer en un archivo de Docker o como argumentos para iniciar el contenedor.

{{% /tab %}}

{{% tab "ECS" %}}
##### Configuración completa

Configura las variables de entorno `DD_ENV`, `DD_SERVICE` y `DD_VERSION`, y las etiquetas (labels) de Docker correspondientes en el entorno de ejecución de cada contenedor de servicio para obtener el rango completo del etiquetado de servicios unificado. Por ejemplo, puedes ajustar toda esta configuración en un mismo lugar a través de tu definición de tareas de ECS.

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

##### Configuración parcial

Si tu servicio no necesita las variables de entorno de Datadog (por ejemplo, si se trata de un software de terceros como Redis, PostgreSQL, NGINX y aplicaciones sin rastreo de APM), puedes utilizar simplemente las etiquetas (labels) de Docker en tu definición de tareas de ECS:

```
"dockerLabels": {
  "com.datadoghq.tags.env": "<ENV>",
  "com.datadoghq.tags.service": "<SERVICE>",
  "com.datadoghq.tags.version": "<VERSION>"
}
```

{{% /tab %}}
{{< /tabs >}}

### Entorno no contenedorizado

Según cómo crees e implementes los archivos binarios o ejecutables de tus servicios, tendrás distintas opciones disponibles para configurar las variables de entorno. Dado que puedes ejecutar uno o varios servicios por host, Datadog recomienda definir el contexto de estas variables de entorno en un solo proceso.

Para crear un único punto de configuración de toda la telemetría emitida directamente desde la herramienta de gestión de [trazas (traces)][8], [logs][9], [recursos RUM][10], [tests Synthetic][11], [métricas de StatsD][12] o métricas del sistema de tus servicios, tienes dos opciones:

1. Exportar las variables de entorno en el comando de tu ejecutable:

   ```
   DD_ENV=<env> DD_SERVICE=<service> DD_VERSION=<version> /bin/my-service
   ```

2. También puedes utilizar [Chef][13], [Ansible][14] u otra herramienta de orquestación para rellenar el archivo de configuración systemd o initd de un servicio con las variables de entorno `DD`. Cuando se inicie el proceso del servicio, este tendrá acceso a las variables.

   {{< tabs >}}
   {{% tab "Trazas" %}}

   Al configurar tus trazas (traces) para llevar a cabo el etiquetado de servicios unificado:

   1. Configura el [rastreador de APM][1] con `DD_ENV` para que la definición de `env` sea lo más parecida posible a la aplicación que genera las trazas. Este método permite que la etiqueta (tag) `env` se obtenga automáticamente de una etiqueta (tag) de los metadatos del tramo (span).

   2. Configura tramos con `DD_VERSION` para añadir la versión a todos los tramos del servicio que pertenece al rastreador (generalmente, `DD_SERVICE`). De este modo, si tu servicio crea tramos con el nombre de un servicio externo, esos tramos no recibirán `version` como etiqueta (tag).

      Siempre que la versión esté presente en tramos, se añadirá a las métricas de rastreo generadas a partir de esos tramos. La versión se puede añadir al código manualmente o bien automáticamente mediante el rastreador de APM. Cuando están configurados, APM y los [clientes DogStatsD][2] los utilizan para etiquetar datos de trazas y métricas de StatsD con `env`, `service` y `version`. Si el rastreador de APM está habilitado, también introducirá los valores de estas variables en tus logs.

      **Nota**: Solo puede haber **un servicio por tramo**. Por lo general, las métricas de rastreo también tienen un único servicio. Sin embargo, si tienes otro servicio definido en las etiquetas (tags) de tus hosts, esa etiqueta de servicio configurada aparecerá en todas las métricas de rastreo emitidas desde ese host.

[1]: /es/tracing/setup/
[2]: /es/developers/dogstatsd/
   {{% /tab %}}

   {{% tab "Logs" %}}

 Si utilizas [trazas y logs conectados][1], activa la introducción automática de logs siempre que tu rastreador de APM lo permita. De esta forma, el rastreador de APM introducirá automáticamente `env`, `service` y `version` en tus logs, lo que significa que no tendrás que configurar esos campos manualmente en otros lugares.

   **Nota**: El rastreador de PHP no admite la configuración del etiquetado de servicios unificado para los logs.

[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
   {{% /tab %}}

   {{% tab "RUM y Session Replay" %}}

   Si utilizas [RUM y trazas (traces) conectados][1], especifica la aplicación de navegador en el campo `service` , define el entorno en el campo `env` y enumera las versiones en el campo `version` de tu archivo de inicialización.

   Cuando [crees una aplicación de RUM][2], confirma los nombres de `env` y `service`.


[1]: /es/real_user_monitoring/platform/connect_rum_and_traces/
[2]: /es/real_user_monitoring/browser/#setup
   {{% /tab %}}

   {{% tab "Synthetics" %}}

   Si utilizas [trazas y tests de navegador Synthetic conectados][1], especifica una URL a la que haya que enviar los encabezados en la sección **APM Integration for Browser Tests** (Integración de APM para tests de navegador) de la [página de configuración de integraciones][2].

   Puedes utilizar `*` como comodín. Ejemplo: `https://*.datadoghq.com`.

[1]: /es/synthetics/apm/
[2]: https://app.datadoghq.com/synthetics/settings/integrations
   {{% /tab %}}

   {{% tab "Métricas personalizadas" %}}

   Las etiquetas (tags) se añaden solo a modo de anexo en el caso de las [métricas de StatsD personalizadas][1]. Por ejemplo, si tienes dos valores distintos para `env`, las métricas se etiquetan con ambos entornos. No existe ningún orden que haga que una etiqueta (tag) reemplace a otra con el mismo nombre.

   Si tu servicio tiene acceso a `DD_ENV`, `DD_SERVICE` y `DD_VERSION`, el cliente DogStatsD añadirá automáticamente las etiquetas (tags) correspondientes a tus métricas personalizadas.

   **Nota**: Los clientes DogStatsD de Datadog en .NET y PHP no admiten esta funcionalidad.

[1]: /es/metrics/
   {{% /tab %}}

   {{% tab "Métricas de sistema" %}}

   Puedes añadir etiquetas (tags) `env` y `service` a las métricas de tu infraestructura. En contextos no contenedorizados, el etiquetado de las métricas de servicios se configura a nivel del Agent.

   Dado que esta configuración no cambia en cada invocación del proceso de un servicio, no recomendamos añadir `version`.

#### Un solo servicio por host

Establece la siguiente configuración en el [archivo de configuración principal][1] del Agent:

```yaml
env: <ENV>
tags:
  - service:<SERVICE>
```

Esta configuración garantiza el etiquetado uniforme de `env` y `service` en todos los datos emitidos por el Agent.

#### Varios servicios por host

Establece la siguiente configuración en el [archivo de configuración principal][1] del Agent:

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

**Nota**: Si ya tienes una etiqueta (tag) `service` establecida globalmente en el archivo de configuración principal de tu Agent, las métricas del proceso se etiquetan con dos servicios. Como esto puede resultar confuso para la interpretación de las métricas, se recomienda establecer la etiqueta (tag) `service` únicamente en la configuración del check del proceso.

[1]: /es/agent/configuration/agent-configuration-files
[2]: /es/integrations/process
    {{% /tab %}}
    {{< /tabs >}}

### Entorno serverless

Para obtener más información sobre las funciones de AWS Lambda, consulta [cómo conectar tu telemetría de Lambda mediante el uso de etiquetas (tags)][15].
## Leer más

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
[10]: /es/real_user_monitoring/platform/connect_rum_and_traces/
[11]: /es/getting_started/synthetics/
[12]: /es/integrations/statsd/
[13]: https://www.chef.io/
[14]: https://www.ansible.com/
[15]: /es/serverless/configuration/#connect-telemetry-using-tags