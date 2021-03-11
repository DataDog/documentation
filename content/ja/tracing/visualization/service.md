---
title: サービス詳細画面
kind: documentation
further_reading:
  - link: /tracing/setup/
    tag: Documentation
    text: アプリケーションで APM トレースをセットアップする方法
  - link: /tracing/visualization/services_list/
    tag: Documentation
    text: Datadog に報告するサービスの一覧
  - link: /tracing/visualization/resource/
    tag: Documentation
    text: リソースのパフォーマンスとトレースの詳細
  - link: /tracing/visualization/trace/
    tag: Documentation
    text: Datadog トレースの読み方を理解する
  - link: 'https://www.datadoghq.com/blog/datadog-clipboard/'
    tag: ブログ
    text: APM サービス詳細画面の URL をクリップボードに追加する
---
{{< img src="tracing/visualization/service/detailed_service_page.png" alt="サービス詳細画面"  style="width:90%;">}}

## 概要

サービス詳細画面でサービスを選択すると、詳細なサービス詳細画面に移動します。サービスとは、ウェブフレームワークやデータベースなど、同じジョブを実行するプロセスのセットです（サービスの定義方法については [APM を開始する][1]をご覧ください）。

このページで参照できる内容

* [サービスモニターの状態](#service-monitor)
* [すぐに使えるグラフ](#out-of-the-box-graphs)
* [このサービスに関連するリソース][2]

## サービスモニター

Datadog は、サービスタイプに応じてモニターのリストを提案します。

{{< img src="tracing/visualization/service/service_monitors.png" alt="サービスモニター"  style="width:90%;">}}

直接有効にするか、独自の [APM モニター][3]を作成します。

**注**: モニターに `service:<サービス名>` をタグ付けして、APM サービスにアタッチします。

## すぐに使えるグラフ

Datadog は、特定のサービスに対してすぐに使用できるグラフを提供しています。

* リクエスト - 選択して表示:
    *  **リクエストの合計量**
    *  **1 秒あたりのリクエスト**の量
* レイテンシー - 選択して表示:
    *  トレースされたリクエストの平均/p75/p90/p95/p99/最大レイテンシー
    *  ウェブサービスの **Apdex スコア**。[Apdex の詳細][4]
* エラー - 選択して表示:
    * **エラーの合計量**
    * **1 秒あたりのエラー**の量
    * **% エラー率**
* サブサービス: 複数のサービスが関係している場合、4 番目のグラフを使用して、サービスの**リクエストあたりの合計消費時間**/**消費時間の割合**/**平均時間**を*サービス*ごとまたは*タイプ*ごとに分類できます。

  これは、現在のサービスから他の*サービス*または*タイプ*へのトレースに費やされた合計/相対/平均時間を表します。

  **注**: *Postgres* や *Redis* などのサービスは、他のサービスを呼び出さない「最終的な」オペレーションであり、サブサービスのグラフはありません。

{{< img src="tracing/visualization/service/out_of_the_box_service_graph.png" alt="すぐに使えるサービスグラフ"  style="width:90%;">}}

### Export to Timeboard

グラフを既存の[タイムボード][5]にエクスポートするには、各グラフの右上隅にある矢印をクリックします。

{{< img src="tracing/visualization/service/save_to_timeboard.png" alt="タイムボードに保存"  style="width:40%;">}}

### レイテンシー分布

上記のグラフ以外に、サービスレイテンシー分布グラフがあります。

{{< img src="tracing/visualization/service/latency_distribution.png" alt="レイテンシー分布"  style="width:90%;">}}

このグラフの右上のセレクターを使用して、レイテンシー分布の特定のパーセンタイルを拡大します。

{{< img src="tracing/visualization/service/latency_distribution_selector.png" alt="レイテンシー分布セレクター"  style="width:20%;">}}

## リソース

サービスに関連する[リソース][6]のリストを確認します。リソースとは、サービスの特定のアクションです（通常、個々のエンドポイントまたはクエリ）。リソースの詳細については、[APM を開始する][1]をご覧ください。このサービスのリソースをリクエスト、レイテンシー、エラー、時間別に並べ替えることで、トラフィックの多い領域や潜在的な問題を特定できます。なお、これらのメトリクス列は構成可能です（下の画像を参照）。

{{< img src="tracing/visualization/service/resources.png" alt="リソース"  style="width:90%;">}}

[詳細については、専用のリソースドキュメントを参照してください][2]。

### リソースリストのフィルタリング

基本的なテキストフィルタリングのクエリでリソースリストをフィルタリングします。

{{< img src="tracing/visualization/service/resources_filtering.mp4" alt="リソースフィルタリング" video="true"  width="90%" >}}

### 列

リソースリストに表示するものを選択します。

* **Requests**: トレースされたリクエストの絶対量（1 秒あたり）
* **Avg/p75/p90/p95/p99/Max Latency**: トレースされたリクエストの平均/p75/p90/p95/p99/最大レイテンシー
* **Total time**: このリソースで費やしたすべての時間の合計
* **Error**: 特定のリソースのエラーの絶対量
* **Error Rate**: 特定のリソースのエラーの割合

{{< img src="tracing/visualization/service/resource_columns.png" alt="リソース列"  style="width:50%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/
[2]: /ja/tracing/visualization/resource/
[3]: /ja/monitors/monitor_types/apm/
[4]: /ja/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[5]: /ja/dashboards/timeboard/
[6]: /ja/tracing/visualization/#resources