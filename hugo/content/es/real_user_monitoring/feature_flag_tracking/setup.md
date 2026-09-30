---
aliases:
- /es/real_user_monitoring/guide/getting-started-feature-flags/
- /es/real_user_monitoring/guide/setup-feature-flag-data-collection/
beta: true
description: Aprenda a configurar RUM para capturar datos de feature flag y analizar
  el rendimiento en Datadog
disable_toc: false
further_reading:
- link: /real_user_monitoring/explorer/
  tag: Documentación
  text: Obtenga información sobre el Explorador de RUM
- link: https://www.datadoghq.com/blog/feature-flag-tracking/
  tag: Blog
  text: Garantice la seguridad de las versiones con Feature Flag Tracking en Datadog
    RUM
title: Configurar Feature Flag Tracking
---
Los datos de feature flag proporcionan una mayor visibilidad de la experiencia del usuario y la supervisión del rendimiento. Le permite determinar a qué usuarios se les muestra una función específica y evaluar si los cambios introducidos están afectando la experiencia del usuario o perjudicando el rendimiento.

Al enriquecer sus datos de RUM con datos de feature flag, puede estar seguro de que su función se lanza correctamente sin causar involuntariamente un error o una regresión de rendimiento. Con esta capa adicional de información, puede correlacionar los lanzamientos de funciones con el rendimiento, identificar problemas en lanzamientos específicos y solucionar problemas más rápido.

## Configure la supervisión de RUM {#set-up-rum-monitoring}

El Feature Flag Tracking está disponible en el RUM Browser, iOS, Android, Flutter y React Native SDK.

{{< tabs >}}
{{% tab "Navegador" %}}

Para habilitar la recopilación de datos de feature flag para el Browser SDK:

1. Configure la [Supervisión de navegador de RUM][1]. Necesita la versión del SDK de RUM para navegador >= 4.25.0.

De forma predeterminada, los datos de feature flag se recopilan en eventos de visualización y error. Para recopilar datos de feature flag en tipos de eventos adicionales, establezca el parámetro de inicialización `trackFeatureFlagsForEvents` en una lista que incluya `vital`, `action`, `long_task` o `resource`.

[1]: /es/real_user_monitoring/application_monitoring/browser#setup
{{% /tab %}}
{{% tab "iOS" %}}

Para habilitar la recopilación de datos de feature flag para su aplicación iOS:

1. Configure la [Supervisión de RUM para iOS][1]. Necesita la versión del SDK de RUM para iOS >= 1.16.0.

[1]: https://docs.datadoghq.com/es/real_user_monitoring/ios/?tab=swift
{{% /tab %}}
{{% tab "Android" %}}

Para habilitar la recopilación de datos de feature flag para su aplicación Android:

1. Configure la [Supervisión de RUM para Android][1]. Necesita la versión del SDK de RUM para Android >= 1.18.0.

[1]: https://docs.datadoghq.com/es/real_user_monitoring/android/?tab=kotlin
{{% /tab %}}
{{% tab "Flutter" %}}

Para habilitar la recopilación de datos de feature flag para su aplicación Flutter:

1. Configure la [Supervisión de RUM para Flutter][1]. Necesita la versión del complemento de Flutter >= 1.3.2.

[1]: https://docs.datadoghq.com/es/real_user_monitoring/application_monitoring/flutter/setup
{{% /tab %}}
{{% tab "React Native" %}}

Para habilitar la recopilación de datos de feature flag para su aplicación React Native:

1. Configure la [Supervisión de RUM para React Native][1]. Necesita la versión del SDK de RUM para React Native >= 1.7.0.

[1]: https://docs.datadoghq.com/es/real_user_monitoring/reactnative/
{{% /tab %}}
{{< /tabs >}}

## Configure una integración de feature flag {#set-up-a-feature-flag-integration}

