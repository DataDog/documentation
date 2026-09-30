---
app_id: vllm
app_uuid: 355886f0-31ae-44a9-9638-6951ad0f3039
assets:
  dashboards:
    vLLM Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: vllm.num_requests.running
      metadata_path: metadata.csv
      prefix: vllm.
    process_signatures:
    - vllm.entrypoints.openai.api_server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 17652503
    source_type_name: vLLM
  monitors:
    Average Request Latency is High: assets/monitors/latency.json
    vLLM application token usage is high: assets/monitors/token_throughput.json
  saved_views:
    errors: assets/saved_views/errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ログの収集
- ai/ml
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/vllm/README.md
display_on_public_website: true
draft: false
git_integration_title: vllm
integration_id: vllm
integration_title: vLLM
integration_version: 2.3.0
is_public: true
manifest_version: 2.0.0
name: vllm
public_title: vLLM
short_description: vLLMは、LLM の推論とサービングのためのライブラリです
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
  - Category::AI/ML
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: vLLMは、LLM の推論とサービングのためのライブラリです
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/vllm-integration/
  support: README.md#Support
  title: vLLM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [vLLM][1] を監視します。

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

vLLM チェックは [Datadog Agent][2] パッケージに含まれています。
サーバー上での追加インストールは不要です。

### 設定

1. vllm のパフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `vllm.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル vllm.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `vllm` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "vllm" >}}


### イベント

vLLM インテグレーションにはイベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "vllm" >}}


### ログ

ログの収集は Datadog Agent ではデフォルトで無効です。Agent をコンテナとして実行している場合は、[コンテナのインストール][8]を参照してログの収集を有効にしてください。ホスト Agent を実行している場合は、代わりに[ホスト Agent][9] を参照してください。
いずれの場合も、ログの `source` の値が `vllm` であることを確認してください。この設定により、組み込みの処理パイプラインがログを確実に検出します。コンテナのログ構成を設定するには、[ログ インテグレーション][10] を参照してください。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

## その他の参考資料
お役に立つドキュメント、リンクや記事:
- [Datadog の vLLM インテグレーションで LLM アプリケーションのパフォーマンスを最適化][12]


[1]: https://docs.vllm.ai/en/stable/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/vllm/datadog_checks/vllm/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/vllm/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/vllm/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/containers/docker/log/?tab=containerinstallation#installation
[9]: https://docs.datadoghq.com/ja/containers/docker/log/?tab=hostagent#installation
[10]: https://docs.datadoghq.com/ja/containers/docker/log/?tab=dockerfile#log-integrations
[11]: https://docs.datadoghq.com/ja/help/
[12]: https://www.datadoghq.com/blog/vllm-integration/