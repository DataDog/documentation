---
aliases:
- /fr/real_user_monitoring/guide/getting-started-feature-flags/
- /fr/real_user_monitoring/guide/setup-feature-flag-data-collection/
beta: true
description: Apprenez à configurer RUM pour capturer les données de feature flag et
  analyser les performances dans Datadog.
disable_toc: false
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: En savoir plus sur le RUM Explorer
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Assurer la sécurité des versions grâce au suivi des feature flags dans Datadog
    RUM
title: Configurer Feature Flag Tracking
---
Les données de feature flag offrent une meilleure visibilité sur l'expérience utilisateur et la surveillance des performances. Elles vous permettent de déterminer quels utilisateurs voient une fonctionnalité spécifique et d'évaluer si les changements introduits affectent l'expérience utilisateur ou nuisent aux performances.

En enrichissant vos données RUM avec les données de feature flag, vous pouvez être certain que votre fonctionnalité est lancée avec succès sans provoquer involontairement de bug ou de régression de performance. Grâce à ce niveau d'analyse supplémentaire, vous pouvez corréler les versions des fonctionnalités avec les performances, identifier les problèmes liés à des versions spécifiques et résoudre les incidents plus rapidement.

## Configurez la surveillance RUM {#set-up-rum-monitoring}

Le suivi des feature flags est disponible dans les SDK RUM pour navigateur, iOS, Android, Flutter et React Native.

{{< tabs >}}
{{% tab "Browser" %}}

Pour activer la collecte de données de feature flag pour le Browser SDK :

1. Configurez la [surveillance RUM du navigateur][1]. Vous avez besoin de la version >= 4.25.0 du SDK RUM pour navigateur.

Par défaut, les données de feature flag sont collectées lors d'événements de vue et d'erreur. Pour collecter des données de feature flag sur d'autres types d'événements, définissez le paramètre d'initialisation `trackFeatureFlagsForEvents` sur une liste incluant `vital`, `action`, `long_task` ou `resource`.

[1]: /fr/real_user_monitoring/application_monitoring/browser#setup
{{% /tab %}}
{{% tab "iOS" %}}

Pour activer la collecte de données de feature flag pour votre application iOS :

1. Configurez la [surveillance RUM iOS][1]. Vous avez besoin de la version >= 1.16.0 du SDK RUM iOS.

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/?tab=swift
{{% /tab %}}
{{% tab "Android" %}}

Pour activer la collecte de données de feature flag pour votre application Android :

1. Configurez la [surveillance RUM Android][1]. Vous avez besoin de la version >= 1.18.0 du SDK RUM Android.

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/android/?tab=kotlin
{{% /tab %}}
{{% tab "Flutter" %}}

Pour activer la collecte de données de feature flag pour votre application Flutter :

1. Configurez [la surveillance RUM Flutter][1]. Vous avez besoin de la version >= 1.3.2 du plugin Flutter.

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/application_monitoring/flutter/setup
{{% /tab %}}
{{% tab "React Native" %}}

Pour activer la collecte de données de feature flag pour votre application React Native :

1. Configurez [la surveillance RUM React Native][1]. Vous avez besoin de la version >= 1.7.0 du SDK RUM React Native.

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/reactnative/
{{% /tab %}}
{{< /tabs >}}

## Configurez une intégration de feature flag {#set-up-a-feature-flag-integration}

