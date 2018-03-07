---
title: FluentD Log collection
kind: Documentation
description: "Configure FluentD to gather logs from your host, containers & services."
---

As long as you can forward your FluentD logs over tcp/udp to a specific port, you can use that approach to forward your FluentD logs to your Datadog agent. But another option is to use the [Datadog FluentD plugin](http://www.rubydoc.info/gems/fluent-plugin-datadog/0.9.6) to forward the logs directly from FluentD to your Datadog account. 

In order to get the best use out of your logs in Datadog, it is important to have the proper metadata associated with your logs (including hostname and source). For the current version of the Datadog FluentD plugin, you have to include this metadata in the logs that you're sending to FluentD, using the following format:

```
{
    "syslog.hostname": "myhostname",
    "syslog.appname": "myappname",
    "ddsource": "mysourcename"
}
```