---
aliases:
- /es/real_user_monitoring/guide/getting-started-feature-flags/
beta: true
description: Descubre cómo configurar RUM para recopilar datos de indicadores de funciones
  y analizar el rendimiento en Datadog
further_reading:
- link: /real_user_monitoring/feature_flag_tracking
  tag: Documentation
  text: Analiza los datos de tus indicadores de funciones con Feature Flag Tracking
- link: /real_user_monitoring/explorer
  tag: Documentation
  text: Visualiza tus datos de RUM en el RUM Explorer
title: Introducción a los datos de indicadores de funciones en RUM
---
## Resumen general
Los datos de los indicadores de funciones te ofrecen una mayor visibilidad de la experiencia del usuario y de la supervisión del rendimiento, ya que te permiten determinar a qué usuarios se les muestra una función concreta y si cualquier cambio que introduzcas está afectando a la experiencia del usuario o perjudicando el rendimiento.

Al complementar tus datos de RUM con información sobre los indicadores de funciones, podrás estar seguro de que tu función se lanza correctamente sin provocar involuntariamente un error o una disminución del rendimiento. Gracias a esta información adicional, podrás relacionar el lanzamiento de nuevas funciones con el rendimiento, identificar problemas en versiones concretas y resolverlos más rápidamente.

## Configuración

{{< tabs >}}
{{% tab "Navegador" %}}

El seguimiento de indicadores de funciones está disponible en el SDK de RUM para navegadores. Para empezar, configura la [supervisión del navegador RUM][1]. Necesitas la versión 4.25.0 o superior del SDK de RUM para navegadores.

<details>
  <summary>Antes de <code>la versión 5.17.0</code></summary>

Si utilizas una versión anterior a la 5.17.0, inicializa el SDK de RUM y configura el `enableExperimentalFeatures`parámetro de inicialización con`["feature_flags"]`  para comenzar a recopilar datos de indicadores de funciones.

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

{{% collapse-content title="Sincronización de CDN" level="h4" %}}
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

El seguimiento de indicadores de funciones está disponible en el SDK de RUM para Android. Para empezar, configura [la supervisión de RUM para Android][1]. Necesitas el SDK de RUM para Android en una versión igual o superior a la 1.18.0.

[1]: /es/real_user_monitoring/application_monitoring/android/setup/
{{% /tab %}}
{{% tab "Flutter" %}}

El seguimiento de indicadores de funciones está disponible para tus aplicaciones Flutter. Para empezar, configura [la supervisión de Flutter con RUM][1]. Necesitas la versión >= 1.3.2 del complemento de Flutter.

[1]: /es/real_user_monitoring/application_monitoring/flutter/setup/
{{% /tab %}}
{{% tab "iOS" %}}

El seguimiento de indicadores de funciones está disponible en el SDK de RUM para iOS. Para empezar, configura [la supervisión de RUM en iOS][1]. Necesitas la versión >= 1.16.0 del SDK de RUM para iOS.

[1]: /es/real_user_monitoring/application_monitoring/ios/setup
{{% /tab %}}
{{% tab "Kotlin Multipropósito" %}}

El seguimiento de indicadores de funciones ya está disponible para tus aplicaciones de Kotlin Multiplatform. Para empezar, configura [la monitorización de RUM en Kotlin Multiplatform][1].

[1]: /es/real_user_monitoring/application_monitoring/kotlin_multiplatform
{{% /tab %}}
{{% tab "React Native" %}}

El seguimiento de indicadores de funciones está disponible para tus aplicaciones de React Native. Para empezar, configura [la supervisión de RUM en React Native][1]. Necesitas la versión >= 1.7.0 del SDK de React Native RUM.

[1]: /es/real_user_monitoring/application_monitoring/react_native/setup
{{% /tab %}}
{{% tab "Unidad" %}}

El seguimiento de indicadores de funciones está disponible para tus aplicaciones de Unity. Para empezar, configura [la supervisión de RUM Unity][1].

[1]: /es/real_user_monitoring/application_monitoring/unity/setup
{{% /tab %}}
{{< /tabs >}}

## Integraciones

Puedes empezar a recopilar datos de indicadores de funciones mediante soluciones[ personalizadas de gestión de indicadores de funciones o](#custom-feature-flag-management) utilizando uno de los socios de integración de Datadog.

Datadog es compatible con integraciones con:
{{< partial name="rum/rum-feature-flag-tracking.html" >}}


</br>

### Integración de amplitud

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Amplitude y crea un detector de exposiciones que envíe a Datadog los resultados de las evaluaciones de los indicadores de función mediante el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulta la [documentación del SDK de JavaScript de Amplitude][1].

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

Inicializa el SDK de Amplitude y crea un inspector que envíe a Datadog los resultados de las evaluaciones de los indicadores de funciones mediante el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulta la [documentación del SDK para iOS de Amplitude][1].

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

Inicializa el SDK de Amplitude y crea un inspector que envíe a Datadog los resultados de las evaluaciones de los indicadores de funciones mediante el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulta la [documentación del SDK de Android de Amplitude][1].

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

Amplitude no admite esta integración. Crea un ticket en Amplitude para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}

