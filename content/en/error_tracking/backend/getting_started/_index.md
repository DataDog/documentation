---
title: Getting Started
aliases:
- /error_tracking/standalone_backend/getting_started
further_reading:
- link: '/error_tracking/issue_states/'
  tag: 'Documentation'
  text: 'Error Tracking Issue States and Workflows'
- link: '/error_tracking/backend/exception_replay'
  tag: 'Documentation'
  text: 'Simplify production debugging with Datadog Exception Replay'
- link: "/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
---

## Overview

[Error Tracking][1] processes errors collected by the Datadog Tracing Libraries. Whenever an error is collected, Error Tracking processes and groups it under an issue, or group of similar errors.

## Getting started with Backend Error Tracking

Follow the [in-app setup instructions][2] or choose between single step and manual instrumentation to start collecting backend errors.

{{< whatsnext desc="Choose from the following instrumentation methods:">}}
    {{< nextlink href="/error_tracking/backend/getting_started/single_step_instrumentation" >}}Single step instrumentation{{< /nextlink >}}
    {{< nextlink href="/error_tracking/backend/getting_started/dd_libraries" >}}Manual instrumentation{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking
[2]: https://app.datadoghq.com/error-tracking/settings/setup/backend
