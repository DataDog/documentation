---
code_lang: reactnative
code_lang_weight: 50
description: Aprenda a solucionar problemas con la monitorización de React Native.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Código fuente
  text: Código fuente de dd-sdk-reactnative
- link: /real_user_monitoring
  tag: Documentación
  text: Datadog Real User Monitoring (RUM)
title: Solucionar problemas con el SDK de React Native
type: multi-code-lang
---

## Información general

Si experimentas un comportamiento inesperado con Datadog React Native RUM, utiliza esta guía para resolver los problemas rápidamente. Si sigues teniendo problemas, ponte en contacto con el [Equipo de soporte técnico de Datadog][1] para obtener más ayuda.

## No se envían datos a Datadog

Sigue estas instrucciones en orden cuando se haya instalado el SDK y la compilación de la aplicación, pero Datadog no reciba ningún dato.

### Check la configuración

A veces, no se envía ningún dato debido a un pequeño error en la configuración.

Estas son algunas de las cosas más frecuentes para hacer un check:

- Asegúrate de que tu `clientToken` y `applicationId` sean correctos.
- Asegúrate de que no hayas configurado `sessionSamplingRate` con un valor distinto de 100 (100 es el valor predeterminado), de lo contrario, se podría enviar tu sesión.
- Si has configurado un `Proxy` en la configuración de Datadog, check que se haya configurado correctamente.
- Check que estés **rastreando vistas** (todos los eventos deben estar adjuntos a una vista) y **enviando eventos**.

### Revisar los logs de SDK en React Native

- Configura `config.verbosity = SdkVerbosity.DEBUG`, que importa `SdkVerbosity` desde `@datadog/mobile-react-native`.
- Los logs comienzan a aparecer en la consola de JavaScript, como la siguiente salida:

  ```
  INFO  DATADOG: Datadog SDK was initialized
  INFO  DATADOG: Datadog SDK is tracking interactions
  INFO  DATADOG: Datadog SDK is tracking XHR resources
  INFO  DATADOG: Datadog SDK is tracking errors
  DEBUG  DATADOG: Starting RUM View "Products" #Products-oaZlP_FVwGM5vtPoup_rT
  DEBUG  DATADOG: Adding RUM Action "RCTView" (TAP)
  ```

  **Nota**: En este ejemplo, los cuatro primeros logs indican que el SDK se ha configurado correctamente y las dos últimas líneas son eventos que se enviaron.

#### Posible causa

Si estás en iOS y ves algunos logs de DEBUG que indican que los logs o los eventos de RUM se enviaron **antes** que los logs de inicialización. Esta puede ser la causa por la cual el SDK no está enviando eventos.

No se pueden enviar eventos antes de la inicialización e intentarlo pone al SDK en un estado en el que no puede enviar ningún dato.

#### Solución

{{< tabs >}}
{{% tab "DdSdkReactNative.initialize" %}}

Si utilizas `DdSdkReactNative.initialize` para iniciar el SDK de Datadog, llama a esta función en tu archivo de nivel superior `index.js` para que el SDK se inicialice antes de que se envíen tus otros eventos.

{{% /tab %}}
{{% tab "DatadogProveedor" %}}

A partir de la versión del SDK `1.2.0`, puedes inicializar el SDK utilizando el componente `DatadogProvider`. Este componente incluye un buffer de eventos de RUM que se asegura de que el SDK se inicialice antes de enviar cualquier dato a Datadog, lo que evita que se produzca este problema.

Para utilizarlo, consulta la [Guía para la migración al proveedor de Datadog][1].

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/docs/migrating_to_datadog_provider.md

{{% /tab %}}
{{< /tabs >}}

### Revisión de los logs nativos

Revisar los logs nativos puede darte más información sobre lo que podría estar fallando.

#### En iOS

- Abre tu proyecto en Xcode ejecutando `xed ios`.
- Compila tu proyecto para un simulador o un dispositivo.
- Los logs nativos empiezan a aparecer en la esquina inferior derecha:

  {{< img src="real_user_monitoring/react_native/troubleshooting-xcode-logs.png" alt="Revisar los logs nativos puede ayudarte a averiguar por qué no se está enviando ningún dato" >}}

Puedes filtrar los logs por "DATADOG" y buscar cualquier error.

