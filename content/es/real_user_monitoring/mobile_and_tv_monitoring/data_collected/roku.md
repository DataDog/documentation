---
aliases:
- /es/real_user_monitoring/roku/data_collected/
code_lang: roku
code_lang_weight: 50
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: Código fuente
  text: Código fuente de dd-sdk-roku
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
title: Datos recopilados de RUM Roku
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM para Roku no está disponible en el sitio US1-FED Datadog.</div>
{{< /site-region >}}

## Información general

El SDK de RUM Roku genera eventos que tienen métricas y atributos asociados. Las métricas son valores cuantificables que pueden utilizarse para mediciones relacionadas con el evento. Los atributos son valores no cuantificables que se utilizan para dividir los datos de métricas (agrupar por) en el análisis.

Cada evento de RUM tiene todos los [atributos por defecto](#default-attributes), por ejemplo, el tipo de dispositivo (`device.type`) e información del usuario como su nombre (`usr.name`) y su país (`geo.country`).

Existen [métricas y atributos adicionales que son específicos de un determinado tipo de evento](#event-specific-metrics-and-attributes). Por ejemplo, la métrica `view.time_spent` está asociada a eventos de "vista" y el atributo `resource.method` está asociado a eventos de "recurso".

| Tipo de evento | Conservación | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Sesión    | 30 días   | Una sesión representa un recorrido real del usuario en tu canal de Roku. Comienza cuando el usuario inicia el canal y permanece abierta mientras el usuario permanezca activo. Durante el recorrido del usuario, todos los eventos de RUM generados como parte de la sesión compartirán el mismo atributo `session.id`. **Nota:** La sesión se reinicia tras 15 minutos de inactividad. Si el canal falla o lo rompe el sistema operativo de Roku, puedes restablecer la sesión. |
| Vista       | 30 días   | Una vista representa una pantalla única (o segmento de pantalla) en tu canal de Roku. Una vista comienza cuando llamas a la función `startView` y se detiene cuando se inicia una nueva vista. Cada ocurrencia es clasificada como una vista distinta. Mientras un usuario permanece en una vista, los atributos del evento de RUM (Errores, Recursos y Acciones) se adjuntan a la vista con un `view.id` único.                                                                               |
| Recurso   | 15 días   | Un recurso representa solicitudes de red a hosts primarios, APIs y proveedores de terceros en tu canal de Roku. Todas las solicitudes generadas durante una sesión de usuario se adjuntan a la vista con un único `resource.id`.                                                                                                                                                                                                                        |
| Error      | 30 días   | Un error representa una excepción o fallo emitido por el canal de Roku adjunto a la vista en la que se genera.                                                                                                                                                                                                                                                                                                                               |
| Acción     | 30 días   | Una acción representa la actividad del usuario en tu canal de Roku (como un clic remoto). Cada acción está asociada a un único `action.id` asociado a la vista en la que se genera.                                                                                                                                                                                                                                                               |
| Tarea prolongada  | 15 días   | Se genera un evento de tarea larga para cualquier tarea de la aplicación que bloquee el subprocesp principal durante más tiempo que el umbral de duración especificado.                                                                                                                                                                                                                                                                                                   |

El siguiente diagrama ilustra la jerarquía de eventos de RUM:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="Jerarquía de eventos RUM" style="width:50%;" >}}

## Atributos predeterminados

RUM recopila atributos comunes para todos los eventos y para los atributos específicos de cada evento que se enumeran a continuación automáticamente. También puedes optar por mejorar tus datos de sesión de usuario rastreando [eventos adicionales][2] o [añadiendo atributos personalizados][3] a eventos predeterminados específicos para tus necesidades de monitorización de aplicaciones y análisis de negocio.

### Atributos esenciales comunes

