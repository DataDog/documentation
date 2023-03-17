---
title: Kubernetes Logs
---
Collects Pod logs from Kubernetes Nodes, automatically enriching data
with metadata via the Kubernetes API.

# Configuration
<table><thead><tr><td>Param</td><td>Description</td></tr></thead><tbody><tr><td>auto_partial_merge</td><td>Whether or not to automatically merge partial events.

Partial here is in respect to messages that were split by the Kubernetes Container Runtime
log driver.</td></tr><tr><td>data_dir</td><td>The directory used to persist file checkpoint positions.

By default, the global `data_dir` option is used. Make sure the running user has write
permissions to this directory.</td></tr><tr><td>delay_deletion_ms</td><td>How long to delay removing metadata entries from the cache when a pod deletion event
event is received from the watch stream.

A longer delay will allow for continued enrichment of logs after the originating Pod is
removed. If relevant metadata has been removed, the log will be forwarded un-enriched and a
warning will be emitted.</td></tr><tr><td>exclude_paths_glob_patterns</td><td>A list of glob patterns to exclude from reading the files.</td></tr><tr><td>extra_field_selector</td><td>Specifies the [field selector][field_selector] to filter Pods with, to be used in addition
to the built-in [Node][node] filter.

The built-in Node filter uses `self_node_name` to only watch Pods located on the same Node.

[field_selector]: https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/
[node]: https://kubernetes.io/docs/concepts/architecture/nodes/</td></tr><tr><td>extra_label_selector</td><td>Specifies the [label selector][label_selector] to filter [Pods][pods] with, to be used in
addition to the built-in [exclude][exclude] filter.

[label_selector]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
[pods]: https://kubernetes.io/docs/concepts/workloads/pods/
[exclude]: https://vector.dev/docs/reference/configuration/sources/kubernetes_logs/#pod-exclusion</td></tr><tr><td>extra_namespace_label_selector</td><td>Specifies the [label selector][label_selector] to filter [Namespaces][namespaces] with, to
be used in addition to the built-in [exclude][exclude] filter.

[label_selector]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#label-selectors
[namespaces]: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
[exclude]: https://vector.dev/docs/reference/configuration/sources/kubernetes_logs/#namespace-exclusion</td></tr><tr><td>fingerprint_lines</td><td>The number of lines to read for generating the checksum.

If your files share a common header that is not always a fixed size,

If the file has less than this amount of lines, it won’t be read at all.</td></tr><tr><td>glob_minimum_cooldown_ms</td><td>The interval at which the file system is polled to identify new files to read from.

This is quite efficient, yet might still create some load of the
file system; in addition, it is currently coupled with checksum dumping
in the underlying file server, so setting it too low may introduce
a significant overhead.</td></tr><tr><td>ignore_older_secs</td><td>Ignore files with a data modification date older than the specified number of seconds.</td></tr><tr><td>ingestion_timestamp_field</td><td>Overrides the name of the log field used to add the ingestion timestamp to each event.

This is useful to compute the latency between important event processing
stages. For example, the time delta between when a log line was written and when it was
processed by the `kubernetes_logs` source.</td></tr><tr><td>kube_config_file</td><td>Optional path to a readable [kubeconfig][kubeconfig] file.

If not set, a connection to Kubernetes is made using the in-cluster configuration.

[kubeconfig]: https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/</td></tr><tr><td>max_line_bytes</td><td>The maximum number of bytes a line can contain before being discarded.

This protects against malformed lines or tailing incorrect files.</td></tr><tr><td>max_read_bytes</td><td>Max amount of bytes to read from a single file before switching over
to the next file.

This allows distributing the reads more or less evenly across
the files.</td></tr><tr><td>namespace_annotation_fields</td><td>Configuration for how the events are enriched with Namespace metadata.</td></tr><tr><td>namespace_annotation_fields.namespace_labels</td><td>Event field for the Namespace's labels.

Set to `""` to suppress this key.</td></tr><tr><td>node_annotation_fields</td><td>Configuration for how the events are enriched with Node metadata.</td></tr><tr><td>node_annotation_fields.node_labels</td><td>Event field for the Node's labels.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields</td><td>Configuration for how the events are enriched with Pod metadata.</td></tr><tr><td>pod_annotation_fields.container_id</td><td>Event field for the Container's ID.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.container_image</td><td>Event field for the Container's image.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.container_image_id</td><td>Event field for the Container's image ID.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.container_name</td><td>Event field for the Container's name.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.pod_annotations</td><td>Event field for the Pod's annotations.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.pod_ip</td><td>Event field for the Pod's IPv4 address.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.pod_ips</td><td>Event field for the Pod's IPv4 and IPv6 addresses.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.pod_labels</td><td>Event field for the `Pod`'s labels.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.pod_name</td><td>Event field for the Pod's name.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.pod_namespace</td><td>Event field for the Pod's namespace.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.pod_node_name</td><td>Event field for the Pod's node_name.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.pod_owner</td><td>Event field for the Pod's owner reference.

