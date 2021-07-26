---
dependencies:
  - 'https://github.com/DataDog/dd-sdk-android/blob/master/docs/log_collection.md'
description: Recueillez des logs à partir de vos applications Android.
further_reading:
  - link: 'https://github.com/DataDog/dd-sdk-android'
    tag: Github
    text: Code source dd-sdk-android
  - link: logs/explorer
    tag: Documentation
    text: Apprendre à explorer vos logs
kind: documentation
title: Collecte de logs Android
---
Envoyez des logs à Datadog à partir de vos applications Android avec la [bibliothèque de logging côté client `dd-sdk-android` de Datadog][1]. Vous pourrez notamment :

* Envoyer des logs vers Datadog au format JSON en natif
* Ajouter du contexte et des attributs personnalisés supplémentaires pour chaque log envoyé
* Transmettre les exceptions Java/Kotlin interceptées
* Enregistrer les adresses IP et user agents réels du client
* Optimiser l'utilisation du réseau grâce aux envois groupés automatiques

## Configuration

1. Ajoutez la dépendance Gradle en définissant la bibliothèque en tant que dépendance dans le fichier `build.gradle` au niveau du module :

    ```conf
    repositories {
        maven { url "https://dl.bintray.com/datadog/datadog-maven" }
    }

    dependencies {
        implementation "com.datadoghq:dd-sdk-android:x.x.x"
    }
    ```