Vous pouvez commencer à collecter des données de feature flag avec [des solutions personnalisées de gestion de feature flag](#custom-feature-flag-management), ou en utilisant l'un des partenaires d'intégration Datadog listés ci-dessous.

<div class="alert alert-danger">

**Remarque** : Les caractères spéciaux suivants ne sont pas pris en charge pour Feature Flag Tracking : `.`, `:`, `+`, `-`, `=`, `&&`, `||`, `>`, `<`, `!`, `(`, `)`, `{`, `}`, `[`, `]`, `^`, `"`, `“`, `”`, `~`, `*`, `?`, `\`. Datadog recommande d'éviter ces caractères autant que possible dans les noms de vos feature flags. Si vous devez utiliser l'un de ces caractères, remplacez le caractère avant d'envoyer les données à Datadog. Exemple :

  ```javascript
  datadogRum.addFeatureFlagEvaluation(key.replaceAll(':', '_'), value);
  ```

</div>

{{< card-grid card_width="200" >}}
  {{< image-card href="/feature_flags" src="integrations_logos/datadog_large.svg" alt="datadog" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=browser#amplitude-integration" src="integrations_logos/amplitude_large.svg" alt="amplitude" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=browser#configcat-integration" src="integrations_logos/configcat_large.svg" alt="custom" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=browser#custom-feature-flag-management" src="integrations_logos/docs_custom_feature_flag_systems_card.png" alt="custom" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#devcycle-integration" src="integrations_logos/devcycle_large.svg" alt="devcycle" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=browser#eppo-integration" src="integrations_logos/eppo_large.svg" alt="eppo" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#flagsmith-integration" src="integrations_logos/flagsmith_large.svg" alt="flagsmith" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/#growthbook-integration" src="integrations_logos/growthbook_large.svg" alt="growthbook" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#kameleoon-integration" src="integrations_logos/kameleoon.png" alt="kameleoon" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#launchdarkly-integration" src="integrations_logos/launchdarkly_large.svg" alt="launchdarkly" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#split-integration" src="integrations_logos/split_large.svg" alt="split" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#statsig-integration" src="integrations_logos/statsig_large.svg" alt="statsig" >}}
{{< /card-grid >}}

### Intégration Amplitude {#amplitude-integration}

Avant d'initialiser cette intégration de feature flag, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK d'Amplitude et créez un écouteur d'exposition qui rapporte les évaluations de feature flag à Datadog en utilisant l'extrait de code suivant :

Pour plus d'informations sur l'initialisation du SDK d'Amplitude, consultez la [documentation du SDK JavaScript][1] d'Amplitude.

```javascript
  const experiment = Experiment.initialize("CLIENT_DEPLOYMENT_KEY", {
    exposureTrackingProvider: {
      track(exposure: Exposure)  {
        // Send the feature flag when Amplitude reports the exposure
        datadogRum.addFeatureFlagEvaluation(exposure.flag_key, exposure.variant);
      }
    }
  })
```


[1]: https://www.docs.developers.amplitude.com/experiment/sdks/javascript-sdk/

{{% /tab %}}
{{% tab "iOS" %}}

Initialisez le SDK d'Amplitude et créez un inspecteur qui rapporte les évaluations de feature flag à Datadog en utilisant l'extrait de code ci-dessous.

Pour plus d'informations sur l'initialisation du SDK d'Amplitude, consultez la [documentation du SDK iOS][1] d'Amplitude.

```swift
  class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    func track(exposure: Exposure) {
      // Send the feature flag when Amplitude reports the exposure
      if let variant = exposure.variant {
        RUMMonitor.shared().addFeatureFlagEvaluation(name: exposure.flagKey, value: variant)
      }
    }
  }

  // In initialization:
  ExperimentConfig config = ExperimentConfigBuilder()
    .exposureTrackingProvider(DatadogExposureTrackingProvider(analytics))
    .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/ios-sdk/


{{% /tab %}}
{{% tab "Android" %}}

Initialisez le SDK d'Amplitude et créez un inspecteur qui rapporte les évaluations de feature flag à Datadog en utilisant l'extrait de code ci-dessous.

Pour plus d'informations sur l'initialisation du SDK d'Amplitude, consultez la [documentation du SDK Android][1] d'Amplitude.

