---
description: Recopila logs desde tus aplicaciones de iOS.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente dd-sdk-ios
- link: logs/explorer
  tag: Documentación
  text: Aprende a explorar tus logs
title: Recopilación de logs de iOS
---
## Información general

Envía logs a Datadog desde tus aplicaciones de iOS con [la biblioteca de registro del cliente `dd-sdk-ios` de Datadog][1] y aprovecha las siguientes características:

* Loguear en Datadog en formato JSON de forma nativa.
* Utilizar los atributos predeterminados y añadir atributos personalizados a cada log enviado.
* Registrar las direcciones IP reales de los clientes y los Agents de usuario.
* Aprovechar el uso optimizado de red con publicaciones masivas automáticas.

La biblioteca `dd-sdk-ios` es compatible con todas las versiones de iOS 11 o posteriores.

## Configuración

1. Declara la biblioteca como una dependencia en función de tu Pack Manager:

{{< tabs >}}
{{% tab "CocoaPods" %}}

Puedes utilizar [CocoaPods][6] para instalar `dd-sdk-ios`:
```
pod 'DatadogCore'
pod 'DatadogLogs'
```

[6]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Para integrar utilizando Swift Package Manager de Apple, añade lo siguiente como una dependencia a tu `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

En tu proyecto, vincula las siguientes bibliotecas:
```
DatadogCore
DatadogLogs
```

{{% /tab %}}
{{% tab "Carthage" %}}

Puedes utilizar [Carthage][7] para instalar `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

En Xcode, vincula los siguientes marcos:
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogLogs.xcframework
```

[7]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

2. Inicializa la biblioteca con el contexto de tu aplicación y tu [token de cliente de Datadog][2]. Por razones de seguridad, debes utilizar un token de cliente: no puedes utilizar [claves de API de Datadog][3] para configurar la biblioteca `dd-sdk-ios`, ya que estarían expuestas del lado del cliente en el código de bytes IPA de la aplicación iOS.

Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre el token de cliente][2].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .eu1,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us3,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us5,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us1_fed,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .ap1,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
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

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

Para cumplir con la normativa GDPR, el SDK requiere el valor `trackingConsent` en la inicialización.
El valor `trackingConsent` puede ser uno de los siguientes:

- `.pending`: el SDK comienza a recopilar y procesar los datos por lotes, pero no los envía a Datadog. El SDK espera al nuevo valor de consentimiento de rastreo para decidir qué hacer con los datos procesados por lotes.
- `.granted`: el SDK comienza a recopilar los datos y los envía a Datadog.
- `.notGranted`: el SDK no recopila ningún dato: los logs, trazas (traces) y eventos RUM no se envían a Datadog.

Para cambiar el valor del consentimiento de rastreo una vez inicializado el SDK, utiliza la llamada a la API `Datadog.set(trackingConsent:)`.

El SDK cambia su comportamiento según el nuevo valor. Por ejemplo, si el consentimiento de rastreo actual es `.pending`:

- Si se cambia a `.granted`, el SDK envía todos los datos actuales y futuros a Datadog;
- Si se cambia a `.notGranted`, el SDK borra todos los datos actuales y deja de recopilar datos futuros.

Antes de que los datos se carguen en Datadog, se almacenan en texto claro en el directorio de caché (`Library/Caches`) de tu [entorno de prueba de aplicaciones][6]. El directorio de caché no puede ser leído por ninguna otra aplicación instalada en el dispositivo.

Al redactar tu aplicación, habilita los logs de desarrollo para loguear en consola todos los mensajes internos del SDK con una prioridad igual o superior al nivel proporcionado.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDDatadog.verbosityLevel = DDSDKVerbosityLevelDebug;
```
{{% /tab %}}
{{< /tabs >}}

