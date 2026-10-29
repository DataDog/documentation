### Amplitude integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

The Amplitude integration isn't available for the React Native SDK.

### ConfigCat integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

When initializing the ConfigCat React SDK, subscribe to the `flagEvaluated` event and report feature flag evaluations to Datadog:

```typescript
const configCatOptions = {
  setupHooks: (hooks) =>
    hooks.on('flagEvaluated', (details) => {
      DdRum.addFeatureFlagEvaluation(details.key, details.value);
    }),
};

<ConfigCatProvider
  sdkKey="YOUR_SDK_KEY"
  pollingMode={PollingMode.AutoPoll}
  options={configCatOptions}
>
  ...
</ConfigCatProvider>
```

For more information about initializing the ConfigCat React SDK, see ConfigCat's [React SDK documentation][1].

### Custom feature flag management

Before you initialize a custom feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Each time a feature flag is evaluated, add the following function to send the feature flag information to RUM:

   ```javascript
   DdRum.addFeatureFlagEvaluation(key, value);
   ```

### DevCycle integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

DevCycle does not support this integration. Create a ticket with [DevCycle][2] to request this feature.

### Eppo integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Eppo's SDK and create an assignment logger that additionally reports feature flag evaluations to Datadog using the snippet of code shown below.

For more information about initializing Eppo's SDK, see [Eppo's React native SDK documentation][3].

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

### Flagsmith integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Flagsmith does not support this integration. Create a ticket with Flagsmith to request this feature.

### GrowthBook integration

When initializing the GrowthBook SDK, report feature flag evaluations to Datadog by using the `onFeatureUsage` callback.

For more information about initializing GrowthBook's SDK, see [GrowthBook's React Native SDK documentation][4].

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

Learn more about SDK initialization in the [Kameleoon React Native SDK documentation][5].

```javascript
const { onEvent } = useInitialize();

onEvent(EventType.Evaluation, ({ featureKey, variation }) => {
  datadogRum.addFeatureFlagEvaluation(featureKey, variation.key);
});
```

### LaunchDarkly integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

LaunchDarkly does not support this integration. Create a ticket with LaunchDarkly to request this feature.

### Split integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Initialize Split's SDK and create an impression listener reporting feature flag evaluations to Datadog using the following snippet of code:

For more information about initializing Split's SDK, see Split's [React Native SDK documentation][6].

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

### Statsig integration

Before you initialize this feature flag integration, make sure you've [set up RUM monitoring](#set-up-rum-monitoring).

Statsig does not support this integration. Contact support@statsig.com to request this feature.

[1]: https://configcat.com/docs/sdk-reference/react
[2]: https://devcycle.com/contact/request-support
[3]: https://docs.geteppo.com/sdks/client-sdks/react-native
[4]: https://docs.growthbook.io/lib/react-native#step-1-configure-your-app
[5]: https://developers.kameleoon.com/feature-management-and-experimentation/web-sdks/react-js-sdk
[6]: https://help.split.io/hc/en-us/articles/4406066357901-React-Native-SDK#2-instantiate-the-sdk-and-create-a-new-split-client
