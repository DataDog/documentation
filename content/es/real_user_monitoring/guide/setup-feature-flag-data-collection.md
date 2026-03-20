---
aliases:
- /es/real_user_monitoring/guide/getting-started-feature-flags/
beta: true
description: Aprende a configurar RUM para capturar datos de banderas de características
  y analizar el rendimiento en Datadog
further_reading:
- link: /real_user_monitoring/feature_flag_tracking
  tag: Documentation
  text: Analiza tus datos de banderas de características con el seguimiento de banderas
    de características
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiza tus datos de RUM en el Explorador de RUM
title: Introducción a los datos de banderas de características en RUM
---
## Resumen
Los datos de banderas de características te brindan una mayor visibilidad de la experiencia del usuario y el monitoreo del rendimiento al permitirte determinar qué usuarios están viendo una característica específica y si algún cambio que introduces está impactando tu experiencia de usuario o afectando negativamente el rendimiento.

Al enriquecer tus datos de RUM con datos de banderas de características, puedes estar seguro de que tu característica se lanza con éxito sin causar accidentalmente un error o una regresión en el rendimiento. Con esta capa adicional de información, puedes correlacionar lanzamientos de características con el rendimiento, identificar problemas en lanzamientos específicos y solucionar problemas más rápido.

## Configuración

{{< tabs >}}
{{% tab "Navegador" %}}

El seguimiento de banderas de características está disponible en el SDK de RUM para navegadores. Para comenzar, configura [el monitoreo de RUM para navegadores][1]. Necesitas la versión del SDK de RUM para navegadores >= 4.25.0.

<details>
  <summary>Antes de <code>v5.17.0</code></summary>

Si estás utilizando una versión anterior a 5.17.0, inicializa el SDK de RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]` para comenzar a recopilar datos de banderas de características.

{{% collapse-content title="NPM" level="h4" %}}

```javascript
  import { datadogRum } from '@datadog/browser-rum';

  // Initialize Datadog Browser SDK
  datadogRum.init({
    ...
    enableExperimentalFeatures: ["feature_flags"],
    ...
});
```
{{% /collapse-content %}}

{{% collapse-content title="CDN asíncrono" level="h4" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      enableExperimentalFeatures: ["feature_flags"],
      ...
    })
})
```
{{% /collapse-content %}}

{{% collapse-content title="CDN síncrono" level="h4" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
      ...
      enableExperimentalFeatures: ["feature_flags"],
      ...
    })
