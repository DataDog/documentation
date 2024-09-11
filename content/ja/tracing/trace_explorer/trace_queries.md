---
aliases:
- /ja/tracing/trace_queries
description: トレースクエリ
further_reading:
- link: https://www.datadoghq.com/blog/trace-queries/
  tag: ブログ
  text: Trace Queries を使用して、本番環境の問題の根本原因とビジネスへの影響を分析する
- link: tracing/trace_explorer
  tag: ドキュメント
  text: トレースエクスプローラー
- link: /tracing/trace_explorer/query_syntax/
  tag: ドキュメント
  text: スパンクエリ構文
is_beta: true
title: トレースクエリ
---

## 概要

Trace Queries を使用すると、トレース構造内の複数のスパンのプロパティとそれらスパン間の関係に基づいて、トレース全体を見つけることができます。トレースクエリを作成するには、2 つ以上の[スパンクエリ][1]を定義し、それぞれのスパンクエリによって返されるスパンの、検索されたトレース構造内の関係を指定します。

Trace Query エクスプローラーから、トレースの検索、フィルタリング、グループ化、視覚化を行うことができます。

構造ベースのトレースクエリにより、次のような質問に答えることができます。
- どのトレースが 2 つのサービス間の依存関係を含んでいるか (`service A` は `service B` へのダウンストリームコールを持っている)？
- バックエンドサービスのエラーによって影響を受ける API エンドポイントは？

Trace Queries を使用して、調査を加速し、関連するトレースを見つけます。
## トレースクエリエディタ

{{< img src="tracing/trace_queries/trace_query_editor.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Query エディタ" >}}

