---
aliases:
- /es/real_user_monitoring/guide/getting-started-feature-flags/
beta: true
description: Aprender a configurar RUM para capturar datos de indicadores de características
  y analizar el rendimiento en Datadog
further_reading:
- link: /real_user_monitoring/feature_flag_tracking
  tag: Documentación
  text: Analizar tus datos de indicadores de características con el rastreo de indicadores
    de características
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualizar tus datos RUM en el RUM Explorer
title: Empezando con datos de indicadores de características en RUM
---

## Información general
Los datos del indicador de características te ofrecen una mayor visibilidad de tu experiencia de usuario y monitorización del rendimiento al permitirte determinar a qué usuarios se les está mostrando una característica específica y si cualquier cambio que introduces está repercutiendo en tu experiencia de usuario o afectando negativamente al rendimiento.

Al mejorar tus datos RUM con datos de indicadores de características, puedes estar seguro de que tu función se lanza correctamente sin causar involuntariamente un error o una regresión del rendimiento. Con esta capa adicional de información, puedes correlacionar los lanzamientos de funciones con el rendimiento, identificar los problemas con lanzamientos específicos y solucionar los problemas más rápidamente.

## Configuración

{{< tabs >}}
{{% tab "Navegador" %}}

El rastreo de indicadores de características está disponible en el SDK del navegador RUM. Para empezar, configura [Monitorización del navegador RUM][1]. Necesitas la versión del SDK del navegador RUM >= 4.25.0.

<details>
  <summary>Antes de la <code>v5.17.0</code></summary>

Si estás utilizando una versión anterior a la 5.17.0, inicializa el SDK de RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]` para comenzar a recopilar datos de indicadores de características.

{{% collapse-content title="NPM" level="h4" %}}
```javascript
  import { datadogRum } from '@datadog/browser-rum';

  // Inicializa el SDK del navegador de Datadog
  datadogRum.init({
    ...
    enableExperimentalFeatures: ["feature_flags"],
    ...
});
```
{{% /collapse-content %}}

{{% collapse-content title="CDN async" level="h4" %}}
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

{{% collapse-content title="CDN sync" level="h4" %}}
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

[1]: /es/real_user_monitoring/browser/setup/
{{% /tab %}}
{{% tab "Android" %}}

El rastreo de indicadores de características está disponible en el SDK de RUM Android. Para empezar, configura la [Monitorización de RUM Android][1]. Necesitas la versión del SDK de Android RUM >= 1.18.0.

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/android/setup/
{{% /tab %}}
{{% tab "Flutter" %}}

El rastreo de indicadores de características está disponible para tus aplicaciones Flutter. Para empezar, configura la [Monitorización de RUM Flutter][1]. Necesitas la versión del complemento con Flutter >= 1.3.2.

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/flutter/setup/
{{% /tab %}}
{{% tab "iOS" %}}

El rastreo de los indicadores de características está disponible en el SDK de RUM iOS. Para empezar, configura la [Monitorización de RUM iOS][1]. Necesitas la versión del SDK de iOS RUM >= 1.16.0.

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/ios/setup
{{% /tab %}}
{{% tab "Kotlin Multiplataforma" %}}

El rastreo de indicadores de características está disponible para tus aplicaciones Kotlin Multiplatform. Para empezar, configura la [Monitorización de RUM Kotlin Multiplatform][1].

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/kotlin_multiplatform
{{% /tab %}}
{{% tab "React Native" %}}

El rastreo de los indicadores de características está disponible para tus aplicaciones React Native. Para empezar, configura la [Monitorización de RUM React Native][1]. Necesitas la versión del SDK de React Native RUM >= 1.7.0.

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/react_native/setup
{{% /tab %}}
{{% tab "Unity" %}}

El rastreo de indicadores de características está disponible para tus aplicaciones Unity. Para empezar, configura la [Monitorización de RUM Unity][1].

[1]: /es/real_user_monitoring/mobile_and_tv_monitoring/unity/setup
{{% /tab %}}{{< /tabs >}}

## Integraciones

Puedes empezar a recopilar datos de indicadores de características con [soluciones personalizadas de gestión de indicadores de características](#custom-feature-flag-management), o recurriendo a uno de los socios de integración de Datadog.

Datadog admite integraciones con:
{{< partial name="rum/rum-feature-flag-tracking.html" >}}


</br>

### Integración de Amplitude

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Amplitude y crea un oyente de exposición que informe de las evaluaciones del indicador de característica a Datadog con el siguiente fragmento de código:

Para más información sobre la inicialización del SDK de Amplitude, consulta la [documentación del SDK de JavaScript][1] de Amplitude.

```javascript
  const experiment = Experiment.initialize("CLIENT_DEPLOYMENT_KEY", {
    exposureTrackingProvider: {
      track(exposure: Exposure)  {
        // Envía el indicador de características cuando Amplitude informa la exposición
        datadogRum.addFeatureFlagEvaluation(exposure.flag_key, exposure.variant);
      }
    }
  })
