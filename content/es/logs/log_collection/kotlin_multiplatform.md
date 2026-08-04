---
description: Recopila logs de tus aplicaciones de Kotlin Multiplatform.
further_reading:
- link: https://github.com/DataDog/dd-sdk-kotlin-multiplatform
  tag: Código fuente
  text: código fuente dd-sdk-kotlin-multiplatform
- link: logs/explorer
  tag: Documentación
  text: Aprender a explorar tus logs
title: Recopilación de datos de Kotlin Multiplatform
---

## Información general

Envíe logs a Datadog desde tus aplicaciones Android o iOS con [la biblioteca de registro `dd-sdk-kotlin-multiplatform-logs` del lado del cliente de Datadog][1] y utiliza las siguientes funciones:

* Loguear en Datadog en formato JSON de forma nativa.
* Añade `context` y atributos personalizados adicionales a cada log enviado.
* Reenviar excepciones capturadas de Java o Kotlin.
* Reenviar errores de iOS.
* Registrar las direcciones IP reales de los clientes y los Agents de usuario.
* Optimizar el uso de red con envíos masivos automáticos.

## Configuración

1. Añade la dependencia de Gradle al conjunto de fuentes comunes declarando la biblioteca como dependencia en el archivo `build.gradle.kts` a nivel de módulo. Asegúrate de sustituir `x.x.x` en el siguiente ejemplo por la última versión de [`dd-sdk-kotlin-multiplatform-logs`][2].

```kotlin
kotlin {
  sourceSets {
    commonMain.dependencies {
      implementation("com.datadoghq:dd-sdk-kotlin-multiplatform-logs:x.x.x")
    }
  }
}
```

2. Añadir dependencias nativas para iOS.

    **Nota**: Se requiere Kotlin 2.0.20 o posterior si el seguimiento de fallos está activado en iOS. De lo contrario, debido a la compatibilidad con `PLCrashReporter`, la aplicación puede bloquearse si el seguimiento de fallos está activado.

    Añade las siguientes dependencias del SDK de Datadog iOS, necesarias para el paso de vinculación:

    * `DatadogCore`
    * `DatadogLogs`
    * `DatadogCrashReporting`

    **Nota**: Las versiones de estas dependencias deben alinearse con la versión utilizada por el propio SDK de Datadog Kotlin Multiplatform. Puedes encontrar la asignación completa de versiones del SDK de iOS para cada versión del SDK de Kotlin Multiplatform en la [guía de compatibilidad de versiones][6]. Si estás utilizando el SDK de Kotlin Multiplatform versión 1.3.0 o inferior, añade la dependencia `DatadogObjc` en lugar de `DatadogCore` y `DatadogLogs`.

    #### Añadir dependencias nativas de iOS mediante el complemento CocoaPods

    Si estás utilizando la biblioteca de Kotlin Multiplatform como una dependencia de CocoaPods para tu aplicación iOS, puedes añadir dependencias como sigue:

    ```kotlin
    cocoapods {
        // ...

        framework {
            baseName = "sharedLib"
        }

        pod("DatadogCore") {
            linkOnly = true
            version = x.x.x
        }

        pod("DatadogLogs") {
            linkOnly = true
            version = x.x.x
        }

        pod("DatadogCrashReporting") {
            linkOnly = true
            version = x.x.x
        }
    }
    ```

    #### Añadir dependencias nativas de iOS con Xcode

    Si estás integrando la biblioteca de Kotlin Multiplatform como framework con una tarea Gradle `embedAndSignAppleFrameworkForXcode` como parte de tu compilación en Xcode, puedes añadir las dependencias necesarias directamente en Xcode de la siguiente manera:

    1. Haz clic en tu proyecto en Xcode y ve a la pestaña **Package Dependencies** (Dependencias del paquete).
    2. Añade la dependencia del paquete del SDK de iOS añadiendo `https://github.com/DataDog/dd-sdk-ios.git` como URL del paquete.
    3. Selecciona la versión en la tabla anterior.
    4. Haz clic en el objetivo de aplicación necesario y abre la pestaña **General**.
    5. Desplázase hacia abajo hasta la sección  **Frameworks, Libraries, and Embedded Content** (Frameworks, bibliotecas y contenido incrustado) y añade las dependencias mencionadas anteriormente.

