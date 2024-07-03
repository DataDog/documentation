---
aliases:
- /ja/network_performance_monitoring/network_map/
description: Map your Network data across all your tags.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Network Performance Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Streamline network investigations with an enhanced querying and map experience
- link: /network_monitoring/devices
  tag: Documentation
  text: Network Device Monitoring
- link: /network_monitoring/performance/setup
  tag: Documentation
  text: Collect your Network Data with the Datadog Agent.
title: Network Map
---

## 概要

[ネットワークマップ][1]では、ネットワークのトポロジーを表示することにより、ネットワークのパーティション、依存関係、ボトルネックを可視化できます。ネットワークデータを方向性マップに統合できるため、このページを使用して不要な情報をカットし、問題が疑われる領域だけに注目することができます。

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="ネットワークマップ" >}}

## セットアップ

ネットワークマップには、Datadog Agent により収集されたデータが自動的に表示されます。インストールさえすれば、あとは何も必要ありません。

## 使用方法

**Map** タブを選択し、以下の手順でネットワークマップを構成します。

{{< img src="network_performance_monitoring/network_map/network_map_search.png" alt="ネットワークマップページの検索バー" >}}

1. ページの最上部にある最初のセレクターで、表示する*ノード**のタグを選択します。ネットワークページで使用可能なものと同じタグを選択できます。

    {{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="ネットワークマップページの検索バー" >}}

    - ノード数が多すぎる場合は、2 つ目のタグが自動的にグループ分けに追加されます。タグは **By** ドロップダウンメニューで変更できます。詳しくは、[クラスター化](#map-clusters)の項を参照してください。
2. **エッジ** について表示するメトリクスを以下から選択します。

    - 送信スループット
    - 受信スループット
    - TCP 再送回数
    - TCP Latency
    - TCP Jitter
    - 確立された接続の数
    - クローズされた接続の数

3. 表示するコネクションをフィルタリングします。以下を選択できます。

    - 環境、ネームスペース、その他のタグを指定してトラフィックをフィルタリングするかどうか。
    - 文字列のファジーマッチに基づいてタグをフィルタリングするかどうか。
      {{< img src="network_performance_monitoring/network_map/filtering_npm_map_search.mp4" alt="ネットワークマップを検索でフィルタリング" video="true" >}}

    - **未解決のトラフィックを表示するかどうか**。
    - アクティブなネットワークメトリクスの指定されたパーセンタイル範囲外にある、ネットワークトラフィックを非表示にするかどうか。
        {{< img src="network_performance_monitoring/network_map/filtering_network_map.mp4" alt="ネットワークマップのフローのフィルタリング" video="true" width="50%" >}}

## 検査

ノードにマウスを合わせると、ノードがハイライト表示され、ネットワークの送受信トラフィックはその方向が動く点線で表示されます。

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="ネットワークマップ" video="true" width="70%" >}}

ノードをクリックし、メニューから _Inspect_ を選択すると、ネットワークを拡大したコンテキストでノードを表示できます。

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.mp4" alt="ネットワークエンティティの拡大" video="true" width="70%">}}

## マップクラスター

マップのクエリエディターには、複雑なネットワークで使えるグループ化用のフィールドが追加で用意されています。これにより、ノード数が多すぎて通常はマップ上に一度に表示できないようなデータセットをレンダリングできます。また、追加のグループ化用フィールドを使用することで、カーディナリティの高いクエリのパフォーマンスを改善することもできます。

{{< img src="network_performance_monitoring/network_map/network_map_search_additional_filter.png" alt="ネットワークマップページの検索バー" >}}

{{< img src="network_performance_monitoring/network_map/network_map_3.png" alt="ネットワークマップ" >}}

クラスター化により、マップ内のノードがもう一つ別の次元でグループ化されます。大規模なマップは自動的にクラスター化され、ロード時間と可読性が向上します。クラスター内のノードを表示するには、クラスターをクリックして展開表示させます。クラスターを折りたたむには、ノードの周りのグレーの領域をクリックします。

クラスターを囲む赤色の枠線は、ノードのグループ化に使用されるタグと一致するタグが設定されたモニターの少なくとも 1 つで、アラートが発生していることを示します。例えば、マップがサービス単位でグループ化される場合、マップは  `service:<nodeName>` のタグが設定されたモニターを探します。該当のモニターがアラート状態の場合、マップは `<nodeName>` が含まれるクラスターを赤色の枠線で囲みます。

{{< img src="network_performance_monitoring/network_map/expanded_network_cluster.png" alt="ネットワーククラスターマップの展開表示" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map