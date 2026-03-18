---
code_lang: android
code_lang_weight: 10
description: Configura el seguimiento de errores en tus aplicaciones de Android para
  supervisar los bloqueos, las excepciones y los errores de las aplicaciones.
further_reading:
- link: /error_tracking/frontend
  tag: Documentation
  text: Seguimiento de errores en el frontend
- link: https://github.com/DataDog/dd-sdk-android
  tag: Source Code
  text: Código fuente de ddsdkandroid
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Empieza a utilizar el seguimiento de errores
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualizar los datos de seguimiento de errores en el Explorador
title: Notificación de fallos y seguimiento de errores en Android
type: multi-code-lang
---
## Resumen

Android [Seguimiento de errores][1] te ofrece una visión completa del estado de tu aplicación móvil al registrar automáticamente los bloqueos, las excepciones y los errores. Con esta función, puedes:

 Supervisa la estabilidad de la aplicación en tiempo real con alertas instantáneas de fallos y un seguimiento de la tasa de errores en todas las versiones, dispositivos y segmentos de usuarios.
 Resuelve los problemas de depuración más rápidamente gracias a los trazas de pila desofuscadas y a la carga automática de archivos de mapeo de ProGuard, lo que facilita la identificación de los problemas.
 Mejora la calidad de la aplicación identificando las funciones propensas a fallos, realizando un seguimiento de las tendencias de los errores y priorizando las correcciones para aumentar la satisfacción de los usuarios.
 Accede a los paneles de control y a los atributos agregados de los fallos de Android.
 Ver informes de fallos de Android desofuscados con análisis de tendencias.

El SDK de Datadog para Android es compatible con Android 5.0 y versiones posteriores (nivel de API 21) y con Android TV.

Tus informes de errores aparecen en [**Seguimiento de errores**][2].

## Configuración

Si aún no has configurado el SDK de Android, sigue las [instrucciones de configuración de la aplicación][3] o consulta la [documentación de configuración de Android][4].

### Paso 1: Declarar el SDK de Android como dependencia

Declara [ddsdkandroidrum][5] y el [complemento de Gradle][6] como dependencias en el archivo `build.gradle` de tu **módulo de aplicación**:

```groovy```
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

### Paso 2: Especifica los detalles de la aplicación en la interfaz de usuario

1. Ve a [**Errores** > **Configuración** > **Navegador y móvil** > **+ Nueva aplicación**][7].
2. Selecciona «android» como tipo de aplicación e introduce un nombre para generar un ID de aplicación y un token de cliente únicos de Datadog.
3. Haz clic en **Crear solicitud**.



### Paso 3: Inicializar el SDK de Datadog con el contexto de la aplicación

#### Actualizar el fragmento de código de inicialización

En el fragmento de código de inicialización, configura el nombre del entorno, el nombre del servicio y el número de versión. En los ejemplos siguientes, `APP_VARIANT_NAME` especifica la variante de la aplicación que genera los datos. Para obtener más información, consulta [Uso de etiquetas][10].

Durante la inicialización, también puede configurar la frecuencia de muestreo (sesiones RUM) y establecer el consentimiento de seguimiento para cumplir con el RGPD, tal y como se describe a continuación. Consulte [otras opciones de configuración][11] para inicializar la biblioteca.

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

Las credenciales de inicialización requieren el nombre de la variante de tu aplicación y utilizan el valor de `BuildConfig.FLAVOR`. Con esta variante, el SDK puede hacer coincidir los errores notificados por tu aplicación con los archivos de mapeo cargados por el complemento Gradle. Si no hay variantes, las credenciales utilizan una cadena vacía.

