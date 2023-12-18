---
aliases:
- /fr/real_user_monitoring/guide/getting-started-feature-flags/
beta: true
description: Découvrir comment configurer RUM pour capturer les données des feature
  flags et analyser les performances dans Datadog
further_reading:
- link: /real_user_monitoring/feature_flag_tracking
  tag: Documentation
  text: Analyser les données de vos feature flags avec le suivi des feature flags
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiser vos données RUM dans le RUM Explorer
kind: guide
title: Débuter avec les données des feature flags dans RUM
---

<div class="alert alert-warning">
    Le suivi des feature flags est disponible en version bêta.
</div>


## Présentation
Les données des feature flags vous permettent de bénéficier d'une visibilité accrue sur l'expérience de vos utilisateurs et sur la surveillance de vos performances. Grâce à ces informations, vous pouvez identifier les utilisateurs qui utilisent une fonctionnalité précise et vérifier si les modifications que vous apportez nuisent à l'expérience utilisateur ou aux performances.

Ajoutez les données des feature flags à vos données RUM afin de garantir le succès du lancement de votre fonctionnalité et d'éviter tout bug ou toute baisse des performances. Grâce à ces insights supplémentaires, vous pouvez mettre en corrélation les versions des fonctionnalités avec les performances, identifier les problèmes liés à des versions spécifiques et corriger plus rapidement les problèmes.

## Configuration

{{< tabs >}}
{{% tab "Browser" %}}

Le suivi des feature flags est disponible dans le SDK Browser RUM. Pour commencer à utiliser cette fonctionnalité, configurez la [surveillance Browser RUM][1]. La version 4.25.0 ou une version ultérieure du SDK Browser RUM est requise.

Pour commencer à recueillir les données des feature flags, initialisez le SDK RUM et configurez le paramètre d'initialisation `enableExperimentalFeatures` avec `["feature_flags"]`.

<details open>
  <summary>npm</summary>

```javascript
  import { datadogRum } from '@datadog/browser-rum';

  // Initialiser le SDK Browser Datadog
  datadogRum.init({
    ...
    enableExperimentalFeatures: ["feature_flags"],
    ...
});
```

</details>

<details>
  <summary>CDN asynchrone</summary>

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      enableExperimentalFeatures: ["feature_flags"],
      ...
    })
})
```
</details>

<details>
  <summary>CDN synchrone</summary>

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
      ...
      enableExperimentalFeatures: ["feature_flags"],
      ...
    })
```
</details>
<br/>

[1]: /fr/real_user_monitoring/browser#setup
{{% /tab %}}
{{% tab "iOS" %}}

Le suivi des feature flags est disponible dans le SDK iOS RUM. Pour commencer à utiliser cette fonctionnalité, configurez la [surveillance iOS RUM][1]. La version 1.16.0 ou une version ultérieure du SDK iOS RUM est requise.

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/ios/?tab=swift
{{% /tab %}}
{{% tab "Android" %}}

Le suivi des feature flags est disponible dans le SDK Android RUM. Pour commencer à utiliser cette fonctionnalité, configurez la [surveillance Android RUM][1]. La version 1.18.0 ou une version ultérieure du SDK Android RUM est requise.

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/android/?tab=kotlin
{{% /tab %}}
{{% tab "Flutter" %}}

Le suivi des feature flags est disponible pour vos applications Flutter. Pour commencer à utiliser cette fonctionnalité, configurez la [surveillance Flutter RUM][1]. La version 1.3.2 ou une version ultérieure du plug-in Flutter est requise.

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/mobile_and_tv_monitoring/setup/flutter/
{{% /tab %}}
{{% tab "React Native" %}}

Le suivi des feature flags est disponible pour vos applications React Native. Pour commencer à utiliser cette fonctionnalité, configurez la [surveillance React Native RUM][1]. La version 1.7.0 ou une version ultérieure du SDK React Native RUM est requise.

