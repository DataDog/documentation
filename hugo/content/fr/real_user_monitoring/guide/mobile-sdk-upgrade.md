---
description: Guide de migration pour la mise à niveau entre les versions majeures
  des SDK mobiles RUM, Logs et Trace, avec des changements incompatibles et de nouvelles
  fonctionnalités.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans l'Explorer
- link: /real_user_monitoring/guide/mobile-sdk-deprecation-policy
  tag: Documentation
  text: Politique d'obsolescence des SDK Mobile Datadog
title: Mettre à niveau les SDK RUM Mobile
---
## Présentation {#overview}

Suivez ce guide pour migrer entre les versions majeures des SDK Mobile RUM, Logs et Trace. Consultez la documentation de chaque SDK pour plus de détails sur ses fonctionnalités et ses capacités.


**Migrations les plus courantes** :
- [**v2 vers v3**](#from-v2-to-v3) : Mettant l'accent sur la suppression d'Open Tracing et les mises à jour de l'API
- [**v1 vers v2**](#from-v1-to-v2) : Changements architecturaux majeurs en vue d'une conception modulaire

## De la v2 à la v3 {#from-v2-to-v3}
{{< tabs >}}
{{% tab "Android" %}}

La transition de la version 2 à la version 3 se concentre sur la suppression de la prise en charge du projet Open Tracing hérité, améliorant ainsi la stabilité et la cohérence du SDK.

{{% /tab %}}

{{% tab "iOS" %}}

La migration de la v2 vers la v3 se concentre sur la rationalisation des modules, l'affinement des valeurs par défaut et l'amélioration de la fiabilité des fonctionnalités du produit.

Tous les produits SDK (RUM, Trace, Logs, Session Replay, etc.) restent modulaires et séparés en bibliothèques distinctes. Le changement principal est que le module `DatadogObjc` a été supprimé, son contenu ayant été intégré aux modules de produit correspondants.

{{% /tab %}}

{{% tab "React Native" %}}

La migration de la v2 vers la v3 se concentre sur l'alignement de la configuration avec le comportement du SDK modulaire v3 et sur la consolidation de la propriété de la configuration entre `CoreConfiguration`, `RumConfiguration`, `LogsConfiguration` et `TraceConfiguration`.

Veuillez lire [le guide MIGRATION.md][1] dans le dépôt officiel React Native pour obtenir la liste complète des changements.

<div class="alert alert-warning">
<strong>Important :</strong> Contrairement à la v2.x (qui activait toujours tous les modules de fonctionnalités lors de l'initialisation du SDK), la v3 <strong>n'initialise</strong> et n'active aucun module de fonctionnalité à moins que vous ne transmettiez explicitement sa configuration.
</div>

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}
{{< /tabs >}}

### Modules {#modules}
{{< tabs >}}
{{% tab "Android" %}}

<div class="alert alert-danger">
Datadog suit la <a href="https://developer.android.com/jetpack/androidx/versions#version-table">politique de version des bibliothèques AndroidX</a> de Google pour les <code>AndroidX</code> bibliothèques, de sorte que le niveau d'API Android minimum pris en charge par le SDK v3 est <code>23</code>.
</div>

**Prérequis** :
- Kotlin 1.9 est requis
- La dépendance `Open Tracing` a été supprimée car elle est obsolète


{{% /tab %}}

{{% tab "iOS" %}}

Les bibliothèques continuent d'être modularisées dans la v3. Adoptez les bibliothèques suivantes :

- `DatadogCore`
- `DatadogCrashReporting`
- `DatadogLogs`
- `DatadogRUM`
- `DatadogSessionReplay`
- `DatadogTrace`
- `DatadogWebViewTracking`

<details>
  <summary>SPM (Recommandé)</summary>

  ```swift
let package = Package(
    ...
    dependencies: [
        .package(url: "https://github.com/DataDog/dd-sdk-ios", from: "3.0.0")
    ],
    targets: [
        .target(
            ...
            dependencies: [
                .product(name: "DatadogCore", package: "dd-sdk-ios"),
                .product(name: "DatadogCrashReporting", package: "dd-sdk-ios"),
                .product(name: "DatadogLogs", package: "dd-sdk-ios"),
                .product(name: "DatadogRUM", package: "dd-sdk-ios"),
                .product(name: "DatadogSessionReplay", package: "dd-sdk-ios"),
                .product(name: "DatadogTrace", package: "dd-sdk-ios"),
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
  pod 'DatadogCrashReporting'
  pod 'DatadogLogs'
  pod 'DatadogRUM'
  pod 'DatadogSessionReplay'
  pod 'DatadogTrace'
  pod 'DatadogWebViewTracking'
  ```
</details>

<details>
  <summary>Carthage</summary>

Le `Cartfile` reste le même :
  ```
  github "DataDog/dd-sdk-ios"
  ```

Dans Xcode, vous **devez** lier les frameworks suivants :
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

Ensuite, vous pouvez sélectionner les modules que vous souhaitez utiliser :
  ```
  DatadogCrashReporting.xcframework
  DatadogLogs.xcframework
  DatadogRUM.xcframework
  DatadogSessionReplay.xcframework
  DatadogTrace.xcframework
  DatadogWebViewTracking.xcframework
  ```
</details>

{{% /tab %}}

{{% tab "React Native" %}}

Consultez [le guide MIGRATION.md][1] dans le dépôt officiel React Native pour connaître les étapes de mise à niveau recommandées et les mises à jour de dépendances requises.

<div class="alert alert-warning">
<strong>Important :</strong> Dans la v3, les modules de fonctionnalités ne sont activés que si vous transmettez leur configuration lors de l'initialisation (par exemple, RUM / Logs / Trace). Si vous omettez une configuration de fonctionnalité, cette fonctionnalité n'est ni initialisée ni activée.
</div>

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}

{{< /tabs >}}

### Modifications requises et mises à jour de l'API {#required-changes-and-api-updates}
{{< tabs >}}
{{% tab "Android" %}}

### Core {#core}

<div class="alert alert-info">
<strong>Action requise :</strong> Dans le SDK v3, l'ID des informations utilisateur devient obligatoire, et la <code>null</code> La valeur ne peut plus être fournie.
</div>

Modifications de l'API :

| `2.x`                                                         | `3.0`                                                              |
|---------------------------------------------------------------|--------------------------------------------------------------------|
| `Datadog.setUserInfo(null, "Jane Smith", "jane@example.com")` | `Datadog.setUserInfo("user123", "Jane Smith", "jane@example.com")` |

### RUM {#rum}

Nous avons apporté des améliorations mineures aux modules RUM. Ils ne nécessitent pas de changements importants dans votre code, mais il est utile de vérifier si vous pouvez refactoriser certains paramètres redondants.

L'URL fournie dans la méthode `useCustomEndpoint` doit être l'URL complète de l'endpoint
(`https://example.com/rum/upload`), et non seulement le nom d'hôte :

```kotlin
Rum.enable(
  RumConfiguration.Builder(...)
      .useCustomEndpoint("https://example.com/rum/upload")
      .build()
)
```

Modifications de l'API :

| `2.x`                                                                               | `3.0`                                                                                |
|-------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|
| `DatadogRumMonitor.startResource(String, String, String,Map<String, Any?>)`         | Utilisez la méthode `startResource` qui prend `RumHttpMethod` comme paramètre `method` au lieu de |
L'objet | `com.datadog.android.rum.GlobalRum`                                                 | `GlobalRum` a été renommé en `com.datadog.android.rum.GlobalRumMonitor`         |
| `com.datadog.android.rum.RumMonitor.addAction()`                                    | Le paramètre `attributes: Map<String, Any?>` est facultatif                                |
| `com.datadog.android.rum.RumMonitor.startAction()`                                  | Le paramètre `attributes: Map<String, Any?>` est facultatif                                |
| `com.datadog.android.rum.RumMonitor.stopResource()`                                 | Le paramètre `attributes: Map<String, Any?>` est facultatif                                |
| `com.datadog.android.rum.RumMonitor.addError()`                                     | Le paramètre `attributes: Map<String, Any?>` est facultatif                                |
| `com.datadog.android.rum.RumMonitor.addErrorWithStacktrace()`                       | Le paramètre `attributes: Map<String, Any?>` est facultatif                                |
| `com.datadog.android.rum.internal.monitor.AdvancedNetworkRumMonitor.stopResource()` | Le paramètre `attributes: Map<String, Any?>` est facultatif                                |
| `com.datadog.android.rum.internal.monitor.AdvancedNetworkRumMonitor.stopResource()` | Le paramètre `attributes: Map<String, Any?>` est facultatif                                |

### Logs {#logs}

Le produit Logs ne signale plus les erreurs fatales. Pour activer Error Tracking pour les plantages, Crash Reporting doit être activé conjointement avec RUM.

L'URL fournie dans la méthode `useCustomEndpoint` doit être l'URL complète de l'endpoint
(`https://example.com/logs/upload`), et non seulement le nom d'hôte :

```kotlin
Logs.enable(
  LogsConfiguration.Builder()
      .useCustomEndpoint("https://example.com/logs/upload")
      .build()
)
```

### Trace {#trace}

L'URL fournie dans la méthode `useCustomEndpoint` doit être l'URL complète de l'endpoint
(par ex. : `https://example.com/trace/upload`), et non seulement le nom d'hôte, c'est-à-dire :

```kotlin
Trace.enable(
  TraceConfiguration.Builder()
      .useCustomEndpoint(`https://example.com/trace/upload`)
      .build()
)
```

Le projet [`Open Tracing`](https://opentracing.io/) a été marqué comme archivé et n'est plus pris en charge. Les dépendances `Open Tracing` ont été supprimées du SDK v3.

Le SDK Datadog prend déjà en charge [`Open Telemetry`](https://opentelemetry.io/), qui est la méthode recommandée pour utiliser l'API de fonctionnalité de traçage.

**Notez** que la bibliothèque de spécification `Open Telemetry` [ nécessite](https://github.com/open-telemetry/opentelemetry-java?tab=readme-ov-file#requirements) que le desugaring soit activé pour les projets avec un `minSdk` < 26.

#### Migration du traçage de `Open Tracing` vers `Open Telemetry` (recommandé) {#migrating-tracing-from-open-tracing-to-open-telemetry-recommended}

1. Ajoutez la dépendance `Open Telemetry` à votre `build.gradle.kts` :

```kotlin
implementation(project("com.datadoghq:dd-sdk-android-trace-otel:x.x.x"))
```

2. Remplacez la configuration `Open Tracing` :

```kotlin
GlobalTracer.registerIfAbsent(
  AndroidTracer.Builder()
    .setService(BuildConfig.APPLICATION_ID)
    .build()
)
```

par la configuration `Open Telemetry` :

```kotlin
GlobalOpenTelemetry.set(
  DatadogOpenTelemetry(BuildConfig.APPLICATION_ID)
)
```

Pour accéder à l'objet traceur pour un traçage manuel (personnalisé), utilisez `io.opentelemetry.api.GlobalOpenTelemetry.get()` au lieu de `io.opentracing.util.GlobalTracer.get()`.
Exemple :

```kotlin
val tracer: Tracer = GlobalOpenTelemetry
  .get()
  .getTracer("SampleApplicationTracer")

