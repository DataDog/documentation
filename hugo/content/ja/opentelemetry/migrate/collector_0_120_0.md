---
aliases:
- /ja/opentelemetry/guide/migrate/collector_0_120_0
further_reading:
- link: /opentelemetry/guide/switch_from_processor_to_connector
  tag: ドキュメント
  text: OpenTelemetry Collector バージョン 0.95.0+ への移行
- link: /opentelemetry/integrations/collector_health_metrics
  tag: ドキュメント
  text: OpenTelemetry Collector Health Dashboard
- link: /tracing/troubleshooting/agent_apm_metrics
  tag: ドキュメント
  text: APM Datadog Trace Agent Dashboard
- link: https://prometheus.io/docs/prometheus/latest/migration/
  tag: 外部サイト
  text: Prometheus 3.0 移行ガイド
title: OpenTelemetry Collector バージョン 0.120.0+ への移行
---

[OTel Collector Contrib バージョン 0.120.0][1] では、Prometheus 3.0 へのアップグレードに伴い、メトリクス名に破壊的変更が導入されました。このバージョンの OpenTelemetry Collector へアップグレードすると、Datadog に表示されるメトリクス値がこれまでと異なるように見える場合があります。

<div class="alert alert-info">この破壊的変更は Datadog が導入したものでも、Datadog に直接関係するものでもありません。Prometheus を利用している OpenTelemetry ユーザー全体に影響します。変更点の全一覧は、Collector の Prometheus receiver に対する <a href="https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/36873">更新</a>、または Prometheus 3.0 の <a href="https://prometheus.io/docs/prometheus/latest/migration/">移行ガイド</a> を参照してください。</div>

## Collector 内部メトリクス名の変更

最新バージョンの Collector から送信される [Collector 内部メトリクス][2] には、次の変更が含まれます:

- Prometheus がスクレイプする Collector 内部メトリクスおよびリソース属性に含まれるドット (`.`) は、デフォルトではアンダースコア (`_`) に置き換えられなくなりました。
- メトリクス名に `otelcol_` プレフィックスが付与されなくなりました。

例:

| 0.120.0 より前                                    | 0.120.0 以降                             |
|---------------------------------------------------|-------------------------------------------|
| `otelcol_datadog_trace_agent_otlp_traces`         | `datadog.trace_agent.otlp.traces`         |
| `otelcol_datadog_trace_agent_otlp_spans`          | `datadog.trace_agent.otlp.spans`          |
| `otelcol_datadog_trace_agent_otlp_payload`        | `datadog.trace_agent.otlp.payload`        |
| `otelcol_datadog_trace_agent_trace_writer_events` | `datadog.trace_agent.trace_writer.events` |

この影響を受けて、Datadog はアップグレードに関連する標準提供 (out-of-the-box) のダッシュボード 2 点を更新しました:

- [OpenTelemetry Collector Health Dashboard](#opentelemetry-collector-health-dashboard)
- [APM Datadog Trace Agent Dashboard](#apm-datadog-trace-agent-dashboard)

### OpenTelemetry Collector health dashboard

[OpenTelemetry Collector health dashboard][3] のクエリは、Collector の旧バージョン (< 0.120.0) と新バージョン (0.120.0+) のどちらから送られるメトリクス名にも対応できるように修正されました。

このダッシュボードを複製して使用している場合、または旧バージョンの Collector のメトリクス名をクエリしている monitor がある場合は、[equiv_otel() 関数][6] を使って手動で更新する必要があるかもしれません。

{{< img src="/opentelemetry/guide/migration/collector_health.png" alt="互換性のあるクエリを表示している OpenTelemetry Collector Health Dashboard" style="width:100%;" >}}

### APM Datadog Trace Agent Dashboard

[APM Datadog Trace Agent dashboard][4] のクエリは、同じメトリクス名を出力する OpenTelemetry の source との競合を避けるため、source `datadogexporter` と `datadogconnector` を除外するフィルタが追加されました。このダッシュボードは Trace Agent データのみを表示する設計であり、今回の更新によって、これらの source のデータが OpenTelemetry データと混ざらないようになります。

更新されたのは標準提供のダッシュボード テンプレートのみです。このダッシュボードを複製して使用している場合は、カスタム ダッシュボード側のクエリも、次の条件で source `datadogexporter` と `datadogconnector` を除外するよう手動で更新する必要があるかもしれません:

```text
source NOT IN (datadogexporter, datadogconnector)
```

## Prometheus Server reader のデフォルト値の変更

<div class="alert alert-info">OpenTelemetry Collector の telemetry 設定をデフォルトの構成で使用している場合、これらの変更の影響は受けません。</div>

影響を受けるのは、次のように Prometheus reader をカスタム設定している場合に限られます:

```yaml
service:
  telemetry:
    metrics:
      level: detailed
      readers:
        - pull:
            exporter:
              prometheus:
                host: localhost
                port: 8888
```

これらの変更の影響を受ける場合、サフィックスの変更や単位の追加などにより、メトリクス名が従来と変わることがあります。

従来の挙動に戻すには、既存の Prometheus reader 設定に次の 3 つのパラメータを追加してください:

```yaml
without_scope_info: true
without_type_suffix: true
without_units: true
```

不明点やサポートが必要な場合は、[Datadog サポート][5] までお問い合わせください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.120.0
[2]: https://opentelemetry.io/docs/collector/internal-telemetry/
[3]: /ja/opentelemetry/integrations/collector_health_metrics/
[4]: /ja/tracing/troubleshooting/agent_apm_metrics/
[5]: /ja/help/
[6]: /ja/opentelemetry/guide/combining_otel_and_datadog_metrics/