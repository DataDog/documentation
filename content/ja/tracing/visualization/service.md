---
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
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: ブログ
  text: APM サービス詳細画面の URL をクリップボードに追加する
kind: documentation
title: サービス詳細画面
---

{{< img src="tracing/visualization/service/overview_service_page.png" alt="サービス詳細画面" style="width:100%;">}}

## 概要

サービス詳細画面でサービスを選択すると、詳細なサービス詳細画面に移動します。サービスとは、ウェブフレームワークやデータベースなど、同じジョブを実行するプロセスのセットです（サービスの定義方法については [APM を開始する][1]をご覧ください）。

このページで参照できる内容

* [サービスモニターの状態](#service-monitor)
* [サマリーカードと Watchdog インサイト](#summary-cards)
* [すぐに使えるグラフ](#out-of-the-box-graphs)
* [このサービスに関連するリソース][2]
* [その他のタブ](#additional-tabs)
    *  [デプロイメント](#deployments)、[エラー追跡](#error-tracking)、[トレース](#traces)、など。

## サービスモニター

Datadog は、サービスタイプに応じてモニターのリストを提案します。

{{< img src="tracing/visualization/service/service_monitors.png" alt="サービスモニター"  style="width:90%;">}}

直接有効にするか、独自の [APM モニター][3]を作成します。

**注**: モニターに `service:<サービス名>` をタグ付けして、APM サービスにアタッチします。

## サマリーカード

サービス詳細画面には、サービスの健全性に関するハイライトを示すサマリーカードが表示されます。カード内をクリックすると、最新のデプロイメントの詳細やトレースを表示したり、このサービス上のすべてのデプロイメントを表示したりできます。[エラー追跡][4]とのインテグレーションにより、サービス上でフラグが立てられた新しい問題を見ることができます。ここで、エラーは自動的に問題に集約されます。

{{< img src="tracing/visualization/service/summary_cards.jpg" alt="サマリーカード"  style="width:100%;">}}

[サービスレベル目標 (SLO)][5] と [インシデント][6]のサマリーにより、SLO と進行中のインシデントの状態を監視し、パフォーマンス目標を常に念頭に置いておくことができます。カードをクリックすると、サービスに関する新しい SLO を作成したり、インシデントを宣言したりすることができます。

{{< img src="tracing/visualization/service/watchdog_insights.png" alt="Watchdog インサイト"  style="width:70%;">}}

[Watchdog インサイト][7]カルーセルでは、特定のタグで検出された異常が表示され、問題の根本原因を直接掘り下げることができます。

## すぐに使えるグラフ

Datadog は、特定のサービスに対して[すぐに使用できるグラフ][8]を提供しています。

* リクエスト - 選択して表示:
    *  **リクエストとエラーの合計量**
    *  1 秒あたりの**リクエストとエラーの量**
* レイテンシー - 選択して表示:
    *  トレースされたリクエストの平均/p75/p90/p95/p99/最大レイテンシー
    *  ** レイテンシー分布** 
    *  ウェブサービスの **Apdex スコア**。[Apdex の詳細][9]
* エラー - 選択して表示:
    * **エラーの合計量**
    * **1 秒あたりのエラー**の量
    * **% エラー率**
* 依存関係マップ:

    * 上流と下流のサービスを示した**依存関係マップ**です。
* **サブサービス**: 複数のサービスが関係している場合、(依存関係マップと同じトグルオプションにある) 4 番目のグラフが、サービスの**リクエストあたりの合計消費時間**/**消費時間の割合**/**平均時間**を*サービス*ごとまたは*タイプ*ごとに分類します。

  これは、現在のサービスから他の*サービス*または*タイプ*への下流サービスでトレースに費やされた合計、相対、平均時間を表します。

  **注**: *Postgres* や *Redis* などのサービスは、他のサービスを呼び出さない「最終的な」オペレーションであり、サブサービスのグラフはありません。
[Watchdog][7] は、リクエスト、レイテンシー、エラーのグラフで自動的な異常検出を実行します。異常が検出されると、グラフにオーバーレイが表示され、クリックするとサイドパネルに詳細が表示される Watchdog のアイコンが表示されます。

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="すぐに使えるサービスグラフ"  style="width:100%;">}}

### エクスポート

グラフを既存の[ダッシュボード][10]にエクスポートするには、各グラフの右上隅にある矢印をクリックします。

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="ダッシュボードに保存" style="width:60%;">}}

## リソース

リソースごとに分類されたリクエスト、レイテンシー、エラーのグラフを参照し、問題のあるリソースを特定します。リソースとは、サービスに対する特定のアクション (通常は個々のエンドポイントやクエリ) です。詳しくは、[APM を開始する][1]をご覧ください。

下には、サービスに関連する[リソース][11]のリストがあります。このサービスのリソースをリクエスト、レイテンシー、エラー、時間でソートし、トラフィックの多いエリアや潜在的な問題を特定します。なお、これらのメトリクス列は構成することができます (下の画像を参照)。

{{< img src="tracing/visualization/service/resources_tab.jpg" alt="リソース"  style="width:100%;">}}

[詳細については、専用のリソースドキュメントを参照してください][2]。

### 列

リソースリストに表示するものを選択します。

* **Requests**: トレースされたリクエストの絶対量（1 秒あたり）
* **Requests per second**: 1 秒あたりのトレースされたリクエストの絶対量
* **Total time**: このリソースで費やしたすべての時間の合計
* **Avg/p75/p90/p95/p99/Max Latency**: トレースされたリクエストの平均/p75/p90/p95/p99/最大レイテンシー
* **Errors**: 特定のリソースのエラーの絶対量
* **Error Rate**: 特定のリソースのエラーの割合

{{< img src="tracing/visualization/service/resource_columns.png" alt="リソース列"  style="width:40%;">}}

## その他のタブ

### デプロイ
バージョンタグで構成されたサービスは、Deployment タブにバージョンが表示されます。バージョンセクションには、選択した時間間隔にアクティブだったサービスの全バージョンが表示され、アクティブなバージョンが一番上に表示されます。

デフォルトで、以下が表示されます。
* タイムフレーム中にこのサービスにデプロイされたバージョン名。
* このバージョンに対応するトレースが確認された最初および最後の時間。
* 各バージョンに出現した、直前バージョンでは出現しなかったエラータイプの回数を表示するエラータイプインジケーター。

  **注**: ここには、前バージョンのトレースでは見られなかったエラーが表示されますが、このバージョンがこのようなエラーを発生させることを意味するものではありません。新しいエラータイプを確認することは、エラー調査を始める良い方法です。

* 1 秒あたりのリクエスト数。
* 合計リクエスト数のパーセンテージとしてのエラー率。

この概要テーブルに列を追加またはテーブルから列を削除することができます。選択はすべて保存されます。利用可能な列は以下のとおりです。

* 前バージョンに存在しなかったバージョンでアクティブなエンドポイント。
* アクティブな時間。このバージョンで Datadog に送信された最初のトレースから最後のトレースまでの時間を表示。
* リクエスト総数。
* エラー総数。
* p50、p75、p90、p95、p99、または最大で計測されたレイテンシー。

{{< img src="tracing/visualization/service/deployments.png" alt="デプロイメント"  style="width:90%;">}}

サービス詳細画面のデプロイメントについてご覧ください。

### エラー トラッキング
類似のエラーを集約して表示することで、ノイズの多いエラーの流れを管理しやすい問題に変え、サービスのエラーの影響を評価するのに役立ちます。[エラー追跡][4]で問題の詳細をお読みください)

