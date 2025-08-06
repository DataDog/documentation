---
title: Notificación de fallos y seguimiento de errores iOS
---

## Información general

Habilita Crash Reporting y Error Tracking de iOS para obtener informes completos de fallos y tendencias de errores. Con esta función, puedes acceder a:

 - Dashboards y atributos de fallos agregados iOS
 - Informes simbolizados de fallos de iOS
 - Análisis de tendencias con el seguimiento de errores iOS

Para simbolizar tus trazas (traces) de stack tecnológico, busca y carga tus archivos `.dSYM` en Datadog. A continuación, verifica tu configuración ejecutando un test de fallo y reiniciando tu aplicación. 

Tus informes de fallos aparecen en [**Seguimiento de errores**][1].

## Configuración

Si aún no configuraste el SDK iOS, sigue las [instrucciones de configuración en la aplicación][2] o consulta la [documentación de configuración de iOS][3].

### Añadir la notificación de fallos

Para habilitar Crash Reporting, añade el paquete, en función de tu gestor de dependencias, y actualiza tu fragmento de inicialización. 

{{< tabs >}}
{{% tab "CocoaPods" %}}

Puedes utilizar [CocoaPods][1] para instalar `dd-sdk-ios`:
```
pod 'DatadogCrashReporting'
```

[1]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

Para una integración utilizando Swift Package Manager de Apple, añade lo siguiente como una dependencia a tu `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

En tu proyecto, vincula las siguientes bibliotecas:
```
DatadogCrashReporting
```

{{% /tab %}}
{{% tab "Carthage" %}}

Puedes utilizar [Carthage][1] para instalar `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

En Xcode, vincula los siguientes marcos:
```
DatadogCrashReporting.xcframework
CrashReporter.xcframework
```

[1]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

Actualiza tu fragmento de inicialización para incluir la notificación de fallos:

```swift
import DatadogCore
import DatadogCrashReporting

Datadog.initialize(
  with: Datadog.Configuration(
    clientToken: "<client token>",
    env: "<environment>",
    service: "<service name>"
  ), 
  trackingConsent: trackingConsent
)

CrashReporting.enable()
```

### Añadir la notificación de cuelgues de aplicaciones

Los cuelgues de aplicaciones son un tipo de error específico de iOS que se producen cuando la aplicación no responde durante demasiado tiempo.

Por defecto, el informe de cuelgues de la aplicación está **desactivado**, pero puedes activarlo y definir tu propio umbral para monitorizar cuelgues de aplicaciones que duren más de una duración especificada, utilizando el parámetro de inicialización `appHangThreshold`. Un umbral personalizable te permite encontrar el equilibrio adecuado entre una observabilidad detallada y una observabilidad ruidosa. Para obtener más información sobre cómo definir este valor, consulta [Configurar el umbral de cuelgue de la aplicación][5].

Los cuelgues de la aplicación se notifican a través del SDK iOS (no a través de [logs][4]).

Cuando se activa, cualquier pausa de un subproceso principal que supere el  `appHangThreshold` se considera un _cuelgue_ en [**Error Tracking**][1]. Hay dos tipos de cuelgues:

- **Cuelgue fatal de la aplicación**: Cómo se informa de un cuelgue si nunca se recupera y se cierra la aplicación. Los cuelgues fatales de aplicaciones se marcan como "Fallo" en Seguimiento de errores y en el Explorador RUM.

  {{< img src="real_user_monitoring/error_tracking/ios-fatal-app-hang.png" alt="Cuelgue fatal de una aplicación en el panel lateral de errores" style="width:60%;" >}}

- **Cuelgue no fatal de la aplicación**: Cómo se informa de un cuelgue si la aplicación se recupera de un cuelgue relativamente breve y sigue ejecutándose. Los cuelgues no fatales de aplicaciones no se marcan como "Fallo" en Seguimiento de errores y en el Explorador RUM.

  {{< img src="real_user_monitoring/error_tracking/ios-non-fatal-app-hang.png" alt="Cuelgue no fatal de una aplicación en el panel lateral de errores." style="width:60%;" >}}

#### Habilitar la monitorización de cuelgues de aplicaciones

Para habilitar la monitorización de cuelgues de aplicaciones:

1. [Habilita la notificación de fallos][19].

2. Actualiza el fragmento de inicialización con el parámetro `appHangThreshold`:

   ```swift
   RUM.enable(
       with: RUM.Configuration(
           applicationID: "<application id>",
           appHangThreshold: 0.25
       )
   )
   ```

3. Configura el parámetro `appHangThreshold` con la duración mínima de cuelgues de la aplicación que quieres que se notifiquen. Por ejemplo, introduce `0.25` para informar de cuelgues que duren al menos 250 ms. Para obtener más información sobre cómo definir este valor, consulta [Configurar el umbral de cuelgues de la aplicación][5].

   Asegúrate de seguir los siguientes pasos para obtener [stack trazas de stack tecnológico desofuscadas][6].