```
{{% /collapse-content %}}

</details>
<br/>

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/
{{% /tab %}}
{{% tab "Android" %}}

El seguimiento de banderas de características está disponible en el SDK de RUM para Android. Para comenzar, configura [la monitorización de RUM para Android][1]. Necesitas la versión >= 1.18.0 del SDK de RUM para Android.

[1]: /es/real_user_monitoring/application_monitoring/android/setup/
{{% /tab %}}
{{% tab "Flutter" %}}

El seguimiento de banderas de características está disponible para tus aplicaciones de Flutter. Para comenzar, configura [la monitorización de RUM para Flutter][1]. Necesitas la versión >= 1.3.2 del Plugin de Flutter.

[1]: /es/real_user_monitoring/application_monitoring/flutter/setup/
{{% /tab %}}
{{% tab "iOS" %}}

El seguimiento de banderas de características está disponible en el SDK de RUM para iOS. Para comenzar, configura [la monitorización de RUM para iOS][1]. Necesitas la versión >= 1.16.0 del SDK de RUM para iOS.

[1]: /es/real_user_monitoring/application_monitoring/ios/setup
{{% /tab %}}
{{% tab "Kotlin Multiplatform" %}}

El seguimiento de banderas de características está disponible para tus aplicaciones de Kotlin Multiplatform. Para comenzar, configura [la monitorización de RUM para Kotlin Multiplatform][1].

[1]: /es/real_user_monitoring/application_monitoring/kotlin_multiplatform
{{% /tab %}}
{{% tab "React Native" %}}

El seguimiento de banderas de características está disponible para tus aplicaciones de React Native. Para comenzar, configura [la monitorización de RUM para React Native][1]. Necesitas la versión >= 1.7.0 del SDK de RUM para React Native.

[1]: /es/real_user_monitoring/application_monitoring/react_native/setup
{{% /tab %}}
{{% tab "Unity" %}}

El seguimiento de banderas de características está disponible para sus aplicaciones de Unity. Para comenzar, configure [la monitorización RUM de Unity][1].

[1]: /es/real_user_monitoring/application_monitoring/unity/setup
{{% /tab %}}
{{< /tabs >}}

## Integraciones

Puede comenzar a recopilar datos de banderas de características con [soluciones personalizadas de gestión de banderas de características](#custom-feature-flag-management), o utilizando uno de los socios de integración de Datadog.

Datadog admite integraciones con:
{{< partial name="rum/rum-feature-flag-tracking.html" >}}


</br>

### integración de Amplitude

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Amplitude y cree un oyente de exposición que informe las evaluaciones de las banderas de características a Datadog utilizando el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulte la [documentación del SDK de JavaScript de Amplitude][1].

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

Inicialice el SDK de Amplitude y cree un inspector que informe las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulte la [documentación del SDK de iOS de Amplitude][1].

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

Inicialice el SDK de Amplitude y cree un inspector que informe las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulte la [documentación del SDK de Android de Amplitude][1].

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

Amplitude no admite esta integración. Cree un ticket con Amplitude para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}

### integración de ConfigCat

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de Javascript de ConfigCat, suscríbase al `flagEvaluated` evento e informe las evaluaciones de las banderas de características a Datadog:

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

Para obtener más información sobre cómo inicializar el SDK de Javascript de ConfigCat, consulte la [documentación del SDK de JavaScript de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/js


{{% /tab %}}
{{% tab "iOS" %}}

Al inicializar el SDK de ConfigCat Swift para iOS, suscríbase al `flagEvaluated` evento e informe las evaluaciones de las banderas de características a Datadog:

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

Para obtener más información sobre cómo inicializar el SDK de ConfigCat Swift (iOS), consulte la [documentación del SDK de Swift para iOS de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/ios


{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de ConfigCat para Android, suscríbase al `flagEvaluated` evento e informe las evaluaciones de las banderas de características a Datadog:

```java
  ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
    options.hooks().addOnFlagEvaluated(details -> {
        GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
    });
  });
