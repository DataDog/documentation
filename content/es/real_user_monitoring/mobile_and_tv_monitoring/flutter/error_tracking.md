---
title: Notificación de fallos y seguimiento de errores de Flutter
---

## Información general

Habilita ell informe de fallos y Error Tracking para obtener informes completos de fallos y tendencias de errores con Real User Monitoring.

Tus informes de fallos aparecen en [**Seguimiento de errores**][1].

## Configuración

Si aún no has configurado el SDK de Datadog Flutter para RUM, sigue las [instrucciones de configuración en la aplicación][2] o consulta la [documentación de configuración de Flutter][3].

### Añadir la notificación de fallos nativa

Actualiza tu fragmento de inicialización para habilitar la la notificación de fallos nativa para iOS y Android configurando `nativeCrashReportEnabled` como `true`.

Por ejemplo:

```dart
final configuration = DdSdkConfiguration(
  clientToken: 'DD_CLIENT_TOKEN'
  env: 'DD_ENV'
  site: DatadogSite.us1,
  trackingConsent: TrackingConsent.granted,
  nativeCrashReportEnabled: true, // Set this flag
  loggingConfiguration: LoggingConfiguration(),
  rumConfiguration: 'DD_APP_ID',
);
DatadogSdk.instance.initialize(configuration);
```

Si tu aplicación sufre un fallo fatal, una vez que se reinicia, el SDK de Datadog Flutter carga un informe de fallo en Datadog. Para errores no fatales, el SDK de Datadog Flutter carga estos errores con otros datos de RUM. 


## Carga de archivos de símbolos en Datadog

Los informes de fallos iOS se recopilan en un formato no procesado y contienen principalmente direcciones de memoria. Para convertir estas direcciones en información de símbolos legible, Datadog necesita que cargues archivos .dSYM, que se generan durante el proceso de compilación de tu aplicación.

Para todos los informes de fallos que se compilan con el conjunto de opciones `--split-debug-info` o con el conjunto de opciones `--obfuscate`, es necesario cargar tu archivo de asignación de Android Proguard y archivos de símbolos Dart generados por el proceso de compilación de Flutter.


La herramienta de línea de comandos [@Datadog/Datadog-ci][4] permite cargar todos los archivos necesarios (archivos dSYM, de asignación Proguard Android y de símbolos de Dart) en un solo comando.

En primer lugar, instala la herramienta `datadog-ci` siguiendo las instrucciones anteriores y crea un archivo `datadog-ci.json` en la raíz de tu proyecto, que contenga tu clave de API y (opcionalmente) tu sitio Datadog:
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // Optional if you are using datadoghq.com
}
```

Dado que este archivo contiene tu clave de API, no debe registrarse en el control de versiones.

Alternativamente, puedes establecer las variables de entorno `DATADOG_API_KEY` y `DATADOG_SITE`.

A continuación, puedes utilizar el siguiente comando para cargar todos los archivos necesarios para la simbolización y desofuscación de tus informes de fallos:
```sh
datadog-ci flutter-symbols upload --service-name <YOUR_SERVICE_NAME> --dart-symbols-location <LOCATION_OF_DART_SYMBOLS> --android-mapping --ios-dsyms
```

Si deseas consultar la lista completa de opciones, consulta la [documentación de símbolos de Flutter][6] `datadog-ci`.

## Configuración avanzada: tipos y números de compilación

Datadog utiliza la combinación de los comandos `service-name`, `version` y `flavor` para localizar los símbolos correctos para desenmascarar, es decir, los parámetros enviados al comando `datadog-ci` y los parámetros establecidos en [DdSdkConfiguration][7]

Si estás usando [tipos][8] (flavors) de aplicación en Flutter, necesitarás establecer el nombre del tipo en [DdSdkConfiguration.flavor][9], ya que no podemos detectar el tipo automáticamente. A continuación, puedes pasar esto al parámetro `--flavor` del comando `datadog-ci`:

```sh
datadog-ci flutter-symbols upload --service-name <YOUR_SERVICE_NAME> --dart-symbols-location <LOCATION_OF_DART_SYMBOLS> --android-mapping --ios-dsyms --flavor my_flavor
```

El SDK de Datadog detecta automáticamente el número de versión de tu aplicación especificado en `pubspec.yaml` hasta el número de compilación, pero sin incluirlo. Si utilizas números de compilación como parte de la versión de tu aplicación y necesitas cargar símbolos para cada compilación, deberás añadir la versión a [DdSdkConfiguration.version][10]. A continuación, puedes pasar esto al parámetro `--version` del comando `datadog-ci`:

```sh
datadog-ci flutter-symbols upload --service-name <YOUR_SERVICE_NAME> --dart-symbols-location <LOCATION_OF_DART_SYMBOLS> --android-mapping --ios-dsyms --version 1.2.3+22
```

Ten en cuenta que Datadog utiliza etiquetas para las versiones que no permiten `+`. Todas las herramientas sustituyen automáticamente `+` por `-` para que las etiquetas de versiones puedan buscarse en Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/es/real_user_monitoring/flutter/#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[6]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/flutter-symbols
[7]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[8]: https://docs.flutter.dev/deployment/flavors
[9]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/flavor.html
[10]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/version.html