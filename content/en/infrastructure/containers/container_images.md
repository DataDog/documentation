---
title: Container Images
kind: documentation
further_reading:
- link: "/security/vulnerabilities"
  tag: "Documentation"
  text: "Cloud Security Management Vulnerabilities"
- link: "/security/vulnerabilities/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting Cloud Security Management Vulnerabilities"
- link: "/security/cloud_security_management/setup/csm_pro?tab=aws#configure-the-agent-for-hosts-and-containers"
  tag: "Documentation"
  text: "Setting up CSM container vulnerabilities"
- link: "/security/cloud_security_management/setup/csm_enterprise?tab=aws#configure-the-agent-for-vulnerabilities"
  tag: "Documentation"
  text: "Setting up CSM host vulnerabilities"
- link: "https://www.datadoghq.com/blog/datadog-container-image-view/"
  tag: "Blog"
  text: "Enhance your troubleshooting workflow with Container Images in Datadog Container Monitoring"
---

## Overview

This page lists configuration options for the [Containers Images][1] page in Datadog. 

## Configure container images view

### Image collection

Datadog collects container image metadata to provide enhanced debugging context. 

#### Agent

{{< tabs >}}
{{% tab "Kubernetes (Helm)" %}}

If you are using helm version `>= 3.46.0`, image collection is [enabled by default][1].</br>
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

#### Container registries

##### Amazon Elastic Container Registry (Amazon ECR)
Set up the [AWS integration][4] to begin crawling Container Image metadata from AWS Elastic Container Registry

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/containers/images/
[4]: /integrations/amazon_web_services/