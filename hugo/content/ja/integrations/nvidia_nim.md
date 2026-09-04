---
app_id: nvidia-nim
app_uuid: c7307eb9-7bbf-4dae-b74f-6396bf5bf514
assets:
  dashboards:
    NVIDIA NIM Overview: assets/dashboards/nvidia_nim_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: nvidia_nim.num_requests.running
      metadata_path: metadata.csv
      prefix: nvidia_nim.
    process_signatures:
    - vllm_nvext.entrypoints.openai.api_server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30338252
    source_type_name: nvidia_nim
  monitors:
    Average Request Latency is High: assets/monitors/latency.json
  saved_views:
    NVIDIA NIM Errors: assets/saved_views/nim_errors.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- ai/ml
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/nvidia_nim/README.md
display_on_public_website: true
draft: false
git_integration_title: nvidia_nim
integration_id: nvidia-nim
integration_title: Nvidia NIM
integration_version: 1.1.0
is_public: true
manifest_version: 2.0.0
name: nvidia_nim
public_title: Nvidia NIM
short_description: Datadog 向けの NVIDIA NIM インテグレーションは、監視用の Prometheus メトリクスを収集し、GPU
  の状態をリアル タイムに把握できるようにします。
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
  description: Datadog 向けの NVIDIA NIM インテグレーションは、監視用の Prometheus メトリクスを収集し、GPU の状態をリアル
    タイムに把握できるようにします。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Nvidia NIM
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは Datadog Agent を通じて [NVIDIA NIM][1] を監視します。

## セットアップ

<div class="alert alert-warning">
このインテグレーションは現在プレビュー版です。将来、提供状況が変更される可能性があります。
</div>

以下の手順に従って、ホスト上で動作する Agent にこのチェックをインストールし、設定してください。コンテナ環境の場合は、これらの手順を適用する方法について [Autodiscovery Integration テンプレート][2] を参照してください。

**要件**:
- このチェックには Agent v7.61.0+ が必要です。
- このチェックはメトリクス収集に [OpenMetrics][3] を使用します。動作には Python 3 が必要です。

`### Installation
NVIDIA NIM チェックは [Datadog Agent][4] パッケージに含まれています。サーバーで追加のインストールは不要です。

#### LLM Observability: LLM アプリケーションから NVIDIA Nim への呼び出しをエンド ツー エンドで可視化
NVIDIA NIM は、[NVIDIA NIM][5] からの API 呼び出しを処理するために OpenAI クライアントを使用します。NVIDIA NIM を使用するアプリケーションを監視し、LLM Observability を設定するには、[OpenAI インテグレーション][6] のドキュメントの手順に従ってください。
`
### 構成

NVIDIA NIM はリクエスト統計を示す Prometheus [メトリクス][1] を提供します。デフォルトでは、これらのメトリクスは http://localhost:8000/metrics で公開されています。Datadog Agent はこのインテグレーションを使用して、公開されているメトリクスを収集できます。以下の手順に従い、各コンポーネントの一部またはすべてからのデータ収集を設定してください。

NVIDIA NIM のパフォーマンス データの収集を開始するには:
1. Agent の設定ディレクトリ直下にある `conf.d/` フォルダー内の `nvidia_nim.d/conf.yaml` を編集し、NVIDIA NIM のパフォーマンス データを収集するように設定します。利用可能な設定オプションは、[サンプル nvidia_nim.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9] し、Checks セクションに `nvidia_nim` が表示されることを確認してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "nvidia_nim" >}}


### イベント

NVIDIA NIM インテグレーションにはイベントは含まれません。

### サービス チェック
{{< get-service-checks-from-git "nvidia_nim" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。


[1]: https://docs.nvidia.com/nim/large-language-models/latest/observability.html
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://www.nvidia.com/en-us/ai/
[6]: https://docs.datadoghq.com/ja/integrations/openai
[7]: https://github.com/DataDog/integrations-core/blob/master/nvidia_nim/datadog_checks/nvidia_nim/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/nvidia_nim/metadata.csv
[11]: https://github.com/DataDog/integrations-core/blob/master/nvidia_nim/assets/service_checks.json
[12]: https://docs.datadoghq.com/ja/help/