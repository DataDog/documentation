---
title: Configuring An APM Stats Graph
disable_toc: false
aliases:
- "/dashboards/querying/#configuring-an-apm-stats-graph"
further_reading:
- link: /dashboards/querying/
  tag: Documentation
  text: Learn how to query graphs
---

## 概要

APM 統計データを使用してグラフを構成するには、次の手順に従います。

1. 利用可能な[ウィジェット][1]の中から視覚化したいものを選択します。
2. [詳細レベルを選択](#level-of-detail)します。
3. [パラメーターを選択](#apm-stats-parameters)します。
4. グラフのタイトル (メトリクスと同様)

### 詳細レベル
1 つ以上のサービス、リソース、またはスパンの統計を表示する詳細レベルを選択します。これらのすべてがすべてのウィジェットタイプで使用できるわけではありません。

### APM 統計パラメーター
グラフエディタから次のパラメーターを選択します: 環境 (`env`)、プライマリタグ (`primary_tag`)、サービス (`service`)、オペレーション名 (`name`)。

詳細レベルが `resource` または `span` の場合、一部のウィジェットタイプでは、クエリの範囲を狭めるためにリソース名 (`resource`) を選択する必要もあります。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/widgets/