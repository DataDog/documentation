---
aliases:
- /es/real_user_monitoring/ios
- /es/real_user_monitoring/ios/getting_started
- /es/real_user_monitoring/ios/swiftui/
- /es/real_user_monitoring/swiftui/
- /es/real_user_monitoring/mobile_and_tv_monitoring/swiftui/
beta: true
code_lang: ios
code_lang_weight: 20
description: Recopila datos de RUM de tus aplicaciones iOS y tvOS.
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/ios
  tag: Documentación
  text: Configuración avanzada de RUM iOS
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
- link: /real_user_monitoring
  tag: Documentación
  text: Aprender a explorar tus datos de RUM
- link: /real_user_monitoring/error_tracking/ios/
  tag: Documentación
  text: Aprender a rastrear los errores de iOS
- link: /real_user_monitoring/ios/swiftui/
  tag: Documentación
  text: Aprender a instrumentar aplicaciones SwiftUI
- link: /real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/
  tag: Documentación
  text: Versiones compatibles de la monitorización de RUM iOS y tvOS
title: Configuración de monitorización de RUM iOS y tvOS
type: multi-code-lang
---

## Información general

Datadog Real User Monitoring (RUM) te permite visualizar y analizar el rendimiento en tiempo real y los recorridos de cada usuario de tu aplicación.

## Configuración

1. Declarar el SDK como dependencia.
2. Especificar los detalles de la aplicación en la interfaz de usuario
3. Inicializar la biblioteca.
4. Inicializa el monitor de RUM, `DatadogURLSessionDelegate`, para iniciar el envío de datos.

**Nota:** La versión mínima compatible con el SDK de Datadog iOS es iOS v11+. El SDK de Datadog iOS también es compatible con tvOS.

### Declarar el SDK como dependencia

Declara la biblioteca como una dependencia en función de tu gestor de paquetes. El Swift Package Manager (SPM) es recomendado.

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Para integrar con Swift Package Manager de Apple, añade lo siguiente como una dependencia a tu `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

En tu proyecto, vincula las siguientes bibliotecas:
```
DatadogCore
DatadogRUM
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

Puedes utilizar [CocoaPods][1] para instalar `dd-sdk-ios`:
```
pod 'DatadogCore'
pod 'DatadogRUM'
```


[1]: https://cocoapods.org/
{{% /tab %}}
{{% tab "Carthage" %}}

Puedes utilizar [Carthage][1] para instalar `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

En Xcode, vincula los siguientes marcos:
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```


[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

### Especificar los detalles de la aplicación en la interfaz de usuario

1. Ve a [**Digital Experience** > **Add an Application**][8] (Experiencia digital > Añadir una aplicación).
2. Selecciona `iOS` como tipo de aplicación e introduce un nombre de aplicación para generar un ID de aplicación de Datadog y un token de cliente únicos.
3. Para instrumentar tus vistas web, haz clic en el conmutador  **Instrument your webviews** (Instrumentar tus vistas web). Para obtener más información, consulta [Rastreo de vistas web][9].
4. Para deshabilitar la recopilación automática de datos del usuario, ya sea para la IP del cliente o los datos de geolocalización, desmarca las casillas para esas configuraciones. Para obtener más información, consulta [Datos recopilados de RUM iOS][10].

   {{< img src="real_user_monitoring/ios/ios-create-application.png" alt="Crear una aplicación RUM para iOS en Datadog" style="width:100%;border:none" >}}

Para asegurar la seguridad de tus datos, debes utilizar un token de cliente. Si solo utilizaras [claves de API de Datadog][11] para configurar la biblioteca `dd-sdk-ios`, estarían expuestos del lado del cliente en el código de byte de la aplicación de iOS.

Para más información sobre cómo configurar un token de cliente, consulta la [documentación sobre tokens de cliente][12].

### Inicializar la biblioteca

En el fragmento de inicialización, establece un nombre de entorno, un nombre de servicio y un número de versión. En los ejemplos siguientes, `app-name` especifica la variante de la aplicación que genera datos.

Para más información, consulta [Uso de etiquetas][13].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .eu1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us3,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us3];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us5,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us5];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .us1_fed,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap1,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

El SDK de RUM iOS rastrea automáticamente las sesiones de usuario en función de las opciones proporcionadas en la inicialización del SDK. Para añadir el cumplimiento de GDPR para tus usuarios de EU y otros [parámetros de inicialización][14] a la configuración del SDK, consulta la [documentación de Establecer el consentimiento de rastreo][15].

### Inicializar el monitor de RUM y activar `URLSessionInstrumentation`

Configura y registra el monitor de RUM. Solo tienes que hacerlo una vez, normalmente en tu código `AppDelegate`:

{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    applicationID: "<rum application id>",
    uiKitViewsPredicate: DefaultUIKitRUMViewsPredicate(),
    uiKitActionsPredicate: DefaultUIKitRUMActionsPredicate(),
    urlSessionTracking: RUM.Configuration.URLSessionTracking()
  )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.uiKitViewsPredicate = [DDDefaultUIKitRUMViewsPredicate new];
configuration.uiKitActionsPredicate = [DDDefaultUIKitRUMActionsPredicate new];
[configuration setURLSessionTracking:[DDRUMURLSessionTracking new]];

