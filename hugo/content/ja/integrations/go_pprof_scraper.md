---
app_id: go-pprof-scraper
app_uuid: 2b13f6b1-d3ba-4254-93c0-2ceaf783cd85
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10309
    source_type_name: go_pprof_scraper
author:
  homepage: https://www.datadoghq.com
  name: コミュニティ
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories: []
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/README.md
display_on_public_website: true
draft: false
git_integration_title: go_pprof_scraper
integration_id: go-pprof-scraper
integration_title: Go pprof scraper
integration_version: 1.0.4
is_public: true
manifest_version: 2.0.0
name: go_pprof_scraper
public_title: Go pprof scraper
short_description: Go プログラムから /debug/pprof エンドポイント経由でプロファイルを収集する
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
  - Offering::Integration
  configuration: README.md#Setup
  description: Go プログラムから /debug/pprof エンドポイント経由でプロファイルを収集する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Go pprof scraper
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

このチェックは、[`/debug/pprof`][1] エンドポイントを公開している Go アプリケーションからプロファイルを収集します。

**注**: サービスに [dd-trace-go][2] プロファイリングクライアントライブラリを組み込める場合は、そちらを優先的に使用してください。クライアントライブラリを利用すると、[コードホットスポットやエンドポイントフィルタリング][3]など、他の Datadog サービスとの連携が強化されます。ソースコードを管理できないサービスには、このインテグレーションを使用してください。

**注**: このインテグレーションを使用すると、Datadog の [Continuous Profiler][4] サービスにおいてホストが課金対象となります。Continuous Profiler の課金に関する詳細は、[課金に関するドキュメント][5]を参照してください。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][6]のガイドを参照してこの手順を行ってください。

### インストール

Agent バージョンが v7.21/v6.21 以上の場合は、以下の手順に従ってホストに `go_pprof_scraper` チェックをインストールしてください。Agent バージョンが [v7.21/v6.21 未満][8]、または [Docker Agent][9] を使用している場合にコミュニティインテグレーションをインストールする手順については、専用の Agent ガイドである[コミュニティインテグレーションのインストール][7]を参照してください。

1. [Datadog Agent をダウンロードして起動][10]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-go-pprof-scraper==<INTEGRATION_VERSION>
   ```
  最新バージョンは [Datadog Integrations Release Page][11] で確認できます。

   **注**: I必要に応じて、インストールコマンドの先頭に `sudo -u dd-agent` を追加します。

### 構成

1. Agent の設定ディレクトリ直下にある `conf.d/` フォルダ内の `go_pprof_scraper.d/conf.yaml` ファイルを編集して、Go のパフォーマンスデータの収集を開始します。利用可能なすべての設定オプションについては、[サンプル go_pprof_scraper.d/conf.yaml][12] を参照してください。

2. [Agent を再起動します][13]。

### 検証

[Agent のステータスサブコマンドを実行][14]し、Checks セクション内に `go_pprof_scraper` が表示されていることを確認します。

## 収集データ

### メトリクス

Go-pprof-scraper インテグレーションは、いかなるメトリクスも作成しません。

### イベント

Go-pprof-scraper インテグレーションには、イベントは含まれていません。

### サービスチェック
{{< get-service-checks-from-git "go_pprof_scraper" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][16]までお問合せください。


[1]: https://pkg.go.dev/net/http/pprof
[2]: https://docs.datadoghq.com/ja/profiler/enabling/go/
[3]: https://docs.datadoghq.com/ja/profiler/connect_traces_and_profiles/
[4]: https://docs.datadoghq.com/ja/profiler/
[5]: https://docs.datadoghq.com/ja/account_management/billing/apm_tracing_profiler/
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[7]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/?tab=agentv721v621
[8]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/?tab=agentearlierversions
[9]: https://docs.datadoghq.com/ja/agent/guide/use-community-integrations/?tab=docker
[10]: https://app.datadoghq.com/account/settings/agent/latest
[11]: https://github.com/DataDog/integrations-extras/tags
[12]: https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/datadog_checks/go_pprof_scraper/data/conf.yaml.example
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-extras/blob/master/go_pprof_scraper/assets/service_checks.json
[16]: https://docs.datadoghq.com/ja/help/