Si efectivamente estás enviando eventos, deberías ver los siguientes logs:

```
[Datadog SDK] 🐶 → 10:02:47.398 [DEBUG] ⏳ (rum) Cargando lote...
[Datadog SDK] 🐶 → 10:02:47.538 [DEBUG] → (rum) aceptado, no se retransmitirá: [código de respuesta: 202 (aceptado), ID de solicitud: AAAABBBB-1111-2222-3333-777788883333]
```

El primer log indica que se están enviando algunos datos y el segundo log indica que los datos se han recibido.

##### Posible causa

Si ves el siguiente log, significa que has llamado a un método de RUM antes de inicializar el SDK.

```
[Datadog SDK] 🐶 → 10:09:13.621 [WARN] Se ha llamado a `Global.rum`, pero no se ha registrado `RUMMonitor`. Configura y registra el RUM Monitor globalmente antes de invocar la característica:
```

##### Solución

{{< tabs >}}
{{% tab "DdSdkReactNative.initialize" %}}

Si utilizas `DdSdkReactNative.initialize` para iniciar el SDK de Datadog, llama a esta característica en tu archivo de nivel superior `index.js` para que el SDK se inicialice antes de que se envíen tus otros eventos.

{{% /tab %}}
{{% tab "DatadogProveedor" %}}

A partir de la versión del SDK `1.2.0`, puedes inicializar el SDK utilizando el componente `DatadogProvider`. Este componente incluye un buffer de eventos de RUM que se asegura de que el SDK se inicialice antes de enviar cualquier dato a Datadog, lo que evita que se produzca este problema.

Para utilizarlo, consulta la [Guía para la migración al proveedor de Datadog ][1].


