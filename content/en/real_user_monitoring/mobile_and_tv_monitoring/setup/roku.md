---
title: Roku Channel Monitoring Setup
aliases:
    - /real_user_monitoring/roku/
code_lang: roku
type: multi-code-lang
code_lang_weight: 60
further_reading:
- link: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku
  tag: Documentation
  text: RUM Roku Advanced Configuration
- link: https://github.com/DataDog/dd-sdk-roku
  tag: "Source Code"
  text: Source code for dd-sdk-roku
- link: /real_user_monitoring
  tag: Documentation
  text: Explore Datadog RUM
- link: https://www.datadoghq.com/blog/monitor-roku-with-rum/
  tag: Blog
  text: Monitor your Roku channels with Datadog RUM
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">RUM and Error Tracking for Roku are not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

## Overview

This page describes how to instrument your applications for both [Real User Monitoring (RUM)][1] and [Error Tracking][2] with the Roku SDK. You can follow the steps below to instrument your applications for RUM (includes Error Tracking) or Error Tracking if you have purchased it as a standalone product.

The Datadog Roku SDK supports BrightScript channels for Roku OS 10 and higher.

## Setup

1. Declare the SDK as a dependency.
2. Specify application details in Datadog.
3. Initialize the library.
4. Instrument the channel.

### Declare the SDK as a dependency

#### Using ROPM (recommended)

`ROPM` is a package manager for the Roku platform (based on NPM). If you're not already using `ROPM` in your Roku project, read their [Getting started guide][3]. Once your project is set up to use `ROPM`, you can use the following command to install the Datadog dependency:

```shell
ropm install datadog-roku
```

### Setup manually

If your project does not use `ROPM`, install the library manually by downloading the [Roku SDK][4] zip archive
and unzipping it in your project's root folder.

Make sure you have a `roku_modules/datadogroku` subfolder in both the `components` and `source` folders of your project.

### Specify application details in Datadog

{{< tabs >}}
{{% tab "RUM" %}}

1. Navigate to [**Digital Experience** > **Add an Application**][1].
2. Select **Roku** as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings. For more information, see [Roku Data Collected][2].

   {{< img src="real_user_monitoring/roku/roku-new-application-2.png" alt="Create a RUM application for Roku in Datadog" style="width:90%;">}}

[1]: https://app.datadoghq.com/rum/application/create
[2]: /real_user_monitoring/mobile_and_tv_monitoring/data_collected/roku

{{% /tab %}}
{{% tab "Error Tracking" %}}

1. Navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][1].
2. Select **Roku** as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings. For more information, see [Roku Data Collected][2].

   {{< img src="real_user_monitoring/roku/roku-new-application-2.png" alt="Create an application for Roku in Datadog" style="width:90%;">}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /real_user_monitoring/mobile_and_tv_monitoring/data_collected/roku

{{% /tab %}}
{{< /tabs >}}

To ensure the safety of your data, you must use a client token. If you used only [Datadog API keys][5] to configure the `dd-sdk-roku` library, they would be exposed client-side in the Roku channel's BrightScript code. 

For more information about setting up a client token, see the [Client Token documentation][6].

### Initialize the library

In the initialization snippet, set an environment name. For more information, see [Using Tags][7].

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

### Sample RUM sessions

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM Roku SDK][8] as a percentage between 0 and 100. You can specify the rate with the `sessionSampleRate` parameter.

### Instrument the channel

See [**Track RUM Resources**][9] to enable automatic tracking of all your resources, and [**Enrich user sessions**][8] to add custom global or user information to your events.

#### Track Views

To split [user sessions][10] into logical steps, manually start a View using the following code. Every navigation to a new screen within your channel should correspond to a new View.

```brightscript
    viewName = "VideoDetails"
    viewUrl = "components/screens/VideoDetails.xml"
    m.global.datadogRumAgent.callfunc("startView", viewName, viewUrl)
```

#### Track RUM Actions

RUM Actions represent the interactions your users have with your channel. You can forward actions to Datadog as follows:

```brightscript
    targetName = "playButton" ' the name of the SG Node the user interacted with
    actionType = "click" ' the type of interaction, should be one of "click", "back", or "custom" 
    m.global.datadogRumAgent.callfunc("addAction", { target: targetName, type: actionType})
```

#### Track RUM errors

Whenever you perform an operation that might throw an exception, you can forward the error to Datadog as follows:

```brightscript
    try
        doSomethingThatMightThrowAnException()
    catch error
        m.global.datadogRumAgent.callfunc("addError", error)
    end try
```

## Sending data when device is offline

RUM ensures availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches. 

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.
 
This means that even if users open your application while offline, no data is lost. To ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/
[2]: /error_tracking/
[3]: https://github.com/rokucommunity/ropm
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: /account_management/api-app-keys/#api-keys
[6]: /account_management/api-app-keys/#client-tokens
[7]: /getting_started/tagging/using_tags/#rum--session-replay
[8]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku#enrich-user-sessions
[9]: /real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/roku#track-rum-resources
[10]: /real_user_monitoring/mobile_and_tv_monitoring/data_collected/roku