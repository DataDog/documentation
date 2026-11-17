---
description: OpenTelemetry、Prometheus、または OpenMetrics を使用して、Micrometer から Datadog
  にアプリケーションメトリクスを送信します。
further_reading:
- link: https://docs.micrometer.io/micrometer/reference/implementations/otlp.html
  tag: 外部サイト
  text: Micrometer OTLP
- link: https://docs.micrometer.io/micrometer/reference/implementations/prometheus.html
  tag: 外部サイト
  text: Micrometer Prometheus
title: Micrometer でメトリクスを送信する
---
## 概要 {#overview}

[Micrometer][1] は、メトリクスにアクセスし、そのディメンション全体で分析できるようにするベンダーに依存しないインターフェースです。多くの場合、メトリクスを送信するための抽象化レイヤーとして Java Spring Boot アプリケーションで使用されます。

Micrometer には、Datadog と統合するための複数の方法が用意されています。このガイドでは、Agent を使用してメトリクスを Datadog に送信するための、Datadog が推奨するオプションの概要を説明します。

## OpenTelemetry {#opentelemetry}

Datadog Agent による OpenTelemetry Protocol (OTLP) Ingestion を使用すると、Datadog Agent のオブザーバビリティ機能を活用できます。

{{< whatsnext desc="以下のドキュメントで説明されている設定を参照してください。" >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Agent の OTLP エンドポイントをセットアップする{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus および OpenMetrics {#prometheus-and-openmetrics}

Prometheus または OpenMetrics インテグレーションを使用して、アプリケーションメトリクスを Datadog に送信します。

{{< whatsnext desc="以下のドキュメントで説明されている設定を参照してください。" >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}ホストからの Prometheus および OpenMetrics メトリクスの収集{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Kubernetes Prometheus および OpenMetrics メトリクスの収集{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Docker Prometheus および OpenMetrics メトリクスの収集{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/