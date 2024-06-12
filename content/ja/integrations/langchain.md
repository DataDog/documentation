---
app_id: langchain
app_uuid: 7993851f-d36b-40f3-8425-92080f3b9d61
assets:
  dashboards:
    LangChain Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: langchain.request.duration
      metadata_path: metadata.csv
      prefix: langchain.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10372
    source_type_name: LangChain
  monitors:
    Error Rate: assets/monitors/error_rate.json
    Request Latency: assets/monitors/request_duration.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- ai/ml
- 開発ツール
- コスト管理
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/langchain/README.md
display_on_public_website: true
draft: false
git_integration_title: langchain
integration_id: langchain
integration_title: LangChain
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: langchain
public_title: LangChain
short_description: 'LangChain の使用を最適化します: プロンプトサンプリング、パフォーマンスとコストのメトリクス。'
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::AI/ML
  - Category::Developer Tools
  - Category::Cost Management
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Traces
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 'LangChain の使用を最適化します: プロンプトサンプリング、パフォーマンスとコストのメトリクス。'
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: LangChain
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Datadog のメトリクス、APM、ログを使用して、[LangChain][1] Python ライブラリのリクエストから、コストの見積もり、プロンプトとコンプリーションのサンプリング、エラー追跡、パフォーマンスメトリクスなどを取得します。

## セットアップ

### インストール

1. Datadog Agent で APM と StatsD を有効化します。例えば、Docker で:

```
docker run -d --cgroupns host \
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

2. Datadog APM Python ライブラリをインストールします。

```
pip install ddtrace>=1.17
```


3. LangChain Python アプリケーションのコマンドに `ddtrace-run` のプレフィックスを付けます。

```
DD_SERVICE="my-service" DD_ENV="staging" DD_API_KEY=<DATADOG_API_KEY> ddtrace-run python <your-app>.py
```

**注**: Agent がデフォルト以外のホスト名やポートを使用している場合、`DD_AGENT_HOST`、`DD_TRACE_AGENT_PORT`、`DD_DOGSTATSD_PORT` も必ず設定してください。

より高度な使い方については、[APM Python ライブラリドキュメント][2]を参照してください。


### 構成

利用可能なすべての構成オプションについては、[APM Python ライブラリドキュメント][3]を参照してください。


#### ログプロンプトとコンプリーションサンプリング

ログのプロンプトとコンプリーションサンプリングを有効にするには、環境変数 `DD_LANGCHAIN_LOGS_ENABLED=1` を設定します。デフォルトでは、トレースされたリクエストの 10% がプロンプトとコンプリーションを含むログを出力します。

ログのサンプルレートを調整するには、[APM ライブラリのドキュメント][3]を参照してください。

**注**: ログを送信するには、`ddtrace-run` を実行する際に `DD_API_KEY` を指定する必要があります。


### 検証

APM Python ライブラリを使用して Agent と通信できることを確認します。

```
ddtrace-run --info
```

次の出力が表示されるはずです。

```
    Agent error: None
```

#### デバッグロギング

`ddtrace-run` に `--debug` フラグを渡すと、デバッグロギングが有効になります。

```
ddtrace-run --debug
```

データ送信時のエラーを表示します。

```
ERROR:ddtrace.internal.writer.writer:failed to send, dropping 1 traces to intake at http://localhost:8126/v0.5/traces after 3 retries ([Errno 61] Connection refused)
WARNING:ddtrace.vendor.dogstatsd:Error submitting packet: [Errno 61] Connection refused, dropping the packet and closing the socket
DEBUG:ddtrace.contrib._trace_utils_llm.py:sent 2 logs to 'http-intake.logs.datadoghq.com'
```

## データ収集

### メトリクス
{{< get-metrics-from-git "langchain" >}}


### イベント

LangChain インテグレーションには、イベントは含まれません。

### サービスチェック

LangChain インテグレーションには、サービスのチェック機能は含まれません。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://docs.langchain.com/docs/
[2]: https://ddtrace.readthedocs.io/en/stable/installation_quickstart.html
[3]: https://ddtrace.readthedocs.io/en/stable/integrations.html#langchain
[4]: https://github.com/DataDog/integrations-core/blob/master/langchain/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/