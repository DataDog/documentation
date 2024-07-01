---
title: iOS Log Collection
kind: documentation
description: Collect logs from your iOS applications.
further_reading:
- link: "https://github.com/DataDog/dd-sdk-ios"
  tag: Source Code
  text: dd-sdk-ios Source code
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs

---
## Overview

Send logs to Datadog from your iOS applications with [Datadog's `dd-sdk-ios` client-side logging library][1] and leverage the following features:

* Log to Datadog in JSON format natively.
* Use default and add custom attributes to each log sent.
* Record real client IP addresses and User-Agents.
* Leverage optimized network usage with automatic bulk posts.

The `dd-sdk-ios` library supports all versions of iOS 11 or later.

## Setup

1. Declare the library as a dependency depending on your package manager:

{{< tabs >}}
{{% tab "CocoaPods" %}}

You can use [CocoaPods][6] to install `dd-sdk-ios`:
```
pod 'DatadogCore'
pod 'DatadogLogs'
```

[6]: https://cocoapods.org/

{{% /tab %}}
{{% tab "Swift Package Manager (SPM)" %}}

To integrate using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift`:
```swift
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "2.0.0"))
```

In your project, link the following libraries:
```
DatadogCore
DatadogLogs
```

{{% /tab %}}
{{% tab "Carthage" %}}

You can use [Carthage][7] to install `dd-sdk-ios`:
```
github "DataDog/dd-sdk-ios"
```

In Xcode, link the following frameworks:
```
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogLogs.xcframework
```

[7]: https://github.com/Carthage/Carthage

{{% /tab %}}
{{< /tabs >}}

2. Initialize the library with your application context and your [Datadog client token][2]. For security reasons, you must use a client token: you cannot use [Datadog API keys][3] to configure the `dd-sdk-ios` library as they would be exposed client-side in the iOS application IPA byte code. 

For more information about setting up a client token, see the [client token documentation][2].

{{< site-region region="us" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="eu" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .eu1,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite eu1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us3" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us3,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us3];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="us5" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us5,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us5];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .us1_fed,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite us1_fed];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

{{< site-region region="ap1" >}}
{{< tabs >}}
{{% tab "Swift" %}}

```swift
import DatadogCore
import DatadogLogs

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        site: .ap1,
        service: "<service name>"
    ), 
    trackingConsent: trackingConsent
)

Logs.enable()
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
@import DatadogObjc;

DDConfiguration *configuration = [[DDConfiguration alloc] initWithClientToken:@"<client token>" env:@"<environment>"];
configuration.service = @"<service name>";
configuration.site = [DDSite ap1];

[DDDatadog initializeWithConfiguration:configuration
                       trackingConsent:trackingConsent];

[DDLogs enable];
```
{{% /tab %}}
{{< /tabs >}}
{{< /site-region >}}

To be compliant with the GDPR regulation, the SDK requires the `trackingConsent` value at initialization.
The `trackingConsent` can be one of the following values:

- `.pending`: The SDK starts collecting and batching the data but does not send it to Datadog. The SDK waits for the new tracking consent value to decide what to do with the batched data.
- `.granted`: The SDK starts collecting the data and sends it to Datadog.
- `.notGranted`: The SDK does not collect any data: logs, traces, and RUM events are not sent to Datadog.

To change the tracking consent value after the SDK is initialized, use the `Datadog.set(trackingConsent:)` API call.

The SDK changes its behavior according to the new value. For example, if the current tracking consent is `.pending`:

- If changed to `.granted`, the SDK send all current and future data to Datadog;
- If changed to `.notGranted`, the SDK wipe all current data and stop collecting any future data.

Before data is uploaded to Datadog, it is stored in cleartext in the cache directory (`Library/Caches`) of your [application sandbox][6]. The cache directory cannot be read by any other app installed on the device.

When writing your application, enable development logs to log to console all internal messages in the SDK with a priority equal to or higher than the provided level. 

{{< tabs >}}
{{% tab "Swift" %}}
```swift
Datadog.verbosityLevel = .debug
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDDatadog.verbosityLevel = DDSDKVerbosityLevelDebug;
```
{{% /tab %}}
{{< /tabs >}}

3. Configure the `Logger`:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
let logger = Logger.create(
    with: Logger.Configuration(
        name: "<logger name>",
        networkInfoEnabled: true,
        remoteLogThreshold: .info,
        consoleLogFormat: .shortWith(prefix: "[iOS App] ")
    )
)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
DDLoggerConfiguration *configuration = [[DDLoggerConfiguration alloc] init];
configuration.networkInfoEnabled = YES;
configuration.remoteLogThreshold = [DDLogLevel info];
configuration.printLogsToConsole = YES;

DDLogger *logger = [DDLogger createWithConfiguration:configuration];
```
{{% /tab %}}
{{< /tabs >}}

