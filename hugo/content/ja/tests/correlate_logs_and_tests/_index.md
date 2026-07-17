---
description: ログをテストトレースと相関付けます。
further_reading:
- link: /tests
  tag: ドキュメント
  text: Test Optimization について
title: ログとテストの相関付け
---

## 概要

Test Optimization データと [Datadog に挿入されたログ][1]を相関付けることで、特定のテストケースに対するログの表示と分析が可能です。

{{< img src="continuous_integration/correlate_logs_and_tests.png" 
  alt="特定のテストケースのログを、ログとテストの相関関係とともに確認します。" style="width:90%" >}}

## セットアップ

相関関係は、[テストデータを Datadog に送信する][2]方法に応じて異なる構成ができます。

{{< tabs >}}
{{% tab "クラウド CI プロバイダー (エージェントレス)" %}}


### Java
エージェントレスのログ送信は、以下の言語およびフレームワークでサポートされています。

- `dd-trace-java >= 1.35.2` と Log4j2。

エージェントレスのログ送信を有効にし、構成するためには、次の環境変数を使用します。

| 名前 | 説明 | デフォルト値 |
|---|---|---|
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (必須) | ログ送信の有効化/無効化を設定します | `false`
| `DD_AGENTLESS_LOG_SUBMISSION_LEVEL` (オプション) | エージェントレス送信のログレベルを設定します | `INFO`
| `DD_AGENTLESS_LOG_SUBMISSION_QUEUE_SIZE` (オプション) | 保留中のログキューの最大サイズを設定します | `1024`
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (オプション) | ログ送信用のカスタム URL を設定します | -

### Javascript/Typescript

エージェントレスのログ送信は、以下の言語およびフレームワークでサポートされています。

- `dd-trace-js >= 5.24.0` および `dd-trace-js >= 4.48.0` および `winston`。

エージェントレスのログ送信を有効にし、構成するためには、次の環境変数を使用します。

| 名前 | 説明 | デフォルト値 |
|---|---|---|
| `DD_AGENTLESS_LOG_SUBMISSION_ENABLED` (必須) | ログ送信の有効化/無効化を設定します | `false`
| `DD_AGENTLESS_LOG_SUBMISSION_URL` (オプション) | ログ送信用のカスタム URL を設定します | -

{{% /tab %}}
{{% tab "オンプレミス CI プロバイダー (Datadog Agent)" %}}

1. Datadog Agent を使用して[ログ収集をセットアップ][1]します。
2. [ログとトレースの相関付け][2]の手順に従ってください。


[1]: /ja/logs/log_collection/
[2]: /ja/tracing/other_telemetry/connect_logs_and_traces/
{{% /tab %}}
{{< /tabs >}}

### .NET
エージェントレスのログ送信は、以下の言語およびフレームワークでサポートされています。

- `dd-trace-dotnet >= 2.50.0` および XUnit TestOutputHelper。

エージェントレスのログ送信を有効にし、構成するためには、次の環境変数を使用します。

| 名前 | 説明 | デフォルト値 |
|---|---|---|
| `DD_CIVISIBILITY_LOGS_ENABLED` (必須) | CI Visibility ログ送信の有効化/無効化を設定します | `false`

### Swift

ログ送信を有効にし、構成するためには、次の環境変数を使用します。

| 名前 | 説明 | デフォルト値 |
|---|---|---|
| `DD_ENABLE_STDOUT_INSTRUMENTATION` | stdout のログ送信の有効化/無効化を設定します | `false`
| `DD_ENABLE_STDERR_INSTRUMENTATION` | stderr のログ送信の有効化/無効化を設定します | `false`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_collection/
[2]: /ja/tests/setup/