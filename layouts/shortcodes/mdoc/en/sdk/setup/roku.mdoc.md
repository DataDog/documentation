<!--
This partial contains setup instructions for the Roku SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your applications for [Real User Monitoring (RUM)][1] with the Roku SDK. RUM includes Error Tracking by default, but if you have purchased Error Tracking as a standalone product, see the [Error Tracking setup guide][2] for specific steps.

The Datadog Roku SDK supports BrightScript channels for Roku OS 10 and higher.

## Setup

### Step 1 - Declare the SDK as a dependency

#### Using ROPM (recommended)

`ROPM` is a package manager for the Roku platform (based on NPM). If you're not already using `ROPM` in your Roku project, read their [Getting started guide][3]. Once your project is set up to use `ROPM`, you can use the following command to install the Datadog dependency:

```shell
ropm install datadog-roku
```

#### Setup manually

If your project does not use `ROPM`, install the library manually by downloading the [Roku SDK][4] zip archive
and unzipping it in your project's root folder.

Make sure you have a `roku_modules/datadogroku` subfolder in both the `components` and `source` folders of your project.

### Step 2 - Specify application details in Datadog

1. Navigate to [**Digital Experience** > **Add an Application**][5].
2. Select **Roku** as the application type and enter an application name to generate a unique Datadog application ID and client token.
3. To disable automatic user data collection for client IP or geolocation data, uncheck the boxes for those settings. For more information, see [Roku Data Collected][6].

{% alert level="info" %}
If you've purchased Error Tracking as a standalone product (without RUM), navigate to [**Error Tracking** > **Settings** > **Browser and Mobile** > **Add an Application**][7] instead.
{% /alert %}

To ensure the safety of your data, you must use a client token. If you use only [Datadog API keys][8] to configure the `dd-sdk-roku` library, they are exposed client-side in the Roku channel's BrightScript code.

For more information about setting up a client token, see the [Client Token documentation][9].

### Step 3 - Initialize the library

In the initialization snippet, set an environment name. For more information, see [Using Tags][10].

{% region-code-block title="US1" region="us" %}

```vb.net
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

{% /region-code-block %}
{% region-code-block title="EU1" region="eu" %}

```vb.net
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

{% /region-code-block %}
{% region-code-block title="US3" region="us3" %}

```vb.net
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

{% /region-code-block %}
{% region-code-block title="US5" region="us5" %}

```vb.net
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

{% /region-code-block %}
{% region-code-block title="US1-FED" region="gov" %}

```vb.net
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<CLIENT_TOKEN>",
        applicationId: "<APPLICATION_ID>"
        site: "us1_fed",
        env: "<ENV_NAME>",
        sessionSampleRate: 100, ' the percentage (integer) of sessions to track
        launchArgs: args
    })

    ' complete your channel setup here
end sub
```

{% /region-code-block %}
{% region-code-block title="AP1" region="ap1" %}

```vb.net
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

{% /region-code-block %}
{% region-code-block title="AP2" region="ap2" %}

```vb.net
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

{% /region-code-block %}

#### Sample session rates

To control the data your application sends to Datadog RUM, you can specify a sampling rate for RUM sessions while [initializing the RUM Roku SDK][11]. The rate is a percentage between 0 and 100. By default, `sessionSamplingRate` is set to 100 (keep all sessions).

## Instrument the channel

See [**Track RUM Resources**](#track-rum-resources) to enable automatic tracking of all your resources, and [**Enrich user sessions**](#enrich-user-sessions) to add custom global or user information to your events.

### Track Views

To split [user sessions][12] into logical steps, manually start a View using the following code. Every navigation to a new screen within your channel should correspond to a new View.

```vb.net
    viewName = "VideoDetails"
    viewUrl = "components/screens/VideoDetails.xml"
    m.global.datadogRumAgent.callfunc("startView", viewName, viewUrl)
```

### Track RUM Actions

RUM Actions represent the interactions your users have with your channel. You can forward actions to Datadog as follows:

```vb.net
    targetName = "playButton" ' the name of the SG Node the user interacted with
    actionType = "click" ' the type of interaction, should be one of "click", "back", or "custom" 
    m.global.datadogRumAgent.callfunc("addAction", { target: targetName, type: actionType})
```

### Track RUM errors

Whenever you perform an operation that might throw an exception, you can forward the error to Datadog as follows:

```vb.net
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

[1]: /real_user_monitoring/
[2]: /error_tracking/
[3]: https://github.com/rokucommunity/ropm
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: https://app.datadoghq.com/rum/application/create
[6]: /real_user_monitoring/application_monitoring/roku/data_collected
[7]: https://app.datadoghq.com/error-tracking/settings/setup/client
[8]: /account_management/api-app-keys/#api-keys
[9]: /account_management/api-app-keys/#client-tokens
[10]: /getting_started/tagging/using_tags/#rum--session-replay
[11]: /real_user_monitoring/application_monitoring/roku/advanced_configuration/#enrich-user-sessions
[12]: /real_user_monitoring/application_monitoring/roku/data_collected

