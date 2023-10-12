---
title: Kubernetes State Metrics Core
name: kubernetes_state_core
kind: integration
description: "Monitor the health of the workload running on your Kubernetes cluster. Track the status of your Kubernetes objects, correlate your microservice metrics, and more."
short_description: "Track the status of your Kubernetes objects, correlate your microservice metrics, and more."
categories:
    - cloud
    - configuration & deployment
    - containers
    - orchestration
doc_link: /integrations/kubernetes_state_core/
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/kubernetes_state_core.md']
has_logo: true
integration_title: Kubernetes State Metrics Core
is_public: true
public_title: Datadog-Kubernetes State Metrics Core Integration
supported_os:
    - linux
    - mac_os
    - windows
# forcing integration_id to kube-state-metrics so it loads kubernetes svg
integration_id: "kube-state-metrics"
further_reading:
    - link: "https://www.datadoghq.com/blog/engineering/our-journey-taking-kubernetes-state-metrics-to-the-next-level/"
      tag: "Blog"
      text: "Our Journey Taking Kubernetes State Metrics to the Next Level"
algolia:
  tags: ["ksm", "ksm core"]
---

## Overview

Get metrics from Kubernetes service in real-time to:

- Visualize and monitor Kubernetes states.
- Be notified about Kubernetes failovers and events.

The Kubernetes State Metrics Core check leverages [kube-state-metrics version 2+][1] and includes major performance and tagging improvements compared to the legacy `kubernetes_state` check.

As opposed to the legacy check, with the Kubernetes State Metrics Core check, you no longer need to deploy `kube-state-metrics` in your cluster.

Kubernetes State Metrics Core provides a better alternative to the legacy `kubernetes_state` check as it offers more granular metrics and tags. See the [Major Changes][2] and [Data Collected][3] for more details.

## Setup

### Installation

The Kubernetes State Metrics Core check is included in the [Datadog Cluster Agent][4] image, so you don't need to install anything else on your Kubernetes servers.

### Requirements

- Datadog Cluster Agent v1.12+

### Configuration

{{< tabs >}}
{{% tab "Helm" %}}

In your Helm `values.yaml`, add the following:

```yaml
datadog:
  # (...)
  kubeStateMetricsCore:
    enabled: true
```

{{% /tab %}}
{{% tab "Operator" %}}

To enable the `kubernetes_state_core` check, the setting `spec.features.kubeStateMetricsCore.enabled` must be set to `true` in the DatadogAgent resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  features:
    kubeStateMetricsCore:
      enabled: true
