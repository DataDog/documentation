### Custom errors

To track specific errors, notify `RUMMonitor.shared()` when an error occurs using one of following methods:

- `.addError(message:)`
- `.addError(error:)`

{% tabs %}
{% tab label="Swift" %}

```swift
let rum = RUMMonitor.shared()
rum.addError(message: "error message.")
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
[[DDRUMMonitor shared] addErrorWithMessage:@"error message." stack:nil source:DDRUMErrorSourceCustom attributes:@{}];
```

{% /tab %}
{% /tabs %}

For more details and available options, see [`RUMMonitorProtocol` in GitHub][4] and the [Error Attributes documentation][5].

### Automatically track errors

All "error" and "critical" logs sent with `Logger` are automatically reported as RUM errors and linked to the current RUM view:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogLogs

let logger = Logger.create()

logger.error("message")
logger.critical("message")
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
@import DatadogLogs;

DDLogger *logger = [DDLogger create];
[logger error:@"message"];
[logger critical:@"message"];
```

{% /tab %}
{% /tabs %}

Similarly, all finished spans marked as error are reported as RUM errors:

{% tabs %}
{% tab label="Swift" %}

```swift
import DatadogTrace

let span = Tracer.shared().startSpan(operationName: "operation")
// ... capture the `error`
span.setError(error)
span.finish()
```

{% /tab %}
{% tab label="Objective-C" %}

```objective-c
// ... capture the `error`
id<OTSpan> span = [[DDTracer shared] startSpan:@"operation"];
[span setError:error];
[span finish];
```

{% /tab %}
{% /tabs %}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/application_monitoring/ios
[3]: /real_user_monitoring/application_monitoring/ios/data_collected/
[4]: https://github.com/DataDog/dd-sdk-ios/blob/master/DatadogRUM/Sources/RUMMonitorProtocol.swift
[5]: /real_user_monitoring/application_monitoring/ios/data_collected/?tab=error#error-attributes
[6]: /real_user_monitoring/application_monitoring/ios/data_collected/?tab=session#default-attributes
[7]: https://www.ntppool.org/en/
[8]: /real_user_monitoring/error_tracking/mobile/ios/#add-app-hang-reporting
[9]: /real_user_monitoring/application_monitoring/ios/setup
