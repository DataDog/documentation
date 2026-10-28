---
aliases:
- /es/tracing/setup_overview/setup/android
- /es/tracing/setup/android
- /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/android
code_lang: android
code_lang_weight: 80
description: Recopile trazas de sus aplicaciones de Android.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: tracing/visualization/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas
title: Rastreo de aplicaciones de Android
type: multi-code-lang
---
Envíe [trazas][1] a Datadog desde sus aplicaciones de Android con el [SDK del lado del cliente de `dd-sdk-android-trace` de Datadog][2] y aproveche las siguientes funciones:

* Cree [tramos][3] personalizados para operaciones en su aplicación.
* Agregue `context` y atributos personalizados adicionales a cada tramo enviado.
* Uso de red optimizado con publicaciones automáticas por lotes.

{{% android-trace-datadog-api-waning %}}
{{% android-otel-note %}}

## Configuración {#setup}

1. Agregue la dependencia de Gradle declarando la biblioteca como una dependencia en su archivo `build.gradle`:
   ```groovy
   dependencies {
       implementation "com.datadoghq:dd-sdk-android-trace:x.x.x"
   }
   ```
2. Inicialice el SDK de Datadog con el contexto de su aplicación, el consentimiento de seguimiento y el [token de cliente de Datadog][4]. Por razones de seguridad, debe usar un token de cliente: no puede usar [claves de Datadog API][5] para configurar el SDK de Datadog, ya que quedarían expuestas en el lado del cliente en el código de bytes del APK de la aplicación de Android. Para obtener más información sobre cómo configurar un token de cliente, consulte la [documentación del token de cliente][4]:
   {{< site-region region="us" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.US1_FED)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

{{< site-region region="gov2" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.US2_FED)
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.US2_FED)
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
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
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.AP2)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   {{< site-region region="uk1" >}}
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   class SampleApplication : Application() {
     override fun onCreate() {
       super.onCreate()
       val configuration = Configuration.Builder(
            clientToken = "<CLIENT_TOKEN>",
            env = "<ENV_NAME>",
            variant = "<APP_VARIANT_NAME>"
       )
         .useSite(DatadogSite.UK1)
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
       Configuration configuration = new Configuration.Builder("<CLIENT_TOKEN>", "<ENV_NAME>", "<APP_VARIANT_NAME>")
         .useSite(DatadogSite.UK1)
         .build();

       Datadog.initialize(this, configuration, trackingConsent);
     }
   }
   ```

   {{% /tab %}}
   {{< /tabs >}}
   {{< /site-region >}}

   Para cumplir con el reglamento GDPR, el SDK requiere el valor de consentimiento de seguimiento en la
   Inicialización.
   El consentimiento de seguimiento puede ser uno de los siguientes valores:

   * `TrackingConsent.PENDING`: El SDK comienza a recopilar y procesar los datos por lotes, pero no los envía al
     los datos
     punto de conexión de recopilación de datos. El SDK espera el nuevo valor de consentimiento de seguimiento para decidir qué hacer con
     los datos procesados por lotes.
   * `TrackingConsent.GRANTED`: El SDK comienza a recopilar los datos y los envía al
     punto de conexión de recopilación de datos.
   * `TrackingConsent.NOT_GRANTED`: El SDK no recopila ningún dato. No podrá enviar manualmente
     ningún registro, traza o
     eventos RUM.

   Para actualizar el consentimiento de seguimiento después de que se inicialice el SDK, llame a:
   `Datadog.setTrackingConsent(<NEW CONSENT>)`.
   El SDK cambia su comportamiento según el nuevo consentimiento. Por ejemplo, si el consentimiento de seguimiento actual
   es `TrackingConsent.PENDING` y lo actualiza a:

   * `TrackingConsent.GRANTED`: El SDK envía todos los datos procesados por lotes actuales y los datos futuros directamente al
     punto de conexión de recopilación de datos.
   * `TrackingConsent.NOT_GRANTED`: El SDK borra todos los datos procesados por lotes y no recopila ningún dato futuro.
     datos.

   **Nota**: En las credenciales requeridas para la inicialización, también se requiere el nombre de la variante de su aplicación,
   y debe usar su valor `BuildConfig.FLAVOR` (o una cadena vacía si no tiene
   variantes). Esto es importante porque permite que el archivo ProGuard `mapping.txt` correcto se
   cargue automáticamente en el momento de la compilación para poder visualizar las trazas de pila de errores RUM desofuscados. Para
   más información, consulte la [guía para cargar archivos de mapeo de fuentes de Android][7].

   Utilice el método de utilidad `isInitialized` para verificar si el SDK está inicializado correctamente:

   ```kotlin
   if (Datadog.isInitialized()) {
     // your code here
   }
   ```

   Al escribir su aplicación, puede habilitar los registros de desarrollo llamando al método `setVerbosity`.
   Todos los mensajes internos de la biblioteca con una prioridad igual o superior al nivel proporcionado
   se registran entonces en Logcat de Android:

   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```
