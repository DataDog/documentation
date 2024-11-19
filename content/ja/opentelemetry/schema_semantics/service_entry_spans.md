---
aliases:
- /ja/opentelemetry/guide/service_entry_spans_mapping/
further_reading:
- link: /opentelemetry/integrations/trace_metrics
  tag: ドキュメント
  text: OpenTelemetry トレースメトリクス
title: OpenTelemetry セマンティック規約をサービスエントリーのスパンにマッピングする
---

## 概要
Datadog は、[トレースメトリクス][2]や [APM Trace Explorer][3] などの機能のプラットフォーム全体で[サービスエントリスパン][1]を使用しています。この規約は Datadog 固有のものですが、以下のオプトインガイドに従うことで、OpenTelemetry の [`SpanKind`][4] 属性からマッピングすることができます。

## 要件

- OTel Collector Contrib v0.100.0 以上
- Datadog Agent v7.53.0 以上

## セットアップ

ご利用の取り込みパスに基づいて、構成オプションを有効にしてください。

{{< tabs >}}
{{% tab "OTel Collector と Datadog エクスポーター" %}}

新しいサービスエントリスパン識別ロジックは、[Datadog エクスポーター][2]と [Datadog コネクター][1]で `traces::compute_top_level_by_span_kind` 構成オプションを true に設定することで有効化できます。エクスポーターとコネクターの両方を使用している場合、この構成オプションは両方で有効にする必要があります。

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/connector/datadogconnector/examples/config.yaml#L48-L53
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/v0.100.0/exporter/datadogexporter/examples/collector.yaml#L365-L370
{{% /tab %}}
{{% tab "Datadog Agent の OTLP 取り込みパイプライン" %}}

新しいサービスエントリスパン識別ロジックは、Datadog Agent の構成で [apm_config.features][1] に `"enable_otlp_compute_top_level_by_span_kind"` を追加することで有効化できます。

[1]: https://github.com/DataDog/datadog-agent/blob/7.53.0/pkg/config/config_template.yaml#L1585-L1591
{{% /tab %}}
{{< /tabs >}}

## サポートされる規約

[トレースメトリクス][2]は、サービスエントリスパンと測定されたスパンに対して生成されます。これらのスパン規約は Datadog 固有のものであるため、OpenTelemetry のスパンは以下のマッピングで識別されます。
| OpenTelemetry の規約 | Datadog の規約 |
| --- | --- |
| ルートスパン | サービスエントリスパン |
| サーバースパン (`span.kind: server`) | サービスエントリスパン |
| コンシューマースパン (`span.kind: consumer`) | サービスエントリスパン |
| クライアントスパン (`span.kind: client`) | 測定されたスパン |
| プロデューサースパン (`span.kind: producer`) | 測定されたスパン |
| インターナルスパン (`span.kind: internal`) | トレースメトリクスは生成されません |

## 移行

この新しいサービスエントリスパン識別ロジックにより、トレースメトリクスを生成するスパンの数が増加し、トレースメトリクスに基づく既存のモニターに影響を与える可能性があります。インターナルスパンしかないユーザーの場合、トレースメトリクスは減少するでしょう。

トレースメトリクスに基づく既存のモニターがある場合、この変更によりトレースメトリクスの一貫性が向上するため、アップグレード後にそれらを更新できます。インターナルスパンしかない場合、トレースメトリクスとサービスエントリスパンを受け取るために、上記の表に従ってインスツルメンテーションを更新してください。

[`SpanKind`][4] は通常、スパンが作成されるときに設定されますが、OpenTelemetry Collector の[変換プロセッサ][5]を使用して上記のマッピングを制御するために更新することもできます。例えば、インターナルスパンに対してトレースメトリクスが必要な場合、以下の構成により `http.path: "/health"` を持つインターナルスパンをクライアントスパンに変換します。
```yaml
  transform:
    trace_statements:
      - context: span
        statements:
          - set(kind.string, "Client") where kind.string == "Internal" and attributes["http.path"] == "/health"
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/glossary/#service-entry-span
[2]: https://docs.datadoghq.com/ja/opentelemetry/integrations/trace_metrics/
[3]: https://docs.datadoghq.com/ja/tracing/trace_explorer
[4]: https://opentelemetry.io/docs/specs/otel/trace/api/#spankind
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md