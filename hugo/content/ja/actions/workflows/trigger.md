---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ja/workflows/trigger
- /ja/service_management/workflows/trigger
description: ダッシュボード、モニター、セキュリティシグナル、その他のソースから手動または自動でワークフローをトリガーする方法について説明します。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-automation-rules
  tag: ブログ
  text: Datadog の自動化ルールでデータの変化に即座に対応
- link: /getting_started/workflow_automation/
  tag: ドキュメント
  text: Workflow Automation を始める
- link: /actions/workflows/access_and_auth/#workflow-identity
  tag: ドキュメント
  text: ワークフローの実行に使用されるアイデンティティの詳細
- link: dashboards
  tag: ドキュメント
  text: ダッシュボードの設定についての詳細はこちら
- link: /security
  tag: ドキュメント
  text: セキュリティシグナルの詳細はこちら
- link: monitors
  tag: ドキュメント
  text: モニターの詳細はこちら
- link: /security/cloud_security_management/workflows
  tag: ドキュメント
  text: Workflow Automation によるセキュリティワークフローの自動化
title: ワークフローをトリガーする
---
ワークフローは手動または自動でトリガーできます。1 つのワークフローに複数のトリガーを設定することもできます。これにより、Datadog モニターや Datadog ダッシュボードなど、さまざまなソースからワークフローをトリガーできます。

ワークフローは、その所有者、実行をトリガーしたユーザー、または関連付けられたサービスアカウントのアイデンティティで実行されます。スケジュールや Webhook など、ユーザーを介さずに発生するトリガーには、所有者またはサービスアカウントが必要です。詳細については、[ワークフローのアイデンティティ][1]を参照してください。

{{< img src="actions/workflows/trigger/multiple-triggers.png" alt="複数のトリガーを持つワークフロー" style="width:100%;" >}}

## 手動トリガー{#manual-triggers}

ワークフローを手動でトリガーするには
1. ワークフローページで [{{< ui >}}Run{{< /ui >}}] をクリックします。
1. 既存のトリガー変数の値を入力します。
1. ワークフローを実行する準備ができたら、[{{< ui >}}Save & Run{{< /ui >}}] をクリックします。

## ダッシュボードトリガー{#dashboard-triggers}

ダッシュボードからワークフローをトリガーするには、{{< ui >}}Run Workflow{{< /ui >}} ウィジェットを追加します。
1. ダッシュボードから [{{< ui >}}Add Widget{{< /ui >}}] をクリックします。
1. `workflows` を検索し、{{< ui >}}Run Workflow{{< /ui >}} ウィジェットを追加します。
1. {{< ui >}}Select the workflow{{< /ui >}} の下で、ドロップダウンメニューからワークフローを選択します。ダッシュボードトリガーを持つ公開済みのワークフローのみがリストに表示されます。
1. ダッシュボードのテンプレート変数をワークフローの入力パラメーターにマッピングします。これにより、ワークフローを実行する際に、ダッシュボードテンプレート変数の値を入力パラメーターに直接マッピングできるようになります。
1. ウィジェットのタイトルを入力し、[{{< ui >}}Save{{< /ui >}}] をクリックします。

ワークフローを実行するには
1. ダッシュボードウィジェットの [{{< ui >}}Run Workflow{{< /ui >}}] をクリックします。
1. {{< ui >}}Execution parameters{{< /ui >}} の下で、ワークフローの入力にマッピングしたテンプレート変数が自動的に入力されます。マッピングされていない実行パラメーターの値を入力するか、必要に応じて既存の値を編集します。
1. [{{< ui >}}Run{{< /ui >}}] をクリックしてワークフローを実行します。

## モニタートリガー {#monitor-triggers}

### ワークフローへのモニタートリガーの追加{#add-a-monitor-trigger-to-your-workflow}

