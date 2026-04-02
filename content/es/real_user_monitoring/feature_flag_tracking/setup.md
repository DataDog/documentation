---
aliases:
- /es/real_user_monitoring/guide/getting-started-feature-flags/
- /es/real_user_monitoring/guide/setup-feature-flag-data-collection/
beta: true
description: Aprende a configurar RUM para capturar datos de Feature Flag y analizar
  el rendimiento en Datadog
disable_toc: false
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentation
  text: Conoce el explorador de RUM
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Asegura la seguridad de las versiones con Feature Flag Tracking en Datadog
    RUM
title: Configura Feature Flag Tracking
---
Los datos de Feature Flag proporcionan una mayor visibilidad sobre la experiencia del usuario y el seguimiento del rendimiento. Permite determinar qué usuarios están viendo una Feature Flag específica y evaluar si los cambios introducidos están impactando la experiencia del usuario o afectando negativamente el rendimiento.

Al enriquecer tus datos de RUM con datos de Feature Flag, puedes estar seguro de que tu funcionalidad se lanza con éxito sin causar accidentalmente un error o una regresión en el rendimiento. Con esta capa adicional de información, puedes correlacionar los lanzamientos con el rendimiento, identificar problemas en lanzamientos específicos y solucionar problemas más rápido.

## Configura el seguimiento de RUM

Feature Flag Tracking está disponible en el SDK de RUM para explorador, iOS, Android, Flutter y React Native.

{{< tabs >}}
{{% tab "Explorador" %}}

Para habilitar la recolección de datos de Feature Flag para el SDK del explorador:

1. Configura [el seguimiento de RUM para explorador][1]. Necesitas la versión del SDK de RUM del explorador >= 4.25.0.

2. Inicializa el SDK de RUM y configura el parámetro de inicialización `enableExperimentalFeatures` con ` ["feature_flags"]`.

   <details open>
     <summary>npm</summary>

   ```javascript
     import { datadogRum } from '@datadog/browser-rum';

     // Initialize Datadog Browser SDK
     datadogRum.init({
       ...
       enableExperimentalFeatures: ["feature_flags"],
       ...
   });
   ```

   </details>

   <details>
     <summary>CDN asíncrono</summary>

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
     <summary>CDN síncrono</summary>

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

[1]: /es/real_user_monitoring/application_monitoring/browser#setup
{{% /tab %}}
{{% tab "iOS" %}}

Para habilitar la recopilación de datos de Feature Flag para su aplicación iOS:

1. Configura [el seguimiento de RUM para iOS][1]. Necesita la versión del SDK de RUM para iOS >= 1.16.0.

[1]: https://docs.datadoghq.com/es/real_user_monitoring/ios/?tab=swift
{{% /tab %}}
{{% tab "Android" %}}

Para habilitar la recopilación de datos de Feature Flag para su aplicación Android:

1. Configura [el seguimiento de RUM para Android][1]. Necesita la versión del SDK de RUM para Android >= 1.18.0.

[1]: https://docs.datadoghq.com/es/real_user_monitoring/android/?tab=kotlin
{{% /tab %}}
{{% tab "Flutter" %}}

Para habilitar la recopilación de datos de Feature Flag para su aplicación Flutter:

1. Configura [el seguimiento de RUM para Flutter][1]. Necesita la versión del Plugin de Flutter >= 1.3.2.

[1]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/flutter/setup
{{% /tab %}}
{{% tab "React Native" %}}

Para habilitar la recopilación de datos de Feature Flag para su aplicación React Native:

1. Configura [el seguimiento de RUM para React Native][1]. Necesita la versión del SDK de RUM para React Native >= 1.7.0.

[1]: https://docs.datadoghq.com/es/real_user_monitoring/reactnative/
{{% /tab %}}
{{< /tabs >}}

## Configura una integración de Feature Flag

