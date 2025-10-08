---
aliases:
- /es/real_user_monitoring/android/web_view_tracking
- /es/real_user_monitoring/ios/web_view_tracking
- /es/real_user_monitoring/flutter/web_view_tracking
- /es/real_user_monitoring/reactnative/web_view_tracking
- /es/real_user_monitoring/kotlin-multiplatform/web_view_tracking
- /es/real_user_monitoring/kotlin_multiplatform/web_view_tracking
- /es/real_user_monitoring/mobile_and_tv_monitoring/unity/web_view_tracking
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código fuente
  text: Código fuente de dd-sdk-flutter
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente de dd-sdk-reactnative
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: Código fuente
  text: Código fuente dd-sdk-kotlin-multiplatform
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
- link: /real_user_monitoring/session_replay/mobile/setup_and_configuration#web-view-instrumentation
  tag: Documentación
  text: Instrumentación de vistas web
title: Rastreo de vistas web
---

## Información general

Real User Monitoring (RUM) te permite monitorizar vistas web y eliminar puntos ciegos en tus aplicaciones móviles híbridas.

Puedes hacer lo siguiente:

- Rastrear los recorridos de los usuarios en todos los componentes web y nativos en aplicaciones móviles.
- Determinar la causa de la latencia de las páginas web o los componentes nativos de las aplicaciones móviles.
- Prestar asistencia a los usuarios que tienen dificultades para cargar páginas web en dispositivos móviles

También puedes grabar todo el recorrido del usuario en vistas web y nativas en iOS o Android y verlo en una única Repetición de sesión. Más información en [Instrumentar vistas consolidadas del navegador y web móviles][1].

## Configuración

### Requisitos previos

Configura el SDK de RUM Browser en la página web que desees que se represente en tu aplicación móvil. Para obtener más información, consulta [Monitorización de RUM Browser][2].

### Declarar `DatadogWebViewTracking` como dependencia (sólo iOS o Kotlin Multiplataforma)

#### iOS

Para activar Web View Tracking, asegúrate de activar también [RUM][3] o [Logs][4]. A continuación, añade el paquete según tu administrador de dependencias y actualiza tu fragmento de inicialización.

{{< tabs >}}
{{% tab "Android" %}}

Configura el SDK de RUM Browser para la página web que desees que se represente en tu aplicación móvil. Para obtener más información, consulta [RUM Browser Monitoring][1].

[1]: /es/real_user_monitoring/browser/setup/#npm

{{% /tab %}}
{{% tab "iOS" %}}

Configura el SDK de RUM Browser en la página web que desees que se represente en tu aplicación móvil. Para obtener más información, consulta [RUM Browser Monitoring][1].

Para activar Crash Reporting:

1. Asegúrate de activar también [RUM][2] o [Logs][3].
2. Añade el paquete según tu gestor de dependencias.
3. Actualiza tu fragmento de inicialización declarando `DatadogWebViewTracking` como dependencia, como se muestra a continuación.

{{% collapse-content title="CocoaPods" level="h4" %}}
Puedes utilizar [CocoaPods][1] para instalar `dd-sdk-ios`:
```
pod 'DatadogWebViewTracking'
```

[1]: https://cocoapods.org/
{{% /collapse-content %}}

{{% collapse-content title="Swift Package Manager (SPM)" level="h4" %}}

Para una integración utilizando Swift Package Manager de Apple, añade lo siguiente como una dependencia a tu `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

En tu proyecto, vincula las siguientes bibliotecas:
```
DatadogCore
DatadogWebViewTracking
```
{{% /collapse-content %}}

{{% collapse-content title="Carthage" level="h4" %}}

Puedes utilizar [Carthage][1] para instalar `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

En Xcode, vincula los siguientes marcos:
```
DatadogWebViewTracking.xcframework
```

[1]: https://github.com/Carthage/Carthage
{{% /collapse-content %}}

[1]: /es/real_user_monitoring/browser/setup/#npm
[2]: /es/real_user_monitoring/ios/
[3]: https://docs.datadoghq.com/es/logs/log_collection/ios

{{% /tab %}}
{{% tab "Flutter" %}}

Configura el SDK de RUM Browser en la página web que desees que se represente en tu aplicación móvil. Para obtener más información, consulta [RUM Browser Monitoring][1].

[1]: /es/real_user_monitoring/browser/setup/#npm

{{% /tab %}}
{{% tab "React Native" %}}

Configura el SDK de RUM Browser en la página web que desees que se represente en tu aplicación móvil. Para obtener más información, consulta [RUM Browser Monitoring][1].

