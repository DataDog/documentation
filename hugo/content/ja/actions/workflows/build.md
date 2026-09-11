---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /ja/workflows/build
- /ja/service_management/workflows/build
description: ブループリントからワークフローを作成するか、AI 支援、手動設定、ドラッグ＆ドロップのアクションを使用してカスタムワークフローを構築します。
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: ドキュメント
  text: Workflow Automation を始める
- link: /actions/actions_catalog
  tag: ドキュメント
  text: Action Catalog で利用可能なアクションを参照する
- link: /security/cloud_security_management/workflows
  tag: ドキュメント
  text: Workflow Automation によるセキュリティワークフローの自動化
- link: /actions/workflows/variables
  tag: ドキュメント
  text: 変数とパラメーター
title: ワークフローの構築
---
[Workflow Automation][1] ページから、ワークフローの作成や、既存のワークフローの編集ができます。このページには、ワークフローの所有者、トリガータイプ、各ワークフローが最後に変更および実行された日付、ワークフローが公開されているかどうかなど、既存のワークフローに関する情報が一覧表示されます。
- ワークフローにカーソルを合わせると、ワークフローの削除、複製、または権限の編集を行うオプションが表示されます。
- 自分が作成したワークフローのみを表示したい場合は、{{< ui >}}My workflows{{< /ui >}} をトグルします。

## ブループリントからワークフローを構築 {#build-a-workflow-from-a-blueprint}

1. [**Blueprints**][5] (ブループリント) タブをクリックします。
1. 必要に応じて、検索バーを使用して、名前、カテゴリー、インテグレーションでブループリントのリストを絞り込むことができます。
1. 使用するブループリントを見つけてクリックします。ワークフローキャンバスが表示されます。
1. {{< ui >}}Create From Blueprint{{< /ui >}} をクリックします。ワークフローキャンバスが更新され、新しく作成されたワークフローが表示されます。
1. ワークフローの新しい名前と説明を入力します。
1. 必要に応じて、ワークフローに適用するタグを選択または入力します。Datadog タグの詳細については、[タグ入門][7] を参照してください。
1. 必要に応じて、ワークフローに適用する関連 [サービス][8] を選択します。
1. 必要に応じて、ワークフローに関連付ける [チーム][9] を選択します。チームが存在しない場合は、名前を入力して作成できます。
1. {{< ui >}}Save{{< /ui >}} をクリックすると、変更が適用されます。
1. 更新が必要なワークフローステップには、感嘆符が表示されます。変更したいワークフローの各ステップをクリックし、{{< ui >}}Configure{{< /ui >}} タブの空欄に必要事項を入力します。
1. ワークフローの修正が完了したら、{{< ui >}}Run{{< /ui >}} をクリックしてワークフローをテストします。
1. ワークフローを公開する準備ができたら、{{< ui >}}Publish{{< /ui >}} をクリックします。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][4] を参照してください。

## AI でワークフローを作成または編集する {#create-a-workflow-with-ai}

何から始めたらよいかわからない場合は、AI でワークフローを自動生成するか、既存のワークフローを反復することができます。

ワークフローを生成するには、以下の手順に従います。
1. [Workflow Automation][1] ページから、{{< ui >}}New Workflow{{< /ui >}} をクリックします。
1. {{< ui >}}Create a workflow with AI{{< /ui >}} をクリックします。
1. ワークフローの詳細なプロンプトを入力します。使用したいインテグレーションとアクションを指定します。
1. 上向き矢印 ({{< ui >}}↑{{< /ui >}}) をクリックすると、ワークフローが作成されます。

既存のワークフローを反復するには、以下の手順に従います。
1. 既存のワークフローから、{{< ui >}}Edit with AI{{< /ui >}} をクリックします。
1. ワークフローに追加したい動作の詳細なプロンプトを入力します。使用したいインテグレーションとアクションを含めます。
1. 上向き矢印 ({{< ui >}}↑{{< /ui >}}) をクリックすると、機能がワークフローに追加されます。

<div class="alert alert-info">Workflow Automation AI は、製品に関する質問には回答しません。質問やフィードバックがある場合は、<a href="https://chat.datadoghq.com/">Datadog Community Slack</a> の <strong>#workflows</strong> チャンネルに参加することをご検討ください</div>

## カスタムワークフローの作成 {#create-a-custom-workflow}

ワークフローを作成するには、[Workflow Automation][1] ページで {{< ui >}}New workflow{{< /ui >}} をクリックします。

ワークフローを構成するには、以下の手順に従います。
1. ワークフロー構成パネルで、ワークフローの {{< ui >}}Name{{< /ui >}} を入力します。
1. 必要に応じて、ワークフローに適用するタグを選択または入力します。Datadog タグの詳細については、[タグ入門][7] を参照してください。
1. 必要に応じて、ワークフローに適用する関連 [サービス][8] を選択します。
1. 必要に応じて、ワークフローに関連付ける [チーム][9] を選択します。チームが存在しない場合は、名前を入力して作成できます。
1. ワークフローで入力または出力パラメーターを使用する場合は、それらを入力してください。
1. {{< ui >}}Save{{< /ui >}} をクリックすると、変更が適用されます。