| Nombre del atributo   | Tipo    | Descripción                                                                         |
| ---------------- | ------- | ----------------------------------------------------------------------------------- |
| `date`           | entero | Inicio del evento en milisegundos desde epoch.                                      |
| `type`           | cadena  | El tipo de evento (por ejemplo, `view` o `resource`).                          |
| `service`        | cadena  | El [nombre del servicio unificado][4] de esta aplicación utilizado para correlacionar las sesiones del usuario. |
| `application.id` | cadena  | El ID de la aplicación de Datadog.                                                         |

### Dispositivo

Los siguientes atributos relacionados con dispositivos se adjuntan automáticamente a todos los eventos recopilados por Datadog:

| Nombre del atributo                       | Tipo   | Descripción                                                                                             |
| ------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------- |
| `device.type`                        | cadena | El tipo de dispositivo informado por el dispositivo (Sistema de usuario-agente).                                          |
| `device.brand`                       | cadena | La marca del dispositivo informada por el dispositivo (Sistema de usuario-agente).                                         |
| `device.model`                       | cadena | El modelo del dispositivo informado por el dispositivo (Sistema usuario-agente).                                         |
| `device.name`                        | cadena | El nombre del dispositivo informado por el dispositivo (Sistema usuario-agente).                                          |


### Sistema operativo

Los siguientes atributos relacionados con el sistema operativo se asocian automáticamente a todos los eventos recopilados por Datadog:

| Nombre del atributo     | Tipo   | Descripción                                                         |
| ------------------ | ------ | ------------------------------------------------------------------- |
| `os.name`          | cadena | El nombre del sistema operativo informado por el dispositivo (Sistema usuario-agente).          |
| `os.version`       | cadena | La versión del sistema operativo informada por el dispositivo (Sistema usuario-agente).       |
| `os.version_major` | cadena | La versión principal del sistema operativo informada por el dispositivo (Sistema usuario-agente). |


### Geolocalización

Los siguientes atributos están relacionados con la geolocalización de las direcciones IP.

**Nota:** Si quieres dejar de recopilar atributos de geolocalización, cambia la configuración en [detalles de la aplicación][9].

| Nombre del atributo            | Tipo   | Descripción                                                                                                                               |
| :------------------------ | :----- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `geo.country`             | cadena | Nombre del país.                                                                                                                      |
| `geo.country_iso_code`    | cadena | Código ISO del país (por ejemplo, `US` para Estados Unidos o `FR` para Francia).                                                     |
| `geo.country_subdivision` | cadena | Nombre del primer nivel de subdivisión del país (por ejemplo, `California` en Estados Unidos o el departamento `Sarthe` en Francia). |
| `geo.continent_code`      | cadena | Código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` o `OC`).                                                                  |
| `geo.continent`           | cadena | Nombre del continente (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America` o `Oceania`).                    |
| `geo.city`                | cadena | El nombre de la ciudad (por ejemplo, `San Francisco`, `Paris` o `New York`).                                                              |


### Atributos globales del usuario

Puedes activar el  [rastreo de la información de usuario][5] globalmente para recopilar y aplicar atributos de usuario a todos los eventos RUM.

| Nombre del atributo | Tipo   | Descripción             |
| -------------- | ------ | ----------------------- |
| `user.id`      | cadena | Identificador del usuario. |
| `usr.name`     | cadena | Nombre del usuario.       |
| `usr.email`    | cadena | Correo electrónico del usuario.      |


## Métricas y atributos específicos del evento

Las métricas son valores cuantificables que pueden utilizarse para realizar mediciones relacionadas con el evento. Los atributos son valores no cuantificables que se utilizan para segmentar los datos de las métricas (agrupar por) en los análisis.

### Métricas de la sesión

| Métrica                    | Tipo        | Descripción                                         |
| ------------------------- | ----------- | --------------------------------------------------- |
| `session.time_spent`      | número (ns) | Tiempo empleado en una sesión.                            |
| `session.view.count`      | número      | Total de vistas recopiladas para esta sesión.      |
| `session.error.count`     | número      | Total de errores recopilados para esta sesión.     |
| `session.resource.count`  | número      | Total de recursos recopilados para esta sesión.  |
| `session.action.count`    | número      | Total de acciones recopiladas para esta sesión.    |
| `session.long_task.count` | número      | Total de tareas largas recopiladas para esta sesión. |

