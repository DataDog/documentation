---
aliases:
- /es/real_user_monitoring/guide/getting-started-feature-flags/
beta: true
description: Aprenda a configurar RUM para capturar datos de indicadores de características
  y analizar el rendimiento en Datadog
further_reading:
- link: /real_user_monitoring/feature_flag_tracking
  tag: Documentation
  text: Analice los datos de su indicador de características con Seguimiento de indicadores
    de características
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualice los datos de su RUM en el Explorador de RUM
title: Primeros pasos con los datos de bandera de características en RUM
---
## Overview
Los datos de la bandera de características le brindan una mayor visibilidad de su experiencia de usuario y monitoreo de rendimiento al permitirle determinar qué usuarios se muestran en una característica específica y si cualquier cambio que introduzca está afectando su experiencia de usuario o afectando negativamente el rendimiento.

Al enriquecer los datos de RUM con datos de indicador de características, puede estar seguro de que su característica se inicia correctamente sin causar involuntariamente un error o una regresión de rendimiento. Con esta capa adicional de información, puede correlacionar las versiones de características con el rendimiento, identificar los problemas con versiones específicas y solucionar problemas más rápido.

## Setup

{{< tabs >}}
{{% tab "Navegador" %}}

El seguimiento de la bandera de características está disponible en el SDK del navegador RUM. Para empezar, configura [monitoreo del navegador RUM][1]. Necesita la versión del Browser RUM SDK >= 4.25.0.

<details>
  <summary>Before <code>v5.17.0</code></summary>

Si está usando una versión anterior a 5.17.0, inicialice el SDK de RUM y configure el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]` para comenzar a recopilar datos de indicadores de características.

{{% collapse-content title="MNP" level="h4" %}}
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

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/
{{% /tab %}}
{{% tab "Android" %}}

El seguimiento de la bandera de características está disponible en el SDK de Android de RUM. Para empezar, configure [RUM Android monitoring][1]. Necesitas la versión de Android RUM SDK >= 1.18.0.

[1]: /es/real_user_monitoring/application_monitoring/android/setup/
{{% /tab %}}
{{% tab "Flutter" %}}

El seguimiento de la bandera de características está disponible para sus aplicaciones Flutter. Para empezar, configura [RUM Flutter monitoring][1]. Necesita la versión Flutter Plugin >= 1.3.2.

[1]: /es/real_user_monitoring/application_monitoring/flutter/setup/
{{% /tab %}}
{{% tab "iOS" %}}

El seguimiento de la bandera de características está disponible en el SDK de RUM iOS. Para empezar, configure [RUM iOS monitoring][1]. Necesitas la versión iOS RUM SDK >= 1.16.0.

[1]: /es/real_user_monitoring/application_monitoring/ios/setup
{{% /tab %}}
{{% tab "Kotlin Multiplataforma" %}}

El seguimiento de banderas está disponible para sus aplicaciones Kotlin Multiplataforma. Para empezar, configure [RUM Kotlin Multiplatform monitoring][1].

[1]: /es/real_user_monitoring/application_monitoring/kotlin_multiplatform
{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

El seguimiento de indicadores de funciones está disponible para sus aplicaciones React Native. Para empezar, configure [RUM React Native monitoring][1]. Necesita la versión del SDK de React Native RUM >= 1.7.0.

[1]: /es/real_user_monitoring/application_monitoring/react_native/setup
{{% /tab %}}
{{% tab "Unidad" %}}

El seguimiento de indicadores de funciones está disponible para sus aplicaciones Unity. Para empezar, configure [RUM Unity monitoring][1].

[1]: /es/real_user_monitoring/application_monitoring/unity/setup
{{% /tab %}}
{{< /tabs >}}

## Integraciones

Puede comenzar a recopilar datos de indicadores de características con [soluciones de gestión de indicadores de características personalizadas] (#customfeatureflagmanagement), o utilizando uno de los socios de integración de Datadog.

Datadog admite integraciones con:
{{< partial name="rum/rum-feature-flag-tracking.html" >}}


</br>

### Integración de amplitud

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Amplitude y cree evaluaciones de indicadores de características de informes de oyentes de exposición a Datadog utilizando el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulte [Documentación del SDK de JavaScript][1] de Amplitude.

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


[1]: https://www.docs.developers.amplitude.com/experiment/sdks/javascriptsdk/

{{% /tab %}}
{{% tab "iOS" %}}

Inicialice el SDK de Amplitude y cree un inspector que informe de las evaluaciones de indicadores de características a Datadog utilizando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulte [documentación del SDK de iOS][1] de Amplitude.

```rápido
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

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/iossdk/


