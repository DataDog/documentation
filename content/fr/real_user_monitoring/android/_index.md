---
further_reading:
- link: https://github.com/DataDog/dd-sdk-android
  tag: Github
  text: Code source de dd-sdk-android
- link: /real_user_monitoring
  tag: Documentation
  text: Explorer le service RUM de Datadog
kind: documentation
title: Surveillance Android et Android TV avec RUM
---
## Présentation

Le Real User Monitoring (RUM) de Datadog vous permet de visualiser et d'analyser les performances en temps réel et les parcours des utilisateurs de votre application.

Le SDK Datadog pour Android prend en charge la version 4.4 d'Android (niveau d'API 19) et les versions ultérieures ainsi qu'Android TV.

## Implémentation

1. Déclarez le SDK en tant que dépendance.
2. Ajoutez les détails de l'application dans l'interface utilisateur.
3. Initialisez la bibliothèque avec le contexte de l'application.
4. Initialisez le monitor RUM ainsi que l'intercepteur pour commencer à envoyer des données.

### Déclarer le SDK en tant que dépendance

Déclarez [dd-sdk-android][1] et le [plug-in Gradle][12] en tant que dépendance dans le fichier `build.gradle` du **module de votre application**.

```
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
    implementation "com.datadoghq:dd-sdk-android:x.x.x" 
    //(...)
}

```

### Ajouter les détails de l'application dans l'interface utilisateur

1. Accédez à [**UX Monitoring** > **RUM Applications** > **New Application**][2].
2. Sélectionnez le type d'application `android` et attribuez un nom à l'application, afin de générer un ID d'application Datadog unique ainsi qu'un token client.
3. Pour instrumenter vos vues Web, cliquez sur le bouton **Instrument your webviews**. Pour en savoir plus, consultez la section [Suivi des vues Web][13].
4. Pour désactiver la collecte automatique des IP client ou des données de géolocalisation, décochez les cases correspondant à ces paramètres. Pour en savoir plus, consultez la section [Données RUM recueillies (Android)][15].

   {{< img src="real_user_monitoring/android/android-new-application.png" alt="Créer une application RUM application pour Android dans Datadog" style="width:90%;">}}

Pour assurer la sécurité de vos données, vous devez utiliser un token client. Si vous vous contentez d'utiliser des [clés d'API Datadog][3] pour configurer la bibliothèque `dd-sdk-android`, ces clés seront exposées côté client dans le bytecode de l'APK de l'application Android.

Pour en savoir plus sur la configuration d'un token client, consultez [la documentation à ce sujet][4].

### Initialiser la bibliothèque avec le contexte de l'application

Dans le bloc d'initialisation, définissez un nom d'environnement, un nom de service et un numéro de version. Dans les exemples ci-dessous, `NOM_VARIANTE_APPLICATION` spécifie la variante de l'application qui génère des données. Pour en savoir plus, consultez la section [Utiliser les tags][14].

Familiarisez-vous avec le fonctionnement de l'option [`ViewTrackingStrategy`][5] pour activer automatiquement le suivi de toutes vos vues (activités, fragments, etc.), de l'option [`trackingConsent`][6] pour implémenter la conformité au RGPD pour vos utilisateurs européens, et d'[autres options de configuration][7] pour initialiser la bibliothèque.

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
class SampleApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        val configuration = Configuration.Builder(
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.US1)
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
{{% tab "Java" %}}
```java
public class SampleApplication extends Application { 
    @Override 
    public void onCreate() { 
        super.onCreate();
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.US1)
                        .build();
            final Credentials credentials = new Credentials(<TOKEN_CLIENT>, <NOM_ENVIRONNEMENT>, <NOM_VARIANTE_APPLICATION>, <ID_APPLICATION>);
            Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.EU1)
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
{{% tab "Java" %}}
```java
public class SampleApplication extends Application { 
    @Override 
    public void onCreate() { 
        super.onCreate();
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.EU1)
                        .build();
        Credentials credentials = new Credentials(<TOKEN_CLIENT>, <NOM_ENVIRONNEMENT>, <NOM_VARIANTE_APPLICATION>, <ID_APPLICATION>);
        Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.US3)
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
{{% tab "Java" %}}
```java
public class SampleApplication extends Application { 
    @Override 
    public void onCreate() { 
        super.onCreate();
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.US3)
                        .build();
        Credentials credentials = new Credentials(<TOKEN_CLIENT>, <NOM_ENVIRONNEMENT>, <NOM_VARIANTE_APPLICATION>, <ID_APPLICATION>);
        Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.US5)
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
{{% tab "Java" %}}
```java
public class SampleApplication extends Application { 
    @Override 
    public void onCreate() { 
        super.onCreate();
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.US5)
                        .build();
        Credentials credentials = new Credentials(<TOKEN_CLIENT>, <NOM_ENVIRONNEMENT>, <NOM_VARIANTE_APPLICATION>, <ID_APPLICATION>);
        Datadog.initialize(this, credentials, configuration, trackingConsent); 
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
                logsEnabled = true,
                tracesEnabled = true,
                crashReportsEnabled = true,
                rumEnabled = true
            )
            .useSite(DatadogSite.US1_FED)
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
{{% tab "Java" %}}
```java
public class SampleApplication extends Application { 
    @Override 
    public void onCreate() { 
        super.onCreate();
        final Configuration configuration = 
                new Configuration.Builder(true, true, true, true)
                        .trackInteractions()
                        .trackLongTasks(durationThreshold)
                        .useViewTrackingStrategy(strategy)
                        .useSite(DatadogSite.US1_FED)
                        .build();
        Credentials credentials = new Credentials(<TOKEN_CLIENT>, <NOM_ENVIRONNEMENT>, <NOM_VARIANTE_APPLICATION>, <ID_APPLICATION>);
        Datadog.initialize(this, credentials, configuration, trackingConsent); 
    }
}
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

Les identifiants requis pour l'initialisation nécessitent le nom de la variante de votre application et utilisent la valeur de `BuildConfig.FLAVOR`. Cette variante permet à RUM d'associer les erreurs issues de votre application aux fichiers de mappage importés par le plug-in Gradle. Si vous n'avez pas de variante, les identifiants utilisent une chaîne vide.

Le plug-in Gradle importe automatiquement le fichier ProGuard `mapping.txt` adéquat au moment du build pour vous permettre de consulter les stack traces désobfusquées des erreurs RUM. Pour en savoir plus, consultez la section [Suivi des erreurs Android][8].

### Initialiser le monitor RUM et l'intercepteur

Configurez et enregistrez le monitor RUM. Cette opération, qui doit être effectuée une seule fois, s'effectue dans la méthode `onCreate()` de votre application.

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val monitor = RumMonitor.Builder().build()
GlobalRum.registerIfAbsent(monitor)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final RumMonitor monitor = new RumMonitor.Builder().build();
GlobalRum.registerIfAbsent(monitor);
```
{{% /tab %}}
{{< /tabs >}}

