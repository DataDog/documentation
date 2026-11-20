---
code_lang: ios
code_lang_weight: 20
description: Activa exhaustivos informes de fallos y un seguimiento de errores en
  aplicaciones iOS para monitorizar y resolver problemas con informes detallados.
further_reading:
- link: https://github.com/DataDog/dd-sdk-ios
  tag: Código fuente
  text: Código fuente de dd-sdk-ios
title: Crash Reporting y Error Tracking de iOS
type: lenguaje de código múltiple
---

## Información general

Habilita Crash Reporting y Error Tracking de iOS para obtener informes completos de fallos y tendencias de errores. Con esta función, puedes acceder a:

 - Dashboards y atributos de fallos agregados de iOS
 - Informes simbolizados de fallos de iOS
 - Análisis de tendencias con el seguimiento de errores de iOS

Para simbolizar tus trazas (traces) de stack tecnológico, busca y carga tus archivos `.dSYM` en Datadog. A continuación, verifica tu configuración ejecutando un test de fallos y reiniciando tu aplicación.

Tus informes de bloqueos aparecen en [**Error Tracking**][1].

## Compatibilidad

Consulta [Versiones compatibles][15] para ver una lista de versiones de sistemas operativos y plataformas compatibles con el SDK de iOS.

## Configuración

Para empezar a enviar datos de Error Tracking desde tu aplicación iOS o tvOS a Datadog:

### Paso 1: Declarar el SDK de iOS como dependencia

Declara la biblioteca iOS como dependencia en función de tu gestor de paquetes. Datadog recomienda utilizar Swift Package Manager (SPM).

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Para una integración utilizando Swift Package Manager de Apple, añade lo siguiente como una dependencia a tu `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
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

**Nota**: Datadog no proporciona binarios Carthage precompilados. Esto significa que Carthage compila el SDK a partir de la fuente.
Para compilar e integrar el SDK, ejecuta:
```
carthage bootstrap --use-xcframeworks --no-use-binaries
```

Tras la compilación, añade los siguientes XCFrameworks a tu proyecto Xcode (en la sección "Frameworks, Libraries, and Embedded Content" [Marcos, bibliotecas y contenido incrustado]):
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogRUM.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

### Paso 2: Especificar los detalles de la aplicación en la interfaz de usuario

1. Ve a **Error Tracking** > **[Settings][2]** > **Browser and Mobile** (Error Tracking > Configuración** > Navegador y móvil).
2. Haz clic en **New Application** (Nueva aplicación).
3. Introduce un nombre para la aplicación y selecciona **iOS** como tipo de aplicación.
4. Haz clic en **Create Application** (Crear aplicación) para generar un ID de aplicación y un token de cliente de Datadog únicos.

### Paso 3: Inicializar la biblioteca

#### Actualizar el fragmento de inicialización

En el fragmento de inicialización, define un nombre de entorno y un nombre de servicio.

Para garantizar la seguridad de tus datos, debes utilizar un token de cliente. Si solo utilizaras [claves de API Datadog][5] para configurar la biblioteca `dd-sdk-ios`, se expondrían del lado del cliente en el código de bytes de la aplicación iOS.

Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre tokens de cliente][6].

El SDK debe inicializarse lo antes posible en el ciclo de vida de la aplicación, concretamente en la llamada de retorno `application(_:didFinishLaunchingWithOptions:)` de `AppDelegate`. Esto garantiza que todas las mediciones, incluida la duración del inicio de la aplicación, se capturen correctamente. Para aplicaciones compiladas con SwiftUI, puedes utilizar `@UIApplicationDelegateAdaptor` para conectarse al `AppDelegate`.

<div class="alert alert-warning">La inicialización del SDK en otro lugar (por ejemplo, más tarde durante la carga de la vista) puede dar lugar a una telemetría inexacta o inexistente, especialmente en lo que respecta al rendimiento del inicio de la aplicación.</div>

Para obtener más información, consulta [Uso de etiquetas (tags)][7].

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
@import DatadogCore;

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
@import DatadogCore;

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
@import DatadogCore;

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
@import DatadogCore;

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
@import DatadogCore;

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
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap2" >}}
{{< tabs >}}
{{% tab "Swift" %}}
```swift
import DatadogCore

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    site: .ap2,
    service: "<service name>"
  ),
  trackingConsent: trackingConsent
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogCore;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap2];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

