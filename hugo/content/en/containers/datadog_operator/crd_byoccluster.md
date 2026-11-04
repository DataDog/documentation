---
title: DatadogBYOCCluster CRD
description: Deploy and manage BYOC clusters and Observability Pipelines Workers using the DatadogBYOCCluster custom resource definition with the Datadog Operator
further_reading:
  - link: "/byoc-logs/install/datadog_operator/"
    tag: "Documentation"
    text: "Install BYOC with the Datadog Operator"
---

To deploy and manage a BYOC cluster and its Observability Pipelines Workers, use the Datadog Operator and `DatadogBYOCCluster` custom resource definition (CRD).

## Prerequisites

- [Helm][1]
- [`kubectl` CLI][2]
- [Datadog Operator][3] v1.33.0 or later, with the BYOC controller enabled and both the `DatadogBYOCCluster` and `DatadogObservabilityPipelinesWorker` CRDs installed
- An Amazon EKS cluster, S3 bucket, PostgreSQL database, IAM role, namespace, and Secrets configured as described in the [installation guide][3]
- An Observability Pipeline created in Datadog, with a source and BYOC destination configured

The Operator deploys Workers for existing pipelines. It does not create pipeline definitions, the S3 bucket, PostgreSQL database, or IAM role.

## Setup

1. Create a file with the spec of your `DatadogBYOCCluster` deployment configuration.

   **Example**: A BYOC cluster with one pipeline.

   Replace the placeholders with your AWS account, IAM role, S3 bucket, and pipeline ID. Set the AWS region and Datadog site for your deployment. Choose the source port name and numeric port from [Pipelines and ports](#pipelines-and-ports). The example uses the namespace and Secrets from the [installation guide][3].

   {{< code-block lang="yaml" filename="byoc-cluster.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v1alpha1
   kind: DatadogBYOCCluster
   metadata:
     name: byoc-demo
     namespace: byoc
   spec:
     datadog:
       site: datadoghq.com
       apiKeySecretRef:
         name: datadog-secret
         key: api-key
     provider:
       aws:
         accountID: "<AWS_ACCOUNT_ID>"
         region: us-east-1
         irsaRoleARN: "arn:aws:iam::<AWS_ACCOUNT_ID>:role/<BYOC_ROLE>"
     components:
       metastore:
         replicas: 1
         database:
           uriSecretRef:
             name: byoc-postgres
             key: primary-uri
       indexer:
         replicas: 1
       searcher:
         replicas: 1
       controlPlane: {}
       janitor: {}
       pipelines:
         - name: default
           pipelineID: "<PIPELINE_ID>"
           replicas: 1
           ports:
             - name: "<SOURCE_PORT_NAME>"
               port: <SOURCE_PORT>
     nodeConfigOverrides:
       default_index_root_uri: "s3://<S3_BUCKET>/indexes"
   {{< /code-block >}}

   See the [configuration fields](#configuration-fields) for additional options. Size resources and replicas for your workload using the [sizing guide][4].

2. Deploy your `DatadogBYOCCluster`:

   ```shell
   kubectl apply -f byoc-cluster.yaml
   ```

   The Operator creates and manages the engine workloads and a `DatadogObservabilityPipelinesWorker` resource for each entry in `spec.components.pipelines`. See [Status and reconciliation](#status-and-reconciliation) to inspect the deployment.

## Additional examples

### Image overrides

The Operator supplies default images for the BYOC engine and Workers. An Operator upgrade also updates those default images. To pin an image, merge an explicit tag or digest into `spec.imageOverrides`:

{{< code-block lang="yaml" filename="byoc-cluster.yaml" collapsible="true" >}}
spec:
  imageOverrides:
    byoc:
      tag: "<BYOC_IMAGE_TAG>"
    observabilityPipelinesWorker:
      digest: "sha256:<OPW_IMAGE_DIGEST>"
{{< /code-block >}}

Specify a tag or a digest for each image you pin. An Operator upgrade does not automatically update an explicitly pinned image. Pinning one image does not pin the other. A repository-only override does not pin a version.

Use `repository` to mirror workload images and `imagePullSecrets` to reference registry credentials in the resource's namespace. Check engine and Worker compatibility before overriding versions.

## Configuration fields

The following fields are set under `spec`. To inspect all available fields in the installed CRD, run:

```shell
kubectl explain datadogbyoccluster.spec --recursive
```

`datadog.site`
: _string_
<br/>Datadog site shared by the engine and Workers.

`datadog.apiKeySecretRef`
: **required** - _object_
<br/>Name and key of the Datadog API key Secret in the cluster's namespace.

`provider.aws`
: _object_
<br/>AWS account ID, region, and optional IRSA role ARN. The Operator supports AWS deployments using the reverse connection to Datadog.

`identity.serviceAccountName`
: _string_
<br/>Existing service account for engine workloads. If omitted, the Operator creates a service account named after the cluster.

`components`
: **required** - _object_
<br/>Engine components and pipeline Worker configurations. See [Engine components](#engine-components) and [Pipelines and ports](#pipelines-and-ports).

`global`
: _object_
<br/>Shared labels, annotations, environment variables, volumes, volume mounts, tolerations, affinity, topology spread constraints, and Pod disruption budget settings.

`nodeConfigOverrides`
: _object_
<br/>Overrides merged into the engine's node configuration, including `default_index_root_uri`.

`imageOverrides`
: _object_
<br/>Image repositories, tags, digests, pull policies, and workload image pull secrets. See [Image overrides](#image-overrides).

`provider.aws.irsaRoleARN` applies to the service account created by the Operator. For an existing service account, configure its IRSA annotation and IAM trust policy separately. Workers use their own service accounts; set a pipeline's `identity.serviceAccountName` to use an existing identity.

### Engine components

The required engine component entries are `metastore`, `indexer`, `searcher`, `controlPlane`, and `janitor`. The optional `compactor` and `readOnlyMetastore` entries enable those workloads when configured. Each component supports replica and resource configuration, with additional settings for storage and scheduling.

The primary and read-only metastores require a database connection Secret reference under `database.uriSecretRef`. The Operator deploys the metastore workloads; you provision and operate their PostgreSQL databases. See [Metastore read replicas][5].

### Pipelines and ports

Set each existing pipeline's ID in `spec.components.pipelines[].pipelineID`. Each entry creates a managed `DatadogObservabilityPipelinesWorker` resource and Service named `<CLUSTER_NAME>-pipeline-<PIPELINE_NAME>`.

The Operator supplies the Worker's BYOC destination endpoint, Datadog site, and shared API key. If engine REST TLS is configured, the destination URL uses HTTPS. Configure certificates and trust settings for that connection separately.

Port names select the Worker's source listen-address setting. The Operator generates the corresponding container port, Service port, and listen-address environment variable:

| Source | Port name | Example port |
|---|---|---:|
| OpenTelemetry gRPC | `otlp-grpc` | `4317` |
| OpenTelemetry HTTP | `otlp-http` | `4318` |
| Datadog Agent | `datadog-agent` | `8282` |

Adding a port does not create or change the pipeline's source definition in Datadog. Match the pipeline source, Worker port, and sender protocol. Worker Services use cluster-internal connectivity; log sources need network access to those Services.

Add more entries to deploy multiple pipelines. Keep each entry's `name` unique. Renaming an entry creates a new Worker resource and deletes the old one, changing its endpoint and buffer life cycle.

### Resources and storage

Set resources under `spec.components.<COMPONENT>.resources` or an entry in `spec.components.pipelines`. The Operator derives engine cache and queue settings from resource and storage configuration. Choose capacity, replicas, storage, and node placement for your workload. See [Operator resource configuration][4].

Configure persistent storage for indexers, searchers, or Workers under `storage.volumeClaimTemplate`. Choose the StorageClass and capacity before creating the workload. For Worker buffering, configure both the Observability Pipeline buffer and the Worker's persistent storage. See [Disk buffer durability][6].

## Status and reconciliation

Inspect the cluster and its Worker resources:

```shell
kubectl get datadogbyoccluster <CLUSTER_NAME> -n <NAMESPACE_NAME> -o yaml
kubectl get datadogobservabilitypipelinesworkers -n <NAMESPACE_NAME>
```

Check `status.conditions` for:

- `Reconciled=True`: managed resources match the desired configuration.
- `Available=True`: the configured engine workloads and managed Workers are available.

Check each condition's `observedGeneration`, `reason`, and `message`. Configuration errors can be reported during reconciliation after Kubernetes accepts the resource. Also verify the Datadog connection and send a test log; workload availability alone does not verify ingestion.

Make changes to the parent `DatadogBYOCCluster` manifest. The Operator reverts direct edits to managed resources, including child Workers, and reports conflicts with resources it does not own. See [BYOC troubleshooting][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /byoc-logs/install/datadog_operator/
[4]: /byoc-logs/operate/sizing/#operator-resource-configuration
[5]: /byoc-logs/configure/metastore_read_replicas/
[6]: /byoc-logs/operate/disk_buffer_durability/
[7]: /byoc-logs/operate/troubleshooting/
