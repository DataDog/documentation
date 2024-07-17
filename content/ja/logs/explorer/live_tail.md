---
aliases:
- /ja/logs/explore/livetail
- /ja/logs/live_tail
description: すべてのログを検索し、ログ分析を実行します
further_reading:
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: logs/explorer/side_panel
  tag: ドキュメント
  text: ログサイドパネル
- link: logs/explorer/#list-of-logs
  tag: ドキュメント
  text: ログのリストビュー
kind: documentation
title: Live Tail
---

## 概要

Live Tail を使用すると、インフラストラクチャー内のどこからでもほぼリアルタイムですべてのログイベントにアクセスできます。Live Tail ビューでは、Datadog にストリーミングされるインデックス付きログと非インデックス付きログの両方を可視化します (ログインデックスの[除外フィルター][1]も参照してください)。Live Tail を経由するログはすべて、[ログパイプライン][2]により構造化され、処理され、強化されます。

たとえば、Live Tail はプロセスが正しい状態になっているか、また新しいデプロイがスムーズに実行されたかを確認する際に特に有用です。

## Live Tail ビュー

In the [Log Explorer][3], choose the Live Tail option in the timerange to query logs as they flow into Datadog. See [Log Search Syntax][4] for more information on queries.

{{< img src="logs/explorer/live_tail/livetail.mp4" alt="Live Tail のログ出力" video=true style="width:100%;" >}}

Contrary to queries on indexed logs happening in the [Log Explorer][3], queries in the Live Tail do *not* require that you [declare a facet][5] beforehand. 

**注**: 可読性を確保するため、クエリに一致する流入ログが多すぎる場合は Live Tail 出力のサンプリングが行われます。サンプリングは均一かつランダムに適用されるため、Live Tail ログは統計的に実際のログスループットを表すものとなります。流入するそれぞれのログを可視化する必要がある場合は、検索フィルターを追加してクエリのスコープを絞ります。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/indexes#exclusion-filters
[2]: /ja/logs/log_configuration/pipelines
[3]: /ja/logs/explorer
[4]: /ja/logs/explorer/search_syntax/
[5]: /ja/logs/explorer/facets/