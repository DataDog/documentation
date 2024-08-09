---
aliases:
- /fr/real_user_monitoring/android/advanced_configuration/
code_lang: android
code_lang_weight: 10
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: GitHub
  text: Code source de dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explorer la solution RUM de Datadog
title: Configuration avancée de RUM pour Android
type: multi-code-lang
---
## Présentation

Si vous n'avez pas encore installé le SDK, consultez les [instructions de configuration intégrées à l'application][1] ou reportez-vous à la [documentation sur la configuration de RUM pour Android][2].

## Enrichir des sessions utilisateur

La solution RUM pour Android effectue automatiquement le suivi d'attributs tels que l'activité utilisateur, les écrans, les erreurs et les requêtes réseau. Consultez la [section Données RUM recueillies (Android)][3] pour en savoir plus sur les événements RUM et les attributs par défaut. Vous pouvez enrichir les informations sur les sessions utilisateur et bénéficier d'un meilleur contrôle sur les attributs recueillis en suivant des événements personnalisés.

### Vues personnalisées

En plus du [suivi automatique des vues][4], vous pouvez effectuer le suivi de vues spécifiques distinctes (comme les activités et les fragments) lorsque ces dernières deviennent visibles et interactives dans le cycle de vie `onResume()`. Arrêtez le suivi lorsque la vue n'est plus visible. Le plus souvent, cette méthode doit être appelée dans la première `Activity` ou le premier `Fragment` :


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onResume() {
         GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes)
       }

       fun onPause() {
         GlobalRumMonitor.get().stopView(viewKey, viewAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onResume() {
            GlobalRumMonitor.get().startView(viewKey, viewName, viewAttributes);
       }

       public void onPause() {
            GlobalRumMonitor.get().stopView(viewKey, viewAttributes);
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
            GlobalRumMonitor.get().addTiming("hero_image")
      } 
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onHeroImageLoaded() {
            GlobalRumMonitor.get().addTiming("hero_image");
       }
   ```
{{% /tab %}}
{{< /tabs >}}

Une fois la durée envoyée, elle est accessible via `@view.custom_timings.<nom_durée>`, comme `@view.custom_timings.hero_image`. Vous devez [créer une mesure][10] avant de pouvoir la représenter dans des analyses RUM ou dans des dashboards.

### Actions personnalisées

En plus du [suivi automatique des actions][5], vous pouvez effectuer le suivi d'actions utilisateur personnalisées spécifiques (comme les appuis sur l'écran, les clics et les défilements) avec `RumMonitor#addAction`. Pour effectuer le suivi d'actions continues (par exemple, le défilement d'une liste par l'utilisateur), utilisez `RumMonitor#startAction` et `RumMonitor#stopAction`.

Remarque : le type d'action doit correspondre à « custom », « click », « tap », « scroll », « swipe » ou « back ».

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       fun onUserInteraction() { 
            GlobalRumMonitor.get().addAction(actionType, name, actionAttributes)
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void onUserInteraction() {
            GlobalRumMonitor.get().addAction(actionType, name, actionAttributes);
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Enrichir des ressources

Lors du [suivi automatique des ressources][6], fournissez une instance `RumResourceAttributesProvider` personnalisée pour ajouter des attributs personnalisés à chaque requête réseau suivie. Par exemple, si vous souhaitez effectuer un suivi des en-têtes d'une requête réseau, créez une implémentation comme suit, puis transmettez-la au constructor du `DatadogInterceptor`.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class CustomRumResourceAttributesProvider : RumResourceAttributesProvider {
    override fun onProvideAttributes(
        request: Request,
        response: Response?,
        throwable: Throwable?
    ): Map<String, Any?> {
        val headers = request.headers
        return headers.names().associate {
            "headers.${it.lowercase(Locale.US)}" to headers.values(it).first()
        }
    }
}
```
{{% /tab %}}
{{% tab "Java" %}}
```java
public class CustomRumResourceAttributesProvider implements RumResourceAttributesProvider {
    @NonNull
    @Override
    public Map<String, Object> onProvideAttributes(
            @NonNull Request request,
            @Nullable Response response,
            @Nullable Throwable throwable
    ) {
        Map<String, Object> result = new HashMap<>();
        Headers headers = request.headers();

        for (String key : headers.names()) {
            String attrName = "headers." + key.toLowerCase(Locale.US);
            result.put(attrName, headers.values(key).get(0));
        }

        return result;
    }
}
```
{{% /tab %}}
{{< /tabs >}}

### Ressources personnalisées

En plus du [suivi automatique des ressources][6], vous pouvez effectuer le suivi de ressources personnalisées spécifiques (comme les requêtes réseau et l'API de fournisseur tiers) avec des méthodes (telles que `GET` et `POST`), et charger la ressource avec `RumMonitor#startResource`. Arrêtez le suivi avec `RumMonitor#stopResource` une fois le chargement terminé ou avec `RumMonitor#stopResourceWithError` si une erreur survient lors du chargement de la ressource.

{{< tabs >}} 
{{% tab "Kotlin" %}}
   ```kotlin
       fun loadResource() {
            GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes)
            try {
              // charger la ressource
              GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes)
            } catch (e: Exception) {
              GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e)
            } 
       }
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       public void loadResource() {
            GlobalRumMonitor.get().startResource(resourceKey, method, url, resourceAttributes);
            try {
                // charger la ressource
                GlobalRumMonitor.get().stopResource(resourceKey, resourceKind, additionalAttributes);
            } catch (Exception e) {
                GlobalRumMonitor.get().stopResourceWithError(resourceKey, message, origin, e);
            }
       }
   ```
{{% /tab %}}
{{< /tabs >}}

### Erreurs personnalisées

Pour effectuer le suivi d'erreurs spécifiques, informez le monitor lorsqu'une erreur survient et transmettez le message, la source, l'exception et les attributs supplémentaires. Consultez la [rubrique Attributs d'erreur][9] pour en savoir plus.

   ```kotlin
      GlobalRumMonitor.get().addError(message, source, throwable, attributes)
   ```

## Suivi d'attributs globaux personnalisés

En plus des [attributs RUM par défaut][3] recueillis automatiquement par le SDK RUM Android, vous pouvez ajouter des informations contextuelles supplémentaires, comme des attributs personnalisés, à vos événements RUM afin d'améliorer votre observabilité dans Datadog. Les attributs personnalisés permettent de filtrer les informations sur le comportement observé de l'utilisateur (comme la valeur d'un panier, le niveau du commerçant ou la campagne publicitaire) en fonction d'informations au niveau du code (comme les services backend, la chronologie de session, les logs d'erreur et la santé du réseau).

### Suivre des sessions utilisateur

L'ajout des informations utilisateur à vos sessions RUM facilite :
* le suivi du parcours d'un utilisateur donné ;
* l'identification des utilisateurs les plus touchés par les erreurs ;
* la surveillance des performances de vos utilisateurs les plus importants.

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="API Utilisateurs dans l'interface RUM" >}}

Les attributs suivants sont **facultatifs**, mais il est conseillé d'en spécifier **au moins un** :

| Attribut  | Type | Description                                                                                              |
|------------|------|----------------------------------------------------------------------------------------------------|
| usr.id    | Chaîne | Identificateur d'utilisateur unique.                                                                                  |
| usr.name  | Chaîne | Nom courant de l'utilisateur, affiché par défaut dans l'interface RUM.                                                  |
| usr.email | Chaîne | Adresse e-mail de l'utilisateur, affichée dans l'interface RUM si le nom de l'utilisateur n'est pas connu. Elle sert également à récupérer des Gravatars. |

Pour identifier des sessions utilisateur, utilisez l'API `setUserInfo`. Exemple :

```kotlin
Datadog.setUserInfo('1234', 'John Doe', 'john@doe.com')
```

### Suivre des attributs

```kotlin
    // Ajoute un attribut à tous les futurs événements RUM
    GlobalRumMonitor.get().addAttribute(key, value)

    // Supprime un attribut de tous les futurs événements RUM
    GlobalRumMonitor.get().removeAttribute(key)
```

## Suivre des widgets

Le suivi des widgets n'est pas effectué automatiquement avec le SDK. Pour envoyer manuellement les interactions avec l'interface à partir de vos widgets, appelez l'API Datadog. Consultez [cet exemple][7].


## Paramètres d'initialisation

Les méthodes suivantes peuvent être utilisées dans `Configuration.Builder` lors de la création de la configuration Datadog pour initialiser la bibliothèque :

`setFirstPartyHosts()` 
: Définit les hosts pour lesquels le tracing est activé et dont les ressources RUM sont considérées comme `first-party`. **Remarque** : si vous définissez des types d'en-têtes de tracing personnalisés dans la configuration Datadog, et que vous utilisez un traceur enregistré avec `GlobalTracer`, vérifiez que ces types d'en-têtes de tracing sont également définis pour le traceur utilisé.

`useSite(DatadogSite)` 
: Envoie les données cibles vers les sites EU1, US1, US3, US5, US1_FED et AP1.

Les méthodes suivantes peuvent être utilisées dans `RumConfiguration.Builder` lors de la création de la configuration RUM pour activer la fonctionnalité RUM :

`trackUserInteractions(Array<ViewAttributesProvider>)` 
: Permet d'effectuer le suivi d'interactions utilisateur (appui sur l'écran, défilement ou balayage). Ce paramètre vous permet aussi d'ajouter des attributs personnalisés aux événements d'action RUM en fonction du widget avec lequel l'utilisateur a interagi.

`useViewTrackingStrategy(strategy)` 
: Définit la stratégie de suivi des vues utilisée. En fonction de l'architecture de votre application, vous pouvez choisir l'une des implémentations de [`ViewTrackingStrategy`][4] ou implémenter votre propre stratégie.

`trackLongTasks(durationThreshold)` 
: Permet d'effectuer le suivi des tâches qui durent plus de `durationThreshold` sur le thread principal en tant que tâches longues dans Datadog.

`setBatchSize([SMALL|MEDIUM|LARGE])` 
: Définit la taille des lots individuels pour les requêtes envoyées à Datadog.

`setUploadFrequency([FREQUENT|AVERAGE|RARE])` 
: Définit la fréquence des requêtes effectuées vers les endpoints Datadog (si des requêtes sont disponibles).

`setVitalsUpdateFrequency([FREQUENT|AVERAGE|RARE|NEVER])` 
: Définit la fréquence souhaitée pour la collecte des signaux mobiles.

`setSessionSampleRate(<sampleRate>)` 
: Définit le taux d'échantillonnage des sessions RUM. La valeur 0 signifie qu'aucun événement RUM n'est envoyé, tandis que la valeur 100 signifie que toutes les sessions sont conservées.

`setXxxEventMapper()` 
: Définit les rappels de nettoyage de données pour les vues, actions, ressources et erreurs.


### Suivre automatiquement des vues

Pour effectuer un suivi automatique de vos vues (comme les activités et les fragments), indiquez une stratégie de suivi lors du lancement. En fonction de l'architecture de votre application, vous pouvez choisir l'une des stratégies suivantes :

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
       val rumConfig = RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(FragmentViewTrackingStrategy(...))
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
       RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(new FragmentViewTrackingStrategy(...))
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}


Pour la stratégie `ActivityViewTrackingStrategy`, `FragmentViewTrackingStrategy`, ou `MixedViewTrackingStrategy`, vous pouvez filtrer les éléments `Fragment` ou `Activity` qui doivent être suivis dans la vue RUM en spécifiant une implémentation `ComponentPredicate` dans le constructor :

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        .useViewTrackingStrategy(
        ActivityViewTrackingStrategy(
            trackExtras = true,
            componentPredicate = object : ComponentPredicate<Activity> {
                override fun accept(component: Activity): Boolean {
                    return true
                }

                override fun getViewName(component: Activity): String? = null
            })
        )
        .build()  
   ```
{{% /tab %}}
{{% tab "Java" %}}
   ```java
        RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
            .useViewTrackingStrategy(new ActivityViewTrackingStrategy(
                true,
                new ComponentPredicate<Activity>() {
                    @Override
                    public boolean accept(Activity component) {
                        return true;
                    }

                    @Override
                    public String getViewName(Activity component) {
                        return null;
                    }
                }
            ))
            .build();
   ```
{{% /tab %}}
{{< /tabs >}}


**Remarque** : par défaut, la bibliothèque applique la stratégie `ActivityViewTrackingStrategy`. Si vous ne spécifiez aucune stratégie de suivi des vues, vous devrez envoyer manuellement les vues en appelant les méthodes `startView` et `stopView`.


### Suivre automatiquement des requêtes réseau

Pour récupérer des mesures de temps dans les ressources (fournisseurs tiers, requêtes réseau) comme le time to first byte ou la résolution DNS, personnalisez `OkHttpClient` de façon à ajouter la factory [EventListener][8] :

1. Ajoutez la dépendance Gradle à la bibliothèque `dd-sdk-android-okhttp` dans le fichier `build.gradle` au niveau du module :

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

2. Ajoutez la factory [EventListener][8] :

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
       OkHttpClient okHttpClient = new OkHttpClient.Builder()
        .addInterceptor(new DatadogInterceptor())
        .eventListenerFactory(new DatadogEventListener.Factory())
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

### Suivre automatiquement des tâches longues

Les opérations longues effectuées sur le thread principal peuvent avoir un impact sur les performances visuelles et la réactivité de votre application. Pour effectuer le suivi de ces opérations, définissez le seuil de durée au-delà duquel une tâche est considérée comme trop longue.

{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(durationThreshold)
        .build()
   ```

Par exemple, pour remplacer la durée par défaut (`100 ms`), définissez un seuil personnalisé dans votre configuration.

   ```kotlin
      val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(250L) // surveiller les tâches qui durent plus de 250 ms en tant que tâches longues
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(durationThreshold)
        .build();
   ```

Par exemple, pour remplacer la durée par défaut (`100 ms`), définissez un seuil personnalisé dans votre configuration.

   ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .trackLongTasks(250L) // surveiller les tâches qui durent plus de 250 ms en tant que tâches longues
        .build();
   ```
{{% /tab %}}
{{< /tabs >}}

## Modifier ou ignorer des événements RUM

Pour modifier certains attributs dans vos événements RUM ou pour ignorer complètement certains événements avant de les rassembler, spécifiez une implémentation de `EventMapper<T>` lors du lancement du SDK RUM Android :


{{< tabs >}}
{{% tab "Kotlin" %}}
   ```kotlin
       val rumConfig = RumConfiguration.Builder(applicationId)
        // ...
        .setErrorEventMapper(rumErrorEventMapper)
        .setActionEventMapper(rumActionEventMapper)
        .setResourceEventMapper(rumResourceEventMapper)
        .setViewEventMapper(rumViewEventMapper)
        .setLongTaskEventMapper(rumLongTaskEventMapper)
        .build()
   ```
{{% /tab %}}
{{% tab "Java" %}}
  ```java
      RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
        // ...
        .setErrorEventMapper(rumErrorEventMapper)
        .setActionEventMapper(rumActionEventMapper)
        .setResourceEventMapper(rumResourceEventMapper)
        .setViewEventMapper(rumViewEventMapper)
        .setLongTaskEventMapper(rumLongTaskEventMapper)
        .build();

   ```
{{% /tab %}}
{{< /tabs >}}

   Lors de l'implémentation de l'interface `EventMapper<T>`, les attributs ne peuvent pas tous être modifiés pour chaque type d'événement. Voici la liste des attributs modifiables :

   | Type d'événement    | Clé d'attribut      | Description                                     |
   |---------------|--------------------|-------------------------------------------------|
   | ViewEvent     | `view.referrer`      | URL liée à la vue initiale de la page. |
   |               | `view.url`           | URL de la vue.                                 |
   |               | `view.name`           | Nom de la vue.                                |
   | ActionEvent   |                    |                                                 |
   |               | `action.target.name` | Nom cible.                                     |
   |               | `view.referrer`      | URL liée à la vue initiale de la page. |
   |               | `view.url`           | URL de la vue.                                 |
   |               | `view.name`           | Nom de la vue.                               |
   | ErrorEvent    |                      |                                                 |
   |               | `error.message`      | Message d'erreur.                                   |
   |               | `error.stack`        | Stacktrace de l'erreur.                         |
   |               | `error.resource.url` | URL de la ressource.                             |
   |               | `view.referrer`      | URL liée à la vue initiale de la page. |
   |               | `view.url`           | URL de la vue.                                 |
   |               | `view.name`           | Nom de la vue.                                |
   | ResourceEvent |                    |                                                 |
   |               | `resource.url`       | URL de la ressource.                             |
   |               | `view.referrer`      | URL liée à la vue initiale de la page. |
   |               | `view.url`           | URL de la vue.                                 |
   |               | `view.name`           | Nom de la vue.                                |
   | LongTaskEvent |                    |                                                 |
   |               | `view.referrer`       | URL liée à la vue initiale de la page. |
   |               | `view.url`            | URL de la vue.                                 |
   |               | `view.name`           | Nom de la vue.                                |

   **Remarque** : si vous renvoyez une valeur null à partir de l'implémentation `EventMapper<T>`, l'événement est ignoré.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /fr/real_user_monitoring/android
[3]: /fr/real_user_monitoring/android/data_collected
[4]: /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-views
[5]: /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#initialization-parameters
[6]: /fr/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/#automatically-track-network-requests
[7]: https://github.com/DataDog/dd-sdk-android/tree/master/sample/kotlin/src/main/kotlin/com/datadog/android/sample/widget
[8]: https://square.github.io/okhttp/features/events/
[9]: /fr/real_user_monitoring/android/data_collected/#event-specific-attributes
[10]: /fr/real_user_monitoring/explorer/search/#setup-facets-and-measures