Puede comenzar a recopilar datos de feature flag con [soluciones personalizadas de gestión de feature flag](#custom-feature-flag-management), o utilizando uno de los socios de integración de Datadog que se enumeran a continuación.

<div class="alert alert-danger">

**Nota**: Los siguientes caracteres especiales no son compatibles con Feature Flag Tracking: `.`, `:`, `+`, `-`, `=`, `&&`, `||`, `>`, `<`, `!`, `(`, `)`, `{`, `}`, `[`, `]`, `^`, `"`, `“`, `”`, `~`, `*`, `?`, `\`. Datadog recomienda evitar estos caracteres siempre que sea posible en los nombres de sus feature flags. Si necesita utilizar uno de estos caracteres, reemplace el carácter antes de enviar los datos a Datadog. Por ejemplo:

  ```javascript
  datadogRum.addFeatureFlagEvaluation(key.replaceAll(':', '_'), value);
  ```

</div>

{{< card-grid card_width="200" >}}
  {{< image-card href="/feature_flags" src="integrations_logos/datadog_large.svg" alt="Datadog" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=browser#amplitude-integration" src="integrations_logos/amplitude_large.svg" alt="Amplitude" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=browser#configcat-integration" src="integrations_logos/configcat_large.svg" alt="Personalizado" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=browser#custom-feature-flag-management" src="integrations_logos/docs_custom_feature_flag_systems_card.png" alt="Personalizado" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#devcycle-integration" src="integrations_logos/devcycle_large.svg" alt="DevCycle" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=browser#eppo-integration" src="integrations_logos/eppo_large.svg" alt="Eppo" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#flagsmith-integration" src="integrations_logos/flagsmith_large.svg" alt="Flagsmith" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/#growthbook-integration" src="integrations_logos/growthbook_large.svg" alt="Growthbook" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#kameleoon-integration" src="integrations_logos/kameleoon.png" alt="Kameleoon" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#launchdarkly-integration" src="integrations_logos/launchdarkly_large.svg" alt="LaunchDarkly" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#split-integration" src="integrations_logos/split_large.svg" alt="Split" >}}
  {{< image-card href="/real_user_monitoring/feature_flag_tracking/setup/?tab=npm#statsig-integration" src="integrations_logos/statsig_large.svg" alt="Statsig" >}}
{{< /card-grid >}}

### Integración de Amplitude {#amplitude-integration}

Antes de inicializar esta integración de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Amplitude y cree un oyente de exposición que informe las evaluaciones de feature flag a Datadog utilizando el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulte la [documentación del SDK de JavaScript][1] de Amplitude.

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

Inicialice el SDK de Amplitude y cree un inspector que informe las evaluaciones de feature flag a Datadog utilizando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulte la [documentación del SDK de iOS][1] de Amplitude.

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

Inicialice el SDK de Amplitude y cree un inspector que informe las evaluaciones de feature flag a Datadog utilizando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Amplitude, consulte la [documentación del SDK de Android][1] de Amplitude.

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

Amplitude no admite esta integración. Cree un ticket con Amplitude para solicitar esta funcionalidad.


{{% /tab %}}
{{< /tabs >}}

### Integración con ConfigCat {#configcat-integration}

Antes de inicializar esta integración de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de Javascript de ConfigCat, suscríbase al evento `flagEvaluated` e informe las evaluaciones de feature flag a Datadog:

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

Para obtener más información sobre cómo inicializar el SDK de Javascript de ConfigCat, consulte la [documentación del SDK de JavaScript][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/js


{{% /tab %}}
{{% tab "iOS" %}}

Al inicializar el SDK de Swift para iOS de ConfigCat, suscríbase al evento `flagEvaluated` e informe las evaluaciones de indicadores de funciones a Datadog:

```swift
  let client = ConfigCatClient.get(sdkKey: "#YOUR-SDK-KEY#") { options in
    options.hooks.addOnFlagEvaluated { details in
        RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: details.key, variation: details.value)
    }
  }
