---
aliases:
- /es/real_user_monitoring/flutter/advanced_configuration
- /es/real_user_monitoring/otel
- /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/otel
- /es/real_user_monitoring/mobile_and_tv_monitoring/setup/otel
- /es/real_user_monitoring/flutter/otel_support/
code_lang: flutter
code_lang_weight: 30
description: Aprende a configurar la monitorización de Flutter.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código fuente
  text: Código fuente de dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprender a explorar tus datos RUM
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitorizar el rendimiento de la aplicación Flutter con Datadog Mobile RUM
title: Configuración avanzada de RUM Flutter
type: multi-code-lang
---
## Información general

Si aún no has configurado el SDK de Datadog Flutter para RUM, sigue las [instrucciones de configuración dentro de la aplicación][1] o consulta la [documentación de configuración de RUM Flutter][2]. Aprende a configurar [OpenTelemetry con RUM Flutter](#opentelemetry-setup).

## Rastreo automático de vistas

Si utilizas Flutter Navigator v2.0, tu configuración para el rastreo automático de vistas varía en función de tu middleware de enrutamiento. Aquí documentamos cómo integrarlo con los paquetes de enrutamiento más populares.

### go_router

Dado que [go_router][8], utiliza la misma interfaz de observador que Flutter Navigator v1, por lo que el `DatadogNavigationObserver` se puede añadir a otros observadores como un parámetro a `GoRouter`.

```dart
final _router = GoRouter(
  routes: [
    // Tu información de ruta aquí
  ],
  observers: [
    DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // Tu configuración restante
);
```

Si estás usando ShellRoutes, debes suministrar un observador aparte a cada `ShellRoute`, como se muestra a continuación. Consulta [este error][11] para obtener más información.

```dart
final _router = GoRouter(
  routes: [
    ShellRoute(build: shellBuilder),
    routes: [
      // Rutas adicionales
    ],
    observers: [
      DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
    ],
  ],
  observers: [
    DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // Tu configuración restante
);
```

Además, si estás utilizando el parámetro `pageBuilder` de `GoRoute` sobre su parámetro `builder`, asegúrate de que estás pasando el valor `state.pageKey` y el valor `name` a tu `MaterialPage`.

```dart
GoRoute(
  name: 'My Home',
  path: '/path',
  pageBuilder: (context, state) {
    return MaterialPage(
      key: state.pageKey,       // Necesario para que GoRouter llame a Observers
      name: name,               // Necesario para que Datadog obtenga el nombre de ruta correcto
      child: _buildContent(),
    );
  },
),
```

### AutoRoute

[AutoRoute][9] puede utilizar un `DatadogNavigationObserver` proporcionado como uno de los `navigatorObservers` como parte de su método `config`.

```dart
return MaterialApp.router(
  routerConfig: _router.config(
    navigatorObservers: () => [
      DatadogNavigationObserver(
        datadogSdk: DatadogSdk.instance,
      ),
    ],
  ),
  // Tu configuración restante
);
```

Sin embargo, si utilizas el enrutamiento de pestaña de AutoRoute, deberás ampliar el observador predeterminado de Datadog con la interfaz `AutoRouteObserver` de AutoRoute.

```dart
class DatadogAutoRouteObserver extends DatadogNavigationObserver
    implements AutoRouterObserver {
  DatadogAutoRouteObserver({required super.datadogSdk});

  // solo sobreescribe las rutas de la pestaña del observador
  @override
  void didInitTabRoute(TabPageRoute route, TabPageRoute? previousRoute) {
    datadogSdk.rum?.startView(route.path, route.name);
  }

  @override
  void didChangeTabRoute(TabPageRoute route, TabPageRoute previousRoute) {
    datadogSdk.rum?.startView(route.path, route.name);
  }
}
```

Este nuevo objeto sustituye al `DatadogNavigationObserver` más sencillo en la creación de la configuración de AutoRoute.

### Beamer

[Beamer][10] puede utilizar `DatadogNavigationObserver` como argumento para `BeamerDelegate`:

```dart
final routerDelegate = BeamerDelegate(
  locationBuilder: RoutesLocationBuilder(
    routes: {
      // Tu configuración de ruta
    },
  ),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ]
);
```

## Mejorar las sesiones de usuario

Flutter RUM realiza un rastreo automático de atributos como la actividad del usuario, las vistas (mediante `DatadogNavigationObserver`), los errores, los bloqueos nativos y las solicitudes de red (mediante Datadog Tracking HTTP Client). Consulta la [documentación sobre la recopilación de datos de RUM][3] para obtener más información sobre los eventos de RUM y los atributos predeterminados. Puedes mejorar aún más la información de la sesión del usuario y obtener un control más preciso sobre los atributos recopilados mediante el rastreo personalizado de eventos.

### Añadir tus propios tiempos de rendimiento

Además de los atributos por defecto de RUM, puedes medir dónde pasa el tiempo tu aplicación utilizando `DdRum.addTiming`. La medida del tiempo es relativa al inicio de la vista actual de RUM.

Por ejemplo, puedes cronometrar el tiempo que tarda en aparecer tu imagen principal:

``dardo
void _onHeroImageLoaded() {
   DatadogSdk.instance.rum?.addTiming("hero_image");
}
```

Una vez ajustado el tiempo, es accesible como `@view.custom_timings.<timing_name>`. Por ejemplo, `@view.custom_timings.hero_image`.

Para crear visualizaciones en tus dashboards, [crea una medida][4] primero.

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

Además de rastrear recursos automáticamente con el [Datadog Tracking HTTP Client][5], puedes rastrear recursos personalizados específicos como las solicitudes de red o las APIs de proveedores de terceros con los [métodos siguientes][6]:

- `DdRum.startResource`
- `DdRum.stopResource`
- `DdRum.stopResourceWithError`
- `DdRum.stopResourceWithErrorInfo`

Por ejemplo:

```dart
// En tu cliente de red:

DatadogSdk.instance.rum?.startResource(
    "resource-key",
    RumHttpMethod.get,
    url,
);

// Luego

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

## Rastrear atributos globales personalizados

Además de los [atributos RUM predeterminados][3] capturados por el SDK de Flutter Datadog automáticamente, puedes optar por añadir información contextual adicional (como atributos personalizados) a tus eventos de RUM para mejorar tu observabilidad dentro de Datadog.

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

Los siguientes atributos son **opcionales**, proporciona **al menos** uno de ellos:

| Atributo | Tipo   | Descripción                                                                                              |
|-----------|--------|----------------------------------------------------------------------------------------------------------|
| `usr.id`    | Cadena | Identificador de usuario único.                                                                                  |
| `usr.name`  | Cadena | Nombre descriptivo, que se muestra de forma predeterminada en la interfaz de usuario de RUM.                                                  |
| `usr.email` | Cadena | Correo electrónico del usuario, que se muestra en la interfaz de usuario de RUM si el nombre de usuario no está presente. También se usa para obtener Gravatars. |

Para identificar las sesiones de usuario, utiliza `DatadogSdk.setUserInfo`.

Por ejemplo:

```dart
DatadogSdk.instance.setUserInfo("1234", "John Doe", "john@doe.com");
```

## Modificar o descartar eventos de RUM

**Nota**: Esta función aún no está disponible para las aplicaciones web de Flutter.

Para modificar los atributos de un evento de RUM antes de que se envíe a Datadog o para eliminar por completo un evento, utiliza la API de asignadores de eventos al configurar el SDK de Flutter RUM:

```dart
final config = DatadogConfiguration(
    // otra configuración...
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

| Tipo de evento       | Clave de atributo                     | Descripción                                   |
|------------------|-----------------------------------|-----------------------------------------------|
| RumViewEvent     | `viewEvent.view.url`              | URL de la vista.                              |
|                  | `viewEvent.view.referrer`         | Referente de la vista.                         |
| RumActionEvent   | `actionEvent.action.target?.name` | Nombre de la acción.                           |
|                  | `actionEvent.view.referrer`       | Referente de la vista vinculada a esta acción.   |
|                  | `actionEvent.view.url`            | URL de la vista vinculada a esta acción.        |
| RumErrorEvent    | `errorEvent.error.message`        | Mensaje de error.                                |
|                  | `errorEvent.error.stack`          | Stack trace del error.                      |
|                  | `errorEvent.error.resource?.url`  | URL del recurso al que se refiere el error.      |
|                  | `errorEvent.view.referrer`        | Referente de la vista vinculada a esta acción.   |
|                  | `errorEvent.view.url`             | URL de la vista vinculada a este error.         |
| RumResourceEvent | `resourceEvent.resource.url`      | URL del recurso.                          |
|                  | `resourceEvent.view.referrer`     | Referente de la vista vinculada a esta acción.   |
|                  | `resourceEvent.view.url`          | URL de la vista vinculada a este recurso.      |

## Recuperar el ID de sesión de RUM

Recuperar el ID de sesión de RUM puede ser útil para solucionar problemas. Por ejemplo, puedes adjuntar el ID de sesión a solicitudes de soporte, correos electrónicos o informes de errores para que tu equipo de soporte pueda encontrar posteriormente la sesión de usuario en Datadog.

Puedes acceder al identificador de sesión de RUM en el tiempo de ejecución sin esperar al evento `sessionStarted`:

```dart
final sessionId = await DatadogSdk.instance.rum?.getCurrentSessionId()
```

## Establecer el consentimiento de rastreo (cumplimiento de GDPR y CCPA)

Para cumplir con las políticas de protección de datos y privacidad, el SDK de Flutter RUM requiere el valor de consentimiento del rastreo en la inicialización.

El ajuste `trackingConsent` puede ser uno de los siguientes valores:

1. `TrackingConsent.pending`: el SDK de Flutter RUM comienza a recopilar y procesar los datos por lotes, pero no los envía a Datadog. El SDK de Flutter RUM espera al nuevo valor de consentimiento de rastreo para decidir qué hacer con los datos procesados por lotes.
2. `TrackingConsent.granted`: el SDK de Flutter RUM comienza a recopilar los datos y los envía a Datadog.
3. `TrackingConsent.notGranted`: el SDK de Flutter RUM no recopila ningún dato. No se envía ningún log, traza (trace), o eventos de RUM a Datadog.

Para cambiar el valor del consentimiento del rastreo una vez inicializado el SDK de Flutter RUM, utiliza la llamada a la API `DatadogSdk.setTrackingConsent`. El SDK de Flutter RUM cambia su comportamiento en función del nuevo valor.

Por ejemplo, si el consentimiento del rastreo actual es `TrackingConsent.pending` y tu cambias el valor a `TrackingConsent.granted`, el SDK de Flutter RUM envía todos los datos registrados anteriormente y los futuros a Datadog.

Del mismo modo, si cambia el valor de `TrackingConsent.pending` a `TrackingConsent.notGranted`, el SDK de Flutter RUM borra todos los datos y no recopila ningún dato futuro.

## Métricas de rendimiento específicas de Flutter

Para habilitar la recopilación de las métricas de rendimiento específicas de Flutter, establece `reportFlutterPerformance: true` en `DatadogRumConfiguration`. Los tiempos de compilación y de ráster del widget se muestran en [Mobile Vitals][17].

## Configuración de OpenTelemetry

Tanto el paquete [Datadog Tracking HTTP Client][12] y el paquete [gRPC Interceptor][13] admiten trazas distribuidas a través de la generación automática de encabezados y la ingesta de encabezados. Esta sección describe cómo utilizar OpenTelemetry con RUM Flutter.

### Generación de encabezados de Datadog

Al configurar tu cliente de rastreo o gRPC Interceptor, puedes especificar los tipos de encabezados de rastreo que deseas que genere Datadog. Por ejemplo, si deseas enviar encabezados `b3` a `example.com` y encabezados `tracecontext` para `myapi.names`, puedes hacerlo con el siguiente código:

```dart
final hostHeaders = {
    'example.com': { TracingHeaderType.b3 },
    'myapi.names': { TracingHeaderType.tracecontext}
};
```

Puedes utilizar este objeto durante la fase inicial de la configuración:

```dart
// Para el rastreo HTTP de Datadog HTTP por defecto:
final configuration = DatadogConfiguration(
    // configuración
    firstPartyHostsWithTracingHeaders: hostHeaders,
);
```

A continuación, puedes activar el rastreo como de costumbre.

Esta información se fusiona con cualquier host establecido en `DatadogConfiguration.firstPartyHosts`. Los hosts especificados en `firstPartyHosts` generan encabezados de rastreo de Datadog por defecto.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter#setup
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[4]: /es/real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
[5]: https://github.com/DataDog/dd-sdk-flutter/tree/main/packages/datadog_tracking_http_client
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/
[7]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogNavigationObserver-class.html
[8]: https://pub.dev/packages?q=go_router
[9]: https://pub.dev/packages/auto_route
[10]: https://pub.dev/packages/beamer
[11]: https://github.com/flutter/flutter/issues/112196
[12]: https://pub.dev/packages/datadog_tracking_http_client
[13]: https://pub.dev/packages/datadog_grpc_interceptor
[14]: https://github.com/openzipkin/b3-propagation#single-headers
[15]: https://github.com/openzipkin/b3-propagation#multiple-headers
[16]: https://www.w3.org/TR/trace-context/#tracestate-header
[17]: /es/real_user_monitoring/mobile_and_tv_monitoring/mobile_vitals/?tab=flutter