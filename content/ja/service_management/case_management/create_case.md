---
further_reading:
- link: service_management/case_management/view_and_manage
  tag: ドキュメント
  text: ケースの表示と管理
kind: ドキュメント
title: ケースの作成
---

## 概要

ケースは[手動](#manual-case-creation)または Datadog 全体から[自動](#automatic-case-creation)で作成できます。ケースには標準ケースとセキュリティケースの 2 種類があります。セキュリティシグナルと機密データスキャナーから作成されたケースは、自動的にセキュリティケースになります。セキュリティケースタイプには、標準ケースタイプのすべての機能に加えて、ケースをクローズする理由 (テスト、誤検出、1 回限りの例外) を指定するための必須フィールドがあります。

## 手動ケース作成

{{< img src="/service_management/case_management/create/manual_case_creation.png" alt="手動でケースを作成するための New Case モーダルが開かれた Case Management ページ" style="width:100%;" >}}

[Case Management ページ][1]で、**New Case** をクリックします。
1. ケースを作成するプロジェクトを選択します。ケースは 1 つのプロジェクトにのみ所属できます。
1. ケースのタイトルを記入します。
1. オプションで、説明を追加します。
1. **Create Case** をクリックして完了します。

以下の製品から手動でケースを作成することもできます。

| 製品 | 手順    | 
| ------  | ----------- | 
| ログ管理 | - [モニターステータスページ][2]で、オプションでモニターを時間枠と特定のモニターグループにスコープします。次に、**Escalate** ドロップダウンメニューをクリックし、**Create a case** を選択します。<br>- Slack で、モニター通知の下にある **Create case** をクリックします。 |
| セキュリティシグナル | セキュリティシグナルをクリックして、サイドパネルを開きます。**Escalate Investigation** ドロップダウンメニューをクリックし、**Create a Case** を選択します。 |
| ユーザーグループマッピング | Error Tracking の問題をクリックして、サイドパネルを開きます。次に、**Create a case** をクリックします。 |
| 接続 | アラートをクリックしてサイドパネルを開きます。**Escalate** ドロップダウンメニューをクリックし、**Create a case** を選択します。 |
| Event Management (生のイベント) | イベントをクリックしてサイドパネルを開きます。**Escalate** ドロップダウンメニューをクリックし、**Create a case** を選択します。 |
| Cloudflare アカウントを一覧表示する | コスト勧告をクリックして、そのサイドパネルを開きます。次に、**Create case** をクリックします。 |
| ヘルプ | 機密データスキャナーの問題の横にある **Create case** をクリックします。  |
| Slack  | Slack のモニター通知の下にある **Create Case** ボタンをクリックします。  |

## 自動ケース作成

以下の製品を構成して、ケースを自動的に作成します。
| 製品 | 説明    | 
| ------  | ----------- | 
| Monitors | モニターを作成するとき、**Notify your team** または **Say what's happening** セクションに `@case-{project_handle}` を含めてください。ケースはモニターが異なるステータスに遷移したときに自動的に作成されます。特定のモニター遷移に対してのみケースを作成するには、[条件変数][3]を使用します。例えば、モニターがトリガーしたときだけケースを作成するには、`@case` のメンションを `{{#is_alert}}` と `{{/is_alert}}` で囲みます。  <br><br> [Project Settings ページ][4]に移動し、**Integrations** > **Datadog Monitors** をクリックし、トグルをクリックして @case-<project_handle> を取得します。 |
| Event Management (相関) | Event Management では、Datadog とサードパーティのソースからのイベントを集計するように構成された相関が自動的にケースを作成します。   |
| Workflow Automation | 1. 新規または既存のワークフローで、Workflow ビルダーにステップを追加し、"Case Management" を検索します。<br> 2. **Create Case** アクションを選択します。<br> 3. ワークフローがモニターまたはセキュリティシグナルのトリガーに基づいて実行されるように構成されている場合、ワークフローハンドルを必要なリソースに追加します。|

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cases
[2]: /ja/monitors/manage/status/
[3]: /ja/monitors/notify/variables/?tab=is_alert#conditional-variables
[4]: https://app.datadoghq.com/cases/settings