[1]: https://docs.datadoghq.com/fr/real_user_monitoring/reactnative/
{{% /tab %}}
{{< /tabs >}}

## Intégrations

Vous pouvez commencer à recueillir des données de feature flags avec les [solutions de gestion personnalisée des feature flags](#gestion-personnalisee-des-feature-flags) ou en utilisant l'un des partenaires d'intégration de Datadog.

Datadog prend en charge les intégrations avec :
{{< partial name="rum/rum-feature-flag-tracking.html" >}}


</br>

### Intégration Amplitude

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK d'Amplitude et utilisez l'extrait de code suivant afin de créer un écouteur d'exposition chargé de transmettre l'évaluation des feature flags à Datadog :

Pour en savoir plus sur l'initialisation du SDK d'Amplitude, consultez la [documentation relative au SDK JavaScript][1] d'Amplitude (en anglais).

```javascript
  const experiment = Experiment.initialize("CLIENT_DEPLOYMENT_KEY", {
    exposureTrackingProvider: {
      track(exposure: Exposure)  {
        // Envoyer le feature flag lorsqu'Amplitude transmet l'exposition
        datadogRum.addFeatureFlagEvaluation(exposure.flag_key, exposure.variant);
      }
    }
  })
```


[1]: https://www.docs.developers.amplitude.com/experiment/sdks/javascript-sdk/

{{% /tab %}}
{{% tab "iOS" %}}

Initialisez le SDK d'Amplitude et utilisez l'extrait de code ci-dessous afin de créer un inspecteur chargé de transmettre l'évaluation des feature flags à Datadog.

Pour en savoir plus sur l'initialisation du SDK d'Amplitude, consultez la [documentation relative au SDK iOS][1] d'Amplitude (en anglais).

```swift
  class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    func track(exposure: Exposure) {
      // Envoyer le feature flag lorsqu'Amplitude transmet l'exposition
      if let variant = exposure.variant {
        RUMMonitor.shared().addFeatureFlagEvaluation(name: exposure.flagKey, value: variant)
      }
    }
  }

  // Dans l'initialisation :
  ExperimentConfig config = ExperimentConfigBuilder()
    .exposureTrackingProvider(DatadogExposureTrackingProvider(analytics))
    .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/ios-sdk/


{{% /tab %}}
{{% tab "Android" %}}

Initialisez le SDK d'Amplitude et utilisez l'extrait de code ci-dessous afin de créer un inspecteur chargé de transmettre l'évaluation des feature flags à Datadog.

Pour en savoir plus sur l'initialisation du SDK d'Amplitude, consultez la [documentation relative au SDK Android][1] d'Amplitude (en anglais).

```kotlin
  internal class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    override fun track(exposure: Exposure) {
        // Envoyer le feature flag lorsqu'Amplitude transmet l'exposition
        GlobalRumMonitor.get().addFeatureFlagEvaluation(
            exposure.flagKey,
            exposure.variant.orEmpty()
        )
    }
  }

  // Dans l'initialisation :
  val config = ExperimentConfig.Builder()
      .exposureTrackingProvider(DatadogExposureTrackingProvider())
      .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/android-sdk/


{{% /tab %}}
{{% tab "Flutter" %}}

Amplitude ne prend pas en charge cette intégration. Créez un ticket auprès d'Amplitude pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{< /tabs >}}

### Gestion personnalisée des feature flags

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

### Intégration DevCycle

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK de DevCycle et abonnez-vous à l'événement `variableEvaluated`. Vous pouvez choisir de vous abonner à l'ensemble des évaluations de variable avec `variableEvaluated:*` ou de vous abonner à seulement certaines d'entre elles avec `variableEvaluated:my-variable-key`.

Pour en savoir plus sur l'initialisation du SDK de DevCycle, consultez la [documentation relative au SDK JavaScript de DevCycle][5] (en anglais). Pour obtenir plus d'informations sur le système d'événements DevCycle, consultez la [documentation relative aux événements du SDK de DevCycle][6] (en anglais).