#### Configuración del umbral de cuelgue de aplicaciones

- En sus métricas de frecuencia de cuelgues en Xcode Organizer, Apple sólo tiene en cuenta los cuelgues que duran más de 250 ms. Datadog recomienda empezar con un valor similar para `appHangThreshold` (en otras palabras, configurarlo en `0.25`) y luego bajarlo o aumentarlo gradualmente para encontrar la configuración adecuada.

- Para filtrar la mayoría de los cuelgues ruidosos, recomendamos que se configure en un `appHangThreshold` de entre 2 y 3 segundos.

- El valor mínimo con el que puede configurarse la opción `appHangThreshold` es `0.1` segundos (100 ms). Sin embargo, configurar el umbral con valores tan pequeños puede dar lugar a una notificación excesiva de cuelgues.

- El SDK implementa un subproceso secundario para monitorizar cuelgues de aplicaciones. Para reducir el uso de CPU, realiza un seguimiento de los cuelgues con una tolerancia del 2,5%, lo que significa que algunos cuelgues que duran cerca de `appHangThreshold` pueden no ser notificados.


#### Deshabilitar la monitorización de cuelgues de aplicaciones

Para deshabilitar la monitorización de cuelgues de aplicaciones, actualiza el fragmento de inicialización y configura el parámetro `appHangThreshold` como `nil`.

### Añadir notificaciones de cierres watchdog

En el ecosistema Apple, el sistema operativo emplea un mecanismo de watchdog para monitorizar el estado de las aplicaciones y las cierra si dejan de responder o consumen recursos excesivos como CPU y memoria. Estas terminaciones watchdog son fatales y no recuperables (más detalles en la [documentación oficial de Apple][12]).

Por defecto, la notificación de cierres watchdog está **deshabilitada**, pero puedes habilitarla utilizando el parámetro de inicialización `trackWatchdogTerminations`.

Cuando se activa, la finalización watchdog se informa y se adjunta a la sesión de usuario anterior en el siguiente lanzamiento de la aplicación, basándose en la heurística:

- Durante ese lapso, la aplicación no se actualizó,

- Y no llamó ni a `exit`, ni a `abort`,

- Y no falló, ni por una excepción, ni por un [cuelgue de la aplicación] fatal[13],

- Y el usuario no forzó el cierre,

- Y el dispositivo no se reinició (lo que incluye actualizaciones del sistema operativo).

{{< img src="real_user_monitoring/error_tracking/ios-watchdog-termination.png" alt="Terminación watchdog en el panel lateral de Error Tracking." style="width:60%;" >}}

#### Habilitar la notificación de cierres watchdog

Para habilitar la notificación de cierres watchdog:

1. [Habilita la notificación de fallos][19].

2. Actualiza el fragmento de inicialización con el indicador `appHangThreshold`:

    ```swift
    RUM.enable(
        with: RUM.Configuration(
            applicationID: "<application id>",
            trackWatchdogTerminations: true
        )
    )
    ```

#### Deshabilitar la notificación de cierres watchdog

Para deshabilitar la notificación de cierres watchdog, actualiza el fragmento de inicialización y configura el parámetro `trackWatchdogTerminations` como `false`.

## Obtener trazas (traces) de stack tecnológico desofuscadas

Los archivos de asignación se utilizan para desofuscar trazas de stack tecnológico, lo que ayuda a depurar errores. Mediante el ID de compilación único que se genera, Datadog hace coincidir automáticamente las trazas de stack tecnológico correctas con los archivos de asignación correspondientes. Esto garantiza que, independientemente de cuándo se haya cargado el archivo de asignación (ya sea durante la compilación de preproducción o de producción), se disponga de la información correcta para garantizar procesos de control de calidad eficaces al revisar fallos y errores notificados en Datadog.

Para las aplicaciones iOS, la coincidencia de las trazas de stack tecnológico y los archivos de símbolos se basa en su campo `uuid`.

### Simbolización de informes de fallos

Los informes de fallos se recopilan en un formato no procesado y contienen principalmente direcciones de memoria. Para convertir estas direcciones en información de símbolos legible, Datadog necesita archivos .`dSYM`, que se generan durante el proceso de compilación o distribución de tu aplicación.

### Búsqueda de tu archivo .dSYM

Cada aplicación iOS genera archivos `.dSYM` para cada módulo de la aplicación. Estos archivos minimizan el tamaño binario de una aplicación y permiten una mayor velocidad de descarga. Cada versión de la aplicación contiene un conjunto de archivos `.dSYM`. 

Dependiendo de tu configuración, puede que tengas que descargar los archivos `.dSYM` desde App Store Connect o buscarlos en tu equipo local. 

