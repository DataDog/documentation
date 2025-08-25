---
title: DogStatsD Origin Detection
description: Learn how the DogStatsD client can annotate metrics so origin tags can be added
further_reading:
    - link: 'developers/dogstatsd'
      tag: 'Documentation'
      text: 'Introduction to DogStatsD'
    - link: 'developers/libraries'
      tag: 'Documentation'
      text: 'Official and Community created API and DogStatsD client libraries'
---

Origin detection is supported in Agent v6.10.0+, and allows DogStatsD to detect 
where the container metrics come from and automatically tag metrics. When this 
mode is enabled, all metrics received through UDP are tagged by the same pod 
tags as Autodiscovery metrics.

The following tags are added for [Docker][2] and for [Kubernetes][1].
It is important to note that [cardinality][4] is a key concept when it comes to billing.

Origin detection is achieved in a number of ways:

#### CGroups

On Linux the container ID can be extracted from `procfs` entries related to
`cgroups`. The client reads from `/proc/self/cgroup` or `/proc/self/mountinfo`
to attempt to parse the container id. 

In cgroup v2, the container ID can be inferred by resolving the cgroup path from
`/proc/self/cgroup`, combining it with the cgroup mount point from
`/proc/self/mountinfo`. The resulting directory's inode is sent to the agent.
Provided the agent is on the same node as the client, this can be used to
identify the pod's UID.

#### Over UDP 

To enable origin detection over UDP, add the following lines to your application
manifest:

```yaml
env:
- name: DD_ENTITY_ID
    valueFrom:
      fieldRef:
        fieldPath: metadata.uid
```

The DogStatsD client attaches an internal tag, `entity_id`. The value of this
tag is the content of the `DD_ENTITY_ID` environment variable, which is the
pod's UID. 

#### DD_EXTERNAL_ENV

If the pod is annotated with the label:

```
admission.datadoghq.com/enabled: "true"
```

The [admissions controller][3] injects an environment variable `DD_EXTERNAL_ENV`. 
The value of this is sent in a field with the metric which can be used by the 
agent to determine the metrics origin.

#### Tag cardinality

The cardinality can be specified globally by setting the `DD_CARDINALITY`
environment or by passing a `'cardinality'` field to the constructor. 
Cardinality can also be specified per metric by passing the value in the 
`cardinality` parameter. Valid values for this parameter are `"none"`, `"low"`,
`"orchestrator"` or `"high"`.

<div class="alert alert-warning">
  By default, origin detection is enabled in all DogStatsD clients, but it is not enabled by default in the Datadog Agent. To disable origin detection in a client either set the environment variable `DD_ORIGIN_DETECTION_ENABLED=false` or configure the library to disable origin detection - see the documentation for the specific DogStatsD library you're using.
</div>

**Note**: Origin detection is not supported for Fargate environments.

To enable the feature in the Agent, set the `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT` environment variable to `true`.

**Note:** For UDP, `pod_name` tags are not added by default to avoid creating too many [custom metrics][5].

[1]: https://docs.datadoghq.com/containers/kubernetes/tag
[2]: https://docs.datadoghq.com/containers/docker/tag
[3]: https://docs.datadoghq.com/containers/cluster_agent/admission_controller
[4]: /getting_started/tagging/assigning_tags/?tab=containerizedenvironments#tags-cardinality
[5]: /metrics/custom_metrics/
