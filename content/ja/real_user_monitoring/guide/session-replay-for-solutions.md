---
title: Use Session Replay In Your Technical Support Workflow
kind: guide
description: Learn how to adopt RUM & Session Replay in your Solutions or Support organization. 
further_reading:
- link: /real_user_monitoring/platform/connect_rum_and_traces/
  tag: Documentation
  text: Learn how to connect RUM with APM traces
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentation
  text: Learn about Session Replay
- link: /real_user_monitoring/session_replay/browser/developer_tools
  tag: Documentation
  text: Learn about Browser Dev Tools
---

## Overview

You can enable your technical solutions and support teams to better troubleshoot customer issues using [Session Replay][1]. With RUM & Session Replay, you can locate specific user sessions, observe user journeys, and access developer tools to see events, logs, errors, and attributes. 

This guide describes a workflow that organizations can replicate and use as an asset for solutions teams to integrate into their workflows.

{{< img src="real_user_monitoring/guide/session-replay/session-replay-recording.png" alt="Session Replay recording of a user session in the Shopist application" style="width:100%;">}}

## Assess user issues

Assume that a customer encounters an issue using Datadog. Your Technical Solutions team may use a support solution, such as Zendesk or ServiceNow, that creates a ticket when this customer reports that they cannot update or save a Synthetics multistep API test. 

The team may request more information from the customer (such as the specific test ID and a screen recording with the [Browser Dev Tools][2] open) that may provide additional context for the customer's test not updating or saving. If no console errors were recorded, the team would not have any hints to start investigating the multistep API test's issue. 

The Technical Solutions team may try to understand the following questions:

- What is the exact error the customer is experiencing?
- Is the customer seeing an in-app notification that hints at a particular issue (such as a console error or an error message)?
- What buttons did the customer click on, and in what order? Did an unexpected action occur before the customer clicked on a button?

## Investigate the root cause

If there were a way to view the customer's user journey in Datadog and see associated backend requests, the Technical Solutions team would have a better understanding of what may be causing this issue.

{{< img src="real_user_monitoring/guide/session-replay/apm-traces-in-session-replay.png" alt="An APM stack trace associated with a RUM view action" style="width:100%;">}}

With the APM integration, you can connect requests from your web application with corresponding backend traces to access APM trace data from a RUM event and uncover any backend errors in the **Errors** tab. 

For more information, see [Connect RUM and Traces][3].

## Watch user sessions in Session Replay

The Technical Solutions team may have internal tools that connect a support platform, like Zendesk, with Datadog products, such as RUM & Session Replay. For example, a contextual link in Zendesk can redirect you to the [RUM Explorer][4] and autofill the user ID in the search query. Filter for individual user sessions from the event list.

The Technical Solutions team can use Session Replay to view a replica of the user journey in Datadog and use Browser Dev Tools to access additional errors that may appear in the frontend. With access to frontend errors and backend traces, your Technical Solutions team is empowered to use the RUM & Session Replay and APM integration to help troubleshoot customer issues.

Click on a user session with a replay recording to observe the user's behavior on the Datadog platform. By using Session Replay, you can locate the corresponding RUM events and identify the specific `click` action to save the multistep API test. Clicking **Save** in the UI triggers the backend call to save the test's configuration.

## Uncover errors in backend traces

While examining errors in the multistep API tests' APM trace, the Technical Solutions team may encounter an `APIInvalidInputError` related to the `maxLength` of a `​​https://properties.steps.items.properties.name/` configuration, which appears to be the root cause of the failed test save. 

{{< img src="real_user_monitoring/guide/session-replay/view-traces.png" alt="An APM stack trace associated with a RUM view action" style="width:100%;">}}

The multistep API test did not save because of a character limit in the step's name. 

## Resolve user problems

To resolve this customer issue, the Technical Solutions team may request the Product team to update the multistep API test workflow with contextual help for when a test is unable to be saved. 

The Frontend team may also be encouraged to implement an error message in the UI that ensures users are notified when they breach the maximum character limit for the test step name.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/session_replay/browser/
[2]: /real_user_monitoring/session_replay/browser/developer_tools/
[3]: /real_user_monitoring/connect_rum_and_traces
[4]: https://app.datadoghq.com/rum/explorer
