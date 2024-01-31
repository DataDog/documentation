---
title: Setting up CSM Pro
kind: documentation
further_reading:
  - link: "/security/cloud_security_management/setup"
    tag: "Documentation"
    text: "Setting up Cloud Security Management"
  - link: "/security/misconfigurations/"
    tag: "Documentation"
    text: "Cloud Security Management Misconfigurations"
  - link: "/security/vulnerabilities/"
    tag: "Documentation"
    text: "Cloud Security Management Vulnerabilities"
---

The Cloud Security Management (CSM) Pro package includes [CSM Misconfigurations][1] (cloud accounts) and [CSM Vulnerabilities][2] (container images). To learn more about the available CSM packages, see [Setting up Cloud Security Management][3].

## Enable resource scanning for cloud accounts

To enable resource scanning for your cloud accounts for CSM Misconfigurations, you must first set up the integration and then enable CSM for each AWS account, Azure subscription, and Google Cloud project.

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

## Configure the Agent for containers

The following instructions enables the container image metadata collection and [Software Bill of Materials (SBOM)][10] collection in the Datadog Agent for CSM Vulnerabilities. This allows you to scan the libraries in container images to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers every hour.

### Follow the in-app instructions (recommended)

To enable CSM Vulnerabilities on the Agent for your containers, navigate to the [**Cloud Security Management Setup** page][5] and click **Hosts and containers**.

{{< img src="security/csm/hosts_containers_setup_2.png" alt="The Hosts and containers section on the Cloud Security Management Setup page" width="80%">}}

For each version of the Agent that is installed, click **Enable** and follow the step-by-step instructions.

Alternatively, use the following examples to enable CSM Vulnerabilities on your containers:


{{< tabs >}}

{{% tab "Kubernetes (Operator)" %}}

Image collection is enabled by default with Datadog Operator version `>= 1.3.0`.</br>
Or, add the following to the spec section of your `values.yaml` file:

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

{{% tab "Kubernetes (Helm)" %}}

If you are using helm version `>= 3.46.0`, image collection is [enabled by default][1].</br>
Or, add the following to your `values.yaml` helm configuration file:

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
[2]: /security/vulnerabilities
[3]: /security/cloud_security_management/setup
[4]: /security/cloud_security_management
[5]: /security/threats/
[8]: https://kubernetes.io/docs/tasks/administer-cluster/migrating-from-dockershim/find-out-runtime-you-use/
[9]: /containers/kubernetes/installation/?tab=helm
[10]: https://www.cisa.gov/sbom
[11]: /agent