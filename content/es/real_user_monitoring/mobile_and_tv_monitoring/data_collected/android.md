---
aliases:
- /es/real_user_monitoring/android/data_collected/
code_lang: android
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
title: Datos recopilados de RUM Android
type: multi-code-lang
---

## Información general

El SDK de RUM Android genera eventos que tienen métricas y atributos asociados. Las métricas son valores cuantificables que pueden utilizarse para mediciones relacionadas con el evento. Los atributos son valores no cuantificables que se utilizan para dividir los datos de métricas (agrupar por) en el análisis.

Cada evento de RUM tiene todos los [atributos por defecto](#default-attributes), por ejemplo, el tipo de dispositivo (`device.type`) e información del usuario como su nombre (`usr.name`) y su país (`geo.country`).

Existen [métricas y atributos adicionales que son específicos de un determinado tipo de evento](#event-specific-metrics-and-attributes). Por ejemplo, la métrica `view.time_spent` está asociada a eventos de "vista" y el atributo `resource.method` está asociado a eventos de "recurso".

| Tipo de evento     | Retención | Descripción                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sesión  | 30 días   | Una sesión representa un recorrido real del usuario en tu aplicación móvil. Comienza cuando el usuario inicia la aplicación y permanece abierta mientras el usuario permanezca activo. Durante el recorrido del usuario, todos los eventos de RUM generados como parte de la sesión compartirán el mismo atributo `session.id`. **Nota:** La sesión se reinicia tras 15 minutos de inactividad. Si el sistema operativo desactiva la aplicación, puedes restablecer la sesión mientras la aplicación está en segundo plano. |
| Vista     | 30 días   | Una vista representa una única pantalla (o segmento de pantalla) en tu aplicación móvil. Una vista se inicia y se detiene cuando las devoluciones de llamadas a `onActivityResumed` y `onActivityPaused` son invocadas a través de la interfaz `ActivityLifecycleCallbacks`. Cada ocurrencia se clasifica como una vista distinta. Mientras un usuario permanece en una vista, los atributos de eventos de RUM (Errores, Recursos y Acciones) se adjuntan a la vista con un único `view.id`.                      |
| Recurso  | 15 días   | Un recurso representa solicitudes de red a hosts de origen, APIs y otros proveedores en tu aplicación móvil. Todas las solicitudes generadas durante una sesión de usuario se adjuntan a la vista con un único `resource.id`.                                                                                           |
| Error     | 30 días   | Un error representa una excepción o un fallo emitido por la aplicación móvil asociado a la vista en la que se ha generado.                                                                                                                                            |
| Acción    | 30 días   | Una acción representa la actividad del usuario en tu aplicación móvil (como iniciar la aplicación, tocar, deslizar o retroceder). Cada acción está asociada a un único `action.id` asociado a la vista en la que se genera.                                                                                                                                              |
| Tarea larga | 15 días | Se genera un evento de tarea larga para cualquier tarea de la aplicación que bloquee el subprocesp principal durante más tiempo que el umbral de duración especificado. |

El siguiente diagrama ilustra la jerarquía de eventos de RUM:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="Jerarquía de eventos RUM" style="width:50%;" >}}

## Lanzamiento de la aplicación

Durante la inicialización, el SDK de RUM Android crea una vista llamada "ApplicationLaunch". La hora de inicio de esta vista coincide con el inicio del proceso de Android, y se puede utilizar para realizar un seguimiento de la hora de lanzamiento de tu aplicación.

La vista `ApplicationLaunch` incluye logs, acciones y recursos creados antes de tu primera llamada a `startView`. Utiliza la duración de esta vista para determinar el tiempo hasta la primera vista. Esta vista tiene una acción, `application_start`, con una duración que depende de la versión de Android:

- En *Android 7.0* y posterior, esta vista/acción captura el periodo antes de que se ejecute cualquier código de aplicación (justo antes de `Application.onCreate`) y cuando se registra el primer evento de RUM.
- En versiones anteriores a *Android 7.0*, la vista/acción captura el periodo entre que se carga la clase `RumFeature` y cuando se registra el primer evento de RUM.

## Atributos predeterminados

RUM recopila atributos comunes para todos los eventos y para los atributos específicos de cada evento que se enumeran a continuación [automáticamente][1]. También puedes optar por enriquecer tus datos de sesión de usuario rastreando [eventos adicionales][2] o [añadiendo atributos personalizados][3] a eventos predeterminados específicos para tus necesidades de monitorización de aplicaciones y análisis de negocio.

