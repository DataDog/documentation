---
title: Container Images View
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-container-image-view/"
  tag: "Blog"
  text: "Enhance your troubleshooting workflow with Container Images in Datadog Container Monitoring"
- link: "/security/vulnerabilities"
  tag: "Documentation"
  text: "Cloud Security Management Vulnerabilities"
- link: "/security/cloud_security_management/setup/csm_pro?tab=aws#configure-the-agent-for-hosts-and-containers"
  tag: "Documentation"
  text: "Setting up CSM container vulnerabilities"
- link: "/security/vulnerabilities/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Cloud Security Management Vulnerabilities"
---

## Overview

The [Container Images View][1] in Datadog provides key insights into every image used in your environment, helping you assess their deployment footprint, as well as detect and remediate security and performance issues that can affect multiple containers. You can view container image details alongside the rest of your container data, allowing you to troubleshoot image issues affecting infrastructure health. Additionally, you can view vulnerabilities found in your container images from [Cloud Security Management][2] (CSM) to help you streamline your security efforts.

{{< img src="security/vulnerabilities/container_images.png" alt="The Container Images view highlighting vulnerabilities and container column sort feature" width="100%">}}

## Configure Container Images View

Images on the container images view are collected from several different sources (Live Containers, Image Collection, and Amazon ECR). The following instructions describe how to enable images from each of these sources.

### Live Containers

To enable live container collection, see the [containers][3] documentation for information on enabling the Process Agent, and excluding and including containers.

### Image collection

Datadog collects container image metadata to provide enhanced debugging context for related containers and [Cloud Security Management][8] (CSM) vulnerabilities.

#### Configure the Agent

The following instructions enable the container image metadata collection and [Software Bill of Materials][5] (SBOM) collection in the Datadog Agent for CSM Vulnerabilities. This allows you to scan the libraries in container images to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers every hour.

**Note**: CSM Vulnerabilities is not available for AWS Fargate or Windows environments.

{{< tabs >}}
{{% tab "Kubernetes (Helm)" %}}

If you are using Helm version `>= 3.46.0`, image collection is [enabled by default][1].</br>
Or, add the following to your `values.yaml` Helm configuration file:

```yaml
datadog:
  containerImageCollection:
    enabled: true
  sbom:
    containerImage:
      enabled: true
```
[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml#L651
{{% /tab %}}

{{% tab "Kubernetes (Operator)" %}}

Add the following to the spec section of your `values.yaml` file:

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
```

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
                "name": "DD_CONTAINER_IMAGE_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_ENABLED",
                "value": "true"
              },
              {
                "name": "DD_SBOM_CONTAINER_IMAGE_ENABLED",
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
container_image:
  enabled: true
```

[1]: /containers/amazon_ecs/?tab=awscli#setup
{{% /tab %}}
{{< /tabs >}}

### Container registries

#### Amazon Elastic Container Registry (Amazon ECR)

Set up the [AWS integration][4] to begin crawling Container Image metadata from Amazon ECR.

## Container image tagging

Tag your container images with arbitrary tags by using [extract labels as tags][6] configuration on the Agent. These tags will then be picked by the Container Image check.

{{< img src="infrastructure/livecontainers/container_images/container_images_tagging.png" alt="The details side panel of a specific container in the Container Images page highlighting container images tags" width="100%">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers/images/
[2]: /security/cloud_security_management
[3]: /infrastructure/containers/?tab=docker#setup
[4]: /integrations/amazon_web_services/
[5]: https://www.cisa.gov/sbom
[6]: /containers/docker/tag/?tab=containerizedagent#extract-labels-as-tags
[8]: /security/vulnerabilities