Pour effectuer le suivi de vos requêtes OkHttp en tant que ressources, ajoutez l'[intercepteur][9] fourni :

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
val okHttpClient =  OkHttpClient.Builder()
    .addInterceptor(DatadogInterceptor())
    .build()
```
{{% /tab %}}
{{% tab "Java" %}}
```java
final OkHttpClient okHttpClient =  new OkHttpClient.Builder()
    .addInterceptor(new DatadogInterceptor())
    .build();
```
{{% /tab %}}
{{< /tabs >}}

Cette approche permet d'enregistrer chaque requête traitée par le client `OkHttpClient` en tant que ressource dans RUM. Toutes les informations pertinentes sont automatiquement renseignées (URL, méthode, code de statut, erreur). Seules les requêtes réseau commençant au moment où une vue est active font l'objet d'un suivi. Si vous souhaitez surveiller des requêtes lorsque votre application est en arrière-plan, [créez manuellement une vue][10].

**Remarque** : si vous utilisez plusieurs intercepteurs, appelez d'abord `DatadogInterceptor`.

Vous pouvez également ajouter un `EventListener` pour le client `OkHttpClient` afin d'[effectuer automatiquement le suivi des durées de ressources][11] pour les fournisseurs tiers et les requêtes réseau.

### Effectuer le suivi d'événements en arrière-plan

Vous pouvez effectuer le suivi d'événements, tels que des crashs et des requêtes réseau, pendant que votre application s'exécute en arrière-plan (par exemple, lorsqu'aucune vue active n'est disponible).

Ajoutez l'extrait suivant lors de l'initialisation dans votre configuration Datadog :

{{< tabs >}}
{{% tab "Kotlin" %}}
```kotlin
.trackBackgroundRumEvents(true)
```
{{% /tab %}}
{{% tab "Java" %}}
```java
.trackBackgroundRumEvents(true)
```
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-info"><p>Le suivi d'événements en arrière-plan peut générer des sessions supplémentaires et augmenter vos coûts. Si vous avez la moindre question, <a href="https://docs.datadoghq.com/help/">contactez l'assistance Datadog.</a></p>
</div>


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-android
[2]: https://app.datadoghq.com/rum/application/create
[3]: /fr/account_management/api-app-keys/#api-keys
[4]: /fr/account_management/api-app-keys/#client-tokens
[5]: /fr/real_user_monitoring/android/advanced_configuration/#automatically-track-views
[6]: /fr/real_user_monitoring/android/troubleshooting/#set-tracking-consent-gdpr-compliance
[7]: /fr/real_user_monitoring/android/advanced_configuration/#initialization-parameters
[8]: /fr/real_user_monitoring/error_tracking/android/#upload-your-mapping-file
[9]: https://square.github.io/okhttp/interceptors/
[10]: /fr/real_user_monitoring/android/advanced_configuration/#custom-views
[11]: /fr/real_user_monitoring/android/advanced_configuration/#automatically-track-network-requests
[12]: https://github.com/DataDog/dd-sdk-android-gradle-plugin
[13]: /fr/real_user_monitoring/android/web_view_tracking/
[14]: /fr/getting_started/tagging/using_tags/#rum--session-replay
[15]: /fr/real_user_monitoring/android/data_collected/