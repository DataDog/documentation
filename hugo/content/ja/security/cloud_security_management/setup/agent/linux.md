---
aliases:
- /ja/security/cloud_security_management/setup/csm_cloud_workload_security/agent/linux
- /ja/security/cloud_security_management/setup/csm_pro/agent/linux/
- /ja/security/cloud_security_management/setup/csm_enterprise/agent/linux/
code_lang: linux
code_lang_weight: 80
title: Linux での Cloud Security のセットアップ
type: multi-code-lang
---

Misconfigurations and Vulnerability Management を有効にするには、以下の手順に従ってください。

{{< partial name="security-platform/CSW-billing-note.html" >}}


## 前提条件

- Datadog Agent バージョン `7.46` 以降。

## インストール

パッケージベースのデプロイの場合は、パッケージマネージャーで [Datadog パッケージをインストール][6]し、以下のファイルを更新します。

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - ブール値 - オプション - デフォルト: false
  ## 誤構成に関する CIS ベンチマークを有効にするには true に設定します。
  #
  enabled: true
  host_benchmarks:
    enabled: true

# コンテナとホストに対して、脆弱性の評価とスキャンが 1 時間ごとに行われます。
sbom:
  enabled: true
  # Container Vulnerability Management を有効にするには true に設定します
  container_image:
    enabled: true
  # Host Vulnerability Management を有効にするには true に設定します
  host:
    enabled: true
{{< /code-block >}}

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
compliance_config:
  ## @param enabled - ブール値 - オプション - デフォルト: false
  ## 誤構成に関する CIS ベンチマークを有効にするには true に設定します。
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

**注**: 

- 次の [Agent インストールスクリプト][5]を使用して、Misconfigurations と Threat Detection を自動的に有効にすることもできます。

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- Agent インストールスクリプトを使用して Misconfigurations と Vulnerability Management を有効にする場合は、`datadog.yaml` ファイルを手動で更新して、Misconfigurations 用の `host_benchmarks` と、Vulnerability Management 用の `sbom` と `container_image` を有効にする必要があります。

```shell
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/security-agent.yaml
```

[1]: /ja/security/cloud_security_management/misconfigurations/
[2]: /ja/security/threats
[3]: /ja/security/cloud_security_management/vulnerabilities
[4]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features
[5]: /ja/getting_started/agent/#installation
[6]: /ja/agent/?tab=Linux