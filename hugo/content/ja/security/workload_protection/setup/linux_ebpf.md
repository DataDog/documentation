---
aliases:
- /ja/security/workload_protection/setup/agent/linux
description: LinuxホストでeBPFベースのDatadog Agentを使ってWorkload Protectionを有効にします。
disable_toc: false
title: eBPFを使ったLinuxでのWorkload Protectionの設定
---
Workload Protectionを有効にするには、以下の手順に従います。

{{< partial name="security-platform/WP-billing-note.html" >}}

## 前提条件 {#prerequisites}

- Datadog Agent バージョン`7.46`以降。

## インストール {#installation}

パッケージベースのデプロイメントの場合は、パッケージマネージャーで[Datadogパッケージをインストール][6]し、その後、`datadog.yaml`、`security-agent.yaml`、`system-probe.yaml`ファイルを更新してください。

{{< code-block lang="bash" filename="/etc/datadog-agent/datadog.yaml" disable_copy="false" collapsible="true" >}}
remote_configuration:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable remote configuration.
  enabled: true

runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Threat Detection
  enabled: true

compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true

# Vulnerabilities are evaluated and scanned against your containers and hosts every hour.
sbom:
  enabled: true
  # Set to true to enable Container Vulnerability Management
  container_image:
    enabled: true
  # Set to true to enable Host Vulnerability Management
  host:
    enabled: true
{{< /code-block >}}

{{< code-block lang="bash" filename="/etc/datadog-agent/security-agent.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Threat Detection
  enabled: true

compliance_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable CIS benchmarks for Misconfigurations.
  #
  enabled: true
  host_benchmarks:
    enabled: true
{{< /code-block >}}

{{< code-block lang="bash" filename="/etc/datadog-agent/system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  ## @param enabled - boolean - optional - default: false
  ## Set to true to enable Threat Detection
  enabled: true

  remote_configuration:
    ## @param enabled - boolean - optional - default: false
    enabled: true
{{< /code-block >}}

**注**:

- 以下の[Agentインストールスクリプト][5]を使って、MisconfigurationsとThreat Detectionを自動的に有効化することもできます。

  ```shell
  DD_COMPLIANCE_CONFIG_ENABLED=true DD_RUNTIME_SECURITY_CONFIG_ENABLED=true DD_API_KEY=<DATADOG_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
  ```

- デフォルトでは、Runtime Securityは無効になっています。これを有効にするには、`security-agent.yaml`ファイルと`system-probe.yaml`ファイルの両方を更新する必要があります。
- Agentインストールスクリプトを使ってMisconfigurationsとThreat Detectionを有効にした場合、Misconfigurations用の`host_benchmarks`を有効にし、コンテナ Vulnerability Management用の`sbom`と`container_image`を有効にするために、`datadog.yaml`ファイルを手動で更新する必要があります。

```shell
sudo cp /etc/datadog-agent/system-probe.yaml.example /etc/datadog-agent/system-probe.yaml
sudo cp /etc/datadog-agent/security-agent.yaml.example /etc/datadog-agent/security-agent.yaml
sudo chmod 640 /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
sudo chgrp dd-agent /etc/datadog-agent/system-probe.yaml /etc/datadog-agent/security-agent.yaml
```


[5]: /ja/getting_started/agent/#installation
[6]: /ja/agent/?tab=Linux