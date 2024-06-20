---
code_lang: kubernetes
code_lang_weight: 60
title: Kubernetes で CSM Pro を有効にする
type: multi-code-lang
---

以下の手順では、[CSM Vulnerabilities 用の Datadog Agent でコンテナイメージのメタデータ収集と [Software Bill of Materials (SBOM)][1] 収集を有効にします。これにより、コンテナイメージ内のライブラリをスキャンして脆弱性を検出することができます。脆弱性は 1 時間ごとに評価され、コンテナに対してスキャンされます。

各 CSM 機能でサポートされるデプロイメントタイプの詳細については、[Cloud Security Management のセットアップ][3]を参照してください。

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` ファイルの `spec` セクションに以下を追加します。

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

2. 変更を適用し、Agent を再起動します。

{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` ファイルの `datadog` セクションに以下を追加します。

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

2. Agent を再起動します。

{{% /tab %}}

{{< /tabs >}}

[1]: https://www.cisa.gov/sbom
[2]: /ja/security/cloud_security_management/vulnerabilities
[3]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features