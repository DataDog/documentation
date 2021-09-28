---
aliases:
  - /ja/integrations/ssh
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/ssh_check/README.md
display_name: SSH
draft: false
git_integration_title: ssh_check
guid: 4eb195ef-554f-4cc2-80af-8f286c631fa8
integration_id: ssh
integration_title: SSH チェック
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: ssh.
metric_to_check: sftp.response_time
name: ssh_check
process_signatures:
  - ssh
  - sftp
  - sshd
  - 'sshd:'
public_title: Datadog-SSH チェックインテグレーション
short_description: SSH 接続と SFTP レイテンシーを監視。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックを使用して、リモートホストへの SSH 接続と SFTP 応答時間を監視できます。

## セットアップ

### インストール

SSH/SFTP チェックは [Datadog Agent][1] パッケージに含まれているため、SSH 接続をテストするサーバーに追加で何かをインストールする必要はありません。

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



[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/