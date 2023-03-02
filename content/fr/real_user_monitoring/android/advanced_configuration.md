---
dependencies:
- https://github.com/DataDog/dd-sdk-android/blob/master/docs/configure_rum_android_sdk.md
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Github
  text: Code source dd-sdk-android
- link: /real_user_monitoring
  tag: Page d'accueil
  text: Explorer le service RUM de Datadog
kind: documentation
title: Configuration avancée du RUM sur Android
---
Si vous n'avez pas encore installé le SDK, consultez les [instructions de configuration intégrées à l'application][1] ou reportez-vous à la [documentation sur la configuration du RUM sur Android][2]. 


## Enrichissement des sessions utilisateur

Le service RUM pour Android effectue automatiquement le suivi d'attributs tels que l'activité utilisateur, les écrans, les erreurs et les requêtes réseau. Consultez la [documentation sur la collecte de données RUM][3] pour en savoir plus sur les événements RUM et les attributs par défaut. Vous pouvez enrichir les informations sur les sessions utilisateur et bénéficier d'un meilleur contrôle sur les attributs collectés en suivant des événements personnalisés.

### Vues personnalisées

En plus du [suivi automatique des vues][4], vous pouvez effectuer le suivi de vues distinctes spécifiques (activités, fragments, etc.) lorsque ces dernières deviennent visibles et interactives dans le cycle de vie `onResume()`. Arrêtez le suivi lorsque la vue n'est plus visible. Le plus souvent, cette méthode doit être appelée dans la première `Activity` ou le premier `Fragment` :


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onResume() {
         GlobalRum.get().startView(viewKey, viewName, viewAttributes)
       }

       fun onPause() {
         GlobalRum.get().stopView(viewKey, viewAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onResume() {
            GlobalRum.get().startView(viewKey, viewName, viewAttributes);
       }

       public void onPause() {
            GlobalRum.get().stopView(viewKey, viewAttributes);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Ajouter vos propres durées de performance

En plus des attributs RUM par défaut, vous pouvez tirer profit de l'API `addTiming` pour découvrir combien de temps votre application consacre à chaque tâche. Les mesures de temps sont exprimées en fonction du début de la vue RUM actuelle. Par exemple, vous pouvez mesurer le temps nécessaire pour afficher votre bannière :
{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
      fun onHeroImageLoaded() {
            GlobalRum.get().addTiming("hero_image")
      } 
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onHeroImageLoaded() {
            GlobalRum.get().addTiming("hero_image");
       }
   ```
{{% /tab %}}
{{< /tabs >}}

Une fois la durée envoyée, elle est accessible via `@view.custom_timings.<nom_durée>` (p. ex., `@view.custom_timings.hero_image`). Vous devez [créer une mesure](https://docs.datadoghq.com/real_user_monitoring/explorer/?tab=measures#configurer-des-facettes-et-des-mesures) avant de pouvoir la représenter dans des analyses RUM ou dans des dashboards.

### Actions personnalisées

En plus du [suivi automatique des actions][5], vous pouvez effectuer le suivi d'actions utilisateur personnalisées spécifiques (appuis sur l'écran, clics, défilements, etc.) avec `RumMonitor#addUserAction`. Pour effectuer le suivi d'actions continues (par exemple, le défilement d'une liste par l'utilisateur), utilisez `RumMonitor#startUserAction` et `RumMonitor#stopUserAction`.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onUserInteraction() { 
            GlobalRum.get().addUserAction(resourceKey, method, url, resourceAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onUserInteraction() {
            GlobalRum.get().addUserAction(resourceKey, method, url, resourceAttributes);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Ressources personnalisées

En plus du [suivi automatique des ressources][6], vous pouvez effectuer le suivi de ressources personnalisées spécifiques (requêtes réseau, API de fournisseur tiers, etc.) avec des méthodes (`GET`, `POST`, etc.), et charger la ressource avec `RumMonitor#startResource`. Arrêtez le suivi avec `RumMonitor#stopResource` une fois le chargement terminé ou avec `RumMonitor#stopResourceWithError` si une erreur survient lors du chargement de la ressource.

{{< tabs >}} 
{{% tab "Kotlin" %}}
   ```kotlin
       fun loadResource() {
            GlobalRum.get().startResource(resourceKey, method, url, resourceAttributes)
            try {
              // charger la ressource
              GlobalRum.get().stopResource(resourceKey, resourceKind, additionalAttributes)
            } catch (e: Exception) {
              GlobalRum.get().stopResourceWithError(resourceKey, message, origin, e)
            } 
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void loadResource() {
            GlobalRum.get().startResource(resourceKey, method, url, resourceAttributes);
            try {
                // charger la ressource
                GlobalRum.get().stopResource(resourceKey, resourceKind, additionalAttributes);
            } catch (Exception e) {
                GlobalRum.get().stopResourceWithError(resourceKey, message, origin, e);
            }
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Erreurs personnalisées

Pour effectuer le suivi d'erreurs spécifiques, prévenez le monitor lorsqu'une erreur survient avec le message, la source, l'exception et les attributs supplémentaires. Reportez-vous à la [documentation sur les attributs d'erreur][9].


   ```kotlin
      GlobalRum.get().addError(message, source, throwable, attributes)
   ```


## Suivi d'attributs globaux personnalisés

En plus des [attributs RUM par défaut][3] recueillis automatiquement par le SDK mobile, vous pouvez ajouter des informations contextuelles supplémentaires, comme des attributs personnalisés, à vos événements RUM afin d'enrichir la visibilité dans Datadog. Les attributs personnalisés permettent de filtrer les informations sur le comportement utilisateur observé (comme la valeur d'un panier, le niveau du commerçant ou la campagne publicitaire) en fonction d'informations au niveau du code (comme les services backend, la chronologie de session, les logs d'erreur et la santé du réseau).

### Suivi des sessions utilisateur
L'ajout des informations utilisateur à vos sessions RUM facilite :
* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API Utilisateur dans l'interface RUM"  >}}

Les attributs suivants sont **facultatifs**, mais nous vous conseillons d'en spécifier **au moins un** :

| Attribut  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | Chaîne | Identificateur d'utilisateur unique.                                                                                  |
| usr.name  | Chaîne | Nom courant de l'utilisateur, affiché par défaut dans l'interface RUM.                                                  |
| usr.email | Chaîne | Adresse e-mail de l'utilisateur, affichée dans l'interface RUM si le nom de l'utilisateur n'est pas connu. Elle sert également à récupérer des Gravatars. |

Pour identifier des sessions utilisateur, utilisez l'API `setUser`, par exemple :

```kotlin
Datadog.setUserInfo('1234', 'John Doe', 'john@doe.com')
```

### Suivi des attributs

   ```kotlin
      // Ajoute un attribut à tous les futurs événements RUM
      GlobalRum.addAttribute(key, value)

      // Supprime un attribut de tous les futurs événements RUM
      GlobalRum.removeAttribute(key)
   ```

## Suivi des widgets

Le suivi des widgets n'est pas effectué automatiquement avec le SDK. Pour envoyer manuellement les interactions avec l'interface à partir de vos widgets, appelez l'API Datadog. [Voir un exemple][7].


## Paramètres de lancement

Les méthodes suivantes peuvent être utilisées dans `Configuration.Builder` lors de la création de la configuration Datadog pour initialiser la bibliothèque :

`trackInteractions(Array<ViewAttributesProvider>)` 
: Permet d'effectuer le suivi d'interactions utilisateur (appui sur l'écran, défilement ou balayage). Ce paramètre vous permet aussi d'ajouter des attributs personnalisés aux événements d'action RUM en fonction du widget avec lequel l'utilisateur a interagi.

`useViewTrackingStrategy(strategy)` 
: Définit la stratégie de suivi des vues utilisée. En fonction de l'architecture de votre application, vous pouvez choisir l'une des implémentations de [`ViewTrackingStrategy`][4] ou implémenter votre propre stratégie.

`addPlugin(DatadogPlugin, Feature)`
: Ajoute une implémentation de plugin pour une fonctionnalité spécifique (`CRASH`, `LOG`, `TRACE`, `RUM`). Le plugin est enregistré une fois la fonctionnalité initialisée, puis désenregistré lorsque la fonctionnalité est arrêtée.

`trackLongTasks(durationThreshold)` 
: Permet d'effectuer le suivi des tâches qui durent plus de `durationThreshold` sur le thread principal en tant que tâches longues dans Datadog.

`setFirstPartyHosts()` 
: Définit les hosts sur lesquels le tracing est activé et qui ont des ressources RUM classées comme `first-party`.

`useEUEndpoints()` 
: Envoie les données cibles vers les endpoints européens.

`useUSEndpoints()` 
: Envoie les données cibles vers les endpoints américains.

`useGovEndpoints()` 
: Envoie les données cibles vers les endpoints US1-FED.

`setBatchSize([SMALL|MEDIUM|LARGE])` 
: Définit la taille des lots individuels pour les requêtes envoyées à Datadog.

`setUploadFrequency([FREQUENT|AVERAGE|RARE])` 
: Définit la fréquence des requêtes effectuées vers les endpoints Datadog (si des requêtes sont disponibles).

`sampleRumSessions(<samplingRate>)` 
: Définit le taux d'échantillonnage des sessions RUM. (La valeur 0 signifie qu'aucun événement RUM n'est envoyé. La valeur 100 signifie que toutes les sessions sont conservées.)

`setRumXxxEventMapper()` 
: Définit les rappels de nettoyage de données pour les vues, actions, ressources et erreurs.


### Suivi automatique des vues

Pour effectuer un suivi automatique de vos vues (activités, fragments, etc.), spécifiez une stratégie de suivi lors du lancement. En fonction de l'architecture de votre application, vous pouvez choisir l'une des stratégies suivantes :

`ActivityViewTrackingStrategy`
: Chaque activité dans votre application est considérée comme une vue distincte.

`FragmentViewTrackingStrategy`
: Chaque fragment dans votre application est considéré comme une vue distincte.

`MixedViewTrackingStrategy` 
: Chaque activité ou fragment dans votre application est considéré comme une vue distincte.

`NavigationViewTrackingStrategy`
: Recommandé aux utilisateurs de la bibliothèque Android Jetpack Navigation. Chaque destination de Navigation est considérée comme une vue distincte.


Par exemple, pour définir chaque fragment comme une vue distincte, utilisez la configuration suivante dans vos [paramètres][1] :

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val configuration = Configuration.Builder(true, true, true, true)
        .useViewTrackingStrategy(FragmentViewTrackingStrategy(...))
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       final Configuration configuration = new Configuration.Builder(true, true, true, true)
        .useViewTrackingStrategy(new FragmentViewTrackingStrategy(...))
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}


**Conseil** : pour `ActivityViewTrackingStrategy`, `FragmentViewTrackingStrategy` ou `MixedViewTrackingStrategy`, vous pouvez filtrer les éléments `Fragment` ou `Activity` qui doivent être suivis en tant que vues RUM en spécifiant une implémentation `ComponentPredicate` dans le constructeur.

**Remarque** : par défaut, la bibliothèque n'effectue le suivi d'aucune vue. Si vous ne spécifiez aucune stratégie de suivi des vues, vous devrez envoyer manuellement les vues en appelant les méthodes `startView` et `stopView`.


### Suivi automatique des requêtes réseau

Pour récupérer des mesures de temps dans les ressources (fournisseurs tiers, requêtes réseau) comme le time to first byte ou la résolution DNS, personnalisez `okHttpClient` de façon à ajouter la fabrique [EventListener][8] :

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .eventListenerFactory(DatadogEventListener.Factory())
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       final OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(new DatadogInterceptor())
        .eventListenerFactory(new DatadogEventListener.Factory())
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

### Suivi automatique des tâches longues

Les opérations longues effectuées sur le thread principal peuvent avoir un impact sur les performances visuelles et la réactivité de votre application. Pour effectuer le suivi de ces opérations, définissez le seuil de durée au-delà duquel une tâche est considérée comme trop longue.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val config = Configuration.Builder(true, true, true, true)
        .trackLongTasks(durationThreshold)
        .build()
   ```

Par exemple, pour remplacer la durée par défaut (`100 ms`), définissez un seuil personnalisé dans votre configuration.

   ```kotlin
      val configuration = Configuration.Builder(...)
        // ...
        .trackLongTasks(250L) // surveiller les tâches qui durent plus de 250 ms en tant que tâches longues
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      Configuration configuration = new Configuration.Builder(true, true, true, true)
        .trackLongTasks(durationThreshold)
        .build();
   ```

Par exemple, pour remplacer la durée par défaut (`100 ms`), définissez un seuil personnalisé dans votre configuration.

   ```java
      Configuration configuration = new Configuration.Builder(...)
        // ...
        .trackLongTasks(250L) // surveiller les tâches qui durent plus de 250 ms en tant que tâches longues
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

## Modifier ou ignorer des événements RUM

Pour modifier certains attributs dans vos événements RUM ou pour ignorer complètement certains événements avant de les rassembler, spécifiez une implémentation de `EventMapper<T>` lors du lancement du SDK :


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val config = Configuration.Builder(true, true, true, true)
        ...
        .setRumErrorEventMapper(rumErrorEventMapper)
        .setRumActionEventMapper(rumActionEventMapper)
        .setRumResourceEventMapper(rumResourceEventMapper)
        .setRumViewEventMapper(rumViewEventMapper)
        .setRumLongTaskEventMapper(rumLongTaskEventMapper)
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      Configuration config = new Configuration.Builder(true, true, true, true)
        ...
        .setRumErrorEventMapper(rumErrorEventMapper)
        .setRumActionEventMapper(rumActionEventMapper)
        .setRumResourceEventMapper(rumResourceEventMapper)
        .setRumViewEventMapper(rumViewEventMapper)
        .setRumLongTaskEventMapper(rumLongTaskEventMapper)
        .build();

   ```
{{% /tab %}}
{{< /tabs >}}

   Si vous implémentez l'interface `EventMapper<T>`, vous verrez que seuls certains attributs sont modifiables pour chaque type d'événement :

   | Type d'événement    | Clé d'attribut      | Description                                     |
   |---------------|--------------------|-------------------------------------------------|
   | ViewEvent     | `view.referrer`      | URL liée à la vue initiale de la page |
   |               | `view.url`           | URL de la vue                                 |
   |               | `view.name`           | Nom de la vue                                |
   | ActionEvent   |                    |                                                 |
   |               | `action.target.name` | Nom cible                                     |
   |               | `view.referrer`      | URL liée à la vue initiale de la page |
   |               | `view.url`           | URL de la vue                                 |
   |               | `view.name`           | Nom de la vue                               |
   | ErrorEvent    |                      |                                                 |
   |               | `error.message`      | Message d'erreur                                   |
   |               | `error.stack`        | Stacktrace de l'erreur                         |
   |               | `error.resource.url` | URL de la ressource                             |
   |               | `view.referrer`      | URL liée à la vue initiale de la page |
   |               | `view.url`           | URL de la vue                                 |
   |               | `view.name`           | Nom de la vue                                |
   | ResourceEvent |                    |                                                 |
   |               | `resource.url`       | URL de la ressource                             |
   |               | `view.referrer`      | URL liée à la vue initiale de la page |
   |               | `view.url`           | URL de la vue                                 |
   |               | `view.name`           | Nom de la vue                                |
   | LongTaskEvent |                    |                                                 |
   |               | `view.referrer`       | URL liée à la vue initiale de la page |
   |               | `view.url`            | URL de la vue                                 |
   |               | `view.name`           | Nom de la vue                                |

   **Remarque** : si vous renvoyez une valeur null à partir de l'implémentation `EventMapper<T>`, l'événement est ignoré.

   ## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: https://docs.datadoghq.com/fr/real_user_monitoring/android
[3]: https://docs.datadoghq.com/fr/real_user_monitoring/android/data_collected
[4]: https://docs.datadoghq.com/fr/real_user_monitoring/android/advanced_configuration/#automatically-track-views
[5]: https://docs.datadoghq.com/fr/real_user_monitoring/android/advanced_configuration/#initialization-parameters
[6]: https://docs.datadoghq.com/fr/real_user_monitoring/android/advanced_configuration/#automatically-track-network-requests
[7]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[8]: https://square.github.io/okhttp/events/
[9]: https://docs.datadoghq.com/fr/real_user_monitoring/android/data_collected/?tab=error#event-specific-attributes