val span = tracer
  .spanBuilder("Executing operation")
  .startSpan()

// Code that should be instrumented

span.end()
```

Consultez la `Open Telemetry`[documentation](https://opentelemetry.io/docs/) officielle pour plus de détails.

#### Migration du traçage de `Open Tracing` vers `DatadogTracing` (période de transition) {#migrating-tracing-from-open-tracing-to-datadogtracing-transition-period}

<div class="alert alert-danger">Cette option a été ajoutée pour la compatibilité et pour simplifier la transition d'Open Tracing vers Open Telemetry, mais elle pourrait ne pas être disponible dans les futures versions majeures. Datadog recommande d'utiliser Open Telemetry comme standard pour les tâches de traçage. Cependant, s'il n'est pas possible d'activer le « desugaring » dans votre projet pour une raison quelconque, vous pouvez utiliser cette méthode.</div>
Remplacez la configuration `Open Tracing` :

```kotlin
GlobalTracer.registerIfAbsent(
  AndroidTracer.Builder()
    .setService(BuildConfig.APPLICATION_ID)
    .build()
)
```

par la configuration `DatadogTracing` :

```kotlin
GlobalDatadogTracer.registerIfAbsent(
  DatadogTracing.newTracerBuilder()
    .build()
)
```

Pour un traçage manuel (personnalisé), utilisez `com.datadog.android.trace.GlobalDatadogTracer.get()` au lieu de `io.opentracing.util.GlobalTracer.get()` pour accéder à l'objet traceur.
Exemple :

```kotlin
val tracer = GlobalDatadogTracer.get()

val span = tracer
  .buildSpan("Executing operation")
  .start()

// Code that should be instrumented