4. Send a custom log entry directly to Datadog with one of the following methods:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
logger.debug("A debug message.")
logger.info("Some relevant information?")
logger.notice("Have you noticed?")
logger.warn("An important warning...")
logger.error("An error was met!")
logger.critical("Something critical happened!")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger debug:@"A debug message."];
[logger info:@"Some relevant information?"];
[logger notice:@"Have you noticed?"];
[logger warn:@"An important warning..."];
[logger error:@"An error was met!"];
[logger critical:@"Something critical happened!"];
```
{{% /tab %}}
{{< /tabs >}}

**Note:** To add a custom iOS log to a newly created RUM view, apply it with the `viewDidAppear` method. If the log is applied before `viewDidAppear` occurs, such as at `viewDidLoad`, the log is applied to the preceding RUM view, which is still technically the active view.

5. (Optional) Provide a map of `attributes` alongside your log message to add attributes to the emitted log. Each entry of the map is added as an attribute.

{{< tabs >}}
{{% tab "Swift" %}}
```swift
logger.info("Clicked OK", attributes: ["context": "onboarding flow"])
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger info:@"Clicked OK" attributes:@{@"context": @"onboarding flow"}];
```
{{% /tab %}}
{{< /tabs >}}

## Advanced logging

### Initialization

The following methods in `Logger.Configuration` can be used when initializing the logger to send logs to Datadog:

| Method | Description |
|---|---|
| `Logger.Configuration.networkInfoEnabled` | Add `network.client.*` attributes to all logs. The data logged by default is: `reachability` (`yes`, `no`, `maybe`), `available_interfaces` (`wifi`, `cellular`, and more), `sim_carrier.name` (for example: `AT&T - US`), `sim_carrier.technology` (`3G`, `LTE`, and more) and `sim_carrier.iso_country` (for example: `US`). |
| `Logger.Configuration.service` | Set the value for the `service` [standard attribute][4] attached to all logs sent to Datadog. |
| `Logger.Configuration.consoleLogFormat` | Send logs to the debugger console. |
| `Logger.Configuration.remoteSampleRate` | Set the sample rate of logs sent to Datadog. |
| `Logger.Configuration.name` | Set the value for the `logger.name` attribute attached to all logs sent to Datadog. |

### Global configuration

Follow the methods below to add or remove tags and attributes to all logs sent by a given logger.

#### Global Tags

##### Add Tags

Use the `addTag(withKey:value:)` method to add tags to all logs sent by a specific logger:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// This adds a tag "build_configuration:debug"
logger.addTag(withKey: "build_configuration", value: "debug")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addTagWithKey:@"build_configuration" value:@"debug"];
```
{{% /tab %}}
{{< /tabs >}}

The `<TAG_VALUE>` must be a `String`.

##### Remove Tags

Use the `removeTag(withKey:)` method to remove tags from all logs sent by a specific logger:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// This removes any tag starting with "build_configuration"
logger.removeTag(withKey: "build_configuration")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeTagWithKey:@"build_configuration"];
```
{{% /tab %}}
{{< /tabs >}}

For more information, see [Getting Started with Tags][5].

#### Global Attributes

##### Add attributes

By default, the following attributes are added to all logs sent by a logger:

* `http.useragent` and its extracted `device` and `OS` properties
* `network.client.ip` and its extracted geographical properties (`country`, `city`)
* `logger.version`, Datadog SDK version
* `logger.thread_name`, (`main`, `background`)
* `version`, client's app version extracted from `Info.plist`
* `environment`, the environment name used to initialize the SDK

Use the `addAttribute(forKey:value:)` method to add a custom attribute to all logs sent by a specific logger:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// This adds an attribute "device-model" with a string value
logger.addAttribute(forKey: "device-model", value: UIDevice.current.model)
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger addAttributeForKey:@"device-model" value:UIDevice.currentDevice.model];
```
{{% /tab %}}
{{< /tabs >}}

The `<ATTRIBUTE_VALUE>` can be anything conforming to `Encodable` such as `String`, `Date`, custom `Codable` data model, and more.

##### Remove attributes

Use the `removeAttribute(forKey:)` method to remove a custom attribute from all logs sent by a specific logger:

{{< tabs >}}
{{% tab "Swift" %}}
```swift
// This removes the attribute "device-model" from all further log send.
logger.removeAttribute(forKey: "device-model")
```
{{% /tab %}}
{{% tab "Objective-C" %}}
```objective-c
[logger removeAttributeForKey:@"device-model"];
```
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-ios
[2]: /account_management/api-app-keys/#client-tokens
[3]: /account_management/api-app-keys/#api-keys
[4]: /logs/processing/attributes_naming_convention/
[5]: /getting_started/tagging/
[6]: https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web
