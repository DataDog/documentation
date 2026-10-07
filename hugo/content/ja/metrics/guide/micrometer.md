---
further_reading:
- link: https://docs.micrometer.io/micrometer/reference/implementations/otlp.html
  tag: 外部サイト
  text: Micrometer OTLP
- link: https://docs.micrometer.io/micrometer/reference/implementations/prometheus.html
  tag: 外部サイト
  text: Micrometer Prometheus
title: Micrometer を使用したメトリクスの送信
---

## 概要

[Micrometer][1] は、メトリクスにアクセスし、それらのディメンションを横断して分析することを可能にするベンダーニュートラルなインターフェイスです。多くの場合、Java Spring Boot アプリケーションで、メトリクスを送信する抽象化レイヤーとして使用されます。

Micrometer は、Datadog と統合する複数の方法を提供します。このガイドでは、Agent と一緒に使用して Datadog にメトリクスを送信するための Datadog の推奨オプションを概説します。

## OpenTelemetry

Datadog Agent による OpenTelemetry Protocol (OTLP) の取り込みを使用すると、Datadog Agent の可観測性機能を活用できます。

{{< whatsnext desc="以下のドキュメントに記載された構成を参照してください。" >}}
{{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Datadog Agent による OTLP の取り込み{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus と OpenMetrics

Prometheus または OpenMetrics のインテグレーションを使用して、アプリケーションのメトリクスを Datadog に送信します。

{{< whatsnext desc="以下のドキュメントに記載された構成を参照してください。" >}}
{{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}ホストからの Prometheus と OpenMetrics のメトリクス収集{{< /nextlink >}}
{{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Kubernetes の Prometheus と OpenMetrics のメトリクス収集{{< /nextlink >}}
{{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Docker の Prometheus と OpenMetrics のメトリクス収集{{< /nextlink >}}
{{< /whatsnext >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/