```javascript
const user = { user_id: "<USER_ID>" };
const dvcOptions = { ... };
const dvcClient = initialize("<CLÉ_SDK_CLIENT_DVC>", user, dvcOptions);
...
dvcClient.subscribe(
    "variableEvaluated:*",
    (key, variable) => {
        // suivre toutes les évaluations de variable
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
...
dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
    (key, variable) => {
        // suivre une évaluation de variable spécifique
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```


[5]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-install
[6]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-usage#subscribing-to-sdk-events
{{% /tab %}}
{{% tab "iOS" %}}

DevCycle ne prend pas en charge cette intégration. Créez un ticket auprès de DevCycle pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{% tab "Android" %}}

DevCycle ne prend pas en charge cette intégration. Créez un ticket auprès de DevCycle pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle ne prend pas en charge cette intégration. Créez un ticket auprès de DevCycle pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{% tab "React Native" %}}

DevCycle ne prend pas en charge cette intégration. Créez un ticket auprès de DevCycle pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{< /tabs >}}


### Intégration Flagsmith

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK de Flagsmith avec l'option `datadogRum` et utilisez l'extrait de code ci-dessous afin de transmettre l'évaluation des feature flags à Datadog.

   Vous pouvez également configurer le client afin d'envoyer les traits Flagsmith à Datadog via `datadogRum.setUser()`. Pour en savoir plus sur l'initialisation du SDK de Flagsmith, consultez la [documentation relative au SDK JavaScript de Flagsmith][1] (en anglais).

   ```javascript
    // Initialiser le SDK Flagsmith
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

Flagsmith ne prend pas en charge cette intégration. Créez un ticket auprès de Flagsmith pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith ne prend pas en charge cette intégration. Créez un ticket auprès de Flagsmith pour demander l'ajout de cette fonctionnalité.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith ne prend pas en charge cette intégration. Créez un ticket auprès de Flagsmith pour demander l'ajout de cette fonctionnalité.

{{% /tab %}}
{{% tab "React Native" %}}

Flagsmith ne prend actuellement pas en charge cette intégration. Créez un ticket auprès de Flagsmith pour demander l'ajout de cette fonctionnalité.

{{% /tab %}}
{{< /tabs >}}

### Intégration LaunchDarkly

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK de LaunchDarkly et utilisez l'extrait de code ci-dessous afin de créer un inspecteur chargé de transmettre l'évaluation des feature flags à Datadog.

 Pour en savoir plus sur l'initialisation du SDK de LaunchDarkly, consultez la [documentation relative au SDK JavaScript de LaunchDarkly][1] (en anglais).

```javascript
const client = LDClient.initialize("<ID_CÔTÉ_CLIENT>", "<CONTEXTE>", {
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

LaunchDarkly ne prend pas en charge cette intégration. Créez un ticket auprès de LaunchDarkly pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly ne prend pas en charge cette intégration. Créez un ticket auprès de LaunchDarkly pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly ne prend pas en charge cette intégration. Créez un ticket auprès de LaunchDarkly pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly ne prend actuellement pas en charge cette intégration. Créez un ticket auprès de LaunchDarkly pour demander l'ajout de cette fonctionnalité.


{{% /tab %}}
{{< /tabs >}}


### Intégration Split

{{< tabs >}}
{{% tab "Browser" %}}

Initialisez le SDK de Split et utilisez l'extrait de code suivant afin de créer un écouteur d'impression chargé de transmettre l'évaluation des feature flags à Datadog :

Pour en savoir plus sur l'initialisation du SDK de Split, consultez la [documentation relative au SDK JavaScript][1] de Split (en anglais).

```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<CLÉ_APPLICATION>",
      key: "<ID_UTILISATEUR>",
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

Initialisez le SDK de Split et utilisez l'extrait de code ci-dessous afin de créer un inspecteur chargé de transmettre l'évaluation des feature flags à Datadog.

Pour en savoir plus sur l'initialisation du SDK de Split, consultez la [documentation relative au SDK iOS][1] de Split (en anglais).

```swift
  let config = SplitClientConfig()
  // Envoyer le feature flag lorsque Split transmet l'impression
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

Initialisez le SDK de Split et utilisez l'extrait de code ci-dessous afin de créer un inspecteur chargé de transmettre l'évaluation des feature flags à Datadog.

Pour en savoir plus sur l'initialisation du SDK de Split, consultez la [documentation relative au SDK Android][1] de Split (en anglais).

```kotlin
  internal class DatadogSplitImpressionListener : ImpressionListener {
    override fun log(impression: Impression) {
        // Envoyer le feature flag lorsque Split transmet l'impression
        GlobalRumMonitor.get().addFeatureFlagEvaluation(
            impression.split(),
            impression.treatment()
        )
    }
    override fun close() {
    }
  }

  // Dans l'initialisation :
  val apikey = BuildConfig.SPLIT_API_KEY
  val config = SplitClientConfig.builder()
      .impressionListener(DatadogSplitImpressionListener())
      .build()
```


[1]: https://help.split.io/hc/en-us/articles/360020343291-Android-SDK
{{% /tab %}}
{{% tab "Flutter" %}}

Initialisez le SDK de Split et utilisez l'extrait de code ci-dessous afin de créer un inspecteur chargé de transmettre l'évaluation des feature flags à Datadog.

Pour en savoir plus sur l'initialisation du SDK de Split, consultez la [documentation relative au plug-in Flutter][1] de Split (en anglais).

```dart
  StreamSubscription<Impression> impressionsStream = _split.impressionsStream().listen((impression) {
    // Envoyer le feature flag lorsque Split transmet l'impression
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

Initialisez le SDK de Split et utilisez l'extrait de code suivant afin de créer un écouteur d'impression chargé de transmettre l'évaluation des feature flags à Datadog :

Pour en savoir plus sur l'initialisation du SDK de Split, consultez la [documentation relative au SDK React Native][1] de Split (en anglais).

```javascript
const factory = SplitFactory({
    core: {
      authorizationKey: "<CLÉ_APPLICATION>",
      key: "<ID_UTILISATEUR>",
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

### Intégration Statsig

{{< tabs >}}
{{% tab "Browser" %}}

Le suivi des feature flags est disponible dans le SDK Browser RUM. Pour obtenir des instructions de configuration détaillées, consultez la page [Débuter avec les données des features flags dans RUM](https://docs.datadoghq.com/real_user_monitoring/guide/setup-feature-flag-data-collection).

1. Installez la version 4.25.0 ou une version ultérieure du SDK Browser RUM.
2. Initialisez le SDK RUM et configurez le paramètre d'initialisation `enableExperimentalFeatures` avec `["feature_flags"]`.
3. Initialisez le SDK de Statsig (`>= v4.34.0`) et implémentez l'option `gateEvaluationCallback` tel qu'indiqué ci-dessous :

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

Statsig ne prend pas en charge cette intégration. Envoyez un e-mail à l'adresse support@statsig.com pour demander l'ajout de cette fonctionnalité.

{{% /tab %}}
{{% tab "Android" %}}

Statsig ne prend pas en charge cette intégration. Envoyez un e-mail à l'adresse support@statsig.com pour demander l'ajout de cette fonctionnalité.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig ne prend pas en charge cette intégration. Envoyez un e-mail à l'adresse support@statsig.com pour demander l'ajout de cette fonctionnalité.

{{% /tab %}}
{{% tab "React Native" %}}

Statsig ne prend actuellement pas en charge cette intégration. Envoyez un e-mail à l'adresse support@statsig.com pour demander l'ajout de cette fonctionnalité.

{{% /tab %}}
{{< /tabs >}}

## Analyser les performances de vos feature flags dans RUM

Les feature flags apparaissent dans le contexte de vos sessions, vues et erreurs RUM sous forme de liste.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="Liste des attributs de feature flag dans le RUM  Explorer" style="width:75%;">}}

### Rechercher des feature flags via le RUM Explorer
Recherchez dans toutes les données collectées par RUM dans le [RUM Explorer][2] pour dégager les tendances sur les feature flags, analyser les patterns avec un contexte plus large ou les exporter dans [dashboards][3] et [monitors][4]. Vous pouvez rechercher vos sessions, vues ou erreurs dans le RUM Explorer, avec l'attribut `@feature_flags.{flag_name}`.

#### Sessions
En filtrant vos **sessions** avec l'attribut `@feature_flags.{flag_name}`, vous pouvez afficher toutes les sessions de l'intervalle défini pour lesquelles votre feature flag a été évalué.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="Rechercher des feature flags dans des sessions dans le RUM Explorer" style="width:75%;">}}

#### Vues
En filtrant vos **vues** avec l'attribut `@feature_flags.{flag_name}`, vous pouvez afficher les vues spécifiques de l'intervalle défini pour lesquelles votre feature flag a été évalué.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="Rechercher des feature flags dans des vues dans le RUM Explorer" style="width:75%;">}}

