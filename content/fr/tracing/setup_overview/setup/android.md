---
beta: true
dependencies:
  - 'https://github.com/DataDog/dd-sdk-android/blob/master/docs/trace_collection.md'
description: Recueillez des traces à partir de vos applications Android.
further_reading:
  - link: 'https://github.com/DataDog/dd-sdk-android'
    tag: Github
    text: Code source dd-sdk-android
  - link: tracing/visualization/
    tag: Documentation
    text: 'Explorer vos services, ressources et traces'
kind: documentation
title: Collecte de traces Android
---
Envoyez des [traces][1] à Datadog à partir de vos applications Android avec la [bibliothèque de journalisation côté client `dd-sdk-android` de Datadog][2]. Vous pourrez notamment :

* Créer des [spans][3] personnalisées pour les opérations dans votre application
* Ajouter du contexte et des attributs personnalisés supplémentaires pour chaque span envoyée
* Optimiser l'utilisation du réseau grâce aux envois groupés automatiques

## Configuration

1. Ajoutez la dépendance Gradle en définissant la bibliothèque en tant que dépendance dans votre fichier `build.gradle` :

    ```conf
    dependencies {
        implementation "com.datadoghq:dd-sdk-android:x.x.x"
    }
    ```

2. Initialisez la bibliothèque avec le contexte de votre application, le consentement au suivi ainsi que le [token client Datadog][4] et l'ID d'application générés lors de la création d'une application RUM depuis l'interface Datadog (consulter la section [Surveillance Android avec RUM][7] pour en savoir plus). Pour des raisons de sécurité, vous devez utiliser un token client : il n'est pas possible d'utiliser des [clés d'API Datadog][5] pour configurer la bibliothèque `dd-sdk-android`. En effet, elles risqueraient d'être exposées côté client dans le bytecode de l'APK de l'application Android. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][4] :

   {{< tabs >}}
   {{% tab "États-Unis" %}}
   ```kotlin
    class SampleApplication : Application() {
        override fun onCreate() {
            super.onCreate()
            val configuration = Configuration.Builder(tracesEnabled = true, ...).build()
            val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
            Datadog.initialize(this, credentials, configuration, trackingConsent)
        }
    }
   ```
   {{% /tab %}}
   {{% tab "Europe" %}}
   ```kotlin
   class SampleApplication : Application() {
       override fun onCreate() {
          super.onCreate()
          val configuration = Configuration.Builder(tracesEnabled = true, ...)
             .useEUEndpoints()
             .build()
          val credentials = Credentials(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>, <APPLICATION_ID>)
          Datadog.initialize(this, credentials, configuration, trackingConsent)
       }
   }
   ```
   {{% /tab %}}
   {{< /tabs >}}

   Pour répondre aux exigences du RGPD, le SDK nécessite la valeur de consentement au suivi à son initialisation.
   Voici les différentes valeurs possibles pour le consentement au suivi :
   * `TrackingConsent.PENDING` : le SDK commence à recueillir les données et à les regrouper par lots, mais ne les envoie pas au
     endpoint de collecte de données. Le SDK attend d'obtenir la nouvelle valeur de consentement au suivi pour déterminer ce qu'il doit faire de ces lots de données.
   * `TrackingConsent.GRANTED` : le SDK commence à recueillir les données et les envoie au endpoint de collecte de données.
   * `TrackingConsent.NOT_GRANTED` : le SDK ne recueille aucune donnée. Vous ne pourrez pas envoyer manuellement des logs, des traces ou
     des événements RUM.

   Pour mettre à jour le consentement au suivi une fois le SDK initialisé, effectuez l'appel suivant : `Datadog.setTrackingConsent(<NOUVEAU CONSENTEMENT>)`.
   Le SDK ajuste son comportement en fonction de la nouvelle valeur de consentement. Imaginons que vous modifiez une valeur de consentement `TrackingConsent.PENDING` :
   * Si vous la remplacez par `TrackingConsent.GRANTED` : le SDK envoie tous les lots de données actuels, ainsi que toutes les données ultérieures, directement au endpoint de collecte de données.
   * Si vous la remplacez par `TrackingConsent.NOT_GRANTED` : le SDK supprime tous les lots de données et ne recueille plus aucune donnée par la suite.

   Attention, vous devez également spécifier le nom de la variante de votre application dans les identifiants requis pour l'initialisation. Cette opération est primordiale, car elle permet d'importer automatiquement le bon fichier `mapping.txt` ProGuard au moment de la conception. Un dashboard Datadog peut alors annuler l'obfuscation des stack traces.

   Utilisez la méthode utilitaire `isInitialized` pour vérifier si le SDK est bien initialisé :

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```
   Lors de la création de votre application, vous pouvez activer les logs de développement en appelant la méthode `setVerbosity`. Tous les messages internes de la bibliothèque dont la priorité est supérieure ou égale au niveau spécifié sont alors enregistrés dans le Logcat d'Android :
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. Configurez et enregistrez le traceur Android. Cette opération, qui doit être effectuée une seule fois, s'effectue généralement dans la méthode `onCreate()` de votre application :

    ```kotlin
    val tracer = AndroidTracer.Builder().build()
    GlobalTracer.registerIfAbsent(tracer)
    ```

4. Définissez le seuil de vidage partiel (facultatif). Vous pouvez optimiser la charge de travail du SDK si vous créez de nombreuses spans dans votre application, ou au contraire en créez très peu. La bibliothèque écrit les spans terminées sur le disque uniquement lorsque leur nombre dépasse le seuil défini. Si vous définissez le seuil sur `1`, chaque span est écrite dès qu'elle est terminée.

    ```kotlin
    val tracer = AndroidTracer.Builder()
        .setPartialFlushThreshold(10)
        .build()
    ```

5. Créez une span personnalisée en utilisant la méthode suivante :

    ```kotlin
    val tracer = GlobalTracer.get()
    val span = tracer.buildSpan("<SPAN_NAME>").start()
    // Do something ...
    // ...
    // Then when the span should be closed
    span.finish()

    ```
6. Pour utiliser les contextes dans des appels synchrones :
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
   } catch(e: Error) {
     span.error(e)
   } finally {
     span.finish()
   }

   ```
