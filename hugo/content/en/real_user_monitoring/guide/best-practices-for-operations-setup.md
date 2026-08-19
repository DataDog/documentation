---
title: Best Practices for Setting Up RUM Operations
description: Learn how to define RUM operations that generate reliable availability and latency metrics for journeys.
further_reading:
- link: '/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/'
  tag: 'Guide'
  text: 'Best practices for creating SLOs for RUM operations'
- link: '/real_user_monitoring/operations_monitoring/?tab=browser'
  tag: 'Documentation'
  text: 'Learn about Operations Monitoring'
- link: '/journey_monitoring/'
  tag: 'Documentation'
  text: 'Learn about Journey Monitoring'
---

## Overview

This guide helps you choose the appropriate method for defining operations and apply best practices when defining each [operation][1].

Well-defined operations generate reliable [availability and latency metrics][2] from all session traffic in your RUM application. When you link an operation to a journey, these metrics help you assess critical journey steps and identify performance issues that prevent users from completing the journey.

## Choose an instrumentation method

Choose an instrumentation method based on whether you can change your frontend code and how much control you need over the operation lifecycle. You can define operations in one of two ways:

1. Add instrumentation directly to your frontend application code with the [RUM SDK APIs][3].
2. Create operations from existing RUM events with the Datadog UI or API.

The RUM SDK APIs provide more control over an operation. The Datadog UI and API let you define operations without deploying frontend code changes.

### Use RUM SDK APIs

Use the RUM SDK APIs if you have access to your frontend codebase and can deploy changes. This method lets you define when an operation starts and ends, specify whether it succeeds or fails, and identify failures caused by errors or abandonment. You can also add custom attributes to provide context about each operation.

### Use the Datadog UI or API

Use the Datadog UI if you cannot access your frontend codebase or want to generate operation events and metrics without changing frontend code. With this method, you define an operation by mapping RUM events, such as views, resources, and errors to the start, success, and failure conditions of the operation. Since the operation relies on events already collected by RUM, its boundaries are limited to those events.

Use the Datadog API to create operations in bulk after you determine which existing RUM events define each operation.

<div class="alert alert-warning">A RUM application supports up to 1,000 operations created with the Datadog UI or API. The RUM SDK APIs do not limit the number of operations you can define.</div>

## Apply best practices when defining operations

### Measure application-controlled work

Define an operation around a technical step that your application performs and that users expect to complete reliably. For example, an operation might measure the time required to load search results or submit a form. Slow or failed operations can frustrate users and prevent them from completing the journey.

Exclude time spent waiting for user input, such as reading content or deciding what to select. User-controlled time increases the measured latency even when the application performs as expected, making it harder to identify application performance issues.

### Keep the timeout rate at or below 1%

Each operation must have a recorded start and end. The end indicates whether the operation succeeded or failed. If RUM records the start but not the corresponding end, the [operation times out][4] (see the note under **Parallelization**), and Datadog cannot determine its outcome.

Timed-out operations reduce the sample of operations with meaningful outcome data and can conceal errors or user abandonment. Keep the timeout rate at or below 1% so Datadog can classify at least 99% of started operations as successes or failures. A higher timeout rate makes operation performance metrics less representative and can indicate incomplete instrumentation.

### Link operations to journeys

Link an operation to a journey when you create it so that the operation contributes to the journey's status. Linking is optional during operation creation, and you can later link the operation to additional journeys or remove existing links.

### Create SLOs for your journey

For a full breakdown, see [Best practices for creating SLOs for RUM operations][7].

### Prioritize the final operation in a journey

Prioritize the operation that represents the final step of a journey because its outcome often determines whether the user completes the journey. Define the operation's start and successful outcome around that final step. For example:

- **Checkout journey**: Start the final operation when the user clicks **Pay now**, and mark it as successful when the payment completes.
- **Login journey**: Start the final operation when the user clicks **Sign in** with valid credentials, and mark it as successful when the application authenticates the user.
- **Search journey**: Start the final operation when the user submits a valid search query, and mark it as successful when the results page displays matching items.

## Troubleshoot operation instrumentation

Use the following tools to investigate unexpected operation outcomes or verify that an operation is instrumented correctly:

- Launch an [Operation AI Investigation][5] from the operation details page to analyze errors, timeouts, abandonment, and latency issues.
- Review example sessions on the operation details page for the outcome you want to investigate.
- Query operation events in the [RUM Explorer][6] to inspect their attributes and surrounding session context.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/operations_monitoring/?tab=browser
[2]: /real_user_monitoring/operations_monitoring/?tab=browser#monitor-your-availability-on-datadog
[3]: /real_user_monitoring/operations_monitoring/?tab=browser#start-an-operation
[4]: /real_user_monitoring/operations_monitoring/?tab=browser#parallelization
[5]: /real_user_monitoring/ai_investigations/operation_ai_investigation/
[6]: /real_user_monitoring/explorer/
[7]: /real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
