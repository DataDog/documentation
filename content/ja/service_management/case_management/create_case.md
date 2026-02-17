---
further_reading:
- link: service_management/case_management/view_and_manage
  tag: ドキュメント
  text: ケースの表示と管理
title: ケースの作成
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-danger">
Case Management は現在、{{< region-param key=dd_datacenter code="true" >}} サイトでは利用できません。
</div>
{{% /site-region %}}

## 概要

ケースは[手動](#manual-case-creation)、Datadog 全体から[自動](#automatic-case-creation)、または API を使用した[プログラム](#api)によって作成できます。ケースには標準ケースとセキュリティケースの 2 種類があります。セキュリティシグナルと Sensitive Data Scanner から作成されたケースは、自動的にセキュリティケースになります。セキュリティケースには、標準ケースの機能に加えて、ケースをクローズする理由 (テスト、誤検知、一時的な例外) を指定するための必須フィールドがあります。

## 手動ケース作成

{{< img src="/service_management/case_management/create/manual_case_creation_cropped.png" alt="Case Management ページで New Case モーダルが開いている画面" style="width:100%;" >}}

[Case Management ページ][1]で、**New Case** をクリックします。
1. ケースを作成するプロジェクトを選択します。ケースは 1 つのプロジェクトにのみ所属できます。
1. ケースのタイトルを記入します。
1. オプションで、説明を追加します。
1. **Create Case** をクリックして完了します。

以下の製品から手動でケースを作成することもできます。

| 製品 | 手順    | 
| ------  | ----------- | 
| モニター | - [モニターステータスページ][2]で、必要に応じて時間範囲や特定のモニターグループに絞り込みます。次に、**Actions** ドロップダウンメニューをクリックし、**Create a Case** を選択します。<br>- Slack で、モニター通知の下にある **Create case** をクリックします。 |
| セキュリティシグナル | セキュリティシグナルをクリックして、サイドパネルを開きます。**Escalate Investigation** をクリックし、**Create a Case** を選択します。 |
| Error Tracking | Error Tracking の問題をクリックして、サイドパネルを開きます。次に、**Actions** をクリックして **Create a Case** を選択します。 |
| Watchdog | アラートをクリックしてサイドパネルを開きます。**Actions** ドロップダウンメニューをクリックし、**Create a Case** を選択します。 |
| Event Management (生のイベント) | イベントをクリックしてサイドパネルを開きます。**Actions** ドロップダウンメニューをクリックし、**Create a Case** を選択します。 |
| Cloud Cost Management | コスト勧告をクリックして、そのサイドパネルを開きます。次に、**Create case** をクリックします。 |
| Sensitive Data Scanner | 機密データスキャナーの問題の横にある **Create case** をクリックします。  |
| Slack  | Slack のモニター通知の下にある **Create Case** ボタンをクリックします。  |

## 自動ケース作成

Configure the following products to automatically create cases:
| Product | Instructions    | 
| ------  | ----------- | 
| Monitors | Navigate to the [Project Settings page][4], click **Integrations** > **Datadog Monitors**, and click on the toggle to get your @case-<project_handle>. <br><br> When creating a monitor, include `@case-{project_handle}` in the **Configure notifications and automations** section. Cases are automatically created when the monitor transitions to a different status. To only create cases for certain monitor transitions, use [conditional variables][3]. As an example, to create cases only when a monitor triggers, wrap the `@case` mention with `{{#is_alert}}` and `{{/is_alert}}`.<br><br> Toggle on **Auto-close cases when the monitor group resolves** to reduce manual cleanup.|
| Event Management (Correlations) | In Event Management, correlations configured to aggregate events from Datadog and third-party sources automatically create cases.   |
| Workflow Automation | 1. In a new or existing workflow, add a step in the Workflow builder and search for "Case Management."<br> 2. Select the **Create Case** action.<br> 3. If the workflow is configured to run based on a monitor or security signal trigger, add the relevant workflow triggers and ensure that you've added the workflow handle to the desired resources. For more information, see [Trigger a workflow][6].|
| Error Tracking | In Error Tracking, cases are automatically created when an issue is commented on or assigned. |

## API

[API エンドポイント][5]を使用してケースを作成できます。 

**注**: このエンドポイントを使用するには、`cases_write` の認可スコープが必要です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /ja/monitors/status/
[3]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/cases/settings
[5]: /ja/api/latest/case-management/#create-a-case
[6]: /ja/service_management/workflows/trigger/