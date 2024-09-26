---
aliases:
- /es/real_user_monitoring/ios/data_collected/
code_lang: ios
code_lang_weight: 20
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
- link: /real_user_monitoring/
  tag: Documentación
  text: Datadog Real User Monitoring
title: Datos recopilados de RUM iOS
type: multi-code-lang
---

## Información general

El SDK de RUM iOS genera eventos que tienen métricas y atributos asociados. Las métricas son valores cuantificables que pueden utilizarse para mediciones relacionadas con el evento. Los atributos son valores no cuantificables que se utilizan para dividir los datos de métricas (agrupar por) en el análisis.

Cada evento de RUM tiene todos los [atributos por defecto](#default-attributes), por ejemplo, el tipo de dispositivo (`device.type`) e información del usuario como su nombre (`usr.name`) y su país (`geo.country`).

Existen [métricas y atributos adicionales que son específicos de un determinado tipo de evento](#event-specific-metrics-and-attributes). Por ejemplo, la métrica `view.time_spent` está asociada a eventos de "vista" y el atributo `resource.method` está asociado a eventos de "recurso".

| Tipo de evento | Retención | Descripción                         |
|------------|-----------|-------------------------------------|
| Sesión    | 30 días   | Una sesión representa un recorrido real del usuario en tu aplicación móvil. Comienza cuando el usuario inicia la aplicación y permanece abierta mientras el usuario permanezca activo. Durante el recorrido del usuario, todos los eventos de RUM generados como parte de la sesión compartirán el mismo atributo `session.id`. **Nota:** La sesión se reinicia tras 15 minutos de inactividad. Si el sistema operativo desactiva la aplicación, puedes restablecer la sesión mientras la aplicación está en segundo plano.|
| Vista       | 30 días   | Una vista representa una única pantalla (o segmento de pantalla) en tu aplicación móvil. Una vista se inicia y se detiene cuando se notifican las devoluciones de llamada de `viewDidAppear(animated:)` y `viewDidDisappear(animated:)` en la clase `UIViewController`. Las `UIViewControllers` individuales se clasifican como vistas distintas. Mientras un usuario permanece en una vista, los atributos de eventos de RUM (Errores, Recursos, Acciones) se adjuntan a la vista con un `view.id` único.                           |
| Recurso   | 15 días   | Un recurso representa solicitudes de red a hosts de origen, APIs y otros proveedores en tu aplicación móvil. Todas las solicitudes generadas durante una sesión de usuario se adjuntan a la vista con un único `resource.id`.                                                                       |
| Error      | 30 días   | Un error representa una excepción o un fallo emitido por la aplicación móvil asociado a la vista en la que se ha generado.                                                                                                                                                                                        |
| Acción     | 30 días   | Una acción representa la actividad del usuario en tu aplicación móvil (por ejemplo, iniciar la aplicación, tocar, deslizar o retroceder). Cada acción está asociada a un único `action.id` asociado a la vista en la que se genera.                                                                                                                                              |
| Tarea larga | 15 días | Se genera un evento de tarea larga para cualquier tarea de la aplicación que bloquee el hilo principal durante más tiempo del umbral de duración especificado. |


El siguiente diagrama ilustra la jerarquía de eventos de RUM:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="Jerarquía de eventos de RUM" style="width:50%;border:none" >}}

## Lanzamiento de la aplicación

Durante la inicialización, el SDK de RUM iOS crea una vista llamada "ApplicationLaunch". La hora de inicio de esta vista coincide con el inicio del proceso de iOS, y se puede utilizar para realizar un seguimiento de la hora de lanzamiento de tu aplicación.

La vista ApplicationLaunch incluye logs, acciones y recursos creados antes de tu primera llamada a `startView`. Utiliza la duración de esta vista para determinar el tiempo hasta la primera vista. Esta vista tiene una acción, `application_start`, con una duración igual a la cantidad de tiempo desde el inicio de proceso hasta la llamada a `applicationDidBecomeActive`.

En los casos en que iOS decide [preparar tu aplicación][4], la vista ApplicationLaunch en su lugar se inicia cuando se inicializa el SDK de RUM iOS, y el evento `application_start` no tiene una duración.

## Atributos predeterminados

RUM recopila atributos comunes para todos los eventos y atributos específicos para cada evento por defecto enumerados a continuación. También puedes optar por mejorar los datos de sesión de usuario con [eventos adicionales][1], por defecto eventos específicos para la monitorización de tu aplicación y tus necesidades de análisis empresarial.