#### Instrumentar tus vistas web (opcional)

Añade el módulo DatadogWebViewTracking utilizando tu gestor de dependencias preferido.

Para realizar un seguimiento de errores y problemas de rendimiento dentro del contenido web, activa el rastreo de vistas web para tus instancias WKWebView. Esto te permite monitorizar errores de JavaScript, solicitudes de red e interacciones de usuario que se producen en páginas web incrustadas, lo que te proporciona una visibilidad completa de los componentes web de tu aplicación híbrida.

Especifica los hosts en los que quieres realizar un seguimiento proporcionando una lista de dominios. Solo se monitoriza el contenido web de los hosts especificados y esto se informa a Datadog.

```swift
import DatadogWebViewTracking

let webview = WKWebView(...)

// start tracking webviews
WebViewTracking.enable(webView: webview, hosts: ["foo.bar"])

//stop tracking webviews (after the user stops navigating the web page)
WebViewTracking.disable(webView: webview)
```

Para obtener más información, consulta [Seguimiento de vistas web][3].

### Paso 4: Añadir la notificación de fallos

La notificación de fallos captura los fallos fatales que se producen cuando tu aplicación se cierra inesperadamente, además de los errores que Error Tracking muestra en una interfaz unificada.

Para activar la notificación de fallos, añade el paquete en función de tu gestor de dependencias y actualiza tu fragmento de inicialización.

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}

Para una integración utilizando Swift Package Manager de Apple, añade lo siguiente como una dependencia a tu `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
```

En tu proyecto, vincula las siguientes bibliotecas:
```
DatadogCrashReporting
```

{{% /tab %}}
{{% tab "CocoaPods" %}}

Puedes utilizar [CocoaPods][1] para instalar `dd-sdk-ios`:
```
pod 'DatadogCrashReporting'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Carthage" %}}

Puedes utilizar [Carthage][1] para instalar `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

En Xcode, vincula los siguientes frameworks:
```
DatadogCrashReporting.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

Actualiza tu fragmento de inicialización para incluir Crash Reporting:

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(...)

CrashReporting.enable()
```

### Paso 5: Añadir la notificación de bloqueos de aplicaciones

