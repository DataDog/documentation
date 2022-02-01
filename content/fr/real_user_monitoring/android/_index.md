---
dependencies:
  - https://github.com/DataDog/dd-sdk-android/blob/master/docs/rum_getting_started.md
further_reading:
  - link: https://github.com/DataDog/dd-sdk-android
    tag: Github
    text: Code source dd-sdk-android
  - link: /real_user_monitoring
    tag: Page d'accueil
    text: Explorer le service RUM de Datadog
kind: documentation
title: Surveillance Android avec RUM
---
Le Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application.

## Configuration

1. Déclarez le SDK en tant que dépendance.
2. Ajoutez les détails de l'application dans l'interface utilisateur.
3. Initialisez la bibliothèque avec le contexte de l'application.
4. Initialisez le monitor RUM ainsi que l'intercepteur et commencez à envoyer des données.

**Version minimale du système d'exploitation Android prise en charge** : le SDK Datadog pour Android prend en charge Android v19+.


### Déclarer le SDK en tant que dépendance

Déclarez [dd-sdk-android][1] et le [plug-in gradle][13] en tant que dépendance dans votre fichier `build.gradle` :

```
plugins {
    id("dd-sdk-android-gradle-plugin")
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android:x.x.x" 
}
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}
```

### Ajouter les détails de l'application dans l'interface utilisateur

1. Sélectionnez UX Monitoring > RUM Applications > New Application.
2. Choisissez le type d'application `android` dans l'[interface Datadog][2] et attribuez un nom à l'application, afin de générer un ID d'application Datadog unique ainsi qu'un token client.

![image][12]

Pour assurer la sécurité de vos données, vous devez utiliser un token client. Vous ne pouvez pas vous contenter d'utiliser des [clés d'API Datadog][3] pour configurer la bibliothèque `dd-sdk-android`. En effet, elles risqueraient d'être exposées côté client dans le bytecode de l'APK de l'application Android. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][4] :

### Initialiser la bibliothèque avec le contexte de l'application

{{< tabs >}}
{{% tab "Site américain de Datadog" %}}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val configuration = Configuration.Builder(
            rumEnabled = true,
            crashReportsEnabled = true
        )
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .build()
          val credentials = Credentials(<TOKEN_CLIENT>, <NOM_ENVIRONNEMENT>, <NOM_VARIANTE_APPLICATION>, <ID_APPLICATION>)
          Datadog.initialize(this, credentials, configuration, trackingConsent)

       }
   }
```

{{% /tab %}}
{{% tab "Site européen de Datadog" %}}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()

        val configuration = Configuration.Builder(
            rumEnabled = true,
            crashReportsEnabled = true
        )
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useEUEndpoints()
                        .build()
        val credentials = Credentials(<TOKEN_CLIENT>, <NOM_ENVIRONNEMENT>, <NOM_VARIANTE_APPLICATION>, <ID_APPLICATION>)
        Datadog.initialize(this, credentials, configuration, trackingConsent)

    }
}
```
{{% /tab %}}
{{< /tabs >}}

Familiarisez-vous avec le fonctionnement de l'option [`ViewTrackingStrategy`][5] pour activer automatiquement le suivi de toutes vos vues (activités, fragments, etc.), de l'option [`trackingConsent`][6] pour implémenter la conformité au RGPD pour vos utilisateurs européens, et d'[autres options de configuration][7] pour initialiser la bibliothèque.

**Remarque** : dans les identifiants requis pour l'initialisation, vous devez également spécifier le nom de variante de votre application. Pour ce faire, utilisez votre valeur `BuildConfig.FLAVOR` (ou une chaîne vide si vous n'avez pas de variante). Cette étape est essentielle, car elle permet d'importer automatiquement le bon fichier `mapping.txt` ProGuard au moment du build, afin d'afficher les stack traces des erreurs RUM désobfusquées. Pour en savoir plus, consultez le [guide d'importation de fichiers de mapping source Android][8].

### Initialiser le monitor RUM et l'intercepteur

Configurez et enregistrez le monitor RUM. Cette opération, qui doit être effectuée une seule fois, s'effectue généralement dans la méthode `onCreate()` de votre application :

```kotlin
    val monitor = RumMonitor.Builder()
            .build()
    GlobalRum.registerIfAbsent(monitor)
```


Pour effectuer le suivi de vos requêtes OkHttp en tant que ressources, ajoutez l'[intercepteur][9] fourni :

```kotlin
    val okHttpClient =  OkHttpClient.Builder()
        .addInterceptor(DatadogInterceptor())
        .build()
```

Cette approche enregistre chaque requête traitée par le client `OkHttpClient` en tant que ressource dans RUM. Toutes les informations pertinentes sont automatiquement renseignées (URL, méthode, code de statut, erreur). Notez que seules les requêtes réseau lancées lorsqu'une vue est active font l'objet d'un suivi. Si vous souhaitez effectuer le suivi de requêtes lorsque votre application est en arrière-plan, vous pouvez [créer une vue manuellement][10].

**Remarque** : si vous utilisez plusieurs intercepteurs, `DatadogInterceptor` doit être appelé en premier.

Vous pouvez également ajouter un `EventListener` pour le client `OkHttpClient` afin d'[effectuer automatiquement le suivi des durées de ressources][11] (fournisseurs tiers, requêtes réseau).


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[5]: /fr/real_user_monitoring/android/advanced_configuration/#automatically-track-views
[6]: /fr/real_user_monitoring/android/troubleshooting/#set-tracking-consent-gdpr-compliance
[7]: /fr/real_user_monitoring/android/advanced_configuration/#initialization-parameters
[8]: /fr/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[9]: https://square.github.io/okhttp/interceptors/
[10]: /fr/real_user_monitoring/android/advanced_configuration/#custom-views
[11]: /fr/real_user_monitoring/android/advanced_configuration/#automatically-track-network-requests
[12]: https://raw.githubusercontent.com/DataDog/dd-sdk-android/master/docs/images/create_rum_application.png
[13]: https://github.com/DataDog/dd-sdk-android-gradle-plugin