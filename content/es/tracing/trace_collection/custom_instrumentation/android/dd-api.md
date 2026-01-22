---
code_lang: dd-api
code_lang_weight: 2
description: Instrumenta tu código con la API de Datadog.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: tracing/visualization/
  tag: Documentación
  text: Explorar tus servicios, recursos y traces (trazas)
title: Instrumentación personalizada de Android y Android TV con la API de Datadog
type: multi-code-lang
---

Envía [traces (trazas)][1] a Datadog desde tus aplicaciones de Android con la [biblioteca de rastreo del lado del cliente
`dd-sdk-android-trace (traza)` de Datadog][2] y aprovecha las siguientes funciones:

* Crea [tramos (spans)][3] personalizados para las operaciones de tu aplicación.
* Añade `context` y atributos personalizados adicionales a cada tramo enviado.
* Uso de red optimizado con envíos masivos automáticos.

{{% otel-custom-instrumentation-lang %}}

{{% android-trace-datadog-api-waning %}}
{{% android-otel-note %}}

## Configuración

1. Añade la dependencia de Gradle declarando la biblioteca como dependencia en tu archivo `build.gradle`:
   ```groovy
   dependencies {
     implementation "com.datadoghq:dd-sdk-android-trace:x.x.x"
   }
   ```
2. Inicializa el kit de desarrollo de software (SDK) de Datadog con tu contexto de aplicación, consentimiento de rastreo y
   el [token de cliente de Datadog][4]. Por razones de seguridad, debes utilizar un token de cliente: no puedes
   utilizar [claves de API de Datadog][5] para configurar el kit de desarrollo de software (SDK) de Datadog tal y como se expondrían dl lado del cliente en el
   código de bytes APK de la aplicación de Android. Para obtener más información sobre la configuración de un token de cliente, consulta
   la [documentación del token de cliente][4]:
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
          ).useSite(DatadogSite.EU1)
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
          ).useSite(DatadogSite.US3)
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
          ).useSite(DatadogSite.US5)
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
          ).useSite(DatadogSite.US1_FED)
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
          ).useSite(DatadogSite.AP1)
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
          ).useSite(DatadogSite.AP2)
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

   Para cumplir con la normativa de GDPR, el kit de desarrollo de software (SDK) requiere el valor de consentimiento de rastreo en la
   inicialización.
   El consentimiento de seguimiento puede ser uno de los siguientes valores:
   * `TrackingConsent.PENDING`: El kit de desarrollo de software (SDK) comienza a recopilar y procesar los datos, pero no los envía
   a los datos
   de recopilación de datos. El SDK espera el nuevo valor de consentimiento de seguimiento para decidir qué hacer con
   los datos en lotes.
   * `TrackingConsent.GRANTED`: El kit de desarrollo de software (SDK) comienza a recoger los datos y los envía al
   endpoint de recopilación de datos.
   * `TrackingConsent.NOT_GRANTED`: El kit de desarrollo de software (SDK) no recopila ningún dato. No podrás
   enviar manualmente ningún log, traza ni
   evento de RUM.

   Para actualizar el consentimiento de rastreo después de inicializar el kit de desarrollo de software (SDK), llama a:
   `Datadog.setTrackingConsent(<NEW CONSENT>)`.
   El kit de desarrollo de software (SDK) cambia tu comportamiento en función del nuevo consentimiento. Por ejemplo, si el consentimiento de
   rastreo actual es `TrackingConsent.PENDING` y lo actualizas a:
   * `TrackingConsent.GRANTED`: El kit de desarrollo de software (SDK) envía todos los datos actuales por lotes y los datos futuros directamente al
   endpoint de recopilación de datos.
   * `TrackingConsent.NOT_GRANTED`: El SDK elimina todos los datos en lotes y no recopila ningún dato
   futuro.

   **Nota**: En las credenciales requeridas para la inicialización, el nombre de la variante de tu aplicación también es
   obligatorio y debe utilizar tu valor `BuildConfig.FLAVOR` (o una cadena vacía si no tienes
   variantes). Esto es importante porque permite que el archivo ProGuard `mapping.txt` correcto se
   cargue automáticamente en el momento de la compilación para poder visualizar las traces (trazas) de pila de error de RUM desofuscadas. Para
   obtener más información, consulta la [guía para cargar archivos fuente de asignación de Android][7].

   Utiliza el método de utilidad `isInitialized` para comprobar si el SDK está correctamente inicializado:

   ```kotlin
   if (Datadog.isInitialized()) {
   // your code here
   }
   ```

   Cuando escribas tu aplicación, puedes activar los logs de desarrollo llamando al método `setVerbosity`.
   Todos los mensajes internos de la biblioteca con una prioridad igual o superior al nivel proporcionado
   registran, a continuación, en el Logcat de Android:

   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```
3. Configura y habilita la función de rastreo:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val traceConfig = TraceConfiguration.Builder().build()
   Trace.enable(traceConfig)
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   TraceConfiguration traceConfig = TraceConfiguration.Builder().build();
   Trace.enable(traceConfig);
   ```
   {{% /tab %}}
   {{< /tabs >}}
