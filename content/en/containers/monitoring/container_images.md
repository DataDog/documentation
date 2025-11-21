---
title: Container Images View
aliases:
  - /infrastructure/containers/container_images
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-container-image-view/"
  tag: "Blog"
  text: "Enhance your troubleshooting workflow with Container Images in Datadog Container Monitoring"
- link: "/security/cloud_security_management/vulnerabilities"
  tag: "Documentation"
  text: "Cloud Security Vulnerabilities"
- link: "/infrastructure/containers/container_images/#enable-sbom-collection"
  tag: "Documentation"
  text: "Enable SBOM collection in Cloud Security Vulnerabilities"
- link: "/security/cloud_security_management/troubleshooting/vulnerabilities/"
  tag: "Documentation"
  text: "Troubleshooting Cloud Security Vulnerabilities"
---

## Overview

The [container images view][1] in Datadog provides key insights into every image used in your environment to help you assess their deployment footprint. It also detects and remediates security and performance issues that can affect multiple containers. You can view container image details alongside the rest of your container data to troubleshoot image issues affecting infrastructure health. Additionally, you can view vulnerabilities from [Cloud Security][2] found in your container images, and trace those vulnerabilities to specific layers, so you can pinpoint and remediate your security risks faster.

{{< img src="security/vulnerabilities/container_images.png" alt="The container images view highlighting vulnerabilities and container column sort feature" width="100%">}}

The [container image trends view][9] provides high-level insights across all of your images in your containerized infrastructure. Container image trends metrics can help you answer key questions about your security posture and deployment footprint over the span of weeks and months.

{{< img src="infrastructure/containerimages/container_image_trends.png" alt="The container images trends view highlighting image size, image age, vulnerabilities and running container count metrics" width="100%">}}

## Configure container images view

Images on the container images view are collected from several different sources (Live Containers, Image Collection, and Amazon ECR). The following instructions describe how to enable images from each of these sources.

### Live Containers

To enable live container collection, see the [containers][3] documentation. It provides information on enabling the Process Agent, and excluding and including containers.

### Image collection

Datadog collects container image metadata to provide enhanced debugging context for related containers and [Cloud Security][8] vulnerabilities.

#### Enable container image collection

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

In Datadog Operator v1.3.0+, image collection is enabled by default. If you are using an older version of the Datadog Operator, Datadog recommends that you update it to v1.3.0+.


{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

In the Datadog Helm chart v3.46.0+, image collection is [enabled by default][1]. To verify this, or if you are using an earlier Helm chart version, ensure that `datadog.containerImageCollection.enabled` is set to `true` in `datadog-values.yaml`.

```yaml
datadog:
  containerImageCollection:
    enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "ECS EC2" %}}

To enable container image collection on your [ECS EC2 instances][1], add the following environment variables to your `datadog-agent` container definition:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

[1]: https://docs.datadoghq.com/containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "Hosts" %}}

Add the following to your `datadog.yaml` configuration file:

```yaml
container_image:
  enabled: true
```

[1]: /containers/amazon_ecs/?tab=awscli#setup
{{% /tab %}}
{{< /tabs >}}

#### Enable SBOM collection

The following instructions turn on [Software Bill of Materials][5] (SBOM) collection for [Cloud Security Vulnerabilities][8]. SBOM collection enables automatic detection of container image vulnerabilities. Vulnerabilities are evaluated and scanned against your containers every hour.

**Notes**:
- SBOM collection is not compatible with the image streaming feature in Google Kubernetes Engine (GKE). To disable it, see the [Disable Image streaming][11] section of the GKE docs.
- The Cloud Security Vulnerabilities feature is available for Amazon ECS Fargate with [Amazon ECR agentless scanning][13].
- The Cloud Security Vulnerabilities feature is not available for containers running on Windows environments.

{{< tabs >}}
{{% tab "Kubernetes (Operator)" %}}

Add the following to the spec section of your `datadog-agent.yaml` file:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    # ...
    sbom:
      enabled: true
      containerImage:
        enabled: true
      host:
        enabled: true
```

{{% /tab %}}

{{% tab "Kubernetes (Helm)" %}}

Add the following to your `datadog-values.yaml` Helm configuration file:

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
    host:
      enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "ECS EC2" %}}

To enable container image vulnerability scanning on your [ECS EC2 instances][1], add the following environment variables to your `datadog-agent` container definition:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
             ...
            "environment": [
              ...
              {
                "name": "DD_SBOM_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_HOST_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

If the Agent fails to extract the SBOM from the container image, increase the Agent memory in the container definition:

```yaml
{
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "memory": 256,
            ...
        }
     ]
    ...
}
```
[1]: https://docs.datadoghq.com/containers/amazon_ecs/?tab=awscli#setup

{{% /tab %}}

{{% tab "Hosts" %}}

Add the following to your `datadog.yaml` configuration file:

```yaml
sbom:
  enabled: true
  container_image:
    enabled: true
  host:
    enabled: true
```

[1]: /containers/amazon_ecs/?tab=awscli#setup
{{% /tab %}}
{{< /tabs >}}

### Container registries

#### Amazon Elastic Container Registry (Amazon ECR)

Set up the [AWS integration][4] and enable [Resource Collection][12] to begin crawling Container Image metadata from Amazon ECR.

## Configure container images trends

Use the container image trends configuration modal and toggle **Enable Container Image Metric Collection** to turn on image metric generation.

Image metrics are collected from the [Live Containers](#live-containers) and [Image Check](#image-collection) sources. Follow the same instructions as above to ensure that these collections are enabled across your entire infrastructure and take full advantage of the trends view.

{{< img src="infrastructure/containerimages/container_image_trends_configuration_modal.png" alt="The container images trends configuration modal" width="100%">}}

### Data collected

| Metric Name | Description |
|-------------|-------------|
| **contimage.max_image_size** <br>(gauge) | The maximum size of the container image |
| **contimage.max_image_age** <br> (gauge) | The age of the container image |
| **contimage.running_containers** <br> (gauge) | The number of containers in which the container image is running |
| **contimage.vuln_count** <br> (gauge) | The total number of vulnerabilities found in the container image (for Datadog Cloud Security customers who have enabled Container Vulnerabilities) |

## Container image tagging

Tag and enrich your container images with arbitrary tags by using [extract labels as tags][6] configuration on the Agent. These tags are then picked by the Container Image check.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/container-images
[2]: /security/cloud_security_management
[3]: /infrastructure/containers/?tab=docker#setup
[4]: /integrations/amazon_web_services/#setup
[5]: https://www.cisa.gov/sbom
[6]: /containers/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[8]: /security/cloud_security_management/vulnerabilities
[9]: https://app.datadoghq.com/container-images/image-trends
[11]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
[12]: /integrations/amazon_web_services/#resource-collection
[13]: /security/cloud_security_management/setup/agentless_scanning/compatibility
