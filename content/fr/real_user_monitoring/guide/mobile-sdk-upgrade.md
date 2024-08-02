---
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer
- link: /real_user_monitoring/guide/mobile-sdk-deprecation-policy
  tag: Documentation
  text: Politique d'obsolescence des SDK Mobile Datadog

title: Mettre à niveau les SDK RUM Mobile
---

## Présentation

Suivez les instructions de ce guide pour passer d'une version majeure à une autre des SDK RUM Mobile, Logs et Trace. Consultez la documentation de chaque SDK pour obtenir plus d'informations sur ses fonctionnalités.

## De la version 1 à la version 2
{{< tabs >}}
{{% tab "Android" %}}

Le passage de la version 1 à la version 2 correspond à une transition d'un SDK monolithique vers une architecture modulaire. Les SDK RUM, Trace, Logs ou encore Session Replay possèdent chacun des modules individuels vous permettant d'intégrer uniquement les éléments nécessaires dans votre application.

La version 2 du SDK harmonise la disposition de l'API ainsi que les différents noms entre le SDK iOS, le SDK Android et les autres solutions Datadog.

Avec la version 2 du SDK, vous pouvez utiliser [Session Replay sur mobile][1] dans les applications Android et iOS.

{{% /tab %}}
{{% tab "iOS" %}}

Le passage de la version 1 à la version 2 correspond à une transition d'un SDK monolithique vers une architecture modulaire. Les SDK RUM, Trace, Logs ou encore Session Replay possèdent chacun des modules individuels vous permettant d'intégrer uniquement les éléments nécessaires dans votre application.

La version 2 du SDK harmonise la disposition de l'API ainsi que les différents noms entre le SDK iOS, le SDK Android et les autres solutions Datadog.

Avec la version 2 du SDK, vous pouvez utiliser [Session Replay sur mobile][1] dans les applications Android et iOS.

{{% /tab %}}
{{% tab "React Native" %}}

La version 2 offre des performances supérieures par rapport à la version 1.

{{% /tab %}}
{{% tab "Flutter" %}}

La version 2 offre des performances supérieures par rapport à la version 1. De plus, les SDK Native v2 proposent des fonctionnalités supplémentaires.

{{% /tab %}}
{{< /tabs >}}
### Modules
{{< tabs >}}
{{% tab "Android" %}}

Dans la version 2, les artefacts sont modularisés. Adoptez les artefacts suivants :

* RUM : `com.datadoghq:dd-sdk-android-rum:x.x.x`
* Logs : `com.datadoghq:dd-sdk-android-logs:x.x.x`
* Trace : `com.datadoghq:dd-sdk-android-trace:x.x.x`
* Session Replay : `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* Suivi des vues Web : `com.datadoghq:dd-sdk-android-webview:x.x.x`
* Instrumentation OkHttp : `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**Remarque** : si vous utilisez les rapports de crash NDK et le suivi des vues Web, vous devez ajouter les artefacts RUM et Logs pour transmettre respectivement des événements à RUM et à la solution de logs.

La référence à l'artefact `com.datadoghq:dd-sdk-android` doit être supprimée du script du build Gradle, étant donné que cet artefact n'existe plus.

**Remarque** : les coordonnées Maven de tous les autres artefacts demeurent les mêmes.

<div class="alert alert-warning">La version 2 ne prend pas en charge l'API 19 (KitKat) d'Android. Le SDK minimum pris en charge est désormais l'API 21 (Lollipop). Kotlin 1.7 est requis. Puisque Le SDK est compilé avec Kotlin 1.8, un compilateur de Kotlin 1.6 et versions antérieures ne peut pas lire les métadonnées des classes du SDK.</div>

Si jamais vous rencontrez une erreur semblable à ce qui suit :

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

Ajoutez les règles suivantes au script de votre build (voir ce [fil Stack Overflow][2] pour obtenir plus d'informations) :

```kotlin
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

Consultez l'[extrait d'application Android][3] pour obtenir un exemple de configuration du SDK.

[2]: https://stackoverflow.com/a/75298544
[3]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample

{{% /tab %}}
{{% tab "iOS" %}}

Dans la version 2, les bibliothèques sont modularisées. Adoptez les bibliothèques suivantes :

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

Elles complètent les bibliothèques `DatadogCrashReporting` et `DatadogObjc` existantes.

<details>
  <summary>SPM</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "2.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogWebViewTracking", package: "dd-sdk-ios"),
            ]
        ),
    ]
)
  ```

</details>

<details>
  <summary>CocoaPods</summary>

  ```ruby
  pod 'DatadogCore'
  pod 'DatadogLogs'
  pod 'DatadogTrace'
  pod 'DatadogSessionReplay'
  pod 'DatadogRUM'
  pod 'DatadogCrashReporting'
  pod 'DatadogWebViewTracking'
  pod 'DatadogObjc'
  ```
</details>

<details>
  <summary>Carthage</summary>

  Le `Cartfile` reste le même : 
  ```
  github "DataDog/dd-sdk-ios"
  ```

  Dans Xcode, vous **devez** associer les frameworks suivants :
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

  Ensuite, vous pouvez sélectionner les modules que vous voulez utiliser :
  ```
  DatadogLogs.xcframework
  DatadogTrace.xcframework
  DatadogSessionReplay.xcframework
  DatadogRUM.xcframework
  DatadogCrashReporting.xcframework + CrashReporter.xcframework
  DatadogWebViewTracking.xcframework
  DatadogObjc.xcframework
  ```
</details>

**Remarque** : si vous utilisez les rapports de crash et le suivi des vues Web, vous devez ajouter les modules RUM et Logs pour transmettre respectivement des événements à RUM et à la solution de logs.

{{% /tab %}}

{{% tab "React Native" %}}

Mettez à jour `@datadog/mobile-react-native` dans votre package.json :

```json
"@datadog/mobile-react-native": "2.0.0"
```

Mettez à jour vos pods iOS :

```bash
(cd ios && bundle exec pod update)
```

Si vous utilisez une version de React Native ultérieure à la version `0.67`, utilisez la version 17 de Java. Si vous utilisez la version `0.67` ou une version antérieure de React Native, utilisez la version 11 de Java. Pour vérifier quelle version de Java vous utilisez, exécutez ce qui suit dans un terminal :

```bash
java --version
```

### Pour les versions de React Native antérieures à la v0.73

Dans votre fichier `android/build.gradle`, spécifiez la `kotlinVersion` pour éviter les conflits entre les dépendances Kotlin :

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

### Pour les versions de React Native antérieures à la v0.68

Dans votre fichier `android/build.gradle`, spécifiez la `kotlinVersion` pour éviter les conflits entre les dépendances Kotlin :

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Si vous utilisez une version de `com.android.tools.build:gradle` antérieure à la version `5.0` dans votre `android/build.gradle`, ajoutez ce qui suit dans votre fichier `android/gradle.properties` :

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### Dépannage

#### Échec du build Android avec l'erreur `Unable to make field private final java.lang.String java.io.File.path accessible`

Si une erreur d'échec de votre build Android similaire à ce qui suit s'affiche :

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

Vous utilisez Java 17, qui n'est pas compatible avec votre version de React Native. Repassez à Java 11 pour résoudre le problème.

#### Échec du build Android avec l'erreur `Unsupported class file major version 61`

Si une erreur d'échec de votre build Android similaire à ce qui suit s'affiche :

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:lintVitalRelease'.
> Could not resolve all artifacts for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Failed to transform '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
```

Vous utilisez une version d'Android Gradle Plugin antérieure à la `5.0`. Pour résoudre le problème, ajoutez ce qui suit à votre fichier `android/gradle.properties` :

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

#### Échec du build Android avec l'erreur `Duplicate class kotlin.collections.jdk8.*`

Si une erreur d'échec de votre build Android similaire à ce qui suit s'affiche :

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkReleaseDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

Vous devez définir une version Kotlin pour votre projet afin d'éviter les conflits entre les dépendances Kotlin. Dans votre fichier `android/build.gradle`, spécifiez la `kotlinVersion` :

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Sinon, vous pouvez ajouter les règles suivantes au script de votre build dans votre fichier `android/app/build.gradle` :

```groovy
dependencies {
    constraints {
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.10") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.10") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

{{% /tab %}}
{{% tab "Flutter" %}}

Mettez à jour `datadog_flutter_plugin` dans votre fichier pubspec.yaml :

```yaml
dependencies:
  'datadog_flutter_plugin: ^2.0.0
```

## Dépannage

### Double interface (iOS)

Si, après avoir installé la version 2.0 de `datadog_flutter_plugin`, vous rencontrez l'erreur suivante lors du build iOS :

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

Essayez d'exécuter `flutter clean` && `flutter pub get`, puis relancez l'étape de build. Cela devrait résoudre le problème.

### Double classe (Android)

Si, après avoir installé la version 2.0 de `datadog_flutter_plugin`, vous rencontrez l'erreur suivante lors du build Android :

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

Vérifiez que vous utilisez au minimum la version 1.8 de Kotlin dans votre fichier `build.gradle`.

{{% /tab %}}

{{< /tabs >}}

### Initialisation du SDK
{{< tabs >}}
{{% tab "Android" %}}
Compte tenu de l'extraction de différentes solutions dans des modules indépendants, la configuration du SDK est organisée par module.

La classe `com.datadog.android.core.configuration.Configuration.Builder` présente les modifications suivantes :

* Le token client, le nom de l'environnement, le nom de la variante (la valeur par défaut est une chaîne vide) et le nom du service (la valeur par défaut est l'ID de l'application extrait du manifeste) doivent être fournis par le constructeur.
* La classe `com.datadog.android.core.configuration.Credentials` a été supprimée.
* `logsEnabled`, `tracesEnabled` et `rumEnabled` sont supprimés du constructeur au profit de la configuration individuelle des solutions (voir ci-dessous).
* L'argument de constructeur `crashReportsEnabled` a été supprimé. Vous pouvez activer ou désactiver les rapports de crash JVM à l'aide de la méthode `Configuration.Builder.setCrashReportsEnabled`. Par défaut, les rapports de crash JVM sont activés.
* Les méthodes de configuration des solutions RUM, de logs et de tracing sont supprimées de `Configuration.Builder` au profit d'une configuration individuelle des solutions (voir ci-dessous).

La classe `Credentials` a été supprimée de la liste d'arguments de la méthode `Datadog.initialize`.

Le package `com.datadog.android.plugin` et toutes les classes/méthodes qui lui sont associées sont supprimés.

### Logs

Toutes les classes associées à la solution de logs sont contenues exclusivement dans le package `com.datadog.android.log`.

Pour utiliser la fonctionnalité de logs, importez l'artefact suivant :

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

Vous pouvez activer la solution de logs avec l'extrait de code suivant :

```kotlin
val logsConfig = LogsConfiguration.Builder()
    ...
    .build()

Logs.enable(logsConfig)

val logger = Logger.Builder()
    ...
    .build()
```

Modifications de l'API :

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setLogEventMapper`|`com.datadog.android.log.LogsConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomLogsEndpoint`|`com.datadog.android.log.LogsConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.log.Logger.Builder.setLoggerName`|`com.datadog.android.log.Logger.Builder.setName`|
|`com.datadog.android.log.Logger.Builder.setSampleRate`|`com.datadog.android.log.Logger.Builder.setRemoteSampleRate`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|Cette méthode a été supprimée. Utilisez à la place `com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)` pour désactiver l'envoi de logs à Datadog.|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### Trace

Toutes les classes associées à la solution de tracing sont contenues exclusivement dans le package `com.datadog.android.trace` (ce qui signifie que toutes les classes précédemment situées dans `com.datadog.android.tracing` ont été déplacées).

Pour utiliser la solution de tracing, importez l'artefact suivant :

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

Vous pouvez activer la solution de tracing avec l'extrait de code suivant :

```kotlin
val traceConfig = TraceConfiguration.Builder()
    ...
    .build()

Trace.enable(traceConfig)

val tracer = AndroidTracer.Builder()
    ...
    .build()

GlobalTracer.registerIfAbsent(tracer)
```

Modifications de l'API :

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setSpanEventMapper`|`com.datadog.android.trace.TraceConfiguration.Builder.setEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomTracesEndpoint`|`com.datadog.android.trace.TraceConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setSamplingRate`|`com.datadog.android.trace.AndroidTracer.Builder.setSampleRate`|
|`com.datadog.android.tracing.AndroidTracer.Builder.setServiceName`|`com.datadog.android.trace.AndroidTracer.Builder.setService`|

### RUM

Toutes les classes associées à la solution RUM sont contenues exclusivement dans le package `com.datadog.android.rum`.

Pour utiliser la solution RUM, importez l'artefact suivant :

```kotlin
implementation("com.datadoghq:dd-sdk-android-rum:x.x.x")
```

Vous pouvez utiliser l'extrait de code suivant pour activer la solution RUM :

```kotlin
val rumConfig = RumConfiguration.Builder(rumApplicationId)
    ...
    .build()

Rum.enable(rumConfig)
```

Modifications de l'API :

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumViewEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setViewEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumResourceEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setResourceEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumActionEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setActionEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumErrorEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setErrorEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.setRumLongTaskEventMapper`|`com.datadog.android.rum.RumConfiguration.Builder.setLongTaskEventMapper`|
|`com.datadog.android.core.configuration.Configuration.Builder.useCustomRumEndpoint`|`com.datadog.android.rum.RumConfiguration.Builder.useCustomEndpoint`|
|`com.datadog.android.event.ViewEventMapper`|`com.datadog.android.rum.event.ViewEventMapper`|
|`com.datadog.android.core.configuration.VitalsUpdateFrequency`|`com.datadog.android.rum.configuration.VitalsUpdateFrequency`|
|`com.datadog.android.core.configuration.Configuration.Builder.trackInteractions`|`com.datadog.android.rum.RumConfiguration.Builder.trackUserInteractions`|
|`com.datadog.android.core.configuration.Configuration.Builder.disableInteractionTracking`|`com.datadog.android.rum.RumConfiguration.Builder.disableUserInteractionTracking`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.core.configuration.Configuration.Builder.sampleTelemetry`|`com.datadog.android.rum.RumConfiguration.Builder.setTelemetrySampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder`|Cette classe a été supprimée. Le monitor RUM est créé et enregistré lors de l'appel `Rum.enable`.|
|`com.datadog.android.rum.RumMonitor.Builder.sampleRumSessions`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionSampleRate`|
|`com.datadog.android.rum.RumMonitor.Builder.setSessionListener`|`com.datadog.android.rum.RumConfiguration.Builder.setSessionListener`|
|`com.datadog.android.rum.RumMonitor.addUserAction`|`com.datadog.android.rum.RumMonitor.addAction`|
|`com.datadog.android.rum.RumMonitor.startUserAction`|`com.datadog.android.rum.RumMonitor.startAction`|
|`com.datadog.android.rum.RumMonitor.stopUserAction`|`com.datadog.android.rum.RumMonitor.stopAction`|
|`com.datadog.android.rum.GlobalRum.registerIfAbsent`|Cette méthode a été supprimée. Le monitor RUM est créé et enregistré lors de l'appel `Rum.enable`.|
|`com.datadog.android.rum.GlobalRum`|`com.datadog.android.rum.GlobalRumMonitor`|
|`com.datadog.android.rum.GlobalRum.addAttribute`|`com.datadog.android.rum.RumMonitor.addAttribute`|
|`com.datadog.android.rum.GlobalRum.removeAttribute`|`com.datadog.android.rum.RumMonitor.removeAttribute`|

### Rapports de crash NDK

Le nom de l'artefact reste le même qu'avant : `com.datadoghq:dd-sdk-android-ndk:x.x.x`.

Vous pouvez activer les rapports de crash NDK avec l'extrait de code suivant :

```kotlin
NdkCrashReports.enable()
```

Cette configuration remplace l'appel `com.datadog.android.core.configuration.Configuration.Builder.addPlugin`.

**Remarque** : vous devez avoir activé la solution RUM et la solution de logs afin de recevoir des rapports de crash NDK dans les interfaces RUM et Logs respectivement.

### Suivi des vues Web

Le nom de l'artefact reste le même qu'avant : `com.datadoghq:dd-sdk-android-webview:x.x.x`.

Vous pouvez activer le suivi des vues Web avec l'extrait de code suivant :

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**Remarque** : vous devez avoir activé la solution RUM et la solution de logs afin de recevoir les événements provenant des vues Web dans les interfaces RUM et Logs respectivement.

Modifications de l'API :

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|Cette méthode est devenue une classe `internal`. Utilisez à la place `WebViewTracking`.|
|`com.datadog.android.rum.webview.RumWebChromeClient`|Cette classe a été supprimée. Utilisez à la place `WebViewTracking`.|
|`com.datadog.android.rum.webview.RumWebViewClient`|Cette classe a été supprimée. Utilisez à la place `WebViewTracking`.|

### Suivi OkHttp

Pour utiliser le suivi OkHttp, importez l'artefact suivant :

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

L'instrumentation OkHttp prend en charge l'initialisation du SDK Datadog après le client OkHttp, ce qui vous permet de créer `com.datadog.android.okhttp.DatadogEventListener`, `com.datadog.android.okhttp.DatadogInterceptor` et `com.datadog.android.okhttp.trace.TracingInterceptor` avant le SDK Datadog. L'instrumentation OkHttp commence à transmettre des événements à Datadog après l'initialisation du SDK Datadog.

`com.datadog.android.okhttp.DatadogInterceptor` et `com.datadog.android.okhttp.trace.TracingInterceptor` vous permettent de contrôler l'échantillonnage de manière dynamique par le biais de l'intégration à un système de configuration à distance.

Pour ajuster l'échantillonnage de manière dynamique, fournissez votre propre implémentation de l'interface `com.datadog.android.core.sampling.Sampler` dans le constructeur `com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor`. Celle-ci est interrogée pour chaque requête afin de choisir ou non de procéder à un échantillonnage.

### Suppression du module `dd-sdk-android-ktx`

Pour améliorer la granularité des bibliothèques du SDK Datadog utilisées, le module `dd-sdk-android-ktx` a été supprimé. Le code est distribué entre les autres modules afin de fournir des méthodes d'extension pour les fonctionnalités RUM et de tracing.

| `1.x`                                                                                     | '2.0'                                                                                       | Nom du module                       |
|-------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------|
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.launchTraced`        | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.launchTraced`       | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#runBlockingTraced`                                     | `com.datadog.android.trace.coroutines#runBlockingTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.CoroutineScope.asyncTraced`         | `com.datadog.android.trace.coroutines#kotlinx.coroutines.CoroutineScope.asyncTraced`        | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#kotlinx.coroutines.Deferred<T>.awaitTraced`            | `com.datadog.android.trace.coroutines#kotlinx.coroutines.Deferred<T>.awaitTraced`           | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine#withContextTraced`                                     | `com.datadog.android.trace.coroutines#withContextTraced`                                    | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.coroutine.CoroutineScopeSpan`                                    | `com.datadog.android.trace.coroutines.CoroutineScopeSpan`                                   | `dd-sdk-android-trace-coroutines` |
| `com.datadog.android.ktx.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `com.datadog.android.trace.sqlite#android.database.sqlite.SQLiteDatabase.transactionTraced` | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#io.opentracing.Span.setError`                            | `com.datadog.android.trace#io.opentracing.Span.setError`                                    | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.tracing#withinSpan`                                              | `com.datadog.android.trace#withinSpan`                                                      | `dd-sdk-android-trace`            |
| `com.datadog.android.ktx.coroutine#sendErrorToDatadog`                                    | `com.datadog.android.rum.coroutines#sendErrorToDatadog`                                     | `dd-sdk-android-rum-coroutines`   |
| `com.datadog.android.ktx.rum#java.io.Closeable.useMonitored`                              | `com.datadog.android.rum#java.io.Closeable.useMonitored`                                    | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getAssetAsRumResource`               | `com.datadog.android.rum.resource#android.content.Context.getAssetAsRumResource`            | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#android.content.Context.getRawResAsRumResource`              | `com.datadog.android.rum.resource#android.content.Context.getRawResAsRumResource`           | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.rum#java.io.InputStream.asRumResource`                           | `com.datadog.android.rum.resource#java.io.InputStream.asRumResource`                        | `dd-sdk-android-rum`              |
| `com.datadog.android.ktx.tracing#okhttp3.Request.Builder.parentSpan`                      | `com.datadog.android.okhttp.trace#okhttp3.Request.Builder.parentSpan`                       | `dd-sdk-android-okhttp`           |

### Session Replay

Pour découvrir comment configurer Session Replay sur mobile, consultez la section [Installation et configuration de Session Replay sur mobile][4].

[4]: /fr/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=android

{{% /tab %}}
{{% tab "iOS" %}}

Compte tenu de l'extraction de différentes solutions dans des modules indépendants, la configuration du SDK est organisée par module.

> Le SDK doit être initialisé avant d'activer toute solution.

Le pattern Builder de l'initialisation du SDK a été supprimé au profit de définitions de structure. L'exemple suivant illustre les différences d'initialisation entre la version `1.x` et la version `2.0`.

**Initialisation (v1)**
```swift
import Datadog

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
        .builderUsing(
            clientToken: "<token client>",
            environment: "<environnement>"
        )
        .set(serviceName: "<nom du service>")
        .build()
```
**Initialisation (v2)**
```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<token client>",
        env: "<environnement>",
        service: "<nom du service>"
    ),
    trackingConsent: .granted
)
```

Modifications de l'API :

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.set(serviceName:)`|`Datadog.Configuration.service`|
|`Datadog.Configuration.Builder.set(batchSize:)`|`Datadog.Configuration.batchSize`|
|`Datadog.Configuration.Builder.set(uploadFrequency:)`|`Datadog.Configuration.uploadFrequency`|
|`Datadog.Configuration.Builder.set(proxyConfiguration:)`|`Datadog.Configuration.proxyConfiguration`|
|`Datadog.Configuration.Builder.set(encryption:)`|`Datadog.Configuration.encryption`|
|`Datadog.Configuration.Builder.set(serverDateProvider:)`|`Datadog.Configuration.serverDateProvider`|
|`Datadog.AppContext(mainBundle:)`|`Datadog.Configuration.bundle`|

### Logs

Toutes les classes associées à la solution de logs sont contenues exclusivement dans le module `DatadogLogs`. Vous devez d'abord activer la solution :

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

Vous pouvez ensuite créer votre instance de logger :

```swift
import DatadogLogs

let logger = Logger.create(
    with: Logger.Configuration(name: "<nom du logger>")
)
```

Modifications de l'API :

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.setLogEventMapper(_:)`|`Logs.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(loggingSamplingRate:)`|`Logs.Configuration.eventMapper`|
|`Logger.Builder.set(serviceName:)`|`Logger.Configuration.service`|
|`Logger.Builder.set(loggerName:)`|`Logger.Configuration.name`|
|`Logger.Builder.sendNetworkInfo(_:)`|`Logger.Configuration.networkInfoEnabled`|
|`Logger.Builder.bundleWithRUM(_:)`|`Logger.Configuration.bundleWithRumEnabled`|
|`Logger.Builder.bundleWithTrace(_:)`|`Logger.Configuration.bundleWithTraceEnabled`|
|`Logger.Builder.sendLogsToDatadog(false)`|`Logger.Configuration.remoteSampleRate = 0`|
|`Logger.Builder.set(datadogReportingThreshold:)`|`Logger.Configuration.remoteLogThreshold`|
|`Logger.Builder.printLogsToConsole(_:, usingFormat)`|`Logger.Configuration.consoleLogFormat`|

### Trace

Toutes les classes associées à la solution de tracing sont contenues exclusivement dans le module `DatadogTrace`. Vous devez d'abord activer la solution :

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

Vous pouvez ensuite accéder à l'instance Tracer partagée :

```swift
import DatadogTrace

let tracer = Tracer.shared()
```

Modifications de l'API :

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`Trace.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.setSpanEventMapper(_:)`|`Trace.Configuration.eventMapper`|
|`Datadog.Configuration.Builder.set(tracingSamplingRate:)`|`Trace.Configuration.sampleRate`|
|`Tracer.Configuration.serviceName`|`Trace.Configuration.service`|
|`Tracer.Configuration.sendNetworkInfo`|`Trace.Configuration.networkInfoEnabled`|
|`Tracer.Configuration.globalTags`|`Trace.Configuration.tags`|
|`Tracer.Configuration.bundleWithRUM`|`Trace.Configuration.bundleWithRumEnabled`|
|`Tracer.Configuration.samplingRate`|`Trace.Configuration.sampleRate`|

### RUM

Toutes les classes associées à la solution RUM sont contenues exclusivement dans le module `DatadogRUM`. Vous devez d'abord activer la solution :

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<ID d'application RUM>")
)
```

Vous pouvez ensuite accéder à l'instance de monitor RUM partagée :

```swift
import DatadogRUM

