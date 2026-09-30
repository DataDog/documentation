---
app_id: azure-openai
app_uuid: 20d1d2b1-9f8e-46b4-a3ef-9767449e22c8
assets:
  dashboards:
    azure-openai: assets/dashboards/azure_openai_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.cognitiveservices_accounts.processed_prompt_tokens
      metadata_path: metadata.csv
      prefix: azure.cognitiveservices_accounts
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 12193845
    source_type_name: Azure OpenAI
  monitors:
    OpenAI Account's Token Usage is Abnormally High: assets/monitors/azure_openai_token_usage_high.json
    OpenAI Harmful Calls: assets/monitors/azure_openai_harmful_calls_high.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- Azure
- ai/ml
- metrics
custom_kind: integration
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_openai
integration_id: azure-openai
integration_title: Azure OpenAI
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_openai
public_title: Azure OpenAI
short_description: Azure OpenAI を使用して LLM アプリケーションを監視、最適化、評価します
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::AI/ML
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Installation
  description: Azure OpenAI を使用して LLM アプリケーションを監視、最適化、評価します
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure OpenAI
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->


## 概要

Azure OpenAI を使用して、チャット ボットやデータ抽出ツールなどの LLM 駆動アプリケーションを監視、トラブルシュート、評価します。

LLM アプリケーションを構築している場合は、LLM Observability を使用して問題の根本原因を調査し、運用パフォーマンスを監視し、LLM アプリケーションの品質、プライバシー、安全性を評価してください。

トレースの調査方法の例については、[LLM Observability のトレース ビューの動画][1] を参照してください。

Azure OpenAI は、OpenAI のモデル ライブラリを使用したコパイロットや生成 AI アプリケーションの開発を可能にします。Datadog インテグレーションを使用して、Azure OpenAI API とデプロイのパフォーマンスと使用状況を追跡します。

## セットアップ

### LLM Observability: Azure OpenAI を使用した LLM アプリケーションのエンド ツー エンドの可視性

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

##### サーバーレス環境 (Azure Functions) で LLM Observability を実行している場合:

次の環境変数を設定して LLM Observability を有効化:

```shell
DD_SITE=<YOUR_DATADOG_SITE> DD_API_KEY=<YOUR_API_KEY> DD_LLMOBS_ENABLED=1 DD_LLMOBS_ML_APP=<YOUR_ML_APP_NAME>
```

**注**: サーバーレス環境では、Azure 関数の実行が終了すると Datadog が自動的にスパンをフラッシュします。

##### Azure OpenAI の自動トレーシング

LLM Observability が構成されている場合、Azure OpenAI インテグレーションは自動的に有効化されます。これにより、レイテンシ、エラー、入力および出力メッセージに加えて、Azure OpenAI 呼び出しのトークン使用量が取得されます。

同期および非同期の Azure OpenAI 操作の両方で、次のメソッドがトレースされます:

- `AzureOpenAI().completions.create()`
- `AsyncAzureOpenAI().completions.create()`
- `AzureOpenAI().chat.completions.create()`
- `AsyncAzureOpenAI().chat.completions.create()`

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

これにより、データ送信やインスツルメンテーションに関連するエラー (Azure OpenAI のトレースに関する問題を含む) が表示されます。

### Infrastructure Monitoring: Azure OpenAI リソースのメトリクスと可視性

[Microsoft Azure インテグレーション][2]をまだセットアップしていない場合は、最初にセットアップします。それ以上のインストール手順はありません。

# Datadog の Azure OpenAI インテグレーション向け LLM 評価の構成

## 概要

Datadog の _LLM Observability_ は、Azure OpenAI のモデルを使用して LLM アプリケーションを評価できます。以下の手順に従って、Azure OpenAI リソースをセットアップし、評価用に構成します。

## 前提条件

- Azure OpenAI サービスにアクセスできる **Azure アカウント**。
- Azure Portal にデプロイ済みの **Azure OpenAI リソース**。
- OpenAI モデルにアクセスするための必要な **API キー**。
- Azure Portal にログインしていること。

## セットアップ

### Datadog の LLM Observability を構成する

1. **Integrations > Azure OpenAI** に移動します。
2. **Configure** タブで **Add New** をクリックします。
3. 次の詳細を入力します:

- **Name**
  1. 設定する Azure OpenAi アカウントを識別するための Datadog Account Name を選択します。
- **Deployment ID**
  1. [Azure Open AI Foundry][3] [Portal][4] で **Model Deployments** に移動します。
  2. モデルをデプロイするときに設定した **Deployment ID** をコピーして入力します。
- **Resource name**
  1. [All resources][4] に移動し、Azure OpenAI リソースを見つけます。
  2. リソース名をクリックして、その Overview ページを開きます。
  3. **resource name** をコピーして入力します。
- **API version**
  1. Azure Portal の **Deployments Page** から **Endpoint** セクションに移動します。
  2. **Target URI** にカーソルを合わせ、`api-version=` の後の値をコピーします。
- **API key**
  1. Azure Portal の Azure OpenAI リソース内で、**Resource Management** の下にある **Keys and Endpoint** に移動します。
  2. **Key 1** または **Key 2** のいずれかを **API key** としてコピーして入力します。

4. チェック マークをクリックして保存します。

5. インスツルメント済み LLM アプリケーションの評価を作成して実行するには、**LLM Observability > Settings** に移動します。

## 追加リソース

- [Azure OpenAI サービス ドキュメント][5]
- [API トークンの生成][6]


## 収集データ

### メトリクス
{{< get-metrics-from-git "azure_openai" >}}


### サービス チェック

Azure OpenAI インテグレーションには、サービス チェックは含まれません。

### イベント

Azure OpenAI インテグレーションには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問い合わせください。

[1]: https://imgix.datadoghq.com/video/products/llm-observability/expedite-troubleshooting.mp4?fm=webm&fit=max
[2]: https://docs.datadoghq.com/ja/integrations/azure/
[3]: https://learn.microsoft.com/en-us/azure/ai-foundry/azure-openai-in-ai-foundry
[4]: https://portal.azure.com/#view/Microsoft_Azure_ProjectOxford/CognitiveServicesHub/~/OpenAI
[5]: https://learn.microsoft.com/en-us/azure/cognitive-services/openai/
[6]: https://portal.azure.com/
[7]: https://github.com/DataDog/integrations-internal-core/blob/main/azure_openai/metadata.csv
[8]: https://docs.datadoghq.com/ja/help/