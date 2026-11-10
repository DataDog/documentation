---
title: Install BYOC Logs with the Datadog Operator
description: Deploy a new BYOC cluster and Observability Pipelines Workers on AWS EKS with the Datadog Operator.
further_reading:
- link: "/containers/datadog_operator/crd_byoccluster/"
  tag: "Documentation"
  text: "DatadogBYOCCluster configuration"
- link: "/containers/datadog_operator/crd_byoccluster/#image-overrides"
  tag: "Documentation"
  text: "Configure image overrides"
- link: "/byoc-logs/operate/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshoot BYOC"
---

## Overview

Use Datadog Operator v1.33.0 or later to deploy a new BYOC cluster on AWS EKS. A `DatadogBYOCCluster` custom resource declares the BYOC engine components and the Observability Pipelines Workers that send logs to them. The Operator creates and reconciles their Kubernetes resources, configures the Worker-to-indexer connection, and reports their availability.

This guide covers new deployments on AWS using the [reverse connection to Datadog][1]. The Operator does not support BYOC Ingress configuration. If your deployment requires Ingress, contact your Datadog representative. For GCP or Azure, use the [Helm installation guides][2].

The Operator uses default images for the BYOC engine and Workers. Upgrading the Operator also updates these default images. Explicit image tags or digests in `spec.imageOverrides` pin the corresponding image. See [Image overrides][3].

## Prerequisites

- Access to BYOC Logs and Observability Pipelines in your Datadog organization.
- An EKS cluster that meets the [BYOC Kubernetes cluster requirements][21], with `kubectl` access and Helm installed.
- An S3 bucket and a PostgreSQL database reachable from the BYOC pods. The Operator does not provision these services. See the [AWS prerequisites][4].
- An IAM role with the [required S3 permissions][5] and an IRSA trust policy for the BYOC service account.
- A persistent-volume provisioner and a StorageClass, either set as the default or specified in the volume claim templates.
- Outbound access to Datadog and image registries, plus connectivity to S3 and PostgreSQL. Log sources must be able to reach the Worker's Service.

The example uses one replica per required component. Size [resources, replicas, and storage][7] for your workload. Omitted settings use the [Operator defaults][7].

### Configure the IAM role

For this example, configure the [IRSA role][6] to trust `system:serviceaccount:byoc:byoc-demo` with audience `sts.amazonaws.com`. Set its ARN in `spec.provider.aws.irsaRoleARN`. The Operator creates the `byoc-demo` service account in the `byoc` namespace.

## Install the Operator

The BYOC controller is disabled by default. Enable it and install both the `DatadogBYOCCluster` and `DatadogObservabilityPipelinesWorker` CRDs. You create the `DatadogBYOCCluster` resource; the Operator creates and manages its Worker resources.

Add the Datadog chart repository:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

For a new Operator installation dedicated to BYOC, create `operator-values.yaml`. These settings enable the BYOC controllers and CRDs and disable the unrelated controllers and CRDs enabled by default:

```yaml
datadogBYOCCluster:
  enabled: true
datadogAgent:
  enabled: false
datadogAgentInternal:
  enabled: false
datadogCSIDriver:
  enabled: false

datadogCRDs:
  crds:
    datadogAgents: false
    datadogMetrics: false
    datadogPodAutoscalers: false
    datadogPodAutoscalerClusterProfiles: false
    datadogMonitors: false
    datadogCSIDrivers: false
    datadogAgentInternals: false
    datadogInstrumentations: false
    datadogBYOCClusters: true
    datadogObservabilityPipelinesWorkers: true

watchNamespaces:
  - ""
```

Use Datadog Operator Helm chart version 2.33.0 or later with the chart's default Operator image. The chart version and Operator image version are separate version numbers.

`watchNamespaces: [""]` watches all namespaces, including the `byoc` namespace used in this guide. To restrict the watch scope, list the namespaces to manage, including `byoc`. If you omit this setting, the Operator watches only its installation namespace.

For a new Operator installation, run:

```shell
helm install datadog-operator datadog/datadog-operator \
  --version 2.33.0 \
  --namespace datadog \
  --create-namespace \
  --values operator-values.yaml
```

If an Operator is already installed, enable `datadogBYOCCluster` and the two BYOC-related CRDs in its existing values file. Upgrade that release in its existing namespace. Preserve other enabled controllers and CRDs. Don't apply the `false` settings from the previous example. Include `byoc` in its watch scope. See [Operator installation][9].

Verify that both CRDs are installed and the Operator pod is running:

```shell
kubectl get crd datadogbyocclusters.datadoghq.com \
  datadogobservabilitypipelinesworkers.datadoghq.com
kubectl get pods -n datadog
```

## Create the pipeline

Create the Observability Pipeline before applying the BYOC resource. The Operator deploys Workers for an existing pipeline. It doesn't create the pipeline.

1. Open [Observability Pipelines][10] and create a pipeline.
2. Choose a [source][11].
3. Configure any processors you need and a [BYOC destination][12]. The Operator supplies the destination endpoint to the Worker.
4. Save the pipeline and copy its pipeline ID. Use this ID in `spec.components.pipelines[].pipelineID`.

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

Save the following configuration as `byoc-cluster.yaml`. Replace `<AWS_ACCOUNT_ID>`, `<BYOC_ROLE>`, `<PIPELINE_ID>`, and `<S3_BUCKET>`. Set the AWS region to match the bucket and set `spec.datadog.site` to your [Datadog site][13]. Replace `<SOURCE_PORT_NAME>` and `<SOURCE_PORT>` with the [port name and numeric port][19] for the source you configured in the pipeline.

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
    compactor:
      replicas: 1
      resources:
        requests:
          cpu: "4"
          memory: 16Gi
        limits:
          memory: 16Gi
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
```

Apply the resource:

```shell
kubectl apply -f byoc-cluster.yaml
```

The Operator sets the Worker destination to the cluster's indexer endpoint. The Worker inherits the shared Datadog site and API key. Do not install a separate Worker Helm release for the same entry in `spec.components.pipelines`.

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

In Datadog, open the [**BYOC Logs** page][20] and confirm that the cluster is connected.

### Send a test log

Send a test log through the source configured in your pipeline. For sources that send logs to the Worker, use the Service address `byoc-demo-pipeline-default.byoc.svc.cluster.local` with the configured source port and protocol. This Service is accessible from inside the Kubernetes cluster. Follow the [source documentation][11] for sender configuration.

In [Log Explorer][15], select the cluster's BYOC Logs index and confirm that the test log appears.

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

Deleting the cluster doesn't delete the corresponding S3 bucket or PostgreSQL database. Inspect remaining PVCs before any separate storage cleanup; they can contain buffered data. Delete the Operator only after its managed resources have finished cleanup and no other resources depend on it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /byoc-logs/introduction/network/
[2]: /byoc-logs/install/
[3]: /containers/datadog_operator/crd_byoccluster/#image-overrides
[4]: /byoc-logs/install/aws_eks/#prerequisites
[5]: /byoc-logs/install/aws_eks/#iam-access-for-s3
[6]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
[7]: /byoc-logs/operate/sizing/#operator-resource-configuration
[8]: /containers/datadog_operator/crd_byoccluster/
[9]: https://github.com/DataDog/datadog-operator/blob/main/docs/installation.md
[10]: https://app.datadoghq.com/observability-pipelines
[11]: /observability_pipelines/sources/
[12]: /observability_pipelines/destinations/datadog_byoc_logs/
[13]: /getting_started/site/
[14]: /byoc-logs/operate/troubleshooting/
[15]: https://app.datadoghq.com/logs
[16]: /byoc-logs/operate/disk_buffer_durability/
[17]: /byoc-logs/operate/autoscaling/#configure-autoscaling-with-the-operator
[18]: /byoc-logs/operate/monitoring/
[19]: /containers/datadog_operator/crd_byoccluster/#pipelines-and-ports
[20]: https://app.datadoghq.com/byoc-logs
[21]: /byoc-logs/install/#kubernetes-cluster-requirements
