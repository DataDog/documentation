---
description: Recueillez des logs à partir de vos applications Android.
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Code source
  text: Code source dd-sdk-android
- link: logs/explorer
  tag: Documentation
  text: Apprendre à explorer vos logs
title: Collecte de logs Android
---

## Présentation

Envoyez des logs à Datadog à partir de vos applications Android avec la [bibliothèque de logging côté client `dd-sdk-android-logs` de Datadog][1]. Vous pourrez notamment :

* Envoyer des logs vers Datadog au format JSON en natif
* Ajouter du contexte et des attributs personnalisés supplémentaires pour chaque log envoyé
* Transmettre les exceptions Java ou Kotlin interceptées
* Enregistrer les adresses IP et user agents réels du client
* Optimiser l'utilisation du réseau grâce aux envois groupés automatiques

## Configuration

1. Ajoutez la dépendance Gradle en déclarant la bibliothèque comme étant une dépendance du fichier `build.gradle` au niveau du module. Assurez-vous de remplacer `x.x.x` dans l'exemple suivant par la dernière version de [dd-sdk-android-logs][2].

    ```groovy
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-logs:x.x.x"
    }
    ```

2. Initialisez le SDK Datadog bibliothèque avec le contexte de votre application, le consentement au suivi et votre [token client Datadog][3]. Pour des raisons de sécurité, vous devez utiliser un token client : vous ne pouvez pas utiliser les [clés d'API Datadog][4] pour configurer le SDK Datadog, car elles risqueraient d'être exposées côté client dans le bytecode de l'APK de l'application Android.

   La valeur `APP_VARIANT_NAME` indique la variante de l'application qui génère les données. Elle est requise dans les informations d'identification d'initialisation. Utilisez votre valeur `BuildConfig.FLAVOR` ou une chaîne vide si vous n'avez pas de variantes. Le fichier ProGuard `mapping.txt` approprié sera automatiquement téléchargé au moment du build, ce qui vous permettra de voir les stack traces des erreurs désobfusquées. Pour obtenir plus d'informations, référez-vous à la section [Signalement de pannes et suivi des erreurs sur Android][5].

   Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][3].

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

   Pour répondre aux exigences du RGPD, le SDK nécessite la valeur de consentement au suivi à son initialisation.
   Voici les différentes valeurs possibles pour le consentement au suivi :
   * `TrackingConsent.PENDING` : le SDK commence à recueillir les données et à les regrouper par lots, mais ne les envoie pas au
     l'endpoint de collecte de données. Le SDK attend d'obtenir la nouvelle valeur de consentement au suivi pour déterminer ce qu'il doit faire de ces lots de données.
   * `TrackingConsent.GRANTED` : le SDK commence à recueillir les données et les envoie au endpoint de collecte de données.
   * `TrackingConsent.NOT_GRANTED` : le SDK ne recueille aucune donnée. Vous ne pourrez pas envoyer manuellement des logs, des traces ou
     des événements RUM.

   Pour mettre à jour le consentement au suivi une fois le SDK initialisé, effectuez l'appel suivant : `Datadog.setTrackingConsent(<NOUVEAU CONSENTEMENT>)`.
   Le SDK ajuste son comportement en fonction de la nouvelle valeur de consentement. Imaginons que vous modifiez une valeur de consentement `TrackingConsent.PENDING` :
   * Si vous la remplacez par `TrackingConsent.GRANTED` : le SDK envoie tous les lots de données actuels, ainsi que toutes les données ultérieures, directement au endpoint de collecte de données.
   * Si vous la remplacez par `TrackingConsent.NOT_GRANTED` : le SDK supprime tous les lots de données et ne recueille plus aucune donnée par la suite.

   Utilisez la méthode utilitaire `isInitialized` pour vérifier que le SDK est bien initialisé :

   ```kotlin
    if (Datadog.isInitialized()) {
        // your code here
    }
   ```

   Lors de la création de votre application, vous pouvez activer les logs de développement en appelant la méthode `setVerbosity`. Tous les messages internes de la bibliothèque dont la priorité est supérieure ou égale au niveau spécifié sont alors enregistrés dans le Logcat Android :
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. Configurez et activez la fonctionnalité de logs :

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logsConfig = LogsConfiguration.Builder().build()
        Logs.enable(logsConfig)
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        LogsConfiguration logsConfig = new LogsConfiguration.Builder().build();
        Logs.enable(logsConfig);
   ```
   {{% /tab %}}
   {{< /tabs >}}

4. Configurer le logger Android :

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
        val logger = Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build()
   ```
   {{% /tab %}}

   {{% tab "Java" %}}
   ```java
        Logger logger = new Logger.Builder()
           .setNetworkInfoEnabled(true)
           .setLogcatLogsEnabled(true)
           .setRemoteSampleRate(100f)
           .setBundleWithTraceEnabled(true)
           .setName("<LOGGER_NAME>")
           .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

5. Envoyez une entrée de log personnalisée directement à Datadog avec l'une des fonctions suivantes :

    ```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning...")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
    ```

6. Les exceptions interceptées peuvent être envoyées avec un message :
   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       try { 
           doSomething() 
       } catch (e: IOException) {
           logger.e("Error while doing something", e) 
       }
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       try {
           doSomething();
       } catch (IOException e) {
           logger.e("Error while doing something", e);
       }
   ```
   {{% /tab %}}
   {{< /tabs >}}

    **Remarque** : toutes les méthodes de logging peuvent avoir un Throwable qui leur est associé.