El complemento de Gradle carga automáticamente el archivo `mapping.txt` de ProGuard correspondiente durante la compilación, para que puedas ver las trazas de la pila de errores desofuscadas. Para obtener más información, consulta la sección [Cargar tu archivo de asignación](#uploadyourmappingfile).

#### Activa la función para empezar a enviar datos

Para que el SDK de Android comience a enviar datos:

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

Consulta [`ViewTrackingStrategy`][12] para habilitar el seguimiento automático de todas tus vistas (actividades, fragmentos y demás).

#### Configura tus vistas web (opcional)

Si tu aplicación para Android utiliza WebViews para mostrar contenido web, puedes configurarlas para detectar los errores de JavaScript y los bloqueos que se produzcan dentro de dicho contenido.

Para implementar tus vistas web:

1. Añade la dependencia de Gradle declarando «ddsdkandroidwebview» como dependencia en tu archivo build.gradle:

   ```groovy```
   dependencies {
    implementation "com.datadoghq:dd-sdk-android-webview:<latest_version>"
   }
   ```
2. Habilita el seguimiento de WebView para una instancia concreta de WebView proporcionando una lista de hosts que se deben rastrear:

   ```kotlin
   WebViewTracking.enable(webView, hosts)
   ```

Para obtener más información, consulta [Seguimiento de visitas web][8].

### Paso 4: Añadir la función de notificación de fallos del NDK

Si tu aplicación para Android utiliza código nativo (C/C++) a través del NDK (Native Development Kit) de Android, puedes realizar un seguimiento de los fallos que se produzcan en ese código nativo. El código nativo se utiliza a menudo para operaciones en las que el rendimiento es fundamental, para el procesamiento de imágenes o cuando se reutilizan bibliotecas existentes de C/C++.

Sin los informes de fallos del NDK, los fallos que se producen en el código nativo no aparecen en el seguimiento de errores, lo que dificulta la depuración de problemas en esta parte de la aplicación.

Para habilitar los informes de fallos del NDK, utiliza el complemento de Datadog para el NDK:

1. Añade la dependencia de Gradle declarando la biblioteca como dependencia en tu archivo `build.gradle`:

   ```kotlin
    dependencies {
        implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
        //(...)
    }
   ```
2. Habilita la recopilación de fallos del NDK tras inicializar el SDK:

    ```kotlin
    NdkCrashReports.enable()
    ```

### Paso 5: Añadir informes ANR

El error «La aplicación no responde» ([ANR][18]) es un tipo de error específico de Android que se produce cuando la aplicación permanece inactiva durante demasiado tiempo. Puede añadir informes ANR a su configuración de RUM para supervisar estos problemas de capacidad de respuesta de las aplicaciones.

Para habilitar la generación de informes ANR, añade lo siguiente a tu configuración de RUM:

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

Los ANR solo se registran a través del SDK (no a través de los registros).

#### Notificación de ANR mortales
Los ANR fatales provocan accidentes. La aplicación los notifica cuando deja de responder, lo que hace que el sistema operativo Android muestre un cuadro de diálogo emergente al usuario, quien decide forzar el cierre de la aplicación a través de dicho cuadro.

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="Un informe de error grave en el seguimiento de errores." >}}

 En la página **Seguimiento de errores**, los ANR graves se agrupan en función de su similitud, lo que puede dar lugar a la creación de varios **problemas individuales**.
 De forma predeterminada, Datadog detecta los ANR fatales a través de la [API ApplicationExitInfo][19] (disponible desde *[Android 30+][20]*), cuya información se puede consultar en el siguiente inicio de la aplicación.
 En *[Android 29][21] y versiones anteriores*, no es posible generar informes sobre ANR fatales.

#### Notificación de reacciones adversas no mortales
Es posible que los ANR no fatales hayan provocado o no la interrupción de la aplicación (bloqueo).

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="Un informe de error no grave en el seguimiento de errores." >}}

 En la página **Seguimiento de errores**, los ANR no críticos se agrupan en un **único** problema debido a su alto nivel de ruido.
 De forma predeterminada, la notificación de ANR no fatales en *Android 30+* está **desactivada**, ya que generaría demasiado ruido en torno a los ANR fatales. Sin embargo, en *Android 29* y versiones anteriores, la notificación de ANR no fatales está **activada** de forma predeterminada, ya que en esas versiones no es posible notificar los ANR fatales.

En cualquier versión de Android, puedes anular la configuración predeterminada para notificar ANR no fatales estableciendo `trackNonFatalAnrs` en `true` o `false` al inicializar el SDK.


###  Paso 6  Obtener trazas de pila desofuscadas

Cuando se compila una aplicación de Android para su lanzamiento, el código suele ofuscarse mediante ProGuard o R8 para reducir el tamaño de la aplicación y proteger la propiedad intelectual. Esta ofuscación hace que los rastros de pila de los informes de fallos sean ilegibles, ya que muestran nombres de clases y métodos sin sentido, como `a.b.c()` en lugar de `com.example.MyClass.myMethod()`.

Para que estos trazos de pila sean legibles a la hora de depurar, debes subir tus archivos de mapeo a Datadog. Estos archivos contienen la correspondencia entre el código ofuscado y el original, lo que permite a Datadog desofuscar automáticamente los rastros de pila en tus informes de errores.

#### Cómo funciona

Datadog utiliza un identificador de compilación único generado para cada compilación con el fin de asociar automáticamente los rastros de pila con los archivos de asignación correctos. Esto garantiza que:

 Las trazas de pila siempre se desofuscan con el archivo de mapeo correcto, independientemente de cuándo se haya subido.
 Puedes cargar archivos de mapeo durante las compilaciones de preproducción o producción.
 El proceso funciona a la perfección en diferentes variantes de compilación y entornos.

El proceso de coincidencia depende de la versión de tu [complemento Gradle para Android][22]:

 **Versiones 1.13.0 y posteriores**: utiliza el campo `build_id` (requiere el SDK de Datadog para Android 2.8.0 o posterior)
 **Versiones anteriores**: utiliza una combinación de los campos `service`, `version` y `variant`

#### Sube tu archivo de mapeo

El complemento Gradle para Android automatiza el proceso de carga de archivos de mapeo. Una vez configurado, se carga automáticamente el archivo de mapeo de ProGuard/R8 adecuado para cada variante de compilación cuando compilas tu aplicación.

**Nota**: Volver a subir un archivo de mapeo no sustituye al existente si la versión no ha cambiado. Para obtener información sobre los límites de tamaño de los archivos y otras restricciones, consulta la sección [Limitaciones](#limitations).

#### Ejecutar las tareas de carga

Una vez configurado el complemento, ejecuta las tareas de Gradle para subir tu archivo de mapeo de Proguard/R8 y los archivos de símbolos del NDK a Datadog:

```bash```
./gradlew uploadMappingRelease
./gradlew uploadNdkSymbolFilesRelease
```

Para cualquier error, puedes consultar la ruta del archivo, el número de línea y un fragmento de código para cada tramo del seguimiento de la pila correspondiente.

{{< tabs >}}
{{% tab "EE. UU." %}}

1. Añade el [complemento de Gradle para Android][22] a tu proyecto de Gradle utilizando el siguiente fragmento de código.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Crea una clave API específica para Datadog][23] y expórtala como una variable de entorno denominada `DD_API_KEY` o `DATADOG_API_KEY`. También puedes pasarla como una propiedad de la tarea o, si tienes un archivo `datadogci.json` en el directorio raíz de tu proyecto, se puede obtener de la propiedad `apiKey` que contiene dicho archivo.
3. Si lo deseas, configura el complemento para que suba archivos a la región de la UE modificando el archivo `build.gradle`:
   
   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Ejecuta la tarea de subida una vez que se hayan compilado tus APK ofuscados:
    
   ```bash```
   ./gradlew uploadMappingRelease
   ```

5. Si se ejecuta código nativo, ejecute la tarea de carga de símbolos del NDK:
   ```bash```
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Nota**: Si tu proyecto utiliza variantes adicionales, el complemento ofrece una tarea de carga para cada variante con la ofuscación activada. En este caso, inicializa el SDK de Android con un nombre de variante adecuado (la API necesaria está disponible en las versiones `1.8.0` y posteriores).

[22]: https://github.com/DataDog/ddsdkandroidgradleplugin
[23]: https://app.datadoghq.com/organizationsettings/apikeys
{{% /tab %}}
{{% tab "UE" %}}
1. Añade el [complemento de Gradle para Android][22] a tu proyecto de Gradle utilizando el siguiente fragmento de código.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Crea una clave API específica para Datadog][23] y expórtala como una variable de entorno denominada `DD_API_KEY` o `DATADOG_API_KEY`. También puedes pasarla como una propiedad de la tarea o, si tienes un archivo `datadogci.json` en el directorio raíz de tu proyecto, se puede obtener de la propiedad `apiKey` que contiene dicho archivo.
3. Configura el complemento para que utilice la región de la UE añadiendo el siguiente fragmento de código en el archivo `build.gradle` de tu aplicación:

   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Ejecuta la tarea de subida una vez que se hayan compilado tus APK ofuscados:
   
   ```bash```
   ./gradlew uploadMappingRelease
   ```
   