span.finish()
```
Consultez la [documentation](https://docs.datadoghq.com/fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/android?tab=kotlin) Datadog pour plus de détails.

Modifications de l'API :

| `2.x`                                     | `3.0` `Open Telemetry`                     | `3.0` `Datadog API`                                     |
|-------------------------------------------|--------------------------------------------|---------------------------------------------------------|
| `io.opentracing.util.GlobalTracer`        | `io.opentelemetry.api.GlobalOpenTelemetry` | `com.datadog.android.trace.GlobalDatadogTracer`         |
| `com.datadog.android.trace.AndroidTracer` | `io.opentelemetry.api.trace.Tracer`        | `com.datadog.android.trace.api.tracer.DatadogTracer`    |
| `io.opentracing.Span`                     | `io.opentelemetry.api.trace.Span`          | `com.datadog.android.trace.api.span.DatadogSpan`        |
| `io.opentracing.Scope`                    | `io.opentelemetry.context.Scope`           | `com.datadog.android.trace.api.scope.DatadogScope`      |
| `io.opentracing.SpanContext`              | `io.opentelemetry.api.trace.SpanContext`   | `com.datadog.android.trace.api.span.DatadogSpanContext` |

Conseils de remplacement :

| `2.x`                                         | `3.0` `Open Telemetry`                                | `3.0` `Datadog API`                               |
|-----------------------------------------------|-------------------------------------------------------|---------------------------------------------------|
| `AndroidTracer.Builder().build()`             |                                                       | `DatadogTracing.newTracerBuilder().build()`       |
| `AndroidTracer.setPartialFlushThreshold(Int)` | `OtelTracerProvider.setPartialFlushThreshold()`       | `DatadogTracerBuilder.withPartialFlushMinSpans()` |
| `io.opentracing.SpanContext.toTraceId()`      | `io.opentelemetry.api.trace.SpanContext.getTraceId()` | `DatadogSpanContext.traceId.toString()`           |
| `io.opentracing.Span.setError()`              | `io.opentelemetry.api.trace.recordException()`        | `DatadogSpan.addThrowable()`                      |

### Instrumentation OkHttp {#okhttp-instrumentation}

L'instrumentation OkHttp (`com.datadoghq:dd-sdk-android-okhttp:x.x.x`) ne nécessite pas la prise en charge du « desugaring ». Cependant, quelques actions de migration peuvent être nécessaires.

Modifications de l'API :

| `2.x`                                                                                                                                  | `3.0`                                       |
|----------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| `TracingInterceptor(String, List<String>, TracedRequestListener,Sampler<Span>)`                                                        | Utilisez `TracingInterceptor.Builder()` à la place. |
| `TracingInterceptor(String?,Map<String, Set<TracingHeaderType>>, TracedRequestListener, Sampler<Span>)`                                | Utilisez `TracingInterceptor.Builder()` à la place. |
| `TracingInterceptor(String?,TracedRequestListener,Sampler<Span>)`                                                                      | Utilisez `TracingInterceptor.Builder()` à la place. |
| `DatadogInterceptor(String?, Map<String, Set<TracingHeaderType>>,TracedRequestListener, RumResourceAttributesProvider, Sampler<Span>)` | Utilisez `DatadogInterceptor.Builder()` à la place. |
| `DatadogInterceptor(String?,List<String>,TracedRequestListener,RumResourceAttributesProvider,Sampler<Span>)`                           | Utilisez `DatadogInterceptor.Builder()` à la place. |
| `DatadogInterceptor(String?,TracedRequestListener,RumResourceAttributesProvider,Sampler<Span>) `                                       | Utilisez `DatadogInterceptor.Builder()` à la place. |


### Session Replay {#session-replay}

L'URL fournie dans la méthode `useCustomEndpoint` doit être l'URL complète de l'endpoint
(par ex. : `https://example.com/session_replay/upload`), et non seulement le nom d'hôte, c'est-à-dire :

```kotlin
SessionReplay.enable(
  SessionReplayConfiguration.Builder(...)
      .useCustomEndpoint("https://example.com/session_replay/upload")
      .build()
)
```

{{% /tab %}}
{{% tab "iOS" %}}

