---
title: RUM React Native Advanced Configuration
description: Learn about advanced configuration options for your React Native setup.
code_lang: reactnative
type: multi-code-lang
code_lang_weight: 40
aliases:
    - /real_user_monitoring/react-native/advanced_configuration/
    - /real_user_monitoring/reactnative/advanced_configuration/
further_reading:
    - link: https://github.com/DataDog/dd-sdk-reactnative
      tag: "Source Code"
      text: Source code for dd-sdk-reactnative
    - link: real_user_monitoring/reactnative/
      tag: Documentation
      text: Learn about React Native monitoring
    - link: real_user_monitoring/guide/monitor-hybrid-react-native-applications
      tag: Documentation
      text: Monitor hybrid React Native applications
---

## Overview

If you have not set up the SDK yet, follow the [in-app setup instructions][1] or see the [React Native RUM setup documentation][2].

## Testing with Jest

Testing apps using `'@datadog/mobile-react-native'` might require completing extra steps, since Native Modules do not exist in testing environments.

Datadog provides mocks for the `'@datadog/mobile-react-native'` package. To use them with [Jest][4], add the following in your Jest setup file:

```javascript
jest.mock('@datadog/mobile-react-native', () => {
    return require('@datadog/mobile-react-native/jest/mock');
});
```

Interaction, error, and resource automated tracking is disabled in your tests if you initialize the SDK with the `DatadogProvider` component.

All SDK methods are mocked by `jest.fn()`, so you can assert that a Datadog SDK method was called:

```javascript
import { DdLogs } from '@datadog/mobile-react-native';

describe('App', () => {
    it('calls DdLogs.debug on mount', () => {
        renderer.create(<App />);
        expect(DdLogs.debug).toHaveBeenCalledWith('app started');
    });
});
```

If you use a test runner other than Jest, you need to create the mocks for your test runner.

## Initialization parameters

You can specify the following parameters in your configuration when initializing the SDK:

`clientToken`
: Required<br/>
**Type**: String<br/>
A [Datadog client token][8].

`env`
: Required<br/>
**Type**: String<br/>
The application's environment, for example: prod, pre-prod, and staging. Follows the [tag syntax requirements][15].

`applicationId`
: Required<br/>
**Type**: String<br/>
The RUM application ID.

`trackInteractions`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables automatic collection of user actions.

`trackResources`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables collection of resource events.

`trackErrors`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables collection of React Native crashes.

`site`
: Optional<br/>
**Type**: String<br/>
**Default**: `US1`<br/>
[The Datadog site parameter of your organization][9].

`serviceName`
: Optional<br/>
**Type**: String<br/>
The service name for your application. Follows the [tag syntax requirements][15].

`version`
: Optional<br/>
**Type**: String<br/>
The application's version. For example: 1.2.3, 6c44da20, and 2020.02.13. Follows the [tag syntax requirements][15].

`versionSuffix`
: Optional<br/>
**Type**: String<br/>
Add a suffix to the reported version of the app. Accepted characters are alphanumerics and `_`, `-`, `:`, `.`, `/`. Other special characters are converted to underscores. A dash (`-`) is automatically added between the version and the suffix. Follows the [tag syntax requirements][15].

`trackFrustrations`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `true` <br/>
Enables [automatic collection of user frustrations][11]. Only error taps are supported. Implies `trackInteractions: true`.

`nativeCrashReportEnabled`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables crash reporting for native plaforms (iOS, Android).

`sampleRate`
: Optional - **Deprecated**<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
See `sessionSampleRate`.

`sessionSampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
The percentage of sessions to track: `100` for all, `0` for none. Only tracked sessions send RUM events.

`resourceTracingSamplingRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `20`<br/>
The percentage of requests to trace: `100` for all, `0` for none. For more information, see [Connect RUM and Traces][12].

`verbosity`
: Optional<br/>
**Type**: SdkVerbosity<br/>
**Default**: `undefined`<br/>
Verbosity for internal SDK logging. Set to `SdkVerbosity.DEBUG` to debug your SDK implementation.

`nativeViewTracking`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Enables native views tracking. Set to `true` if you use a custom navigation system relying on native views.