```


[1]: https://www.docs.developers.amplitude.com/experiment/sdks/javascript-sdk/

{{% /tab %}}
{{% tab "iOS" %}}

Inicializa el SDK de Amplitude y crea un inspector que informe de las evaluaciones de los indicadores de característica en Datadog con el siguiente fragmento de código.

Para más información sobre la inicialización del SDK de Amplitude, consulta la [documentación del SDK de iOS][1] de Amplitude.

```swift
  class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    func track(exposure: Exposure) {
      // Envía el indicador de características cuando Amplitude informa la exposición
      if let variant = exposure.variant {
        RUMMonitor.shared().addFeatureFlagEvaluation(name: exposure.flagKey, value: variant)
      }
    }
  }

  // En el inicio:
  ExperimentConfig config = ExperimentConfigBuilder()
    .exposureTrackingProvider(DatadogExposureTrackingProvider(analytics))
    .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/ios-sdk/


{{% /tab %}}
{{% tab "Android" %}}

Inicializa el SDK de Amplitude y crea un inspector que informe de las evaluaciones de los indicadores de característica en Datadog con el siguiente fragmento de código.

Para más información sobre la inicialización del SDK de Amplitude, consulta la [documentación del SDK de Android][1] de Amplitude.

```kotlin
  internal class DatadogExposureTrackingProvider : ExposureTrackingProvider {
    override fun track(exposure: Exposure) {
        // Envía el indicador de características cuando Amplitude informa la exposición
        GlobalRumMonitor.get().addFeatureFlagEvaluation(
            exposure.flagKey,
            exposure.variant.orEmpty()
        )
    }
  }

  // En el inicio:
  val config = ExperimentConfig.Builder()
      .exposureTrackingProvider(DatadogExposureTrackingProvider())
      .build()
```

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/android-sdk/


{{% /tab %}}
{{% tab "Flutter" %}}

Amplitude no admite esta integración. Crea un tique con Amplitude para solicitar esta característica.


{{% /tab %}}{{< /tabs >}}

### Integración de ConfigCat

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de ConfigCat JavaScript, suscríbete al evento `flagEvaluated` e informa de las evaluaciones de los indicadores de características a Datadog:

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

