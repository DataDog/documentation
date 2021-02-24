---
dependencies:
  - 'https://github.com/DataDog/dd-sdk-android/blob/master/docs/rum_collection.md'
kind: documentation
title: Débuter avec la collecte de données RUM sur Android
---
Envoyez des [données Real User Monitoring][1] à Datadog à partir de vos applications Android avec la [bibliothèque RUM côté client `dd-sdk-android` de Datadog][2]. Vous pourrez notamment :

* obtenir une vue d'ensemble des performances et des données démographiques de votre application ;
* identifier les ressources les plus lentes ;
* analyser les erreurs en fonction du système d'exploitation et du type d'appareil.

## Configuration

1. Ajoutez la dépendance Gradle en définissant la bibliothèque en tant que dépendance dans votre fichier `build.gradle` :

    ```conf
    repositories {
        maven { url "https://dl.bintray.com/datadog/datadog-maven" }
    }

    dependencies {
        implementation "com.datadoghq:dd-sdk-android:x.x.x"
    }
    ```

2. Initialisez la bibliothèque avec le contexte de votre application et votre [token client Datadog][4]. Pour des raisons de sécurité, vous devez utiliser un token client : vous ne pouvez pas utiliser les [clés d'API Datadog][5] pour configurer la bibliothèque `dd-sdk-android`, car elles risqueraient d'être exposées côté client dans le bytecode de l'APK de l'application Android. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][4]. Vous devez également spécifier un ID d'application (consultez notre [page sur la prise en main de RUM][3]).

    {{< tabs >}}
    {{% tab "Site américain" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = DatadogConfig.Builder("<TOKEN_CLIENT>", "<NOM_ENVIRONNEMENT>", "<ID_APPLICATION>")
                        .trackInteractions()
                        .useViewTrackingStrategy(strategy)
                        .build()
        Datadog.initialize(this, config)
    }
}
```

    {{% /tab %}}
    {{% tab "Site européen" %}}

```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val config = DatadogConfig.Builder("<TOKEN_CLIENT>", "<NOM_ENVIRONNEMENT>", "<ID_APPLICATION>")
                        .trackInteractions()
                        .useViewTrackingStrategy(strategy)
                        .useEUEndpoints()
                        .build()
        Datadog.initialize(this, config)
    }
}
```

    {{% /tab %}}
    {{< /tabs >}}

En fonction de l'architecture de votre application, vous pouvez choisir l'une des implémentations de `ViewTrackingStrategy` suivantes :

  - `ActivityViewTrackingStrategy` : chaque activité dans votre application est considérée comme une vue distincte.
  - `FragmentViewTrackingStrategy` : chaque fragment dans votre application est considéré comme une vue distincte.
  - `NavigationViewTrackingStrategy` : si vous utilisez la bibliothèque Android Jetpack Navigation, il s'agit de la stratégie conseillée. Elle permet de suivre automatiquement la destination de navigation en tant que vue distincte.
  - `MixedViewTrackingStrategy` : chaque activité ou fragment dans votre application est considéré(e) comme une vue distincte. Cette stratégie est un mélange entre `ActivityViewTrackingStrategy` et `FragmentViewTrackingStrategy`.

  **Remarque** : pour `ActivityViewTrackingStrategy`, `FragmentViewTrackingStrategy` ou `MixedViewTrackingStrategy`, vous pouvez filtrer les éléments `Fragment` ou `Activity` à suivre en tant que vue RUM en spécifiant une implémentation `ComponentPredicate` dans le constructeur.

  **Remarque** : par défaut, la bibliothèque ne suit aucune vue. Si vous choisissez de ne pas spécifier une stratégie de suivi des vues, vous devrez les envoyer manuellement en appelant vous-même les méthodes `startView` et `stopView`.

3. Configurez et enregistrez le monitor RUM. Cette opération, qui doit être effectuée une seule fois, s'effectue généralement dans la méthode `onCreate()` de votre application :

    ```kotlin
    val monitor = RumMonitor.Builder()
            // Optionally set a sampling between 0.0 and 100.0%
            // Here 75% of the RUM Sessions will be sent to Datadog
            .sampleRumSessions(75.0f)
            .build()
    GlobalRum.registerIfAbsent(monitor)
    ```

4. Si vous souhaitez effectuer le suivi de vos requêtes OkHttp en tant que ressources, vous pouvez ajouter l'[intercepteur][6] fourni comme suit :

    ```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .build()
    ```

    Cette méthode crée des données de ressource RUM autour de chaque requête traitée par OkHttpClient. Toutes les informations pertinentes sont automatiquement renseignées (URL, méthode, code de statut, erreur). Notez que seules les requêtes réseau lancées lorsqu'une vue est active feront l'objet d'un suivi. Si vous souhaitez effectuer le suivi de requêtes lorsque votre application est en arrière-plan, vous pouvez créer une vue manuellement en suivant la procédure ci-dessous.

    **Remarque** : si vous utilisez plusieurs intercepteurs, celui-ci doit être appelé en premier.

5. (Facultatif) Si vous souhaitez récupérer des mesures de temps dans les ressources (comme le time to first byte, la résolution DNS, etc.), vous pouvez ajouter la fabrique d'écouteur d'[événements][6] comme suit :

    ```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
    ```

6. (Facultatif) Si vous souhaitez effectuer manuellement le suivi d'événements RUM, vous pouvez utiliser la classe `GlobalRum`.

  Pour effectuer le suivi de vues, appelez `RumMonitor#startView` lorsque la vue devient visible et interactive (équivalent à l'événement de cycle de vie `onResume`), puis `RumMonitor#stopView` lorsque la vue n'est plus visible (équivalent à l'événement de cycle de vie `onPause`) comme suit :

   ```kotlin
      fun onResume(){
        GlobalRum.get().startView(viewKey, viewName, viewAttributes)
      }

      fun onPause(){
        GlobalRum.get().stopView(viewKey, viewAttributes)
      }
   ```

  Pour effectuer le suivi de ressources, appelez `RumMonitor#startResource` lorsque le chargement de la ressource se lance, puis `RumMonitor#stopResource` lorsqu'elle est entièrement chargée ou `RumMonitor#stopResourceWithError` si une erreur se produit lors du chargement de la ressource, comme suit :

   ```kotlin
      fun loadResource(){
        GlobalRum.get().startResource(resourceKey, method, url, resourceAttributes)
        try {
          // do load the resource
          GlobalRum.get().stopResource(resourceKey, resourceKind, additionalAttributes)
        } catch (e : Exception) {
          GlobalRum.get().stopResourceWithError(resourceKey, message, origin, e)
        }
      }
   ```

  Pour effectuer le suivi d'actions utilisateur, appelez `RumMonitor#addAction`, ou `RumMonitor#startUserAction` et `RumMonitor#stopUserAction` s'il s'agit d'actions continues, comme suit :

   ```kotlin
      fun onUserInteraction(){
        GlobalRum.get().addAction(resourceKey, method, url, resourceAttributes)
      }
   ```

