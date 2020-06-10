---
title: Unified Tagging Advanced Usage Guide
kind: guide
aliases:
  - /developers/guide/unified-tagging-advanced-usage
---

## Overview

This guide suggests ways to configure and migrate to [unified service tagging][1] based on specific use cases.

## Using Custom Tags

You can continue to use the `env` `service` and `version` tags as they are configured for unified service tagging. However, if you'd like to achieve a unified tagging experience with your own custom tags, there are several options available which are listed below.

**Note**: While some products support arbitrary tags, others have more specific expectations. As such, navigation between products might be difficult if one data source has a tag that another does not have or does not support.

### Containerized environments

#### Metrics

Since tags can be appended to data points, you have a lot of freedom in setting desired tags. Autodiscovered tags are automatically added to all metrics collected.

#### APM

`env` and `service` are core tags in APM, so it is not possible to replace them with differently named tags. However, APM does allow for data to be [aggregated along more primary tags][4] than just `env`. Since host tags are added to traces and trace metrics, they can be used as well (e.g., availability-zone).

Autodiscovered tags associated with containers are added to `container_info` in span metadata. However, these container tags are not part of the [whitelisted tags][2] for trace metrics.


#### Logs

Similar to APM, `service` is a core tag that is used to help organize logs data. Additionally, it is not possible to link from a log to the related APM service without it.

Similar to metrics, however, Autodiscovered tags for the container as well as host tags for the agent are added to all logs.

You also have the ability to add custom fields to your logs in-code, which can be mapped to tags or attributes downstream in a [Datadog log processing pipeline][3].

## Using Standard Labels

We recommend using both standard labels and environment variables. However, standard labels can be seen as an alternative to using environment variables, particularly for applications that will not benefit from using those variables in their runtime. 3rd party software like Redis, MySQL, and Nginx are a few examples. Since these services still generate infrastructure metrics and data from integration checks, it's valuable to have all of that data tagged with `env`, `service`, and `version`.

If you would like to tag Kubernetes state metrics with `env`, `service`, and `version` then the standard labels offer the easiest way. The `DD` environment variables of a container cannot be used by the Agent to tag these metrics, so the labels are a more natural option.

### Declaring environment as a label

Configuring `env` closer to the source of the data (e.g., APM traces, logs) helps to avoid inconsistencies where the Agent `env` might be different. Making `env` part of the service's configuration guarantees a service-centric source of truth.

### Using standard labels with existing Kubernetes tags annotation

Kubernetes users can continue to use these general tags. However, using the specific labels has a few benefits:

- You can directly reference them for environment variable injection via the Kubernetes downward API.
- The service standard label can simplify the definition of service for logs.

### Using standard labels for specific containers

Since the `DD` environment variables are injected at the container level, they can differ from container to container. However, if you want to use the standard labels as well for specific containers, then you will need to use their container-specific variants:

```yaml
tags.datadoghq.com/<container>.env
tags.datadoghq.com/<container>.service
tags.datadoghq.com/<container>.version
```

[1]: /getting_started/tagging/unified_service_tagging
[2]: /metrics/distributions/#customize-tagging
[3]: /logs/processing/pipelines/
[4]: /tracing/guide/setting_primary_tags_to_scope/