Para obtener más información sobre la inicialización del SDK de ConfigCat JavaScript, consulta la [documentación del SDK de JavaScript SDK][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/js


{{% /tab %}}
{{% tab "iOS" %}}

Al inicializar el SDK de ConfigCat Swift iOS, suscríbete al evento `flagEvaluated` e informa de las evaluaciones de los indicadores de características a Datadog:

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

Para obtener más información sobre la inicialización del SDK de Swift (iOS) de ConfigCat, consulta la [documentación del SDK de Swift iOS][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/ios


{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de ConfigCat Android, suscríbete al evento `flagEvaluated` e informa de las evaluaciones de los indicadores de características a Datadog:

```java
  ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
    options.hooks().addOnFlagEvaluated(details -> {
        GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
    });
  });
```

Para más información sobre la inicialización del SDK de ConfigCat Android, consulta la [documentación del SDK de Android][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/android


{{% /tab %}}
{{% tab "Flutter" %}}

Al inicializar el SDK de ConfigCat Dart, suscríbete al evento `flagEvaluated` e informa de las evaluaciones de los indicadores de características a Datadog:

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

Para obtener más información sobre la inicialización del SDK de ConfigCat Dart (Flutter), consulta la [documentación del SDK de Dart][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/dart


{{% /tab %}}


{{% tab "React Native" %}}

Al inicializar el SDK de ConfigCat React, suscríbete al evento `flagEvaluated` e informa de las evaluaciones de los indicadores de características a Datadog:

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

Para obtener más información sobre la inicialización del SDK de ConfigCat React, consulta la [documentación del SDK de React][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}{{< /tabs >}}

### Gestión de indicadores de características personalizadas

{{< tabs >}}
{{% tab "Navegador" %}}

Cada vez que se evalúe un indicador de característica, añade la siguiente función para enviar la información del indicador de característica a RUM:

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Cada vez que se evalúe un indicador de característica, añade la siguiente función para enviar la información del indicador de característica a RUM:

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Cada vez que se evalúe un indicador de característica, añade la siguiente función para enviar la información del indicador de característica a RUM:

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Cada vez que se evalúe un indicador de característica, añade la siguiente función para enviar la información del indicador de característica a RUM:

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

Cada vez que se evalúe un indicador de característica, añade la siguiente función para enviar la información del indicador de característica a RUM:

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}{{< /tabs >}}

### Integración de DevCycle

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de DevCycle y suscríbete al evento `variableEvaluated`, eligiendo suscribirte a todas las evaluaciones de variables `variableEvaluated:*` o a evaluaciones de variables concretas `variableEvaluated:my-variable-key`.

Para obtener más información sobre la inicialización del SDK de DevCycle, consulta la [documentación del SDK de JavaScript de DevCycle][5] y para obtener más información sobre el sistema de evento de DevCycle, consulta la [documentación del evento de SDK de DevCycle][6].

```javascript
const user = { user_id: "<USER_ID>" };
const dvcOptions = { ... };
const dvcClient = initialize("<DVC_CLIENT_SDK_KEY>", user, dvcOptions);
...
dvcClient.subscribe(
    "variableEvaluated:*",
    (key, variable) => {
        // rastrear todas las evualaciones de variables
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
...
dvcClient.subscribe(
    "variableEvaluated:my-variable-key",
    (key, variable) => {
        // rastrear una evaluación de variable particular
        datadogRum.addFeatureFlagEvaluation(key, variable.value);
    }
)
```


[5]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-install
[6]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-usage#subscribing-to-sdk-events
{{% /tab %}}
{{% tab "iOS" %}}

DevCycle no admite esta integración. Crea un tique con DevCycle para solicitar esta característica.


{{% /tab %}}
{{% tab "Android" %}}

DevCycle no admite esta integración. Crea un tique con DevCycle para solicitar esta característica.


{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle no admite esta integración. Crea un tique con DevCycle para solicitar esta característica.


{{% /tab %}}
{{% tab "React Native" %}}

DevCycle no admite esta integración. Crea un tique con DevCycle para solicitar esta característica.


{{% /tab %}}{{< /tabs >}}

### Integración de Eppo

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que informe adicionalmente de las evaluaciones de indicadores de características a Datadog con el fragmento de código que se muestra a continuación.

Para más información sobre la inicialización del SDK de Eppo, consulta la [documentación del SDK de Eppo JavaScript][1].

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

Inicializa el SDK de Eppo y crea un registrador de asignaciones que informe adicionalmente de las evaluaciones de indicadores de características a Datadog con el fragmento de código que se muestra a continuación.

Para más información sobre la inicialización del SDK de Eppo, consulta la [documentación del SDK de iOS de Eppo][1].

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/client-sdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que informe adicionalmente de las evaluaciones de indicadores de características a Datadog con el fragmento de código que se muestra a continuación.

Para más información sobre la inicialización del SDK de Eppo, consulta la [documentación del SDK de Android de Eppo][1].

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

Eppo no admite esta integración. [Ponte en contacto con Eppo][1] para solicitarla.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que informe adicionalmente de las evaluaciones de indicadores de características a Datadog con el fragmento de código que se muestra a continuación.

Para más información sobre la inicialización del SDK de Eppo, consulta la [documentación del SDK de React Native de Eppo][1].

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

{{% /tab %}}{{< /tabs >}}

### Integración de Flagsmith

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Flagsmith con la opción `datadogRum`, que informa de las evaluaciones de indicadores de características a Datadog con el fragmento de código que se muestra a continuación.

   Opcionalmente, puedes configurar el cliente para que los rasgos de Flagsmith se envíen a Datadog a través de `datadogRum.setUser()`. Para más información sobre la inicialización del SDK de Flagsmith, consulta la [documentación del SDK de JavaScript de Flagsmith][1].

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

Flagsmith no admite esta integración. Crea un tique con Flagsmith para solicitar esta característica.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith no admite esta integración. Crea un tique con Flagsmith para solicitar esta característica.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith no admite esta integración. Crea un tique con Flagsmith para solicitar esta característica.

{{% /tab %}}
{{% tab "React Native" %}}

Flagsmith no admite actualmente esta integración. Crea un tique con Flagsmith para solicitar esta característica.

{{% /tab %}}{{< /tabs >}}

### Integración de GrowthBook

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de GrowthBook, se informan las evaluaciones de los indicadores de características a Datadog mediante la devolución de llamada `onFeatureUsage`.

Para obtener más información sobre la inicialización del SDK de GrowthBook, consulta la [documentación del SDK de JavaScript de GrowthBook][1].

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

GrowthBook no admite esta integración. Ponte en contacto con GrowthBook para solicitar esta característica.

{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de GrowthBook, se informan las evaluaciones de los indicadores de características a Datadog llamando a `setFeatureUsageCallback`.

Para obtener más información sobre la inicialización del SDK de GrowthBook, consulta la [documentación del SDK de Android de GrowthBook][1].

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

Al inicializar el SDK de GrowthBook, se informan las evaluaciones de los indicadores de características a Datadog llamando a `setFeatureUsageCallback`.

Para obtener más información sobre la inicialización del SDK de GrowthBook, consulta la [documentación del SDK de Flutter de GrowthBook][1].

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

Al inicializar el SDK de GrowthBook, se informan las evaluaciones de los indicadores de características a Datadog mediante la devolución de llamada `onFeatureUsage`.

Para obtener más información sobre la inicialización del SDK de GrowthBook, consulta la [documentación del SDK de React Native de GrowthBook][1].

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

Tras crear e inicializar el SDK de Kameleoon, suscríbete al evento `Evaluation` mediante el gestor `onEvent`.

Para obtener más información sobre el SDK, consulta la [documentación del SDK de JavaScript de Kameleoon][1].

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon no admite esta integración. Ponte en contacto con product@kameleoon.com para solicitar esta característica.

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon no admite esta integración. Ponte en contacto con product@kameleoon.com para solicitar esta característica.


{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon no admite esta integración. Ponte en contacto con product@kameleoon.com para solicitar esta característica.


{{% /tab %}}
{{% tab "React Native" %}}

Tras crear e inicializar el SDK de Kameleoon, suscríbete al evento `Evaluation` mediante el gestor `onEvent`.

Obtén más información sobre la inicialización del SDK en la [documentación del SDK de React Native de Kameleoon][1].

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

Inicializa el SDK de LaunchDarkly y crea un inspector que informe de las evaluaciones de los indicadores de característica a Datadog con el siguiente fragmento de código.

 Para más información sobre la inicialización del SDK de LaunchDarkly, consulta la [documentación del SDK de LaunchDarkly JavaScript][1].

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

LaunchDarkly no admite esta integración. Crea un tique con LaunchDarkly para solicitar esta característica.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly no admite esta integración. Crea un tique con LaunchDarkly para solicitar esta característica.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly no admite esta integración. Crea un tique con LaunchDarkly para solicitar esta característica.


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly no admite actualmente esta integración. Crea un tique con LaunchDarkly para solicitar esta característica.


{{% /tab %}}
{{< /tabs >}}


### Integración de Split

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Split y crea un receptor de impresiones que informe las evaluaciones de los indicadores de características a Datadog mediante el uso del siguiente fragmento de código:

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del SDK de JavaScript][1] de Split.

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

Inicializa el SDK de Split y crea un inspector que informe de las evaluaciones de los indicadores de característica en Datadog con el siguiente fragmento de código.

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del SDK de iOS][1] de Split.

```swift
  let config = SplitClientConfig()
  // Envía el indicador de característica cuando Split informa la impresión
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

Inicializa el SDK de Split y crea un inspector que informe de las evaluaciones de los indicadores de característica en Datadog con el siguiente fragmento de código.

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del SDK de Android][1] de Split.

```kotlin
  internal class DatadogSplitImpressionListener : ImpressionListener {
    override fun log(impression: Impression) {
        // Envía el indicador de característica cuando Split informa la impresión
        GlobalRumMonitor.get().addFeatureFlagEvaluation(
            impression.split(),
            impression.treatment()
        )
    }
    override fun close() {
    }
  }

  // En el inicio:
  val apikey = BuildConfig.SPLIT_API_KEY
  val config = SplitClientConfig.builder()
      .impressionListener(DatadogSplitImpressionListener())
      .build()
```


[1]: https://help.split.io/hc/en-us/articles/360020343291-Android-SDK
{{% /tab %}}
{{% tab "Flutter" %}}

Inicializa el SDK de Split y crea un inspector que informe de las evaluaciones de los indicadores de característica en Datadog con el siguiente fragmento de código.

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del complemento de Flutter][1] de Split.

```dart
  StreamSubscription<Impression> impressionsStream = _split.impressionsStream().listen((impression) {
    // Envía el indicador de característica cuando Split informa la impresión
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

Inicializa el SDK de Split y crea un receptor de impresiones que informe las evaluaciones de los indicadores de características a Datadog mediante el uso del siguiente fragmento de código:

Para más información sobre la inicialización del SDK de Split, consulta la [documentación del SDK de React Native][1] de Split.

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

1. Actualiza tu versión de SDK del Navegador RUM a la versión 4.25.0 o posterior.
2. Inicializa el SDK RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
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

Statsig no admite esta integración. Ponte en contacto con support@statsig.com para solicitar esta característica.

{{% /tab %}}
{{% tab "Android" %}}

Statsig no admite esta integración. Ponte en contacto con support@statsig.com para solicitar esta característica.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig no admite esta integración. Ponte en contacto con support@statsig.com para solicitar esta característica.

{{% /tab %}}
{{% tab "React Native" %}}

Statsig no admite actualmente esta integración. Ponte en contacto con support@statsig.com para solicitar esta característica.

{{% /tab %}}
{{< /tabs >}}

## Análisis del rendimiento de tu indicador de características en RUM

Los indicadores de características aparecen en el contexto de tus Sesiones RUM, Vistas y Errores como lista.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="Lista de atributos del Indicador de características en RUM Explorer" style="width:75%;">}}

### Buscar indicadores de características con el RUM Explorer
Buscar a través de todos los datos recopilados por RUM en el [RUM Explorer][2] para aflorar tendencias en los indicadores de características, analizar patrones con mayor contexto o exportarlos a [dashboards][3] y [monitores][4]. Puedes buscar tus Sesiones, Vistas o Errores en el RUM Explorer, con el atributo `@feature_flags.{flag_name}`.

#### Sesiones
Filtrando tus **Sesiones** con el atributo `@feature_flags.{flag_name}`, puedes encontrar todas las sesiones en el marco temporal dado en las que se evaluó tu indicador de característica.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="Buscar sesiones para los indicadores de características en el RUM Explorer" style="width:75%;">}}

#### Vistas
Filtrando tus **Vistas** con el atributo `@feature_flags.{flag_name}`, puedes encontrar todas las vistas en el marco temporal dado en las que se evaluó tu indicador de característica.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="Buscar vistas en los indicadores de características en el RUM Explorer" style="width:75%;">}}

#### Errores
Filtrando tus **Errores** con el atributo `@feature_flags.{flag_name}`, puedes encontrar todos los errores en el marco temporal dado que se produjeron en la Vista en la que se evaluó tu indicador de característica

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="Buscar errores en los indicadores de características en el RUM Explorer" style="width:75%;">}}

