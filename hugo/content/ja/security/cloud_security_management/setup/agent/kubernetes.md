---
aliases:
- /ja/security/cloud_security_management/setup/csm_cloud_workload_security/agent/kubernetes/
- /ja/security/cloud_security_management/setup/csm_pro/agent/kubernetes/
- /ja/security/cloud_security_management/setup/csm_enterprise/agent/kubernetes/
code_lang: kubernetes
code_lang_weight: 60
title: Kubernetes での Cloud Security のセットアップ
type: multi-code-lang
---

Misconfigurations and Vulnerability Management を有効にするには、以下の手順に従ってください。

{{< partial name="security-platform/CSW-billing-note.html" >}}

## 前提条件

- Datadog Agent の最新バージョン。インストール手順については、[Agent の概要][5]を参照するか、[Datadog UI][6] から Agent をインストールしてください。

**注**: SBOM コレクションは、Google Kubernetes Engine (GKE) のイメージストリーミング機能とは互換性がありません。これを無効にするには、GKE ドキュメントの [Disable Image streaming][7] セクションを参照してください。

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

            # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
            # uncompressedLayersSupport: true

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
      securityAgent:
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true
      sbom:
        containerImage:
          enabled: true

          # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
          # uncompressedLayersSupport: true

        # Enables Host Vulnerability Management
        host:
          enabled: true

        # Enables Container Vulnerability Management
        # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`
        # containerImageCollection:
        #   enabled: true
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
          - name: system-probe
            [...]
            env:
              - name: DD_COMPLIANCE_CONFIG_ENABLED
                value: "true"
              - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
                value: "true"
              - name: DD_CONTAINER_IMAGE_ENABLED
                value: "true"
              - name: DD_SBOM_ENABLED
                value: "true"
              - name: DD_SBOM_CONTAINER_IMAGE_ENABLED
                value: "true"
              - name: DD_SBOM_HOST_ENABLED
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
[5]: /ja/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable