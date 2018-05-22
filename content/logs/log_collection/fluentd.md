---
title: FluentD Log collection
kind: Documentation
description: "Configure FluentD to gather logs from your host, containers & services."
---

As long as you can forward your FluentD logs over tcp/udp to a specific port, you can use that approach to forward your FluentD logs to your Datadog agent. But another option is to use the [Datadog FluentD plugin][1] to forward the logs directly from FluentD to your Datadog account. 

## Add metadata to your logs

### Source

In order to get the best use out of your logs in Datadog, it is important to have the proper metadata associated with your logs (including hostname and source). To set the source (Datadog integration name) on your logs in order to benefit from all the integration automatic setup in your platform, add the following attribute in your logs:

```
{
    "ddsource": "integrationname"
}
```

### Custom tags

Host tags are automatically set on your logs if there is a matching hostname in your infrastructure. That said custom tags can be added just for logs thanks to the `ddtags` attribute:

```
{
    "ddtags": "env:test,key2:value2"
}
```

[1]: http://www.rubydoc.info/gems/fluent-plugin-datadog/0.9.6