### Atributos de la sesión

| Nombre del atributo              | Tipo    | Descripción                                                                                                                                                                                                   |
| --------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `session.id`                | cadena  | ID único de la sesión.                                                                                                                                                                                     |
| `session.type`              | cadena  | Tipo de sesión (`user`).                                                                                                                                                                                 |
| `session.is_active`         | booleano | Indica si la sesión está actualmente activa. La sesión finaliza si un usuario sale de la aplicación o cierra la ventana del navegador y expira tras 4 horas de actividad o 15 minutos de inactividad. |
| `session.initial_view.url`  | cadena  | URL de la vista inicial de la sesión.                                                                                                                                                                       |
| `session.initial_view.name` | cadena  | Nombre de la vista inicial de la sesión.                                                                                                                                                                      |
| `session.last_view.url`     | cadena  | URL de la última vista de la sesión.                                                                                                                                                                          |
| `session.last_view.name`    | cadena  | Nombre de la última vista de la sesión.                                                                                                                                                                         |
| `session.ip`                | cadena  | Dirección IP de la sesión extraída de la conexión TCP de la ingesta. Si deseas dejar de recopilar este atributo, cambia la configuración en [detalles de la aplicación][8].                                |
| `session.useragent`         | cadena  | Información del Agent de usuario del sistema para interpretar la información del dispositivo.                                                                                                                                                              |

### Ver métricas

Los eventos de acción, error, recurso y tarea larga de RUM contienen información sobre el evento de vista de RUM activo en el momento de la recopilación.


| Métrica                 | Tipo        | Descripción                                                                  |
| ---------------------- | ----------- | ---------------------------------------------------------------------------- |
| `view.time_spent`      | número (ns) | Tiempo empleado en esta vista.                                                     |
| `view.long_task.count` | número      | Total de tareas largas recopiladas para esta vista.                              |
| `view.error.count`     | número      | Total de errores recopilados para esta vista.                                 |
| `view.resource.count`  | número      | Total de recursos recopilados para esta vista.                              |
| `view.action.count`    | número      | Total de acciones recopiladas para esta vista.                                |
| `view.is_active`       | booleano     | Indica si la vista correspondiente a este evento se considera activa. |

### Ver atributos

| Nombre del atributo | Tipo   | Descripción                                               |
| -------------- | ------ | --------------------------------------------------------- |
| `view.id`      | cadena | ID único de la vista inicial correspondiente al evento. |
| `view.url`     | cadena | Nombre convencional de la clase correspondiente al evento.   |
| `view.name`    | cadena | Nombre personalizable de la vista correspondiente al evento. |

### Métricas de recursos