### Atributos esenciales comunes

| Nombre del atributo   | Tipo    | Descripción                                                                        |
|------------------|---------|------------------------------------------------------------------------------------|
| `date`           | entero | Inicio del evento en milisegundos desde epoch.                                               |
| `type`           | cadena  | El tipo de evento (por ejemplo, `view` o `resource`).                         |
| `service`        | cadena  | El [nombre unificado de servicio][2] para esta aplicación utilizada para correlacionar las sesiones de usuario. |
| `application.id` | cadena  | El ID de la aplicación de Datadog.                                                        |
| `application.name` | cadena  | El nombre de la aplicación de Datadog.                                                        |

### Dispositivo

Los siguientes atributos relacionados con dispositivos se adjuntan automáticamente a todos los eventos recopilados por Datadog:

| Nombre del atributo                       | Tipo   | Descripción                                                                                              |
|--------------------------------------|--------|----------------------------------------------------------------------------------------------------------|
| `device.type`                        | cadena | El tipo de dispositivo informado por el dispositivo (Sistema de usuario-agente).                                            |
| `device.brand`                       | cadena | La marca del dispositivo informada por el dispositivo (Sistema de usuario-agente).                                           |
| `device.model`                       | cadena | El modelo del dispositivo informado por el dispositivo (Sistema usuario-agente).                                           |
| `device.name`                        | cadena | El nombre del dispositivo informado por el dispositivo (Sistema usuario-agente).                                            |

### Conectividad

Los siguientes atributos relacionados con la red se adjuntan automáticamente a los eventos de Recursos y Errores recopilados por Datadog:

| Nombre del atributo                           | Tipo   | Descripción                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `connectivity.status`                | cadena | Estado del alcance de la red del dispositivo (`connected`, `not connected`, `maybe`).                           |
| `connectivity.interfaces`            | cadena | La lista de interfaces de red disponibles (por ejemplo, `bluetooth`, `cellular`, `ethernet` o `wifi`). |
| `connectivity.cellular.technology`   | cadena | El tipo de tecnología de radio utilizada para la conexión celular.                                              |
| `connectivity.cellular.carrier_name` | cadena | El nombre del operador de SIM.                                                                              |


### Sistema operativo

Los siguientes atributos relacionados con el sistema operativo se asocian automáticamente a todos los eventos recopilados por Datadog:

| Nombre del atributo     | Tipo   | Descripción                                                               |
|--------------------|--------|---------------------------------------------------------------------------|
| `os.name`          | cadena | El nombre del sistema operativo informado por el dispositivo (Sistema usuario-agente).          |
| `os.version`       | cadena | La versión del sistema operativo informada por el dispositivo (Sistema usuario-agente).       |
| `os.version_major` | cadena | La versión principal del sistema operativo informada por el dispositivo (Sistema usuario-agente). |


### Geolocalización

Los siguientes atributos están relacionados con la geolocalización de las direcciones IP.

**Nota:** Si deseas dejar de recopilar atributos de geolocalización, cambia la configuración en tus [detalles de la aplicación][6].

