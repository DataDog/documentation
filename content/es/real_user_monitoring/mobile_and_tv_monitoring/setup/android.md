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

Esta página describe cómo instrumentar tus aplicaciones tanto para [Real User Monitoring (RUM)][1] como para [Error Tracking][2] con el SDK de Android. Puedes seguir los pasos que se indican a continuación para instrumentar tus aplicaciones para RUM (que incluye Error Tracking) o Error Tracking, si lo adquiriste como producto independiente.

El SDK de Datadog Android es compatible con Android 5.0+ (nivel de la API 21) y Android TV.

## Configuración

### Especificar los detalles de la aplicación en la interfaz de usuario

1. Declara el SDK de SDK como dependencia.
2. Especificar los detalles de la aplicación en la interfaz de usuario
3. Inicializa el SDK de Datadog con el contexto de la aplicación.
4. Activa la función para iniciar el envío de datos.
5. Inicializa el interceptor para el seguimiento de eventos de red.

### Declarar el SDK de Datadog como dependencia

Declara [dd-sdk-android-rum][3] y el [complemento Gradle][4] como dependencias en el archivo `build.gradle` de tu **módulo de aplicación**.

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
{{< tabs >}}
{{% tab "RUM" %}}

1. Ve a [**Digital Experience** > **Add an Application** (Experiencia digital > Añadir una aplicación)][1].
2. Selecciona `android` como tipo de aplicación e introduce un nombre de la aplicación para generar un ID de la aplicación de Datadog y un token de cliente únicos.
3. Para instrumentar tus vistas web, haz clic en el conmutador **Instrumentar tus vistas web**. Para obtener más información, consulta [Seguimiento de vistas web][2].
4. Para desactivar la recopilación automática de datos de usuario de IP de cliente o datos de geolocalización, utiliza los conmutadores para esos ajustes. Para obtener más información, consulta [Recopilación de datos de Android RUM][3].

   {{< img src="real_user_monitoring/android/android-new-application.png" alt="Crear una aplicación de RUM para Android en Datadog" style="width:90%;">}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /es/real_user_monitoring/android/web_view_tracking/
[3]: /es/real_user_monitoring/android/data_collected/

{{% /tab %}}
{{% tab "Error Tracking" %}}

1. Ve a [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application** (Error Tracking > Configuración > Navegador y móvil > Añadir una aplicación)][1].
2. Selecciona `android` como tipo de aplicación e introduce un nombre de la aplicación para generar un ID de la aplicación de Datadog y un token de cliente únicos.
3. Para instrumentar tus vistas web, haz clic en el conmutador **Instrumentar tus vistas web**. Para obtener más información, consulta [Seguimiento de vistas web][2].
4. Para desactivar la recopilación automática de datos de usuario de IP de cliente o datos de geolocalización, utiliza los conmutadores para esos ajustes. Para obtener más información, consulta [Datos de Android recopilados][3].

   {{< img src="real_user_monitoring/error_tracking/mobile-new-application.png" alt="Crear una aplicación para Android en Datadog" style="width:90%;">}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /es/real_user_monitoring/android/web_view_tracking/
[3]: /es/real_user_monitoring/android/data_collected/

{{% /tab %}}
{{< /tabs >}}

Para garantizar la seguridad de tus datos, debes utilizar un token de cliente. Si solo utilizas [claves de API Datadog][5] para configurar el SDK de Datadog, estas se exponen del lado del cliente en el código de bytes APK de la aplicación Android. 

Para obtener más información sobre cómo configurar un token de cliente, consulta la [Documentación sobre el token de cliente][6].

### Inicializar el SDK de Datadog con el contexto de la aplicación

En el fragmento de inicialización, define un nombre de entorno, un nombre de servicio y un número de versión. En los ejemplos siguientes, `APP_VARIANT_NAME` especifica la variante de la aplicación que genera los datos. Para obtener más información, consulta [Uso de etiquetas (tags)][7].

Consulta [`trackingConsent`][8] para añadir el cumplimiento de GDPR para tus usuarios de la UE. Para inicializar la biblioteca, consulta [otras opciones de configuración][9].

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

Las credenciales de inicialización requieren el nombre de variante de tu aplicación y utilizan el valor de `BuildConfig.FLAVOR`. Con la variante, el SDK puede hacer coincidir los errores informados desde tu aplicación con los archivos de asignación cargados por el complemento Gradle. Si no tienes variantes, las credenciales utilizan una cadena vacía. 

El complemento Gradle carga automáticamente el archivo ProGuard `mapping.txt` correspondiente en el momento de la compilación para que puedas ver las trazas (traces) de error de stack tecnológico desofuscadas. Para obtener más información, consulta el [seguimiento de errores de Android][10].

### Muestreo de sesiones

<div class="alert alert-warning">La configuración de la frecuencia de muestreo de sesiones no se aplica a Error Tracking.</div>

Para controlar los datos que tu aplicación envía a Datadog, puedes especificar una frecuencia de muestreo para las sesiones al [inicializar RUM][11]. La frecuencia es un porcentaje entre 0 y 100. Por defecto, `sessionSamplingRate` se define en 100 (mantener todas las sesiones).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

### Configurar el consentimiento de rastreo (cumplimiento de GDPR)

Para cumplir con la normativa GDPR, el SDK requiere el valor de consentimiento de seguimiento en el momento de la inicialización.

El consentimiento de seguimiento puede ser uno de los siguientes valores:

- `TrackingConsent.PENDING`: (Predeterminado) El SDK comienza a recopilar los datos y a procesarlos por lotes, pero no los envía al
 endpoint de recopilación. El SDK espera el nuevo valor del consentimiento de rastreo para decidir qué hacer con los datos procesados por lotes.
- `TrackingConsent.GRANTED`: el SDK comienza a recopilar los datos y los envía al endpoint de recopilación de datos.
- `TrackingConsent.NOT_GRANTED`: El SDK no recopila ningún dato. No puedes enviar manualmente ningún log, traza o evento.

Para actualizar el consentimiento de rastreo después de inicializar el SDK, llama a `Datadog.setTrackingConsent(<NEW CONSENT>)`. El SDK cambia de comportamiento de acuerdo con el nuevo consentimiento. Por ejemplo, si el consentimiento de rastreo actual es `TrackingConsent.PENDING` y lo actualizas a:

- `TrackingConsent.GRANTED`: el SDK envía todos los datos actuales procesados por lotes y los datos futuros directamente al endpoint de recopilación de datos.
- `TrackingConsent.NOT_GRANTED`: el SDK borra todos los datos procesados por lotes y no recopila datos futuros.


### Activar la función para iniciar el envío de datos

Para permitir que el SDK Android comience a enviar datos:

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
   val rumConfig = RumConfiguration.Builder(applicationId)
     .trackInteractions()
     .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
     .useViewTrackingStrategy(strategy)
     .build()
   Rum.enable(rumConfig)
```

{{% /tab %}}
{{% tab "Java" %}}

```java
   RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
     .trackInteractions()
     .trackLongTasks(durationThreshold)  // Not applicable to Error Tracking
     .useViewTrackingStrategy(strategy)
     .build();
   Rum.enable(rumConfig);
```

{{% /tab %}}
{{< /tabs >}}

Consulta [`ViewTrackingStrategy`][12] para activar el seguimiento automático de todas tus vistas (actividades, fragmentos, etc.).

### Inicializar el interceptor para el seguimiento de eventos de red

Para inicializar un interceptor para el seguimiento de eventos de red:

1. Si quieres aplicar el rastreo distribuido, [añade y activa la función de rastreo][13].
2. Añade la dependencia de Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel de módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. Para el seguimiento de tus solicitudes OkHttp como recursos, añade el [interceptor][14] proporcionado:

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

Esto registra cada solicitud procesada por `OkHttpClient` como un recurso, con toda la información relevante (URL, método, código de estado y error) rellenada automáticamente. Sólo se realiza un seguimiento de las solicitudes de red que se iniciaron cuando una vista estaba activa. Para realizar un seguimiento de las solicitudes cuando tu aplicación está en segundo plano, [crea una vista manualmente][15].

**Nota**: Si también utilizas varios interceptores, añade primero `DatadogInterceptor`.

También puedes añadir un `EventListener` para que `OkHttpClient` [realice un seguimiento automático de la temporización de los recursos][16] para proveedores de terceros y solicitudes de red.

## Rastrear eventos en segundo plano

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

## Extensiones de Kotlin

### extensión `Closeable`

Puedes monitorizar el uso de instancias `Closeable` con el método `useMonitored`, que informa de los errores a Datadog y a continuación cierra el recurso.

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

## Envío de datos cuando el dispositivo está desconectado

El SDK de Android garantiza la disponibilidad de los datos cuando el dispositivo de tu usuario está desconectado. En caso de zonas con poca conexión de red o cuando el nivel de carga de la batería del dispositivo es demasiado bajo, todos los eventos se almacenan primero en el dispositivo local en lotes.

Cada lote sigue la especificación de admisión. Los lotes se envían en cuanto la red está disponible y el nivel de batería es lo suficientemente alto como para garantizar que el SDK de Datadog no afectará a la experiencia del usuario final. Si la red no está disponible mientras tu aplicación está en primer plano, o si falla una carga de datos, el lote se conserva hasta que pueda enviarse con éxito.

Esto significa que incluso si los usuarios abren tu aplicación mientras están desconectados, no se pierde ningún dato. Para garantizar que el SDK no utilice demasiado espacio de disco, los datos del disco se descartan automáticamente si son demasiado antiguos.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/
[2]: /es/error_tracking/
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[4]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[5]: /es/account_management/api-app-keys/#api-keys
[6]: /es/account_management/api-app-keys/#client-tokens
[7]: /es/getting_started/tagging/using_tags/#rum--session-replay
[8]: #set-tracking-consent-gdpr-compliance
[9]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[10]: /es/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[11]: https://app.datadoghq.com/rum/application/create/
[12]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[13]: /es/tracing/trace_collection/dd_libraries/android/?tab=kotlin
[14]: https://square.github.io/okhttp/interceptors/
[15]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#custom-views
[16]: /es/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-network-requests