Le SDK doit être initialisé le plus tôt possible dans le cycle de vie de l'application, spécifiquement dans le rappel `application(_:didFinishLaunchingWithOptions:)` de `AppDelegate`. Cela garantit une mesure précise de toutes les métriques, y compris la durée de démarrage de l'application. Pour les applications créées avec SwiftUI, utilisez `@UIApplicationDelegateAdaptor` pour accéder à `AppDelegate`.

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: .granted
)
```

**Remarque** : L'initialisation du SDK ailleurs (par exemple plus tard lors du chargement de la vue) peut entraîner des données de télémétrie inexactes ou manquantes, en particulier concernant les performances de démarrage de l'application.

<div class="alert alert-info">
<strong>Action requise :</strong> L'API pour définir les informations utilisateur nécessite le <code>id</code> le paramètre, qui était facultatif dans la version 2.x.
</div>

| `2.x`                               | `3.0`                              |
|-------------------------------------|------------------------------------|
| `Datadog.setUserInfo(id: nil, name: "Jane Smith", email: "jane@example.com")` | `Datadog.setUserInfo(id: "user123", name: "Jane Smith", email: "jane@example.com")` |

### RUM {#rum-1}

Les attributs au niveau de la vue RUM sont automatiquement propagés à tous les événements enfants associés, y compris les ressources, les actions utilisateur, les erreurs et les tâches longues. Cela garantit la cohérence des métadonnées entre les événements, facilitant ainsi le filtrage et la corrélation des données sur les tableaux de bord Datadog.

Pour gérer plus efficacement les attributs au niveau de la vue, de nouvelles API ont été ajoutées :
- `Monitor.addViewAttribute(forKey:value:)`
- `Monitor.addViewAttributes(_:)`
- `Monitor.removeViewAttribute(forKey:)`
- `Monitor.removeViewAttributes(forKeys:)`

Autres changements notables :
- Toutes les API RUM Objective-C sont incluses dans `DatadogRUM`. Le module `DatadogObjc` séparé n'est plus disponible.
- Les blocages d'application et les arrêts par le watchdog ne sont plus signalés depuis les extensions d'application ou les widgets.
- Une nouvelle propriété `trackMemoryWarnings` a été ajoutée à `RUM.Configuration` pour signaler les avertissements de mémoire en tant qu'erreurs RUM.

Modifications de l'API :

|`2.x`|`3.0`|
|---|---|
|-|`RUM.Configuration.trackMemoryWarnings`|
|`RUMView(path:attributes:)`|`RUMView(name:attributes:isUntrackedModal:)`|
|-|`Monitor.addViewAttribute(forKey:value:)`|
|-|`Monitor.addViewAttributes(:)`|
|-|`Monitor.removeViewAttribute(forKey:)`|
|-|`Monitor.removeViewAttributes(forKeys:)`|

### Logs {#logs-1}

Le produit Logs ne signale plus les erreurs fatales. Pour activer Error Tracking pour les plantages, Crash Reporting doit être activé conjointement avec RUM.

De plus, toutes les Objective-C Logs APIs sont incluses dans `DatadogLogs`. Le module `DatadogObjc` séparé n'est plus disponible.

### Trace {#trace-1}

L'échantillonnage des traces est désormais déterministe lorsqu'il est utilisé avec RUM. Il utilise le RUM `session.id` pour garantir un échantillonnage cohérent.

Également :
- La configuration `Trace.Configuration.URLSessionTracking.FirstPartyHostsTracing` définit l'échantillonnage pour toutes les requêtes par défaut et le contexte de trace est injecté uniquement dans les requêtes échantillonnées.
- Toutes les Objective-C Trace APIs sont incluses dans `DatadogTrace`. Le module `DatadogObjc` séparé n'est plus disponible.

**Remarque** : Une configuration similaire existe dans `RUM.Configuration.URLSessionTracking.FirstPartyHostsTracing`.

### Session Replay {#session-replay-1}

Les paramètres de confidentialité sont plus granulaires. Le paramètre `defaultPrivacyLevel` précédent a été remplacé par :
- `textAndInputPrivacyLevel`
- `imagePrivacyLevel`
- `touchPrivacyLevel`

En savoir plus sur les [niveaux de confidentialité][1].

Modifications de l'API :

|`2.x`|`3.0`|
|---|---|
|`SessionReplay.Configuration(replaySampleRate:defaultPrivacyLevel:startRecordingImmediately:customEndpoint:)`|`SessionReplay.Configuration(replaySampleRate:textAndInputPrivacyLevel:imagePrivacyLevel:touchPrivacyLevel:startRecordingImmediately:customEndpoint:featureFlags:)`|
|`SessionReplay.Configuration(replaySampleRate:defaultPrivacyLevel:startRecordingImmediately:customEndpoint:)`|`SessionReplay.Configuration(replaySampleRate:textAndInputPrivacyLevel:imagePrivacyLevel:touchPrivacyLevel:startRecordingImmediately:customEndpoint:featureFlags:)`|

### URLSession Instrumentation {#urlsession-instrumentation}

Pour activer l'instrumentation URLSession, assurez-vous également d'activer RUM et/ou Trace pour effectuer des rapports vers ces produits respectifs.

Les types de délégués hérités ont été remplacés par une API d'instrumentation unifiée :

|`2.x`|`3.0`|
|---|---|
|`DatadogURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|
|`DDURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|
|`DDNSURLSessionDelegate()`|`URLSessionInstrumentation.enable(with:)`|

[1]: /fr/session_replay/privacy_options?platform=ios

{{% /tab %}}

{{% tab "React Native" %}}

Veuillez lire [le guide MIGRATION.md][1] dans le dépôt officiel React Native.

<div class="alert alert-warning">
<strong>Important :</strong> Contrairement à la v2.x (qui activait toujours tous les modules de fonctionnalités lors de l'initialisation du SDK), la v3 <strong>n'initialise</strong> et n'active aucun module de fonctionnalité à moins que vous ne transmettiez explicitement sa configuration.
</div>

### Modifications de configuration {#configuration-changes}

Certaines propriétés de configuration ont été déplacées, renommées, supprimées ou divisées :

| Propriété | Nouvel emplacement | Modifications |
| :--- | :--- | :--- |
| `sampleRate` | *Supprimé* | Propriété obsolète supprimée. |
| `sessionSamplingRate` | `RumConfiguration` | Déplacé et renommé en `sessionSampleRate`. |
| `resourceTracingSamplingRate` | `RumConfiguration` | Déplacé et renommé en `resourceTraceSampleRate`. |
| `proxyConfig` | `CoreConfiguration` | Renommé en `proxyConfiguration`. |
| `serviceName` | `CoreConfiguration` | Renommé en `service`. |
| `customEndpoints` | *Divisé* | Divisé en `customEndpoint` au sein de `RumConfiguration`, `LogsConfiguration` et `TraceConfiguration`. |
| *(Nouvelle propriété)* | `CoreConfiguration` | `attributeEncoders` ajoutée. |
| *(Nouvelle propriété)* | `RumConfiguration` | `trackMemoryWarnings` ajoutée. |
| `nativeCrashReportEnabled` | `RumConfiguration` | Déplacé. |
| `nativeViewTracking` | `RumConfiguration` | Déplacé. |
| `nativeInteractionTracking` | `RumConfiguration` | Déplacé. |
| `firstPartyHosts` | `RumConfiguration` | Utilisation forcée du type `FirstPartyHost[]` et déplacé. |
| `telemetrySampleRate` | `RumConfiguration` | Déplacé. |
| `nativeLongTaskThresholdMs` | `RumConfiguration` | Déplacé. |
| `longTaskThresholdMs` | `RumConfiguration` | Déplacé. |
| `vitalsUpdateFrequency` | `RumConfiguration` | Déplacé. |
| `trackFrustrations` | `RumConfiguration` | Déplacé. |
| `trackBackgroundEvents` | `RumConfiguration` | Déplacé. |
| `bundleLogsWithRum` | `LogsConfiguration` | Déplacé. |
| `bundleLogsWithTraces` | `LogsConfiguration` | Déplacé. |
| `trackNonFatalAnrs` | `RumConfiguration` | Déplacé. |
| `appHangThreshold` | `RumConfiguration` | Déplacé. |
| `initialResourceThreshold` | `RumConfiguration` | Déplacé. |
| `trackWatchdogTerminations` | `RumConfiguration` | Déplacé. |
| `actionNameAttribute` | `RumConfiguration` | Déplacé. |
| `logEventMapper` | `LogsConfiguration` | Déplacé. |
| `errorEventMapper` | `RumConfiguration` | Déplacé. |
| `resourceEventMapper` | `RumConfiguration` | Déplacé. |
| `actionEventMapper` | `RumConfiguration` | Déplacé. |
| `useAccessibilityLabel` | `RumConfiguration` | Déplacé. |
| `trackInteractions` | `RumConfiguration` | Déplacé. |
| `trackResources` | `RumConfiguration` | Déplacé. |
| `trackErrors` | `RumConfiguration` | Déplacé. |

### Structures renommées {#renamed-structures}

| `2.x` | `3.x` |
|---|---|
| `DdSdkConfiguration` | `CoreConfiguration` |

### Mises à jour de l'API {#api-updates}

En plus des changements de propriété de configuration (configurations Core vs feature), plusieurs types publics et API ont été renommés ou déplacés pour correspondre à la conception modulaire de la v3. Consultez [le guide MIGRATION.md][1] pour obtenir la liste officielle et des exemples de code.

[1]: https://github.com/DataDog/dd-sdk-reactnative/blob/develop/MIGRATION.md

{{% /tab %}}

{{< /tabs >}}

## De la v1 à la v2 {#from-v1-to-v2}
{{< tabs >}}
{{% tab "Android" %}}

La migration de la v1 vers la v2 représente une migration d'un SDK monolithique vers une architecture modulaire. RUM, Trace, Logs, Session Replay, etc. possèdent chacun des modules individuels, vous permettant d'intégrer uniquement ce qui est nécessaire dans votre application.

Le SDK v2 offre une disposition d'API unifiée et un alignement des noms entre le SDK iOS, le SDK Android et les autres produits Datadog.

Le SDK v2 permet l'utilisation de [Mobile Session Replay][2] sur les applications Android et iOS.

[2]: /fr/session_replay/?platform=android

{{% /tab %}}
{{% tab "iOS" %}}

La migration de la v1 vers la v2 représente une migration d'un SDK monolithique vers une architecture modulaire. RUM, Trace, Logs, Session Replay, etc. possèdent chacun des modules individuels, vous permettant d'intégrer uniquement ce qui est nécessaire dans votre application.

Le SDK v2 offre une disposition d'API unifiée et un alignement des noms entre le SDK iOS, le SDK Android et les autres produits Datadog.

Le SDK v2 permet l'utilisation de [Mobile Session Replay][3] sur les applications Android et iOS.

[3]: /fr/session_replay/?platform=ios

{{% /tab %}}
{{% tab "React Native" %}}

La migration vers la version 2 offre des performances supérieures par rapport à la version 1.

{{% /tab %}}
{{% tab "Flutter" %}}

La migration vers la version 2 offre des performances supérieures par rapport à la version 1. De plus, les SDK Native v2 proposent des fonctionnalités supplémentaires.

{{% /tab %}}
{{< /tabs >}}

### Modules {#modules-1}
{{< tabs >}}
{{% tab "Android" %}}

Les artefacts sont modularisés dans la v2. Adoptez les artefacts suivants :

* RUM : `com.datadoghq:dd-sdk-android-rum:x.x.x`
* Logs : `com.datadoghq:dd-sdk-android-logs:x.x.x`
* Trace : `com.datadoghq:dd-sdk-android-trace:x.x.x`
* Session Replay : `com.datadoghq:dd-sdk-android-session-replay:x.x.x`
* WebView Tracking : `com.datadoghq:dd-sdk-android-webview:x.x.x`
* OkHttp instrumentation : `com.datadoghq:dd-sdk-android-okhttp:x.x.x`

**Remarque** : Si vous utilisez NDK Crash Reporting et WebView Tracking, vous devez ajouter les artefacts RUM et Logs pour signaler les événements à RUM et Logs respectivement.

La référence à l'artefact `com.datadoghq:dd-sdk-android` doit être supprimée de votre script de build Gradle, car cet artefact n'existe plus.

**Remarque** : Les coordonnées Maven de tous les autres artefacts restent les mêmes.

<div class="alert alert-danger">v2 ne prend pas en charge l'API Android 19 (KitKat). Le SDK minimum pris en charge est désormais l'API 21 (Lollipop). Kotlin 1.7 est requis. Le SDK lui-même est compilé avec Kotlin 1.8, donc un compilateur Kotlin 1.6 ou inférieur ne peut pas lire les métadonnées des classes du SDK.</div>

Si jamais vous rencontrez une erreur semblable à ce qui suit :

```
A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
```

Ajoutez les règles suivantes à votre script de build (plus de détails dans le [problème Stack Overflow][4] correspondant) :

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

Consultez l'[exemple d'application Android][5] pour savoir comment configurer le SDK.

[4]: https://stackoverflow.com/a/75298544
[5]: https://github.com/DataDog/dd-sdk-android/tree/develop/sample

{{% /tab %}}
{{% tab "iOS" %}}

Les bibliothèques sont modularisées dans la v2. Adoptez les bibliothèques suivantes :

- `DatadogCore`
- `DatadogLogs`
- `DatadogTrace`
- `DatadogSessionReplay`
- `DatadogRUM`
- `DatadogWebViewTracking`

Celles-ci s'ajoutent aux `DatadogCrashReporting` et `DatadogObjc` existantes.

<details>
  <summary>SPM (Recommandé)</summary>

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

Le `Cartfile` reste le même :
  ```
  github "DataDog/dd-sdk-ios"
  ```

Dans Xcode, vous **devez** lier les frameworks suivants :
  ```
  DatadogInternal.xcframework
  DatadogCore.xcframework
  ```

Ensuite, vous pouvez sélectionner les modules que vous souhaitez utiliser :
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

**Remarque** : Lorsque vous utilisez Crash Reporting et WebView Tracking, vous devez ajouter les modules RUM et Logs pour signaler les événements à RUM et Logs respectivement.

{{% /tab %}}

{{% tab "React Native" %}}

Mettez à jour `@datadog/mobile-react-native` dans votre package.json :

```json
"@datadog/mobile-react-native": "2.0.0"
```

Mettez à jour vos pods iOS :

```bash
(cd ios && bundle exec pod update)
```

Si vous utilisez une version de React Native strictement supérieure à `0.67`, utilisez la version 17 de Java. Si vous utilisez une version de React Native égale ou inférieure à `0.67`, utilisez la version 11 de Java. Pour vérifier votre version de Java, exécutez la commande suivante dans un terminal :

```bash
java --version
```

### Pour React Native < 0.73 {#for-react-native-073}

Dans votre fichier `android/build.gradle`, spécifiez `kotlinVersion` pour éviter les conflits entre les dépendances Kotlin :

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

### Pour React Native < 0.68 {#for-react-native-068}

Dans votre fichier `android/build.gradle`, spécifiez `kotlinVersion` pour éviter les conflits entre les dépendances Kotlin :

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Si vous utilisez une version de `com.android.tools.build:gradle` inférieure à `5.0` dans votre `android/build.gradle`, ajoutez dans votre fichier `android/gradle.properties` :

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

### Dépannage {#troubleshooting}

#### Le build Android échoue avec `Unable to make field private final java.lang.String java.io.File.path accessible` {#android-build-fails-with-unable-to-make-field-private-final-javalangstring-javaiofilepath-accessible}

Si votre build Android échoue avec une erreur telle que :

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:processReleaseMainManifest'.
> Unable to make field private final java.lang.String java.io.File.path accessible: module java.base does not "opens java.io" to unnamed module @1bbf7f0e
```

