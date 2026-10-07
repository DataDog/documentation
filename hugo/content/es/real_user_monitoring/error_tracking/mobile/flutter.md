---
aliases:
- /es/real_user_monitoring/error_tracking/flutter
code_lang: flutter
code_lang_weight: 50
dependencies:
- https://github.com/DataDog/dd-sdk-flutter/blob/main/packages/datadog_flutter_plugin/doc/rum/error_tracking.md
description: Aprende a realizar un seguimiento de los errores de Flutter con el seguimiento
  de errores.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código fuente
  text: Código fuente dd-sdk-flutter
- link: real_user_monitoring/error_tracking/
  tag: Documentación
  text: Más información sobre el seguimiento de errores
title: Notificación de fallos y seguimiento de errores de Flutter
type: lenguaje de código múltiple
---
## Información general

Habilita la notificación de fallos y el seguimiento de errores para obtener informes completos de fallos y tendencias de errores con Real User Monitoring.

Tus informes de fallos aparecen en [**Seguimiento de errores**][1].

## Configuración

Si aún no has configurado el SDK de Flutter en Datadog, sigue las [instrucciones de configuración en la aplicación][2] o consulta la [documentación de configuración de Flutter[3].

### Añadir el seguimiento de errores de Dart

Si utilizas `DatadogSdk.runApp`, el SDK de Flutter de Datadog rastrea e informa automáticamente de las excepciones de Dart no detectadas.

Si **no** estás utilizando `DatadogSdk.runApp`, necesitas configurar el seguimiento de errores de Dart manualmente con el siguiente código antes de inicializar Datadog:

```dart
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
```

### Añadir la notificación de fallos nativa

Actualiza tu fragmento de inicialización para habilitar la la notificación de fallos nativa para iOS y Android configurando `nativeCrashReportEnabled` como `true`.

Por ejemplo:

```dart
final configuration = DatadogConfiguration(
  clientToken: '<DD_CLIENT_TOKEN>'
  env: '<DD_ENV>'
  site: DatadogSite.us1,
  nativeCrashReportEnabled: true, // Set this flag
  loggingConfiguration: DatadogLoggingConfiguration(),
  rumConfiguration: DatadogRumConfiguration(
    applicationId: '<DD_APP_ID>',
  ),
);
```

Si tu aplicación sufre un fallo fatal, el SDK de Flutter de Datadog carga un informe de fallo en Datadog *después* del reinicio de tu aplicación. Para errores no fatales, el SDK de Flutter de Datadog carga estos errores con otros datos RUM.

## Obtener trazas (traces) de stack tecnológico desofuscadas

Los archivos de asignación se utilizan para desofuscar trazas de stack tecnológico, lo que ayuda a depurar errores. Mediante el ID de compilación único que se genera, Datadog hace coincidir automáticamente las trazas de stack tecnológico correctas con los archivos de asignación correspondientes. Esto garantiza que, independientemente de cuándo se haya cargado el archivo de asignación (ya sea durante la compilación de preproducción o de producción), se disponga de la información correcta para garantizar procesos de control de calidad eficaces al revisar fallos y errores notificados en Datadog.

Para las aplicaciones Flutter, la correspondencia entre las trazas de stack tecnológico y los mapas de origen se basa en tus campos `service`, `version`, `variant` y `architecture`.

### Carga de archivos de símbolos en Datadog

Los informes de fallos iOS se recopilan en un formato no procesado y contienen principalmente direcciones de memoria. Para convertir estas direcciones en información de símbolos legible, Datadog necesita que cargues archivos .dSYM, que se generan durante el proceso de compilación de tu aplicación.

Los informes de fallos y errores enviados desde aplicaciones iOS Flutter y Android que se crean con la opción `--split-debug-info` configurada o con la opción `--obfuscate` configurada también estarán en un formato sin procesar u ofuscado. Para estas aplicaciones, es necesario cargar el archivo de asignación Proguard de Android y los archivos de símbolos de Dart generados por el proceso de compilación de Flutter.

Los errores enviados desde las aplicaciones web Flutter enviarán números de archivos y de líneas de JavaScript sin asignar, que deben asignarse a números de archivos y de líneas de Dart. Para estas aplicaciones, debes cargar el mapa de origen JavaScript generado por el proceso de compilación de Flutter.

La herramienta de línea de comandos [@Datadog/Datadog-ci][4] permite cargar todos los archivos necesarios (archivos dSYM, de asignación Proguard Android y de símbolos de Dart) en un solo comando.

En primer lugar, instala la herramienta `datadog-ci` siguiendo las instrucciones anteriores y crea un archivo `datadog-ci.json` en la raíz de tu proyecto, que contenga tu clave de API y (opcionalmente) tu sitio Datadog:
```json
{
  "apiKey": "<YOUR_DATADOG_API_KEY>",
  "datadogSite": "datadoghq.eu"  // Optional if you are using datadoghq.com
}
```

Dado que este archivo contiene tu clave de API, no debe registrarse en el control de versiones.

También puedes configurar las variables de entorno `DATADOG_API_KEY` y `DATADOG_SITE`.

A continuación, puedes utilizar el siguiente comando para cargar todos los archivos necesarios para la simbolización y desofuscación de tus informes de fallos:
```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms
```

**Nota**: Volver a cargar un mapa de origen no anula el existente si la versión no ha cambiado.

Para ver la lista completa de opciones, consulta la [documentación de símbolos Flutter][5] `datadog-ci`.

## Limitaciones

{{< site-region region="us,us3,us5,eu,gov" >}}
Los mapas de origen y los archivos dSYM están limitados a **500** MB cada uno.
{{< /site-region >}}
{{< site-region region="ap1" >}}
Los mapas de origen y los archivos dSYM están limitados a **500** MB cada uno.
{{< /site-region >}}

## Para probar tu implementación

Para verificar la configuración de las notificaciones de fallos y el seguimiento de errores de Flutter, necesitas generar un error en tu aplicación y confirmar que el error aparece en Datadog.

1. Ejecuta tu aplicación en un simulador, emulador o dispositivo real. Si estás ejecutando en iOS, asegúrate de que el depurador no está conectado. De lo contrario, Xcode captura el fallo antes de que lo haga el SDK de Datadog.
2. Ejecuta código que contenga un error o fallo. Por ejemplo:

   ```dart
   void throwError() {
    throw Exception("My Exception")
   }
   ```

3. Para los informes de error ofuscados que no provocan un fallo, puedes verificar la simbolización y la desofuscación en [**Rastreo de errores**][8].
4. Para los fallos, después de que se produzcan, reinicia tu aplicación y espera a que el SDK de Flutter cargue el informe del fallo en [**Rastreo de errores**][8].

### Opciones y números de compilación

Datadog utiliza la combinación de `service-name`, `version` y `flavor` para localizar los símbolos correctos para la desofuscación. Para que tus informes de errores tengan información completa, los parámetros enviados al comando `datadog-ci` y los parámetros definidos en [DatadogConfiguration][6] deben coincidir exactamente.

Si estás utilizando [opciones][7] de aplicación en Flutter, necesitas definir el nombre de la opción en [DatadogConfiguration.flavor][8] ya que no podemos detectar la opción automáticamente. A continuación, puede pasarlo al parámetro `--flavor` del comando `datadog-ci`:

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --flavor my_flavor
```

El SDK de Datadog detecta automáticamente el número de versión de tu aplicación especificado en tu `pubspec.yaml` hasta el número de compilación, pero sin incluirlo. Si utilizas números de compilación como parte de la versión de tu aplicación y necesitas cargar símbolos para cada compilación, debes añadir la versión a [DatadogConfiguration.version][9]. A continuación, puede pasar esto al parámetro `--version` del comando `datadog-ci`:

```sh
datadog-ci flutter-symbols upload --service-name <your_service_name> --dart-symbols-location <location_of_dart_symbols> --android-mapping --ios-dsyms --version 1.2.3+22
```

**Nota**: Datadog utiliza etiquetas (tags) para las versiones que no admiten `+`. Todas las herramientas sustituyen automáticamente `+` por `-` para que las etiquetas de versión puedan buscarse en Datadog.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/es/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter#setup
[4]: https://www.npmjs.com/package/@datadog/datadog-ci
[5]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/flutter-symbols
[6]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration-class.html
[7]: https://docs.flutter.dev/deployment/flavors
[8]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/flavor.html
[9]: https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/DatadogConfiguration/version.html