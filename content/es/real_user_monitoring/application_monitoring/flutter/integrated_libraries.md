---
aliases:
- /es/real_user_monitoring/flutter/integrated_libraries/
- /es/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/flutter
- /es/real_user_monitoring/mobile_and_tv_monitoring/flutter/integrated_libraries
description: Integre bibliotecas populares de Flutter con el kit de desarrollo de
  software (SDK) de RUM para la monitorización automática de las solicitudes HTTP,
  la navegación y otras funciones de la aplicación.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código source (fuente)
  text: Código source (fuente) de dd-sdk-flutter
title: Bibliotecas de Flutter para RUM
---

Esta página enumera las bibliotecas integradas que puedes utilizar para las aplicaciones Flutter.

## Enrutamiento y seguimiento automático de vistas

Si utilizas Flutter Navigator v2.0, tu configuración para el seguimiento automático de vistas varía en función de tu middleware de enrutamiento. En esta sección, se explica cómo integrarlo con los paquetes de enrutamiento más populares.

### go_router

Dado que [go_router][2] utiliza la misma interfaz de observador que Flutter Navigator v1, puedes añadir `DatadogNavigationObserver` a otros observadores como parámetro de `GoRouter`.

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

Si estás usando ShellRoutes, debes suministrar un observador separado a cada `ShellRoute`, como se muestra a continuación. Consulta [este error][3] para obtener más información.

```dart
final _router = GoRouter(
  routes: [
    ShellRoute(build: shellBuilder),
    routes: [
      // Additional routes
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
  // Your remaining setup
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

[AutoRoute][4] puede utilizar un `DatadogNavigationObserver` proporcionado como uno de los `navigatorObservers` como parte de su método de `config`.

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

Este nuevo objeto sustituye al `DatadogNavigationObserver` más sencillo.

### Beamer

[Beamer][5] puede utilizar `DatadogNavigationObserver` como argumento para `BeamerDelegate`:

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

## Seguimiento de vistas web

Real User Monitoring (RUM) te permite monitorizar vistas web y eliminar puntos ciegos en tus aplicaciones móviles híbridas.

El SDK de Flutter de Datadog tiene paquetes para trabajar tanto con [`webview_flutter`][8] como con [`flutter_inappwebview`][9]. Para obtener más información, consulta la [página de documentación del seguimiento de vistas web][10].

## gRPC

Datadog proporciona [`datadog_grpc_interceptor`][6] para su uso con el [paquete de grpc Flutter][7]. El interceptor gRPC rastrea automáticamente las solicitudes gRPC como recursos de RUM y permite el rastreo distribuido con APM.

### Configuración

Añade `datadog_grpc_interceptor` a tu `pubspec.yaml` o ejecuta `flutter pub add datadog_grpc_interceptor` desde tu terminal:

```yaml
dependencies:
  # Other dependencies
  datadog_grpc_interceptor: ^1.1.0
```

Para utilizar este complemento, crea una instancia de `DatadogGrpcInterceptor`, luego pásala a tu cliente gRPC generado:

```dart
import 'package:datadog_grpc_interceptor/datadog_grpc_interceptor.dart'

// Initialize Datadog - be sure to set the [DatadogConfiguration.firstPartyHosts] member
// Enable Datadog Distributed Tracing
final config = DatadogConfiguration(
  // ...
  firstPartyHosts = ['localhost']
)

// Create the gRPC channel
final channel = ClientChannel(
  'localhost',
  port: 50051,
  options: ChannelOptions(
    // ...
  ),
);

// Create the gRPC interceptor with the supported channel
final datadogInterceptor = DatadogGrpcInterceptor(DatadogSdk.instance, channel);

// Create the gRPC client, passing in the Datadog interceptor
final stub = GreeterClient(channel, interceptors: [datadogInterceptor]);
```

## GraphQL (gql_link)

Datadog proporciona [`datadog_gql_link`][1] para su uso con la mayoría de bibliotecas de GraphQL Flutter, incluyendo `graphql_flutter` y `ferry`. El enlace rastrea automáticamente las solicitudes GraphQL como recursos de RUM, añade nombres de consulta, nombres de mutación y variables como atributos del recurso y permite el rastreo distribuido en APM.

### Configuración

Añade `datadog_gql_link` a tu `pubspec.yaml` o ejecuta `flutter pub add datadog_gql_link` desde tu terminal:

```yaml
dependencies:
  # Other dependencies
  datadog_gql_link: ^1.0.0