ワークフローの構成が不明な場合、ワークフローキャンバス上の任意の場所をクリックして、後でパネルに戻ることができます。

### ワークフロービルダーでワークフローを構築する {#build-a-workflow-with-the-workflow-builder}

1. ワークフローにトリガーが必要な場合は、{{< ui >}}Add Trigger{{< /ui >}} をクリックします。詳細については、「[ワークフローをトリガーする][3]」を参照してください。
1. ワークフローにステップを追加し始めるには、{{< ui >}}Add Step{{< /ui >}} をクリックします。
1. 検索バーを使ってアクションを検索するか、インテグレーションとその関連アクションをブラウズして、望むアクションを見つけます。アクションをクリックすると、そのアクションはワークフローキャンバスのステップとして追加されます。
1. ワークフローキャンバス内のステップをクリックして、構成、またはその出力やコンテキスト変数の表示を行います。出力とコンテキスト変数の詳細については、「[コンテキスト変数][14]」を参照してください。
1. ステップの構成が完了したら、AI アイコン <i class="icon-bits-ai"></i> またはプラスアイコン ({{< ui >}}\+{{< /ui >}}) をクリックして別のステップを追加するか、ワークフローを保存してください。
1. ワークフローを公開する準備ができたら、{{< ui >}}Publish{{< /ui >}} をクリックします。公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][4] を参照してください。

ワークフロー内のステップは、クリックすることでいつでも編集できます。ワークフロー上のステップをクリックしてドラッグすると、並べ替えることができます。

#### ショートカットとキャンバスツール {#shortcuts-and-canvas-tools}

ワークフロービルダーキャンバスのキーボードショートカットとマウスショートカットを表示するには、`?` (shift+`/`) を入力するか、{{< ui >}}Keyboard{{< /ui >}}{{< img src="actions/workflows/build/keyboard-icon.png" inline="true" style="width:40px;">}} ボタンをクリックします。ショートカットの一覧が表示されます。

{{< ui >}}Zoom out{{< /ui >}}{{< img src="actions/workflows/build/zoom-out-mag-icon.png" inline="true" style="width:30px;">}}、{{< ui >}}Zoom in{{< /ui >}}{{< img src="actions/workflows/build/zoom-in-mag-icon.png" inline="true" style="width:30px;">}}、および {{< ui >}}Reset viewport{{< /ui >}}{{< img src="actions/workflows/build/reset-viewport-icon.png" inline="true" style="width:34px;">}} ボタンは、ビューポートの表示方法を制御します。

{{< ui >}}Auto layout{{< /ui >}}{{< img src="actions/workflows/build/auto-layout-icon.png" inline="true" style="width:80px;">}} ボタンを使用すると、ワークフローステップを整列および配置できます。

{{< ui >}}Add annotation{{< /ui >}}{{< img src="actions/workflows/build/add-annotation-icon.png" inline="true" style="width:30px;">}} ボタンを使用すると、ワークフローに注釈メモを追加できます。これらのメモには、太字や斜体、リンク、リストなどのさまざまなテキスト書式を追加するための書式設定バーが用意されています。注釈は Markdown で入力することもできます。

{{< img src="actions/workflows/build/workflow-annotation-with-bar.png" alt="書式設定バーが上に表示された空の注釈" style="width:70%;" >}}

## ステップをテストする {#test-a-step}

ステップをテストする方法については、[テストとデバッグ][11] のページを参照してください。

## ワークフローの公開 {#publish-a-workflow}

スケジュール設定されたワークフローやトリガーされるワークフローは、公開するまで自動的にはトリガーされません。ワークフローを公開するには、ワークフローのページから {{< ui >}}Publish{{< /ui >}} をクリックします。

公開されたワークフローには、ワークフローの実行数に基づいてコストが発生します。詳細については、[Datadog 料金ページ][4] を参照してください。

### 公開済みワークフローの更新 {#updating-a-published-workflow}

公開済みワークフローは、準備ができるまでライブバージョンに影響を与えることなく更新できます。

公開済みワークフローを編集すると、ドラフトが作成されます。ドラフトに変更を加えても、公開済みワークフローは変更されません。各ワークフローに 1 つのアクティブなドラフトを作るができ、すべての編集者がこれを変更できます。準備ができたら、{{< ui >}}Publish Changes{{< /ui >}} をクリックすると、公開済みバージョンが置き換わります。

ドラフトは、通常のワークフローと同様に、構成されたすべてのステップを実行します。ドラフトはワークフローエディターからのみ実行できます。

ドラフトを破棄するには、エディターの右上隅にある {{< ui >}}cog icon{{< /ui >}} をクリックし、{{< ui >}}Discard draft{{< /ui >}} を選択します。

**注記**:
- 公開済みワークフローのドラフトを実行しても、コストは発生しません。
- ワークフローのプロパティ (名前、タグ、または通知) を更新すると、ドラフトフローはバイパスされて、公開済みバージョンに即座に適用されます。