Set to `""` to suppress this key.</td></tr><tr><td>pod_annotation_fields.pod_uid</td><td>Event field for the Pod's uid.

Set to `""` to suppress this key.</td></tr><tr><td>read_from</td><td>File position to use when reading a new file.</td></tr><tr><td>self_node_name</td><td>The name of the Kubernetes [Node][node] that is running.

Configured to use an environment variable by default, to be evaluated to a value provided by
Kubernetes at Pod creation.

[node]: https://kubernetes.io/docs/concepts/architecture/nodes/</td></tr><tr><td>timezone</td><td>The default time zone for timestamps without an explicit zone.</td></tr><tr><td>type</td><td>The component type. This is a required field for all components and tells Vector which component to use.</td></tr></tbody></table>

# Output Data

# Telemetry
<table></tbody><tr><td>events_in_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.
This metric is deprecated and will be removed in a future version.
Use [`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) instead.</td></tr><tr><td>k8s_format_picker_edge_cases_total</td><td>The total number of edge cases encountered while picking format of the Kubernetes log message.</td></tr><tr><td>k8s_docker_format_parse_failures_total</td><td>The total number of failures to parse a message as a JSON object.</td></tr><tr><td>k8s_event_annotation_failures_total</td><td>The total number of failures to annotate Vector events with Kubernetes Pod metadata.</td></tr><tr><td>k8s_reflector_desyncs_total</td><td>The total number of desyncs for the reflector.</td></tr><tr><td>k8s_state_ops_total</td><td>The total number of state operations.</td></tr><tr><td>k8s_stream_chunks_processed_total</td><td>The total number of chunks processed from the stream of Kubernetes resources.</td></tr><tr><td>k8s_stream_processed_bytes_total</td><td>The number of bytes processed from the stream of Kubernetes resources.</td></tr><tr><td>k8s_watch_requests_invoked_total</td><td>The total number of watch requests invoked.</td></tr><tr><td>k8s_watch_requests_failed_total</td><td>The total number of watch requests failed.</td></tr><tr><td>k8s_watch_stream_failed_total</td><td>The total number of watch streams failed.</td></tr><tr><td>k8s_watch_stream_items_obtained_total</td><td>The total number of items obtained from a watch stream.</td></tr><tr><td>k8s_watcher_http_error_total</td><td>The total number of HTTP error responses for the Kubernetes watcher.</td></tr><tr><td>processed_bytes_total</td><td>The number of bytes processed by the component.</td></tr><tr><td>processed_events_total</td><td>The total number of events processed by this component.
This metric is deprecated in place of using
[`component_received_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_received_events_total) and
[`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) metrics.</td></tr><tr><td>component_discarded_events_total</td><td>The number of events dropped by this component.</td></tr><tr><td>component_errors_total</td><td>The total number of errors encountered by this component.</td></tr><tr><td>component_received_bytes_total</td><td>The number of raw bytes accepted by this component from source origins.</td></tr><tr><td>component_received_event_bytes_total</td><td>The number of event bytes accepted by this component either from
tagged origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>events_out_total</td><td>The total number of events emitted by this component.
This metric is deprecated and will be removed in a future version.
Use [`component_sent_events_total`](/docs/reference/configuration/sources/internal_metrics/#component_sent_events_total) instead.</td></tr><tr><td>component_sent_events_total</td><td>The total number of events emitted by this component.</td></tr><tr><td>component_sent_event_bytes_total</td><td>The total number of event bytes emitted by this component.</td></tr><tr><td>component_received_events_total</td><td>The number of events accepted by this component either from tagged
origins like file and uri, or cumulatively from other origins.</td></tr><tr><td>source_lag_time_seconds</td><td>The difference between the timestamp recorded in each event and the time when it was ingested, expressed as fractional seconds.</td></tr></tbody></table>

# How It Works
## Enrichment
Vector will enrich data with Kubernetes context. A comprehensive
list of fields can be found in the
[`kubernetes_logs` source output docs](/docs/reference/configuration/sources/kubernetes_logs/#output-data).

## Filtering
Vector provides rich filtering options for Kubernetes log collection:

* Built-in [Pod](#pod-exclusion) and [Container](#container-exclusion)
  exclusion rules.
* The `exclude_paths_glob_patterns` option allows you to exclude
  Kubernetes log files by the file name and path.
* The `extra_field_selector` option specifies the field selector to
  filter Pods with, to be used in addition to the built-in Node filter.
* The `extra_label_selector` option specifies the label selector to
  filter Pods with, to be used in addition to the [built-in
  `vector.dev/exclude` filter](#pod-exclusion).

## Globbing
By default, the [`kubernetes_logs` source](/docs/reference/configuration/sources/kubernetes_logs/)
ignores compressed and temporary files. This behavior can be configured with the
[`exclude_paths_glob_patterns`](/docs/reference/configuration/sources/kubernetes_logs/#configuration) option.

[Globbing](https://en.wikipedia.org/wiki/Glob_(programming)) is used to continually discover Pods' log files
at a rate defined by the `glob_minimum_cooldown` option. In environments when files are
rotated rapidly, we recommend lowering the `glob_minimum_cooldown` to catch files
before they are compressed.

## Namespace exclusion
By default, the [`kubernetes_logs` source](/docs/reference/configuration/sources/kubernetes_logs/)
will skip logs from the Namespaces that have a `vector.dev/exclude: "true"` **label**.
You can configure additional exclusion rules via label selectors,
see [the available options](/docs/reference/configuration/sources/kubernetes_logs/#configuration).

## Pod exclusion
By default, the [`kubernetes_logs` source](/docs/reference/configuration/sources/kubernetes_logs/)
will skip logs from the Pods that have a `vector.dev/exclude: "true"` **label**.
You can configure additional exclusion rules via label or field selectors,
see [the available options](/docs/reference/configuration/sources/kubernetes_logs/#configuration).

## Container exclusion
The [`kubernetes_logs` source](/docs/reference/configuration/sources/kubernetes_logs/)
can skip the logs from the individual Containers of a particular
Pod. Add an **annotation** `vector.dev/exclude-containers` to the
Pod, and enumerate the names of all the Containers to exclude in
the value of the annotation like so:

```yaml
vector.dev/exclude-containers: "container1,container2"
```

This annotation will make Vector skip logs originating from the
_container1_ and _container2_ of the Pod marked with the annotation,
while logs from other Containers in the Pod will still be collected.

## Kubernetes API communication
Vector communicates with the Kubernetes API to enrich the data it collects with
Kubernetes context. Therefore, Vector must have access to communicate with the
[Kubernetes API server](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/). If Vector is running in
a Kubernetes cluster then Vector will connect to that cluster using the
[Kubernetes provided access information](https://kubernetes.io/docs/tasks/access-application-cluster/access-cluster/#accessing-the-api-from-a-pod).

In addition to access, Vector implements proper desync handling to ensure
communication is safe and reliable. This ensures that Vector will not overwhelm
the Kubernetes API or compromise its stability.

## Partial message merging
Vector, by default, will merge partial messages that are
split due to the Docker size limit. For everything else, it
is recommended to use the [`reduce`
transform](/docs/reference/configuration/transforms/reduce) which offers
the ability to handle custom merging of things like
stacktraces.

## Pod removal
To ensure all data is collected, Vector will continue to collect logs from the
Pod for some time after its removal. This ensures that Vector obtains some of
the most important data, such as crash details.

## Resource limits
Vector recommends the following resource limits.

## State management
null

## Testing & reliability
Vector is tested extensively against Kubernetes. In addition to Kubernetes
being Vector's most popular installation method, Vector implements a
comprehensive end-to-end test suite for all minor Kubernetes versions starting
with `1.19`.

## State
This component is stateless, meaning its behavior is consistent across each input.

## Checkpointing
Vector checkpoints the current read position after each
successful read. This ensures that Vector resumes where it left
off if restarted, preventing data from being read twice. The
checkpoint positions are stored in the data directory which is
specified via the global `data_dir` option, but can be overridden
via the `data_dir` option in the file source directly.

## Kubernetes API access control
Vector requires access to the Kubernetes API.
Specifically, the [`kubernetes_logs` source](/docs/reference/configuration/sources/kubernetes_logs/)
uses the `/api/v1/pods`, `/api/v1/namespaces`, and `/api/v1/nodes` endpoints
to `list` and `watch` resources we use to enrich events with additional metadata.

Modern Kubernetes clusters run with RBAC (role-based access control)
scheme. RBAC-enabled clusters require some configuration to grant Vector
the authorization to access the Kubernetes API endpoints.	As RBAC is
currently the standard way of controlling access to the Kubernetes API,
we ship the necessary configuration out of the box: see the [ClusterRole, ClusterRoleBinding][rbac],
and [ServiceAccount][serviceaccount] in our Kubectl YAML
config, and the [`rbac.yaml`][rbac_helm] template configuration of the Helm chart.

If your cluster doesn't use any access control scheme	and doesn't
restrict access to the Kubernetes API, you don't need to do any extra
configuration - Vector will just work.

Clusters using legacy ABAC scheme are not officially supported
(although Vector might work if you configure access properly) -
we encourage switching to RBAC. If you use a custom access control
scheme - make sure Vector's Pod/ServiceAccount is granted `list` and `watch` access
to the `/api/v1/pods`, `/api/v1/namespaces`, and `/api/v1/nodes` resources.

[serviceaccount]: https://github.com/vectordotdev/vector/blob/master/distribution/kubernetes/vector-agent/serviceaccount.yaml
[rbac]: https://github.com/vectordotdev/vector/blob/master/distribution/kubernetes/vector-agent/rbac.yaml
[rbac_helm]: https://github.com/vectordotdev/helm-charts/blob/develop/charts/vector/templates/rbac.yaml

## Context
By default, the `kubernetes_logs` source augments events with helpful
context keys.


