---
algolia:
  tags:
  - サービス詳細画面
aliases:
- /ja/tracing/visualization/service/
further_reading:
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレースをセットアップする方法
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog に報告するサービスの発見とカタログ化
- link: /tracing/services/resource_page/
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み方を理解する
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: ブログ
  text: APM サービス詳細画面の URL をクリップボードに追加する
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を視覚化する
title: サービス詳細画面
---

{{< img src="tracing/visualization/service/overview_service_page_1.png" alt="サービス詳細画面" style="width:100%;">}}

## 概要

Selecting a service on the Service Catalog leads you to the detailed service page. A service is a set of processes that do the same job - for example a web framework or database (read more about how services are defined in [Getting Started with APM][1]).

このページで参照できる内容

* [サービスの健全性](#service-health) (非公開ベータ版)
* [サービスモニターの状態](#service-monitor)
* [Watchdog Insights](#watchdog-insights)
* [サマリーカード](#summary-cards)
* [依存関係](#dependencies)
* [すぐに使えるグラフ](#out-of-the-box-graphs)
* [このサービスに関連するリソース][2]
* [その他のセクション](#additional-sections)
    *  [デプロイメント](#deployments)、[エラー追跡](#error-tracking)、[トレース](#traces)、[セキュリティ](#security)など

## サービスの健全性

{{< callout header="Opt in to the private beta!" url="https://www.datadoghq.com/private-beta/service-health/" >}}
  Service health is in private beta. To request access, complete the form.
{{< /callout >}}

**Service Health** パネルには、サービスシグナルの要約がリアルタイムで表示され、そのサービスに対して注意が必要かどうかを把握できます。

サービスの健全性では、多くの種類のシグナル (モニター、インシデント、Watchdog のインサイト、エラー追跡の問題など) が考慮され、最も重要なアラートが表示されます。さらに、Service Health パネルでは、関連するインシデントへのリンクが提供され、必要な対応を行うのに役立ちます。

{{< img src="/tracing/services/service_page/service-health.png" alt="アクティブなインシデントが表示されているサービス詳細画面の Service Health パネル。" style="width:100%;" >}}

サービスの健全性にアクセスするには:

1. [APM > Service Catalog][23] に移動します。
2. サービスにカーソルを合わせ、**Full Page** をクリックします。
3. **Service Health** を選択します。

Service Health パネルでは、以下の条件の少なくとも 1 つが満たされた場合、サービスのステータスが *OK*、*Warning*、または *Alert* で表示されます。

|   ステータス    |                         条件                          |
|-------------|------------------------------------------------------------|
|  **Alert**  | **モニター**: <br>- ミュートされていないアラート設定 P1 モニターがトリガーされた。<br>- ページングインテグレーション (PagerDuty または Opsgenie) がセットアップされた、ミュートされていないモニターがトリガーされた。<br><br>**インシデント**: <br>- 重大度にかかわらず、インシデントがアクティブである。<br><br>**Watchdog Insights**: <br>- 障害のあるデプロイメントがアクティブである。<br>- 継続的な APM 遅延/エラー率アラートがアクティブである。  |
| **Warning** | **モニター**: <br>- ミュートされていないアラート設定 P2 モニターがトリガーされた。<br>- ミュートされていない警告設定 P1 モニターがトリガーされた。<br>- ページングインテグレーション (PagerDuty または Opsgenie) がセットアップされた警告モニター監がトリガーされた。<br><br>**インシデント**: <br>- 任意の重大度のインシデントが安定状態にある。<br><br>**Watchdog Insights**: <br>- 継続的なログ異常検知アラートがアクティブである。<br><br>**エラー追跡の問題**: <br>- 新しい問題 (48時間以内) の確認が必要である。 |                                                                                                                                                                                                   |
|   **Ok**    |    クリティカルまたはアラート状態からのシグナルがアクティブではない。     |                                                                                                                                                                       ||

## サービスモニター

サービスモニターパネルには、サービスにリンクされたアクティブなモニターと Synthetics テストが表示されます。
また、Datadog はサービスのタイプに応じてモニターのリストを提案します。

{{< img src="tracing/visualization/service/service_monitors.png" alt="サービスモニター" style="width:90%;">}}

直接有効にするか、独自の [APM モニター][3]を作成します。

**注**: モニターまたは Synthetic テストに `service:<SERVICE_NAME>` をタグ付けして、APM サービスにアタッチします。

## Watchdog Insights

[Watchdog Insights][7] カルーセルでは、特定のタグで検出された異常と外れ値が表示され、問題の根本原因を調査することができます。インサイトは、サービスタグを含む APM、Continuous Profiler、ログ管理、インフラストラクチャーのデータから発見されます。これらのインサイトは、各製品ページに表示されるインサイトと同じです。たとえば、サービス詳細画面のログの外れ値と同じものが、[ログエクスプローラー][19]に表示されます。

{{< img src="tracing/visualization/service/cross_product_insight_1.jpg" alt="Watchdog インサイト" style="width:100%;">}}

インサイトをクリックすると、インサイトの時間枠、関連するログやトレース、次のステップの候補などの詳細が表示されます。

{{< img src="tracing/visualization/service/watchdog_details_1.jpg" alt="Watchdog インサイトの詳細" style="width:100%;">}}

## サマリーカード

サービス詳細画面には、サービスの健全性に関するハイライトを示すサマリーカードが表示されます。カード内をクリックすると、最新のデプロイメントの詳細やトレースを表示したり、このサービス上のすべてのデプロイメントを表示したりできます。[エラー追跡][4]とのインテグレーションにより、サービス上でフラグが立てられた新しい問題を見ることができます。ここで、エラーは自動的に問題に集約されます。

{{< img src="tracing/visualization/service/summary_cards.png" alt="サマリーカード" style="width:100%;">}}

[サービスレベル目標 (SLO)][5] と[インシデント][6]のサマリーにより、SLO と進行中のインシデントの状態を監視し、パフォーマンス目標を常に念頭に置いておくことができます。カードをクリックすると、サービスに関する新しい SLO を作成したり、インシデントを宣言したりすることができます。[セキュリティシグナル][18]サマリーでは、アプリケーションの脅威に対してサービスがどのように対応しているかを確認できます。

## すぐに使えるグラフ

Datadog provides out-of-the-box graphs for any given service. Use the dropdown above each graph to change the displayed information.

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt=" すぐに使えるサービスグラフ" style="width:100%;">}}

{{% apm-ootb-graphs %}}

### エクスポート

グラフを既存の[ダッシュボード][10]にエクスポートするには、各グラフの右上隅にある矢印をクリックします。

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="ダッシュボードに保存" style="width:60%;">}}

## リソース

リソースごとに分類されたリクエスト、レイテンシー、エラーのグラフを参照し、問題のあるリソースを特定します。リソースとは、サービスに対する特定のアクション (通常は個々のエンドポイントやクエリ) です。詳しくは、[APM を開始する][1]をご覧ください。

下には、サービスに関連する[リソース][11]のリストがあります。このサービスのリソースをリクエスト、レイテンシー、エラー、時間でソートし、トラフィックの多いエリアや潜在的な問題を特定します。なお、これらのメトリクス列は構成することができます (下の画像を参照)。

{{< img src="tracing/visualization/service/resources_tab_1.jpg" alt="リソース" style="width:100%;">}}

リソースをクリックすると、サイドパネルが開き、リソースのすぐに使えるグラフ (リクエスト、エラー、レイテンシーについて)、リソース依存マップ、スパン要約表が表示されます。キーボードのナビゲーションキーを使用して、**Resources** リスト上のリソースを切り替えたり、サービス内のリソースを比較したりできます。完全なリソースページを表示するには、**Open Full Page** をクリックします。

[詳細については、専用のリソースドキュメントを参照してください][2]。

### 列

リソースリストに表示するものを選択します。

* **Requests**: トレースされたリクエストの絶対量 (1 秒あたり)
* **Requests per second**: 1 秒あたりのトレースされたリクエストの絶対量
* **Total time**: このリソースで費やしたすべての時間の合計
* **Avg/p75/p90/p95/p99/Max Latency**: トレースされたリクエストの平均/p75/p90/p95/p99/最大レイテンシー
* **Errors**: 特定のリソースのエラーの絶対量
* **Error Rate**: 特定のリソースのエラーの割合

{{< img src="tracing/visualization/service/resource_columns.png" alt="リソース列" style="width:40%;">}}

## その他のセクション

### デプロイ
バージョンタグで構成されたサービスは、Deployment タブにバージョンが表示されます。バージョンセクションには、選択した時間間隔にアクティブだったサービスの全バージョンが表示され、アクティブなバージョンが一番上に表示されます。

デフォルトで、以下が表示されます。
* タイムフレーム中にこのサービスにデプロイされたバージョン名。
* このバージョンに対応するトレースが確認された最初および最後の時間。
* 各バージョンに出現した、直前バージョンでは出現しなかったエラータイプの回数を表示するエラータイプインジケーター。

  **注**: ここには、前バージョンのトレースでは見られなかったエラーが表示されますが、必ずしもこのバージョンになってこのようなエラーが発生するようになったことを意味するものではありません。新しいエラータイプを確認することは、エラー調査を始める良い方法です。

* 1 秒あたりのリクエスト数。
* 合計リクエスト数のパーセンテージとしてのエラー率。

この概要テーブルに列を追加またはテーブルから列を削除することができます。選択はすべて保存されます。利用可能な列は以下のとおりです。

* 前バージョンに存在しなかったバージョンでアクティブなエンドポイント。
* アクティブな時間。このバージョンで Datadog に送信された最初のトレースから最後のトレースまでの時間を表示します。
* リクエスト総数。
* エラー総数。
* p50、p75、p90、p95、p99、または最大で計測されたレイテンシー。

{{< img src="tracing/visualization/service/deployments_1.png" alt="デプロイメント" style="width:90%;">}}

サービス詳細画面のデプロイメントについてご覧ください。

### Error Tracking
サービス上の問題を表示します。これらの問題は類似のエラーを集約しており、ノイズの多いエラーの流れを管理しやすい問題に変えることで、サービスのエラーの影響を評価するのに役立ちます。[エラー追跡][4]で問題の詳細をお読みください。

このタブには、どのリソースに最も多くの問題があるかを示す概要グラフと、サービスで発生する最も一般的な問題のリストがあります。リスト内の問題をクリックすると、サイドパネルにそのスタックトレース、関連するコードのバージョン、開始以来のエラーの総発生数などの詳細が表示されます。

{{< img src="tracing/visualization/service/error_tracking_side_panel_1.jpg" alt="Error Tracking タブ" style="width:90%;">}}

### セキュリティ
サービスのライブラリに存在する既知の脆弱性や、サービス上のセキュリティシグナルなど、サービスのセキュリティポスチャを理解できます。セキュリティシグナルは、Datadog がサービスに影響を与えるアプリケーション攻撃を検知した際に自動的に生成されます。これらのシグナルは、個々の攻撃の試みをそれぞれ評価する代わりに、ユーザーが確認すべき重要な脅威を特定します。[アプリケーションセキュリティ][18]の詳細を参照してください。

セキュリティタブのトップセクションには、脆弱性の数と重大性、攻撃の時期、攻撃の種類、攻撃者情報 (クライアント IP または認証済みユーザー) を示す概要グラフが表示されます。

パネルの次のセクションには、サービスに関係するすべての脆弱性とシグナルが一覧表示されます。任意のセキュリティ脆弱性をクリックすると、関連情報が記されたサイドパネルが開き、脆弱性に関するさらなる調査と修復を実行できます。セキュリティシグナルをクリックすると、どのような脅威が検出されたか、そして修復のためにどのような対応が可能かについての情報を入手できます。

{{< img src="tracing/visualization/service/security_tab_1.jpg" alt="セキュリティ" style="width:90%;">}}

### データベース
データベースモニタリングによって特定されたダウンストリームのデータベースの依存関係のリストを表示し、レイテンシーやロードの外れ値を特定します。
[DBM と APM の接続についての詳細はこちら][21]。

{{< img src="tracing/visualization/service/databases_tab_1.png" alt="データベース" style="width:90%;">}}

### インフラストラクチャー
サービスが Kubernetes 上で実行されている場合、サービス詳細画面に Infrastructure タブが表示されます。ライブ Kubernetes Pods テーブルには、メモリ使用量が限界に近づいているかどうかなど、ポッドの詳細情報が表示されます。これにより、プロビジョニングされたコンピュートリソースが最適なアプリケーションパフォーマンスに必要なものを超えているかを明確に確認することによって、リソース割り当てを改善することが可能です。

{{< img src="tracing/visualization/service/infra_pods.png" alt="Kubernetes ポッド" style="width:90%;">}}

Kubernetes Metrics セクションは、選択した期間のインフラストラクチャーの健全性の要約を示し、CPU、メモリ、ネットワーク、およびディスクメトリクスを含みます。

{{< img src="tracing/visualization/service/infra_metrics_1.png" alt="Kubernetes メトリクス" style="width:90%;">}}

Kubernetes 以外の環境 (ホストベースのインストールなど) については、[統合サービスタグ付けのドキュメント][13]をご覧ください。

### ランタイムメトリクス
トレースクライアントでランタイムメトリクスが有効になっている場合、サービスのランタイム言語に対応する Runtime metrics タブが表示されます。詳しくは、[ランタイムメトリクス][14]をご覧ください。

{{< img src="tracing/visualization/service/runtime_metrics_1.png" alt="ランタイムメトリクス" style="width:90%;">}}

### プロファイリング
サービスで [Continuous Profiler][15] が設定されている場合、Profiling タブが表示されます。

**Profiling** タブの情報を使用して、レイテンシーとスループットの変化をコードパフォーマンスの変化に関連付けます。

この例では、レイテンシーが、以下のコードによって引き起こされる`/GET train` でのロック競合の増加とどのようにリンクしているかがわかります。

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison_1.mp4" alt="レイテンシーを引き起こしているコード行を見つけるために APM サービスページから Profiling 比較ページへピボット" video=true >}}

### トレース
トレースタブで、サービスに関連するトレースのリストを表示します。トレースは、サービス、環境、および操作名ですでにフィルタリングされています。ステータス、リソース、エラータイプなどのコア[ファセット][16]を使用して、問題のあるスパンをドリルダウンします。詳細については、スパンをクリックすると、そのトレースのフレームグラフや詳細が表示されます。

{{< img src="tracing/visualization/service/traces_1.png" alt="トレース" style="width:90%;">}}

### ログパターン
サービスのログによくあるパターンを表示し、検索バーのステータスなどのファセットを使用して、パターンのリストをフィルタリングします。パターンをクリックすると、サイドパネルが開き、どのイベントがカスケードを引き起こしたかなど、より詳細な情報を見ることができます。詳しくは、[ログパターン][17]をご覧ください。

{{< img src="tracing/visualization/service/log_patterns_1.png" alt="ログパターン" style="width:90%;">}}

### コスト
サービスで使用されるインフラストラクチャーに関連するコストを Costs タブで可視化します。
[クラウドコスト管理の詳細はこちら][22]。

{{< img src="tracing/visualization/service/costs_tab_1.png" alt="コスト" style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/
[2]: /ja/tracing/services/resource_page/
[3]: /ja/monitors/types/apm/
[4]: /ja/tracing/error_tracking/
[5]: /ja/service_management/service_level_objectives/
[6]: /ja/service_management/incident_management/
[7]: /ja/watchdog/
[8]: /ja/tracing/metrics/metrics_namespace/
[10]: /ja/dashboards/
[11]: /ja/tracing/glossary/#resources
[12]: /ja/tracing/services/deployment_tracking/#versions-deployed
[13]: /ja/getting_started/tagging/unified_service_tagging/?tab=systemmetrics#non-containerized-environment
[14]: /ja/tracing/metrics/runtime_metrics/
[15]: /ja/profiler/
[16]: /ja/tracing/trace_explorer/query_syntax/#facets
[17]: https://www.datadoghq.com/blog/log-patterns/
[18]: /ja/security/application_security/how-appsec-works/
[19]: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
[21]: /ja/database_monitoring/connect_dbm_and_apm/
[22]: /ja/cloud_cost_management/
[23]: https://app.datadoghq.com/services