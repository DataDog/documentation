---
title: Frontend Error Tracking
is_beta: true
private: false
aliases:
  - /error_tracking/standalone_frontend/
further_reading:
  - link: '/error_tracking/standalone_frontend/collecting_browser_errors/'
    tag: Documentation
    text: Collect Browser Errors
  - link: '/error_tracking/explorer/'
    tag: 'Documentation'
    text: 'Getting Started with the Error Tracking Explorer'
  - link: '/error_tracking/issue_states/'
    tag: 'Documentation'
    text: 'Error Tracking Issue States and Workflows'
---

## Overview

{{< img src="real_user_monitoring/error_tracking/rum-et-explorer.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

It is critical for your system’s health to consistently monitor the errors collected by Datadog. When there are many individual error events, it becomes hard to prioritize errors for troubleshooting.

Error Tracking simplifies debugging by grouping thousands of similar errors into a single issue. Error Tracking enables you to:

- Track, triage, and debug fatal errors
- Group similar errors into issues to identify important errors and reduce noise
- Set monitors on error tracking events, such as high error volume or new issues
- Follow issues over time to know when they first started, if they are still ongoing, and how often they occur
- See a detailed timeline of steps a user took leading up to the error, simplifying the process to reproduce and resolve errors

## Setup
{{< whatsnext desc="To get started with Datadog Error Tracking, choose one of the following setup options:" >}}
    {{< nextlink href="agentic_onboarding/setup" >}}Agentic Onboarding (frontend only){{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/browser" >}}Browser{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/android" >}}Android{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/ios" >}}iOS{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/expo" >}}Expo{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/reactnative" >}}React Native{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/flutter" >}}Flutter{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/mobile/kotlin_multiplatform" >}}Kotlin Multiplatform{{< /nextlink >}}
    {{< nextlink href="error_tracking/frontend/logs" >}}Logs{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}