Los bloqueos de aplicaciones son un tipo de error específico de iOS que se produce cuando la aplicación no responde durante un tiempo prolongado. Los bloqueos de aplicaciones se informan a través del SDK de iOS (no a través de [logs][10]). Por defecto, la notificación de bloqueos de aplicaciones está **desactivada**, pero puedes activarla y definir tu propio umbral para monitorizar bloqueos de aplicaciones que duren más de un periodo de tiempo que puedes especificar en el parámetro de inicialización `appHangThreshold`. Cuando está activado, cualquier pausa del subproceso principal que sea más prolongada que la especificada en `appHangThreshold` se considera un "bloqueo" en [**Error Tracking**][1]. Un umbral personalizable te permite encontrar el equilibrio adecuado entre la observabilidad detallada y ruidosa. Consulta [Configurar el umbral de bloqueo de aplicaciones](#configure-app-hang-threshold) para obtener más información sobre la configuración de este valor.

Existen dos tipos de bloqueos:

- **Bloqueo fatal de la aplicación**: Cómo se informa de un bloqueo si nunca se recupera y se cierra la aplicación. Los bloqueos fatales de aplicaciones se marcan como "Fallo" en Error Tracking y en el Explorador RUM.

  {{< img src="real_user_monitoring/error_tracking/ios-fatal-app-hang-1.png" alt="Bloqueo fatal de una aplicación en el panel lateral de errores." style="width:100%;" >}}

- **Bloqueo no fatal de la aplicación**: Cómo se informa de un bloqueo si la aplicación se recupera de un bloqueo relativamente breve y sigue ejecutándose. Los bloqueos no fatales de aplicaciones no se marcan como "Fallo" en Error Tracking y en el Explorador RUM.

  {{< img src="real_user_monitoring/error_tracking/ios-non-fatal-app-hang-1.png" alt="Bloqueo no fatal de una aplicación en el panel lateral de errores." style="width:60%;" >}}

{{% collapse-content title="Activar la monitorización del bloqueo de aplicaciones" level="h4" expanded=false id="enable-app-hang-monitoring" %}}

Para habilitar la monitorización de bloqueos de aplicaciones:

1. [Activar Crash Reporting](#step-4---add-crash-reporting).

2. Actualiza el fragmento de inicialización con el parámetro `appHangThreshold` configurado en la duración mínima con que quieres que se informe de bloqueos de aplicaciones, en segundos. Por ejemplo, utiliza `0.25` para notificar bloqueos que duren al menos 250 ms:

   ```swift
   RUM.enable(
       with: RUM.Configuration(
           applicationID: "<application id>",
           appHangThreshold: 0.25
       )
   )
   ```

   Consulta [Configurar el umbral de bloqueo de la aplicación](#configure-app-hang-threshold) para obtener más información sobre la configuración de este valor.

   Asegúrate de seguir los siguientes pasos para obtener [trazas de stack tecnológico desofuscadas](#step-6---get-deobfuscated-stack-traces), que transforman las direcciones de memoria crípticas en nombres de función legibles y en números de línea para una depuración efectiva.

{{% /collapse-content %}}

{{% collapse-content title="Configurar el umbral de bloqueo de aplicaciones" level="h4" expanded=false id="configure-app-hang-threshold" %}}

Elige el valor umbral adecuado en función de tus necesidades de monitorización:

- **Para el desarrollo y la depuración:**
  - Empieza con `appHangThreshold: 0.25` segundos (250 ms) para detectar la mayoría de los problemas de rendimiento.
  - Ajústalo gradualmente (más bajo o más alto) para encontrar la configuración adecuada para tus necesidades específicas.
- **Para la monitorización de la producción:**
  - Configura `appHangThreshold` entre `2.0` y `3.0` segundos para filtrar los bloqueos ruidosos y centrarte en los problemas de rendimiento significativos.
  - Esto se ajusta a las expectativas de la experiencia del usuario, donde los bloqueos de menos de 2 segundos son menos perceptibles.

#### Límites del umbral
- Mínimo: `0.1` segundos (100 ms), sin embargo, configurar el umbral con valores tan pequeños puede llevar a una notificación excesiva de bloqueos.
- Ranfo recomendado: `0.25` a `3.0` segundos.
- El SDK utiliza una tolerancia del 2,5% para reducir el uso de CPU, lo que significa que algunos bloqueos que duran cerca de `appHangThreshold` podrían no ser informados.

##### Ejemplo de configuración
```swift
RUM.enable(
    with: RUM.Configuration(
        applicationID: "<application id>",
        appHangThreshold: 2.0  // Report hangs lasting 2+ seconds
    )
)
```

{{% /collapse-content %}}

{{% collapse-content title="Desactivar la monitorización del bloqueo de aplicaciones" level="h4" expanded=false id="set-tracking-consent" %}}

Para deshabilitar la monitorización de bloqueos de aplicaciones, actualiza el fragmento de inicialización y configura el parámetro `appHangThreshold` como `nil`.

{{% /collapse-content %}}

### Paso 6: Obtener trazas de stack tecnológico desofuscadas

Los informes de fallos se recopilan en un formato no procesado y contienen principalmente direcciones de memoria. Para convertir estas direcciones en información con símbolos legibles (proceso llamado desofuscación), Datadog necesita archivos `dSYM`, que se generan durante el proceso de compilación o distribución de tu aplicación.

**Nota:** Error Tracking admite la simbolización de archivos de símbolos del sistema para la arquitectura arm64 y arm64e de IOS v14 o posterior. El tamaño de los archivos `.dSYM` está limitado a **2 GB** cada uno.

Para ayudarte a depurar errores, Datadog utiliza un ID de compilación único generado para desofuscar trazas de stack tecnológico, emparejándolas con sus archivos de asignación correspondientes. Este proceso tiene lugar independientemente de si los archivos de asignación se han cargado durante las compilaciones de preproducción o de producción, lo que garantiza que la información correcta esté disponible para procesos de control de calidad eficientes al revisar fallos y errores en Datadog.

Para las aplicaciones iOS, la coincidencia de las trazas de stack tecnológico y los archivos de símbolos se basa en su campo `uuid`.

{{% collapse-content title="Buscar tus archivos .dSYM" level="h4" expanded=false id="find-your-dsym-files" %}}

Cada aplicación iOS produce archivos `.dSYM` para cada módulo de la aplicación. Estos archivos minimizan el tamaño binario de una aplicación y permiten una mayor velocidad de descarga. Cada versión de la aplicación contiene un conjunto de archivos `.dSYM`.

Dependiendo de tu configuración, puede que tengas que descargar los archivos `.dSYM` desde App Store Connect o buscarlos en tu equipo local.

| Código de bits habilitado | Descripción |
|---|---|
| Sí | Los archivos `.dSYM` estarán disponibles una vez que [App Store Connect][12] haya terminado de procesar la compilación de tu aplicación. |
| No | Xcode exporta los archivos `.dSYM` a `$DWARF_DSYM_FOLDER_PATH` al finalizar la compilación de tu aplicación. Asegúrate de que la configuración de la compilación de `DEBUG_INFORMATION_FORMAT` está definida como **DWARF with dSYM File**. Por defecto, los proyectos Xcode sólo definen `DEBUG_INFORMATION_FORMAT` como **DWARF with dSYM File** para la configuración del proyecto de lanzamiento. |

{{% /collapse-content %}}

{{% collapse-content title="Cargar tus archivos .dSYM" level="h4" expanded=false id="upload-your-dsym-files" %}}

Al cargar tus archivos `.dSYM` en Datadog, obtienes acceso a la ruta del archivo y al número de línea de cada marco de la traza de stack tecnológico relacionada con un error.

Cuando la aplicación se bloquea y se reinicia, el SDK de iOS carga un informe de bloqueo en Datadog.

**Nota**: Volver a cargar un archivo `.dSYM` con la misma versión de la aplicación no anula el existente.

{{< tabs >}}
{{% tab "Datadog CI" %}}

Puedes utilizar la herramienta de línea de comandos [@datadog/datadog-ci][1] para cargar tus archivos `.dSYM`:

```sh
export DATADOG_API_KEY="<API KEY>"

// if you have a zip file containing dSYM files
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// if you have a folder containing dSYM files
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**Nota**: Para configurar la herramienta utilizando el endpoint EU, define la variable de entorno `DATADOG_SITE` como `datadoghq.eu`. Para anular la URL completa del endpoint de admisión, define la variable de entorno `DATADOG_DSYM_INTAKE_URL`.

  Por ejemplo, para configurar para diferentes sitios Datadog:

  ```sh
  # For EU endpoint
  export DATADOG_SITE="datadoghq.eu"
  export DATADOG_API_KEY="<API KEY>"
  npx @datadog/datadog-ci dsyms upload appDsyms.zip

  # For custom intake URL
  export DATADOG_DSYM_INTAKE_URL="https://your-custom-endpoint.com"
  export DATADOG_API_KEY="<API KEY>"
  npx @datadog/datadog-ci dsyms upload appDsyms.zip
  ```

[1]: https://www.npmjs.com/package/@datadog/datadog-ci

{{% /tab %}}
{{% tab "Fastlane" %}}

El complemento Fastlane te ayuda a cargar archivos `.dSYM` a Datadog desde tu configuración de Fastlane.

1. Añade [`fastlane-plugin-datadog`][1] a tu proyecto.

   ```sh
   fastlane add_plugin datadog
   ```

2. Configura Fastlane para cargar tus símbolos.

   ```ruby
   # download_dsyms action feeds dsym_paths automatically
   lane :upload_dsym_with_download_dsyms do
     download_dsyms
     upload_symbols_to_datadog(api_key: "datadog-api-key")
   end
   ```

Para obtener más información, consulta [`fastlane-plugin-datadog`][1].

[1]: https://github.com/DataDog/datadog-fastlane-plugin

{{% /tab %}}
{{% tab "GitHub Actions (Acciones GitHub)" %}}

La [GitHub Action dSYM de carga de Datadog][1] te permite cargar tus símbolos en tus trabajos de GitHub Action:

```yml
name: Upload dSYM Files

jobs:
  build:
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      - name: Generate/Download dSYM Files
        uses: ./release.sh

      - name: Upload dSYMs to Datadog
        uses: DataDog/upload-dsyms-github-action@v1
        with:
          api_key: ${{ secrets.DATADOG_API_KEY }}
          site: datadoghq.com
          dsym_paths: |
            path/to/dsyms/folder
            path/to/zip/dsyms.zip
```

Para obtener más información, consulta los [comandos dSYM][2].

[1]: https://github.com/marketplace/actions/datadog-upload-dsyms
[2]: https://github.com/DataDog/datadog-ci/blob/master/packages/datadog-ci/src/commands/dsyms/README.md

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

## Para test tu implementación

Para verificar tu configuración de Crash Reporting y Error Tracking de iOS, emite un fallo en tu aplicación y confirma que el error aparece en Datadog.

1. Ejecuta tu aplicación en un simulador iOS o dispositivo real. Asegúrate de que el depurador no está conectado. De lo contrario, Xcode captura el fallo antes de que lo haga el SDK de iOS.
2. Ejecuta el código que contiene el fallo:

   ```swift
   func didTapButton() {
   fatalError("Crash the app")
   }
   ```

3. Después de que se produzca el fallo, reinicia tu aplicación y espera a que el SDK de iOS cargue el informe del fallo en [**Error Tracking**][1].

## Funciones avanzadas de Error Tracking 

{{% collapse-content title="Definir un consentimiento de seguimiento (cumplimiento de GDPR)" level="h4" expanded=false id="set-tracking-consent" %}}

Para cumplir con la normativa GDPR, el SDK de iOS requiere el valor del consentimiento de seguimiento en la inicialización.

El ajuste `trackingConsent` puede ser uno de los siguientes valores:

1. `.pending`: El SDK de iOS empieza a recopilar y procesar los datos por lotes, pero no los envía a Datadog. El SDK de iOS espera el nuevo valor del consentimiento de seguimiento para determinar qué hacer con los datos procesados por lotes.
2. `.granted`: El SDK de iOS empieza a recopilar los datos y los envía a Datadog.
3. `.notGranted`: El SDK de iOS no recopila ningún dato, y no envía logs, trazas o eventos a Datadog.

Para **cambiar el valor del consentimiento de seguimiento** después de inicializar el SDK de iOS, utiliza la llamada a la API `Datadog.set(trackingConsent:)`. El SDK de iOS cambia su comportamiento en función del nuevo valor.

Por ejemplo, si el consentimiento de rastreo actual es `.pending`:

- Si cambias el valor a `.granted`, el SDK de iOS envía todos los datos actuales y futuros a Datadog.
- Si cambias el valor a `.notGranted`, el SDK de iOS elimina todos los datos actuales y no recopila datos futuros.

{{% /collapse-content %}}

{{% collapse-content title="Ejemplo de tasas de sesiones" level="h4" expanded=false id="sample-session-rates" %}}

Para controlar los datos que tu aplicación envía a Datadog, puedes especificar una tasa de muestreo para las sesiones al [inicializar el SDK de iOS][14]. La tasa es un porcentaje entre 0 y 100. Por defecto, `sessionSamplingRate` se define en 100 (conservar todas las sesiones).

Por ejemplo, para conservar solo el 50% de las sesiones, utiliza:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let configuration = RUM.Configuration(
    applicationID: "<application id>",
    sessionSampleRate: 50
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDRUMConfiguration *configuration = [[DDRUMConfiguration alloc] initWithApplicationID:@"<application id>"];
configuration.sessionSampleRate = 50;
```
{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Enviar datos cuando el dispositivo está desconectado" level="h4" expanded=false id="sending-data-device-offline" %}}

El SDK de iOS garantiza la disponibilidad de los datos cuando el dispositivo del usuario está desconectado. En casos de zonas con baja conexión de red o cuando la carga de la batería del dispositivo es demasiado baja, todos los eventos se almacenan primero en el dispositivo local en lotes. Se envían tan pronto como la red está disponible y la carga de la batería es lo suficientemente alta como para garantizar que el SDK de iOS no afecte a la experiencia del usuario final. Si la red no está disponible mientras tu aplicación está en primer plano o si falla una carga de datos, el dispositivo conserva el lote hasta que pueda realizar la carga con éxito.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato.

**Nota**: Para garantizar que el SDK de iOS no utiliza demasiado espacio en disco, el dispositivo descarta automáticamente los datos del disco si son demasiado antiguos.

{{% /collapse-content %}}

{{% collapse-content title="Añadir la notificación de cierres de watchdog" level="h4" expanded=false id="add-watchdog-terminations-reporting" %}}

En el ecosistema Apple, el sistema operativo emplea un mecanismo de watchdog para monitorizar el estado de las aplicaciones y las cierra si dejan de responder o consumen recursos excesivos como CPU y memoria. Estos cierres de watchdog son fatales y no recuperables (más detalles en la [documentación oficial de Apple][13]).

Por defecto, la notificación de cierres de watchdog está **desactivada**, pero puedes activarla utilizando el parámetro de inicialización `trackWatchdogTerminations`.

Cuando están activados, la aplicación informa de un cierre de watchdog y se conecta a la sesión de usuario anterior en el siguiente inicio de la aplicación, si se cumplen todas las condiciones siguientes:

- Durante ese lapso, la aplicación no se ha actualizado,

- Y no ha llamado ni a `exit`, ni a `abort`,

- Y no ha fallado, ni por una excepción, ni por un [bloqueo de aplicación](#step-5---add-app-hang-reporting) fatal,

- Y el usuario no ha forzado el cierre,

- Y el dispositivo no se ha reiniciado (lo que incluye actualizaciones del sistema operativo).

{{< img src="real_user_monitoring/error_tracking/ios-watchdog-termination-1.png" alt="Cierre de watchdog en el panel lateral de Error Tracking." style="width:100%;" >}}

#### Activar la notificación de cierres de watchdog

Para activar la notificación de cierres de watchdog:

1. [Activar Crash Reporting](#step-4---add-crash-reporting).

2. Actualiza el fragmento de inicialización con el indicador `appHangThreshold`:

    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<application id>",
            trackWatchdogTerminations: true
        )
    )
    ```

#### Desactivar la notificación de cierres de watchdog

Para desactivar la notificación de cierres de watchdog, actualiza el fragmento de inicialización y configura el parámetro `trackWatchdogTerminations` como `false`.

{{% /collapse-content %}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/error-tracking/settings/setup/client
[3]: /es/real_user_monitoring/ios/web_view_tracking/
[4]: /es/real_user_monitoring/ios/data_collected/
[5]: /es/account_management/api-app-keys/#api-keys
[6]: /es/account_management/api-app-keys/#client-tokens
[7]: /es/getting_started/tagging/using_tags/#rum--session-replay
[8]: /es/real_user_monitoring/ios/advanced_configuration/#initialization-parameters
[9]: /es/real_user_monitoring/explorer/
[10]: /es/logs/log_collection/ios
[12]: https://appstoreconnect.apple.com/
[13]: https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations
[14]: https://github.com/DataDog/dd-sdk-ios
[15]: /es/real_user_monitoring/mobile_and_tv_monitoring/supported_versions/ios/