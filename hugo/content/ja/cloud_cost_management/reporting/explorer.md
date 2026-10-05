---
description: 柔軟なフィルターと可視化機能を使用して、Cloud Cost をリアルタイムでクエリおよび分析します。
further_reading:
- link: /cloud_cost_management/reporting/
  tag: ドキュメント
  text: コストレポートを作成して保存する
- link: /cloud_cost_management/tags/multisource_querying
  tag: ドキュメント
  text: 複数のプロバイダーにおけるコストをクエリする
- link: /monitors/types/cloud_cost/
  tag: ドキュメント
  text: コストモニターを作成する
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management について
title: コストエクスプローラー
---
## 概要 {#overview}

[Cloud Cost Explorer][1] は、[AWS][2]、[Azure][3]、[Google Cloud][4]、[Oracle][5]、[SaaS プロバイダー][6]、および [Datadog コスト][7] にわたるクラウド支出を分析するための、インタラクティブなクエリベースのインターフェースを提供します。保存されたレポートとは異なり、Explorer では、柔軟なクエリ、フィルター、可視化機能を使用してアドホック分析を実行し、コストの傾向を調査したり、異常を特定したり、クラウド支出に関する特定の質問に回答したりできます。

Cloud Cost Explorer を使用して、次のことを行います。
- タグ、サービス、フィルターを使用して、複数のプロバイダーにわたるカスタムクエリを作成する
- 柔軟なグループ化と内訳を使用して、時間の経過に伴うコストの変化を調査する
- データをダウンロードしたり、ダッシュボードウィジェットを作成したり、コストモニターを設定したりする

## コストデータをクエリする {#query-your-cost-data}

1. Datadog で [**Cloud Cost > Analyze > Explorer**][1] に移動します。
2. クエリエディターまたはドロップダウンフィルターを使用して、検索クエリを作成します。
   - {{< ui >}}Provider{{< /ui >}} ドロップダウンを使用して、1 つ以上のクラウドプロバイダーを選択する
   - {{< ui >}}\+ Filter{{< /ui >}} をクリックして、サービス、タグ、リージョン、チーム、その他の属性のフィルターを追加する
   - 検索バーに直接入力して、より高度なクエリを実行する

   {{< img src="cloud_cost/reporting/reporting-overview-1.png" alt="プロバイダーの選択、コストタイプフィルター、タグ検索、サービスフィルター、グループ化オプションが表示された Cloud Cost Explorer クエリビルダー" style="width:100%;" >}}

3. {{< ui >}}Group by{{< /ui >}} をクリックして、次のようなディメンションを選択し、コストデータをグループ化します。
   - プロバイダー名
   - サービス名
   - リソースタグ (`team`、`env`、`project` など)
   - リージョン
   - アカウント ID

4. 時間ピッカーを使用して期間を選択し、さまざまな期間 (時間、日、週、月、またはカスタム範囲) におけるコストを分析します。

**注**: 複数のプロバイダーにわたってコストをクエリする場合、リソースレベルのタグは使用できません。リソース固有のタグにアクセスするには、クエリで単一のプロバイダーにフィルタリングしてください。

## コスト変更の概要サイドパネル {#cost-change-summary-side-panel}

Explorer の下部にあるテーブルの任意の行をクリックすると、その特定のプロバイダー、サービス、またはリソースの {{< ui >}}Cost Change Summary panel{{< /ui >}} が開きます。このパネルでは、現在の期間と以前の期間を比較して、コスト変動の要因となっているものや人物を強調表示します。

パネルには、次の 4 つの一般的なセクションが含まれています。
- コスト変更の概要
- 関連チーム
- 変更の詳細
- 詳細な調査

{{< img src="cloud_cost/reporting/cost-change-sidepanel.png" alt="コスト変更の概要パネルでは、現在の期間と以前の期間を比較して、コスト変動の要因となっているものや人物を強調表示します。" style="width:100%;" >}}

上部には、現在の期間の**合計コスト**と、以前の期間と比較したコストの変動額および変動率 (**何が起きたか**) が表示されます。

