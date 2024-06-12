---
app_id: システム
app_uuid: b30c1062-d2cd-4fb7-be84-c144913b8266
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.disk.directory.file.bytes
      metadata_path: metadata.csv
      prefix: system.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Directory
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/directory/README.md
display_on_public_website: true
draft: false
git_integration_title: directory
integration_id: システム
integration_title: Directory
integration_version: 2.1.1
is_public: true
manifest_version: 2.0.0
name: directory
public_title: Directory
short_description: Directory インテグレーションにより、既定のディレクトリのファイルについてメトリクスを報告
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
  configuration: README.md#Setup
  description: Directory インテグレーションにより、既定のディレクトリのファイルについてメトリクスを報告
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Directory
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

選択したディレクトリやファイルからメトリクスをキャプチャします。Agent は以下を収集します。

- ファイルの数
- ファイルサイズ
- 最終更新からの経過時間
- 作成からの経過時間

## 計画と使用

### インフラストラクチャーリスト

Directory チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "directory" >}}


### ヘルプ

Directory チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "directory" >}}


## ヘルプ

非常に大きなディレクトリに対してチェックを実行し、再帰が true に設定されている場合、I/O と CPU に負荷がかかることに注意してください。デフォルトのチェック頻度である 15 秒ごとを調整する必要があるかもしれません。

例えば、15,000 個のファイルとサブディレクトリがあるディレクトリで、CPU 使用率の高いチェックが 30〜40 秒実行される場合、チェック頻度を低くセットアップしなければ、CPU 使用率の高いチェックが効率よく継続的に実行されます。

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/directory/datadog_checks/directory/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/directory/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/directory/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/