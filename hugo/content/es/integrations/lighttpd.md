---
app_id: lighttpd
categories:
- log collection
custom_kind: integración
description: Seguimiento del tiempo de actividad, de los bytes utilizados, de las
  solicitudes por segundo, de los códigos de respuesta y mucho más more.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics
  tag: blog
  text: Monitorizar métricas del servidor web Lighttpd con Datadog
integration_version: 5.1.0
media: []
supported_os:
- linux
- windows
- macos
title: Lighttpd
---
![Dashboard de Lighttpd](https://raw.githubusercontent.com/DataDog/integrations-core/master/lighttpd/images/lighttpddashboard_2.png)

## Información general

El check de Lighttpd del Agent realiza un seguimiento del tiempo de actividad, de los bytes utilizados, de las solicitudes por segundo, de los códigos de respuesta y mucho más.

## Configuración

### Instalación

El check de Lighttpd está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores Lighttpd.

Además, instala `mod_status` en tus servidores de Lighttpd.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `lighttpd.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Consulta el [ejemplo de lighttpd.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles:

   ```yaml
   init_config:

   instances:
     ## @param lighttpd_status_url - string - required
     ## Status url of your Lighttpd server.
     #
     - lighttpd_status_url: http://localhost/server-status?auto
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Contenedorizado" %}}

#### En contenedores

Para los entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                           |
| -------------------- | --------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `lighttpd`                                                      |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                   |
| `<INSTANCE_CONFIG>`  | `{"lighttpd_status_url": "http://%%host%%/server-status?auto"}` |

{{% /tab %}}

{{< /tabs >}}

#### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `lighttpd.d/conf.yaml` para empezar a recopilar logs de Lighttpd:

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: lighttpd
   ```

   Cambia el valor del parámetro `path` y configúralo para tu entorno.
   Consulta el [ejemplo de lighttpd.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/lighttpd/datadog_checks/lighttpd/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Validación

[Ejecuta el subcomando del Agent `status` ](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `lighttpd` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **lighttpd.connections.state_handle_request** <br>(gauge) | \[Sólo Lighttpd 2\] Número de conexiones activas en el estado de manejo interno de la solicitud.<br>_Se muestra como conexión_ |
| **lighttpd.connections.state_keep_alive** <br>(gauge) | \[Sólo Lighttpd 2\] Número de conexiones inactivas.<br>_Se muestra como conexión_ |
| **lighttpd.connections.state_read_header** <br>(gauge) | \[Sólo Lighttpd 2\] Número de conexiones activas en el estado de lectura de la cabecera de la solicitud http.<br>_Se muestra como conexión_ |
| **lighttpd.connections.state_start** <br>(gauge) | \[Sólo Lighttpd 2\] Número de conexiones activas en el estado de inicialización del temporizador de inactividad.<br>_Se muestra como conexión_ |
| **lighttpd.connections.state_write_response** <br>(gauge) | \[Sólo Lighttpd 2\] Número de conexiones activas en el estado de escritura de la respuesta a la red.<br>_Se muestra como conexión_ |
| **lighttpd.net.bytes** <br>(gauge) | \[Sólo Lighttpd 1\] Número de bytes enviados y recibidos desde el inicio.<br>_Se muestra como byte_ |
| **lighttpd.net.bytes_in** <br>(rate) | \[Sólo Lighttpd 2\] Número de bytes recibidos por segundo.<br>_Se muestra como byte_ |
| **lighttpd.net.bytes_in_avg** <br>(gauge) | \[Sólo Lighttpd 2\] Número medio de bytes recibidos por segundo desde el inicio.<br>_Se muestra como byte_ |
| **lighttpd.net.bytes_in_avg_5sec** <br>(gauge) | \[Sólo Lighttpd 2\] Número medio de bytes recibidos por segundo durante los últimos 5 segundos.<br>_Se muestra como byte_ |
| **lighttpd.net.bytes_out** <br>(rate) | \[Sólo Lighttpd 2\] Número de bytes enviados por segundo.<br>_Se muestra como byte_ |
| **lighttpd.net.bytes_out_avg** <br>(gauge) | \[Sólo Lighttpd 2\] Número medio de bytes enviados por segundo desde el inicio.<br>_Se muestra como byte_ |
| **lighttpd.net.bytes_out_avg_5sec** <br>(gauge) | \[Sólo Lighttpd 2\] Número medio de bytes enviados por segundo durante los últimos 5 segundos.<br>_Se muestra como byte_ |
| **lighttpd.net.bytes_per_s** <br>(gauge) | \[Sólo Lighttpd 1\] Número de bytes enviados y recibidos por segundo.<br>_Se muestra como byte_ |
| **lighttpd.net.connections_avg** <br>(gauge) | \[Sólo Lighttpd 2\] Número medio de conexiones por segundo desde el inicio.<br>_Se muestra como conexión_ |
| **lighttpd.net.connections_avg_5sec** <br>(gauge) | \[Sólo Lighttpd 2\] Número medio de conexiones por segundo durante los últimos 5 segundos.<br>_Se muestra como conexión_ |
| **lighttpd.net.connections_total** <br>(rate) | \[Sólo Lighttpd 2\] Número total de conexiones por segundo.<br>_Se muestra como conexión_ |
| **lighttpd.net.hits** <br>(gauge) | \[Sólo Lighttpd 1\] Número de aciertos desde el inicio.<br>_Se muestra como acierto_ |
| **lighttpd.net.request_per_s** <br>(gauge) | \[Sólo Lighttpd 1\] Número de solicitudes por segundo.<br>_Se muestra como solicitud_ |
| **lighttpd.net.requests_avg** <br>(gauge) | \[Sólo Lighttpd 2\] Número medio de solicitudes por segundo desde el inicio.<br>_Se muestra como solicitud_ |
| **lighttpd.net.requests_avg_5sec** <br>(gauge) | \[Sólo Lighttpd 2\] Número medio de solicitudes por segundo durante los últimos 5 segundos.<br>_Se muestra como solicitud_ |
| **lighttpd.net.requests_total** <br>(rate) | \[Sólo Lighttpd 2\] Número de solicitudes por segundo.<br>_Se muestra como solicitud_ |
| **lighttpd.performance.busy_servers** <br>(gauge) | \[Sólo Lighttpd 1\] Número de conexiones inactivas.<br>_Se muestra como conexión_ |
| **lighttpd.performance.idle_server** <br>(gauge) | \[Sólo Lighttpd 1\] Número de conexiones inactivas.<br>_Se muestra como conexión_ |
| **lighttpd.performance.memory_usage** <br>(gauge) | \[Sólo Lighttpd 2\] Cantidad de memoria utilizada por el servidor.<br>_Se muestra como byte_ |
| **lighttpd.performance.uptime** <br>(gauge) | \[Sólo Lighttpd 1\] Cantidad de tiempo que el servidor ha estado activo.<br>_Se muestra como segundo_ |
| **lighttpd.response.status_1xx** <br>(rate) | \[Sólo Lighttpd 2\] Número de códigos de estado 1xx generados por segundo.<br>_Se muestra como respuesta_ |
| **lighttpd.response.status_2xx** <br>(rate) | \[Sólo Lighttpd 2\] Número de códigos de estado 2xx generados por segundo.<br>_Se muestra como respuesta_ |
| **lighttpd.response.status_3xx** <br>(rate) | \[Sólo Lighttpd 2\] Número de códigos de estado 3xx generados por segundo.<br>_Se muestra como respuesta_ |
| **lighttpd.response.status_4xx** <br>(rate) | \[Sólo Lighttpd 2\] Número de códigos de estado 4xx generados por segundo.<br>_Se muestra como respuesta_ |
| **lighttpd.response.status_5xx** <br>(rate) | \[Sólo Lighttpd 2\] Número de códigos de estado 5xx generados por segundo.<br>_Se muestra como respuesta_ |

### Eventos

El check de Lighttpd no incluye eventos.

### Checks de servicio

**lighttpd.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse y recopilar métricas de la instancia de Lighttpd monitorizada, si no devuelve `OK`.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

- [Monitorizar métricas del servidor web Lighttpd con Datadog](https://www.datadoghq.com/blog/monitor-lighttpd-web-server-metrics).