## 変数とパラメーター {#variables-and-parameters}

ワークフローでの変数とパラメーターの使用に関する詳細については、[変数とパラメーター][12] を参照してください。

## ワークフロー通知 {#workflow-notifications}

通知を送信して、成功したのか失敗したのかを知らせるように、ワークフローを構成できます。次のインテグレーションがサポートされています。
- Slack
- Microsoft Teams
- PagerDuty
- E メール

通知を追加するには、以下の手順に従います。
1. ワークフロー設定パネルで、{{< ui >}}Notifications{{< /ui >}} セクションまでスクロールダウンします。
1. ワークフローが成功した場合に通知を追加するには、以下の手順に従います。
   1. {{< ui >}}Notify on success{{< /ui >}} の横にあるプラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックします。
   1. 通知に使用するインテグレーションを選択します。
   1. 指定したインテグレーションに必要なフィールドに入力します。
   1. {{< ui >}}Save{{< /ui >}} をクリックして、ワークフローを保存します。
1. ワークフローが失敗した場合に通知を追加するには、以下の手順に従います。
   1. {{< ui >}}Notify on failure{{< /ui >}} の横にあるプラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックします。
   1. 通知に使用するインテグレーションを選択します。
   1. 指定したインテグレーションに必要なフィールドに入力します。
   1. {{< ui >}}Save{{< /ui >}} をクリックして、ワークフローを保存します。

## エラー処理 {#error-handling}

オプションのエラーパスに進む前に、ワークフローで失敗したステップを再試行する回数と間隔を指定できます。エラーパスがない場合、すべての再試行が終了するとワークフローは終了します。

### 再試行 {#retries}

ステップの再試行を設定するには、以下の手順に従います。
1. ワークフローキャンバスのステップをクリックします。
1. {{< ui >}}Retries{{< /ui >}} セクションで、{{< ui >}}Interval{{< /ui >}} と {{< ui >}}Max retries{{< /ui >}} の値を調整します。
1. ワークフローを保存して、変更を適用します。

### エラーパスを追加する {#add-an-error-path}

エラーが発生した場合にワークフローがたどるエラーパスを追加できます。

エラーパスを追加するには、以下の手順に従います。
1. エラーパスを追加するステップにカーソルを合わせます。
1. {{< ui >}}Error path{{< /ui >}} アイコンをクリックしてドラッグし、 {{< img src="actions/workflows/build/error-path-icon.png" inline="true" style="width:24px;">}} キャンバス上に新しいエラーパスを配置します。
1. エラーパスに追加するワークフローステップを選択します。
1. ステップの構成後、エラーパスにさらにステップを追加することも、エラーパスをメインのワークフローパスにマージすることもできます。
1. エラーパスのステップの構成が完了したら、{{< ui >}}Save{{< /ui >}} をクリックして変更を適用します。

## 条件まで待機 {#wait-until-condition}

一部のアクションでは、ワークフローがステップを完了としてマークし、続行する前に満たさなければならない条件を追加できます。

条件を追加するには、以下の手順に従います。
1. ワークフローキャンバスのステップをクリックします。
1. {{< ui >}}Wait until condition{{< /ui >}} セクションで、ドロップダウンを使用して事前構成済みの条件を選択するか、{{< ui >}}Configure custom wait condition{{< /ui >}} を選択して独自の条件を作成します。
   - 利用可能な事前構成済み条件のリストは、アクションによって異なります。
   - 条件文の変数には、文字列、数値、ブール値、またはステップ出力変数を使用できます。
   - カスタム条件文で使用できるのは、現在のステップの出力変数のみです。
1. ワークフローの最大待機時間を入力します。時間内に条件が満たされないと、ステップは失敗します。

{{< img src="actions/workflows/build/wait-until-condition2.png" alt="「条件まで待機」の例" style="width:100%;" >}}

## JSON でワークフローを編集する {#edit-a-workflow-with-json}

ワークフローページで {{< ui >}}Edit JSON Spec{{< /ui >}} をクリックして、JSON でワークフローを編集します。JSON エディターでは、以下の操作も可能です。
- {{< ui >}}Format JSON{{< /ui >}}: JSON を整形します。
- {{< ui >}}Export JSON{{< /ui >}}: ワークフローをダウンロードします。

## API を使用してワークフローを操作する {#interact-with-workflows-using-the-api}

API を使用してタスクを実行するには、[Workflow Automation API ドキュメント][13] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][10] の **#workflows** チャンネルにご参加ください。

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /ja/actions/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /ja/actions/workflows/actions/#testing-expressions-and-functions
[7]: /ja/getting_started/tagging/
[8]: /ja/glossary/#service
[9]: /ja/account_management/teams/
[10]: https://chat.datadoghq.com/
[11]: /ja/actions/workflows/test_and_debug/#test-a-step
[12]: /ja/actions/workflows/variables/
[13]: /ja/api/latest/workflow-automation/
[14]: /ja/actions/workflows/variables/#context-variables