```

Note: Datadog Operator v0.7.0 or greater is required.

{{% /tab %}}
{{< /tabs >}}

## Migration from kubernetes_state to kubernetes_state_core

### Tags removal

In the original `kubernetes_state` check, several tags have been flagged as deprecated and replaced by new tags. To determine your migration path, check which tags are submitted with your metrics.

In the `kubernetes_state_core` check, only the non-deprecated tags are submitted. Before migrating from `kubernetes_state` to `kubernetes_state_core`, verify that only official tags are used in monitors and dashboards.

Here is the mapping between deprecated tags and the official tags that have replaced them:

| deprecated tag        | official tag                |
|-----------------------|-----------------------------|
| cluster_name          | kube_cluster_name           |
| container             | kube_container_name         |
| cronjob               | kube_cronjob                |
| daemonset             | kube_daemon_set             |
| deployment            | kube_deployment             |
| hpa                   | horizontalpodautoscaler     |
| image                 | image_name                  |
| job                   | kube_job                    |
| job_name              | kube_job                    |
| namespace             | kube_namespace              |
| phase                 | pod_phase                   |
| pod                   | pod_name                    |
| replicaset            | kube_replica_set            |
| replicationcontroller | kube_replication_controller |
| statefulset           | kube_stateful_set           |

### Backward incompatibility changes

The Kubernetes State Metrics Core check is not backward compatible, be sure to read the changes carefully before migrating from the legacy `kubernetes_state` check.

`kubernetes_state.node.by_condition`
: A new metric with node name granularity. The legacy metric `kubernetes_state.nodes.by_condition` is deprecated in favor of this one. **Note:** This metric is backported into the Legacy check, where both metrics (it and the legacy metric it replaces) are available. 

`kubernetes_state.persistentvolume.by_phase`
: A new metric with persistentvolume name granularity. It replaces `kubernetes_state.persistentvolumes.by_phase`.

`kubernetes_state.pod.status_phase`
: The metric is tagged with pod level tags, like `pod_name`.

`kubernetes_state.node.count`
: The metric is not tagged with `host` anymore. It aggregates the nodes count by `kernel_version` `os_image` `container_runtime_version` `kubelet_version`.

`kubernetes_state.container.waiting` and `kubernetes_state.container.status_report.count.waiting`
: These metrics no longer emit a 0 value if no pods are waiting. They only report non-zero values.

`kube_job`
: In `kubernetes_state`, the `kube_job` tag value is the `CronJob` name if the `Job` had `CronJob` as an owner, otherwise it is the `Job` name. In `kubernetes_state_core`, the `kube_job` tag value is always the `Job` name, and a new `kube_cronjob` tag key is added with the `CronJob` name as the tag value. When migrating to `kubernetes_state_core`, it's recommended to use the new tag or `kube_job:foo*`, where `foo` is the `CronJob` name, for query filters.

`kubernetes_state.job.succeeded`
: In `kubernetes_state`, the `kuberenetes.job.succeeded` was `count` type. In `kubernetes_state_core` it is `gauge` type. 

### Node-level tag assignment

Host or node-level tags no longer appear on cluster-centric metrics. Only metrics relative to an actual node in the cluster, like `kubernetes_state.node.by_condition` or `kubernetes_state.container.restarts`, continue to inherit their respective host or node level tags. 

To add tags globally, use the `DD_TAGS` environment variable, or use the respective Helm or Operator configurations. Instance-only level tags can be specified by mounting a custom `kubernetes_state_core.yaml` into the Cluster Agent.

{{< tabs >}}

{{% tab "Helm" %}}
```yaml
datadog:
  kubeStateMetricsCore:
    enabled: true
  tags: 
    - "<TAG_KEY>:<TAG_VALUE>"
```
{{% /tab %}}
{{% tab "Operator" %}}
```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    tags:
      - "<TAG_KEY>:<TAG_VALUE>"
  features:
    kubeStateMetricsCore:
      enabled: true
```
{{% /tab %}}
{{< /tabs >}}

Metrics like `kubernetes_state.container.memory_limit.total` or `kubernetes_state.node.count` are aggregate counts of groups within a cluster, and host or node-level tags are not added.

### Legacy check

{{< tabs >}}
{{% tab "Helm" %}}

Enabling `kubeStateMetricsCore` in your Helm `values.yaml` configures the Agent to ignore the auto configuration file for legacy `kubernetes_state` check. The goal is to avoid running both checks simultaneously.

If you still want to enable both checks simultaneously for the migration phase, disable the `ignoreLegacyKSMCheck` field in your `values.yaml`.

**Note**: `ignoreLegacyKSMCheck` makes the Agent only ignore the auto configuration for the legacy `kubernetes_state` check. Custom `kubernetes_state` configurations need to be removed manually.

The Kubernetes State Metrics Core check does not require deploying `kube-state-metrics` in your cluster anymore, you can disable deploying `kube-state-metrics` as part of the Datadog Helm Chart. To do this, add the following in your Helm `values.yaml`:

```yaml
datadog:
  # (...)
  kubeStateMetricsEnabled: false
