---
aliases:
- /ja/service_management/case_management/create_case/
- /ja/incident_response/case_management/create_case/
further_reading:
- link: /incident_response/work_management/view_and_manage
  tag: ドキュメント
  text: ワークアイテムの表示と管理
- link: /incident_response/work_management/customization
  tag: ドキュメント
  text: ワークマネジメントのカスタマイズ
- link: https://www.datadoghq.com/blog/work-management/
  tag: ブログ
  text: Datadog Work Management で人間とエージェントの作業を一元化する
title: ワークアイテムを作成
---
## 概要 {#overview}

ワークアイテムは、[手動で](#manual-work-item-creation)作成したり、Datadog 全体から[自動的に](#automatic-work-item-creation)作成したり、API を使用して[プログラムで](#api)作成したりできます。ワークアイテムには、標準とセキュリティの 2 種類があります。Security シグナルおよび Sensitive Data Scanner から作成されたワークアイテムは、自動的に Security ケースになります。Security ワークタイプには、標準ワークタイプのすべての機能に加え、ワークアイテムをクローズする理由 (テスト、誤検知、または一度限りの例外) を指定するための必須フィールドがあります。

## 手動でのワークアイテム作成 {#manual-work-item-creation}

1. [ワークマネジメントページ][1]に移動します。
1. ワークアイテムを作成するプロジェクトを選択します。**注**: ワークアイテムは 1 つのプロジェクトにのみ属することができます。
1. **New Work Item** をクリックします。
1. ワークアイテムのタイトルを入力します。
1. [work type](#work-types) を選択します。
1. (任意) 説明を追加します。
1. **Create Work Item** をクリックして完了します。

以下の製品から手動でワークアイテムを作成することもできます。

| 製品 | 手順    |
| ------  | ----------- |
| モニター | - [モニター ステータスページ][2]で、必要に応じてモニターをスコープして期間や特定のモニターグループを指定します。次に、**More Actions** で、**Create a work item** をクリックします。<br>- Slack では、モニター通知の下にある **Create work item** をクリックします。|
| Security シグナル | シグナルの横にある **Cases** 列で、**Create Case** アイコンをクリックします。次に、開いた **Create Case** ウィンドウにワークアイテムの詳細を入力します。|
| Error Tracking | Error Tracking の問題をクリックして、サイドパネルを開きます。次に、**Actions** をクリックし、**Add a work item** を選択します。|
| Watchdog | アラートをクリックして、そのサイドパネルを開きます。**Actions** ドロップダウンメニューをクリックし、**Create a work item** を選択します。|
| Event Management (生のイベント) | イベントをクリックして、そのサイドパネルを開きます。**Actions** ドロップダウンメニューをクリックし、**Create a work item** を選択します。|
| Cloud Cost Management | コスト推奨をクリックして、そのサイドパネルを開きます。次に、**Create a work item** をクリックします。|
| Sensitive Data Scanner | Sensitive Data Scanner の問題の横にある **Create case** をクリックします。 |
| Slack | Slack のモニター通知の下にある **Create Work Item** ボタンをクリックします。 |

## ワークアイテムの自動作成 {#automatic-work-item-creation}

以下の製品を設定して、ワークアイテムを自動的に作成します。
| 製品 | 手順    |
| ------  | ----------- |
| モニター | [Project Settings ページ][4]に移動し、**Integrations** > **Datadog Monitors** をクリックして、トグルをクリックし、@case-<project_handle> を取得します。<br><br>モニターを作成する際、**Configure notifications and automations** セクションに `@case-{project_handle}` を含めます。モニターが別のステータスに移行すると、ワークアイテムが自動的に作成されます。特定のモニター移行に対してのみワークアイテムを作成するには、[条件変数][3]を使用します。例として、モニターがトリガーされたときのみワークアイテムを作成するには、`@case` メンションを ` で囲みます。{{#is_alert}}` and `{{/is_alert}}`.<br><br>**Auto-close work items when the monitor group resolves** をオンに切り替えて、手動によるクリーンアップを減らします。|
| Event Management (Correlations) | Event Management では、Datadog およびサードパーティソースからのイベントを集約するように構成された相関関係によって、ワークアイテムが自動的に作成されます。  |
| Workflow Automation | 1. 新規または既存のワークフローで、ワークフロービルダーにステップを追加し、「Case Management」を検索します。<br>2. **Create Case** アクションを選択します。<br>3. ワークフローがモニターまたはセキュリティシグナルのトリガーに基づいて実行されるように構成されている場合は、関連するワークフロートリガーを追加し、目的のリソースにワークフローハンドルを追加したことを確認してください。詳細については、[ワークフローをトリガーする][6]を参照してください。|
| Error Tracking | Error Tracking では、問題にコメントが追加されたり、問題が割り当てられたりすると、ワークアイテムが自動的に作成されます。|

## ワークタイプ {#work-types}

ワークアイテムを作成する際に、ワークタイプを追加します。すべてのワークタイプを、手動作成と自動作成の両方で構成できるわけではありません。たとえば、ワークアイテムを手動で作成する場合、`Standard`、`Security`、`Change Request`、`Event Management` のタイプのみを利用できます。

カスタムワークタイプを追加して有効にするには、[Work Management のカスタマイズ][7]を参照してください。

| ワークタイプ  | 説明                                                                 |
|------------------|-----------------------------------------------------------------------------|
| 標準 | 運用タスク、調査などに使用する汎用的なワークアイテムです。    |
| 変更リクエスト   | 計画済みまたは承認済みの変更を追跡するために、変更管理ワークフローで使用されます。  |
| Event Management | Event Management 製品と統合され、相関イベントを格納します。   |
| Security         | Security チームや製品が、調査やアラートを管理するために使用します。    |
| Error Tracking   | Error Tracking 製品にリンクされ、アプリケーションの問題の追跡と修正に使用されます。|
| カスタムタイプ      | カスタムワークタイプを追加します。詳細については、[Work Management のカスタマイズ][7]を参照してください。|

## API {#api}

[API エンドポイント][5]を使用してワークアイテムを作成します。

**注**: このエンドポイントには、`cases_write` 認可スコープが必要です。

<div class="alert alert-info">Work Management API エンドポイントは、 <code>case-management</code> 製品の以前の名称を反映した用語を使用しています。</div>

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/work
[2]: /ja/monitors/status/
[3]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/work/settings
[5]: /ja/api/latest/case-management/#create-a-case
[6]: /ja/actions/workflows/trigger/
[7]: /ja/incident_response/work_management/customization