### Integración con ConfigCat

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de JavaScript de ConfigCat, suscríbete al`flagEvaluated`evento y envía los resultados de las evaluaciones de los indicadores de funciones a Datadog:

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

Para obtener más información sobre cómo inicializar el SDK de JavaScript de ConfigCat, consulta la [documentación del SDK de JavaScript de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/js


{{% /tab %}}
{{% tab "iOS" %}}

Al inicializar el SDK de ConfigCat para Swift en iOS, suscríbete al`flagEvaluated`evento y envía los resultados de las evaluaciones de los indicadores de funciones a Datadog:

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

Para obtener más información sobre cómo inicializar el SDK de ConfigCat para Swift (iOS), consulta la [documentación del SDK de ConfigCat para Swift iOS][1].

[1]: https://configcat.com/docs/sdk-reference/ios


{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de ConfigCat para Android, suscríbete al`flagEvaluated`evento y envía los resultados de las evaluaciones de los indicadores de funciones a Datadog:

```java
  ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
    options.hooks().addOnFlagEvaluated(details -> {
        GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
    });
  });
```

Para obtener más información sobre cómo inicializar el SDK de ConfigCat para Android, consulta la [documentación del SDK de ConfigCat para Android][1].

[1]: https://configcat.com/docs/sdk-reference/android


{{% /tab %}}
{{% tab "Flutter" %}}

Al inicializar el SDK de ConfigCat para Dart, suscríbete al`flagEvaluated`evento y envía los resultados de las evaluaciones de los indicadores de funciones a Datadog:

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

Para obtener más información sobre cómo inicializar el SDK de ConfigCat para Dart (Flutter), consulta la [documentación del SDK de Dart de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/dart


{{% /tab %}}


{{% tab "React Native" %}}

Al inicializar el SDK de ConfigCat para React, suscríbete al`flagEvaluated`evento y envía los resultados de las evaluaciones de los indicadores de funciones a Datadog:

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

For more information about initializing the ConfigCat React SDK, see ConfigCat's [React SDK documentation][1].

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}
{{< /tabs >}}

### Gestión personalizada de indicadores de funciones

{{< tabs >}}
{{% tab "Navegador" %}}

Cada vez que se evalúe un indicador de función, añade la siguiente función para enviar la información del indicador de función a RUM:

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Cada vez que se evalúe un indicador de función, añade la siguiente función para enviar la información del indicador de función a RUM:

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Cada vez que se evalúe un indicador de función, añade la siguiente función para enviar la información del indicador de función a RUM:

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Cada vez que se evalúe un indicador de función, añade la siguiente función para enviar la información del indicador de función a RUM:

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

Cada vez que se evalúe un indicador de función, añade la siguiente función para enviar la información del indicador de función a RUM:

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### Integración con DevCycle

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de DevCycle y suscríbete al`variableEvaluated`evento, eligiendo entre suscribirte a todas las evaluaciones de variables`variableEvaluated:*` o a evaluaciones de `variableEvaluated:my-variable-key`variables concretas.

Para obtener más información sobre cómo inicializar el SDK de DevCycle, consulta la [documentación del SDK de JavaScript de DevCycle][5] y, para obtener más información sobre el sistema de eventos de DevCycle, consulta la [documentación de eventos del SDK de DevCycle][6].

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

DevCycle no admite esta integración. Crea un ticket en DevCycle para solicitar esta función.


{{% /tab %}}
{{% tab "Android" %}}

DevCycle no admite esta integración. Crea un ticket en DevCycle para solicitar esta función.


{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle no admite esta integración. Crea un ticket en DevCycle para solicitar esta función.


{{% /tab %}}
{{% tab "React Native" %}}

DevCycle no admite esta integración. Crea un ticket en DevCycle para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}

### Integración con Eppo

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que, además, envíe a Datadog los resultados de las evaluaciones de los indicadores de funciones utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulta la [documentación del SDK de JavaScript de Eppo][1].

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

Inicializa el SDK de Eppo y crea un registrador de asignaciones que, además, envíe a Datadog los resultados de las evaluaciones de los indicadores de funciones utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulta la [documentación del SDK de Eppo para iOS][1].

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/client-sdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que, además, envíe a Datadog los resultados de las evaluaciones de los indicadores de funciones utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulta la [documentación del SDK de Android de Eppo][1].

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

Eppo no admite esta integración. [Ponte en contacto con Eppo][1] para solicitar esta función.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que, además, envíe a Datadog los resultados de las evaluaciones de los indicadores de funciones utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulta la [documentación del SDK de Eppo para React Native][1].

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

Inicializa el SDK de Flagsmith con la`datadogRum`opción , que envía los resultados de las evaluaciones de los indicadores de funciones a Datadog mediante el fragmento de código que se muestra a continuación.

   Si lo deseas, puedes configurar el cliente para que los rasgos de Flagsmith se envíen a Datadog a través de `datadogRum.setUser()`. Para obtener más información sobre cómo inicializar el SDK de Flagsmith, consulta la [documentación del SDK de JavaScript de Flagsmith][1].

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

Flagsmith no es compatible con esta integración. Crea un ticket en Flagsmith para solicitar esta función.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith no es compatible con esta integración. Crea un ticket en Flagsmith para solicitar esta función.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith no es compatible con esta integración. Crea un ticket en Flagsmith para solicitar esta función.

{{% /tab %}}
{{% tab "React Native" %}}

Actualmente, Flagsmith no admite esta integración. Crea un ticket en Flagsmith para solicitar esta función.

{{% /tab %}}
{{< /tabs >}}

### Integración con GrowthBook

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de GrowthBook, envía a Datadog los resultados de las evaluaciones de los indicadores de funciones mediante la`onFeatureUsage`función de devolución de llamada.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulta la [documentación del SDK de JavaScript de GrowthBook][1].

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

GrowthBook no admite esta integración. Ponte en contacto con GrowthBook para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de GrowthBook, envía las evaluaciones de los indicadores de funciones a Datadog llamando a `setFeatureUsageCallback`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulta la [documentación del SDK de GrowthBook para Android][1].

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

Al inicializar el SDK de GrowthBook, envía las evaluaciones de los indicadores de funciones a Datadog llamando a `setFeatureUsageCallback`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulta la [documentación del SDK de GrowthBook para Flutter][1].

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

Al inicializar el SDK de GrowthBook, envía a Datadog los resultados de las evaluaciones de los indicadores de funciones mediante la`onFeatureUsage`función de devolución de llamada.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulta la [documentación del SDK de GrowthBook para React Native][1].

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

### Integración con Kameleoon

{{< tabs >}}
{{% tab "Navegador" %}}

Una vez creado e inicializado el SDK de Kameleoon, suscríbete al`Evaluation`evento utilizando el`onEvent`controlador.

Para obtener más información sobre el SDK, consulta la [documentación del SDK de JavaScript de Kameleoon][1].

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon no es compatible con esta integración. Escríbenos a product@kameleoon.com para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon no es compatible con esta integración. Escríbenos a product@kameleoon.com para solicitar esta función.


{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon no es compatible con esta integración. Escríbenos a product@kameleoon.com para solicitar esta función.


{{% /tab %}}
{{% tab "React Native" %}}

Una vez creado e inicializado el SDK de Kameleoon, suscríbete al`Evaluation`evento utilizando el`onEvent`controlador.

Para obtener más información sobre la inicialización del SDK, consulta la [documentación del SDK de Kameleoon para React Native][1].

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```


[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/react-js-sdk
{{% /tab %}}
{{< /tabs >}}


### Integración con LaunchDarkly

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de LaunchDarkly y crea un inspector que envíe a Datadog los resultados de las evaluaciones de los indicadores de funciones utilizando el fragmento de código que se muestra a continuación.

 Para obtener más información sobre cómo inicializar el SDK de LaunchDarkly, consulta la [documentación del SDK de JavaScript de LaunchDarkly][1].

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

LaunchDarkly no admite esta integración. Crea un ticket en LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly no admite esta integración. Crea un ticket en LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly no admite esta integración. Crea un ticket en LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "React Native" %}}

Actualmente, LaunchDarkly no admite esta integración. Crea un ticket en LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}


### Integración dividida

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Split y crea un detector de impresiones que envíe a Datadog los resultados de las evaluaciones de los indicadores de función utilizando el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Split, consulta la [documentación del SDK de JavaScript de Split][1].

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

Inicializa el SDK de Split y crea un inspector que envíe a Datadog los resultados de las evaluaciones de los indicadores de función utilizando el fragmento de código que aparece a continuación.

Para obtener más información sobre cómo inicializar el SDK de Split, consulta la [documentación del SDK para iOS de Split][1].

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

Inicializa el SDK de Split y crea un inspector que envíe a Datadog los resultados de las evaluaciones de los indicadores de función utilizando el fragmento de código que aparece a continuación.

Para obtener más información sobre cómo inicializar el SDK de Split, consulta la [documentación del SDK de Android de Split][1].

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

Inicializa el SDK de Split y crea un inspector que envíe a Datadog los resultados de las evaluaciones de los indicadores de función utilizando el fragmento de código que aparece a continuación.

Para obtener más información sobre cómo inicializar el SDK de Split, consulta la [documentación del complemento de Flutter de Split][1].

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

Inicializa el SDK de Split y crea un detector de impresiones que envíe a Datadog los resultados de las evaluaciones de los indicadores de función utilizando el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Split, consulta la [documentación del SDK de React Native de Split][1].

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

Inicialice el SDK de Statsig con `statsig.initialize`. 

1. Actualice la versión del SDK de RUM de su navegador a la 4.25.0 o superior. 
2. Inicialice el SDK de RUM y configure el `enableExperimentalFeatures`parámetro de inicialización con `["feature_flags"]`. 
3. Inicialice el SDK de Statsig (`>= v4.34.0`) e implemente la`gateEvaluationCallback`opción tal y como se muestra a continuación:

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

Statsig no admite esta integración. Escríbenos a support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Statsig no admite esta integración. Escríbenos a support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig no admite esta integración. Escríbenos a support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "React Native" %}}

Actualmente, Statsig no admite esta integración. Escríbenos a support@statsig.com para solicitar esta función.

{{% /tab %}}
{{< /tabs >}}

## Analiza el rendimiento de tus indicadores de funciones en RUM

Los indicadores de funciones aparecen en forma de lista en el contexto de tus sesiones, visitas y errores de RUM.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature-flag-list-rum-event.png" alt="Lista de atributos de los indicadores de funciones en RUM Explorer" style="width:75%;">}}

### Buscar indicadores de funciones mediante el Explorador de RUM
Busca entre todos los datos recopilados por RUM en el [RUM Explorer][2] para detectar tendencias en los indicadores de funciones, analizar patrones con mayor contexto o exportarlos a [paneles de control][3] y [monitores][4]. Puedes buscar tus sesiones, visitas o errores en el RUM Explorer utilizando el`@feature_flags.{flag_name}`atributo «Sessions

#### ».
Si filtras tus **sesiones** con el`@feature_flags.{flag_name}`atributo, podrás encontrar todas las sesiones del intervalo de tiempo indicado en las que se evaluó tu indicador de función.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-session-feature-flag-search.png" alt="Buscar sesiones para indicadores de funciones en el Explorador de RUM" style="width:75%;">}}

#### Vistas
Si filtras tus **vistas** con el`@feature_flags.{flag_name}`atributo, podrás encontrar las vistas específicas del intervalo de tiempo indicado en las que se evaluó tu indicador de función.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-view-feature-flag-search.png" alt="Vistas de búsqueda de indicadores de funciones en el RUM Explorer" style="width:75%;">}}

#### Errores
Al filtrar tus **errores** con el`@feature_flags.{flag_name}`atributo, podrás encontrar todos los errores que se produjeron en el intervalo de tiempo especificado en la vista en la que se evaluó tu indicador de función.

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/rum-explorer-error-feature-flag-search.png" alt="Errores de búsqueda de indicadores de funciones en el RUM Explorer" style="width:75%;">}}

## Solución de problemas: Los

###  datos de mis indicadores de funciones no se corresponden con lo que esperaba ver
Los indicadores de función aparecen en el contexto de los eventos en los que se evalúan, lo que significa que deben aparecer en las vistas en las que se ejecuta la lógica del código del indicador de función.

Dependiendo de cómo hayas estructurado tu código y configurado tus indicadores de funciones, es posible que aparezcan indicadores de funciones inesperados en el contexto de algunos eventos.

Por ejemplo, para ver en qué **vistas se está **evaluando tu indicador de función, puedes utilizar el RUM Explorer para realizar una consulta similar:

{{< img src="real_user_monitoring/guide/setup-feature-flag-data-collection/feature_flag_view_query.png" alt="Vistas de búsqueda de indicadores de funciones en el RUM Explorer" style="width:75%;">}}

A continuación te ofrecemos algunos ejemplos de motivos por los que tu indicador de función se está evaluando en vistas no relacionadas, lo que puede ayudarte en tu investigación:

-  un componente React común que aparece en varias páginas y que evalúa los indicadores de función cada vez que se ejecutan; 
- un problema de enrutamiento en el que los componentes con una evaluación de indicador de función se representan antes o después de los cambios de URL.

Al realizar tus análisis, también puedes examinar tus datos en busca `View Name`de elementos que sean relevantes para tu indicador de función. 


## Más información
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/
[2]: https://app.datadoghq.com/rum/explorer
[3]: /es/dashboards/
[4]: /es/monitors/#create-monitors
[5]: /es/real_user_monitoring/feature_flag_tracking