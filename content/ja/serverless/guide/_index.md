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

## 一般的なサーバーレスガイド

{{< whatsnext desc="サーバーレスアプリケーションを監視するためのベストプラクティス" >}}
    {{< nextlink href="/serverless/guide/connect_invoking_resources" >}}Lambda 関数を呼び出すリソースの詳細な視覚化{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_warnings" >}}サーバーレスの警告{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tagging" >}}サーバーレスのタグ付け{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/agent_configuration" >}}Agent 構成{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/opentelemetry" >}}サーバーレスと OpenTelemetry{{< /nextlink >}}
{{< /whatsnext >}}

## Datadog Forwarder を使ったインストール

{{< whatsnext desc="Datadog Forwarder を使用して監視するように以前に設定されたアプリケーションのインストール手順" >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_node" >}}Datadog Forwarder を使った Node.js サーバーレスアプリケーションのインスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_python" >}}Datadog Forwarder を使った Python サーバーレスアプリケーションのインスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_java" >}}Datadog Forwarder を使った Java サーバーレスアプリケーションのインスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_go" >}}Datadog Forwarder を使った Go サーバーレスアプリケーションのインスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/datadog_forwarder_dotnet" >}}Datadog Forwarder を使った .NET サーバーレスアプリケーションのインスツルメンテーション{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/extension_motivation" >}}Datadog Lambda 拡張機能への移行を決定する{{< /nextlink >}}
{{< /whatsnext >}}

## インストール時のトラブルシューティング

{{< whatsnext desc="インストール時のよくある問題とトラブルシューティングのヒント" >}}
    {{< nextlink href="/serverless/troubleshooting" >}}サーバーレスモニタリングのトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_tracing_and_webpack" >}}Node.js の Lambda トレースと Webpack の互換性{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/serverless_package_too_large" >}}サーバーレスパッケージが大きすぎるエラーのトラブルシューティング{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/handler_wrapper" >}}Lambda ハンドラーをコードでラップする{{< /nextlink >}}
    {{< nextlink href="/serverless/guide/layer_not_authorized" >}}レイヤーが認可されていないエラーのトラブルシューティング{{< /nextlink >}}
{{< /whatsnext >}}