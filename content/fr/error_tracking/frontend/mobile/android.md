---
code_lang: android
code_lang_weight: 10
description: Configurez le suivi des erreurs pour vos applications Android afin de
  surveiller les plantages, les exceptions et les erreurs d'application.
further_reading:
- link: /error_tracking/frontend
  tag: Documentation
  text: Suivi des erreurs Frontend
- link: https://github.com/DataDog/dd-sdk-android
  tag: Source Code
  text: Code source pour ddsdkandroid
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: Commencez avec le suivi des erreurs
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: Visualisez les données de suivi des erreurs dans l'Explorateur
title: Rapport de plantage Android et suivi des erreurs
type: multi-code-lang
---
## Aperçu

Le [suivi des erreurs Android][1] vous offre une visibilité complète sur la santé de votre application mobile en capturant automatiquement les plantages, les exceptions et les erreurs. Avec cette fonctionnalité, vous pouvez :

- Surveiller la stabilité de l'application en temps réel avec des alertes instantanées de plantage et un suivi du taux d'erreur à travers les versions, les appareils et les segments d'utilisateurs.
- Déboguer les problèmes plus rapidement avec des traces de pile déobfusquées et des téléchargements automatiques de fichiers de mappage ProGuard pour une identification plus facile des problèmes.
- Améliorer la qualité de l'application en identifiant les fonctionnalités sujettes aux plantages, en suivant les tendances des erreurs et en priorisant les corrections pour une meilleure satisfaction des utilisateurs.
- Accéder à des tableaux de bord de plantage Android agrégés et à des attributs.
- Voir des rapports de plantage Android déobfusqués avec analyse des tendances.

Le SDK Android de Datadog prend en charge Android 5.0+ (niveau API 21) et Android TV.

Vos rapports de plantage apparaissent dans [**Suivi des erreurs**][2].

## Configuration

Si vous n'avez pas encore configuré le SDK Android, suivez les [instructions de configuration inapp][3] ou consultez la [documentation de configuration Android][4].

### Étape 1  Déclarez le SDK Android comme dépendance

Déclarez [ddsdkandroidrum][5] et le [plugin Gradle][6] comme dépendances dans votre **module d'application** `build.gradle` fichier :

