---
aliases:
- /ja/cloud_cost_management/budgets/
description: Cloud Cost Management でコストの取り込みを開始したら、予算を設定し、それに対する追跡状況を可視化します。
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: ブログ
  text: Datadog Cloud Cost Management で OCI のコストを管理および最適化する
- link: https://www.datadoghq.com/blog/cloud-cost-management-budget-forecasting/
  tag: ブログ
  text: Datadog 予算予測を使用してクラウドコストを予測および管理する
title: 予算
---
## 概要{#overview}
予算を設定し、エンジニアリングチームが予算に対する追跡状況を可視化できるようにします。

予算には 2 つのタイプを作成できます。

- {{< ui >}}Basic{{< /ui >}}: クラウドコストを追跡するための、フラットな単一レベルの予算。
- {{< ui >}}Hierarchical{{< /ui >}}: 組織の構造を反映した方法でコストを追跡するための、2 レベルの親/子予算。たとえば、組織が多くのチームで構成される部門を持っている場合、部門 (親) とチーム (子) のレベルで予算を立て、両方のレベルで予算の健全性を追跡できます。さらに、このオプションを使用すると、複数の予算を作成する必要なく、単一の予算を作成できます。

## 予算を設定する {#set-up-budgets}

{{< tabs >}}
{{% tab "基本" %}}

基本予算を作成するには、

1. [**Cloud Cost > Plan > Budgets**][1] に移動するか、[API][2] または [Terraform][3] を使用して予算を作成します。
1. [{{< ui >}}New Budget{{< /ui >}}] をクリックします。
1. {{< ui >}}Basic{{< /ui >}} をクリックして、基本予算を作成します。
1. 予算情報は、{{< ui >}}uploading a CSV{{< /ui >}}により、UI で提供されているテンプレートを使用するか、{{< ui >}}enter your budget directly{{< /ui >}}で、以下の詳細を使用して追加できます。

   {{< img src="cloud_cost/budgets/budget-create-basic-1.mp4" alt="CSV をアップロードして予算情報を追加するか、UI 内で直接入力するかを選択します。" video="true">}}

   - {{< ui >}}Budget Name{{< /ui >}}: 予算の名前を入力します。
   - {{< ui >}}Start Date{{< /ui >}}: 予算の開始日を入力します (過去の月を指定することも可能です)。予算は月単位で設定されます。
   - {{< ui >}}End Date{{< /ui >}}: 予算の終了日を設定します (未来の日付も指定可能です)。
   - {{< ui >}}Provider(s){{< /ui >}}: AWS、Azure、Google Cloud、Oracle Cloud、またはその他の SaaS (Datadog やカスタムコストを含む) の任意の組み合わせで予算を設定します。
   - {{< ui >}}Dimension to budget by{{< /ui >}}: 追跡するディメンション (チーム、サービス、環境など) を指定します。次に、予算テーブルで特定の値を直接定義します。たとえば、上位 4 チームの予算を作成するには、ディメンションとして「チーム」を選択し、テーブルに行としてチームを追加します。既存のタグ値を選択するか、新しいタグ値を追加して、将来の支出を追跡できます。

1. テーブル内のすべての予算を入力してください。最初の月の値を残りの月に適用するには、行の最初の列に値を入力し、{{< ui >}}copy{{< /ui >}} ボタンをクリックします。

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="予算作成ビュー: 予算の詳細を入力します。" style="width:100%;" >}}

1. [{{< ui >}}Save{{< /ui >}}] をクリックします。

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /ja/api/latest/cloud-cost-management/#create-or-update-a-budget
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/cost_budget

{{% /tab %}}

{{% tab "階層型" %}}

階層型予算を作成するには、

1. [**Cloud Cost > Plan > Budgets**][1] に移動するか、[API][2] を通じて予算を作成します。
1. [{{< ui >}}New Budget{{< /ui >}}] をクリックします。
1. {{< ui >}}Hierarchical{{< /ui >}} をクリックして、階層型予算を作成します。
1. 以下の詳細を使用して予算情報を入力してください。

   - {{< ui >}}Budget Name{{< /ui >}}: 予算の名前を入力します。
   - {{< ui >}}Start Date{{< /ui >}}: 予算の開始日を入力します (過去の月を指定することも可能です)。予算は月単位で設定されます。
   - {{< ui >}}End Date{{< /ui >}}: 予算の終了日を設定します (未来の日付も指定可能です)。
   - {{< ui >}}Scope to Provider(s){{< /ui >}}: AWS、Azure、Google Cloud、Oracle Cloud、またはその他の SaaS (Datadog やカスタムコストを含む) の任意の組み合わせで予算を設定します。
   - {{< ui >}}Parent Level{{< /ui >}}: 親レベルのタグを選択してください。
   - {{< ui >}}Child Level{{< /ui >}}: 子レベルのタグを選択してください。
   - {{< ui >}}Dimension to budget by{{< /ui >}}: 追跡するディメンション (チーム、サービス、環境など) を指定します。次に、予算テーブルで特定の値を直接定義します。たとえば、上位 4 チームの予算を作成するには、ディメンションとして「チーム」を選択し、テーブルに行としてチームを追加します。既存のタグ値を選択するか、新しいタグ値を追加して、将来の支出を追跡できます。

