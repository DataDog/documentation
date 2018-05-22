---
title: FluentD Log collection
kind: Documentation
description: "Configure FluentD to gather logs from your host, containers & services."
---

As long as you can forward your FluentD logs over tcp/udp to a specific port, you can use that approach to forward your FluentD logs to your Datadog agent. But another option is to use the [Datadog FluentD plugin][1] to forward the logs directly from FluentD to your Datadog account. 

## Add metadata to your logs

In order to get the best use out of your logs in Datadog, it is important to have the proper metadata associated with your logs (including hostname and source). By default, the hostname and timestamp should be properly remapped thanks to our default [remapping for reserved attributes][2]. 

### Source

Add the `ddsource` attribute in your logs in order to trigger the [integration automatic setup][3] in Datadog.

```
{
    "ddsource": "<MY_SOURCE_VALUE>"
}
```

### Custom tags

[Host tags][5] are automatically set on your logs if there is a matching hostname in your [infrastructure list][4]. Use the `ddtags` attribute to add custom tags to your logs:

```
{
    "ddtags": "env:test,<KEY:VALUE>"
}
```

[1]: http://www.rubydoc.info/gems/fluent-plugin-datadog/0.9.6
[2]: /logs/#edit-reserved-attributes
[3]: /logs/processing/#integration-pipelines
[4]: https://app.datadoghq.com/infrastructure
[5]: /getting_started/tagging/assigning_tags/