```kotlin
internal class DatadogExposureTrackingProvider : ExposureTrackingProvider {
  override fun track(exposure: Exposure) {
      // Send the feature flag when Amplitude reports the exposure
      GlobalRumMonitor.get().addFeatureFlagEvaluation(
          exposure.flagKey,
          exposure.variant.orEmpty()
      )
  }
}

// In initialization:
val config = ExperimentConfig.Builder()
    .exposureTrackingProvider(DatadogExposureTrackingProvider())
    .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/android-sdk/


{{% /tab %}}
{{% tab "Flutter" %}}

Amplitude ne prend pas en charge cette intégration. Créez un ticket auprès d'Amplitude pour demander cette fonctionnalité.


{{% /tab %}}
{{< /tabs >}}

### Intégration ConfigCat {#configcat-integration}

Avant d'initialiser cette intégration de feature flag, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Lors de l'initialisation du SDK JavaScript de ConfigCat, abonnez-vous à l'événement `flagEvaluated` et signalez les évaluations de feature flag à Datadog :

```javascript
const configCatClient = configcat.getClient(
  '#YOUR-SDK-KEY#',
  configcat.PollingMode.AutoPoll,
  {
    setupHooks: (hooks) =>
      hooks.on('flagEvaluated', (details) => {
        datadogRum.addFeatureFlagEvaluation(details.key, details.value);
      })
  }
);
```

Pour plus d'informations sur l'initialisation du SDK Javascript de ConfigCat, consultez la [documentation du SDK JavaScript][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/js


{{% /tab %}}
{{% tab "iOS" %}}

Lors de l'initialisation du SDK Swift iOS de ConfigCat, abonnez-vous à l'événement `flagEvaluated` et signalez les évaluations de feature flag à Datadog :

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

Pour plus d'informations sur l'initialisation du SDK Swift (iOS) de ConfigCat, consultez la [documentation du SDK Swift iOS][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/ios


{{% /tab %}}
{{% tab "Android" %}}

Lors de l'initialisation du SDK Android de ConfigCat, abonnez-vous à l'événement `flagEvaluated` et signalez les évaluations de feature flag à Datadog :

```java
ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
  options.hooks().addOnFlagEvaluated(details -> {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
  });
});
```

Pour plus d'informations sur l'initialisation du SDK Android de ConfigCat, consultez la [documentation du SDK Android][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/android


{{% /tab %}}
{{% tab "Flutter" %}}

Lors de l'initialisation du SDK Dart de ConfigCat, abonnez-vous à l'événement `flagEvaluated` et signalez les évaluations de feature flag à Datadog :

```dart
  final client = ConfigCatClient.get(
    sdkKey: '#YOUR-SDK-KEY#',
    options: ConfigCatOptions(
        pollingMode: PollingMode.autoPoll(),
        hooks: Hooks(
            onFlagEvaluated: (details) => {
              DatadogSdk.instance.rum?.addFeatureFlagEvaluation(details.key, details.value);
            }
        )
    )
  );
```

Pour plus d'informations sur l'initialisation du SDK Dart (Flutter) de ConfigCat, consultez la [documentation du SDK Dart][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/dart


{{% /tab %}}


{{% tab "React Native" %}}

Lors de l'initialisation du SDK React de ConfigCat, abonnez-vous à l'événement `flagEvaluated` et signalez les évaluations de feature flag à Datadog :

```typescript
<ConfigCatProvider
  sdkKey="YOUR_SDK_KEY"
  pollingMode={PollingMode.AutoPoll}
  options={{
    setupHooks: (hooks) =>
      hooks.on('flagEvaluated', (details) => {
        DdRum.addFeatureFlagEvaluation(details.key, details.value);
      }),
  }}
>
  ...
