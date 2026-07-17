---
app_id: iis
categories:
- recopilación de logs
- windows
custom_kind: integración
description: Rastrea las métricas en su totalidad o por sitio y monitoriza el estado
  activado/desactivado de cada sitio.
integration_version: 5.2.0
media: []
supported_os:
- windows
title: IIS (Internet Information Services)
---
![IIS Graph](https://raw.githubusercontent.com/DataDog/integrations-core/master/iis/images/iisgraph.png)

## Información general

Recopila las métricas de IIS (Internet Information Services) agregadas en todos tus sitios o por sitio. El check del Agent de IIS (Internet Information Services) recopila métricas de connections (conexiones) activas, bytes enviados y recibidos, count de por método HTTP, etc. También envía un check de servicio para cada sitio y te indica si está activo o inactivo.

## Configuración

### Instalación

El check de IIS (Internet Information Services) está incluido en el paquete del Agent. Para empezar a recopilar tus métricas y logs de IIS (Internet Information Services), [instala Agent](https://app.datadoghq.com/account/settings/agent/latest) en tus servidores de IIS (Internet Information Services).

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `iis.d/conf.yaml` en el [directorio `conf.d` del Agent](https://docs.datadoghq.com/agent/basic_agent_usage/windows/#agent-check-directory-structure) en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para empezar a recopilar los datos de tu sitio de IIS (Internet Information Services). Consulta el [ejemplo de iis.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent) para empezar a enviar métricas de IIS (Internet Information Services) a Datadog.

**Nota**: Las versiones 2.14.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para los hosts que no puedan utilizar Python 3 o si deseas utilizar una versión heredada de este check, consulta la siguiente [configuración](https://github.com/DataDog/integrations-core/blob/7.33.x/iis/datadog_checks/iis/data/conf.yaml.example).

##### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `iis.d/conf.yaml` para empezar a recopilar logs de IIS (Internet Information Services):

   ```yaml
   logs:
     - type: file
       path: C:\inetpub\logs\LogFiles\W3SVC1\u_ex*
       service: myservice
       source: iis
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [ejemplo iis.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/iis/datadog_checks/iis/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

**Nota**: Asegúrate de que el usuario `datadog-agent` tenga acceso de lectura y de ejecución a la tail (seguimiento de logs) de los archivos logs de los cuales deseas recopilar. Cuando IIS (Internet Information Services) crea una nueva subcarpeta (como cuando se crea un nuevo sitio), los permisos de la carpeta principal no se heredan automáticamente. Consulta [Problemas de permisos en la tail (seguimiento de logs) de archivos de logs](https://docs.datadoghq.com/logs/guide/log-collection-troubleshooting-guide/#permission-issues-tailing-log-files) para obtener más información.

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `IIS (Internet Information Services)` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **iis.app_pool.recycle.count** <br>(count) | El número de veces que se ha reciclado el grupo de aplicaciones desde que se inició Windows Process Activation Service (WAS).|
| **iis.app_pool.state** <br>(gauge) | El estado actual del grupo de aplicaciones (1 - No inicializado, 2 - Inicializado, 3 - En ejecución, 4 - En desactivación, 5 - Desactivado, 6 - Apagado pendiente, 7 - Eliminación pendiente).|
| **iis.app_pool.uptime** <br>(gauge) | El tiempo, en segundos, que el grupo de aplicaciones se ha estado ejecutando desde que se inició.<br>_Mostrado como segundo_ |
| **iis.errors.locked** <br>(gauge) | El número de errores bloqueados por segundo (normalmente informados como un código de respuesta HTTP 423)<br>_Mostrado como error_ |
| **iis.errors.not_found** <br>(gauge) | El número de errores no encontrados por segundo (normalmente informados como un código de respuesta HTTP 404)<br>_Mostrado como error_ |
| **iis.httpd_request_method.delete** <br>(gauge) | El número de solicitudes DELETE por segundo<br>_Mostrado como solicitud_ |
| **iis.httpd_request_method.get** <br>(gauge) | El número de solicitudes GET por segundo<br>_Mostrado como solicitud_ |
| **iis.httpd_request_method.head** <br>(gauge) | El número de solicitudes HEAD por segundo<br>_Mostrado como solicitud_ |
| **iis.httpd_request_method.options** <br>(gauge) | El número de solicitudes OPTIONS por segundo<br>_Mostrado como solicitud_ |
| **iis.httpd_request_method.post** <br>(gauge) | Número de solicitudes POST por segundo<br>_Mostrado como solicitud_ |
| **iis.httpd_request_method.put** <br>(gauge) | El número de solicitudes PUT por segundo<br>_Mostrado como solicitud_ |
| **iis.httpd_request_method.trace** <br>(gauge) | El número de solicitudes TRACE por segundo<br>_Mostrado como solicitud_ |
| **iis.net.bytes_rcvd** <br>(gauge) | El número de bytes recibidos por segundo<br>_Mostrado como byte_ |
| **iis.net.bytes_sent** <br>(gauge) | El número de bytes servidos por segundo<br>_Mostrado como byte_ |
| **iis.net.bytes_total** <br>(gauge) | El número total de bytes transferidos por segundo<br>_Mostrado como byte_ |
| **iis.net.connection_attempts** <br>(gauge) | El número de intentos de connection (conexión) desde el inicio del servicio<br>_Mostrado como connection (conexión)_ |
| **iis.net.connection_attempts_sec** <br>(gauge) | El número de intentos de connection (conexión) por segundo<br>_Mostrado como connection (conexión)_ |
| **iis.net.files_rcvd** <br>(gauge) | El número de archivos recibidos por segundo<br>_Mostrado como archivo_ |
| **iis.net.files_sent** <br>(gauge) | El número de archivos enviados por segundo<br>_Mostrado como archivo_ |
| **iis.net.num_connections** <br>(gauge) | El número de connections (conexiones) activas<br>_Mostrado como connection (conexión)_ |
| **iis.requests.cgi** <br>(gauge) | El número de solicitudes de Common Gateway Interface ejecutadas por segundo<br>_Mostrado como solicitud_ |
| **iis.requests.isapi** <br>(gauge) | El número de solicitudes de ISAPI ejecutadas por segundo<br>_Mostrado como solicitud_ |
| **iis.uptime** <br>(gauge) | La cantidad de tiempo que el servidor IIS (Internet Information Services) ha estado funcionando<br>_Mostrado como segundo_ |
| **iis.users.anon** <br>(gauge) | El número de solicitudes de usuarios a través de una connection (conexión) anónima por segundo<br>_Mostrado como solicitud_ |
| **iis.users.nonanon** <br>(gauge) | El número de solicitudes de usuarios a través de una connection (conexión) no anónima por segundo<br>_Mostrado como solicitud_ |

### Eventos

El check de IIS (Internet Information Services) no incluye eventos.

### Checks de servicio

**iis.site_up**

Devuelve `CRITICAL` si el tiempo de actividad de un sitio es 0 y `OK` en caso contrario. El tiempo de actividad del sitio se recopila a través de Windows Performance Data Helper utilizando el contador de "Web Service(\*)\Service Uptime".

_Estados: ok, crítico_

**iis.app_pool_up**

Devuelve `CRITICAL` si el app_pool etiquetado está caído y `OK` en caso contrario.

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).