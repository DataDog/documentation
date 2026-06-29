---
code_lang: android
code_lang_weight: 10
description: Configura Error Tracking para tus aplicaciones de Android y monitorea
  fallos, excepciones y errores de la aplicación.
further_reading:
- link: /error_tracking/frontend
  tag: Documentation
  text: Frontend Error Tracking
- link: https://github.com/DataDog/dd-sdk-android
  tag: Source Code
  text: Código fuente para dd-sdk-android
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Comienza con Error Tracking
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualiza los datos de Error Tracking en el Explorer.
title: Android Crash Reporting y Error Tracking
type: multi-code-lang
---
## Resumen

Android [Error Tracking][1] te brinda una visibilidad completa sobre la salud de tu aplicación móvil al capturar automáticamente fallos, excepciones y errores. Con esta función, puedes:

- Monitorear la estabilidad de la aplicación en tiempo real con alertas instantáneas de fallos y seguimiento de la tasa de errores a través de versiones, dispositivos y segmentos de usuarios.
- Depura problemas más rápido con trazas de pila desofuscadas y cargas automáticas de archivos de mapeo de ProGuard para una identificación más fácil de problemas.
- Mejora la calidad de la aplicación al identificar características propensas a fallos, rastrear tendencias de errores y priorizar correcciones para una mejor satisfacción del usuario.
- Accede a tableros de fallos en Android agregados y atributos.
- Visualiza informes de fallos en Android desofuscados con análisis de tendencias.

El SDK de Datadog para Android es compatible con Android 5.0+ (nivel de API 21) y Android TV.

Tus informes de fallos aparecen en [**Seguimiento de Errores**][2].

## Configuración

Si aún no has configurado el SDK de Android, sigue las [instrucciones de configuración en la aplicación][3] o consulta la [documentación de configuración de Android][4].

### Paso 1 - Declara el SDK de Android como una dependencia

Declara [dd-sdk-android-rum][5] y el [plugin de Gradle][6] como dependencias en tu **módulo de aplicación** `build.gradle` archivo:

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

### Paso 2 - Especifica los detalles de la aplicación en la UI

1. Navega a [**Errors** > **Settings** > **Browser and Mobile** > **+ New Application**][7].
2. Selecciona `android` como el tipo de aplicación e ingresa un nombre de aplicación para generar un ID de aplicación único de Datadog y un token de cliente.
3. Haz clic en **Create Application**.



### Paso 3 - Inicializa el SDK de Datadog con el contexto de la aplicación

#### Actualiza el fragmento de inicialización

En el fragmento de inicialización, establece un nombre de entorno, un nombre de servicio y un número de versión. En los ejemplos a continuación, `APP_VARIANT_NAME` especifica la variante de la aplicación que genera datos. Para más información, consulta [Uso de etiquetas][10].

Durante la inicialización, también puedes establecer la tasa de muestreo (sesiones RUM) y establecer el consentimiento de seguimiento para el cumplimiento del GDPR, como se describe a continuación. Consulta [otras opciones de configuración][11] para inicializar la biblioteca.

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

Las credenciales de inicialización requieren el nombre de variante de tu aplicación y utilizan el valor de `BuildConfig.FLAVOR`. Con la variante, el SDK puede asociar los errores reportados de tu aplicación con los archivos de mapeo subidos por el complemento de Gradle. Si no tienes variantes, las credenciales utilizan una cadena vacía.

