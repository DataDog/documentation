---
aliases:
- /ja/opentelemetry/guide/migrate_operation_names/
further_reading:
- link: /opentelemetry/schema_semantics/
  tag: ドキュメント
  text: Datadog と OpenTelemetry の規約のマッピング
title: 新しいオペレーション名マッピングへの移行
---

## 概要

Datadog と併用して OpenTelemetry を使用している場合、トレース内に不明瞭または長大なオペレーション名が表示されたり、一部のトレースがサービスページに表示されないことがあります。これは、OpenTelemetry SDK の情報と Datadog のオペレーション名 (サービスへの[エントリポイント][1]を分類する span 属性) とのマッピングが不足しているために起こります。

Datadog はサービスページ上でのトレースの可視性を向上させる、新しいオペレーション名マッピングを提供しています。この機能は現在はオプトインの設定が必要ですが、近い将来デフォルトになる予定です。

たとえば、古いオペレーション名が `go.opentelemetry.io_contrib_instrumentation_net_http_otelhttp.server` であった span は、新しいロジックで `http.server.request` に変わります。

<div class="alert alert-warning">
Datadog は、これがデフォルトに切り替わる前になるべく早く新しいマッピングへ移行することを強く推奨します。<br>もしオペレーション名を監視するモニターやダッシュボードがある場合、変更の影響を受けるため、新しい規約に合わせて更新してください。
</div>

## 前提条件

移行前に、既存の span 名の設定をすべて削除してください:

{{< tabs >}}
{{% tab "OpenTelemetry Collector" %}}

Datadog エクスポーターとコネクターの設定から `span_name_as_resource_name` と `span_name_remappings` を削除します:

{{< highlight py "hl_lines=4-7 11-12" >}}
# 設定にこれらの行があれば削除してください
exporters:
  datadog:
    traces:
      span_name_as_resource_name: true
      span_name_remappings:
        "old_name1": "new_name"

connectors:
  datadog/connector:
    traces:
      span_name_as_resource_name: true
{{< /highlight >}}

{{% /tab %}}
{{% tab "Datadog Agent" %}}

1. Agent の設定から `span_name_as_resource_name` と `span_name_remappings` を削除します:
{{< highlight py "hl_lines=4-6" >}}
# 設定にこれらの行があれば削除してください
otlp_config:
  traces:
    span_name_as_resource_name: true
    span_name_remappings:
      "old_name1": "new_name"
{{< /highlight >}}

2. 以下の環境変数を削除します:
   - `DD_OTLP_CONFIG_TRACES_SPAN_NAME_AS_RESOURCE_NAME`
   - `DD_OTLP_CONFIG_TRACES_SPAN_NAME_REMAPPINGS`

{{% /tab %}}
{{< /tabs >}}

## 新しいオペレーション名マッピングを有効化

{{< tabs >}}
{{% tab "OpenTelemetry Collector" %}}

OpenTelemetry Collector を feature gate とともに起動します:

```shell
otelcol --config=config.yaml --feature-gates=datadog.EnableOperationAndResourceNameV2
```

### 削除した設定を置き換える

以前 span 名の設定を使用していた場合、processor の設定で置き換えてください:

#### SpanNameAsResourceName の置き換え

削除した `span_name_as_resource_name` 設定は、OpenTelemetry のトレースにある `span.name` 属性を Datadog のオペレーション名に適用していました。この機能を維持するには、transform processor を使って span 名を `operation.name` 属性にマッピングします:

```yaml
processors:
  transform:
    trace_statements:
      - context: span
        statements:
        - set(attributes["operation.name"], name)
```

#### SpanNameRemappings の置き換え

削除した `span_name_remappings` 設定は、オペレーション名を自動的にマッピングするために使用していました。この機能を維持するには、transform processor を使用して特定のオペレーション名を設定します:

```yaml
processors:
  transform:
    trace_statements:
      - context: span
        statements:
        - set(attributes["operation.name"], "new_name") where name == "old_name"
```

{{% /tab %}}
{{% tab "Datadog Agent" %}}

以下のいずれかの方法で機能を有効にします:

- Agent の設定にフィーチャーフラグを追加します:

    ```yaml
    apm_config:
      features: ["enable_operation_and_resource_name_logic_v2"]
    ```
- 環境変数を設定します:

    ```shell
    export DD_APM_FEATURES="enable_operation_and_resource_name_logic_v2"
    ```

<div class="alert alert-info"><strong>削除した設定の置き換え</strong><br>以前に span 名の設定を使用していて同様の機能が必要な場合は、アプリケーションコード内で直接 <code>operation.name</code> 属性を設定してください。</div>

{{% /tab %}}
{{< /tabs >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/configuring-primary-operation/#primary-operations