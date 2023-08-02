---
title: Setting up Cloud Security Management Vulnerabilities
kind: documentation
further_reading:
- link: "/security/infrastructure_vulnerability/"
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

- [Cloud Security Management][1] (using [Cloud Workload Security][2] or [Cloud Security Posture Management][3]).
- [Datadog Agent][4] 7.46.0 or higher.
- [containerd][5] v1.5.6 or higher.
- [Helm Chart][6] v3.33.6 or higher.

## Setup for container image scanning

**Note**: This enables the Container Image Metadata collection and [Software Bill of Materials][10] collection in your Datadog Agent (allowing you to scan libraries present in container images, and detect vulnerabilities).

{{< tabs >}}
{{% tab "Kubernetes" %}}

Agent version `>= 7.46.0`:

Add the following to your `values.yaml` helm configuration file:

```yaml
agents:
  containers:
    agent:
      env:
        - name: DD_CONTAINER_IMAGE_ENABLED
          value: "true"
        - name: DD_SBOM_ENABLED
          value: "true"
        - name: DD_SBOM_CONTAINER_IMAGE_ENABLED
          value: "true"
```

{{% /tab %}}

{{% tab "ECS EC2" %}}

**Note**: Container image vulnerability scanning on ECS EC2 instances is only available on Agent version `7.46.0` or higher.

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
**Note**: If the agent fails to extract the SBOM from some container images, increase the Agent memory in the container definition:

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
{{< /tabs >}}

## Setup for host vulnerability scanning

**Note**: Container and host SBOM can be enabled at the same time by combining the [containers](#setup-for-container-image-scanning) setup with the following setup for hosts configuration:

```yaml
agents:
  containers:
    agent:
      env:
        - name: DD_SBOM_ENABLED
          value: "true"
        - name: DD_SBOM_HOST_ENABLED
          value: "true"
```

[1]: /security/cloud_security_management
[2]: /security/threats/
[3]: /security/cspm/
[4]: /agent/
[5]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[6]: /containers/kubernetes/installation/?tab=helm
[10]: https://www.cisa.gov/sbom

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