Puede comenzar a recopilar datos de Feature Flag con [soluciones personalizadas de gestión de Feature Flag](#custom-feature-flag-management), o utilizando uno de los socios de integración de Datadog que se enumeran a continuación.

<div class="alert alert-danger">

**Nota**: Los siguientes caracteres especiales no son compatibles con el seguimiento de Feature Flag: `.`, `:`, `+`, `-`, `=`, `&&`, `||`, `>`, `<`, `!`, `(`, `)`, `{`, `}`, `[`, `]`, `^`, `"`, `“`, `”`, `~`, `*`, `?`, `\`. Datadog recomienda evitar estos caracteres cuando sea posible en los nombres de sus Feature Flags. Si se requiere utilizar uno de estos caracteres, reemplace el carácter antes de enviar los datos a Datadog. Por ejemplo:

  ```javascript
  datadogRum.addFeatureFlagEvaluation(key.replaceAll(':', '_'), value);
  ```

</div>

{{< partial name="rum/rum-feature-flag-tracking.html" >}}

</br>

### Integración de Amplitude

Antes de inicializar esta integración de Feature Flag, asegúrese de haber [configurado el seguimiento de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Explorador" %}}

Inicialice el SDK de Amplitude y cree un oyente de exposición que informe las evaluaciones de Feature Flag a Datadog utilizando el siguiente fragmento de código:

Para más información sobre cómo inicializar el SDK de Amplitude, consulte la [documentación del SDK de JavaScript de Amplitude][1].

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

Inicialice el SDK de Amplitude y cree un inspector que informe las evaluaciones de Feature Flag a Datadog utilizando el fragmento de código a continuación.

Para más información sobre cómo inicializar el SDK de Amplitude, consulte la [documentación del SDK de iOS de Amplitude][1].

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

Inicialice el SDK de Amplitude y cree un inspector que informe las evaluaciones de Feature Flag a Datadog utilizando el fragmento de código a continuación.

Para más información sobre cómo inicializar el SDK de Amplitude, consulte la [documentación del SDK de Android de Amplitude][1].

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

Amplitude no es compatible con esta integración. Cree un ticket con Amplitude para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}

### Integración de ConfigCat

Antes de inicializar esta integración de Feature Flag, asegúrese de haber [configurado el seguimiento de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Explorador" %}}

Al inicializar el SDK de Javascript de ConfigCat, suscríbase al evento `flagEvaluated` e informe las evaluaciones de Feature Flag a Datadog:

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

Para más información sobre cómo inicializar el SDK de Javascript de ConfigCat, consulte la [documentación del SDK de JavaScript de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/js


{{% /tab %}}
{{% tab "iOS" %}}

Al inicializar el SDK de ConfigCat Swift para iOS, suscríbase al evento `flagEvaluated` e informe las evaluaciones de Feature Flag a Datadog:

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

Para más información sobre cómo inicializar el SDK de ConfigCat Swift (iOS), consulte la [documentación del SDK de Swift para iOS de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/ios


{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de ConfigCat para Android, suscríbase al evento `flagEvaluated` e informe las evaluaciones de Feature Flag a Datadog:

```java
ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
  options.hooks().addOnFlagEvaluated(details -> {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
  });
});
```

Para más información sobre cómo inicializar el SDK de ConfigCat para Android, consulte la [documentación del SDK de Android de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/android


{{% /tab %}}
{{% tab "Flutter" %}}

Al inicializar el SDK de ConfigCat para Dart, suscríbase al evento `flagEvaluated` e informe las evaluaciones de Feature Flag a Datadog:

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

Para obtener más información sobre la inicialización del SDK de ConfigCat Dart (Flutter), consulte la [documentación del SDK de Dart de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/dart


{{% /tab %}}


{{% tab "React Native" %}}

Al inicializar el SDK de ConfigCat React, suscríbase al evento `flagEvaluated` y reporte las evaluaciones de Feature Flag a Datadog:

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

Para obtener más información sobre la inicialización del SDK de ConfigCat React, consulte la [documentación del SDK de React de ConfigCat][1].

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}
{{< /tabs >}}

### Gestión de Feature Flag personalizada

Antes de inicializar una integración personalizada de Feature Flag, asegúrese de haber [configurado el seguimiento de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Cada vez que se evalúe un Feature Flag, agregue la siguiente función para enviar la información del Feature Flag a RUM:

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Cada vez que se evalúe un Feature Flag, agregue la siguiente función para enviar la información del Feature Flag a RUM:

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Cada vez que se evalúe un Feature Flag, agregue la siguiente función para enviar la información del Feature Flag a RUM:

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Cada vez que se evalúe un Feature Flag, agregue la siguiente función para enviar la información del Feature Flag a RUM:

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

Cada vez que se evalúe un Feature Flag, agregue la siguiente función para enviar la información del Feature Flag a RUM:

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### Integración de DevCycle

Antes de inicializar esta integración de Feature Flag, asegúrese de haber [configurado el seguimiento de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Explorador" %}}

Inicialice el SDK de DevCycle y suscríbase al evento `variableEvaluated`, eligiendo suscribirse a todas las evaluaciones de variables `variableEvaluated:*` o a evaluaciones de variables particulares `variableEvaluated:my-variable-key`.

Para obtener más información sobre la inicialización del SDK de DevCycle, consulte la [documentación del SDK de JavaScript de DevCycle][5] y para obtener más información sobre el sistema de eventos de DevCycle, consulte la [Documentación de Eventos del SDK de DevCycle][6].

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

DevCycle no admite esta integración. Cree un ticket con [DevCycle][1] para solicitar esta característica.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "Android" %}}

DevCycle no admite esta integración. Cree un ticket con [DevCycle][1] para solicitar esta característica.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle no admite esta integración. Cree un ticket con [DevCycle][1] para solicitar esta característica.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "React Native" %}}

DevCycle no admite esta integración. Cree un ticket con [DevCycle][1] para solicitar esta característica.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{< /tabs >}}

### Integración de Eppo

Antes de inicializar esta integración de Feature Flag, asegúrese de haber [configurado el seguimiento de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que, además, reporte las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre la inicialización del SDK de Eppo, consulte la [documentación del SDK de JavaScript de Eppo][1].

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

Inicializa el SDK de Eppo y crea un registrador de asignaciones que, además, reporte las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre la inicialización del SDK de Eppo, consulta la [documentación del SDK de iOS de Eppo][1].

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/client-sdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Inicialice el SDK de Eppo y cree un registrador de asignaciones que además reporte las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre la inicialización del SDK de Eppo, consulte la [documentación del SDK de Android de Eppo][1].

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

Eppo no admite esta integración. [Contacta a Eppo][1] para solicitar esta característica.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

Inicializa el SDK de Eppo y crea un registrador de asignaciones que, además, reporte las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre la inicialización del SDK de Eppo, consulte la [documentación del SDK de React Native de Eppo][1].

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

### integración de Flagsmith

Antes de inicializar esta integración de bandera de características, asegúrese de haber [configurado el seguimiento de RUM](#set-up-rum-monitoring).

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

### integración de GrowthBook

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

### integración de Kameleoon

Antes de inicializar esta integración de bandera de características, asegúrate de haber [configurado el monitoreo de RUM](#set-up-rum-monitoring).

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

Aprende más sobre la inicialización del SDK en la [documentación del SDK de Kameleoon React Native][1].

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

Antes de inicializar esta integración de bandera de características, asegúrate de haber [configurado el seguimiento de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de LaunchDarkly y crea un inspector que informe sobre las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código que se muestra a continuación.

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

LaunchDarkly no soporta esta integración. Crea un ticket con LaunchDarkly para solicitar esta característica.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly no soporta esta integración. Crea un ticket con LaunchDarkly para solicitar esta característica.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly no soporta esta integración. Crea un ticket con LaunchDarkly para solicitar esta característica.


{{% /tab %}}
{{% tab "React Native" %}}

LaunchDarkly actualmente no soporta esta integración. Crea un ticket con LaunchDarkly para solicitar esta característica.


{{% /tab %}}
{{< /tabs >}}


### Integración de Split

Antes de inicializar esta integración de bandera de características, asegúrate de haber [configurado el seguimiento de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicializa el SDK de Split y crea un listener de impresiones que informe sobre las evaluaciones de las banderas de características a Datadog utilizando el siguiente fragmento de código:

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

Inicializa el SDK de Split y crea un inspector que informe sobre las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código a continuación.

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

Inicializa el SDK de Split y crea un inspector que informe sobre las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código a continuación.

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

Inicializa el SDK de Split y crea un inspector que informe sobre las evaluaciones de las banderas de características a Datadog utilizando el fragmento de código a continuación.

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

Inicializa el SDK de Split y crea un listener de impresiones que informe sobre las evaluaciones de las banderas de características a Datadog utilizando el siguiente fragmento de código:

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

Antes de inicializar esta integración de bandera de características, asegúrate de haber [configurado el monitoreo de RUM](#set-up-rum-monitoring).

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

Statsig no admite esta integración. Contacta a support@statsig.com para solicitar esta característica.

{{% /tab %}}
{{% tab "Android" %}}

Statsig no admite esta integración. Contacta a support@statsig.com para solicitar esta característica.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig no admite esta integración. Contacta a support@statsig.com para solicitar esta característica.

{{% /tab %}}
{{% tab "React Native" %}}

Statsig actualmente no admite esta integración. Contacta a support@statsig.com para solicitar esta característica.

{{% /tab %}}
{{< /tabs >}}

### Próximos pasos

[Visualización y análisis][1] de tus banderas de características.

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/feature_flag_tracking/using_feature_flags