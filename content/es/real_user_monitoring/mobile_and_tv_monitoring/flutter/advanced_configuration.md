---
aliases:
- /es/real_user_monitoring/flutter/advanced_configuration
- /es/real_user_monitoring/otel
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
- /es/real_user_monitoring/mobile_and_tv_monitoring/setup/otel
- /es/real_user_monitoring/flutter/otel_support/
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter
description: Aprende a configurar la monitorización de Flutter.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código fuente
  text: Código fuente de dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprender a explorar tus datos de RUM
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitorizar el rendimiento de la aplicación Flutter con Datadog Mobile RUM
title: Configuración avanzada de Flutter
---
## Información general

Si aún no has configurado el SDK de Datadog Flutter para RUM, sigue las [instrucciones de configuración dentro de la aplicación][1] o consulta la [documentación de configuración de RUM Flutter][2]. Aprende a configurar [OpenTelemetry con RUM Flutter](#opentelemetry-setup). Para obtener funciones de instrumentación manual adicionales, como el rastreo automático de vistas, consulta [Bibliotecas de Flutter para RUM][3].

## Parámetros de inicialización
Puedes especificar los siguientes parámetros en tu configuración al inicializar el kit de desarrollo de software (SDK).

`clientToken`
: obligatorio<br/>
**Tipo**: cadena<br/>
Un token de cliente para RUM o inicio de sesión/APM. Puedes obtener este token en Datadog.

`env`
: obligatorio<br/>
**Tipo**: cadena<br/>
El nombre de entorno enviado a Datadog. Puedes utilizar `env` para filtrar eventos por entorno (por ejemplo, `staging` o `production`).

`site`
: obligatorio<br/>
**Tipo**: enum<br/>
El sitio Datadog al que se envían los datos. Valores enum: `us1`, `us3`, `us5`, `eu1`, `us1Fed`, `ap1` y `ap2`.

`nativeCrashReportEnabled`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `false`<br/>
Activa la notificación nativa de fallos.

`service`
: opcional<br/>
**Tipo**: cadena<br/>
El nombre de servicio de la aplicación.

`uploadFrequency`
: opcional<br/>
**Tipo**: enum<br/>
**Predeterminado**: `average`<br/>
La frecuencia con la que el SDK de Datadog intenta cargar lotes de datos. Valores enum: `frequent`, `average` y `rare`.

`batchSize`
: opcional<br/>
**Tipo**: enum<br/>
**Predeterminado**: `medium`<br/>
Define la política del SDK de Datadog para el procesamiento por lotes de datos antes de subirlos a los servidores de Datadog. Los lotes más grandes dan lugar a solicitudes de red más grandes (pero menos numerosas). Los lotes más pequeños dan lugar a solicitudes de red más pequeñas (pero más numerosas). Valores de enum: `small`, `medium` y `large`.

`batchProcessingLevel`
: opcional<br/>
**Tipo**: enum<br/>
**Predeterminado**: `medium`
Define el número máximo de lotes procesados secuencialmente sin retardo, dentro de un ciclo de lectura y subida. Con niveles más altos, se envían más datos en un solo ciclo de subida, y se utiliza más CPU y memoria para procesar los datos. Con niveles más bajos, se envían menos datos en un solo ciclo de carga, y se utiliza menos CPU y memoria para procesar los datos. Valores enum: `low`, `medium` y `high`.

`version`
: opcional<br/>
**Tipo**: cadena<br/>
El número de versión de la aplicación. Dado que `version` es una etiqueta (tag) de Datadog, debe cumplir las reglas de [Definición de etiquetas][4].

`flavor`
: opcional<br/>
**Tipo**: cadena<br/>
El tipo (variante) de la aplicación. Para la desofuscación de la traza (trace) de stack tecnológico, debe coincidir con el tipo establecido durante la carga de símbolos.

`firstPartyHosts`
: opcional<br/>
**Tipo**: ListString<br/>
Una lista de hosts principales, utilizada en conjunción con paquetes de rastreo de red de Datadog. Anula cualquier valor establecido en `firstPartyHostsWithTracinHeaders`. Para especificar diferentes encabezados por host, utiliza `firstPartyHostsWithTracingHeaders` en su lugar.

`firstPartyHostsWithTracingHeaders`
: opcional<br/>
**Tipo**: MapString, SetTracingHeaderType<br/>
Un mapa de los hosts principales y los tipos de encabezados de rastreo en los que Datadog inyecta automáticamente las llamadas de recursos, utilizado en conjunción con paquetes de rastreo de red de Datadog. Por ejemplo:<br/>
  ```dart
  final configuration = DatadogConfiguration(
   clientToken: <CLIENT_TOKEN>,
   env: `prod`,
   site: DatadogSite.us1,
   firstPartyHostsWithTracingHeaders: {
    'example.com': {TracingHeaderType.b3},
   },
  );
  ```
  El enum `TracingHeaderType` tiene los siguientes valores:
  - `datadog`: [encabezado `x-datadog-*`][5] de Datadog
  - `b3`: [encabezado único][6] B3 de OpenTelemetry
  - `b3multi`: [múltiples encabezados][7] B3 de OpenTelemetry
  - `tracecontext`: [encabezado de contexto de traza][8] de W3C

`rumConfiguration`
: opcional<br/>
**Tipo**: objeto<br/>
Consulta [Configuración de RUM](#rum-configuration).

### Configuración de RUM

Utiliza los siguientes parámetros para la clase `DatadogRumConfiguration`.

`applicationId`
: obligatorio<br/>
**Tipo**: cadena</br>
El ID de la aplicación de RUM.

`sessionSamplingRate`
: opcional<br/>
**Tipo**: doble<br/>
**Predeterminado**: `100.0`<br/>
La frecuencia de muestreo para las sesiones RUM. Debe estar entre `0.0` (no se envía ningún evento de RUM) y `100.0` (se envían todos los eventos de RUM).

`traceSampleRate`
: opcional<br/>
**Tipo**: doble<br/>
**Predeterminado**: `20.0`<br/>
La frecuencia de muestreo para el rastreo de recursos. Debe estar entre `0.0` (ningún recurso incluye el rastreo de APM) y `100.0` (todos los recursos incluyen el rastreo de APM).

`traceContextInjection`
: opcional<br/>
**Tipo**: enum<br/>
**Predeterminado**: `all`<br/>
La estrategia para inyectar el contexto de trazas en las solicitudes. Los valores enum pueden ser `all` (inyectar el contexto de trazas en todas las solicitudes) o `sampled` (inyectar el contexto de trazas solo en las solicitudes muestreadas).

`detectLongTasks`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `true`<br/>
Activa o desactiva la detección de tareas largas. Esta capacidad intenta detectar cuando una aplicación está haciendo demasiado trabajo en el subproceso principal aislado o nativo, lo que podría impedir que tu aplicación renderice a una velocidad de fotogramas fluida.

`longTaskThreshold`
: opcional<br/>
**Tipo**: doble<br/>
**Predeterminado**: `0.1`<br/>
La cantidad de tiempo transcurrido que distingue una _tarea larga_, en segundos. Si el subproceso principal aislado tarda más de esta cantidad de tiempo en procesar una microtarea, aparece como una tarea larga en Datadog RUM Explorer. Valor mínimo: `0.02`. En Flutter Web, que siempre utiliza un valor de `0.05` segundos, este argumento se ignora.

`trackFrustrations`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `true`<br/>
Activa [la recopilación automática de frustraciones de usuario][9].

`vitalUpdateFrequency`
: opcional<br/>
**Tipo**: enum<br/>
**Predeterminado**: `average`<br/>
La frecuencia preferida para recopilar los signos de estado móviles. Valores enum: `frequent` (100 ms),`average` (500 ms) y `rare` (1000 ms). Para desactivar la recopilación de signos de estado móviles, establece este parámetro en `null`.

`reportFlutterPerformance`
: opcional<br/>
**Tipo**: booleano<br/>
**Predeterminado**: `false`
Permite informar de las métricas de rendimiento específicas de Flutter, incluidos los tiempos de compilación y de trama.

`customEndpoint`
: opcional<br/>
**Tipo**: cadena<br/>
Un endpoint personalizado para enviar datos de RUM.

`telemetrySampleRate`
: opcional<br/>
**Tipo**: doble<br/>
**Predeterminado**: `20.0`
La frecuencia de muestreo para los datos de telemetría, como errores y logs de depuración.

## Rastreo automático de los recursos

Utiliza el paquete [Rastreo de Datadog del cliente HTTP][10] para activar el rastreo automático de recursos y llamadas HTTP desde tus vistas de RUM.

Añade el paquete a tu `pubspec.yaml` y añade lo siguiente a tu archivo de inicialización:

```dart
final configuration = DatadogConfiguration(
  // configuration
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**Nota**: El rastreo de Datadog del cliente HTTP modifica [`HttpOverrides.global`][11]. Si estás utilizando tu propio `HttpOverrides` personalizado, puede que necesites heredar de [`DatadogHttpOverrides`][12]. En este caso, no necesitas llamar a `enableHttpTracking`. Las versiones de `datadog_tracking_http_client` >= 1.3 hacen un check del valor de `HttpOverrides.current` y lo utilizan para la creación de clientes, por lo que solo necesitas asegurarte de inicializar `HttpOverrides.global` antes de inicializar Datadog.

Para activar [Rastreo distribuido][13] de Datadog, configura la propiedad `DatadogConfiguration.firstPartyHosts` en tu objeto de configuración en un dominio que sea compatible con el rastreo distribuido. También puedes modificar la frecuencia de muestreo para el rastreo distribuido configurando la propiedad `tracingSamplingRate` en tu objeto `DatadogRumConfiguration`.

- `firstPartyHosts` no permite comodines, pero coincide con cualquier subdominio de un dominio determinado. Por ejemplo, `api.example.com` coincide con `staging.api.example.com` y `prod.api.example.com`, no con `news.example.com`.

- `DatadogRumConfiguration.traceSampleRate` configura una frecuencia de muestreo por defecto del 20%. Si quieres que todas las solicitudes de recursos generen una traza distribuida completa, configura este valor en `100.0`.

## Mejorar las sesiones de usuario

Flutter RUM realiza un rastreo automático de atributos como la actividad del usuario, las vistas (mediante `DatadogNavigationObserver`), los errores, los bloqueos nativos y las solicitudes de red (mediante Datadog Tracking HTTP Client). Consulta la [documentación sobre la recopilación de datos de RUM][14] para obtener más información sobre los eventos de RUM y los atributos predeterminados. Puedes mejorar aún más la información de la sesión del usuario y obtener un control más preciso sobre los atributos recopilados mediante el rastreo personalizado de eventos.

### Notificar al SDK que tu vista ha terminado de cargarse

iOS RUM realiza un rastreo del tiempo que tarda en cargarse la vista. Para notificar al SDK que la vista ha terminado de cargarse, llama al método `addViewLoadingTime` en `DatadogRum`.
Llama a este método cuando la vista esté completamente cargada y lista para mostrarse al usuario:

```dart
  DatadogSdk.instance.rum?.addViewLoadingTime(override);
```

Utiliza la opción `override` para sustituir el tiempo de carga calculado anteriormente para la vista actual.

Una vez enviado el tiempo de carga, es accesible como `@view.loading_time` y es visible en la interfaz de usuario de RUM.

**Nota**: Esta API todavía se está probando y podría cambiar en el futuro.

### Añadir tus propios tiempos de rendimiento

Además de los atributos por defecto de RUM, puedes medir dónde pasa el tiempo tu aplicación utilizando `DdRum.addTiming`. La medida del tiempo es relativa al inicio de la vista actual de RUM.

Por ejemplo, puedes cronometrar el tiempo que tarda en aparecer tu imagen principal:

```dart
void _onHeroImageLoaded() {
    DatadogSdk.instance.rum?.addTiming("hero_image");
}
```

Una vez ajustado el tiempo, es accesible como `@view.custom_timings.<timing_name>`. Por ejemplo, `@view.custom_timings.hero_image`.

Para crear visualizaciones en tus dashboards, [crea una medida][15] primero.

### Rastreo de las acciones de los usuarios

Puedes realizar un rastreo de acciones específicas de los usuarios, como toques, clics y desplazamientos, utilizando `DdRum.addAction`.

Para registrar manualmente acciones de RUM instantáneas como `RumActionType.tap`, utiliza `DdRum.addAction()`. Para acciones de RUM continuas como `RumActionType.scroll`, utiliza `DdRum.startAction()` o `DdRum.stopAction()`.

Por ejemplo:

```dart
void _downloadResourceTapped(String resourceName) {
    DatadogSdk.instance.rum?.addAction(
        RumActionType.tap,
        resourceName,
    );
}
```

Al utilizar `DdRum.startAction` y `DdRum.stopAction`, la acción `type` debe ser la misma para que el SDK de Flutter Datadog haga coincidir el inicio de una acción con su finalización.

### Rastreo de recursos personalizados

Además de rastrear recursos automáticamente con el [Datadog Tracking HTTP Client][16], puedes rastrear recursos personalizados específicos como las solicitudes de red o las APIs de proveedores de terceros con los [métodos siguientes][17]:

- `DdRum.startResource`
- `DdRum.stopResource`
- `DdRum.stopResourceWithError`
- `DdRum.stopResourceWithErrorInfo`

Por ejemplo:

```dart
// in your network client:

DatadogSdk.instance.rum?.startResource(
    "resource-key",
    RumHttpMethod.get,
    url,
);

// Later

DatadogSdk.instance.rum?.stopResource(
    "resource-key",
    200,
    RumResourceType.image
);
```

La `String` utilizada para `resourceKey` en ambas llamadas debe ser única para el recurso que está llamando para que el SDK de Flutter Datadog pueda hacer coincidir el inicio de un recurso con su finalización.

### Rastreo de errores personalizados

Para realizar un rastreo de errores específicos, notifica a `DdRum` cuando se produzca un error con el mensaje, la fuente, la excepción y los atributos adicionales.

```dart
DatadogSdk.instance.rum?.addError("This is an error message.");
```

## Rastreo de atributos globales personalizados

Además de los [atributos RUM predeterminados][14] capturados por el SDK de Flutter Datadog automáticamente, puedes optar por añadir información contextual adicional (como atributos personalizados) a tus eventos de RUM para mejorar tu observabilidad dentro de Datadog.

Los atributos personalizados te permiten filtrar y agrupar información sobre el comportamiento observado del usuario (como el valor del carrito, el nivel de comerciante o la campaña publicitaria) con información a nivel de código (como los servicios de backend, la cronología de la sesión, los logs de error y el estado de la red).

### Establecer un atributo global personalizado

Para establecer un atributo global personalizado, utiliza `DdRum.addAttribute`.

* Para añadir o actualizar un atributo, utiliza `DdRum.addAttribute`.
* Para extraer la clave, utiliza `DdRum.removeAttribute`.

### Rastreo de las sesiones de usuario

Al añadir información de usuario a tus sesiones de RUM, simplificas lo siguiente:

* Seguir el recorrido de un usuario concreto
* Conocer qué usuarios se han visto más afectados por los errores
* Monitorizar el rendimiento de tus usuarios más importantes

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API de usuario en la interfaz de usuario de RUM" style="width:90%" >}}

| Atributo   | Tipo   | Descripción                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | Cadena | (Obligatorio) Identificador único de usuario.                                              |
| `usr.name`  | Cadena | (Opcional) Nombre de usuario sencillo, mostrado por defecto en la interfaz de usuario RUM.              |
| `usr.email` | Cadena | (Opcional) Correo electrónico del usuario, mostrado en la interfaz de usuario RUM, si el nombre de usuario no está presente. |

Para identificar las sesiones de usuario, utiliza `DatadogSdk.setUserInfo`.

Por ejemplo:

```dart
DatadogSdk.instance.setUserInfo("1234", "John Doe", "john@doe.com");
```

### Añadir atributos de usuario personalizados

Puedes añadir atributos personalizados a tu sesión de usuario. Esta información adicional se aplica automáticamente a logs, trazas y eventos de RUM.

Para eliminar un atributo existente, configúralo en `null`.

Por ejemplo:

```dart
DatadogSdk.instance.addUserExtraInfo({
 'attribute_1': 'foo',
 'attribute_2': null,
});
```

## Borrar todos los datos

Utiliza `clearAllData` para borrar todos los datos que no se hayan enviado a Datadog.

```dart
DatadogSdk.instance.clearAllData();
```

## Modificar o descartar eventos de RUM

**Nota**: Esta función aún no está disponible para las aplicaciones web de Flutter.

Para modificar los atributos de un evento de RUM antes de que se envíe a Datadog o para eliminar por completo un evento, utiliza la API de asignadores de eventos al configurar el SDK de Flutter RUM:

```dart
final config = DatadogConfiguration(
    // other configuration...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        rumViewEventMapper = (event) => event,
        rumActionEventMapper = (event) => event,
        rumResourceEventMapper = (event) => event,
        rumErrorEventMapper = (event) => event,
        rumLongTaskEventMapper = (event) => event,
    ),
);
```

Cada asignador es una función con una firma de `(T) -> T?`, donde `T` es un tipo concreto de evento de RUM. Esto permite cambiar partes de evento antes de que se envíe, o eliminar evento por completo.

Por ejemplo, para redactar información confidencial en una `url` de recurso de RUM, implementa una función `redacted` personalizada y utilízala en `rumResourceEventMapper`:

```dart
    rumResourceEventMapper = (event) {
        var resourceEvent = resourceEvent
        resourceEvent.resource.url = redacted(resourceEvent.resource.url)
        return resourceEvent
    }
```

Si se devuelve `null` desde el asignador de errores, recursos o acciones, se elimina el evento por completo; el evento no se envía a Datadog. El valor devuelto desde el asignador de eventos de vistas no debe ser `null`.

En función del tipo de evento, solo pueden modificarse algunas propiedades específicas:

| Tipo de evento       | Clave de atributo                     | Descripción                                 |
| ---------------- | --------------------------------- | ------------------------------------------- |
| RumViewEvent     | `viewEvent.view.url`              | URL de la vista.                            |
|                  | `viewEvent.view.referrer`         | Referente de la vista.                       |
| RumActionEvent   | `actionEvent.action.target?.name` | Nombre de la acción.                         |
|                  | `actionEvent.view.referrer`       | Referente de la vista vinculada a esta acción. |
|                  | `actionEvent.view.url`            | URL de la vista vinculada a esta acción.      |
| RumErrorEvent    | `errorEvent.error.message`        | Mensaje de error.                              |
|                  | `errorEvent.error.stack`          | Stack trace del error.                    |
|                  | `errorEvent.error.resource?.url`  | URL del recurso al que se refiere el error.    |
|                  | `errorEvent.view.referrer`        | Referente de la vista vinculada a esta acción. |
|                  | `errorEvent.view.url`             | URL de la vista vinculada a este error.       |
| RumResourceEvent | `resourceEvent.resource.url`      | URL del recurso.                        |
|                  | `resourceEvent.view.referrer`     | Referente de la vista vinculada a esta acción. |
|                  | `resourceEvent.view.url`          | URL de la vista vinculada a este recurso.    |

## Recuperar el ID de sesión de RUM

Recuperar el ID de sesión de RUM puede ser útil para solucionar problemas. Por ejemplo, puedes adjuntar el ID de sesión a solicitudes de soporte, correos electrónicos o informes de errores para que tu equipo de soporte pueda encontrar posteriormente la sesión de usuario en Datadog.

Puedes acceder al identificador de sesión RUM en tiempo de ejecución sin esperar al evento `sessionStarted`:

```dart
final sessionId = await DatadogSdk.instance.rum?.getCurrentSessionId()
```

## Métricas de rendimiento específicas de Flutter

Para habilitar la recopilación de las métricas de rendimiento específicas de Flutter, establece `reportFlutterPerformance: true` en `DatadogRumConfiguration`. Los tiempos de compilación y de ráster del widget se muestran en [Mobile Vitals][18].

## Configuración de OpenTelemetry

Tanto el paquete [Datadog Tracking HTTP Client][10] y el paquete [gRPC Interceptor][19] admiten trazas distribuidas a través de la generación automática de encabezados y la ingesta de encabezados. Esta sección describe cómo utilizar OpenTelemetry con RUM Flutter.

### Generación de encabezados de Datadog

Al configurar tu cliente de rastreo o gRPC Interceptor, puedes especificar los tipos de encabezados de rastreo que quieres que genere Datadog. Por ejemplo, si quieres enviar encabezados `b3` a `example.com` y encabezados `tracecontext` para `myapi.names`, puedes hacerlo con el siguiente código:

```dart
final hostHeaders = {
    'example.com': { TracingHeaderType.b3 },
    'myapi.names': { TracingHeaderType.tracecontext}
};
```

Puedes utilizar este objeto durante la fase inicial de la configuración:

```dart
// For default Datadog HTTP tracing:
final configuration = DatadogConfiguration(
    // configuration
    firstPartyHostsWithTracingHeaders: hostHeaders,
);
```

A continuación, puedes activar el rastreo como de costumbre.

Esta información se fusiona con cualquier host establecido en `DatadogConfiguration.firstPartyHosts`. Los hosts especificados en `firstPartyHosts` generan encabezados de rastreo de Datadog por defecto.

## Hacer un check de hosts principales

Para determinar si un URI específico es un host principal, utiliza `isFirstPartyHost`.

Por ejemplo:
```dart
var host = 'example.com'
if (DatadogSdk.instance.isFirstPartyHost(host)){
 print('$host is a first party host.');
}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup/
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/flutter/integrated_libraries/
[4]: /es/getting_started/tagging/#defining-tags
[5]: /es/real_user_monitoring/connect_rum_and_traces/?tab=browserrum#how-are-rum-resources-linked-to-traces
[6]: https://github.com/openzipkin/b3-propagation#single-headers
[7]: https://github.com/openzipkin/b3-propagation#multiple-headers
[8]: https://www.w3.org/TR/trace-context/#tracestate-header
[9]: /es/real_user_monitoring/browser/frustration_signals/
[10]: https://pub.dev/packages/datadog_tracking_http_client
[11]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[12]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[13]: /es/serverless/aws_lambda/distributed_tracing/
[14]: /es/real_user_monitoring/mobile_and_tv_monitoring/flutter/data_collected
[15]: /es/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[16]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[17]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[18]: /es/real_user_monitoring/mobile_and_tv_monitoring/mobile_vitals/?tab=flutter
[19]: https://pub.dev/packages/datadog_grpc_interceptor