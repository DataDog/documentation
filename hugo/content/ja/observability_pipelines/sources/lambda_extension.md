---
description: Lambda Extension のログを Observability Pipelines に送信する方法を学びます。
disable_toc: false
title: Datadog Lambda Extension のログを Observability Pipelines に送信する
---
## 概要 {#overview}

このドキュメントでは、Datadog Lambda Extension を使用して、AWS が提供するログを Observability Pipelines に送信する方法について説明します。セットアップの手順は次のとおりです。

- [HTTP/S Server ソースを使用してパイプラインをセットアップする](#set-up-a-pipeline)
- [Datadog Lambda Extension をデプロイする](#deploy-the-datadog-lambda-extension)

詳細については、[Datadog Lambda Extension][1] を参照してください。

**注**: Datadog Lambda Extension は、`source` と `tags`ではなく、`ddsource` と `ddtags` のタグが付いたログを送信します。これらのログのプロセッサクエリまたはフィルタを定義する際は、`ddsource` と `ddtags` を使用してください。

## パイプラインをセットアップする{#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

**注**: Observability Pipeline は、Lambda Extension のログを処理するソースとして {{< ui >}}HTTP Server{{< /ui >}} を使用する必要があります。ソースとして {{< ui >}}Datadog Agent{{< /ui >}} を使用しないでください。

## Datadog Lambda Extension をデプロイする{#deploy-the-datadog-lambda-extension}

### Datadog Lambda Extension をインストールする{#install-the-datadog-lambda-extension}

[AWS Lambda アプリケーションのインスツルメンテーション][2]の手順に従って、Datadog Lambda ライブラリをセットアップし、AWS Lambda アプリケーションからデータを収集します。

### Datadog Lambda Extension の環境変数を設定する{#set-environment-variables-for-datadog-lambda-extension}

{{% observability_pipelines/lambda_extension_source %}}

## ヘルスメトリクス{#health-metrics}

すべてのソースから出力される[コンポーネントメトリクス][3]および[ソースバッファメトリクス][4]については、[Pipelines 使用状況メトリクス][5]のドキュメントを参照してください。Lambda Extension のログを Observability Pipelines に送信するために HTTP Server ソースを使用しているため、関連するメトリクスをフィルタリングするには `component_type:http_server` タグを使用します。

[1]: https://docs.datadoghq.com/ja/serverless/libraries_integrations/extension/
[2]: https://docs.datadoghq.com/ja/serverless/aws_lambda/instrumentation/
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[5]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/