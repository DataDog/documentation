---
title: React Native Advanced Configuration
description: Learn about advanced configuration options for your React Native setup.
aliases:
    - /real_user_monitoring/react-native/advanced_configuration/
    - /real_user_monitoring/reactnative/advanced_configuration/
    - /real_user_monitoring/mobile_and_tv_monitoring/setup/react_native/
    - /real_user_monitoring/mobile_and_tv_monitoring/react_native/advanced_configuration
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

Datadog provides mocks for the `'@datadog/mobile-react-native'` package. To use them with [Jest][3], add the following in your Jest setup file:

```javascript
jest.mock('@datadog/mobile-react-native', () => {
  return require('@datadog/mobile-react-native/jest')
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
A [Datadog client token][4].

`env`
: Required<br/>
**Type**: String<br/>
The application's environment, for example: prod, pre-prod, and staging. Follows the [tag syntax requirements][5].

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
[The Datadog site parameter of your organization][6].

`serviceName`
: Optional<br/>
**Type**: String<br/>
The service name for your application. Follows the [tag syntax requirements][5].

`version`
: Optional<br/>
**Type**: String<br/>
The application's version. For example: 1.2.3, 6c44da20, and 2020.02.13. Follows the [tag syntax requirements][5].

`versionSuffix`
: Optional<br/>
**Type**: String<br/>
Add a suffix to the reported version of the app. Accepted characters are alphanumerics and `_`, `-`, `:`, `.`, `/`. Other special characters are converted to underscores. A dash (`-`) is automatically added between the version and the suffix. Follows the [tag syntax requirements][5].

`trackFrustrations`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `true` <br/>
Enables [automatic collection of user frustrations][7]. Only error taps are supported. Implies `trackInteractions: true`.

`nativeCrashReportEnabled`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `false` <br/>
Enables crash reporting for native platforms (iOS, Android).

`sampleRate`
: Optional - **Deprecated**<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
See `sessionSampleRate`.

`sessionSamplingRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `100`<br/>
The percentage of sessions to track: `100` for all, `0` for none. Only tracked sessions send RUM events.

`resourceTracingSamplingRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `20`<br/>
The percentage of requests to trace: `100` for all, `0` for none. For more information, see [Connect RUM and Traces][8].

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
List of your backends hosts to enable tracing with. For more information, see [Connect RUM and Traces][8].

`telemetrySampleRate`
: Optional<br/>
**Type**: Number<br/>
**Default**: `20`<br/>
Telemetry data (such as errors and debug logs) about SDK execution is sent to Datadog in order to detect and solve potential issues. Set this option to `0` to opt out from telemetry collection.

`longTaskThresholdMs`
: Optional<br/>
**Type**: Number | false<br/>
**Default**: `0`<br/>
The threshold for JavaScript long tasks reporting in milliseconds. Setting it to `0` or `false` disables JavaScript long task reporting. Values below `100` are raised to `100`. Values above `5000` are lowered to `5000`.

`nativeLongTaskThresholdMs`
: Optional<br/>
**Type**: Number | false<br/>
**Default**: `200`<br/>
The threshold for native long tasks reporting in milliseconds. Setting it to `0` or `false` disables native long task reporting. Values below `100` are raised to `100`. Values above `5000` are lowered to `5000`.

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
Optional [proxy configuration][9].

`useAccessibilityLabel`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `true`<br/>
Determines whether the accessibility labels are used to name RUM actions (default is true).

`bundleLogsWithRum`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `true`<br/>
Enables RUM correlation with logs (default is true).

`bundleLogsWithTraces`
: Optional<br/>
**Type**: Boolean<br/>
**Default**: `true`<br/>
Enables trace correlation with logs (default is true).

## Manual instrumentation

If automatic instrumentation doesn't suit your needs, you can manually create RUM Events and Logs:

### Send logs
When you instrument your code to send logs, it can include debug, info, warn, or error details:

```javascript
DdLogs.debug('Lorem ipsum dolor sit amet…', {});
DdLogs.info('Lorem ipsum dolor sit amet…', {});
DdLogs.warn('Lorem ipsum dolor sit amet…', {});
DdLogs.error('Lorem ipsum dolor sit amet…', {});
```

### Manually track RUM Views
To manually track RUM Views, provide a `view key`, `view name`, and `action name` at initialization. Depending on your needs, you can choose one of the following strategies:

```javascript
DdRum.startView('<view-key>', 'View Name', {}, Date.now());
//…
DdRum.stopView('<view-key>', { custom: 42 }, Date.now());
```

### Manually track RUM Actions
You can manually track RUM actions:

```javascript
DdRum.addAction(RumActionType.TAP, 'action name', {}, Date.now());
```

To track a continuous action:

```javascript
DdRum.startAction(RumActionType.TAP, 'action name', {}, Date.now());
//...
DdRum.stopAction({}, Date.now());
```

### Manually track RUM Errors
You can manually track RUM errors:

```javascript
DdRum.addError('<message>', ErrorSource.SOURCE, '<stacktrace>', {}, Date.now());
```

### Manually track RUM Resources
You can manually track RUM resources:

```javascript
DdRum.startResource('<res-key>', 'GET', 'http://www.example.com/api/v1/test', {}, Date.now());
//...
DdRum.stopResource('<res-key>', 200, 'xhr', (size = 1337), {}, Date.now());
```

### Notify the SDK that your view finished loading

You can notify the SDK that your view has finished loading by calling the `addViewLoadingTime` method on `DdRum`. 
Call this method when your view is fully loaded and ready to be displayed to the user:

```javascript
DdRum.addViewLoadingTime(true);
```

Use the `overwrite` parameter to replace the previously calculated loading time for the current view.

After the loading time is sent, it is accessible as `@view.loading_time` and is visible in the RUM UI.

**Note**: This API is experimental.

### Add custom timings
You can add custom timings:

```javascript
DdRum.addTiming('<timing-name>');
```

### Manually send spans
You can send spans manually:

```javascript
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
```

## Track custom global attributes

You can attach user information to all RUM events to get more detailed information from your RUM sessions.

### Track User Sessions

Adding user information to your RUM sessions makes it easy to:
* Follow the journey of a given user
* Know which users are the most impacted by errors
* Monitor performance for your most important users

{{< img src="real_user_monitoring/browser/advanced_configuration/user-api.png" alt="User API in RUM UI" >}}

{{< tabs >}}
{{% tab "SDK version >= 2.6.5" %}}
<!-- source of truth: https://github.com/DataDog/dd-sdk-reactnative/pull/818 -->

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |
| `usr.extraInfo` | Object | (Optional) Include custom attributes such as subscription type, any user specific information that enhance user context in RUM sessions. |

To identify user sessions, use the `setUserInfo` API, for example:

```js
DdSdkReactNative.setUserInfo({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    extraInfo: {
        type: 'premium'
    }
});
```

If you want to add or update user information, you can use the following code to modify the existing user's details.

```js
DdSdkReactNative.addUserExtraInfo({
    hasPaid: 'true'
});
```

If you want to clear the user information (for example, when the user signs out), you can do so by passing an empty object, as follows:

```js
DdSdkReactNative.setUser({});
```

{{% /tab %}}
{{% tab "Legacy" %}}

| Attribute   | Type   | Description                                                                     |
| ----------- | ------ | ------------------------------------------------------------------------------- |
| `usr.id`    | String | (Required) Unique user identifier.                                              |
| `usr.name`  | String | (Optional) User friendly name, displayed by default in the RUM UI.              |
| `usr.email` | String | (Optional) User email, displayed in the RUM UI if the user name is not present. |

To identify user sessions, use the `setUser` API, for example:

```js
DdSdkReactNative.setUser({
    id: '1337',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'premium'
});
```

If you want to add or update user information, you can use the following code to modify the existing user's details.

```js
DdSdkReactNative.addUserExtraInfo({
    hasPaid: 'true'
});
```

If you want to clear the user information (for example, when the user signs out), you can do so by passing an empty object, as follows:

```js
DdSdkReactNative.setUser({});
```

{{% /tab %}}
{{< /tabs >}}

### Global attributes

You can also keep global attributes to track information about a specific session, such as A/B testing configuration, ad campaign origin, or cart status.

```js
DdSdkReactNative.setAttributes({
    profile_mode: 'wall',
    chat_enabled: true,
    campaign_origin: 'example_ad_network'
});
```

## Track view navigation

Because React Native offers a wide range of libraries to create screen navigation, only manual view tracking is supported by default. To see RUM or Error tracking sessions populate in Datadog, you need to implement view tracking.

You can manually start and stop a view using the following `startView()` and `stopView` methods.

```js
import {
    DdRum
} from '@datadog/mobile-react-native';