1. ワークフローにモニタートリガーを追加します。
   - ワークフローにトリガーがない場合は、[{{< ui >}}Add Trigger{{< /ui >}}] > [{{< ui >}}Monitor{{< /ui >}}] をクリックします。
   - ワークフローにすでに 1 つ以上のトリガーがあり、追加のトリガーとしてモニターを追加する場合は、{{< ui >}}Add Trigger{{< /ui >}} (稲妻) アイコンをクリックして [{{< ui >}}Monitor{{< /ui >}}] を選択します。
1. トリガーがワークフロー内のステップに接続されていることを確認します。トリガーの下にあるプラスアイコン ({{< ui >}}\+{{< /ui >}}) をクリックしてドラッグすることで、トリガーをステップに接続できます。
1. トリガーをクリックし、{{< ui >}}Mention handle{{< /ui >}} をメモしておきます。
1. モニタートリガーは、デフォルトで自動的に実行されるように設定されています。ワークフローを自動的にトリガーしない場合は、{{< ui >}}Automatic triggering{{< /ui >}} オプションを切り替えます。
1. ワークフローを保存します。
1. [{{< ui >}}Publish{{< /ui >}}] をクリックしてワークフローを公開します。ワークフローは、公開するまで自動的には実行されません。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][11]を参照してください。

### モニターへのワークフローの追加{#add-the-workflow-to-your-monitor}

1. Datadog の [**Monitors** ページ][2] に移動します。
1. ワークフローのトリガーに使用するモニターを検索して編集するか、新しいモニターを作成します。
1. 「{{< ui >}}Configure notifications & automations{{< /ui >}}」セクションで、[{{< ui >}}\+ Add Workflow{{< /ui >}}] をクリックします。
1. ワークフローのメンション名を使用してワークフローを検索し、ドロップダウンから選択します。モニタートリガーを持つワークフローのみがリストに表示されます。<br>入力パラメーターがない場合は `@workflow-name`、入力パラメーターがある場合は `@workflow-name(param="")` の形式で、モニターのメンションが通知メッセージフィールドに表示されます。
1. ワークフローに入力パラメーターがある場合、
    1. モニター名と ID の横にある [{{< ui >}}Configure Inputs{{< /ui >}}] をクリックします。
        {{< img src="actions/workflows/trigger/monitor-configure-inputs-arrow.png" alt="Configure Inputs リンクが利用可能なアタッチされたワークフロー" style="width:100%;" >}}
    1. Enter values for the input parameters.<br>**Note**: Values can include monitor message template variables. To see a list of available variables, click {{< ui >}}Use Message Template Variables{{< /ui >}} in the upper-right of the {{< ui >}}Configure notifications & automations{{< /ui >}} section.
    <br>The parameters populate in the mention within the notification message field.<br>For example, if you configure a workflow named `@workflow-test-inputs` to have the following parameters:
        {{< img src="actions/workflows/trigger/monitor-configure-inputs-modal.png" alt="Configure Inputs パネルで次のように設定された値: im_a_string は 'abc'、im_a_number は 123、im_a_boolean は true に切り替え、i_have_a_default_value は 'override this'" style="width:70%;" >}}
        the mention changes to `@workflow-test-inputs(im_a_string="abc", im_a_number=123, im_a_boolean=true, i_have_a_default_value="override this")`.
1. モニターを保存します。

モニターのしきい値に達するたびに、モニターはワークフローの実行をトリガーします。

### モニタートリガーのテスト{#test-a-monitor-trigger}

[モニタートリガーをテストする方法][12]については、テストとデバッグのページを参照してください。

## インシデントトリガー{#incident-triggers}

インシデントトリガーは、インシデントイベントに基づいて自動的に、またはインシデント内から手動でワークフローを実行できます。

<div class="alert alert-info">Incident Management 内でインシデントコンテキストを組み込み、追加料金なしでインシデントオートメーションを設定するには、「<a href="/incident_response/incident_management/setup_and_configuration/automations">Incident Automations</a>」を参照してください。インシデントイベントが複数のトリガーのうちの 1 つである場合や、ワークフローが Incident Management の外部で管理されている場合は、インシデントトリガー付きのワークフローを使用します。</div>

