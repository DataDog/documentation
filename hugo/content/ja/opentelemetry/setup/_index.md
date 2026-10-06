---
further_reading:
- link: /opentelemetry/instrument/
  tag: ドキュメント
  text: アプリケーションのインスツルメンテーション
- link: https://www.datadoghq.com/blog/otel-deployments/
  tag: ブログ
  text: OpenTelemetry のデプロイメントを選択する方法
- link: https://learn.datadoghq.com/courses/otel-with-datadog
  tag: ラーニングセンター
  text: Datadog を利用した OpenTelemetry の紹介
- link: https://learn.datadoghq.com/courses/using-ddot
  tag: ラーニングセンター
  text: OpenTelemetry Collector の Datadog ディストリビューションの使用
title: OpenTelemetry データを Datadog に送信する
---
このページでは、OpenTelemetry (OTel) データを Datadog に送信するすべての方法について説明します。

## DDOT コレクター (推奨) {#ddot-collector-recommended}

Datadog Distribution of OpenTelemetry (DDOT) コレクターは、OpenTelemetry の柔軟性と Datadog の包括的な可観測性を組み合わせたオープンソースソリューションです。

このアプローチでは、OpenTelemetry パイプラインを完全に制御できると同時に、以下を含む強力な Datadog Agent ベースの機能にアクセスできます。

- Fleet Automation
- ライブ Container Monitoring
- Kubernetes エクスプローラー
- Live Processes
- Cloud Network Monitoring
- Universal Service Monitoring
- {{< translate key="integration_count" >}}+ Datadog インテグレーション

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/ddot_collector/install/" >}}
    <h3>Install the DDOT Collector</h3>
    Follow our guided setup to install the Collector and start sending your OpenTelemetry data to Datadog.
    {{< /nextlink >}}
{{< /whatsnext >}}

## その他のセットアップオプション {#other-setup-options}

独自の OpenTelemetry コレクターのディストリビューションの実行や、非 Kubernetes 環境での運用など、特定のユースケース向けに代替手法が用意されています。

{{< whatsnext desc=" " >}}
    {{< nextlink href="/opentelemetry/setup/collector_exporter/" >}}
    <h3>Upstream OpenTelemetry Collector</h3>
    Best for: Users who manage their own OpenTelemetry Collector or require advanced processing capabilities like tail-based sampling.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/otlp_ingest_in_the_agent" >}}
    <h3>OTLP Ingest in the Agent</h3>
    Best for: Users on platforms other than Kubernetes Linux, or those who prefer a minimal configuration without managing Collector pipelines.
    {{< /nextlink >}}
    {{< nextlink href="/opentelemetry/setup/agentless" >}}
    <h3>Direct OTLP Ingest</h3>
    Best for: Situations requiring direct data transmission to Datadog's intake endpoint without any intermediary components.
    {{< /nextlink >}}
{{< /whatsnext >}}

<div class="alert alert-info"><strong>自分にとってどのセットアップが最適かまだ分からないですか？</strong><br><a href="/opentelemetry/compatibility/">機能の互換性</a>の表を見て、どの Datadog 機能がサポートされているかを理解してください。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/opentelemetry/setup/agent
[2]: /ja/opentelemetry/setup/collector_exporter/
[3]: /ja/opentelemetry/setup/agentless
[4]: /ja/opentelemetry/ingestion_sampling#tail-based-sampling
[5]: /ja/opentelemetry/agent
[6]: /ja/opentelemetry/setup/otlp_ingest_in_the_agent