このタブには、どのリソースに最も多くの問題があるかを示す概要グラフと、サービスで発生する最も一般的な問題のリストがあります。リスト内の問題をクリックすると、サイドパネルにそのスタックトレース、関連するコードのバージョン、開始以来のエラーの総発生数などの詳細が表示されます。

{{< img src="tracing/visualization/service/error_tracking_side_panel.jpg" alt="Error Tracking タブ"  style="width:90%;">}}

### インフラストラクチャー
サービスが Kubernetes 上で実行されている場合、サービス詳細画面に Infrastructure タブが表示されます。ライブ Kubernetes ポッドテーブルには、メモリ使用量が限界に近づいているかどうかなど、ポッドの詳細情報が表示されます。これにより、プロビジョニングされたコンピュートリソースが最適なアプリケーションパフォーマンスに必要なものを超えているかを明確に確認することによって、リソース割り当てを改善することが可能です。

{{< img src="tracing/visualization/service/infra_pods.png" alt="Kubernetes ポッド"  style="width:90%;">}}

以下の Kubernetes メトリクスは、CPU、メモリ、ネットワーク、およびディスクメトリクスを含む、選択した期間のインフラストラクチャーの健全性の要約を示します。

{{< img src="tracing/visualization/service/infra_metrics.png" alt="Kubernetes メトリクス"  style="width:90%;">}}

