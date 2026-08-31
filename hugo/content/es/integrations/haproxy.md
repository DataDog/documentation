---
app_id: haproxy
categories:
- log collection
custom_kind: integración
description: Monitoriza métricas clave de solicitudes, respuestas, errores, bytes
  servidos y more.
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics
  tag: blog
  text: Monitorización de las métricas de rendimiento HAProxy
- link: https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics
  tag: blog
  text: Cómo recopilar métricas de HAProxy
- link: https://www.datadoghq.com/blog/monitor-haproxy-with-datadog
  tag: blog
  text: Monitoriza HAProxy con Datadog
- link: https://docs.datadoghq.com/integrations/faq/haproxy-multi-process/
  tag: documentación
  text: HAProxy en modo de multiproceso
integration_version: 8.0.0
media: []
supported_os:
- linux
- windows
- macos
title: HAProxy
---
![Dashboard predefinido de HAProxy](https://raw.githubusercontent.com/DataDog/integrations-core/master/haproxy/images/haproxy-dash.png)

## Información general

Captura la actividad de HAProxy en Datadog para:

- Visualizar el rendimiento del balanceo de carga de HAProxy.
- Saber cuándo se detiene un servidor.
- Correlacionar el rendimiento de HAProxy con el del resto de tus aplicaciones.

## Configuración

Esta integración puede recopilar métricas desde un endpoint de Prometheus (recomendado) o desde una integración basada en socket a través del endpoint de estadísticas (obsoleto). El uso del endpoint de Prometheus requiere HAProxy versión 2 (versión para empresas 1.9rc1) o posterior.

Cuando se utiliza el endpoint de Prometheus, a partir de la versión 4.0.0, esta integración basada en OpenMetrics tiene un modo más reciente (`use_openmetrics`: true) y un modo heredado (`use_openmetrics`: false y `use_prometheus`: true). Para obtener todas las funciones más actualizadas, Datadog recomienda activar el modo más reciente. Para obtener más información, consulta [Versiones más reciente y heredada de integraciones basadas en OpenMetrics](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations).

Para utilizar la integración basada en socket, configura tanto `use_openmetrics` como `use_prometheus` como false y sigue las [instrucciones correspondientes](#using-the-stats-endpoint) en la sección de configuración.

La opción `use_openmetrics` utiliza el modo más reciente de [OpenMetrics](https://datadoghq.dev/integrations-core/base/openmetrics/), que requiere el Agent v7.35 o posterior o que [actives Python 3](https://docs.datadoghq.com/agent/guide/agent-v6-python-3/?tab=helm#use-python-3-with-datadog-agent-v6) en el Agent v6.35 o posterior para la recopilación de métricas. Para los hosts que no pueden utilizar Python 3 o están en el Agent v7.34 o anterior, utiliza el modo heredado de OpenMetrics o la [integración heredada basada en socket](#using-the-stats-endpoint).

Las métricas marcadas como `[OpenMetrics V1]` o `[OpenMetrics V2]` solo están disponibles utilizando el modo correspondiente de la integración de HAProxy. Las métricas marcadas como `[OpenMetrics V1 and V2]` son recopiladas por ambos modos.

### Instalación

El check de HAProxy está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tu servidor de HAProxy.

### Configuración

#### Uso de Prometheus

La forma recomendada de configurar esta integración es habilitando el endpoint de Prometheus en HAProxy. Este endpoint está integrado en HAProxy a partir de la versión 2 (versión empresarial 1.9rc1). Si utilizas una versión anterior, considera la posibilidad de configurar el [exportador de HAProxy Prometheus](https://github.com/prometheus/haproxy_exporter) o bien configura la integración heredada basada en socket que se describe en la siguiente sección.

Para utilizar el modo heredado de OpenMetrics en lugar del más reciente, cambia la opción `use_openmetrics` por `use_prometheus` y cambia la opción `openmetrics_endpoint` por `prometheus_url`. Para obtener más información, consulta la [documentación sobre la recopilación de métricas de Prometheus y OpenMetrics desde un host](https://docs.datadoghq.com/integrations/guide/prometheus-host-collection/).

#### Preparación de HAProxy

1. Configura tu `HAProxy.conf` utilizando la [guía oficial](https://www.haproxy.com/blog/haproxy-exposes-a-prometheus-metrics-endpoint/).
1. [Reinicia HAProxy para activar el endpoint de Prometheus](https://www.haproxy.org/download/1.7/doc/management.txt).

#### Configuración del Agent

{{< tabs >}}

{{% tab "Host" %}}

#### host

##### Recopilación de métricas

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `HAProxy.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus métricas de HAProxy. Consulta el [ejemplo haproxy.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

   ```yaml
   instances:

     ## @param use_openmetrics - boolean - optional - default: false
     ## Enable to preview the new version of the check which supports HAProxy version 2 or later
     ## or environments using the HAProxy exporter.
     ##
     ## OpenMetrics-related options take effect only when this is set to `true`. 
     ##
     ## Uses the latest OpenMetrics V2 implementation for more features and better performance.
     ## Note: To see the configuration options for the OpenMetrics V1 implementation (Agent v7.33 or earlier),
     ## https://github.com/DataDog/integrations-core/blob/7.33.x/haproxy/datadog_checks/haproxy/data/conf.yaml.example
     #
   - use_openmetrics: true  # Enables OpenMetrics V2

     ## @param openmetrics_endpoint - string - optional
     ## The URL exposing metrics in the OpenMetrics format.
     #
     openmetrics_endpoint: http://localhost:<PORT>/metrics
   ```

   Para ver las opciones de configuración de la implementación heredada, consulta el archivo [ejemplo haproxy.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/7.34.x/haproxy/datadog_checks/haproxy/data/conf.yaml.example) para el Agent v7.34 o anterior.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://app.datadoghq.com/account/settings/agent/latest) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                   |
|----------------------|-----------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `haproxy`                                                                               |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                           |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:<PORT>/metrics", "use_openmetrics": "true"}` |

##### Ejemplo de despliegue de Kubernetes

Añade anotaciones de pod en `.spec.template.metadata` para un despliegue:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: haproxy
spec:
  template:
    metadata:
      labels:
        name: haproxy
      annotations:
        ad.datadoghq.com/haproxy.check_names: '["haproxy"]'
        ad.datadoghq.com/haproxy.init_configs: '[{}]'
        ad.datadoghq.com/haproxy.instances: |
          [
            {
              "openmetrics_endpoint": "http://%%host%%:<PORT>/metrics", "use_openmetrics": "true"
            }
          ]
    spec:
      containers:
        - name: haproxy
```

{{% /tab %}}

{{< /tabs >}}

#### Uso del endpoint de estadísticas

Esta estrategia de configuración se proporciona como referencia para los usuarios de legacy. Si es la primera vez que configuras la integración, considera la posibilidad de utilizar la estrategia basada en Prometheus, descrita en la sección anterior.

El Agent recopila métricas utilizando un endpoint de estadísticas:

1. Configura uno en tu `haproxy.conf`:

   ```conf
     listen stats # Define a listen section called "stats"
     bind :9000 # Listen on localhost:9000
     mode http
     stats enable  # Enable stats page
     stats hide-version  # Hide HAProxy version
     stats realm Haproxy\ Statistics  # Title text for popup window
     stats uri /haproxy_stats  # Stats URI
     stats auth Username:Password  # Authentication credentials
   ```

1. [Reinicia HAProxy para activar el endpoint de estadísticas](https://www.haproxy.org/download/1.7/doc/management.txt).

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

Edita el archivo `HAProxy.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para comenzar a recopilar tus [métricas](#metric-collection) y [logs](#log-collection) de HAProxy. Consulta el [ejemplo haproxy.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

##### Recopilación de métricas

1. Añade este bloque de configuración a tu archivo `haproxy.d/conf.yaml` para empezar a recopilar tus [métricas de HAProxy](#metrics):

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Haproxy URL to connect to gather metrics.
     ## Set the according <USERNAME> and <PASSWORD> or use directly a unix stats
     ## or admin socket: unix:///var/run/haproxy.sock
     #
     - url: http://localhost/admin?stats
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

Por defecto, Haproxy envía logs sobre UDP al puerto 514. El Agent puede escuchar estos logs en este puerto, pero la vinculación a un número de puerto por debajo de 1024 requiere permisos elevados. Sigue las siguientes instrucciones para configurarlo. También puedes utilizar un puerto diferente y omitir el paso 3.

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `haproxy.d/conf.yaml` para empezar a recopilar tus logs de Haproxy:

   ```yaml
   logs:
     - type: udp
       port: 514
       service: <SERVICE_NAME>
       source: haproxy
   ```

   Cambia el valor del parámetro `service` y configúralo para tu entorno. Consulta el [ejemplo haproxy.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/haproxy/datadog_checks/haproxy/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. Concede acceso al puerto 514 utilizando el comando `setcap`:

   ```bash
   sudo setcap CAP_NET_BIND_SERVICE=+ep /opt/datadog-agent/bin/agent/agent
   ```

   Comprueba que la configuración sea correcta ejecutando el comando `getcap`:

   ```bash
   sudo getcap /opt/datadog-agent/bin/agent/agent
   ```

   Con el resultado esperado:

   ```bash
   /opt/datadog-agent/bin/agent/agent = cap_net_bind_service+ep
   ```

   **Nota:** Vuelve a ejecutar este comando `setcap` cada vez que actualices el Agent.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Docker" %}}

#### Docker

Para configurar este check para un Agent que se ejecuta en un contenedor:

##### Recopilación de métricas

Configura [Plantillas de integraciones de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas de Docker en tu contenedor de aplicaciones:

```yaml
LABEL "com.datadoghq.ad.check_names"='["haproxy"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"url": "https://%%host%%/admin?stats"}]'
```

##### Recopilación de logs

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent . Para activarla, consulta [Recopilación de logs de Docker](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation).

A continuación, configura [Integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas de Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"haproxy","service":"<SERVICE_NAME>"}]'
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

#### Kubernetes

Para configurar este check para un Agent que se ejecuta en Kubernetes:

##### Recopilación de métricas

Configura [Plantillas de integraciones de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes) como anotaciones de pod en tu contenedor de aplicaciones. Aparte de esto, las plantillas también se pueden configurar con [un archivo, un mapa de configuración o un almacén de valores clave](https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration).

**Anotaciones v1** (para el Datadog Agent v7.36 o anterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.check_names: '["haproxy"]'
    ad.datadoghq.com/haproxy.init_configs: '[{}]'
    ad.datadoghq.com/haproxy.instances: |
      [
        {
          "url": "https://%%host%%/admin?stats"
        }
      ]
spec:
  containers:
    - name: haproxy
```

**Anotaciones v2** (para el Datadog Agent v7.36 o posterior)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.checks: |
      {
        "haproxy": {
          "init_config": {},
          "instances": [
            {
              "url": "https://%%host%%/admin?stats"
            }
          ]
        }
      }
spec:
  containers:
    - name: haproxy
```

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup).

A continuación, configura [Integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como anotaciones del pod. Esto también se puede configurar con [un archivo, un mapa de configuración o un almacén de valores clave](https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration).

**Anotaciones v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: haproxy
  annotations:
    ad.datadoghq.com/haproxy.logs: '[{"source":"haproxy","service":"<SERVICE_NAME>"}]'
spec:
  containers:
    - name: haproxy
```

{{% /tab %}}

{{% tab "ECS" %}}

#### ECS

Para configurar este check para un Agent que se ejecuta en ECS:

##### Recopilación de métricas

Configura [Plantillas de integraciones de Autodiscovery](https://docs.datadoghq.com/agent/docker/integrations/?tab=docker) como etiquetas de Docker en tu contenedor de aplicaciones:

```json
{
  "containerDefinitions": [{
    "name": "haproxy",
    "image": "haproxy:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"haproxy\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"url\": \"https://%%host%%/admin?stats\"}]"
    }
  }]
}
```

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de ECS](https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux).

A continuación, configura [Integraciones de logs](https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations) como etiquetas de Docker:

```json
{
  "containerDefinitions": [{
    "name": "haproxy",
    "image": "haproxy:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"haproxy\",\"service\":\"<SERVICE_NAME>\"}]"
    }
  }]
}
```

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `HAProxy` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **haproxy.backend.active.servers** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de servidores activos.|
| **haproxy.backend.agg.check.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Gauge agregado del backend del estado de check de los servidores (desde >= 2.4).|
| **haproxy.backend.agg.server.check.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Gauge agregado del backend del estado de check de los servidores (obsoleto).|
| **haproxy.backend.agg.server.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Gauge agregado del backend del estado de los servidores (desde >= 2.4).|
| **haproxy.backend.backup.servers** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de servidores de copia de seguridad.|
| **haproxy.backend.bytes.in.count** <br>(count) | \[OpenMetrics V2\] Total actual de bytes entrantes. En forma predeterminada, enviado como count si se utiliza Prometheus.<br>_Se muestra como byte_ |
| **haproxy.backend.bytes.in.total** <br>(count) | \[OpenMetrics V1\] Total actual de bytes entrantes. En forma predeterminada, enviado como count si se utiliza Prometheus.<br>_Se muestra como byte_ |
| **haproxy.backend.bytes.in_rate** <br>(gauge) | \[Heredado\] Tasa de bytes en hosts del backend.<br>_Se muestra como byte_ |
| **haproxy.backend.bytes.out.count** <br>(count) | \[OpenMetrics V2\] Total actual de bytes salientes. En forma predeterminada, enviado como count si se utiliza Prometheus.<br>_Se muestra como byte_ |
| **haproxy.backend.bytes.out.total** <br>(count) | \[OpenMetrics V1\] Total actual de bytes salientes. En forma predeterminada, enviado como count si se utiliza Prometheus.<br>_Se muestra como byte_ |
| **haproxy.backend.bytes.out_rate** <br>(gauge) | \[Heredado\] Tasa de salida de bytes en hosts del backend.<br>_Se muestra como byte_ |
| **haproxy.backend.check.last.change.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de segundos transcurridos desde la última transición ARRIBA\<->ABAJO.|
| **haproxy.backend.check.up.down.count** <br>(count) | \[OpenMetrics V2\] Número total de transiciones ARRIBA->ABAJO.|
| **haproxy.backend.check.up.down.total** <br>(count) | \[OpenMetrics V1\] Número total de transiciones ARRIBA->ABAJO.|
| **haproxy.backend.client.aborts.count** <br>(count) | \[OpenMetrics V2\] Número total de transferencias de datos abortadas por el cliente.|
| **HAProxy.backend.client.aborts.total** <br>(count) | \[OpenMetrics V1\] Número total de transferencias de datos abortadas por el cliente.|
| **haproxy.backend.connect.time** <br>(gauge) | \[Heredado\] Tiempo medio de conexión en las últimas 1024 solictudes del backend.<br>_Se muestra en milisegundos_ |
| **haproxy.backend.connect.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo medio de conexión para las últimas 1024 connections (conexiones) con éxito.|
| **haproxy.backend.connection.attempts.count** <br>(count) | \[OpenMetrics V2\] Número total de intentos de establecimiento de connection (conexión).|
| **haproxy.backend.connection.attempts.total** <br>(count) | \[OpenMetrics V1\] Número total de intentos de establecimiento de connection (conexión).|
| **haproxy.backend.connection.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores de connection (conexión).|
| **haproxy.backend.connection.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores de  connection (conexión).|
| **haproxy.backend.connection.reuses.count** <br>(count) | \[OpenMetrics V2\] Número total de reutilizaciones de connection (conexión).|
| **haproxy.backend.connection.reuses.total** <br>(count) | \[OpenMetrics V1\] Número total de reutilizaciones de connection (conexión).|
| **haproxy.backend.count.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo total medio de las últimas 1024 connections (conexiones) con éxito.|
| **haproxy.backend.current.queue** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de solicitudes en cola.|
| **haproxy.backend.current.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de sesiones activas.|
| **haproxy.backend.denied.req_rate** <br>(gauge) | \[Heredado\] Número de solicitudes de backend denegadas por motivos de seguridad.<br>_Se muestra como solicitud_ |
| **haproxy.backend.denied.resp_rate** <br>(gauge) | \[Heredado\] Número de respuestas de backend denegadas por motivos de seguridad.<br>_Se muestra como respuesta_ |
| **haproxy.backend.downtime.seconds.count** <br>(count) | \[OpenMetrics V2\] Tiempo total de inactividad (en segundos) del servicio.|
| **haproxy.backend.downtime.seconds.total** <br>(count) | \[OpenMetrics V1\] Tiempo total de inactividad (en segundos) del servicio.|
| **haproxy.backend.errors.con_rate** <br>(gauge) | \[Heredado\] Tasa de solicitudes de backend que encontraron un error al intentar conectarse a un servidor de backend.<br>_Se muestra como error_ |
| **haproxy.backend.errors.resp_rate** <br>(gauge) | \[Heredado\] Tasa de respuestas de backend abortadas por error.<br>_Se muestra como error_ |
| **haproxy.backend.failed.header.rewriting.count** <br>(count) | \[OpenMetrics V2\] Número total de advertencias de reescritura de encabezado fallidas.|
| **haproxy.backend.failed.header.rewriting.total** <br>(count) | \[OpenMetrics V1\] Número total de avisos de reescritura de encabezado fallidos.|
| **haproxy.backend.http.cache.hits.count** <br>(count) | \[OpenMetrics V2\] Número total de visitas a la caché HTTP.|
| **haproxy.backend.http.cache.hits.total** <br>(count) | \[OpenMetrics V1\] Número total de accesos a la caché HTTP.|
| **haproxy.backend.http.cache.lookups.count** <br>(count) | \[OpenMetrics V2\] Número total de búsquedas en la caché HTTP.|
| **haproxy.backend.http.cache.lookups.total** <br>(count) | \[OpenMetrics V1\] Número total de búsquedas en la caché HTTP.|
| **haproxy.backend.http.comp.bytes.bypassed.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes que han eludido el compresor HTTP (límite de CPU/BW).<br>_Se muestra como byte_ |
| **haproxy.backend.http.comp.bytes.bypassed.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes que han eludido el compresor HTTP (límite de CPU/BW).<br>_Se muestra como byte_ |
| **haproxy.backend.http.comp.bytes.in.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes de respuesta HTTP enviados al compresor.<br>_Se muestra como byte_ |
| **haproxy.backend.http.comp.bytes.in.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes de respuesta HTTP enviados al compresor.<br>_Se muestra como byte_ |
| **haproxy.backend.http.comp.bytes.out.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes de respuesta HTTP emitidos por el compresor.<br>_Se muestra como byte_ |
| **haproxy.backend.http.comp.bytes.out.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes de respuesta HTTP emitidos por el compresor.<br>_Se muestra como byte_ |
| **haproxy.backend.http.comp.responses.count** <br>(count) | \[OpenMetrics V2\] Número total de respuestas HTTP comprimidas.|
| **haproxy.backend.http.comp.responses.total** <br>(count) | \[OpenMetrics V1\] Número total de respuestas HTTP comprimidas.|
| **haproxy.backend.http.requests.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes HTTP recibidas.|
| **haproxy.backend.http.requests.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes HTTP recibidas.|
| **haproxy.backend.http.responses.count** <br>(count) | \[OpenMetrics V2\] Número total de respuestas HTTP.|
| **haproxy.backend.http.responses.total** <br>(count) | \[OpenMetrics V1\] Número total de respuestas HTTP.|
| **haproxy.backend.internal.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores internos desde que se inició el proceso (desde >= 2.2).|
| **haproxy.backend.internal.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores internos desde que se inició el proceso (desde >= 2.2).|
| **haproxy.backend.last.session.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de segundos transcurridos desde la última sesión asignada al servidor/backend.|
| **haproxy.backend.limit.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Límite de sesión configurado.|
| **haproxy.backend.loadbalanced.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que se ha seleccionado un servicio, ya sea para nuevas sesiones o al redistribuir.|
| **haproxy.backend.loadbalanced.total** <br>(count) | \[OpenMetrics V1\] Número total de veces que se ha seleccionado un servicio, ya sea para nuevas sesiones o al redistribuir.|
| **haproxy.backend.max.connect.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo observado de espera para la finalización de una connection (conexión) |
| **haproxy.backend.max.count.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo total observado de solicitud+respuesta (solicitud+cola+conexión+respuesta+procesamiento)|
| **haproxy.backend.max.queue** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de solicitudes en cola.|
| **haproxy.backend.max.queue.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo observado de permanencia en cola|
| **haproxy.backend.max.response.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo observado de espera de una respuesta del servidor|
| **haproxy.backend.max.session.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de sesiones por segundo.|
| **haproxy.backend.max.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de sesiones activas.|
| **haproxy.backend.max.total.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo total observado de solicitud+respuesta (solicitud+cola+conexión+respuesta+procesamiento)|
| **haproxy.backend.queue.current** <br>(gauge) | \[Heredado\] Número de solicitudes de backend sin backend asignado.<br>_Se muestra como solicitud_ |
| **haproxy.backend.queue.time** <br>(gauge) | \[Heredado\] Tiempo medio en cola en las últimas 1024 solicitudes de backend.<br>_Se muestra en milisegundos_ |
| **haproxy.backend.queue.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo medio en cola para las últimas 1024 connections (conexiones) con éxito.|
| **haproxy.backend.redispatch.warnings.count** <br>(count) | \[OpenMetrics V2\] Número total de avisos de redistribución.|
| **haproxy.backend.redispatch.warnings.total** <br>(count) | \[OpenMetrics V1\] Número total de avisos de redistribución.|
| **haproxy.backend.requests.denied.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes denegadas.|
| **haproxy.backend.requests.denied.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes denegadas.|
| **haproxy.backend.requests.tot_rate** <br>(gauge) | \[Heredado\] Tasa del número total de solicitudes HTTP de backend.<br>_Se muestra como solicitud_ |
| **haproxy.backend.response.1xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de backend con código 1xx por segundo.<br>_Se muestra como respuesta_ |
| **haproxy.backend.response.2xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de backend con código 2xx por segundo.<br>_Se muestra como respuesta_ |
| **haproxy.backend.response.3xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de backend con código 3xx por segundo.<br>_Se muestra como respuesta_ |
| **haproxy.backend.response.4xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de backend con código 4xx por segundo.<br>_Se muestra como respuesta_ |
| **haproxy.backend.response.5xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de backend con código 5xx por segundo.<br>_Se muestra como respuesta_ |
| **haproxy.backend.response.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores de respuesta.|
| **haproxy.backend.response.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores de respuesta.|
| **haproxy.backend.response.other** <br>(gauge) | \[Heredado\] Respuestas HTTP de backend con otro código (error de protocolo).<br>_Se muestra como respuesta_ |
| **haproxy.backend.response.time** <br>(gauge) | \[Heredado\] Tiempo medio de respuesta en las últimas 1024 solicitudes de backend (0 para TCP).<br>_Se muestra en milisegundos_ |
| **haproxy.backend.response.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo medio de respuesta para las últimas 1024 connections (conexiones) con éxito.|
| **haproxy.backend.responses.denied.count** <br>(count) | \[OpenMetrics V2\] Número total de respuestas denegadas.|
| **haproxy.backend.responses.denied.total** <br>(count) | \[OpenMetrics V1\] Número total de respuestas denegadas.|
| **haproxy.backend.retry.warnings.count** <br>(count) | \[OpenMetrics V2\] Número total de avisos de reintento.|
| **haproxy.backend.retry.warnings.total** <br>(count) | \[OpenMetrics V1\] Número total de avisos de reintento.|
| **haproxy.backend.server.aborts.count** <br>(count) | \[OpenMetrics V2\] Número total de transferencias de datos abortadas por el servidor.|
| **haproxy.backend.server.aborts.total** <br>(count) | \[OpenMetrics V1\] Número total de transferencias de datos abortadas por el servidor.|
| **haproxy.backend.session.current** <br>(gauge) | \[Heredado\] Número de sesiones de backend activas.<br>_Se muestra como connection (conexión)_ |
| **haproxy.backend.session.limit** <br>(gauge) | \[Heredado\] Límite configurado de sesiones de backend.<br>_Se muestra como conexión_ |
| **haproxy.backend.session.pct** <br>(gauge) | \[Heredado\] Porcentaje de sesiones en uso (backend.session.current/backend.session.limit * 100).<br>_Se muestra como porcentaje_ |
| **haproxy.backend.session.rate** <br>(gauge) | \[Heredado\] Número de sesiones de backend creadas por segundo.<br>_Se muestra como connection (conexión)_ |
| **haproxy.backend.session.time** <br>(gauge) | \[Heredado\] Tiempo total medio de sesión en las últimas 1024 solicitudes.<br>_Se muestra en milisegundos_ |
| **haproxy.backend.sessions.count** <br>(count) | \[OpenMetrics V2\] Número total de sesiones.|
| **haproxy.backend.sessions.total** <br>(count) | \[OpenMetrics V1\] Número total de sesiones.|
| **haproxy.backend.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Estado actual del servicio. \<= 2.3: el valor gauge determines el estado (frontend: 0=STOP, 1=UP, 2=FULL - backend: 0=DOWN, 1=UP - servidor: 0=DOWN, 1=UP, 2=MAINT, 3=DRAIN, 4=NOLB). >= 2,4 por valor de etiqueta de estado.|
| **haproxy.backend.total.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo total medio de las últimas 1024 connections (conexiones) con éxito.|
| **haproxy.backend.uptime** <br>(gauge) | \[Heredado\] Número de segundos desde la última transición ARRIBA\<->ABAJO<br>_Se muestra como segundo_ |
| **haproxy.backend.uweight** <br>(gauge) | \[OpenMetrics V1 y V2\] Peso de usuario del servidor o suma de pesos de usuario de los servidores activos para un backend (>= 2.4).|
| **haproxy.backend.warnings.redis_rate** <br>(gauge) | \[Heredado\] Número de veces que una solicitud se redistriibuyó a otro servidor.<br>_Se muestra como error_ |
| **haproxy.backend.warnings.retr_rate** <br>(gauge) | \[Heredado\] Número de veces que se ha vuelto a intentar una connection (conexión) a un servidor.<br>_Se muestra como error_ |
| **haproxy.backend.weight** <br>(gauge) | \[OpenMetrics V1 y V2\] Peso del servicio.|
| **haproxy.backend_hosts** <br>(gauge) | \[Heredado\] Número de hosts de backend.<br>_Se muestra como host_ |
| **haproxy.count_per_status** <br>(gauge) | \[Heredado\] Número de hosts por estado (UP/DOWN/NOLB/MAINT).<br>_Se muestra como host_ |
| **haproxy.frontend.bytes.in.count** <br>(count) | \[OpenMetrics V2\] Total actual de bytes entrantes. En forma predeterminada, enviado como count si se utiliza Prometheus.<br>_Se muestra como byte_ |
| **haproxy.frontend.bytes.in.total** <br>(count) | \[OpenMetrics V1\] Total actual de bytes entrantes. En forma predeterminada, se envía como count si se utiliza Prometheus.<br>_Se muestra como byte_ |
| **haproxy.frontend.bytes.in_rate** <br>(gauge) | \[Heredado\] Tasa de bytes en hosts de frontend.<br>_Se muestra como byte_ |
| **haproxy.frontend.bytes.out.count** <br>(count) | \[OpenMetrics V2\] Total actual de bytes salientes. En forma predeterminada, enviado como count si se utiliza Prometheus.<br>_Se muestra como byte_ |
| **haproxy.frontend.bytes.out.total** <br>(count) | \[OpenMetrics V1\] Total actual de bytes salientes. En forma predeterminada, se envía como count si se utiliza Prometheus.<br>_Se muestra como byte_ |
| **haproxy.frontend.bytes.out_rate** <br>(gauge) | \[Heredado\] Tasa de salida de bytes en hosts de frontend.<br>_Se muestra como byte_ |
| **haproxy.frontend.connections.count** <br>(count) | \[OpenMetrics V2\] Número total de connections (conexiones).|
| **haproxy.frontend.connections.rate** <br>(gauge) | \[Heredado\] Número de connections (conexiones) por segundo.<br>_Se muestra como connection (conexión)_ |
| **haproxy.frontend.connections.rate.max** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de connections (conexiones) por segundo.|
| **haproxy.frontend.connections.tot_rate** <br>(gauge) | \[Heredado\] Tasa del número total de connections (conexiones) de frontend.<br>_Se muestra como connection (conexión)_ |
| **haproxy.frontend.connections.total** <br>(count) | \[OpenMetrics V1\] Número total de connections (conexiones).|
| **haproxy.frontend.current.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de sesiones activas.|
| **haproxy.frontend.denied.connections.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes denegadas por reglas de 'solicitud de connection (conexión) tcp'.|
| **haproxy.frontend.denied.connections.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes denegadas por reglas 'solicitud de connection (conexión) tcp'.|
| **haproxy.frontend.denied.req_rate** <br>(gauge) | \[Heredado\] Número de solicitudes de frontend denegadas por motivos de seguridad.<br>_Se muestra como solicitud_ |
| **haproxy.frontend.denied.resp_rate** <br>(gauge) | \[Heredado\] Número de respuestas de frontend denegadas por motivos de seguridad.<br>_Se muestra como respuesta_ |
| **haproxy.frontend.denied.sessions.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes denegadas por reglas de 'sesión de solicitud tcp'.|
| **haproxy.frontend.denied.sessions.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes denegadas por reglas de 'sesión de solicitud tcp'.|
| **haproxy.frontend.errors.req_rate** <br>(gauge) | \[Heredado\] Tasa de errores de solicitud de frontend.<br>_Se muestra como error_ |
| **haproxy.frontend.failed.header.rewriting.count** <br>(count) | \[OpenMetrics V2\] Número total de avisos de reescritura de encabezado fallidas.|
| **haproxy.frontend.failed.header.rewriting.total** <br>(count) | \[OpenMetrics V1\] Número total de avisos de reescritura de encabezado fallidos.|
| **haproxy.frontend.http.cache.hits.count** <br>(count) | \[OpenMetrics V2\] Número total de visitas a la caché HTTP.|
| **haproxy.frontend.http.cache.hits.total** <br>(count) | \[OpenMetrics V1\] Número total de accesos a la caché HTTP.|
| **haproxy.frontend.http.cache.lookups.count** <br>(count) | \[OpenMetrics V2\] Número total de búsquedas  en la caché HTTP.|
| **haproxy.frontend.http.cache.lookups.total** <br>(count) | \[OpenMetrics V1\] Número total de búsquedas en la caché HTTP.|
| **haproxy.frontend.http.comp.bytes.bypassed.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes que han eludido el compresor HTTP (límite de CPU/BW).<br>_Se muestra como byte_ |
| **haproxy.frontend.http.comp.bytes.bypassed.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes que han eludido el compresor HTTP (límite de CPU/BW).<br>_Se muestra como byte_ |
| **haproxy.frontend.http.comp.bytes.in.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes de respuesta HTTP enviados al compresor.<br>_Se muestra como byte_ |
| **haproxy.frontend.http.comp.bytes.in.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes de respuesta HTTP enviados al compresor.<br>_Se muestra como byte_ |
| **haproxy.frontend.http.comp.bytes.out.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes de respuesta HTTP emitidos por el compresor.<br>_Se muestra como byte_ |
| **haproxy.frontend.http.comp.bytes.out.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes de respuesta HTTP emitidos por el compresor.<br>_Se muestra como byte_ |
| **haproxy.frontend.http.comp.responses.count** <br>(count) | \[OpenMetrics V2\] Número total de respuestas HTTP comprimidas.|
| **haproxy.frontend.http.comp.responses.total** <br>(count) | \[OpenMetrics V1\] Número total de respuestas HTTP comprimidas.|
| **haproxy.frontend.http.requests.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes HTTP recibidas.|
| **haproxy.frontend.http.requests.rate.max** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de solicitudes HTTP por segundo.|
| **haproxy.frontend.http.requests.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes HTTP recibidas.|
| **haproxy.frontend.http.responses.count** <br>(count) | \[OpenMetrics V2\] Número total de respuestas HTTP.|
| **haproxy.frontend.http.responses.total** <br>(count) | \[OpenMetrics V1\] Número total de respuestas HTTP.|
| **haproxy.frontend.intercepted.requests.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes HTTP interceptadas.|
| **haproxy.frontend.intercepted.requests.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes HTTP interceptadas.|
| **haproxy.frontend.internal.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores internos desde que se inició el proceso (desde >= 2.2).|
| **haproxy.frontend.internal.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores internos desde que se inició el proceso (desde >= 2.2).|
| **haproxy.frontend.limit.session.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Límite configurado de nuevas sesiones por segundo.|
| **haproxy.frontend.limit.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Límite configurado de sesiones.|
| **haproxy.frontend.max.session.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de sesiones por segundo.|
| **haproxy.frontend.max.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de sesiones activas.|
| **haproxy.frontend.request.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores de solicitud.|
| **haproxy.frontend.request.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores de solicitud.|
| **haproxy.frontend.requests.denied.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes denegadas.|
| **haproxy.frontend.requests.denied.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes denegadas.|
| **haproxy.frontend.requests.intercepted** <br>(gauge) | \[Heredado\] Número de solicitudes de frontend interceptadas por segundo.<br>_Se muestra como solicitud_ |
| **haproxy.frontend.requests.rate** <br>(gauge) | \[Heredado\] Número de solicitudes HTTP de frontend por segundo.<br>_Se muestra como solicitud_ |
| **haproxy.frontend.requests.tot_rate** <br>(gauge) | \[Heredado\] Tasa del número total de solicitudes HTTP del frontend.<br>_Se muestra como solicitud_ |
| **haproxy.frontend.response.1xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de frontend con código 1xx.<br>_Se muestra como respuesta_ |
| **haproxy.frontend.response.2xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de frontend con código 2xx.<br>_Se muestra como respuesta_ |
| **haproxy.frontend.response.3xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de frontend con código 3xx.<br>_Se muestra como respuesta_ |
| **haproxy.frontend.response.4xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de frontend con código 4xx.<br>_Se muestra como respuesta_ |
| **haproxy.frontend.response.5xx** <br>(gauge) | \[Heredado\] Respuestas HTTP de frontend con código 5xx.<br>_Se muestra como respuesta_ |
| **haproxy.frontend.response.other** <br>(gauge) | \[Heredado\] Respuestas HTTP de frontend con otro código (error de protocolo).<br>_Se muestra como respuesta_ |
| **haproxy.frontend.responses.denied.count** <br>(count) | \[OpenMetrics V2\] Número total de respuestas denegadas.|
| **haproxy.frontend.responses.denied.total** <br>(count) | \[OpenMetrics V1\] Número total de respuestas denegadas.|
| **haproxy.frontend.session.current** <br>(gauge) | \[Heredado\] Número de sesiones de frontend activas.<br>_Se muestra como connection (conexión)_ |
| **haproxy.frontend.session.limit** <br>(gauge) | \[Heredado\] Límite configurado de sesiones de frontend.<br>_Se muestra como connection (conexión)_ |
| **haproxy.frontend.session.pct** <br>(gauge) | \[Heredado\] Porcentaje de sesiones en uso (frontend.session.current/frontend.session.limit * 100.<br>_Se muestra como porcentaje_ |
| **haproxy.frontend.session.rate** <br>(gauge) | \[Heredado\] Número de sesiones de frontend creadas por segundo.<br>_Se muestra como connection (conexión)_ |
| **haproxy.frontend.sessions.count** <br>(count) | \[OpenMetrics V2\] Número total de sesiones.|
| **haproxy.frontend.sessions.total** <br>(count) | \[OpenMetrics V1\] Número total de sesiones.|
| **haproxy.frontend.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Estado actual del servicio. \<= 2.3: valor gauge determina el estado (frontend: 0=STOP, 1=UP, 2=FULL - backend: 0=DOWN, 1=UP - servidor: 0=DOWN, 1=UP, 2=MAINT, 3=DRAIN, 4=NOLB). >= 2,4 por valor de etiqueta de estado.|
| **haproxy.listener.bytes.in.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes de solicitud desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.bytes.in.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes de solicitud desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.bytes.out.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes de respuesta desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.bytes.out.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes de respuesta desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.current.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de sesiones actuales en el frontend, backend o servidor (>= 2.4).|
| **haproxy.listener.denied.connections.count** <br>(count) | \[OpenMetrics V2\] Número total de connections (conexiones) entrantes bloqueadas en un oyente/frontend por una regla de connection (conexión) de solicitud tcp desde que se inició el proceso worker (>= 2.4).|
| **haproxy.listener.denied.connections.total** <br>(count) | \[OpenMetrics V1\] Número total de connections (conexiones) entrantes bloqueadas en un oyente/frontend por una regla de connection (conexión) de solicitud tcp desde que se inició el proceso worker (>= 2.4).|
| **haproxy.listener.denied.sessions.count** <br>(count) | \[OpenMetrics V2\] Número total de sesiones entrantes bloqueadas en un oyente/frontend por una regla de connection (conexión) de solicitud tcp desde que se inició el proceso worker.|
| **haproxy.listener.denied.sessions.total** <br>(count) | \[OpenMetrics V1\] Número total de sesiones entrantes bloqueadas en un oyente/frontend por una regla de connection (conexión) de solicitud tcp desde que se inició el proceso worker.|
| **haproxy.listener.failed.header.rewriting.count** <br>(count) | \[OpenMetrics V2\] Número total de reescrituras de encabezado HTTP fallidas desde que se inició el proceso worker (>= 2.4).|
| **haproxy.listener.failed.header.rewriting.total** <br>(count) | \[OpenMetrics V1\] Número total de reescrituras de encabezado HTTP fallidas desde que se inició el proceso worker (>= 2.4).|
| **haproxy.listener.internal.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores internos desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.internal.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores internos desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.limit.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Connection (conexión) máxima de frontend/oyente/servidor, connection (conexión) total de backend (>= 2.4).|
| **haproxy.listener.max.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Valor más alto de sesiones actuales encontradas desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.request.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes inválidas desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.request.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes inválidas desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.requests.denied.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes denegadas desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.requests.denied.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes denegadas desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.responses.denied.count** <br>(count) | \[OpenMetrics V2\] Número total de respuestas denegadas desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.responses.denied.total** <br>(count) | \[OpenMetrics V1\] Número total de respuestas denegadas desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.sessions.count** <br>(count) | \[OpenMetrics V2\] Número total de sesiones desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.sessions.total** <br>(count) | \[OpenMetrics V1\] Número total de sesiones desde que se inició el proceso (>= 2.4).|
| **haproxy.listener.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Estado actual del servicio, por valor de etiqueta de estado (>= 2.4).|
| **haproxy.process.active.peers** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de pares activos.|
| **haproxy.process.build_info** <br>(gauge) | \[OpenMetrics V1 y V2] Información de compilación.|
| **haproxy.process.busy.polling.enabled** <br>(gauge) | \[OpenMetrics V1 and V2\] No es cero si el sondeo de ocupado está activado.|
| **haproxy.process.bytes.out.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes emitidos por el proceso worker actual desde que se inició (>= 2.3).|
| **haproxy.process.bytes.out.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de bytes emitidos por el proceso worker actual en el último segundo (>= 2.3).|
| **haproxy.process.bytes.out.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes emitidos por el proceso worker actual desde que se inició (>= 2.3).|
| **haproxy.process.connected.peers** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de pares conectados.|
| **haproxy.process.connections.count** <br>(count) | \[OpenMetrics V2\] Número total de sesiones creadas.|
| **haproxy.process.connections.total** <br>(count) | \[OpenMetrics V1\] Número total de sesiones creadas.|
| **haproxy.process.current.backend.ssl.key.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Cálculo actual de claves SSL de backend por segundo durante el último segundo transcurrido.|
| **haproxy.process.current.connection.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de connections (conexiones) por segundo durante el último segundo transcurrido.|
| **haproxy.process.current.connections** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de sesiones activas.|
| **haproxy.process.current.frontend.ssl.key.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Cálculo actual de la clave SSL del frontend por segundo durante el último segundo transcurrido.|
| **haproxy.process.current.run.queue** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de tareas en la cola de ejecución.|
| **haproxy.process.current.session.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de sesiones por segundo durante el último segundo transcurrido.|
| **haproxy.process.current.ssl.connections** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de connections (conexiones) SSL abiertas.|
| **haproxy.process.current.ssl.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de sesiones SSL por segundo en el último segundo transcurrido.|
| **haproxy.process.current.tasks** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de tareas.|
| **haproxy.process.current.zlib.memory** <br>(gauge) | \[OpenMetrics V1 y V2\] Memoria actual utilizada para zlib en bytes (zlib ya no es el predeterminado desde >= 2.4).|
| **haproxy.process.dropped.logs.count** <br>(count) | \[OpenMetrics V2\] Número total de logs perdidos.|
| **haproxy.process.dropped.logs.total** <br>(count) | \[OpenMetrics V1\] Número total de logs perdidos.|
| **haproxy.process.failed.resolutions** <br>(count) | \[OpenMetrics V1\] Número total de resoluciones DNS fallidas en el proceso worker actual desde que se inició (>= 2.3).|
| **haproxy.process.failed.resolutions.count** <br>(count) | \[OpenMetrics V2\] Número total de resoluciones DNS fallidas en el proceso worker actual desde que se inició (>= 2.3).|
| **haproxy.process.frontend.ssl.reuse** <br>(gauge) | \[OpenMetrics V1 y V2\] Relación de reutilización de sesiones SSL (porcentaje).|
| **haproxy.process.hard.max.connections** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo inicial de connections (conexiones) concurrentes.|
| **haproxy.process.http.comp.bytes.in.count** <br>(count) | \[OpenMetrics V2\] Número de bytes por segundo en el último segundo transcurrido, antes de la compresión http.<br>_Se muestra como byte_ |
| **haproxy.process.http.comp.bytes.in.total** <br>(count) | \[OpenMetrics V1\] Número de bytes por segundo en el último segundo transcurrido, antes de la compresión http.<br>_Se muestra como byte_ |
| **haproxy.process.http.comp.bytes.out.count** <br>(count) | \[OpenMetrics V2\] Número de bytes por segundo en el último segundo transcurrido, después de la compresión http.<br>_Se muestra  como byte_ |
| **haproxy.process.http.comp.bytes.out.total** <br>(count) | \[OpenMetrics V1\] Número de bytes por segundo en el último segundo transcurrido, tras la compresión http.<br>_Se muestra como byte_ |
| **haproxy.process.idle.time.percent** <br>(gauge) | \[OpenMetrics V1 y V2\] Relación entre inactividad y total en la última muestra (porcentaje).|
| **haproxy.process.jobs** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de trabajos activos (oyentes, sesiones, dispositivos abiertos).|
| **haproxy.process.limit.connection.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo configurado de connections (conexiones) por segundo.|
| **haproxy.process.limit.http.comp** <br>(gauge) | \[OpenMetrics V1 y V2\] Tasa de compresión de entrada máxima configurada en bytes.|
| **haproxy.process.limit.session.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo configurado de sesiones por segundo.|
| **haproxy.process.limit.ssl.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo configurado de sesiones SSL por segundo.|
| **haproxy.process.listeners** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de oyentes activos.|
| **haproxy.process.max.backend.ssl.key.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Cálculo máximo observado de claves SSL de backend por segundo.|
| **haproxy.process.max.connection.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de connections (conexiones) por segundo.|
| **haproxy.process.max.connections** <br>(gauge) | \[OpenMetrics V1 and V2\] Número máximo de connections (conexiones) simultáneas.|
| **haproxy.process.max.fds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de descriptores de archivo abiertos; 0=no configurado.|
| **haproxy.process.max.frontend.ssl.key.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Cálculo máximo observado de claves SSL de frontend por segundo.|
| **haproxy.process.max.memory.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Límite de memoria por proceso (en bytes); 0=sin configurar.|
| **haproxy.process.max.pipes** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo configurado de pipelines.|
| **haproxy.process.max.session.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de sesiones por segundo.|
| **haproxy.process.max.sockets** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de sockets abiertos.|
| **haproxy.process.max.ssl.connections** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo configurado de  connections (conexiones) SSL simultáneas.|
| **haproxy.process.max.ssl.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de sesiones SSL por segundo.|
| **haproxy.process.max.zlib.memory** <br>(gauge) | \[OpenMetrics V1 y V2\] Cantidad máxima configurada de memoria para zlib en bytes (zlib ya no es la predeterminada desde >= 2.4).|
| **haproxy.process.nbproc** <br>(gauge) | \[OpenMetrics V1 y V2\] Número configurado de procesos.|
| **haproxy.process.nbthread** <br>(gauge) | \[OpenMetrics V1 y V2\] Número configurado de subprocesos.|
| **haproxy.process.pipes.free.count** <br>(count) | \[OpenMetrics V2\] Número de pipes sin usar.|
| **haproxy.process.pipes.free.total** <br>(count) | \[OpenMetrics V1\] Número de pipes sin usar.|
| **haproxy.process.pipes.used.count** <br>(count) | \[OpenMetrics V2\] Número de pipes sin usar.|
| **haproxy.process.pipes.used.total** <br>(count) | \[OpenMetrics V1\] Número de pipes sin usar.|
| **haproxy.process.pool.allocated.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Cantidad total de memoria asignada en pools (en bytes).|
| **haproxy.process.pool.failures.count** <br>(count) | \[OpenMetrics V2\] Número total de asignaciones de pools fallidas.|
| **haproxy.process.pool.failures.total** <br>(count) | \[OpenMetrics V1\] Número total de asignaciones de pools fallidas.|
| **haproxy.process.pool.used.bytes** <br>(gauge) | \[OpenMetrics V1 y V2\] Cantidad total de memoria utilizada en pools (en bytes).|
| **haproxy.process.recv.logs.count** <br>(count) | \[OpenMetrics V2\] Número total de mensajes de logs recibidos por oyentes que reenvían logs en este proceso de worker desde que se inició (>= 2.4).|
| **haproxy.process.recv.logs.total** <br>(count) | \[OpenMetrics V1\] Número total de mensajes de logs recibidos por oyentes que reenvían logs en este proceso de worker desde que se inició (>= 2.4).|
| **haproxy.process.relative.process.id** <br>(gauge) | \[OpenMetrics V1 y V2\] ID de proceso relativo, empezando por 1.|
| **haproxy.process.requests.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes (TCP o HTTP).|
| **haproxy.process.requests.total** <br>(count) | \[OpenMetrics V1\] Número total de solicitudes (TCP o HTTP).|
| **haproxy.process.spliced.bytes.out.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes emitidos por el proceso de worker actual a través de un pipe del kernel desde que se inició (>= 2.3).|
| **haproxy.process.spliced.bytes.out.total** <br>(count) | \[OpenMetrics V1\] Número total de bytes emitidos por el proceso de worker actual a través de un pipe del kernel desde que se inició (>= 2.3).|
| **haproxy.process.ssl.cache.lookups.count** <br>(count) | \[OpenMetrics V2\] Número total de búsquedas en la caché de sesión SSL.|
| **haproxy.process.ssl.cache.lookups.total** <br>(count) | \[OpenMetrics V1\]  Número total de búsquedas en la caché de sesión SSL.|
| **haproxy.process.ssl.cache.misses.count** <br>(count) | \[OpenMetrics V2\] Número total de pérdidas de caché de sesión SSL.|
| **haproxy.process.ssl.cache.misses.total** <br>(count) | \[OpenMetrics V1\] Número total de pérdidas de caché de sesión SSL.|
| **haproxy.process.ssl.connections.count** <br>(count) | \[OpenMetrics V2\] Número total de connections (conexiones) SSL abiertas.|
| **haproxy.process.ssl.connections.total** <br>(count) | \[OpenMetrics V1\] Número total de connections (conexiones) SSL abiertas.|
| **haproxy.process.start.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Hora de inicio en segundos.|
| **haproxy.process.stopping** <br>(gauge) | \[OpenMetrics V1 y V2\] No cero significa parada en curso.|
| **haproxy.process.unstoppable.jobs** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de trabajos activos que no pueden detenerse durante una parada suave.|
| **haproxy.process.uptime.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Cuánto tiempo hace que se inició este proceso de worker (>= 2.4).|
| **haproxy.server.bytes.in.count** <br>(count) | \[OpenMetrics V2\] Total actual de bytes entrantes.<br>_Se muestra como byte_ |
| **haproxy.server.bytes.in.total** <br>(count) | \[OpenMetrics V1\] Total actual de bytes entrantes.<br>_Se muestra como byte_ |
| **haproxy.server.bytes.out.count** <br>(count) | \[OpenMetrics V2\] Total actual de bytes salientes.<br>_Se muestra como byte_ |
| **haproxy.server.bytes.out.total** <br>(count) | \[OpenMetrics V1\] Total actual de bytes salientes.<br>_Se muestra como byte_ |
| **haproxy.server.check.code** <br>(gauge) | \[OpenMetrics V1 y V2\] código de capa 5-7, si está disponible del último check de estado. (>= 2.0)|
| **haproxy.server.check.duration.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Duración del check de estado ejecutado anteriormente (>= 2.0)<br>_Se muestra como segundo_ |
| **haproxy.server.check.failures.count** <br>(count) | \[OpenMetrics V2\] Número total de checks fallidas (Solo cuenta las checks fallidas cuando el servidor está encendido).|
| **haproxy.server.check.failures.total** <br>(count) | \[OpenMetrics V1\] Número total de checks fallidas (Solo cuenta las checks fallidas cuando el servidor está encendido).|
| **haproxy.server.check.last.change.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de segundos transcurridos desde la última transición ARRIBA\<->ABAJO. (>= 2.0)<br>_Se muestra como segundo_ |
| **haproxy.server.check.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Estado del último check de mantenimiento, si está activado.. \<= 2.3 HCHK_STATUS\_\* valores en  el documento de HAProxy. >= 2.4 por valor de etiqueta de estado.|
| **haproxy.server.check.up.down.count** <br>(count) | \[OpenMetrics V2\] Número total de transiciones ARRIBA->ABAJO.|
| **haproxy.server.check.up.down.total** <br>(count) | \[OpenMetrics V1\] Número total de transiciones ARRIBA->ABAJO.|
| **haproxy.server.client.aborts.count** <br>(count) | \[OpenMetrics V2\] Número total de transferencias de datos abortadas por el cliente.|
| **haproxy.server.client.aborts.total** <br>(count) | \[OpenMetrics V1\] Número total de transferencias de datos abortadas por el cliente.|
| **haproxy.server.connect.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo medio de connection (conexión) de las últimas 1024 connections (conexiones) con éxito.|
| **haproxy.server.connection.attempts.count** <br>(count) | \[OpenMetrics V2\] Número total de intentos de establecimiento de connection (conexión).|
| **haproxy.server.connection.attempts.total** <br>(count) | \[OpenMetrics V1\] Número total de intentos de establecimiento de connection (conexión).|
| **haproxy.server.connection.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores de connection (conexión).|
| **haproxy.server.connection.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores de connection (conexión).|
| **haproxy.server.connection.reuses.count** <br>(count) | \[OpenMetrics V2\] Número total de reutilizaciones de connection (conexión).|
| **haproxy.server.connection.reuses.total** <br>(count) | \[OpenMetrics V1\] Número total de reutilizaciones de connection (conexión).|
| **haproxy.server.current.queue** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de solicitudes en cola.|
| **haproxy.server.current.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de sesiones activas.|
| **haproxy.server.current.throttle** <br>(gauge) | \[OpenMetrics V1 y V2\] Porcentaje de limitación actual para el servidor, cuando el inicio lento está activo o ningún valor si no está en inicio lento.|
| **haproxy.server.downtime.seconds.count** <br>(count) | \[OpenMetrics V2\] Tiempo total de inactividad (en segundos) del servicio.|
| **haproxy.server.downtime.seconds.total** <br>(count) | \[OpenMetrics V1\] Tiempo total de inactividad (en segundos) del servicio.|
| **haproxy.server.failed.header.rewriting.count** <br>(count) | \[OpenMetrics V2\] Número total de avisos de reescritura de encabezado fallidas.|
| **haproxy.server.failed.header.rewriting.total** <br>(count) | \[OpenMetrics V1\] Número total de avisos de reescritura de encabezado fallidos.|
| **haproxy.server.http.responses.count** <br>(count) | \[OpenMetrics V2\] Número total de respuestas HTTP.|
| **haproxy.server.http.responses.total** <br>(count) | \[OpenMetrics V1\] Número total de respuestas HTTP.|
| **haproxy.server.idle.connections.current** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de connections (conexiones) inactivas disponibles para su reutilización.|
| **haproxy.server.idle.connections.limit** <br>(gauge) | \[OpenMetrics V1 y V2\] Límite en el número de conexiones inactivas disponibles.|
| **haproxy.server.internal.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores internos desde que se inició el proceso (desde >= 2.2).|
| **haproxy.server.internal.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores internos desde que se inició el proceso (desde >= 2.2).|
| **haproxy.server.last.session.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de segundos transcurridos desde la última sesión asignada al servidor/backend.|
| **haproxy.server.limit.sessions** <br>(gauge) | \ [OpenMetrics V1 y V2\] Límite de sesión configurado.|
| **haproxy.server.loadbalanced.count** <br>(count) | \[OpenMetrics V2\] Número total de veces que se ha seleccionado un servicio, ya sea para nuevas sesiones o al redistribuir.|
| **haproxy.server.loadbalanced.total** <br>(count) | \[OpenMetrics V1\] Número total de veces que se ha seleccionado un servicio, ya sea para nuevas sesiones o al redistribuir.|
| **haproxy.server.max.connect.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo observado de espera para la finalización de una connection (conexión) |
| **haproxy.server.max.count.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo total observado de solicitud+respuesta (solicitud+cola+connection(conexión)+respuesta+procesamiento)|
| **haproxy.server.max.queue** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de solicitudes en cola.|
| **haproxy.server.max.queue.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo observado de permanencia en cola|
| **haproxy.server.max.response.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo observado de espera de una respuesta del servidor|
| **haproxy.server.max.session.rate** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de sesiones por segundo.|
| **haproxy.server.max.sessions** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo observado de sesiones activas.|
| **haproxy.server.max.total.time.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo máximo total observado de solicitud+respuesta (solicitud+cola+connect+respuesta+procesamiento)|
| **haproxy.server.need.connections.current** <br>(gauge) | \[OpenMetrics V1 y V2\] Número estimado de connections (conexiones) necesarias (>= 2.3).|
| **haproxy.server.queue.limit** <br>(gauge) | \[OpenMetrics V1 y V2\] Cola máxima configurada para el servidor (0 significa sin límite).|
| **haproxy.server.queue.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo medio de espera para las últimas 1024 connections (conexiones) con éxito.|
| **haproxy.server.redispatch.warnings.count** <br>(count) | \[OpenMetrics V2\] Número total de avisos de redistribución.|
| **haproxy.server.redispatch.warnings.total** <br>(count) | \[OpenMetrics V1\] Número total de avisos de redistribución.|
| **haproxy.server.response.errors.count** <br>(count) | \[OpenMetrics V2\] Número total de errores de respuesta.|
| **haproxy.server.response.errors.total** <br>(count) | \[OpenMetrics V1\] Número total de errores de respuesta.|
| **haproxy.server.response.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo medio de respuesta para las últimas 1024 conexiones con éxito.|
| **haproxy.server.responses.denied.count** <br>(count) | \[OpenMetrics V2\] Número total de respuestas denegadas.|
| **haproxy.server.responses.denied.total** <br>(count) | \[OpenMetrics V1\] Número total de respuestas denegadas.|
| **haproxy.server.retry.warnings.count** <br>(count) | \[OpenMetrics V2\] Número total de avisos de reintento.|
| **haproxy.server.retry.warnings.total** <br>(count) | \[OpenMetrics V1\] Número total de avisos de reintento.|
| **haproxy.server.safe.idle.connections.current** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de conexiones inactivas seguras (>= 2.3).|
| **haproxy.server.server.aborts.count** <br>(count) | \[OpenMetrics V2\] Número total de transferencias de datos abortadas por el servidor.|
| **haproxy.server.server.aborts.total** <br>(count) | \[OpenMetrics V1\] Número total de transferencias de datos abortadas por el servidor.|
| **haproxy.server.server.idle.connections.current** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de conexiones inactivas disponibles para su reutilización.|
| **haproxy.server.server.idle.connections.limit** <br>(gauge) | \[OpenMetrics V1 y V2\] Límite en el número de conexiones inactivas disponibles.|
| **haproxy.server.sessions.count** <br>(count) | \[OpenMetrics V2\] Número total de sesiones.|
| **haproxy.server.sessions.total** <br>(count) | \[OpenMetrics V1\] Número total de sesiones.|
| **haproxy.server.status** <br>(gauge) | \[OpenMetrics V1 y V2\] Estado actual del servicio. \<= 2.3: el valor gauge determina el estado (frontend: 0=STOP, 1=UP, 2=FULL - backend: 0=DOWN, 1=UP - servidorr: 0=DOWN, 1=UP, 2=MAINT, 3=DRAIN, 4=NOLB). >= 2,4 por valor de etiqueta de estado.|
| **haproxy.server.total.time.average.seconds** <br>(gauge) | \[OpenMetrics V1 y V2\] Tiempo total medio de las últimas 1024 conexiones con éxito.|
| **haproxy.server.unsafe.idle.connections.current** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de conexiones inactivas inseguras (>= 2.3).|
| **haproxy.server.used.connections.current** <br>(gauge) | \[OpenMetrics V1 y V2\] Número actual de conexiones en uso (>= 2.3).|
| **haproxy.server.uweight** <br>(gauge) | \[OpenMetrics V1 y V2\] Peso de usuario del servidor o suma de pesos de usuario de los servidores activos para un backend (>= 2.4).|
| **haproxy.server.weight** <br>(gauge) | \[OpenMetrics V1 y V2\] Peso del servicio.|
| **haproxy.sticktable.size** <br>(gauge) | \[OpenMetrics V1 y V2\] Número máximo de elementos que puede contener la tabla (\<= 2,3 a través de un socket Unix, >= 2.4 a través de Prometheus).|
| **haproxy.sticktable.used** <br>(gauge) | \[OpenMetrics V1 y V2\] Número de elementos de la tabla (\<= 2,3 a través de un socket Unix socket, >= 2,4 a través de Prometheus).|

### Eventos

El check de HAProxy no incluye eventos.

### Checks de servicio

**haproxy.backend_up**

Convierte la page (página) del estado de HAProxy en checks de servicio. Devuelve `CRITICAL` para un servicio dado si HAProxy lo está informando `down`. `maint`, `ok` y cualquier otro estado tendrá como resultado `OK`.

_Estados: ok, crítico, desconocido_

**haproxy.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

### Error que indica que el puerto 514 ya se encuentra en uso

En sistemas con syslog, si el Agent está escuchando los logs de HAProxy en el puerto 514, puede aparecer el siguiente error en los logs del Agent:
`Can't start UDP forwarder on port 514: listen udp :514: bind: address already in use`.

Esto ocurre porque, en forma predeterminada, syslog está escuchando en el puerto 514. Para resolver este error, se puede desactivar syslog o configurar HAProxy para que reenvíe los logs al puerto 514 y a otro puerto en el que el Agent esté escuchando los logs. El puerto en el que escucha el Agent puede definirse en el archivo haproxy.d/conf.yaml [aquí](https://github.com/DataDog/integrations-core/blob/0e34b3309cc1371095762bfcaf121b0b45a4e263/haproxy/datadog_checks/haproxy/data/conf.yaml.example#L631).

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorización de las métricas de rendimiento de HAProxy ](https://www.datadoghq.com/blog/monitoring-haproxy-performance-metrics)
- [Cómo recopilar las métricas de HAProxy ](https://www.datadoghq.com/blog/how-to-collect-haproxy-metrics)
- [Monitoriza HAProxy con Datadog](https://www.datadoghq.com/blog/monitor-haproxy-with-datadog)
- [Configuración multiproceso de HAProxy](https://docs.datadoghq.com/integrations/faq/haproxy-multi-process/)