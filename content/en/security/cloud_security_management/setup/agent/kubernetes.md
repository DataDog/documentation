---
title: Setting up Cloud Security on Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 60 # a number that represents relative weight.
aliases:
  - /security/cloud_security_management/setup/csm_cloud_workload_security/agent/kubernetes/
  - /security/cloud_security_management/setup/csm_pro/agent/kubernetes/
  - /security/cloud_security_management/setup/csm_enterprise/agent/kubernetes/
---

Use the following instructions to enable Misconfigurations and Vulnerability Management.

{{< partial name="security-platform/CSW-billing-note.html" >}}

## Prerequisites

- Latest Datadog Agent version. For installation instructions, see [Getting Started with the Agent][5] or install the Agent from the [Datadog UI][6].

**Note**: SBOM collection is not compatible with the image streaming feature in Google Kubernetes Engine (GKE). To disable it, see the [Disable Image streaming][7] section of the GKE docs.

## Installation

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. Add the following to the `spec` section of the `datadog-agent.yaml` file:

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true

        # Enables Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true

          # Enables Container Vulnerability Management
          containerImage:
            enabled: true
    
          # Enables Host Vulnerability Management
          host:
            enabled: true
    ```

2. Apply the changes and restart the Agent.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. Add the following to the `datadog` section of the `datadog-values.yaml` file:

    ```yaml
    # datadog-values.yaml file
    datadog:
      securityAgent:
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true

      # Enables Software Bill of Materials (SBOM) collection
      sbom:
        # Enables Container Vulnerability Management
        containerImage:
          enabled: true

        # Enables Host Vulnerability Management
        host:
          enabled: true
    ```

2. Restart the Agent.

{{% /tab %}}

{{< /tabs >}}

[1]: /security/cloud_security_management/misconfigurations/
[2]: /security/threats
[3]: /security/cloud_security_management/vulnerabilities
[4]: /security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable
