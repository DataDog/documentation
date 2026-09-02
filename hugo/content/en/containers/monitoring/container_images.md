---
title: Container Images Explorer
aliases:
  - /infrastructure/containers/container_images
description: Using the Container Images Explorer page in Datadog.
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

{{< img src="security/vulnerabilities/container_images.png" alt="The container images view highlighting vulnerabilities and container column sort feature" width="100%">}}

In Datadog, the [Container Images Explorer][1] provides insights into every image used in your environment. You can also view [Cloud Security][2] vulnerabilities in your container images, and track these vulnerabilities to specific layers.

Select the [Trends tab][3] for high-level insights across all of your images in your containerized infrastructure. Container image trends metrics can help you answer key questions about your security posture and deployment footprint over the span of weeks and months.

{{< img src="infrastructure/containerimages/container_image_trends.png" alt="The container images trends view highlighting image size, image age, vulnerabilities and running container count metrics" width="100%">}}

## Configuration

### Setup

Container Images Explorer uses data from the following sources:
- [Container collection](#enable-container-collection)
- [Image collection](#enable-image-collection)
- [Software Bill of Materials (SBOM) collection](#enable-sbom-collection)
- [Amazon ECR metadata](#enable-ecr-metadata-collection)

#### Enable container collection

Container collection is **enabled by default** for most Datadog Agent installations. See [Set up container collection][4] for details.

#### Enable image collection

{{< tabs >}}
{{% tab "Datadog Operator" %}}

When you install the Datadog Agent by using the Datadog Operator, image collection is automatically enabled.

{{% /tab %}}

{{% tab "Helm" %}}

When you install the Datadog Agent by using the [official Helm chart][1], image collection is enabled by default.

To verify that image collection is enabled, ensure that `datadog.containerImageCollection.enabled` is set to `true` in `datadog-values.yaml`.

```yaml
datadog:
  containerImageCollection:
    enabled: true
```

[1]: https://github.com/DataDog/helm-charts

{{% /tab %}}

{{% tab "Amazon ECS with EC2" %}}

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

[1]: /containers/amazon_ecs/?tab=awscli#setup

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

To automatically detect container image vulnerabilities, enable [Software Bill of Materials][5] (SBOM) collection for [Cloud Security Vulnerabilities][6]. Vulnerabilities are evaluated and scanned against your containers every hour.

<div class="alert alert-warning">
<strong>Windows environments</strong>: The Cloud Security Vulnerabilities feature is not available for containers running on Windows environments.<br/><br/>
<strong>Amazon ECS with AWS Fargate</strong>: The Cloud Security Vulnerabilities feature is available for ECS Fargate through <a href="/security/cloud_security_management/setup/agentless_scanning/compatibility">Agentless scanning</a>.<br/><br/>
<strong>Google Kubernetes Engine (GKE)</strong>: To enable SBOM collection in GKE, you must <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable">disable GKE's image streaming feature</a>.</div>


{{< tabs >}}
{{% tab "Datadog Operator" %}}

Add the following to your `datadog-agent.yaml` file:

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

{{% tab "Helm" %}}

Add the following to your `datadog-values.yaml` file:

```yaml
datadog:
  sbom:
    containerImage:
      enabled: true
    host:
      enabled: true
```

{{% /tab %}}

{{% tab "Amazon ECS with EC2" %}}

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

#### Enable ECR metadata collection

Set up [Datadog's AWS integration][7] and enable [resource collection][8] to collect container image metadata from Amazon ECR.

### Tagging container images

To tag your container images, see [Kubernetes Tag Extraction][9] or [Docker Tag Extraction][10].

## Data collected

| Metric Name | Description |
|-------------|-------------|
| **contimage.max_image_size** <br>(gauge) | The maximum size of the container image |
| **contimage.max_image_age** <br> (gauge) | The age of the container image |
| **contimage.running_containers** <br> (gauge) | The number of containers in which the container image is running |
| **contimage.vuln_count** <br> (gauge) | The total number of vulnerabilities found in the container image (for Datadog Cloud Security customers who have enabled Container Vulnerabilities) |


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/container-images
[2]: /security/cloud_security_management
[3]: https://app.datadoghq.com/container-images/image-trends
[4]: /containers/monitoring/containers/#set-up-container-collection
[5]: https://www.cisa.gov/sbom
[6]: /security/cloud_security_management/vulnerabilities
[7]: https://app.datadoghq.com/integrations/amazon-web-services
[8]: /integrations/amazon_web_services/#resource-collection
[9]: /containers/kubernetes/tag/
[10]: /containers/docker/tag/