---
title: Setting up Cloud Security Management Vulnerabilities
kind: documentation
further_reading:
- link: "/security/infrastructure_vulnerabilities/"
  tag: "Documentation"
  text: "CSM Vulnerabilities"
aliases:
  - /security/infrastructure_vulnerability/setup/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
CSM Vulnerabilities is not available on the US1-FED Datadog site.
</div>
{{< /site-region >}}

<div class="alert alert-info">CSM Vulnerabilities is in beta.</div>

## Prerequisites

- [Cloud Security Management][1] (using [Threats][2] or [Misconfigurations][3]).
- [Datadog Agent][4] 7.46.0 or later.
- [containerd][5] v1.5.6 or later (Kubernetes and hosts only).
- [Helm Chart][6] v3.33.6 or later (Kubernetes only).

## Setup for container image scanning

The following instructions enables the container image metadata collection and [Software Bill of Materials (SBOM)][10] collection in the Datadog Agent. This allows you to scan the libraries in container images to detect vulnerabilities.

{{< tabs >}}
{{% tab "Kubernetes" %}}

Add the following to your `values.yaml` helm configuration file:

```yaml
datadog:
  containerImageCollection:
    enabled: true
  sbom:
    containerImage:
      enabled: true
```

{{% /tab %}}

{{% tab "ECS EC2" %}}

To enable container image vulnerability scanning on your [ECS EC2 instances][7], add the following environment variables to your `datadog-agent` container definition:

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

[7]: /containers/amazon_ecs/?tab=awscli#setup

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

{{% /tab %}}

{{< /tabs >}}

## Setup for host vulnerability scanning

**Note**: Container and host SBOM can be enabled at the same time by combining the [containers](#setup-for-container-image-scanning) setup with the following setup for hosts configuration:

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
datadog:
  sbom:
    host:
      enabled: true
```

{{% /tab %}}

{{% tab "ECS EC2" %}}

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
                "name": "DD_SBOM_HOST_ENABLED",
                "value": "true"
              }
            ]
        }
    ]
  ...
}
```

{{% /tab %}}

{{% tab "Hosts" %}}

```yaml
sbom:
  enabled: true
  host:
    enabled: true
```

{{% /tab %}}

{{< /tabs >}}

[1]: /security/cloud_security_management
[2]: /security/threats/
[3]: /security/misconfigurations/
[4]: /agent/
[5]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[6]: /containers/kubernetes/installation/?tab=helm
[10]: https://www.cisa.gov/sbom

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