El complemento de Gradle sube automáticamente el archivo ProGuard `mapping.txt` apropiado en el momento de la construcción para que puedas ver las trazas de pila desofuscadas. Para más información, consulta la sección [Upload your mapping file](#upload-your-mapping-file).

#### Habilita la función para comenzar a enviar datos

Para habilitar el SDK de Android para comenzar a enviar datos:

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

Consulta [`ViewTrackingStrategy`][12] para habilitar el seguimiento automático de todas tus vistas (actividades, fragmentos y más).

#### Instrumenta tus webviews (opcional)

Si tu aplicación de Android utiliza WebViews para mostrar contenido web, puedes instrumentarlas para rastrear errores de JavaScript y bloqueos que ocurren dentro del contenido web.

Para instrumentar tus webviews:

1. Agrega la dependencia de Gradle declarando dd-sdk-android-webview como dependencia en tu archivo build.gradle:

   ```groovy
   dependencies {
    implementation "com.datadoghq:dd-sdk-android-webview:<latest_version>"
   }
   ```
2. Habilita el seguimiento de webview para una instancia de WebView proporcionando una lista de hosts a rastrear:

   ```kotlin
   WebViewTracking.enable(webView, hosts)
   ```

Para más información, consulta [Web View Tracking][8].

### Paso 4 - Agrega informes de fallos NDK

Si tu aplicación de Android utiliza código nativo (C/C++) a través del NDK de Android (Native Development Kit), puedes rastrear los bloqueos que ocurren en este código nativo. El código nativo se utiliza a menudo para operaciones críticas de rendimiento, procesamiento de imágenes o cuando se reutilizan bibliotecas existentes de C/C++.

Sin el reporte de fallos de NDK, los fallos en tu código nativo no aparecen en Error Tracking, lo que dificulta la depuración de problemas en esa parte de la aplicación.

Para habilitar el reporte de fallos de NDK, usa el complemento Datadog NDK:

1. Agrega la dependencia de Gradle declarando la biblioteca como dependencia en tu archivo `build.gradle`:

   ```kotlin
    dependencies {
        implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
        //(...)
    }
   ```
2. Habilita la recopilación de fallos de NDK después de inicializar el SDK:

    ```kotlin
    NdkCrashReports.enable()
    ```

### Paso 5 - Agrega el reporte de ANR

Un "Application Not Responding" ([ANR][18]) es un error específico de Android que se produce cuando la aplicación no responde durante demasiado tiempo. Puedes agregar el reporte de ANR a tu configuración de RUM para monitorear estos problemas de respuesta de la aplicación.

Para habilitar el reporte de ANR, agrega lo siguiente a tu configuración de RUM:

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

Los ANRs solo se reportan a través del SDK (no a través de los Logs).

#### Informando ANRs fatales
Los ANRs fatales resultan en fallos. La aplicación los reporta cuando no responde, lo que hace que el sistema operativo Android muestre un cuadro de diálogo emergente al usuario, quien elige forzar el cierre de la aplicación.

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="Un informe de fallo fatal en Error Tracking." >}}

- En la página **Error Tracking**, los ANRs fatales se agrupan según su similitud, lo que puede resultar en la creación de varios **problemas individuales**.
- Por defecto, Datadog captura ANRs fatales a través de la API [ApplicationExitInfo][19] (disponible desde *[Android 30+][20]*), que se puede leer en el próximo lanzamiento de la aplicación.
- En *[Android 29][21] y versiones anteriores*, no es posible reportar ANRs fatales.

#### Reporte de ANRs no fatales
Los ANRs no fatales pueden o no haber llevado a la terminación de la aplicación (fallo).

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="Un informe de fallo no fatal en Error Tracking." >}}

- En la página **Error Tracking**, los ANRs no fatales se agrupan bajo un **único** problema debido a su nivel de ruido.
- Por defecto, el informe de ANRs no fatales en *Android 30+* está **deshabilitado** porque generaría demasiado ruido sobre los ANRs fatales. En *Android 29* y versiones anteriores, sin embargo, el informe de ANRs no fatales está **habilitado** por defecto, ya que los ANRs fatales no pueden ser reportados en esas versiones.

Para cualquier versión de Android, puedes anular la configuración predeterminada para informar ANRs no fatales configurando `trackNonFatalAnrs` a `true` o `false` al inicializar el SDK.


###  Paso 6 - Obtener trazas de pila desofuscadas

Cuando tu aplicación de Android se construye para producción, el código se ofusca típicamente usando ProGuard o R8 para reducir el tamaño de la aplicación y proteger la propiedad intelectual. Esta ofuscación hace que las trazas de pila en los informes de accidentes sean ilegibles, mostrando nombres de clases y métodos sin sentido como `a.b.c()` en lugar de `com.example.MyClass.myMethod()`.

Para hacer que estas trazas de pila sean legibles para la depuración, necesitas subir tus archivos de mapeo a Datadog. Estos archivos contienen el mapeo entre el código ofuscado y el original, permitiendo que Datadog desofusque automáticamente las trazas de pila en tus informes de errores.

#### Cómo funciona

Datadog utiliza un ID de construcción único generado para cada construcción para emparejar automáticamente las trazas de pila con los archivos de mapeo correctos. Esto asegura que:

- Las trazas de pila siempre se desofusquen con el archivo de mapeo correcto, independientemente de cuándo se haya subido.
- Puedes cargar archivos de mapeo durante compilaciones de pre-producción o producción.
- El proceso funciona sin problemas a través de diferentes variantes de compilación y entornos.

El proceso de coincidencia depende de tu versión del [plugin de Gradle para Android][22]:

- **Versiones 1.13.0 y superiores**: Utiliza el campo `build_id` (requiere el SDK de Datadog para Android 2.8.0 o posterior)
- **Versiones anteriores**: Utiliza una combinación de los campos `service`, `version` y `variant`