```

{{% /tab %}}
{{< /tabs >}}

**Important Note:** The Kubernetes State Metrics Core check is an alternative to the legacy `kubernetes_state` check. Datadog recommends not enabling both checks simultaneously to guarantee consistent metrics.

## Data Collected

### Metrics

`kubernetes_state.apiservice.count`
: Number of Kubernetes API services.

`kubernetes_state.apiservice.condition`
: The condition of this API service. Tags:`apiservice` `condition` `status`.

`kubernetes_state.configmap.count`
: Number of ConfigMaps. Tags:`kube_namespace`.

`kubernetes_state.daemonset.count`
: Number of DaemonSets. Tags:`kube_namespace`.

`kubernetes_state.daemonset.scheduled`
: The number of nodes running at least one daemon pod and are supposed to. Tags:`kube_daemon_set` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.daemonset.desired`
: The number of nodes that should be running the daemon pod. Tags:`kube_daemon_set` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.daemonset.misscheduled`
: The number of nodes running a daemon pod but are not supposed to. Tags:`kube_daemon_set` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.daemonset.ready`
: The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and ready. Tags:`kube_daemon_set` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.daemonset.updated`
: The total number of nodes that are running updated daemon pod. Tags:`kube_daemon_set` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.daemonset.daemons_unavailable`
: The number of nodes that should be running the daemon pod and have none of the daemon pod running and available. Tags:`kube_daemon_set` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.daemonset.daemons_available`
: The number of nodes that should be running the daemon pod and have one or more of the daemon pod running and available. Tags:`kube_daemon_set` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.count`
: Number of deployments. Tags:`kube_namespace`.

`kubernetes_state.deployment.paused`
: Whether the deployment is paused and will not be processed by the deployment controller. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.replicas_desired`
: Number of desired pods for a deployment. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.rollingupdate.max_unavailable`
: Maximum number of unavailable replicas during a rolling update of a deployment. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.rollingupdate.max_surge`
: Maximum number of replicas that can be scheduled above the desired number of replicas during a rolling update of a deployment. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.replicas`
: The number of replicas per deployment. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.replicas_available`
: The number of available replicas per deployment. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.replicas_ready	`
: The number of ready replicas per deployment. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.replicas_unavailable`
: The number of unavailable replicas per deployment. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.replicas_updated`
: The number of updated replicas per deployment. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.deployment.condition`
: The current status conditions of a deployment. Tags:`kube_deployment` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.endpoint.count`
: Number of endpoints. Tags:`kube_namespace`.

`kubernetes_state.endpoint.address_available`
: Number of addresses available in endpoint. Tags:`kube_endpoint` `kube_namespace`.

`kubernetes_state.endpoint.address_not_ready`
: Number of addresses not ready in endpoint. Tags:`kube_endpoint` `kube_namespace`.

`kubernetes_state.namespace.count`
: Number of namespaces. Tags:`phase`.

`kubernetes_state.node.count`
: Number of nodes. Tags:`kernel_version` `os_image` `container_runtime_version` `kubelet_version`.

`kubernetes_state.node.cpu_allocatable`
: The allocatable CPU of a node that is available for scheduling. Tags:`node` `resource` `unit`.

`kubernetes_state.node.memory_allocatable`
: The allocatable memory of a node that is available for scheduling. Tags:`node` `resource` `unit`.

`kubernetes_state.node.pods_allocatable`
: The allocatable memory of a node that is available for scheduling. Tags:`node` `resource` `unit`.

`kubernetes_state.node.ephemeral_storage_allocatable`
: The allocatable ephemeral-storage of a node that is available for scheduling. Tags:`node` `resource` `unit`.

`kubernetes_state.node.network_bandwidth_allocatable`
: The allocatable network bandwidth of a node that is available for scheduling. Tags:`node` `resource` `unit`.

`kubernetes_state.node.cpu_capacity`
: The CPU capacity of a node. Tags:`node` `resource` `unit`.

`kubernetes_state.node.memory_capacity`
: The memory capacity of a node. Tags:`node` `resource` `unit`.

`kubernetes_state.node.pods_capacity`
: The pods capacity of a node. Tags:`node` `resource` `unit`.

`kubernetes_state.node.ephemeral_storage_capacity`
: The ephemeral-storage capacity of a node. Tags:`node` `resource` `unit`.

`kubernetes_state.node.network_bandwidth_capacity`
: The network bandwidth capacity of a node. Tags:`node` `resource` `unit`.

`kubernetes_state.node.by_condition`
: The condition of a cluster node. Tags:`condition` `node` `status`.

`kubernetes_state.node.status`
: Whether the node can schedule new pods. Tags:`node` `status`.

