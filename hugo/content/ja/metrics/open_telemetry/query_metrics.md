---
aliases:
- /ja/metrics/open_telemetry/otlp_metrics/
description: Semantic Mode を使用して、ハイブリッド環境で Datadog および OpenTelemetry メトリクスをまとめてクエリします。
further_reading:
- link: opentelemetry/
  tag: ドキュメント
  text: OpenTelemetry
title: Datadog メトリクスと OpenTelemetry メトリクスを合わせてクエリする
---
多くの組織は Datadog と併用して OpenTelemetry (OTel) を使用しており、一部のホストが OTel メトリクスを生成して他のホストが Datadog メトリクスを生成するハイブリッド環境を構築しています。OTel および Datadog メトリクスは異なる命名規則やセマンティック定義を使用することが多いため、これらの環境においてインフラストラクチャーの統合ビューを作成するのは困難です。

Datadog は次のことを可能にすることでこのギャップを埋めるのに役立ちます。

- OTel および Datadog メトリクスを一緒にクエリします。
- メトリクスソースおよびマッピングを把握します。

## クエリ内で OpenTelemetry および Datadog メトリクスを統合する {#unify-opentelemetry-and-datadog-metrics-in-queries}

{{< callout url="https://www.datadoghq.com/product-preview/otel-native-instrumentation/" btn_hidden="false" header="プレビューに参加しましょう。" >}}
テレメトリソースクエリ修飾子には、OTel ネイティブインスツルメンテーションプレビューが必要です。アクセスをリクエストするには、このフォームを使用します。
{{< /callout >}}

[メトリクスクエリエディタ][1]とダッシュボードウィジェットには、[テレメトリソース][3]クエリ修飾子が含まれており、Datadog が OTel および Datadog ソースからの同等のメトリクスをどのように処理するかを制御できます。**修正**を選択し、**テレメトリソース**セクションで**ネイティブテレメトリ**または**統合テレメトリ**を選択します。

{{< img src="dashboards/functions/telemetry_source_combined.png" alt="統合テレメトリが選択されている状態のテレメトリソースクエリ修飾子。" style="width:100%;" >}}

2 つのモードから選択します。

### ネイティブテレメトリ (デフォルト) {#native-telemetry-default}

- このモードは、入力した特定のメトリクス名 (Datadog または OTel メトリクスのいずれか) のみをクエリします。
- 同等のメトリクスからのデータは含まれません。

### 統合テレメトリ {#combined-telemetry}

- このモードは、同等の Datadog および OTel メトリクスからのデータを自動的に 1 つのクエリに統合します。1 つのメトリクス名を入力する場合も同じです。
- 同等のメトリクス (複雑なものを含む) 間のマッピングを処理し、関連するすべての時系列を単一のメトリクスとして集約します。
- これは、Datadog または OTel メトリクスのどちらから始めても機能します。

### 例 {#example}

2 つの異なるメトリクスを使用してシステム負荷をモニタリングしているとします。

- **OTel ネイティブ**: `system.cpu.load_average.15m`
- **Datadog Agent**: `system.load.15`

`system.cpu.load_average.15m` をクエリし、最大スペース集計を適用し、テレメトリソースを**統合テレメトリ**に設定すると、Datadog は自動的に次を実行します。

1. 同等の Datadog メトリクス: `system.load.15` を特定します。
2. `system.cpu.load_average.15m` および `system.load.15` の両方からの時系列を結合します。
3. 両方のソースからすべてのデータポイントで最大集計を適用します。

## メトリクスのソースおよびマッピングを把握する {#understand-metric-sources-and-mappings}

クエリ時の明確さを提供するため、メトリクスのソースと同等のメトリクスが表示されます。

- **ソースピル**: クエリエディタでは、メトリクス名の横に **Datadog** または **OTel** のピルが表示され、その発信点が示されます。

- **同等のメトリクスリスト**: エディタには、クエリしたメトリクスと同等とみなされるメトリクスのリストも表示されます。これには、複雑な一対多のマッピングが含まれます。例えば、`system.cpu.utilization` は複数の Datadog CPU 状態メトリクス (`system.cpu.idle`、`system.cpu.iowait` など) にマッピングされます。

{{< img src="/metrics/otel/source.png" alt="ソースピルと同等のメトリクスリスト" style="width:75%;" >}}

## 詳細なマッピングを表示する {#view-detailed-mappings}

特定の OTel および Datadog メトリクスの関係を包括的に把握するには、Metrics Summary ページを確認してください。

1. [**メトリクス > 概要**][2]の順に移動します。
2. 既知の Datadog または OTel メトリクスを検索します。
3. **メトリクスの詳細**サイドパネルを開きます。

または、クエリエディタでメトリクスを入力する際に **Metrics Summary を編集**をクリックします。

このパネルは複雑な関係を含むメトリクスマッピングを表示します。例えば、`system.cpu.idle`、`system.cpu.user` などの複数の Datadog メトリクスに `system.cpu.utilization` がマッピングされる方法を示します。

{{< img src="/metrics/otel/mappings.png" alt="OTel および Datadog のマッピングが表示された Metrics Summary の詳細パネル" style="width:100%;" >}}

これらのマッピングに使用されるタグベースのロジックも確認できます。同等のメトリクスにカーソルを合わせると、特定の条件が表示されます。例えば、`system.cpu.idle` にカーソルを合わせると、`state=idle` の場合に `system.cpu.utilization` にマッピングされ、値が 100 倍されることが示されます。

{{< img src="/metrics/otel/tooltip.png" alt="カーソルを合わせると表示されるタグベースのマッピングロジックのツールチップ" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/metric/explorer
[2]: https://app.datadoghq.com/metric/summary
[3]: /ja/dashboards/functions/telemetry_source/