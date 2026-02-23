---
app_id: amazon-bedrock
app_uuid: ca7ffbc0-a346-4880-ab41-d6ef2dbd0ba3
assets:
  dashboards:
    amazon-bedrock: assets/dashboards/amazon_bedrock_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - aws.bedrock.invocations
      metadata_path: assets/metrics/metric-spec.yaml
      prefix: aws.bedrock.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 370
    source_type_name: Amazon Bedrock
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- AWS
- モニター
- クラウド
- ai/ml
custom_kind: インテグレーション
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: amazon_bedrock
integration_id: amazon-bedrock
integration_title: Amazon Bedrock
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: amazon_bedrock
public_title: Amazon Bedrock
short_description: Amazon Bedrock は、API を通じて AI 基盤モデルを利用可能にします。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AWS
  - Category::Metrics
  - Category::Cloud
  - Category::AI/ML
  - Offering::Integration
  configuration: README.md#Setup
  description: Amazon Bedrock は、API を通じて AI 基盤モデルを利用可能にします。
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/
  support: README.md#Support
  title: Amazon Bedrock
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 概要
Amazon Bedrock を使用して、チャット ボットやデータ抽出ツールなどの LLM を活用するアプリケーションを監視、トラブル シューティング、評価します。

LLM アプリケーションを構築している場合は、LLM Observability を使用して問題の根本原因を調査し、運用パフォーマンスを監視し、LLM アプリケーションの品質、プライバシー、安全性を評価してください。

トレースの調査方法の例については、[LLM Observability のトレース ビューの動画][1] を参照してください。

Amazon Bedrock は、Amazon および先進的な AI スタートアップの[基盤モデル][2] (FM) を API 経由で提供する完全マネージド型のサービスで、用途に最適なモデルを様々な FM から選べます。

このインテグレーションを有効にすると、Datadog にすべての Bedrock メトリクスを表示できます。

## セットアップ

### LLM Observability: Amazon Bedrock を使用して LLM アプリケーションのエンド ツー エンドの可視性を実現
You can enable LLM Observability in different environments. Follow the appropriate setup based on your scenario:

#### Installation for Python

##### If you do not have the Datadog Agent:
1. Install the `ddtrace` package:

  ```shell
    pip install ddtrace
  ```

2. Start your application with the following command, enabling Agentless mode:

  ```shell
    DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
  ```

##### If you already have the Datadog Agent installed:
1. Make sure the Agent is running and that APM and StatsD are enabled. For example, use the following command with Docker:

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

2. If you haven't already, install the `ddtrace` package:

  ```shell
    pip install ddtrace
  ```

3. Start your application using the `ddtrace-run` command to automatically enable tracing:

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
  ```

**Note**: If the Agent is running on a custom host or port, set `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` accordingly.

##### サーバーレス環境で LLM Observability を実行している場合 (AWS Lambda):
1. AWS Lambda セットアップの一部として、 **Datadog-Python** および **Datadog-Extension** の Lambda レイヤーをインストールします。
2. Enable LLM Observability by setting the following environment variables:

  ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
  ```

**注**: サーバーレス環境では、Lambda 関数の実行が終了すると Datadog が自動的にスパンをフラッシュします。

##### Amazon Bedrock の自動トレーシング
LLM Observability が構成されている場合、 Amazon Bedrock インテグレーションは自動的に有効になります。これにより、 Amazon Bedrock 呼び出しのレイテンシ、エラー、入力メッセージと出力メッセージ、およびトークン使用量が記録されます。

同期およびストリーミングの Amazon Bedrock オペレーションについて、以下のメソッドがトレースされます:
- `InvokeModel()`
- `InvokeModelWithResponseStream()`

No additional setup is required for these methods.

##### 検証
Validate that LLM Observability is properly capturing spans by checking your application logs for successful span creation. You can also run the following command to check the status of the `ddtrace` integration:

  ```shell
  ddtrace-run --info
  ```

Look for the following message to confirm the setup:

  ```shell
  Agent error: None
  ```

##### デバッグ
If you encounter issues during setup, enable debug logging by passing the `--debug` flag:

  ```shell
  ddtrace-run --debug
  ```

これにより、Amazon Bedrock のトレースに関する問題を含む、データ送信やインスツルメンテーションに関連するエラーが表示されます。

#### Node.js 向けのインストール

##### If you do not have the Datadog Agent:
1. `dd-trace` パッケージをインストール:

   ```shell
     npm install dd-trace
   ```

2. エージェントレス モードを有効にして、次のコマンドでアプリケーションを起動:

   ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> node -r 'dd-trace/init' <your_app>.js
   ```

##### If you already have the Datadog Agent installed:
1. Agent が実行中で、APM が有効になっていることを確認します。たとえば、Docker では次のコマンドを使用します:

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

2. Datadog APM Node.js ライブラリをインストールします。

   ```shell
   npm install dd-trace
   ```

3. `-r dd-trace/init` または `NODE_OPTIONS='--require dd-trace/init'` コマンドでアプリケーションを起動して、トレーシングを自動的に有効化:

   ```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> node -r 'dd-trace/init' <your_app>.js
   ```

**Note**: If the Agent is running on a custom host or port, set `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT` accordingly.

##### サーバーレス環境で LLM Observability を実行している場合 (AWS Lambda):
1. Enable LLM Observability by setting the following environment variables:

   ```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
   ```

2. lambda が終了する前に、 `llmobs.flush()` を呼び出します:

   ```js
   const llmobs = require('dd-trace').llmobs;
   // or, if dd-trace was not initialized via NODE_OPTIONS
   const llmobs = require('dd-trace').init({
     llmobs: {
       mlApp: <YOUR_ML_APP>,
     }
   }).llmobs; // with DD_API_KEY and DD_SITE being set at the environment level

   async function handler (event, context) {
     ...
     llmobs.flush()
     return ...
   }
   ```

### APM: Python アプリケーションの使用状況メトリクスを取得

[Amazon Web Services インテグレーション][3]をまだセットアップしていない場合は、最初にセットアップします。

### メトリクスの収集

1. [AWS インテグレーションページ][4]で、`Metric Collection` タブの下にある `Bedrock` が有効になっていることを確認します。
2. [Datadog - Amazon Bedrock インテグレーション][5]をインストールします。

## 収集データ

### メトリクス
{{< get-metrics-from-git "amazon_bedrock" >}}


### イベント

Amazon Bedrock インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon Bedrock インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog を使用した Amazon Bedrock の監視][8]

[1]: https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max
[2]: https://aws.amazon.com/what-is/foundation-models/
[3]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[4]: https://app.datadoghq.com/integrations/amazon-web-services
[5]: https://app.datadoghq.com/integrations/amazon-bedrock
[6]: https://github.com/DataDog/integrations-internal-core/blob/main/amazon_bedrock/assets/metrics/metric-spec.yaml
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/