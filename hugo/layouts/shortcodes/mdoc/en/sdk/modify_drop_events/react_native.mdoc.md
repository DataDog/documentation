## Modify or drop RUM events

To modify attributes of a RUM event before it is sent to Datadog, or to drop an event entirely, use the Event Mappers API when configuring the RUM React Native SDK:

```javascript
import {
    SdkVerbosity,
    DatadogProvider,
    DatadogProviderConfiguration,
    RumConfiguration,
    LogsConfiguration,
    TraceConfiguration
} from '@datadog/mobile-react-native';

const config = new DatadogProviderConfiguration(
    '<CLIENT_TOKEN>',
    '<ENVIRONMENT_NAME>',
    {
        rumConfiguration: {
            applicationId: '<APPLICATION_ID>',
            trackInteractions: true, // Track user interactions (such as a tap on buttons).
            trackResources: true, // Track XHR resources
            trackErrors: true, // Track errors
            // RUM Event Mappers
            errorEventMapper: (event) => event,
            resourceEventMapper: (event) => event,
            actionEventMapper: (event) => event
        },

        // Log Event Mappers
        logsConfiguration: {
            logEventMapper: (event) => event
        },

        traceConfiguration: {}
    }
)
```

Each mapper is a function with a signature of `(T) -> T?`, where `T` is a concrete RUM event type. This allows changing portions of the event before it is sent, or dropping the event entirely.

For example, to redact sensitive information from a RUM error `message`, implement a custom `redacted` function and use it in `errorEventMapper`:

```javascript
config.rumConfiguration.errorEventMapper = (event) => {
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
| LogEvent      | `logEvent.additionalInformation.userInfo`        | Contains the global user info set by `DdSdkReactNative.setUserInfo`.        |
|               | `logEvent.additionalInformation.attributes`      | Contains the global attributes set by `DdSdkReactNative.addAttributes`. |
| ActionEvent   | `actionEvent.actionContext`                      | [GestureResponderEvent][14] corresponding to the action or `undefined`. |
|               | `actionEvent.additionalInformation.userInfo`     | Contains the global user info set by `DdSdkReactNative.setUserInfo`.        |
|               | `actionEvent.additionalInformation.attributes`   | Contains the global attributes set by `DdSdkReactNative.addAttributes`. |
| ErrorEvent    | `errorEvent.additionalInformation.userInfo`      | Contains the global user info set by `DdSdkReactNative.setUserInfo`.        |
|               | `errorEvent.additionalInformation.attributes`    | Contains the global attributes set by `DdSdkReactNative.addAttributes`. |
| ResourceEvent | `resourceEvent.resourceContext`                  | [XMLHttpRequest][15] corresponding to the resource or `undefined`.      |
|               | `resourceEvent.additionalInformation.userInfo`   | Contains the global user info set by `DdSdkReactNative.setUserInfo`.        |
|               | `resourceEvent.additionalInformation.attributes` | Contains the global attributes set by `DdSdkReactNative.addAttributes`. |

[1]: https://app.datadoghq.com/rum/application/create
[14]: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/683ec4a2b420ff6bd3873a7338416ad3ec0b6595/types/react-native-side-menu/index.d.ts#L2
[15]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