```

Para obtener más información sobre cómo inicializar el SDK de ConfigCat para Android, consulte la [documentación del SDK de Android de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/android


{{% /tab %}}
{{% tab "Flutter" %}}

Al inicializar el SDK de ConfigCat Dart, suscríbete al evento `flagEvaluated` y reporta las evaluaciones de las banderas de características a Datadog:

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

Para más información sobre cómo inicializar el SDK de ConfigCat Dart (Flutter), consulta la [documentación del SDK de Dart de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/dart


{{% /tab %}}


{{% tab "React Native" %}}

Al inicializar el SDK de ConfigCat React, suscríbete al evento `flagEvaluated` y reporta las evaluaciones de las banderas de características a Datadog:

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

Para más información sobre cómo inicializar el SDK de ConfigCat React, consulta la [documentación del SDK de React de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}
{{< /tabs >}}

### Gestión de banderas de características personalizadas

{{< tabs >}}
{{% tab "Navegador" %}}

Cada vez que se evalúe una bandera de características, añade la siguiente función para enviar la información de la bandera de características a RUM:

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Cada vez que se evalúe una bandera de características, añade la siguiente función para enviar la información de la bandera de características a RUM:

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Cada vez que se evalúe una bandera de características, añade la siguiente función para enviar la información de la bandera de características a RUM:

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Cada vez que se evalúe una bandera de características, añade la siguiente función para enviar la información de la bandera de características a RUM:

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

Cada vez que se evalúe una bandera de características, añade la siguiente función para enviar la información de la bandera de características a RUM:

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### Integración de DevCycle

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de DevCycle y suscríbete al evento `variableEvaluated`, eligiendo suscribirte a todas las evaluaciones de variables `variableEvaluated:*` o a evaluaciones de variables particulares `variableEvaluated:my-variable-key`.

Para más información sobre cómo inicializar el SDK de DevCycle, consulta la [documentación del SDK de JavaScript de DevCycle][5] y para más información sobre el sistema de eventos de DevCycle, consulta la [documentación de eventos del SDK de DevCycle][6].

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

DevCycle no soporta esta integración. Crea un ticket con DevCycle para solicitar esta característica.


{{% /tab %}}
{{% tab "Android" %}}

DevCycle no soporta esta integración. Crea un ticket con DevCycle para solicitar esta característica.


{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle no soporta esta integración. Crea un ticket con DevCycle para solicitar esta característica.


{{% /tab %}}
{{% tab "React Native" %}}

DevCycle no soporta esta integración. Crea un ticket con DevCycle para solicitar esta característica.


{{% /tab %}}
{{< /tabs >}}

### Integración de Eppo

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que además reporta las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para más información sobre cómo inicializar el SDK de Eppo, consulta la [documentación del SDK de JavaScript de Eppo][1].

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

Inicializa el SDK de Eppo y crea un registrador de asignaciones que además reporta las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para más información sobre cómo inicializar el SDK de Eppo, consulta la [documentación del SDK de iOS de Eppo][1].

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/client-sdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que además reporta las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para más información sobre cómo inicializar el SDK de Eppo, consulta la [documentación del SDK de Android de Eppo][1].

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

Eppo no soporta esta integración. [Contacta a Eppo][1] para solicitar esta característica.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que además reporta las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para más información sobre cómo inicializar el SDK de Eppo, consulta la [documentación del SDK de React Native de Eppo][1].

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

### Integración de Flagsmith

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Flagsmith con la opción `datadogRum`, que reporta las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

   Opcionalmente, puedes configurar el cliente para que los rasgos de Flagsmith se envíen a Datadog a través de `datadogRum.setUser()`. Para más información sobre cómo inicializar el SDK de Flagsmith, consulta la [documentación del SDK de JavaScript de Flagsmith][1].

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

Flagsmith no soporta esta integración. Crea un ticket con Flagsmith para solicitar esta característica.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith no soporta esta integración. Crea un ticket con Flagsmith para solicitar esta característica.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith no soporta esta integración. Crea un ticket con Flagsmith para solicitar esta característica.

{{% /tab %}}
{{% tab "React Native" %}}

Flagsmith actualmente no soporta esta integración. Crea un ticket con Flagsmith para solicitar esta característica.

{{% /tab %}}
{{< /tabs >}}

### Integración de GrowthBook

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de GrowthBook, reporta las evaluaciones de las banderas de características a Datadog utilizando el callback `onFeatureUsage`.

Para más información sobre cómo inicializar el SDK de GrowthBook, consulta la [documentación del SDK de JavaScript de GrowthBook][1].

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

GrowthBook no soporta esta integración. Contacta a GrowthBook para solicitar esta característica.

{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de GrowthBook, reporta las evaluaciones de las banderas de características a Datadog llamando a `setFeatureUsageCallback`.

Para más información sobre cómo inicializar el SDK de GrowthBook, consulta la [documentación del SDK de Android de GrowthBook][1].

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

Al inicializar el SDK de GrowthBook, reporta las evaluaciones de las banderas de características a Datadog llamando a `setFeatureUsageCallback`.

Para más información sobre cómo inicializar el SDK de GrowthBook, consulta la [documentación del SDK de Flutter de GrowthBook][1].

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

Al inicializar el SDK de GrowthBook, reporta las evaluaciones de las banderas de características a Datadog utilizando el callback `onFeatureUsage`.

Para más información sobre cómo inicializar el SDK de GrowthBook, consulta la [documentación del SDK de React Native de GrowthBook][1].

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

### Integración de Kameleoon

{{< tabs >}}
{{% tab "Navegador" %}}

Después de crear e inicializar el SDK de Kameleoon, suscríbete al evento `Evaluation` utilizando el manejador `onEvent`.

Para más información sobre el SDK, consulta la [documentación del SDK de JavaScript de Kameleoon][1].

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon no soporta esta integración. Contacta a product@kameleoon.com para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon no soporta esta integración. Contacta a product@kameleoon.com para solicitar esta función.


{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon no soporta esta integración. Contacta a product@kameleoon.com para solicitar esta función.


{{% /tab %}}
{{% tab "React Native" %}}

Después de crear e inicializar el SDK de Kameleoon, suscríbete al evento `Evaluation` utilizando el manejador `onEvent`.

Aprende más sobre la inicialización del SDK en la [documentación del SDK de Kameleoon para React Native][1].

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/react-js-sdk
{{% /tab %}}
{{< /tabs >}}


### Integración de LaunchDarkly

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de LaunchDarkly y crea un inspector que informe las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

 Para más información sobre la inicialización del SDK de LaunchDarkly, consulta la [documentación del SDK de JavaScript de LaunchDarkly][1].

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

LaunchDarkly no soporta esta integración. Crea un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly no soporta esta integración. Crea un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly no soporta esta integración. Crea un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly actualmente no soporta esta integración. Crea un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}


### Integración de Split

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Split y crea un listener de impresiones que informe las evaluaciones de las banderas de características a Datadog utilizando el siguiente fragmento de código:

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del SDK de JavaScript de Split][1].

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

Inicializa el SDK de Split y crea un inspector que informe las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código a continuación.

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del SDK de iOS de Split][1].

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

Inicializa el SDK de Split y crea un inspector que informe las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código a continuación.

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del SDK de Android de Split][1].

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

Inicializa el SDK de Split y crea un inspector que informe las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código a continuación.

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del plugin de Flutter de Split][1].

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

Inicializa el SDK de Split y crea un listener de impresiones que informe las evaluaciones de las banderas de características a Datadog utilizando el siguiente fragmento de código:

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del SDK de React Native de Split][1].

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

### Integración de Statsig

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Statsig con `statsig.initialize`.

1. Actualiza tu versión del SDK de RUM para navegadores a 4.25.0 o superior.
2. Inicializa el SDK de RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
3. Inicializa el SDK de Statsig (`>= v4.34.0`) e implementa la opción `gateEvaluationCallback` como se muestra a continuación:

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

Statsig no soporta esta integración. Contacta a support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Statsig no soporta esta integración. Contacta a support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig no soporta esta integración. Contacta a support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "React Native" %}}

Statsig actualmente no soporta esta integración. Contacta a support@statsig.com para solicitar esta función.

{{% /tab %}}
{{< /tabs >}}

## Analiza el rendimiento de tu Feature Flag en RUM

Las flags de características aparecen en el contexto de tus sesiones, vistas y errores de RUM como una lista.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="Lista de atributos de Feature Flag en RUM Explorer" style="width:75%;">}}

### Busca flags de características usando el RUM Explorer
Busca a través de todos los datos recopilados por RUM en el [RUM Explorer][2] para identificar tendencias en las flags de características, analizar patrones con mayor contexto, o exportarlos a [tableros][3] y [monitores][4]. Puedes buscar tus sesiones, vistas o errores en el RUM Explorer, con el atributo `@feature_flags.{flag_name}`.

#### Sesiones
Filtrando tus **Sesiones** con el atributo `@feature_flags.{flag_name}`, puedes encontrar todas las sesiones en el marco de tiempo dado donde tu flag de características fue evaluada.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="Busca sesiones para flags de características en el RUM Explorer" style="width:75%;">}}

#### Vistas
Filtrando tus **Vistas** con el atributo `@feature_flags.{flag_name}`, puedes encontrar las vistas específicas en el marco de tiempo dado donde tu flag de características fue evaluada.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="Busca vistas para flags de características en el RUM Explorer" style="width:75%;">}}

#### Errores
Filtrando tus **Errores** con el atributo `@feature_flags.{flag_name}`, puedes encontrar todos los errores en el marco de tiempo dado que ocurrieron en la vista donde tu flag de características fue evaluada.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="Buscar errores de banderas de características en el explorador RUM" style="width:75%;">}}

## Solución de problemas

### Mis datos de bandera de características no reflejan lo que espero ver
Las banderas de características aparecen en el contexto de eventos donde se evalúan, lo que significa que deberían aparecer en las vistas en las que se ejecuta la lógica del código de la bandera de características.

Dependiendo de cómo hayas estructurado tu código y configurado tus banderas de características, puedes ver banderas de características inesperadas aparecer en el contexto de algunos eventos.

Por ejemplo, para ver en qué **Vistas** se está evaluando tu bandera de características, puedes usar el explorador RUM para hacer una consulta similar:

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="Busca vistas para flags de características en el RUM Explorer" style="width:75%;">}}

Aquí hay algunos ejemplos de razones por las cuales tu bandera de características se está evaluando en Vistas no relacionadas que pueden ayudar con tus investigaciones:

- Un componente react común que aparece en múltiples páginas y que evalúa banderas de características cada vez que se ejecuta.
- Un problema de enrutamiento donde los componentes con una evaluación de bandera de características se renderizan antes/después de los cambios de URL.

Al realizar tus investigaciones, también puedes limitar tus datos a `View Name` que son relevantes para tu bandera de características.


## Lectura adicional
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/
[2]: https://app.datadoghq.com/rum/explorer
[3]: /es/dashboards/
[4]: /es/monitors/#create-monitors
[5]: /es/real_user_monitoring/feature_flag_tracking