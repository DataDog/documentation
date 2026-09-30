---
aliases:
- /fr/tracing/setup_overview/setup/android
- /fr/tracing/setup/android
- /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/android
code_lang: android
code_lang_weight: 80
description: Recueillez des traces à partir de vos applications Android.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Code source
  text: Code source dd-sdk-android
- link: tracing/visualization/
  tag: Documentation
  text: Explorer vos services, ressources et traces
title: Traçage d'applications Android
type: multi-code-lang
---
Envoyez des [traces][1] vers Datadog depuis vos applications Android avec le [SDK client `dd-sdk-android-trace` de Datadog][2] et tirez parti des fonctionnalités suivantes :

* Créez des [spans][3] personnalisés pour les opérations de votre application.
* Ajoutez des `context` et des attributs personnalisés supplémentaires à chaque span envoyé.
* Utilisation réseau optimisée avec des envois groupés automatiques.

{{% android-trace-datadog-api-waning %}}
{{% android-otel-note %}}

## Configuration {#setup}

1. Ajoutez la dépendance Gradle en déclarant la bibliothèque comme dépendance dans votre fichier `build.gradle` :
   ```groovy
   dependencies {
       implementation "com.datadoghq:dd-sdk-android-trace:x.x.x"
   }
   ```
2. Initialisez le SDK Datadog avec le contexte de votre application, le consentement de suivi et le [jeton client Datadog][4]. Pour des raisons de sécurité, vous devez utiliser un jeton client : vous ne pouvez pas utiliser de [clés de Datadog API][5] pour configurer le SDK Datadog, car elles seraient exposées côté client dans le code octet de l'APK de l'application Android. Pour plus d'informations sur la configuration d'un jeton client, consultez la [documentation sur le jeton client][4] :
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

   Pour être conforme au règlement RGPD, le SDK nécessite la valeur de consentement de suivi lors de l'
   initialisation.
   Voici les différentes valeurs possibles pour le consentement au suivi :

   * `TrackingConsent.PENDING` : le SDK commence à collecter et à regrouper les données, mais ne les envoie pas à
     l'endpoint de collecte
     des données. Le SDK attend la nouvelle valeur de consentement de suivi pour décider quoi faire des
     données regroupées.
   * `TrackingConsent.GRANTED` : le SDK commence à collecter les données et les envoie à l'endpoint
     de collecte de données.
   * `TrackingConsent.NOT_GRANTED` : le SDK ne collecte aucune donnée. Vous ne pourrez pas manuellement
     envoyer des logs, des traces ou
     des événements RUM.

   Pour mettre à jour le consentement de suivi après l'initialisation du SDK, appelez :
   `Datadog.setTrackingConsent(<NEW CONSENT>)`.
   Le SDK modifie son comportement en fonction du nouveau consentement. Par exemple, si le consentement de suivi actuel
   est `TrackingConsent.PENDING` et que vous le mettez à jour vers :

   * `TrackingConsent.GRANTED` : le SDK envoie toutes les données mises en lot actuelles et les données futures directement vers
     l'endpoint de collecte de données.
   * `TrackingConsent.NOT_GRANTED` : le SDK efface toutes les données mises en lot et ne collecte aucune donnée future.
     données.

   **Remarque** : Dans les identifiants requis pour l'initialisation, le nom de votre variante d'application est également
   requis, et doit utiliser votre valeur `BuildConfig.FLAVOR` (ou une chaîne vide si vous n'avez pas de
   variantes). Ceci est important car cela permet au fichier `mapping.txt` ProGuard approprié d'être
   automatiquement téléchargé au moment de la compilation pour pouvoir visualiser les traces de pile d'erreurs RUM désobfusquées. Pour
   plus d'informations, consultez le [guide sur le téléchargement des fichiers de mappage source Android][7].

   Utilisez la méthode utilitaire `isInitialized` pour vérifier si le SDK est correctement initialisé :

   ```kotlin
   if (Datadog.isInitialized()) {
     // your code here
   }
   ```

   Lors de l'écriture de votre application, vous pouvez activer les logs de développement en appelant la méthode `setVerbosity` .
   Tous les messages internes de la bibliothèque ayant une priorité égale ou supérieure au niveau fourni sont
   ensuite enregistrés dans Logcat d'Android :

   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```
3. Configurez et activez la fonctionnalité Trace :
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
4. Configurez et enregistrez le `DatadogTracer`. Vous n'avez besoin de le faire qu'une seule fois, généralement dans la méthode `onCreate()` de votre application :
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
5. (Facultatif) - Définissez le seuil de vidage partiel pour optimiser la charge de travail du SDK en fonction du nombre de spans générés par votre application. La bibliothèque attend que le nombre de spans terminés dépasse le seuil avant de les écrire sur le disque. Définir cette valeur sur `1` écrit chaque span dès qu'il est terminé.
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
6. Démarrez un span personnalisé en utilisant la méthode suivante :
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
7. Pour utiliser des portées dans des appels synchrones :
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
8. Pour utiliser des portées dans des appels asynchrones :
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

9. (Facultatif) Pour distribuer manuellement les traces entre vos environnements, par exemple, du frontend vers le backend :
   1. Injectez le contexte du traceur dans la requête client.
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
   1. Extrayez le contexte du traceur client à partir des en-têtes dans le code serveur.
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

   **Remarque** : Pour les bases de code utilisant le client OkHttp, Datadog fournit l'[implémentation ci-dessous](#okhttp).

10. (Facultatif) Pour fournir des tags supplémentaires avec votre span :
    ```kotlin
    span.setTag("http.url", url)
    ```
11. (Facultatif) Pour marquer un span comme contenant une erreur, enregistrez-le en utilisant les méthodes correspondantes :
    ```kotlin
    span.logThrowable(throwable)
    ```
    ```kotlin
    span.logErrorMessage(message)
    ```
12. Si vous devez modifier certains attributs dans vos événements de Span avant le traitement par lots, vous pouvez le faire en fournissant une implémentation de `SpanEventMapper` lors de l'activation de la fonctionnalité Trace :
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

## Extensions Kotlin {#kotlin-extensions}

### Exécution d'une lambda au sein d'un Span {#running-a-lambda-within-a-span}

Pour surveiller les performances d'une lambda donnée, vous pouvez utiliser la méthode `withinSpan()`. Par défaut, une portée sera créée pour le span, mais vous pouvez désactiver ce comportement en définissant le paramètre `activate` sur false.

```kotlin
import com.datadog.android.trace.withinSpan
import com.datadog.android.trace.api.span.DatadogSpan

