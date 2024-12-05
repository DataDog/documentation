---
aliases:
- /es/tracing/setup_overview/setup/android
- /es/tracing/setup/android
- /es/tracing/trace_collection/dd_libraries/android
code_lang: android
code_lang_weight: 80
description: Recopila trazas (traces) de tus aplicaciones Android.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Código fuente
  text: Código fuente de dd-sdk-android
- link: tracing/visualization/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas
title: Rastreo de aplicaciones Android
type: lenguaje de código múltiple
---
Envía [trazas][1] a Datadog desde tus aplicaciones Android con [la biblioteca de rastreo del cliente `dd-sdk-android-logs` de Datadog][2] y aprovecha las siguientes características:

* Crea [tramos (spans)][3] personalizados para las operaciones de tu aplicación.
* Añade `context` y atributos personalizados adicionales a cada tramo enviado.
* Uso de red optimizado con envíos masivos automáticos.

<div class="alert alert-info"><strong>Nota</strong>: Datadog factura por la <strong>ingesta e indexación</strong> de tramos enviados desde tus aplicaciones Android, pero no factura  por los dispositivos subyacentes. Para obtener más información, consulta la <a href="/account_management/billing/apm_tracing_profiler/">documentación de facturación de APM</a>.</div>

El rastreador Datadog implementa los estándares [Open Tracing][11] y [Open Telemetry][10]. 

## Configuración

1. Añade la dependencia Gradle declarando la biblioteca como dependencia en tu archivo `build.gradle`:

```groovy
dependencies {
    implementation "com.datadoghq:dd-sdk-android-trace:x.x.x"
}
```

2. Inicializa el SDK de Datadog con el contexto de tu aplicación, el consentimiento de seguimiento y el [token de cliente Datadog][4]. Por motivos de seguridad, debes utilizar un token de cliente: no puedes utilizar [claves de API Datadog][5] para configurar el SDK de Datadog, ya que quedaría expuesto al cliente en el código de bytes APK de la aplicación Android. Para obtener más información sobre cómo configurar un token de cliente, consulta la [documentación sobre tokens de cliente][4]:

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

   Para cumplir con la normativa GDPR, el SDK requiere el valor de consentimiento de seguimiento durante la inicialización.
   El consentimiento de seguimiento puede ser uno de los siguientes valores:
   * `TrackingConsent.PENDING`: el SDK comienza a recopilar y procesar en lotes los datos, pero no los envía al endpoint de recopilación
     de datos. El SDK espera al nuevo valor de consentimiento de seguimiento para decidir qué hacer con los datos en lotes.
   * `TrackingConsent.GRANTED`: el SDK comienza a recopilar los datos y los envía al endpoint de recopilación de datos.
   * `TrackingConsent.NOT_GRANTED`: el SDK no recopila ningún dato. No podrás enviar manualmente ningún log, traza o
     evento de RUM.

   Para actualizar el consentimiento de seguimiento una vez inicializado el SDK, llama a: `Datadog.setTrackingConsent(<NEW CONSENT>)`.
   El SDK cambia su comportamiento en función del nuevo consentimiento. Por ejemplo, si el consentimiento de seguimiento actual es `TrackingConsent.PENDING` y lo actualizas a:
   * `TrackingConsent.GRANTED`: el SDK envía todos los datos actuales procesados por lotes y los datos futuros directamente al endpoint de recopilación de datos.
   * `TrackingConsent.NOT_GRANTED`: el SDK borra todos los datos procesados por lotes y no recopila datos futuros.

**Nota**: Entre las credenciales requeridas para la inicialización, también se requiere el nombre de la variante de tu aplicación y debes utilizar tu valor `BuildConfig.FLAVOR` (o una cadena vacía, si no tienes variantes). Esto es importante, ya que permite cargar automáticamente el archivo ProGuard `mapping.txt` correcto en el momento de la compilación, para poder ver trazas de error de stack tecnológico RUM desofuscadas. Para obtener más información, consulta la [guía para cargar archivos de asignación de fuentes Android][12].

Utiliza el método de utilidad `isInitialized` para comprobar si el SDK se ha inicializado correctamente:

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```
Cuando escribas tu aplicación, puedes activar logs de desarrollo llamando al método `setVerbosity`. Todos los mensajes internos de la biblioteca, con una prioridad igual o superior al nivel proporcionado, se registran en Logcat de Android:
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

4. Configura y registra el rastreador Android. Sólo tienes que hacerlo una vez, por lo general en el método `onCreate()` de tu aplicación.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = AndroidTracer.Builder().build()
GlobalTracer.registerIfAbsent(tracer)
```
{{% /tab %}} 
{{% tab "Java" %}}
```java
AndroidTracer tracer = new AndroidTracer.Builder().build();
GlobalTracer.registerIfAbsent(tracer);
```
{{% /tab %}}
{{< /tabs >}}

5. (Opcional) - Configura el umbral de descarga parcial para optimizar la carga de trabajo del SDK en función del número de tramos que genere tu aplicación. La biblioteca espera hasta que el número de tramos terminados exceda el umbral, antes de escribirlos al disco. Configurar este valor como `1` escribe cada tramo tan pronto como termina.

{{< tabs >}} 
{{% tab "Kotlin" %}}

```kotlin
val tracer = AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build()
```

{{% /tab %}}
{{% tab "Java" %}}

```java
AndroidTracer tracer = new AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build();
```
{{% /tab %}}
{{< /tabs >}}

6. Inicia un tramo personalizado utilizando el siguiente método:

{{< tabs >}} 
{{% tab "Kotlin" %}}
```kotlin
val tracer = GlobalTracer.get()
val span = tracer.buildSpan("<SPAN_NAME>").start()
// Do something ...
// ...
// Then when the span should be closed
span.finish()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
GlobalTracer tracer = GlobalTracer.get();
Span span = tracer.buildSpan("<SPAN_NAME>").start();
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
    scope.use {
        // Do something ...
        // ...
        // Start a new Scope
        val childSpan = tracer.buildSpan("<SPAN_NAME2>").start()
        try {
            tracer.activateSpan(childSpan).use {
                // Do something ...
            }
        } catch(e: Error) {
            childSpan.error(e)
        } finally {
            childSpan.finish()
        }
    }
} catch(e: Throwable) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
Span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    Scope scope = tracer.activateSpan(span);
    try {
        // Do something ...
        // ...
        // Start a new Scope
        Span childSpan = tracer.buildSpan("<SPAN_NAME2>").start();
        try {
            Scope innerScope = tracer.activateSpan(childSpan);
            try {
                // Do something ...
            } finally {
                innerScope.close();
            }   
        } catch(Throwable e) {
            AndroidTracer.logThrowable(childSpan, e);
        } finally {
            childSpan.finish();
        }
    }
    finally {
        scope.close();
    }
} catch(Error e) {
    AndroidTracer.logThrowable(span, e);
} finally {
    span.finish();
}
```
{{% /tab %}}
{{< /tabs >}}

