---
algolia:
  tags:
  - funnel
aliases:
- /ja/real_user_monitoring/funnel_analysis
- /ja/real_user_monitoring/product_analytics/funnel_analysis
- /ja/product_analytics/journeys/funnel_analysis/
disable_toc: false
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: ドキュメント
  text: Analytics Explorer
- link: /product_analytics/charts/journey_paths/
  tag: ドキュメント
  text: ジャーニーパス分析
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: ラーニングセンター
  text: Product Analytics の利用を開始する
title: ファネル
---
## 概要 {#overview}

ファネル分析は、エンドツーエンドのジャーニーパスにおける主要なワークフロー全体のコンバージョン率を追跡し、ボトルネックを特定して対処するのに役立ちます。具体的には、以下のことが可能です。

- Web サイトのパフォーマンス低下により、ある時点で顧客が離れてしまったかどうかを確認する
- 新機能の追加に伴うコンバージョン率の変化を追跡する
- ワークフローに新しいステップを追加することで、ドロップオフ率にどのような影響があるかを評価する
- コンバージョンまでの平均時間を測定する
- ファネルの各ステップで個々のイベントをフィルタリングする
- エンドユーザーが異なるフローを通じて同じ結果を達成する場合があるため、特定のステップ内で複数のイベントを組み合わせる


## ファネルを構築する {#build-a-funnel}

ファネルを構築するには、[{{< ui >}}Product Analytics{{< /ui >}}][1] に移動し、[{{< ui >}}Create New{{< /ui >}} &gt; {{< ui >}}Funnel{{< /ui >}}][2] を選択します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_overview.png" alt="Product Analytics の [Create New] ダイアログで強調表示されているファネルオプション" style="width:100%;" >}}

ファネルを開始するユーザーステップを選択し、{{< ui >}}Add step{{< /ui >}} を使用して追加のステップを追加します。ファネル内でステップの順序を変更するには、ステップをドラッグ＆ドロップします。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_add_step_video.mp4" alt="[Add step] ボタンを使用して既存のファネルにステップを追加し、ドラッグ＆ドロップで新しいステップをファネル内の正しい位置に移動します。" video=true >}}


### フィルターを追加する{#add-filters}

ユーザーをファネル全体でフィルタリングすることも、特定のステップでフィルタリングすることもできます。

- ファネル全体にグローバルフィルターを適用するには、{{< ui >}}Filter by{{< /ui >}} を選択してオプションを選択します。

- 特定のステップでユーザーをフィルタリングするには、そのステップの**フィルターアイコン**を選択し、オプションを選択します。ステップでフィルタリングすると、そのステップに特定の制約を適用した場合にユーザーの行動がどのように変化するかを把握できます。たとえば、特定のデバイス、オペレーティングシステム、または地理的位置情報が、特定のステップでのコンバージョンにどのような影響を与えるかを確認できます。

### イベントを結合する {#combine-events}

単一のファネルステップ内で複数のイベントを結合して、エンドユーザーが異なるフローを通じて同じ結果を達成する場合に対応できます。イベントを結合する場合、含まれるイベントのいずれかによって、「または」ロジックでステップのコンバージョンをトリガーできます。結合されたステップのファネルチャートには、そのステップに含まれるすべてのイベントのデータが表示されます。

ステップに複数のイベントを追加するには、既存のイベントの横にある {{< ui >}}or{{< /ui >}} ボタンをクリックします。

### データを比較する {#compare-data}

{{< ui >}}Compare{{< /ui >}} を選択し、以下のオプションのいずれかを選択して、さまざまな方法でファネルデータを比較します。

{{< ui >}}By breakdown{{< /ui >}}: デバイスの種類や地理的位置情報など、特定の属性でデータをグループ化します。属性内の上位 (最も一般的な) 値または下位 (最も一般的でない) 値のどちらを表示するか、および含める値の数を調整することもできます。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_compare_by_country.png" alt="国別のコンバージョンソースの上位 5 つを表示するように設定された「比較」のブレークダウンビュー。" >}}

