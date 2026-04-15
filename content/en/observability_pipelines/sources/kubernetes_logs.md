---
title: Kubernetes Logs Source
description: Learn how to collect Kubernetes container logs with the Kubernetes Logs source in Observability Pipelines.
disable_toc: false
products:
- name: Logs
  icon: logs
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
---

{{< product-availability >}}

## Overview

Use Observability Pipelines' Kubernetes Logs source to collect container logs directly from Kubernetes pod log files on the node. The source watches for pods scheduled on the same node, reads their container log files, and enriches each log event with Kubernetes metadata such as the pod name, namespace, labels, and annotations.

### When to use this source

Common scenarios when you might use this source:

- You are running workloads in Kubernetes and want to collect container logs without deploying an additional log collection agent.
- You want to enrich logs with Kubernetes metadata (pod labels, namespace labels, node labels) at collection time, before routing them to processors and destinations.
- You need to filter log collection by namespace, label selector, or field selector to control which pods' logs are collected.

## Prerequisites

- The Observability Pipelines Worker must be deployed as a Kubernetes DaemonSet so that it runs on every node and can access the local pod log files.
- The Worker's service account must have permissions to list and watch pods, namespaces, and nodes in the Kubernetes API.
- Pod log files must be accessible to the Worker. By default, container runtimes write logs to `/var/log/pods/` on the host node, which must be mounted into the Worker container.

## Setup

Set up this source when you [set up a pipeline][1]. You can set up a pipeline in the [UI][2], using the [API][3], or with [Terraform][4]. The instructions in this section are for setting up the source in the UI.

### Required settings

No secrets or credentials are required for this source. The Worker reads pod log files from the local node file system and accesses the Kubernetes API using its service account.

### Optional settings

#### File reading

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `auto_partial_merge` | bool | `true` | Whether to automatically merge partial events that were split by the container runtime. |
| `exclude_paths_glob_patterns` | array of strings | `["**/*.gz", "**/*.tmp"]` | Glob patterns for file paths to exclude from log collection. |
| `include_paths_glob_patterns` | array of strings | `["**/*"]` | Glob patterns for file paths to include in log collection. |
| `ignore_older_secs` | integer | none | Ignore log files that have not been modified within this number of seconds. |
| `read_from` | enum (`beginning`, `end`) | `beginning` | The position in the file from which the Worker starts reading. Set to `beginning` to read all existing log data. Set to `end` to read only new data appended after the Worker starts. |

#### Pod filtering

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `extra_field_selector` | string | none | A Kubernetes field selector to filter which pods' logs are collected. For example, `metadata.name=my-pod`. |
| `extra_label_selector` | string | none | A Kubernetes label selector to filter which pods' logs are collected. For example, `app=nginx,environment=production`. |
| `extra_namespace_label_selector` | string | none | A Kubernetes label selector to filter which namespaces' pod logs are collected. |

#### Kubernetes API

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `kube_config_file` | string | none | Path to a kubeconfig file. If not set, the Worker uses the in-cluster service account credentials. |
| `use_apiserver_cache` | bool | `false` | Whether to use the kube-apiserver cache for list and watch requests. Enabling this can reduce load on the API server in large clusters. |
| `delay_deletion_ms` | integer | `60000` | The number of milliseconds to delay removing pod metadata after a pod deletion event. This helps ensure that all logs from a terminated pod are collected before metadata is removed. |

#### Timezone

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `timezone` | string | none | The default timezone to use when parsing log timestamps that do not include timezone information. For example, `UTC` or `America/New_York`. |

#### Metadata enrichment

By default, the source enriches every log event with Kubernetes metadata. Use these settings to control which metadata fields are inserted and at which event paths.

##### `insert_namespace_fields`

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `insert_namespace_fields` | bool | `true` | Whether to enrich logs with namespace-level fields. |

##### `namespace_annotation_fields`

Controls the event path for namespace metadata.

| Sub-field | Type | Default | Description |
|-----------|------|---------|-------------|
| `namespace_labels` | string | `.kubernetes.namespace_labels` | The event path where namespace labels are inserted. |

##### `node_annotation_fields`

Controls the event path for node metadata.

| Sub-field | Type | Default | Description |
|-----------|------|---------|-------------|
| `node_labels` | string | `.kubernetes.node_labels` | The event path where node labels are inserted. |

##### `pod_annotation_fields`

Controls the event paths for pod metadata. Each sub-field specifies the event path where the corresponding metadata value is inserted.

| Sub-field | Type | Default |
|-----------|------|---------|
| `container_id` | string | `.kubernetes.container_id` |
| `container_image` | string | `.kubernetes.container_image` |
| `container_image_id` | string | `.kubernetes.container_image_id` |
| `container_name` | string | `.kubernetes.container_name` |
| `pod_annotations` | string | `.kubernetes.pod_annotations` |
| `pod_ip` | string | `.kubernetes.pod_ip` |
| `pod_ips` | string | `.kubernetes.pod_ips` |
| `pod_labels` | string | `.kubernetes.pod_labels` |
| `pod_name` | string | `.kubernetes.pod_name` |
| `pod_namespace` | string | `.kubernetes.pod_namespace` |
| `pod_node_name` | string | `.kubernetes.pod_node_name` |
| `pod_owner` | string | `.kubernetes.pod_owner` |
| `pod_uid` | string | `.kubernetes.pod_uid` |

## Deploy the Worker as a DaemonSet

The Worker must run as a DaemonSet so that one Worker pod is scheduled on each node and can read the local pod log files. Mount the host's log directory into the Worker container:

```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: opw
spec:
  selector:
    matchLabels:
      app: opw
  template:
    metadata:
      labels:
        app: opw
    spec:
      serviceAccountName: opw
      containers:
        - name: opw
          image: datadog/observability-pipelines-worker:latest
          volumeMounts:
            - name: varlogpods
              mountPath: /var/log/pods
              readOnly: true
      volumes:
        - name: varlogpods
          hostPath:
            path: /var/log/pods
```

### RBAC

The Worker service account requires permissions to list and watch pods, namespaces, and nodes. Create a `ClusterRole` and `ClusterRoleBinding`:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: opw
rules:
  - apiGroups: [""]
    resources: ["pods", "namespaces", "nodes"]
    verbs: ["list", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: opw
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: opw
subjects:
  - kind: ServiceAccount
    name: opw
    namespace: default
```

## Event structure

After enrichment, a log event collected by this source has the following structure:

```json
{
  "message": "2024-06-17T22:25:55.439Z INFO  Starting application",
  "kubernetes": {
    "pod_name": "my-app-7b8d4f6c9-x2k4m",
    "pod_namespace": "production",
    "pod_labels": {
      "app": "my-app",
      "version": "v1.2.3"
    },
    "pod_annotations": {},
    "pod_ip": "10.244.1.15",
    "pod_ips": ["10.244.1.15"],
    "pod_uid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "pod_node_name": "node-01",
    "pod_owner": "ReplicaSet/my-app-7b8d4f6c9",
    "container_name": "app",
    "container_id": "containerd://abc123def456",
    "container_image": "my-app:v1.2.3",
    "container_image_id": "sha256:abc123",
    "namespace_labels": {
      "kubernetes.io/metadata.name": "production"
    },
    "node_labels": {
      "kubernetes.io/os": "linux"
    }
  },
  "hostname": "node-01",
  "timestamp": "2024-06-17T22:25:55.439Z",
  "source_type": "kubernetes_logs"
}
```

[1]: /observability_pipelines/configuration/set_up_pipelines/
[2]: https://app.datadoghq.com/observability-pipelines
[3]: /api/latest/observability-pipelines/
[4]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline
