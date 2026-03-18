---
code_lang: android
code_lang_weight: 10
description: Configurez le suivi des erreurs pour vos applications Android afin de
  surveiller les plantages, les exceptions et les erreurs d'application.
further_reading:
- link: /error_tracking/frontend
  tag: Documentation
  text: Suivi des erreurs côté client
- link: https://github.com/DataDog/dd-sdk-android
  tag: Source Code
  text: Code source de ddsdkandroid
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Commencez à utiliser le suivi des erreurs
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Afficher les données de suivi des erreurs dans l'Explorateur
title: Signalement des plantages et suivi des erreurs sur Android
type: multi-code-lang
---
## Aperçu 

Android [Suivi des erreurs][1] vous offre une visibilité complète sur l'état de santé de votre application mobile en enregistrant automatiquement les plantages, les exceptions et les erreurs. Grâce à cette fonctionnalité, vous pouvez :

 Surveillez la stabilité de votre application en temps réel grâce à des alertes immédiates en cas de plantage et au suivi du taux d'erreurs sur l'ensemble des versions, des appareils et des segments d'utilisateurs.
 Déboguez plus rapidement les problèmes grâce à des traces de pile désobfusquées et au téléchargement automatique des fichiers de mappage ProGuard, ce qui facilite l'identification des problèmes.
 Améliorez la qualité de l'application en identifiant les fonctionnalités susceptibles de provoquer des plantages, en suivant l'évolution des erreurs et en hiérarchisant les corrections afin d'accroître la satisfaction des utilisateurs.
 Accédez aux tableaux de bord et aux attributs agrégés relatifs aux plantages sur Android.
 Consultez les rapports de plantage Android déchiffrés, accompagnés d'une analyse des tendances.

Le SDK Android de Datadog prend en charge Android 5.0 et versions ultérieures (niveau d'API 21) ainsi qu'Android TV.

Vos rapports d'erreurs apparaissent dans [**Suivi des erreurs**][2].

## Configuration 

Si vous n'avez pas encore installé le SDK Android, suivez les [instructions d'installation dans l'application][3] ou consultez la [documentation d'installation Android][4].

### Étape 1  Déclarer le SDK Android comme dépendance

Déclarez [ddsdkandroidrum][5] et le [plugin Gradle][6] comme dépendances dans le fichier `build.gradle` de votre **module d'application** :

```groovy```
buildscript {
    dependencies {
        classpath("com.datadoghq:dd-sdk-android-gradle-plugin:x.x.x")
    }
}
plugins {
    id("com.datadoghq.dd-sdk-android-gradle-plugin")
    //(...)
}
android {
    //(...)
}
dependencies {
    implementation "com.datadoghq:dd-sdk-android-rum:x.x.x" 
    //(...)
}

