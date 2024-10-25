---
aliases:
- /es/real_user_monitoring/flutter/
- /es/real_user_monitoring/flutter/setup
code_lang: flutter
code_lang_weight: 30
description: Recopila datos de RUM de tus proyectos Flutter.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter
  tag: Documentación
  text: Configuración avanzada de RUM Flutter
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código fuente
  text: Código fuente de dd-sdk-flutter
- link: real_user_monitoring/explorer/
  tag: Documentación
  text: Aprende a explorar tus datos de RUM
- link: https://www.datadoghq.com/blog/monitor-flutter-application-performance-with-mobile-rum/
  tag: Blog
  text: Monitorizar el rendimiento de la aplicación Flutter con Datadog Mobile RUM
title: Configuración de monitorización de RUM Flutter
type: multi-code-lang
---
## Información general

Datadog Real User Monitoring (RUM) te permite visualizar y analizar el rendimiento en tiempo real y los recorridos de cada usuario de tu aplicación.

## Configuración

### Especificar los detalles de la aplicación en la interfaz de usuario

1. En Datadog, navega a [**Digital Experience** > **Add an Application**][1] (Experiencia digital > Añadir una aplicación).
2. Elige `Flutter` como tipo de aplicación.
3. Proporciona un nombre de aplicación para generar un ID de aplicación de Datadog y un token de cliente únicos.
4. Para desactivar la recopilación automática de datos del usuario para la IP del cliente o los datos de geolocalización, desactiva las casillas de esas configuraciones. Para obtener más información, consulta [Recopilación de datos de RUM Flutter][7].

   {{< img src="real_user_monitoring/flutter/flutter-new-application.png" alt="Crear una aplicación RUM para Flutter en Datadog" style="width:90%;">}}

Para garantizar la seguridad de tus datos, utiliza un token de cliente. Para obtener más información sobre cómo configurar un token de cliente, consulta la [Documentación sobre tokens de cliente][2].

### Instrumentar tu solicitud

En primer lugar, asegúrate de tener tu entorno configurado correctamente para cada plataforma.

<div class="alert alert-info">
Datadog es compatible con la monitorización de Flutter para iOS y Android para Flutter 3.0+.
</div>

Datadog no es compatible oficialmente con Flutter Web, pero el actual SDK de Flutter para aplicaciones móviles permite obtener alguna monitorización predefinida. Estas son las limitaciones conocidas:
  * Todas las acciones notificadas desde Flutter se etiquetan con el tipo `custom`.
  * No se admiten acciones de ejecución prolongada (`startAction` / `stopAction`).
  * No se admite la notificación manual de recursos de RUM (`startResource` / `stopResource`).
  * Los asignadores de eventos no son compatibles actualmente.
  * Las etiquetas (tags) en los registradores no son compatibles actualmente.
  * `addUserExtraInfo` no es compatible.
  * `stopSession` no es compatible.

No está prevista la compatibilidad con Flutter Web, pero las prioridades de Datadog se reevalúan a menudo en función de tus comentarios. Si tienes una aplicación Flutter Web y quieres utilizar Datadog RUM para monitorizar tu rendimiento, ponte en contacto con tu equipo de atención al cliente y solicita esta característica.

#### iOS

Tu archivo iOS Podfile, ubicado en `ios/Podfile`, debe tener `use_frameworks!` configurado en true (que es el valor predeterminado en Flutter) y debes configurar su versión de iOS de destino >= 11.0.

Esta restricción suele comentarse en la línea superior del Podfile y debe decir:

```ruby
platform :ios, '11.0'
```

Puedes sustituir `11.0` con cualquier versión mínima de iOS que desees admitir que sea 11.0 o superior.

#### Android

Para Android, tu versión de `minSdkVersion` debe ser >= 21 y si estás utilizando Kotlin, debe ser una versión >= 1.8.0. Estas restricciones suelen estar en tu archivo `android/app/build.gradle`.

### Web