7. (Facultatif) Fournissez une map avec votre message de log pour ajouter des attributs au log envoyé. Chaque entrée de la map est ajoutée en tant qu'attribut.

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       logger.i("onPageStarted", attributes = mapOf("http.url" to url))
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       Map<String, Object> attributes = new HashMap<>();
       attributes.put("http.url", url);
       logger.i("onPageStarted", null, attributes);
   ```
   {{% /tab %}}
   {{< /tabs >}}

8. Si vous devez modifier certains attributs de vos événements de log avant de les rassembler, vous pouvez implémenter `EventMapper<événement_log>` lors de l'initialisation de la fonctionnalité de log :

   {{< tabs >}}
   {{% tab "Kotlin" %}}
   ```kotlin
       val logsConfig = LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build()
   ```
   {{% /tab %}}
   {{% tab "Java" %}}
   ```java
       LogsConfiguration logsConfig = new LogsConfiguration.Builder()
                   // ...
                   .setEventMapper(logEventMapper)
                   .build();
   ```
   {{% /tab %}}
   {{< /tabs >}}

   **Remarque** : si vous renvoyez une valeur nulle ou une autre instance à partir de l'implémentation `EventMapper<événement_log>`, l'événement sera ignoré.

## Logging avancé

### Initialisation du logger

Les méthodes suivantes dans `Logger.Builder` peuvent être utilisées lors de l'initialisation du logger afin d'envoyer des logs à Datadog :

| Méthode                           | Rôle                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | Ajouter l'attribut `network.client.connectivity` à tous les logs. Les données enregistrées par défaut sont `connectivity` (`Wifi`, `3G`, `4G`, etc.) et `carrier_name` (`AT&T - US`). `carrier_name` est seulement disponible à partir du niveau d'API 28 d'Android.                                     |
| `setService(<NOM_SERVICE>)` | Définir `<NOM_SERVICE>` en tant que valeur pour l'[attribut standard][6] `service` joint à tous les logs envoyés à Datadog.                                                                                                                                                           |
| `setLogcatLogsEnabled(true)`     | Définir ce paramètre sur `true` pour utiliser Logcat en tant que logger.                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| Définir sur `true` (valeur par défaut) pour associer les logs à la trace active dans votre application. Ce paramètre vous permet de visualiser tous les logs envoyés lors d'une trace spécifique depuis le dashboard Datadog.                                                        |
| `setBundleWithRumEnabled(true)`| Définir sur `true` (valeur par défaut) pour associer les logs au contexte RUM actuel dans votre application. Ce paramètre vous permet de visualiser tous les logs envoyés pendant qu'une vue spécifique est active depuis le RUM Explorer Datadog.                                                        |
| `setName(<LOGGER_NAME>)`   | Définir `<NOM_LOGGER>` en tant que valeur pour l'attribut `logger.name` joint à tous les logs envoyés à Datadog.                                                                                                                                                                  |
| `setRemoteSampleRate(<TAUX_ÉCHANTILLONNAGE>)`   | Définir le taux d'échantillonnage de ce logger. Tous les logs générés par l'instance du logger sont échantillonnés de manière aléatoire selon le taux d'échantillonnage fourni (par défaut 1.0 = tous les logs). **Remarque** : les logs Logcat ne sont pas échantillonnés.            |
| `build()`                        | Créer une instance de logger avec toutes les options définies.                                                                                                                                                                                                                       |

### Configuration globale

Vous trouverez ci-dessous les fonctions pour ajouter/supprimer des tags et des attributs de tous les logs envoyés par un logger donné.

#### Global tags

##### Ajouter des tags

Utilisez la fonction `addTag("<CLÉ_TAG>", "<VALEUR_TAG>")` pour ajouter des tags à tous les logs envoyés par un logger spécifique :

```kotlin
// Ajouter un tag build_type:debug ou build_type:release
logger.addTag("build_type", BuildConfig.BUILD_TYPE)