```

### Étape 2  Indiquez les détails de l'application dans l'interface utilisateur

1. Accédez à [**Erreurs** > **Paramètres** > **Navigateur et mobile** > **+ Nouvelle application**][7].
2. Sélectionnez « android » comme type d'application et saisissez un nom d'application pour générer un identifiant d'application Datadog unique et un jeton client.
3. Cliquez sur **Créer une demande**.



### Étape 3  Initialiser le SDK Datadog avec le contexte de l'application

#### Mettre à jour l'extrait de code d'initialisation

Dans l'extrait de code d'initialisation, définissez un nom d'environnement, un nom de service et un numéro de version. Dans les exemples ci-dessous, `APP_VARIANT_NAME` désigne la variante de l'application qui génère les données. Pour plus d'informations, consultez la section [Utilisation des balises][10].

Lors de l'initialisation, vous pouvez également définir la fréquence d'échantillonnage (sessions RUM) et configurer le consentement au suivi afin de respecter le RGPD, comme décrit ci-dessous. Consultez [les autres options de configuration][11] pour initialiser la bibliothèque.

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

{{< site-region region="ap2" >}}
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
        Configuration configuration =
                new Configuration.Builder(<CLIENT_TOKEN>, <ENV_NAME>, <APP_VARIANT_NAME>)
                        .useSite(DatadogSite.AP2)
                        .build();
        Datadog.initialize(this, configuration, trackingConsent);
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

Les informations d'identification d'initialisation nécessitent le nom de variante de votre application et utilisent la valeur de `BuildConfig.FLAVOR`. Grâce à cette variante, le SDK peut faire correspondre les erreurs signalées par votre application aux fichiers de mappage téléchargés par le plugin Gradle. Si vous n'avez pas de variantes, les identifiants utilisent une chaîne vide.

Le plugin Gradle télécharge automatiquement le fichier `mapping.txt` ProGuard correspondant lors de la compilation, ce qui vous permet de consulter les traces de pile d'erreurs désobfuscées. Pour plus d'informations, consultez la section [Télécharger votre fichier de mappage](#uploadyourmappingfile).

#### Activez cette fonctionnalité pour commencer à envoyer des données

Pour permettre au SDK Android de commencer à envoyer des données :

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
    .useViewTrackingStrategy(strategy)
    .build()
Rum.enable(rumConfig)
```
{{% /tab %}}

{{% tab "Java" %}}
```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold) // Not applicable to Error Tracking
    .useViewTrackingStrategy(strategy)
    .build();
Rum.enable(rumConfig);
```

{{% /tab %}}
{{< /tabs >}}

Consultez [`ViewTrackingStrategy`][12] pour activer le suivi automatique de toutes vos vues (activités, fragments, etc.).

#### Intégrez des outils de mesure dans vos pages Web (facultatif)

Si votre application Android utilise des WebViews pour afficher du contenu Web, vous pouvez les configurer pour suivre les erreurs JavaScript et les plantages qui se produisent au sein de ce contenu.

Pour intégrer des balises de suivi à vos pages Web :

1. Ajoutez la dépendance Gradle en déclarant « ddsdkandroidwebview » comme dépendance dans votre fichier build.gradle :

   ```groovy```
   dependencies {
    implementation "com.datadoghq:dd-sdk-android-webview:<latest_version>"
   }
   ```
2. Activez le suivi WebView pour une instance WebView donnée en fournissant une liste d'hôtes à suivre :

   ```kotlin
   WebViewTracking.enable(webView, hosts)
   ```

Pour plus d'informations, consultez la section [Suivi des pages Web][8].

### Étape 4  Ajouter le système de signalement des plantages NDK

Si votre application Android utilise du code natif (C/C++) via l'Android NDK (Native Development Kit), vous pouvez suivre les plantages qui se produisent dans ce code natif. Le code natif est souvent utilisé pour les opérations où les performances sont essentielles, le traitement d'images ou lors de la réutilisation de bibliothèques C/C++ existantes.

Sans le système de signalement des plantages du NDK, les plantages survenant dans votre code natif n'apparaissent pas dans le suivi des erreurs, ce qui complique le débogage des problèmes dans cette partie de votre application.

Pour activer la notification des plantages via le NDK, utilisez le plugin Datadog pour NDK :

1. Ajoutez la dépendance Gradle en déclarant la bibliothèque comme dépendance dans votre fichier `build.gradle` :

   ```kotlin
    dependencies {
        implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
        //(...)
    }
   ```
2. Activez la collecte des plantages NDK après avoir initialisé le SDK :

    ```kotlin
    NdkCrashReports.enable()
    ```

### Étape 5  Ajouter la fonctionnalité de rapport ANR

Une erreur « Application ne répond pas » ([ANR][18]) est un type d'erreur propre à Android qui se produit lorsque l'application reste inactive pendant trop longtemps. Vous pouvez ajouter la fonctionnalité de rapport ANR à votre configuration RUM afin de surveiller ces problèmes de réactivité des applications.

Pour activer la génération de rapports ANR, ajoutez les éléments suivants à votre configuration RUM :

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold)
    .trackNonFatalAnrs(true) // Enable non-fatal ANR reporting
    .useViewTrackingStrategy(strategy)
    .build()
Rum.enable(rumConfig)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
RumConfiguration rumConfig = new RumConfiguration.Builder(applicationId)
    .trackUserInteractions()
    .trackLongTasks(durationThreshold)
    .trackNonFatalAnrs(true) // Enable non-fatal ANR reporting
    .useViewTrackingStrategy(strategy)
    .build();
Rum.enable(rumConfig);
```
{{% /tab %}}
{{< /tabs >}}

