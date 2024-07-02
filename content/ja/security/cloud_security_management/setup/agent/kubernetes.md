---
title: Setting up Cloud Security Management on Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 60 # a number that represents relative weight.
aliases:
  - /security/cloud_security_management/setup/csm_cloud_workload_security/agent/kubernetes/
  - /security/cloud_security_management/setup/csm_pro/agent/kubernetes/
  - /security/cloud_security_management/setup/csm_enterprise/agent/kubernetes/
---

Use the following instructions to enable Misconfigurations, Threat Detection, Host Vulnerability Management, and Container Vulnerability Management.

## 前提条件

- Datadog Agent version `7.46` or later.

## インストール

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` ファイルの `spec` セクションに以下を追加します。

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
        # Enables Threat Detection
        cws:
          enabled: true
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true
        # Enables the image metadata collection and Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true
          # Enables Container Vulnerability Management
          # Image collection is enabled by default with Datadog Operator version `>= 1.3.0`
          containerImage:
            enabled: true
          # Enables Host Vulnerability Management
          host:
            enabled: true
    ```

2. 変更を適用し、Agent を再起動します。

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` ファイルの `datadog` セクションに以下を追加します。

    ```yaml
    # datadog-values.yaml file
    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        # Enables Threat Detection
        runtime:
          enabled: true
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true
      sbom:
        containerImage:
          enabled: true
        # Enables Container Vulnerability Management
        # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`
        containerImageCollection:
          enabled: true
          # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
          # uncompressedLayersSupport: true
        # Enables Host Vulnerability Management
        host:
          enabled: true
    ```

2. Agent を再起動します。

{{% /tab %}}

{{% tab "DaemonSet" %}}

`daemonset.yaml` ファイルの `security-agent` と `system-probe` の `env` セクションに次の設定を追加します。

```bash
  # ソース: datadog/templates/daemonset.yaml
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

[1]: /security/cloud_security_management/misconfigurations/
[2]: /security/threats
[3]: /security/cloud_security_management/vulnerabilities
[4]: /security/cloud_security_management/setup#supported-deployment-types-and-features