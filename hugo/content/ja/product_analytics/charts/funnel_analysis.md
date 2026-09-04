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
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: ラーニングセンター
  text: Product Analytics の利用を開始する
title: ファネル分析
---
## 概要 {#overview}

ファネル分析は、主要なワークフロー全体のコンバージョン率を追跡し、エンドツーエンドのジャーニーパスにおけるボトルネックを特定して解消するうえで役立ちます。具体的には、次のことができます。

- Web サイトのパフォーマンスが低下したために、顧客が特定のポイントで離脱しているかどうかを確認する
- 新しい機能の構築に伴って、コンバージョン率が時間の経過とともにどのように変化するかを追跡する
- ワークフローに新しいステップを追加すると離脱率にどのような影響があるかを評価する
- コンバージョンまでの平均時間を測定する
- ファネルの各ステップで個別のイベントをフィルタリングする
- エンドユーザーが異なるフローを通じて同じ結果に到達する場合があるため、特定のステップ内で複数のイベントを組み合わせる


## ファネルを作成する {#build-a-funnel}

ファネルの作成を開始するには、[{{< ui >}}Product Analytics{{< /ui >}}][1] に移動し、[{{< ui >}}Create New{{< /ui >}} > {{< ui >}}Funnel{{< /ui >}}][2] に移動します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_overview.png" alt="Product Analytics の [Create New] (新規作成) ダイアログで強調表示されているファネルオプション" style="width:100%;" >}}

ファネルを開始するユーザーのステップを選択し、{{< ui >}}Add step{{< /ui >}} を使用してステップを追加します。ステップをドラッグアンドドロップして、ファネル内で並べ替えます。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_add_step_video.mp4" alt="[Add step] (ステップを追加) ボタンを使用して既存のファネルにステップを追加し、ドラッグアンドドロップを使用して新しいステップをファネル内の正しい場所に移動します。" video=true >}}


### フィルターを追加する {#add-filters}

ユーザーをファネル全体、または特定のステップに対してフィルタリングできます。

- グローバルフィルターをファネル全体に適用するには、{{< ui >}}Filter by{{< /ui >}} を選択して、任意のオプションを選択します。

- 特定のステップでユーザーをフィルタリングするには、そのステップの**フィルターアイコン**を選択してオプションを選択します。ステップでフィルタリングすると、特定の制約を設けた場合にユーザーの行動がどのように変化するかを把握できます。たとえば、特定のデバイス、オペレーティングシステム、または地理的位置が、特定のステップでのコンバージョンにどのような影響を与えるかを確認できます。

### イベントを組み合わせる {#combine-events}

単一のファネルステップ内で複数のイベントを組み合わせることで、エンドユーザーが異なるフローを通じて同じ結果に到達するケースを考慮できます。イベントを組み合わせる場合、「OR」ロジックを使用して、含まれているどのイベントでもステップのコンバージョンをトリガーできます。イベントを組み合わせたステップの Funnel Chart には、そのステップに含まれるすべてのイベントのデータが表示されます。

ステップに複数のイベントを追加するには、既存のイベントの横にある {{< ui >}}or{{< /ui >}} ボタンをクリックします。

### データを比較する {#compare-data}

{{< ui >}}Compare{{< /ui >}} を選択し、次のいずれかのオプションを選択して、さまざまな方法でファネルデータを比較します。

{{< ui >}}By breakdown{{< /ui >}}: デバイスタイプや地理的位置など、特定の属性でデータをグループ化します。属性内の上位 (最も一般的な) 値または下位 (最も一般的でない) 値を表示するかどうかや、含める値の数を調整することもできます。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_compare_by_country.png" alt="国別のコンバージョンソース上位 5 つを表示するように設定された、[Compare] (比較) の内訳表示。" >}}

{{< ui >}}By property or segment{{< /ui >}}: 複数のユーザーセグメントまたはユーザー属性を並べて比較します。

- ユーザーセグメントを比較するには、比較したいセグメントを選択します。
- ユーザー属性を比較するには、プロパティ ([Browser Name] (ブラウザ名) や [Country] (国) など) を選択し、比較したい値 (Firefox、Chrome、Safari など) を選択します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_side_by_side.png" alt="選択した 5 つのブラウザ名の値を並べて比較した、プロパティやセグメントによる比較表示。" >}}

