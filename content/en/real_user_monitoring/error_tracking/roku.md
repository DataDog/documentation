---
title: Roku Crash Reporting and Error Tracking
kind: documentation
description: Set up Error Tracking for your Roku channels.
further_reading:
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Error Tracking'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM for Roku is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">RUM for Roku is in beta.</div>
{{< /site-region >}}

## Overview

Error Tracking processes errors collected from the RUM Roku SDK. 

Enable Roku Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

- Aggregated Roku crash dashboards and attributes
- Trend analysis with Roku error tracking

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the Roku SDK yet, follow the [in-app setup instructions][2] or see the [Roku RUM setup documentation][3].

1. Add the latest version of the [RUM Roku SDK][4] to your ROPM dependencies (or download the zip archive).
2. Configure your application's `env` when [initializing the SDK][5].

For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.

## Forward errors to Datadog

Whenever you perform an operation that might throw an exception, you can forward the error to Datadog by adding the following code snippet:

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tabs=kotlin#initialization-parameters


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
