---
app_id: kong
categories:
- log collection
custom_kind: integración
description: Realiza un seguimiento del total de solicitudes, códigos de respuesta,
  conexiones de clientes, etc.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-kong-datadog
  tag: blog
  text: Monitorizar Kong con nuestra nueva integración Datadog
integration_version: 6.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Kong
---
## Información general

El check de Kong del Agent realiza un rastreo del total de solicitudes, códigos de respuesta, conexiones de clientes, etc.

También puedes utilizar el [complemento Datadog](https://docs.konghq.com/hub/kong-inc/datadog/) de Kong para enviar métricas de API, conexión y base de datos a Datadog a través del Datadog Agent utilizando [DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/). Para obtener más información, lee la entrada del blog [Monitorizar Kong con la integración Datadog](https://www.datadoghq.com/blog/monitor-kong-datadog).

## Configuración

### Instalación

El check de Kong está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores Kong.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Asegúrate de que las métricas de OpenMetrics están expuestas en tu servicio Kong [activando el complemento Prometheus](https://docs.konghq.com/hub/kong-inc/prometheus/).. Esto debe configurarse antes de que el Agent pueda recopilar métricas de Kong. 

1. Añade este bloque de configuración a tu archivo `kong.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para empezar a recopilar tus [métricas Kong](#metrics). Consulta el [ejemplo de kong.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kong/datadog_checks/kong/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles:

   ```yaml
   init_config:

   instances:
     ## @param openmetrics_endpoint - string - required
     ## The URL exposing metrics in the OpenMetrics format.
     #
     - openmetrics_endpoint: http://localhost:8001/metrics
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Nota**: La versión actual del check (1.17.0 o posterior) utiliza [OpenMetrics](https://docs.datadoghq.com/integrations/openmetrics/) para la recopilación de métricas, que requiere Python 3. Para hosts que no pueden utilizar Python 3, o para utilizar una versión legacy de este check, consulta la siguiente [configuración](https://github.com/DataDog/integrations-core/blob/7.27.x/kong/datadog_checks/kong/data/conf.yaml.example).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

Los logs de acceso de Kong son generados por NGINX, por lo que la localización por defecto es la misma que la de los archivos de NGINX.

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `kong.d/conf.yaml` para empezar a recopilar tus logs de Kong:

   ```yaml
   logs:
     - type: file
       path: /var/log/nginx/access.log
       service: '<SERVICE>'
       source: kong

     - type: file
       path: /var/log/nginx/error.log
       service: '<SERVICE>'
       source: kong
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [ejemplo de kong.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/kong/datadog_checks/kong/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Contenedorizado" %}}

#### En contenedores

Asegúrate de que las métricas de OpenMetrics están expuestas en tu servicio de Kong [habilitando el complemento de Prometheus](https://docs.konghq.com/hub/kong-inc/prometheus/). Esto debe configurarse antes de que el Agent pueda recopilar métricas de Kong. 
Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                 |
| -------------------- | ----------------------------------------------------- |
| `<INTEGRATION_NAME>` | `kong`                                                |
| `<INIT_CONFIG>`      | en blanco o `{}`                                         |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint": "http://%%host%%:8001/metrics"}` |

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta la [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "kong", "service": "<SERVICE_NAME>"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent] (https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `kong` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **kong.bandwidth.bytes.count** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Ancho de banda total en bytes consumido por servicio/ruta en Kong<br>_Se muestra como byte_ |
| **kong.bandwidth.count** <br>(count) | \[OpenMetrics V2\] (Kong v \< 3) Ancho de banda total en bytes consumido por servicio/ruta en Kong<br>_Se muestra como byte_ |
| **kong.connections_accepted** <br>(gauge) | \[Legacy\] Número total de conexiones de cliente aceptadas.<br>_Se muestra como conexión_ |
| **kong.connections_active** <br>(gauge) | \[Legacy\] Número actual de conexiones de cliente activas, incluidas las conexiones en espera.<br>_Se muestra como conexión_ |
| **kong.connections_handled** <br>(gauge) | \[Número total de conexiones gestionadas. (Igual que en acepta a menos que se hayan alcanzado los límites de recursos).<br>_Se muestra como conexión_ |
| **kong.connections_reading** <br>(gauge) | \[Legacy\] Número actual de conexiones en las que Kong está leyendo la cabecera de la solicitud.<br>_Se muestra como conexión_ |
| **kong.connections_waiting** <br>(gauge) | \[Legacy\] Número actual de conexiones de cliente inactivas a la espera de una solicitud.<br>_Se muestra como conexión_ |
| **kong.connections_writing** <br>(gauge) | \[Legacy\] Número actual de conexiones en las que NGINX está escribiendo la respuesta al cliente.<br>_Se muestra como conexión_ |
| **kong.http.consumer.status.count** <br>(count) | \[OpenMetrics V2\] (Kong v \< 3) Códigos de estado HTTP para clientes por servicio/ruta en Kong<br>_Se muestra como solicitud_ |
| **kong.http.requests.count** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Códigos de estado HTTP por servicio/ruta en Kong<br>_Se muestra como solicitud_ |
| **kong.http.status** <br>(count) | \[OpenMetrics V2\] (Kong v \< 3) Códigos de estado HTTP por servicio/ruta en Kong<br>_Se muestra como solicitud_ |
| **kong.kong.latency.ms.bucket** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Latencia de Kong específicamente<br>_Se muestra como milisegundo_ |
| **kong.kong.latency.ms.count** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Latencia de Kong específicamente<br>_Se muestra como milisegundo_ |
| **kong.kong.latency.ms.sum** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Latencia de Kong específicamente<br>_Se muestra como milisegundo_ |
| **kong.latency.bucket** <br>(count) | \[OpenMetrics V2\] (Kong v \< 3) Latencia añadida por Kong, tiempo total de solicitud y latencia ascendente de cada servicio/ruta en Kong<br>_Se muestra como milisegundo_. |
| **kong.latency.count** <br>(count) | \[OpenMetrics V2\] (Kong v \< 3) Latencia añadida por Kong, tiempo total de solicitud y latencia ascendente de cada servicio/ruta en Kong<br>_Se muestra como milisegundo_. |
| **kong.latency.sum** <br>(count) | \[OpenMetrics V2\] (Kong v \< 3) Latencia añadida por Kong, tiempo total de solicitud y latencia ascendente de cada servicio/ruta en Kong<br>_Se muestra como milisegundo_. |
| **kong.memory.lua.shared_dict.bytes** <br>(gauge) | \[OpenMetrics V2\] Slabs asignados en bytes en un shared_dict<br>_Se muestra como byte_ |
| **kong.memory.lua.shared_dict.total_bytes** <br>(gauge) | \[OpenMetrics V2\] Capacidad total en bytes de un shared_dict<br>_Se muestra como byte_ |
| **kong.memory.workers.lua.vms.bytes** <br>(gauge) | \[OpenMetrics V2\] Bbytes asignados en máquinas virtuales Lua de workers<br>_Se muestra como byte_ |
| **kong.nginx.connections.total** <br>(gauge) | \[OpenMetrics V2\] (Kong v3 o posterior) Número de conexiones HTTP y de transmisión<br>_Se muestra como conexión_ |
| **kong.nginx.http.current_connections** <br>(gauge) |  \[OpenMetrics V2\] (Kong v \< 3) Número de conexiones HTTP<br>_Se muestra como conexión_ |
| **kong.nginx.requests.total** <br>(gauge) | \[OpenMetrics V2\] (Kong v3 o posterior) Número de conexiones NGINX totales<br> _Se muestra como solicitud_ |
| **kong.nginx.stream.current_connections** <br>(gauge) | \[OpenMetrics V2\] (Kong v \< 3) Número de conexiones de transmisión<br>_Se muestra como conexión_ |
| **kong.nginx.timers** <br>(gauge) | \[OpenMetrics v2\] (Kong v2.8 o posterior) Número total de temporizadores NGINX en estado En ejecución o Pendiente.<br>_Se muestra como elemento_ |
| **kong.request.latency.ms.bucket** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Latencia añadida por Kong a las solicitudes<br>_Se muestra como milisegundo_ |
| **kong.request.latency.ms.count** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Latencia añadida por Kong a las solicitudes<br>_Se muestra como milisegundo_ |
| **kong.request.latency.ms.sum** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Latencia añadida por Kong a las solicitudes<br>_Se muestra como milisegundo_ |
| **kong.session.duration.ms** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Duración de una transmisión Kong<br>_Se muestra como milisegundo_ |
| **kong.stream.status.count** <br>(count) | \[OpenMetrics V2\] Códigos de estado de transmisión por servicio/ruta en Kong<br>__Se muestra como solicitud_ |
| **kong.total_requests** <br>(gauge) | \[Legacy\] Número total de solicitudes de clientes.<br>_Se muestra como solicitud_ |
| **kong.upstream.latency.ms.bucket** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Latencia ascendente añadida por Kong<br>_Se muestra como milisegundo_ |
| **kong.upstream.latency.ms.count** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Latencia ascendente añadida por Kong<br>_Se muestra como milisegundo_ |
| **kong.upstream.latency.ms.sum** <br>(count) | \[OpenMetrics V2\] (Kong v3 o posterior) Latencia ascendente añadida por Kong<br>_Se muestra como milisegundo_ |

### Eventos

El check de Kong no incluye ningún evento.

### Checks de servicio

**kong.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la instancia Kong, si no devuelve `OK`.

_Estados: ok, crítico_

**kong.openmetrics.health**

Devuelve `CRITICAL` si el Agent no puede conectarse al endpoint de OpenMetrics, en caso contrario devuelve `OK`.

_Estados: ok, crítico_

**kong.datastore.reachable**

Devuelve `CRITICAL` si Kong no puede conectarse al almacén de datos, si no devuelve `OK`.

_Estados: ok, crítico_

**kong.upstream.target.health**

Devuelve `CRITICAL` si el objetivo no es saludable, si no devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorizar Kong con la integración Datadog](https://www.datadoghq.com/blog/monitor-kong-datadog)