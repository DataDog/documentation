---
title: Changing Your Container Registry
kind: guide
---

Datadog publishes container images in Google’s gcr.io, AWS’ ECR, and on Docker Hub:

| dockerhub.io                               | gcr.io                                              | public.ecr.aws                                            |
|--------------------------------------------|-----------------------------------------------------|-----------------------------------------------------------|
| datadog/agent                              | gcr.io/datadoghq/agent                              | public.ecr.aws/datadog/agent                              |
| datadog/cluster-agent                      | gcr.io/datadoghq/cluster-agent                      | public.ecr.aws/datadog/cluster-agent                      |
| datadog/dogstatsd                          | gcr.io/datadoghq/dogstatsd                          | public.ecr.aws/datadog/dogstatsd                          |
| datadog/synthetics-private-location-worker | gcr.io/datadoghq/synthetics-private-location-worker | public.ecr.aws/datadog/synthetics-private-location-worker |


Pulling from the GCR or ECR registry works the same (except for Notary) as pulling from Docker Hub. You can use the same command (with different parameters) and get the same image. 

**Note**: ECR and GCR do not support Notary. If you are verifying the signature of images pulled from Docker, this feature does not work on GCR or ECR.

To update your registry, you need to update your registry values based on the type of container environment you are deploying on.

## Docker

### Updating your registry

To update your containers registry, run the pull command for the new registry. To see the Docker pull commands for different container registries, see the examples in the [Overview of the Docker docs page][1].

## Kubernetes with Helm chart

To update your containers registry while deploying the Datadog Agent (or Datadog Cluster Agent) with the Datadog helm chart on Kubernetes (including GKE, EKS, AKS, and OpenShift) update the `values.yaml` to specify a different registry:

### Datadog Helm chart >= v2.7.0

1. Update your `values.yaml`:
    ```yaml
    registry: gcr.io/datadoghq
    ```
2. Remove any overrides for `agents.image.repository`, `clusterAgent.image.repository`, or `clusterChecksRunner.image.repository` in the `values.yaml`.

### Datadog Helm chart < v2.7.0 

Change the repository to `gcr.io`:

```yaml
agents:
  image:
    repository: gcr.io/datadoghq/agent  

clusterAgent:
  image:
    repository: gcr.io/datadoghq/cluster-agent

clusterChecksRunner:
  image:
    repository: gcr.io/datadoghq/agent
```

For more information about using the Datadog Helm chart, see the [Datadog Kubernetes documentation][2] and the example [`values.yaml`][3] file.

## Kubernetes with the Datadog Operator

To update your registry while deploying the Datadog Agent (or Datadog Cluster Agent) with the Datadog Operator: 

1. Update the Datadog Agent manifest file to override the default registry (`gcr.io/datadoghq`). For example, with  `public.ecr.aws/datadog`:

    ```yaml
    apiVersion: datadoghq.com/v1alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      // ..
      registry: gcr.io/datadoghq
    ```
2. Remove any overrides for the `spec.agents.image.name`, `spec.clusterAgent.image.name`, and `spec.clusterChecksRunner.image.name` fields.

For more information about the Datadog Operator, see [Deploying an Agent with the Operator][4].


### Using the public.ecr.aws/datadog registry with Helm

You could also switch from the default `gcr.io/datadoghq` registry to the `public.ecr.aws/datadog` registry when installing the Operator with the Helm chart. To switch to the `public.ecr.aws/datadog` registry:

Update [`values.yaml`][5] with the new image:

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS

To update your registry while deploying on ECS, in the `datadog-agent-ecs.json` file, change the value of the `"image"` key under `containerDefinitions` to `"public.ecr.aws/datadog/agent:latest"`: 

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

For more information about deploying Datadog on ECS, see the [Datadog ECS documentation][6] and the example [`datadog-agent-ecs.json` file][6].

## Fargate

To update your registry while deploying on Fargate, update the image in the Fargate task definition to use `public.ecr.aws`:

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

The next time the task starts, it pulls from `public.ecr.aws` instead of Docker Hub. For more information about deploying on Fargate, see [Deploying the Agent on ECS][7] and [Deploying the Agent on EKS][8].


## Cluster Agent

If you’re using the Helm chart to deploy the Datadog Agent and the Datadog Cluster Agent, follow the instructions in [Kubernetes with Helm chart](#kubernetes-with-helm-chart), and no other updates are needed. The change to the Helm `values.yaml` outlined above changes the repository that both the Cluster Agent and the Datadog Agent are pulled from.

If you’re using the Datadog Operator to deploy the Datadog Cluster Agent, follow the instructions in [Kubernetes with the Datadog Operator](#kubernetes-with-the-datadog-operator), and no other updates are needed. The instructions for updating the Operator configuration updates the repository that both the Cluster Agent and the Datadog Agent are pulled from.

For more information about the Datadog Cluster Agent, see the [Cluster Agent docs][9], and the [setup docs][10].

## Kubernetes Helm for the Datadog Private Location worker

To update your registry for the Private Location worker, update the `datadog/synthetics-private-location-worker` image to the `public.ecr.aws/datadog/synthetics-private-location-worker` or `gcr.io/datadoghq/synthetics-private-location-worker` images.

To change the default repository (`gcr.io/datadoghq`), update the `values.yaml` with the new image:

```yaml
image:
  repository: gcr.io/datadoghq/synthetics-private-location-worker
```

[1]: https://docs.datadoghq.com/agent/docker/?tab=standard
[2]: https://docs.datadoghq.com/agent/kubernetes/?tab=helm
[3]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[4]: https://docs.datadoghq.com/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[6]: https://docs.datadoghq.com/agent/amazon_ecs/?tab=awscli
[7]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[9]: https://docs.datadoghq.com/agent/cluster_agent/
[10]: https://docs.datadoghq.com/agent/cluster_agent/setup/?tab=helm