</ConfigCatProvider>
```

Pour plus d'informations sur l'initialisation du SDK React de ConfigCat, consultez la [documentation du SDK React][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}
{{< /tabs >}}

### Gestion personnalisée de feature flag {#custom-feature-flag-management}

Avant d'initialiser une intégration de feature flag personnalisée, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Chaque fois qu'un feature flag est évalué, ajoutez la fonction suivante pour transmettre les informations sur les feature flags à RUM :

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Chaque fois qu'un feature flag est évalué, ajoutez la fonction suivante pour transmettre les informations sur les feature flags à RUM :

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Chaque fois qu'un feature flag est évalué, ajoutez la fonction suivante pour transmettre les informations sur les feature flags à RUM :

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Chaque fois qu'un feature flag est évalué, ajoutez la fonction suivante pour transmettre les informations sur les feature flags à RUM :

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

Chaque fois qu'un feature flag est évalué, ajoutez la fonction suivante pour transmettre les informations sur les feature flags à RUM :

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### Intégration DevCycle {#devcycle-integration}

Avant d'initialiser cette intégration de feature flag, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK de DevCycle et abonnez-vous à l'événement `variableEvaluated`, en choisissant de vous abonner à toutes les évaluations de variables `variableEvaluated:*` ou à des évaluations de variables particulières `variableEvaluated:my-variable-key`.

Pour plus d'informations sur l'initialisation du SDK de DevCycle, consultez la [documentation du SDK JavaScript de DevCycle][5] et pour plus d'informations sur le système d'événements de DevCycle, consultez la [documentation des événements du SDK de DevCycle][6].

```javascript
const user = { user_id: "<USER_ID>" };
const dvcOptions = { ... };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions);
...
dvcClient.subscribe(
    "variableEvaluated:*",
    (key, variable) => {
        // track all variable evaluations
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
...
dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
    (key, variable) => {
        // track a particular variable evaluation
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```


[5]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-install
[6]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-usage#subscribing-to-sdk-events
{{% /tab %}}
{{% tab "iOS" %}}

DevCycle ne prend pas en charge cette intégration. Créez un ticket auprès de [DevCycle][1] pour demander cette fonctionnalité.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "Android" %}}

DevCycle ne prend pas en charge cette intégration. Créez un ticket auprès de [DevCycle][1] pour demander cette fonctionnalité.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle ne prend pas en charge cette intégration. Créez un ticket auprès de [DevCycle][1] pour demander cette fonctionnalité.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "React Native" %}}

DevCycle ne prend pas en charge cette intégration. Créez un ticket auprès de [DevCycle][1] pour demander cette fonctionnalité.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{< /tabs >}}

### Intégration Eppo {#eppo-integration}

Avant d'initialiser cette intégration de feature flag, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK d'Eppo et créez un logger d'affectation qui signale en outre les évaluations de feature flag à Datadog en utilisant l'extrait de code ci-dessous.

Pour plus d'informations sur l'initialisation du SDK d'Eppo, consultez [la documentation du SDK JavaScript d'Eppo][1].

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    datadogRum.addFeatureFlagEvaluation(assignment.featureFlag, assignment.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

[1]: https://docs.geteppo.com/sdks/client-sdks/javascript
{{% /tab %}}
{{% tab "iOS" %}}

Initialisez le SDK d'Eppo et créez un logger d'affectation qui signale en outre les évaluations de feature flag à Datadog en utilisant l'extrait de code ci-dessous.

Pour plus d'informations sur l'initialisation du SDK d'Eppo, consultez [la documentation du SDK iOS d'Eppo][1].

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/client-sdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Initialisez le SDK d'Eppo et créez un logger d'affectation qui signale en outre les évaluations de feature flag à Datadog en utilisant l'extrait de code ci-dessous.

Pour plus d'informations sur l'initialisation du SDK d'Eppo, consultez [la documentation du SDK Android d'Eppo][1].

```java
AssignmentLogger logger = new AssignmentLogger() {
    @Override
    public void logAssignment(Assignment assignment) {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(assignment.getFeatureFlag(), assignment.getVariation());
    }
};

EppoClient eppoClient = new EppoClient.Builder()
    .apiKey("YOUR_API_KEY")
    .assignmentLogger(logger)
    .application(application)
    .buildAndInit();
```


[1]: https://docs.geteppo.com/sdks/client-sdks/android

{{% /tab %}}
{{% tab "Flutter" %}}

Eppo ne prend pas en charge cette intégration. [Contactez Eppo][1] pour demander cette fonctionnalité.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

Initialisez le SDK d'Eppo et créez un logger d'affectation qui signale en outre les évaluations de feature flag à Datadog en utilisant l'extrait de code ci-dessous.

Pour plus d'informations sur l'initialisation du SDK d'Eppo, consultez [la documentation du SDK React Native d'Eppo][1].

```typescript
const assignmentLogger: IAssignmentLogger = {
  logAssignment(assignment) {
    DdRum.addFeatureFlagEvaluation(assignment.featureFlag, assignment.variation);
  },
};

await eppoInit({
  apiKey: "<API_KEY>",
  assignmentLogger,
});
```

[1]: https://docs.geteppo.com/sdks/client-sdks/react-native

{{% /tab %}}
{{< /tabs >}}

### Intégration Flagsmith {#flagsmith-integration}

Avant d'initialiser cette intégration de feature flag, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK de Flagsmith avec l'option `datadogRum`, qui signale les évaluations de feature flag à Datadog en utilisant l'extrait de code ci-dessous.

   Vous pouvez éventuellement configurer le client afin que les attributs Flagsmith soient envoyés à Datadog via `datadogRum.setUser()`. Pour plus d'informations sur l'initialisation du SDK de Flagsmith, consultez [la documentation du SDK JavaScript de Flagsmith][1].

   ```javascript
    // Initialize the Flagsmith SDK
    flagsmith.init({
        datadogRum: {
            client: datadogRum,
            trackTraits: true,
        },
        ...
    })
   ```


[1]: https://docs.flagsmith.com/clients/javascript
{{% /tab %}}
{{% tab "iOS" %}}

Flagsmith ne prend pas en charge cette intégration. Créez un ticket auprès de Flagsmith pour demander cette fonctionnalité.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith ne prend pas en charge cette intégration. Créez un ticket auprès de Flagsmith pour demander cette fonctionnalité.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith ne prend pas en charge cette intégration. Créez un ticket auprès de Flagsmith pour demander cette fonctionnalité.

{{% /tab %}}
{{% tab "React Native" %}}

Flagsmith ne prend actuellement pas en charge cette intégration. Créez un ticket auprès de Flagsmith pour demander cette fonctionnalité.

{{% /tab %}}
{{< /tabs >}}

### Intégration GrowthBook {#growthbook-integration}

{{< tabs >}}
{{% tab "Browser" %}}

Lors de l'initialisation du SDK GrowthBook, signalez les évaluations des feature flags à Datadog en utilisant le callback `onFeatureUsage`.

Pour plus d'informations sur l'initialisation du SDK de GrowthBook, consultez [la documentation du SDK JavaScript de GrowthBook][1].

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/js#step-1-configure-your-app

{{% /tab %}}
{{% tab "iOS" %}}

GrowthBook ne prend pas en charge cette intégration. Contactez GrowthBook pour demander cette fonctionnalité.

{{% /tab %}}
{{% tab "Android" %}}

Lors de l'initialisation du SDK GrowthBook, signalez les évaluations des feature flags à Datadog en appelant `setFeatureUsageCallback`.

Pour plus d'informations sur l'initialisation du SDK de GrowthBook, consultez la [documentation du SDK Android de GrowthBook][1].

```kotlin
val gbBuilder = GBSDKBuilder(...)

gbBuilder.setFeatureUsageCallback { featureKey, result ->
  GlobalRumMonitor.get().addFeatureFlagEvaluation(featureKey, result.value);
}

val gb = gbBuilder.initialize()
```

[1]: https://docs.growthbook.io/lib/kotlin#quick-usage

{{% /tab %}}
{{% tab "Flutter" %}}

Lors de l'initialisation du SDK GrowthBook, signalez les évaluations des feature flags à Datadog en appelant `setFeatureUsageCallback`.

Pour plus d'informations sur l'initialisation du SDK de GrowthBook, consultez la [documentation du SDK Flutter de GrowthBook][1].

```dart
final gbBuilder = GBSDKBuilderApp(...);
gbBuilder.setFeatureUsageCallback((featureKey, result) {
  DatadogSdk.instance.rum?.addFeatureFlagEvaluation(featureKey, result.value);
});
final gb = await gbBuilder.initialize();
```

[1]: https://docs.growthbook.io/lib/flutter#quick-usage

{{% /tab %}}
{{% tab "React Native" %}}

Lors de l'initialisation du SDK GrowthBook, signalez les évaluations des feature flags à Datadog en utilisant le callback `onFeatureUsage`.

Pour plus d'informations sur l'initialisation du SDK de GrowthBook, consultez la [documentation du SDK React Native de GrowthBook][1].

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/react-native#step-1-configure-your-app

{{% /tab %}}
{{< /tabs >}}

### Intégration Kameleoon {#kameleoon-integration}

Avant d'initialiser cette intégration de feature flag, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Après avoir créé et initialisé le SDK Kameleoon, abonnez-vous à l'événement `Evaluation` en utilisant le handler `onEvent`.

Pour plus d'informations sur le SDK, consultez la [documentation du SDK JavaScript de Kameleoon][1].

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon ne prend pas en charge cette intégration. Contactez product@kameleoon.com pour demander cette fonctionnalité.

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon ne prend pas en charge cette intégration. Contactez product@kameleoon.com pour demander cette fonctionnalité.

{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon ne prend pas en charge cette intégration. Contactez product@kameleoon.com pour demander cette fonctionnalité.

{{% /tab %}}
{{% tab "React Native" %}}

Après avoir créé et initialisé le SDK Kameleoon, abonnez-vous à l'événement `Evaluation` en utilisant le handler `onEvent`.

Apprenez-en davantage sur l'initialisation du SDK dans la [documentation du SDK React Native de Kameleoon][1].

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/react-js-sdk
{{% /tab %}}
{{< /tabs >}}

### Intégration LaunchDarkly {#launchdarkly-integration}

Avant d'initialiser cette intégration de feature flag, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK de LaunchDarkly et créez un inspecteur qui signale les évaluations des feature flags à Datadog en utilisant l'extrait de code ci-dessous.

 Pour plus d'informations sur l'initialisation du SDK de LaunchDarkly, consultez la [documentation du SDK JavaScript de LaunchDarkly][1].

```javascript
const client = LDClient.initialize("<CLIENT_SIDE_ID>", "<CONTEXT>", {
  inspectors: [
    {
      type: "flag-used",
      name: "dd-inspector",
      method: (key: string, detail: LDClient.LDEvaluationDetail) => {
        datadogRum.addFeatureFlagEvaluation(key, detail.value);
      },
    },
  ],
});
```


[1]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
{{% /tab %}}
{{% tab "iOS" %}}

LaunchDarkly ne prend pas en charge cette intégration. Créez un ticket auprès de LaunchDarkly pour demander cette fonctionnalité.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly ne prend pas en charge cette intégration. Créez un ticket auprès de LaunchDarkly pour demander cette fonctionnalité.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly ne prend pas en charge cette intégration. Créez un ticket auprès de LaunchDarkly pour demander cette fonctionnalité.


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly ne prend actuellement pas en charge cette intégration. Créez un ticket auprès de LaunchDarkly pour demander cette fonctionnalité.


{{% /tab %}}
{{< /tabs >}}


### Intégration Split {#split-integration}

Avant d'initialiser cette intégration de feature flag, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK de Split et créez un impression listener qui signale les évaluations des feature flags à Datadog en utilisant l'extrait de code suivant :

Pour plus d'informations sur l'initialisation du SDK de Split, consultez la [documentation du SDK JavaScript de Split][1].

```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<APP_KEY>",
      key: "<USER_ID>",
    },
    impressionListener: {
      logImpression(impressionData) {
          datadogRum
              .addFeatureFlagEvaluation(
                  impressionData.impression.feature,
                  impressionData.impression.treatment
              );
    },
  },
});