3. Inicializa el kit de desarrollo de software (SDK) de Datadog con el contexto de tu aplicación (solo para Android; puede ser `null` para iOS), el consentimiento de seguimiento y el [token de cliente de Datadog][2]. Por motivos de seguridad, debes utilizar un token de cliente; no puedes utilizar [claves de API de Datadog][3] para configurar el kit de desarrollo de software (SDK) de Datadog, ya que se expondrían en el lado del cliente en el código de bytes de APK de la aplicación Android.

   Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre el token de cliente][2].

```kotlin
// in common source set
fun initializeDatadog(context: Any? = null) {
    // context should be application context on Android and can be null on iOS
    val appClientToken = <CLIENT_TOKEN>
    val appEnvironment = <ENV_NAME>
    val appVariantName = <APP_VARIANT_NAME>

    val configuration = Configuration.Builder(
            clientToken = appClientToken,
            env = appEnvironment,
            variant = appVariantName
    ){{< region-param key=kotlin_multiplatform_site_config >}}
        .build()

    Datadog.initialize(context, configuration, trackingConsent)
}
```

    Para cumplir con el GDPR, el kit de desarrollo de software (SDK) requiere el valor de consentimiento de seguimiento en la inicialización.
    El consentimiento de seguimiento puede ser uno de los siguientes valores:

    - `TrackingConsent.PENDING`: (Predeterminado) el kit de desarrollo de software (SDK) inicia la recopilación y el procesamiento por lotes de los datos, pero no los envía al
    endpoint de recopilación. El kit de desarrollo de software (SDK) espera al nuevo valor de consentimiento de seguimiento para decidir qué hacer con los datos por lotes.
    - `TrackingConsent.GRANTED`: el kit de desarrollo de software (SDK) comienza a recopilar los datos y los envía al endpoint de recopilación de datos.
    - `TrackingConsent.NOT_GRANTED`: el kit de desarrollo de software (SDK) no recopila ningún dato. No es posible enviar manualmente ningún log, traza o
    eventos RUM.

    Para actualizar el consentimiento de seguimiento una vez inicializado el kit de desarrollo de software (SDK), llama a `Datadog.setTrackingConsent(<NEW CONSENT>)`. El kit de desarrollo de software (SDK) cambia su comportamiento de acuerdo con el nuevo consentimiento. Por ejemplo, si el consentimiento de seguimiento actual es `TrackingConsent.PENDING` y lo actualizas a:

    - `TrackingConsent.GRANTED`: el kit de desarrollo de software (SDK) envía todos los datos actuales por lotes y los datos futuros directamente al endpoint de recopilación de datos.
    - `TrackingConsent.NOT_GRANTED`: el kit de desarrollo de software (SDK) borra todos los datos por lotes y no recopila ningún dato futuro.

Utiliza el método de utilidad `isInitialized` para comprobar si el SDK se ha inicializado correctamente:

   ```kotlin
   if (Datadog.isInitialized()) {
      // your code here
   }
   ```

   Al escribir tu aplicación, puedes habilitar los logs de desarrollo llamando al método `setVerbosity`. Todos los mensajes internos de la biblioteca con una prioridad igual o superior al nivel proporcionado se registran entonces en Logcat (Android) o en la consola del depurador de Xcode (iOS):
   ```kotlin
   Datadog.setVerbosity(SdkLogVerbosity.INFO)
   ```

4. Configura y activa la función Logs:

   ```kotlin
   val logsConfig = LogsConfiguration.Builder().build()
   Logs.enable(logsConfig)
   ```