{{% /tab %}}
{{% tab "Android" %}}

Inicialice el SDK de Amplitude y cree un inspector que informe de las evaluaciones de indicadores de características a Datadog utilizando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulte [Documentación del SDK de Android][1] de Amplitude.

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

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/androidsdk/


{{% /tab %}}
{{% tab "Flutter" %}}

La amplitud no apoya esta integración. Crea un ticket con Amplitude para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}

### Integración de ConfigCat

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de Javascript de ConfigCat, suscríbase al evento "flagEvaluated" e informe de las evaluaciones de los indicadores de características a Datadog:

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

Para obtener más información sobre cómo inicializar el SDK de Javascript de ConfigCat, consulte [Documentación del SDK de JavaScript][1] de ConfigCat.

[1]: https://configcat.com/docs/sdkreference/js


{{% /tab %}}
{{% tab "iOS" %}}

Al inicializar el SDK de ConfigCat Swift iOS, suscríbase al evento “flagEvaluated” e informe de las evaluaciones de indicadores de características a Datadog:

```rápido
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

Para obtener más información sobre cómo inicializar el SDK de ConfigCat Swift (iOS), consulte ConfigCat[Documentación del SDK de Swift iOS][1].

[1]: https://configcat.com/docs/sdkreference/ios


{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de Android de ConfigCat, suscríbase al evento “flagEvaluated” e informe de las evaluaciones de indicadores de características a Datadog:

```java
  ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
    options.hooks().addOnFlagEvaluated(details -> {
        GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
    });
  });
```

Para obtener más información sobre cómo inicializar el SDK de Android de ConfigCat, consulte [Documentación del SDK de Android][1] de ConfigCat.

[1]: https://configcat.com/docs/sdkreference/android


{{% /tab %}}
{{% tab "Flutter" %}}

Al inicializar el SDK de ConfigCat Dart, suscríbase al evento “flagEvaluated” e informe de las evaluaciones de los indicadores de características a Datadog:

Dardo
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

Para obtener más información acerca de la inicialización del SDK ConfigCat Dart (Flutter), consulte ConfigCat [Documentación del SDK Dart][1].

[1]: https://configcat.com/docs/sdkreference/dart


{{% /tab %}}


{{% tab "Reaccionar nativo" %}}

Al inicializar el SDK de ConfigCat React, suscríbase al evento “flagEvaluated” e informe de las evaluaciones de indicadores de características a Datadog:

```tipografía
<ConfigCatProvider
  sdkKey="YOUR_SDK_KEY"
  pollingMode={PollingMode.AutoPoll}
  options={{
    setupHooks: (ganchos) =>
      hooks.on('flagEvaluated', (detalles) => {
        DdRum.addFeatureFlagEvaluation(details.key, details.value);
      }),
  }}
>
  ...
</ConfigCatProvider>
```

For more information about initializing the ConfigCat React SDK, see ConfigCat's [React SDK documentation][1].

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}
{{< /tabs >}}

### Gestión personalizada de banderas de características

{{< tabs >}}
{{% tab "Navegador" %}}

Cada vez que se evalúe un indicador de características, agregue la siguiente función para enviar la información del indicador de características a RUM:

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Cada vez que se evalúe un indicador de características, agregue la siguiente función para enviar la información del indicador de características a RUM:

   ```rápido
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Cada vez que se evalúe un indicador de características, agregue la siguiente función para enviar la información del indicador de características a RUM:

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Cada vez que se evalúe un indicador de características, agregue la siguiente función para enviar la información del indicador de características a RUM:

   Dardo
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

Cada vez que se evalúe un indicador de características, agregue la siguiente función para enviar la información del indicador de características a RUM:

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### Integración de DevCycle

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializar el SDK de DevCycle y suscribirse al evento `variableEvaluated`, eligiendo suscribirse a todas las evaluaciones de variables `variableEvaluated:*` o evaluaciones de variables particulares `variableEvaluated:myvariablekey`.