ワークフローにインシデントトリガーを追加するには、
1. [ワークフロー作成ページ][6]から、トリガーオプションまでスクロールダウンし、[{{< ui >}}Incident{{< /ui >}}] をクリックします。
1. インシデントが宣言または更新されたときや、定期的なスケジュールなど、ワークフローをトリガーするインシデントイベントタイプを選択します。
   手動トリガーの場合、Workflows はモニターや[インシデント通知ルール][16]で使用できるハンドルを作成します。
1. [{{< ui >}}Create{{< /ui >}}] をクリックします。
1. [{{< ui >}}Publish{{< /ui >}}] をクリックしてワークフローを公開します。ワークフローは、公開されるまで実行されません。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][11]を参照してください。

## セキュリティトリガー{#security-triggers}

セキュリティシグナルやセキュリティファインディングに対して、ワークフローを自動的にトリガーできます。また、Cloud SIEM のセキュリティシグナルパネル、誤構成パネル、またはアイデンティティリスクパネルから手動でワークフローをトリガーすることもできます。

**注**: ワークフローをセキュリティシグナルやセキュリティファインディングに追加する前に、そのワークフローにセキュリティトリガーが設定されている必要があります。

### セキュリティ通知ルールトリガー{#security-notification-rule-triggers}

セキュリティ通知ルールがセキュリティシグナルまたはセキュリティファインディングの通知を送信するたびに、ワークフローがトリガーされるように設定できます。

通知ルールからワークフローをトリガーするには、まずワークフローにセキュリティトリガーを追加する必要があります。
1. ワークフローにセキュリティトリガーを追加します。
   - ワークフローにトリガーがない場合は、[{{< ui >}}Add Trigger{{< /ui >}}] > [{{< ui >}}Security{{< /ui >}}] をクリックします。
   - ワークフローにすでに 1 つ以上のトリガーがあり、追加のトリガーとしてセキュリティトリガーを追加する場合は、{{< ui >}}Add Trigger{{< /ui >}} (稲妻) アイコンをクリックして [{{< ui >}}Security{{< /ui >}}] を選択します。
1. トリガーがワークフロー内のステップに接続されていることを確認します。トリガーの下にあるプラスアイコン ({{< ui >}}\+{{< /ui >}}) をクリックしてドラッグすることで、トリガーをステップに接続できます。
1. トリガーをクリックし、{{< ui >}}Mention handle{{< /ui >}} をメモしておきます。
1. セキュリティトリガーは、デフォルトで自動的に実行されるように設定されています。ワークフローを自動的にトリガーしない場合は、{{< ui >}}Automatic triggering{{< /ui >}} オプションを切り替えます。
1. ワークフローを保存します。
1. [{{< ui >}}Publish{{< /ui >}}] をクリックしてワークフローを公開します。ワークフローは、公開するまで自動的には実行されません。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][11]を参照してください。

通知ルールにワークフローを追加します。
1. [Configuration][3] ページで、ワークフローのトリガーに使用する通知ルールを探すか、新しいルールを作成します。
]1. 「{{< ui >}}Recipient{{< /ui >}}」セクションで、ワークフローのメンション名を使用してワークフローを検索します。たとえば、`@workflow-my-workflow`。
1. ドロップダウンからワークフローを選択します。セキュリティトリガーを持つワークフローのみがリストに表示されます。
1. [{{< ui >}}Save{{< /ui >}}] をクリックします。

{{< img src="actions/workflows/trigger/notification-rule-trigger2.png" alt="通知ルールの受信者セクションにワークフロー名を追加します" >}}

通知ルールが発動するたびに、ワークフローの実行がトリガーされます。

### 手動トリガー{#manual-triggers-1}

