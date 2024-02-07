---
title: Enabling CSM Enterprise on Kubernetes
kind: documentation
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 60 # a number that represents relative weight. 
---

Use the following instructions to enable [CSM Misconfigurations][1], [CSM Threats][2], and [CSM Vulnerabilities][3] on Kubernetes. To learn more about the supported deployment types for each CSM feature, see [Setting Up Cloud Security Management][4].

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
        remoteConfiguration:
          enabled: true
        cws:
          enabled: true
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true
        # Enables the image metadata collection and Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true
          # Image collection is enabled by default with Datadog Operator version `>= 1.3.0`.
          containerImage:
            enabled: true
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
      remoteConfiguration:
        enabled: true
      # Enables CSM Misconfigurations and CSM Threats
      securityAgent:
        runtime:
          enabled: true
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true
      # Enables CSM Vulnerabilities
      # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`.
      containerImageCollection:
        enabled: true
      sbom:
        containerImage:
          enabled: true
          # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
          # uncompressedLayersSupport: true
        host:
          enabled: true
    ```

2. Restart the Agent.

{{% /tab %}}

{{% tab "DaemonSet" %}}

Add the following settings to the `env` section of `security-agent` and `system-probe` in the `daemonset.yaml` file:

```bash
  # Source: datadog/templates/daemonset.yaml
  apiVersion:app/1
  kind: DaemonSet
  [...]
  spec:
  [...]
  spec:
      [...]
        containers:
        [...]
          - name: agent
            [...]
            env:
              - name: DD_REMOTE_CONFIGURATION_ENABLED
                value: "true"
          - name: system-probe
            [...]
            env:
              - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
                value: "true"
              - name: DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED
                value: "true"
              - name: DD_COMPLIANCE_CONFIG_ENABLED
                value: "true"
              - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
                value: "true"
              - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
                value: "true"
          [...]
```

{{% /tab %}}
{{< /tabs >}}

[1]: /security/misconfigurations/
[2]: /security/threats
[3]: /security/vulnerabilities
[4]: /security/cloud_security_management/setup#supported-deployment-types-and-features