---
app_id: gitea
app_uuid: f4cd02de-cfb8-4de9-a809-7a772ba738ca
assets:
  dashboards:
    Gitea Overview Dashboard: assets/dashboards/gitea_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gitea.process.start_time
      metadata_path: metadata.csv
      prefix: gitea.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10283
    source_type_name: Gitea
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: コミュニティ
  sales_email: florent.clarret@gmail.com
  support_email: florent.clarret@gmail.com
categories:
- コラボレーション
- ソースコントロール
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gitea/README.md
display_on_public_website: true
draft: false
git_integration_title: gitea
integration_id: gitea
integration_title: Gitea
integration_version: 1.0.2
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: gitea
public_title: Gitea
short_description: Gitea のすべてのメトリクスを Datadog で追跡
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - カテゴリ::ソースコントロール
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Gitea のすべてのメトリクスを Datadog で追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gitea
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Gitea][1] は、Go で書かれたコミュニティが管理する軽量なコードホスティングソリューションです。

このインテグレーションは、Datadog [Agent][2] を通じて Gitea インスタンスを監視します。

## 計画と使用

### 前提条件

Gitea は、デフォルトでは内部メトリクスを公開していません。`app.ini` コンフィギュレーションファイルでメトリクスエンドポイントを公開する組み込みの HTTP サーバーを有効にする必要があります。

```ini
[metrics]
ENABLED = true
```

詳しくは、公式の[ドキュメント][1]をご覧ください。

### インフラストラクチャーリスト

Gitea インテグレーションは、デフォルトでは [Datadog Agent][3] パッケージに含まれていないため、インストールが必要です。

Agent v7.36 以降の場合は、下記の手順に従い Gitea チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][4]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

```shell
datadog-agent integration install -t datadog-gitea==<INTEGRATION_VERSION>
```

2. Agent ベースの[インテグレーション][5]と同様にインテグレーションを構成します。

### ブラウザトラブルシューティング

1. Gitea データの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `gitea.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル gitea.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `gitea` を検索します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "gitea" >}}


### ヘルプ

Gitea チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "gitea" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.gitea.io/en-us/
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/gitea/datadog_checks/gitea/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/gitea/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/gitea/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/