```groovy
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

### Étape 2  Spécifiez les détails de l'application dans l'UI

1. Naviguez vers [**Erreurs** > **Paramètres** > ** Navigateur et Mobile** > **+ Nouvelle Application**][7].
2. Sélectionnez `android` comme type d'application et entrez un nom d'application pour générer un ID d'application Datadog unique et un jeton client.
3. Cliquez sur **Créer une application**.



### Étape 3  Initialisez le SDK Datadog avec le contexte de l'application

#### Mettez à jour le snippet d'initialisation

Dans le snippet d'initialisation, définissez un nom d'environnement, un nom de service et un numéro de version. Dans les exemples ci-dessous, `APP_VARIANT_NAME` spécifie la variante de l'application qui génère des données. Pour plus d'informations, voir [Utilisation des Tags][10].

Lors de l'initialisation, vous pouvez également définir le taux d'échantillonnage (sessions RUM) et définir le consentement au suivi pour la conformité au RGPD, comme décrit ci-dessous. Voir [autres options de configuration][11] pour initialiser la bibliothèque.

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

Les informations d'initialisation nécessitent le nom de variante de votre application et utilisent la valeur de `BuildConfig.FLAVOR`. Avec la variante, le SDK peut faire correspondre les erreurs signalées par votre application aux fichiers de mappage téléchargés par le plugin Gradle. Si vous n'avez pas de variantes, les informations d'identification utilisent une chaîne vide.

Le plugin Gradle télécharge automatiquement le fichier ProGuard approprié `mapping.txt` au moment de la construction afin que vous puissiez voir les traces de pile d'erreurs déobfusquées. Pour plus d'informations, voir la section [Téléchargez votre fichier de mappage](#upload-your-mapping-file). 

#### Activez la fonctionnalité pour commencer à envoyer des données

Pour activer le SDK Android afin de commencer à envoyer des données :

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

Voir [`ViewTrackingStrategy`][12] pour activer le suivi automatique de toutes vos vues (activités, fragments, etc.).

#### Instrumentez vos webviews (optionnel)

Si votre application Android utilise des WebViews pour afficher du contenu web, vous pouvez les instrumenter pour suivre les erreurs JavaScript et les plantages qui se produisent dans le contenu web.

Pour instrumenter vos vues web : 

1. Ajoutez la dépendance Gradle en déclarant ddsdkandroidwebview comme dépendance dans votre fichier build.gradle : 

   ```groovy
   dependencies {
    implementation "com.datadoghq:dd-sdk-android-webview:<latest_version>"
   }
   ```
2. Activez le suivi des webviews pour une instance de WebView donnée en fournissant une liste d'hôtes à suivre : 

   ```kotlin
   WebViewTracking.enable(webView, hosts)
   ```

Pour plus d'informations, voir [Suivi des Web Views][8]. 

### Étape 4 Ajoutez le rapport de plantage NDK

Si votre application Android utilise du code natif (C/C++) via l'Android NDK (Native Development Kit), vous pouvez suivre les plantages qui se produisent dans ce code natif. Le code natif est souvent utilisé pour des opérations critiques en termes de performance, le traitement d'images, ou lors de la réutilisation de bibliothèques C/C++ existantes.

Sans le rapport de plantage NDK, les plantages dans votre code natif n'apparaissent pas dans le suivi des erreurs, ce qui rend difficile le débogage des problèmes dans cette partie de votre application.

Pour activer le rapport de plantage NDK, utilisez le plugin Datadog NDK : 

1. Ajoutez la dépendance Gradle en déclarant la bibliothèque comme dépendance dans votre `build.gradle` fichier : 

   ```kotlin
    dependencies {
        implementation("com.datadoghq:dd-sdk-android-ndk:x.x.x")
        //(...)
    }
   ```
2. Activez la collecte de plantages NDK après avoir initialisé le SDK : 

    ```kotlin
    NdkCrashReports.enable()
    ```

### Étape 5 Ajoutez le rapport ANR

Un "Application Not Responding" ([ANR][18]) est un type d'erreur spécifique à Android qui se déclenche lorsque l'application est non réactive trop longtemps. Vous pouvez ajouter le rapport ANR à votre configuration RUM pour surveiller ces problèmes de réactivité de l'application.

Pour activer le reporting des ANR, ajoutez ce qui suit à votre configuration RUM :

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

Les ANR ne sont signalés que par le biais du SDK (pas par les journaux).

#### Signalement des ANR fatals
Les ANR fatals entraînent des plantages. L'application les signale lorsqu'elle est non réactive, ce qui amène le système d'exploitation Android à afficher une boîte de dialogue contextuelle à l'utilisateur, qui choisit de forcer la fermeture de l'application via la boîte de dialogue.

{{< img src="real_user_monitoring/error_tracking/rum-anr-fatal.png" alt="Un rapport de plantage fatal dans le suivi des erreurs." >}}

- Dans la page **Suivi des erreurs**, les ANR fatals sont regroupés en fonction de leur similarité, ce qui peut entraîner la création de plusieurs **problèmes individuels**.
- Par défaut, Datadog capture les ANR fatals via l'[API ApplicationExitInfo][19] (disponible depuis *[Android 30+][20]*), qui peut être lue lors du prochain lancement de l'application.
- Dans *[Android 29][21] et en dessous*, le reporting des ANR fatals n'est pas possible.

#### Signalement des ANR non fatals
Les ANR non fatals peuvent ou non avoir conduit à la terminaison de l'application (plantage).

{{< img src="real_user_monitoring/error_tracking/rum-anr-non-fatal.png" alt="Un rapport de plantage non fatal dans le suivi des erreurs." >}}

- Dans la page **Suivi des erreurs**, les ANR non fatals sont regroupés sous un **unique** problème en raison de leur niveau de bruit.
- Par défaut, le reporting des ANR non fatals sur *Android 30+* est **désactivé** car cela créerait trop de bruit par rapport aux ANR fatals. Sur *Android 29* et en dessous, cependant, le reporting des ANR non fatals est **activé** par défaut, car les ANR fatals ne peuvent pas être signalés sur ces versions.

Pour toute version Android, vous pouvez remplacer le paramètre par défaut pour le reporting des ANR non fatals en définissant `trackNonFatalAnrs` sur `true` ou `false` lors de l'initialisation du SDK.


###  Étape 6  Obtenez des traces de pile déobfusquées

Lorsque votre application Android est construite pour la production, le code est généralement obfusqué à l'aide de ProGuard ou R8 pour réduire la taille de l'application et protéger la propriété intellectuelle. Cette obfuscation rend les traces de pile dans les rapports de plantage illisibles, montrant des noms de classes et de méthodes sans signification comme `a.b.c()` au lieu de `com.example.MyClass.myMethod()`.

Pour rendre ces traces de pile lisibles pour le débogage, vous devez télécharger vos fichiers de mappage sur Datadog. Ces fichiers contiennent le mappage entre le code obfusqué et le code original, permettant à Datadog de déobfusquer automatiquement les traces de pile dans vos rapports d'erreurs.

#### Comment cela fonctionne

Datadog utilise un ID de build unique généré pour chaque build afin de faire correspondre automatiquement les traces de pile avec les fichiers de mappage corrects. Cela garantit que :

- Les traces de pile sont toujours déobfusquées avec le bon fichier de mappage, peu importe quand il a été téléchargé.
- Vous pouvez télécharger des fichiers de mappage lors des builds de préproduction ou de production.
- Le processus fonctionne sans problème à travers différentes variantes de build et environnements.

Le processus de correspondance dépend de votre version du [plugin Gradle Android][22] :

- **Versions 1.13.0 et supérieures** : Utilise le champ `build_id` (nécessite le SDK Android Datadog 2.8.0 ou ultérieur)
- **Versions antérieures** : Utilise une combinaison des champs `service`, `version` et `variant`

#### Téléchargez votre fichier de mappage

Le plugin Gradle Android automatise le processus de téléchargement des fichiers de mappage. Après configuration, il télécharge automatiquement le fichier de mappage ProGuard/R8 approprié pour chaque variante de build lorsque vous construisez votre application.

**Remarque** : Le téléchargement d'un fichier de mappage ne remplace pas l'existant si la version n'a pas changé. Pour des informations sur les limitations de taille de fichier et d'autres contraintes, voir la section [Limitations](#limitations).

#### Exécutez les tâches de téléchargement

Après avoir configuré le plugin, exécutez les tâches Gradle pour télécharger votre fichier de mappage Proguard/R8 et vos fichiers de symboles NDK vers Datadog :

```bash
./gradlew uploadMappingRelease
./gradlew uploadNdkSymbolFilesRelease
```

Pour toute erreur donnée, vous pouvez accéder au chemin du fichier, au numéro de ligne et à un extrait de code pour chaque cadre de la trace de pile associée.

{{< tabs >}}
{{% tab "ÉTATS-UNIS" %}}

1. Ajoutez le [Plugin Gradle Android][22] à votre projet Gradle en utilisant l'extrait de code suivant.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Créez une clé API Datadog dédiée][23] et exportez-la en tant que variable d'environnement nommée `DD_API_KEY` ou `DATADOG_API_KEY`. Alternativement, passez-le en tant que propriété de tâche, ou si vous avez un fichier `datadog-ci.json` à la racine de votre projet, il peut être pris d'une propriété `apiKey` là-bas.
3. Optionnellement, configurez le plugin pour télécharger des fichiers vers la région UE en configurant le plugin dans votre script `build.gradle` :
   
   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Exécutez la tâche de téléchargement après la construction de votre APK obfusqué :
    
   ```bash
   ./gradlew uploadMappingRelease
   ```

5. Si vous exécutez du code natif, exécutez la tâche de téléchargement des symboles NDK :
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Remarque** : Si votre projet utilise des variantes supplémentaires, le plugin fournit une tâche de téléchargement pour chaque variante avec obfuscation activée. Dans ce cas, initialisez le SDK Android avec un nom de variante approprié (l'API nécessaire est disponible dans les versions `1.8.0` et ultérieures).

[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "UE" %}}
1. Ajoutez le [Plugin Gradle Android][22] à votre projet Gradle en utilisant l'extrait de code suivant.

   ```kotlin
   // In your app's build.gradle script
   plugins {
       id("com.datadoghq.dd-sdk-android-gradle-plugin") version "x.y.z"
   }
   ```

2. [Créez une clé API Datadog dédiée][23] et exportez-la en tant que variable d'environnement nommée `DD_API_KEY` ou `DATADOG_API_KEY`. Alternativement, passez-le en tant que propriété de tâche, ou si vous avez un fichier `datadog-ci.json` à la racine de votre projet, il peut être pris d'une propriété `apiKey` là-bas.
3. Configurez le plugin pour utiliser la région UE en ajoutant l'extrait suivant dans le fichier de script `build.gradle` de votre application :

   ```kotlin
   datadog {
       site = "EU1"
   }
   ```

4. Exécutez la tâche de téléchargement après la construction de votre APK obfusqué :
   
   ```bash
   ./gradlew uploadMappingRelease
   ```
   
5. Si vous exécutez du code natif, exécutez la tâche de téléchargement des symboles NDK :
   ```bash
   ./gradlew uploadNdkSymbolFilesRelease
   ```

**Remarque** : Si votre projet utilise des variantes supplémentaires, le plugin fournit une tâche de téléchargement pour chaque variante avec obfuscation activée. Dans ce cas, initialisez le SDK Android avec un nom de variante approprié (l'API nécessaire est disponible dans les versions `1.8.0` et ultérieures).

[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{< /tabs >}}

#### Liste des fichiers de mappage téléchargés

Voir la page [Symboles de débogage RUM][24] pour voir tous les symboles téléchargés.

## Fonctionnalités avancées de suivi des erreurs

{{% collapse-content title="Définir le consentement au suivi (conformité au RGPD)" level="h4" expanded=false id="set-tracking-consent" %}}

Pour être conforme à la réglementation RGPD, le SDK nécessite la valeur de consentement au suivi lors de l'initialisation.

Le consentement au suivi peut être l'une des valeurs suivantes :

- `TrackingConsent.PENDING` : (Par défaut) Le SDK commence à collecter et à regrouper les données mais ne les envoie pas au
 point de terminaison de collecte. Le SDK attend la nouvelle valeur de consentement au suivi pour décider quoi faire avec les données regroupées.
- `TrackingConsent.GRANTED` : Le SDK commence à collecter les données et les envoie au point de terminaison de collecte de données.
- `TrackingConsent.NOT_GRANTED` : Le SDK ne collecte aucune donnée. Vous ne pouvez pas envoyer manuellement de journaux, de traces ou d'événements.

Pour **mettre à jour le consentement de suivi** après l'initialisation du SDK, appelez `Datadog.setTrackingConsent(<NEW CONSENT>)`. Le SDK change son comportement en fonction du nouveau consentement. Par exemple, si le consentement de suivi actuel est `TrackingConsent.PENDING` et que vous le mettez à jour vers :

- `TrackingConsent.GRANTED` : Le SDK envoie toutes les données groupées actuelles et les données futures directement à l'endpoint de collecte de données.
- `TrackingConsent.NOT_GRANTED` : Le SDK efface toutes les données groupées et ne collecte aucune donnée future.

{{% /collapse-content %}}

{{% collapse-content title="Taux de session d'exemple" level="h4" expanded=false id="sample-session-rates" %}}

Pour contrôler les données que votre application envoie à Datadog, vous pouvez spécifier un taux d'échantillonnage pour les sessions lors de [l'initialisation de RUM][11]. Le taux d'échantillonnage est un pourcentage compris entre 0 et 100. Par défaut, `sessionSamplingRate` est fixé à 100 (conserver toutes les sessions).

```kotlin
val rumConfig = RumConfiguration.Builder(applicationId)
        // Here 75% of the RUM sessions are sent to Datadog
        .setSessionSampleRate(75.0f)
        .build()