## Resolución de problemas

### Los datos de mi indicador de características no muestran lo que espero ver
Los indicadores de características aparecen en el contexto de los eventos donde se evalúan, lo que significa que deberían aparecer en las vistas en las que se ejecuta la lógica del código del indicador de características.

Según cómo hayas estructurado tu código y configurado tus indicadores de características, es posible que aparezcan indicadores de características inesperados en el contexto de algunos eventos.

Por ejemplo, para ver en qué **Vistas** se está evaluando tu indicador de características, puedes utilizar el RUM Explorer para realizar una consulta similar:

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="Buscar vistas de los indicadores de características en el RUM Explorer" style="width:75%;">}}

Aquí encontrarás algunos ejemplos de razones por las que se está evaluando tu indicador de características en Vistas no relacionadas que pueden ayudar con tus investigaciones:

- Un componente común de React que aparece en varias páginas y que evalúa los indicadores de características cada vez que se ejecutan.
- Un problema de enrutamiento en el que los componentes con una evaluación del indicador de características se muestran antes/después de los cambios de URL.

Al realizar tus investigaciones, también puedes limitar tus datos para `View Name` que son relevantes para tu indicador de características.


## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/
[2]: https://app.datadoghq.com/rum/explorer
[3]: /es/dashboards/
[4]: /es/monitors/#create-monitors
[5]: /es/real_user_monitoring/feature_flag_tracking