7. Pour utiliser les contextes dans des appels asynchrones :
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
   } catch(e: Error) {
     span.error(e)
   } finally {
     span.finish()
   }

   ```  
8. (Facultatif) Pour distribuer manuellement des traces entre vos environnements, par exemple du frontend au backend :

   * 1) Injectez le contexte du traceur dans la requête client.

   ```kotlin
   val tracer = GlobalTracer.get()
   val span = tracer.buildSpan("<SPAN_NAME>").start()
   val tracedRequestBuilder = Request.Builder()
   tracer.inject(
           span.context(),
           Format.Builtin.TEXT_MAP_INJECT,
           TextMapInject { key, value ->
               tracedRequestBuilder.addHeader(key, value)
           }
   )
   val request = tracedRequestBuilder.build()
   // Dispatch the request and finish the span after.
   ```

   * 2) Extrayez le contexte du traceur client à partir des en-têtes du code du serveur.

   ```kotlin
   val extractedContext = GlobalTracer.get()
        .extract(
            Format.Builtin.TEXT_MAP_EXTRACT,
            TextMapExtract {
                request.headers()
                    .toMultimap()
                    .map { it.key to it.value.joinToString(";") }
                    .toMap()
                    .entrySet()
                    .iterator()
            }
        )
   val serverSpan = tracer.buildSpan("<SERVER_SPAN_NAME>").asChildOf(extractedContext).start()      

   ```

**Remarque** : pour les codebases utilisant le client OkHttp, Datadog fournit l'implémentation ci-dessous.

9. (Facultatif) Pour fournir des tags supplémentaires avec votre span :

    ```kotlin
    span.setTag("http.url", url)
    ```
10. (Facultatif) Pour indiquer qu'une span comporte une erreur, enregistrez cette information à l'aide des tags OpenTracing :

    ```kotlin
    span.log(mapOf(Fields.ERROR_OBJECT to throwable))
    ```
    ```kotlin
    span.log(mapOf(Fields.MESSAGE to errorMessage))
    ```
    Vous pouvez également utiliser l'une des méthodes d'auxiliaire suivantes dans AndroidTracer.

    ```kotlin
    AndroidTracer.logThrowable(span, throwable)
    ```
    ```kotlin
    AndroidTracer.logErrorMessage(span, message)
    ```

8. Si vous devez modifier certains attributs de vos événements span avant de les rassembler, vous pouvez implémenter `SpanEventMapper` lors de l'initialisation du SDK :
   ```kotlin
      val config = Configuration.Builder(tracesEnabled = true, ...)
                        // ...
                        .setSpanEventMapper(spanEventMapper)
                        .build()
   ```

## Intégrations

La bibliothèque `dd-sdk-android` fournit non seulement une solution de tracing manuel, mais également l'intégration suivante.

### OkHttp

Si vous souhaitez effectuer le tracing de vos requêtes OkHttp, vous pouvez ajouter l'[intercepteur][6] fourni tel que suit :

```kotlin
val okHttpClient =  OkHttpClient.Builder()
    .addInterceptor(
        DatadogInterceptor(
            listOf("example.com", "example.eu")
        )
    )
    .build()
