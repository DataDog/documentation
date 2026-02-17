---
algolia:
  tags:
  - ワークフロー
  - workflows/
  - ワークフローの自動化
aliases:
- /ja/workflows/build
disable_toc: false
further_reading:
- link: /getting_started/workflow_automation/
  tag: Documentation
  text: Workflow Automation を始める
- link: /actions/actions_catalog
  tag: ドキュメント
  text: アクションカタログで利用可能なアクションを参照する
- link: /security/cloud_security_management/workflows
  tag: ドキュメント
  text: Workflow Automation によるセキュリティワークフローの自動化
- link: /service_management/workflows/variables
  tag: ドキュメント
  text: 変数とパラメーター
title: ワークフローの構築
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Workflow Automation はサポートされていません。</div>
{{< /site-region >}}

[Workflow Automation][1] ページからワークフローを作成するか、既存のワークフローを編集できます。このページには、既存のワークフローに関する情報として、ワークフローの所有者、トリガー タイプ、各ワークフローの最終更新日と実行日、公開済みかどうかが一覧表示されます。 
- ワークフローにカーソルを合わせると、そのワークフローの削除、クローン作成、権限の編集オプションが表示されます。 
- 自分が作成したワークフローだけを表示したい場合は、**My workflows** をトグルします。

## ブループリントからワークフローを構築

1. [**Blueprints**][5] タブをクリックします。 
1. 必要に応じて、検索バーを使用して、名前、カテゴリー、インテグレーションでブループリントのリストを絞り込むことができます。
1. 使用したいブループリントを探し、クリックします。ワークフローキャンバスが表示されます。
1. **Create From Blueprint** をクリックします。ワークフローキャンバスが更新され、新しく作成されたワークフローが表示されます。
1. ワークフローの新しい名前と説明を入力します。 
1. 必要に応じて、このワークフローに適用するタグを選択または入力します。Datadog タグの詳細は、[Tags の はじめに][7] を参照してください。 
1. 必要に応じて、関連する [サービス][8] を選択してワークフローに適用します。 
1. 必要に応じて、このワークフローに関連付ける [Teams][9] を選択します。チームが存在しない場合は、名前を入力して作成できます。 
1. **Save** をクリックして変更を適用します。
1. 更新が必要なワークフローステップには、感嘆符が表示されます。修正したい各ワークフローステップをクリックし、**Configure** タブの空白フィールドを埋めます。
1. ワークフローの修正が完了したら、**Run** をクリックしてワークフローをテストします。
1. ワークフローを公開する準備ができたら、**Publish** をクリックします。公開されたワークフローは、ワークフローの実行に基づいてコストが発生します。詳細は、[Datadog の料金ページ][4]を参照してください。

## AI でワークフローを作成する

何から始めたらよいかわからない場合は、AI でワークフローを自動生成することができます。ワークフローを生成するには

1. [Workflow Automation][1] ページから、**New Workflow** をクリックします。
1. **<i class="icon-bits-ai"></i> Build with Bits AI** をクリックします。 
1. ワークフローの詳細を入力します。使用するインテグレーションとアクションを指定します。
1. 上向き矢印 (**↑**) をクリックしてアプリを作成します。

## カスタムワークフローの作成

ワークフローを作成するには、[Workflow Automation][1] ページで **New workflow** をクリックします。 

ワークフローを構成するには: 
1. ワークフロー構成パネルで、ワークフローの **Name** を入力します。 
1. 必要に応じて、このワークフローに適用するタグを選択または入力します。Datadog タグの詳細は、[Tags の はじめに][7] を参照してください。 
1. 必要に応じて、関連する [サービス][8] を選択してワークフローに適用します。 
1. 必要に応じて、このワークフローに関連付ける [Teams][9] を選択します。チームが存在しない場合は、名前を入力して作成できます。 
1. ワークフローで入力または出力パラメーターを使用する場合は、それらを入力してください。
1. **Save** をクリックして変更を適用します。 