`kubernetes_state.node.age`
: The time in seconds since the creation of the node. Tags:`node`.

`kubernetes_state.container.terminated`
: Describes whether the container is currently in a terminated state. Tags:`kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` from standard labels).

`kubernetes_state.container.cpu_limit`
: The value of CPU limit by a container. Tags:`kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` from standard labels).

`kubernetes_state.container.memory_limit`
: The value of memory limit by a container. Tags:`kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` from standard labels).

`kubernetes_state.container.network_bandwidth_limit`
: The value of network bandwidth limit by a container. Tags:`kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` from standard labels).

`kubernetes_state.container.cpu_requested`
: The value of CPU requested by a container. Tags:`kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` from standard labels).

`kubernetes_state.container.memory_requested`
: The value of memory requested by a container. Tags:`kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` from standard labels).

`kubernetes_state.container.network_bandwidth_requested`
: The value of network bandwidth requested by a container. Tags:`kube_namespace` `pod_name` `kube_container_name` `node` `resource` `unit` (`env` `service` `version` from standard labels).

`kubernetes_state.container.ready`
: Describes whether the containers readiness check succeeded. Tags:`kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` from standard labels).

`kubernetes_state.container.restarts`
: The number of container restarts per container. Tags:`kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` from standard labels).

`kubernetes_state.container.running`
: Describes whether the container is currently in a running state. Tags:`kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` from standard labels).

`kubernetes_state.container.waiting`
: Describes whether the container is currently in a waiting state. Tags:`kube_namespace` `pod_name` `kube_container_name` (`env` `service` `version` from standard labels).

`kubernetes_state.container.status_report.count.waiting`
: Describes the reason the container is currently in a waiting state. Tags:`kube_namespace` `pod_name` `kube_container_name` `reason` (`env` `service` `version` from standard labels).

`kubernetes_state.container.status_report.count.terminated`
: Describes the reason the container is currently in a terminated state. Tags:`kube_namespace` `pod_name` `kube_container_name` `reason` (`env` `service` `version` from standard labels).

`kubernetes_state.container.status_report.count.waiting`
: Describes the reason the container is currently in a waiting state. Tags:`kube_namespace` `pod_name` `kube_container_name` `reason` (`env` `service` `version` from standard labels).

`kubernetes_state.container.status_report.count.terminated`
: Describes the reason the container is currently in a terminated state. Tags:`kube_namespace` `pod_name` `kube_container_name` `reason` (`env` `service` `version` from standard labels).

`kubernetes_state.crd.count`
: Number of custom resource definition.

`kubernetes_state.crd.condition`
: The condition of this custom resource definition. Tags:`customresourcedefinition` `condition` `status`.

`kubernetes_state.pod.ready`
: Describes whether the pod is ready to serve requests. Tags:`node` `kube_namespace` `pod_name` `condition` (`env` `service` `version` from standard labels).

`kubernetes_state.pod.scheduled`
: Describes the status of the scheduling process for the pod. Tags:`node` `kube_namespace` `pod_name` `condition` (`env` `service` `version` from standard labels).

`kubernetes_state.pod.volumes.persistentvolumeclaims_readonly`
: Describes whether a persistentvolumeclaim is mounted read only. Tags:`node` `kube_namespace` `pod_name` `volume` `persistentvolumeclaim` (`env` `service` `version` from standard labels).

`kubernetes_state.pod.unschedulable`
: Describes the unschedulable status for the pod. Tags:`kube_namespace` `pod_name` (`env` `service` `version` from standard labels).

`kubernetes_state.pod.status_phase`
: The pods current phase. Tags:`node` `kube_namespace` `pod_name` `pod_phase` (`env` `service` `version` from standard labels).

`kubernetes_state.pod.age`
: The time in seconds since the creation of the pod. Tags:`node` `kube_namespace` `pod_name` `pod_phase` (`env` `service` `version` from standard labels).

`kubernetes_state.pod.uptime`
: The time in seconds since the pod has been scheduled and acknowledged by the Kubelet. Tags:`node` `kube_namespace` `pod_name` `pod_phase` (`env` `service` `version` from standard labels).