let monitor = RUMMonitor.shared()
```

Modifications de l'API :

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.trackURLSession(_:)`|`RUM.Configuration.urlSessionTracking`|
|`Datadog.Configuration.Builder.set(rumSessionsSamplingRate:)`|`RUM.Configuration.sessionSampleRate`|
|`Datadog.Configuration.Builder.onRUMSessionStart`|`RUM.Configuration.onSessionStart`|
|`Datadog.Configuration.Builder.trackUIKitRUMViews(using:)`|`RUM.Configuration.uiKitViewsPredicate`|
|`Datadog.Configuration.Builder.trackUIKitRUMActions(using:)`|`RUM.Configuration.uiKitActionsPredicate`|
|`Datadog.Configuration.Builder.trackRUMLongTasks(threshold:)`|`RUM.Configuration.longTaskThreshold`|
|`Datadog.Configuration.Builder.setRUMViewEventMapper(_:)`|`RUM.Configuration.viewEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceEventMapper(_:)`|`RUM.Configuration.resourceEventMapper`|
|`Datadog.Configuration.Builder.setRUMActionEventMapper(_:)`|`RUM.Configuration.actionEventMapper`|
|`Datadog.Configuration.Builder.setRUMErrorEventMapper(_:)`|`RUM.Configuration.errorEventMapper`|
|`Datadog.Configuration.Builder.setRUMLongTaskEventMapper(_:)`|`RUM.Configuration.longTaskEventMapper`|
|`Datadog.Configuration.Builder.setRUMResourceAttributesProvider(_:)`|`RUM.Configuration.urlSessionTracking.resourceAttributesProvider`|
|`Datadog.Configuration.Builder.trackBackgroundEvents(_:)`|`RUM.Configuration.trackBackgroundEvents`|
|`Datadog.Configuration.Builder.trackFrustrations(_:)`|`RUM.Configuration.frustrationsTracking`|
|`Datadog.Configuration.Builder.set(mobileVitalsFrequency:)`|`RUM.Configuration.vitalsUpdateFrequency`|
|`Datadog.Configuration.Builder.set(sampleTelemetry:)`|`RUM.Configuration.telemetrySampleRate`|

