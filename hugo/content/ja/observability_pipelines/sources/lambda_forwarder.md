---
description: Datadog Lambda Forwarder を使用して AWS ベンダーログを Observability Pipelines に送信する方法を学びます。
disable_toc: false
title: Datadog Lambda Forwarder ログを Observability Pipelines に送信する
---
## 概要 {#overview}

このドキュメントでは、Datadog Lambda Forwarder を使用して AWS ベンダーログを Observability Pipelines に送信する方法を説明します。セットアップの手順は以下のとおりです。

- [HTTP/S Server ソースを使用してパイプラインをセットアップする](#set-up-a-pipeline)
- [Datadog Forwarder をデプロイします](#deploy-the-datadog-lambda-forwarder)。

詳細については、[Datadog Forwarder][1] を参照してください。

**注**: Datadog Forwarder は、`ddsource` および `ddtags` でタグ付けされたログを送信し、`source` および `tags` ではありません。これらのログのプロセッサークエリまたはフィルターを定義する際は、`ddsource` および `ddtags` を使用してください。

## パイプラインをセットアップする {#set-up-a-pipeline}

{{% observability_pipelines/lambda_forwarder/pipeline_setup %}}

## Datadog Lambda Forwarder をデプロイする {#deploy-the-datadog-lambda-forwarder}

{{% observability_pipelines/lambda_forwarder/deploy_forwarder %}}

## 健全性メトリクス {#health-metrics}

すべてのソースから発行される [コンポーネントメトリクス][2] および [ソースバッファメトリクス][3] については、[Pipelines 使用状況メトリクス][4] のドキュメントを参照してください。Lambda Forwarder から Observability Pipelines にログを送信するために HTTP Server ソースを使用しているため、関連するメトリクスをフィルタリングするには `component_type:http_server` タグを使用してください。

[1]: /ja/logs/guide/forwarder/?tab=cloudformation
[2]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#source-buffer-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/