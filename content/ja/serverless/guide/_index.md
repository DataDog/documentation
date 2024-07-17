---
cascade:
  algolia:
    category: ガイド
    rank: 20
    subcategory: サーバーレスモニタリングガイド
disable_toc: true
private: true
title: サーバーレスモニタリングガイド
---

## General serverless guides

{{< whatsnext desc="サーバーレスアプリケーションを監視するためのベストプラクティス" >}}
    {{< nextlink href="/serverless/guide/connect_invoking_resources" >}}Lambda 関数を呼び出すリソースの詳細な視覚化{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_warnings" >}}Serverless Warnings{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tagging" >}}Serverless Tagging{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/agent_configuration" >}}Agent Configuration{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/opentelemetry" >}}サーバーレスと OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Azure App Service と Container Apps" >}}
    {{< nextlink href="/serverless/guide/azure_app_service_linux_sidecar" >}}Azure Sidecar を使用した Azure App Service 上の Linux コンテナのインスツルメンテーション{{< /nextlink >}}
{{< /whatsnext >}}

## Install using the Datadog Forwarder

{{< whatsnext desc="Installation instructions for applications previously set up to be monitored using the Datadog Forwarder" >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_node" >}}Instrumenting Node.js Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_python" >}}Instrumenting Python Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_java" >}}Instrumenting Java Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_go" >}}Instrumenting Go Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_dotnet" >}}Instrumenting .NET Serverless Applications Using the Datadog Forwarder{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/extension_motivation" >}}Deciding to migrate to the Datadog Lambda Extension{{< /nextlink >}}
{{< /whatsnext >}}

## Troubleshoot your installation

{{< whatsnext desc="インストール時のよくある問題とトラブルシューティングのヒント" >}}
    {{< nextlink href="/serverless/troubleshooting" >}}サーバーレスモニタリングのトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tracing_and_webpack" >}}Node.js の Lambda トレースと Webpack の互換性{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_package_too_large" >}}サーバーレスパッケージが大きすぎるエラーのトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/handler_wrapper" >}}Lambda ハンドラーをコードでラップする{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/layer_not_authorized" >}}レイヤーが認可されていないエラーのトラブルシューティング{{< /nextlink >}}
{{< /whatsnext >}}