```

Para obtener más información sobre cómo inicializar el SDK de Swift (iOS) de ConfigCat, consulte la [documentación del SDK de Swift para iOS][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/ios


{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de ConfigCat para Android, suscríbase al evento `flagEvaluated` e informe las evaluaciones de indicadores de funciones a Datadog:

```java
ConfigCatClient client = ConfigCatClient.get("#YOUR-SDK-KEY#", options -> {
  options.hooks().addOnFlagEvaluated(details -> {
      GlobalRumMonitor.get().addFeatureFlagEvaluation(details.key, details.value);
  });
});
```

Para obtener más información sobre cómo inicializar el SDK de ConfigCat para Android, consulte la [documentación del SDK de Android][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/android


{{% /tab %}}
{{% tab "Flutter" %}}

Al inicializar el SDK de ConfigCat para Dart, suscríbase al evento `flagEvaluated` e informe las evaluaciones de indicadores de funciones a Datadog:

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

Para obtener más información sobre cómo inicializar el SDK de ConfigCat para Dart (Flutter), consulte la [documentación del SDK de Dart][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/dart


{{% /tab %}}


{{% tab "React Native" %}}

Al inicializar el SDK de ConfigCat para React, suscríbase al evento `flagEvaluated` e informe las evaluaciones de indicadores de funciones a Datadog:

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

Para obtener más información sobre cómo inicializar el SDK de ConfigCat para React, consulte la [documentación del SDK de React][1] de ConfigCat.

[1]: https://configcat.com/docs/sdk-reference/react

{{% /tab %}}
{{< /tabs >}}

### Gestión personalizada de feature flag {#custom-feature-flag-management}

Antes de inicializar una integración personalizada de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Cada vez que se evalúe un feature flag, agregue la siguiente función para enviar la información del feature flag a RUM:

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

{{% /tab %}}
{{% tab "iOS" %}}

Cada vez que se evalúe un feature flag, agregue la siguiente función para enviar la información del feature flag a RUM:

   ```swift
   RUMMonitor.shared().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Android" %}}

Cada vez que se evalúe un feature flag, agregue la siguiente función para enviar la información del feature flag a RUM:

   ```kotlin
   GlobalRumMonitor.get().addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{% tab "Flutter" %}}

Cada vez que se evalúe un feature flag, agregue la siguiente función para enviar la información del feature flag a RUM:

   ```dart
   DatadogSdk.instance.rum?.addFeatureFlagEvaluation(key, value);
   ```
{{% /tab %}}
{{% tab "React Native" %}}

Cada vez que se evalúe un feature flag, agregue la siguiente función para enviar la información del feature flag a RUM:

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

{{% /tab %}}
{{< /tabs >}}

### Integración con DevCycle {#devcycle-integration}

Antes de inicializar esta integración de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de DevCycle y suscríbase al evento `variableEvaluated`, eligiendo suscribirse a todas las evaluaciones de variables `variableEvaluated:*` o a evaluaciones de variables particulares `variableEvaluated:my-variable-key`.

Para obtener más información sobre cómo inicializar el SDK de DevCycle, consulte la [documentación del SDK de JavaScript de DevCycle][5] y para obtener más información sobre el sistema de eventos de DevCycle, consulte la [documentación de eventos del SDK de DevCycle][6].

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

DevCycle no admite esta integración. Cree un ticket con [DevCycle][1] para solicitar esta funcionalidad.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "Android" %}}

DevCycle no admite esta integración. Cree un ticket con [DevCycle][1] para solicitar esta funcionalidad.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "Flutter" %}}

DevCycle no admite esta integración. Cree un ticket con [DevCycle][1] para solicitar esta funcionalidad.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{% tab "React Native" %}}

DevCycle no admite esta integración. Cree un ticket con [DevCycle][1] para solicitar esta funcionalidad.

[1]: https://devcycle.com/contact/request-support

{{% /tab %}}
{{< /tabs >}}

### Integración con Eppo {#eppo-integration}

Antes de inicializar esta integración de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Eppo y cree un registrador de asignaciones que, además, reporte las evaluaciones de feature flag a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulte la [documentación del SDK de JavaScript de Eppo][1].

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

Inicialice el SDK de Eppo y cree un registrador de asignaciones que, además, reporte las evaluaciones de feature flag a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulte la [documentación del SDK de iOS de Eppo][1].

```swift
func IAssignmentLogger(assignment: Assignment) {
  RUMMonitor.shared().addFeatureFlagEvaluation(featureFlag: assignment.featureFlag, variation: assignment.variation)
}