[DDRUM enableWith:configuration];
```
{{% /tab %}}
{{% /tabs %}}

Para monitorizar las solicitudes enviadas desde la instancia `URLSession` como recursos, activa `URLSessionInstrumentation` para tu tipo de delegado y pasa la instancia de delegado a la instancia `URLSession`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
URLSessionInstrumentation.enable(
    with: .init(
        delegateClass: <YourSessionDelegate>.self
    )
)

let session = URLSession(
    configuration: .default,
    delegate: <YourSessionDelegate>(),
    delegateQueue: nil
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDURLSessionInstrumentationConfiguration *config = [[DDURLSessionInstrumentationConfiguration alloc] initWithDelegateClass:[<YourSessionDelegate> class]];
[DDURLSessionInstrumentation enableWithConfiguration:config];

NSURLSession *session = [NSURLSession sessionWithConfiguration:[NSURLSessionConfiguration defaultSessionConfiguration]
                                                      delegate:[[<YourSessionDelegate> alloc] init]
                                                 delegateQueue:nil];
```
{{% /tab %}}
{{< /tabs >}}

### Muestrear sesiones de RUM

Para controlar los datos que tu aplicación envía a Datadog RUM, puedes especificar una frecuencia de muestreo para las sesiones de RUM mientras [inicializas el SDK de RUM iOS][16] como un porcentaje entre 0 y 100.

Por ejemplo, para conservar solo el 50% del uso de las sesiones:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<rum application id>",
    sessionSampleRate: 50
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<rum application id>"];
configuration.sessionSampleRate = 50;
```
{{% /tab %}}
{{< /tabs >}}

### Instrumentar vistas

El SDK de Datadog iOS para RUM permite instrumentar vistas de aplicaciones `SwiftUI`. La instrumentación también funciona con aplicaciones híbridas `UIKit` y `SwiftUI`.

Para instrumentar una `SwiftUI.View`, añade el siguiente método a la declaración de tu vista:

```swift
import SwiftUI
import DatadogRUM

struct FooView: View {

    var body: some View {
        FooContent {
            ...
        }
        .trackRUMView(name: "Foo")
    }
}
```

El método `trackRUMView(name:)` inicia y detiene una vista de RUM cuando la vista `SwiftUI` aparece y desaparece de la pantalla.

### Instrumentar acciones de toque

El SDK de Datadog iOS para RUM permite instrumentar acciones de toque de aplicaciones `SwiftUI`. La instrumentación también funciona con aplicaciones híbridas `UIKit` y `SwiftUI`.

Para instrumentar una acción de toque en una `SwiftUI.View`, añade el siguiente método a tu declaración de vista:

```swift
import SwiftUI
import DatadogRUM

struct BarView: View {

    var body: some View {
        Button("BarButton") { {
            ...
        }
        .trackRUMTapAction(name: "Bar")
    }
}
```

## Rastrear eventos en segundo plano

<div class="alert alert-info"><p>El rastreo de eventos en segundo plano puede dar lugar a sesiones adicionales, lo que puede afectar a la facturación. Si tienes dudas, <a href="https://docs.datadoghq.com/help/">contacta con el equipo de soporte de Datadog.</a></p>
</div>

Puedes realizar un rastreo de eventos, como fallos y solicitudes de red, cuando tu aplicación está en segundo plano (por ejemplo, no hay ninguna vista activa).

Añade el siguiente fragmento durante la inicialización en tu configuración de Datadog:

```swift
import DatadogRUM

RUM.enable(
  with: RUM.Configuration(
    ...
    trackBackgroundEvents: true
  )
)
```

## Rastreo de errores de iOS

[iOS Crash Reporting and Error Tracking][17] muestra cualquier problema en tu aplicación y los últimos errores disponibles. Puedes ver los detalles y atributos de los errores, incluido JSON, en el [RUM Explorer][18].

## Envío de datos cuando el dispositivo está desconectado

RUM garantiza la disponibilidad de los datos cuando el dispositivo del usuario está desconectado. En casos de zonas con baja conexión de red o cuando la carga de la batería del dispositivo es demasiado baja, todos los eventos de RUM se almacenan primero en el dispositivo local en lotes. Se envían tan pronto como la red esté disponible y la carga de la batería sea lo suficientemente alta como para garantizar que el SDK de RUM para iOS no afecte a la experiencia del usuario final. Si la red no está disponible mientras tu aplicación está en primer plano o si falla una carga de datos, el lote se conserva hasta que se lo pueda enviar con éxito.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato.

**Nota**: Los datos en el disco se descartan automáticamente si se hacen demasiado viejos para garantizar que el SDK de RUM para iOS no utilice demasiado espacio del disco.


## Versiones compatibles

Consulta [Versiones compatibles][19] para ver una lista versiones de sistemas operativos y plataformas que son compatibles con el SDK de RUM iOS.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/microsoft/plcrashreporter/issues/288
[2]: https://developer.apple.com/xcode/
[3]: https://developer.apple.com/news/?id=jd9wcyov
[4]: /es/logs/log_collection/ios/?tab=swiftpackagemanagerspm
[5]: /es/logs/log_collection/ios/?tab=carthage
[6]: https://github.com/DataDog/dd-sdk-ios/tree/develop/DatadogExtensions/Alamofire
[7]: https://github.com/microsoft/plcrashreporter
[8]: https://app.datadoghq.com/rum/application/create
[9]: /es/real_user_monitoring/ios/web_view_tracking/
[10]: /es/real_user_monitoring/ios/data_collected/
[11]: /es/account_management/api-app-keys/#api-keys
[12]: /es/account_management/api-app-keys/#client-tokens
[13]: /es/getting_started/tagging/using_tags/#rum--session-replay
[14]: /es/real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[15]: /es/real_user_monitoring/ios/advanced_configuration/#set-tracking-consent-gdpr-compliance
[16]: https://github.com/DataDog/dd-sdk-ios
[17]: /es/real_user_monitoring/error_tracking/ios/
[18]: /es/real_user_monitoring/explorer/
[19]: /es/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/