---
app_id: ssh
app_uuid: 66833cbe-1bfc-4104-9d77-7b828219470b
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sftp.response_time
      metadata_path: metadata.csv
      prefix: sftp.
    process_signatures:
    - ssh
    - sftp
    - sshd
    - 'sshd:'
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 90
    source_type_name: SSH
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- developer tools
- network
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ssh_check/README.md
display_on_public_website: true
draft: false
git_integration_title: ssh_check
integration_id: ssh
integration_title: SSH
integration_version: 2.8.0
is_public: true
manifest_version: 2.0.0
name: ssh_check
public_title: SSH
short_description: Monitor SSH connectivity and SFTP latency.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Network
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Monitor SSH connectivity and SFTP latency.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SSH
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

This check lets you monitor SSH connectivity to remote hosts and SFTP response times.

## セットアップ

### インストール

The SSH/SFTP check is included in the [Datadog Agent][1] package. No additional installation is needed on your server.

### 構成

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

To configure this check for an Agent running on a host:

1. Edit the `ssh_check.d/conf.yaml` file in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample ssh_check.d/conf.yaml][2] for all available configuration options:

   ```yaml
   init_config:

   instances:
     - host: "<SOME_REMOTE_HOST>" # required
       username: "<SOME_USERNAME>" # required
       password: "<SOME_PASSWORD>" # or use private_key_file
       # private_key_file: <PATH_TO_PRIVATE_KEY>
       # private_key_type:         # rsa or ecdsa; default is rsa
       # port: 22                  # default is port 22
       # sftp_check: False         # set False to disable SFTP check; default is True
       # add_missing_keys: True    # default is False
   ```

2. [Restart the Agent][3] to start sending SSH/SFTP metrics and service checks to Datadog.

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/ssh_check/datadog_checks/ssh_check/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### Containerized

For containerized environments, see the [Autodiscovery Integration Templates][1] for guidance on applying the parameters below.

| Parameter            | Value                                                        |
| -------------------- | ------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `ssh_check`                                                  |
| `<INIT_CONFIG>`      | blank or `{}`                                                |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port":"22", "username":"<USERNAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's `status` subcommand][2] and look for `ssh_check` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "ssh_check" >}}


### イベント

The SSH Check does not include any events.

### サービスチェック
{{< get-service-checks-from-git "ssh_check" >}}


## トラブルシューティング

Need help? Contact [Datadog support][3].



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/