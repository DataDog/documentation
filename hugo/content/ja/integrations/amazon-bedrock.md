---
aliases:
- /ja/integrations/amazon_bedrock
app_id: amazon-bedrock
categories:
- aws
- metrics
- cloud
- ai/ml
custom_kind: integration
description: Amazon Bedrock を使うと、AI の基盤モデルを API 経由で利用できます。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/
  tag: blog
  text: Datadog で Amazon Bedrock を監視する
media: []
title: Amazon Bedrock
---
## 概要

Amazon Bedrock を使うと、チャット ボットやデータ抽出ツールなど、LLM を活用したアプリケーションを監視し、トラブルシューティングし、評価できます。

LLM アプリケーションを構築している場合は、LLM Observability を使って問題の根本原因を調査し、運用パフォーマンスを監視し、LLM アプリケーションの品質、プライバシー、安全性を評価できます。

トレースをどのように調査できるかの例については、[LLM Observability のトレーシング画面の動画](https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max) を参照してください。

Amazon Bedrock は、Amazon や主要な AI スタートアップの [基盤モデル](https://aws.amazon.com/what-is/foundation-models/) (FM) を API 経由で利用できるようにするフル マネージド サービスです。さまざまな FM から、ユース ケースに最適なモデルを選べます。

このインテグレーションを有効にすると、Bedrock のすべてのメトリクスを Datadog で確認できます。

## セットアップ

### LLM Observability: Amazon Bedrock を使って LLM アプリケーションをエンド ツー エンドで可視化する

LLM Observability はさまざまな環境で有効化できます。利用シナリオに応じて、該当するセットアップ手順に従ってください:

#### Python 向けインストール

##### Datadog Agent がない場合:

1. `ddtrace` パッケージをインストールします:

```shell
  pip install ddtrace
```

2. 次のコマンドで Agentless mode を有効にしてアプリケーションを起動します:

```shell
  DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
```

##### すでに Datadog Agent をインストールしている場合:

1. Agent が起動しており、APM と StatsD が有効になっていることを確認します。たとえば、Docker では次のコマンドを使用します:

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

2. まだであれば、`ddtrace` パッケージをインストールします:

```shell
  pip install ddtrace
```

3. `ddtrace-run` コマンドでアプリケーションを起動すると、トレーシングが自動的に有効になります:

```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> ddtrace-run python <YOUR_APP>.py
```

**注**: Agent がカスタム ホストまたはポートで動作している場合は、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` を適切に設定します。

##### サーバーレス環境 (AWS Lambda) で LLM Observability を実行する場合:

1. AWS Lambda のセットアップの一環として、**Datadog-Python** と **Datadog-Extension** の Lambda レイヤーをインストールします。
1. 次の環境変数を設定して LLM Observability を有効にします:

```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
```

**注**: サーバーレス環境では、Lambda 関数の実行完了時に Datadog が span を自動的に flush します。

##### Amazon Bedrock の自動トレーシング

LLM Observability を設定すると、Amazon Bedrock インテグレーションは自動的に有効になります。これにより、Amazon Bedrock 呼び出しのレイテンシー、エラー、入力/出力メッセージ、トークン使用量が取得されます。

同期処理とストリーミング処理の両方で、次の Amazon Bedrock 操作がトレース対象になります:

- `InvokeModel()`
- `InvokeModelWithResponseStream()`

これらのメソッドでは追加設定は不要です。

##### 検証

LLM Observability が span を正しく取得していることは、アプリケーション ログで span の生成成功を確認することで検証できます。`ddtrace` インテグレーションの状態は、次のコマンドでも確認できます:

```shell
ddtrace-run --info
```

セットアップ確認のため、次のメッセージが表示されることを確認します:

```shell
Agent error: None
```

##### デバッグ

セットアップ中に問題が発生した場合は、`--debug` フラグを付けて debug logging を有効にします:

```shell
ddtrace-run --debug
```

これにより、Amazon Bedrock のトレースに関する問題を含め、データ送信や instrumentation に関するエラーを確認できます。

#### Node.js 向けインストール

##### Datadog Agent がない場合:

1. `dd-trace` パッケージをインストールします:

   ```shell
     npm install dd-trace
   ```

1. 次のコマンドで agentless mode を有効にしてアプリケーションを起動します:

   ```shell
     DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_AGENTLESS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> node -r 'dd-trace/init' <your_app>.js
   ```

##### すでに Datadog Agent をインストールしている場合:

1. Agent が起動しており、APM が有効になっていることを確認します。たとえば、Docker では次のコマンドを使用します:

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

1. Datadog APM Node.js ライブラリをインストールします。

   ```shell
   npm install dd-trace
   ```

1. `-r dd-trace/init` または `NODE_OPTIONS='--require dd-trace/init'` を使ってアプリケーションを起動すると、トレーシングが自動的に有効になります:

   ```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME> node -r 'dd-trace/init' <your_app>.js
   ```

**注**: Agent がカスタム ホストまたはポートで動作している場合は、`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` を適切に設定します。

##### サーバーレス環境 (AWS Lambda) で LLM Observability を実行する場合:

1. 次の環境変数を設定して LLM Observability を有効にします:

   ```shell
   DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
   ```

1. Lambda の実行が終了する前に、`llmobs.flush()` を呼び出します:

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

### APM: Python アプリケーションの使用状況メトリクスを取得する

まだ設定していない場合は、先に [Amazon Web Services インテグレーション](https://docs.datadoghq.com/integrations/amazon_web_services/) を設定してください。

### メトリクス収集

1. [AWS integration page](https://app.datadoghq.com/integrations/amazon-web-services) の `Metric Collection` タブで、`Bedrock` が有効になっていることを確認します。
1. [Datadog - Amazon Bedrock インテグレーション](https://app.datadoghq.com/integrations/amazon-bedrock) をインストールします。

## 収集データ

### メトリクス

| | |
| --- | --- |
| **aws.bedrock.content_filtered_count** <br>(count) | テキスト出力コンテンツがフィルタリングされた総回数<br>_単位は time_ |
| **aws.bedrock.input_token_count** <br>(gauge) | モデルに対して実行されたプロンプトで使用された入力トークン数の平均<br>_単位は token_ |
| **aws.bedrock.input_token_count.minimum** <br>(gauge) | モデルに対して実行されたプロンプトで使用された入力トークン数の最小値<br>_単位は token_ |
| **aws.bedrock.input_token_count.maximum** <br>(gauge) | モデルに対して実行されたプロンプトで使用された入力トークン数の最大値<br>_単位は token_ |
| **aws.bedrock.input_token_count.sum** <br>(count) | モデルに対して実行されたプロンプトで使用された入力トークン総数<br>_単位は token_ |
| **aws.bedrock.invocation_client_errors** <br>(count) | 呼び出し時に発生したクライアント エラー数<br>_単位は error_ |
| **aws.bedrock.invocation_latency** <br>(gauge) | 呼び出しレイテンシーの平均 (ミリ秒)<br>_単位は millisecond_ |
| **aws.bedrock.invocation_latency.minimum** <br>(gauge) | 1 分間における呼び出しレイテンシーの最小値<br>_単位は millisecond_ |
| **aws.bedrock.invocation_latency.maximum** <br>(gauge) | 1 分間における呼び出しレイテンシーの最大値<br>_単位は millisecond_ |
| **aws.bedrock.invocation_latency.p99** <br>(gauge) | 1 分間における呼び出しレイテンシーの 99 パーセンタイル値<br>_単位は millisecond_ |
| **aws.bedrock.invocation_latency.p95** <br>(gauge) | 1 分間における呼び出しレイテンシーの 95 パーセンタイル値<br>_単位は millisecond_ |
| **aws.bedrock.invocation_latency.p90** <br>(gauge) | 1 分間における呼び出しレイテンシーの 90 パーセンタイル値<br>_単位は millisecond_ |
| **aws.bedrock.invocation_server_errors** <br>(count) | 呼び出し時に発生したサーバー エラー数<br>_単位は error_ |
| **aws.bedrock.invocation_throttles** <br>(count) | 呼び出しのスロットリング発生回数<br>_単位は throttle_ |
| **aws.bedrock.invocations** <br>(count) | モデル エンドポイントに送信された呼び出し回数<br>_単位は invocation_ |
| **aws.bedrock.output_image_count** <br>(gauge) | 1 分間において、モデル呼び出しで返された出力画像数の平均<br>_単位は item_ |
| **aws.bedrock.output_token_count** <br>(gauge) | 1 分間において、モデル呼び出しで返された出力トークン数の平均<br>_単位は token_ |
| **aws.bedrock.output_token_count.minimum** <br>(gauge) | 1 分間において、モデル呼び出しで返された出力トークン数の最小値<br>_単位は token_ |
| **aws.bedrock.output_token_count.maximum** <br>(gauge) | 1 分間において、モデル呼び出しで返された出力トークン数の最大値<br>_単位は token_ |
| **aws.bedrock.output_token_count.sum** <br>(count) | すべてのモデル呼び出しで返された出力トークン総数<br>_単位は token_ |

### イベント

Amazon Bedrock インテグレーションにはイベントは含まれません。

### サービス チェック

Amazon Bedrock インテグレーションにはサービス チェックは含まれません。

## トラブルシューティング

サポートが必要な場合は、[Datadog サポート](https://docs.datadoghq.com/help/) にお問い合わせください。

## 参考資料

役立つドキュメント、リンク、記事:

- [Datadog で Amazon Bedrock を監視する](https://www.datadoghq.com/blog/monitor-amazon-bedrock-with-datadog/)