### ランタイムメトリクス
トレースクライアントでランタイムメトリクスが有効になっている場合、サービスのランタイム言語に対応する Runtime metrics タブが表示されます。詳しくは、[ランタイムメトリクス][13]をご覧ください。

{{< img src="tracing/visualization/service/runtime_metrics.png" alt="ランタイムメトリクス"  style="width:90%;">}}

### Profiling
サービスに [Continuous Profiler][14] が設定されている場合、Profiling タブが表示されます。利用可能なバージョンやランタイム言語などの概要が上部に表示されます。以下は、バージョン、エンドポイント、メソッド別のすぐに使えるプロファイリングメトリクスで、リソースを大量に消費するメソッドの特定とデバッグを支援します。グラフをクリックすると、関連するトレース、ログ、およびその他のデータが表示されます。[APM と Continuous Profiler の詳細についてご確認ください][14]。

{{< img src="tracing/visualization/service/profiler.jpg" alt="プロファイリング"  style="width:90%;">}}

### トレース
トレースタブで、サービスに関連するトレースのリストを表示します。トレースは、サービス、環境、および操作名ですでにフィルタリングされています。ステータス、リソース、エラータイプなどのコア[ファセット][16]を使用して、問題のあるスパンをドリルダウンします。詳細については、スパンをクリックすると、そのトレースのフレーム グラフや詳細が表示されます。

{{< img src="tracing/visualization/service/traces.png" alt="トレース"  style="width:90%;">}}

### ログ管理
サービスのログによくあるパターンを表示し、検索バーのステータスなどのファセットを使用して、パターンのリストをフィルタリングします。パターンをクリックすると、サイドパネルが開き、どのイベントがカスケードを引き起こしたかなど、より詳細な情報を見ることができます。詳しくは、[ログパターン][17]をご覧ください。

{{< img src="tracing/visualization/service/log_patterns.png" alt="ログパターン"  style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/visualization/
[2]: /ja/tracing/visualization/resource/
[3]: /ja/monitors/create/types/apm/
[4]: /ja/tracing/error_tracking/
[5]: /ja/monitors/service_level_objectives/
[6]: /ja/monitors/incident_management/
[7]: /ja/watchdog/
[8]: /ja/tracing/guide/metrics_namespace/
[9]: /ja/tracing/guide/configure_an_apdex_for_your_traces_with_datadog_apm/
[10]: /ja/dashboards/
[11]: /ja/tracing/visualization/#resources
[12]: /ja/tracing/deployment_tracking/#versions-deployed
[13]: /ja/tracing/runtime_metrics/
[14]: /ja/tracing/profiler/
[15]: /ja/tracing/
[16]: /ja/tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/