---
code_lang: android
code_lang_weight: 10
description: Configura Error Tracking en tus aplicaciones Android para monitorizar
  fallos, excepciones y errores de aplicaciones.
further_reading:
- link: /error_tracking/frontend
  tag: Documentación
  text: Error Tracking en el frontend
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: /real_user_monitoring/error_tracking/
  tag: Documentación
  text: Para empezar con Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentación
  text: Visualizar los datos de Error Tracking en el Explorer
title: Notificación de fallos y seguimiento de errores Android
type: lenguaje de código múltiple
---

## Información general

Android [Error Tracking][1] te ofrece una visibilidad completa del estado de tu aplicación móvil mediante la captura automática de fallos, excepciones y errores. Con esta función, puedes:

- Monitorizar la estabilidad de la aplicación en tiempo real con alertas instantáneas de fallos y un seguimiento de la tasa de errores en cualquier versión, dispositivo y segmento de usuarios.
- Depurar los problemas con mayor rapidez gracias a las trazas de stack tecnológico desofuscadas y a las cargas automáticas de archivos de asignación de ProGuard para facilitar la identificación de los problemas.
- Mejorar la calidad de la aplicación detectando las funciones propensas a fallos, realizando un seguimiento de las tendencias de errores y priorizando las correcciones con el fin de mejorar la satisfacción del usuario.
- Acceder a dashboards y atributos agregados de fallos de Android.
- Visualizar informes de fallos de Android desofuscados junto a un análisis de las tendencias.

El SDK de Datadog Android es compatible con Android 5.0+ (nivel de la API 21) y Android TV.

Tus informes de fallos aparecen en [**Error Tracking**][2].

## Configuración

Si aún no has configurado el SDK de Android, sigue las [instrucciones de configuración en la aplicación][3] o consulta la [documentación de configuración de Android][4].

### Paso 1: Declarar el SDK de Android como dependencia

Declara [dd-sdk-android-rum][5] y el [complemento Gradle][6] como dependencias en el archivo `build.gradle` de tu **módulo de aplicación**:

```groovy
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
android {
    //(...)
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-rum:x.x.x" 
    //(...)
}

```

### Paso 2: Especificar la información de la aplicación en la interfaz de usuario

1. Ve a [**Errors** > **Settings** > **Browser and Mobile** > **+ New Application** (Errores > Configuración > Navegador y móvil > + Nueva aplicación)][7].
2. Selecciona `android` como tipo de aplicación e introduce un nombre de la aplicación para generar un ID de la aplicación de Datadog y un token de cliente únicos.
3. Haz clic en **Create Application** (Crear aplicación).



### Paso 3: Inicializar el SDK de Datadog con el contexto de la aplicación

#### Actualizar el fragmento de inicialización

En el fragmento de inicialización, define un nombre de entorno, un nombre de servicio y un número de versión. En los ejemplos siguientes, `APP_VARIANT_NAME` especifica la variante de la aplicación que genera datos. Para obtener más información, consulta [Uso de etiquetas][10].

Durante la inicialización, también puedes definir la frecuencia de muestreo (sesiones RUM) y el consentimiento de seguimiento para el cumplimiento del RGPD, como se describe a continuación. Consulta [otras opciones de configuración][11] para inicializar la biblioteca.

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
{{< tab >}}
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

{{< site-region region="ap2" >}}
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
            .useSite(DatadogSite.AP2)
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
                        .useSite(DatadogSite.AP2)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

Las credenciales de inicialización requieren el nombre de variante de tu aplicación y utilizan el valor de `BuildConfig.FLAVOR`. Con la variante, el SDK puede hacer coincidir los errores informados desde tu aplicación con los archivos de asignación cargados por el complemento Gradle. Si no tienes variantes, las credenciales utilizan una cadena vacía. 

