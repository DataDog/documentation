---
description: Network Path を調査する - パスビュー
further_reading:
- link: /network_monitoring/network_path/setup
  tag: ドキュメント
  text: Network Path のセットアップ
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: ブログ
  text: Datadog NPM でクラウドアーキテクチャとアプリの依存関係を監視する
title: パスビュー
---

<div class="alert alert-info">Datadog Network Performance Monitoring 用 Network Path は、プレビュー版です。Datadog の担当者にご連絡の上、サインアップしてください。</div>

## 概要 

Network Path の Path View セクションでは、特定のルートを詳細に調査でき、ソースから宛先までの潜在的な問題を解決するのに役立ちます。ルート全体のエンドツーエンドのレイテンシーとパケットロスに関する包括的なデータを提供します。

パスビューページにアクセスするには、[リストビュー][2]からパスをクリックします。このページでは、レイテンシーのしきい値の色を変更したり、各ホップのステータスを表示したりできます。

{{< img src="network_performance_monitoring/network_path/path_view_3.png" alt="ソースから宛先まで選択されたパスをハイライトしている Network Path のパスビュー" >}}

ソースから宛先までのホップ間の任意のパスをクリックすると、`Hop TTL`、`Hop Latency`、`Traversed count` などの追加の詳細を確認できます。その後、**View Device Details** をクリックして、選択したデバイスの [NDM][3] のデバイス詳細ページに移動します。

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="パスの詳細をハイライトしている Network Path のパスビュー。" style="width:50%;" >}}

## 凡例

凡例は、各ホップのステータスに関する追加の詳細を提供します。

{{< img src="network_performance_monitoring/network_path/legend.png" alt="凡例を表示している Network Path のパスビュー。" style="width:50%;" >}}

Traversal count
: そのホップを通過した `traceroute` の数。

Traversal completion
: `traceroute` が正常に宛先に到達できたかどうかを示します。

Reachability
: 宛先が経験しているパケットロスのレベル。

Latency
: `traceroute` がソースから宛先まで到達するのにかかった時間。

**注**: 不完全なホップでは、ホップ間のレイテンシーが `N/A` と表示される場合があります。

## ヘルスバー

レイテンシーの到達可能性ヘルスバーをドラッグして、パス上の特定の時間間隔におけるエンドツーエンドのレイテンシーとパケットロスのスナップショットを観察します。

**注**: ヘルスバーを変更しても、ページ上部のグローバルな時間範囲には影響しません。

{{< img src="network_performance_monitoring/network_path/latency_health_bar_2.mp4" alt="レイテンシーヘルスバーを選択し、時間範囲をドラッグしているネットワークパスのビデオ。" video="true" >}}

## グラフ

パスビューページの下部セクションでは、一連のグラフを通じて各パスに関する追加の洞察が表示されます。

### エンドツーエンドのメトリクスグラフ

エンドツーエンドのメトリクスグラフは、各パスのエンドツーエンドのレイテンシーとパケットロスを視覚的に表現するため、それらを効果的に比較・分析できます。


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="エンドツーエンドのメトリクスグラフを表示しているパスビューページ。" >}}

### ホップ間のレイテンシーグラフ

ホップ間のレイテンシーグラフは、パス上の各ホップのレイテンシーを詳細に表示し、潜在的なボトルネックや問題箇所を特定しやすくします。


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_2.png" alt="ホップ間のレイテンシーグラフを表示しているパスビューページ。" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /ja/network_monitoring/network_path/list_view
[3]: /ja/network_monitoring/devices