```

Cuando creas tu enlace GraphQL, añade el `DatadogGqlLink` encima de tu enlace de terminación. Por ejemplo:

```dart
final graphQlUrl = "https://example.com/graphql";

final link = Link.from([
  DatadogGqlLink(DatadogSdk.instance, Uri.parse(graphQlUrl)),
  HttpLink(graphQlUrl),
]);
```

Si estás rastreando llamadas a redes que no sean GraphQL con `datadog_tracking_http_client`, debes configurar el complemento de rastreo para ignorar las solicitudes a tu endpoint de GraphQL. De lo contrario, los recursos de GraphQL se reportan dos veces, y las trazas de APM pueden romperse. Ignora tu endpoints de GraphQL usando el parámetro `ignoreUrlPatterns` añadido a `datadog_tracking_http_client` versión 2.1.0.

```dart
final datadogConfig = DatadogConfiguration(
    // Tu configuración
  )..enableHttpTracking(
      ignoreUrlPatterns: [
        RegExp('example.com/graphql'),
      ],
    );
```

## Dio

<div class="alert alert-info">
Para la mayoría de las configuraciones de Dio, utiliza Datadog Tracking Http Client en lugar del interceptor Dio especializado. Solo utiliza el interceptor Dio si estás utilizando un <code>HttpClientAdapter</code> de Dio no estándar que no se puede rastrear con Datadog Tracking Http Client.
</div>

Datadog proporciona [`datadog_dio`][6] para su uso con el [paquete Dio Flutter][7]. El interceptor de Dio rastrea automáticamente las solicitudes de un cliente de Dio dado como recursos de RUM y permite el rastreo distribuido con APM.

### Instalación

Añade `datadog_dio` a tu `pubspec.yaml` o ejecutando `flutter pub add datadog_dio` desde tu terminal:

```yaml
dependencies:
  # Other dependencies
  datadog_dio: ^1.0.0
```

Para utilizar este complemento, llama a `addDatadogInterceptor` al final de la inicialización de tu Dio:

```dart
import 'package:datadog_dio/datadog_dio.dart'

// Initialize Datadog - be sure to set the [DatadogConfiguration.firstPartyHosts] member
// Enable Datadog Distributed Tracing
final config = DatadogConfiguration(
  // ...
  firstPartyHosts = ['localhost']
)

// Create our Dio client
final dio = Dio()
  // Dio configuration...
  ..addDatadogInterceptor(DatadogSdk.instance);
```

Al llamar a `addDatadogInterceptor` se añade el interceptor de Datadog como el primer interceptor de tu lista. Esto asegura que todas las solicitudes de red de Dio se envíen a Datadog, ya que otros interceptores pueden no reenviar la información hacia abajo en la cadena. Llama a `addDatadogInterceptor` después de finalizar el resto de la configuración de Dio.

### Utilización con otro rastreo de red de Datadog

Para rastrear todas las solicitudes de red, incluidas las realizadas por `dart:io` y widgets como `NetworkImage`, utiliza `datadog_tracking_http_client` para capturar estas solicitudes. Sin embargo, según tu configuración, el método de sustitución global utilizado en `enableHttpTracking` puede hacer que los recursos se informen doblemente (una vez por la sustitución global y otra por el interceptor de Dio)

Para evitar esto, utiliza el parámetro `ignoreUrlPatterns` cuando llames a `enableHttpTracking` para ignorar las solicitudes realizadas por tu cliente Dio.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pub.dev/packages/datadog_gql_link
[2]: https://pub.dev/packages?q=go_router
[3]: https://github.com/flutter/flutter/issues/112196
[4]: https://pub.dev/packages/auto_route
[5]: https://pub.dev/packages/beamer
[6]: https://pub.dev/packages/datadog_grpc_interceptor
[7]: https://pub.dev/packages/grpc
[8]: https://pub.dev/packages/webview_flutter
[9]: https://pub.dev/packages/flutter_inappwebview
[10]: /es/real_user_monitoring/application_monitoring/web_view_tracking?tab=flutter
[11]: https://pub.dev/packages/datadog_dio