const client = factory.client();
```


[1]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{% tab "iOS" %}}

Initialisez le SDK de Split et créez un inspecteur qui signale les évaluations des feature flags à Datadog en utilisant l'extrait de code ci-dessous.

Pour plus d'informations sur l'initialisation du SDK de Split, consultez la [documentation du SDK iOS][1] de Split.

```swift
  let config = SplitClientConfig()
  // Send the feature flag when Split reports the impression
  config.impressionListener = { impression in
      if let feature = impression.feature,
          let treatment = impression.treatment {
          RUMMonitor.shared().addFeatureFlagEvaluation(name: feature, value: treatment)
      }
  }
```


[1]: https://help.split.io/hc/en-us/articles/360020401491-iOS-SDK
{{% /tab %}}
{{% tab "Android" %}}

Initialisez le SDK de Split et créez un inspecteur qui signale les évaluations des feature flags à Datadog en utilisant l'extrait de code ci-dessous.

Pour plus d'informations sur l'initialisation du SDK de Split, consultez la [documentation du SDK Android][1] de Split.

```kotlin
internal class DatadogSplitImpressionListener : ImpressionListener {
  override fun log(impression: Impression) {
      // Send the feature flag when Split reports the impression
      GlobalRumMonitor.get().addFeatureFlagEvaluation(
          impression.split(),
          impression.treatment()
      )
  }
  override fun close() {
  }
}

