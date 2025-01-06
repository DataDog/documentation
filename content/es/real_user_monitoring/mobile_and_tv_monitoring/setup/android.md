---
aliases:
- /es/real_user_monitoring/android/
code_lang: android
code_lang_weight: 10
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android
  tag: Documentación
  text: Configuración avanzada de RUM Android
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: /real_user_monitoring
  tag: Documentación
  text: Explorar RUM de Datadog
title: Configuración de monitorización de RUM Android y Android TV
type: multi-code-lang
---
## Información general

Datadog Real User Monitoring (RUM) te permite visualizar y analizar el rendimiento en tiempo real y los recorridos de cada usuario de tu aplicación.

El SDK de Datadog Android es compatible con Android 5.0+ (nivel de la API 21) y Android TV.

## Configuración

1. Declara al SDK de Datadog RUM como dependencia.
2. Especifica los detalles de la aplicación en la interfaz de usuario.
3. Inicializa el SDK de Datadog con el contexto de la aplicación.
4. Activa la característica RUM para iniciar el envío de datos.
5. Inicializa RUM Interceptor para rastrear eventos de red.

### Declarar el SDK de Datadog RUM como dependencia

Declara [dd-sdk-android-rum][1] y el [complemento Gradle][12] como dependencia en el archivo `build.gradle` de tu **módulo de aplicación**.

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

### Especificar los detalles de la aplicación en la interfaz de usuario

1. Ve a [**Experiencia digital** > **Añadir una aplicación**][2].
2. Selecciona `android` como tipo de aplicación e introduce un nombre de la aplicación para generar un ID de la aplicación de Datadog y un token de cliente únicos.
3. Para instrumentar tus vistas web, haz clic en la opción **Instrumentar tus vistas web**. Para obtener más información, consulta [Rastreo de vistas web][13].
4. Para desactivar la recopilación automática de datos de usuario de la IP de cliente o de geolocalización, desactiva las casillas de esas configuraciones. Para obtener más información, consulta [Recopilación de datos de RUM Android][15].

   {{< img src="real_user_monitoring/android/android-new-application.png" alt="Crear una aplicación de RUM para Android en Datadog" style="width:90%;">}}

Para garantizar la seguridad de tus datos, utiliza un token de cliente. Si solo utilizaras [claves de la API de Datadog][3] para configurar el SDK de Datadog, se expondrían del lado del cliente en el código de bytes APK de la aplicación Android. 

Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre el token de cliente][4].

### Inicializar el SDK de Datadog con el contexto de la aplicación

En el fragmento de código de inicialización, configura un nombre de entorno, un nombre de servicio y un número de versión. En los ejemplos siguientes, `APP_VARIANT_NAME` especifica la variante de la aplicación que genera datos. Para obtener más información, consulta [Utilizar etiquetas][14].

Consulta [`trackingConsent`][6] para añadir el cumplimiento del Reglamento general de protección de datos (RGPD) para tus usuarios de la UE y [otras opciones de configuración ][7] para inicializar la biblioteca.

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

Las credenciales de inicialización requieren el nombre de variante de tu aplicación y utilizan el valor de `BuildConfig.FLAVOR`. Con la variante, RUM puede hacer coincidir los errores notificados desde tu aplicación con los archivos de asignación que ha cargado el complemento Gradle. Si no tienes variantes, las credenciales utilizarán una cadena vacía.

El complemento Gradle carga automáticamente el archivo `mapping.txt` de ProGuard adecuado en el momento de la compilación para que puedas ver las stack traces de errores de RUM desofuscados. Para obtener más información, consulta [Rastrear errores de Android][8].

### Muestrear sesiones de RUM

Para controlar los datos que tu aplicación envía a Datadog RUM, puedes especificar una frecuencia de muestreo para las sesiones de RUM, mientras [inicializas la característica de RUM][2] como un porcentaje entre 0 y 100.

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