Vous utilisez Java 17, qui n'est pas compatible avec votre version de React Native. Passez à Java 11 pour résoudre le problème.

#### La compilation Android échoue avec `Unsupported class file major version 61` {#android-build-fails-with-unsupported-class-file-major-version-61}

Si votre build Android échoue avec une erreur telle que :

```
FAILURE: Build failed with an exception.

* What went wrong:
Could not determine the dependencies of task ':app:lintVitalRelease'.
> Could not resolve all artifacts for configuration ':app:debugRuntimeClasspath'.
   > Failed to transform dd-sdk-android-core-2.0.0.aar (com.datadoghq:dd-sdk-android-core:2.0.0) to match attributes {artifactType=android-manifest, org.gradle.category=library, org.gradle.dependency.bundling=external, org.gradle.libraryelements=aar, org.gradle.status=release, org.gradle.usage=java-runtime}.
      > Execution failed for JetifyTransform: /Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar.
         > Failed to transform '/Users/me/.gradle/caches/modules-2/files-2.1/com.datadoghq/dd-sdk-android-core/2.0.0/a97f8a1537da1de99a86adf32c307198b477971f/dd-sdk-android-core-2.0.0.aar' using Jetifier. Reason: IllegalArgumentException, message: Unsupported class file major version 61. (Run with --stacktrace for more details.)
```