Cloud SIEM のセキュリティシグナルパネル、誤構成パネル、またはアイデンティティリスクパネルから手動でワークフローを開始できます。

1. サイドパネル上部の {{< ui >}}Next Steps{{< /ui >}} ボックスで [{{< ui >}}Run Workflow{{< /ui >}}] をクリックします。
1. 検索モーダルで、実行するワークフローの名前を入力して選択します。セキュリティトリガーを持つワークフローのみがリストに表示されます。
1. ワークフローに入力パラメーターが必要な場合は、必要な値を入力します。入力パラメーターの横に表示されているオブジェクト JSON から値をコピーして、パラメーターフィールドに貼り付けることができます。
1. [{{< ui >}}Run{{< /ui >}}] をクリックします。

ワークフローの実行ステータスは、サイドパネルの「{{< ui >}}Workflows{{< /ui >}}」セクションで確認できます。

自動化できるセキュリティワークフローのその他の例については、[Workflow Automation でセキュリティワークフローを自動化する][4]を参照してください。

## カタログトリガー {#catalog-triggers}

ソフトウェアカタログエンティティからワークフローを実行するには、まずワークフローにソフトウェアカタログトリガーを追加する必要があります。

1. ワークフローにソフトウェアカタログトリガーを追加します。
   - ワークフローにトリガーがない場合は、[{{< ui >}}Add Trigger{{< /ui >}}] > [{{< ui >}}Catalog{{< /ui >}}] をクリックします。
   - ワークフローにすでに 1 つ以上のトリガーがあり、追加のトリガーとしてソフトウェアカタログを追加する場合は、{{< ui >}}Add Trigger{{< /ui >}} (稲妻) アイコンをクリックして {{< ui >}}Catalog{{< /ui >}} を選択します。
2. トリガーがワークフロー内のステップに接続されていることを確認します。トリガーの下にあるプラスアイコン ({{< ui >}}\+{{< /ui >}}) をクリックしてドラッグすることで、トリガーをステップに接続できます。
3. ワークフローを保存します。
4. [{{< ui >}}Publish{{< /ui >}}] をクリックしてワークフローを公開します。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][11]を参照してください。

カタログエンティティからワークフローを実行します。

1. [カタログページ][14]で、リストからエンティティを選択します。
1. サイドパネルの上部にある {{< ui >}}Run Workflow{{< /ui >}} をクリックします。
1. 検索モーダルで、実行するワークフローの名前を入力して選択します。カタログトリガーを持つワークフローのみがリストに表示されます。
1. ワークフローに入力パラメーターが必要な場合は、必要に応じて値を入力します。
1. [{{< ui >}}Run{{< /ui >}}] をクリックしてワークフローを実行します。

## GitHub トリガー{#github-triggers}

<div class="alert alert-info">この機能を使用するには、GitHub アカウントに Webhook を作成する権限が必要です。</div>

以下の手順で、GitHub からワークフローをトリガーできます。

1. ワークフローに GitHub トリガーを追加します。
   - ワークフローにトリガーがない場合は、[{{< ui >}}Add Trigger{{< /ui >}}] > [{{< ui >}}GitHub{{< /ui >}}] をクリックします。
   - ワークフローにすでに 1 つ以上のトリガーがあり、追加のトリガーとして GitHub を追加する場合は、{{< ui >}}Add Trigger{{< /ui >}} (稲妻) アイコンをクリックして {{< ui >}}GitHub{{< /ui >}} を選択します。