`nativeInteractionTracking`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Enables native interaction tracking. Set to `true` if you want to track interactions on native screens.

`firstPartyHosts`
: Optional<br/>
**Type**: List<br/>
**Default**: `[]`<br/>
List of your backends hosts to enable tracing with. For more information, see [Connect RUM and Traces][12].

`telemetrySampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `20`<br/>
Telemetry data (such as errors and debug logs) about SDK execution is sent to Datadog in order to detect and solve potential issues. Set this option to `0` to opt out from telemetry collection.

`longTaskThresholdMs`
: Optional<br/>
**Type**: Number | false<br/>
**Default**: `0`<br/>
The threshold for javascript long tasks reporting in milliseconds. Setting it to `0` or `false` disables javascript long task reporting. Values below `100` are raised to `100`. Values above `5000` are lowered to `5000`.

`nativeLongTaskThresholdMs`
: Optional<br/>
**Type**: Number | false<br/>
**Default**: `200`<br/>
The threshold for native long tasks reporting in milliseconds. Setting it to `0` or `false` disables javascript long task reporting. Values below `100` are raised to `100`. Values above `5000` are lowered to `5000`.

`vitalsUpdateFrequency`
: Optional<br/>
**Type**: VitalsUpdateFrequency<br/>
**Default**: `VitalsUpdateFrequency.AVERAGE`<br/>
Sets the preferred frequency for collecting mobile vitals.

`uploadFrequency`
: Optional<br/>
**Type**: UploadFrequency<br/>
**Default**: `UploadFrequency.AVERAGE`<br/>
Sets the preferred frequency for uploading batches of data.

`batchSize`
: Optional<br/>
**Type**: BatchSize<br/>
**Default**: `BatchSize.MEDIUM`<br/>
Defines the Datadog SDK policy when batching data together before uploading it to Datadog servers. Smaller batches mean smaller but more network requests, whereas larger batches mean fewer but larger network requests.

`trackBackgroundEvents`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false`<br/>
Enables tracking of RUM event when no RUM View is active. By default, background events are not tracked. Enabling this feature might increase the number of sessions tracked and impact your billing.

`proxyConfig`
: Optional<br/>
**Type**: ProxyConfiguration<br/>
Optional [proxy configuration][13].

## Manual instrumentation

If automatic instrumentation doesn't suit your needs, you can manually create RUM Events and Logs:

```javascript
import {
    DdSdkReactNative,
    DdSdkReactNativeConfiguration,
    DdLogs,
    ErrorSource,
    RumActionType,
    DdRum
} from '@datadog/mobile-react-native';

// Initialize the SDK
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons)
    true, // track XHR resources
    true // track errors
);
DdSdkReactNative.initialize(config);

// Send logs (use the debug, info, warn, or error methods)
DdLogs.debug('Lorem ipsum dolor sit amet…', {});
DdLogs.info('Lorem ipsum dolor sit amet…', {});
DdLogs.warn('Lorem ipsum dolor sit amet…', {});
DdLogs.error('Lorem ipsum dolor sit amet…', {});

// Track RUM Views manually
DdRum.startView('<view-key>', 'View Name', {}, Date.now());
//…
DdRum.stopView('<view-key>', { custom: 42 }, Date.now());

// Track RUM Actions manually
DdRum.addAction(RumActionType.TAP, 'action name', {}, Date.now());
// Or in case of continuous action
DdRum.startAction(RumActionType.TAP, 'action name', {}, Date.now());
// To stop action above
DdRum.stopAction({}, Date.now());

// Add custom timings
DdRum.addTiming('<timing-name>');

// Track RUM Errors manually
DdRum.addError('<message>', ErrorSource.SOURCE, '<stacktrace>', {}, Date.now());

// Track RUM Resource manually
DdRum.startResource('<res-key>', 'GET', 'http://www.example.com/api/v1/test', {}, Date.now());
//…
DdRum.stopResource('<res-key>', 200, 'xhr', (size = 1337), {}, Date.now());

// Send spans manually
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
```

## Track custom global attributes

You can attach user information to all RUM events to get more detailed information from your RUM sessions.