| Nombre del atributo                     | Tipo   | Descripción                                                                                                                               |
|------------------------------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`                      | cadena | Nombre del país                                                                                                                       |
| `geo.country_iso_code`             | cadena | Código ISO del país (por ejemplo, `US` para Estados Unidos o `FR` para Francia).                                                  |
| `geo.country_subdivision`          | cadena | Nombre del primer nivel de subdivisión del país (por ejemplo, `California` en Estados Unidos o el departamento `Sarthe` en Francia). |
| `geo.continent_code`               | cadena | Código ISO del continente (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).                                                                     |
| `geo.continent`                    | cadena | Nombre del continente (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, `Oceania`).                        |
| `geo.city`                         | cadena | El nombre de la ciudad (por ejemplo, `San Francisco`, `Paris` o `New York`).                                                                                       |


### Atributos globales del usuario

Puedes activar el [rastreo de información del usuario][2] globalmente para recopilar y aplicar atributos de usuario a todos los eventos de RUM.

| Nombre del atributo | Tipo   | Descripción             |
|----------------|--------|-------------------------|
| `usr.id`      | cadena | Identificador del usuario. |
| `usr.name`     | cadena | Nombre del usuario.       |
| `usr.email`    | cadena | Correo electrónico del usuario.      |


## Métricas y atributos específicos de un evento

### Métricas de sesión

| Métrica                    | Tipo        | Descripción                                         |
|---------------------------|-------------|-----------------------------------------------------|
| `session.time_spent`      | número (ns) | Tiempo empleado en una sesión.                            |
| `session.view.count`      | número      | Total de vistas recopiladas para esta sesión.      |
| `session.error.count`     | número      | Total de errores recopilados para esta sesión.     |
| `session.resource.count`  | número      | Total de recursos recopilados para esta sesión.  |
| `session.action.count`    | número      | Total de acciones recopiladas para esta sesión.    |
| `session.long_task.count` | número      | Total de tareas largas recopiladas para esta sesión. |


### Atributos de la sesión

| Nombre del atributo               | Tipo   | Descripción                                                                |
|------------------------------|--------|----------------------------------------------------------------------------|
| `session.id`                 | cadena | ID único de la sesión.                                                  |
| `session.type`               | cadena | Tipo de sesión (`user`).                                              |
| `session.is_active`          | booleano | Indica si la sesión está actualmente activa. La sesión finaliza si un usuario sale de la aplicación o cierra la ventana del navegador y expira tras 4 horas de actividad o 15 minutos de inactividad.                               |
| `session.initial_view.url`   | cadena | URL de la vista inicial de la sesión.                                     |
| `session.initial_view.name` | cadena | Nombre de la vista inicial de la sesión.                                    |
| `session.last_view.url`      | cadena | URL de la última vista de la sesión.                                        |
| `session.last_view.name`     | cadena | Nombre de la última vista de la sesión.                                       |
| `session.ip`                 | cadena | Dirección IP de la sesión extraída de la conexión TCP de la entrada. Si deseas dejar de recopilar este atributo, cambia la configuración en tus [detalles de la aplicación][5]. |
| `session.useragent`          | cadena | Información del Agent de usuario del sistema para interpretar la información del dispositivo.                            |


### Ver métricas

Los eventos de acción, error, recurso y tarea larga de RUM contienen información sobre el evento de vista de RUM activo en el momento de la recopilación.

| Métrica                | Tipo        | Descripción                                                                  |
|-----------------------|-------------|------------------------------------------------------------------------------|
| `view.time_spent`     | número (ns) | Tiempo empleado en esta vista.                                                     |
| `view.long_task.count`        | número      | Total de tareas largas recopiladas para esta vista.                      |
| `view.error.count`    | número      | Total de errores recopilados para esta vista.                                 |
| `view.resource.count` | número      | Total de recursos recopilados para esta vista.                              |
| `view.action.count`   | número      | Total de acciones recopiladas para esta vista.                                |
| `view.is_active`      | booleano     | Indica si la vista correspondiente a este evento se considera activa. |

### Ver atributos

| Nombre del atributo | Tipo   | Descripción                                                     |
|----------------|--------|-----------------------------------------------------------------|
| `view.id`      | cadena | ID único de la vista inicial correspondiente al evento.  |
| `view.url`     | cadena | URL de la clase `UIViewController` correspondiente a evento. |
| `view.name`    | cadena | Nombre personalizable de la vista correspondiente al evento.       |


### Métricas de recursos

| Métrica                         | Tipo           | Descripción                                                                                     |
|--------------------------------|----------------|-------------------------------------------------------------------------------------------------|
| `resource.duration`            | número         | Tiempo total empleado en cargar el recurso.                                                         |
| `resource.size`                | número (bytes) | Tamaño del recurso.                                                                                  |
| `resource.connect.duration`    | número (ns)    | Tiempo empleado en establecer una conexión con el servidor (connectEnd - connectStart).                  |
| `resource.ssl.duration`        | número (ns)    | Tiempo empleado para el TLS Handshake.                                                               |
| `resource.dns.duration`        | número (ns)    | Tiempo empleado en resolver el nombre DNS de la última solicitud (domainLookupEnd - domainLookupStart).     |
| `resource.redirect.duration`   | número (ns)    | Tiempo empleado en las siguientes solicitudes HTTP (redirectEnd - redirectStart).                            |
| `resource.first_byte.duration` | número (ns)    | Tiempo de espera hasta recibir el primer byte de respuesta (responseStart - requestStart). |
| `resource.download.duration`   | número (ns)    | Tiempo empleado para descargar la respuesta (responseEnd - responseStart).                               |

### Atributos del recurso

| Atributo                  | Tipo   | Descripción                                                                              |
|----------------------------|--------|------------------------------------------------------------------------------------------|
| `resource.id`              | cadena | Identificador único del recurso.                                                       |
| `resource.type`            | cadena | El tipo de recurso que se recopila (por ejemplo, `xhr`, `image`, `font`, `css` o `js`). |
| `resource.method`          | cadena | El método HTTP (por ejemplo, `POST`, `GET`, `PATCH` o `DELETE`).                       |
| `resource.status_code`     | número | El código de estado de la respuesta.                                                                |
| `resource.url`             | cadena | La URL del recurso.                                                                        |
| `resource.provider.name`   | cadena | El nombre del proveedor de recursos. De forma predeterminada es `unknown`.                                        |
| `resource.provider.domain` | cadena | El dominio del proveedor del recurso.                                                            |
| `resource.provider.type`   | cadena | El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`, `ad` o `analytics`).        |