3. Configure y habilite la función traza:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val traceConfig = TraceConfiguration.Builder().build()
   Trace.enable(traceConfig)
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   TraceConfiguration traceConfig = new TraceConfiguration.Builder().build();
   Trace.enable(traceConfig);
   ```
   {{% /tab %}}
   {{< /tabs >}}
4. Configure y registre el `DatadogTracer`. Solo necesita hacerlo una vez, generalmente en el método `onCreate()` de su aplicación:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   import com.datadog.android.trace.GlobalDatadogTracer
   import com.datadog.android.trace.DatadogTracing

   GlobalDatadogTracer.registerIfAbsent(
       DatadogTracing.newTracerBuilder()
           .build()
   )
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   import com.datadog.android.trace.GlobalDatadogTracer;
   import com.datadog.android.trace.DatadogTracing;

   GlobalDatadogTracer.registerIfAbsent(
       DatadogTracing.newTracerBuilder(Datadog.getInstance())
           .build()
   );
   ```
   {{% /tab %}}
   {{< /tabs >}}
5. (Opcional) - Establezca el umbral de vaciado parcial para optimizar la carga de trabajo del SDK según la cantidad de tramos que genere su aplicación. La biblioteca espera hasta que la cantidad de tramos finalizados supere el umbral antes de escribirlos en el disco. Establecer este valor en `1` escribe cada tramo tan pronto como finaliza.
   {{< tabs >}}
   {{% tab "Kotlin" %}}

   ```kotlin
   val tracer = DatadogTracing.newTracerBuilder()
       .withPartialFlushMinSpans(10)
       .build()
   ```

   {{% /tab %}}
   {{% tab "Java" %}}

   ```java
   DatadogTracer tracer = DatadogTracing.newTracerBuilder(Datadog.getInstance())
       .withPartialFlushMinSpans(10)
       .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}
6. Inicie un tramo personalizado utilizando el siguiente método:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracer = GlobalDatadogTracer.get()
   val span = tracer.buildSpan("<SPAN_NAME>").start()
   // Do something ...
   // ...
   // Then when the span should be closed
   span.finish()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogTracer tracer = GlobalDatadogTracer.get();
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME>").start();
   // Do something ...
   // ...
   // Then when the span should be closed
   span.finish();
   ```
   {{% /tab %}}
   {{< /tabs >}}