Vous utilisez une version du plugin Android Gradle inférieure à `5.0`. Pour résoudre le problème, ajoutez dans votre fichier `android/gradle.properties` :

```properties
android.jetifier.ignorelist=dd-sdk-android-core
```

#### La compilation Android échoue avec `Duplicate class kotlin.collections.jdk8.*` {#android-build-fails-with-duplicate-class-kotlincollectionsjdk8}

Si votre build Android échoue avec une erreur telle que :

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkReleaseDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
   > Duplicate class kotlin.collections.jdk8.CollectionsJDK8Kt found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk8-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk8:1.7.20)
     Duplicate class kotlin.internal.jdk7.JDK7PlatformImplementations found in modules jetified-kotlin-stdlib-1.8.10 (org.jetbrains.kotlin:kotlin-stdlib:1.8.10) and jetified-kotlin-stdlib-jdk7-1.7.20 (org.jetbrains.kotlin:kotlin-stdlib-jdk7:1.7.20)
```

Vous devez définir une version de Kotlin pour votre projet afin d'éviter les conflits entre les dépendances Kotlin. Dans votre fichier `android/build.gradle`, spécifiez le `kotlinVersion` :

```groovy
buildscript {
    ext {
        // targetSdkVersion = ...
        kotlinVersion = "1.8.21"
    }
}
```

Alternativement, vous pouvez ajouter les règles suivantes à votre script de compilation dans votre fichier `android/app/build.gradle` :

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

Mettez à jour `datadog_flutter_plugin` dans votre pubspec.yaml :

```yaml
dependencies:
  'datadog_flutter_plugin: ^2.0.0
```

## Dépannage {#troubleshooting-1}

### Interface en double (iOS) {#duplicate-interface-ios}

Si vous voyez cette erreur lors de la compilation iOS après la mise à niveau vers `datadog_flutter_plugin` v2.0 :

```
Semantic Issue (Xcode): Duplicate interface definition for class 'DatadogSdkPlugin'
/Users/exampleuser/Projects/test_app/build/ios/Debug-iphonesimulator/datadog_flutter_plugin/datadog_flutter_plugin.framework/Headers/DatadogSdkPlugin.h:6:0
```

Essayez d'effectuer `flutter clean && flutter pub get` et de recompiler. Cela résout généralement le problème.

### Classes dupliquées (Android) {#duplicate-classes-android}

Si vous voyez cette erreur lors de la compilation d'Android après la mise à niveau vers `datadog_flutter_plugin` v2.0 :

```
FAILURE: Build failed with an exception.

