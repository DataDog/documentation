---
title: Install BYOC with the Datadog Operator
description: Deploy a new BYOC cluster and Observability Pipelines Workers on AWS EKS with the Datadog Operator.
further_reading:
- link: "/containers/datadog_operator/crd_byoccluster/"
  tag: "Documentation"
  text: "DatadogBYOCCluster configuration"
- link: "/byoc-logs/operate/updates/"
  tag: "Documentation"
  text: "Plan BYOC updates"
- link: "/byoc-logs/operate/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshoot BYOC"
---

## Overview

Use Datadog Operator v1.33.0 or later to deploy a new BYOC cluster on AWS EKS. A `DatadogBYOCCluster` custom resource declares the BYOC engine components and the Observability Pipelines Workers that send logs to them. The Operator creates and reconciles their Kubernetes resources, configures the Worker-to-indexer connection, and reports their availability.

This guide covers new deployments on AWS using the [reverse connection to Datadog][1]. The Operator does not support BYOC Ingress configuration or deployment through OpenShift OperatorHub. For GCP, Azure, or AWS deployments that require Ingress, use the [Helm installation guides][2].

The Operator uses default images for the BYOC engine and Workers. Upgrading the Operator also updates these default images. Explicit image tags or digests in `spec.imageOverrides` pin the corresponding image. See [Releases and updates][3].

## Prerequisites

- Access to BYOC and Observability Pipelines in your Datadog organization.
- An EKS cluster that meets the [BYOC Kubernetes requirements][2], with `kubectl` access and Helm installed.
- An S3 bucket and a PostgreSQL database reachable from the BYOC pods. The Operator does not provision these services. See the [AWS prerequisites][4].
- An IAM role with the [required S3 permissions][5] and an IRSA trust policy for the BYOC service account.
- A working persistent-volume provisioner and a default StorageClass, or an explicit StorageClass in the resource's volume claim templates. On EKS, configure the appropriate EBS CSI driver for your cluster.
- Network access from searchers to Datadog for the reverse connection, from Workers to Datadog for pipeline configuration, and from workloads to their required image registries, S3, and PostgreSQL. Log sources must be able to reach the Worker's Service.

The example uses the namespace `byoc` and cluster name `byoc-demo`. The Operator creates the BYOC service account as `byoc-demo`. Configure the IAM role's OIDC trust policy with the subject `system:serviceaccount:byoc:byoc-demo` and audience `sts.amazonaws.com`. Follow the [AWS IRSA instructions][6] to configure the role, and use its ARN in `spec.provider.aws.irsaRoleARN`.

The example uses one replica of each required component to demonstrate the configuration. Plan [CPU, memory, replicas, and storage][7] for your workload before sending production traffic. A short manifest does not imply a small deployment: omitted resource and storage settings use the [Operator defaults][8].

## Install the Operator

The BYOC controller is disabled by default. Enable it and install both the `DatadogBYOCCluster` and `DatadogObservabilityPipelinesWorker` CRDs.

Add the Datadog chart repository:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Create `operator-values.yaml`:

```yaml
image:
  tag: "1.33.0"
datadogBYOCCluster:
  enabled: true
datadogCRDs:
  crds:
    datadogBYOCClusters: true
    datadogObservabilityPipelinesWorkers: true
```

Use a Datadog Operator chart that supports these settings and Operator v1.33.0. The chart version and Operator image version are separate version numbers.

For a new Operator installation, run:

```shell
helm install datadog-operator datadog/datadog-operator \
  --namespace datadog \
  --create-namespace \
  --values operator-values.yaml
```

If an Operator is already installed, add these settings to its existing values file and upgrade that release in its existing namespace. Preserve other enabled controllers and configuration. If its watch scope is restricted, include the `byoc` namespace. See [Operator installation][9].

Verify that both CRDs are installed and the Operator pod is running:

```shell
kubectl get crd datadogbyocclusters.datadoghq.com \
  datadogobservabilitypipelinesworkers.datadoghq.com
kubectl get pods -n datadog
```

## Create the pipeline

Create the Observability Pipeline before applying the BYOC resource. **The Operator deploys Workers for an existing pipeline; it does not create the pipeline.**

1. Open [Observability Pipelines][10] and create a pipeline.
2. Add an [OpenTelemetry source][11] for the example in this guide.
3. Configure any processors you need and a [BYOC destination][12]. The Operator supplies the destination endpoint to the Worker.
4. Save the pipeline and copy its pipeline ID. Use this ID in `spec.components.pipelines[].pipelineID`.

The example exposes OTLP gRPC on port `4317`. To use another source or OTLP HTTP, configure the matching source in the pipeline and the matching named port in the custom resource. See [pipeline ports][8].

## Create the namespace and secrets

Create the namespace:

```shell
kubectl create namespace byoc
```

Store the Datadog API key and PostgreSQL connection URI in Secrets in this namespace:

```shell
kubectl create secret generic datadog-secret \
  --namespace byoc \
  --from-literal=api-key='<DATADOG_API_KEY>'

kubectl create secret generic byoc-postgres \
  --namespace byoc \
  --from-literal=primary-uri='postgresql://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>'
```