7. Para usar contextos en llamadas síncronas:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val span = tracer.buildSpan("<SPAN_NAME1>").start()
   try {
       val scope = tracer.activateSpan(span)
       scope?.use {
           // Do something ...
           // ...
           // Start a new Scope
           val childSpan = tracer.buildSpan("<SPAN_NAME2>").start()
           try {
               val innerScope = tracer.activateSpan(childSpan).use { innerScope ->

               }
           } catch (e: Throwable) {
               childSpan.logThrowable(e)
           } finally {
               childSpan.finish()
           }
       }
   } catch (e: Throwable) {
   }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME1>").start();
   try {
       DatadogScope scope = tracer.activateSpan(span);
       try {
           // Do something ...
           // ...
           // Start a new Scope
           DatadogSpan childSpan = tracer.buildSpan("<SPAN_NAME2>").start();
           try {
               DatadogScope innerScope = tracer.activateSpan(childSpan);
               try {
                   // Do something ...
               } finally {
                   innerScope.close();
               }
           } catch (Throwable e) {
               childSpan.logThrowable(e);
           } finally {
               childSpan.finish();
           }
       } finally {
           scope.close();
       }
   } catch (Throwable e) {
   }
   ```
   {{% /tab %}}
   {{< /tabs >}}
8. Para usar contextos en llamadas asíncronas:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val span = tracer.buildSpan("<SPAN_NAME1>").start()
   try {
       val scope = tracer.activateSpan(span)
       scope.use {
           // Do something ...
           Thread {
               // Step 2: reactivate the Span in the worker thread
               tracer.activateSpan(span).use {
                   // Do something ...
               }
           }.start()
       }
   } catch (e: Throwable) {
       span.logThrowable(e)
   } finally {
       span.finish()
   }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME1>").start();
   try {
       DatadogScope scope = tracer.activateSpan(span);
       try {
           // Do something ...
           new Thread(() -> {
               // Step 2: reactivate the Span in the worker thread
               DatadogScope scopeContinuation = tracer.activateSpan(span);
               try {
                   // Do something
               } finally {
                   scope.close();
               }
           }).start();
       } finally {
           scope.close();
       }
   } catch (Throwable e){
       span.logThrowable(e);
   } finally {
       span.finish();
   }
   ```
   {{% /tab %}}
   {{< /tabs >}}

9. (Opcional) Para distribuir manualmente las trazas entre sus entornos, por ejemplo, de frontend a backend:
   1. Inyecte el contexto del trazador en la solicitud del cliente.
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracer = GlobalDatadogTracer.get()
   val span = tracer.buildSpan("<SPAN_NAME>").start()
   val tracedRequestBuilder = Request.Builder()
   tracer.propagate().inject<Request.Builder?>(
       span.context(),
       tracedRequestBuilder
   ) { builder, key, value ->
       builder?.addHeader(key, value)
   }
   val request = tracedRequestBuilder.build()
   // Dispatch the request and finish the span after.
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogTracer tracer = GlobalDatadogTracer.get();
   DatadogSpan span = tracer.buildSpan("<SPAN_NAME>").start();
   Request.Builder tracedRequestBuilder = new Request.Builder();
   tracer.propagate().inject(
       span.context(),
       tracedRequestBuilder,
       new Function3<Request.Builder,String,String,Unit>(){
           @Override
           public Unit invoke(Request.Builder builder, String key, String value) {
             builder.addHeader(key, value);
             return Unit.INSTANCE;
           }
       }
   );
   Request request = tracedRequestBuilder.build();
   // Dispatch the request and finish the span after.
   ```
   {{% /tab %}}
   {{< /tabs >}}
   1. Extraiga el contexto del trazador del cliente de los encabezados en el código del servidor.
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracer = GlobalDatadogTracer.get()
   val extractedContext = tracer.propagate()
       .extract(request) { carrier, classifier ->
           val headers = carrier.headers.toMultimap()
               .map { it.key to it.value.joinToString(";") }
               .toMap()

           for ((key, value) in headers) classifier(key, value)
       }

   val serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").withParentContext(extractedContext).start()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   DatadogTracer tracer = GlobalDatadogTracer.get();
   DatadogSpanContext extractedContext = tracer.propagate()
     .extract(request,
       new Function2<Request, Function2<? super String, ? super String, Boolean>, Unit>() {
         @Override
         public Unit invoke(
           Request carrier,
           Function2<? super String, ? super String, Boolean> classifier
         ) {
           request.headers().forEach(pair -> {
             String key = pair.component1();
             String value = pair.component2();

             classifier.invoke(key, value);
           });

           return Unit.INSTANCE;
         }
       });
   DatadogSpan serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").withParentContext(extractedContext).start();
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **Nota**: Para bases de código que utilizan el cliente OkHttp, Datadog proporciona la [implementación a continuación](#okhttp).

10. (Opcional) Para proporcionar etiquetas adicionales junto con su tramo:
    ```kotlin
    span.setTag("http.url", url)
    ```
11. (Opcional) Para marcar un tramo como que tiene un error, regístrelo utilizando los métodos correspondientes:
    ```kotlin
    span.logThrowable(throwable)
    ```
    ```kotlin
    span.logErrorMessage(message)
    ```
12. Si necesita modificar algunos atributos en sus eventos de tramo antes del procesamiento por lotes, puede hacerlo proporcionando una implementación de `SpanEventMapper` al habilitar la función de traza:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val traceConfig = TraceConfiguration.Builder()
     // ...
     .setEventMapper(spanEventMapper)
     .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   TraceConfiguration config = new TraceConfiguration.Builder()
     // ...
     .setEventMapper(spanEventMapper)
     .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

## Extensiones de Kotlin {#kotlin-extensions}

### Ejecución de una lambda dentro de un tramo {#running-a-lambda-within-a-span}

Para hacer un seguimiento del rendimiento de una lambda determinada, puede usar el método `withinSpan()`. De forma predeterminada, se creará un contexto para el tramo, pero puede deshabilitar este comportamiento configurando el parámetro `activate` en false.

```kotlin
import com.datadog.android.trace.withinSpan
import com.datadog.android.trace.api.span.DatadogSpan