// Ajouter un tag device:android
logger.addTag("device", "android")
```

`<VALEUR_TAG>` doit être une `chaîne`.

##### Supprimer des tags

Utilisez la fonction `removeTagsWithKey("<CLÉ_TAG>")` pour supprimer des tags de tous les logs envoyés par un logger spécifique :

```kotlin
// Supprimer tous les tags commençant par build_type
logger.removeTagsWithKey("build_type")
```

Pour en savoir plus, consultez la section [Débuter avec les tags][7].

#### Attributs globaux

##### Ajouter des attributs

Par défaut, les attributs suivants sont ajoutés à tous les logs envoyés par un logger :

* `http.useragent` et ses propriétés extraites `device` et `OS`
* `network.client.ip` et ses propriétés géographiques extraites (`country`, `city`)

Utilisez la fonction `addAttribute("<CLÉ_ATTRIBUT>", "<VALEUR_ATTRIBUT>")` pour ajouter un attribut personnalisé à tous les logs envoyés par un logger spécifique :

```kotlin
// Ajouter un attribut version_code avec un entier comme valeur
logger.addAttribute("version_code", BuildConfig.VERSION_CODE)

// Ajouter un attribut version_name avec une chaîne comme valeur
logger.addAttribute("version_name", BuildConfig.VERSION_NAME)
```

La `<VALEUR_ATTRIBUT>` peut être une date ou une chaîne `String` primitive.

##### Supprimer des attributs

Utilisez la fonction `removeAttribute("<CLÉ_ATTRIBUT>", "<VALEUR_ATTRIBUT>")` pour supprimer un attribut personnalisé de tous les logs envoyés par un logger spécifique :

```kotlin
// Supprimer l'attribut version_code de tous les prochains logs envoyés.
logger.removeAttribute("version_code")

// Supprimer l'attribut version_name de tous les prochains logs envoyés.
logger.removeAttribute("version_name")
```

## Collecte groupée de spans

Tous les logs sont d'abord stockés sur l'appareil local sous forme groupée. Chaque groupe de logs respecte les spécifications d'admission. Ils sont envoyés dès que le réseau est disponible, et dès que la batterie est suffisamment élevée pour que le SDK Datadog n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application s'exécute au premier plan, ou si l'envoi des données échoue, le groupe de logs est conservé jusqu'à ce qu'il puisse être envoyé.

Cela signifie que même si les utilisateurs ouvrent votre application en étant hors ligne, aucune donnée ne sera perdue.

Les données stockées sont automatiquement supprimées si elles sont trop anciennes pour limiter l'espace utilisé par le SDK.

Avant que les données ne soient importées dans Datadog, elles sont stockées en clair dans le répertoire cache de votre application. Ce répertoire est protégé par le [bac à sable d'applications Android][8]. Ainsi, sur la plupart des appareils, ces données ne peuvent pas être lues par d'autres applications. Toutefois, si l'appareil mobile est en mode root, ou si l'intégrité du kernel Linux a été compromise, il est possible que les données stockées soient lisibles.

## Extensions

### Timber

Si votre codebase existante utilise Timber, vous pouvez transmettre tous ces logs à Datadog automatiquement à l'aide de la [bibliothèque dédiée][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-logs
[2]: https://github.com/DataDog/dd-sdk-android/blob/develop/CHANGELOG.md
[3]: /fr/account_management/api-app-keys/#client-tokens
[4]: /fr/account_management/api-app-keys/#api-keys
[5]: /fr/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[6]: /fr/logs/processing/attributes_naming_convention/
[7]: /fr/getting_started/tagging/
[8]: https://source.android.com/security/app-sandbox
[9]: https://github.com/DataDog/dd-sdk-android/tree/develop/integrations/dd-sdk-android-timber