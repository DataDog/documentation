---
title: Unified Tagging Advanced Usage Guide

---

## Overview

This guide shows ways to configure and migrate to [unified service tagging][1] based on specific use cases.

## Custom tags

You can continue to use the `env` `service` and `version` tags as they are configured for unified service tagging. However, if you'd like to achieve a unified tagging experience with your own custom tags, there are several options available which are listed below.

**Note**: While some products support arbitrary tags, others have more specific expectations. As such, navigation between products might be difficult if one data source has a tag that another does not have or support.

### Containerized environments

#### Metrics

Since tags can be appended to data points, you have a lot of freedom in setting desired tags. Autodiscovered tags are automatically added to all metrics collected.

#### APM

`env` and `service` are core tags in APM, so it is not possible to replace them with differently named tags. However, APM does allow for data to be [aggregated along more primary tags][2] than just `env`. Host tags, such as `availability-zone`, that are added to traces and trace metrics can be used as well.

Autodiscovered tags associated with containers are added to `container_info` in span metadata. However, these container tags are not part of the [included list of tags][3] for trace metrics.

#### Logs

Similar to APM, `service` is a core tag that is used to help organize log data. Additionally, it is not possible to link from a log to the related APM service without it.

Similar to metrics, Autodiscovered tags for a container and host tags for the Agent are added to all logs.

Also, you can add custom fields to your logs in-code that can be mapped to tags or attributes downstream in a [Datadog log processing pipeline][4].

## Standard labels

Datadog recommends using both standard labels and environment variables. However, standard labels can be seen as an alternative to using environment variables, particularly for applications that do not benefit from using those variables in their runtime. Third party software like Redis, MySQL, and Nginx are a few examples. Since these services still generate infrastructure metrics and data from integration checks, it's valuable to have all of that data tagged with `env`, `service`, and `version`.

If you would like to tag Kubernetes state metrics with `env`, `service`, and `version` then the standard labels offer the easiest way. The `DD` environment variables of a container cannot be used by the Agent to tag these metrics, so the labels are a more natural option.

### Declaring environment as a label

Configuring `env` closer to the source of the data, such as APM traces or logs, helps to avoid inconsistencies where the Agent `env` might be different. Making `env` part of the service's configuration guarantees a service-centric source of truth.

### Using standard labels with existing Kubernetes tags annotation

Kubernetes users can continue to use these general tags. However, using the specific labels has a few benefits:

- You can directly reference them for environment variable injection with the Kubernetes downward API.
- The service standard label can simplify the definition of service for logs.

### Using standard labels for specific containers

Since the `DD` environment variables are injected at the container level, they can differ from container to container. However, if you want to use the standard labels as well for specific containers, then you need to use the container-specific variants:

```yaml
tags.datadoghq.com/<container>.env
tags.datadoghq.com/<container>.service
tags.datadoghq.com/<container>.version
```

### Standard tags injection

The [Datadog Admission Controller][5] converts standard tag labels into environment variables, and injects them into the user's application pod template. These environment variables are used by the APM tracers, DogStatsD clients, and the Datadog Agent. The Datadog Agent maps these values to tags:

```
tags.datadoghq.com/version -> DD_VERSION
tags.datadoghq.com/env -> DD_ENV
tags.datadoghq.com/service -> DD_SERVICE
```

The admission controller looks for this information in the pod labels. If not found at the pod level, the admission controller tries to get the information from the pod owner object's labels (deployment, job, cron job, statefulset).

#### Notes

- The admission controller needs to be deployed and configured before the creation of new application pods. It cannot update pods that already exist.
- The admission controller doesn't inject the environment variables `DD_VERSION, DD_ENV`, and `DD_SERVICE` if they already exist.
- To disable the admission controller injection feature, use the Cluster Agent configuration: `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false`


[1]: /getting_started/tagging/unified_service_tagging
[2]: /tracing/guide/setting_primary_tags_to_scope/
[3]: /metrics/distributions/#customize-tagging
[4]: /logs/log_configuration/pipelines
[5]: /agent/cluster_agent/admission_controller/
