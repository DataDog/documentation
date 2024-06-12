---
app_id: openai
app_uuid: 46e76528-8e93-4a7c-9299-387ce0a905c6
assets:
  dashboards:
    OpenAI Overview Dashboard: assets/dashboards/overview_dashboard.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: openai.request.duration
      metadata_path: metadata.csv
      prefix: openai.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: OpenAI
  monitors:
    Request Limits: assets/recommended_monitors/request_limits.json
    Token per min Limits: assets/recommended_monitors/tokens_limits.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories: []
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openai/README.md
display_on_public_website: true
draft: false
git_integration_title: openai
integration_id: openai
integration_title: OpenAI
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: openai
public_title: OpenAI
short_description: 'OpenAI 利用の最適化: コスト見積もり、プロンプトサンプリング、パフォーマンスメトリクス。'
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Submitted Data Type::Traces
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: 'OpenAI 利用の最適化: コスト見積もり、プロンプトサンプリング、パフォーマンスメトリクス。'
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenAI
---



## 概要

Datadog のメトリクス、APM、ログを使用して、[OpenAI][1] Python ライブラリのリクエストから、コストの見積もり、プロンプトとコンプリーションのサンプリング、エラー追跡、パフォーマンスメトリクスなどを取得します。

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
pip install ddtrace>=1.13
```


3. OpenAI Python アプリケーションのコマンドに `ddtrace-run` のプレフィックスを付けます。

```
DD_SERVICE="my-service" DD_ENV="staging" DD_API_KEY=<DATADOG_API_KEY> ddtrace-run python <your-app>.py
```

**注**: Agent がデフォルト以外のホスト名やポートを使用している場合、`DD_AGENT_HOST`、`DD_TRACE_AGENT_PORT`、`DD_DOGSTATSD_PORT` も必ず設定してください。

より高度な使い方については、[APM Python ライブラリドキュメント][2]を参照してください。


### コンフィギュレーション

利用可能なすべての構成オプションについては、[APM Python ライブラリドキュメント][3]を参照してください。


#### ログプロンプトとコンプリーションサンプリング

ログのプロンプトとコンプリーションサンプリングを有効にするには、環境変数 `DD_OPENAI_LOGS_ENABLED=1` を設定します。デフォルトでは、トレースされたリクエストの 10% がプロンプトとコンプリーションを含むログを出力します。

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
DEBUG:ddtrace.contrib.openai._logging.py:sent 2 logs to 'http-intake.logs.datadoghq.com'
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "openai" >}}


### イベント

OpenAI インテグレーションには、イベントは含まれません。

### サービスのチェック

OpenAI インテグレーションには、サービスのチェック機能は含まれません。


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で OpenAI の利用状況を監視する][6]
- [Datadog で Azure OpenAI を監視する][7]

[1]: https://openai.com/
[2]: https://ddtrace.readthedocs.io/en/stable/installation_quickstart.html
[3]: https://ddtrace.readthedocs.io/en/stable/integrations.html#openai
[4]: https://github.com/DataDog/integrations-core/blob/master/openai/metadata.csv
[5]: https://docs.datadoghq.com/ja/help/
[6]: https://www.datadoghq.com/blog/monitor-openai-with-datadog/
[7]: https://www.datadoghq.com/blog/monitor-azure-openai-with-datadog/