Para obtener más información sobre cómo inicializar el SDK de DevCycle, consulte [Documentación del SDK de JavaScript de DevCycle][5] y para obtener más información sobre el sistema de eventos de DevCycle, consulte [Documentación de eventos del SDK de DevCycle][6].

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


[5]: https://docs.devcycle.com/sdk/clientsidesdks/javascript/javascriptinstall
[6]: https://docs.devcycle.com/sdk/clientsidesdks/javascript/javascriptusage#subscribingtosdkevents
{{% /tab %}}
{{% tab "iOS" %}}

DevCycle no admite esta integración. Cree un ticket con DevCycle para solicitar esta función.


{{% /tab %}}
{{% tab "Android" %}}

DevCycle no admite esta integración. Cree un ticket con DevCycle para solicitar esta función.


{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle no admite esta integración. Cree un ticket con DevCycle para solicitar esta función.


{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

DevCycle no admite esta integración. Cree un ticket con DevCycle para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}

### Integración de Eppo

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Eppo y cree un registrador de asignaciones que informe adicionalmente de las evaluaciones de indicadores de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulte [Documentación del SDK de JavaScript de Eppo][1].

```tipografía
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

[1]: https://docs.geteppo.com/sdks/clientsdks/javascript
{{% /tab %}}
{{% tab "iOS" %}}

Inicialice el SDK de Eppo y cree un registrador de asignaciones que informe adicionalmente de las evaluaciones de indicadores de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulte [Documentación del SDK de iOS de Eppo][1].

```rápido
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/clientsdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Inicialice el SDK de Eppo y cree un registrador de asignaciones que informe adicionalmente de las evaluaciones de indicadores de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulte [Documentación del SDK de Android de Eppo][1].

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


[1]: https://docs.geteppo.com/sdks/clientsdks/android

{{% /tab %}}
{{% tab "Flutter" %}}

Eppo no apoya esta integración. [Contacte con Eppo][1] para solicitar esta función.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

Inicialice el SDK de Eppo y cree un registrador de asignaciones que informe adicionalmente de las evaluaciones de indicadores de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulte [Documentación del SDK nativo de Eppo's React][1].

```tipografía
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

[1]: https://docs.geteppo.com/sdks/clientsdks/reactnative

{{% /tab %}}
{{< /tabs >}}

### Integración Flagsmith

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Flagsmith con la opción `datadogRum`, que informa de las evaluaciones de las características a Datadog utilizando el fragmento de código que se muestra a continuación.

   Opcionalmente, puede configurar el cliente para que los rasgos Flagsmith se envíen a Datadog a través de `datadogRum.setUser()`. Para obtener más información sobre cómo inicializar el SDK de Flagsmith, consulta [Documentación del SDK de JavaScript de Flagsmith][1].

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

Flagsmith no admite esta integración. Crea un ticket con Flagsmith para solicitar esta función.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith no admite esta integración. Crea un ticket con Flagsmith para solicitar esta función.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith no admite esta integración. Crea un ticket con Flagsmith para solicitar esta función.

{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

Flagsmith no admite esta integración actualmente. Crea un ticket con Flagsmith para solicitar esta función.

{{% /tab %}}
{{< /tabs >}}

### Integración de GrowthBook

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de GrowthBook, informe de las evaluaciones de indicadores de características a Datadog mediante la devolución de llamada `onFeatureUsage`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulte [Documentación del SDK de JavaScript de GrowthBook][1].

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/js#step1configureyourapp

{{% /tab %}}
{{% tab "iOS" %}}

GrowthBook no admite esta integración. Comuníquese con GrowthBook para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de GrowthBook, informe de las evaluaciones de indicadores de características a Datadog llamando a `setFeatureUsageCallback`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulte [Documentación del SDK de GrowthBook para Android][1].

```kotlin
val gbBuilder = GBSDKBuilder(...)

gbBuilder.setFeatureUsageCallback { featureKey, result ->
  GlobalRumMonitor.get().addFeatureFlagEvaluation(featureKey, result.value);
}

val gb = gbBuilder.initialize()
```

[1]: https://docs.growthbook.io/lib/kotlin#quickusage

{{% /tab %}}
{{% tab "Flutter" %}}

Al inicializar el SDK de GrowthBook, informe de las evaluaciones de indicadores de características a Datadog llamando a `setFeatureUsageCallback`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulte [Documentación del SDK Flutter de GrowthBook][1].

Dardo
final gbBuilder = GBSDKBuilderApp(...);
gbBuilder.setFeatureUsageCallback((featureKey, result) {
  DatadogSdk.instance.rum?.addFeatureFlagEvaluation(featureKey, result.value);
});
final gb = await gbBuilder.initialize();
```

[1]: https://docs.growthbook.io/lib/flutter#quickusage

{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

Al inicializar el SDK de GrowthBook, informe de las evaluaciones de indicadores de características a Datadog mediante la devolución de llamada `onFeatureUsage`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulte [Documentación del SDK nativo de GrowthBook][1].

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

[1]: https://docs.growthbook.io/lib/reactnative#step1configureyourapp

{{% /tab %}}
{{< /tabs >}}

### Integración de Kameleoon

{{< tabs >}}
{{% tab "Navegador" %}}

Después de crear e inicializar el SDK de Kameleoon, suscríbase al evento `Evaluación` utilizando el controlador `onEvent`.

Para obtener más información sobre el SDK, consulte [Documentación del SDK de JavaScript de Kameleoon][1].

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/featuremanagementandexperimentation/websdks/jssdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon no apoya esta integración. Contacte con product@kameleoon.com para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon no apoya esta integración. Contacte con product@kameleoon.com para solicitar esta función.


{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon no apoya esta integración. Contacte con product@kameleoon.com para solicitar esta función.


{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

Después de crear e inicializar el SDK de Kameleoon, suscríbase al evento `Evaluación` utilizando el controlador `onEvent`.

Obtenga más información sobre la inicialización de SDK en la [documentación de Kameleoon React Native SDK][1].

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/featuremanagementandexperimentation/websdks/reactjssdk
{{% /tab %}}
{{< /tabs >}}


### LaunchDarkly integración

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de LaunchDarkly y cree una función de informes de inspector que señale las evaluaciones a Datadog utilizando el fragmento de código que se muestra a continuación.

 Para obtener más información sobre cómo inicializar el SDK de LaunchDarkly, consulte [Documentación del SDK de JavaScript de LaunchDarkly][1].

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


[1]: https://docs.launchdarkly.com/sdk/clientside/javascript#initializingtheclient
{{% /tab %}}
{{% tab "iOS" %}}

LaunchDarkly no admite esta integración. Crea un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly no admite esta integración. Crea un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly no admite esta integración. Crea un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

LaunchDarkly no admite esta integración actualmente. Crea un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}


### Integración dividida

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Split y cree evaluaciones de indicadores de características de informes de escucha de impresión a Datadog utilizando el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Split, consulte [Documentación del SDK de JavaScript][1] de Split.

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


[1]: https://help.split.io/hc/enus/articles/360020448791JavaScriptSDK#2instanciatethesdkandcreateanewsplitclient
{{% /tab %}}
{{% tab "iOS" %}}

Inicialice el SDK de Split y cree un inspector que informe de las evaluaciones de indicadores de características a Datadog usando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Split, consulte [documentación del SDK de iOS][1] de Split.

```rápido
  let config = SplitClientConfig()
  // Send the feature flag when Split reports the impression
  config.impressionListener = { impression in
      if let feature = impression.feature,
          let treatment = impression.treatment {
          RUMMonitor.shared().addFeatureFlagEvaluation(name: feature, value: treatment)
      }
  }
```


[1]: https://help.split.io/hc/enus/articles/360020401491iOSSDK
{{% /tab %}}
{{% tab "Android" %}}

Inicialice el SDK de Split y cree un inspector que informe de las evaluaciones de indicadores de características a Datadog usando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Split, consulte [Documentación del SDK de Android][1] de Split.

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


[1]: https://help.split.io/hc/enus/articles/360020343291AndroidSDK
{{% /tab %}}
{{% tab "Flutter" %}}

Inicialice el SDK de Split y cree un inspector que informe de las evaluaciones de indicadores de características a Datadog usando el fragmento de código a continuación.

Para obtener más información acerca de la inicialización del SDK de Split, consulte [Documentación del complemento Full][1] de Split.

Dardo
  StreamSubscription<Impression> impressionsStream = _split.impressionsStream().listen((impression) {
    // Send the feature flag when Split reports the impression
    final split = impression.split;
    final treatment = impression.treatment;
    if (split != null && treatment != null) {
      DatadogSdk.instance.rum?.addFeatureFlagEvaluation(split, treatment);
    }
  });
```


[1]: https://help.split.io/hc/enus/articles/8096158017165Flutterplugin
{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

Inicialice el SDK de Split y cree evaluaciones de indicadores de características de informes de escucha de impresión a Datadog utilizando el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Split, consulte [Documentación del SDK nativo de React][1] de Split.

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


[1]: https://help.split.io/hc/enus/articles/4406066357901ReactNativeSDK#2instanciatethesdkandcreateanewsplitclient
{{% /tab %}}
{{< /tabs >}}

### Integración de Statsig

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Statsig con `statsig.initialize`.

1.Actualice el SDK del navegador RUM versión 4.25.0 o superior.
2. Inicialice el SDK de RUM y configure el parámetro de inicialización `enableExperimentalFeatures` con `["feature_flags"]`.
3. Inicialice el SDK de Statsig (`>= v4.34.0`) e implemente la opción `gateEvaluationCallback` como se muestra a continuación:

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

Statsig no apoya esta integración. Póngase en contacto con support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Statsig no apoya esta integración. Póngase en contacto con support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig no apoya esta integración. Póngase en contacto con support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "Reaccionar nativo" %}}

Statsig no admite actualmente esta integración. Póngase en contacto con support@statsig.com para solicitar esta función.

{{% /tab %}}
{{< /tabs >}}

## Analiza el rendimiento de tu Feature Flag en RUM

Las banderas de características aparecen en el contexto de las sesiones, vistas y errores de RUM como una lista.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="Lista de atributos de la bandera en RUM Explorer" style="width:75%;">}}

### Buscar indicadores de características usando el Explorador de RUM
Busque entre todos los datos recopilados por RUM en el [Explorador de RUM][2] para descubrir tendencias en indicadores de características, analizar patrones con mayor contexto o exportarlos a [tableros][3] y [monitores][4]. Puede buscar sus Sesiones, Vistas o Errores en el Explorador de RUM, con el atributo `@feature_flags.{flag_name}`.

#### Sesiones
Al filtrar sus **Sesiones** con el atributo `@feature_flags.{flag_name}`, puede encontrar todas las sesiones en el marco de tiempo dado donde se evaluó su indicador de característica.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="Sesiones de búsqueda de indicadores de funciones en el Explorador de RUM" style="width:75%;">}}

#### Vistas
Filtrando sus **Vistas** con el atributo `@feature_flags.{flag_name}`, puede encontrar las vistas específicas en el marco de tiempo dado donde se evaluó su indicador de característica.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="Vistas de búsqueda de banderas de características en el explorador de RUM" style="width:75%;">}}

#### Errores
Filtrando sus **Errores** con el atributo `@feature_flags.{flag_name}`, puede encontrar todos los errores en el marco de tiempo dado que ocurrieron en la Vista donde se evaluó su indicador de característica

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="Errores de búsqueda de indicadores de características en el explorador de RUM" style="width:75%;">}}

## Troubleshooting

### Los datos de mi indicador de características no reflejan lo que espero ver
Los indicadores de características se muestran en el contexto de eventos en los que se evalúan, lo que significa que deben aparecer en las vistas en las que se ejecuta la lógica de código de indicador de características.

Dependiendo de cómo hayas estructurado tu código y configurado tus indicadores de características, es posible que aparezcan indicadores de características inesperados en el contexto de algunos eventos.

Por ejemplo, para ver en qué **Vistas** se está evaluando el indicador de características, puede usar el Explorador de RUM para realizar una consulta similar:

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="Vistas de búsqueda de banderas de características en el explorador de RUM" style="width:75%;">}}

Estos son algunos ejemplos de razones por las que su indicador de características está siendo evaluado en vistas no relacionadas que pueden ayudar con sus investigaciones:

 Un componente react común que aparece en varias páginas y que evalúa los indicadores de características cada vez que se ejecutan.
 Un problema de enrutamiento donde los componentes con una evaluación de indicador de características se representan antes/después de los cambios de URL.

Al realizar sus investigaciones, también puede definir sus datos para `Ver nombre`' que son relevantes para su bandera de características.


## Seguir leyendo
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/
[2]: https://app.datadoghq.com/rum/explorer
[3]: /es/tableros/
[4]: /es/monitors/#createmonitors
[5]: /es/real_user_monitoring/feature_flag_tracking