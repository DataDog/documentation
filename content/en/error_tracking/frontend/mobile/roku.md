---
title: Roku Crash Reporting and Error Tracking
type: multi-code-lang
code_lang: roku
code_lang_weight: 70
further_reading:
- link: '/real_user_monitoring/error_tracking/'
  tag: 'Documentation'
  text: 'Get started with Error Tracking'
- link: '/real_user_monitoring/error_tracking/explorer'
  tag: 'Documentation'
  text: 'Visualize Error Tracking data in the Explorer'
---

## Overview

Error Tracking processes errors collected from the Roku SDK. 

Enable Roku Crash Reporting and Error Tracking to get comprehensive crash reports and error trends. With this feature, you can access:

- Aggregated Roku crash dashboards and attributes
- Trend analysis with Roku error tracking

Your crash reports appear in [**Error Tracking**][1].


## Setup

Follow the [in-app setup instructions][2] or the steps on this page to install the SDK and enable Roku Crash Reporting and Error Tracking.

### Step 1 - Declare the SDK as a dependency

#### Using ROPM (recommended)

`ROPM` is a package manager for the Roku platform (based on NPM). If you're not already using `ROPM` in your Roku project, read their [Getting started guide][6]. Once your project is set up to use `ROPM`, run the following command to install the Datadog dependency:

```shell
ropm install datadog-roku
```

#### Manual setup

If your project does not use `ROPM`, install the library manually by downloading the [Roku SDK zip archive][4] and unzipping it in your project's root folder.

Make sure you have a `roku_modules/datadogroku` subfolder in both the `components` and `source` folders of your project.




### Step 2 - Specify application details in Datadog

1. Navigate to [**Error Tracking** > **Settings** > **Browser and Mobile**][101] and click **+ New Application**.
2. Select **Roku** as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To disable automatic user data collection for geolocation data or client IP, uncheck the boxes for those settings. For more information, see [Roku Data Collected][201].

   {{< img src="real_user_monitoring/roku/roku-new-application-2.png" alt="Create an application for Roku in Datadog" style="width:90%;">}}


To ensure the safety of your data, you must use a client token. If you use only Datadog API keys to configure the `dd-sdk-roku` library, they are exposed client-side in the Roku channel's BrightScript code.

For more information about setting up a client token, see the [Client Token documentation][601].


### Step 3 - Initialize the library

In the initialization snippet, set an environment name. For more information, see [Using Tags][701].

{{< site-region region="us" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<CLIENT_TOKEN>",
        applicationId: "<APPLICATION_ID>"
        site: "us1",
        env: "<ENV_NAME>",
        sessionSampleRate: 100, ' the percentage (integer) of sessions to track
        launchArgs: args
    })

    ' complete your channel setup here
end sub
```
{{< /site-region >}}

{{< site-region region="eu" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<CLIENT_TOKEN>",
        applicationId: "<APPLICATION_ID>"
        site: "eu1",
        env: "<ENV_NAME>",
        sessionSampleRate: 100, ' the percentage (integer) of sessions to track
        launchArgs: args
    })

    ' complete your channel setup here
end sub
```
{{< /site-region >}}

{{< site-region region="us3" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<CLIENT_TOKEN>",
        applicationId: "<APPLICATION_ID>"
        site: "us3",
        env: "<ENV_NAME>",
        sessionSampleRate: 100, ' the percentage (integer) of sessions to track
        launchArgs: args
    })

    ' complete your channel setup here
end sub
```
{{< /site-region >}}

{{< site-region region="us5" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<CLIENT_TOKEN>",
        applicationId: "<APPLICATION_ID>"
        site: "us5",
        env: "<ENV_NAME>",
        sessionSampleRate: 100, ' the percentage (integer) of sessions to track
        launchArgs: args
    })

    ' complete your channel setup here
end sub
```
{{< /site-region >}}

{{< site-region region="ap1" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<CLIENT_TOKEN>",
        applicationId: "<APPLICATION_ID>"
        site: "ap1",
        env: "<ENV_NAME>",
        sessionSampleRate: 100, ' the percentage (integer) of sessions to track
        launchArgs: args
    })

    ' complete your channel setup here
end sub
```
{{< /site-region >}}

{{< site-region region="ap2" >}}
```brightscript
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<CLIENT_TOKEN>",
        applicationId: "<APPLICATION_ID>"
        site: "ap2",
        env: "<ENV_NAME>",
        sessionSampleRate: 100, ' the percentage (integer) of sessions to track
        launchArgs: args
    })

    ' complete your channel setup here
end sub
```
{{< /site-region >}}



## Additional Error Tracking features 



{{% collapse-content title="Forward errors to Datadog" level="h4" %}}

Whenever you perform an operation that might throw an exception, you can forward the error to Datadog by adding the following code snippet:

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```
{{% /collapse-content %}}




{{% collapse-content title="Sending data when device is offline" level="h4" %}}


The Datadog SDK ensures availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all events are first stored on the local device in batches. 

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.
 
This means that even if users open your application while offline, no data is lost. To ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

{{% /collapse-content %}}



<br>



## Limitations

Crash reporting on Roku does not support stacktraces. 


## Test your implementation

To verify your Roku Crash Reporting and Error Tracking configuration, trigger a crash in your application and confirm that the error appears in Datadog.

To test your implementation:

1. Run your application on a Roku device.
2. Execute some code containing a crash. For example:

   ```brightscript
   sub explodingMethod()
       x = 1
       print x.foo
   ```

3. After the crash happens, restart your application and wait for the crash report to appear in [**Error Tracking**][1].









## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: https://app.datadoghq.com/rum/application/create
[3]: https://docs.datadoghq.com/real_user_monitoring/mobile_and_tv_monitoring/roku/setup/
[4]: https://github.com/DataDog/dd-sdk-roku/releases
[5]: https://docs.datadoghq.com/real_user_monitoring/application_monitoring/roku/setup/?tab=rum#step-3---initialize-the-library
[6]: https://github.com/rokucommunity/ropm
[101]: https://app.datadoghq.com/error-tracking/settings/setup/client
[201]: /real_user_monitoring/mobile_and_tv_monitoring/data_collected/roku
[501]: /account_management/api-app-keys/#api-keys
[601]: /account_management/api-app-keys/#client-tokens
[701]: /getting_started/tagging/using_tags/#rum--session-replay