5. Si se ejecuta código nativo, ejecute la tarea de carga de símbolos del NDK:
   ```bash```
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Nota**: Si tu proyecto utiliza variantes adicionales, el complemento ofrece una tarea de carga para cada variante con la ofuscación activada. En este caso, inicializa el SDK de Android con un nombre de variante adecuado (la API necesaria está disponible en las versiones `1.8.0` y posteriores).

[22]: https://github.com/DataDog/ddsdkandroidgradleplugin
[23]: https://app.datadoghq.com/organizationsettings/apikeys
{{% /tab %}}
{{< /tabs >}}

#### Lista de archivos de mapeo cargados

Consulte la página [Símbolos de depuración de RUM][24] para ver todos los símbolos cargados.

## Funciones avanzadas de seguimiento de errores

{{% collapse-content title="Configurar el consentimiento para el seguimiento (cumplimiento del RGPD)" level="h4" expanded=false id="set-tracking-consent" %}}

Para cumplir con el Reglamento General de Protección de Datos (RGPD), el SDK requiere el valor de consentimiento de seguimiento durante la inicialización.

El seguimiento del consentimiento puede adoptar uno de los siguientes valores:

 `TrackingConsent.PENDING`: (Predeterminado) El SDK comienza a recopilar y agrupar los datos, pero no los envía al
 punto final de la recopilación. El SDK espera a recibir el nuevo valor de consentimiento de seguimiento para decidir qué hacer con los datos agrupados.
 `TrackingConsent.GRANTED`: El SDK comienza a recopilar los datos y los envía al punto final de recopilación de datos.
 `TrackingConsent.NOT_GRANTED`: El SDK no recopila ningún dato. No es posible enviar manualmente registros, trazas ni eventos.

