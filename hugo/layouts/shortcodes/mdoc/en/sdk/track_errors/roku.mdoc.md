### Automated error reporting

After you enable RUM, the Roku SDK automatically captures crashes and reports them the next time your channel launches.

### Manual error reporting

To report an error whenever an operation might throw an exception, forward it to Datadog:

```text
try
    doSomethingThatMightThrowAnException()
catch error
    m.global.datadogRumAgent.callfunc("addError", error)
end try
```

On Roku OS 13+, you can access the file path, line number, and a code snippet for each stack trace frame. See [Roku Crash Reporting and Error Tracking][1] for limitations on earlier OS versions.

[1]: /real_user_monitoring/application_monitoring/roku/error_tracking/