* What went wrong:
Execution failed for task ':app:checkDebugDuplicateClasses'.
> A failure occurred while executing com.android.build.gradle.internal.tasks.CheckDuplicatesRunnable
```

Assurez-vous d'avoir mis à jour votre version de Kotlin vers au moins 1.8 dans votre fichier `build.gradle`.

{{% /tab %}}

{{< /tabs >}}

### Initialisation du SDK {#sdk-initialization}
{{< tabs >}}
{{% tab "Android" %}}
Avec l'extraction de différents produits dans des modules indépendants, la configuration du SDK est organisée par module.

`com.datadog.android.core.configuration.Configuration.Builder` La classe présente les changements suivants :

* Le jeton client, le nom de l'environnement, le nom de la variante (la valeur par défaut est une chaîne vide) et le nom du service (la valeur par défaut est l'ID d'application extrait du manifeste) doivent être fournis dans le constructeur.
* La classe `com.datadog.android.core.configuration.Credentials` est supprimée.
* `logsEnabled`, `tracesEnabled` et `rumEnabled` sont supprimés du constructeur au profit d'une configuration de produit individuelle (voir ci-dessous).
* `crashReportsEnabled` L'argument du constructeur est supprimé. Vous pouvez activer ou désactiver le rapport de plantage JVM avec la méthode `Configuration.Builder.setCrashReportsEnabled`. Par défaut, le rapport de plantage JVM est activé.
* Les méthodes de configuration des produits RUM, Logs et Trace sont supprimées de `Configuration.Builder` au profit de la configuration de produit individuelle (voir ci-dessous).

La méthode `Datadog.initialize` n'inclut plus la classe `Credentials` dans la liste des arguments.

Le package `com.datadog.android.plugin` et toutes les classes/méthodes associées sont supprimés.

### Logs {#logs-2}

Toutes les classes liées au produit Logs sont strictement contenues dans le package `com.datadog.android.log`.

Pour utiliser la fonctionnalité de logs, importez l'artefact suivant :

```kotlin
implementation("com.datadoghq:dd-sdk-android-logs:x.x.x")
```

Vous pouvez activer le produit Logs avec l'extrait suivant :

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
|`com.datadog.android.log.Logger.Builder.setDatadogLogsEnabled`|Cette méthode a été supprimée. Utilisez `com.datadog.android.log.Logger.Builder.setRemoteSampleRate(0f)` à la place pour désactiver l'envoi de logs à Datadog.|
|`com.datadog.android.log.Logger.Builder.setServiceName`|`com.datadog.android.log.Logger.Builder.setService`|
|`com.datadog.android.log.Logger.Builder.setDatadogLogsMinPriority`|`com.datadog.android.log.Logger.Builder.setRemoteLogThreshold`|

### Trace {#trace-2}

Toutes les classes liées au produit Trace sont strictement contenues dans le package `com.datadog.android.trace` (cela signifie que toutes les classes résidant auparavant dans `com.datadog.android.tracing` ont été déplacées).

Pour utiliser le produit Trace, importez l'artefact suivant :

```kotlin
implementation("com.datadoghq:dd-sdk-android-trace:x.x.x")
```

Vous pouvez activer le produit Trace avec l'extrait suivant :

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

### RUM {#rum-2}

Toutes les classes liées au produit RUM sont strictement contenues dans le package `com.datadog.android.rum`.

Pour utiliser le produit RUM, importez l'artefact suivant :

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

### Rapport de crash NDK {#ndk-crash-reporting}

Le nom de l'artefact reste le même qu'auparavant : `com.datadoghq:dd-sdk-android-ndk:x.x.x`.

Vous pouvez activer le rapport de crash NDK avec l'extrait suivant :

```kotlin
NdkCrashReports.enable()
```

Cette configuration remplace l'appel `com.datadog.android.core.configuration.Configuration.Builder.addPlugin`.

**Note** : Vous devez avoir activé les produits RUM et Logs pour recevoir les rapports de crash NDK dans RUM et Logs respectivement.

### Suivi WebView {#webview-tracking}

Le nom de l'artefact reste le même qu'auparavant : `com.datadoghq:dd-sdk-android-webview:x.x.x`

Vous pouvez activer le suivi WebView avec l'extrait suivant :

```kotlin
WebViewTracking.enable(webView, allowedHosts)
```

**Note** : Vous devez avoir activé les produits RUM et Logs pour recevoir les événements provenant de WebView dans RUM et Logs respectivement.

Modifications de l'API :

|`1.x`|`2.0`|
|---|---|
|`com.datadog.android.webview.DatadogEventBridge`|Cette méthode est devenue une classe `internal`. Utilisez `WebViewTracking` à la place.|
|`com.datadog.android.rum.webview.RumWebChromeClient`|Cette classe a été supprimée. Utilisez `WebViewTracking` à la place.|
|`com.datadog.android.rum.webview.RumWebViewClient`|Cette classe a été supprimée. Utilisez `WebViewTracking` à la place.|

### Suivi OkHttp {#okhttp-tracking}

Pour utiliser le suivi OkHttp, importez l'artefact suivant :

```kotlin
implementation("com.datadoghq:dd-sdk-android-okhttp:x.x.x")
```

L'instrumentation OkHttp prend en charge l'initialisation du SDK Datadog après le client OkHttp, ce qui vous permet de créer `com.datadog.android.okhttp.DatadogEventListener`, `com.datadog.android.okhttp.DatadogInterceptor` et `com.datadog.android.okhttp.trace.TracingInterceptor` avant d'initialiser le SDK Datadog. L'instrumentation OkHttp commence à signaler les événements à Datadog une fois que le SDK Datadog est initialisé.

`com.datadog.android.okhttp.DatadogInterceptor` et `com.datadog.android.okhttp.trace.TracingInterceptor` vous permettent tous deux de contrôler l'échantillonnage de manière dynamique grâce à l'intégration avec un système de configuration à distance.

Pour ajuster dynamiquement l'échantillonnage, fournissez votre propre implémentation de l'interface `com.datadog.android.core.sampling.Sampler` dans le constructeur `com.datadog.android.okhttp.DatadogInterceptor`/`com.datadog.android.okhttp.trace.TracingInterceptor`. Il est interrogé pour chaque requête afin de prendre la décision d'échantillonnage.

### `dd-sdk-android-ktx` suppression du module {#dd-sdk-android-ktx-module-removal}

Pour améliorer la granularité des SDK Datadog utilisés, le module `dd-sdk-android-ktx` est supprimé. Le code est réparti entre les autres modules pour fournir des méthodes d'extension pour les fonctionnalités RUM et Trace.

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

### Session Replay {#session-replay-2}

Pour obtenir des instructions sur la configuration de Mobile Session Replay, consultez [Mobile Session Replay Setup and Configuration][6].

[6]: /fr/session_replay/setup_and_configuration/?platform=android

{{% /tab %}}
{{% tab "iOS" %}}

Avec l'extraction de différents produits dans des modules indépendants, la configuration du SDK est organisée par module.

> Le SDK doit être initialisé avant d'activer tout produit.

Le modèle Builder de l'initialisation du SDK a été supprimé au profit de définitions de structures. L'exemple suivant montre comment une initialisation `1.x` se traduirait en `2.0`.

**Initialisation V1**

```swift
import Datadog