| Métrica                         | Tipo           | Descripción                                                                                                                                |
| ------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `duration`                     | número (ns)    | Tiempo total empleado en cargar el recurso.                                                                                                    |
| `resource.size`                | número (bytes) | Tamaño del recurso.                                                                                                                             |
| `resource.connect.duration`    | número (ns)    | Tiempo empleado en establecer una conexión con el servidor (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | número (ns)    | Tiempo empleado por el protocolo TLS. Si la última solicitud no es en HTTPS, esta métrica no aparece (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | número (ns)    | Tiempo empleado en resolver el nombre DNS de la última solicitud (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | número (ns)    | Tiempo empleado en las siguientes solicitudes HTTP (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | número (ns)    | Tiempo de espera empleado para recibir el primer byte de respuesta (responseStart - RequestStart).                                           |
| `resource.download.duration`   | número (ns)    | Tiempo empleado para descargar la respuesta (responseEnd - responseStart).                                                                         |

### Atributos del recurso

| Atributo                  | Tipo   | Descripción                                                                                 |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------- |
| `resource.id`              | cadena | Identificador único del recurso.                                                          |
| `resource.type`            | cadena | El tipo de recurso que se recopila (por ejemplo, `xhr`, `image`, `font`, `css` o `js`). |
| `resource.method`          | cadena | El método HTTP (por ejemplo, `POST`, `GET`, `PATCH` o `DELETE`).                         |
| `resource.status_code`     | número | El código de estado de la respuesta.                                                                   |
| `resource.url`             | cadena | La URL del recurso.                                                                           |
| `resource.provider.name`   | cadena | El nombre del proveedor de recursos. Por defecto es `unknown`.                                           |
| `resource.provider.domain` | cadena | El dominio del proveedor del recurso.                                                               |
| `resource.provider.type`   | cadena | El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`, `ad` o `analytics`).       |

### Atributos de errores

Los errores de frontend se recopilan con Real User Monitoring (RUM). El mensaje de error y el stack trace se incluyen cuando están disponibles.

| Atributo        | Tipo   | Descripción                                                                       |
| ---------------- | ------ | --------------------------------------------------------------------------------- |
| `error.source`   | cadena | Procedencia del error (por ejemplo, `webview`, `logger` o `network`). |
| `error.type`     | cadena | El tipo de error (o código de error en algunos casos).                                     |
| `error.message`  | cadena | Un mensaje conciso y legible de una línea que explica el evento.                  |
| `error.stack`    | cadena | El stack trace o información complementaria sobre el error.                     |
| `error.issue_id` | cadena | El stack trace o información complementaria sobre el error.                     |


### Errores de red

Los errores de red incluyen información sobre solicitudes HTTP fallidas. También se recopilan las siguientes facetas:

| Atributo                        | Tipo   | Descripción                                                                           |
| -------------------------------- | ------ | ------------------------------------------------------------------------------------- |
| `error.resource.status_code`     | número | El código de estado de la respuesta.                                                             |
| `error.resource.method`          | cadena | El método HTTP (por ejemplo, `POST` o `GET`).                                       |
| `error.resource.url`             | cadena | La URL del recurso.                                                                     |
| `error.resource.provider.name`   | cadena | El nombre del proveedor de recursos. Por defecto es `unknown`.                                     |
| `error.resource.provider.domain` | cadena | El dominio del proveedor del recurso.                                                         |
| `error.resource.provider.type`   | cadena | El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`, `ad` o `analytics`). |

### Métricas del tiempo de acción

| Métrica                   | Tipo        | Descripción                                        |
| ------------------------ | ----------- | -------------------------------------------------- |
| `action.loading_time`    | número (ns) | El tiempo de carga de la acción.                    |
| `action.long_task.count` | número      | Número de tareas largas recopiladas para esta acción. |
| `action.resource.count`  | número      | Número de recursos recopilados para esta acción.  |
| `action.error.count`     | número      | Número de errores recopilados para esta acción.     |

### Atributos de las acciones

| Atributo            | Tipo   | Descripción                                                                      |
| -------------------- | ------ | -------------------------------------------------------------------------------- |
| `action.id`          | cadena | UUID de la acción del usuario.                                                         |
| `action.type`        | cadena | Tipo de acción del usuario (por ejemplo, `tap` o `application_start`).             |
| `action.name`        | cadena | Nombre de la acción del usuario.                                                         |
| `action.target.name` | cadena | Elemento con el que ha interactuado el usuario. Solo para acciones recopiladas automáticamente. |

## Almacenamiento de datos

Antes de que los datos se carguen en Datadog, son almacenados en texto claro en el [directorio de cache][6] de tu canal, lo que significa que estos datos no pueden ser leídos por otras aplicaciones. Ten en cuenta que el sistema operativo puede desalojar los datos en cualquier momento, lo que podría causar pérdida de datos en algunos casos poco frecuentes.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku#enrich-user-sessions
[4]: /es/getting_started/tagging/unified_service_tagging/
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku#identifying-your-users
[6]: https://developer.roku.com/fr-fr/docs/developer-program/getting-started/architecture/file-system.md#cachefs
[8]: /es/data_security/real_user_monitoring/#ip-address
[9]: /es/data_security/real_user_monitoring/#geolocation