4. Configura y registra el sitio `DatadogTracer`. Solo tienes que hacerlo una vez, normalmente en el
   método de tu aplicación `onCreate()`:
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
     DatadogTracing.newTracerBuilder(Datadog.getInstance()).build()
   );
   ```
   {{% /tab %}}
   {{< /tabs >}}

5. (Opcional) - Configura el umbral de descarga parcial para optimizar la carga de trabajo del kit de desarrollo de software (SDK) en función del número
   de spans (tramos) que genera tu aplicación. La biblioteca espera hasta que el número de spans (tramos) terminados exceda
   el umbral antes de escribirlos en el disco. Al configurar este valor a `1` se escribe cada span (tramo) tan pronto como
   termina.
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

6. Inicia un tramo personalizado utilizando el siguiente método:
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
7. Para utilizar contextos en llamadas síncronas:
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
           // Do something ...
         }
       } catch (e: Throwable) {
         childSpan.logThrowable(e)
       } finally {
         childSpan.finish()
       }
     }
   } catch (e: Error) {
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
         }
         finally {
           innerScope.close();
         }
       } catch( Throwable e) {
         childSpan.logThrowable(e);
       } finally {
         childSpan.finish();
       }
     }
     finally {
       scope.close();
     }
   } catch(Error e){
   }
   ```
   {{% /tab %}}
   {{< /tabs >}}

