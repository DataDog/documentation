---
app_id: ssh
app_uuid: 66833cbe-1bfc-4104-9d77-7b828219470b
assets:
  integration:
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
    source_type_name: SSH
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- developer tools
- network
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ssh_check/README.md
display_on_public_website: true
draft: false
git_integration_title: ssh_check
integration_id: ssh
integration_title: SSH
integration_version: 2.7.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: ssh_check
public_title: SSH
short_description: SSH 接続と SFTP レイテンシーを監視。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::ネットワーク
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: SSH 接続と SFTP レイテンシーを監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SSH
---



## 概要

このチェックを使用して、リモートホストへの SSH 接続と SFTP 応答時間を監視できます。

## セットアップ

### インストール

SSH/SFTP チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `ssh_check.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル ssh_check.d/conf.yaml][2] を参照してください。

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

2. [Agent を再起動][3]すると、Datadog への SSH/SFTP メトリクスおよびサービスチェックの送信が開始されます。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/ssh_check/datadog_checks/ssh_check/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                        |
| -------------------- | ------------------------------------------------------------ |
| `<インテグレーション名>` | `ssh_check`                                                  |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%", "port":"22", "username":"<USERNAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `ssh_check` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ssh_check" >}}


### イベント

SSH チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "ssh_check" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/