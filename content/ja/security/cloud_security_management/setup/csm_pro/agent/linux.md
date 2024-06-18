---
code_lang: linux
code_lang_weight: 75
title: Linux で CSM Pro を有効にする
type: multi-code-lang
---

以下の手順を使用して、[CSM Vulnerabilities][2] 用に Datadog Agent でコンテナイメージのメタデータ収集と [Software Bill of Materials (SBOM)][1] 収集を有効にします。これにより、コンテナイメージ内のライブラリをスキャンして脆弱性を検出することができます。脆弱性は 1 時間ごとに評価され、コンテナに対してスキャンされます。

各 CSM 機能でサポートされるデプロイメントタイプの詳細については、[Cloud Security Management のセットアップ][3]を参照してください。

1. `datadog.yaml` コンフィギュレーションファイルに以下を追加します。

    ```yaml
    sbom:
      enabled: true
      container_image:
        enabled: true
    container_image:
      enabled: true
    ```

2. Agent を再起動します。

[1]: https://www.cisa.gov/sbom
[2]: /ja/security/cloud_security_management/vulnerabilities
[3]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features