withinSpan("<SPAN_NAME>", parentSpan, activate) {
   // Your code here
}
```

### Traçage de la transaction SQLite {#tracing-sqlite-transaction}

Si vous utilisez `SQLiteDatabase` pour enregistrer des données localement, vous pouvez tracer la transaction de base de données en utilisant la méthode suivante :

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
Il se comporte comme la méthode `SQLiteDatabase.transaction` fournie dans le package `core-ktx` AndroidX et ne nécessite qu’un nom d’opération de span.

## Intégrations {#integrations}

En plus du traçage manuel, le SDK Datadog fournit les intégrations suivantes.

### OkHttp {#okhttp}

Si vous souhaitez tracer vos requêtes OkHttp, vous pouvez ajouter l'[Interceptor][6] fourni (qui se trouve dans la bibliothèque `dd-sdk-android-okhttp`) comme suit :

1. Ajoutez la dépendance Gradle à la bibliothèque `dd-sdk-android-okhttp` dans le fichier `build.gradle` au niveau du module :
   ```groovy
   dependencies {
     implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
   }
   ```
2. Ajoutez `DatadogInterceptor` à votre `OkHttpClient`. Chaque entrée d'hôte accepte un nom d'hôte simple (par exemple, `"example.com"`) ou un modèle générique avec un seul `*` (par exemple, `"*.example.com"`). Un caractère générique ne peut correspondre qu'à des sous-domaines d'un domaine enregistrable, les modèles tels que `"*.com"` sont donc rejetés :
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

Cette méthode crée un span autour de chaque requête traitée par OkHttpClient (correspondant aux hosts fournis). Toutes les informations pertinentes sont automatiquement remplies (URL, méthode, code de statut, erreur). La span transmet les informations de tracing à votre backend afin de garantir la cohérence des traces dans Datadog.

Les traces réseau sont échantillonnées avec un taux d'échantillonnage réglable. Un échantillonnage de 100 % est appliqué par défaut.

L'intercepteur suit les requêtes au niveau de l'application. Vous pouvez également ajouter un `TracingInterceptor` au niveau du réseau pour obtenir plus de détails ; par exemple, lors du suivi de redirections.

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

Dans ce cas, la décision d'échantillonnage de trace prise par l'intercepteur en amont pour une requête particulière sera respectée par l'intercepteur en aval.

En raison de la manière dont la requête OkHttp est exécutée (en utilisant un pool de threads), le span de la requête ne sera pas automatiquement lié au span qui a déclenché la requête. Vous pouvez fournir manuellement un span parent dans le `OkHttp Request.Builder` comme suit en utilisant la méthode d'extension `Request.Builder.parentSpan` :

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

**Note** :
* Si vous utilisez plusieurs Interceptors, celui-ci doit être appelé en premier.
* Si vous définissez des types d'en-têtes de tracing personnalisés dans la configuration Datadog et que vous utilisez un SDK enregistré avec `GlobalDatadogTracer`, assurez-vous que les mêmes types d'en-têtes de tracing sont définis pour le SDK utilisé.

### Cronet {#cronet}

Si vous utilisez Cronet au lieu d'OkHttp, vous pouvez instrumenter votre `CronetEngine` pour le tracing distribué.

1. Ajoutez les dépendances Gradle dans le fichier `build.gradle` au niveau du module :
   ```groovy
   dependencies {
     implementation "com.datadoghq:dd-sdk-android-cronet:x.x.x"
   }
   ```
2. Instrumentez le `CronetEngine.Builder` :
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

Cela crée un span autour de chaque requête traitée par le `CronetEngine` qui correspond aux hôtes fournis. Toutes les informations pertinentes sont automatiquement remplies (URL, méthode, code de statut, erreur) et les informations de tracing sont propagées à votre backend.

#### Tracing des redirections {#tracing-redirects}

Par défaut, le tracing est appliqué au niveau de l'application. Pour tracer également les requêtes redirigées, définissez la portée du trace sur `ALL` :

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

#### Propagation d'en-têtes uniquement {#header-propagation-only}

Pour propager les en-têtes de tracing sans créer de spans locaux, utilisez le mode de propagation d'en-têtes uniquement.

**Remarque** : ce mode nécessite que RUM soit activé, car le suivi des ressources est géré par l'instrumentation RUM. Vous devez fournir un `RumNetworkInstrumentationConfiguration` dans l'appel `configureDatadogInstrumentation`.

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

#### Taux d'échantillonnage {#sampling-rate}

Pour configurer le taux d'échantillonnage des traces :

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

**Limitations connues** :
* Les en-têtes de tracing ne sont pas propagés pour les requêtes redirigées en raison des limitations de l'API Cronet.
* Les tentatives ne peuvent pas être instrumentées.

## Collecte par lots {#batch-collection}

Tous les spans sont d'abord stockés sur l'appareil local par lots. Chaque lot suit la spécification d'ingestion. Ils sont envoyés dès que le réseau est disponible et que la batterie est suffisamment chargée pour garantir que le SDK Datadog n'impacte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible pendant que votre application est au premier plan, ou si un téléchargement de données échoue, le lot est conservé jusqu'à ce qu'il puisse être envoyé avec succès.

Ce qui signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

Les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK.

## Initialisation {#initialization}
Les méthodes suivantes dans `DatadogTracerBuilder` peuvent être utilisées lors de l'initialisation du `DatadogTracer` :

| Méthode                                            | Description                                                                                                                                                                                  |
|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `withServiceName(<SERVICE_NAME>)	`                | Définissez la valeur pour le `service`.                                                                                                                                                             |
| `withPartialFlushMinSpans(<INT>)`                 | Lorsque ce seuil est atteint (vous avez une quantité spécifique `<INT>` de spans fermés en attente), le mécanisme de vidage est déclenché et tous les spans fermés en attente sont traités et envoyés à l'ingestion. |
| `withTag(<KEY>, <VALUE>)`                         | Définissez une paire `<KEY>:<VALUE>` de tags à ajouter aux spans créés par le Tracer.                                                                                                               |
| `setBundleWithRumEnabled(true)`                   | Définissez sur `true` pour permettre aux spans d'être enrichis avec les informations de la vue RUM actuelle. Cela vous permet de voir tous les spans produits pendant la durée de vie d'une vue spécifique dans l'explorateur RUM.   |
| `withSampleRate(<FLOAT>)`                         | Définissez une valeur `0-100` pour définir le pourcentage de traces à collecter.                                                                                                                           |
| `withTracingHeadersTypes(Set<TracingHeaderType>)` | Définit les styles d'en-tête de traçage qui peuvent être injectés par le Tracer.                                                                                                                           |
| `setTraceRateLimit(<INT>)`                        | Définit la limite de taux de trace. Il s'agit du nombre maximal de traces par seconde qui seront acceptées.                                                                                            |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/glossary/#trace
[2]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-trace
[3]: /fr/glossary/#span
[4]: /fr/account_management/api-app-keys/#client-tokens
[5]: /fr/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/

[7]: /fr/real_user_monitoring/error_tracking/mobile/android/?tab=us#upload-your-mapping-file