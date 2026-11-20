---
app_id: tekton
app_uuid: 4e8f129e-1c9b-4078-a966-f0099dbf9465
assets:
  dashboards:
    Tekton Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - tekton.pipelines_controller.go.alloc
      - tekton.triggers_controller.go.alloc
      metadata_path: metadata.csv
      prefix: tekton.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 5667413
    source_type_name: Tekton
  monitors:
    Increasing number of failed PipelineRuns: assets/monitors/increasing_failed_pipelineruns.json
    Increasing number of failed TaskRuns: assets/monitors/increasing_failed_taskruns.json
    TaskRuns are throttled: assets/monitors/throttled_taskruns.json
  saved_views:
    tekton_errors: assets/saved_views/tekton_errors.json
    tekton_overview: assets/saved_views/tekton_overview.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- 開発ツール
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tekton/README.md
display_on_public_website: true
draft: false
git_integration_title: tekton
integration_id: tekton
integration_title: Tekton
integration_version: 2.2.0
is_public: true
manifest_version: 2.0.0
name: tekton
public_title: Tekton
short_description: Datadog で Tekton のメトリクスをまとめて追跡できます。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Developer Tools
  - Offering::Integration
  configuration: README.md#Setup
  description: Datadog で Tekton のメトリクスをまとめて追跡できます。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Tekton
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは Datadog Agent を介して [Tekton][1] を監視します。Tekton は、CI/CD システムを構築するための強力で柔軟なオープン ソース フレームワークで、クラウド プロバイダーやオンプレミス環境をまたいで、ビルド、テスト、デプロイを行えるようにします。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Agent リリース 7.53.0 以降、Tekton チェックは [Datadog Agent][3] パッケージに同梱されています。サーバー側で追加のインストールは不要です。

このチェックは [OpenMetrics][4] を使用し、Tekton が公開する OpenMetrics エンドポイントからメトリクスを収集します。動作には Python 3 が必要です。

### 構成

1. Tekton のパフォーマンス データを収集するには、Agent の設定ディレクトリ直下にある `conf.d/` フォルダ内の `tekton.d/conf.yaml` ファイルを編集します。利用可能な設定オプションの一覧は、[サンプル tekton.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7] し、Checks セクションで `tekton` を確認します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "tekton" >}}


### イベント

Tekton インテグレーションには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "tekton" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [コンテナネイティブな CI/CD パイプラインの健全性とパフォーマンスを監視する][11]


[1]: https://tekton.dev/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[5]: https://github.com/DataDog/integrations-core/blob/master/tekton/datadog_checks/tekton/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/tekton/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/tekton/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/
[11]: https://www.datadoghq.com/blog/container-native-ci-cd-integrations/