#### Erreurs
En filtrant vos **erreurs** avec l'attribut `@feature_flags.{flag_name}`, vous pouvez afficher toutes les erreurs de l'intervalle défini qui sont survenues dans la vue et pour lesquelles votre feature flag a été évalué.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="Rechercher des feature flags dans des erreurs le RUM Explorer" style="width:75%;">}}

## Dépannage

### Pourquoi les données de mes feature flags ne correspondent pas à mes attentes ?
Les feature flags apparaissent dans le contexte des événements pour lesquels ils ont été évalués. Ils s'affichent donc dans les vues sur lesquelles la logique de code des feature flags est exécutée.

Selon la configuration de vos feature flags et la structure de votre code, des feature flags peuvent apparaître de manière inattendue lors de certains événements.

Par exemple, pour savoir sur quelles **vues** votre feature flag est évalué, vous pouvez utiliser le RUM Explorer pour exécuter une requête similaire :


{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="Rechercher des feature flags dans des vues dans le RUM Explorer" style="width:75%;">}}


Pour vous aider dans vos recherches, voici quelques situations pour lesquelles un feature flag est évalué dans des vues sans aucun lien :

- Un composant React commun apparaît sur plusieurs pages et évalue les feature flags à chaque fois qu'ils s'exécutent.
- Un problème de routage dans des composants entraîne l'évaluation des feature flags avant ou après des modifications d'URL.

Durant vos recherches, vous pouvez également filtrer vos données sur le `View Name` pertinent selon votre feature flag.

### Nom des feature flags

Les caractères spéciaux suivants ne sont pas compatibles avec le [suivi des feature flags][5] : `.`, `:`, `+`, `-`, `=`, `&&`, `||`, `>`, `<`, `!`, `(`, `)`, `{`, `}`, `[`, `]`, `^`, `"`, `“`, `”`, `~`, `*`, `?` et `\`. Datadog vous conseille d'éviter d'inclure ces caractères dans le nom de vos feature flags. Si vous devez utiliser l'un de ces caractères, remplacez-le avant d'envoyer les données à Datadog. Exemple :

```javascript
datadogRum.addFeatureFlagEvaluation(key.replace(':', '_'), value);
```

## Pour aller plus loin
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/#setup
[2]: https://app.datadoghq.com/rum/explorer
[3]: /fr/dashboards/
[4]: /fr/monitors/#create-monitors
[5]: /fr/real_user_monitoring/feature_flag_tracking