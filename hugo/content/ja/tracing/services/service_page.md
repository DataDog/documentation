---
algolia:
  tags:
  - service page
aliases:
- /ja/tracing/visualization/service/
description: 健全性メトリクス、依存関係、デプロイメント、Error Tracking、セキュリティインサイトを含む包括的なサービス概要。
further_reading:
- link: /tracing/trace_collection/
  tag: ドキュメント
  text: アプリケーションで APM トレーシングをセットアップする方法
- link: /internal_developer_portal/catalog/
  tag: ドキュメント
  text: Datadog に報告するサービスの発見とカタログ化
- link: /tracing/services/resource_page/
  tag: ドキュメント
  text: リソースのパフォーマンスとトレースの詳細
- link: /tracing/trace_explorer/trace_view/
  tag: ドキュメント
  text: Datadog トレースの読み取り方を理解する
- link: https://www.datadoghq.com/blog/datadog-clipboard/
  tag: ブログ
  text: APM サービスページの URL をクリップボードに追加する
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を視覚化する
- link: https://learn.datadoghq.com/courses/getting-started-apm
  tag: ラーニングセンター
  text: APM メトリクスとトレースの概要
- link: https://learn.datadoghq.com/courses/diagnosing-bugs-with-apm
  tag: ラーニングセンター
  text: Datadog APM を使用してアプリケーションのバグを診断する
title: サービス詳細画面
---
{{< img src="tracing/visualization/service/overview_service_page_1.png" alt="サービス詳細ページ" style="width:100%;">}}

## 概要{#overview}

カタログでサービスを選択すると、サービス詳細ページに移動します。サービスとは、ウェブフレームワークやデータベースなど、同じジョブを実行する一連のプロセスです (サービスの定義方法については、[APM を開始する][1]を参照してください)。

このページで参照できる内容