### Atributos esenciales comunes

| Nombre del atributo   | Tipo   | Descripción                 |
|------------------|--------|-----------------------------|
| `date` | entero  | Inicio del evento en milisegundos desde la época. |
| `type`     | cadena | El tipo de evento (por ejemplo, `view` o `resource`).             |
| `service` | cadena | El [nombre del servicio unificado][4] de esta aplicación utilizado para correlacionar las sesiones del usuario. |
| `application.id` | cadena | El ID de la aplicación Datadog. |
| `application.name` | cadena | El nombre de la aplicación Datadog. |

### Dispositivo

Los siguientes atributos relacionados con dispositivos se adjuntan automáticamente a todos los eventos recopilados por Datadog:

| Nombre del atributo                           | Tipo   | Descripción                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `device.type`       | cadena | El tipo de dispositivo notificado por el dispositivo (System User-Agent).      |
| `device.brand`  | cadena | La marca del dispositivo notificada por el dispositivo (System User-Agent).  |
| `device.model`   | cadena | El modelo del dispositivo notificado por el dispositivo (System User-Agent).    |
| `device.name` | cadena | El nombre del dispositivo notificado por el dispositivo (System User-Agent).  |

### Conectividad

Los siguientes atributos relacionados con la red se adjuntan automáticamente a los eventos de Recursos y Errores recopilados por Datadog:

| Nombre del atributo                           | Tipo   | Descripción                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `connectivity.status` | cadena | Estado de la accesibilidad a la red del dispositivo (`connected`, `not connected` o `maybe`). |
| `connectivity.interfaces` | cadena | La lista de interfaces de red disponibles (por ejemplo, `bluetooth`, `cellular`, `ethernet` o `wifi`). |
| `connectivity.cellular.technology` | cadena | El tipo de tecnología de radio utilizada para la conexión celular. |
| `connectivity.cellular.carrier_name` | cadena | El nombre del operador de la SIM. |

### Sistema operativo

Los siguientes atributos relacionados con el sistema operativo se asocian automáticamente a todos los eventos recopilados por Datadog:

| Nombre del atributo                           | Tipo   | Descripción                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | cadena | El nombre del sistema operativo notificado por el dispositivo (System User-Agent).       |
| `os.version`  | cadena | La versión del sistema operativo notificada por el dispositivo (System User-Agent).  |
| `os.version_major`   | cadena | La versión principal del sistema operativo notificada por el dispositivo (System User-Agent).   |

### Geolocalización

Los siguientes atributos están relacionados con la geolocalización de las direcciones IP.

**Nota:** Si quieres dejar de recopilar atributos de geolocalización, cambia la configuración en [detalles de la aplicación][9].

| Nombre del atributo                              | Tipo   | Descripción                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | cadena | Nombre del país.                                                                                                                 |
| `geo.country_iso_code`     | cadena | Código ISO del país (por ejemplo, `US` para Estados Unidos o `FR` para Francia).                                                  |
| `geo.country_subdivision`     | cadena | Nombre del primer nivel de subdivisión del país (por ejemplo, `California` en Estados Unidos o el departamento `Sarthe` en Francia). |
| `geo.continent_code`       | cadena | Código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA` o `OC`).                                                                 |
| `geo.continent`       | cadena | Nombre del continente (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America` o `Oceania`).                    |
| `geo.city`            | cadena | El nombre de la ciudad (por ejemplo, `San Francisco`, `Paris` o `New York`).                                                                                   |
### Atributos globales del usuario

Puedes activar el  [rastreo de la información de usuario][5] globalmente para recopilar y aplicar atributos de usuario a todos los eventos RUM.

| Nombre del atributo   | Tipo   | Descripción                 |
|------------------|--------|-----------------------------|
| `user.id`     | cadena | Identificador del usuario. |
| `usr.name` | cadena | Nombre del usuario. |
| `usr.email` | cadena | Correo electrónico del usuario. |


## Métricas y atributos específicos del evento

Las métricas son valores cuantificables que pueden utilizarse para realizar mediciones relacionadas con el evento. Los atributos son valores no cuantificables que se utilizan para segmentar los datos de las métricas (agrupar por) en los análisis.

### Métricas de sesión