withinSpan("<SPAN_NAME>", parentSpan, activate) {
   // Your code here
}
```

### Rastreo de la transacción de SQLite {#tracing-sqlite-transaction}

Si está utilizando `SQLiteDatabase` para persistir datos localmente, puede rastrear la transacción de la base de datos utilizando el siguiente método:

```kotlin
import com.datadog.android.trace.sqlite.transactionTraced
import android.database.sqlite.SQLiteDatabase

sqliteDatabase.transactionTraced("<SPAN_NAME>", isExclusive) { database ->
  // Your queries here
  database.insert("<TABLE_NAME>", null, contentValues)

  // Decorate the Span
  setTag("<TAG_KEY>", "<TAG_VALUE>")
}
```
Se comporta como el método `SQLiteDatabase.transaction` proporcionado en el paquete `core-ktx` de AndroidX y solo requiere un nombre de operación de tramo.

## Integrations {#integrations}

Además del rastreo manual, el SDK de Datadog proporciona las siguientes integraciones.

### OkHttp {#okhttp}

Si desea rastrear sus solicitudes de OkHttp, puede agregar el [Interceptor][6] proporcionado (que se puede encontrar en la biblioteca `dd-sdk-android-okhttp`) de la siguiente manera:

1. Agregue la dependencia de Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel de módulo:
   ```groovy
   dependencies {
     implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
   }
   ```
2. Agregue `DatadogInterceptor` a su `OkHttpClient`. Cada entrada de servidor acepta un nombre de servidor simple (por ejemplo, `"example.com"`) o un patrón comodín con un solo `*` (por ejemplo, `"*.example.com"`). Un comodín solo puede coincidir con subdominios de un dominio registrable, por lo que patrones como `"*.com"` son rechazados:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracedHosts = listOf("example.com", "example.eu", "*.example.eu")
   val okHttpClient = OkHttpClient.Builder()
     .addInterceptor(
       DatadogInterceptor.Builder(tracedHosts)
         .setTraceSampleRate(20f)
         .build()
     )
     .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   List<String> tracedHosts = Arrays.asList("example.com", "example.eu", "*.example.eu");
   OkHttpClient okHttpClient = new OkHttpClient.Builder()
     .addInterceptor(
       new DatadogInterceptor.Builder(tracedHosts)
         .setTraceSampleRate(20f)
         .build()
     )
     .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

Esto crea un tramo alrededor de cada solicitud procesada por OkHttpClient (que coincida con los servidores proporcionados), con toda la información relevante completada automáticamente (URL, método, código de estado, error), y propaga la información de traza a su backend para obtener una traza unificada dentro de Datadog.

Las trazas de red se muestrean con una tasa de muestreo ajustable. De forma predeterminada, se aplica un muestreo del 100%.

El interceptor rastrea las solicitudes a nivel de aplicación. También puede agregar un `TracingInterceptor` a nivel de red para obtener más detalles; por ejemplo, al seguir redirecciones.

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val tracedHosts = listOf("example.com", "example.eu", "*.example.eu")
val okHttpClient =  OkHttpClient.Builder()
  .addInterceptor(
    DatadogInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(20f)
      .build()
  )
  .addNetworkInterceptor(
    TracingInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(100f)
      .build()
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
List<String> tracedHosts = Arrays.asList("example.com", "example.eu", "*.example.eu");
OkHttpClient okHttpClient = new OkHttpClient.Builder()
  .addInterceptor(
    new DatadogInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(20f)
      .build()
  )
  .addNetworkInterceptor(
    new TracingInterceptor.Builder(tracedHosts)
      .setTraceSampleRate(20f)
      .build()
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

En este caso, la decisión de muestreo de traza tomada por el interceptor ascendente para una solicitud en particular será respetada por el interceptor descendente.

Debido a la forma en que se ejecuta la solicitud de OkHttp (usando un grupo de subprocesos), el tramo de la solicitud no se vinculará automáticamente con el tramo que activó la solicitud. Puede proporcionar manualmente un tramo principal en el `OkHttp Request.Builder` de la siguiente manera usando el método de extensión `Request.Builder.parentSpan`:

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val request = Request.Builder()
  .url(requestUrl)
  .parentSpan(parentSpan)
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
Request.Builder requestBuilder = new Request.Builder()
  .url(requestUrl);

Request request = OkHttpRequestExtKt
  .parentSpan(requestBuilder, parentSpan)
  .build();
```
{{% /tab %}}
{{< /tabs >}}