Para Web, añade lo siguiente a tu `index.html` debajo de la etiqueta `head` , para el sitio **{{<region-param key="dd_site_name">}}**:
{{< site-region region="us" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v5/datadog-logs.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum-slim.js"></script>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v5.js"></script>
<script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v5.js"></script>
```
{{</ site-region>}}

Esto carga los SDK del navegador Datadog entregados por CDN para logs y RUM. La versión síncrona entregada por CDN del SDK del navegador es la única compatible con el complemento Flutter de Datadog.

#### Añadir el complemento

1. Añade lo siguiente a tu archivo `pubspec.yaml`:

   ```yaml
   dependencies:
     datadog_flutter_plugin: ^2.0.0
   ```
2. Crea un objeto de configuración para cada característica de Datadog (como logs o RUM) con el siguiente fragmento. Si no pasas una configuración para una característica determinada, esa característica se desactiva.

   ```dart
   // Determine the user's consent to be tracked
   final trackingConsent = ...
   final configuration = DatadogConfiguration(
     clientToken: '<CLIENT_TOKEN>',
     env: '<ENV_NAME>',
     site: DatadogSite.us1,
     nativeCrashReportEnabled: true,
     loggingConfiguration: DatadogLoggingConfiguration(),
     rumConfiguration: DatadogRumConfiguration(
       applicationId: '<RUM_APPLICATION_ID>',
     )
   );
   ```

Para más información sobre las opciones disponibles de configuración, consulta la [Documentación del objeto DatadogConfiguration][3].

Para garantizar la seguridad de tus datos, utiliza un token de cliente. No puedes utilizar claves de la API de Datadog para configurar el complemento de Datadog Flutter.

- Si utilizas RUM, configura un **Token de cliente** y un **ID de aplicación**.
- Si solo utilizas logs, inicializa la biblioteca con un token de cliente.

## Instrumentar tu solicitud

### Inicializar la biblioteca

Puedes inicializar RUM utilizando uno de dos métodos de tu archivo `main.dart`.

1. Utiliza `DatadogSdk.runApp` que configura automáticamente [Rastreo de errores][4].

   ```dart
   await DatadogSdk.runApp(configuration, TrackingConsent.granted, () async {
     runApp(const MyApp());
   })
   ```

2. Como alternativa, configura manualmente [Rastreo de errores][4] y el rastreo de recursos. `DatadogSdk.runApp` llama a `WidgetsFlutterBinding.ensureInitialized`, por lo que si no utilizas `DatadogSdk.runApp`, deberás llamar a este método antes de llamar a `DatadogSdk.instance.initialize`.

   ```dart
   WidgetsFlutterBinding.ensureInitialized();
   final originalOnError = FlutterError.onError;
   FlutterError.onError = (details) {
     DatadogSdk.instance.rum?.handleFlutterError(details);
     originalOnError?.call(details);
   };
   final platformOriginalOnError = PlatformDispatcher.instance.onError;
   PlatformDispatcher.instance.onError = (e, st) {
     DatadogSdk.instance.rum?.addErrorInfo(
       e.toString(),
       RumErrorSource.source,
       stackTrace: st,
     );
     return platformOriginalOnError?.call(e, st) ?? false;
   };
   await DatadogSdk.instance.initialize(configuration, TrackingConsent.granted);
   runApp(const MyApp());
   ```

### Muestreo de sesiones de RUM

Para controlar los datos que tu aplicación envía a Datadog RUM, puedes especificar una frecuencia de muestreo para las sesiones de RUM, mientras inicializas el SDK de Flutter RUM como un porcentaje entre 0 y 100. De forma predeterminada, `sessionSamplingRate` se configura en 100 (conservar todas las sesiones).

Por ejemplo, para conservar solo el 50 % de las sesiones, utiliza:

```dart
configuración final = DatadogConfiguration(
    // otra configuración...
    rumConfiguration: DatadogRumConfiguration(
        applicationId: '<YOUR_APPLICATION_ID>',
        sessionSamplingRate: 50.0,
    ),
);
```

### Configurar el consentimiento del rastreo

Para cumplir con la normativa del Reglamento general de protección de datos (RGPD), el SDK de Datadog Flutter requiere el valor `trackingConsent` en la inicialización.

Configura `trackingConsent` en uno de los siguientes valores:

- `TrackingConsent.pending`: El SDK de Datadog Flutter comienza a recopilar y procesar los datos por lotes, pero no los envía a Datadog. Espera al nuevo valor de consentimiento de rastreo para decidir qué hacer con los datos procesados por lotes.
- `TrackingConsent.granted`: El SDK de Datadog Flutter comienza a recopilar los datos y los envía a Datadog.
- `TrackingConsent.notGranted`: El SDK de Flutter Datadog no recopila ningún dato, lo que significa que no se envía ningún log, traza (trace) ni evento de RUM a Datadog.

Para cambiar el valor del consentimiento del rastreo después de la inicialización del SDK, utiliza la llamada a la API `DatadogSdk.setTrackingConsent`.

El SDK cambia su comportamiento según el nuevo valor. Por ejemplo, si el consentimiento de rastreo actual es `TrackingConsent.pending`:

- Si lo cambias a `TrackingConsent.granted`, el SDK envía todos los datos actuales y futuros a Datadog;
- Si lo cambias a `TrackingConsent.notGranted`, el SDK borra todos los datos actuales y no recopila ningún dato futuro.

## Rastrear vistas automáticamente

### Flutter Navigator v1

El complemento de Datadog Flutter puede rastrear automáticamente rutas con nombre utilizando el `DatadogNavigationObserver` en tu MaterialApp:

```dart
MaterialApp(
  inicio: HomeScreen(),
  navigatorObservers: [
    DatadogNavigationObserver(DatadogSdk.instance),
  ],
);
```

Esto funciona si estás utilizando rutas con nombre o si has proporcionado un nombre al parámetro `settings` de tu `PageRoute`.

Si no utilizas rutas con nombre, puedes utilizar `DatadogRouteAwareMixin` junto con el widget `DatadogNavigationObserverProvider` para iniciar y detener tus vistas de RUM automáticamente. Con `DatadogRouteAwareMixin`, cambia cualquier lógica de `initState` a `didPush`.

### Flutter Navigator v2

Si estás utilizando Flutter Navigator v2.0, que utiliza el constructor con nombre `MaterialApp.router`, la configuración varía en función del middleware de enrutamiento que estés utilizando, si lo hay. Dado que [`go_router`][11] utiliza la misma interfaz de observador que Flutter Navigator v1, se puede añadir`DatadogNavigationObserver` a otros observadores como parámetro de `GoRouter`.

``dart
final _router = GoRouter(
  rutas: [
    // Tu información de ruta aquí
  ],
  observadores: [
   DatadogNavigationObserver(datadogSdk: DatadogSdk.instance),
  ],
);
MaterialApp.router(
  routerConfig: _router,
  // Tu configuración restante
)
```

Para ver ejemplos que utilizan enrutadores distintos de `go_router`, consulta [Configuración avanzada - Rastreo automático de vistas][12].


### Cambiar el nombre de las vistas

Para todas las configuraciones, puedes cambiar el nombre de las vistas o proporcionar rutas personalizadas proporcionando una devolución de llamada [`viewInfoExtractor`][8]. Esta función puede volver al comportamiento predeterminado del observador llamando a `defaultViewInfoExtractor`. Por ejemplo:

``dart
infoExtractor(Ruta<dynamic> ruta) {
  nombre de variable = route.settings.name;
  si (nombre == 'my_named_route') {
    devolver RumViewInfo(
      nombre: 'MyDifferent_Name',
      atributos: {'extra_attribute': 'attribute_value'},
    );
  }

  devolver defaultViewInfoExtractor(route);
}

observador de variable = DatadogNavigationObserver(
  datadogSdk: DatadogSdk.instance,
  viewInfoExtractor: infoExtractor,
);
```

## Rastreo automático de los recursos

Utiliza el paquete [Rastreo de Datadog del cliente HTTP][5] para activar el rastreo automático de recursos y llamadas HTTP desde tus vistas de RUM.

Añade el paquete a tu `pubspec.yaml` y añade lo siguiente a tu archivo de inicialización:

``dart
configuración final = DatadogConfiguration(
  // configuración
  firstPartyHosts: ['example.com'],
)..enableHttpTracking()
```

**Nota**: El rastreo de Datadog del cliente HTTP modifica [`HttpOverrides.global`][9]. Si estás utilizando tu propio `HttpOverrides` personalizado, puede que necesites heredar de [`DatadogHttpOverrides`][10]. En este caso, no necesitas llamar a `enableHttpTracking`. Las versiones de `datadog_tracking_http_client` >= 1.3 hacen un check del valor de `HttpOverrides.current` y lo utilizan para la creación de clientes, por lo que solo necesitas asegurarte de inicializar `HttpOverrides.global` antes de inicializar Datadog.

Para activar [Rastreo distribuido][6] de Datadog, configura la propiedad `DatadogConfiguration.firstPartyHosts` en tu objeto de configuración en un dominio que sea compatible con el rastreo distribuido. También puedes modificar la frecuencia de muestreo para el rastreo distribuido configurando la propiedad `tracingSamplingRate` en tu objeto `DatadogRumConfiguration`.

- `firstPartyHosts` no permite comodines, pero coincide con cualquier subdominio de un dominio determinado. Por ejemplo, `api.example.com` coincide con `staging.api.example.com` y `prod.api.example.com`, no con `news.example.com`.

- `DatadogRumConfiguration.traceSampleRate` configura una tasa de muestreo por defecto del 20 %. Si deseas que todas las solicitudes de recursos generen una traza distribuida completa, configura este valor en `100.0`.


## Rastreo automático de las acciones

Utiliza [`RumUserActionDetector`][13] para rastrear las pulsaciones del usuario que se producen en un determinado árbol de widgets:

``dart
RumUserActionDetector(
  rum: DatadogSdk.instance.rum,
  secundario: Scaffold(
    appBar: AppBar(
      título: const Text('RUM'),
    ),
    cuerpo: // Resto de tu aplicación
  ),
);
```

`RumUserActionDetector` detecta automáticamente las acciones pulsadas del usuario que se producen en su árbol y las envía a RUM. Detecta interacciones con varios widgets frecuentes de Flutter.

Para la mayoría de los tipos de botones, el detector busca un widget `Text` secundario, que utiliza para la descripción de la acción. En otros casos, busca un objeto `Semantics` secundario o un `Icon` con su propiedad `Icon.semanticsLabel` configurada.

Alternativamente, puedes encerrar cualquier árbol de widgets con una [`RumUserActionAnnotation`][14], que utiliza la descripción proporcionada al informar de las acciones del usuario detectadas en el árbol secundario, sin cambiar la semántica del árbol.

```dart
Contenedor(
  margen: const EdgeInsets.all(8),
  secundario: RumUserActionAnnotation(
    descripción: 'My Image Button',
    secundario: InkWell(
      onTap: onTap,
      secundario: Columna(
        secundarios: [
          FadeInImage.memoryNetwork(
            marcador de posición: kTransparentImage,
            imagen: imagen,
          ),
          centro(
            secundario: Texto(
              texto,
              estilo: theme.textTheme.headlineSmall,
            ),
          )
        ],
      ),
    ),
  ),
);
```

## Envío de datos cuando el dispositivo está desconectado

RUM garantiza la disponibilidad de los datos cuando el dispositivo del usuario está desconectado. En los casos de zonas con baja conexión de red o cuando la carga de la batería del dispositivo es demasiado baja, todos los eventos de RUM se almacenan primero en el dispositivo local por lotes. Se envían en cuanto red está disponible y la carga de la batería es lo suficientemente alta como para garantizar que el SDK de RUM de Flutter no afecte a la experiencia del usuario final. Si la red no está disponible cuando la aplicación se ejecuta en primer plano o si falla una carga de datos, el lote se guarda hasta que pueda enviarse correctamente.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato.

**Nota**: Los datos del disco se eliminan automáticamente si se vuelven demasiado antiguos para garantizar que el SDK de Flutter RUM no utilice demasiado espacio del disco.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[4]: /es/real_user_monitoring/error_tracking/flutter
[5]: https://pub.dev/packages/datadog_tracking_http_client
[6]: /es/serverless/distributed_tracing
[7]: /es/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html
[9]: https://api.flutter.dev/flutter/dart-io/HttpOverrides/current.html
[10]: https://pub.dev/documentation/datadog_tracking_http_client/latest/datadog_tracking_http_client/DatadogTrackingHttpOverrides-class.html
[11]: https://pub.dev/packages/go_router
[12]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/flutter#automatic-view-tracking
[13]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionDetector-class.html
[14]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/RumUserActionAnnotation-class.html