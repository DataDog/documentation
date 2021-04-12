---
title: ネットワークマップ
kind: documentation
description: ネットワークデータを、すべてのタグを基にマッピングする。
further_reading:
    - link: "https://www.datadoghq.com/blog/network-performance-monitoring"
      tag: ブログ
      text: ネットワークパフォーマンスのモニタリング
    - link: /network_performance_monitoring/devices
      tag: ドキュメント
      text: ネットワークデバイスモニタリング
    - link: /network_performance_monitoring/installation
      tag: ドキュメント
      text: Datadog Agent を使用したネットワークデータの収集。
    - link: /dashboards/widgets/network
      tag: ドキュメント
      text: ネットワークウィジェット
---

## 概要

[ネットワークマップ][1]では、ネットワークのトポロジーを表示することにより、ネットワークのパーティション、依存関係、ボトルネックを可視化できます。ネットワークデータを方向性マップに統合できるため、このページを使用して不要な情報をカットし、問題が疑われる領域だけに注目することができます。

{{< img src="network_performance_monitoring/network_map/network_map_2.png" alt="ネットワークマップ" >}}

## セットアップ

ネットワークマップには、Datadog Agent により収集されたデータが自動的に表示されます。インストールさえすれば、あとは何も必要ありません。

## コンフィギュレーション

ページヘッダーを使用し、以下の手順でネットワークマップを構成します。

1. ページの最上部にある最初のセレクターで、表示する*ノード**のタグを選択します。ネットワークページで使用可能なものと同じタグを選択できます。
2. **エッジ** について表示するメトリクスを以下から選択します。

    - 送信スループット
    - 受信スループット
    - 再送回数
    - ラウンドトリップ時間
    - ラウンドトリップ時間の変動

3. 表示するコネクションをフィルタリングします。以下を選択できます。

    - 環境、ネームスペース、その他のタグを指定してトラフィックをフィルタリングするかどうか。
    - 文字列のファジーマッチに基づいてタグをフィルタリングするかどうか。
      {{< img src="network_performance_monitoring/network_map/filtering_npm_map_search.mp4" alt="ネットワークマップを検索でフィルタリング" video="true" >}}

    - **未解決のトラフィックを表示するかどうか**。
    - アクティブなネットワークメトリクスの指定されたパーセンタイル範囲外にある、ネットワークトラフィックを非表示にするかどうか。
        {{< img src="network_performance_monitoring/network_map/filtering_network_map.mp4" alt="ネットワークマップのフローのフィルタリング" video="true"  width="50%" >}}

## 検査

ノードにマウスを合わせると、ノードがハイライト表示され、ネットワークの送受信トラフィックはその方向が動く点線で表示されます。

{{< img src="network_performance_monitoring/network_map/network_map_highlight.mp4" alt="ネットワークマップ" video="true"  width="70%" >}}

ノードをクリックし、メニューから _Inspect_ を選択すると、ネットワークを拡大したコンテキストでノードを表示できます。

{{< img src="network_performance_monitoring/network_map/network_entity_zoom.mp4" alt="ネットワークエンティティの拡大" video="true" width="70%">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/map