| Código de bits habilitado | Descripción |
|---|---|
| Sí | Los archivos `.dSYM` están disponibles después de que [App Store Connect][7] termina de procesar la compilación de tu aplicación. |
| No | Xcode exporta los archivos `.dSYM` a `$DWARF_DSYM_FOLDER_PATH` al finalizar la compilación de tu aplicación. Asegúrate de que la configuración de la compilación de `DEBUG_INFORMATION_FORMAT` está definida como **DWARF with dSYM File**. Por defecto, los proyectos Xcode sólo definen `DEBUG_INFORMATION_FORMAT` como **DWARF with dSYM File** para la configuración del proyecto de lanzamiento. |

### Carga de tu archivo .dSYM

Al cargar tu archivo `.dSYM` en Datadog, obtienes acceso a la ruta del archivo y al número de línea de cada marco de la traza de stack tecnológico relacionada con un error.

Una vez que tu aplicación falla y se reinicia, el SDK iOS carga un informe de fallo en Datadog.

**Nota**: Volver a cargar un mapa de fuente no anula el existente si la versión no ha cambiado.

### Uso de Datadog CI para cargar tu archivo .dSYM

Para cargar tu archivo `.dSYM`, puedes utilizar la herramienta de línea de comandos [@datadog/datadog-ci][8]:

```sh
export DATADOG_API_KEY="<API KEY>"

// if you have a zip file containing dSYM files
npx @datadog/datadog-ci dsyms upload appDsyms.zip

// if you have a folder containing dSYM files
npx @datadog/datadog-ci dsyms upload /path/to/appDsyms/
```

**Nota**: Para configurar la herramienta utilizando el endpoint UE, configura la variable de entorno `DATADOG_SITE` como `datadoghq.eu`. Para anular la URL completa del endpoint de admisión, configura la variable de entorno `DATADOG_DSYM_INTAKE_URL`.

Si utilizas acciones de Fastlane o GitHub en tus flujos (flows) de trabajo, también puedes aprovechar estas integraciones, en lugar de `datadog-ci`:

### Uso del complemento Fastlane para cargar tu archivo .dSYM

El complemento Fastlane te ayuda a cargar archivos `.dSYM` a Datadog desde tu configuración de Fastlane.

1. Añade [`fastlane-plugin-datadog`][9] a tu proyecto.

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

Para obtener más información, consulta [`fastlane-plugin-datadog`][9].

### Uso de las acciones de GitHub para subir tu archivo .dSYM

La [acción de GitHub dSYMs para cargas en Datadog][10] te permite cargar tus símbolos en tus tareas de acciones de GitHub:

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

Para obtener más información, consulta los [comandos de dSYM][11].

## Limitaciones

El tamaño de los archivos dSYM está limitado a **2 GB** cada uno.

## Para probar tu implementación

Para verificar tu configuración de Crash Reporting y Error Tracking de iOS, genera un fallo en tu aplicación y confirma que aparece en Datadog.

1. Ejecuta tu aplicación en un simulador iOS o dispositivo real. Asegúrate de que el depurador no está conectado. De lo contrario, Xcode captura el fallo antes de que lo haga el SDK iOS.
2. Ejecuta el código que contiene el fallo:

   ```swift
   func didTapButton() {
   fatalError("Crash the app")
   }
   ```

3. Después de que se produzca el fallo, reinicia tu aplicación y espera a que el SDK iOS cargue el informe del fallo en [**Rastreo de errores**][1].

**Nota:** Error Tracking admite la simbolización de archivos de símbolos del sistema para la arquitectura iOS v14 o posterior arm64 y arm64e.


[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: /es/real_user_monitoring/ios
[4]: /es/logs/log_collection/ios
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking/?tab=cocoapods#configure-the-app-hang-threshold
[6]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking/?tab=cocoapods#get-deobfuscated-stack-traces
[7]: https://appstoreconnect.apple.com/
[8]: https://www.npmjs.com/package/@datadog/datadog-ci
[9]: https://github.com/DataDog/datadog-fastlane-plugin
[10]: https://github.com/marketplace/actions/datadog-upload-dsyms
[11]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/dsyms/README.md
[12]: https://developer.apple.com/documentation/xcode/addressing-watchdog-terminations
[13]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking/?tab=cocoapods#add-app-hang-reporting
[14]: /es/real_user_monitoring/mobile_and_tv_monitoring/mobile_vitals?tab=ios#telemetry
[15]: https://developer.apple.com/documentation/xcode/analyzing-responsiveness-issues-in-your-shipping-app#View-your-apps-hang-rate
[16]: https://developer.apple.com/documentation/metrickit/mxhangdiagnostic
[17]: /es/real_user_monitoring/explorer/search/#facets
[18]: /es/dashboards/widgets/timeseries
[19]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/error_tracking/?tab=cocoapods#add-crash-reporting