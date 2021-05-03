---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - os & system
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/directory/README.md'
display_name: Directory
draft: false
git_integration_title: directory
guid: 0c38c4ef-5266-4667-9fb1-de8f2b73708a
integration_id: システム
integration_title: Directory
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: system.
metric_to_check: system.disk.directory.file.bytes
name: directory
public_title: Datadog-Directory インテグレーション
short_description: Directory インテグレーションにより、既定のディレクトリのファイルについてメトリクスを報告
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

選択したディレクトリやファイルからメトリクスをキャプチャします。Agent は以下を収集します。

- ファイルの数
- ファイルサイズ
- 最終更新からの経過時間
- 作成からの経過時間

## セットアップ

### インストール

Directory チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. Directory のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][2]のルートにある `conf.d/` フォルダーの `directory.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル directory.d/conf.yaml][3] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param directory - string - required
     ## The directory to monitor. On windows, please make sure you escape back-slashes otherwise the YAML
     ## parser fails (eg. - directory: "C:\\Users\\foo\\Downloads").
     #
     - directory: "<DIRECTORY_PATH>"
   ```

    Agent プロセスを実行しているユーザーが (通常は `datadog-agent`)、構成したディレクトリ、サブディレクトリ、およびファイルへの読み取りアクセス権を持つことを確認してください。

    **注**: Windows でチェックを実行するには、ディレクトリを追加する際に、単一のバックスラッシュ `C:\path\to\directory` ではなく、ダブルバックスラッシュ `C:\\path\\to\\directory` を使用してください。そうしないと、トレースバックの最後に `found unknown escape character in "<string>"` というエラーが示されて、ディレクトリチェックが失敗します。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `directory` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "directory" >}}


### イベント

Directory チェックには、イベントは含まれません。

### サービスのチェック

**system.disk.directory.exists**:<br>
Agent が監視するディレクトリを見つけられない、またはアクセスできない場合は、`WARNING` を返します。それ以外の場合は、`OK` を返します。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/directory/datadog_checks/directory/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/directory/metadata.csv
[7]: https://docs.datadoghq.com/ja/help/