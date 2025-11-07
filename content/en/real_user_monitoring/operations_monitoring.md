---
title: Operations Monitoring
description: Monitor critical technical operations within user-facing features to identify exactly when and why users fail to complete key workflows.
further_reading:
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM'
---

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="Join the Preview!">}}
Operations Monitoring is in Preview.
{{< /callout >}}

## Overview

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-1-temp.png" alt="Operations tab under RUM > Performance Monitoring" style="width:80%;" >}}

In Datadog RUM, a feature represents a major user-facing area of your application like checkout, login, or search. Each feature includes operations, which are the critical technical steps that make the experience work. 

- Business teams use **features** to track and improve user conversion.
- Engineering teams use **operations** to monitor and minimize technical failures that impact key user moments. 

For example, the checkout experience of an e-commerce platform is a feature. Within it, operations might include entering payment details, saving a payment method, and completing a purchase. After the SDK has been instrumented, Datadog RUM measures each operation's performance, including execution volume, completion rate, and failure rate. Measuring operations' health enables you to identify exactly when and why users may not convert in your feature.

The following table shows additional example features and their associated feature operations by industry.

| Industry       | Feature  | Feature Operations                                                                                                               |
|----------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| Social network | Profile  | Users can load their profile <br> Users can upload a picture <br> Users can update their status                                  |
| E-Commerce     | Checkout | Users can enter payment details <br> Users can save their payment method <br> Users can pay                                      |
| Streaming      | Search   | Users can find results for their search <br> Users can load the description of a title <br> Users can start watching the trailer |
| CRM            | Quote    | Users can start a new quote <br> Users can add line items to the quote <br> Users can send a quote to recipients                 |

## Prerequisites

- [RUM without Limits][5] must be enabled in your organization.
- Make sure you've downloaded a supported Datadog RUM SDK version with client-side APIs to define operations:
  - [Browser (6.20.0)][1]
  - [Android (3.1.0)][2]
  - [iOS (3.1.0)][3]
  - [Kotlin Multiplatform (1.4.0)][4]

## Setup

Use the SDK APIs to define your operations.

### Start an operation

Every operation must be started by calling the `startFeatureOperation`.

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.init({
...,
enableExperimentalFeatures: ["feature_operation_vital"], // you need to have this flag turned on for the API to work
})

startFeatureOperation: (
name: string, 
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().startFeatureOperation(
	name: String,
	operationKey: String?,
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}
```swift
RUMMonitor.shared().startFeatureOperation(
	name: String,
	operationKey: String?,
	attributes: [AttributeKey: AttributeValue]?
)
```
{{% /tab %}}
{{< /tabs >}}

### Stop an operation with success

Every started operation must have a stop. Use `succeedFeatureOperation` to stop an operation with a successful outcome.

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.init({
...,
enableExperimentalFeatures: ["feature_operation_vital"], // this flag needs to be enabled for the API to work
})

succeedFeatureOperation: (
name: string, 
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().succeedFeatureOperation(
	name: String,
	operationKey: String?,
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().succeedFeatureOperation(
	name: String,
	operationKey: String?,
	attributes: [AttributeKey: AttributeValue]?
)
```

{{% /tab %}}
{{< /tabs >}}

### Stop an operation with failure

Every started operation must have a stop. Use `failFeatureOperation` to stop an operation with a failure outcome.

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.init({
...,
enableExperimentalFeatures: ["feature_operation_vital"], // this flag needs to be enabled for the API to work
})

GlobalRumMonitor.get().failFeatureOperation: (
name: string, 
failureReason: FailureReason, //'error' | 'abandoned' | 'timeout'| 'other'
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().failFeatureOperation(
	name: String,
	operationKey: String?,
	reason: RUMFeatureOperationFailureReason,	// .error, .abandoned, timeout, .other
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().failFeatureOperation(
	name: String,
	operationKey: String?,
    reason: RUMFeatureOperationFailureReason,  // .error, .abandoned, .timeout, .other
	attributes: [AttributeKey: AttributeValue]
)
```
{{% /tab %}}
{{< /tabs >}}

### Parallelization
You may have cases where users are starting several feature operations in parallel. To individually track them, use the `operationKey` defined when calling `startFeatureOperation`. You must reuse the same `operationKey` later in other APIs, for example when calling `succeedFeatureOperation`.

<div class="alert alert-warning">Operations that have been started but not explicitly stopped are automatically terminated when the RUM session expires. Those are marked as failed, with <code>@operation.failure_reason:timeout</code>. <br><br> If an operation stop API was called that was not started in the first place, the stop event emitted by the SDK is dropped upon ingestion.</div>

## Monitor your availability on Datadog

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-2-temp-1.png" alt="Operations tab under RUM > Performance Monitoring" style="width:80%;" >}}

After you've configured the SDK APIs, you can monitor your operations by navigating to **RUM > Performance Monitoring > Operations**.

Datadog groups together all operations with the same name into a catalog.

Each operation has two out-of-the-box metrics computed over your full, ingested, unsampled traffic:

- `rum.measure.operation`, which counts the volume of operations reported to Datadog
- `rum.measure.operation.duration`, which measures the elapsed time between the start and end of all the operations reported to Datadog

Both metrics are retained for 15 months, and include several dimensions:

- `operation.name`, which is defined on the client side
- `operation.status`, which is either a success or failure
- `operation.failure_reason`, which can be an error, or abandoned, or timeout, or other

Those metrics are included in the price of RUM Measure and available to all RUM without Limits customers that define one or more operations.

## Configure retention filters

Operations are a new type of event in RUM. Operations are bound to a RUM Session, but can span across multiple RUM Views. Operations can be targeted in retention filters. This allows you to align your retention strategy on features that are cornerstones for your user experiences. For example, you can programmatically keep RUM Sessions that had specific operations fail or are taking longer than desired.

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-3-temp.png" alt="Operations tab under RUM > Performance Monitoring" style="width:80%;" >}}

Similarly to metrics, those events come with specific attributes you can use in retention filters:

- `@operation.name`
- `@operation.status`
- `@operation.failure_reason`
- `@operation.duration`
- `@operation.start_view.name`
- `@operation.end_view.name`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk/releases/tag/v6.20.0
[2]: https://github.com/DataDog/dd-sdk-android/releases/tag/3.1.0
[3]: https://github.com/DataDog/dd-sdk-ios/releases/tag/3.1.0
[4]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/releases/tag/1.4.0
[5]: /real_user_monitoring/rum_without_limits/