1. テーブル内のすべての予算を入力してください。最初の月の値を残りの月に適用するには、行の最初の列に値を入力し、{{< ui >}}copy{{< /ui >}} ボタンをクリックします。

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="予算作成ビュー: 予算の詳細を入力します。" style="width:100%;" >}}

1. [{{< ui >}}Save{{< /ui >}}] をクリックします。

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /ja/api/latest/cloud-cost-management/#create-or-update-a-budget

{{% /tab %}}
{{< /tabs >}}

## 予算ステータスを表示 {#view-budget-status}
[予算ページ][1]には、組織のすべての予算が一覧表示され、予算の作成者、予算を超過した予算、
その他の関連情報が強調表示されます。{{< ui >}}View Performance{{< /ui >}} をクリックして予算を確認し、予算を超過している原因を把握します。

   {{< img src="cloud_cost/budgets/budget-list-1.png" alt="すべての予算を一覧表示する">}}

個別の予算の {{< ui >}}View Performance{{< /ui >}} ページでは、左上からビューオプションを切り替えます。

<div class="alert alert-info">
コストメトリクスは 15 か月間保持されるため、15 か月より前の予算と実績を表示することはできません。
</div>

- {{< ui >}}current month{{< /ui >}} の予算ステータスを確認できます。

   {{< img src="cloud_cost/budgets/budget-status-month-2.png" alt="Budget Status View: 当月を確認">}}

- または、{{< ui >}}entire duration (all){{< /ui >}} の予算ステータスを確認できます。

   {{< img src="cloud_cost/budgets/budget-status-all-2.png" alt="Budget Status View: 予算合計を確認">}}

予算を確認するには、
1. 個別の予算ページで、上部のドロップダウンを使用して予算をフィルタリングするか、テーブル内の {{< ui >}}Apply filter{{< /ui >}} をクリックして、予算を超過しているディメンションを確認します。
   {{< img src="cloud_cost/budgets/budget-investigate-3.png" alt="ドロップダウンフィルターまたはテーブルの [Apply Filter] オプションを使用して、予算を超過しているディメンションを確認します。">}}
2. {{< ui >}}Copy Link{{< /ui >}} をクリックして予算を他のユーザーと共有し、予算を超過している原因の把握に役立てます。または、予算を財務部門と共有して、予算に対する進捗状況を把握してもらいます。

## 予算を変更または削除する {#modify-or-delete-a-budget}
予算を変更するには、予算ページの編集アイコンをクリックします。

{{< img src="cloud_cost/budgets/budget-edit-1.png" alt="編集アイコンをクリックして、予算を変更します。"  style="width:70%;">}}

予算を削除するには、予算ページのゴミ箱アイコンをクリックします。

{{< img src="cloud_cost/budgets/budget-delete-2.png" alt="削除アイコンをクリックして予算を削除します"  style="width:70%;">}}

## 予算をダッシュボードに追加する {#add-a-budget-to-a-dashboard}

予算をダッシュボードに追加するには、次の 2 つの方法があります。

- 予算レポートを作成し、[{{< ui >}}Share{{< /ui >}}] > [{{< ui >}}Save to dashboard{{< /ui >}}] をクリックします。

  {{< img src="cloud_cost/budgets/budget-share-from-dashboard.png" alt="[Share] をクリックし、[Save to dashboard] を選択して、予算レポートをダッシュボードに追加します。"  style="width:100%;">}}

- ダッシュボードから、{{< ui >}}Budget Summary{{< /ui >}} ウィジェットを追加します。

  {{< img src="cloud_cost/budgets/budgets-widgets.png" alt="任意のダッシュボードから [Budget Summary] ウィジェットを検索して追加します。"  style="width:100%;">}}

## 予算のアラートを作成する {#create-an-alert-for-your-budget}

[予算ベースのモニター][2]を作成して、実際の支出または予測支出が予算の一定の割合を超えると予測された場合にアラートを送信します。

## 予算の予測を確認する {#view-forecasts-in-budgets}

予算カードには、予測情報が利用可能な場合、自動的に各予算期間の予測コストが表示されます。予測コストが予算を超過すると見込まれる場合、予算ステータスに {{< ui >}}Projected Over{{< /ui >}} が表示され、予算超過前に対応できます。

予算の詳細な予測情報を確認するには、{{< ui >}}View Performance{{< /ui >}} をクリックし、{{< ui >}}Show Forecast{{< /ui >}} をオンにして、予測コストと実際の支出を並べて表示します。

