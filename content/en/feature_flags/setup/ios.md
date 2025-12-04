---
title: iOS and tvOS Feature Flags
description: Set up Datadog Feature Flags for iOS and tvOS applications.
further_reading:
- link: "/feature_flags/setup/"
  tag: "Documentation"
  text: "Feature Flags Setup"
- link: "/real_user_monitoring/ios/"
  tag: "Documentation"
  text: "iOS and tvOS Monitoring"
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This page describes how to instrument your iOS or tvOS application with the Datadog Feature Flags SDK. Datadog feature flags provide a unified way to remotely control feature availability in your app, experiment safely, and deliver new experiences with confidence.

This guide explains how to install and enable the SDK, create and use a `FlagsClient`, and configure advanced options.

## Installation

Declare `DatadogFlags` as a dependency in your project. The recommended installation method is Swift Package Manager (SPM).

{{< tabs >}}
{{% tab "Swift Package Manager (SPM)" %}}
To install the Datadog Feature Flags SDK using Apple's Swift Package Manager, add the following as a dependency to your `Package.swift` file:

{{< code-block lang="swift" filename="Package.swift" >}}
.package(url: "https://github.com/Datadog/dd-sdk-ios.git", .upToNextMajor(from: "3.0.0"))
{{< /code-block >}}

In your project, link the following libraries:

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}
{{% /tab %}}

{{% tab "CocoaPods" %}}
To install the Datadog Feature Flags SDK using [CocoaPods][1], declare following pods in your `Podfile`:

{{< code-block lang="swift" >}}
DatadogCore
DatadogFlags
{{< /code-block >}}

[1]: https://cocoapods.org/
{{% /tab %}}

{{% tab "Carthage" %}}
To install the Datadog Feature Flags SDK using [Carthage][1], add `dd-sdk-ios` to your `Cartfile`:

{{< code-block lang="swift" >}}
github "DataDog/dd-sdk-ios"
{{< /code-block >}}

**Note**: Datadog does not provide prebuilt Carthage binaries. This means Carthage builds the SDK from source. To build and integrate the SDK, run:

{{< code-block lang="bash" >}}
carthage bootstrap --use-xcframeworks --no-use-binaries
{{< /code-block >}}

After building, add the following XCFrameworks to your Xcode project (in the "Frameworks, Libraries, and Embedded Content" section):

{{< code-block lang="swift" >}}
DatadogInternal.xcframework
DatadogCore.xcframework
DatadogFlags.xcframework
{{< /code-block >}}

[1]: https://github.com/Carthage/Carthage
{{% /tab %}}
{{< /tabs >}}

## Initialize the SDK

Initialize Datadog as early as possible in your app lifecycle—typically in `application(_:didFinishLaunchingWithOptions:)` (or with `@UIApplicationDelegateAdaptor` for SwiftUI apps). This ensures all feature flag evaluations and telemetry are captured correctly.

{{< code-block lang="swift" >}}
import DatadogCore

Datadog.initialize(
    with: Datadog.Configuration(
        clientToken: "<client token>",
        env: "<environment>",
        service: "<service name>"
    ),
    trackingConsent: .granted
)
{{< /code-block >}}

## Enable flags

After initializing Datadog, enable `Flags` to attach it to the current Datadog SDK instance and prepare for client creation and flags evaluation:

{{< code-block lang="swift" >}}
import DatadogFlags

Flags.enable()
{{< /code-block >}}