### 変更を調査する {#investigate-the-change}

{{< ui >}}Change Details{{< /ui >}} および {{< ui >}}Investigate Further{{< /ui >}} セクションを使用して、次のことを行います。

- **コストの異常を即座に特定する**: 過去のデータに基づいて計算された予期しないコストの偏差が自動的に赤色で強調表示されるため、重要な傾向に絞って調査を行うことができます。 
     
- **変更の要因を分析する**: コスト変動の原因が**使用量** (リソース数) の変化によるものか、**単価** (リソースあたりのコスト) の変化によるものかを簡単に特定できます。たとえば、以下のスクリーンショットでは、支出の変化は使用量ではなく単価の変動によって引き起こされています。リソース数は横ばいですが、リソースあたりのコストが上下することで、全体的なコストの変化が生じています。

{{< img src="cloud_cost/reporting/cloud-cost-spend-summary.png" alt="支出の変化は使用量ではなく単価の変動によって引き起こされている。リソース数は横ばいですが、リソースあたりのコストが上下することで、全体的なコストの変化が生じている" style="width:100%;" >}}

### コラボレーションと監視 {#collaborate-and-monitor}

- **担当チームに連絡する**:
  - {{< ui >}}Associated Team(s){{< /ui >}} セクションを確認し、コスト変化を引き起こしているリソースを所有するチームを特定します (`team:shopist` のようなタグから推測されます)。リストされているチーム (例: Shopist、Platform、Cloud-Networks) にフォローアップを行い、変化の完全なコンテキストを把握します。
  - {{< ui >}}Send Notebook{{< /ui >}} をクリックして、コスト調査の全コンテキストをチームと直接共有します。これにより、チームは調査結果の記録、注釈の追加、調査スレッドの追跡を行うことができます。

- **タグでフィルタリングする**:
  - {{< ui >}}Associated Tags{{< /ui >}} を使用して、コストの行項目に寄与しているすべてのタグを表示します。
  - タグの値 (`account:demo` や特定の `aws_account` など) をクリックして検索を絞り込み、Explorer 全体をフィルタリングして、そのタグを持つリソースのみを表示します。

- **モニターを作成する**:
  - Cloud Cost Monitor を設定して、次回同様の変化が発生した際にアラートを受け取れるようにします。[Cloud Cost Monitors][8] の詳細をご覧ください。

## 結果を絞り込む {#refine-your-results}

{{< ui >}}Refine Results{{< /ui >}} をクリックして、特定のコストパターンに焦点を当てるための高度なフィルタリングオプションにアクセスします。

   {{< img src="cloud_cost/reporting/refine-results.png" alt="Refine Results パネルには、Usage Charges Only、Complete Days Only、Total Cost、Dollar Change、Percent Change などのフィルタリングオプションが表示されます。" style="width:100%;" >}}

{{< ui >}}Complete Days Only{{< /ui >}}
: 不完全な可能性がある過去 2 日間のコストデータを除外します。正確な履歴分析を行うには、このオプションを使用します。

{{< ui >}}Total Cost{{< /ui >}}
: データをフィルタリングして、特定の金額範囲内のコストを表示します (例: 1,000 ドルを超えるコストのリソースのみを表示)。

{{< ui >}}Dollar Change{{< /ui >}}
: 指定した金額の変化範囲内のコスト変化のみを表示します (例: 500 ドル以上増加したサービスを表示)。

{{< ui >}}Percent Change{{< /ui >}}
: 指定したパーセンテージ範囲内のコスト変動のみを表示します (例: コストが 20% 以上増加したリソースを表示)。

## データビューを変更する {#change-data-views}

Cost Explorer は、コストデータを時系列グラフとテーブルの内訳で表示します。以下のビューから選択して、グラフのデータ表示方法を変更できます。

- {{< ui >}}Costs ($){{< /ui >}}: 時間経過に伴う合計コストをドルで表示する
- {{< ui >}}Change trends (%){{< /ui >}}: コストの変動をパーセンテージの増減として表示する
- {{< ui >}}Change trends ($){{< /ui >}}: コストの変動をドル単位の金額で表示する