[1]: /es/real_user_monitoring/browser/setup/#npm

{{% /tab %}}
{{% tab "Kotlin Multiplataforma" %}}

Añade la librería `DatadogWebViewTracking` a tu aplicación siguiendo la guía [aquí][1].

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/setup/kotlin_multiplatform/#add-native-dependencies-for-ios

{{% /tab %}}
{{< /tabs >}}

### Instrumentar tus vistas web

{{< tabs >}}
{{% tab "Android" %}}

1. Si deseas reenviar eventos de RUM desde páginas web, descarga la [última versión][1] del SDK de RUM Android y configura la función RUM siguiendo la [guía dedicada][2].
2. Si deseas reenviar eventos de logs desde páginas web, descarga la [última versión][3] del SDK de Logs Android y configura la función Logs siguiendo la [guía dedicada][4].
3. Añade la dependencia de Gradle declarando la librería `dd-sdk-android-webview` como dependencia en el archivo `build.gradle` a nivel del módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-webview:x.x.x"
    }
    ```

4. Activa el rastreo de las vistas web con el siguiente fragmento de código:

   ```kotlin
     WebViewTracking.enable(webView, allowedHosts)
   ```

`allowedHosts` coincide con los hosts determinados y su subdominio. No se permite ninguna expresión regular.

**Nota**:
Para que la instrumentación funcione en el componente WebView, es muy importante que JavaScript esté habilitado en el WebView. Para habilitarlo, puedes utilizar el siguiente fragmento de código:

```kotlin
    webView.settings.javaScriptEnabled = true
```

[1]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-rum
[2]: /es/real_user_monitoring/android/?tab=kotlin#setup
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-android-logs
[4]: /es/logs/log_collection/android/?tab=kotlin#setup

{{% /tab %}}
{{% tab "iOS" %}}

El SDK de RUM iOS proporciona las API para controlar el rastreo de vistas web. Para activar el rastreo de vistas web, proporciona la instancia `WKWebView`.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView, hosts: ["example.com"])
```

Para desactivar el rastreo de vistas web:
```swift
WebViewTracking.disable(webView: webView)
```

`allowedHosts` coincide con los hosts determinados y su subdominio. No se permite ninguna expresión regular.

{{% /tab %}}
{{% tab "Flutter" %}}

El SDK de RUM Flutter proporciona APIs para que puedas controlar el seguimiento de la vista web con el paquete [`webview_flutter`][1] o [`flutter_inappwebview`][2].

#### Paquete Web view Flutter

Para añadir Web View Tracking cuando utilices `webview_flutter`, añade lo siguiente a tu `pubspec.yaml` con la versión más reciente del complemento [`datadog_webview_tracking`][3]:
```yaml
dependencies:
  datadog_webview_tracking: ^x.x.x
```

A continuación, llama al método de extensión `trackDatadogEvents` en `WebViewController`, proporcionando la lista de hosts permitidos.

Por ejemplo:

```dart
import 'package:datadog_flutter_plugin/datadog_flutter_plugin.dart';

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

#### Paquete Flutter InAppWebView

Para añadir Web View Tracking cuando utilices `flutter_inappwebview`, añade lo siguiente a tu `pubspec.yaml` con la versión más reciente del complemento [`datadog_inappwebview_tracking`][4]:
```yaml
dependencies:
  datadog_webview_tracking: ^x.x.x
```

Para instrumentar un `InAppWebView`, añade el `DatadogInAppWebViewUserScript` a tus `initialUserScripts` y llama al método de extensión `trackDatadogEvents` durante la devolución de llamada `onWebViewCreated`:

```dart
InAppWebView(
  // Other settings...
  initialUserScripts: UnmodifiableListView([
    DatadogInAppWebViewUserScript(
      datadog: DatadogSdk.instance,
      allowedHosts: {'shopist.io'},
    ),
  ]),
  onWebViewCreated: (controller) async {
    controller.trackDatadogEvents(DatadogSdk.instance);
  },
)
```

Para instrumentar un `InAppBrowser`, añade una anulación para `onBrowserCreated` y llama al método de extensión `trackDatadogEvents` en `webViewController`, luego añade un `DatadogInAppWebViewUserScript` al `initialUserScripts` cuando crees tu `InAppBrowser` personalizado:

```dart
class MyInAppBrowser extends InAppBrowser {
  MyInAppBrowser({super.windowId, super.initialUserScripts});

  @override
  void onBrowserCreated() {
    webViewController?.trackDatadogEvents(DatadogSdk.instance);
    super.onBrowserCreated();
  }
}