{{< ui >}}By time{{< /ui >}}: 期間ごとのコンバージョンデータを並べて比較します。

## コンバージョンインサイトを絞り込む {#refine-conversion-insights}

ファネルページの情報をさらに分析して、サイトがコンバージョンを促進するうえでどの程度効果的に機能しているかを把握できます。[コンバージョン](#conversion-computing-metrics)は、ユーザーがファネルで定義された最後のステップを完了したときに発生します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_conversion_dropdown.png" alt="コンバージョン絞り込みドロップダウンの、ユニークコンバージョンまたは合計コンバージョンによる分析オプション。" style="width:100%;" >}}

チャートサイドパネルの上のドロップダウンを使用して、さまざまなコンバージョン分析ビューを選択できます。コンバージョン分析では、次の項目を利用できます。

- {{< ui >}}Unique converted sessions{{< /ui >}}: すべてのステップが同じ `@session.id` で完了したコンバージョン。

- {{< ui >}}Unique converted users{{< /ui >}}: `@user.id` で追跡される同一のユーザーが、すべてのステップを完了したコンバージョン。

- {{< ui >}}Unique converted accounts{{< /ui >}}: `@account.id` で追跡される同一アカウントが、すべてのステップを完了したコンバージョン。この分析は、`@user.id` のファセットが保持される期間よりも長い期間にわたって、サインインしたユーザーが完了したコンバージョンを特定するのに役立ちます。

- {{< ui >}}Total conversions{{< /ui >}}: セッション、ユーザー、またはアカウント全体での合計コンバージョン数。

- {{< ui >}}Time to convert{{< /ui >}}: セッション、ユーザー、またはアカウントごとのコンバージョンの時系列ビュー。

どのコンバージョン分析ビューでも、コンバージョンを数または割合で表示したり、すべてのステップまたは個別のステップのデータを表示したりできます。ユーザー別またはアカウント別のコンバージョンビューでは、コンバージョンが発生するまでの期間を調整できます。

## コンバージョン計算メトリクス {#conversion-computing-metrics}

### Datadog によるコンバージョンメトリクスの計算方法 {#how-datadog-computes-conversion-metrics}
イベント `A → B → C` で構成されるファネルで、イベントステップが **A**、A、A、**B**、**C**、C である場合を考えます。

この場合、Datadog はコンバージョンを 1 件としてカウントします。各 **A** が独立した試行を開始します。3 回の試行すべてが同じ **C** イベントで完了するため、Datadog は最も早く開始された試行のみをカウントします。

さらに、ユーザーが **A**、A、A、**B**、**C**、C、**A**、**B**、**C** 順序でイベントを実行した場合を考えます。この場合、Datadog は 2 件のコンバージョンをカウントします。最初のコンバージョンは **A**、A、A、**B**、**C** のシーケンスで完了し、2 件目のコンバージョンは **A**、**B**、**C** のシーケンスで完了します。

<div class="alert alert-info"> ファネルステップと一致しないアクションやビューは、ステップごとのコンバージョン率や全体的なコンバージョン率に影響を与えません。すべてのファネルステップがコンバージョン期間内に正しい順序で発生した場合、Datadog はそのセッションを 1 件のコンバージョンセッションとしてカウントします。</div>

Datadog は、各コンバージョンの最初のステップから最後のステップまでの合計時間をステップの総数で割ることで、ステップ間の平均時間を計算します。

**ユーザー**別または**アカウント**別にファネルを分析する場合、最初のイベントからのコンバージョン期間を時間または日数で定義できます。コンバージョンのデフォルトの期間は 1 日 (カレンダー上の日付ではなく、24 時間のウィンドウ) であり、この期間にコンバージョンが発生したかどうかを判断します。


### コンバージョンのカウント方法 {#conversion-counting-methods}

コンバージョンを計算する際は、**ユニーク**コンバージョンオプション (セッション、ユーザー、またはアカウント) を選択するか、コンバージョンの可視化で {{< ui >}}Total Conversion Count{{< /ui >}} オプションを選択して、コンバージョンのカウント方法を指定します。

- {{< ui >}}Unique{{< /ui >}}: セッション、ユーザー、またはアカウントごとに 1 回のみコンバージョンをカウントします。たとえば、ユーザーが同じセッション内で `A → B → C` のファネルシーケンスを複数回完了した場合 (`A, B, C, A, B, C`)、**1 件のコンバージョン**としてカウントされます。

- {{< ui >}}Total{{< /ui >}}: 同じセッション ID、ユーザー、またはアカウントが定義されたファネルを完了するたびにコンバージョンをカウントします。同じ例 (`A, B, C, A, B, C`) を使用すると、この方法では **2 件のコンバージョン**としてカウントされます。{{< ui >}}Total{{< /ui >}} 設定は、途中のステップが繰り返された回数ではなく、最後まで完了したフローをカウントします。


## 可視化の変更{#change-the-visualization}
ステップとコンバージョン測定を定義した後、別の可視化に切り替えて、アプリのユーザーコンバージョンをより深く理解することができます。


{{< img src="product_analytics/journeys/funnel_analysis/funnel_visualization_video.mp4" alt="ドロップダウンを使用して、可視化を [Steps] (ステップ) から [Timeseries] (時系列) に変更します。" video=true >}}


### 時系列{#timeseries}
ファネルを時系列で表示すると、コンバージョンの傾向を理解するのに役立ちます。コンバージョンのグラフに使用する期間を選択し、コンバージョンを絶対数または割合として表示できます。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_timeseries_view.png" alt="過去 1 週間の日次ユニークコンバージョン済みユーザーを表示するように構成された、時系列の視覚化。" style="width:80%;" >}}

### クエリ値 {#query-value}

クエリ値の視覚化は、メトリクスの現在の値を表示します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_query_value.png" alt="過去 1 週間のユニークコンバージョン済みセッションの合計数を表示するように構成された、クエリ値の視覚化。" style="width:80%;" >}}

### トップリスト {#top-list}

トップリストの視覚化は、選択した指標に基づいてファセットの上位の値を特定します。

{{< img src="product_analytics/journeys/funnel_analysis/funnel_top_list.png" alt="大陸別のコンバージョンソース上位 4 つを表示するように構成された。トップリストの視覚化。" style="width:80%;" >}}

## コンバージョン要因とジャーニーパスを表示する {#view-conversion-drivers-and-journey-paths}

ユーザーのコンバージョンや離脱に関する詳細なコンテキストを得るには、ファネルのステップをクリックして、コンバージョン分析とジャーニーパスにアクセスします。

<div class="alert alert-info">コンバージョン分析はプレビュー版です。</div>

- **コンバージョン分析**: コンバージョン要因、ユーザーのジャーニー、コンバージョンや離脱に関する利用可能なユーザーリプレイ、およびユーザーの詳細を表示します。

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_analysis_side_panel.png" alt="ファネルのステップをクリックした後のサイドパネルビュー。コンバージョン要因、利用可能なリプレイ、コンバージョン済みユーザーが表示されます。" style="width:100%;" >}}

- **ジャーニーパス**: 選択したステップシーケンスのコンバージョンおよび離脱ユーザーパスを表示します。これには、ファネル外の他のステップへの分岐パスも含まれます。

  {{< img src="product_analytics/journeys/funnel_analysis/funnel_journey_paths.png" alt="ファネルのステップ 1 の後に続く、上位 5 つの離脱パスを示すジャーニーパス。" style="width:100%;" >}}

## ファネルを共有する {#share-a-funnel}

ファネルは、[ダッシュボード][3]でチームと共有して他のテレメトリメトリクスと併せて分析したり、[Notebooks][4] で共有してレポートに使用したりできます。

視覚化全体または個々のウィジェットを共有できます。

- 視覚化全体を Notebooks やダッシュボードに共有する

  {{< img src="product_analytics/journeys/funnel_analysis/funnels_share_export.png" alt="展開された視覚化の共有オプションで、[Export to PNG] (PNG へのエクスポート) という追加オプションが表示されている " style="width:100%;" >}}

- ダッシュボードから個別のウィジェットを共有する

  {{< img src="product_analytics/journeys/funnel_analysis/pana_funnel_share_dashboard.png" alt="ウィジェットの右上にあるエクスポートアイコンをクリックして、ウィジェットを共有する" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/
[2]: https://app.datadoghq.com/product-analytics/user-journey/funnel
[3]: /ja/product_analytics/dashboards/
[4]: /ja/notebooks/