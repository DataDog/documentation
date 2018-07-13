---
title: FluentD Log collection
kind: Documentation
description: "Configure FluentD to gather logs from your host, containers & services."
---

As long as you can forward your FluentD logs over tcp/udp to a specific port, you can use that approach to forward your FluentD logs to your Datadog agent. But another option is to use the [Datadog FluentD plugin][1] to forward the logs directly from FluentD to your Datadog account. 

## Add metadata to your logs

In order to get the best use out of your logs in Datadog, it is important to have the proper metadata associated with your logs (including hostname and source). By default, the hostname and timestamp should be properly remapped thanks to our default [remapping for reserved attributes][2]. 

### Source and Custom tags

Add the `ddsource` attribute with [the name of the log integration][6] in your logs in order to trigger the [integration automatic setup][3] in Datadog.
[Host tags][5] are automatically set on your logs if there is a matching hostname in your [infrastructure list][4]. Use the `ddtags` attribute to add custom tags to your logs:

Setup Example:

```
# Match events tagged with "datadog.**" and
# send them to Datadog
<match datadog.**>

  @type datadog
  @id awesome_agent
  api_key <your_api_key>

  # Optional
  include_tag_key true
  tag_key 'tag'

  # Optional tags
  dd_source '<INTEGRATION_NAME>' 
  dd_tags '<KEY1:VALUE1>,<KEY2:VALUE2>'
  dd_sourcecategory '<SOURCE_CATEGORY>'

</match>
```

### Kubernetes and Docker tags

Datadog tags are critical to be able to jump from one part of the product to another. Having the right metadata associated with your logs is therefore important in jumping from a container view or any container metrics to the most related logs.

If your logs contain any of the following attributes, these attributes are automatically added as Datadog tags on your logs:

* `kubernetes.container_image`
* `kubernetes.container_name`
* `kubernetes.namespace_name`
* `kubernetes.pod_name`
* `docker.container_id`

While the Datadog Agent collects Docker and Kubernetes metadata automatically, FluentD requires a plugin for this. We recommend using [fluent-plugin-kubernetes_metadata_filter][7] to collect this metadata.

Configuration example:

```
# Collect metadata for logs tagged with "kubernetes.**"
 <filter kubernetes.*>
   type kubernetes_metadata
 </filter>
```

[1]: http://www.rubydoc.info/gems/fluent-plugin-datadog/
[2]: /logs/#edit-reserved-attributes
[3]: /logs/processing/#integration-pipelines
[4]: https://app.datadoghq.com/infrastructure
[5]: /getting_started/tagging/assigning_tags/
[6]: https://docs.datadoghq.com/integrations/#cat-log-collection
[7]: https://github.com/fabric8io/fluent-plugin-kubernetes_metadata_filter