`kubernetes_state.pod.count`
: Number of Pods. Tags:`node` `kube_namespace` `kube_<owner kind>`.

`kubernetes_state.persistentvolumeclaim.status`
: The phase the persistent volume claim is currently in. Tags:`kube_namespace` `persistentvolumeclaim` `phase` `storageclass`.

`kubernetes_state.persistentvolumeclaim.access_mode`
: The access mode(s) specified by the persistent volume claim. Tags:`kube_namespace` `persistentvolumeclaim` `access_mode` `storageclass`.

`kubernetes_state.persistentvolumeclaim.request_storage`
: The capacity of storage requested by the persistent volume claim. Tags:`kube_namespace` `persistentvolumeclaim` `storageclass`.

`kubernetes_state.persistentvolume.capacity`
: Persistentvolume capacity in bytes. Tags:`persistentvolume` `storageclass`.

`kubernetes_state.persistentvolume.by_phase`
: The phase indicates if a volume is available, bound to a claim, or released by a claim. Tags:`persistentvolume` `storageclass` `phase`.

`kubernetes_state.pdb.pods_healthy`
: Current number of healthy pods. Tags:`kube_namespace` `poddisruptionbudget`.

`kubernetes_state.pdb.pods_desired`
: Minimum desired number of healthy pods. Tags:`kube_namespace` `poddisruptionbudget`.

`kubernetes_state.pdb.disruptions_allowed`
: Number of pod disruptions that are currently allowed. Tags:`kube_namespace` `poddisruptionbudget`.

`kubernetes_state.pdb.pods_total`
: Total number of pods counted by this disruption budget. Tags:`kube_namespace` `poddisruptionbudget`.

`kubernetes_state.secret.count`
: Number of Secrets. Tags:`kube_namespace`

`kubernetes_state.secret.type`
: Type about secret. Tags:`kube_namespace` `secret` `type`.

`kubernetes_state.replicaset.count`
: Number of ReplicaSets Tags:`kube_namespace` `kube_deployment`.

`kubernetes_state.replicaset.replicas_desired`
: Number of desired pods for a ReplicaSet. Tags:`kube_namespace` `kube_replica_set` (`env` `service` `version` from standard labels).

`kubernetes_state.replicaset.fully_labeled_replicas`
: The number of fully labeled replicas per ReplicaSet. Tags:`kube_namespace` `kube_replica_set` (`env` `service` `version` from standard labels).

`kubernetes_state.replicaset.replicas_ready`
: The number of ready replicas per ReplicaSet. Tags:`kube_namespace` `kube_replica_set` (`env` `service` `version` from standard labels).

`kubernetes_state.replicaset.replicas`
: The number of replicas per ReplicaSet. Tags:`kube_namespace` `kube_replica_set` (`env` `service` `version` from standard labels).

`kubernetes_state.replicationcontroller.replicas_desired`
: Number of desired pods for a ReplicationController. Tags:`kube_namespace` `kube_replication_controller`.

`kubernetes_state.replicationcontroller.replicas_available`
: The number of available replicas per ReplicationController. Tags:`kube_namespace` `kube_replication_controller`.

`kubernetes_state.replicationcontroller.fully_labeled_replicas`
: The number of fully labeled replicas per ReplicationController. Tags:`kube_namespace` `kube_replication_controller`.

`kubernetes_state.replicationcontroller.replicas_ready`
: The number of ready replicas per ReplicationController. Tags:`kube_namespace` `kube_replication_controller`.

`kubernetes_state.replicationcontroller.replicas`
: The number of replicas per ReplicationController. Tags:`kube_namespace` `kube_replication_controller`.

`kubernetes_state.statefulset.count`
: Number of StatefulSets Tags:`kube_namespace`.

`kubernetes_state.statefulset.replicas_desired`
: Number of desired pods for a StatefulSet. Tags:`kube_namespace` `kube_stateful_set` (`env` `service` `version` from standard labels).

`kubernetes_state.statefulset.replicas`
: The number of replicas per StatefulSet. Tags:`kube_namespace` `kube_stateful_set` (`env` `service` `version` from standard labels).