2. Initialisez la bibliothèque avec le contexte de votre application, le consentement au suivi ainsi que le [token client Datadog][2] et l'ID d'application générés lors de la création d'une application RUM depuis l'interface Datadog (consulter la section [Débuter avec la collecte de données RUM sur Android][6] pour en savoir plus). Pour des raisons de sécurité, vous devez utiliser un token client : il n'est pas possible d'utiliser des [clés d'API Datadog][3] pour configurer la bibliothèque `dd-sdk-android`. En effet, elles risqueraient d'être exposées côté client dans le bytecode de l'APK de l'application Android. Pour en savoir plus sur la configuration d'un token client, consultez la [documentation dédiée][2] :

   {{< tabs >}}
   {{% tab "Site américain" %}}
   ```kotlin
    class SampleApplication : Application() {
        override fun onCreate() {
            super.onCreate()
            val configuration = Configuration.Builder().build()
            val credentials = Credentials(<CLIENT_TOKEN>,<ENV_NAME>,<APP_VARIANT_NAME>,<APPLICATION_ID>)
            Datadog.initialize(this, credentials, configuration, trackingConsent)
        }
    }
   ```
   {{% /tab %}}
   {{% tab "Site européen" %}}
   ```kotlin
   class SampleApplication : Application() {
       override fun onCreate() {
          super.onCreate()
          val configuration = Configuration.Builder()
             .useEUEndpoints()
             .build()
          val credentials = Credentials(<CLIENT_TOKEN>,<ENV_NAME>,<APP_VARIANT_NAME>,<APPLICATION_ID>)
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

   Attention, vous devez également spécifier le nom de la variante de votre application dans les identifiants requis pour l'initialisation. Cette opération est primordiale, car elle permet d'importer automatiquement le bon fichier `mapping.txt` ProGuard au moment de la génération. Un dashboard Datadog peut alors annuler l'obfuscation des stack traces.

   Utilisez la méthode utilitaire `isInitialized` pour vérifier que le SDK est bien initialisé :

   ```kotlin
    if(Datadog.isInitialized()){
        // your code here
    }
   ```
   Lors de la création de votre application, vous pouvez activer les logs de développement en appelant la méthode `setVerbosity`. Tous les messages internes de la bibliothèque dont la priorité est supérieure ou égale au niveau spécifié sont alors enregistrés dans le Logcat Android :
   ```kotlin
   Datadog.setVerbosity(Log.INFO)
   ```

3. Configurer le logger Android :

    ```kotlin
    val logger = Logger.Builder()
        .setNetworkInfoEnabled(true)
        .setLogcatLogsEnabled(true)
        .setDatadogLogsEnabled(true)
        .setBundleWithTraceEnabled(true)
        .setLoggerName("<LOGGER_NAME>")
        .build();
    ```

4. Envoyez une entrée de log personnalisée directement à Datadog avec l'une des fonctions suivantes :

    ```kotlin
    logger.d("A debug message.")
    logger.i("Some relevant information ?")
    logger.w("An important warning…")
    logger.e("An error was met!")
    logger.wtf("What a Terrible Failure!")
    ```

    Les exceptions interceptées peuvent être envoyées avec un message :

    ```kotlin
    try {
        doSomething()
    } catch (e : IOException) {
        logger.e("Error while doing something", e)
    }
    ```

    **Remarque** : toutes les méthodes de logging peuvent avoir un Throwable qui leur est associé.

5. (Facultatif) - Fournissez une map avec votre message de log pour ajouter des attributs au log envoyé. Chaque entrée de la map est ajoutée en tant qu'attribut.

    ```kotlin
    logger.i("onPageStarted", attributes = mapOf("http.url", url))
    ```

    En Java, cela donnerait :

    ```java
    Logger.d(
            "onPageStarted",
            null,
            new HashMap<String, Object>() {{
                put("http.url", url);
            }}
    );
    ```

## Logging avancé

### Initialisation de la bibliothèque

Les méthodes suivantes dans `DatadogConfig.Builder` peuvent être utilisées lors de la création de la configuration Datadog pour initialiser la bibliothèque :

| Méthode                           | Description                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setServiceName(<NOM_SERVICE>)` | Définir `<NOM_SERVICE>` en tant que valeur par défaut pour l'[attribut standard][4] `service` joint à tous les logs envoyés à Datadog (cette valeur peut être remplacée dans chaque logger).                                                                                                                                                           |
| `setLogsEnabled(true)`     | Définir sur `true` pour activer l'envoi de logs à Datadog.                                                                                                                                                                                                                                  |
| `addPlugin(DatadogPlugin, Feature)`   | Ajoute une implémentation de plugin pour une fonctionnalité spécifique (CRASH, LOG, TRACE, RUM). Le plugin sera enregistré une fois la fonctionnalité réinitialisée, puis désenregistré lorsque la fonctionnalité sera arrêtée. |

### Initialisation du logger

Les méthodes suivantes dans `Logger.Builder` peuvent être utilisées lors de l'initialisation du logger afin d'envoyer des logs à Datadog :

| Méthode                           | Description                                                                                                                                                                                                                                                             |
|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `setNetworkInfoEnabled(true)`    | Ajouter l'attribut `network.client.connectivity` à tous les logs. Les données enregistrées par défaut sont `connectivity` (`Wifi`, `3G`, `4G`, etc.) et `carrier_name` (`AT&T - US`). `carrier_name` est seulement disponible à partir du niveau d'API 28 d'Android.                                     |
| `setServiceName(<NOM_SERVICE>)` | Définir `<NOM_SERVICE>` en tant que valeur pour l'[attribut standard][4] `service` joint à tous les logs envoyés à Datadog.                                                                                                                                                           |
| `setLogcatLogsEnabled(true)`     | Définir ce paramètre sur `true` pour utiliser Logcat en tant que logger.                                                                                                                                                                                                                                  |
| `setDatadogLogsEnabled(true)`    | Définir ce paramètre sur `true` pour envoyer les logs à Datadog.                                                                                                                                                                                                                                  |
| `setBundleWithTraceEnabled(true)`| Définir sur `true` (valeur par défaut) pour associer les logs à la trace active dans votre application. Ce paramètre vous permet de visualiser tous les logs envoyés lors d'une trace spécifique depuis le dashboard Datadog.                                                        |
| `setBundleWithRumEnabled(true)`| Définir sur `true` (valeur par défaut) pour associer les logs au contexte RUM actuel dans votre application. Ce paramètre vous permet de visualiser tous les logs envoyés pendant qu'une vue spécifique est active depuis le RUM Explorer Datadog.                                                        |
| `setLoggerName(<NOM_LOGGER>)`   | Définir `<NOM_LOGGER>` en tant que valeur pour l'attribut `logger.name` joint à tous les logs envoyés à Datadog.                                                                                                                                                                  |
| `setVerbosity(Log.INFO)`         | Définir le niveau de détail du logger. Tous les messages internes dans la bibliothèque dont la priorité est égale ou supérieure au niveau spécifié sont enregistrés dans le Logcat d'Android.                                                                                                       |
| `setSampleRate(<TAUX_ÉCHANTILLONNAGE>)`   | Définir le taux d'échantillonnage de ce logger. Tous les logs générés par l'instance du logger sont échantillonnés de manière aléatoire selon le taux d'échantillonnage fourni (par défaut 1.0 = tous les logs). **Remarque** : les logs Logcat ne sont pas échantillonnés.            |
| `build()`                        | Créer une instance de logger avec toutes les options définies.                                                                                                                                                                                                                       |

### Configuration globale

Vous trouverez ci-dessous les fonctions pour ajouter/supprimer des tags et des attributs de tous les logs envoyés par un logger donné.

#### Global tags

##### Ajouter des tags

Utilisez la fonction `addTag("<CLÉ_TAG>","<VALEUR_TAG>")` pour ajouter des tags à tous les logs envoyés par un logger spécifique :

```kotlin
// Ajouter un tag build_type:debug ou build_type:release
logger.addTag("build_type", BuildConfig.BUILD_TYPE)

// Ajouter un tag device:android
logger.addTag("device", "android")
```

**Remarque** : `<VALEUR_TAG>` doit être une chaîne.

##### Supprimer des tags

Utilisez la fonction `removeTagsWithKey("<CLÉ_TAG>")` pour supprimer des tags de tous les logs envoyés par un logger spécifique :

```kotlin
// Supprimer tous les tags commençant par build_type
logger.removeTagsWithKey("build_type")
```

[En savoir plus sur les tags Datadog][5].

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

**Remarque** : `<VALEUR_ATTRIBUT>` peut être une date ou une chaîne primitive.

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

## Extensions

### Timber

Si votre codebase existante utilise Timber, vous pouvez transmettre tous ces logs à Datadog automatiquement à l'aide de la [bibliothèque dédiée](https://github.com/DataDog/dd-sdk-android/tree/master/dd-sdk-android-timber).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#client-tokens
[3]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[4]: https://docs.datadoghq.com/fr/logs/processing/attributes_naming_convention/
[5]: https://docs.datadoghq.com/fr/tagging/
[6]: https://docs.datadoghq.com/fr/real_user_monitoring/android/?tab=us