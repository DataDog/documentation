---
description: Network Path を調査する - パスビュー
further_reading:
- link: /network_monitoring/network_path/setup
  tag: ドキュメント
  text: Network Path のセットアップ
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: ブログ
  text: Datadog NPM でクラウドアーキテクチャとアプリの依存関係をモニターする
title: パスビュー
---
## 概要 {#overview}

Network Path の Path View セクションでは、特定のルートを詳細に調査でき、ソースから宛先までの潜在的な問題を解決するのに役立ちます。ルート全体のエンドツーエンドのレイテンシーとパケットロスに関する包括的なデータを提供します。

パスビューページにアクセスするには、[リストビュー][2]または[AS レビュー][3]からパスをクリックします。このページでは、レイテンシーのしきい値の色を変更したり、各ホップのステータスを表示したりできます。

{{< img src="network_performance_monitoring/network_path/network_path_view_5.png" alt="0% のパケットロス、103ms のレイテンシー、レイテンシーと到達可能性の履歴を示す Network Path ビュー" >}}

ソースから宛先までのホップ間の任意のパスをクリックすると、`Hop TTL`、`Hop Latency`、`Traversed count` などの追加の詳細を確認できます。その後、**デバイスの詳細を表示**をクリックして、選択したデバイスの [NDM][4] のデバイス詳細ページに移動します。

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="パスの詳細をハイライトしている Network Path のパスビュー。" style="width:30%;" >}}

## 凡例 {#legend}

凡例は、各ホップのステータスに関する追加の詳細を提供します。

{{< img src="network_performance_monitoring/network_path/legend.png" alt="凡例を表示する Network Path のパスビュー。" style="width:30%;" >}}

トラバーサル数 
: ホップを通過した `traceroutes` の数。

トラバーサルの完了 
: `traceroute` が正常に宛先に到達できたかどうかを示します。

到達可能性
: 宛先が経験しているパケットロスのレベル。

レイテンシー 
: `traceroute` がソースから宛先まで到達するのにかかった時間。

**注**: 不完全なホップでは、ホップ間のレイテンシーが `N/A` と表示される場合があります。

## ヘルスバー {#health-bar}

レイテンシーの到達可能性ヘルスバーをドラッグして、パス上の特定の時間間隔におけるエンドツーエンドのレイテンシーとパケットロスのスナップショットを観察します。

**注**: ヘルスバーを変更しても、ページ上部のグローバルな時間範囲には影響しません。

{{< img src="network_performance_monitoring/network_path/latency_health_bar_3.mp4" alt="レイテンシーヘルスバーを選択し、時間範囲をドラッグしているネットワークパスのビデオ。" video="true" >}}

## 視覚的比較 {#visual-comparison}

視覚的比較ビューを使用して、2 つのパスを視覚化したものを並べて比較し、インシデントの前後で何が変わったかを特定します。

比較ビューは次を提供します。

- 異なる時間枠における同じ Network Path のサイドバイサイドのスナップショット。
- 異なる Network Path (異なるソースと宛先のペア) のサイドバイサイドのスナップショット。
- 2 つのクエリ間の差分を強調する縦方向のレイアウト。
- 共通および一意のホップの自動識別。
- RTT レイテンシー、パケットロス、ジッター、ホップ数を比較して重ね合わせた時系列グラフ。

{{< img src="network_performance_monitoring/network_path/visual_comparison_paths_2.png" alt="視覚的比較ビューは、到達可能な宛先を持つパス A と到達不可能な宛先を持つパス B を示し、上部には RTT レイテンシーのタイムラインがあります。" style="width:100%;" >}}

### 比較ビューを開く {#open-the-comparison-view}

比較ビューを開くには、Network Path ビューの時間範囲コントロールの近くにある**比較**をクリックします。デフォルトでは、以前に選択した時間範囲がビューに表示され、前の同等の時間範囲と比較されます。例えば、3 時間の範囲は前の 3 時間の範囲と比較されます。上部のコントロールを使用して、比較する時間範囲を調整します。

### 比較をナビゲートする {#navigate-the-comparison}

ズームコントロールまたはミニマップを使用するか、⌘/Ctrl を押しながらマウスでスクロールして、分割されたパスを独立してナビゲートします。

共有ホップの**検査**をクリックして、メタデータの詳細を示すサイドバーを開き、そのホップが両方のビューに存在することを確認します。一意のホップは 1 つのビューにのみ存在することを示すために異なる色で囲まれています。

**分析**タブは、各時間範囲のパケットと RTT レイテンシーについてホップごとに並列で表示されたテーブルを提供します。

{{< img src="network_performance_monitoring/network_path/network_path_analysis_comparison.png" alt="パス A とパス B のホップごとの RTT レイテンシーテーブルを並列表示した視覚的比較ビューの分析タブ" style="width:100%;" >}}

## グラフ {#graphs}

パスビューページの下部セクションでは、一連のグラフを通じて各パスに関する追加のインサイトが表示されます。 

### エンドツーエンドのメトリクスグラフ {#end-to-end-metrics-graph}

エンドツーエンドのメトリクスグラフは、各パスのエンドツーエンドのレイテンシーとパケットロスを視覚的に表現するため、それらを効果的に比較および分析できます。


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="エンドツーエンドのメトリクスグラフを表示しているパスビューページ。" >}}

### ホップ間のレイテンシーグラフ {#hop-to-hop-latency-graph}

ホップ間のレイテンシーグラフは、パス上の各ホップのレイテンシーを詳細に表示し、潜在的なボトルネックや問題箇所を特定しやすくします。


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_3.png" alt="ホップ間のレイテンシーグラフを表示しているパスビューページ。" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /ja/network_monitoring/network_path/list_view
[3]: /ja/network_monitoring/network_path/as_view/
[4]: /ja/network_monitoring/devices