Les ANR ne sont signalés que via le SDK (et non via les journaux).

#### Déclaration des incidents liés à l'ANR ayant entraîné le décès
Les ANR fatales entraînent des accidents. L'application signale ces incidents lorsqu'elle ne répond plus, ce qui amène le système d'exploitation Android à afficher une fenêtre contextuelle à l'utilisateur, qui choisit alors de forcer la fermeture de l'application via cette fenêtre.

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="Un rapport d'erreur fatale dans le suivi des erreurs." >}}

 Sur la page **Suivi des erreurs**, les ANR fatales sont regroupées en fonction de leur similitude, ce qui peut entraîner la création de plusieurs **problèmes distincts**.
 Par défaut, Datadog détecte les ANR fatales via l'API [ApplicationExitInfo][19] (disponible depuis *[Android 30+][20]*), dont les données peuvent être consultées au prochain lancement de l'application.
 Dans *[Android 29][21] et les versions antérieures*, il n'est pas possible de générer des rapports sur les ANR fatales.

#### Déclaration des effets indésirables non mortels
Les ANR non fatales peuvent avoir entraîné ou non l'arrêt de l'application (plantage).

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="Un rapport d'erreur non fatale dans le suivi des erreurs." >}}

 Sur la page **Suivi des erreurs**, les ANR non fatales sont regroupées sous un **seul** problème en raison de leur niveau de bruit.
 Par défaut, la notification des ANR non fatales sur *Android 30+* est **désactivée**, car cela risquerait de masquer les ANR fatales. Sur *Android 29* et les versions antérieures, cependant, la notification des ANR non fatales est **activée** par défaut, car les ANR fatales ne peuvent pas être signalées sur ces versions.

Quelle que soit la version d'Android, vous pouvez modifier le paramètre par défaut concernant le signalement des ANR non fatals en définissant `trackNonFatalAnrs` sur `true` ou `false` lors de l'initialisation du SDK.


### Étape 6 : Obtenir les traces de pile désobfusquées

Lorsque votre application Android est compilée pour la production, le code est généralement obscurci à l'aide de ProGuard ou de R8 afin de réduire la taille de l'application et de protéger la propriété intellectuelle. Cette obscurcissement rend les traces de pile dans les rapports d'erreur illisibles, affichant des noms de classes et de méthodes dénués de sens tels que `a.b.c()` au lieu de `com.example.MyClass.myMethod()`.

Pour que ces traces de pile soient lisibles à des fins de débogage, vous devez télécharger vos fichiers de mappage vers Datadog. Ces fichiers contiennent la correspondance entre le code obscurci et le code d'origine, ce qui permet à Datadog de désobscurcir automatiquement les traces de pile dans vos rapports d'erreur.

#### Comment ça marche

Datadog utilise un identifiant de build unique généré pour chaque build afin de faire correspondre automatiquement les traces de pile aux fichiers de mappage appropriés. Cela garantit que :

 Les traces de pile sont toujours désobfusquées à l'aide du fichier de mappage approprié, quelle que soit la date à laquelle celui-ci a été téléchargé.
 Vous pouvez importer des fichiers de mappage lors des versions de préproduction ou de production.
 Le processus fonctionne de manière transparente entre les différentes variantes de compilation et les différents environnements.

