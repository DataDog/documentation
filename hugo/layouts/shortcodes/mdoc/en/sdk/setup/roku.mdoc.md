<!--
This partial contains setup instructions for the Roku SDK.
It can be included directly in language-specific pages or wrapped in conditionals.
-->

This page describes how to instrument your Roku channels with the Datadog Roku SDK.

The Roku SDK supports [Real User Monitoring (RUM)][1], [Error Tracking][2], and [Product Analytics][6] for BrightScript channels on Roku OS 10 and higher.

## Setup

{% stepper %}

{% step title="Add the dependencies" %}
#### Using ROPM (recommended)

`ROPM` is a package manager for the Roku platform (based on NPM). If you're not already using `ROPM` in your Roku project, read their [Getting started guide][3]. After your project is set up to use `ROPM`, you can use the following command to install the Datadog dependency:

```shell
ropm install datadog-roku
```

#### Setup manually

If your project does not use `ROPM`, install the library manually by downloading the [Roku SDK][4] zip archive
and unzipping it in your project's root folder.

Make sure you have a `roku_modules/datadogroku` subfolder in both the `components` and `source` folders of your project.
{% /step %}

{% step title="Initialize the SDK" %}

In the initialization snippet, set an environment name. For more information, see [Using Tags][5].

```vb.net
sub RunUserInterface(args as dynamic)
    screen = CreateObject("roSGScreen")
    scene = screen.CreateScene("MyScene")
    screen.show()

    datadogroku_initialize({
        clientToken: "<CLIENT_TOKEN>",
        applicationId: "<APPLICATION_ID>",
        site: "{% region-param key="roku_site" /%}",
        env: "<ENV_NAME>",
        sessionSampleRate: 100, ' the percentage (integer) of sessions to track
        launchArgs: args
    })

    ' complete your channel setup here
end sub
```

You can adjust the session sample rate, but Datadog recommends using [retention filters][7] to control retained volume.
{% /step %}

{% step title="Configure tracking consent (GDPR compliance)" %}

The Roku SDK starts collecting data as soon as you call `datadogroku_initialize`. To comply with data protection and privacy policies such as GDPR, initialize the SDK only after the user grants consent to data collection.

{% /step %}

{% step title="Enable RUM to start sending data" %}

RUM is enabled when you initialize the SDK. See [Enable the Datadog RUM Module][8] for the next steps.

{% /step %}

{% /stepper %}

## Sending data when device is offline

RUM helps ensure availability of data when your user device is offline. In case of low-network areas, or when the device battery is too low, all the RUM events are first stored on the local device in batches. 

Each batch follows the intake specification. They are sent as soon as the network is available, and the battery is high enough to help ensure the Datadog SDK does not impact the end user's experience. If the network is not available while your application is in the foreground, or if an upload of data fails, the batch is kept until it can be sent successfully.
 
This means that even if users open your application while offline, no data is lost. To help ensure the SDK does not use too much disk space, the data on the disk is automatically discarded if it gets too old.

[1]: /real_user_monitoring/
[2]: /error_tracking/frontend/mobile/roku/
[3]: https://github.com/rokucommunity/ropm
[4]: https://github.com/DataDog/dd-sdk-roku
[5]: /getting_started/tagging/using_tags/#rum--session-replay
[6]: /product_analytics/
[7]: /real_user_monitoring/retain_and_recover_valuable_sessions/configure_retention_filters/
[8]: /real_user_monitoring/setup/enable_rum/?platform=roku
