---
title: Setting Up CSM Pro
kind: documentation
further_reading:
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: "Setting up Cloud Security Management"
  - link: "/security/misconfigurations/"
    tag: "Documentation"
    text: "Cloud Security Management Misconfigurations"
  - link: "/security/infrastructure_vulnerabilities/"
    tag: "Documentation"
    text: "Cloud Security Management Vulnerabilities"
---

The Cloud Security Management (CSM) Pro package includes [CSM Misconfigurations][1] (cloud accounts) and [CSM Vulnerabilities][2] (container images). To learn more about the available CSM packages, see [Setting up Cloud Security Management][3].

## Enable resource scanning for cloud accounts

To enable resource scanning for your cloud accounts, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, and Google Cloud project.

{{< tabs >}}
{{% tab "AWS" %}}

{{% csm-setup-aws %}}

{{% /tab %}}

{{% tab "Azure" %}}

{{% csm-setup-azure %}}

{{% /tab %}}

{{% tab "Google Cloud" %}}

{{% csm-setup-google-cloud %}}

{{% /tab %}}

{{< /tabs >}}


## Setup for container image scanning

The following instructions enables the container image metadata collection and [Software Bill of Materials (SBOM)][10] collection in the Datadog Agent. This allows you to scan the libraries in container images to detect vulnerabilities.

**Note**: Vulnerabilities are evaluated and and scanned against your containers every hour.

### Prerequisites

- [Cloud Security Management][4] (using [Threats][5] or [Misconfigurations][1]).
- [Datadog Agent][6] 7.46.0 or later.
- [containerd][7] v1.5.6 or later (Kubernetes and hosts only).
- [Helm Chart][8] v3.33.6 or later (Kubernetes only).

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


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/misconfigurations
[2]: /security/infrastructure_vulnerabilities
[3]: /security/cloud_security_management/setup
[4]: /security/cloud_security_management
[5]: /security/threats/
[6]: /agent/
[7]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[8]: /containers/kubernetes/installation/?tab=helm
[10]: https://www.cisa.gov/sbom