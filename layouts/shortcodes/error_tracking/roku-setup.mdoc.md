## Overview

Error Tracking processes errors collected from the Roku SDK. 

Enable Roku Crash Reporting and Error Tracking to get comprehensive crash reports and error trends with Real User Monitoring. With this feature, you can access:

- Aggregated Roku crash dashboards and attributes
- Trend analysis with Roku error tracking

Your crash reports appear in [**Error Tracking**][1].

## Setup

If you have not set up the Roku SDK yet, follow the [in-app setup instructions][2] or see the [Roku setup documentation][3].

1. Add the latest version of the [Roku SDK][4] to your ROPM dependencies (or download the zip archive).
2. Configure your application's `env` when [initializing the SDK][5].

For any given error, you can access the file path, line number, and a code snippet for each frame of the related stack trace.

## Limitations

Crash reporting on Roku doesn't yet support stacktraces. 

## Test your implementation

To verify your Roku Crash Reporting and Error Tracking configuration, you need to trigger a crash in your application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on an Roku device.
2. Execute some code containing a crash. For example:

   ```
   sub explodingMethod()
       x = 1
       print x.foo
   ```

3. After the crash happens, restart your application and wait for the Roku SDK to upload the crash report in [**Error Tracking**][1].

### Forward errors to Datadog

Whenever you perform an operation that might throw an exception, you can forward the error to Datadog by adding the following code snippet:

```
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```
