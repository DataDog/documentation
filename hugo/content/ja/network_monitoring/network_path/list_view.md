---
description: Network Path のリストビューを調査する
further_reading:
- link: /network_monitoring/network_path/path_view
  tag: ドキュメント
  text: Network Path のパスビューについて
- link: /network_monitoring/network_path/setup
  tag: ドキュメント
  text: Network Path のセットアップ
is_beta: true
title: リストビュー
---

## 概要

Network Path のリストビューは、さまざまなパスを探索するためのデフォルトビューです。 `hostname` や `service` などのソースでグループ化します。
検索バーを使用して、特定のエンドポイント、ソース、または宛先の場所を検索できます。

例えば、特定の `source.service` や `destination.service` で検索して、結果を絞り込むことができます。

{{< img src="network_performance_monitoring/network_path/network_path_list_search_2.png" alt="検索によって特定のソースサービスと宛先サービスで並べ替えられた Network Path ビュー" >}}

さらに、左側の **Destination** や **Source** ファセットパネルを使用して、`Destination AS Name`、`Destination Service`、`Source Hostname` などの特定のパスを検索できます。

{{< img src="network_performance_monitoring/network_path/path_destination_facet_2.png" alt="特定の宛先サービスで並べ替えるための宛先ファセットパネルを使用した Network Path ビュー" >}}

## フィルターコントロール

リストビューページの上部には、ネットワークの全体的な状態をより詳細に検索するためのフィルターコントロールもあります。

{{< img src="network_performance_monitoring/network_path/reachable_unreachable.png" alt="到達可能および到達不可能なトグルコントロールの画像" >}}

Unreachable (到達不可能)
: `traceroute` が宛先に到達できなかったパスをフィルタリングします。このフィルターコントロールは、特定のホップにおける障害がどこで発生しているかを特定するのに役立ちます。

Reachable (到達可能)
: `traceroute` が宛先に正常に到達したパスをフィルタリングします。


## マルチパスマップ

**Multi-path map** ボタンを使用して、1 つ以上の選択したパスに基づいてパスマップを作成します。

{{< img src="network_performance_monitoring/network_path/multi_path.png" alt="3 つの選択されたパスを表示しているマルチパスビュー" >}}

このビューから、選択したパスのレイテンシーと到達可能性を確認でき、エンドツーエンドのパケットロスやホップ間のレイテンシーも調査できます。
このビューの詳細については、[Path View][1] ドキュメントをご覧ください。



## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/network_monitoring/network_path/path_view
[2]: https://app.datadoghq.com/network/path