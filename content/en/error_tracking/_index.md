---
title: Error Tracking
disable_toc: false
further_reading:
- link: 'https://www.datadoghq.com/blog/error-tracking-and-github/'
  tag: 'Blog'
  text: 'Troubleshoot root causes with GitHub commit and ownership data in Error Tracking'
---

## Overview

{{< img src="error_tracking/error-tracking-overview-2.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

Additional features are available depending on the source of the error. See [supported error sources](#supported-error-sources).

## Getting started

- Take a tour of key Error Tracking features in the [Error Tracking Explorer][5] documentation.
- Use the product-specific links in the next section to set up Error Tracking for a particular error source.

## Supported error sources

Error Tracking captures and processes errors across your web, mobile, and backend applications. You can instrument your applications and services using the [Browser SDK][6], [Mobile SDK][7], or ingest errors from your Logs, Traces, and Real User Monitoring events. 

Additional features are available depending on the source of the error. For example, in errors originating from an APM trace, the [Execution Replay][4] feature automatically captures production variable values. 

For details, see the product-specific Error Tracking documentation:

- [APM][1]
- [Log Management][2]
- [Real User Monitoring][3]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/error_tracking#setup
[2]: /logs/error_tracking#setup
[3]: /real_user_monitoring/error_tracking#setup
[4]: /tracing/error_tracking/execution_replay
[5]: /error_tracking/explorer
[6]: /error_tracking/frontend/browser
[7]: /error_tracking/frontend/mobile