// Browser creation
_browser = MyInAppBrowser(
  initialUserScripts: UnmodifiableListView(
    [
      DatadogInAppWebViewUserScript(
        datadog: DatadogSdk.instance,
        allowedHosts: {'shopist.io'},
      ),
    ],
  ),
);
```

El parámetro `allowedHosts` de `DatadogInAppWebViewUserScript` coincide con los hosts dados y su subdominio. No se permite ninguna expresión regular.

[1]: https://pub.dev/packages/webview_flutter
[2]: https://pub.dev/packages/flutter_inappwebview
[3]: https://pub.dev/packages/datadog_webview_tracking
[4]: https://pub.dev/packages/datadog_inappwebview_tracking

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
{{% tab "Kotlin Multiplataforma" %}}

1. Si deseas reenviar eventos RUM desde páginas web, descarga la [última versión][1] del SDK RUM Kotlin Multiplataforma y configura RUM siguiendo la [guía dedicada][2].
2. Si deseas reenviar eventos de log procedentes de páginas web, descarga la [última versión][3] del SDK Kotlin Multiplataforma de logs y configura logs siguiendo la [guía dedicada][4].
3. Añade la dependencia Gradle para el conjunto de fuentes comunes declarando la librería `dd-sdk-kotlin-multiplatform-webview` como dependencia en el archivo `build.gradle.kts` a nivel de módulo:

    ```kotlin
    kotlin {
      // ...
      sourceSets {
        commonMain.dependencies {
          implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-webview:x.x.x")
        }
      }
    }
    ```

4. Activa el rastreo de las vistas web con el siguiente fragmento de código:

   ```kotlin
     // call it in Android or iOS source set, not in the common one
     WebViewTracking.enable(webView, allowedHosts)
   ```

5. Desactiva el seguimiento de vistas web una vez que la instancia de vista web puede ser lanzada (sólo iOS):

   ```kotlin
     // call it in iOS source set, not in the common one
     WebViewTracking.disable(webView, allowedHosts)
   ```

`allowedHosts` coincide con los hosts dados y su subdominio. No se permiten expresiones regulares.

[1]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-rum
[2]: /es/real_user_monitoring/kotlin_multiplatform/#setup
[3]: https://search.maven.org/artifact/com.datadoghq/dd-sdk-kotlin-multiplatform-logs
[4]: /es/logs/log_collection/kotlin_multiplatform/#setup

{{% /tab %}}
{{< /tabs >}}

### Accede a tus vistas web

Tus vistas web aparecen en [RUM Explorer][5] con los atributos `service` y `source` asociados. El atributo `service` indica el componente web desde el que se genera la vista web y el atributo `source` indica la plataforma de la aplicación móvil, como Android.

Para acceder a tus vistas web:

1. Navega a **Digital Experiences > Real User Monitoring > (Sessions) Explorer** (Experiencias digitales > Sessions Explorer).
2. Crea una consulta para filtrar lo siguiente:
   - Tus aplicaciones Android y Android TV utilizando `application.id` o `application.name`
   - El componente web que utiliza `service`
   - La plataforma que utiliza `source`

   **Nota**: Si ves números de versión no reconocidos que informan en tu aplicación móvil, es posible que pertenezcan a la versión del SDK Browser. En ese caso, puedes filtrar la sesión de la plataforma del navegador. Por ejemplo, `source: react-native`.
3. Haz clic en una sesión. Aparece un panel lateral con una lista de eventos en la sesión.

   {{< img src="real_user_monitoring/android/android-webview-tracking.png" alt="Eventos de vistas web capturados en una sesión en el RUM Explorer" style="width:100%;">}}

   Cualquier servicio con el icono web indica una vista web.

Desde aquí, puedes pasar el ratón por encima de un evento de sesión y hacer clic en **Open View waterfall** (Abrir vista de cascada) para navegar desde la sesión a una visualización de cascada de recursos en la pestaña **Performance** (Rendimiento) de la vista.

## Implicaciones de facturación

Consulta [Facturación de RUM & Session Replay][6] para más detalles sobre cómo afectan las vistas web en aplicaciones móviles a las grabaciones de las sesiones y a la facturación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/session_replay/mobile/setup_and_configuration/#web-view-instrumentation
[2]: /es/real_user_monitoring/browser/setup/#npm
[3]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/setup
[4]: /es/logs/log_collection/ios
[5]: https://app.datadoghq.com/rum/explorer
[6]: /es/account_management/billing/rum/#how-do-webviews-in-mobile-applications-impact-session-recordings-and-billing