You can also pass a configuration object; see [Advanced configuration](#advanced-configuration).

## Create and retrieve a client

Create a client once, typically during app startup:

{{< code-block lang="swift" >}}
FlagsClient.create() // Creates the default client
{{< /code-block >}}

Retrieve the same client anywhere in your app:

{{< code-block lang="swift" >}}
let flagsClient = FlagsClient.shared() // Retrieves the "default" client
{{< /code-block >}}

You can also create and retrieve multiple clients by providing the `name` parameter:

{{< code-block lang="swift" >}}
FlagsClient.create(name: "checkout")
let flagsClient = FlagsClient.shared(named: "checkout")
{{< /code-block >}}

<div class="alert alert-info">If a client with the given name already exists, the existing instance is reused.</div>  

## Set the evaluation context

Define who or what the flag evaluation applies to using a `FlagsEvaluationContext`. The evaluation context includes user or session information used to determine which flag variations should be returned. Call this method before evaluating flags to ensure proper targeting.

{{< code-block lang="swift" >}}
flagsClient.setEvaluationContext(
    FlagsEvaluationContext(
        targetingKey: "user-123",
        attributes: [
            "email": .string("user@example.com"),
            "tier":  .string("premium")
        ]
    )
)
{{< /code-block >}}

This method fetches flag assignments from the server asynchronously. By providing an optional completion callback or using the async/await variant you can handle the result of context evaluation:

{{< code-block lang="swift" >}}
do {
    try await flagsClient.setEvaluationContext(evaluationContext)
    // Context set successfully
} catch {
    print("Failed to set context: \(error)")
}
{{< /code-block >}}

## Evaluate flags

After creating the `FlagsClient` and setting its evaluation context, you can start reading flag values throughout your app. Flag evaluation is _local and instantaneous_—the SDK uses locally cached data, so no network requests occur when evaluating flags. This makes evaluations safe to perform on the main thread.

Each flag is identified by a _key_ (a unique string) and can be evaluated with a _typed getter_ that returns a value of the expected type. If the flag doesn't exist or cannot be evaluated, the SDK returns the provided default value.

### Boolean flags

Use `getBooleanValue(key:defaultValue:)` for flags that represent on/off or true/false conditions. For example:

{{< code-block lang="swift" >}}
let isNewCheckoutEnabled = flagsClient.getBooleanValue(
    key: "checkout.new",
    defaultValue: false
)

if isNewCheckoutEnabled {
    showNewCheckoutFlow()
} else {
    showLegacyCheckout()
}
{{< /code-block >}}

### String flags

Use `getStringValue(key:defaultValue:)` for flags that select between multiple variants or configuration strings. For example:

{{< code-block lang="swift" >}}
let theme = flagsClient.getStringValue(
    key: "ui.theme",
    defaultValue: "light"
)

switch theme {
case "light":
    setLightTheme()
case "dark":
    setDarkTheme()
default:
    setLightTheme()
}
{{< /code-block >}}

### Integer and double flags

For numeric flags, use `getIntegerValue(key:defaultValue:)` or `getDoubleValue(key:defaultValue:)`. These are appropriate when a feature depends on a numeric parameter such as a limit, percentage, or multiplier:

{{< code-block lang="swift" >}}
let maxItems = flagsClient.getIntegerValue(
    key: "cart.items.max",
    defaultValue: 20
)

let priceMultiplier = flagsClient.getDoubleValue(
    key: "pricing.multiplier",
    defaultValue: 1.0
)
{{< /code-block >}}

### Object flags

For structured or JSON-like data, use `getObjectValue(key:defaultValue:)`. This method returns an `AnyValue`, which can represent primitives, arrays, or dictionaries. Object flags are useful for remote configuration scenarios where multiple properties need to be provided together. For example:

{{< code-block lang="swift" >}}
let config = flagsClient.getObjectValue(
    key: "ui.config",
    defaultValue: .dictionary([
        "color": .string("#00A3FF"),
        "fontSize": .integer(14)
    ])
)
{{< /code-block >}}

### Flag evaluation details

When you need more than just the flag value, use the `get<Type>Details` APIs. These methods return both the evaluated value and metadata explaining the evaluation:

* `getBooleanDetails(key:defaultValue:) -> FlagDetails<Bool>`  
* `getStringDetails(key:defaultValue:) -> FlagDetails<String>`  
* `getIntegerDetails(key:defaultValue:) -> FlagDetails<Int>`  
* `getDoubleDetails(key:defaultValue:) -> FlagDetails<Double>`  
* `getObjectDetails(key:defaultValue:) -> FlagDetails<AnyValue>`

For example:

{{< code-block lang="swift" >}}
let details = flags.getStringDetails(
    key: "paywall.layout",
    defaultValue: "control"
)

print(details.value)    // Evaluated value (for example: "A", "B", or "control")
print(details.variant)  // Variant name, if applicable
print(details.reason)   // Description of why this value was chosen (for example: "TARGETING_MATCH" or "DEFAULT")
print(details.error)    // The error that occurred during evaluation, if any
{{< /code-block >}}

Flag details may help you debug evaluation behavior and understand why a user received a given value.

## Advanced configuration

The `Flags.enable()` API accepts optional configuration with options listed below.

{{< code-block lang="swift" >}}
var config = Flags.Configuration()
Flags.enable(with: config)
{{< /code-block >}}

`trackExposures`
: When `true` (default), the SDK automatically records an _exposure event_ when a flag is evaluated. These events contain metadata about which flag was accessed, which variant was served, and under what context. They are sent to Datadog so you can later analyze feature adoption. If you only need local evaluation without telemetry, you can disable this option.

`rumIntegrationEnabled`
: When `true` (default), flag evaluations are tracked in RUM, which enables correlating them with user sessions. This enables analytics such as _“Do users in variant B experience more errors?”_. If your app does not use RUM, this flag has no effect and can be safely left at its default value.

`gracefulModeEnabled`
: Controls how the SDK handles incorrect use of the `FlagsClient` API—for example, creating a client before calling `Flags.enable()`, creating a duplicate client with the same name, or retrieving a client that hasn't been created yet.

  The exact behavior of Graceful Mode depends on your build configuration:

  * **Release builds**: The SDK always enforces Graceful Mode: any misuse is only logged internally if `Datadog.verbosityLevel` is configured.  
  * **Debug builds** with `gracefulModeEnabled = true` (default): The SDK always logs warnings to the console.  
  * **Debug builds** with `gracefulModeEnabled = false`: The SDK raises `fatalError` for incorrect API usage, enforcing a fail-fast approach that helps detect configuration mistakes early.

  You can adjust `gracefulModeEnabled` depending on your development or QA phase.

`customFlagsEndpoint`
: Configures a custom server URL for retrieving flag assignments.

`customExposureEndpoint`
: Configures a custom server URL for sending flags exposure data.

`customFlagsHeaders`
: Sets additional HTTP headers to attach to requests made to `customFlagsEndpoint`. It can be useful for authentication or routing when using your own flags service.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
