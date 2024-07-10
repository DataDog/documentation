---
algolia:
  tags:
  - ワークフロー
  - tracing_otel_inst_java
  - ワークフローの自動化
aliases:
- /ja/workflows/trigger
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Workflow Automation を始める
- link: /service_management/workflows/access/#service-accounts/
  tag: Documentation
  text: ワークフローのサービスアカウントについての詳細はこちら
- link: serverless_aws_lambda
  tag: Documentation
  text: ダッシュボードの設定についての詳細はこちら
- link: /security
  tag: Documentation
  text: セキュリティシグナルの詳細はこちら
- link: ノートブック
  tag: ドキュメント
  text: モニターの詳細はこちら
- link: /security/cloud_security_management/workflows
  tag: ドキュメント
  text: Workflow Automation によるセキュリティワークフローの自動化
title: ワークフローをトリガーする
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Workflow Automation はサポートされていません。</div>
{{< /site-region >}}

ワークフローは、手動または自動でトリガーすることができます。

ワークフローは、ワークフローを所有するユーザーのアイデンティティ、またはワークフローに関連付けられたサービスアカウントのアイデンティティで実行することができます。サービスアカウントの詳細については、[ワークフロー自動化のためのサービスアカウント][1]を参照してください。

## ワークフローを手動でトリガーする

ワークフローを手動でトリガーするには
1. ワークフローページから、**Run** をクリックします。
1. 既存のトリガー変数の値を入力します。
1. ワークフローを実行する準備ができたら、**Save & Run** をクリックします。

## ワークフローをダッシュボードからトリガーする

ダッシュボードからワークフローをトリガーするには、**Run Workflow** ウィジェットを追加します。
1. ダッシュボードから、**Add Widget** をクリックします。
1. `workflows` を検索して、**Run Workflow** ウィジェットを追加します。
1. **Select the workflow** の下にあるドロップダウンメニューから、ワークフローを探します。
1. ダッシュボードテンプレート変数をワークフロー入力パラメーターにマッピングします。これにより、ワークフローを実行する際に、ダッシュボードテンプレート変数の値が入力パラメーターに直接マッピングされます。
1. ウィジェットのタイトルを入力し、**Save** をクリックします。

{{< img src="service_management/workflows/trigger-from-dashboard2.png" alt="Run Workflow をクリックすると、ダッシュボードウィジェットからワークフローをトリガーすることができます。" >}}

ワークフローを実行するには
1. ダッシュボードウィジェットの **Run Workflow** をクリックします。
1. **Execution parameters** の下で、ワークフロー入力にマッピングしたテンプレート変数が自動的に入力されます。マップされていない実行パラメーターの値を入力するか、必要であれば既存の値を編集します。
1. ワークフローを実行するには、**Run** をクリックします。

## ワークフローをワークフローからトリガーする

**Trigger Workflow** アクションを使用すると、別のワークフローから子ワークフロー をトリガーすることができます。例えば、複雑な一連のステップをいくつかのワークフローで再利用する場合、すべてのワークフローでステップを再作成する必要はありません。その代わりに、新しいワークフローにステップを追加し、Trigger Workflow アクションを使用して他のワークフローでトリガーします。

<div class="alert alert-info">請求上、子ワークフローのトリガーは新規ワークフローの実行として登録されます。</div>

子ワークフローに[入力パラメーター][5]がある場合、これらのパラメーターは Trigger Workflow アクションの必須フィールドとして表示されます。以下の例では、子ワークフローの入力パラメーターとして `service_name` が設定されているため、**service_name** 入力パラメーターは必須となります。

{{< img src="service_management/workflows/trigger-workflow-step.png" alt="子ワークフローでは、service-name 入力パラメーターが必須です" style="width:100%;" >}}

## ワークフローをモニターからトリガーする

ワークフローをモニターからトリガーするには
1. ワークフローキャンバスで、**Add an Automated Trigger** をクリックし、**@mention** を選択します。
1. ワークフローを保存します。
1. Datadog の [**Monitors** ページ][2]に移動します。
1. ワークフローのトリガーに使用するモニターを検索して編集するか、新しいモニターを作成します。
1. メッセージセクションに、ワークフローの完全なメンション名を追加します。
   - メンション名は `@workflow-` で始まる必要があります。例えば、`@workflow-my-workflow` のようになります。
   - ワークフローにトリガー変数を渡すには、カンマで区切ったリストで `@workflow-name(key=value, key=value)` という構文を使用します。例えば、`@workflow-my-workflow(name="Bits", alert_threshold=threshold)` のようになります。
1. モニターを保存。

{{< img src="service_management/workflows/monitor-trigger.png" alt="モニタートリガーをモニターのメッセージセクションに追加する" >}}

モニターのしきい値に達するたびに、モニターはワークフローの実行をトリガーします。

