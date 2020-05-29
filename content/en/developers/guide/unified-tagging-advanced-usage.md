---
title: Unified Tagging Advanced Usage Guide
kind: guide
aliases:
  - /developers/guide/unified-tagging-advanced-usage
---

## Overview

This guide suggests ways to configure and migrate to [unified service tagging][1] based on specific use cases.

## Using Standard Labels

The standard labels can be seen as an alternative to using environment variables, particularly for applications that will not benefit from using those variables in their runtime. 3rd party software like Redis, MySQL, and Nginx are a few examples. Since these services still generate infrastructure metrics and data from integration checks, it's valuable to have all of that data tagged with `env`, `service`, and `version`.

If you do not use Docker as your container runtime on Kubernetes then you will have to use the standard labels to tag Kubernetes metrics. The Datadog Agent does not yet support the extraction of environment variables as tags from container runtimes outside of Docker.

Lastly, if you would like to tag Kubernetes state metrics with `env`, `service`, and `version` then the standard labels offer the easiest way. The DD environment variables of a container cannot be used by the Agent to tag these metrics, so the labels are a more natural option.

## Why do I need to declare env as a label if it's already defined in my agent?
Configuring env closer to the source of the data (e.g., APM traces, logs) helps to avoid inconsistencies where the Agent env might be different. Making env part of the service's configuration guarantees a service-centric source of truth.

## I already use the general tags annotation in Kubernetes. Why should I use the new standard labels?
You can of course continue to use these general tags. However, using the specific labels has a few benefits:
You can directly reference them for environment variable injection via the Kubernetes downward API.
The service standard label can simplify the definition of service for logs.

## What if I have multiple containers that run inside my services' pods?
Since the DD environment variables are injected at the container level, they can be different from container to container. However, if you want to use the standard labels as well for specific containers, then you will need to use their container-specific variants:

```yaml
tags.datadoghq.com/<container>.env
tags.datadoghq.com/<container>.service
tags.datadoghq.com/<container>.version
```

## What if I want/have different tags for env/service/version?
You can continue to use these tags as you have them configured today. We have standardized on env, service, and version to make tagging consistent and simple. If you'd like to achieve a unified tagging experience with your own custom tags, there are some options available to you.

But note that while some products support arbitrary tags, others have more specific expectations. As such, navigation between products might be difficult if one data source has a tag that another does not have or does not support.

Why do I see a different version in my spans if I've set DD_VERSION?
You might be hard-coding the version tag in your spans. To address this issue, rename the span tag to something else (e.g., payload_version). That way it won't conflict with setting the service's version for the version tag.

### Containerized environments

The standard labels in containerized environments are automatically mapped to their plain tag equivalents. But through Autodiscovery this are [broader tagging options][1] available, whether it's defining a list of tags to associate with a container or mapping labels/annotations to specific tags.

#### Metrics

Since tags can be appended to data points, you have a lot of freedom in setting desired tags. Autodiscovered tags are automatically added to all metrics collected.

#### APM

`env` and `service` are core tags in APM, so it is not possible to replace them with differently named tags. However, APM does allow for data to be [aggregated along more primary tags] than just `env`. Since host tags are added to traces and trace metrics, they can be used as well (e.g., availability-zone).

Trace metrics also have a specific [whitelist of tags]. Container tags are not included.

Autodiscovered tags associated with containers are added to `container_info` in span metadata.

#### Logs
Similar to APM, service is a core tag that is used to help organize logs data. Additionally, it is not possible to link from a log to the related APM service without it.

Similar to metrics however, Autodiscovered tags for the container as well as host tags for the agent are added to all logs.

You also have the ability to add custom fields to your logs in-code, which can be mapped to tags or attributes downstream in a [Datadog log processing pipeline].

### Non-containerized

While host tags can be used to conveniently add service to all data sources, we recommend against setting it as a host tag - especially if you have multiple APM services that run on a host.

We'd recommend taking advantage of each product's options for tagging.

[1]: /getting_started/tagging/unified_service_tagging