トレースクエリは、2 つ以上の[スパンクエリ](#span-queries)を[トレースクエリ演算子](#trace-query-operators)で結合したものです。

### スパンクエリ

[スパンクエリ構文][1]を使用して、特定の環境、サービス、またはエンドポイントからのスパンをクエリします。オートコンプリート候補を使用して、ファセットと最近のクエリを表示します。

**Add another span query** をクリックして、スパンクエリを追加し、トレースクエリステートメントで使用します。

### トレースクエリ演算子

`a`、`b`、`c` などのラベルが付けられた複数のスパンクエリを、それぞれのスパンクエリを表す文字の間に演算子を使用して、**Traces matching** フィールドのトレースクエリに結合します。

{{< img src="/tracing/trace_queries/traces_matching.png" alt="スパンクエリをトレースクエリに統合" style="width:50%;" >}}

| 演算子 | 説明 | 例 |
|-----|-----|-----|
| `&&` | **And**: どちらのスパンもトレース内にある | サービス `web-store` のスパンとサービス `payments-go` のスパンを含むトレース: <br/>`service:web-store && service:payments-go` |
| `\|\|` | **Or**: どちらか一方のスパンがトレース内にある | サービス `web-store` またはサービス `mobile-store` からのスパンを含むトレース: <br/>`service:web-store \|\| service:mobile-store` |
| `->` | **間接関係**: 右のクエリにマッチするスパンのアップストリームにある、左のクエリにマッチするスパンを含むトレース | サービス `checkoutservice` がサービス `quoteservice` のアップストリームにある場合のトレース: <br/>`service:checkoutservice -> service:quoteservice` |
| `=>` | **直接関係**: 右のクエリにマッチするスパンの直接の親である、左のクエリにマッチするスパンを含むトレース | サービス `checkoutservice` がサービス `shippingservice` を直接呼び出している場合のトレース: <br/>`service:checkoutservice => service:shippingservice` |
| `NOT` | **Exclusion**: Traces that **do not** contain spans matching the query | Traces that contain spans from the service `web-store`, but not from the service `payments-go`:  <br/>`service:web-store && NOT(service:payments-go)` |

### トレースレベルのフィルター

**Where** ステートメントで、スパン数やトレースのエンドツーエンドの持続時間のようなトレースレベルの属性にフィルターを適用することで、トレースの結果セットをさらにフィルタリングします。

{{< img src="/tracing/trace_queries/where_statement.png" alt="トレースレベルのフィルターの例" style="width:100%;" >}}


| フィルター | 説明 | 例 |
|-----|-----|-----|
| `span_count(a)` | スパンの発生回数 | 10 回を超える mongo データベースへの呼び出しを含むトレース: <br/>- **queryA**:`service:web-store-mongo @db.statement:"SELECT * FROM stores`<br/>- **Traces matching**:`a`<br/>- **Where**:`span_count(a):>10`|
| `total_span_count` | トレース内のスパン数 | 1000 を超えるスパンを含むトレース: <br/>**Where**`total_span_count:>1000` |
| `trace_duration` | エンドツーエンドのトレース期間 | エンドツーエンドの実行時間が 5 秒を超えるトレース : <br/>**Where**:`trace_duration:>2s` |

## フローマップ

{{< img src="tracing/trace_queries/trace_flow_map.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースフローマップ" >}}

フローマップを使用すると、Trace Queries にマッチする結果のトレースから、リクエストパスとサービスの依存関係を理解することができます。マップを使用して、エラーパス、異常なサービス依存関係、またはデータベースへのリクエストレートが異常に高いことを特定します。

**注**: フローマップは[取り込みトラフィックのサンプル](#the-data-that-trace-queries-are-based-on)によって生成されます。

スパンクエリにマッチするサービスノードはハイライトされ、クエリ条件がトレースのどの部分を対象としているかを示します。

**1 つのサービス**に関する詳細情報を得るには、そのサービスのノードにカーソルを合わせると、そのリクエストレートとエラーレートのメトリクスが表示されます。**2 つのサービス間**のリクエストレートとエラーレートのメトリクスを表示するには、2 つのサービスを接続するエッジにカーソルを合わせます。

特定のサービスへの依存を含まないトレースを除外するには、マップ上のそのサービスのノードをクリックします。

## トレースリスト

{{< img src="tracing/trace_queries/trace_list.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="トレースリスト" >}}

トレースリストには、選択した時間範囲内でクエリにマッチする最大 50 のサンプルトレースが表示されます。
レイテンシーブレイクダウンにカーソルを合わせると、リクエスト実行中にどこに (どのサービスに) 時間が費やされたかを知ることができます。

**注**: テーブルに表示される情報は、トレースの root スパンからの属性であり、期間を含みます。トレースのエンドツーエンド期間を表すものでは**ありません**。

## 分析

`Timeseries`、`Top List`、`Table` などの他の視覚化のいずれかを選択すると、1 つまたは複数のディメンションでグループ化された結果を経時的に集計することができます。集計オプションの詳細については、[スパンの視覚化][2]を参照してください。

これらの集計オプションに加えて、どのスパンクエリ (`a`、`b`、`c` など) からスパンを集計するかを選択する必要もあります。集計オプションでタグと属性を使用するスパンにマッチするクエリを選択してください。

例えば、サービス `web-store` のスパン (クエリ `a`) と、いくつかのエラーを含むサービス `payments-go` のスパン (クエリ `b`) を含むトレースをクエリし、`@merchant.tier` でグループ化されたスパンのカウントを視覚化する場合、クエリ `a` のスパンを使用します。これは、`merchant.tier` がサービス `payments-go` の属性ではなく、サービス `web-store` のスパンの属性であるためです。

{{< img src="tracing/trace_queries/timeseries_using_spans_from.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="時系列ビュー" >}}


## Trace Queries ソースデータの仕組み

Datadog uses the [Intelligent Retention Filter][3] to index data for Trace Queries. It does so by performing:

- [フラットサンプリング](#1-flat-sampling): 取り込まれたスパンの均一な 1% サンプル。
- [多様性サンプリング](#diversity-sampling): 各環境、サービス、オペレーション、リソースの可視性を維持するための、代表的で多様なトレースの選択。

These two sampling mechanisms capture **complete traces**, meaning that all spans of a trace are always indexed to ensure that Trace Queries return accurate results.

{{< img src="tracing/trace_queries/trace_queries_new_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="1% フラットサンプリングと多様性サンプリング" >}}

**注**: フラットサンプリングと多様性サンプリングによってインデックス化されたスパンは、インデックス化されたスパンの使用量にカウントされないため、**請求には影響しません**。

### 1% フラットサンプリング
`retained_by:flat_sampled`

Flat 1% sampling is applied based on the `trace_id`, meaning that all spans belonging to the same trace share the same sampling decision. To learn more, read the [one percent flat sampling documentation][4].

### 多様性サンプリング
`retained_by:diversity_sampling`

Every 15 minutes, diversity sampling retains at least one span and the associated trace for each combination of environment, service, operation, and resource. This occurs for the `p75`, `p90`, and `p95` percentile of latencies to ensure that you can always find example traces in service and resource pages, even for low traffic endpoints. To learn more, read the [diversity sampling documentation][5].


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_explorer/query_syntax/
[2]: /ja/tracing/trace_explorer/visualize/#timeseries
[3]: /ja/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter
[4]: /ja/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
[5]: /ja/tracing/trace_pipeline/trace_retention/#diversity-sampling