### Activar la característica de RUM para iniciar el envío de datos

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
    val rumConfig = RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold)
      .useViewTrackingStrategy(strategy)
      .build()
    Rum.enable(rumConfig)
```
{{% /tab %}}

{{% tab "Java" %}}
```java
    RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
      .trackInteractions()
      .trackLongTasks(durationThreshold)
      .useViewTrackingStrategy(strategy)
      .build();
    Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

Consulta [`ViewTrackingStrategy`][5] para activar el rastreo automático de todas tus vistas (actividades, fragmentos, etc.).

### Inicializa RUM Interceptor para rastrear eventos de red.

1. Si deseas disponer del rastreo distribuido, añade y activa la característica traza (trace), consulta [documentación de recopilación de trazas de Datadog Android][16] para aprender cómo hacerlo.
2. Añade la dependencia de Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel de módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. Para rastrear tus solicitudes de OkHttp como recursos, añade el [Interceptor][9] suministrado:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHostsWithHeaderType = mapOf(
    "example.com" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT),
    "example.eu" to  setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT))
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final Map<String, Set<TracingHeaderType>> tracedHostsWithHeaderType = new HashMap<>();
final Set<TracingHeaderType> datadogAndW3HeadersTypes = new HashSet<>(Arrays.asList(TracingHeaderType.DATADOG, TracingHeaderType.TRACECONTEXT));
tracedHostsWithHeaderType.put("example.com", datadogAndW3HeadersTypes);
tracedHostsWithHeaderType.put("example.eu", datadogAndW3HeadersTypes);
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}



Esto registra cada solicitud que procesa el `OkHttpClient`como un recurso en RUM, con toda la información relevante rellenada automáticamente (URL, método, código de estado y error). Solo se rastrean las solicitudes de red que se iniciaron cuando había una vista activa. Para rastrear solicitudes cuando tu aplicación está en segundo plano, [crea una vista manualmente][10].

**Nota**: Si también utilizas varios interceptores, añade primero `DatadogInterceptor`.

También puedes añadir un `EventListener` para el `OkHttpClient` con el fin de [rastrear automáticamente el tiempo de recursos][11] para proveedores de terceros y solicitudes de red.

## Rastrear eventos en segundo plano

Puedes rastrear eventos como bloqueos y solicitudes de red cuando tu aplicación esté en segundo plano (por ejemplo, si no hay una vista activa disponible).

Añade el siguiente fragmento durante configuración de RUM:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{% tab "Java" %}}
```Java
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-info"><p>El rastreo de eventos en segundo plano puede dar lugar a sesiones adicionales, lo que puede afectar a la facturación. Si tienes dudas, <a href="https://docs.datadoghq.com/help/">contacta con el equipo de asistencia de Datadog.</a></p>
</div>

## Extensiones de Kotlin

### extensión `Closeable`

Puedes el uso de la instancia `Closeable` de monitor mediante la utilización del método `useMonitored`, se informará de cualquier error ocurrido a Datadog y cerrar el recurso después.

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}

```

### Rastrear los activos locales como recursos de RUM

Puedes realizar un rastreo del acceso a los activos mediante la utilización del método de extensión `getAssetAsRumResource`:

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

El uso de los recursos locales puede rastrearse utilizando el método de extensión `getRawResAsRumResource`:

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[2]: https://app.datadoghq.com/rum/application/create
[3]: /es/account_management/api-app-keys/#api-keys
[4]: /es/account_management/api-app-keys/#client-tokens
[5]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[6]: /es/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/#set-tracking-consent-gdpr-compliance
[7]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[8]: /es/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[9]: https://square.github.io/okhttp/interceptors/
[10]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#custom-views
[11]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-network-requests
[12]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[13]: /es/real_user_monitoring/android/web_view_tracking/
[14]: /es/getting_started/tagging/using_tags/#rum--session-replay
[15]: /es/real_user_monitoring/android/data_collected/
[16]: /es/tracing/trace_collection/dd_libraries/android/?tab=kotlin