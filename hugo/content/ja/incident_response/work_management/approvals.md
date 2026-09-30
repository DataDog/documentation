---
aliases:
- /ja/incident_response/case_management/approvals/
further_reading:
- link: /incident_response/work_management/automation_rules
  tag: ドキュメント
  text: 作業項目の自動化ルール
- link: /incident_response/work_management
  tag: ドキュメント
  text: 作業管理
title: 作業項目の承認
---
## 概要 {#overview}

作業項目の承認機能は変更管理ワークフローをサポートするも機能で、作業項目に対してアクションを実行する前に 1 人以上のチームメンバーから承認を得ることができます。この機能は、すべての標準およびカスタム作業タイプで使用できます。すべての承認アクティビティは、作業項目のアクティビティタイムラインで追跡されます。

## 承認依頼 {#requesting-approvals}

作業項目で承認を依頼するには、次の手順を実行します。
1. 作業項目から、右側にある **More Options** アイコンをクリックします。
1. **Request approval** を選択します。
1. **Add reviewer** ドロップダウンを使用して、1 人以上のユーザーを選択します。
1. (オプション) **Describe your request** フィールドにメッセージを入力します。
1. **Request** をクリックします。

**注**: レビュー担当者が応答した後は、依頼を編集できません。

承認を依頼すると、作業項目の詳細パネルに **Reviewers** セクションが表示されます。各レビュー担当者の名前と現在のステータス (依頼済み、承認済み、または却下済み) が表示されます。レビュー担当者リストを変更するには、**Reviewers** の横にある編集アイコンをクリックします。すべての承認イベントは、作業項目のアクティビティタイムラインに記録されます。

### Notifications {#notifications}

- 承認が依頼されると、承認者にメールで通知されます。
- 承認または却下を受け取るたびに、依頼者に通知されます。

### 権限 {#permissions}

| アクション | 必要な権限 |
|---|---|
| 作業項目の承認を依頼する | ケースの書き込み |
| 作業項目の承認者として追加される | ケースの読み取り |
| 作業項目を承認または却下する | ケースの読み取り |

詳細については、[Datadog ロール権限][2] を参照してください。

## 自動化ルール {#automation-rules}

作業項目の承認イベントに基づいて、作業項目の自動化ルールをトリガーできます。たとえば、すべての承認が完了した時点で作業項目のステータスを自動的に更新するワークフローをトリガーできます。

利用可能なトリガーは以下のとおりです。
- 作業項目の最初の承認、各承認、またはすべての承認
- 作業項目の最初の却下または各却下

設定手順については、[作業項目の自動化ルール][1] を参照してください。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/incident_response/work_management/automation_rules
[2]: /ja/account_management/rbac/permissions/#case-and-incident-management