ワークフローの構成に確信が持てない場合でも、後でワークフロー キャンバス上の任意の場所をクリックして、このパネルに戻ることができます。 

### ワークフロービルダーでワークフローを構築する

1. ワークフローにトリガーが必要な場合は **Add Trigger** をクリックします。詳細は [ワークフローをトリガーする][3] を参照してください。 
1. **Add Step** をクリックして、ワークフローにステップの追加を開始します。 
1. 検索バーを使ってアクションを検索するか、インテグレーションとその関連アクションをブラウズして、探しているアクションを見つけます。アクションをクリックすると、ワークフローキャンバスのステップに追加されます。
1. ワークフロー キャンバス上のステップをクリックして、その設定を行うか、出力やコンテキスト変数を表示します。出力とコンテキスト変数の詳細は、[コンテキスト変数][14] を参照してください。 
1. ステップの構成後、別のステップを追加するには AI アイコン <i class="icon-bits-ai"></i> またはプラス アイコン (**+**) をクリックします。完了したら、ワークフローを保存します。
1. ワークフローを公開する準備ができたら、**Publish** をクリックします。公開されたワークフローは、ワークフローの実行に基づいてコストが発生します。詳細は、[Datadog の料金ページ][4]を参照してください。

ワークフロー上のステップをクリックすることで、いつでも編集することができます。ワークフロー上のステップをクリックしてドラッグすると、ステップを並べ替えることができます。

#### ショートカットとキャンバス ツール

ワークフロー ビルダー キャンバスのキーボードおよびマウスのショートカットを表示するには、`?` を入力します (Shift + `/`)。または **Keyboard** {{< img src="service_management/workflows/keyboard-icon.png" inline="true" style="width:40px;">}} ボタンをクリックします。ショートカットの一覧が表示されます。 

**Zoom out** {{< img src="service_management/workflows/zoom-out-mag-icon.png" inline="true" style="width:30px;">}}、**Zoom in** {{< img src="service_management/workflows/zoom-in-mag-icon.png" inline="true" style="width:30px;">}}、および **Reset viewport** {{< img src="service_management/workflows/reset-viewport-icon.png" inline="true" style="width:34px;">}} の各ボタンでビューポートの表示方法を制御します。 

**Auto layout** {{< img src="service_management/workflows/auto-layout-icon.png" inline="true" style="width:80px;">}} ボタンは、ワークフローの各ステップを整列および分配します。 

**Add annotation** {{< img src="service_management/workflows/add-annotation-icon.png" inline="true" style="width:30px;">}} ボタンで、ワークフローにアノテーション ノートを追加できます。これらのノートには、太字や斜体、リンク、リストなどのテキスト フォーマットを追加できるフォーマット バーが用意されています。アノテーションは Markdown で入力することもできます。 

{{< img src="service_management/workflows/workflow-annotation-with-bar.png" alt="空のアノテーション。上部にフォーマット バーが表示されている" style="width:70%;" >}}

## ステップをテストする

[ステップのテスト方法][11] については、テストとデバッグのページを参照してください。 

## ワークフローの公開

スケジュールされたワークフローおよびトリガーされたワークフローは、公開するまで自動的にトリガーされません。ワークフローを公開するには、ワークフローのページから **Publish** をクリックします。

公開されたワークフローは、ワークフローの実行に基づいてコストが発生します。詳細は、[Datadog の料金ページ][4]を参照してください。

## Variables and parameters

ワークフローで変数とパラメーターを使用する方法については、[変数とパラメーター][12] を参照してください。

## ワークフローの通知

ワークフローの成功時または失敗時に通知を送信するよう構成できます。サポートされるインテグレーションは次のとおりです: 
- Slack
- Microsoft Teams
- PagerDuty
- Email