#### Sube tu archivo de mapeo

El plugin de Gradle para Android automatiza el proceso de carga del archivo de mapeo. Después de la configuración, sube automáticamente el archivo de mapeo ProGuard/R8 apropiado para cada variante de compilación cuando construyes tu aplicación.

**Nota**: Volver a subir un archivo de mapeo no reemplaza el existente si la versión no ha cambiado. Para información sobre limitaciones de tamaño de archivo y otras restricciones, consulta la sección [Limitaciones](#limitations).

#### Ejecuta las tareas de carga

Después de configurar el plugin, ejecuta las tareas de Gradle para subir tu archivo de mapeo Proguard/R8 y los archivos de símbolos NDK a Datadog:

```bash
./gradlew uploadMappingRelease
./gradlew uploadNdkSymbolFilesRelease
```

Para cualquier error dado, puedes acceder a la ruta del archivo, número de línea y un fragmento de código para cada marco de la traza de pila relacionada.

{{< tabs >}}
{{% tab "EE. UU." %}}

1. Agrega el [Plugin de Gradle para Android][22] a tu proyecto de Gradle usando el siguiente fragmento de código.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Crea una clave de API dedicada de Datadog][23] y expórtala como una variable de entorno llamada `DD_API_KEY` o `DATADOG_API_KEY`. Alternativamente, pásala como una propiedad de tarea, o si tienes un archivo `datadog-ci.json` en la raíz de tu proyecto, se puede tomar de una propiedad `apiKey` allí.
3. Opcionalmente, configura el plugin para subir archivos a la región de la UE configurando el plugin en tu script `build.gradle`:
   
   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Ejecuta la tarea de carga después de que se construya tu APK ofuscado:
    
   ```bash
   ./gradlew uploadMappingRelease
   ```

5. Si ejecutas código nativo, ejecuta la tarea de carga de símbolos NDK:
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Nota**: Si tu proyecto utiliza sabores adicionales, el plugin proporciona una tarea de carga para cada variante con ofuscación habilitada. En este caso, inicializa el SDK de Android con un nombre de variante adecuado (la API necesaria está disponible en las versiones `1.8.0` y posteriores).

[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "UE" %}}
1. Agrega el [Plugin de Gradle para Android][22] a tu proyecto de Gradle usando el siguiente fragmento de código.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Crea una clave de API dedicada de Datadog][23] y expórtala como una variable de entorno llamada `DD_API_KEY` o `DATADOG_API_KEY`. Alternativamente, pásala como una propiedad de tarea, o si tienes un archivo `datadog-ci.json` en la raíz de tu proyecto, se puede tomar de una propiedad `apiKey` allí.
3. Configura el plugin para usar la región de la UE agregando el siguiente fragmento en el archivo de script `build.gradle` de tu aplicación:

   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Ejecuta la tarea de carga después de que se construya tu APK ofuscado:
   
   ```bash
   ./gradlew uploadMappingRelease
   ```
   
5. Si ejecutas código nativo, ejecuta la tarea de carga de símbolos NDK:
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Nota**: Si tu proyecto utiliza sabores adicionales, el plugin proporciona una tarea de carga para cada variante con ofuscación habilitada. En este caso, inicializa el SDK de Android con un nombre de variante adecuado (la API necesaria está disponible en las versiones `1.8.0` y posteriores).