7. (Facultatif) Si vous souhaitez ajouter des informations personnalisées en tant qu'attributs à tous les événements RUM, vous pouvez utiliser la classe `GlobalRum`.

   ```kotlin
      // Adds an attribute to all future RUM events
      GlobalRum.addAttribute(key, value)

      // Removes an attribute to all future RUM events
      GlobalRum.removeAttribute(key)
   ```

## Logging avancé

### Initialisation de la bibliothèque

Les méthodes suivantes dans `DatadogConfig.Builder` peuvent être utilisées lors de la création de la configuration Datadog pour initialiser la bibliothèque :

| Méthode                           | Description                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setServiceName(<NOM_SERVICE>)` | Définir `<NOM_SERVICE>` en tant que valeur par défaut pour l'[attribut standard][4] `service` joint à tous les logs envoyés à Datadog (cette valeur peut être remplacée dans chaque logger).                                                                                                                                                           |
| `setRumEnabled(true)`     | Définir ce paramètre sur `true` pour activer l'envoi de données RUM à Datadog.                                                                                                                                                                                                                                  |
| `trackInteractions(Array<ViewAttributesProvider>)` | Permet d'effectuer le suivi des interactions utilisateur (comme les appuis sur l'écran, les défilements ou les balayages). Le paramètre vous permet d'ajouter des attributs personnalisés aux événements d'action RUM en fonction du widget avec lequel l'utilisateur a interagi. |
| `useViewTrackingStrategy(strategy)` | Définit la stratégie utilisée pour effectuer le suivi des vues. En fonction de l'architecture de votre application, vous pouvez choisir l'une des implémentations de `ViewTrackingStrategy` (voir ci-dessus) ou implémenter votre propre méthode. |
| `addPlugin(DatadogPlugin, Feature)`   | Ajoute une implémentation de plugin pour une fonctionnalité spécifique (CRASH, LOG, TRACE, RUM). Le plugin sera enregistré une fois la fonctionnalité réinitialisée, puis désenregistré lorsque la fonctionnalité sera arrêtée. |

### Initialisation du RumMonitor

Les méthodes suivantes dans `RumMonitor.Builder` peuvent être utilisées lors de la création du RumMonitor pour effectuer le suivi des données RUM :

| Méthode                           | Description                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `sampleRumSessions(float)`   | Définit le taux d'échantillonnage pour les sessions RUM. Cette méthode s'attend à une valeur comprise entre 0 et 100, qui indique le pourcentage de sessions pour lesquelles des données seront envoyées à Datadog. |

### Suivi manuel

Si vous souhaitez effectuer le suivi d'événements manuellement, vous pouvez le faire en récupérant l'instance `RumMonitor` active et en appelant l'une des méthodes suivantes :

| Méthode                           | Description                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `startView(<clé>, <nom>, <attributs>)`   | Prévient le RumMonitor qu'une nouvelle vue vient de commencer. Le plus souvent, cette méthode doit être appelée dans la première méthode `onResume()` de l'`Activity` ou du `Fragment`. |
| `stopView(<clé>, <attributs>)`   | Prévient le RumMonitor que la vue actuelle vient de s'arrêter. Le plus souvent, cette méthode doit être appelée dans la première méthode `onPause()` de l'`Activity` ou du `Fragment`. |
| `addAction(<type>, <nom>, <attributs>)`   | Prévient le RumMonitor qu'une action utilisateur vient de se produire. |
| `startUserAction(<type>, <nom>, <attributs>)`   | Prévient le RumMonitor qu'une action utilisateur continue vient de commencer (par exemple, un utilisateur qui fait défiler une liste). |
| `stopUserAction(<type>, <nom>, <attributs>)`   | Prévient le RumMonitor qu'une action utilisateur continue vient de s'arrêter. |
| `startResource(<clé>, <méthode>, <url>, <attributs>)`   | Prévient le RumMonitor que l'application a lancé le chargement d'une ressource avec une méthode donnée (par exemple : `GET` ou `POST`), à l'URL indiquée. |
| `stopResource(<clé>, <statut>, <taille>, <type> <attributs>)`   | Prévient le RumMonitor que le chargement d'une ressource s'est terminé, avec un code de statut (généralement un code de statut HTTP), une taille (en octets) et un type spécifiques. |
| `stopResourceWithError(<clé>, <statut>, <message>, <source>, <throwable>)` | Prévient le RumMonitor que le chargement d'une ressource n'a pas pu se terminer en raison d'une exception. |
| `addError(<message>, <source>, <throwable>, <attributs>)` | Prévient le RumMonitor qu'une erreur s'est produite. |


### Suivi des widgets

La plupart du temps, les widgets sont affichés dans la vue `AppWidgetHostView` fournie par l'application HomeScreen, et nous ne pouvons pas fournir une instrumentation automatique pour ces composants. Pour envoyer des informations d'interaction avec l'interface à partir de vos widgets, appelez manuellement notre API. Consultez un exemple d'approche dans cet exemple d'application :
[Suivi des widgets](https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget)

## Collecte groupée de spans

Tous les événements RUM sont d'abord stockés sur l'appareil local sous forme groupée. Chaque groupe d'événements respecte les spécifications d'admission. Ils sont envoyés dès que le réseau est disponible, et dès que la batterie est suffisamment élevée pour que le SDK Datadog n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de logs est conservé jusqu'à ce qu'il puisse être envoyé.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

Les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK.

## Extensions

### Coil

Si vous utilisez Coil pour charger des images dans votre application, consultez la [bibliothèque dédiée](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-coil) de Datadog.

### Fresco

Si vous utilisez Fresco pour charger des images dans votre application, consultez la [bibliothèque dédiée](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-fresco) de Datadog.

### Glide

Si vous utilisez Glide pour charger des images dans votre application consultez notre [bibliothèque dédiée](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-glide).

### Picasso

Si vous utilisez la bibliothèque Picasso, laissez-la utiliser votre client `OkHttpClient` pour recevoir des informations RUM et APM sur les requêtes réseau effectuées par Picasso.

```kotlin
        val picasso = Picasso.Builder(context)
                .downloader(OkHttp3Downloader(okHttpClient))
                // …
                .build()
        Picasso.setSingletonInstance(picasso)
