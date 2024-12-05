---
aliases:
- /es/real_user_monitoring/android/web_view_tracking
- /es/real_user_monitoring/ios/web_view_tracking
- /es/real_user_monitoring/flutter/web_view_tracking
- /es/real_user_monitoring/reactnative/web_view_tracking
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: /real_user_monitoring
  tag: Documentación
  text: Explora RUM de Datadog
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration#web-view-instrumentation
  tag: Documentación
  text: Instrumentación de vistas web
title: Rastreo de vistas web
---

## Información general

Real User Monitoring te permite monitorizar vistas web y eliminar puntos ciegos en tus aplicaciones móviles híbridas.

Puedes hacer lo siguiente:

- Rastrear los recorridos de los usuarios en todos los componentes web y nativos en aplicaciones móviles.
- Determinar la causa de la latencia de las páginas web o los componentes nativos de las aplicaciones móviles.
- Prestar asistencia a los usuarios que tienen dificultades para cargar páginas web en dispositivos móviles

También puedes grabar todo el recorrido del usuario en vistas web y nativas en iOS o Android y verlo en una única Repetición de sesión. Más información en [Instrumentar vistas consolidadas del navegador y web móviles][1].

## Configuración

### Requisitos previos

Configura el SDK de RUM Browser en la página web que desees que se represente en tu aplicación móvil. Para obtener más información, consulta [Monitorización de RUM Browser][2].

### Declarar `DatadogWebViewTracking` como dependencia (solo iOS)

Para activar el informe de bloqueos, asegúrate de activar también [RUM][3] o [Logs][4]. A continuación, añade el paquete según tu administrador de dependencias y actualiza tu fragmento de inicialización.

{{< tabs >}}
{{% tab "CocoaPods" %}}

Puedes utilizar [CocoaPods][1] para instalar `dd-sdk-ios`:
```
pod 'DatadogWebViewTracking'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Para integrar con Swift Package Manager de Apple, añade lo siguiente como una dependencia a tu `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

En tu proyecto, vincula las siguientes bibliotecas:
```
DatadogCore
DatadogWebViewTracking
```

{{% /tab %}}
{{% tab "Carthage" %}}

Puedes utilizar [Carthage][1] para instalar `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

En Xcode, vincula los siguientes marcos:
```
DatadogWebViewTracking.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

### Instrumentar tus vistas web

{{< tabs >}}
{{% tab "Android" %}}

1. Si deseas reenviar eventos de RUM desde páginas web, descarga la [última versión][1] del SDK de RUM Android y configura la función RUM siguiendo la [guía dedicada][2].
2. Si deseas reenviar eventos de logs desde páginas web, descarga la [última versión][3] de SDK de logs Android y configura la función logs siguiendo la [guía dedicada][4].
3. Añade la dependencia de Gradle declarando la biblioteca `dd-sdk-android-webview` como dependencia en el archivo `build.gradle` a nivel del módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-webview:x.x.x"
    }
    ```

4. Activa el reastreo de las vistas web con el siguiente fragmento de código:

   ```kotlin
     WebViewTracking.enable(webView, allowedHosts)
   ```

`allowedHosts` coincide con los hosts determinados y su subdominio. No se permite ninguna expresión regular.

[1]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[2]: /es/real_user_monitoring/android/?tab=kotlin#setup
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[4]: /es/logs/log_collection/android/?tab=kotlin#setup

{{% /tab %}}
{{% tab "iOS" %}}

El SDK de RUM iOS proporciona API para controlar el rastreo de vistas web. Para activar el rastreo de vistas web, proporciona la instancia `WKWebView`.

```swift
importar WebKit
importar DatadogWebViewTracking

supongamos que webView = WKWebView(...)
WebViewTracking.enable(webView: webView, hosts: ["example.com"])
```

Para desactivar el rastreo de vistas web:
```swift
WebViewTracking.disable(webView: webView)
```

`allowedHosts` coincide con los hosts determinados y su subdominio. No se permite ninguna expresión regular.

{{% /tab %}}
{{% tab "Flutter" %}}

El SDK de RUM Flutter proporciona API para que puedas controlar el rastreo de vistas web cuando se utiliza el paquete [`webview_flutter`][1]. Para añadir el rastreo de vistas web, llama al método de extensión `trackDatadogEvents` en `WebViewController`, proporcionando el lista de hosts permitidos.

Añade lo siguiente a tu `pubspec.yaml` con la versión más reciente del complemento [`datadog_webview_tracking`][2]:
```yaml
dependencias:
  datadog_webview_tracking: ^x.x.x
```

Por ejemplo:

```dart
importar 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

webViewController = WebViewController()
  ..setJavaScriptMode(JavaScriptMode.unrestricted)
  ..trackDatadogEvents(
    DatadogSdk.instance,
    ['myapp.example'],
  )
  ..loadRequest(Uri.parse('myapp.example'));
```

Ten en cuenta que `JavaScriptMode.unrestricted` es necesario para que el rastreo funcione en Android.
`allowedHosts` coincide con los hosts determinados y su subdominio. No se permite ninguna expresión regular.


[1]: https://pub.dev/packages/webview_flutter
[2]: https://pub.dev/packages/datadog_webview_tracking

{{% /tab %}}
{{% tab "React Native" %}}

1. Añade `react-native-webview` a tu aplicación siguiendo la [documentación oficial de instalación][1].

2. Importa `WebView` desde `@datadog/mobile-react-native-webview` en lugar de `react-native-webview`:

   ```javascript
   import { WebView } from '@datadog/mobile-react-native-webview';
   // or
   import WebView from '@datadog/mobile-react-native-webview';
   ```

3. Puedes utilizar todas las funcionalidades existentes de `react-native-webview`, ya que el componente `WebView` de `@datadog/mobile-react-native-webview` encapsula el componente `react-native-webview`.

4. Proporciona la lista de hosts que Datadog va a rastrear en la vista web utilizando el prop `allowedHosts` de tu componente `WebView`:

   ```javascript
   <WebView
       source={{ uri: 'https://www.example.com' }}
       allowedHosts={['example.com']}
   />
   ```

`allowedHosts` coincide con los hosts determinados y su subdominio. No se permite ninguna expresión regular.

[1]: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Getting-Started.md

{{% /tab %}}
{{< /tabs >}}

### Accede a tus vistas web

Tus vistas web aparecen en [RUM Explorer][5] con los atributos `service` y `source` asociados. El atributo `service` indica el componente web desde el que se genera la vista web y el atributo `source` indica la plataforma de la aplicación móvil, como Android.

Filtra en tus aplicaciones Android y Android TV y haz clic en una sesión. Aparece un panel lateral con una lista de eventos en la sesión.

{{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="Eventos de vistas web capturados en una sesión en el RUM Explorer" style="width:100%;">}}

Haz clic en **Abrir la cascada vistas** para ir de la sesión a una visualización de cascada de recursos en la pestaña de **Rendimiento** de la vista.

## Implicaciones de facturación

Consulta [Facturación de RUM & Session Replay][6] para más detalles sobre cómo afectan las vistas web en aplicaciones móviles a las grabaciones de las sesiones y a la facturación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/real_user_monitoring/session_replay/mobile/setup_and_configuration
[2]: /es/real_user_monitoring/browser/setup/#npm
[3]: /es/real_user_monitoring/ios/
[4]: https://docs.datadoghq.com/es/logs/log_collection/ios
[5]: https://app.datadoghq.com/rum/explorer
[6]: /es/account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing