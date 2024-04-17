---
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: Github
  text: Code source de dd-sdk-reactnative
- link: /real_user_monitoring
  tag: Documentation
  text: Service Real User Monitoring (RUM) de Datadog
kind: documentation
title: Dépannage
---

Si la fonctionnalité RUM pour React Native de Datadog se comporte de manière inattendue, consultez ce guide pour résoudre les problèmes rapidement. Si ceux-ci persistent, contactez l'[assistance Datadog][1] pour obtenir de l'aide.

## Aucune donnée n'est envoyée à Datadog

Suivez ces instructions si aucune donnée n'est envoyée à Datadog alors que le SDK a été installé et que l'application a été compilée correctement.

### Vérifier la configuration

Dans certains cas, aucune donnée n'est envoyée en raison d'une petite erreur lors de la configuration.

Voici quelques points à vérifier :

- Assurez-vous que votre `clientToken` et votre `applicationId` sont corrects.
- Assurez-vous d'avoir bien défini `sessionSamplingRate` sur 100 (il s'agit de la valeur par défaut). Autrement, votre session risque d'être envoyée.
- Si vous avez défini un `Proxy` pendant la configuration de Datadog, vérifiez qu'il a été configuré correctement.
- Vérifiez que vous **suivez les vues** (les événements doivent tous être associés à une vue) et que vous **envoyez les événements**.

### Examiner les logs du SDK dans React Native

- Définissez `config.verbosity = SdkVerbosity.DEBUG` pour importer `SdkVerbosity` à partir de `@datadog/mobile-react-native`.
- Les logs commenceront alors à apparaître dans la console JavaScript, comme suit :

  ```
  INFO  DATADOG: Datadog SDK was initialized
  INFO  DATADOG: Datadog SDK is tracking interactions
  INFO  DATADOG: Datadog SDK is tracking XHR resources
  INFO  DATADOG: Datadog SDK is tracking errors
  DEBUG  DATADOG: Starting RUM View “Products” #Products-oaZlP_FVwGM5vtPoup_rT
  DEBUG  DATADOG: Adding RUM Action “RCTView” (TAP)
  ```

  **Remarque** : dans cet exemple, les quatre premiers logs indiquent que le SDK a été configuré correctement et les deux dernières lignes correspondent aux événements ayant été envoyés.

#### Cause possible

Si vous utilisez iOS et que des logs DEBUG indiquent que des logs ou événements RUM ont été envoyés **avant** les logs d'initialisation, il peut s'agir de la raison pour laquelle le SDK n'envoie aucun événement.

Vous ne pouvez pas envoyer d'événements avant l'initialisation. Procéder de la sorte empêche le SDK d'envoyer des données.

#### Solution

Avec **`DdSdkReactNative.initialize`** :

Si vous utilisez `DdSdkReactNative.initialize` pour démarrer le SDK Datadog, appelez cette fonction dans votre fichier `index.js` de premier niveau de manière à ce que le SDK soit initialisé avant l'envoi de vos événements.

Avec **`DatadogProvider`** :

Depuis la version `1.2.0` du SDK, vous pouvez initialiser celui-ci à l'aide du composant `DatadogProvider`. Ce composant comprend un buffer d'événements RUM qui garantit l'initialisation du SDK avant l'envoi de données à Datadog, ce qui permet d'éviter ce problème.

Pour l'utiliser, consultez le [guide de migration vers le fournisseur Datadog][2].

### Examiner les logs natifs

L'examen des logs natifs peut vous aider à mieux cerner la nature du problème.

#### Sous iOS

- Exécutez `xed ios` pour ouvrir votre projet dans Xcode.
- Créez un build de votre projet pour un simulateur ou un appareil.
- Les logs natifs commenceront à apparaître dans le coin inférieur droit :

  {{< img src="real_user_monitoring/react_native/troubleshooting-xcode-logs.png" alt="L'examen des logs natifs peut vous aider à comprendre la raison pour laquelle aucune donnée n'est envoyée" >}}

Vous pouvez appliquer le filtre « DATADOG » aux logs et rechercher des erreurs.

S'il s'avère que vous envoyez bien des événements, vous devriez voir les logs suivants : 

```
[DATADOG SDK] 🐶 → 10:02:47.398 [DEBUG] ⏳ (rum) Uploading batch...
[DATADOG SDK] 🐶 → 10:02:47.538 [DEBUG]    → (rum) accepted, won't be retransmitted: [response code: 202 (accepted), request ID: AAAABBBB-1111-2222-3333-777788883333]
```

Le premier log indique qu'un certain nombre de données sont envoyées, tandis que le second indique que les données ont bien été reçues.

##### Cause possible

Si le log ci-dessous s'affiche, cela signifie que vous avez appelé une méthode RUM avant d'initialiser le SDK.

```
[DATADOG SDK] 🐶 → 10:09:13.621 [WARN] The `Global.rum` was called but no `RUMMonitor` is registered. Configure and register the RUM Monitor globally before invoking the feature:
```

##### Solution

Avec **`DdSdkReactNative.initialize`** :

Si vous utilisez `DdSdkReactNative.initialize` pour démarrer le SDK Datadog, appelez cette fonction dans votre fichier `index.js` de premier niveau de manière à ce que le SDK soit initialisé avant l'envoi de vos événements.