La procédure de mise en correspondance dépend de la version de votre [plugin Gradle pour Android][22] :

 **Versions 1.13.0 et ultérieures** : utilise le champ `build_id` (nécessite le SDK Android Datadog 2.8.0 ou une version ultérieure)
 **Anciennes versions** : utilise une combinaison des champs `service`, `version` et `variant`

#### Téléchargez votre fichier de mappage

Le plugin Gradle pour Android automatise le processus de téléchargement des fichiers de mappage. Une fois la configuration effectuée, le fichier de mappage ProGuard/R8 correspondant à chaque variante de compilation est automatiquement téléchargé lorsque vous compilez votre application.

**Remarque** : le fait de télécharger à nouveau un fichier de mappage ne remplace pas celui qui existe déjà si la version n'a pas changé. Pour plus d'informations sur les limites de taille des fichiers et autres contraintes, consultez la section [Limitations](#limitations).

#### Exécuter les tâches de téléchargement

Une fois le plugin configuré, exécutez les tâches Gradle pour télécharger votre fichier de mappage Proguard/R8 et vos fichiers de symboles NDK vers Datadog :

```bash
./gradlew uploadMappingRelease
./gradlew uploadNdkSymbolFilesRelease
```

Pour chaque erreur, vous pouvez accéder au chemin d'accès du fichier, au numéro de ligne et à un extrait de code pour chaque étape de la trace de pile correspondante.

{{< tabs >}}
{{% tab "ÉTATS-UNIS" %}}

1. Ajoutez le [plugin Gradle pour Android][22] à votre projet Gradle à l'aide de l'extrait de code suivant.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Créez une clé API Datadog dédiée][23] et exportez-la sous forme de variable d'environnement nommée `DD_API_KEY` ou `DATADOG_API_KEY`. Vous pouvez également la transmettre en tant que propriété de la tâche ; si vous disposez d'un fichier `datadogci.json` à la racine de votre projet, elle peut être récupérée à partir de la propriété `apiKey` qui s'y trouve.
3. Si vous le souhaitez, vous pouvez configurer le plugin pour qu'il télécharge les fichiers vers la région UE en modifiant le script `build.gradle` :
   
   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Lancez la tâche de téléchargement une fois que vos APK obfusqués ont été générés :
    
   ```bash
   ./gradlew uploadMappingRelease
   ```

5. Si vous exécutez du code natif, lancez la tâche de téléchargement des symboles NDK :
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Remarque** : si votre projet utilise des variantes supplémentaires, le plugin propose une tâche de téléchargement pour chaque variante avec l'obfuscation activée. Dans ce cas, initialisez le SDK Android en indiquant un nom de variante valide (l'API nécessaire est disponible à partir de la version `1.8.0`).

[22] : https://github.com/DataDog/ddsdkandroidgradleplugin
[23] : https://app.datadoghq.com/organizationsettings/apikeys
{{% /tab %}}
{{% tab "UE" %}}
1. Ajoutez le [plugin Gradle pour Android][22] à votre projet Gradle à l'aide de l'extrait de code suivant.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Créez une clé API Datadog dédiée][23] et exportez-la sous forme de variable d'environnement nommée `DD_API_KEY` ou `DATADOG_API_KEY`. Vous pouvez également la transmettre en tant que propriété de la tâche ; si vous disposez d'un fichier `datadogci.json` à la racine de votre projet, elle peut être récupérée à partir de la propriété `apiKey` qui s'y trouve.
3. Configurez le plugin pour qu'il utilise la région UE en ajoutant l'extrait de code suivant dans le fichier `build.gradle` de votre application :

   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Lancez la tâche de téléchargement une fois que vos APK obfusqués ont été générés :
   
   ```bash
   ./gradlew uploadMappingRelease
   ```
   
