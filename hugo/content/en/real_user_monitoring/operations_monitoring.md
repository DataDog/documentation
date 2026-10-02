---
title: Operations Monitoring
description: Monitor critical technical operations within user-facing journeys to identify exactly when and why users fail to complete key workflows.
further_reading:
- link: '/monitors/create/types/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Learn about RUM'
- link: '/real_user_monitoring/guide/best-practices-for-operations-setup/'
  tag: 'Guide'
  text: 'Best practices for setting up Operations Monitoring'
- link: '/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/'
  tag: 'Guide'
  text: 'Best practices for creating SLOs for RUM operations'  
---

## Overview

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-overview-1.png" alt="Operations tab under RUM > Performance Monitoring" style="width:100%;" >}}

A RUM operation is a critical step in a [journey][9] that must be available and fast for users to complete the journey. A journey represents a major user-facing area of your application, such as checkout, login, or search. You can map RUM operations to the steps that matter to your application. A RUM operation typically starts with a user action and ends when a related technical event completes, such as when an API call resolves.

Datadog automatically generates [operation metrics][19] from all ingested, unsampled RUM traffic at no additional cost. [Operation events][21] can be used in [retention filters][12] and are available for investigation in retained RUM sessions.

You can create operations in the following ways:

- [With the RUM SDK APIs][15]
- [Directly in Datadog][16]
- [Through the Datadog MCP (Model Context Protocol) Server][17]
- [Programmatically with the Datadog API][18]

For recommendations on defining and instrumenting operations, see [Best practices for setting up Operations Monitoring][14].

Grouping RUM operations into journeys connects technical performance with business outcomes:

- Engineering teams use **operations** to monitor and minimize technical failures that affect key moments in a journey.
- Business teams use **journeys** to track and improve user conversion.

For example, the checkout experience of an ecommerce platform is a journey. Its operations might include entering payment details, saving a payment method, and completing a purchase. Monitoring the health of these operations helps you identify when and why users do not complete the checkout journey.

The table lists additional example journeys and their associated operations by industry.

| Industry       | Journey  |  Operations                                                                                                               |
|----------------|----------|----------------------------------------------------------------------------------------------------------------------------------|
| Social network | Profile  | Users can load their profile <br> Users can upload a picture <br> Users can update their status                                  |
| Ecommerce      | Checkout | Users can enter payment details <br> Users can save their payment method <br> Users can pay                                      |
| Streaming      | Search   | Users can find results for their search <br> Users can load the description of a title <br> Users can start watching the trailer |
| CRM            | Quote    | Users can start a new quote <br> Users can add line items to the quote <br> Users can send a quote to recipients                 |

## Prerequisites

- [RUM without Limits][11] must be enabled in your organization.
- To create operations with SDK APIs, download a supported Datadog RUM SDK version with client-side APIs to define operations:
  - [Browser (6.20.0)][1]
  - [Android (3.1.0)][2]
  - [iOS (3.1.0)][3]
  - [Flutter (3.0.0)][7]
      - **Note**: On Flutter Web, operations route through the Browser SDK, which requires the `feature_operation_vital` experimental feature to be enabled.
  - [Kotlin Multiplatform (1.4.0)][4]
  - [React Native (3.0.0)][5]
  - [Roku (1.4.0)][6]

## Monitor RUM operations with included metrics

Datadog automatically generates two out-of-the-box metrics for each RUM operation at no additional cost. The metrics use your full, ingested, unsampled traffic and are available to all [RUM without Limits][11] customers who define at least one operation:

- `rum.measure.operation` counts the volume of operations reported to Datadog.
- `rum.measure.operation.duration` measures the elapsed time between the start and end of operations reported to Datadog.

Datadog retains both metrics for 15 months. The metrics include these dimensions:

- `operation.name`, defined on the client side
- `operation.status`, either success or failure
- `operation.failure_reason`, either error, abandoned, or other

Use these metrics to create [metric monitors][22] and availability or latency SLOs for RUM operations. For recommended queries, thresholds, and examples, see [Best Practices for Creating SLOs for RUM Operations][23].