// Start a view with a unique view identifier, a custom view name, and an object to attach additional attributes to the view
DdRum.startView(
    '<view-key>', // <view-key> has to be unique, for example it can be ViewName-unique-id
    'View Name',
    { 'custom.foo': 'something' },
    Date.now()
);
// Stops a previously started view with the same unique view identifier, and an object to attach additional attributes to the view
DdRum.stopView('<view-key>', { 'custom.bar': 42 }, Date.now());
```

Use one of Datadog's integrations to automatically track views for the following libraries:

-   If you use the [`react-native-navigation`][10] library, then add the `@datadog/mobile-react-native-navigation` package and follow the [setup instructions][11].
-   If you use the [`react-navigation`][12] library, then add the `@datadog/mobile-react-navigation` package and follow the [setup instructions][11].

If you experience any issues setting up View tracking with `@datadog/mobile-react-navigation` you can see this Datadog [example application][13] as a reference.

## Clear all data

Use `clearAllData` to clear all data that has not been sent to Datadog.

```js
DdSdkReactNative.clearAllData();
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
| ActionEvent   | `actionEvent.actionContext`                      | [GestureResponderEvent][14] corresponding to the action or `undefined`. |
|               | `actionEvent.additionalInformation.userInfo`     | Contains the global user info set by `DdSdkReactNative.setUser`.        |
|               | `actionEvent.additionalInformation.attributes`   | Contains the global attributes set by `DdSdkReactNative.setAttributes`. |
| ErrorEvent    | `errorEvent.additionalInformation.userInfo`      | Contains the global user info set by `DdSdkReactNative.setUser`.        |
|               | `errorEvent.additionalInformation.attributes`    | Contains the global attributes set by `DdSdkReactNative.setAttributes`. |
| ResourceEvent | `resourceEvent.resourceContext`                  | [XMLHttpRequest][15] corresponding to the resource or `undefined`.      |
|               | `resourceEvent.additionalInformation.userInfo`   | Contains the global user info set by `DdSdkReactNative.setUser`.        |
|               | `resourceEvent.additionalInformation.attributes` | Contains the global attributes set by `DdSdkReactNative.setAttributes`. |

## Retrieve the RUM session ID

Retrieving the RUM session ID can be helpful for troubleshooting. For example, you can attach the session ID to support requests, emails, or bug reports so that your support team can later find the user session in Datadog.

You can access the RUM session ID at runtime without waiting for the `sessionStarted` event:

```kotlin
   fun getCurrentSessionId(promise: Promise) {
       datadog.getRumMonitor().getCurrentSessionId {
           promise.resolve(it)
        }
    }
```

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

This uses React Native's [InteractionManager.runAfterInteractions][16] to delay the animations.

All interactions with the RUM SDK (view tracking, actions, resources tracing, and so on) are still recorded and kept in a queue with a limit of 100 events.

Logs are not recorded and calling a `DdLogs` method before the actual initialization might break logging.

If you experience any issue setting up the asynchronous initialization of Datadog, you can check out our [example application][17].

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

See [Monitor hybrid React Native applications][18].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/react_native
[3]: https://jestjs.io/
[4]: /account_management/api-app-keys/#client-tokens
[5]: /getting_started/tagging/#define-tags
[6]: /getting_started/site/
[7]: /real_user_monitoring/application_monitoring/browser/frustration_signals/
[8]: /real_user_monitoring/correlate_with_other_telemetry/apm?tab=reactnativerum
[9]: /real_user_monitoring/guide/proxy-mobile-rum-data/
[10]: https://github.com/wix/react-native-navigation
[11]: /real_user_monitoring/application_monitoring/react_native/integrated_libraries/
[12]: https://github.com/application_monitoring/eact-navigation/react-navigation
[13]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation
[14]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/683ec4a2b420ff6bd3873a7338416ad3ec0b6595/types/react-native-side-menu/index.d.ts#L2
[15]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[16]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[17]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-async
[18]: /real_user_monitoring/guide/monitor-hybrid-react-native-applications