1. ワークフローのトリガーに使用する GitHub リポジトリに移動します。
1. GitHub で [{{< ui >}}Settings{{< /ui >}}] をクリックし、[{{< ui >}}Webhooks{{< /ui >}}] をクリックしてから、[{{< ui >}}Add webhook{{< /ui >}}] をクリックします。
1. ワークフローの {{< ui >}}Configure{{< /ui >}} タブで、{{< ui >}}Payload URL{{< /ui >}} をコピーします。GitHub の Webhook 作成ページの {{< ui >}}Payload URL{{< /ui >}} フィールドに貼り付けます。
1. GitHub で、Webhook の {{< ui >}}Content type{{< /ui >}} を `application/json` に設定します。
1. GitHub で 16 文字以上のシークレットを作成し、そのシークレットをワークフローのトリガーの {{< ui >}}Secret{{< /ui >}} フィールドにコピーします。
1. GitHub で、Webhook をトリガーするイベントを選択し、[{{< ui >}}Add webhook{{< /ui >}}] をクリックします。
1. _オプション_として、ワークフローで {{< ui >}}\+{{< /ui >}} をクリックして {{< ui >}}Rate Limit{{< /ui >}} を追加します。
1. ワークフローの [{{< ui >}}Save{{< /ui >}}] をクリックします。
1. [{{< ui >}}Publish{{< /ui >}}] をクリックしてワークフローを公開します。GitHub からワークフローをトリガーするには、事前にワークフローを公開しておく必要があります。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][11]を参照してください。

## Slack トリガー {#slack-triggers}

<div class="alert alert-info">この機能を使用するには、Slack ワークスペースに Datadog アプリをインストールする必要があります。詳細については、「<a href="/integrations/slack/?tab=datadogforslack#setup">Slack のセットアップ</a>」を参照してください。</div>

<div class="alert alert-info"><strong>クイックスタート</strong>: クリックして、Slack トリガーを持つ <a href="https://app.datadoghq.com/workflow/create?source=slack">ワークフロー</a> を作成します。</div>

Slack で手動で `/datadog workflow` コマンドを使用してワークフローをトリガーすることも、メッセージに絵文字リアクションが追加されたときや、チャンネルにメッセージが投稿されたときに自動的にトリガーすることもできます。

### 手動の Slack トリガー{#manual-slack-trigger}

1. ワークフローに Slack トリガーを追加します。
   - ワークフローにトリガーがない場合は、[{{< ui >}}Add Trigger{{< /ui >}}] > [{{< ui >}}Slack{{< /ui >}}] をクリックします。
   - ワークフローにすでに 1 つ以上のトリガーがあり、追加のトリガーとして Slack トリガーを追加する場合は、{{< ui >}}Add Trigger{{< /ui >}} (稲妻) アイコンをクリックして {{< ui >}}Slack{{< /ui >}} を選択します。
1. トリガーがワークフロー内のステップに接続されていることを確認します。トリガーの下にあるプラスアイコン ({{< ui >}}\+{{< /ui >}}) をクリックしてドラッグすることで、トリガーをステップに接続できます。
1. ワークフローの [{{< ui >}}Save{{< /ui >}}] をクリックします。
1. [{{< ui >}}Publish{{< /ui >}}] をクリックしてワークフローを公開します。Slack からワークフローをトリガーするには、事前にワークフローを公開しておく必要があります。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][11]を参照してください。
1. Datadog アプリが追加されている Slack チャンネルで `/datadog workflow` を実行し、ワークフローを選択して実行します。`/dd` エイリアスを使用して /datadog コマンドを実行することもできます。

### 絵文字リアクションの Slack トリガー{#emoji-reaction-slack-trigger}

ユーザーが Slack のメッセージに特定の絵文字リアクションを追加したときに、ワークフローが自動的にトリガーされるように設定できます。

1. ワークフローに Slack トリガーを追加します。
   - ワークフローにトリガーがない場合は、[{{< ui >}}Add Trigger{{< /ui >}}] > [{{< ui >}}Slack{{< /ui >}}] をクリックします。
   - ワークフローにすでに 1 つ以上のトリガーがあり、追加のトリガーとして Slack トリガーを追加する場合は、{{< ui >}}Add Trigger{{< /ui >}} (稲妻) アイコンをクリックして {{< ui >}}Slack{{< /ui >}} を選択します。