**Nota**:
* Si utiliza varios interceptores, este debe llamarse primero.
* Si define tipos de encabezado de rastreo personalizados en la configuración de Datadog y utiliza un SDK registrado con `GlobalDatadogTracer`, asegúrese de que los mismos tipos de encabezado de rastreo estén configurados para el SDK en uso.

### Cronet {#cronet}

Si utiliza Cronet en lugar de OkHttp, puede instrumentar su `CronetEngine` para el rastreo distribuido.

1. Agregue las dependencias de Gradle en el archivo `build.gradle` a nivel de módulo:
   ```groovy
   dependencies {
     implementation "com.datadoghq:dd-sdk-android-cronet:x.x.x"
   }
   ```
2. Instrumente el `CronetEngine.Builder`:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val cronetEngine = CronetEngine.Builder(context)
     .configureDatadogInstrumentation(
       apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
         tracedHosts = listOf("example.com", "example.eu")
       )
     )
     .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   CronetEngine.Builder builder = new CronetEngine.Builder(context);
   CronetEngine cronetEngine = CronetIntegrationPluginKt
     .configureDatadogInstrumentation(
       builder,
       null,
       new ApmNetworkInstrumentationConfiguration(
         Arrays.asList("example.com", "example.eu")
       )
     )
     .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

Esto crea un tramo alrededor de cada solicitud procesada por el `CronetEngine` que coincida con los hosts proporcionados. Toda la información relevante se completa automáticamente (URL, método, código de estado, error) y la información de traza se propaga a su backend.

#### Trazas de redirecciones {#tracing-redirects}