[予測][3]の仕組みとデータ要件について詳しく確認します。

## 予算予測をカスタマイズする {#customize-your-budget-forecast}

Datadog は各予算に対して **Bits 予測**を自動的に生成し、過去の支出に基づいて将来のコストを予測します。計画している製品のリリース、移行、季節的な需要、廃止したワークロードなど、Bits 予測では考慮できない情報がある場合は、独自の値で上書きできます。この上書きを**カスタム予測**と呼びます。

カスタム予測値は次のとおりです。

- `ccm_forecast_write` 権限で編集できます ([権限](#permissions)を参照)。
- 当月および将来の月について編集できます。

[階層型予算](#set-up-budgets)の場合、カスタム予測値は子レベルで編集します。親レベルには、子レベルの合計が反映されます。

カスタム値を設定すると、予算ステータスページ、予算ページの予測合計、および[予算モニター][2]では、Bits 予測よりもカスタム値が優先されます。

### カスタム予測値を追加または編集する {#add-or-edit-custom-forecast-values}

{{< tabs >}}
{{% tab "予算を作成する場合" %}}

1. [予算の設定](#set-up-budgets)の手順に従って、予算の作成を開始します。
1. {{< ui >}}Customize Bits Forecast{{< /ui >}} を切り替えて、予算列の間に予測列を表示します。各月には、{{< ui >}}Budget{{< /ui >}} 列と {{< ui >}}Forecast{{< /ui >}} 列が表示されます。

  {{< img src="cloud_cost/budgets/cust-fcst-during-create.png" alt="[Customize Bits Forecast] を切り替えて、予測列を表示します。" style="width:100%;">}}

1. 各予測セルには、Bits 予測がグレーのプレースホルダーとして表示されます。上書きする金額を入力します。負の値は使用できません。

   編集するとプレビューチャートが更新されるため、保存前に最終的な予測を確認できます。

  {{< img src="cloud_cost/budgets/cust-fcst-during-create-table.png" alt="[Customize Bits Forecast] を切り替えて、予測列を表示します。" style="width:100%;">}}

1. [{{< ui >}}Save{{< /ui >}}] をクリックします。

{{% /tab %}}
{{% tab "予算を編集する場合" %}}

1. [予算ページ][1]で、予算の編集アイコンをクリックします。

   `ccm_forecast_write`権限がある場合、予測列が自動的に表示されます。各予測セルには、保存した上書き値が表示されます。上書き値がない場合は、Bits 予測が灰色のプレースホルダーとして表示されます。

1. 任意の予測セルに金額を入力または変更します。負の値は使用できません。
1. 上書き値を元の自動値と比較するには、{{< ui >}}Show Bits AI forecast{{< /ui >}} を切り替えて、各予測列の横に読み取り専用の Bits AI 列を表示します
1. [{{< ui >}}Save{{< /ui >}}] をクリックします。

[1]: https://app.datadoghq.com/cost/plan/budgets

{{% /tab %}}
{{< /tabs >}}

編集中は、各予測セルの表示で状態を確認できます。

| セルの表示| 意味|
|---|---|
| 灰色のテキスト| Bits 予測のプレースホルダー: このセルには上書き値が設定されていません。|
| 黒色のテキスト| 保存済みのカスタム予測値。|
| 青い枠線付きの黒色のテキスト| 入力したものの、まだ保存していない上書き値。|

上書き値を削除するには、セルをクリアします。セルは灰色の Bits 予測プレースホルダーに戻ります。

<div class="alert alert-info">Datadog は最初に予算を保存し、次にカスタム予測を保存します。予算は保存されたもののカスタム予測が保存されなかった場合は、編集ページから再試行するよう通知が表示されます。</div>

### カスタム予測の使用方法 {#how-custom-forecasts-are-used}

- **予算ステータス**: 予算ステータスページおよび予算ページの予測合計には、カスタム予測が含まれます。
- **予算モニター**: [予算モニター][2]の評価時にカスタム予測が存在する場合は、Bits 予測よりもカスタム予測が優先されます。
- **CSV エクスポート**: 予算を CSV としてダウンロードすると、設定されているカスタム予測値が含まれます。
- **予算の削除**: 予算を削除すると、それに関連付けられているカスタム予測値も削除されます。

## 権限 {#permissions}

| アクション | 必要な権限 |
|--------|---------------------|
| 予算を表示 | `cloud_cost_management_read` |
| 予算の作成、編集、または削除 | `ccm_budget_write` |
| カスタム予測値の編集 | `ccm_forecast_write` |

CCM 権限の全リストについては、[権限ドキュメント][4]を参照してください。

## 関連資料{#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /ja/cloud_cost_management/cost_changes/monitors/
[3]: /ja/cloud_cost_management/planning/forecasting
[4]: /ja/cloud_cost_management/setup/permissions