1. {{< ui >}}Configure{{< /ui >}} タブで、リアクションを監視する Slack ワークスペースを選択します。
1. ワークスペースに `emoji:read` 権限が必要な場合は、[{{< ui >}}Enable Permission{{< /ui >}}] をクリックして、必要なスコープで Slack アプリを再インストールします。
1. ワークフローをトリガーする 1 つ以上の絵文字リアクションを選択します。
1. [{{< ui >}}Save{{< /ui >}}] をクリックし、[{{< ui >}}Publish{{< /ui >}}] をクリックします。

### メッセージの Slack トリガー{#message-slack-trigger}

設定したルールに一致するメッセージが 1 つ以上の Slack チャンネルに投稿されたときに、ワークフローが自動的にトリガーされるように構成できます。

<div class="alert alert-info">Datadog Slack アプリは、選択した各チャンネルのメンバーである必要があります。Datadog Slack アプリ自体によって投稿されたメッセージは、ワークフローをトリガーしません。</div>

1. ワークフローに Slack トリガーを追加します。
   - ワークフローにトリガーがない場合は、[{{< ui >}}Add Trigger{{< /ui >}}] > [{{< ui >}}Slack{{< /ui >}}] をクリックします。
   - ワークフローにすでに 1 つ以上のトリガーがあり、追加のトリガーとして Slack トリガーを追加する場合は、{{< ui >}}Add Trigger{{< /ui >}} (稲妻) アイコンをクリックして {{< ui >}}Slack{{< /ui >}} を選択します。
1. {{< ui >}}Configure{{< /ui >}} タブの {{< ui >}}Message triggers{{< /ui >}} 下で、Slack {{< ui >}}Workspace{{< /ui >}} を選択します。
1. 監視する {{< ui >}}Channels{{< /ui >}} を 1 つ以上選択します。
1. {{< ui >}}Match type{{< /ui >}} を選択します。
   - {{< ui >}}Any message{{< /ui >}}: 選択したチャンネル内のすべてのメッセージがワークフローをトリガーします。
   - {{< ui >}}Contains text{{< /ui >}}: メッセージに {{< ui >}}Message pattern{{< /ui >}} で入力したテキストが含まれている必要があります。マッチングでは大文字と小文字は区別されません。
   - {{< ui >}}Matches regular expression{{< /ui >}}: メッセージが {{< ui >}}Message pattern{{< /ui >}} で入力した正規表現に一致する必要があります。マッチングでは大文字と小文字が区別され、パターンはメッセージ内のどこにでも一致できます。メッセージ全体を一致させるには、`^` と `$` を使用します (例: `^deploy\s+production$`)。大文字と小文字を区別しないようにするには、パターンの先頭に `(?i)` を追加します。
1. 必要に応じて、対象とするメッセージをフィルター処理します。
   - {{< ui >}}Thread replies{{< /ui >}}: {{< ui >}}Include all messages{{< /ui >}}、{{< ui >}}Only thread replies{{< /ui >}}、または {{< ui >}}Exclude thread replies{{< /ui >}}。
   - {{< ui >}}App messages{{< /ui >}}: {{< ui >}}Include all messages{{< /ui >}}、{{< ui >}}Only app messages{{< /ui >}}、または {{< ui >}}Exclude app messages{{< /ui >}}。
1. 別のパターンやチャンネルを監視するには、[{{< ui >}}Add message rule{{< /ui >}}] をクリックします。メッセージが複数のルールに一致する場合、ワークフローは 1 回実行されます。
1. [{{< ui >}}Save{{< /ui >}}] をクリックし、[{{< ui >}}Publish{{< /ui >}}] をクリックします。

#### Slack メッセージへのアクセス{#access-the-slack-message}

ワークフローの以降のステップで、`Source.slack_message` を使用してワークフローをトリガーしたメッセージを参照します:

