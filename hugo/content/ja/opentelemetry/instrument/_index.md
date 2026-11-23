---
aliases:
- /ja/opentelemetry/guide/otel_api_tracing_interoperability
description: OpenTelemetry を使用してアプリケーションをインスツルメントしてください。Datadog 版 OpenTelemetry SDK
  である DDOT SDK は、標準の OpenTelemetry 設定とツールを使用して、Datadog 固有の機能とサポートを追加します。
further_reading:
- link: https://opentelemetry.io/docs/concepts/instrumentation/
  tag: 外部サイト
  text: OpenTelemetry インスツルメンテーション
- link: /opentelemetry/compatibility/
  tag: ドキュメント
  text: OpenTelemetry 機能の互換性
title: アプリケーションのインスツルメンテーション
---
## 概要 {#overview}

DDOT SDK は Datadog 版 OpenTelemetry SDK であり、プレビュー版です。これらは OpenTelemetry API、セマンティック規約、OTLP、標準設定、およびデプロイツールを使用し、Datadog 固有の機能を追加します。

Datadog は、OpenTelemetry コミュニティによって保守およびサポートされているアップストリーム OpenTelemetry SDK からのトレース、メトリクス、ログをサポートしています。組織のポリシーでアップストリームの OpenTelemetry コンポーネントのみが許可されている場合は、アップストリーム OpenTelemetry SDK を使用してください。

インスツルメンテーションの重複を避けるため、アプリケーションプロセスごとに 1 つの SDK を実行してください。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/instrument/ddot_sdks/" >}}
    <h3>Using DDOT SDKs</h3>
    Deploy Datadog's version of OpenTelemetry SDKs with standard OpenTelemetry tooling. DDOT SDKs add capabilities such as Live Debugger, Dynamic Instrumentation, Database Monitoring, and Data Streams Monitoring. They are available for Java, .NET, Node.js, Python, and Go.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/instrument/upstream_otel_sdks/" >}}
    <h3>Using Upstream OpenTelemetry SDKs</h3>
    Install SDKs maintained and supported by the OpenTelemetry community and send traces, metrics, and logs to Datadog with OTLP. Use the OpenTelemetry Operator, application builds, or deployment automation.
    {{< /nextlink >}}
{{< /whatsnext >}}

どちらも標準の OpenTelemetry 設定およびデプロイ方法を使用します。OpenTelemetry API インスツルメンテーションと標準設定を維持したまま、SDK パッケージ、自動インスツルメンテーションイメージ、またはビルド時インスツルメンテーションを切り替えることができます。アップストリーム SDK に戻しても OpenTelemetry テレメトリは保持されますが、Datadog 固有の機能は使用できなくなります。機能の詳細および Datadog Agent の要件については、[機能の互換性][1]を確認してください。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/compatibility/#feature-compatibility