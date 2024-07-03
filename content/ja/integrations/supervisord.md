---
app_id: supervisord
app_uuid: c4ee3618-f4b4-48b8-9515-a4a2f4091c0d
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: supervisord.process.count
      metadata_path: metadata.csv
      prefix: supervisord.
    process_signatures:
    - python supervisord
    - supervisord
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 116
    source_type_name: Supervisord
  saved_views:
    supervisord_processes: assets/saved_views/supervisord_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/supervisord/README.md
display_on_public_website: true
draft: false
git_integration_title: supervisord
integration_id: supervisord
integration_title: Supervisord
integration_version: 2.6.0
is_public: true
manifest_version: 2.0.0
name: supervisord
public_title: Supervisord
short_description: Supervisor 管理プロセスのステータス、アップタイム、数を監視。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::OS とシステム
  - Category::ログの収集
  configuration: README.md#Setup
  description: Supervisor 管理プロセスのステータス、アップタイム、数を監視。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Supervisord
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![Supervisor イベント][1]

## 概要

このチェックは、Supervisor で実行中のプロセスのアップタイム、ステータス、数を監視します。

## セットアップ

### インストール

Supervisor チェックは [Datadog Agent][2] パッケージに含まれています。Supervisor が実行されているサーバーに追加でインストールする必要はありません。

### 構成

#### supervisord の準備

Agent は、HTTP サーバーまたは UNIX ソケットを介して、Supervisor からデータを収集できます。Agent は、構成された収集方法に関係なく、同じデータを収集します。

##### HTTP サーバー

以下のブロックを Supervisor のメインコンフィギュレーションファイル (`/etc/supervisor.conf`) に追加します。

```ini
[inet_http_server]
port=localhost:9001
;username=user  # 任意
;password=pass  # 任意
```

##### UNIX ソケット

以下のようなブロックを `/etc/supervisor.conf` に追加します (まだない場合)。

```ini
[supervisorctl]
serverurl=unix:///var/run/supervisor.sock

[unix_http_server]
file=/var/run/supervisor.sock
chmod=777
chown=nobody:nogroup
;username=user  # 任意
;password=pass  # 任意
```

Supervisor がルートとして実行されている場合は、非ルートユーザー (`dd-agent` など) がソケットを読み取れるように、必ず `chmod` または `chown` を設定します。

---

`supervisord` を再度読み込みます。

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

[Agent の構成ディレクトリ][1]のルートにある `conf.d/` フォルダーの `supervisord.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル supervisord.d/conf.yaml][2] を参照してください。

```yaml
init_config:

instances:
  ## サービスチェックとメトリクスをタグ付けするために使用 (supervisor_server:supervisord0 など)
  - name: supervisord0
    host: localhost
    port: 9001
  ## 代わりにソケットから収集
  # - name: supervisord0
  #   socket: unix:///var/run/supervisor.sock
```

`proc_names` オプションや `proc_regex` オプションを使用して、Agent がメトリクスを収集してサービスチェックを作成する対象プロセスのリストを作成します。どちらのオプションも指定しなかった場合、Agent は Supervisor の _すべて_ の子プロセスを追跡します。両方のオプションを指定した場合、Agent は両方のリストのプロセスを追跡します。つまり 2 つのオプションは相互排他ではありません。

他のチェックオプションの詳細については、[チェック構成の例][2]を参照してください。

[Agent を再起動][3]すると、Datadog への Supervisor メトリクスの送信が開始されます。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<INTEGRATION_NAME>` | `supervisord`                                                                                                      |
| `<INIT_CONFIG>`      | 空白または `{}`                                                                                                      |
| `<INSTANCE_CONFIG>`  | `{"name":"<SUPERVISORD_SERVER_NAME>", "host":"%%host%%", "port":"9001", "username":"<USERNAME>", "password":"<PASSWORD>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### ログ収集



1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Supervisord ログの収集を開始するには、次のコンフィギュレーションブロックを `supervisord.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /path/to/my/directory/file.log
       source: supervisord
   ```

   `path` のパラメーター値を変更し、環境に合わせて構成してください。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル supervisord.d/conf.yaml][3] を参照してください。

3. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンド][5]を実行し、Checks セクションで `supervisord` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "supervisord" >}}


### イベント

Supervisor チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "supervisord" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

- [Supervisor によるプロセスの監視 / Datadog による Supervisor の監視][7]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/supervisord/images/supervisorevent.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/supervisor-monitors-your-processes-datadog-monitors-supervisor