8. Para utilizar contextos en llamadas asíncronas:
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
           new Thread(() ->{
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
   } catch(Throwable e) {
           span.logThrowable(e);
   } finally {
         span.finish();
   }
   ```
   {{% /tab %}}
   {{< /tabs >}}
9. (Opcional) Para distribuir manualmente las traces (trazas) entre tus entornos, por ejemplo, de frontend a
   backend:
   1. Inserta el contexto de rastreador en la solicitud del cliente.
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
     });
   Request request = tracedRequestBuilder.build();
   // Dispatch the request and finish the span after.
   ```
   {{% /tab %}}
   {{< /tabs >}}
   1. Extrae el contexto de rastreador del cliente de los encabezados del código del servidor.
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

   **Nota**: Para las bases de código que utilizan el cliente OkHttp, Datadog proporciona
   la [siguiente implementación](#okhttp).

10. (Opcional) Para proporcionar etiquetas (tags) adicionales junto a tu tramo:
    ```kotlin
    span.setTag("http.url", url)
    ```
11. (Opcional) Para marcar un tramo como que tiene un error, regístralo utilizando los métodos correspondientes:
    ```kotlin
    span.logThrowable(throwable)
    ```
    ```kotlin
    span.logErrorMessage(message)
    ```
12. Si necesitas modificar algunos atributos de los eventos de span (tramo) antes de la agrupación por lotes, puedes hacerlo de la siguiente manera
    proporcionado una implementación de `SpanEventMapper` al activar la función de trace (traza):
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

## Extensiones de Kotlin

### Ejecución de una Lambda dentro de un tramo

Para monitorizar el rendimiento de una lambda dada, puedes utilizar el método `withinSpan()`. En forma predeterminada, se creará un
ámbito para span (tramo), pero puedes desactivar este comportamiento configurando el parámetro `activate`
en false.

```kotlin
import com.datadog.android.trace.withinSpan
import com.datadog.android.trace.api.span.DatadogSpan

withinSpan("<SPAN_NAME>", parentSpan, activate) {
  // Your code here
}
```

### Rastreo de transacciones SQLite

Si estás utilizando `SQLiteDatabase` para persistir datos localmente, puedes rastrear la transacción de base de datos
con el siguiente método:

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

Se comporta como el método `SQLiteDatabase.transaction` proporcionado en el paquete AndroidX `core-ktx` 
y solo requiere un nombre de operación de span (tramo).

## Integraciones

Además del rastreo manual, el SDK de Datadog proporciona las siguientes integraciones.

### OkHttp

Si deseas rastrear tus solicitudes de OkHttp, puedes añadir el [Interceptor][6] proporcionado (que puede estar
en la biblioteca `dd-sdk-android-okhttp`) de la siguiente manera:

1. Añade la dependencia de Gradle a la biblioteca `dd-sdk-android-okhttp` en el nivel del módulo
   archivo `build.gradle`:
   ```groovy
   dependencies {
       implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
   }
   ```
2. Añade `DatadogInterceptor` a tu `OkHttpClient`:
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
   val tracedHosts = listOf("example.com", "example.eu")
   val okHttpClient = OkHttpClient.Builder()
     .addInterceptor(
       DatadogInterceptor.Builder(tracedHosts)
         .setTraceSampler(RateBasedSampler(20f))
         .build()
     )
     .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
   List<String> tracedHosts = Arrays.asList("example.com", "example.eu");
   OkHttpClient okHttpClient = new OkHttpClient.Builder()
     .addInterceptor(
       new DatadogInterceptor.Builder(tracedHosts)
         .setTraceSampler(new RateBasedSampler(20f))
         .build()
     )
     .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

Esto crea un span (tramo) alrededor de cada solicitud procesada por el OkHttpClient (que coincide con los hosts proporcionados),
con toda la información relevante rellenada automáticamente (URL, método, código de estado, error) y
propaga la información de rastreo a tu backend para obtener una trace (traza) unificada en Datadog.

Las traces (trazas) de red se muestrean con una frecuencia de muestreo ajustable. Se aplica un muestreo del 100 %.
en forma predeterminada.

El interceptor rastrea las solicitudes al nivel de la aplicación. También puedes añadir un `TracingInterceptor` al
nivel de la red para obtener más detalles; por ejemplo, cuando se siguen redirecciones.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHosts = listOf("example.com", "example.eu")
val okHttpClient = OkHttpClient.Builder()
  .addInterceptor(
    DatadogInterceptor.Builder(tracedHosts)
      .setTraceSampler(RateBasedSampler(20f))
      .build()
  )
  .addNetworkInterceptor(
    TracingInterceptor.Builder(tracedHosts)
      .setTraceSampler(RateBasedSampler(100f))
      .build()
  )
  .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
List<String> tracedHosts = Arrays.asList("example.com", "example.eu");
OkHttpClient okHttpClient = new OkHttpClient.Builder()
  .addInterceptor(
    new DatadogInterceptor.Builder(tracedHosts)
      .setTraceSampler(new RateBasedSampler(20f))
      .build()
  )
  .addNetworkInterceptor(
    new TracingInterceptor.Builder(tracedHosts)
      .setTraceSampler(new RateBasedSampler(20f))
      .build()
  )
  .build();
```
{{% /tab %}}
{{< /tabs >}}

En este case (incidencia), la decisión de muestreo de traces (trazas) tomada por el interceptor ascendente para una solicitud concreta.
será respetada por el interceptor descendente.

Debido a que la forma en que se ejecuta la solicitud de OkHttp (con un grupo de subprocesos), el span (tramo) de la solicitud no se
vinculará automáticamente con el span (tramo) que activó la solicitud. Puedes proporcionar manualmente un span (tramo)
primario en `OkHttp Request.Builder` de la siguiente manera con el método de la extensión `Request.Builder.parentSpan` 
:

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
  .url(requestUrl)
Request request = OkHttpRequestExtKt
  .parentSpan(requestBuilder, parentSpan)
  .build();
```
{{% /tab %}}
{{< /tabs >}}

**Nota**:

* Si se utilizan varios interceptores, éste debe llamarse en primer lugar.
* Si defines tipos de encabezados de rastreo personalizados en la configuración de Datadog y estás utilizando un rastreador
  registrado en `GlobalDatadogTracer`, asegúrate de que se configuren los mismos tipos de encabezados de rastreo para el
  rastreador en uso.

## Recopilación de lotes

Todos los spans (tramos) se almacenan primero en el dispositivo local por lotes. Cada lote sigue la especificación
de entrada. Se envían en cuanto la red esté disponible y la carga de batería sea lo suficientemente alta como para
garantizar que el kit de desarrollo de software (SDK) de Datadog no afecte a la experiencia del usuario final. Si la red no está disponible
mientras la aplicación está en primer plano, o si falla una carga de datos, el lote se mantiene hasta que
se pueda enviar con éxito.

Esto significa que aunque los usuarios abran tu aplicación estando desconectados, no se perderá ningún dato.

Los datos en disco se descartarán automáticamente si son demasiado antiguos para garantizar que el kit de desarrollo de software (SDK) no utilice
demasiado espacio en disco.

## Inicialización
Los siguientes métodos de `DatadogTracerBuilder` pueden utilizarse al inicializar el `DatadogTracer`:

| Método                                            | Descripción                                                                                                                                                                                  |
|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `withServiceName(<SERVICE_NAME>)  `                | Configura el valor del `service`.                                                                                                                                                             |
| `withPartialFlushMinSpans(<INT>)`                 | Cuando se alcanza este umbral (tienes una cantidad específica `<INT>` de tramos cerrados en espera), se activa el mecanismo de descarga y todos los tramos cerrados pendientes se procesan y se envían para su admisión. |
| `withTag(<KEY>, <VALUE>)`                         | Configura un par de etiquetas `<KEY>:<VALUE>` que se añadirán a tramos creados por el rastreador.                                                                                                               |
| `setBundleWithRumEnabled(true)`                   | Configura como `true` para permitir que los tramos se enriquezcan con la información de la vista RUM actual. Esto te permite ver todos los tramos generados durante la vida útil de una vista específica en el Explorador RUM.   |
| `withSampleRate(<FLOAT>)`                         | Configura un valor `0-100` para definir el porcentaje de trazas a recopilar.                                                                                                                           |
| `withTracingHeadersTypes(Set<TracingHeaderType>)` | Define los estilos de cabeceras de rastreo que pueden ser inyectados por el rastreador.                                                                                                                           |
| `setTraceRateLimit(<INT>)`                        | Define el límite de frecuencia de rastreo. Es el número máximo de trazas por segundo que se aceptarán.                                                                                            |

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/visualization/#trace

[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace

[3]: /es/tracing/visualization/#spans

[4]: /es/account_management/api-app-keys/#client-tokens

[5]: /es/account_management/api-app-keys/#api-keys

[6]: https://square.github.io/okhttp/interceptors/

[7]: /es/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file