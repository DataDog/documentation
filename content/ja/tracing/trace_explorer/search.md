---
description: Filter spans to narrow down, broaden, or shift your focus on the subset
  of spans of current interest.
further_reading:
- link: tracing/trace_explorer/query_syntax
  tag: Documentation
  text: Query Syntax
title: Search Spans
---

## 概要

個々のスパンからの情報はリストとして視覚化すると便利ですが、集計することで価値ある情報にアクセスできる場合もあります。この情報にアクセスするには、トレースエクスプローラーでスパンを検索し、時系列、トップリスト、またはテーブルとして表示します。

トレースエクスプローラーの検索は、時間範囲と `key:value` とフルテキスト検索を組み合わせた検索クエリで構成されています。視覚化する次元 (スパンの数、ユニークな値の数、定量的な次元の尺度) を選択し、時間枠を選択し、1 つまたは複数の次元でクエリをグループ化します。

## 検索クエリ

例えば、Web ストアサービスから過去 30 分間のエラーステータスのスパンを見つけるには、`service:web-store status:error` といったカスタムクエリを作成し、時間範囲を `Past 30 minutes` に設定します。

{{< img src="tracing/trace_explorer/search/trace_explorer_list_search.png" alt="ユーザーが 'service:web-store' と 'status:error' を検索した場合のトレースエクスプローラーリスト検索。リクエストバーチャート、エラーバーチャート、レイテンシーラインチャートが表示されます。Visualize As オプションは、List に設定されています。" style="width:100%;">}}

トップリスト表示を選択し、クエリを `resource` でグループ化すると、どのリソースが最も影響を受けているかを確認することができます。

{{< img src="tracing/trace_explorer/search/trace_explorer_top_list_search.png" alt="トレースエクスプローラーリスト検索。Visualize As オプションは、Top List に設定されています。" style="width:100%;">}}

{{< site-region region="us,eu,us3,us5,ap1" >}}
**注**: `key:value` クエリでは、事前に[ファセットを宣言][1]する必要は**ありません**。

[1]: /ja/tracing/trace_explorer/query_syntax/#facets
{{< /site-region >}}

## クエリ構文

トレースエクスプローラーでスパンの検索を始めるには、[クエリ構文ドキュメント][2]を参照し、カスタムタイムフレームの詳細については、[タイムフレームドキュメント][3]をお読みください。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/trace_explorer/query_syntax/#facets
[2]: /ja/tracing/trace_explorer/query_syntax
[3]: /ja/dashboards/guide/custom_time_frames