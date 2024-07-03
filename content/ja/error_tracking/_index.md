---
disable_toc: false
kind: documentation
title: Error Tracking
---

## Overview

{{< img src="error_tracking/error-tracking-overview.png" alt="The details of an issue in the Error Tracking Explorer" style="width:100%;" >}}

{{% error-tracking-description %}}

Additional features are available depending on the source of the error. See [supported error sources](#supported-error-sources).

## Getting started

- Take a tour of key Error Tracking features in the [Error Tracking Explorer][5] documentation.
- Use the product-specific links in the next section to set up Error Tracking for a particular error source.

## Supported error sources

Error Tracking can ingest errors from APM, Log Management, and Real User Monitoring. Additional features are available depending on the source of the error. For example, in errors originating from an APM trace, the [Execution Replay][4] feature automatically captures production variable values. 

For details, see the product-specific Error Tracking documentation:

- [APM][1]
- [Log Management][2]
- [Real User Monitoring][3]

[1]: /ja/tracing/error_tracking#setup
[2]: /ja/logs/error_tracking#setup
[3]: /ja/real_user_monitoring/error_tracking#setup
[4]: /ja/tracing/error_tracking/execution_replay
[5]: /ja/error_tracking/explorer