```

Cette méthode crée une span autour de chaque requête traitée par OkHttpClient (correspondant aux hosts fournis). Toutes les informations pertinentes sont automatiquement renseignées (URL, méthode, code de statut, erreur). La span transmet les informations de tracing à votre backend afin de garantir la cohérence des traces dans Datadog.

L'intercepteur surveille les requêtes au niveau de l'application. Vous pouvez également ajouter un `TracingInterceptor` au niveau du réseau pour obtenir plus de détails, par exemple lors du suivi de redirections.

 ```kotlin
val tracedHosts = listOf("example.com", "example.eu")
val okHttpClient =  OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor(tracedHosts))
    .addNetworkInterceptor(TracingInterceptor(tracedHosts))
    .build()
 ```

En raison de la méthode d'exécution de la requête OkHttp (utilisation d'un pool de threads), la span de la requête ne sera pas automatiquement associée à la span qui a déclenché la requête. Vous pouvez toutefois spécifier manuellement une span parent dans `OkHttp Request.Builder`, comme suit :

```kotlin
val request = Request.Builder()
              .url(requestUrl)
              .tag(Span::class.java, parentSpan)
              .build()
```

Ou, si vous utilisez les extensions fournies avec la bibliothèque `dd-sdk-android-ktx` :

```kotlin
val request = Request.Builder()
              .url(requestUrl)
              .parentSpan(parentSpan)
              .build()
```

**Remarque** : si vous utilisez plusieurs intercepteurs, celui-ci doit être appelé en premier.

### RxJava

Pour fournir une trace continue au sein d'un flux RxJava, suivez les étapes suivantes :
1. Ajoutez la dépendance [OpenTracing pour RxJava][8] à votre projet et suivez les instructions du fichier **Readme**.
   Pour obtenir une trace continue, il vous suffit d'ajouter :
   ```kotlin
   TracingRxJava3Utils.enableTracing(GlobalTracer.get())
   ```
2. Ouvrez ensuite dans votre projet un contexte lorsque les Observables s'abonnent, puis fermez-le une fois l'opération terminée. Toutes les spans
   créées dans les opérateurs du flux s'afficheront dans ce contexte (span parent) :
   ```kotlin
   Single.fromSupplier{}
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
           GlobalTracer.get().scopeManager().activate(span)
       }
       .doFinally {
           GlobalTracer.get().scopeManager().activeSpan()?.let {
               it.finish()
           }
       }
   ```
### RxJava et Retrofit
Pour obtenir une trace continue dans un flux RxJava qui utilise Retrofit pour les requêtes réseau :
1. Configurer l'[intercepteur Datadog](#okhttp)
2. Servez-vous des adaptateurs [Retrofit RXJava][9] pour utiliser les Observables synchrones pour les requêtes réseau :
```kotlin
Retrofit.Builder()
   .baseUrl("<YOUR_URL>")
   .addCallAdapterFactory(RxJava3CallAdapterFactory.createSynchronous())
   .client(okHttpClient)
   .build()
```
3. Ouvrez un contexte autour de votre flux Rx tel que suit :
```kotlin
remoteDataSource.getData(query)
   .subscribeOn(Schedulers.io())
   .map { // ... } 
   .doOnSuccess { 
      localDataSource.persistData(it)
   }
   .doOnSubscribe { 
      val span = GlobalTracer.get().buildSpan("<YOUR_OP_NAME>").start()
      GlobalTracer.get().scopeManager().activate(span) 
   }
   .doFinally { 
      GlobalTracer.get().scopeManager().activeSpan()?.let { 
         it.finish() 
      } 
   }
```
## Collecte groupée de spans

Toutes les spans sont d'abord stockées sur l'appareil local sous forme groupée. Chaque groupe de spans respecte les spécifications d'admission. Ils sont envoyés dès que le réseau est disponible, et dès que la batterie est suffisamment élevée pour que le SDK Datadog n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de logs est conservé jusqu'à ce qu'il puisse être envoyé.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

Les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/tracing/visualization/#trace
[2]: https://github.com/DataDog/dd-sdk-android
[3]: https://docs.datadoghq.com/fr/tracing/visualization/#spans
[4]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[5]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: https://docs.datadoghq.com/fr/real_user_monitoring/android/?tab=us
[8]: https://github.com/opentracing-contrib/java-rxjava
[9]: https://github.com/square/retrofit/tree/master/retrofit-adapters/rxjava3