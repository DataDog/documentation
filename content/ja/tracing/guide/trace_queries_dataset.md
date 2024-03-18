---
further_reading:
- link: /tracing/trace_explorer/trace_queries/
  tag: ドキュメント
  text: .NET
kind: ガイド
title: Trace Queries ソースデータ
---

## 概要

Trace Queries を使用すると、トレース構造内の複数のスパンのプロパティとそれらスパン間の関係に基づいて、トレース全体を見つけることができます。詳細については、[Trace Queries のドキュメント][1]を参照してください。

{{< img src="tracing/trace_queries/trace_queries.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Trace Queries UI" >}}

## Trace Queries ソースデータの仕組み

Datadog は、[インテリジェント保持フィルター][6]を使用して、Trace Queries 用のデータをインデックス化します。これは、以下を実行して行います。

- [フラットサンプリング](#1-flat-sampling): 取り込まれたスパンの均一な 1% サンプル。
- [多様性サンプリング](#diversity-sampling): 各環境、サービス、オペレーション、リソースの可視性を維持するための、代表的で多様なトレースの選択。

これら 2 つのサンプリングメカニズムは、**完全なトレース**をキャプチャし、Trace Queries が正常に機能するように、トレースのすべてのスパンが常にインデックス化されます。

{{< img src="tracing/trace_queries/trace_queries_new_dataset.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="1% フラットサンプリングと多様性サンプリング" >}}

**注**: フラットサンプリングと多様性サンプリングによってインデックス化されたスパンは、インデックス化されたスパンの使用量にカウントされないため、**請求には影響しません**。

### 1% フラットサンプリング
`retained_by:flat_sampled`

フラット 1% サンプリングは `trace_id` に基づいて適用されます。これは、同じトレースに属するすべてのスパンが同じサンプリング決定を共有することを意味します。詳細については、[1% フラットサンプリングのドキュメント][2]を参照してください。

### 多様性サンプリング
`retained_by:diversity_sampling`

15 分ごとに、多様性サンプリングは環境、サービス、操作、リソースの各組み合わせごとに少なくとも 1 つのスパンとそれに関連するトレースを保持します。これは、レイテンシーの `p75`、`p90`、`p95` パーセンタイルに対して行われ、トラフィックが少ないエンドポイントであっても、サービスやリソースのページで常にサンプルトレースを見つけることができるようにします。詳細については、[多様性サンプリングのドキュメント][3]を参照してください。

## Trace Queries を有効にした場合の影響

Traces Queries がアカウントで有効になった瞬間から (イベントストリームで公開されたイベントで正確な日付を見つけてください)、インテリジェント保持フィルターは完全なトレースのキャプチャを開始し、より多くのデータをインデックス化し始めます。

[トレースエクスプローラー][4]で、インテリジェント保持フィルターによってインデックス化されたスパンをクエリできます。その結果、トレースエクスプローラーのクエリでインデックス化スパンの数が急増することに気づくかもしれません。この変化は、**Intelligent Retention Filter change** イベントを示すイベントオーバーレイによって示されます。

1% フラットサンプリング法または多様性サンプリング法でサンプリングされたスパンを見つけるには、トレースエクスプローラーで `retained_by:(flat_sampled OR diversity_sampling)` クエリパラメータを追加します。

{{< img src="tracing/trace_queries/intelligent_retention_filter_change.png" style="width:90%; background:none; border:none; box-shadow:none;" alt="イベントオーバーレイインテリジェント保持フィルター" >}}

インテリジェント保持フィルターによってインデックス化されたスパンは、以下の APM クエリから除外されます。

- ライブラリ
- チェック内容のサマリー
- [トレース分析モニター][5]評価

そのため、この変更による**影響はありません**。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/tracing/trace_explorer/trace_queries/
[2]: /ja/tracing/trace_pipeline/trace_retention/#one-percent-flat-sampling
[3]: /ja/tracing/trace_pipeline/trace_retention/#diversity-sampling
[4]: /ja/tracing/trace_explorer/
[5]: /ja/monitors/types/apm/?tab=traceanalytics
[6]: /ja/tracing/trace_pipeline/trace_retention/#datadog-intelligent-retention-filter