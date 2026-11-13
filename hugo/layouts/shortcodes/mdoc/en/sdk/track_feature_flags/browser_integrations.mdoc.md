### Amplitude integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Amplitude's SDK and create an exposure listener reporting feature flag evaluations to Datadog using the following snippet of code:

For more information about initializing Amplitude's SDK, see Amplitude's [JavaScript SDK documentation][1].

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

### ConfigCat integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

When initializing the ConfigCat Javascript SDK, subscribe to the `flagEvaluated` event and report feature flag evaluations to Datadog:

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

For more information about initializing the ConfigCat Javascript SDK, see ConfigCat's [JavaScript SDK documentation][2].

### Custom feature flag management

Before you initialize a custom feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

```javascript
datadogRum.addFeatureFlagEvaluation(key, value);
```

### DevCycle integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize DevCycle's SDK and subscribe to the `variableEvaluated` event, choosing to subscribe to all variable evaluations `variableEvaluated:*` or particular variable evaluations `variableEvaluated:my-variable-key`.

For more information about initializing DevCycle's SDK, see [DevCycle's JavaScript SDK documentation][3] and for more information about DevCycle's event system, see [DevCycle's SDK Event Documentation][4].

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

### Eppo integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Eppo's SDK and create an assignment logger that additionally reports feature flag evaluations to Datadog using the snippet of code shown below.

For more information about initializing Eppo's SDK, see [Eppo's JavaScript SDK documentation][5].

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

### Flagsmith integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Flagsmith's SDK with the `datadogRum` option, which reports feature flag evaluations to Datadog using the snippet of code shown below.

   Optionally, you can configure the client so that Flagsmith traits are sent to Datadog through `datadogRum.setUser()`. For more information about initializing Flagsmith's SDK, check out [Flagsmith's JavaScript SDK documentation][6].

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

### GrowthBook integration

When initializing the GrowthBook SDK, report feature flag evaluations to Datadog by using the `onFeatureUsage` callback.

For more information about initializing GrowthBook's SDK, see [GrowthBook's JavaScript SDK documentation][7].

```javascript
const gb = new GrowthBook({
  ...,
  onFeatureUsage: (featureKey, result) => {
    datadogRum.addFeatureFlagEvaluation(featureKey, result.value);
  },
});

gb.init();
```

### Kameleoon integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

After creating and initializing the Kameleoon SDK, subscribe to the `Evaluation` event using the `onEvent` handler.

For more information about the SDK, see [Kameleoon JavaScript SDK documentation][8].

```javascript
client.onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

### LaunchDarkly integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize LaunchDarkly's SDK and create an inspector reporting feature flags evaluations to Datadog using the snippet of code shown below.

 For more information about initializing LaunchDarkly's SDK, see [LaunchDarkly's JavaScript SDK documentation][9].

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

### Split integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Split's SDK and create an impression listener reporting feature flag evaluations to Datadog using the following snippet of code:

For more information about initializing Split's SDK, see Split's [JavaScript SDK documentation][10].

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

### Statsig integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Statsig's SDK with `statsig.initialize`.

1. Update your Browser RUM SDK version 4.25.0 or above.
2. Initialize Statsig's SDK (`>= v4.34.0`) and implement the `gateEvaluationCallback` option as shown below:

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

[1]: https://www.docs.developers.amplitude.com/experiment/sdks/javascript-sdk/
[2]: https://configcat.com/docs/sdk-reference/js
[3]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-install
[4]: https://docs.devcycle.com/sdk/client-side-sdks/javascript/javascript-usage#subscribing-to-sdk-events
[5]: https://docs.geteppo.com/sdks/client-sdks/javascript
[6]: https://docs.flagsmith.com/clients/javascript
[7]: https://docs.growthbook.io/lib/js#step-1-configure-your-app
[8]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/js-sdk
[9]: https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client
[10]: https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
