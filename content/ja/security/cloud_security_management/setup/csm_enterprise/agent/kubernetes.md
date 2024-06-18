---
code_lang: kubernetes
code_lang_weight: 60
title: Kubernetes で CSM Enterprise を有効にする
type: multi-code-lang
---

以下の手順を使用して、Kubernetes 上で [CSM Misconfigurations][1]、[CSM Threats][2]、および [CSM Vulnerabilities][3] を有効にします。各 CSM 機能でサポートされるデプロイメントタイプの詳細については、[Cloud Security Management のセットアップ][4]を参照してください。

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
        cws:
          enabled: true
        # Enables CSM Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true
        # Enables the image metadata collection and Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true
          # Image collection is enabled by default with Datadog Operator version `>= 1.3.0`
          containerImage:
            enabled: true
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
        # Enables CSM Threats
        runtime:
          enabled: true
        # Enables CSM Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true
      # Enables CSM Vulnerabilities
      # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`
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

[1]: /ja/security/cloud_security_management/misconfigurations/
[2]: /ja/security/threats
[3]: /ja/security/cloud_security_management/vulnerabilities
[4]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features