Para **actualizar el consentimiento de seguimiento** una vez inicializado el SDK, llama a `Datadog.setTrackingConsent(<NEW CONSENT>)`. El SDK modifica su comportamiento de acuerdo con el nuevo consentimiento. Por ejemplo, si el consentimiento de seguimiento actual es `TrackingConsent.PENDING` y lo actualizas a:

 `TrackingConsent.GRANTED`: El SDK envía todos los datos agrupados actuales y los datos futuros directamente al punto final de recopilación de datos.
 `TrackingConsent.NOT_GRANTED`: El SDK borra todos los datos acumulados y no recopila ningún dato en el futuro.

{{% /collapse-content %}}

{{% collapse-content title="Tarifas orientativas por sesión" level="h4" expanded=false id="sample-session-rates" %}}

Para controlar los datos que tu aplicación envía a Datadog, puedes especificar una frecuencia de muestreo para las sesiones al [inicializar RUM][11]. La tasa de muestreo es un porcentaje comprendido entre 0 y 100. Por defecto, `sessionSamplingRate` está establecido en 100 (conservar todas las sesiones).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

{{% /collapse-content %}}

{{% collapse-content title="Inicializar el interceptor para realizar un seguimiento de los eventos de red" level="h4" expanded=false id="interceptor" %}}

El interceptor de red realiza un seguimiento automático de las solicitudes y respuestas HTTP, registrando los errores de red, los tiempos de espera agotados y los problemas de rendimiento, lo que puede ayudarte a relacionar los problemas de red con los fallos de las aplicaciones y los problemas de experiencia del usuario. Para inicializar un interceptor destinado al seguimiento de eventos de red:

1. Para el rastreo distribuido, [añade y activa la función Trace][13].
2. Añade la dependencia de Gradle a la biblioteca `ddsdkandroidokhttp` en el archivo `build.gradle` a nivel de módulo:

    ```groovy```
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. Para realizar un seguimiento de tus solicitudes de OkHttp como recursos, añade el [interceptor][14] proporcionado:

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

4. Para crear automáticamente recursos RUM y tramos para tus solicitudes OkHttp, utiliza `DatadogInterceptor` como interceptor.
    Esto registra cada solicitud procesada por `OkHttpClient` como un recurso, rellenando automáticamente toda la información relevante (URL, método, código de estado y error). Solo se registran las solicitudes de red que se iniciaron mientras una vista estaba activa. Para realizar un seguimiento de las solicitudes cuando la aplicación se encuentra en segundo plano, [crea una vista manualmente][15].
      
5. Para supervisar los redireccionamientos o los reintentos de red, puedes utilizar `DatadogInterceptor` como [interceptor de red][16]:

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
 Para utilizar spans pero no recursos RUM, puedes emplear el `TracingInterceptor` en lugar del `DatadogInterceptor`, tal y como se ha descrito anteriormente.
 Si utilizas varios interceptores, añade primero `DatadogInterceptor`.

