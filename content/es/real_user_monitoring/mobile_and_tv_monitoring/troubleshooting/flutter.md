---
code_lang: flutter
code_lang_weight: 30
description: Aprenda a solucionar problemas con Flutter Monitoring.
further_reading:
- link: https://github.com/DataDog/dd-sdk-flutter
  tag: Código fuente
  text: Código fuente de dd-sdk-flutter
- link: real_user_monitoring/flutter/
  tag: Documentación
  text: Más información sobre Flutter Monitoring
title: Solucionar problemas con el SDK de Flutter
type: multi-code-lang
---

## Información general

Si experimentas un comportamiento inesperado con Datadog RUM, utiliza esta guía para solucionar los problemas rápidamente. Si sigues teniendo problemas, ponte en contacto con el [Equipo de soporte técnico de Datadog][1] para obtener más ayuda.

## Interfaz duplicada (iOS)

Si aparece este error al compilar iOS después de actualizar a `datadog_flutter_plugin` v2.0:

```
Problema semántico (Xcode): Definición de interfaz duplicada de la clase 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

Prueba realizar `flutter clean` && `flutter pub get` y compilar nuevamente. Esto suele solucionar el problema.

## Clases duplicadas (Android)

Si aparece este error al compilar Android después de actualizar a `datadog_flutter_plugin` v2.0:

```
FALLO: Ocurrió un fallo en la compilación con una excepción.

* What went wrong:
Falló la ejecución de la tarea ':app:checkDebugDuplicateClasses'.
> Ha ocurrido un fallo mientras se ejecutaba com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

Asegúrate de que hayas actualizado tu versión de Kotlin al menos a la 1.8 en tu archivo `build.gradle`.

## Problemas con Cocoapods

Si tienes problemas para compilar su aplicación iOS después de añadir el SDK de Datadog debido a errores lanzados por Cocoapods, check qué error estás recibiendo. El error más frecuente es un problema para obtener la biblioteca nativa más actualizada de Cocoapods, que puede resolverse ejecutando lo siguiente en tu directorio `ios`:

```bash
pod install --repo-update
```

Otro error frecuente es un problema al cargar la biblioteca FFI en Silicon Macs  Si ves un error similar al siguiente:

```bash
LoadError - dlsym(0x7fbbeb6837d0, Init_ffi_c): symbol not found - /Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi_c.bundle
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0/rubygems/core_ext/kernel_require.rb:54:in `require'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:6:in `rescue in <top (required)>'
/Library/Ruby/Gems/2.6.0/gems/ffi-1.13.1/lib/ffi.rb:3:in `<top (required)>'
```

Sigue las instrucciones de la [documentación de Flutter][2] para trabajar con Flutter en Apple Silicon.

## Configurar sdkVerbosity

Si puedes ejecutar tu aplicación, pero no ves los datos que esperas en el sitio Datadog, intenta añadir lo siguiente a tu código antes de llamar a `DatadogSdk.initialize`:

```dart
DatadogSdk.instance.sdkVerbosity = CoreLoggerLevel.debug;
```

Esto hace que el SDK genere información adicional sobre lo que está haciendo y los errores que está encontrando, lo que puede ayudarlos a ti y al equipo de soporte técnico de Datadog a reducir el problema.

## No ver Errores

Si no ves ningún error en RUM, es probable que no se haya iniciado ninguna vista. Asegúrate de que hayas iniciado una vista con `DatadogSdk.instance.rum?.startView` o, si estás utilizando `DatadogRouteObserver`, asegúrate de que tu ruta actual tenga un nombre.

## Problemas con el rastreo automático de recursos y el rastreo distribuido

El paquete de [rastreo de Datadog del cliente HTTP][3] funciona con los paquetes de red más frecuentes de Flutter que dependen de `dart:io`, incluidos [`http`][4] y [`Dio`][5].

Si estás viendo recursos en tus sesiones RUM, entonces el rastreo del cliente HTTP está funcionando, pero pueden ser necesarios otros pasos para utilizar el rastreo distribuido.

De modo predeterminado, las muestras de Datadog RUM Flutter SDK distribuyen trazas (traces) a sólo el 20% de las solicitudes de recursos. Mientras se determina si hay un problema con tu configuración, debes configurar este valor al 100% de las trazas modificando tu inicialización con las siguientes líneas:
``dart
configuración final = DdSdkConfiguration(
   //
   rumConfiguration: DatadogRumConfiguration(
    applicationId: '<RUM_APPLICATION_ID>',
    tracingSamplingRate: 100,0
   ),
);
```

Si sigues teniendo problemas, check que tu propiedad `firstPartyHosts` está configurada correctamente. Solo deben ser hosts, sin esquemas ni rutas y no admiten expresiones regulares ni comodines. Por ejemplo:

    ✅ Bueno - 'example.com', 'api.example.com', 'us1.api.sample.com'
    ❌ Malo - 'https://example.com', '*.example.com', 'us1.sample.com/api/*', 'api.sample.com/api'

## Envío de datos cuando el dispositivo está desconectado

RUM garantiza la disponibilidad de los datos cuando el dispositivo del usuario está desconectado. En los casos con baja conexión de red o cuando la carga de la batería del dispositivo es demasiado baja, todos los eventos de RUM se almacenan primero en el dispositivo local por lotes. Se envían en cuanto red está disponible y la carga de la batería es lo suficientemente alta como para garantizar que el SDK de RUM de Flutter no afecte a la experiencia del usuario final. Si la red no está disponible cuando la aplicación se ejecuta en primer plano o si falla una carga de datos, el lote se guarda hasta que pueda enviarse correctamente.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato.

**Nota**: Los datos del disco se eliminan automáticamente si se vuelven demasiado antiguos para garantizar que el SDK de Flutter RUM no utilice demasiado espacio del disco.

## Referencias adicionales

{{< nombre parcial="whats-next/whats-next.html" >}}


[1]: /es/help
[2]: https://github.com/flutter/flutter/wiki/Developing-with-Flutter-on-Apple-Silicon
[3]: https://pub.dev/packages/datadog_tracking_http_client
[4]: https://pub.dev/packages/http
[5]: https://pub.dev/packages/dio