5. Configura el registrador:

   ```kotlin
   val logger = Logger.Builder()
       .setNetworkInfoEnabled(true)
       .setPrintLogsToConsole(true)
       .setRemoteSampleRate(100f)
       .setBundleWithRumEnabled(true)
       .setName("<LOGGER_NAME>")
       .build()
   ```

6. Envía una entrada personalizada de log directamente a Datadog con una de las siguientes funciones:

    ```kotlin
    logger.debug("A debug message.")
    logger.info("Some relevant information?")
    logger.warn("An important warning...")
    logger.error("An error was met!")
    logger.critical("What a Terrible Failure!")
    ```

7. Las excepciones detectadas pueden enviarse con un mensaje:

   ```kotlin
   try { 
       doSomething() 
   } catch (e: IOException) {
        logger.error("Error while doing something", e) 
   }
   ```

    **Nota**: Todos los métodos de registro pueden tener un `Throwable` (o `NSError` se llama desde la fuente de iOS establecida) unido a ellos.

8. (Opcional) Proporciona un mapa junto a tu mensaje de log para añadir atributos al log emitido. Cada entrada del mapa se añade como un atributo.

   ```kotlin
   logger.info("onPageStarted", attributes = mapOf("http.url" to url))
   ```

9. Si necesitas modificar algunos atributos en tus eventos de log antes de agruparlos por lotes, puedes hacerlo proporcionando una implementación de `EventMapper<LogEvent>` al inicializar la función Logs:

   ```kotlin
   val logsConfig = LogsConfiguration.Builder()
               // ...
               .setEventMapper(logEventMapper)
               .build()
   ```

   **Nota**: Si devuelves null (nulo) o una instancia diferente de la implementación de `EventMapper<LogEvent>`, se eliminará el evento.

## Registro avanzado

### Inicialización del registrador

Puedes utilizar los siguientes métodos en `Logger.Builder` al inicializar el registrador para enviar logs a Datadog:

| Método                           | Descripción                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | Añade el atributo `network.client.connectivity` a todos los logs.<br/>**Android**: los datos recopilados por defecto son:<ul><li/> `connectivity` <ul><li/>`Wifi`, `3G`, `4G`, etc.</ul> <li/>`carrier_name`: solo disponible para la API Android nivel 28+ <ul><li/>`AT&T - US`</ul></ul>. **iOS**: los datos recopilados por defecto son: <ul> <li/>`reachability` <ul> <li/>`yes`, `no`, `maybe`</ul><li/>`available_interfaces` <ul> <li/>`wifi`, `cellular`, etc.</ul><li/> `sim_carrier.name` <ul> <li/>Por ejemplo: `AT&T - US`</ul><li/>`sim_carrier.technology` <ul> <li/>`3G`, `LTE`, etc.</ul><li/> `sim_carrier.iso_country` <ul> <li/>Por ejemplo: `US`</ul></ul>                                    |
| `setService(<SERVICE_NAME>)` | Establece `<SERVICE_NAME>` como valor para el [atributo estándar][4] `service` adjunto a todos los logs enviados a Datadog.                                                                                                                                                           |
| `setPrintLogsToConsole(true)`     | Establece `true` para utilizar Logcat como registrador (Android) o imprimir logs en la consola del depurador en Xcode (iOS).                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| Establécelo en `true` (por defecto) para agrupar los logs con la traza activa en tu aplicación. Este parámetro te permite visualizar todos los logs enviados durante una traza específica utilizando el dashboard de Datadog.                                                        |
| `setBundleWithRumEnabled(true)`| Establécelo en `true` (por defecto) para agrupar los logs con el contexto RUM actual en tu aplicación. Este parámetro te permite visualizar todos los logs enviados mientras una Vista específica está activa utilizando Datadog RUM Explorer.                                                        |
| `setName(<LOGGER_NAME>)`   | Establece `<LOGGER_NAME>` como el valor para el atributo `logger.name` adjunto a todos los logs enviados a Datadog.                                                                                                                                                                  |
| `setRemoteSampleRate(<SAMPLE_RATE>)`   | Establece la frecuencia de muestreo para este registrador. Todos los logs producidos por la instancia del registrador se muestrean aleatoriamente según la frecuencia de muestreo proporcionada (por defecto 1.0 = todos los logs). **Nota**: Los logs de la consola no se muestrean.            |
| `setRemoteLogThreshold(LogLevel)`   | Establece un umbral mínimo (prioridad) para que el log sea enviado a los servidores de Datadog. Si la prioridad de log es inferior a ésta, entonces no se enviará (por defecto se permite todo). **Nota**: Los logs de la consola no se muestrean.            |
| `build()`                        | Crea una nueva instancia del registrador con todas las opciones configuradas.                                                                                                                                                                                                                       |

