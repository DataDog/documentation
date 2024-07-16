---
description: Recopila logs desde tus aplicaciones de Android.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: dd-sdk-android Source code
- link: logs/explorer
  tag: Documentación
  text: Aprende a explorar tus logs
kind: documentación
title: Recopilación de logs de Android
---

## Información general

Envía logs a Datadog desde tus aplicaciones de Android con [la biblioteca de registro del cliente `dd-sdk-android-logs` de Datadog][1] y aprovecha las siguientes características:

* Loguear en Datadog en formato JSON de forma nativa.
* Añadir `context` y atributos personalizados adicionales a cada log enviado.
* Reenviar excepciones capturadas de Java o Kotlin.
* Registrar las direcciones IP reales de los clientes y los Agents de usuario.
* Uso optimizado de red con envíos masivos automáticos.

## Configuración

1. Añade la dependencia de Gradle declarando la biblioteca como una dependencia en el archivo `build.gradle` a nivel de módulo. Asegúrate de sustituir `x.x.x` en el siguiente ejemplo por la última versión de [dd-sdk-android-logs][2].

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-logs:x.x.x"
    }
    ```

2. Inicializa el SDK de Datadog con el contexto de tu aplicación, el consentimiento de rastreo, así como el [token de cliente de Datadog][3]. Por motivos de seguridad, debes utilizar un token de cliente; no puedes utilizar [claves de API de Datadog][4] para configurar el SDK de Datadog, ya que se expondrían en el lado del cliente en el código de bytes APK de la aplicación de Android.

   `APP_VARIANT_NAME` especifica la variante de la aplicación que genera los datos. Se requiere en las credenciales de inicialización; utiliza tu valor `BuildConfig.FLAVOR` o una cadena vacía si no tienes variantes. El archivo `mapping.txt` de ProGuard apropiado se cargará automáticamente en el momento de la compilación, lo que te permitirá ver las stack traces de errores desenmascaradas. Para más información, consulta [Informe de fallas y Rastreo de errores de Android][5].

   Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre el token de cliente][3].

   {{< site-region region="us" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                   clientToken = <CLIENT_TOKEN>,
                   env = <ENV_NAME>,
                   variant = <APP_VARIANT_NAME>
               ).build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="eu" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.EU1)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.EU1)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="us3" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.US3)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US3)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="us5" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.US5)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US5)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="gov" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.US1_FED)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.US1_FED)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="ap1" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       class SampleApplication : Application() {
           override fun onCreate() {
               super.onCreate()
               val configuration = Configuration.Builder(
                        clientToken = <CLIENT_TOKEN>,
                        env = <ENV_NAME>,
                        variant = <APP_VARIANT_NAME>
                    )
                    .useSite(DatadogSite.AP1)
                    .build()
               Datadog.initialize(this, configuration, trackingConsent)
           }
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       public class SampleApplication extends Application {
           @Override
           public void onCreate() {
               super.onCreate();
               Configuration configuration =
                       new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                               .useSite(DatadogSite.AP1)
                               .build();
               Datadog.initialize(this, configuration, trackingConsent);
           }
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   Para cumplir con la normativa GDPR, el SDK requiere el valor de consentimiento de rastreo en la inicialización.
   El consentimiento de rastreo puede ser uno de los siguientes valores:
   * `TrackingConsent.PENDING`: el SDK comienza a recopilar y procesar en lotes los datos, pero no los envía al endpoint de recopilación
     de datos. El SDK espera al nuevo valor de consentimiento de rastreo para decidir qué hacer con los datos por lotes.
   * `TrackingConsent.GRANTED`: el SDK comienza a recopilar los datos y los envía al endpoint de recopilación de datos.
   * `TrackingConsent.NOT_GRANTED`: el SDK no recopila ningún dato. No podrás enviar manualmente ningún log, traza (trace), o
     eventos de RUM.

   Para actualizar el consentimiento de rastreo una vez inicializado el SDK, llama a: `Datadog.setTrackingConsent(<NEW CONSENT>)`.
   El SDK cambia su comportamiento en función del nuevo consentimiento. Por ejemplo, si el consentimiento de rastreo actual es `TrackingConsent.PENDING` y lo actualizas a:
   * `TrackingConsent.GRANTED`: el SDK envía todos los datos actuales procesados por lotes y los datos futuros directamente al endpoint de recopilación de datos.
   * `TrackingConsent.NOT_GRANTED`: el SDK borra todos los datos procesados por lotes y no recopila datos futuros.

   Utiliza el método de utilidad `isInitialized` para comprobar si el SDK está correctamente inicializado:

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```

   Al redactar tu aplicación, puedes habilitar los logs de desarrollo invocando al método `setVerbosity`. Todos los mensajes internos de la biblioteca con una prioridad igual o superior al nivel proporcionado se loguean en Logcat de Android:
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. Configurar y activar la función de logs:

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logsConfig = LogsConfiguration.Builder().build()
        Logs.enable(logsConfig)
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        LogsConfiguration logsConfig = new LogsConfiguration.Builder().build();
        Logs.enable(logsConfig);
   ```
   {{% /tab %}}
   {{< /tabs >}}

4. Configurar el registrador de Android:

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logger = Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build()
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        Logger logger = new Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

5. Envía una entrada personalizada de log directamente a Datadog con una de las siguientes funciones:

    ```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning...")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
    ```

6. Las excepciones detectadas pueden enviarse con un mensaje:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       try { 
           doSomething() 
       } catch (e: IOException) {
           logger.e("Error while doing something", e) 
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       try {
           doSomething();
       } catch (IOException e) {
           logger.e("Error while doing something", e);
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}

    **Nota**: Todos los métodos de registro pueden tener un throwable adjunto.

7. (Opcional) Proporciona un mapa junto a tu mensaje de log para añadir atributos al log emitido. Cada entrada del mapa se añade como un atributo.

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       logger.i("onPageStarted", attributes = mapOf("http.url" to url))
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       Map<String, Object> attributes = new HashMap<>();
       attributes.put("http.url", url);
       logger.i("onPageStarted", null, attributes);
   ```
   {{% /tab %}}
   {{< /tabs >}}

