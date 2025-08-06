---
title: Capturing Handled Errors In Error Tracking
description: Learn how to capture handled errors in Error Tracking.
further_reading:
- link: "/error_tracking/issue_states/"
  tag: "Documentation"
  text: "Error Tracking Issue States and Workflows"
- link: "/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
- link: "/error_tracking/guides/enable_infra"
  tag: "Guide"
  text: "Enable infrastructure monitoring"
- link: "/error_tracking/guides/enable_apm"
  tag: "Guide"
  text: "Enable APM"
---

## Overview

Datadog tracing libraries can automatically report handled errors. The errors are attached through span events to the span in which they are handled. They are also directly reported to Error Tracking.

## Requirements
Supported languages
: Python, Ruby

- Your Datadog Agent must be configured for [Standalone Backend Error Tracking][1] or [APM][2]. You must be running Agent version `7.61.0` or higher.
- Your application must be instrumented with:
  - `dd-trace-py` version `3.8.0` or higher for Python
  - `dd-trace-rb` version `2.16.0` or higher for Ruby

<div class="alert alert-info">
Handled errors contain the span attribute <code>error.handling:handled</code>. For more details, see <a href="/error_tracking/explorer/#facets">Facets</a>.
</div>

Capturing handled errors is only available in APM Error Tracking or Standalone Backend Error Tracking. Error Tracking for Logs and RUM is not supported.

## Setup

Set up your application to capture handled errors using one of the following official Datadog tracing libraries:

{{< partial name="error_tracking/error-tracking-handled-errors.html" >}}
<br />

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /error_tracking/backend/getting_started
[2]: /error_tracking/apm