Use the database connection parameters required by your PostgreSQL service, including TLS parameters where required. URL-encode special characters in the username and password.

## Create the BYOC cluster

Save the following configuration as `byoc-cluster.yaml`. Replace `<AWS_ACCOUNT_ID>`, `<BYOC_ROLE>`, `<PIPELINE_ID>`, and `<S3_BUCKET>`. Set the AWS region to match the bucket and set `spec.datadog.site` to your [Datadog site][13].

```yaml
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
          - name: otlp-grpc
            port: 4317
  nodeConfigOverrides:
    default_index_root_uri: "s3://<S3_BUCKET>/indexes"
```

Apply the resource:

```shell
kubectl apply -f byoc-cluster.yaml
```

The Operator configures the Worker destination as the cluster's indexer endpoint and inherits the shared Datadog site and API key. Do not install a separate Worker Helm release for the same entry in `spec.components.pipelines`.

## Verify the deployment

Inspect the BYOC resource, its managed Worker, and the workloads:

```shell
kubectl get datadogbyoccluster byoc-demo -n byoc -o yaml
kubectl get datadogobservabilitypipelinesworkers -n byoc
kubectl get pods,services,pvc -n byoc
kubectl wait --for=condition=Available \
  datadogbyoccluster/byoc-demo -n byoc --timeout=10m
```

Check that `Reconciled` and `Available` are `True` for the resource's current generation. `Available` aggregates workload health; it does not verify that a log has reached BYOC. If the wait times out, inspect the conditions, pod events, and PVC status using the [troubleshooting guide][14].

In Datadog, open the BYOC console and confirm that the cluster is connected.

### Send a test log

For this example, the Worker Service is `byoc-demo-pipeline-default`. Applications in the Kubernetes cluster can send OTLP gRPC logs to `byoc-demo-pipeline-default.byoc.svc.cluster.local:4317`.

To test from your workstation, forward the Worker's gRPC port and leave this command running:

```shell
kubectl port-forward -n byoc service/byoc-demo-pipeline-default 4317:4317
```

In another terminal, create a Python environment and install the OpenTelemetry gRPC exporter:

```shell
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install opentelemetry-sdk opentelemetry-exporter-otlp-proto-grpc
```

Save the following as `byoc-test.py`:

```python
import logging

from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
from opentelemetry.sdk.resources import Resource
from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter

provider = LoggerProvider(resource=Resource.create({"service.name": "byoc-demo"}))
provider.add_log_record_processor(
    BatchLogRecordProcessor(OTLPLogExporter(endpoint="localhost:4317", insecure=True))
)
logger = logging.getLogger("byoc-demo")
logger.setLevel(logging.INFO)
logger.addHandler(LoggingHandler(logger_provider=provider))
logger.info("Hello from BYOC with the Datadog Operator")
provider.force_flush()
provider.shutdown()
```

Run the script to send a test log through the local port forward:

```shell
python3 byoc-test.py
```

In [Log Explorer][15], select the cluster's BYOC index and search for `service:byoc-demo`. Confirm that the test message appears. The example uses an unencrypted gRPC connection through a local port forward; configure transport security for your production log sources as required.

## Configure a production deployment

- Set resource requests, memory limits, replica counts, and storage using the [sizing guide][7].
- Configure [persistent Worker buffers and shutdown time][16] for your ingestion requirements.
- Configure [autoscaling][17] and [monitoring][18]. Deploy the Datadog Agent or DogStatsD separately to collect engine metrics.
- Add optional components, multiple pipelines, and shared scheduling settings using the [CRD reference][8].
- Update the `DatadogBYOCCluster` manifest to change managed workloads. The Operator reconciles manual edits to generated resources back to the declared configuration.

## Delete the deployment

Stop upstream log sources and allow Workers to drain before deleting the cluster:

```shell
kubectl delete datadogbyoccluster byoc-demo -n byoc
```

The Operator waits for managed Workers to be deleted before deleting the indexer. Keep the Operator running until cleanup finishes. Shutdown ordering does not guarantee that buffers drain within their configured termination grace period.

The S3 bucket and PostgreSQL database are external resources and are not deleted by this operation. Inspect remaining PVCs before any separate storage cleanup; they can contain buffered data. Delete the Operator only after its managed resources have finished cleanup and no other resources depend on it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /byoc-logs/introduction/network/
[2]: /byoc-logs/install/
[3]: /byoc-logs/operate/updates/#operator-managed-deployments
[4]: /byoc-logs/install/aws_eks/#prerequisites
[5]: /byoc-logs/install/aws_eks/#iam-access-for-s3
[6]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
[7]: /byoc-logs/operate/sizing/#operator-resource-configuration
[8]: /containers/datadog_operator/crd_byoccluster/
[9]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /observability_pipelines/sources/opentelemetry/
[12]: /observability_pipelines/destinations/datadog_byoc_logs/
[13]: /getting_started/site/
[14]: /byoc-logs/operate/troubleshooting/#operator-managed-deployments
[15]: https://app.datadoghq.com/logs
[16]: /byoc-logs/operate/disk_buffer_durability/
[17]: /byoc-logs/operate/autoscaling/#configure-autoscaling-with-the-operator
[18]: /byoc-logs/operate/monitoring/
