---
further_reading:
- link: https://micrometer.io/docs/registry/otlp
  tag: Micrometer
  text: Micrometer OTLP
- link: https://micrometer.io/docs/registry/prometheus
  tag: Micrometer
  text: Micrometer Prometheus
title: Micrometer を使用したメトリクスの送信
---

## 概要

[Micrometer][1] は、メトリクスへのアクセスを可能にするベンダーニュートラルなインターフェイスで、ディメンション全体でメトリクスを分析することができます。多くの場合、Java Spring Boot アプリケーションと一緒に使用され、メトリクスを送信するための抽象化レイヤーとして機能します。

Micrometer では、Datadog との連携方法が複数提供されています。このガイドでは、Agent と一緒に使用して Datadog にメトリクスを送信するための Datadog が推奨するオプションについて説明します。

## OpenTelemetry

Datadog Agent による OpenTelemetry Protocol (OTLP) の取り込みは、Datadog Agent の観測可能性機能を活用することを可能にします。

{{< whatsnext desc="次のドキュメントで説明されている構成を参照してください。" >}}
    {{< nextlink href="/opentelemetry/otlp_ingest_in_the_agent/" >}}Datadog Agent による OTLP 取り込み{{< /nextlink >}}
{{< /whatsnext >}}

## Prometheus と OpenMetrics

Prometheus または OpenMetrics インテグレーションを使用して、アプリケーションメトリクスを Datadog に送信します。 

{{< whatsnext desc="次のドキュメントで説明されている構成を参照してください。" >}}
    {{< nextlink href="/integrations/guide/prometheus-host-collection/#overview" >}}ホストからの Prometheus および OpenMetrics メトリクスの収集{{< /nextlink >}}
    {{< nextlink href="/containers/kubernetes/prometheus/?tab=kubernetesadv2" >}}Kubernetes Prometheus および OpenMetrics メトリクスの収集{{< /nextlink >}}
    {{< nextlink href="/containers/docker/prometheus/?tab=standard" >}}Docker Prometheus および OpenMetrics メトリクスの収集{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://micrometer.io/