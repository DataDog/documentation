---
title: Changing Your Container Registry
description: Switch between Datadog container image registries for different deployment environments and requirements
aliases:
 - /agent/guide/changing_container_registry
---

Datadog publishes container images on the Datadog Container Registry, Google Artifact Registry (GAR), Amazon ECR, Azure ACR, and Docker Hub:

{{% container-images-table %}}

## Choosing a container registry

When selecting a container registry, Datadog recommends the following approach:

1. **Private pull-through cache**: Set up a pull-through cache in your own infrastructure. This provides the best control over your image dependencies. See your cloud provider's documentation:
   - AWS: [Amazon ECR pull through cache][12]
   - GCP: [Artifact Registry remote repositories][13]
   - Azure: [Azure Container Registry cache][14]

2. **Cloud-provider registries**: If your deployment is in a specific cloud provider (AWS, GCP, or Azure), use the corresponding Datadog public registry:
   - AWS deployments: `public.ecr.aws/datadog`
   - GCP deployments: `gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, or `asia.gcr.io/datadoghq`
   - Azure deployments: `datadoghq.azurecr.io`

3. **Datadog Container Registry**: Use `registry.datadoghq.com` for simplicity. This registry requires no additional setup. Allowlist the endpoint and `us-docker.pkg.dev/datadog-prod/public-images` for failover. It has very high rate limits and provides a consistent experience across all environments.

4. **Docker Hub**: Avoid unless you have a Docker Hub subscription, as it is subject to rate limits. Only Docker Hub supports Notary for image signature verification.

<div class="alert alert-info">The Helm chart and Datadog Operator will default to the Datadog Container Registry in a future release.</div>

To update your registry, update your registry values based on the type of container environment you are deploying on. You can also use a private registry, but you need to [create a pull secret][1] to pull the images.

## Docker

### Updating your registry

To update your containers registry, run the pull command for the new registry. To see the Docker pull commands for different container registries, see the examples in the [Overview of the Docker docs page][2].

## Kubernetes with Helm chart

To update your containers registry while deploying the Datadog Agent (or Datadog Cluster Agent) with the Datadog helm chart on Kubernetes (including GKE, EKS, AKS, and OpenShift) update the `values.yaml` to specify a different registry:

### Datadog Helm chart >= v2.7.0

1. Update your `values.yaml`:
    ```yaml
    registry: registry.datadoghq.com
    ```
2. Remove any overrides for `agents.image.repository`, `clusterAgent.image.repository`, or `clusterChecksRunner.image.repository` in the `values.yaml`.

### Datadog Helm chart < v2.7.0

Change the repository to the registry of your choice. For example, using the Datadog Container Registry:

```yaml
agents:
  image:
    repository: registry.datadoghq.com/agent

clusterAgent:
  image:
    repository: registry.datadoghq.com/cluster-agent

clusterChecksRunner:
  image:
    repository: registry.datadoghq.com/agent
```

For more information about using the Datadog Helm chart, see the [Datadog Kubernetes documentation][3] and the example [`values.yaml`][4] file.

If using a private registry, you will need to add a pull secret to the `[key].image.pullSecrets` field to each image.
```yaml
agents:
  image:
    pullSecrets:
      - name: PrivateRegistrySecret

clusterAgent:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret

clusterChecksRunner:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret
```

## Kubernetes with the Datadog Operator

To update your registry while deploying the Datadog Agent (or Datadog Cluster Agent) with the Datadog Operator:

1. Update the Datadog Agent manifest file to override the default registry (`gcr.io/datadoghq`). For example, with `public.ecr.aws/datadog`:
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: public.ecr.aws/datadog
  // ..
```

2. Remove any overrides for the `spec.override.nodeAgent.image.name`, `spec.override.clusterAgent.image.name`, and `spec.override.clusterChecksRunner.image.name` fields.
3. If using a private registry, you will need to add a pull secret to the `[key].image.pullSecrets` field to each image.
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterChecksRunner:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
  // ..
```

For more information about the Datadog Operator, see [Deploying an Agent with the Operator][5].


### Using another container registry with Helm

You can switch from the default `gcr.io/datadoghq` registry to another registry, such as `public.ecr.aws/datadog` when installing the Operator with the Helm chart:

Update [`values.yaml`][6] with the new image:

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS

To update your registry while deploying on ECS, in the `datadog-agent-ecs.json` file, change the value of the `"image"` key under `containerDefinitions` to `"public.ecr.aws/datadog/agent:latest"`:

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

For more information about deploying Datadog on ECS, see the [Datadog ECS documentation][7] and the example [`datadog-agent-ecs.json`][7] file.

## Fargate

To update your registry while deploying on Fargate, update the image in the Fargate task definition to use `public.ecr.aws`:

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

The next time the task starts, it pulls from `public.ecr.aws` instead of Docker Hub. For more information about deploying on Fargate, see [Deploying the Agent on ECS][8] and [Deploying the Agent on EKS][9].

## Cluster Agent

If you're using the Helm chart to deploy the Datadog Agent and the Datadog Cluster Agent, follow the instructions in [Kubernetes with Helm chart](#kubernetes-with-helm-chart), and no other updates are needed. The change to the Helm `values.yaml` outlined above changes the repository that both the Cluster Agent and the Datadog Agent are pulled from.

If you're using the Datadog Operator to deploy the Datadog Cluster Agent, follow the instructions in [Kubernetes with the Datadog Operator](#kubernetes-with-the-datadog-operator), and no other updates are needed. The instructions for updating the Operator configuration updates the repository that both the Cluster Agent and the Datadog Agent are pulled from.

For more information about the Datadog Cluster Agent, see the [Cluster Agent docs][10], and the [setup docs][11].

## Kubernetes Helm for the Datadog Private Location worker

To update your registry for the Private Location worker, update the `datadog/synthetics-private-location-worker` image to a different registry such as `public.ecr.aws/datadog/synthetics-private-location-worker` or `gcr.io/datadoghq/synthetics-private-location-worker`.

To change the default repository (`gcr.io/datadoghq`), update the `values.yaml` with the new image:

```yaml
image:
  repository: public.ecr.aws/datadog/synthetics-private-location-worker
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials
[2]: https://docs.datadoghq.com/agent/docker/?tab=standard
[3]: https://docs.datadoghq.com/agent/kubernetes/?tab=helm
[4]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[5]: https://docs.datadoghq.com/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[7]: https://docs.datadoghq.com/agent/amazon_ecs/?tab=awscli
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[9]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[10]: https://docs.datadoghq.com/agent/cluster_agent/
[11]: https://docs.datadoghq.com/agent/cluster_agent/setup/?tab=helm
[12]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/pull-through-cache.html
[13]: https://cloud.google.com/artifact-registry/docs/repositories/remote-repo
[14]: https://learn.microsoft.com/en-us/azure/container-registry/container-registry-artifact-cache