// In initialization:
val apikey = BuildConfig.SPLIT_API_KEY
val config = SplitClientConfig.builder()
    .impressionListener(DatadogSplitImpressionListener())
    .build()
```


[1]: https://help.split.io/hc/en-us/articles/360020343291-Android-SDK
{{% /tab %}}
{{% tab "Flutter" %}}

Initialisez le SDK de Split et créez un inspecteur qui signale les évaluations des feature flags à Datadog en utilisant l'extrait de code ci-dessous.

Pour plus d'informations sur l'initialisation du SDK de Split, consultez la [documentation du plugin Flutter][1] de Split.

```dart
  StreamSubscription<Impression> impressionsStream = _split.impressionsStream().listen((impression) {
    // Send the feature flag when Split reports the impression
    final split = impression.split;
    final treatment = impression.treatment;
    if (split != null && treatment != null) {
      DatadogSdk.instance.rum?.addFeatureFlagEvaluation(split, treatment);
    }
  });
```


[1]: https://help.split.io/hc/en-us/articles/8096158017165-Flutter-plugin
{{% /tab %}}
{{% tab "React Native" %}}

Initialisez le SDK de Split et créez un impression listener qui signale les évaluations des feature flags à Datadog en utilisant l'extrait de code suivant :

Pour plus d'informations sur l'initialisation du SDK de Split, consultez la [documentation du SDK React Native][1] de Split.

```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<APP_KEY>",
      key: "<USER_ID>",
    },
    impressionListener: {
      logImpression(impressionData) {
          DdRum
              .addFeatureFlagEvaluation(
                  impressionData.impression.feature,
                  impressionData.impression.treatment
              );
    },
  },
});