De forma predeterminada, la traza se aplica a nivel de aplicación. Para rastrear también las solicitudes redirigidas, establezca el contexto de traza en `ALL`:

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val cronetEngine = CronetEngine.Builder(context)
  .configureDatadogInstrumentation(
    apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
      tracedHosts = listOf("example.com", "example.eu")
    ).setTraceScope(ApmNetworkTracingScope.ALL)
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
  .configureDatadogInstrumentation(
    builder,
    null,
    new ApmNetworkInstrumentationConfiguration(
      Arrays.asList("example.com", "example.eu")
    ).setTraceScope(ApmNetworkTracingScope.ALL)
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

#### Solo propagación de encabezados {#header-propagation-only}

Para propagar los encabezados de traza sin crear tramos locales, utilice el modo de solo propagación de encabezados.

**Nota**: Este modo requiere que RUM esté habilitado, ya que el seguimiento de recursos es manejado por la instrumentación de RUM. Debe proporcionar un `RumNetworkInstrumentationConfiguration` en la llamada `configureDatadogInstrumentation`.

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val cronetEngine = CronetEngine.Builder(context)
  .configureDatadogInstrumentation(
    rumInstrumentationConfiguration = RumNetworkInstrumentationConfiguration(),
    apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
      tracedHosts = listOf("example.com", "example.eu")
    ).setHeaderPropagationOnly()
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
  .configureDatadogInstrumentation(
    builder,
    new RumNetworkInstrumentationConfiguration(),
    new ApmNetworkInstrumentationConfiguration(
      Arrays.asList("example.com", "example.eu")
    ).setHeaderPropagationOnly()
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

#### Tasa de muestreo {#sampling-rate}

Para configurar la tasa de muestreo de traza:

{{< tabs >}}
{{% tab "Kotlin" %}}

```kotlin
val cronetEngine = CronetEngine.Builder(context)
  .configureDatadogInstrumentation(
    apmInstrumentationConfiguration = ApmNetworkInstrumentationConfiguration(
      tracedHosts = listOf("example.com", "example.eu")
    ).setTraceSampleRate(20f)
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}

```java
CronetEngine.Builder builder = new CronetEngine.Builder(context);
CronetEngine cronetEngine = CronetIntegrationPluginKt
  .configureDatadogInstrumentation(
    builder,
    null,
    new ApmNetworkInstrumentationConfiguration(
      Arrays.asList("example.com", "example.eu")
    ).setTraceSampleRate(20f)
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

**Limitaciones conocidas**:
* Los encabezados de traza no se propagan para las solicitudes redirigidas debido a las limitaciones de la API de Cronet.
* Los reintentos no pueden ser instrumentados.

## Recopilación por lotes {#batch-collection}

Todos los tramos se almacenan primero en el dispositivo local en lotes. Cada lote sigue la especificación de ingesta. Se envían tan pronto como la red está disponible y la batería tiene suficiente carga para garantizar que el SDK de Datadog no afecte la experiencia del usuario final. Si la red no está disponible mientras su aplicación está en primer plano, o si falla la carga de datos, el lote se conserva hasta que pueda enviarse correctamente.

Esto significa que, incluso si los usuarios abren su aplicación mientras están desconectados, no se perderán datos.

Los datos en el disco se descartarán automáticamente si se vuelven demasiado antiguos para garantizar que el SDK no utilice demasiado espacio en disco.

## Inicialización {#initialization}
Los siguientes métodos en `DatadogTracerBuilder` se pueden utilizar al inicializar el `DatadogTracer`:

| Método                                            | Descripción                                                                                                                                                                                  |
|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `withServiceName(<SERVICE_NAME>)	`                | Establezca el valor para `service`.                                                                                                                                                             |
| `withPartialFlushMinSpans(<INT>)`                 | Cuando se alcanza este umbral (tiene una cantidad `<INT>` específica de tramos cerrados en espera), se activa el mecanismo de vaciado y todos los tramos cerrados pendientes se procesan y envían a la ingesta. |
| `withTag(<KEY>, <VALUE>)`                         | Establezca un par de etiquetas `<KEY>:<VALUE>` para añadir a los tramos creados por el Tracer.                                                                                                               |
| `setBundleWithRumEnabled(true)`                   | Establezca en `true` para permitir que los tramos se enriquezcan con la información actual de la Vista RUM. Esto le permite ver todos los tramos producidos durante el ciclo de vida de una Vista específica en el Explorador de RUM.   |
| `withSampleRate(<FLOAT>)`                         | Establezca un valor `0-100` para definir el porcentaje de trazas a recopilar.                                                                                                                           |
| `withTracingHeadersTypes(Set<TracingHeaderType>)` | Establece los estilos de encabezado de traza que puede inyectar el Tracer.                                                                                                                           |
| `setTraceRateLimit(<INT>)`                        | Establece el límite de tasa de traza. Este es el número máximo de trazas por segundo que se aceptarán.                                                                                            |

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/glossary/#trace
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace
[3]: /es/glossary/#span
[4]: /es/account_management/api-app-keys/#client-tokens
[5]: /es/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/

[7]: /es/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file