| 変数 | 説明 |
|---|---|
| `Source.slack_message.text` | メッセージのテキスト。|
| `Source.slack_message.user_id` | メッセージを投稿したユーザーの Slack ID (存在する場合)。|
| `Source.slack_message.channel_id` | メッセージが投稿されたチャンネルの Slack ID。|
| `Source.slack_message.team_id` | ワークスペースの Slack ID。|
| `Source.slack_message.message_ts` | メッセージの Slack タイムスタンプ。|
| `Source.slack_message.thread_ts` | メッセージがスレッドへの返信である場合の、親メッセージの Slack タイムスタンプ。|
| `Source.slack_message.app_id` | メッセージがアプリによって投稿された場合の、そのアプリの Slack ID。|
| `Source.slack_message.bot_id` | メッセージがボットによって投稿された場合の、そのボットの Slack ID。|

## API トリガー {#api-triggers}

API コールを使用してワークフローをトリガーするには、[API キー][8]と、`workflows_run` スコープを持つ[アプリケーションキー][9]が必要です。アプリケーションキーへのスコープの追加については、[スコープ][10]を参照してください。

<div class="alert alert-info">スコープが設定されていないキーには、 <code>workflows_run</code> デフォルトでこのスコープが含まれていません。セキュリティのベストプラクティスに従い、目的のタスクを実行するために必要な最小限のスコープを持つアプリケーションキーを使用してください。</div>

ワークフロー ID を含む POST リクエストをエンドポイント `https://api.datadoghq.com/api/v2/workflows/WORKFLOW-ID/instances` に送信することで、ワークフローをトリガーできます。ワークフローに API トリガーを追加すると、トリガーインターフェイスに、ワークフローのトリガーに使用できる cURL リクエストの例が表示されます。

ワークフローに API トリガーを追加するには、次の手順を実行します。
1. [{{< ui >}}Add Trigger{{< /ui >}}] > [{{< ui >}}API{{< /ui >}}] をクリックします。
1. ワークフローキャンバスで [{{< ui >}}API{{< /ui >}}] をクリックし、ワークフローをトリガーするために必要なヘッダーとデータが含まれている、ワークフローの cURL リクエスト例を確認します。

   ワークフローをトリガーするための cURL リクエストは、次のようになります。
   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d {} \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
{{< /code-block >}}

   ワークフローに入力パラメーターが含まれている場合は、それらもリクエストペイロードに含めます。次の例では、`example_input1` と `example_input2` という 2 つの入力パラメーターを使用しています。

   {{< code-block lang="shell" >}}
curl -X POST \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" \
  -d { "meta": { "payload": { \
    "example_input1": "...", \
    "example_input2": "..." \
  } } } \
  https://api.datadoghq.com/api/v2/workflows/32866005-d275-4553-be86-9f1b13066d84/instances
   {{< /code-block >}}
1. [{{< ui >}}Save{{< /ui >}}] をクリックします。
1. [{{< ui >}}Publish{{< /ui >}}] をクリックしてワークフローを公開します。POST リクエストでワークフローをトリガーするには、事前にワークフローを公開しておく必要があります。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][11]を参照してください。

### API リクエスト本文へのアクセス{#access-the-api-request-body}

ワークフローの以降のステップで、`Source.api.requestBody` を使用して受信 API リクエストのペイロードを参照します。リクエスト本文が JSON の場合は、個々のフィールドにアクセスする前に `JSON.parse()` でパースします。たとえば、`${JSON.parse(Source.api.requestBody).my_field}` の代わりに `Source.api.requestBody.my_field` を使用します。

## スケジュールされたトリガー{#scheduled-triggers}