```

### Retrofit

Si vous utilisez bibliothèque Retrofit, laissez-la utiliser votre client `OkHttpClient` pour recevoir des informations RUM et APM sur les requêtes réseau effectuées par Retrofit.

```kotlin
        val retrofitClient = Retrofit.Builder()
                .client(okHttpClient)
                // …
                .build()
```

### SQLDelight

Si vous utilisez SQLDelight, consultez notre [bibliothèque dédiée](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-sqldelight).

### SQLite

Conformément à la [documentation générée automatiquement sur l'API SQLiteOpenHelper][8], il vous suffit de spécifier l'implémentation de DatabaseErrorHandler -> `DatadogDatabaseErrorHandler` dans le constructeur.

Cette intégration permet de détecter toute corruption de base de données et d'envoyer un événement d'erreur RUM associé.

```kotlint
   class <YourOwnSqliteOpenHelper>: SqliteOpenHelper(<Context>,
                                                     <NOM_BASEDEDONNÉES>,
                                                     <CursorFactory>,
                                                     <VERSION_BASEDEDONNÉES>,
                                                     DatadogDatabaseErrorHandler()) {
                                // …

   }
```

### Apollo (GraphQL)

Si vous utilisez Apollo, laissez-le utiliser votre client `OkHttpClient` pour recevoir des informations RUM et APM sur les requêtes effectuées via le client Apollo.

```kotlin
        val apolloClient =  ApolloClient.builder()
                 .okHttpClient(okHttpClient)
                 .serverUrl(<URL_SERVEUR_APOLLO>)
                 .build()
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/data_collected/
[2]: https://github.com/DataDog/dd-sdk-android
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/installation/?tab=us
[4]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[5]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[6]: https://square.github.io/okhttp/interceptors/
[7]: https://square.github.io/okhttp/events/
[8]: https://developer.android.com/reference/android/database/sqlite/SQLiteOpenHelper