Rum.enable(rumConfig)
```

{{% /collapse-content %}}

{{% collapse-content title="Initialisez l'intercepteur pour suivre les événements réseau" level="h4" expanded=false id="interceptor" %}}

L'intercepteur réseau suit automatiquement les requêtes et réponses HTTP, capturant les erreurs réseau, les délais d'attente et les problèmes de performance qui peuvent vous aider à corréler les problèmes réseau avec les plantages d'application et les problèmes d'expérience utilisateur. Pour initialiser un intercepteur pour suivre les événements réseau :

1. Pour le traçage distribué, [ajoutez et activez la fonctionnalité Trace][13].
2. Ajoutez la dépendance Gradle à la bibliothèque `dd-sdk-android-okhttp` dans le fichier `build.gradle` au niveau du module :

    ```groovy
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

4. Pour créer automatiquement des ressources RUM et des spans pour vos requêtes OkHttp, utilisez le `DatadogInterceptor` comme intercepteur.
   - Cela enregistre chaque requête traitée par le `OkHttpClient` en tant que ressource, avec toutes les informations pertinentes (URL, méthode, code d'état et erreur) automatiquement remplies. Seules les requêtes réseau qui ont commencé lorsqu'une vue est active sont suivies. Pour suivre les requêtes lorsque votre application est en arrière-plan, [créez une vue manuellement][15].
      
5. Pour surveiller les redirections ou les réessais réseau, vous pouvez utiliser le `DatadogInterceptor` comme [intercepteur réseau][16] :

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

**Notes** :
- Pour utiliser des spans mais pas de ressources RUM, vous pouvez utiliser le `TracingInterceptor` au lieu de `DatadogInterceptor` comme décrit ci-dessus.
- Si vous utilisez plusieurs intercepteurs, ajoutez `DatadogInterceptor` en premier.

Vous pouvez également ajouter un `EventListener` pour le `OkHttpClient` afin de [suivre automatiquement le timing des ressources][17] pour les fournisseurs tiers et les requêtes réseau.

{{% /collapse-content %}}

{{% collapse-content title="Suivre les événements en arrière-plan" level="h4" expanded=false id="track-background-events" %}}

Vous pouvez suivre des événements tels que des plantages et des requêtes réseau lorsque votre application est en arrière-plan (par exemple, aucune vue active n'est disponible). 

Ajoutez le snippet suivant lors de la configuration :

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
<div class="alert alert-info"><p>Le suivi des événements en arrière-plan peut entraîner des sessions supplémentaires, ce qui peut avoir un impact sur la facturation. Pour des questions, <a href="https://docs.datadoghq.com/help/">contactez le support Datadog.</a></p>
</div>

{{% /collapse-content %}}

{{% collapse-content title="Envoi de données lorsque l'appareil est hors ligne" level="h4" expanded=false id="sending-data-device-offline" %}}

Le SDK Android garantit la disponibilité des données lorsque l'appareil de votre utilisateur est hors ligne. En cas de zones à faible réseau, ou lorsque la batterie de l'appareil est trop faible, tous les événements sont d'abord stockés sur l'appareil local par lots. 

Chaque lot suit la spécification d'entrée. Les lots sont envoyés dès que le réseau est disponible et que la batterie est suffisamment chargée pour garantir que le SDK Datadog n'impacte pas l'expérience de l'utilisateur final. Si le réseau n'est pas disponible pendant que votre application est au premier plan, ou si un téléchargement de données échoue, le lot est conservé jusqu'à ce qu'il puisse être envoyé avec succès.
 
Cela signifie que même si les utilisateurs ouvrent votre application alors qu'ils sont hors ligne, aucune donnée n'est perdue. Pour garantir que le SDK n'utilise pas trop d'espace disque, les données sur le disque sont automatiquement supprimées si elles deviennent trop anciennes.

{{% /collapse-content %}}

{{% collapse-content title="Options de configuration du plugin" level="h4" expanded=false id="plugin-config-options" %}}

Il existe plusieurs propriétés de plugin qui peuvent être configurées via l'extension du plugin. Si vous utilisez plusieurs variantes, vous pouvez définir une valeur de propriété pour un goût spécifique dans la variante.

Par exemple, pour une variante `fooBarRelease`, vous pouvez utiliser la configuration suivante :

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

La configuration de la tâche pour cette variante est fusionnée à partir des trois configurations de goût fournies dans l'ordre suivant : 

1. `bar`
2. `foo`
3. `fooBar`

 Cela résout la valeur finale pour la propriété `versionName` comme `fooBar`.

| Nom de la propriété              | Description                                                                                                                                                                                               |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `versionName`              | Le nom de la version de l'application (par défaut, la version déclarée dans le bloc `android` de votre script `build.gradle`).                                                                                                               |
| `serviceName`              | Le nom du service de l'application (par défaut, le nom du package de votre application tel que déclaré dans le bloc `android` de votre script `build.gradle`).                                                                                                                          |
| `site`                     | Le site Datadog pour télécharger vos données (US1, US3, US5, EU1, US1_FED, AP1 ou AP2).                                                                                                                                       |
| `remoteRepositoryUrl`      | L'URL du dépôt distant où le code source a été déployé. Si cela n'est pas fourni, cette valeur est résolue à partir de votre configuration Git pendant l'exécution de la tâche.                      |
| `checkProjectDependencies` |  Cette propriété contrôle si le plugin doit vérifier si le SDK Android Datadog est inclus dans les dépendances. Si ce n'est pas le cas, `none` est ignoré, `warn` enregistre un avertissement et `fail` échoue la construction avec une erreur (par défaut). |

{{% /collapse-content %}}

{{% collapse-content title="Intégrer avec un pipeline CI/CD" level="h4" expanded=false id="plugin-config-options" %}}

Par défaut, la tâche de mappage de téléchargement est indépendante des autres tâches dans le graphe de construction. Exécutez la tâche manuellement lorsque vous devez télécharger le mappage.

Si vous souhaitez exécuter cette tâche dans un pipeline CI/CD, et que la tâche est requise dans le cadre du graphe de construction, vous pouvez définir la tâche de téléchargement pour s'exécuter après la génération du fichier de mappage.

Par exemple :

```kotlin
tasks["minify${variant}WithR8"].finalizedBy { tasks["uploadMapping${variant}"] }
```
{{% /collapse-content %}}

## Limitations

### Taille des fichiers
[Les fichiers de mappage](#upload-your-mapping-file) sont limités à une taille de **500 Mo** chacun. Si votre projet a un fichier de mappage plus grand que cela, utilisez l'une des options suivantes pour réduire la taille du fichier :

- Définissez l'option `mappingFileTrimIndents` sur `true`. Cela réduit la taille de votre fichier de 5 %, en moyenne.
- Définissez une carte de `mappingFilePackagesAliases` : Cela remplace les noms de package par des alias plus courts. **Remarque** : La trace de pile de Datadog utilise le même alias au lieu du nom de package d'origine, il est donc préférable d'utiliser cette option pour les dépendances tierces.

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
Lors de l'examen des comportements de rapport de plantage RUM pour Android, considérez ce qui suit :

- Le plantage ne peut être détecté qu'après l'initialisation du SDK. Étant donné cela, la recommandation est d'initialiser le SDK dès que possible dans la méthode `onCreate` de votre application.
- Les plantages RUM doivent être attachés à une vue RUM. Si un plantage se produit avant qu'une vue ne soit visible (typiquement une Activité ou un Fragment dans un état `onResume`), ou après que l'application a été envoyée en arrière-plan par l'utilisateur final en naviguant loin de celle-ci, le plantage est atténué et n'est pas signalé pour la collecte. Pour atténuer cela, utilisez la méthode `trackBackgroundEvents()` [méthode][25] dans votre constructeur `RumConfiguration`.
- Seuls les plantages qui se produisent dans des sessions échantillonnées sont conservés. Si un [taux d'échantillonnage de session n'est pas de 100 %][24], certains plantages ne sont pas signalés. 

## Testez votre implémentation

Pour vérifier votre configuration de rapport de plantage Android et de suivi des erreurs, vous devez déclencher un plantage dans votre application et confirmer que l'erreur apparaît dans Datadog.

Pour tester votre implémentation :

1. Exécutez votre application sur un émulateur Android ou un appareil réel.
2. Exécutez du code contenant une erreur ou un plantage. Par exemple :

   ```kotlin
   fun onEvent() {
       throw RuntimeException("Crash the app")
   }
   ```

3. Après que le plantage se soit produit, redémarrez votre application et attendez que le SDK Android télécharge le rapport de plantage dans [**Suivi des erreurs**][2].

## Extensions Kotlin

### `Closeable` extension

Vous pouvez surveiller l'utilisation de l'instance `Closeable` avec la méthode `useMonitored`, qui signale les erreurs à Datadog et ferme la ressource par la suite :

```kotlin
val closeable: Closeable = ...
closeable.useMonitored {
    // Your code here
}
```

### Suivre les ressources locales en tant que ressources

Vous pouvez suivre l'accès aux ressources en utilisant la méthode d'extension `getAssetAsRumResource` :

```kotlin
val inputStream = context.getAssetAsRumResource(fileName)
```

L'utilisation des ressources locales peut être suivie en utilisant la méthode d'extension `getRawResAsRumResource` :

```kotlin
val inputStream = context.getRawResAsRumResource(id)
```

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/error_tracking/
[2]: https://app.datadoghq.com/rum/error-tracking
[3]: https://app.datadoghq.com/rum/application/create
[4]: /fr/real_user_monitoring/application_monitoring/android/setup/#setup
[5]: https://github.com/DataDog/dd-sdk-android/tree/develop/features/dd-sdk-android-rum
[6]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[7]: https://app.datadoghq.com/error-tracking/settings/setup/client
[8]: /fr/real_user_monitoring/application_monitoring/android/web_view_tracking/
[9]: /fr/real_user_monitoring/application_monitoring/android/data_collected/
[10]: /fr/getting_started/tagging/using_tags/
[11]: /fr/real_user_monitoring/application_monitoring/android/advanced_configuration/#initialization-parameters
[12]: /fr/real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-views
[13]: /fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/android/
[14]: https://square.github.io/okhttp/features/interceptors/
[15]: /fr/real_user_monitoring/application_monitoring/android/advanced_configuration/#custom-views
[16]: https://square.github.io/okhttp/features/interceptors/#network-interceptors
[17]: /fr/real_user_monitoring/application_monitoring/android/advanced_configuration/#automatically-track-network-requests
[18]: https://developer.android.com/topic/performance/vitals/anr
[19]: https://developer.android.com/reference/android/app/ApplicationExitInfo
[20]: https://developer.android.com/tools/releases/platforms#11
[21]: https://developer.android.com/tools/releases/platforms#10
[22]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[23]: https://app.datadoghq.com/organization-settings/api-keys
[24]: https://app.datadoghq.com/source-code/setup/rum
[25]: /fr/real_user_monitoring/application_monitoring/android/setup/#track-background-events