To view operation metrics, navigate to {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Performance Monitoring{{< /ui >}} > {{< ui >}}Operations{{< /ui >}}. The Operations catalog groups together all operations with the same name.

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-catalog-1.png" alt="RUM Operations catalog showing operation volume, completion rate, and failure rate" style="width:100%;" >}}

## Use RUM operation events for investigation and retention

Each RUM operation generates a RUM event within its associated RUM session. An operation event can span multiple RUM views.

Query operation events from retained sessions in the [RUM Session Explorer][20] to investigate operation performance and failures. Operation events include these attributes:

- `@operation.name`
- `@operation.status`
- `@operation.failure_reason`
- `@operation.duration`
- `@operation.start_view.name`
- `@operation.end_view.name`

Use the same attributes in retention filters to retain sessions based on operation activity. For example, retain sessions that contain a failed operation or an operation whose duration exceeds a threshold.

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-3-temp.png" alt="RUM retention filter configured with operation event attributes" style="width:80%;" >}}

## Create operations with the SDK APIs

Use the SDK APIs to define your operations.

### Start an operation

Every operation must be started by calling `startOperation` (some SDKs may use the legacy name of this API - `startFeatureOperation`).

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
GlobalRumMonitor.get().startOperation(
	name: String,
	operationKey: String?,
	options: OperationOptions,
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}
```swift
RUMMonitor.shared().startOperation(
	name: String,
	operationKey: String?,
	attributes: [AttributeKey: AttributeValue]?,
	options: OperationOptions?
)
```
{{% /tab %}}

{{% tab "React Native" %}}
```javascript
DdRum.startFeatureOperation(
	name: string,
	operationKey?: string,
	attributes?: Record<string, any>
)

```
{{% /tab %}}

{{% tab "Flutter" %}}
```dart
DatadogSdk.instance.rum?.startFeatureOperation(
    String name, {
    String? operationKey,
    Map<String, Object?> attributes = const {},
  }
)
```
To use operations on Flutter Web, enable the `feature_operation_vital` experimental feature in the Browser SDK.
{{% /tab %}}

{{% tab "Roku" %}}
```brightscript
m.global.datadogRumAgent@.startOperation(
    name as string,
    operationKey = invalid as dynamic, ' optional: string or invalid for unkeyed operations
    context = {} as object             ' optional: AssocArray of custom attributes
)
```
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">The Operation's name may only contain letters, digits, or the characters <code>- _ . @ $</code>, and cannot contain any whitespaces.</div>

### Stop an operation with success

Every started operation must have a stop. Use `succeedOperation` to stop an operation with a successful outcome (some SDKs may use the legacy name of this API - `succeedFeatureOperation`).

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
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
GlobalRumMonitor.get().succeedOperation(
	name: String,
	operationKey: String?,
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().succeedOperation(
	name: String,
	operationKey: String?,
	attributes: [AttributeKey: AttributeValue]?
)
```

{{% /tab %}}

{{% tab "React Native" %}}

```javascript
DdRum.succeedFeatureOperation(
	name: string,
	operationKey?: string,
	attributes?: Record<string, any>
)
```

{{% /tab %}}

{{% tab "Flutter" %}}

```dart
DatadogSdk.instance.rum?.succeedFeatureOperation(
    String name, {
    String? operationKey,
    Map<String, Object?> attributes = const {},
  }
)
```
To use operations on Flutter Web, enable the `feature_operation_vital` experimental feature in the Browser SDK.

{{% /tab %}}

{{% tab "Roku" %}}
```brightscript
m.global.datadogRumAgent@.succeedOperation(
    name as string,
    operationKey = invalid as dynamic, ' optional: string or invalid for unkeyed operations
    context = {} as object             ' optional: AssocArray of custom attributes
)
```
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-warning">The <code>operationKey</code> must be the same in the start and end Operation event.</div>

### Stop an operation with failure

Every started operation must have a stop. Use `failOperation` to stop an operation with a failure outcome (some SDKs may use the legacy name of this API - `failFeatureOperation`).

{{< tabs >}}
{{% tab "Browser" %}}

```javascript
DD_RUM.init({
...,
enableExperimentalFeatures: ["feature_operation_vital"], // this flag needs to be enabled for the API to work
})

failFeatureOperation: (
name: string, 
failureReason: FailureReason, //'error' | 'abandoned' | 'other'
options?: {
 operationKey?: string,
 context?: Context,
 description?: string,
}) => void
```

{{% /tab %}}

{{% tab "Android" %}}

```kotlin
GlobalRumMonitor.get().failOperation(
	name: String,
	operationKey: String?,
	failureReason: FailureReason,	// ERROR, ABANDONED, OTHER
	attributes: Map<String, Any?>
)
```

{{% /tab %}}

{{% tab "iOS" %}}

```swift
RUMMonitor.shared().failOperation(
	name: String,
	operationKey: String?,
    reason: RUMFeatureOperationFailureReason,  // .error, .abandoned, .other
	attributes: [AttributeKey: AttributeValue]
)
```
{{% /tab %}}

{{% tab "Roku" %}}
```brightscript
m.global.datadogRumAgent@.failOperation(
    name as string,
    failureReason as string,           ' "error", "abandoned", or "other"
    operationKey = invalid as dynamic, ' optional: string or invalid for unkeyed operations
    context = {} as object             ' optional: AssocArray of custom attributes
)
```
{{% /tab %}}

{{% tab "React Native" %}}

```javascript
DdRum.failFeatureOperation(
	name: string,
	operationKey?: string,
	reason: FeatureOperationFailure, // 'ERROR' | 'ABANDONED' | 'OTHER'
	attributes: Record<string, any>
)

```
{{% /tab %}}

{{% tab "Flutter" %}}

```dart
DatadogSdk.instance.rum?.failFeatureOperation(
    String name,
    RumFeatureOperationFailureReason failureReason, // .error, .abandoned, .other
    {
    String? operationKey,
    Map<String, Object?> attributes = const {},
  }
)
```
To use operations on Flutter Web, enable the `feature_operation_vital` experimental feature in the Browser SDK.

{{% /tab %}}

{{< /tabs >}}

### Parallelization
You may have cases where users are starting several journey operations in parallel. To individually track them, use the `operationKey` defined when calling `startOperation`. You must reuse the same `operationKey` later in other APIs, for example when calling `succeedOperation`.

<div class="alert alert-warning">Operations that have been started but not explicitly stopped are automatically terminated when the RUM session expires. Those are marked as failed, with <code>@operation.failure_reason:timeout</code>. <br><br> If an operation stop API was called that was not started in the first place, the stop event emitted by the SDK is dropped upon ingestion.</div>

## Create operations from Datadog

You can create an operation from either the operations catalog or a journey's details report:

- **Operations catalog**: Navigate to {{< ui >}}RUM{{< /ui >}} > {{< ui >}}Operations{{< /ui >}}, then click {{< ui >}}New Operation{{< /ui >}}
- **Journey Monitoring**: Navigate to {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Journey Monitoring{{< /ui >}}, select a journey, navigate to its {{< ui >}}Details Report{{< /ui >}}, then click {{< ui >}}New Operation{{< /ui >}}

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-web-ui.png" alt="Page for creating Operations from the Datadog UI" style="width:100%;" >}}

<div class="alert alert-warning">Each RUM application supports up to 1000 operations created from Datadog through the UI or API. There is no organization-wide limit on operations created directly in Datadog.</div>

### Step 1: Enter operation details and select the operation category

Select the operation's RUM application and enter a display name. You may optionally add a description to the operation.

Select the operation's **category** to determine the RUM event types compatible with the start, success, and failure conditions. 

| Operation category       | Summary  | Supported event types                                                                                                            |
|----------------------------------|----------|----------------------------------------------------------------------------------------------------------------------|
| Component loading | Measure how long a user-initiated action takes to complete  | Start: Action <br> Success: Resource or custom action <br> Failure: Resource, error, or custom action |
| Form submission | Measure how long a form submit or mutation takes to succeed | Start: Action <br> Success: Resource, view, or custom action <br> Failure: Resource, error, or custom action |
| Page or screen load | Measure how long a page or screen takes to load and display data | Start: View <br> Success: Resource, view, or custom action <br> Failure: Resource, error, or custom action |
| Page or screen navigation | Measure how long a navigation from one page or screen to another takes to succeed | Start: Action or view <br> Success: Resource, view, or custom action <br> Failure: Resource, error, or custom action |
| Custom | Define a custom operation with any event type combination | Start: Action or view <br> Success: Resource, view, or custom action <br> Failure: Resource, error, or custom action |

### Step 2: Define the start event

Each operation must have a starting RUM event. Operations can begin with either an action or view event depending on the selected operation category.

### Step 3: Define the success conditions

Each operation must have a condition for ending in a success. Operations can end in success with a resource, view, or custom action event, depending on the selected operation category.

### Step 4: Define the failure conditions

Each operation must have a condition for ending in a failure:
- **Error** failures can end as a resource, error, or custom action.
- **Abandon** failures can be toggled on in case the user navigates away from the starting view before the operation finishes.

<div class="alert alert-danger">Allow up to 15 minutes for metrics to appear in the operations catalog after you create an operation in Datadog through the UI or API.</div>

## Create operations with the Datadog MCP

Operations can also be created through the [Datadog MCP][13].

## Create operations with the Datadog API

Operations can also be created through the [Datadog API][10].

## Edit operations

In the operations catalog, click the pencil icon to edit an operation. You can edit the description of any operation, regardless of how it was created. Operations created through the UI or API can be fully edited (not just the description).

## Link RUM operations to journeys

A link identifies a RUM operation as a definitive part of one or more journeys' critical paths. Explicit links distinguish operations that service a journey from unrelated operations that run concurrently.

Linking an operation to a journey has these effects:

- If the operation does not have at least one SLO, Datadog automatically creates an availability SLO with a 99% objective to establish a baseline. For guidance on customizing operation SLOs, see [Best Practices for Creating SLOs for RUM Operations][23].
- The journey's [health status in Journey Monitoring][9] reflects whether any SLO for the linked operation has a critical burn rate.

### Manage journey links

Manage links with one of these methods:

- In Datadog, from the operation details report or a specific journey's [details report][24]
- With the [RUM Operations API][10]

{{< img src="/real_user_monitoring/operations_monitoring/operations-monitoring-journey-link-side-panel.png" alt="Side panel in RUM Operations details report to manage Journey links" style="width:100%;" >}}

You can unlink an operation from one or more journeys at any time. All SLOs remain associated with the operation after it is unlinked.

## Investigate root causes with AI

You can run an agentic investigation on a single operation directly from the Operations page. The agent analyzes both the success rate and the latency of the operation and surfaces focused investigations for each failure mode (errors, timeouts, abandonment) and for latency regressions. For more information, see [Operation AI Investigation][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/browser-sdk/releases/tag/v6.20.0
[2]: https://github.com/DataDog/dd-sdk-android/releases/tag/3.1.0
[3]: https://github.com/DataDog/dd-sdk-ios/releases/tag/3.1.0
[4]: https://github.com/DataDog/dd-sdk-kotlin-multiplatform/releases/tag/1.4.0
[5]: https://github.com/DataDog/dd-sdk-reactnative/releases/tag/3.0.0
[6]: https://github.com/DataDog/dd-sdk-roku/releases/tag/1.4.0
[7]: https://github.com/DataDog/dd-sdk-flutter/releases/tag/datadog_flutter_plugin%2Fv3.0.0
[8]: /real_user_monitoring/ai_investigations/operation_ai_investigation/
[9]: /journey_monitoring/
[10]: /api/latest/rum-operations/
[11]: /real_user_monitoring/rum_without_limits/
[12]: /real_user_monitoring/rum_without_limits/retention_filters/
[13]: /mcp_server/tools/#rum
[14]: /real_user_monitoring/guide/best-practices-for-operations-setup/
[15]: #create-operations-with-the-sdk-apis
[16]: #create-operations-from-datadog
[17]: #create-operations-with-the-datadog-mcp
[18]: #create-operations-with-the-datadog-api
[19]: #monitor-rum-operations-with-included-metrics
[20]: /real_user_monitoring/explorer/
[21]: #use-rum-operation-events-for-investigation-and-retention
[22]: /monitors/types/metric/
[23]: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[24]: /journey_monitoring/details_report/