### Configuración global

Utiliza las siguientes funciones para añadir o eliminar etiquetas y atributos a todos los logs enviados por un registrador determinado.

#### Etiquetas globales

##### Añadir etiquetas

Utiliza la función `addTag("<TAG_KEY>", "<TAG_VALUE>")` para añadir etiquetas a todos los logs enviados por un registrador específico:

```kotlin
// This adds a tag "build_type:debug" or "build_type:release" accordingly
logger.addTag("build_type", BuildConfig.BUILD_TYPE)

// This adds a tag "device:android"
logger.addTag("device", "android")
```

El `<TAG_VALUE>` debe ser una `String`.

##### Eliminar etiquetas

Utiliza la función `removeTagsWithKey("<TAG_KEY>")` para eliminar etiquetas de todos los logs enviados por un registrador específico:

```kotlin
// This removes any tag starting with "build_type"
logger.removeTagsWithKey("build_type")
```

Para más información, consulta [Empezando con etiquetas][5].

#### Atributos globales

##### Añadir atributos

Por defecto, los siguientes atributos se añaden a todos los logs enviados por un registrador:

* `http.useragent` y sus propiedades extraídas `device` y `OS` 
* `network.client.ip` y sus propiedades geográficas extraídas (`country`, `city`)

Utiliza la función `addAttribute("<ATTRIBUTE_KEY>", "<ATTRIBUTE_VALUE>")` para añadir un atributo personalizado a todos los logs enviados por un registrador específico:

```kotlin
// This adds an attribute "version_code" with an integer value
logger.addAttribute("version_code", BuildConfig.VERSION_CODE)

// This adds an attribute "version_name" with a String value
logger.addAttribute("version_name", BuildConfig.VERSION_NAME)
```

El `<ATTRIBUTE_VALUE>` puede ser cualquier tipo primitiva, `String`, o `Date`.

##### Eliminar atributos

Utiliza la función `removeAttribute("<ATTRIBUTE_KEY>", "<ATTRIBUTE_VALUE>")` para eliminar un atributo personalizado de todos los logs enviados por un registrador específico:

```kotlin
// This removes the attribute "version_code" from all further log send.
logger.removeAttribute("version_code")

// This removes the attribute "version_name" from all further log send.
logger.removeAttribute("version_name")
```

## Recopilación de lotes

Todos los logs se almacenan primero en el dispositivo local por lotes. Cada lote sigue la especificación de admisión. Se envían en cuanto la red está disponible, y la batería tiene suficiente carga como para garantizar que el SDK de Datadog no afecte a la experiencia del usuario final. Si la red no está disponible mientras la aplicación está en primer plano, o si falla una carga de datos, el lote se guarda hasta que pueda enviarse correctamente.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato.

Los datos del disco se descartan automáticamente si son demasiado antiguos. Esto garantiza que el kit de desarrollo de software (SDK) no utilice demasiado espacio en disco.

Antes de que los datos se carguen en Datadog, se almacenan en texto claro en el directorio de caché de tu aplicación.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/tree/develop/features/logs
[2]: /es/account_management/api-app-keys/#client-tokens
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/logs/processing/attributes_naming_convention/
[5]: /es/getting_started/tagging/
[6]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/blob/develop/NATIVE_SDK_VERSIONS.md