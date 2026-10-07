---
app_id: google-gemini
app_uuid: 93179a9e-98f8-48fe-843a-59f9c9bb84df
assets:
  dashboards:
    LLM Observability Overview Dashboard: assets/dashboards/llm_observability_overview_dashboard.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 31079799
    source_type_name: Google Gemini
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- ai/ml
- google cloud
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_gemini
integration_id: google-gemini
integration_title: Google Gemini
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_gemini
public_title: Google Gemini
short_description: アプリケーション レベルで Google Gemini の使用状況と正常性を監視
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Google Cloud
  - Category::Metrics
  - Submitted Data Type::Traces
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: アプリケーション レベルで Google Gemini の使用状況と正常性を監視
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Google Gemini
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

[Google Gemini][1] を使用して、チャット ボットやデータ抽出ツールなどの LLM を活用するアプリケーションを監視、トラブル シューティング、評価します。

LLM アプリケーションを構築している場合は、Datadog の LLM Observability を使用して問題の根本原因を調査し、運用パフォーマンスを監視し、LLM アプリケーションの品質、プライバシー、安全性を評価してください。

トレースの調査方法の例については、[LLM Observability のトレース ビューの動画][2] を参照してください。

## セットアップ

### LLM Observability: Google Gemini を使用して LLM アプリケーションのエンド ツー エンドの可視性を実現
LLM Observability はさまざまな環境で有効化できます。ご利用のシナリオに応じて適切なセットアップに従ってください。

#### Python 向けのインストール

##### Datadog Agent がない場合:
1. `ddtrace` パッケージをインストール:

  ```shell
    pip install ddtrace
  ```

2. Agentless モードを有効にして、次のコマンドでアプリケーションを起動:

  ```shell
    DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
  ```

##### すでに Datadog Agent をインストール済みの場合:
1. Agent が実行中で、APM と StatsD が有効になっていることを確認します。たとえば、Docker では次のコマンドを使用します:

  ```shell
  docker run -d \
    --cgroupns host \
    --pid host \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    -v /proc/:/host/proc/:ro \
    -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
    -e DD_API_KEY=<DATADOG_API_KEY> \
    -p 127.0.0.1:8126:8126/tcp \
    -p 127.0.0.1:8125:8125/udp \
    -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
    -e DD_APM_ENABLED=true \
    gcr.io/datadoghq/agent:latest
  ```

2. まだでなければ、`ddtrace` パッケージをインストール:

  ```shell
    pip install ddtrace
  ```

3. `ddtrace-run` コマンドでアプリケーションを起動して、トレーシングを自動的に有効化:

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
  ```

**注**: Agent がカスタム ホストまたはポートで実行されている場合は、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` を適切に設定してください。

##### サーバーレス環境で LLM Observability を実行している場合:

次の環境変数を設定して LLM Observability を有効化:

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
  ```

**注**: サーバーレス環境では、サーバーレス関数の実行が終了すると Datadog が自動的にスパンをフラッシュします。

##### Google Gemini の自動トレーシング

Google Gemini インテグレーションは、Google AI Python SDK のコンテンツ生成呼び出しに対する自動トレーシングを提供します。これにより、Google Gemini の各種操作について、レイテンシ、エラー、入力および出力メッセージ、トークン使用量が取得されます。

同期および非同期の Google Gemini 操作の両方で、次のメソッドがトレースされます:
- コンテンツ生成 (ストリーム呼び出しを含む): `model.generate_content()`, `model.generate_content_async()`
- チャット メッセージ: `chat.send_message()`, `chat.send_message_async()`

これらのメソッドに追加のセットアップは不要です。

##### 検証
アプリケーション ログでスパンが正常に作成されていることを確認し、LLM Observability がスパンを正しく取得していることを検証します。`ddtrace` インテグレーションの状態を確認するには、次のコマンドを実行します:

  ```shell
  ddtrace-run --info
  ```

セットアップが正しいことを確認するため、次のメッセージを探してください:

  ```shell
  Agent error: None
  ```

##### デバッグ
セットアップ時に問題が発生した場合は、`--debug` フラグを指定してデバッグ ロギングを有効化してください:

  ```shell
  ddtrace-run --debug
  ```

これにより、Google Gemini のトレースに関する問題を含む、データ送信やインスツルメンテーションに関連するエラーが表示されます。

## 収集データ

### メトリクス

Google Gemini インテグレーションにはメトリクスは含まれていません。

### サービス チェック

Google Gemini インテグレーションにはサービス チェックは含まれていません。

### イベント

Google Gemini インテグレーションにはイベントは含まれていません。

## トラブル シューティング

お困りの場合は [Datadog サポート][3] までお問い合わせください。


[1]: https://gemini.google.com/
[2]: https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max
[3]: https://docs.datadoghq.com/ja/help/