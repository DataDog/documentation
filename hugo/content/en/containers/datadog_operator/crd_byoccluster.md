---
title: DatadogBYOCCluster CRD
description: Configure BYOC engine components and Observability Pipelines Workers with the Datadog Operator.
further_reading:
- link: "/byoc-logs/install/datadog_operator/"
  tag: "Documentation"
  text: "Install BYOC with the Datadog Operator"
- link: "/byoc-logs/operate/updates/"
  tag: "Documentation"
  text: "BYOC releases and updates"
---

## Overview

The `DatadogBYOCCluster` custom resource manages a BYOC deployment and its Observability Pipelines Workers. It requires Datadog Operator v1.33.0 or later, the BYOC controller, and both the `DatadogBYOCCluster` and `DatadogObservabilityPipelinesWorker` CRDs.

The resource uses `apiVersion: datadoghq.com/v1alpha1` and is namespaced. Its API version is separate from the Operator version. For a complete example for a new AWS deployment, see [Install BYOC with the Datadog Operator][1].

The Operator supports AWS with the reverse connection to Datadog. BYOC Ingress configuration and OpenShift OperatorHub installation are not supported. The Operator does not create the S3 bucket, PostgreSQL database, IAM role, or Observability Pipeline definitions.

## Configuration

The following fields cover the main configuration groups. Use `kubectl explain datadogbyoccluster.spec --recursive` to inspect the installed schema.

| Field | Purpose |
|---|---|
| `spec.datadog.site` | Datadog site shared by the engine and Workers. |
| `spec.datadog.apiKeySecretRef` | Name and key of the API key Secret in the cluster's namespace. |
| `spec.provider.aws` | AWS account ID, region, and optional IRSA role ARN. |
| `spec.identity.serviceAccountName` | Existing service account for engine workloads. If omitted, the Operator creates a service account named after the cluster. |
| `spec.components` | Engine components and named Worker configurations. |
| `spec.global` | Shared labels, annotations, environment variables, volumes, volume mounts, tolerations, affinity, topology spread constraints, and Pod disruption budget settings. |
| `spec.nodeConfigOverrides` | Overrides merged into the engine's node configuration, including `default_index_root_uri`. |
| `spec.imageOverrides` | Optional image repositories, tags, digests, pull policies, and workload image pull secrets. |

`spec.provider.aws.irsaRoleARN` applies to the service account created by the Operator. If you supply an existing service account, configure its IRSA annotation and IAM trust policy yourself. Workers use their own service accounts; configure a pipeline's `identity.serviceAccountName` when it needs an existing identity.

### Engine components

The required component entries are `metastore`, `indexer`, `searcher`, `controlPlane`, and `janitor`. The optional `compactor` and `readOnlyMetastore` entries enable those workloads when configured. Each component supports replica and resource configuration, with additional settings for storage and scheduling.

The primary and read-only metastores require a database connection Secret reference under `database.uriSecretRef`. The Operator deploys the metastore workloads, but you provision and operate their PostgreSQL databases. See [Metastore read replicas][2].

### Pipelines and ports

Create each Observability Pipeline in Datadog first. Set its ID in `spec.components.pipelines[].pipelineID`. Each entry creates a managed `DatadogObservabilityPipelinesWorker` resource named `<CLUSTER_NAME>-pipeline-<PIPELINE_NAME>` and a Service with the same name.

The Operator supplies the Worker's BYOC destination endpoint, Datadog site, and shared API key. If engine REST TLS is configured, the generated destination URL uses HTTPS. Configure the required certificates and trust settings for that TLS connection separately.

Port names select the Worker's source listen-address setting. The Operator generates the corresponding container port, Service port, and listen-address environment variable:

| Source | Port name | Example port |
|---|---|---:|
| OpenTelemetry gRPC | `otlp-grpc` | `4317` |
| OpenTelemetry HTTP | `otlp-http` | `4318` |
| Datadog Agent | `datadog-agent` | `8282` |

For example, add this entry to `spec.components.pipelines` after creating an OpenTelemetry pipeline:

```yaml
- name: application
  pipelineID: "<PIPELINE_ID>"
  replicas: 2
  ports:
    - name: otlp-grpc
      port: 4317
    - name: otlp-http
      port: 4318
```

Adding a port does not create or change the pipeline's source definition in Datadog. Match the pipeline source, Worker port, and sender protocol. Worker Services use cluster-internal connectivity; log sources need network access to those Services.

Add more entries to deploy multiple pipelines. Keep each entry's `name` unique. Renaming an entry creates a new Worker resource and deletes the old one, so plan for its endpoint and buffer lifecycle to change.

### Resources and storage

Set resources under `spec.components.<COMPONENT>.resources` or an entry in `spec.components.pipelines`. The Operator derives engine cache and queue settings from resource and storage configuration. You still choose capacity, replicas, storage, and node placement for the workload. See [Operator resource configuration][3].

Configure persistent storage for indexers, searchers, or Workers under their `storage.volumeClaimTemplate`. Choose the StorageClass and capacity before creating the workload. For Worker buffering, configure the buffer in the Observability Pipeline as well as the Worker's persistent storage. See [Disk buffer durability][4].

### Image overrides

The Operator supplies default images for the BYOC engine and Observability Pipelines Workers. An Operator upgrade also updates those default images. Pin a particular image with an explicit tag or digest in `spec.imageOverrides`:

```yaml
spec:
  imageOverrides:
    byoc:
      tag: "<BYOC_IMAGE_TAG>"
    observabilityPipelinesWorker:
      digest: "sha256:<OPW_IMAGE_DIGEST>"
```

Merge this fragment into the existing resource. Specify a tag or a digest for each image you pin. An Operator upgrade does not automatically update an explicitly pinned image. Pinning one image does not pin the other. A repository-only override does not pin a version.

Use `repository` to mirror workload images and `imagePullSecrets` to reference registry credentials in the resource's namespace. Check engine and Worker compatibility before overriding versions. See [Releases and updates][5].

## Status and reconciliation

Inspect the cluster and its Worker resources:

```shell
kubectl get datadogbyoccluster <CLUSTER_NAME> -n <NAMESPACE_NAME> -o yaml
kubectl get datadogobservabilitypipelinesworkers -n <NAMESPACE_NAME>
```

`status.conditions` reports reconciliation and workload availability:

- `Reconciled=True`: managed resources match the desired configuration.
- `Available=True`: the configured engine workloads and managed Workers are available.

Check each condition's `observedGeneration`, `reason`, and `message`. Configuration errors can be reported during reconciliation after Kubernetes has accepted the resource. Workload availability does not establish successful ingestion or Datadog connectivity; also verify the connection and send a test log.

The Operator reverts direct edits to its managed resources, including child Worker resources. Make changes to the parent `DatadogBYOCCluster` manifest. A conflicting resource that is not owned by the cluster is reported as a conflict. See [Operator troubleshooting][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /byoc-logs/install/datadog_operator/
[2]: /byoc-logs/configure/metastore_read_replicas/
[3]: /byoc-logs/operate/sizing/#operator-resource-configuration
[4]: /byoc-logs/operate/disk_buffer_durability/
[5]: /byoc-logs/operate/updates/#operator-managed-deployments
[6]: /byoc-logs/operate/troubleshooting/#operator-managed-deployments
