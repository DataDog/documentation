## Automated error reporting

After you enable RUM, the Roku SDK automatically captures crashes and reports them the next time your channel launches.

## Manual error reporting

To report an error whenever an operation might throw an exception, forward it to Datadog:

```text
try
    doSomethingThatMightThrowAnException()
catch error
    m.global.datadogRumAgent.callfunc("addError", error)
end try
```

On Roku OS 13+, you can access the file path, line number, and a code snippet for each stack trace frame. See [Roku Crash Reporting and Error Tracking][1] for limitations on earlier OS versions.

For the attributes collected, see [Data Collected][2].

## Upload debug symbols to get deobfuscated stack traces

The Roku SDK doesn't require a symbol upload. On Roku OS 13 and later, crash reports and errors include the file path, line number, and a code snippet for each stack trace frame. On earlier Roku OS versions, the stack trace is empty. For more information, see [Roku Crash Reporting and Error Tracking][1].

[1]: /error_tracking/frontend/mobile/roku/
[2]: /real_user_monitoring/setup/data_collected/?platform=roku#error-attributes