{{< img src="cloud_cost/reporting/change-view.png" alt="ドル単位のコスト、パーセント単位の変動傾向、ドル単位の変動傾向の 3 つの表示オプションを示すドロップダウンメニュー" style="width:100%;" >}}

これらの表示を切り替えて、絶対値コストを追跡しているのか、コストの変動を調査しているのかを特定します。

### テーブル表示オプション {#table-display-options}

グラフの下には、選択されたグループ化 (プロバイダー、サービス名、タグなど) ごとにコストの内訳を表示するテーブルがあります。このデータの表示方法はカスタマイズ可能です。

{{< img src="cloud_cost/reporting/table-display-options.png" alt="サマリーおよび内訳表示モード、列の表示/非表示の切り替え、および上位の変更のみのフィルターを示すテーブル表示オプション" style="width:100%;" >}}

**表示モード**
- {{< ui >}}Summary{{< /ui >}}: すべての期間にわたる合計コストを表示し、全体像を把握する
- {{< ui >}}Breakdown{{< /ui >}}: 期間 (選択した時間範囲に応じて、日次、週次、または月次) ごとのコスト内訳を表示する

**フィルター**
- {{< ui >}}Top changes only{{< /ui >}}: このチェックボックスをオンにして、テーブルがフィルターされ、コストの増減が最も大きいリソースまたはサービスのみを表示する

**列の可視性**

テーブルの列を表示または非表示にして、重要なメトリクスにフォーカスします。
- {{< ui >}}Total{{< /ui >}}: 各リソースまたはサービスの合計集計コスト
- {{< ui >}}Dollar change trends{{< /ui >}}: 時間経過に伴うドル単位のコスト変動
- {{< ui >}}Change trends{{< /ui >}}: 時間経過に伴うパーセンテージベースのコスト変動

## エクスポートと共有 {#export-and-share}

エクスプローラーでコストを分析した後、次のことが可能になります。

### CSV にエクスポートする {#export-to-csv}
オフラインでの分析、レポート作成、または関係者との共有のためにコストデータをダウンロードします。{{< ui >}}Export{{< /ui >}} ボタンをクリックし、{{< ui >}}Download as CSV{{< /ui >}} を選択します。

### ダッシュボードウィジェットを作成する {#create-a-dashboard-widget}
現在のクエリをダッシュボードウィジェットとして保存し、他のメトリクスと並べてコストを監視します。
1. {{< ui >}}Export{{< /ui >}} をクリックし、{{< ui >}}Export to Dashboard{{< /ui >}} を選択します。
2. 既存のダッシュボードを選択するか、新規作成します。
3. ウィジェットのタイトルと設定をカスタマイズします。

### コストモニターを作成する {#create-a-cost-monitor}
現在のクエリに基づいてアラートを設定し、コストがしきい値を超えた場合や予期せず変化した場合に通知を受け取ります。
1. {{< ui >}}Export{{< /ui >}} をクリックし、{{< ui >}}Create Monitor{{< /ui >}} を選択します。
2. アラート条件 (例: コストが $10,000 を超えた場合や 20% 増加した場合など) を設定します。
3. 通知チャネル (メール、Slack、PagerDuty) を設定します。

[Cloud Cost Monitors][8] の詳細をご覧ください。

### クエリを共有する {#share-your-query}
ブラウザから URL をコピーして、現在のコストクエリをチームメンバーと共有します。URL には、すべてのフィルター、グループ化、および期間設定が含まれています。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/explorer
[2]: /ja/cloud_cost_management/aws/
[3]: /ja/cloud_cost_management/azure/
[4]: /ja/cloud_cost_management/google_cloud/
[5]: /ja/cloud_cost_management/oracle/
[6]: /ja/cloud_cost_management/saas_costs/
[7]: /ja/cloud_cost_management/datadog_costs/
[8]: /ja/monitors/types/cloud_cost/
[9]: /ja/cloud_cost_management/reporting/