### User information

For user-specific information, use the following code wherever you want in your app (after the SDK has been initialized). The `id`, `name`, and `email` attributes are built into Datadog, and you can add other attributes that makes sense for your app.

```js
DdSdkReactNative.setUser({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'premium'
});
```

If you want to clear the user information (for example, when the user signs out), you can do so by passing an empty object, as follows:

```js
DdSdkReactNative.setUser({});
```

### Global attributes

You can also keep global attributes to track information about a specific session, such as A/B testing configuration, ad campaign origin, or cart status.

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

## Modify or drop RUM events

To modify attributes of a RUM event before it is sent to Datadog, or to drop an event entirely, use the Event Mappers API when configuring the RUM React Native SDK:

```javascript
const config = new DdSdkReactNativeConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true, // track user interactions (such as a tap on buttons)
    true, // track XHR resources
    true // track errors
);
config.logEventMapper = (event) => event;
config.errorEventMapper = (event) => event;
config.resourceEventMapper = (event) => event;
config.actionEventMapper = (event) => event;
```

Each mapper is a function with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent, or dropping the event entirely.

For example, to redact sensitive information from a RUM error `message`, implement a custom `redacted` function and use it in `errorEventMapper`:

```javascript
config.errorEventMapper = (event) => {
    event.message = redacted(event.message);
    return event;
};
```

Returning `null` from the error, resource, or action mapper drops the event entirely; the event is not sent to Datadog.

Depending on the event type, only some specific properties can be modified:

| Event Type    | Attribute key            | Description                        |
| ------------- | ------------------------ | ---------------------------------- |
| LogEvent      | `logEvent.message`       | Message of the log.                |
|               | `logEvent.context`       | Custom attributes of the log.      |
| ActionEvent   | `actionEvent.context`    | Custom attributes of the action.   |
| ErrorEvent    | `errorEvent.message`     | Error message.                     |
|               | `errorEvent.source`      | Source of the error.               |
|               | `errorEvent.stacktrace`  | Stacktrace of the error.           |
|               | `errorEvent.context`     | Custom attributes of the error.    |
|               | `errorEvent.timestampMs` | Timestamp of the error.            |
| ResourceEvent | `resourceEvent.context`  | Custom attributes of the resource. |

Events include additional context:

| Event Type    | Context attribute key                            | Description                                                             |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| LogEvent      | `logEvent.additionalInformation.userInfo`        | Contains the global user info set by `DdSdkReactNative.setUser`.        |
|               | `logEvent.additionalInformation.attributes`      | Contains the global attributes set by `DdSdkReactNative.setAttributes`. |
| ActionEvent   | `actionEvent.actionContext`                      | [GestureResponderEvent][5] corresponding to the action or `undefined`.  |
|               | `actionEvent.additionalInformation.userInfo`     | Contains the global user info set by `DdSdkReactNative.setUser`.        |
|               | `actionEvent.additionalInformation.attributes`   | Contains the global attributes set by `DdSdkReactNative.setAttributes`. |
| ErrorEvent    | `errorEvent.additionalInformation.userInfo`      | Contains the global user info set by `DdSdkReactNative.setUser`.        |
|               | `errorEvent.additionalInformation.attributes`    | Contains the global attributes set by `DdSdkReactNative.setAttributes`. |
| ResourceEvent | `resourceEvent.resourceContext`                  | [XMLHttpRequest][6] corresponding to the resource or `undefined`.       |
|               | `resourceEvent.additionalInformation.userInfo`   | Contains the global user info set by `DdSdkReactNative.setUser`.        |
|               | `resourceEvent.additionalInformation.attributes` | Contains the global attributes set by `DdSdkReactNative.setAttributes`. |

## Resource timings

Resource tracking provides the following timings:

-   `First Byte`: The time between the scheduled request and the first byte of the response. This includes time for the request preparation on the native level, network latency, and the time it took the server to prepare the response.
-   `Download`: The time it took to receive a response.

## Initializing asynchronously

If your app includes a lot of animations when it starts, running code during these animations might delay them on some devices. To delay the Datadog React Native SDK for RUM to run after all current animations are started, set the `initializationMode` to `InitializationMode.ASYNC` in your configuration:

```js
import { DatadogProvider, DatadogProviderConfiguration, InitializationMode } from '@datadog/mobile-react-native';

const datadogConfiguration = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    '<RUM_APPLICATION_ID>',
    true,
    true,
    true
);
datadogConfiguration.initializationMode = InitializationMode.ASYNC;

export default function App() {
    return (
        <DatadogProvider configuration={datadogConfiguration}>
            <Navigation />
        </DatadogProvider>
    );
}
```

This uses React Native's [InteractionManager.runAfterInteractions][3] to delay the animations.

All interactions with the RUM SDK (view tracking, actions, resources tracing, and so on) are still recorded and kept in a queue with a limit of 100 events.

Logs are not recorded and calling a `DdLogs` method before the actual initialization might break logging.

If you experience any issue setting up the asynchronous initialization of Datadog, you can check out our [example application][7].

## Delaying the initialization

There may be situations where you want to wait before initializing the SDK. For example, when you want to use a different configuration based on the user role or to fetch the configuration from one of your servers.

In that case, you can auto-instrument your app from the start (automatically collect user interactions, XHR resources, and errors) and record up to 100 RUM and span events before initializing the SDK.

```js
import { DatadogProvider, DatadogProviderConfiguration } from '@datadog/mobile-react-native';

const datadogAutoInstrumentation = {
    trackErrors: true,
    trackInteractions: true,
    trackResources: true,
    firstPartyHosts: [''],
    resourceTracingSamplingRate: 100
};

const initializeApp = async () => {
    const configuration = await fetchDatadogConfiguration(); // Fetches the configuration from one of your servers
    await DatadogProvider.initialize(configuration);
};

export default function App() {
    useEffect(() => initializeApp(), []);

    return (
        <DatadogProvider configuration={datadogAutoInstrumentation}>
            <Navigation />
        </DatadogProvider>
    );
}
```

Where your configuration has the following keys:

```js
import { ProxyConfig, SdkVerbosity, TrackingConsent } from '@datadog/mobile-react-native';

const configuration = {
    clientToken: '<CLIENT_TOKEN>',
    env: '<ENVIRONMENT_NAME>',
    applicationId: '<RUM_APPLICATION_ID>',
    sessionSamplingRate: 80, // Optional: sample RUM sessions (here, 80% of session will be sent to Datadog). Default = 100%
    site: 'US1', // Optional: specify Datadog site. Default = 'US1'
    verbosity: SdkVerbosity.WARN, // Optional: let the SDK print internal logs (above or equal to the provided level). Default = undefined (no logs)
    serviceName: 'com.myapp', // Optional: set the reported service name. Default = package name / bundleIdentifier of your Android / iOS app respectively
    nativeCrashReportEnabled: true, // Optional: enable native crash reports. Default = false
    version: '1.0.0', // Optional: see overriding the reported version in the documentation. Default = VersionName / Version of your Android / iOS app respectively
    versionSuffix: 'codepush.v3', // Optional: see overriding the reported version in the documentation. Default = undefined
    trackingConsent: TrackingConsent.GRANTED, // Optional: disable collection if user has not granted consent for tracking. Default = TrackingConsent.GRANTED
    nativeViewTracking: true, // Optional: enables tracking of native views. Default = false
    proxyConfig: new ProxyConfig() // Optional: send requests through a proxy. Default = undefined
};
```

## Monitoring hybrid React Native applications

See [Monitor hybrid React Native applications][16].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/reactnative
[3]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[4]: https://jestjs.io/
[5]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/v0.70/index.d.ts#L548
[6]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[7]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-async
[8]: /account_management/api-app-keys/#client-tokens
[9]: /getting_started/site/
[11]: /real_user_monitoring/browser/frustration_signals/
[12]: /real_user_monitoring/platform/connect_rum_and_traces?tab=reactnativerum
[13]: /real_user_monitoring/guide/proxy-mobile-rum-data/
[15]: /getting_started/tagging/#define-tags
[16]: /real_user_monitoring/guide/monitor-hybrid-react-native-applications