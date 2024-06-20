---
code_lang: linux
code_lang_weight: 80
title: Linux で CSM Cloud Workload Security を有効にする
type: multi-code-lang
---

以下の手順を使用して、Linux 上で [CSM Threats][1] を有効にします。各 CSM 機能でサポートされるデプロイメントタイプの詳細については、[Cloud Security Management のセットアップ][2]を参照してください。

パッケージベースのデプロイの場合は、パッケージマネージャーで Datadog パッケージをインストールし、`datadog.yaml`、`security-agent.yaml`、`system-probe.yaml` ファイルを更新します。

[Agent インストールスクリプト][3]を使用して、CSM Threats を自動的に有効にすることもできます。

```shell
DD_RUNTIME_SECURITY_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

**注**: デフォルトでは、Runtime Security は無効になっています。有効にするには、`security-agent.yaml` と `system-probe.yaml` ファイルの両方を更新する必要があります。

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```

```bash
# /etc/datadog-agent/datadog.yaml file
remote_configuration:
  ## @param enabled - ブール値 - オプション - デフォルト: false
  ## リモート構成を有効にするには true に設定します。
  enabled: true

runtime_security_config:
  ## @param enabled - ブール値 - オプション - デフォルト: false
  ## CSM Threats を完全に有効にするには true に設定します。
  enabled: true
```

```bash
# /etc/datadog-agent/security-agent.yaml file
runtime_security_config:
  ## @param enabled - boolean - オプション - デフォルト: false
  ## CSM Threats を完全に有効にする場合は true に設定。
  enabled: true
```

```bash
# /etc/datadog-agent/system-probe.yaml file
runtime_security_config:
  ## @param enabled - boolean - オプション - デフォルト: false
  ## CSM Threats を完全に有効にする場合は true に設定。
  enabled: true

  remote_configuration:
    ## @param enabled - boolean - オプション - デフォルト: false
    enabled: true
```

[1]: /ja/security/threats
[2]: /ja/security/cloud_security_management/setup#supported-deployment-types-and-features
[3]: /ja/getting_started/agent/#installation