8. Para utilizar contextos en llamadas asíncronas:

    {{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val span = tracer.buildSpan("<SPAN_NAME1>").start()
try{
    val scope = tracer.activateSpan(span)
    scope.use {
        // Do something ...
        doAsyncWork {
            // Step 2: reactivate the Span in the worker thread
            val scopeContinuation = tracer.scopeManager().activate(span)
            scopeContinuation.use {
                // Do something ...
            }
        }
    }
} catch(e: Throwable) {
    AndroidTracer.logThrowable(span, e)
} finally {
    span.finish()
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
Span span = tracer.buildSpan("<SPAN_NAME1>").start();
try {
    Scope scope = tracer.activateSpan(span);
    try {
        // Do something ...
        new Thread(() -> {
            // Step 2: reactivate the Span in the worker thread
            Scope scopeContinuation = tracer.scopeManager().activate(span);
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
    AndroidTracer.logThrowable(span, e);
} finally {
    span.finish();
}
```
{{% /tab %}}
    {{< /tabs >}}

9. (Opcional) Para distribuir manualmente trazas entre tus entornos, por ejemplo frontend a backend:

   a. Inyecta contexto del rastreador en la solicitud del cliente.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = GlobalTracer.get()
val span = tracer.buildSpan("<SPAN_NAME>").start()
val tracedRequestBuilder = Request.Builder()
tracer.inject(span.context(), Format.Builtin.TEXT_MAP_INJECT,         
        TextMapInject { key, value -> 
            tracedRequestBuilder.addHeader(key, value) 
        }
)
val request = tracedRequestBuilder.build() 
// Dispatch the request and finish the span after.
```
{{% /tab %}}
{{% tab "Java" %}}
```java
Tracer tracer = GlobalTracer.get();
Span span = tracer.buildSpan("<SPAN_NAME>").start();
Request.Builder tracedRequestBuilder = new Request.Builder();
tracer.inject(
        span.context(),
        Format.Builtin.TEXT_MAP_INJECT,
        new TextMapInject() {
            @Override 
            public void put(String key, String value) {
                tracedRequestBuilder.addHeader(key, value);
            }
        });
Request request = tracedRequestBuilder.build();
// Dispatch the request and finish the span after
```
{{% /tab %}}
{{< /tabs >}}

b. Extrae el contexto des rastreador del cliente de los encabezados en el código del servidor.

   {{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracer = GlobalTracer.get() 
val extractedContext = tracer.extract(
        Format.Builtin.TEXT_MAP_EXTRACT, 
        TextMapExtract { 
            request.headers().toMultimap()
            .map { it.key to it.value.joinToString(";") }
                    .toMap()
                    .entrySet()
                    .iterator()
            }
        ) 
val serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start()      
```
   {{% /tab %}}
   {{% tab "Java" %}}
```java
Tracer tracer = GlobalTracer.get();
SpanContext extractedContext = tracer.extract(
        Format.Builtin.TEXT_MAP_EXTRACT,
        new TextMapExtract() {
            @Override 
            public Iterator<Map.Entry<String, String>> iterator() {                 
                return request.headers().toMultimap()
                  .entrySet()
                  .stream()
                  .collect(
                          Collectors.toMap(
                                  Map.Entry::getKey,
                                  entry -> String.join(";", entry.getValue())
                          )
                  )
                  .entrySet()
                  .iterator();
            }
        });
Span serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start();
```
   {{% /tab %}}
   {{< /tabs >}}

**Nota**: Para las bases de código que utilizan el cliente OkHttp, Datadog proporciona la [siguiente implementación](#okhttp).

10. (Opcional) Para proporcionar etiquetas (tags) adicionales junto a tu tramo:

```kotlin
span.setTag("http.url", url)
```

11. (Opcional) Para marcar un tramo como que tiene un error, regístralo utilizando etiquetas de OpenTracing:

```kotlin
span.log(mapOf(Fields.ERROR_OBJECT to throwable))
```
```kotlin
span.log(mapOf(Fields.MESSAGE to errorMessage))
```
También puedes utilizar uno de los siguientes métodos de ayuda en AndroidTracer:

```kotlin
AndroidTracer.logThrowable(span, throwable)
```
```kotlin
AndroidTracer.logErrorMessage(span, message)
```

12. Si necesitas modificar algunos atributos en eventos de tu tramo antes de la colocación en lotes, puedes hacerlo proporcionando una implementación de `SpanEventMapper` al habilitar la función de rastreo:

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

## Extensiones Kotlin

### Ejecución de una Lambda dentro de un tramo

Para monitorizar el rendimiento de una Lambda dada, puedes utilizar el método `withinSpan()`. Por defecto, se creará un contexto para el tramo, pero puedes deshabilitar este comportamiento configurando el parámetro `activate` como false (falso).

```kotlin
    withinSpan("<SPAN_NAME>", parentSpan, activate) {
        // Your code here
    }
```

### Métodos de extensión de tramos

Puedes marcar un tramo como que tiene un error utilizando uno de los siguientes métodos `error()`.

```kotlin
    val span = tracer.buildSpan("<SPAN_NAME>").start()
    try {
        // ...
    } catch (e: IOException) {
        span.setError(e)
    }
    span.finish()
```

```kotlin
    val span = tracer.buildSpan("<SPAN_NAME>").start()
    if (invalidState) {
        span.setError("Something unexpected happened")
    }
    span.finish()
```

### Rastreo de transacciones SQLite

Si estás utilizando `SQLiteDatabase` para conservar datos localmente, puedes rastrear la transacción de la base de datos utilizando el siguiente método:

```kotlin
   sqliteDatabase.transactionTraced("<SPAN_NAME>", isExclusive) { database ->
        // Your queries here
        database.insert("<TABLE_NAME>", null, contentValues)

        // Decorate the Span
        setTag("<TAG_KEY>", "<TAG_VALUE>")
   }
```
Se comporta como el método `SQLiteDatabase.transaction` proporcionado en el paquete de Android `core-ktx` y sólo requiere un nombre de operación de tramo.

## Integraciones

Además del rastreo manual, el SDK de Datadog proporciona las siguientes integraciones.

### OkHttp

Si quieres rastrear tus solicitudes OkHttp, puedes añadir el [interceptor][6] proporcionado (que puedes encontrar en la biblioteca `dd-sdk-android-okhttp`) de la siguiente manera:

1. Añade la dependencia Gradle a la biblioteca `dd-sdk-android-okhttp` en el archivo `build.gradle` a nivel del módulo:

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. Añade `DatadogInterceptor` a tu `OkHttpClient`:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder() 
        .addInterceptor(
            DatadogInterceptor(listOf("example.com", "example.eu"), traceSampler = RateBasedSampler(20f))
        )
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final List<String> tracedHosts = Arrays.asList("example.com", "example.eu");
final OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(
                new DatadogInterceptor(/** SDK instance name or null **/, tracedHosts, null, null, new RateBasedSampler(20f))
        )
        .build();
```
{{% /tab %}}
{{< /tabs >}}

Esto crea un tramo alrededor de cada solicitud procesada por el cliente OkHttp (coincidente con los hosts proporcionados), con toda la información relevante rellenada automáticamente (URL, método, código de estado, error), y propaga la información de rastreo a tu backend para obtener una traza unificada en Datadog.

Las trazas (traces) de red se muestrean con una frecuencia de muestreo ajustable. Por defecto se aplica un muestreo del 20%.

El interceptor rastrea solicitudes a nivel de la aplicación. Para obtener más detalles, también puedes añadir un `TracingInterceptor` a nivel de la red, por ejemplo cuando se siguen redirecciones.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHosts = listOf("example.com", "example.eu") 
val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor(tracedHosts, traceSampler = RateBasedSampler(20f)))
        .addNetworkInterceptor(TracingInterceptor(tracedHosts, traceSampler = RateBasedSampler(20f)))
        .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final List<String> tracedHosts = Arrays.asList("example.com", "example.eu");
final OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(
                new DatadogInterceptor(/** SDK instance name or null **/, tracedHosts, null, null, new RateBasedSampler(20f))
        )
        .addNetworkInterceptor(
                new TracingInterceptor(/** SDK instance name or null **/, tracedHosts, null, new RateBasedSampler(20f))
        )
        .build();
```
{{% /tab %}}
{{< /tabs >}}

En este caso, la decisión de muestreo de tazas tomada por el interceptor ascendente para una solicitud concreta será respetada por el interceptor descendente.

Debido a la forma en que se ejecuta la solicitud OkHttp (utilizando un pool de threads), el tramo de la solicitud no se vinculará automáticamente con el tramo que ha activado la solicitud. Puedes proporcionar un tramo principal manualmente en el `OkHttp Request.Builder`, de la siguiente manera, mediante el método de extensión `Request.Builder.parentSpan`:

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
* Si defines tipos de encabezados de rastreo personalizados en la configuración de Datadog y estás utilizando un rastreador registrado con `GlobalTracer`, asegúrate de que se configuren los mismos tipos de encabezados de rastreo para el rastreador en uso.

### RxJava

Para proporcionar una traza continua dentro de un flujo (stream) RxJava, tienes que seguir los pasos que se indican a continuación:
1. Añade la dependencia [OpenTracing para RxJava][8] a tu proyecto y consulta el archivo **Readme** (Léeme)
   para obtener instrucciones. Por ejemplo, para una traza continua, sólo tienes que añadir:
   ```kotlin
   TracingRxJava3Utils.enableTracing(GlobalTracer.get())
   ```
2. Luego, abre un contexto en tu proyecto, cuando se suscriba el observable, y ciérralo cuando se complete. Cualquier tramo
   creado dentro de los operadores de flujo se mostrarán dentro de este contexto (tramo principal):

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
var spanScope: Scope? = null
Single.fromSupplier { } 
        .subscribeOn(Schedulers.io())
        .map {  
            val span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start()
            // ...
            span.finish()
        }
        .doOnSubscribe {
            val span = GlobalTracer.get()
                    .buildSpan("<YOUR_OP_NAME>")
                    .start()
            spanScope = GlobalTracer.get().scopeManager().activate(span)
        }
        .doFinally {
            GlobalTracer.get().scopeManager().activeSpan()?.let {
                it.finish()
            }
            spanScope?.close()
        }
```
{{% /tab %}}
{{% tab "Java" %}}
```java
ThreadLocal<Scope> scopeStorage = new ThreadLocal<>();
...
Single.fromSupplier({})
        .subscribeOn(Schedulers.io())
        .map(data -> {
            final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
            // ...
            span.finish();
            // ...
         })
        .doOnSubscribe(disposable -> {
            final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
            Scope spanScope = GlobalTracer.get().scopeManager().activate(span);
            scopeStorage.set(spanScope);
        })
        .doFinally(() -> {
            final Span activeSpan = GlobalTracer.get().scopeManager().activeSpan();
            if (activeSpan != null) {
                activeSpan.finish();
            }
            Scope spanScope = scopeStorage.get();
            if (spanScope != null) {
                spanScope.close();
                scopeStorage.remove();
            }
        })
    };
```
{{% /tab %}}
{{< /tabs >}}

### RxJava + Retrofit
Para una traza continua dentro de un flujo RxJava que utiliza Retrofit para las solicitudes de red:
1. Configura el [interceptor Datadog](#okhttp).
2. Utiliza los adaptadores [Retrofit RxJava][9] para utilizar observables síncronos para las solicitudes de red:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
Retrofit.Builder()
    .baseUrl("<YOUR_URL>")
    .addCallAdapterFactory(RxJava3CallAdapterFactory.createSynchronous())
    .client(okHttpClient)
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
new Retrofit.Builder()
    .baseUrl("<YOUR_URL>")
    .addCallAdapterFactory(RxJava3CallAdapterFactory.createSynchronous())
    .client(okHttpClient)
    .build();
 ```
{{% /tab %}}
{{< /tabs >}}

3. Abre un contexto alrededor de tu flujo Rx de la siguiente manera:

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
var spanScope: Scope? = null
remoteDataSource.getData(query)
    .subscribeOn(Schedulers.io())
    .map { // ... } 
    .doOnSuccess {
        localDataSource.persistData(it)
    }
    .doOnSubscribe {
        val span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start()
        spanScope = GlobalTracer.get().scopeManager().activate(span)
    }
    .doFinally {
        GlobalTracer.get().scopeManager().activeSpan()?.let {
            it.finish()
        }
        spanScope?.close()
    }
```
{{% /tab %}}
{{% tab "Java" %}}
```java
ThreadLocal<Scope> scopeStorage = new ThreadLocal<>();
...
remoteDataSource.getData(query)
    .subscribeOn(Schedulers.io())
    .map(data -> { // ... })
    .doOnSuccess(data -> {
        localDataSource.persistData(data);
    })
    .doOnSubscribe(disposable -> {
        final Span span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start();
        Scope spanScope = GlobalTracer.get().scopeManager().activate(span);
        scopeStorage.set(spanScope);
    })
    .doFinally(() -> { 
        final Span activeSpan = GlobalTracer.get().scopeManager().activeSpan();
        if (activeSpan != null) {
            activeSpan.finish();
        }
        Scope spanScope = scopeStorage.get();
        if (spanScope != null) {
            spanScope.close();
            scopeStorage.remove();
        }
    });
 ```
{{% /tab %}}
{{< /tabs >}}

## Recopilación de lotes

Todos los tramos se almacenan primero en el dispositivo local por lotes. Cada lote sigue la especificación de admisión. Se envían en cuanto la red se encuentra disponible y la batería es lo suficientemente alta como para garantizar que el SDK de Datadog no afecte a la experiencia del usuario final. Si la red no se encuentra disponible mientras la aplicación está en primer plano, o si falla una carga de datos, el lote se guarda hasta que pueda enviarse correctamente.

Esto significa que aunque los usuarios abran tu aplicación estando desconectados, no se perderá ningún dato.

Los datos en disco se descartarán automáticamente si son demasiado antiguos, para garantizar que el SDK no utiliza demasiado espacio en disco.

## Inicialización
Los siguientes métodos de `AndroidTracer.Builder` pueden utilizarse al inicializar `Tracer`:


| Método                           | Descripción                                                                                                                                                                                                                         |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setService(<SERVICE_NAME>)   `    | Configura el valor del `service`. |
| `setPartialFlushThreshold(<INT>)` |  Cuando se alcanza este umbral (tienes una cantidad específica `<INT>` de tramos cerrados en espera), se activa el mecanismo de descarga y todos los tramos cerrados pendientes se procesan y se envían para su admisión.|
| `addTag(<KEY>, <VALUE>)`     | Configura un par de etiquetas `<KEY>:<VALUE>` que se añadirán a tramos (spans) creados por el rastreador. |
| `setBundleWithRumEnabled(true)`    | Configura como `true` para permitir que los tramos se enriquezcan con la información de la vista RUM actual. Esto te permite ver todos los tramos generados durante la vida útil de una vista específica en el Explorador RUM. |
| `setSampleRate(<FLOAT>)`   | Configura un valor `0-100` para definir el porcentaje de trazas a recopilar. |
| `setTracingHeaderTypes(Set<TracingHeaderType>)`   | Define los estilos de encabezados de rastreo que pueden ser inyectados por el rastreador. |

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace
[3]: /es/tracing/visualization/#spans
[4]: /es/account_management/api-app-keys/#client-tokens
[5]: /es/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: /es/real_user_monitoring/android/?tab=us
[8]: https://github.com/opentracing-contrib/java-rxjava
[9]: https://github.com/square/retrofit/tree/master/retrofit-adapters/rxjava3
[10]: /es/tracing/trace_collection/custom_instrumentation/android/otel
[11]: https://opentracing.io
[12]: /es/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file