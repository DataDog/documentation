---
aliases:
- /ja/opentelemetry/guide/service_entry_spans_mapping/
- /ja/opentelemetry/schema_semantics/service_entry_spans/
further_reading:
- link: /opentelemetry/integrations/trace_metrics
  tag: ドキュメント
  text: OpenTelemetry トレースメトリクス
title: OpenTelemetry セマンティック規約をサービスエントリーのスパンにマッピングする
---
## 概要 {#overview}
Datadog は、[Trace Metrics][2] や [APM Trace Explorer][3] などの機能のために、プラットフォーム全体で [サービスエントリスパン][1] を使用しています。この規約は Datadog 固有のものですが、以下のオプトインガイドに従うことで、OpenTelemetry の [`SpanKind`][4] 属性からマッピングできます。

## 要件 {#requirements}

- OTel Collector Contrib v0.100.0 以上
- Datadog Agent v7.53.0 以上

## セットアップ {#setup}

ご利用の取り込みパスに基づいて、構成オプションを有効にしてください。

{{< tabs >}}
{{% tab "OTel Collector と Datadog Exporter" %}}

新しいサービスエントリスパン識別ロジックは、[Datadog Exporter][2] および [Datadog connector][1] で `traces::compute_top_level_by_span_kind` 構成オプションを true に設定することで有効化できます。両方のコンポーネントを使用している場合は、Datadog Exporter と Datadog connector の両方でこの構成オプションを有効にする必要があります。

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/connector/datadogconnector/examples/config.yaml#L48-L53
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/exporter/datadogexporter/examples/collector.yaml#L365-L370
{{% /tab %}}
{{% tab "Datadog Agent における OTLP インジェストパイプライン" %}}

新しいサービスエントリスパン識別ロジックは、Datadog Agent の構成で [apm_config.features][1] に `"enable_otlp_compute_top_level_by_span_kind"` を追加することで有効化できます。

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
{{% /tab %}}
{{< /tabs >}}

## サポートされる規約 {#supported-conventions}

[Trace Metrics][2] は、サービスエントリスパンとメジャードスパンに対して生成されます。これらのスパン規約は Datadog 固有のものであるため、OpenTelemetry スパンは以下のマッピングで識別されます。
| OpenTelemetry 規約 | Datadog 規約 |
| --- | --- |
| ルートスパン | サービスエントリスパン |
| サーバー・スパン (`span.kind: server`) | サービスエントリスパン |
| コンシューマースパン (`span.kind: consumer`) | サービスエントリスパン |
| クライアントスパン (`span.kind: client`) | メジャードスパン |
| プロデューサースパン (`span.kind: producer`) | メジャードスパン |
| インターナルスパン (`span.kind: internal`) | トレースメトリクスは生成されません |

## 移行 {#migration}

この新しいサービスエントリスパン識別ロジックにより、トレースメトリクスを生成するスパンの数が増加し、トレースメトリクスに基づく既存のモニターに影響を与える可能性があります。インターナルスパンのみを使用しているユーザーの場合、トレースメトリクスは減少します。

トレースメトリクスに基づく既存のモニターがある場合は、この変更によってトレースメトリクスの整合性が向上するため、アップグレード後にモニターを更新できます。インターナルスパンのみを使用している場合は、トレースメトリクスとサービスエントリスパンを取得するために、上記のテーブルに従ってインスツルメンテーションを更新してください。

[`SpanKind`][4] は通常スパンの作成時に設定されますが、[transform processor][5] を OpenTelemetry Collector で使用して上記のマッピングを制御することで更新することも可能です。例えば、インターナルスパンに対してトレースメトリクスが必要な場合、以下の設定により、`http.path: "/health"` を持つインターナルスパンがクライアントスパンに変換されます。

```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(kind.string, "Client") where kind.string == "Internal" and attributes["http.path"] == "/health"
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/glossary/#service-entry-span
[2]: https://docs.datadoghq.com/ja/opentelemetry/integrations/trace_metrics/
[3]: https://docs.datadoghq.com/ja/tracing/trace_explorer
[4]: https://opentelemetry.io/docs/specs/otel/trace/api/#spankind
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md