| Métrica  | Tipo   | Descripción                |
|------------|--------|----------------------------|
| `session.time_spent` | número (ns) | Tiempo empleado en una sesión. |
| `session.view.count`        | número      | Total de vistas recopiladas para esta sesión. |
| `session.error.count`      | número      | Total de errores recopilados para esta sesión.  |
| `session.resource.count`         | número      | Total de recursos recopilados para esta sesión. |
| `session.action.count`      | número      | Total de acciones recopiladas para esta sesión. |
| `session.long_task.count`      | número      | Recuento de todas las tareas largas recopiladas en esta sesión.

### Atributos de la sesión

| Nombre del atributo                 | Tipo   | Descripción                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id` | cadena | ID único de la sesión. |
| `session.type` | cadena | Tipo de sesión (`user`). |
| `session.is_active` | booleano | Indica si la sesión está actualmente activa. La sesión finaliza si un usuario sale de la aplicación o cierra la ventana del navegador y expira tras 4 horas de actividad o 15 minutos de inactividad. |
| `session.initial_view.url` | cadena | URL de la vista inicial de la sesión. |
| `session.initial_view.name` | cadena | Nombre de la vista inicial de la sesión. |
| `session.last_view.url` | cadena | URL de la última vista de la sesión. |
| `session.last_view.name` | cadena | Nombre de la última vista de la sesión. |
| `session.ip` | cadena | Dirección IP de la sesión extraída de la conexión TCP de la ingesta. Si deseas dejar de recopilar este atributo, cambia la configuración en [detalles de la aplicación][8]. |
| `session.useragent` | cadena | Información del agent de usuario del sistema para interpretar la información del dispositivo.  |

### Ver métricas

Los eventos de acción, error, recurso y tarea larga de RUM contienen información sobre el evento de vista de RUM activo en el momento de la recopilación.


| Métrica                              | Tipo        | Descripción                                                                                          |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`                             | número (ns) | Tiempo empleado en esta vista.                                    |
| `view.long_task.count`        | número      | Total de tareas largas recopiladas para esta vista.                                 |
| `view.error.count`            | número      | Total de errores recopilados para esta vista.                                    |
| `view.resource.count`         | número      | Total de recursos recopilados para esta vista.                                 |
| `view.action.count`      | número      | Total de acciones recopiladas para esta vista.                                        |
| `view.is_active`      |    booleano   | Indica si la vista correspondiente a este evento se considera activa.            |

### Ver atributos

| Nombre del atributo                 | Tipo   | Descripción                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | cadena | ID único de la vista inicial correspondiente al evento.                                                                      |
| `view.url`                     | cadena | Nombre convencional de la clase correspondiente al evento.                                                           |
| `view.name` | cadena | Nombre personalizable de la vista correspondiente al evento. |                                                                                 

### Métricas de recursos


