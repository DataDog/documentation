---
aliases:
  - /ja/integrations/ssh
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - network
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/ssh_check/README.md'
display_name: SSH
git_integration_title: ssh_check
guid: 4eb195ef-554f-4cc2-80af-8f286c631fa8
integration_id: ssh
integration_title: SSH チェック
is_public: true
kind: integration
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
short_description: SSH 接続と SFTP レイテンシーを監視
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

### コンフィグレーション
#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

1. [Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `ssh_check.d/conf.yaml` ファイルを編集します。
    使用可能なすべての構成オプションの詳細については、[サンプル ssh_check.d/conf.yaml][3] を参照してください。

    ```yaml
        init_config:

        instances:
          - host: <SOME_REMOTE_HOST>  # required
            username: <SOME_USERNAME> # required
            password: <SOME_PASSWORD> # or use private_key_file
        #   private_key_file: <PATH_TO_PRIVATE_KEY>
        #   private_key_type:         # rsa or ecdsa; default is rsa
        #   port: 22                  # default is port 22
        #   sftp_check: False         # set False to disable SFTP check; default is True
        #   add_missing_keys: True    # default is False
    ```

2. [Agent を再起動][4]すると、Datadog への SSH/SFTP メトリクスおよびサービスチェックの送信が開始されます。

#### コンテナ化
コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][8]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                        |
|----------------------|--------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `ssh`                                                        |
| `<INIT_CONFIG>`      | 空白または `{}`                                                |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%", "port":"22", "username":"<USERNAME>"}` |

### 検証

[Agent の `status` サブコマンドを実行][5]し、Checks セクションで `ssh_check` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "ssh_check" >}}


### イベント
SSH チェックには、イベントは含まれません。

### サービスのチェック

**ssh.can_connect**:

Agent が SSH セッションを開始できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

**sftp.can_connect**:

Agent が SFTP セッションを開始できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/ssh_check/datadog_checks/ssh_check/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/ssh_check/metadata.csv
[7]: https://docs.datadoghq.com/ja/help
[8]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}