3. Configurar el `Logger`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let logger = Logger.create(
    with: Logger.Configuration(
        name: "<logger name>",
        networkInfoEnabled: true,
        remoteLogThreshold: .info,
        consoleLogFormat: .shortWith(prefix: "[iOS App] ")
    )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDLoggerConfiguration *configuration = [[DDLoggerConfiguration alloc] init];
configuration.networkInfoEnabled = YES;
configuration.remoteLogThreshold = [DDLogLevel info];
configuration.printLogsToConsole = YES;

DDLogger *logger = [DDLogger createWithConfiguration:configuration];
```
{{% /tab %}}
{{< /tabs >}}

4. Envía una entrada personalizada de log directamente a Datadog con uno de los siguientes métodos:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
logger.debug("A debug message.")
logger.info("Some relevant information?")
logger.notice("Have you noticed?")
logger.warn("An important warning...")
logger.error("An error was met!")
logger.critical("Something critical happened!")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger debug:@"A debug message."];
[logger info:@"Some relevant information?"];
[logger notice:@"Have you noticed?"];
[logger warn:@"An important warning..."];
[logger error:@"An error was met!"];
[logger critical:@"Something critical happened!"];
```
{{% /tab %}}
{{< /tabs >}}

**Nota:** Para añadir un log de iOS personalizado a una vista RUM recién creada, aplícalo con el método `viewDidAppear`. Si el log se aplica antes de que se produzca `viewDidAppear`, como en `viewDidLoad`, el log se aplica a la vista RUM anterior, que técnicamente sigue siendo la vista activa.

5. (Opcional) Proporciona un mapa de `attributes` junto a tu mensaje de log para añadir atributos al log emitido. Cada entrada del mapa se añade como un atributo.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
logger.info("Clicked OK", attributes: ["context": "onboarding flow"])
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger info:@"Clicked OK" attributes:@{@"context": @"onboarding flow"}];
```
{{% /tab %}}
{{< /tabs >}}

## Registro avanzado

### Inicialización

Los siguientes métodos en `Logger.Configuration` se pueden utilizar al inicializar el registrador para enviar logs a Datadog:

| Método | Descripción |
|---|---|
| `Logger.Configuration.networkInfoEnabled` | Añade atributos `network.client.*` a todos los logs. Los datos registrados por defecto son: `reachability` (`yes`, `no`, `maybe`), `available_interfaces` (`wifi`, `cellular` y más), `sim_carrier.name` (por ejemplo: `AT&T - US`), `sim_carrier.technology` (`3G`, `LTE` y más) y `sim_carrier.iso_country` (por ejemplo: `US`). |
| `Logger.Configuration.service` | Establece el valor para el [atributo estándar][4] `service` adjunto a todos los logs enviados a Datadog. |
| `Logger.Configuration.consoleLogFormat` | Envía logs a la consola del depurador. |
| `Logger.Configuration.remoteSampleRate` | Configura la frecuencia de muestreo de logs enviada a Datadog. |
| `Logger.Configuration.name` | Establece el valor del atributo `logger.name` adjunto a todos los logs enviados a Datadog. |

### Configuración global

Sigue los métodos que se indican a continuación para añadir o eliminar etiquetas y atributos a todos los logs enviados por un registrador determinado.

#### Etiquetas globales

##### Añadir etiquetas

Utilice el método `addTag(withKey:value:)` para añadir etiquetas a todos los logs enviados por un registrador específico:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Esto añade una etiqueta "build_configuration:debug"
logger.addTag(withKey: "build_configuration", value: "debug")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addTagWithKey:@"build_configuration" value:@"debug"];
```
{{% /tab %}}
{{< /tabs >}}

El `<TAG_VALUE>` debe ser una `String`.

##### Eliminar etiquetas

Utiliza el método `removeTag(withKey:)` para eliminar etiquetas de todos los logs enviados por un registrador específico:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Esto elimina cualquier etiqueta que comienza por "build_configuration"
logger.removeTag(withKey: "build_configuration")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeTagWithKey:@"build_configuration"];
```
{{% /tab %}}
{{< /tabs >}}

Para más información, consulta [Empezando con etiquetas][5].

#### Atributos globales

##### Añadir atributos

Por defecto, los siguientes atributos se añaden a todos los logs enviados por un registrador:

* `http.useragent` y sus propiedades extraídas `device` y `OS` 
* `network.client.ip` y sus propiedades geográficas extraídas (`country`, `city`)
* `logger.version`, versión del SDK de Datadog
* `logger.thread_name`(`main`, `background`)
* `version`, versión de la aplicación del cliente extraída de `Info.plist`
* `environment`, el nombre de entorno utilizado para inicializar el SDK

Utiliza el método `addAttribute(forKey:value:)` para añadir un atributo personalizado a todos los logs enviados por un registrador específico:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Esto añade un atributo "device-model" con un valor de cadena
logger.addAttribute(forKey: "device-model", value: UIDevice.current.model)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addAttributeForKey:@"device-model" value:UIDevice.currentDevice.model];
```
{{% /tab %}}
{{< /tabs >}}

`<ATTRIBUTE_VALUE>` puede ser cualquier elemento que se ajuste a `Encodable`, como `String`, `Date`, modelo de datos personalizado `Codable`, etc.

##### Eliminar atributos

Utiliza el método `removeAttribute(forKey:)` para eliminar un atributo personalizado de todos los logs enviados por un registrador específico:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// Esto elimina el atributo "device-model" de todos los logs enviados en el futuro.
logger.removeAttribute(forKey: "device-model")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeAttributeForKey:@"device-model"];
```
{{% /tab %}}
{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-ios
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/logs/processing/attributes_naming_convention/
[5]: /es/getting_started/tagging/
[6]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web