El complemento Gradle carga automáticamente el archivo `mapping.txt` ProGuard adecuado en el momento de la compilación para que puedas ver las trazas (traces) de error de stack tecnológico desofuscadas. Para obtener más información, consulta la sección [Cargar el archivo de asignación](#upload-your-mapping-file).

#### Activar la función para iniciar el envío de datos

Para permitir que el SDK Android comience a enviar datos:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
    val rumConfig = RumConfiguration.Builder(applicationId)
      .trackUserInteractions()
      .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
      .useViewTrackingStrategy(strategy)
      .build()
    Rum.enable(rumConfig)
```
{{% /tab %}}

{{% tab "Java" %}}
```java
    RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      .trackUserInteractions()
      .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
      .useViewTrackingStrategy(strategy)
      .build();
    Rum.enable(rumConfig);
```

{{% /tab %}}
{{< /tabs >}}

Consulta [`ViewTrackingStrategy`][12] para activar el seguimiento automático de todas tus vistas (actividades, fragmentos, etc.).

#### Instrumentar tus WebViews (opcional)

Si tu aplicación Android utiliza WebViews para mostrar contenido web, puedes instrumentarlos para rastrear errores y fallos de JavaScript que ocurran dentro del contenido web.

Para instrumentar tus WebViews:

1. Añade la dependencia Gradle declarando dd-sdk-android-webview como dependencia en tu archivo build.gradle:

   ```groovy
   dependencies {
    implementation "com.datadoghq:dd-sdk-android-webview:<latest_version>"
   }
   ```
2. Habilita el seguimiento de WebViews de una instancia WebView dada proporcionando una lista de hosts para realizar un seguimiento:

   ```groovy
   WebViewTracking.enable(webView, hosts)
   ```

Para obtener más información, consulta [Seguimiento de WebViews][8].

### Paso 4: Añadir informes de fallos del NDK

Si tu aplicación Android utiliza código nativo (C/C++) a través del Android NDK (Native Development Kit), puedes realizar un seguimiento de los fallos que se producen en este código nativo. El código nativo se utiliza a menudo para operaciones críticas para el rendimiento, el procesamiento de imágenes o cuando se reutilizan bibliotecas C/C++ existentes.

Sin los informes de fallos del NDK, los fallos de tu código nativo no aparecen en Error Tracking, lo que dificulta la depuración de problemas en esta parte de tu aplicación.

Para activar el informe de fallos del NDK, utiliza el complemento Datadog NDK:

1. Añade la dependencia de Gradle declarando la biblioteca como dependencia en tu archivo `build.gradle`:

   ```kotlin
    dependencies {
        implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
        //(...)
    }
   ```
2. Habilita la recopilación de fallos del NDK luego de inicializar el SDK:

    ``` kotlin
    NdkCrashReports.enable()
    ```

### Paso 5: Añadir informes de una ANR

Una "Aplicación que no responde" ([ANR][18]) es un tipo de error específico de Android que se activa cuando la aplicación no responde durante demasiado tiempo. Puedes añadir informes de ANR a tu configuración de RUM para monitorizar estos problemas con las respuestas de las aplicaciones.

Para habilitar los informes de ANR, añade lo siguiente a tu configuración de RUM:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold)
    .trackNonFatalAnrs(true) // Enable non-fatal ANR reporting
    .useViewTrackingStrategy(strategy)
    .build()
Rum.enable(rumConfig)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold)
    .trackNonFatalAnrs(true) // Enable non-fatal ANR reporting
    .useViewTrackingStrategy(strategy)
    .build();
Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

Los casos de ANR sólo se notifican a través del SDK (no a través de los logs).

#### Notificación de ANR fatales
Los casos de ANR fatales provocan fallos. La aplicación informa de ellos cuando no responde, lo que lleva a que el sistema operativo Android muestre un cuadro de diálogo emergente al usuario, que decide forzar el cierre de la aplicación a través de la ventana emergente.

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="Informe de fallo fatal en Error Tracking." >}}

- En la página de **Error Tracking**, las ANR fatales se agrupan en función de su similitud, lo que puede dar lugar a la creación de varios **problemas individuales**.
- Por defecto, Datadog captura las ANR fatales a través de la [API ApplicationExitInfo][19] (disponible a partir de *[Android v30 o posteriores][20]*), que pueden ser leídas en el siguiente lanzamiento de la aplicación.
- En *[Android v29][21] y anteriores*, no es posible informar de ANR fatales.

#### Notificación de ANR no fatales
Los casos de ANR no fatales pueden o no haber provocado el cierre de la aplicación (fallo).

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="Informe de fallo no fatal en Error Tracking." >}}

- En la página de **Error Tracking**, las ANR no fatales se agrupan en un **problema único** debido a su nivel de ruido
- Por defecto, la notificación de casos de ANR no fatales en *Android v30 o posteriores* está **deshabilitada**, ya que crearía demasiado ruido sobre los casos de ANR fatales. Sin embargo, en *Android v29* y anteriores, la notificación de casos de ANR no fatales está **habilitada** por defecto, ya que en esas versiones no se pueden notificar casos de ANR fatales.

Para cualquier versión de Android, puedes anular la configuración predeterminada para la notificación de casos de ANR no fatales definiendo `trackNonFatalAnrs` como `true` o `false` al inicializar el SDK.


###  Paso 6: Obtener trazas de stack tecnológico desofuscadas

Cuando se crea una aplicación Android para producción, el código suele ofuscarse con ProGuard o R8 para reducir el tamaño de la aplicación y proteger la propiedad intelectual. Esta ofuscación hace que las trazas de stack tecnológico de los informes de fallos sean ilegibles, mostrando nombres de clases y métodos sin sentido como `a.b.c()` en lugar de `com.example.MyClass.myMethod()`.

Para que estas trazas de stack tecnológico sean legibles para la depuración, debes cargar tus archivos de asignación en Datadog. Estos archivos contienen la asignación entre el código ofuscado y el original, lo que permite a Datadog desofuscar automáticamente las trazas de stack tecnológico en tus informes de error.

#### Cómo funciona

Datadog utiliza un ID de compilación único generado para cada compilación con el fin de hacer coincidir automáticamente las trazas de stack tecnológico con los archivos de asignación correctos. Esto garantiza que:

- Las trazas de stack tecnológico siempre se desofuscan con el archivo de asignación correcto, independientemente de cuándo se haya cargado.
- Puedes cargar archivos de asignación durante las compilaciones de preproducción o producción.
- El proceso funciona a la perfección en diferentes variantes y entornos de compilación.

El proceso de emparejamiento depende de la versión de tu [complemento Gradle para Android][22]:

- **Versiones 1.13.0 y superiores**: Utiliza el campo `build_id` (requiere el SDK Android para Datadog v2.8.0 o posteriores).
- **Versiones anteriores**: Utiliza una combinación de los campos `service`, `version` y `variant` 

#### Carga de tu archivo de asignación

El complemento Gradle para Android automatiza el proceso de carga de archivos de asignación. Una vez configurado, carga automáticamente el archivo de asignación ProGuard/R8 adecuado para cada variante de compilación al compilar la aplicación.

**Nota**: Al volver a cargar un archivo de asignación no se anula el existente, si la versión no ha cambiado. Para obtener información sobre las limitaciones de tamaño de los archivos y otras restricciones, consulta la sección [Limitaciones](#limitations).

#### Ejecutar las tareas de carga

Después de configurar el complemento, ejecuta las tareas de Gradle para cargar tu archivo de asignación Proguard/R8 y los archivos de símbolos NDK a Datadog:

```bash
./gradlew uploadMappingRelease
./gradlew uploadNdkSymbolFilesRelease
```

Para cualquier error, puedes acceder a la ruta del archivo, al número de línea y a un fragmento de código para cada marco de la trace (traza) de stack tecnológico.

{{< tabs >}}
{{% tab "US" %}}

1. Añade el [complemento Gradle para Android][22] a tu proyecto de Gradle utilizando el siguiente fragmento de código.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Crea una clave de API Datadog exclusiva][23] y expórtala como una variable de entorno llamada `DD_API_KEY` o `DATADOG_API_KEY`. Alternativamente, pásala como una propiedad de la tarea, o si tienes el archivo `datadog-ci.json` en la raíz de tu proyecto, se puede tomar de una propiedad `apiKey` allí.
3. También puedes configurar el complemento para cargar archivos a la región UE configurando el complemento en tu script `build.gradle`:

   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Ejecuta la tarea de carga después de tus compilaciones APK ofuscadas:

   ```bash
   ./gradlew uploadMappingRelease
   ```

5. Si ejecutas código nativo, ejecuta la tarea de carga de símbolos NDK:
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Nota**: Si tu proyecto utiliza opciones adicionales, el complemento proporciona una tarea de carga para cada variante con la ofuscación habilitada. En este caso, inicializa el SDK de Android con un nombre de variante adecuado (la API necesaria está disponible en las versiones `1.8.0` y posteriores).

[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "UE" %}}
1. Añade el [complemento Gradle para Android][22] a tu proyecto de Gradle utilizando el siguiente fragmento de código.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Crea una clave de API Datadog exclusiva][23] y expórtala como una variable de entorno llamada `DD_API_KEY` o `DATADOG_API_KEY`. Alternativamente, pásala como una propiedad de la tarea, o si tienes el archivo `datadog-ci.json` en la raíz de tu proyecto, se puede tomar de una propiedad `apiKey` allí.
3. Configura el complemento para utilizar la región UE, añadiendo el siguiente fragmento en el archivo de script `build.gradle` de tu aplicación:

   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Ejecuta la tarea de carga después de tus compilaciones APK ofuscadas:

   ```bash
   ./gradlew uploadMappingRelease
   ```

5. Si ejecutas código nativo, ejecuta la tarea de carga de símbolos NDK:
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Nota**: Si tu proyecto utiliza opciones adicionales, el complemento proporciona una tarea de carga para cada variante con la ofuscación habilitada. En este caso, inicializa el SDK de Android con un nombre de variante adecuado (la API necesaria está disponible en las versiones `1.8.0` y posteriores).

[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

#### Lista de archivos de asignación cargados

Consulta la página [Símbolos de depuración RUM][24] para ver todos los símbolos cargados.

## Funciones avanzadas de Error Tracking 

{{% collapse-content title="Configurar el consentimiento de seguimiento (cumplimiento del RGPD)" level="h4" expanded=false id="set-tracking-consent" %}}

Para cumplir con la normativa del RGPD, el SDK requiere el valor de consentimiento de seguimiento en el momento de la inicialización.

El consentimiento de seguimiento puede ser uno de los siguientes valores:

- `TrackingConsent.PENDING`: (Predeterminado) El SDK comienza a recopilar los datos y a procesarlos por lotes, pero no los envía al
 endpoint de recopilación. El SDK espera el nuevo valor del consentimiento de rastreo para decidir qué hacer con los datos procesados por lotes.
- `TrackingConsent.GRANTED`: el SDK comienza a recopilar los datos y los envía al endpoint de recopilación de datos.
- `TrackingConsent.NOT_GRANTED`: El SDK no recopila ningún dato. No puedes enviar manualmente ningún log, traza o evento.

Para actualizar el consentimiento de seguimiento luego de inicializar el SDK, llama a `Datadog.setTrackingConsent(<NEW CONSENT>)`. El SDK cambia de comportamiento de acuerdo con el nuevo consentimiento. Por ejemplo, si el consentimiento de seguimiento actual es `TrackingConsent.PENDING` y lo actualizas a:

- `TrackingConsent.GRANTED`: el SDK envía todos los datos actuales procesados por lotes y los datos futuros directamente al endpoint de recopilación de datos.
- `TrackingConsent.NOT_GRANTED`: el SDK borra todos los datos procesados por lotes y no recopila datos futuros.

{{% /collapse-content %}}

{{% collapse-content title="Frecuencia de muestreo de sesiones" level="h4" expanded=false id="sample-session-rates" %}}

Para controlar los datos que tu aplicación envía a Datadog, puedes especificar una frecuencia de muestreo para las sesiones al [inicializar RUM][11]. La frecuencia es un porcentaje entre 0 y 100. Por defecto, `sessionSamplingRate` se define en 100 (mantener todas las sesiones).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

{{% /collapse-content %}}

{{% collapse-content title="Inicializar el interceptor para realizar un seguimiento de eventos de red" level="h4" expanded=false id="interceptor" %}}

El interceptor de red realiza automáticamente un seguimiento de solicitudes y respuestas HTTP, capturando errores de red, tiempos de espera y problemas de rendimiento que pueden ayudarte a correlacionar problemas de red con fallos de la aplicación y problemas con la experiencia del usuario. Para inicializar un interceptor para el seguimiento de eventos de red:

1. Para el rastreo distribuido, [añade y activa la función de rastreo][13].
2. Añade la dependencia de Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel de módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. Para rastrear tus solicitudes OkHttp como recursos, añade el [interceptor][14] proporcionado:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHostsWithHeaderType = mapOf(
    "example.com" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT),
    "example.eu" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT))
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}

{{% tab "Java" %}}

```java
Map<String, Set<TracingHeaderType>> tracedHostsWithHeaderType = new HashMap<>();
Set<TracingHeaderType> datadogAndW3HeadersTypes = new HashSet<>(Arrays.asList(TracingHeaderType.DATADOG, TracingHeaderType.TRACECONTEXT));
tracedHostsWithHeaderType.put("example.com", datadogAndW3HeadersTypes);
tracedHostsWithHeaderType.put("example.eu", datadogAndW3HeadersTypes);
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

4. Para crear automáticamente recursos y tramos (spans) RUM para tus solicitudes OkHttp, utiliza el `DatadogInterceptor` como interceptor.
   - Esto registra cada solicitud procesada por `OkHttpClient` como un recurso, con toda la información relevante (URL, método, código de estado y error) rellenada automáticamente. Sólo se realiza un seguimiento de las solicitudes de red que se iniciaron cuando una vista estaba activa. Para realizar un seguimiento de las solicitudes cuando tu aplicación está en segundo plano, [crea una vista manualmente][15].

5. Para monitorizar los redireccionamientos o reintentos de red, puedes utilizar el `DatadogInterceptor` como [interceptor de red][16]:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder()
    .addNetworkInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addNetworkInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

**Notas**:
- Para utilizar tramos pero no recursos RUM, puedes utilizar `TracingInterceptor` en lugar de `DatadogInterceptor`, como se ha descrito anteriormente.
- Si utilizas varios interceptores, añade `DatadogInterceptor` primero.

También puedes añadir un `EventListener` para que `OkHttpClient` [realice automáticamente un seguimiento del tiempo de los recursos][17] para proveedores externos y solicitudes de red.

{{% /collapse-content %}}

{{% collapse-content title="Realizar un seguimiento de eventos en segundo plano" level="h4" expanded=false id="track-background-events" %}}

Puedes rastrear eventos como bloqueos y solicitudes de red cuando tu aplicación esté en segundo plano (por ejemplo, si no hay una vista activa disponible).

Añade el siguiente fragmento durante la configuración:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-info"><p>El rastreo de eventos en segundo plano puede dar lugar a sesiones adicionales, lo que puede afectar a la facturación. Si tienes dudas, <a href="https://docs.datadoghq.com/help/">contacta con el equipo de soporte de Datadog.</a></p>
</div>

{{% /collapse-content %}}

{{% collapse-content title="Enviar datos cuando el dispositivo está fuera de línea" level="h4" expanded=false id="sending-data-device-offline" %}}

El SDK de Android garantiza la disponibilidad de los datos cuando el dispositivo de tu usuario está desconectado. En caso de zonas con poca conexión de red o cuando el nivel de carga de la batería del dispositivo es demasiado bajo, todos los eventos se almacenan primero en el dispositivo local en lotes.

Cada lote sigue la especificación de admisión. Los lotes se envían en cuanto la red está disponible y el nivel de batería es lo suficientemente alto como para garantizar que el SDK de Datadog no afectará a la experiencia del usuario final. Si la red no está disponible mientras tu aplicación está en primer plano, o si falla una carga de datos, el lote se conserva hasta que pueda enviarse con éxito.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato. Para garantizar que el SDK no utilice demasiado espacio de disco, los datos del disco se descartan automáticamente si son demasiado antiguos.

{{% /collapse-content %}}

{{% collapse-content title="Opciones de configuración del complemento" level="h4" expanded=false id="plugin-config-options" %}}

Existen varias propiedades del complemento que se pueden configurar a través de la extensión del complemento. En caso de que estés utilizando múltiples variantes, puedes definir un valor de propiedad para una opción específica de la variante.

Por ejemplo, para una variante de `fooBarRelease`, puedes utilizar la siguiente configuración:

```kotlin
datadog {
    foo {
        versionName = "foo"
    }
    bar {
        versionName = "bar"
    }
    fooBar {
        versionName = "fooBar"
    }
}
```

La configuración de la tarea para esta variante se combina a partir de las tres configuraciones de opciones proporcionadas en el siguiente orden:

1. `bar`
2. `foo`
3. `fooBar`

Esto resuelve el valor final de la propiedad `versionName` como `fooBar`.

| Nombre de la propiedad              | Descripción                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | El nombre de la versión de la aplicación (por defecto, la versión declarada en el bloque `android` de tu script `build.gradle` ).                                                                                                               |
| `serviceName`              | El nombre de servicio de la aplicación (por defecto, el nombre de paquete de tu aplicación tal y como se declara en el bloque `android` de tu script `build.gradle` ).                                                                                                                          |
| `site`                     | El sitio Datadog al que cargar los datos (US1, US3, US5, EU1, US1_FED, AP1 o AP2).                                                                                                                                       |
| `remoteRepositoryUrl`      | La URL del repositorio remoto donde se ha desplegado el código fuente. Si no se proporciona, este valor se resuelve desde tu configuración de Git durante el tiempo de ejecución de la tarea.                     |
| `checkProjectDependencies` | Esta propiedad controla si el complemento debe comprobar si el SDK Android para Datadog está incluido en las dependencias. Si no es así, se ignora `none`, `warn` registra una advertencia y `fail` falla la compilación con un error (por defecto). |

{{% /collapse-content %}}

{{% collapse-content title="Integrar con un pipeline CI/CD" level="h4" expanded=false id="plugin-config-options" %}}

Por defecto, la tarea de asignación de cargas es independiente de otras tareas del gráfico de compilación. Cuando necesites asignar cargas, ejecuta la tarea manualmente.

Si quieres ejecutar esta tarea en un pipeline CI/CD y la tarea es necesaria como parte del gráfico de compilación, puedes configurar la tarea de carga para que se ejecute después de que se genere el archivo de asignación.

Por ejemplo:

```kotlin
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```
{{% /collapse-content %}}

## Limitaciones

### Tamaño de los archivos
El tamaño [de los archivos de asignación](#upload-your-mapping-file) está limitado a **500 MB** cada uno. Si tu proyecto tiene un archivo de asignación de mayor tamaño, utiliza una de las siguientes opciones para reducir el tamaño del archivo:

- Define la opción `mappingFileTrimIndents` como `true`. En promedio, esto reduce el tamaño del archivo en un 5%.
- Configura un mapa de `mappingFilePackagesAliases`: Esto sustituye los nombres de paquetes por alias más cortos. **Nota**: Las trazas de stack tecnológico de Datadog utilizan el mismo alias, en lugar del nombre original del paquete, por lo que es mejor utilizar esta opción para dependencias de terceros.

```kotlin
datadog {
    mappingFileTrimIndents = true
    mappingFilePackageAliases = mapOf(
        "kotlinx.coroutines" to "kx.cor",
        "com.google.android.material" to "material",
        "com.google.gson" to "gson",
        "com.squareup.picasso" to "picasso"
    )
}
```

### Recopilación
Al examinar los comportamientos de los informes de fallos RUM para Android, ten en cuenta lo siguiente:

- El fallo sólo puede detectarse una vez inicializado el SDK. Teniendo esto en cuenta, la recomendación es inicializar el SDK lo antes posible en el método `onCreate` de tu aplicación.
- Los fallos RUM deben estar asociados a una vista RUM. Si un fallo se produce antes de que una vista sea visible (normalmente una actividad o fragmento en un estado `onResume`) o después de que la aplicación sea enviada a un segundo plano por el usuario final que deja de utilizarla, el fallo se silencia y no se informa para su recopilación. Para mitigar esta situación, utiliza el [método][25] `trackBackgroundEvents()`en tu compilador `RumConfiguration`.
- Solo se conservan los fallos que se producen en las sesiones muestreadas. Si una [frecuencia de muestreo de sesión no es del 100%][24], algunos fallos no se notifican. 

## Para test tu implementación

Para verificar la configuración de Crash Reporting y Error Tracking Android, necesitas generar un error en tu aplicación y confirmar que el error aparece en Datadog.

Para test tu implementación

1. Ejecuta tu aplicación en un emulador de Android o en un dispositivo real.
2. Ejecuta un código que contenga un error o bloqueo. Por ejemplo:

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. Después de que se produzca el fallo, reinicia tu aplicación y espera a que el SDK Android cargue el informe de fallo en [**Error Tracking**][2].

## Extensiones Kotlin

### extensión `Closeable`

Puedes monitorizar el uso de instancias `Closeable` con el método `useMonitored`, que informa de los errores a Datadog y luego cierra el recurso:

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}
```

### Seguimiento de recursos locales

Puedes rastrear el acceso a los activos mediante la utilización del método de extensión `getAssetAsRumResource`:

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

El uso de los recursos locales puede rastrearse utilizando el método de extensión `getRawResAsRumResource`:

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking/
[2]: https://app.datadoghq.com/rum/error-tracking
[3]: https://app.datadoghq.com/rum/application/create
[4]: /es/real_user_monitoring/application_monitoring/android/setup/#setup
[5]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[6]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[7]: https://app.datadoghq.com/error-tracking/settings/setup/client
[8]: /es/real_user_monitoring/application_monitoring/android/web_view_tracking/
[9]: /es/real_user_monitoring/application_monitoring/android/data_collected/
[10]: /es/getting_started/tagging/using_tags/
[11]: /es/real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters
[12]: /es/real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
[13]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/android/
[14]: https://square.github.io/okhttp/features/interceptors/
[15]: /es/real_user_monitoring/application_monitoring/android/advanced_configuration/#custom-views
[16]: https://square.github.io/okhttp/features/interceptors/#network-interceptors
[17]: /es/real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
[18]: https://developer.android.com/topic/performance/vitals/anr
[19]: https://developer.android.com/reference/android/app/ApplicationExitInfo
[20]: https://developer.android.com/tools/releases/platforms#11
[21]: https://developer.android.com/tools/releases/platforms#10
[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
[24]: https://app.datadoghq.com/source-code/setup/rum
[25]: /es/real_user_monitoring/application_monitoring/android/setup/#track-background-events