通知を追加するには: 
1. ワークフロー構成パネルで、**Notifications** セクションまでスクロールします。
1. ワークフローが成功した場合の通知を追加するには:
   1. **Notify on success** の横にあるプラス アイコン (`+`) をクリックします。
   1. 通知に使用するインテグレーションを選択します。
   1. 指定したインテグレーションに必要なフィールドを入力します。
   1. **Save** をクリックしてワークフローを保存します。
1. ワークフローが失敗した場合の通知を追加するには:
   1. **Notify on failure** の横にあるプラス アイコン (`+`) をクリックします。
   1. 通知に使用するインテグレーションを選択します。
   1. 指定したインテグレーションに必要なフィールドを入力します。
   1. **Save** をクリックしてワークフローを保存します。

## エラー処理

任意のエラー パスに進む前に、ワークフローで失敗したステップを再試行する回数と、その間隔を指定できます。エラー パスが存在しない場合は、すべての再試行が尽きた時点でワークフローは終了します。

### 再試行

ステップの再試行を構成するには:
1. ワークフローキャンバスのステップをクリックします。
1. **Retries** セクションで、**Interval** と **Max retries** の値を調整します。
1. ワークフローを保存して、変更を適用します。 

### エラー パスを追加する

ワークフローがエラーに遭遇したときにたどるエラー パスを追加できます。

エラー パスを追加するには:
1. エラー パスを追加したいステップにカーソルを合わせます。
1. **Error path** アイコン {{< img src="service_management/workflows/error-path-icon.png" inline="true" style="width:24px;">}} をクリックしてドラッグし、キャンバス上に新しいエラー パスを配置します。
1. エラー パスに追加するステップを選択します。
1. ステップを構成した後は、さらにステップを追加したり、エラー パスをメインのワークフロー パスに統合したりできます。
1. エラー パスのステップ構成が完了したら、**Save** をクリックして変更を適用します。

## Wait until condition

一部のアクションでは、ワークフローがステップを完了としてマークして先に進む前に満たす必要がある条件を追加できます。

条件を追加するには:
1. ワークフローキャンバスのステップをクリックします。
1. **Wait until condition** セクションで、ドロップダウンから事前設定済みの条件を選択するか、**Configure custom wait condition** を選択して独自の条件を作成します。
   - 使用可能な事前設定済みの条件の一覧は、アクションによって異なります。
   - 条件式で使用できる変数は、文字列、数値、ブール値、またはステップの出力変数です。
   - カスタム条件式で使用できるのは、現在のステップの出力変数のみです。
1. ワークフローの最大待機時間を入力します。条件が時間内に満たされない場合、そのステップは失敗します。

{{< img src="service_management/workflows/wait-until-condition2.png" alt="Wait until condition の例" style="width:100%;" >}}

## JSON でワークフローを編集する

ワークフローのページで **Edit JSON Spec** をクリックすると、JSON でワークフローを編集することができます。また、JSON エディターでは、以下のことが可能です。
- **Format JSON**: JSON を美しくします。
- **Export JSON**: ワークフローをダウンロードします。

## API を使用してワークフローを操作する

API を使用してタスクを実行する方法は、[Workflow Automation API ドキュメント][13] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>質問やフィードバックはありますか？ [Datadog コミュニティ Slack][10] の **#workflows** チャンネルに参加してください。

[1]: https://app.datadoghq.com/workflow
[2]: https://handlebarsjs.com/guide/expressions.html#expressions
[3]: /ja/service_management/workflows/trigger
[4]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[5]: https://app.datadoghq.com/workflow/blueprints
[6]: /ja/service_management/workflows/actions/#testing-expressions-and-functions
[7]: /ja/getting_started/tagging/
[8]: /ja/glossary/#service
[9]: /ja/account_management/teams/
[10]: https://datadoghq.slack.com/
[11]: /ja/service_management/workflows/test_and_debug/#test-a-step
[12]: /ja/service_management/workflows/variables/
[13]: /ja/api/latest/workflow-automation/
[14]: /ja/service_management/workflows/variables/#context-variables