[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

#### Listar archivos de mapeo subidos

Consulta la página de [Símbolos de Depuración RUM][24] para ver todos los símbolos subidos.

## Características avanzadas de Error Tracking

{{% collapse-content title="Establecer consentimiento de seguimiento (cumplimiento con GDPR)" level="h4" expanded=false id="set-tracking-consent" %}}

Para cumplir con la regulación GDPR, el SDK requiere el valor de consentimiento de seguimiento al momento de la inicialización.

El consentimiento de seguimiento puede ser uno de los siguientes valores:

- `TrackingConsent.PENDING`: (Predeterminado) El SDK comienza a recopilar y agrupar los datos, pero no los envía al
 punto de recolección. El SDK espera el nuevo valor de consentimiento de seguimiento para decidir qué hacer con los datos agrupados.
- `TrackingConsent.GRANTED`: El SDK comienza a recopilar los datos y los envía al punto de recolección de datos.
- `TrackingConsent.NOT_GRANTED`: El SDK no recopila ningún dato. No puedes enviar manualmente registros, trazas o eventos.

Para **actualizar el consentimiento de seguimiento** después de que el SDK esté inicializado, llama a `Datadog.setTrackingConsent(<NEW CONSENT>)`. El SDK cambia su comportamiento de acuerdo con el nuevo consentimiento. Por ejemplo, si el consentimiento de seguimiento actual es `TrackingConsent.PENDING` y lo actualizas a:

- `TrackingConsent.GRANTED`: El SDK envía todos los datos agrupados actuales y futuros directamente al punto de recolección de datos.
- `TrackingConsent.NOT_GRANTED`: El SDK borra todos los datos agrupados y no recopila datos futuros.

{{% /collapse-content %}}

{{% collapse-content title="Tasas de muestreo de sesiones" level="h4" expanded=false id="sample-session-rates" %}}

Para controlar los datos que tu aplicación envía a Datadog, puedes especificar una tasa de muestra para las sesiones al [inicializar RUM][11]. La tasa de muestra es un porcentaje entre 0 y 100. Por defecto, `sessionSamplingRate` está configurado en 100 (mantener todas las sesiones).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

{{% /collapse-content %}}

{{% collapse-content title="Inicializa el interceptor para rastrear eventos de red" level="h4" expanded=false id="interceptor" %}}

El interceptor de red rastrea automáticamente las solicitudes y respuestas HTTP, capturando errores de red, tiempos de espera y problemas de rendimiento que pueden ayudarte a correlacionar problemas de red con fallos de la aplicación y problemas de experiencia del usuario. Para inicializar un interceptor para rastrear eventos de red:

1. Para el trazado distribuido, [agregue y habilite la función de Trazado][13].
2. Agregue la dependencia de Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel de módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. Para rastrear tus solicitudes de OkHttp como recursos, agrega el [interceptor][14] proporcionado:

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

4. Para crear automáticamente recursos y tramos de RUM para tus solicitudes de OkHttp, usa el `DatadogInterceptor` como interceptor.
   - Esto registra cada solicitud procesada por el `OkHttpClient` como un recurso, con toda la información relevante (URL, método, código de estado y error) completada automáticamente. Solo se rastrean las solicitudes de red que comenzaron cuando una vista está activa. Para rastrear solicitudes cuando tu aplicación esté en segundo plano, [crea una vista manualmente][15].
      
5. Para monitorear las redirecciones o reintentos de red, puedes usar el `DatadogInterceptor` como un [interceptor de red][16]:

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
- Para usar tramos pero no recursos de RUM, puedes usar el `TracingInterceptor` en lugar de `DatadogInterceptor` como se describió anteriormente.
- Si usas múltiples interceptores, agrega `DatadogInterceptor` primero.

También puedes agregar un `EventListener` para el `OkHttpClient` para [rastrear automáticamente el tiempo de recursos][17] para proveedores de terceros y solicitudes de red.

{{% /collapse-content %}}

{{% collapse-content title="Rastrear eventos en segundo plano" level="h4" expanded=false id="track-background-events" %}}

Puedes rastrear eventos como fallos y solicitudes de red cuando tu aplicación esté en segundo plano (por ejemplo, sin una vista activa disponible). 

Agrega el siguiente fragmento durante la configuración:

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
<div class="alert alert-info"><p>El seguimiento de eventos en segundo plano puede llevar a sesiones adicionales, lo que puede afectar la facturación. Para preguntas, <a href="https://docs.datadoghq.com/help/">contacta al soporte de Datadog.</a></p>
</div>

{{% /collapse-content %}}

{{% collapse-content title="Enviando datos cuando el dispositivo está desconectado" level="h4" expanded=false id="sending-data-device-offline" %}}

El SDK de Android asegura la disponibilidad de datos cuando el dispositivo del usuario está desconectado. En caso de áreas con baja red, o cuando la batería del dispositivo está demasiado baja, todos los eventos se almacenan primero en el dispositivo local en lotes. 

Cada lote sigue la especificación de entrada. Los lotes se envían tan pronto como la red está disponible y la batería es lo suficientemente alta para asegurar que el SDK de Datadog no afecte la experiencia del usuario final. Si la red no está disponible mientras tu aplicación está en primer plano, o si una carga de datos falla, el lote se mantiene hasta que pueda enviarse con éxito.
 
Esto significa que, incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato. Para asegurar que el SDK no use demasiado espacio en disco, los datos en el disco se descartan automáticamente si se vuelven demasiado antiguos.

{{% /collapse-content %}}

{{% collapse-content title="Opciones de configuración del plugin" level="h4" expanded=false id="plugin-config-options" %}}

Hay varias propiedades del plugin que se pueden configurar a través de la extensión del plugin. En caso de que uses múltiples variantes, puedes establecer un valor de propiedad para un sabor específico en la variante.

Por ejemplo, para una variante `fooBarRelease`, puedes usar la siguiente configuración:

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

La configuración de la tarea para esta variante se fusiona de las tres configuraciones de sabor proporcionadas en el siguiente orden:

1. `bar`
2. `foo`
3. `fooBar`

Esto resuelve el valor final para la propiedad `versionName` como `fooBar`.

| Nombre de la propiedad              | Descripción                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | El nombre de la versión de la aplicación (por defecto, la versión declarada en el bloque `android` de tu script `build.gradle`).                                                                                                               |
| `serviceName`              | El nombre del servicio de la aplicación (por defecto, el nombre del paquete de tu aplicación como se declara en el bloque `android` de tu script `build.gradle`).                                                                                                                          |
| `site`                     | El sitio de Datadog para subir tus datos (US1, US3, US5, EU1, US1_FED, AP1 o AP2).                                                                                                                                       |
| `remoteRepositoryUrl`      | La URL del repositorio remoto donde se desplegó el código fuente. Si no se proporciona esto, este valor se resuelve a partir de tu configuración de Git durante el tiempo de ejecución de la tarea.                     |
| `checkProjectDependencies` | Esta propiedad controla si el complemento debe verificar si el SDK de Android de Datadog está incluido en las dependencias. Si no, `none` se ignora, `warn` registra una advertencia y `fail` falla la construcción con un error (por defecto). |

{{% /collapse-content %}}

{{% collapse-content title="Integrar con un pipeline de CI/CD" level="h4" expanded=false id="plugin-config-options" %}}

Por defecto, la tarea de mapeo de carga es independiente de otras tareas en el gráfico de construcción. Ejecuta la tarea manualmente cuando necesites cargar el mapeo.

Si deseas ejecutar esta tarea en un pipeline de CI/CD, y la tarea es requerida como parte del gráfico de construcción, puedes configurar la tarea de carga para que se ejecute después de que se genere el archivo de mapeo.

Por ejemplo:

```kotlin
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```
{{% /collapse-content %}}

## Limitaciones

### Tamaño de archivo
[ Los archivos de mapeo](#upload-your-mapping-file) están limitados en tamaño a **500 MB** cada uno. Si tu proyecto tiene un archivo de mapeo más grande que esto, utiliza una de las siguientes opciones para reducir el tamaño del archivo:

- Establece la opción `mappingFileTrimIndents` a `true`. Esto reduce el tamaño de tu archivo en un 5%, en promedio.
- Establece un mapa de `mappingFilePackagesAliases`: Esto reemplaza los nombres de los paquetes con alias más cortos. **Nota**: El stacktrace de Datadog utiliza el mismo alias en lugar del nombre de paquete original, por lo que es mejor usar esta opción para las dependencias de terceros.

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

### Colección
Al observar los comportamientos de informes de fallos de RUM para Android, considera lo siguiente:

- El fallo solo puede ser detectado después de que el SDK esté inicializado. Dado esto, la recomendación es inicializar el SDK lo antes posible en el método `onCreate` de tu aplicación.
- Los fallos de RUM deben estar asociados a una vista de RUM. Si ocurre un fallo antes de que una vista sea visible (típicamente una Actividad o Fragmento en un estado `onResume`), o después de que el usuario envíe la aplicación a segundo plano al navegar fuera de ella, el fallo se silencia y no se reporta para su recopilación. Para mitigar esto, utiliza el método `trackBackgroundEvents()` [método][25] en tu constructor `RumConfiguration`.
- Solo se conservan los fallos que ocurren en sesiones muestreadas. Si una [tasa de muestreo de sesiones no es del 100%][24], algunos fallos no son reportados. 

## Prueba tu implementación

Para verificar tu configuración de informes de fallos y seguimiento de errores en Android, necesitas provocar un fallo en tu aplicación y confirmar que el error aparece en Datadog.

Para probar tu implementación:

1. Ejecuta tu aplicación en un emulador de Android o en un dispositivo real.
2. Ejecuta algún código que contenga un error o fallo. Por ejemplo:

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. Después de que ocurra el fallo, reinicia tu aplicación y espera a que el SDK de Android suba el informe de fallos en [**Error Tracking**][2].

## Extensiones de Kotlin

### `Closeable` extensión

Puedes realizar el seguimiento del uso de la instancia `Closeable` con el método `useMonitored`, que reporta errores a Datadog y cierra el recurso después:

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}
```

### Realizar el seguimiento de activos locales como recursos

Puedes realizar el seguimiento del acceso a los activos utilizando el método de extensión `getAssetAsRumResource`:

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

Puedes realizar el seguimiento del uso de los recursos locales utilizando el método de extensión `getRawResAsRumResource`:

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## Lectura adicional

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