### Rapports de crash

Pour activer les rapports de crash, veillez à activer la transmission des rapports aux solutions RUM et de logs respectivement.

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### Suivi des vues Web

Pour activer le suivi des vues Web, veillez à activer également la transmission des rapports aux solutions RUM et de logs respectivement.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView)
```

|`1.x`|`2.0`|
|---|---|
|`WKUserContentController.startTrackingDatadogEvents`|`WebViewTracking.enable(webView:)`|

### Session Replay

Pour découvrir comment configurer Session Replay sur mobile, consultez la section [Installation et configuration de Session Replay sur mobile][5].

[5]: /fr/real_user_monitoring/session_replay/mobile/setup_and_configuration/?tab=ios

{{% /tab %}}
{{% tab "React Native" %}}

Aucune modification ne doit être apportée à l'initialisation du SDK.

{{% /tab %}}

{{% tab "Flutter" %}}

## Modifications de configuration des SDK

Certaines propriétés de configuration ont été déplacées ou renommées, afin de prendre en charge la modularité dans les SDK natifs de Datadog.

Les structures suivantes ont été renommées :

| `1.x` | `2.x` |
|-------|-------|
| `DdSdkConfiguration` | `DatadogConfiguration` |
| `LoggingConfiguartion` | `DatadogLoggingConfiguration` |
| `RumConfiguration` | `DatadogRumConfiguration` |
| `DdSdkExistingConfiguration` | `DatadogAttachConfiguration` |

Les propriétés suivantes ont été modifiées :

| 1.x | 2.x | Remarques |
|-------|-------|-------|
| `DdSdkConfiguration.trackingConsent`| Options supprimées | Intégré à `Datadog.initialize` | |
| `DdSdkConfiguration.customEndpoint` | Options supprimées | Désormais configuré au niveau de chaque fonctionnalité | |
| `DdSdkConfiguration.serviceName` | `DatadogConfiguration.service` | |
| `DdSdkConfiguration.logEventMapper` | `DatadogLoggingConfiguration.eventMapper` | |
| `DdSdkConfiguration.customLogsEndpoint` | `DatadogLoggingConfiguration.customEndpoint` | |
| `DdSdkConfiguration.telemetrySampleRate` | `DatadogRumConfiguration.telemetrySampleRate` | |

De plus, les API suivantes ont été modifiées :

| 1.x | 2.x | Remarques |
|-------|-------|-------|
| `Verbosity` | Options supprimées | Voir `CoreLoggerLevel` ou `LogLevel` |
| `DdLogs DatadogSdk.logs` | `DatadogLogging DatadogSdk.logs` | Changement de type |
| `DdRum DatadogSdk.rum` | `DatadogRum DatadogSdk.rum` | Changement de type
| `Verbosity DatadogSdk.sdkVerbosity` | `CoreLoggerLevel DatadogSdk.sdkVerbosity` |
| `DatadogSdk.runApp` | `DatadogSdk.runApp` | Paramètre `trackingConsent` ajouté |
| `DatadogSdk.initialize` | `DatadogSdk.initialize` | Paramètre `trackingConsent` ajouté |
| `DatadogSdk.createLogger` | `DatadogLogging.createLogger` | Déplacé |

## Modifications apportées à Flutter Web

Les clients reposant sur Flutter Web doivent mettre à jour leur configuration afin d'utiliser la version 5 du SDK Browser Datadog. Modifiez l'importation suivante dans votre fichier `index.html` :

```diff
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```

**Remarque** : Datadog fournit un lot CDN par site. Consultez le fichier [README du SDK Browser](https://github.com/DataDog/browser-sdk/#cdn-bundles) pour obtenir la liste de toutes les URL de site.

## Modifications apportées à la fonctionnalité de logs

Comme pour la v1, la journalisation Datadog peut être activée à l'aide du membre `DatadogConfiguration.loggingConfiguration`. Toutefois, Datadog ne crée plus le logger à votre place. `DatadogSdk.logs` est désormais une instance de `DatadogLogging`. Vous pouvez vous en servir pour créer vos logs. Un grand nombre d'options ont été déplacées vers `DatadogLoggerConfiguration`, afin que les développeurs puissent contrôler plus précisément chaque logger. 

Les API suivantes ont été modifiées :

| 1.x | 2.x | Remarques |
|-------|-------|-------|
| `LoggingConfiguration` | `DatadogLoggingConfiguration` | La plupart des membres renommés se trouvent désormais dans `DatadogLoggerConfiguration` |
| `LoggingConfiguration.sendNetworkInfo` | `DatadogLoggerConfiguration.networkInfoEnabled` | |
| `LoggingConfiguration.printLogsToConsole` | `DatadogLoggerConfiguration.customConsoleLogFunction` | |
| `LoggingConfiguration.sendLogsToDatadog` | Supprimé, utiliser plutôt `remoteLogThreshold` | |
| `LoggingConfiguration.datadogReportingThreshold` | `DatadogLoggerConfiguration.remoteLogThreshold` | |
| `LoggingConfiguration.bundleWithRum` | `DatadogLoggerConfiguration.bundleWithRumEnabled` | |
| `LoggingConfiguration.bundleWithTrace` | `DatadogLoggerConfiguration.bundleWithTraceEnabled` | |
| `LoggingConfiguration.loggerName` | `DatadogLoggerConfiguration.name` | |
| `LoggingConfiguration.sampleRate` | `DatadogLoggerConfiguration.remoteSampleRate` | |

## Modifications apportées à la solution RUM

Les API suivantes ont été modifiées :

| 1.x | 2.x | Remarques |
|-------|-------|-------|
| `RumConfiguration` | `DatadogRumConfiguration` | Changement de nom du type |
| `RumConfiguration.vitalsUpdateFrequency` | `DatadogRumConfiguration.vitalsUpdateFrequency` | Définir sur `null` pour désactiver la mise à jour des signaux essentiels |
| `RumConfiguration.tracingSampleRate` | `DatadogRumConfiguration.traceSampleRate` |
| `RumConfiguration.rumViewEventMapper` | `DatadogRumConfiguration.viewEventMapper` |
| `RumConfiguration.rumActionEventMapper` | `DatadogRumConfiguration.actionEventMapper` |
| `RumConfiguration.rumResourceEventMapper` | `DatadogRumConfiguration.resourceEventMapper` |
| `RumConfiguration.rumErrorEventMapper` | `DatadogRumConfiguration.rumErrorEventMapper` |
| `RumConfiguration.rumLongTaskEventMapper` | `DatadogRumConfiguration.longTaskEventMapper` |
| `RumUserActionType` | `RumActionType` | Changement de nom du type |
| `DdRum.addUserAction` | `DdRum.addAction` | |
| `DdRum.startUserAction` | `DdRum.startAction` | |
| `DdRum.stopUserAction` | `DdRum.stopAction` | |
| `DdRum.startResourceLoading` | `DdRum.startResource` | |
| `DdRum.stopResourceLoading` | `DdRum.stopResource` | |
| `DdRum.stopResourceLoadingWithError` | `DdRum.stopResourceWithError` | |

De plus, il n'est plus possible de modifier le nom des vues des mappers d'événements. Pour renommer une vue, utilisez plutôt un [`ViewInfoExtractor`](https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html) personnalisé.


{{% /tab %}}

{{< /tabs >}}


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/session_replay/mobile/