---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/directory/README.md'
display_name: Directory
git_integration_title: directory
guid: 0c38c4ef-5266-4667-9fb1-de8f2b73708a
integration_id: system
integration_title: Directory
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.disk.directory.file.bytes
name: directory
public_title: Datadog-Directory インテグレーション
short_description: Directory インテグレーションは、ファイルに関するメトリクスを報告 directory
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

選択したディレクトリやファイルからメトリクスをキャプチャします。Agent は以下を収集します。

  * ファイルの数
  * ファイルサイズ
  * 最終更新からの経過時間
  * 作成からの経過時間

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

Directory チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. Directory のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][3]のルートにある `conf.d/` フォルダーの `directory.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル directory.d/conf.yaml][4] を参照してください。

    ```yaml
      init_config:

      instances:
        - directory: "/path/to/directory" # the only required option
          name: "my_monitored_dir"        # What the Agent will tag this directory's metrics with. Defaults to "directory"
          pattern: "*.log"                # defaults to "*" (all files)
          recursive: True                 # default False
          countonly: False                # set to True to only collect the number of files matching 'pattern'. Useful for very large directories.
          ignore_missing: False           # set to True to not raise exceptions on missing or inaccessible directories
    ```

    Agent プロセスを実行しているユーザーが (通常は `datadog-agent`)、構成したディレクトリ、サブディレクトリ、およびファイルへの読み取りアクセス権を持つことを確認してください。

    **注**: Windows でチェックを実行するには、ディレクトリを追加する際に、単一のバックスラッシュ `C:\path\to\directory` ではなく、ダブルバックスラッシュ `C:\\path\\to\\directory` を使用してください。そうしないと、トレースバックの最後に `found unknown escape character in "<string>"` というエラーが示されて、ディレクトリチェックが失敗します。

2. [Agent を再起動します][5]。

#### メトリクスの収集
Directory チェックでは[カスタムメトリクス][6]を送信することができますが、これはお客様の[課金][7]に影響します。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `directory` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "directory" >}}


### イベント
Directory チェックには、イベントは含まれません。

### サービスのチェック
Directory チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/directory/datadog_checks/directory/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics
[7]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/directory/metadata.csv
[10]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}