Avec **`DatadogProvider`** :

Depuis la version `1.2.0` du SDK, vous pouvez initialiser celui-ci à l'aide du composant `DatadogProvider`. Ce composant comprend un buffer d'événements RUM qui garantit l'initialisation du SDK avant l'envoi de données à Datadog, ce qui permet d'éviter ce problème.

Pour l'utiliser, consultez le [guide de migration vers le fournisseur Datadog][2].

#### Sous Android

- Pour une meilleure expérience de debugging, Datadog recommande l'installation de [Pidcat][3].
  - pidcat filtre les logs de l'appareil (obtenus via `adb logcat`) afin d'afficher uniquement ceux issus de votre application.
  - Consultez [la solution à ce problème][4] si vous utilisez une machine dotée d'une puce M1 et ne possédez pas Python 2.
- Modifiez `node_modules/@datadog/mobile-react-native/android/src/main/kotlin/com/datadog/reactnative/DdSdk.kt` pour activer la journalisation détaillée à partir du SDK natif :

  ```java
  fun initialize(configuration: ReadableMap, promise: Promise) {
      // ...

      datadog.initialize(appContext, credentials, nativeConfiguration, trackingConsent)
      datadog.setVerbosity(Log.VERBOSE) // Add this line

      // ...
  }
  ```

- Exécutez l'app sur un téléphone connecté à votre ordinateur portable en mode debugging (ce dernier devrait s'afficher lors de l'exécution de `adb devices`) ou à partir d'un émulateur.
- Exécutez `my.app.package.name` ou `adb logcat` de pidcat à partir de votre ordinateur portable.
- Recherchez des erreurs mentionnant Datadog.

Le résultat pidcat ressemblera à ce qui suit :

{{< img src="real_user_monitoring/react_native/troubleshooting-pidcat-logs.png" alt="Exemple d'un résultat pidcat" >}}

Dans cet exemple, le dernier log indique que le lot de données RUM a été envoyé correctement.

## Symboles non définis : Swift

Si le message d'erreur suivant s'affiche :

```
Undefined symbols for architecture x86_64:
  "static Foundation.JSONEncoder.OutputFormatting.withoutEscapingSlashes.getter : Foundation.JSONEncoder.OutputFormatting", referenced from:
      static (extension in Datadog):Foundation.JSONEncoder.default() -> Foundation.JSONEncoder in libDatadogSDK.a(JSONEncoder.o)
...
```

Ouvrez Xcode, accédez aux `Build Settings` de votre projet (et non pas de l'application cible), puis assurez-vous que les chemins de recherche de bibliothèques comportent les paramètres suivants :

```shell
LIBRARY_SEARCH_PATHS = (
  "\"$(TOOLCHAIN_DIR)/usr/lib/swift/$(PLATFORM_NAME)\"",
  "\"/usr/lib/swift\"",
  "\"$(inherited)\"",
);
```

## Symboles non définis : _RCTModule

Si un symbole _RCTModule non défini s'affiche, l'erreur peut être liée à ce changement effectué dans le [changelog de la version 0.63 de React Native][5].

Vous pouvez apporter la modification suivante pour corriger le problème :

```objectivec
// DdSdk.m
// au lieu de
#import <React/RCTBridgeModule.h>
// peut-être ça :
@import React // ou @import React-Core
```

## Messages d'erreur affichés en boucle

Si vous constatez que [votre projet React Native affiche une boucle de messages d'erreur qui entraîne une utilisation plus intensive de votre CPU][5], essayez de créer un autre projet React Native.

## Échecs de build Android avec la version `2.*` du SDK

### `Unable to make field private final java.lang.String java.io.File.path accessible`

Si une erreur d'échec de votre build Android similaire à ce qui suit s'affiche :

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

Vous utilisez Java 17, qui n'est pas compatible avec votre version de React Native. Repassez à Java 11 pour résoudre le problème.

### `java.lang.UnsupportedClassVersionError`

Si une erreur d'échec de votre build Android similaire à ce qui suit s'affiche :

```
java.lang.UnsupportedClassVersionError: com/datadog/android/lint/DatadogIssueRegistry has been compiled by a more recent version of the Java Runtime (class file version 61.0), this version of the Java Runtime only recognizes class file versions up to 55.0
```

Vous utilisez une version obsolète de Java. Passez à Java 17 pour résoudre le problème.

### `Unsupported class file major version 61`

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

Vous utilisez une version du plug-in Android Gradle antérieure à la `5.0`. Pour résoudre le problème, Ajoutez ce qui suit à votre fichier `android/gradle.properties` :

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### `Duplicate class kotlin.collections.jdk8.*`

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
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.8.21") {
            because("kotlin-stdlib-jdk7 is now a part of kotlin-stdlib")
        }
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.8.21") {
            because("kotlin-stdlib-jdk8 is now a part of kotlin-stdlib")
        }
    }
}
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/help
[2]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/docs/migrating_to_datadog_provider.md
[3]: https://github.com/JakeWharton/pidcat
[4]: https://github.com/JakeWharton/pidcat/issues/180#issuecomment-1124019329
[5]: https://github.com/facebook/react-native/commit/6e08f84719c47985e80123c72686d7a1c89b72ed
[6]: https://github.com/facebook/react-native/issues/28801