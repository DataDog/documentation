---
title: Enabling CSM Pro on Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 60 # a number that represents relative weight. 
---

Use the following instructions to enable container image metadata collection and [Software Bill of Materials (SBOM)][1] collection in the Datadog Agent for [CSM Vulnerabilities][2]. This allows you to scan the libraries in container images to detect vulnerabilities. Vulnerabilities are evaluated and and scanned against your containers every hour.

To learn more about the supported deployment types for each CSM feature, see [Setting Up Cloud Security Management][3].

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. Add the following to the `spec` section of the `datadog-agent.yaml` file:

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
          # Image collection is enabled by default with Datadog Operator version `>= 1.3.0`
          containerImage:
            enabled: true
        # Enables Kubernetes Security Posture Management for CSM Misconfigurations
        cspm:
          enabled: true
    ```

2. Apply the changes and restart the Agent.

{{% /tab %}}

{{% tab "Helm" %}}

1. Add the following to the `datadog` section of the `datadog-values.yaml` file:

    ```yaml
    datadog:
      # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`
      containerImageCollection:
        enabled: true
      sbom:
        containerImage:
          enabled: true
          # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
          # uncompressedLayersSupport: true
      securityAgent:
        # Enables Kubernetes Security Posture Management for CSM Misconfigurations
        compliance:
          enabled: true
    ```

2. Restart the Agent.

{{% /tab %}}

{{< /tabs >}}

[1]: https://www.cisa.gov/sbom
[2]: /security/cloud_security_management/vulnerabilities
[3]: /security/cloud_security_management/setup#supported-deployment-types-and-features