{{< ui >}}By property or segment{{< /ui >}}: 複数のユーザーセグメントまたはユーザー属性を並べて比較します。

- ユーザーセグメントを比較するには、比較するセグメントを選択します。
- ユーザー属性を比較するには、プロパティ (Browser Name や Country など) を選択し、比較する値 (Firefox、Chrome、Safari など) を選択します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_side_by_side.png" alt="選択した 5 つの Browser Name の値を並べて比較する、「プロパティまたはセグメントで比較」ビュー。" >}}

{{< ui >}}By time{{< /ui >}}: 期間ごとのコンバージョンデータを並べて比較します。

## コンバージョンに関するインサイトを絞り込む {#refine-conversion-insights}

ファネルページの情報をさらに分析することで、サイトがコンバージョンを促進する効果を把握できます。[コンバージョン](#conversion-computing-metrics)は、ユーザーがファネルで定義された最後のステップを完了したときに発生します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_conversion_dropdown.png" alt="ユニークコンバージョンまたは合計コンバージョンによる分析オプションを備えた、コンバージョン詳細設定のドロップダウン。" style="width:100%;" >}}

チャートサイドパネルの上にあるドロップダウンを使用して、さまざまなコンバージョン分析ビューを選択します。コンバージョン分析は、以下の方法で利用できます。

- {{< ui >}}Unique converted sessions{{< /ui >}}: すべてのステップが同じ `@session.id` で完了したコンバージョン。

- {{< ui >}}Unique converted users{{< /ui >}}: `@user.id` によって追跡される同一の個人ユーザーが、すべてのステップを完了したコンバージョン。

- {{< ui >}}Unique converted accounts{{< /ui >}}: `@account.id` によって追跡される同一のアカウントが、すべてのステップを完了したコンバージョン。この分析は、`@user.id` ファセットが保持される期間よりも長い期間にわたって、サインインしたユーザーによって完了されたコンバージョンを特定するのに役立ちます。

- {{< ui >}}Total conversions{{< /ui >}}: セッション、ユーザー、またはアカウント全体での合計コンバージョン。

- {{< ui >}}Time to convert{{< /ui >}}: セッション、ユーザー、またはアカウント別のコンバージョンの時系列表示。

どのコンバージョン分析ビューでも、コンバージョンを数または率で表示し、すべてのステップまたは個別のステップのデータを表示するように選択できます。ユーザーまたはアカウント別のコンバージョンビューでは、コンバージョンが発生するまでの期間を調整できます。

## コンバージョン計算メトリクス {#conversion-computing-metrics}

### Datadog がコンバージョンメトリクスを計算する方法 {#how-datadog-computes-conversion-metrics}
イベント `A → B → C` およびイベントステップ **A**、A、A、**B**、**C**、C を持つファネルを検討します。

この場合、Datadog は 1 件のコンバージョンとしてカウントします。各 **A** が独立した試行を開始します。3 つの試行すべてが同じ **C** イベントで完了するため、Datadog は最も早い試行のみをカウントします。

さらに説明すると、ユーザーがイベントシーケンス **A**、A、A、**B**、**C**、C、**A**、**B**、**C** を実行した場合、Datadog は 2 件のコンバージョンをカウントします。最初のコンバージョンはシーケンス **A**、A、A、**B**、**C** で完了し、2 番目のコンバージョンは続く **A**、**B**、**C** のシーケンスで完了します。

<div class="alert alert-info"> ファネルステップと一致しないアクションやビューは、ステップごとのコンバージョン率や全体的なコンバージョン率に影響しません。すべてのファネルステップがコンバージョンウィンドウ内で正しい順序で発生した場合、Datadog はそのセッションを 1 つのコンバージョン済みセッションとしてカウントします。</div>

Datadog は、各コンバージョンの最初と最後のステップ間の合計時間を、ステップの総数で割ることで、ステップ間の平均時間を計算します。

**ユーザー**または**アカウント**ごとにファネルを分析する場合、最初のイベントからの時間を基準に、時間または日数でコンバージョン期間を定義できます。コンバージョンのデフォルトの期間は 1 日 (カレンダー上の日付ではなく、24 時間のウィンドウ) で、コンバージョンが発生したかどうかを判断します。


### コンバージョンのカウント方法 {#conversion-counting-methods}

コンバージョンを計算する際、コンバージョンの可視化で **ユニーク** コンバージョンオプション (セッション、ユーザー、またはアカウント) または {{< ui >}}Total Conversion Count{{< /ui >}} オプションを選択して、コンバージョンのカウント方法を指定します。

- {{< ui >}}Unique{{< /ui >}}: セッション、ユーザー、またはアカウントごとに 1 回だけコンバージョンをカウントします。たとえば、ユーザーがファネルシーケンス `A → B → C` を同じセッション内で複数回完了した場合 (`A, B, C, A, B, C`)、それは **1 回のコンバージョン** としてカウントされます。

- {{< ui >}}Total{{< /ui >}}: 同じセッション ID、ユーザー、またはアカウントが定義されたファネルを完了するたびに、コンバージョンをカウントします。同じ例 (`A, B, C, A, B, C`) を使用すると、この方法では **2 回のコンバージョン** としてカウントされます。{{< ui >}}Total{{< /ui >}} 設定は、中間ステップが繰り返された回数ではなく、完了したフローをカウントします。


## 可視化方法を変更する {#change-the-visualization}
ステップイベントとコンバージョン測定を定義した後、別の可視化方法に切り替えて、アプリのユーザーコンバージョンをより深く理解できます。


{{< img src="product_analytics/journeys/funnel_analysis/funnel_visualization_video.mp4" alt="ドロップダウンを使用して、可視化を「ステップ」から「時系列」に変更します。" video=true >}}


### 時系列 {#timeseries}
ファネルを時系列で表示すると、コンバージョンの傾向を理解するのに役立ちます。コンバージョンをグラフ化する期間を選択でき、コンバージョンを絶対数または割合として表示できます。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_timeseries_view.png" alt="過去 1 週間の日次ユニークコンバージョンユーザーを表示するように構成された時系列の可視化。" style="width:80%;" >}}

### クエリ値 {#query-value}

クエリ値の可視化では、メトリクスの現在の値が表示されます。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_query_value.png" alt="過去 1 週間のユニークコンバージョンセッションの合計数を表示するように構成されたクエリ値の可視化。" style="width:80%;" >}}

### トップリスト {#top-list}

トップリストの可視化では、選択したメジャーに基づいてファセットの上位値を特定します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_top_list.png" alt="大陸別のコンバージョンソースの上位 4 つを表示するように構成されたトップリストの可視化。" style="width:80%;" >}}

## コンバージョンドライバーを表示する {#view-conversion-drivers}

ユーザーのコンバージョンや離脱についてより詳しく把握するには、ファネルのステップをクリックしてコンバージョン分析にアクセスします。

<div class="alert alert-info">コンバージョン分析はプレビュー版です。</div>

コンバージョンドライバー、ユーザージャーニー、コンバージョンや離脱に利用可能なユーザーリプレイ、ユーザー詳細を表示します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_side_panel.png" alt="ファネルのステップをクリックした後のサイドパネルビュー。コンバージョンドライバー、利用可能なリプレイ、コンバージョンしたユーザーが表示されます。" style="width:100%;" >}}

## ファネルを共有する {#share-a-funnel}

ファネルは [ダッシュボード][3] でチームと共有して、他のテレメトリメトリクスと合わせてコンバージョンを分析したり、[ノートブック][4] でレポートに使用したりできます。

可視化全体または個々のウィジェットを共有できます。

- 可視化全体を Notebooks やダッシュボードに共有します。

  {{< img src="product_analytics/journeys/funnel_analysis/funnels_share_export.png" alt="展開された可視化の共有オプション。PNG にエクスポートする追加オプションが表示されています。 " style="width:100%;" >}}

- ダッシュボードから個々のウィジェットを共有します。

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_dashboard.png" alt="ウィジェットの右上にあるエクスポートアイコンをクリックして、ウィジェットを共有します。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/
[2]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[3]: /ja/product_analytics/dashboards/
[4]: /ja/notebooks/