| Métrica                              | Tipo           | Descripción                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | número (ns)        | Tiempo total empleado en cargar el recurso.                                                                                                   |
| `resource.size`                | número (bytes) | Tamaño del recurso.                                                                                                                            |
| `resource.connect.duration`    | número (ns)    | Tiempo empleado en establecer una conexión con el servidor (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | número (ns)    | Tiempo empleado por el protocolo TLS. Si la última solicitud no es sobre HTTPS, esta métrica no aparece (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | número (ns)    | Tiempo empleado en resolver el nombre DNS de la última solicitud (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | número (ns)    | Tiempo empleado en las siguientes solicitudes HTTP (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | número (ns)    | Tiempo de espera empleado para recibir el primer byte de respuesta (responseStart - RequestStart).                                           |
| `resource.download.duration`   | número (ns)    | Tiempo empleado para descargar la respuesta (responseEnd - responseStart).                                                                         |

### Atributos del recurso

| Atributo                      | Tipo   | Descripción                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.id`                | cadena |  Identificador único del recurso.      |
| `resource.type`                | cadena | El tipo de recurso que se recopila (por ejemplo, `xhr`, `image`, `font`, `css` o `js`).          |
| `resource.method`                | cadena | El método HTTP (por ejemplo, `POST`, `GET`, `PATCH` o `DELETE`).           |
| `resource.status_code`             | número | El código de estado de la respuesta.                                                               |
| `resource.url`              | cadena | La URL del recurso.                             |
| `resource.provider.name`      | cadena | El nombre del proveedor de recursos. De forma predeterminada es `unknown`.                     |
| `resource.provider.domain`      | cadena | El dominio del proveedor del recurso.                                            |
| `resource.provider.type`  | cadena | El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`, `ad` o `analytics`).              |

### Atributos de error

Los errores de front-end se recopilan con Real User Monitoring (RUM). El mensaje de error y el stack trace se incluyen cuando están disponibles.

| Atributo       | Tipo   | Descripción                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | cadena | Procedencia del error (por ejemplo, `webview`, `logger` o `network`).     |
| `error.type`    | cadena | El tipo de error (o código de error en algunos casos).                   |
| `error.message` | cadena | Un mensaje conciso y legible de una línea que explica el evento. |
| `error.stack`   | cadena | La stack trace o información complementaria sobre el error.     |
| `error.issue_id`   | cadena | La stack trace o información complementaria sobre el error.     |


### Errores de red

Los errores de red incluyen información sobre solicitudes HTTP fallidas. También se recogen las siguientes facetas:

| Atributo                      | Tipo   | Descripción                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `error.resource.status_code`             | número | El código de estado de la respuesta.                                                               |
| `error.resource.method`                | cadena | El método HTTP (por ejemplo, `POST` o `GET`).           |
| `error.resource.url`                     | cadena | La URL del recurso.                                                                       |
| `error.resource.provider.name`      | cadena | El nombre del proveedor de recursos. De forma predeterminada es `unknown`.                                            |
| `error.resource.provider.domain`      | cadena | El dominio del proveedor del recurso.                                            |
| `error.resource.provider.type`      | cadena | El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`, `ad` o `analytics`).                                            |

### Métricas del tiempo de acción

| Métrica    | Tipo   | Descripción              |
|--------------|--------|--------------------------|
| `action.loading_time` | número (ns) | El tiempo de carga de la acción. |
| `action.long_task.count`        | número      | Total de tareas largas recopiladas para esta acción. |
| `action.resource.count`         | número      | Total de recursos recopilados para esta acción. |
| `action.error.count`      | número      | Total de errores recopilados para esta acción.|

### Atributos de la acción

| Atributo    | Tipo   | Descripción              |
|--------------|--------|--------------------------|
| `action.id` | cadena | UUID de la acción del usuario. |
| `action.type` | cadena | Tipo de acción del usuario (por ejemplo, `tap` o `application_start`). |
| `action.name` | cadena | Nombre de la acción del usuario. |
| `action.target.name` | cadena | Elemento con el que ha interactuado el usuario. Solo para acciones recopiladas automáticamente. |

## Almacenamiento de datos

Antes de que el dato se suba a Datadog, se almacena en formato de texto en el directorio de la caché de tu aplicación. Esta carpeta de la caché está protegida por [Android's Application Sandbox][6], lo que significa que en la mayoría de los dispositivos estos datos no pueden ser leídos por otras aplicaciones. Sin embargo, si el dispositivo móvil está rooteado o alguien manipula el núcleo de Linux, los datos almacenados pueden llegar a ser legibles.

## Carga de datos

El SDK para RUM Android te permite obtener los datos que necesitas en Datadog teniendo en cuenta el impacto en el ancho de banda del usuario. El SDK de Datadog agrupa y carga eventos de la siguiente manera:

- En _event collected_ (evento recopilado), el SDK de Datadog añade eventos sin comprimir a un archivo por lotes (con un formato de codificación tag-length-value, o TLV)
- En _upload_ (carga) (cuando el lote se considera "cerrado"), el SDK de Datadog:
  - Lee el lote y extrae eventos
  - Elimina los eventos de Vista redundantes en RUM (sin optimizaciones en otras pistas)
  - Construye cargas útiles específicas para cada pista
  - Comprime la carga útil y la envía

## Compatible con el modo de arranque directo

Si tu aplicación es compatible con el [Modo de arranque directo][7], ten en cuenta que los datos capturados antes de desbloquear 
el dispositivo no se capturarán, ya que el almacenamiento cifrado de credenciales aún no estará disponible.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#enrich-user-sessions
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#track-custom-global-attributes
[4]: /es/getting_started/tagging/unified_service_tagging/
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#track-user-sessions
[6]: https://source.android.com/security/app-sandbox
[7]: https://developer.android.com/training/articles/direct-boot
[8]: /es/data_security/real_user_monitoring/#ip-address
[9]: /es/data_security/real_user_monitoring/#geolocation