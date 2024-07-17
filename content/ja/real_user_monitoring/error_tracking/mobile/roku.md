---
aliases:
- /ja/real_user_monitoring/error_tracking/roku
code_lang: roku
code_lang_weight: 50
description: Roku チャンネルにエラー追跡を設定します。
further_reading:
- link: /real_user_monitoring/error_tracking/
  tag: Documentation
  text: エラー追跡を開始する
- link: /real_user_monitoring/error_tracking/explorer
  tag: ドキュメント
  text: エクスプローラーでエラー追跡データを視覚化する
title: Roku のクラッシュレポートとエラー追跡
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM for Roku is not available on the US1-FED Datadog site.</div>
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

## Limitations

Crash reporting on Roku doesn't yet support stacktraces. 

## Test your implementation

To verify your Roku Crash Reporting and Error Tracking configuration, you need to trigger a crash in your RUM application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on an Roku device.
2. Execute some code containing a crash. For example:

   ```brightscript
   sub explodingMethod()
       x = 1
       print x.foo
   ```

3. After the crash happens, restart your application and wait for the Roku SDK to upload the crash report in [**Error Tracking**][1].

### Forward errors to Datadog

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
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/mobile_and_tv_monitoring/setup/roku/
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/android/?tabs=kotlin#initialization-parameters


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}