* [サービスの健全性](#service-health)
* [サービスモニターの状態](#service-monitor)
* [Watchdog Insights](#watchdog-insights)
* [サマリーカード](#summary-cards)
{{< site-region region="ap1,us3,us5,eu,us,ap2,uk1" >}}
* [依存関係](#dependencies)
{{< /site-region >}}
* [すぐに使えるグラフ](#out-of-the-box-graphs)
* [このサービスに関連するリソース][2]
* [その他のセクション](#additional-sections)
    *  [デプロイメント](#deployments)、[Error Tracking](#error-tracking)、[トレース](#traces)、[Security](#security) など

## サービスの健全性 {#service-health}

**サービスの健全性**では、サービスのステータスのリアルタイムサマリーを提供し、すぐに対応が必要なサービスを特定するのに役立ちます。

サービスの健全性は、複数のシグナル (モニター、インシデント、Watchdog Insights) を単一のアラートに統合します。どのサービスがクリティカルな状態にあるかを確認し、問題をより迅速に検出してトラブルシューティングを行います。

{{< img src="/tracing/services/service_page/service-health3.png" alt="サービス詳細画面およびサービス依存関係マップのサービスの健全性。" style="width:100%;" >}}

サービスの健全性は、Datadog 内の複数の場所で利用できます。

1. [カタログ][23]
2. サービス詳細画面
3. Watchdog が複数のサービス依存関係にまたがる問題を検出した場合のサービス依存関係マップ。
4. サービスピル

サービスの健全性では、以下の条件のうち少なくとも 1 つが満たされた場合、サービスのステータスが *Critical* または *Warning* で表示されます。

|   ステータス    |                         条件                          |
|-------------|------------------------------------------------------------|
|  **Critical**  | **モニター**: <br>- ページングインテグレーション (PagerDuty または Opsgenie) がセットアップされた、ミュートされていないモニターが `ALERT` 状態であり、`past 2 days` 以内にトリガーされた。<br><br>**インシデント**: <br>- 重大度にかかわらず、インシデントがアクティブである。<br><br>**Watchdog Insights**: <br>- 障害のあるデプロイメントが継続している。<br>- APM のレイテンシー/エラー率アラートが継続している。 |
| **Warning** | **モニター**: <br>- ページングインテグレーション (PagerDuty または Opsgenie) がセットアップされた、ミュートされていない警告モニターが `WARN` 状態であり、`past 2 days` 以内にトリガーされた。<br><br>**インシデント**: <br>- 重大度にかかわらず、インシデントが安定している。<br><br>**Watchdog Insights**: <br>- ログ異常検知アラートが継続している。|                                                                                                                                                                                                   |
|   **Ok**    |    Critical または Warning 状態からのアラートはアクティブではありません。    |                                                                                                                                                                       ||

## サービスモニター {#service-monitor}

サービスモニターパネルには、サービスにリンクされているアクティブなモニターと Synthetic テストが表示されます。
Datadog は、サービスタイプに応じてモニターのリストも提案します。

{{< img src="tracing/visualization/service/service_monitors.png" alt="サービスモニター" style="width:90%;">}}

直接有効にするか、独自の [APM モニター][3]を作成します。

**注**: モニターは、`service:<SERVICE_NAME>` がメタデータにタグ付けされている場合、モニタークエリに含まれている場合、またはサービスごとにグループ化されている場合、APM サービスに付与されます。Synthetic テストに `service:<SERVICE_NAME>` をタグ付けして、それを APM サービスに付与することもできます。

## Watchdog Insights {#watchdog-insights}

[Watchdog Insights][7] カルーセルでは、特定のタグで検出された異常や外れ値が表示され、問題の根本原因を調査できます。インサイトは、サービスタグを含む APM、Continuous Profiler、Log Management、およびインフラストラクチャーのデータから検出されます。これらのインサイトは、各製品ページに表示されるインサイトと同じものです。たとえば、サービス詳細画面上の同じログ外れ値は、[Log Explorer][19] でも確認できます。

{{< img src="tracing/visualization/service/cross_product_insight_1.jpg" alt="Watchdog Insights" style="width:100%;">}}

インサイトをクリックすると、インサイトのタイムフレーム、関連ログやトレース、次のステップの候補などの詳細が表示されます。

{{< img src="tracing/visualization/service/watchdog_details_1.jpg" alt="Watchdog Insights の詳細" style="width:100%;">}}

## サマリーカード {#summary-cards}

サービス詳細画面には、サービスの健全性に関するハイライトを示すサマリーカードが表示されます。潜在的な障害のあるデプロイメントを簡単に発見し、カードをクリックして最新のデプロイメントの詳細やトレースを表示したり、このサービスのすべてのデプロイメントを表示したりできます。[Error Tracking][4] との統合により、サービスでフラグが立てられた新しい問題を確認できます。その場合、エラーは自動的に問題として集約されます。

{{< img src="tracing/visualization/service/summary_cards.png" alt="サマリーカード" style="width:100%;">}}

[Service Level Objectives (SLO)][5] と [インシデント][6]のサマリーにより、SLO と進行中のインシデントの状態を監視し、パフォーマンス目標を常に念頭に置いておくことができます。カードをクリックすると、サービスに関する新しい SLO を作成したり、インシデントを宣言したりすることができます。[セキュリティシグナル][18]のサマリーは、サービスがアプリケーションの脅威にどのように反応するかを強調表示します。

## すぐに使えるグラフ {#out-of-the-box-graphs}

Datadog は、特定のサービスに対してすぐに使えるグラフを提供しています。各グラフの上にあるドロップダウンを使用して、表示される情報を変更します。

{{< img src="tracing/visualization/service/out_of_the_box_graphs.jpg" alt="すぐに使用できるサービスグラフ" style="width:100%;">}}

{{% apm-ootb-graphs %}}

<div class="alert alert-tip">レイテンシーグラフのレイテンシースパイクにカーソルを合わせ、<strong>Bits AI を使用して調査</strong>をクリックすると、自動調査が開始されます。Bits AI は、影響を受けたトレース全体にわたるタグの乖離とボトルネックを分析します。詳細については、<a href="/bits_ai/bits_chat/">Bits Chat</a> を参照してください。</div>

### エクスポート {#export}

グラフを既存の[ダッシュボード][10]にエクスポートするには、各グラフの右上隅にある矢印をクリックします。

{{< img src="tracing/visualization/service/save_to_dashboard.png" alt="ダッシュボードに保存" style="width:60%;">}}

## リソース {#resources}

リクエスト、レイテンシー、およびエラーのグラフをリソース別に内訳表示し、問題のあるリソースを特定します。リソースとは、サービスに対する特定のアクション (通常は個々のエンドポイントやクエリ) のことです。

以下に、サービスに関連付けられた[リソース][11]のリストがあります。注: リソースが HTTP サービスの外部インターフェースを表している場合、リストには代わりにエンドポイントが表示されます。

サービスのリソースをリクエスト、レイテンシー、エラー、または時間で並べ替えて、トラフィックの多い領域や潜在的な問題を特定します。以下の例に示すように、これらのメトリクス列を構成できます。

{{< img src="tracing/visualization/service/resources_tab_1.jpg" alt="リソース" style="width:100%;">}}

リソースをクリックするとサイドパネルが開き、そのリソースのすぐに使えるグラフ (リクエスト、エラー、およびレイテンシーに関するもの)、リソース依存関係マップ、およびスパンサマリーテーブルが表示されます。キーボードのナビゲーションキーを使用して、{{< ui >}}Resources{{< /ui >}} リスト上のリソースを切り替え、サービス内のリソースを比較します。リソースページ全体を表示するには、{{< ui >}}Open Full Page{{< /ui >}} をクリックします。

[詳細については、専用のリソースドキュメントを参照してください][2]。

### 列 {#columns}

リソースリストに表示するものを選択します。

* {{< ui >}}Requests{{< /ui >}}: トレースされたリクエストの絶対量 (1 秒あたり)
* {{< ui >}}Requests per second{{< /ui >}}: 1 秒あたりにトレースされたリクエストの絶対量
* {{< ui >}}Total time{{< /ui >}}: このリソースで費やしたすべての時間の合計
* {{< ui >}}Avg/p75/p90/p95/p99/Max Latency{{< /ui >}}: トレースされたリクエストの平均/p75/p90/p95/p99/最大レイテンシー
* {{< ui >}}Errors{{< /ui >}}: 特定のリソースのエラーの絶対量
* {{< ui >}}Error Rate{{< /ui >}}: 特定のリソースのエラーの割合

{{< img src="tracing/visualization/service/resource_columns.png" alt="リソース列" style="width:40%;">}}

{{< site-region region="ap1,ap2,us3,us5,eu,us,uk1" >}}
## 依存関係 {#dependencies}

依存関係マップから、サービスがやり取りするアップストリームおよびダウンストリームの依存関係を視覚化します。このマップは [APM メトリクス][1]を利用して、正確なリクエスト数、エラー率、レイテンシーの数値を表示します。マップは、依存関係をオペレーション名ごとに自動的にグループ化します。たとえば、サービスが gRPC を使用して 2 つのダウンストリームサービスを呼び出す場合、これらのサービスはまとめてグループ化されます。マップの左側にあるテーブルには、時間の経過に伴うリクエストとエラー率が表示され、障害が発生している依存関係を特定するのに役立ちます。

データベース、キュー、サードパーティサービスなどの[推論されたサービス依存関係][2]は、紫色の背景のノードで表示されます。

{{< img src="tracing/visualization/service/dependencies_section.png" alt="サービス詳細画面の依存関係マップ" style="width:100%;">}}

**注**: [サービスオーバーライド][3]は、依存関係マップ内のノード間のエッジ (接続線) に沿って表示され、サービスがやり取りしている実際のリモートサービス、データベース、またはキューを把握できるように表示されます。

### 特定のサービス依存関係の調査 {#investigating-a-specific-service-dependency}

サービス依存関係ノードをクリックして、そのサービスの依存関係の 1 つを調査します。サイドパネルでは、リクエスト数、エラー、およびレイテンシーのメトリクスが、そのサービスからダウンストリームの依存関係へ向かうリクエストに絞り込まれます。

次のテーブルを使用して、サービスからダウンストリームの依存関係へのクライアント呼び出しでどのリソースが呼び出されているかを確認します。たとえば、サービスがデータベースを呼び出している場合、データベースに対して実行されたクエリの内訳を確認し、テーブルを使用して低速なクエリや失敗しているクエリを特定します。

{{< img src="tracing/visualization/service/dependencies_side_panel.png" alt="サービス詳細画面のサービス依存関係マップ" style="width:100%;">}}

[1]: /ja/tracing/metrics/metrics_namespace/
[2]: /ja/tracing/services/inferred_services/
[3]: /ja/tracing/guide/service_overrides/
{{< /site-region >}}

## その他のセクション {#additional-sections}

### デプロイメント {#deployments}
バージョンタグで構成されたサービスは、Deployment タブにバージョンが表示されます。バージョンセクションには、選択した時間間隔中にアクティブだったサービスのすべてのバージョンが表示され、アクティブなバージョンが一番上に表示されます。

デフォルトで、以下が表示されます。
* タイムフレーム中にこのサービスにデプロイされたバージョン名。
* このバージョンに対応するトレースが確認された最初および最後の時間。
* 各バージョンに出現した、直前バージョンでは出現しなかったエラータイプの回数を表示するエラータイプインジケーター。

    **注**: このインジケーターは、前のバージョンのトレースでは確認されなかったエラーを示します。このバージョンでこれらのエラーが発生したことを必ずしも意味するわけではありません。新しいエラータイプを調査することは、エラー調査を開始する効果的な方法です。

* 1 秒あたりのリクエスト数。
* 合計リクエスト数のパーセンテージとしてのエラー率。

この概要テーブルに列を追加またはテーブルから列を削除することができます。選択はすべて保存されます。利用可能な列は以下のとおりです。

* 前のバージョンには存在しなかったバージョンでアクティブなエンドポイント。
* アクティブな時間。このバージョンで Datadog に送信された最初のトレースから最後のトレースまでの時間を表示。
* リクエスト総数。
* エラー総数。
* p50、p75、p90、p95、p99、または最大で計測されたレイテンシー。

{{< img src="tracing/visualization/service/deployments_1.png" alt="デプロイメント" style="width:90%;">}}

デプロイメントの詳細については[サービス詳細画面][12]をご覧ください。

### Error Tracking {#error-tracking}
サービス上の問題を表示します。これらの問題は類似のエラーを集約しており、ノイズの多いエラーの流れを管理しやすい問題に変えることで、サービスのエラーの影響を評価するのに役立ちます。[Error Tracking][4] で問題の詳細をご覧ください。

このタブには、どのリソースで最も多くの問題が発生しているかを示す概要グラフと、サービスで発生している最も一般的な問題のリストが表示されます。リスト内の問題をクリックすると、スタックトレース、関連するコードバージョン、発生開始以降の合計エラー発生数など、詳細がサイドパネルに表示されます。

{{< img src="tracing/visualization/service/error_tracking_side_panel_1.jpg" alt="Error Tracking タブ" style="width:90%;">}}

### Security {#security}
サービスのライブラリで公開されている既知の脆弱性や、サービス上のセキュリティシグナルなど、サービスのセキュリティポスチャを把握できます。セキュリティシグナルは、Datadog がサービスに影響を与えるアプリケーション攻撃を検出した際に自動的に作成されます。シグナルは、個々の攻撃の試みをそれぞれ評価するのではなく、確認すべき重要な脅威を特定します。[App and API Protection][18] について。

セキュリティタブのトップセクションには、脆弱性の数と重大性、攻撃の時期、攻撃の種類、攻撃者情報 (クライアント IP または認証済みユーザー) を示す概要グラフが表示されます。

パネルの次のセクションには、サービスに関するすべての脆弱性とシグナルが一覧表示されます。セキュリティ脆弱性をクリックすると、詳細を調査して脆弱性を修正するための関連情報が表示されたサイドパネルが開きます。セキュリティシグナルをクリックすると、検出された脅威の内容と、それを修正するために実行できるアクションに関する情報が表示されます。

{{< img src="tracing/visualization/service/security_tab_1.jpg" alt="Security" style="width:90%;">}}

### データベース {#databases}
ホストの詳細、クエリ、推奨事項、ダウンストリームのデータベース依存関係を表示し、レイテンシーと負荷の外れ値を特定します。

#### クエリ {#queries}
Queries タブには、サンプリングされたスパンの期間の可視化方法と、選択した時間間隔のクエリの完全なリストが含まれています。テーブルからクエリを選択してクエリパネルを開き、診断、エラーの詳細、およびトレースを表示します。

#### データベース {#databases-1}
Databases タブには、外れ値の特定に役立つアクティブなコネクションと平均クエリ時間の可視化方法、および選択したサービスのデータベースホストの完全なリストが含まれています。リストからデータベースホストを選択すると、Database Monitoring でそのホストが表示されます。

[DBM と APM との接続の詳細][21]。

### インフラストラクチャー {#infrastructure}
サービスが Kubernetes 上で実行されている場合、サービス詳細画面にインフラストラクチャータブが表示されます。ライブ Kubernetes Pods テーブルには、メモリ使用量が限界に近づいているかどうかなど、ポッドの詳細情報が表示されます。これにより、プロビジョニングされたコンピュートリソースが最適なアプリケーションパフォーマンスに必要なものを超えているかを確認することによって、リソース割り当てを改善することができます。

{{< img src="tracing/visualization/service/infra_pods.png" alt="Kubernetes Pods" style="width:90%;">}}

Kubernetes Metrics セクションは、選択した期間のインフラストラクチャーの健全性の要約を示し、CPU、メモリ、ネットワーク、およびディスクメトリクスを含みます。

{{< img src="tracing/visualization/service/infra_metrics_1.png" alt="Kubernetes Metrics" style="width:90%;">}}

Kubernetes 以外の環境 (ホストベースのインストールなど) については、[Unified Service Tagging のドキュメント][13]をご覧ください。

### Runtime Metrics {#runtime-metrics}
トレースクライアントでランタイムメトリクスが有効になっている場合、サービスのランタイム言語に対応する Runtime Metrics タブが表示されます。詳しくは、[Runtime Metrics][14] をご覧ください。

{{< img src="tracing/visualization/service/runtime_metrics_1.png" alt="Runtime Metrics" style="width:90%;">}}

### プロファイリング {#profiling}
サービスで [Continuous Profiler][15] が設定されている場合、Profiling タブが表示されます。

{{< ui >}}Profiling{{< /ui >}} タブの情報を使用して、レイテンシーとスループットの変化をコードパフォーマンスの変化に関連付けます。

この例では、レイテンシーが、以下のコードによって引き起こされる `/GET train` でのロック競合の増加とどのようにリンクしているかがわかります。

```java
Thread.sleep(DELAY_BY.minus(elapsed).toMillis());
```

{{< img src="profiler/apm_service_page_pivot_to_contention_comparison_1.mp4" alt="APM サービス詳細画面からプロファイリング比較ページにピボットして、レイテンシーの原因となっているコード行を見つけます。" video=true >}}

### Memory Leaks {#memory-leaks}
[Continuous Profiler][15] をセットアップし、サービスがコンテナ化された環境で実行されている場合、[Memory Leaks][24] タブが利用可能になります。

潜在的なメモリリークを特定するためのワークフローに沿ってガイドし、最も実用的なデータを表示します。

{{< img src="profiler/apm_service_page_memory_leaks.png" alt="Memory Leaks" style="width:90%;">}}

### トレース {#traces}
サービスに関連付けられたトレースのリストをトレースタブで表示します。このタブは、サービス、環境、オペレーション子名ですでにフィルタリングされています。ステータス、リソース、エラーの種類などの主要な[ファセット][16]を使用して、問題のあるスパンをドリルダウンします。詳細については、span をクリックして、そのトレースのフレームグラフやその他の詳細を表示します。

{{< img src="tracing/visualization/service/traces_1.png" alt="トレース" style="width:90%;">}}

### ログパターン {#log-patterns}
サービスのログ内の一般的なパターンを表示し、検索バーでステータスなどのファセットを使用してパターンのリストをフィルタリングします。パターンをクリックするとサイドパネルが開き、カスケードをトリガーしたイベントなどの詳細が表示されます。詳細については、[ログパターン][17]をご覧ください。

{{< img src="tracing/visualization/service/log_patterns_1.png" alt="ログパターン" style="width:90%;">}}

### コスト {#costs}
Costs タブで、サービスのインフラストラクチャーに関連付けられたコストを視覚化します。
[Cloud Cost Management の詳細][22]。

{{< img src="tracing/visualization/service/costs_tab_1.png" alt="コスト" style="width:90%;">}}

### フロントエンドアクティビティ {#frontend-activity}

{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="プレビューに参加しましょう。">}}
Journey Monitoring プレビューに参加して、フロントエンドアクティビティセクションの使用を開始します。
{{< /callout >}}

{{< callout url="https://www.datadoghq.com/product-preview/operations-monitoring/" btn_hidden="false" header="プレビューに参加しましょう。">}}
Operations Monitoring プレビューに参加して、フロントエンドアクティビティセクションの使用を開始します。
{{< /callout >}}

Frontend Activity タブは、バックエンドサービスを、それに依存する [Real User Monitoring (RUM)][24] のジャーニー、オペレーション、ビューに接続します。これを使用して、サービスのパフォーマンスがエンドユーザーエクスペリエンスやビジネス成果にどのように影響するか (サービスが低下したときにどのユーザーのジャーニーが遅延したり、コンバージョンに失敗したりするかなど) を把握します。

{{< img src="/tracing/services/service_page/front-end-activity.png" alt="フロントエンドアクティビティのサイドパネルには、サービス、ジャーニー、オペレーション、使用状況の詳細および関連するセッションリプレイが表示されます。" style="width:90%;">}}

このタブのメトリクスは、RUM データと関連付けられたインデックス化されたスパンに基づいて計算されます。ヘッダーには、このビューのベースとなるインデックス化されたスパンの数と、インデックス化されたスパンの合計の割合が表示されます。

#### 前提条件 {#prerequisites}
- RUM がフロントエンドアプリケーションに設定されています。
- RUM と APM が接続されているため、フロントエンドイベントはこのサービスのバックエンドトレースと関連付けられます。
- RUM ジャーニーとオペレーションが組織に有効になっています。

ユーザーメトリクスとアカウントメトリクスを入力するには、RUM SDK が `usr.id` 属性と `account.id` 属性を送信する必要があります。これらの属性がない場合でも、ジャーニー、オペレーション、およびビューのメトリクスは利用できますが、Datadog はアクティビティを特定のユーザーやアカウントに紐付けることができません。

#### ビューのフィルタリング {#filtering-the-view}

タブ上部のカスケードセレクターを使用して、最も広範なグループから最も具体的なものへとデータを絞り込みます。

- ジャーニー: Journey Monitoring で定義された、ユーザーがアプリケーション内で行う一連のステップ
- オペレーション: ジャーニー内で追跡されるユーザーオペレーション
- ビュー: 選択したオペレーションに関連付けられた個別の RUM ビュー (ページまたは画面)

#### サマリーメトリクス {#summary-metrics}

サマリーカードには、現在の選択範囲に対するフロントエンドの全体的な影響が強調表示されます。各カードには、選択したタイムフレームの値と、前の期間と比較した変化が表示されます。

- ユーザー: 選択したジャーニーでアクティブな個別のユーザー数 (`usr.id`)。
- アカウント: 選択したジャーニーでアクティブな個別のアカウント数 (`account.id`)。
- リクエスト: このサービスに関連付けられたフロントエンドリクエスト数。
- 平均コンバージョン率: 選択したジャーニー全体における平均コンバージョン率。
- p95 レイテンシー: フロントエンドで発生した 95 パーセンタイルレイテンシー。
- エラー率: エラーが発生したフロントエンドリクエストの割合。

#### Product Analytics のリッチ化 {#product-analytics-enrichment}

[Product Analytics][25] を使用している場合、Frontend Activity タブには、影響を受けたユーザーやアカウントに関する詳細情報が表示されます。これにより、サービスが低下した際に誰が影響を受けているかというコンテキストを把握し、ビジネスへの影響度に基づいて作業の優先順位を付けるのに役立ちます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/glossary/
[2]: /ja/tracing/services/resource_page/
[3]: /ja/monitors/types/apm/
[4]: /ja/tracing/error_tracking/
[5]: /ja/service_level_objectives/
[6]: /ja/incident_response/incident_management/
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
[18]: /ja/security/application_security/how-it-works/
[19]: https://www.datadoghq.com/blog/datadog-watchdog-insights-log-management/
[21]: /ja/database_monitoring/connect_dbm_and_apm/
[22]: /ja/cloud_cost_management/
[23]: https://app.datadoghq.com/services
[24]: /ja/profiler/guide/solve-memory-leaks/
[25]: /ja/real_user_monitoring/
[26]: /ja/product_analytics/