### Atributos de error

Los errores de frontend se recopilan con Real User Monitoring (RUM). El mensaje de error y el stack trace se incluyen cuando están disponibles.

| Atributo        | Tipo   | Descripción                                                                      |
|------------------|--------|----------------------------------------------------------------------------------|
| `error.source`   | cadena | Procedencia del error (por ejemplo, `webview`, `logger` o `network`). |
| `error.type`     | cadena | El tipo de error (o código de error en algunos casos).                                    |
| `error.message`  | cadena | Un mensaje conciso, legible, de una línea, que explique el evento.                |
| `error.stack`    | cadena | El stack trace o información complementaria sobre el error.                    |
| `error.issue_id` | cadena | El stack trace o información complementaria sobre el error.                    |

### Errores de red

Los errores de red incluyen información sobre solicitudes HTTP fallidas. También se recopilan las siguientes facetas:

| Atributo                        | Tipo   | Descripción                                                                       |
|----------------------------------|--------|-----------------------------------------------------------------------------------|
| `error.resource.status_code`     | número | El código de estado de la respuesta.                                                         |
| `error.resource.method`          | cadena | El método HTTP (por ejemplo, `POST` o `GET`).                                      |
| `error.resource.url`             | cadena | La URL del recurso.                                                                 |
| `error.resource.provider.name`   | cadena | El nombre del proveedor de recursos. De forma predeterminada es `unknown`.                                 |
| `error.resource.provider.domain` | cadena | El dominio del proveedor del recurso.                                                     |
| `error.resource.provider.type`   | cadena | El tipo de proveedor del recurso (por ejemplo, `first-party`, `cdn`, `ad` o `analytics`). |


### Métricas de acción

| Métrica                  | Tipo        | Descripción                                   |
|-------------------------|-------------|-----------------------------------------------|
| `action.loading_time`   | número (ns) | El tiempo de carga de la acción.               |
| `action.long_task.count`        | número      | Total de tareas largas recopiladas para esta acción. |
| `action.resource.count` | número      | Total de recursos emitidos por esta acción. |
| `action.error.count`    | número      | Total de errores emitidos por esta acción.    |

### Atributos de la acción

| Atributo            | Tipo   | Descripción                                                                     |
|----------------------|--------|---------------------------------------------------------------------------------|
| `action.id`          | cadena | UUID de la acción del usuario.                                                        |
| `action.type`        | cadena | Tipo de acción del usuario (por ejemplo, `tap` o `application_start`).                           |
| `action.name`        | cadena | Nombre de la acción del usuario.                                                        |
| `action.target.name` | cadena | Elemento con el que ha interactuado el usuario. Solo para acciones recopiladas automáticamente. |

## Almacenamiento de datos

Antes de que los datos se suban a Datadog, se almacenan en texto claro en el directorio de caché (`Library/Caches`) de tu [entorno de pruebas de la aplicación][3], que no puede ser leído por ninguna otra aplicación instalada en el dispositivo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/ios/advanced_configuration/#enrich-user-sessions
[2]: /es/real_user_monitoring/ios/advanced_configuration/#track-user-sessions
[3]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
[4]: https://developer.apple.com/documentation/uikit/app_and_environment/responding_to_the_launch_of_your_app/about_the_app_launch_sequence
[5]: /es/data_security/real_user_monitoring/#ip-address
[6]: /es/data_security/real_user_monitoring/#geolocation