ワークフローの実行をスケジュールするには
1. ワークフローキャンバスで [{{< ui >}}Add an Automated Trigger{{< /ui >}}] をクリックし、[{{< ui >}}Schedule{{< /ui >}}] を選択します。
1. [{{< ui >}}Create{{< /ui >}}] をクリックしてサービスアカウントを作成します。詳細については、[サービスアカウントとして実行][17]を参照してください。
1. 実行する時間や回数を入力します。
1. (オプション) {{< ui >}}Memo{{< /ui >}} フィールドにワークフローの説明を入力します。
1. [{{< ui >}}Save{{< /ui >}}] をクリックします。
1. [{{< ui >}}Publish{{< /ui >}}] をクリックします。スケジュールされたワークフローは、公開されるまで実行されません。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][11]を参照してください。

## ワークフローからのワークフローのトリガー{#trigger-a-workflow-from-a-workflow}

{{< ui >}}Trigger Workflow{{< /ui >}} アクションを使用して、別のワークフローから子ワークフローをトリガーできます。たとえば、複数のワークフローで再利用する必要がある複雑な一連のステップがある場合、すべてのワークフローでそれらのステップを再作成する必要はありません。代わりに、ステップを新しいワークフローに追加し、Trigger Workflow アクションを使用して他のワークフローでそのワークフローをトリガーします。

<div class="alert alert-info">課金上、子ワークフローをトリガーすると、新しいワークフローの実行として登録されます。</div>

子ワークフローに[入力パラメーター][5]がある場合、これらのパラメーターは Trigger Workflow アクションで必須フィールドとして表示されます。以下の例では、子ワークフローで `service_name` が入力パラメーターとして設定されているため、`service_name` 入力パラメーターが必須となります。

{{< img src="actions/workflows/trigger/trigger-workflow-step.png" alt="service_name 入力パラメーターは、子ワークフローで必須です。" style="width:100%;" >}}

### 子ワークフローの結果へのアクセス{#access-the-result-of-a-child-workflow}

子ワークフローで {{< ui >}}Output parameters{{< /ui >}} を定義することで、子ワークフローの結果を親ワークフローに渡すことができます。親ワークフローで `WorkflowOutputs` コンテキスト変数を使用して、子ワークフローの出力パラメーターを取得します。たとえば、`Example_workflow` という名前の子ワークフローに出力パラメーター `exampleList` がある場合、`Steps.Example_workflow.workflowOutputs.exampleList` を使用して子ワークフローの結果にアクセスします。

## 実行履歴{#run-history}

ワークフローをトリガーすると、ワークフローページがそのワークフローの {{< ui >}}Run History{{< /ui >}} に切り替わります。左上の [{{< ui >}}Configuration{{< /ui >}}] または [{{< ui >}}Run History{{< /ui >}}] をクリックして、構成ビューと実行履歴ビューを切り替えます。実行履歴を使用して、トリガーされたワークフローの進行状況を確認したり、[失敗したステップをデバッグ][13]したりできます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][7] の {{< ui >}}#workflows{{< /ui >}} チャンネルにご参加ください。

[1]: /ja/actions/workflows/access_and_auth/#workflow-identity
[2]: https://app.datadoghq.com/monitors/manage
[3]: https://app.datadoghq.com/security/configuration/notification-rules
[4]: /ja/security/cloud_security_management/workflows
[5]: /ja/actions/workflows/build/#input-parameters
[6]: https://app.datadoghq.com/workflow/create
[7]: https://chat.datadoghq.com/
[8]: /ja/account_management/api-app-keys/#api-keys
[9]: /ja/account_management/api-app-keys/#application-keys
[10]: /ja/account_management/api-app-keys/#scopes
[11]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[12]: /ja/actions/workflows/test_and_debug/#test-a-monitor-trigger
[13]: /ja/actions/workflows/test_and_debug/#debug-a-failed-step
[14]: https://app.datadoghq.com/software
[15]: /ja/incident_response/incident_management/setup_and_configuration/automations
[16]: /ja/incident_response/incident_management/setup_and_configuration/notification_rules/
[17]: /ja/actions/workflows/access_and_auth/#run-as-a-service-account