`kubernetes_state.statefulset.replicas_current`
: The number of current replicas per StatefulSet. Tags:`kube_namespace` `kube_stateful_set` (`env` `service` `version` from standard labels).

`kubernetes_state.statefulset.replicas_ready`
: The number of ready replicas per StatefulSet. Tags:`kube_namespace` `kube_stateful_set` (`env` `service` `version` from standard labels).

`kubernetes_state.statefulset.replicas_updated`
: The number of updated replicas per StatefulSet. Tags:`kube_namespace` `kube_stateful_set` (`env` `service` `version` from standard labels).

`kubernetes_state.hpa.count`
: Number of horizontal pod autoscaler. Tags: `kube_namespace`.

`kubernetes_state.hpa.min_replicas`
: Lower limit for the number of pods that can be set by the autoscaler, default 1. Tags:`kube_namespace` `horizontalpodautoscaler`.

`kubernetes_state.hpa.max_replicas`
: Upper limit for the number of pods that can be set by the autoscaler; cannot be smaller than MinReplicas. Tags:`kube_namespace` `horizontalpodautoscaler`.

`kubernetes_state.hpa.condition`
: The condition of this autoscaler. Tags:`kube_namespace` `horizontalpodautoscaler` `condition` `status`.

`kubernetes_state.hpa.desired_replicas`
: Desired number of replicas of pods managed by this autoscaler. Tags:`kube_namespace` `horizontalpodautoscaler`.

`kubernetes_state.hpa.current_replicas`
: Current number of replicas of pods managed by this autoscaler. Tags:`kube_namespace` `horizontalpodautoscaler`.

`kubernetes_state.hpa.spec_target_metric`
: The metric specifications used by this autoscaler when calculating the desired replica count. Tags:`kube_namespace` `horizontalpodautoscaler` `metric_name` `metric_target_type`.

`kubernetes_state.hpa.status_target_metric`
: The current metric status used by this autoscaler when calculating the desired replica count. Tags:`kube_namespace` `horizontalpodautoscaler` `metric_name` `metric_target_type`.

`kubernetes_state.vpa.count`
: Number of vertical pod autoscaler. Tags: `kube_namespace`.

`kubernetes_state.vpa.lower_bound`
: Minimum resources the container can use before the VerticalPodAutoscaler updater evicts it. Tags:`kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.target`
: Target resources the VerticalPodAutoscaler recommends for the container. Tags:`kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.uncapped_target`
: Target resources the VerticalPodAutoscaler recommends for the container ignoring bounds. Tags:`kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.upperbound`
: Maximum resources the container can use before the VerticalPodAutoscaler updater evicts it. Tags:`kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.update_mode`
: Update mode of the VerticalPodAutoscaler. Tags:`kube_namespace` `verticalpodautoscaler` `target_api_version` `target_kind` `target_name` `update_mode`.

`kubernetes_state.vpa.spec_container_minallowed`
: Minimum resources the VerticalPodAutoscaler can set for containers matching the name. Tags:`kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.vpa.spec_container_maxallowed`
: Maximum resources the VerticalPodAutoscaler can set for containers matching the name. Tags:`kube_namespace` `verticalpodautoscaler` `kube_container_name` `resource` `target_api_version` `target_kind` `target_name` `unit`.

`kubernetes_state.cronjob.count`
: Number of cronjobs. Tags:`kube_namespace`.

`kubernetes_state.cronjob.spec_suspend`
: Suspend flag tells the controller to suspend subsequent executions. Tags:`kube_namespace` `kube_cronjob` (`env` `service` `version` from standard labels).

`kubernetes_state.cronjob.duration_since_last_schedule`
: The duration since the last time the cronjob was scheduled. Tags:`kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.job.count`
: Number of jobs. Tags:`kube_namespace` `kube_cronjob`.

