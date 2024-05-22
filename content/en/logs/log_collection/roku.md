---
title: Roku Log Collection
kind: documentation
description: Collect logs from your Roku channel.
further_reading:
- link: https://github.com/DataDog/dd-sdk-roku
  tag: "Source Code"
  text: Source code for dd-sdk-roku
- link: logs/explorer
  tag: Documentation
  text: Learn how to explore your logs
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Roku Log collection is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
<div class="alert alert-info">Roku Log collection is in beta.</div>
{{< /site-region >}}

Send logs to Datadog from your Roku channel with [Datadog's `dd-sdk-roku` logging library][1] and leverage the following features:

* Log to Datadog in JSON format natively.
* Add `context` and extra custom attributes to each log sent.
* Record real client IP addresses and User-Agents.
* Optimized network usage with automatic bulk posts.

## Setup

1. Add the dependency to your project using `ROPM`, or download the [latest zip archive][7] and extract it to your project.

    ```shell
    ropm install datadog-roku
    ```

2. Initialize the library with your [Datadog client token][2] and Application ID generated when you create a new RUM application in the Datadog UI (see [Getting Started with Roku RUM Collection][6] for more information). For security reasons, you must use a client token: you cannot use [Datadog API keys][3] to configure the `dd-sdk-roku` library as they would be exposed client-side in the Roku channel's package. 

   For more information about setting up a client token, see the [client token documentation][2].

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


3. (Optional) When writing your application, you can enable development logs by setting the `datadogVerbosity` attribute on the global node. All internal messages in the library with a priority equal to or higher than the provided level are then logged to your Roku device's telnet output:

   ```brightscript
   ' 0 = none; 1 = error; 2 = warning; 3 = info; 4 = verbose;
   m.globalNode.addFields({ datadogVerbosity: 2 }) 
   ```

4. Send a custom log entry directly to Datadog with one of the following functions:

    ```brightscript
    msg = "A log message"
    m.global.datadogLogsAgent.callfunc("logOk", msg, {})
    m.global.datadogLogsAgent.callfunc("logDebug", msg, {})
    m.global.datadogLogsAgent.callfunc("logInfo", msg, {})
    m.global.datadogLogsAgent.callfunc("logNotice", msg, {})
    m.global.datadogLogsAgent.callfunc("logWarn", msg, {})
    m.global.datadogLogsAgent.callfunc("logError", msg, {})
    m.global.datadogLogsAgent.callfunc("logCritical", msg, {})
    m.global.datadogLogsAgent.callfunc("logAlert", msg, {})
    m.global.datadogLogsAgent.callfunc("logEmergency", msg, {})
    ```
   

5. (Optional) Provide an Associative Array alongside your log message to add attributes to the emitted log. Each entry of the AssocArray is added as an attribute.

   ```brightscript
    m.global.datadogLogsAgent.callfunc(
        "logInfo", 
        "Video started", 
        { video_id: 42, video_type: "advert"}
    )
   ```

## Batch collection

All the logs are first stored on the local device in batches. Each batch follows the intake specification. They are sent as soon as network is available. If the network is not available while your channel is opened, or if an upload of data fails, the batch is kept until it can be sent successfully.

To ensure the SDK doesn't use too much disk space, the data on the disk is automatically discarded if it gets too old.

**Note**: Before data is uploaded to Datadog, it is stored in cleartext in your channel's [cache directory][8], meaning that this data can't be read by other applications. The OS can evict the data at any time, which may result in data loss in some rare cases.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-sdk-roku
[2]: /account_management/api-app-keys/#client-tokens
[3]: /account_management/api-app-keys/#api-keys
[4]: /logs/processing/attributes_naming_convention/
[5]: /tagging/
[6]: /real_user_monitoring/mobile_and_tv_monitoring/setup/roku/?tab=us
[7]: https://github.com/DataDog/dd-sdk-roku/releases
[8]: https://developer.roku.com/fr-fr/docs/developer-program/getting-started/architecture/file-system.md#cachefs
