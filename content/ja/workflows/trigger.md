---
disable_toc: false
further_reading:
- link: /workflows/service_accounts/
  tag: ドキュメント
  text: ワークフローのサービスアカウントについての詳細はこちら
- link: dashboards
  tag: ドキュメント
  text: ダッシュボードの設定についての詳細はこちら
- link: security/explorer
  tag: ドキュメント
  text: セキュリティシグナルの詳細はこちら
- link: モニター
  tag: ドキュメント
  text: モニターの詳細はこちら
is_beta: true
kind: documentation
title: ワークフローをトリガーする
---

{{< callout url="https://forms.gle/VEjerYVQ2QJhauZ57" >}}
  Workflows は公開ベータ版です。フィードバックや質問がある場合は、<a href="/help">Datadog サポート</a>にご連絡ください。
{{< /callout >}}

ワークフローは、手動でトリガーすることもできますし、定期的なスケジュール、Datadog モニター、セキュリティシグナル通知ルールなど、さまざまな自動化された方法を使用してトリガーすることも可能です。自動ワークフローをトリガーする前に、ワークフローを一意のサービスアカウントと関連付ける必要があります。サービスアカウントの詳細については、[Workflows のサービスアカウント][1]を参照してください。

## ワークフローを手動でトリガーする

ワークフローを手動でトリガーするには
1. ワークフローページから、**Run** をクリックします。
1. 既存のトリガー変数の値を入力します。
1. ワークフローを実行する準備ができたら、**Save & Run** をクリックします。

## ワークフローをダッシュボードから手動でトリガーする

ダッシュボードからワークフローをトリガーするには、**Run Workflow** ウィジェットを追加します。
1. ダッシュボードから、**Add Widget** をクリックします。
1. `workflows` を検索して、**Run Workflow** ウィジェットを追加します。
1. **Select the workflow** の下にあるドロップダウンメニューから、ワークフローを探します。
1. ウィジェットのタイトルを入力し、**Save** をクリックします。

{{< img src="workflows/trigger-from-dashboard.png" alt="Run Workflow をクリックすると、ダッシュボードウィジェットからワークフローをトリガーすることができます。" >}}

ワークフローを実行するには
1. ダッシュボードウィジェットの **Run Workflow** をクリックします。
1. **Execution parameters** の下に、ワークフローに必要なトリガー変数を入力します。
1. ワークフローを実行するには、**Run** をクリックします。

## ワークフローをモニターからトリガーする

ワークフローをモニターからトリガーするには
1. ワークフローキャンバスで、**Add an Automated Trigger** をクリックし、**@mention** を選択します。
1. **Create** をクリックすると、サービスアカウントが作成されます。詳しくは、[Workflows のサービスアカウント][1]を参照してください。
1. **@workflow-** の横に、トリガーのメンション名を入力します。メンション名は一意でなければなりません。
1. ワークフローを保存します。
1. Datadog の [**Monitors** ページ][2]に移動します。
1. ワークフローのトリガーに使用するモニターを検索して編集するか、新しいモニターを作成します。
1. メッセージセクションに、ワークフローの完全なメンション名を追加します。
   - メンション名は `@workflow-` で始まる必要があります。例えば、`@workflow-my-workflow` のようになります。
   - ワークフローにトリガー変数を渡すには、カンマで区切ったリストで `@workflow-name(key=value, key=value)` という構文を使用します。例えば、`@workflow-my-workflow(name="Bits", alert_threshold=threshold)` のようになります。
1. モニターを保存。

{{< img src="workflows/monitor-trigger.png" alt="モニタートリガーをモニターのメッセージセクションに追加する" >}}

モニターのしきい値に達するたびに、モニターはワークフローの実行をトリガーします。

## ワークフローをセキュリティシグナルの通知ルールからトリガーする

セキュリティシグナルの通知ルールが発動するたびにトリガーされるワークフローを設定することができます。

ワークフローを通知ルールからトリガーするには
1. ワークフローキャンバスで、**Add an Automated Trigger** をクリックし、**@mention** を選択します。
1. **Create** をクリックすると、サービスアカウントが作成されます。詳しくは、[Workflows のサービスアカウント][1]を参照してください。
1. **@workflow-** の横に、トリガーのメンション名を入力します。メンション名は一意でなければなりません。
1. ワークフローを保存します。
1. [Setup & Configuration][3] ページから、ワークフローのトリガーとなる検出ルールを探すか、新しいルールを作成します。
1. **Recipient** セクションに、ワークフローの完全なメンション名を追加します。例えば、`@workflow-my-workflow` のようになります。
1. **Save and Activate** をクリックします。

{{< img src="workflows/notification-rule-trigger.png" alt="通知ルールの受信者セクションにワークフロー名を追加する" >}}

通知ルールが発動するたびに、ワークフローの実行がトリガーされます。

## ワークフローをスケジュールでトリガーする

ワークフローの実行をスケジュールするには
1. ワークフローキャンバスで、**Add an Automated Trigger** をクリックし、**Schedule** を選択します。
1. **Create** をクリックすると、サービスアカウントが作成されます。詳しくは、[Workflows のサービスアカウント][1]を参照してください。
1. 実行する時間や回数を入力します。
1. (オプション) ワークフローの説明を **Memo** フィールドに入力します。
1. **保存**をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/workflows/service_accounts/
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/rules