También puedes añadir un `EventListener` al `OkHttpClient` para [realizar un seguimiento automático de los tiempos de los recursos][17] de proveedores externos y solicitudes de red.

{{% /collapse-content %}}

{{% collapse-content title="Realizar un seguimiento de los eventos en segundo plano" level="h4" expanded=false id="track-background-events" %}}

Puedes realizar un seguimiento de eventos como los bloqueos y las solicitudes de red cuando tu aplicación se encuentra en segundo plano (por ejemplo, cuando no hay ninguna vista activa disponible). 

Añade el siguiente fragmento de código durante la configuración:

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
<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

{{% /collapse-content %}}

{{% collapse-content title="Envío de datos cuando el dispositivo está desconectado" level="h4" expanded=false id="sending-data-device-offline" %}}

El SDK de Android garantiza la disponibilidad de los datos cuando el dispositivo del usuario está desconectado. En caso de zonas con poca cobertura, o cuando la batería del dispositivo está muy baja, todos los eventos se almacenan primero en el dispositivo local por lotes. 

Cada lote cumple con las especificaciones de admisión. Los lotes se envían tan pronto como hay conexión a Internet y el nivel de batería es lo suficientemente alto como para garantizar que el SDK de Datadog no afecte a la experiencia del usuario final. Si la red no está disponible mientras la aplicación está en primer plano, o si falla la carga de datos, el lote se retiene hasta que se pueda enviar correctamente.
 
Esto significa que, aunque los usuarios abran tu aplicación sin conexión, no se perderá ningún dato. Para garantizar que el SDK no ocupe demasiado espacio en disco, los datos almacenados en el disco se eliminan automáticamente cuando han pasado demasiado tiempo.

{{% /collapse-content %}}

{{% collapse-content title="Opciones de configuración del complemento" level="h4" expanded=false id="plugin-config-options" %}}

Hay varias propiedades del complemento que se pueden configurar a través de la extensión del complemento. Si utilizas varias variantes, puedes establecer un valor de propiedad para una opción concreta dentro de la variante.

Por ejemplo, para una variante `fooBarRelease`, puedes utilizar la siguiente configuración:

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

La configuración de la tarea para esta variante se obtiene combinando las tres configuraciones de variante proporcionadas en el siguiente orden:

1. `bar`
2. `foo`
3. `fooBar`

Esto establece el valor final de la propiedad `versionName` como `fooBar`.

| Nombre de la propiedad              | Descripción                                                                                                                                                                                               |
|||
| `versionName`              | El nombre de la versión de la aplicación (por defecto, la versión declarada en el bloque `android` de tu archivo `build.gradle`).                                                                                                               |
| `serviceName`              | El nombre del servicio de la aplicación (por defecto, el nombre del paquete de tu aplicación tal y como se declara en el bloque `android` de tu archivo `build.gradle`).                                                                                                                          |
| `site`                     | El sitio de Datadog al que se van a cargar los datos (US1, US3, US5, EU1, US1_FED, AP1 o AP2).                                                                                                                                       |
| `remoteRepositoryUrl`      | La URL del repositorio remoto donde se ha implementado el código fuente. Si no se proporciona, este valor se obtiene de tu configuración de Git durante la ejecución de la tarea.                     |
| `checkProjectDependencies` | Esta propiedad determina si el complemento debe comprobar si el SDK de Datadog para Android está incluido en las dependencias. De lo contrario, se ignora `none`, `warn` registra una advertencia y `fail` provoca el fallo de la compilación con un error (valor predeterminado). |

{{% /collapse-content %}}

{{% collapse-content title="Integrar con un proceso de CI/CD" level="h4" expanded=false id="plugin-config-options" %}}

Por defecto, la tarea de asignación de archivos cargados es independiente de las demás tareas del gráfico de compilación. Ejecuta la tarea manualmente cuando necesites cargar la asignación.

Si deseas ejecutar esta tarea en un proceso de CI/CD y la tarea es obligatoria como parte del gráfico de compilación, puedes configurar la tarea de carga para que se ejecute una vez generado el archivo de asignación.

Por ejemplo:

```kotlin
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```
{{% /collapse-content %}}

## Limitaciones