Datadog.initialize(
    appContext: .init(),
    trackingConsent: .granted,
    configuration: Datadog.Configuration
        .builderUsing(
            clientToken: "<client token>",
            environment: "<environment>"
        )
        .set(serviceName: "<service name>")
        .build()
```
**Initialisation V2**

```swift
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
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

### Logs {#logs-3}

Toutes les classes liées aux Logs se trouvent strictement dans le module `DatadogLogs`. Vous devez d'abord activer le produit :

```swift
import DatadogLogs

Logs.enable(with: Logs.Configuration(...))
```

Vous pouvez ensuite créer votre instance de logger :

```swift
import DatadogLogs

let logger = Logger.create(
    with: Logger.Configuration(name: "<logger name>")
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

### Trace {#trace-3}

Toutes les classes liées à Trace se trouvent strictement dans le module `DatadogTrace`. Vous devez d'abord activer le produit :

```swift
import DatadogTrace

Trace.enable(
    with: Trace.Configuration(...)
)
```

Ensuite, vous pouvez accéder à l'instance partagée du Tracer :

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

### RUM {#rum-3}

Toutes les classes liées à RUM se trouvent strictement dans le module `DatadogRUM`. Vous devez d'abord activer le produit :

```swift
import DatadogRUM

RUM.enable(
    with: RUM.Configuration(applicationID: "<RUM Application ID>")
)
```

Ensuite, vous pouvez accéder à l'instance partagée du monitor RUM :

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

### Rapports de crash {#crash-reporting}

Pour activer les rapports de crash, assurez-vous d'activer RUM et les Logs pour qu'ils rapportent respectivement à ces produits.

```swift
import DatadogCrashReporting

CrashReporting.enable()
```

|`1.x`|`2.0`|
|---|---|
|`Datadog.Configuration.Builder.enableCrashReporting()`|`CrashReporting.enable()`|

### Suivi WebView {#webview-tracking-1}

Pour activer le suivi WebView, assurez-vous également d'activer RUM et les Logs pour qu'ils rapportent respectivement à ces produits.

```swift
import WebKit
import DatadogWebViewTracking

let webView = WKWebView(...)
WebViewTracking.enable(webView: webView)
```

|`1.x`|`2.0`|
|---|---|
|`WKUserContentController.startTrackingDatadogEvents`|`WebViewTracking.enable(webView:)`|

### Session Replay {#session-replay-3}

Pour obtenir des instructions sur la configuration de Mobile Session Replay, consultez [Mobile Session Replay Setup and Configuration][7].

[7]: /fr/session_replay/setup_and_configuration/?platform=ios

{{% /tab %}}
{{% tab "React Native" %}}

Aucun changement dans l'initialisation du SDK n'est nécessaire.

{{% /tab %}}

{{% tab "Flutter" %}}

## Modifications de la configuration du SDK {#sdk-configuration-changes}

Certaines propriétés de configuration ont été déplacées ou renommées, afin de prendre en charge la modularité dans les SDK natifs de Datadog.

Les structures suivantes ont été renommées :

| `1.x` | `2.x` |
|-------|-------|
| `DdSdkConfiguration` | `DatadogConfiguration` |
| `LoggingConfiguration` | `DatadogLoggingConfiguration` |
| `RumConfiguration` | `DatadogRumConfiguration` |
| `DdSdkExistingConfiguration` | `DatadogAttachConfiguration` |

Les propriétés suivantes ont été modifiées :

| 1.x | 2.x | Notes |
|-------|-------|-------|
| `DdSdkConfiguration.trackingConsent`| Supprimé | Fait partie de `Datadog.initialize` | |
| `DdSdkConfiguration.customEndpoint` | Supprimé | Désormais configuré par fonctionnalité | |
| `DdSdkConfiguration.serviceName` | `DatadogConfiguration.service` | |
| `DdSdkConfiguration.logEventMapper` | `DatadogLoggingConfiguration.eventMapper` | |
| `DdSdkConfiguration.customLogsEndpoint` | `DatadogLoggingConfiguration.customEndpoint` | |
| `DdSdkConfiguration.telemetrySampleRate` | `DatadogRumConfiguration.telemetrySampleRate` | |

De plus, les API suivantes ont été modifiées :

| 1.x | 2.x | Notes |
|-------|-------|-------|
| `Verbosity` | Supprimé | Voir `CoreLoggerLevel` ou `LogLevel` |
| `DdLogs DatadogSdk.logs` | `DatadogLogging DatadogSdk.logs` | Type modifié |
| `DdRum DatadogSdk.rum` | `DatadogRum DatadogSdk.rum` | Type modifié
| `Verbosity DatadogSdk.sdkVerbosity` | `CoreLoggerLevel DatadogSdk.sdkVerbosity` |
| `DatadogSdk.runApp` | `DatadogSdk.runApp` | Ajout du paramètre `trackingConsent`|
| `DatadogSdk.initialize` | `DatadogSdk.initialize` | Ajout du paramètre `trackingConsent`|
| `DatadogSdk.createLogger` | `DatadogLogging.createLogger` | Déplacé |

## Modifications de Flutter Web {#flutter-web-changes}

Les clients utilisant Flutter Web doivent passer au SDK Datadog Browser v5. Modifiez l'importation suivante dans votre `index.html` :

```diff
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v4.js"></script>
-  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-rum-slim-v4.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-logs.js"></script>
+  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v5/datadog-rum-slim.js"></script>
```

**Remarque** : Datadog fournit un bundle CDN par site. Consultez le [README du SDK Browser](https://github.com/DataDog/browser-sdk/#cdn-bundles) pour obtenir la liste de toutes les URL de site.

## Modifications du produit Logs {#logs-product-changes}

Comme pour la v1, la journalisation Datadog peut être activée en définissant le membre `DatadogConfiguration.loggingConfiguration`. Cependant, contrairement à la v1, Datadog ne crée pas de logger par défaut pour vous. `DatadogSdk.logs` est désormais une instance de `DatadogLogging`, qui peut être utilisée pour créer des logs. De nombreuses options ont été déplacées vers `DatadogLoggerConfiguration` pour offrir aux développeurs un contrôle plus granulaire sur les loggers individuels.

Les API suivantes ont été modifiées :

| 1.x | 2.x | Notes |
|-------|-------|-------|
| `LoggingConfiguration` | `DatadogLoggingConfiguration` | Renommés, la plupart des membres se trouvent désormais sur `DatadogLoggerConfiguration` |
| `LoggingConfiguration.sendNetworkInfo` | `DatadogLoggerConfiguration.networkInfoEnabled` | |
| `LoggingConfiguration.printLogsToConsole` | `DatadogLoggerConfiguration.customConsoleLogFunction` | |
| `LoggingConfiguration.sendLogsToDatadog` | Supprimé. Utilisez `remoteLogThreshold` à la place | |
| `LoggingConfiguration.datadogReportingThreshold` | `DatadogLoggerConfiguration.remoteLogThreshold` | |
| `LoggingConfiguration.bundleWithRum` | `DatadogLoggerConfiguration.bundleWithRumEnabled` | |
| `LoggingConfiguration.bundleWithTrace` | `DatadogLoggerConfiguration.bundleWithTraceEnabled` | |
| `LoggingConfiguration.loggerName` | `DatadogLoggerConfiguration.name` | |
| `LoggingConfiguration.sampleRate` | `DatadogLoggerConfiguration.remoteSampleRate` | |

## Modifications du produit RUM {#rum-product-changes}

Les API suivantes ont été modifiées :

| 1.x | 2.x | Notes |
|-------|-------|-------|
| `RumConfiguration` | `DatadogRumConfiguration` | Type renommé |
| `RumConfiguration.vitalsUpdateFrequency` | `DatadogRumConfiguration.vitalsUpdateFrequency` | Définissez sur `null` pour désactiver les mises à jour des indicateurs vitaux |
| `RumConfiguration.tracingSampleRate` | `DatadogRumConfiguration.traceSampleRate` |
| `RumConfiguration.rumViewEventMapper` | `DatadogRumConfiguration.viewEventMapper` |
| `RumConfiguration.rumActionEventMapper` | `DatadogRumConfiguration.actionEventMapper` |
| `RumConfiguration.rumResourceEventMapper` | `DatadogRumConfiguration.resourceEventMapper` |
| `RumConfiguration.rumErrorEventMapper` | `DatadogRumConfiguration.rumErrorEventMapper` |
| `RumConfiguration.rumLongTaskEventMapper` | `DatadogRumConfiguration.longTaskEventMapper` |
| `RumUserActionType` | `RumActionType` | Type renommé |
| `DdRum.addUserAction` | `DdRum.addAction` | |
| `DdRum.startUserAction` | `DdRum.startAction` | |
| `DdRum.stopUserAction` | `DdRum.stopAction` | |
| `DdRum.startResourceLoading` | `DdRum.startResource` | |
| `DdRum.stopResourceLoading` | `DdRum.stopResource` | |
| `DdRum.stopResourceLoadingWithError` | `DdRum.stopResourceWithError` | |

De plus, les mappeurs d'événements ne vous permettent plus de modifier leurs noms de vue. Pour renommer une vue, utilisez plutôt un [`ViewInfoExtractor`](https://pub.dev/documentation/datadog_flutter_plugin/latest/datadog_flutter_plugin/ViewInfoExtractor.html) personnalisé.


{{% /tab %}}

{{< /tabs >}}


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}