<div class="alert alert-info">スケジュールされたワークフローおよびトリガーされるワークフローは、公開されるまで自動的に実行されません。ワークフローを公開するには、ワークフローのページから <strong>Publish</strong> をクリックします。公開されたワークフローは、ワークフローの実行に基づいてコストが発生します。詳細は、<a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">Datadog の料金ページ</a>を参照してください。</div>

## ワークフローをセキュリティシグナルからトリガーする

任意のセキュリティシグナルに対して自動的にワークフローをトリガーしたり、Cloud SIEM のセキュリティシグナルパネルから手動でワークフローをトリガーすることができます。

### ワークフローをセキュリティシグナルの通知ルールから自動的にトリガーする

セキュリティシグナルの通知ルールが発動するたびにトリガーされるワークフローを設定することができます。

ワークフローを通知ルールからトリガーするには
1. ワークフローキャンバスで、**Add an Automated Trigger** をクリックし、**@mention** を選択します。
1. **@workflow-** の横に、トリガーのメンション名を入力します。メンション名は一意でなければなりません。
1. ワークフローを保存します。
1. [Configuration][3] ページから、ワークフローのトリガーに使用したい通知ルールを見つけるか、新しいルールを作成します。
1. **Recipient** セクションに、ワークフローの完全なメンション名を追加します。例えば、`@workflow-my-workflow` のようになります。
1. 一意の通知名を追加します。
1. **Save and Activate** をクリックします。

{{< img src="service_management/workflows/notification-rule-trigger2.png" alt="通知ルールの受信者セクションにワークフロー名を追加する" >}}

通知ルールが発動するたびに、ワークフローの実行がトリガーされます。

<div class="alert alert-info">スケジュールされたワークフローおよびトリガーされるワークフローは、公開されるまで自動的に実行されません。ワークフローを公開するには、ワークフローのページから <strong>Publish</strong> をクリックします。公開されたワークフローは、ワークフローの実行に基づいてコストが発生します。詳細は、<a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">Datadog の料金ページ</a>を参照してください。</div>

### ワークフローを Cloud SIEM のセキュリティシグナルから手動でトリガーする

Cloud SIEM Security Signal のパネルから手動でワークフローを開始することができます。

1. Security Signal パネルの上部にある **Run Workflow** をクリックします。
1. 検索モーダルで、実行するワークフローの名前を入力します。ワークフローを選択します。
1. ワークフローで入力パラメーターが必要な場合、必要に応じて値を入力します。入力パラメーターの横に表示されるシグナルオブジェクト JSON から値をコピーし、パラメーターフィールドに貼り付けることができます。
1. **Run** をクリックします。
1. ワークフローの実行ステータスは、セキュリティシグナルの **Workflow** セクションで確認できます。

自動化できるセキュリティワークフローのその他の例については、[Workflow Automation でセキュリティワークフローを自動化する][4]を参照してください。

## ワークフローをスケジュールでトリガーする

ワークフローの実行をスケジュールするには
1. ワークフローキャンバスで、**Add an Automated Trigger** をクリックし、**Schedule** を選択します。
1. **Create** をクリックすると、サービスアカウントが作成されます。詳しくは、[サービスアカウントを使用する][1]を参照してください。
1. 実行する時間や回数を入力します。
1. (オプション) ワークフローの説明を **Memo** フィールドに入力します。
1. **Save** をクリックします。

<div class="alert alert-info">スケジュールされたワークフローおよびトリガーされるワークフローは、公開されるまで自動的に実行されません。ワークフローを公開するには、ワークフローのページから <strong>Publish</strong> をクリックします。公開されたワークフローは、ワークフローの実行に基づいてコストが発生します。詳細は、<a href="https://www.datadoghq.com/pricing/?product=workflow-automation#products">Datadog の料金ページ</a>を参照してください。</div>

## 実行履歴

ワークフローをトリガーした後、ワークフローページはワークフローの**実行履歴**に切り替わります。左上の **Configuration** または **Run History** をクリックして、構成と実行履歴の表示を切り替えます。

実行履歴は、トリガーされたワークフローの進捗を確認したり、失敗したステップをデバッグするために使用します。失敗したステップをクリックすると、そのステップの入力、出力、実行コンテキスト、および関連するエラーメッセージが表示されます。以下の例では、_GitHub プルリクエストステータス_のステップが失敗していることを示しています。エラーメッセージは、権限がないためにステップが失敗したことを示しています。

{{< img src="service_management/workflows/failed-step4.png" alt="ステップに失敗したワークフロー。" >}}

ワークフローの最初の実行履歴には、過去のワークフロー実行のリストと各実行が成功したか失敗したかがパネルで表示されます。失敗には、失敗したワークフローステップへのリンクが含まれます。リスト内のワークフロー実行をクリックすることで、それを検査することができます。ワークフローキャンバスの任意の場所をクリックすることで、いつでも初期実行履歴に戻ることができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_management/workflows/access/#use-a-service-account
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /ja/security/cloud_security_management/workflows
[5]: /ja/service_management/workflows/build/#input-parameters