const client = factory.client();
```


[1]: https://help.split.io/hc/en-us/articles/4406066357901-React-Native-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
{{% /tab %}}
{{< /tabs >}}

### Intégration Statsig {#statsig-integration}

Avant d'initialiser cette intégration de feature flag, assurez-vous d'avoir [configuré la surveillance RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK de Statsig avec `statsig.initialize`.

1. Mettez à jour votre version du SDK Browser RUM vers la version 4.25.0 ou supérieure.
2. Initialisez le SDK de Statsig (`>= v4.34.0`) et implémentez l'option `gateEvaluationCallback` comme indiqué ci-dessous :

   ```javascript
    await statsig.initialize('client-<STATSIG CLIENT KEY>',
    {userID: '<USER ID>'},
    {
        gateEvaluationCallback: (key, value) => {
            datadogRum.addFeatureFlagEvaluation(key, value);
        }
    }
    );
   ```

[1]: https://docs.statsig.com/client/jsClientSDK
{{% /tab %}}
{{% tab "iOS" %}}

Statsig ne prend pas en charge cette intégration. Contactez support@statsig.com pour demander cette fonctionnalité.

{{% /tab %}}
{{% tab "Android" %}}

Statsig ne prend pas en charge cette intégration. Contactez support@statsig.com pour demander cette fonctionnalité.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig ne prend pas en charge cette intégration. Contactez support@statsig.com pour demander cette fonctionnalité.

{{% /tab %}}
{{% tab "React Native" %}}

Statsig ne prend actuellement pas en charge cette intégration. Contactez support@statsig.com pour demander cette fonctionnalité.

{{% /tab %}}
{{< /tabs >}}

### Étapes suivantes {#next-steps}

[Affichez et analysez][1] vos feature flags.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/feature_flag_tracking/using_feature_flags