---
aliases:
  - /integrations/supervisor
assets:
  dashboards: {}
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/supervisord/README.md'
display_name: Supervisord
git_integration_title: supervisord
guid: 2b81259b-723e-47be-8612-87e1f64152e9
integration_id: supervisord
integration_title: Supervisord
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: supervisord.
metric_to_check: supervisord.process.count
name: supervisord
process_signatures:
  - python supervisord
  - supervisord
public_title: Datadog-Supervisord インテグレーション
short_description: Supervisor 管理プロセスのステータス、アップタイム、数を監視。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
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

以下のブロックを Supervisor のメインコンフィギュレーションファイル (`/etc/supervisor.conf` など) に追加します。

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

Supervisor がルートとして実行されている場合は、非ルートユーザー (dd-agent など) がソケットを読み取れるように、必ず `chmod` または `chown` を設定します。

---

`supervisord` を再度読み込みます。

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `supervisord.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル supervisord.d/conf.yaml][4] を参照してください。

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

`proc_names` オプションや `proc_regex` オプションを使用して、Agent がメトリクスを収集してサービスチェックを作成する対象プロセスのリストを作成します。どちらのオプションも指定しなかった場合、Agent は Supervisor の _すべて_ の子プロセスを追跡します。両方のオプションを指定した場合、Agent は両方のリストのプロセスを追跡します (2 つのオプションは相互排他ではありません) 。

他のチェックオプションの詳細については、[チェックコンフィギュレーションの例][4]を参照してください。

[Agent を再起動][5]すると、Datadog への Supervisor メトリクスの送信が開始されます。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                                                                                              |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `<インテグレーション名>` | `supervisord`                                                                                                      |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                                                                                      |
| `<インスタンスコンフィギュレーション>`  | `{"name":"<SUPERVISORD_SERVER_NAME>", "host":"%%host%%", "port":"9001", "user":"<USERNAME>", "pass":"<PASSWORD>"}` |

### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `supervisord` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "supervisord" >}}


### イベント

Supervisor チェックには、イベントは含まれません。

### サービスのチェック

**supervisord.can_connect**:

構成した HTTP サーバーまたは UNIX ソケットに Agent が接続できない場合は、CRITICAL を返します。それ以外の場合は、OK を返します。

**supervisord.process.status**:

Agent は、supervisord のすべての子プロセス (`proc_names` と `proc_regex` がどちらも設定されていない場合) または一部の子プロセス (`proc_names`、`proc_regex`、またはその両方で設定されているプロセス) について、このサービスチェックを送信します。各サービスチェックは `supervisord_process:<プロセス名>` でタグ付けされます。

以下のテーブルに、supervisord のステータスに対応する `supervisord.process.status` を示します。

| supervisord ステータス | supervisord.process.status |
| ------------------ | -------------------------- |
| STOPPED            | CRITICAL                   |
| STARTING           | UNKNOWN                    |
| RUNNING            | OK                         |
| BACKOFF            | CRITICAL                   |
| STOPPING           | CRITICAL                   |
| EXITED             | CRITICAL                   |
| FATAL              | CRITICAL                   |
| UNKNOWN            | UNKNOWN                    |

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

- [ Supervisor によるプロセスの監視 / Datadog による Supervisor の監視][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/supervisord/images/supervisorevent.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/supervisord/datadog_checks/supervisord/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/supervisord/metadata.csv
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/supervisor-monitors-your-processes-datadog-monitors-supervisor