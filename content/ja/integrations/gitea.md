---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Gitea Overview Dashboard: assets/dashboards/gitea_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- コラボレーション
- ソースコントロール
- 問題追跡
- autodiscovery
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gitea/README.md
display_name: Gitea
draft: false
git_integration_title: gitea
guid: de1c16d4-2950-4a00-b5f1-23b67852da81
integration_id: gitea
integration_title: Gitea
integration_version: 1.0.0
is_public: true
kind: integration
maintainer: florent.clarret@gmail.com
manifest_version: 1.0.0
metric_prefix: gitea.
metric_to_check: gitea.process.start_time
name: gitea
public_title: Gitea
short_description: Gitea のすべてのメトリクスを Datadog で追跡
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

[Gitea][1] は、Go で書かれたコミュニティが管理する軽量なコードホスティングソリューションです。

このインテグレーションは、Datadog [Agent][2] を通じて Gitea インスタンスを監視します。

## セットアップ

### 前提条件

Gitea は、デフォルトでは内部メトリクスを公開していません。`app.ini` コンフィギュレーションファイルでメトリクスエンドポイントを公開する組み込みの HTTP サーバーを有効にする必要があります。

```ini
[metrics]
ENABLED = true
```

詳しくは、公式の[ドキュメント][1]をご覧ください。

### インストール

Gitea インテグレーションは、デフォルトでは [Datadog Agent][3] パッケージに含まれていないため、インストールが必要です。

Agent v7.36 以降の場合は、下記の手順に従い Gitea チェックをホストにインストールします。Docker Agent または 上記バージョン以前の Agent でインストールする場合は、[コミュニティインテグレーションの使用][4]をご参照ください。

1. 以下のコマンドを実行して、Agent インテグレーションをインストールします。

```shell
datadog-agent integration install -t datadog-gitea==<INTEGRATION_VERSION>
```

2. Agent ベースの[インテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Gitea データの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `gitea.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル gitea.d/conf.yaml][6] を参照してください。

2. [Agent を再起動します][7]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `gitea` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "gitea" >}}


### イベント

Gitea チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "gitea" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.gitea.io/en-us/
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://github.com/DataDog/integrations-extras/blob/master/gitea/datadog_checks/gitea/data/conf.yaml.example
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-extras/blob/master/gitea/metadata.csv
[10]: https://github.com/DataDog/integrations-extras/blob/master/gitea/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/