`kubernetes_state.job.failed`
: The number of pods which reached Phase Failed. Tags:`kube_job` or `kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.job.succeeded`
: The number of pods which reached Phase Succeeded. Tags:`kube_job` or `kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.job.completion.succeeded`
: The job has completed its execution. Tags:`kube_job` or `kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.job.completion.failed`
: The job has failed its execution. Tags:`kube_job` or `kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.job.duration`
: Time elapsed between the start and completion time of the job, or the current time if the job is still running. Tags:`kube_job` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.resourcequota.<resource>.limit`
: Information about resource quota limits by resource. Tags:`kube_namespace` `resourcequota`.

`kubernetes_state.resourcequota.<resource>.used`
: Information about resource quota usage by resource. Tags:`kube_namespace` `resourcequota`.

`kubernetes_state.limitrange.cpu.min`
: Information about CPU limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.cpu.max`
: Information about CPU limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.cpu.default`
: Information about CPU limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.cpu.default_request`
: Information about CPU limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.cpu.max_limit_request_ratio`
: Information about CPU limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.min`
: Information about memory limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.max`
: Information about memory limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.default`
: Information about memory limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.default_request`
: Information about memory limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.limitrange.memory.max_limit_request_ratio`
: Information about memory limit range usage by constraint. Tags:`kube_namespace` `limitrange` `type`.

`kubernetes_state.service.count`
: Number of services. Tags:`kube_namespace` `type`.

`kubernetes_state.service.type`
: Service types. Tags:`kube_namespace` `kube_service` `type`.

`kubernetes_state.ingress.count`
: Number of ingresses. Tags:`kube_namespace`.

`kubernetes_state.ingress.path`
: Information about the ingress path. Tags:`kube_namespace` `kube_ingress_path` `kube_ingress` `kube_service` `kube_service_port` `kube_ingress_host` .

**Note:** You can configure [Datadog Standard labels][5] on your Kubernetes objects to get the `env` `service` `version` tags.

### Events

The Kubernetes State Metrics Core check does not include any events.

### Service Checks

`kubernetes_state.cronjob.complete`
: Whether the last job of the cronjob is failed or not. Tags:`kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.cronjob.on_schedule_check`
: Alert if the cronjob's next schedule is in the past. Tags:`kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.job.complete`
: Whether the job is failed or not. Tags:`kube_job` or `kube_cronjob` `kube_namespace` (`env` `service` `version` from standard labels).

`kubernetes_state.node.ready`
: Whether the node is ready. Tags:`node` `condition` `status`.

`kubernetes_state.node.out_of_disk`
: Whether the node is out of disk. Tags:`node` `condition` `status`.

`kubernetes_state.node.disk_pressure`
: Whether the node is under disk pressure. Tags:`node` `condition` `status`.

`kubernetes_state.node.network_unavailable`
: Whether the node network is unavailable. Tags:`node` `condition` `status`.

`kubernetes_state.node.memory_pressure`
: Whether the node network is under memory pressure. Tags:`node` `condition` `status`.

### Validation

[Run the Cluster Agent's `status` subcommand][6] inside your Cluster Agent container and look for `kubernetes_state_core` under the Checks section.

## Troubleshooting

### Timeout errors

By default, the Kubernetes State Metrics Core check waits 10 seconds for a response from the Kubernetes API server. For large clusters, the request may time out, resulting in missing metrics.

You can avoid this by setting the environment variable `DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT` to a higher value than the default 10 seconds.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Update your `datadog-agent.yaml` with the following configuration:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    clusterAgent:
      env:
        - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
          value: <value_greater_than_10>
```

Then apply the new configuration:

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}
Update your `datadog-values.yaml` with the following configuration:

```yaml
clusterAgent:
  env:
    - name: DD_KUBERNETES_APISERVER_CLIENT_TIMEOUT
      value: <value_greater_than_10>
```

Then upgrade your Helm chart:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```
{{% /tab %}}
{{< /tabs >}}

Need help? Contact [Datadog support][7].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://kubernetes.io/blog/2021/04/13/kube-state-metrics-v-2-0/
[2]: /integrations/kubernetes_state_core/#migration-from-kubernetes_state-to-kubernetes_state_core
[3]: /integrations/kubernetes_state_core/#data-collected
[4]: /agent/cluster_agent/
[5]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[6]: /agent/guide/agent-commands/?tab=clusteragent#agent-status-and-information
[7]: /help/