5. Si vous exécutez du code natif, lancez la tâche de téléchargement des symboles NDK :
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Remarque** : si votre projet utilise des variantes supplémentaires, le plugin propose une tâche de téléchargement pour chaque variante avec l'obfuscation activée. Dans ce cas, initialisez le SDK Android en indiquant un nom de variante valide (l'API nécessaire est disponible à partir de la version `1.8.0`).

[22] : https://github.com/DataDog/ddsdkandroidgradleplugin
[23] : https://app.datadoghq.com/organizationsettings/apikeys
{{% /tab %}}
{{< /tabs >}}

#### Liste des fichiers de mappage téléchargés

Consultez la page [Symboles de débogage RUM][24] pour voir tous les symboles téléchargés.

## Fonctionnalités avancées de suivi des erreurs

{{% collapse-content title="Définir le consentement au suivi (conformité au RGPD)" level="h4" expanded=false id="set-tracking-consent" %}}

Pour se conformer au règlement RGPD, le SDK nécessite la valeur du consentement au suivi lors de son initialisation.

Le paramètre « Tracking consent » peut prendre l'une des valeurs suivantes :

 `TrackingConsent.PENDING` : (Par défaut) Le SDK commence à collecter et à regrouper les données, mais ne les envoie pas au
 point de terminaison de la collecte. Le SDK attend la nouvelle valeur de consentement au suivi pour déterminer comment traiter les données regroupées.
 `TrackingConsent.GRANTED` : Le SDK commence à collecter les données et les envoie au point de terminaison de collecte de données.
 `TrackingConsent.NOT_GRANTED` : Le SDK ne collecte aucune donnée. Vous ne pouvez pas envoyer manuellement de journaux, de traces ou d'événements.

Pour **mettre à jour le consentement au suivi** après l'initialisation du SDK, appelez `Datadog.setTrackingConsent(<NEW CONSENT>)`. Le SDK adapte son fonctionnement en fonction du nouveau consentement. Par exemple, si le consentement de suivi actuel est `TrackingConsent.PENDING` et que vous le mettez à jour comme suit :

 `TrackingConsent.GRANTED` : Le SDK envoie toutes les données groupées actuelles et les données futures directement au point de terminaison de collecte de données.
 `TrackingConsent.NOT_GRANTED` : Le SDK efface toutes les données traitées par lots et ne collecte plus aucune donnée par la suite.

{{% /collapse-content %}}

{{% collapse-content title="Exemples de tarifs pour une séance" level="h4" expanded=false id="sample-session-rates" %}}

Pour contrôler les données que votre application envoie à Datadog, vous pouvez définir une fréquence d'échantillonnage pour les sessions lors de l'[initialisation de RUM][11]. Le taux d'échantillonnage est un pourcentage compris entre 0 et 100. Par défaut, `sessionSamplingRate` est défini sur 100 (conserver toutes les sessions).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

{{% /collapse-content %}}

{{% collapse-content title="Initialiser l'intercepteur pour surveiller les événements réseau" level="h4" expanded=false id="interceptor" %}}

L'intercepteur réseau suit automatiquement les requêtes et les réponses HTTP, en détectant les erreurs réseau, les délais d'expiration et les problèmes de performances, ce qui vous permet d'établir un lien entre les problèmes réseau et les plantages d'applications ainsi que les problèmes d'expérience utilisateur. Pour initialiser un intercepteur destiné à surveiller les événements réseau :