[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/docs/migrating_to_datadog_provider.md

{{% /tab %}}
{{< /tabs >}}

#### En Android

- Para una mejor experiencia de depuración, Datadog recomienda instalar [pidcat][2].
  - pidcat filtra los logs del dispositivo (obtenidos por `adb logcat`) para mostrar solo el de tu aplicación.
  - Consulta [este número][3] para los usuarios de M1 que no tengan Python 2.
- Modifica `node_modules/@datadog/mobile-react-native/android/src/main/kotlin/com/datadog/reactnative/DdSdk.kt` para activar el registro detallado desde el SDK nativo:

  ```java
  fun initialize(configuration: ReadableMap, promise: Promise) {
      // ...

      datadog.initialize(appContext, credentials, nativeConfiguration, trackingConsent)
      datadog.setVerbosity(Log.VERBOSE) // Add this line

      // ...
  }
  ```

- Ejecuta la aplicación en un teléfono conectado en modo de depuración a tu portátil (debería aparecer al ejecutar `adb devices`) o desde un emulador.
- Ejecuta pidcat `my.app.package.name` o `adb logcat` desde tu portátil.
- Busca cualquier error en el que se mencione a Datadog.

La salida de Pidcat tiene este aspecto:

{{< img src="real_user_monitoring/react_native/troubleshooting-pidcat-logs.png" alt="Este es un ejemplo de una salida de pidcat" >}}

En este ejemplo, el último log indica que el lote de datos de RUM se ha enviado correctamente.

## Símbolos no definidos: Swift

Si aparece el siguiente mensaje de error

```
Símbolos no definidos para la arquitectura x86_64:
  "static Foundation.JSONEncoder.OutputFormatting.withoutEscapingSlashes.getter : Foundation.JSONEncoder.OutputFormatting", referenciado desde:
      static (extensión en Datadog):Foundation.JSONEncoder.default() -> Foundation.JSONEncoder en libDatadogSDK.a(JSONEncoder.o)
...
```

Abre Xcode, ve a `Build Settings` de tu proyecto (no el destino de tu aplicación) y asegúrate de que las rutas de búsqueda de bibliotecas tengan la siguiente configuración:

```shell
LIBRARY_SEARCH_PATHS = (
  "\"$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)\"",
  "\"/usr/lib/swift\"",
  "\"$(heredado)\"",
);
```

## Símbolos no definidos: _RCTModule

Si ves un símbolo _RCTModule no definido, puede estar relacionado con este cambio en el [changelog de react-native v0.63][4].

Puedes realizar el siguiente cambio para solucionarlo:

```objectivec
// DdSdk.m
// en lugar de
#importar <React/RCTBridgeModule.h>
// es posible que:
@import React // o @import React-Core
```

## Mensajes de error en forma de bucle infinito

Si te encuentras con un [problema en el que tu proyecto de React Native muestra un flujo (stream) de mensajes de error y aumenta significativamente el uso de la CPU][5], intenta crear un nuevo proyecto de React Native.

## Fallos de compilación de Android con la versión 2.* del SDK

### No es posible que Java.lang.String Java.io.File.path final privado de campo sea accesible

Si tu compilación de Android falla con un error como:

```
FALLO: Fallo de la compilación con una excepción.

* What went wrong:
Fallo en la ejecución de la tarea ':app:processReleaseMainManifest'.
> No es posible que Java.lang.String Java.io.File.path final privado de campo sea accesible: el módulo Java.base no "abre Java.io" al módulo sin nombre @1bbf7f0e
```

Estás utilizando Java 17, que no es compatible con tu versión de React Native. Cambia a Java 11 para solucionar el problema.

### java.lang.UnsupportedClassVersionError

Si tu compilación de Android falla con un error como:

```
java.lang.UnsupportedClassVersionError: com/datadog/android/lint/DatadogIssueRegistry se ha compilado con una versión más reciente del Java Runtime (archivo de clase versión 61.0), esta versión del Java Runtime solo reconoce archivos de clase de las versiones hasta 55.0
```

Estás utilizando una versión demasiado antigua de Java. Cambia a Java 17 para solucionar el problema.

### Archivo de clase no compatible versión principal 61

Si tu compilación de Android falla con un error como:

```
FALLO: La compilación falló con una excepción.

* What went wrong:
No se pudieron determinar las dependencias de la tarea ':app:lintVitalRelease'.
> No se pudieron resolver todos los artefactos para la configuración ':app:debugRuntimeClasspath'.
   > Error al transformar dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) para que coincida con los atributos {artifactType=android-manifest, org.gradle.category=biblioteca, org.gradle.dependency.bundling=externo, org.gradle.libraryelements=aar, org.gradle.status=versión, org.gradle.usage=java-runtime}.
      > Error de ejecución para JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Error al transformar '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' usando Jetifier. Motivo: IllegalArgumentException, mensaje: Archivo de clase no compatible versión principal 61. (Ejecutar con --stacktrace para obtener más detalles).
```

Estás utilizando una versión del complemento de Android Gradle inferior a `5.0`. Para solucionar el problema, añade en tu archivo `android/gradle.properties`:

```propiedades
android.jetifier.ignorelist=dd-sdk-android-core
```

### Clase duplicada kotlin.collections.jdk8.*

Si tu compilación de Android falla con un error como:

```
FALLO: Falló la compilación con una excepción.

* What went wrong:
Fallo en la ejecución de la tarea ':app:checkReleaseDuplicateClasses'.
> Se ha producido un fallo al ejecutar com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Clase duplicada kotlin.collections.jdk8.CollectionsJDK8Kt encontrada en los módulos jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) y jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Clase duplicada kotlin.internal.jdk7.JDK7PlatformImplementations encontrada en los módulos jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) y jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

Necesitas configurar una versión de Kotlin para tu proyecto para evitar conflictos entre las dependencias de Kotlin. En tu archivo `android/build.gradle`, especifica la versión `kotlinVersion`:

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Alternativamente, puedes añadir las siguientes reglas a tu script de compilación en tu archivo `android/app/build.gradle`:

``groovy
dependencias {
    restricciones {
        implementación("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.21") {
            porque("kotlin-stdlib-jdk7 forma ahora parte de kotlin-stdlib")
        }
        implementación("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.21") {
            porque("kotlin-stdlib-jdk8 forma ahora parte de kotlin-stdlib")
        }
    }
}
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help
[2]: https://github.com/JakeWharton/pidcat
[3]: https://github.com/JakeWharton/pidcat/issues/180#issuecomment-1124019329
[4]: https://github.com/facebook/react-native/commit/6e08f84719c47985e80123c72686d7a1c89b72ed
[5]: https://github.com/facebook/react-native/issues/28801