8. Si necesitas modificar algunos atributos en tus eventos de log antes del almacenamiento en lotes, puedes hacerlo proporcionando una implementación de `EventMapper<LogEvent>` al inicializar la función de logs:

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       val logsConfig = LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       LogsConfiguration logsConfig = new LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **Nota**: Si devuelves null (nulo) o una instancia diferente de la implementación de `EventMapper<LogEvent>`, se eliminará el evento.

## Registro avanzado

### Inicialización del registrador

Los siguientes métodos en `Logger.Builder` se pueden utilizar al inicializar el registrador para enviar logs a Datadog:

| Método                           | Descripción                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | Añade el atributo `network.client.connectivity` a todos los logs. Los datos registrados por defecto son `connectivity` (`Wifi`, `3G`, `4G`...) y `carrier_name` (`AT&T - US`). `carrier_name` solo está disponible para la API de Android nivel 28+.                                     |
| `setService(<SERVICE_NAME>)` | Establece `<SERVICE_NAME>` como valor para el [atributo estándar][6] `service` adjunto a todos los logs enviados a Datadog.                                                                                                                                                           |
| `setLogcatlogsEnabled(true)`     | Establécelo en `true` para utilizar Logcat como registrador.                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| Establécelo en `true` (por defecto) para agrupar los logs con la traza activa en tu aplicación. Este parámetro te permite visualizar todos los logs enviados durante una traza específica utilizando el dashboard de Datadog.                                                        |
| `setBundleWithRumEnabled(true)`| Establécelo en `true` (por defecto) para agrupar los logs con el contexto RUM actual en tu aplicación. Este parámetro te permite visualizar todos los logs enviados mientras una Vista específica está activa utilizando Datadog RUM Explorer.                                                        |
| `setName(<LOGGER_NAME>)`   | Establece `<LOGGER_NAME>` como el valor para el atributo `logger.name` adjunto a todos los logs enviados a Datadog.                                                                                                                                                                  |
| `setRemoteSampleRate(<SAMPLE_RATE>)`   | Establece la frecuencia de muestreo para este registrador. Todos los logs producidos por la instancia del registrador se muestrean aleatoriamente según la frecuencia de muestreo proporcionada (por defecto 1.0 = todos los logs). **Nota**: Los logs de Logcat no se muestrean.            |
| `build()`                        | Crea una nueva instancia del registrador con todas las opciones configuradas.                                                                                                                                                                                                                       |

### Configuración global

A continuación, encuentra funciones para añadir/eliminar etiquetas y atributos a todos los logs enviados por un registrador dado.

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

Para más información, consulta [Empezando con etiquetas][7].

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

El `<ATTRIBUTE_VALUE>` puede ser cualquier tipo elemental, `String`, o fecha.

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

Esto significa que aunque los usuarios abran tu aplicación estando desconectados, no se perderá ningún dato.

Los datos en disco se descartarán automáticamente si son demasiado antiguos para garantizar que el SDK no utilice demasiado espacio en disco.

Antes de que el dato se suba a Datadog, se almacena en formato de texto en el directorio de la caché de tu aplicación. Esta carpeta de la caché está protegida por [Android's Application Sandbox][8], lo que significa que en la mayoría de los dispositivos estos datos no pueden ser leídos por otras aplicaciones. Sin embargo, si el dispositivo móvil está rooteado o alguien manipula el núcleo de Linux, los datos almacenados pueden llegar a ser legibles.

## Extensiones

### Timber

Si tu código base existente utiliza Timber, puedes reenviar todos esos logs a Datadog automáticamente mediante la [biblioteca dedicada][9].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-logs
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/CHANGELOG.md
[3]: /es/account_management/api-app-keys/#client-tokens
[4]: /es/account_management/api-app-keys/#api-keys
[5]: /es/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[6]: /es/logs/processing/attributes_naming_convention/
[7]: /es/getting_started/tagging/
[8]: https://source.android.com/security/app-sandbox
[9]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-timber