1. Pour le traçage distribué, [ajoutez et activez la fonctionnalité Trace][13].
2. Ajoutez la dépendance Gradle à la bibliothèque `ddsdkandroidokhttp` dans le fichier `build.gradle` au niveau du module :

    ```groovy```
    dependencies {
        implementation "com.datadoghq:dd-sdk-android-okhttp:x.x.x"
    }
    ```

3. Pour suivre vos requêtes OkHttp en tant que ressources, ajoutez l'[intercepteur][14] fourni :

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val tracedHostsWithHeaderType = mapOf(
    "example.com" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT),
    "example.eu" to setOf(
        TracingHeaderType.DATADOG,
        TracingHeaderType.TRACECONTEXT))
val okHttpClient = OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}

{{% tab "Java" %}}

```java
Map<String, Set<TracingHeaderType>> tracedHostsWithHeaderType = new HashMap<>();
Set<TracingHeaderType> datadogAndW3HeadersTypes = new HashSet<>(Arrays.asList(TracingHeaderType.DATADOG, TracingHeaderType.TRACECONTEXT));
tracedHostsWithHeaderType.put("example.com", datadogAndW3HeadersTypes);
tracedHostsWithHeaderType.put("example.eu", datadogAndW3HeadersTypes);
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

4. Pour créer automatiquement des ressources RUM et des segments pour vos requêtes OkHttp, utilisez `DatadogInterceptor` comme intercepteur.
    Cette fonctionnalité enregistre chaque requête traitée par `OkHttpClient` en tant que ressource, avec toutes les informations pertinentes (URL, méthode, code d'état et erreur) renseignées automatiquement. Seules les requêtes réseau lancées alors qu'une vue est active sont suivies. Pour suivre les requêtes lorsque votre application est en arrière-plan, [créez une vue manuellement][15].
      
5. Pour surveiller les redirections ou les nouvelles tentatives au niveau du réseau, vous pouvez utiliser `DatadogInterceptor` comme [intercepteur réseau][16] :

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient = OkHttpClient.Builder()
    .addNetworkInterceptor(DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
OkHttpClient okHttpClient = new OkHttpClient.Builder()
    .addNetworkInterceptor(new DatadogInterceptor.Builder(tracedHostsWithHeaderType).build())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

**Remarques** :
 Pour utiliser les spans sans recourir aux ressources RUM, vous pouvez utiliser `TracingInterceptor` à la place de `DatadogInterceptor`, comme décrit ci-dessus.
 Si vous utilisez plusieurs intercepteurs, ajoutez d'abord `DatadogInterceptor`.

Vous pouvez également ajouter un `EventListener` à l'`OkHttpClient` afin de [suivre automatiquement les délais d'accès aux ressources][17] pour les fournisseurs tiers et les requêtes réseau.

{{% /collapse-content %}}

{{% collapse-content title="Suivre les événements en arrière-plan" level="h4" expanded=false id="track-background-events" %}}

Vous pouvez suivre des événements tels que les plantages et les requêtes réseau lorsque votre application est en arrière-plan (par exemple, lorsqu'aucune vue n'est active). 

Ajoutez l'extrait de code suivant lors de la configuration :

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
.trackBackgroundEvents(true)
```
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-info"><p>Tracking background events may lead to additional sessions, which can impact billing. For questions, <a href="https://docs.datadoghq.com/help/">contact Datadog support.</a></p>
</div>

{{% /collapse-content %}}

{{% collapse-content title="Envoi de données lorsque l'appareil est hors ligne" level="h4" expanded=false id="sending-data-device-offline" %}}

Le SDK Android garantit la disponibilité des données lorsque l'appareil de l'utilisateur est hors ligne. Dans les zones où la couverture réseau est faible, ou lorsque la batterie de l'appareil est trop faible, tous les événements sont d'abord enregistrés par lots sur l'appareil local. 

Chaque lot est conforme aux spécifications d'entrée. Les lots sont envoyés dès que le réseau est disponible et que le niveau de la batterie est suffisamment élevé pour garantir que le SDK Datadog n'affecte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible alors que votre application est au premier plan, ou si le téléchargement des données échoue, le lot est conservé jusqu'à ce qu'il puisse être envoyé avec succès.
 
Cela signifie que même si les utilisateurs ouvrent votre application hors ligne, aucune donnée n'est perdue. Pour éviter que le SDK n'occupe trop d'espace disque, les données stockées sur le disque sont automatiquement supprimées lorsqu'elles deviennent trop anciennes.

{{% /collapse-content %}}

{{% collapse-content title="Options de configuration du plugin" level="h4" expanded=false id="plugin-config-options" %}}

Plusieurs propriétés du plugin peuvent être configurées via l'extension du plugin. Si vous utilisez plusieurs variantes, vous pouvez définir une valeur de propriété pour une variante spécifique au sein de la variante.

Par exemple, pour une variante « fooBarRelease », vous pouvez utiliser la configuration suivante :

```kotlin
datadog {
    foo {
        versionName = "foo"
    }
    bar {
        versionName = "bar"
    }
    fooBar {
        versionName = "fooBar"
    }
}
```

La configuration de la tâche pour cette variante est obtenue en fusionnant les trois configurations de variante fournies dans l'ordre suivant :

1. `bar`
2. `foo`
3. `fooBar`

Cela attribue la valeur finale « fooBar » à la propriété `versionName`.

| Nom de la propriété              | Description                                                                                                                                                                                               |
|||
| `versionName`              | Le nom de la version de l'application (par défaut, la version déclarée dans le bloc `android` de votre script `build.gradle`).                                                                                                               |
| `serviceName`              | Le nom du service de l'application (par défaut, le nom du package de votre application tel qu'il est déclaré dans le bloc `android` de votre script `build.gradle`).                                                                                                                          |
| `site`                     | Le site Datadog sur lequel vous souhaitez télécharger vos données (US1, US3, US5, EU1, US1_FED, AP1 ou AP2).                                                                                                                                       |
| `remoteRepositoryUrl`      | L'URL du dépôt distant sur lequel le code source a été déployé. Si cette valeur n'est pas fournie, elle est déterminée à partir de votre configuration Git au moment de l'exécution de la tâche.                     |
| `checkProjectDependencies` | Cette propriété permet de déterminer si le plugin doit vérifier si le SDK Android de Datadog figure parmi les dépendances. Sinon, `none` est ignoré, `warn` génère un message d'avertissement et `fail` interrompt la compilation avec une erreur (par défaut). |

{{% /collapse-content %}}

{{% collapse-content title="Intégrer à un pipeline CI/CD" level="h4" expanded=false id="plugin-config-options" %}}

Par défaut, la tâche de mappage de téléchargement est indépendante des autres tâches du graphe de build. Exécutez la tâche manuellement lorsque vous devez importer un mappage.

Si vous souhaitez exécuter cette tâche dans un pipeline CI/CD et que celle-ci est obligatoire dans le graphe de construction, vous pouvez configurer la tâche de téléchargement pour qu'elle s'exécute après la génération du fichier de mappage.

Par exemple :

```kotlin
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```
{{% /collapse-content %}}

## Limites

### Taille des fichiers
La taille des [fichiers de mappage](#uploadyourmappingfile) est limitée à **500 Mo** chacun. Si le fichier de mappage de votre projet dépasse cette taille, utilisez l'une des options suivantes pour réduire la taille du fichier :

 Définissez l'option `mappingFileTrimIndents` sur `true`. Cela réduit la taille de votre fichier de 5 % en moyenne.
 Définissez une correspondance pour `mappingFilePackagesAliases` : cela permet de remplacer les noms de paquets par des alias plus courts. **Remarque** : la trace de pile de Datadog utilise cet alias à la place du nom de paquet d'origine ; il est donc préférable d'utiliser cette option pour les dépendances tierces.

```kotlin
datadog {
    mappingFileTrimIndents = true
    mappingFilePackageAliases = mapOf(
        "kotlinx.coroutines" to "kx.cor",
        "com.google.android.material" to "material",
        "com.google.gson" to "gson",
        "com.squareup.picasso" to "picasso"
    )
}
```

### Collection
Lorsque vous examinez le comportement du système de signalement des plantages RUM pour Android, tenez compte des éléments suivants :

 Le plantage ne peut être détecté qu'après l'initialisation du SDK. Dans ces conditions, il est recommandé d'initialiser le SDK dès que possible dans la méthode `onCreate` de votre application.
 Les incidents RUM doivent être associés à une vue RUM. Si un plantage survient avant qu'une vue ne soit visible (généralement une activité ou un fragment dans l'état `onResume`) ou après que l'application a été mise en arrière-plan par l'utilisateur qui a quitté l'application, le plantage est ignoré et n'est pas signalé pour être collecté. Pour pallier ce problème, utilisez la méthode `trackBackgroundEvents()` [25] dans votre constructeur `RumConfiguration`.
 Seuls les plantages survenant au cours des sessions échantillonnées sont conservés. Si le [taux d'échantillonnage de la session n'est pas de 100 %][24], certains plantages ne sont pas signalés. 

## Testez votre implémentation

Pour vérifier la configuration de votre système de signalement des plantages et de suivi des erreurs sur Android, vous devez provoquer un plantage dans votre application et vérifier que l'erreur apparaît bien dans Datadog.

Pour tester votre implémentation :

1. Lancez votre application sur un émulateur Android ou sur un appareil réel.
2. Exécutez un code contenant une erreur ou provoquant un plantage. Par exemple :

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. Une fois le plantage survenu, redémarrez votre application et attendez que le SDK Android envoie le rapport de plantage dans [**Suivi des erreurs**][2].

## Extensions Kotlin

### Extension `Closeable`

Vous pouvez surveiller l'utilisation des instances `Closeable` à l'aide de la méthode `useMonitored`, qui signale les erreurs à Datadog et ferme ensuite la ressource :

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}
```

### Suivre les actifs locaux en tant que ressources

Vous pouvez suivre l'accès aux ressources à l'aide de la méthode d'extension `getAssetAsRumResource` :

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

L'utilisation des ressources locales peut être suivie à l'aide de la méthode d'extension `getRawResAsRumResource` :

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## Pour en savoir plus

{{< partial name="whats-next/whats-next.html" >}}

[1] : /suivi_des_erreurs/
[2] : https://app.datadoghq.com/rum/errortracking
[3] : https://app.datadoghq.com/rum/application/create
[4] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/android/configuration/#configuration
[5] : https://github.com/DataDog/ddsdkandroid/tree/develop/features/ddsdkandroidrum
[6] : https://github.com/DataDog/ddsdkandroidgradleplugin
[7] : https://app.datadoghq.com/errortracking/settings/setup/client
[8] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/android/suivi_des_vues_web/
[9] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/android/données_collectées/
[10] : /premiers_pas/mise_en_balise/utilisation_des_balises/
[11] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/android/configuration_avancée/#paramètres_d'initialisation
[12] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/android/configuration_avancée/#suivi_automatique_des_vues
[13] : /tracing/trace_collection/automatic_instrumentation/dd_libraries/android/
[14] : https://square.github.io/okhttp/features/interceptors/
[15] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/android/configuration_avancée/#vues_personnalisées
[16] : https://square.github.io/okhttp/features/interceptors/#networkinterceptors
[17] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/android/configuration_avancée/#suivi_automatique_des_requêtes_réseau
[18] : https://developer.android.com/topic/performance/vitals/anr
[19] : https://developer.android.com/reference/android/app/ApplicationExitInfo
[20] : https://developer.android.com/tools/releases/platforms#11
[21] : https://developer.android.com/tools/releases/platforms#10
[22] : https://github.com/DataDog/ddsdkandroidgradleplugin
[23] : https://app.datadoghq.com/organizationsettings/apikeys
[24] : https://app.datadoghq.com/sourcecode/setup/rum
[25] : /surveillance_des_utilisateurs_réels/surveillance_des_applications/android/configuration/#suivi_des_événements_en_arrière-plan