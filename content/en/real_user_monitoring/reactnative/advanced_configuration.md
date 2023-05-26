---
title: RUM React Native Advanced Configuration
kind: documentation
description: Learn about advanced configuration options for your React Native setup.
further_reading:
- link: https://github.com/DataDog/dd-sdk-reactnative
  tag: GitHub
  text: Source code for dd-sdk-reactnative
- link: real_user_monitoring/reactnative/
  tag: Documentation
  text: Learn about React Native monitoring


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
DdRum.startResource(
    '<res-key>',
    'GET',
    'http://www.example.com/api/v1/test',
    {},
    Date.now()
);
//…
DdRum.stopResource('<res-key>', 200, 'xhr', (size = 1337), {}, Date.now());

// Send spans manually
const spanId = await DdTrace.startSpan('foo', { custom: 42 }, Date.now());
//...
DdTrace.finishSpan(spanId, { custom: 21 }, Date.now());
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
config.logEventMapper = event => event;
config.errorEventMapper = event => event;
config.resourceEventMapper = event => event;
config.actionEventMapper = event => event;
```

Each mapper is a function with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent, or dropping the event entirely.

For example, to redact sensitive information from a RUM error `message`, implement a custom `redacted` function and use it in `errorEventMapper`:

```javascript
config.errorEventMapper = event => {
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
import {
    DatadogProvider,
    DatadogProviderConfiguration,
    InitializationMode
} from '@datadog/mobile-react-native';

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
import {
    DatadogProvider,
    DatadogProviderConfiguration
} from '@datadog/mobile-react-native';

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
import {
    ProxyConfig,
    SdkVerbosity,
    TrackingConsent
} from '@datadog/mobile-react-native';

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
    proxyConfig: new ProxyConfig() // Optional: send requestst through a proxy. Default = undefined
};
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/reactnative
[3]: https://reactnative.dev/docs/interactionmanager#runafterinteractions
[4]: https://jestjs.io/
[5]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-native/v0.70/index.d.ts#L548
[6]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[7]: https://github.com/DataDog/dd-sdk-reactnative-examples/tree/main/rum-react-navigation-async