let eppoClient = EppoClient(apiKey: "mock-api-key", assignmentLogger: IAssignmentLogger)
```

[1]: https://docs.geteppo.com/sdks/client-sdks/ios

{{% /tab %}}
{{% tab "Android" %}}

Inicialice el SDK de Eppo y cree un registrador de asignaciones que, además, reporte las evaluaciones de feature flag a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulte la [documentación del SDK de Android de Eppo][1].

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

Eppo no admite esta integración. [Comuníquese con Eppo][1] para solicitar esta función.

[1]: mailto:support@geteppo.com

{{% /tab %}}
{{% tab "React Native" %}}

Inicialice el SDK de Eppo y cree un registrador de asignaciones que, además, reporte las evaluaciones de feature flag a Datadog utilizando el fragmento de código que se muestra a continuación.

Para obtener más información sobre cómo inicializar el SDK de Eppo, consulte la [documentación del SDK de React Native de Eppo][1].

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

### Integración con Flagsmith {#flagsmith-integration}

Antes de inicializar esta integración de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Flagsmith con la opción `datadogRum`, la cual informa las evaluaciones de las flags de funciones a Datadog utilizando el fragmento de código que se muestra a continuación.

   Opcionalmente, puede configurar el cliente para que los atributos de Flagsmith se envíen a Datadog a través de `datadogRum.setUser()`. Para obtener más información sobre cómo inicializar el SDK de Flagsmith, consulte la [documentación del SDK de JavaScript de Flagsmith][1].

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

Flagsmith no admite esta integración. Cree un ticket con Flagsmith para solicitar esta función.


{{% /tab %}}
{{% tab "Android" %}}

Flagsmith no admite esta integración. Cree un ticket con Flagsmith para solicitar esta función.

{{% /tab %}}
{{% tab "Flutter" %}}

Flagsmith no admite esta integración. Cree un ticket con Flagsmith para solicitar esta función.

{{% /tab %}}
{{% tab "React Native" %}}

Actualmente, Flagsmith no admite esta integración. Cree un ticket con Flagsmith para solicitar esta función.

{{% /tab %}}
{{< /tabs >}}

### Integración con GrowthBook {#growthbook-integration}

{{< tabs >}}
{{% tab "Navegador" %}}

Al inicializar el SDK de GrowthBook, informe las evaluaciones de las flags de funciones a Datadog mediante el callback `onFeatureUsage`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulte la [documentación del SDK de JavaScript de GrowthBook][1].

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

GrowthBook no admite esta integración. Comuníquese con GrowthBook para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Al inicializar el SDK de GrowthBook, informe las evaluaciones de las flags de funciones a Datadog llamando a `setFeatureUsageCallback`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulte la [documentación del SDK de Android de GrowthBook][1].

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

Al inicializar el SDK de GrowthBook, informe las evaluaciones de las flags de funciones a Datadog llamando a `setFeatureUsageCallback`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulte la [documentación del SDK de Flutter de GrowthBook][1].

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

Al inicializar el SDK de GrowthBook, informe las evaluaciones de las flags de funciones a Datadog mediante el callback `onFeatureUsage`.

Para obtener más información sobre cómo inicializar el SDK de GrowthBook, consulte la [documentación del SDK de React Native de GrowthBook][1].

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

### Integración con Kameleoon {#kameleoon-integration}

Antes de inicializar esta integración de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Después de crear e inicializar el SDK de Kameleoon, suscríbase al evento `Evaluation` usando el controlador `onEvent`.

Para obtener más información sobre el SDK, consulte la [documentación del SDK de JavaScript de Kameleoon][1].

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk
{{% /tab %}}
{{% tab "iOS" %}}

Kameleoon no admite esta integración. Comuníquese con product@kameleoon.com para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Kameleoon no admite esta integración. Comuníquese con product@kameleoon.com para solicitar esta función.

{{% /tab %}}
{{% tab "Flutter" %}}

Kameleoon no admite esta integración. Comuníquese con product@kameleoon.com para solicitar esta función.

{{% /tab %}}
{{% tab "React Native" %}}

Después de crear e inicializar el SDK de Kameleoon, suscríbase al evento `Evaluation` usando el controlador `onEvent`.

Obtenga más información sobre la inicialización del SDK en la [documentación del SDK de React Native de Kameleoon][1].

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

[1]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/react-js-sdk
{{% /tab %}}
{{< /tabs >}}

### Integración con LaunchDarkly {#launchdarkly-integration}

Antes de inicializar esta integración de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de LaunchDarkly y cree un inspector que informe las evaluaciones de feature flags a Datadog usando el fragmento de código que se muestra a continuación.

 Para obtener más información sobre cómo inicializar el SDK de LaunchDarkly, consulte la [documentación del SDK de JavaScript de LaunchDarkly][1].

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

LaunchDarkly no admite esta integración. Cree un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "Android" %}}

LaunchDarkly no admite esta integración. Cree un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "Flutter" %}}

LaunchDarkly no admite esta integración. Cree un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{% tab "React Native" %}}

Actualmente, LaunchDarkly no admite esta integración. Cree un ticket con LaunchDarkly para solicitar esta función.


{{% /tab %}}
{{< /tabs >}}


### Integración con Split {#split-integration}

Antes de inicializar esta integración de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Split y cree un oyente de impresiones que informe las evaluaciones de feature flags a Datadog usando el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Split, consulte la [documentación del SDK de JavaScript de Split][1].

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

Inicialice el SDK de Split y cree un inspector que informe las evaluaciones de feature flags a Datadog usando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Split, consulte la [documentación del SDK de iOS de Split][1].

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

Inicialice el SDK de Split y cree un inspector que informe las evaluaciones de feature flags a Datadog usando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Split, consulte la [documentación del SDK de Android de Split][1].

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

Inicialice el SDK de Split y cree un inspector que informe las evaluaciones de feature flags a Datadog usando el fragmento de código a continuación.

Para obtener más información sobre cómo inicializar el SDK de Split, consulte la [documentación del plugin de Flutter de Split][1].

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

Inicialice el SDK de Split y cree un oyente de impresiones que informe las evaluaciones de feature flags a Datadog usando el siguiente fragmento de código:

Para obtener más información sobre cómo inicializar el SDK de Split, consulte la [documentación del SDK de React Native de Split][1].

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

### Integración con Statsig {#statsig-integration}

Antes de inicializar esta integración de feature flag, asegúrese de haber [configurado la supervisión de RUM](#set-up-rum-monitoring).

{{< tabs >}}
{{% tab "Navegador" %}}

Inicialice el SDK de Statsig con `statsig.initialize`.

1. Actualice su versión del SDK de RUM para navegador a la 4.25.0 o superior.
2. Inicialice el SDK de Statsig (`>= v4.34.0`) e implemente la opción `gateEvaluationCallback` como se muestra a continuación:

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

Statsig no admite esta integración. Comuníquese con support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "Android" %}}

Statsig no admite esta integración. Comuníquese con support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "Flutter" %}}

Statsig no admite esta integración. Comuníquese con support@statsig.com para solicitar esta función.

{{% /tab %}}
{{% tab "React Native" %}}

Actualmente, Statsig no admite esta integración. Comuníquese con support@statsig.com para solicitar esta función.

{{% /tab %}}
{{< /tabs >}}

### Próximos pasos {#next-steps}

[Visualizar y analizar][1] sus feature flags.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/feature_flag_tracking/using_feature_flags