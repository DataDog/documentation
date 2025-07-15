---
title: Backend Error Tracking
is_beta: true
private: false
aliases:
  - /error_tracking/standalone_backend/
further_reading:
  - link: '/error_tracking/explorer/'
    tag: 'Documentation'
    text: 'Getting Started with the Error Tracking Explorer'
  - link: '/error_tracking/issue_states/'
    tag: 'Documentation'
    text: 'Error Tracking Issue States and Workflows'
  - link: '/error_tracking/backend/exception_replay'
    tag: 'Documentation'
    text: 'Simplify production debugging with Datadog Exception Replay'
---

## Overview

{{< img src="error_tracking/error-tracking-overview-2.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

It is critical for your system's health to consistently monitor the errors that Datadog collects. When there are many individual error events, it becomes hard to prioritize errors for troubleshooting.

Error Tracking simplifies debugging by grouping thousands of similar errors into a single issue. Error Tracking enables you to:

- Track, triage, and debug fatal errors
- Group similar errors into issues, so that you can identify important errors and reduce noise
- Set monitors on error tracking events, such as high error volume or new issues
- Follow issues over time to know when they first started, if they are still ongoing, and how often they occur
- Automatically capture local variable values so you can reproduce exceptions, simplifying the process to resolve errors quickly

## Setup
{{< whatsnext desc="To get started with Datadog Error Tracking, see the corresponding documentation:" >}}
    {{< nextlink href="error_tracking/backend/getting_started" >}}Standalone Backend Error Tracking{{< /nextlink >}}
    {{< nextlink href="error_tracking/apm" >}}APM{{< /nextlink >}}
    {{< nextlink href="error_tracking/backend/logs" >}}Logs{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}