### Tamaño de los archivos
Los [archivos de mapeo](#uploadyourmappingfile) tienen un tamaño máximo de **500 MB** cada uno. Si el archivo de mapeo de tu proyecto supera este tamaño, utiliza una de las siguientes opciones para reducirlo:

 Establece la opción `mappingFileTrimIndents` en `true`. Esto reduce el tamaño del archivo en un 5 %, de media.
 Configure una tabla de correspondencias de `mappingFilePackagesAliases`: esto sustituye los nombres de los paquetes por alias más cortos. **Nota**: El seguimiento de pila de Datadog utiliza el mismo alias en lugar del nombre original del paquete, por lo que es mejor utilizar esta opción para las dependencias de terceros.

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
Al analizar el comportamiento de los informes de fallos de RUM para Android, ten en cuenta lo siguiente:

 El fallo solo se puede detectar una vez que se haya inicializado el SDK. Por ello, se recomienda inicializar el SDK lo antes posible en el método `onCreate` de tu aplicación.
 Los errores de RUM deben estar asociados a una vista de RUM. Si se produce un fallo antes de que una vista sea visible (normalmente una Activity o un Fragment en estado `onResume`) o después de que el usuario envíe la aplicación al segundo plano al salir de ella, el fallo se silencia y no se envía para su recopilación. Para solucionar esto, utiliza el método `trackBackgroundEvents()` [método][25] en tu constructor `RumConfiguration`.
 Solo se guardan los fallos que se producen en las sesiones muestreadas. Si la [frecuencia de muestreo de la sesión no es del 100 %][24], algunos fallos no se registran. 

## Prueba tu implementación

Para comprobar la configuración de «Crash Reporting» y «Error Tracking» de Android, debes provocar un fallo en tu aplicación y confirmar que el error aparece en Datadog.

Para probar tu implementación:

1. Ejecuta tu aplicación en un emulador de Android o en un dispositivo real.
2. Ejecuta un fragmento de código que contenga un error o provoque un bloqueo. Por ejemplo:

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. Una vez que se produzca el fallo, reinicia la aplicación y espera a que el SDK de Android envíe el informe de fallos a [**Error Tracking**][2].

## Extensiones de Kotlin

### Extensión `Closeable`

Puedes supervisar el uso de instancias de `Closeable` con el método `useMonitored`, que notifica los errores a Datadog y cierra el recurso a continuación:

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}
```

### Gestionar los activos locales como recursos

Puedes realizar un seguimiento del acceso a los activos utilizando el método de extensión `getAssetAsRumResource`:

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

El uso de los recursos locales se puede supervisar mediante el método de extensión `getRawResAsRumResource`:

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## Lecturas recomendadas

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/error_tracking/
[2]: https://app.datadoghq.com/rum/errortracking
[3]: https://app.datadoghq.com/rum/application/create
[4]: /es/real_user_monitoring/application_monitoring/android/setup/#setup
[5]: https://github.com/DataDog/ddsdkandroid/tree/develop/features/ddsdkandroidrum
[6]: https://github.com/DataDog/ddsdkandroidgradleplugin
[7]: https://app.datadoghq.com/errortracking/settings/setup/client
[8]: /es/supervisión_de_usuarios_reales/supervisión_de_aplicaciones/android/seguimiento_de_vistas_web/
[9]: /es/supervisión_de_usuarios_reales/supervisión_de_aplicaciones/android/datos_recogidos/
[10]: /es/primeros_pasos/etiquetado/uso_de_etiquetas/
[11]: /es/real_user_monitoring/application_monitoring/android/configuración_avanzada/#parámetros_de_inicialización
[12]: /es/real_user_monitoring/application_monitoring/android/configuración_avanzada/#seguimiento_automático_de_visualizaciones
[13]: /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/android/
[14]: https://square.github.io/okhttp/features/interceptors/
[15]: /es/real_user_monitoring/application_monitoring/android/configuración_avanzada/#vistas_personalizadas
[16]: https://square.github.io/okhttp/features/interceptors/#networkinterceptors
[17]: /es/real_user_monitoring/application_monitoring/android/configuración_avanzada/#seguimiento_automático_de_solicitudes_de_red
[18]: https://developer.android.com/topic/performance/vitals/anr
[19]: https://developer.android.com/reference/android/app/ApplicationExitInfo
[20]: https://developer.android.com/tools/releases/platforms#11
[21]: https://developer.android.com/tools/releases/platforms#10
[22]: https://github.com/DataDog/ddsdkandroidgradleplugin
[23]: https://app.datadoghq.com/organizationsettings/apikeys
[24]: https://app.datadoghq.com/sourcecode/setup/rum
[25]: /es/real_user_monitoring/application_monitoring/android/setup/#trackbackgroundevents