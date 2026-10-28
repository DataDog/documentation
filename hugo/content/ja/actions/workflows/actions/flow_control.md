---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
  - logic
  - logic step
  - flow
aliases:
- /ja/workflows/logic_actions
- /ja/service_management/workflows/actions_catalog/logic_actions/
- /ja/service_management/workflows/actions/flow_control
description: if 条件、switch 文、ループ、スリープ間隔、分岐アクションを使用して、ワークフローに制御ロジックを追加します。
disable_toc: false
further_reading:
- link: /integrations/
  tag: ドキュメント
  text: インテグレーションについて
is_beta: false
title: ワークフローロジック
type: workflows
---
[ロジックアクション][1]を使用して、ワークフローに制御ロジックを追加します。たとえば、条件からの分岐、アクションの反復実行、スリープ間隔の挿入などを行うことができます。

## if 条件 {#if-condition}

定義した 1 つ以上のステートメントの評価に基づいて、ワークフローの実行パスを分岐させることができます。以下のスクリーンショットでは、{{< ui >}}If condition{{< /ui >}} アクションが、前の HTTP リクエストアクションのステータスコードが `200` を返すかどうかに基づいてワークフローの次のステップを決定します。

{{< img src="actions/workflows/actions/flow_control/if-condition.png" alt="if 条件アクションが選択され、構成タブが開いているワークフローキャンバス。ステートメントセクションが強調表示されており、前のリクエストのステータスが 200 でなければならないことを指定する 2 つのステートメントが表示されています。" >}}

## switch 文 {#switch-statement}

switch 文アクションを使用して、単一のステップで複数の分岐パスを処理します。switch 式を指定し、1 つ以上のケース値と比較します。どのケースにも一致しない場合は、代わりにデフォルトの分岐が実行されます。以下の例では、前の HTTP リクエストからのステータスコードが `200`、`403`、`404`、`500`、またはその他の値であるかに基づいて、switch 文がワークフローをルーティングします。

{{< img src="actions/workflows/actions/flow_control/switch-statement.png" alt="'Make_request.status' という名前の switch 文アクションが異なる HTTP ステータスコードに対して複数のケースに分岐しているワークフローキャンバス。各ケースは異なる Slack メッセージを送信し、どのケースにも一致しない場合はデフォルトの分岐が予期しないエラーをスローします。" >}}

## スリープ {#sleep}

{{< ui >}}Sleep{{< /ui >}} アクションは、指定された期間、ワークフローの実行を一時停止します。{{< ui >}}Duration{{< /ui >}} ドロップダウンから定義済みの期間を選択するか、秒単位でカスタム変数を入力します。

## For ループ {#for-loop}

{{< ui >}}For loop{{< /ui >}} アクションを使用すると、指定されたリスト内の各アイテムに対して一連のアクションを繰り返し実行できます。For ループは最大 2000 個のアイテムのリストを受け入れます。For ループ内では、エラーパスの設定や変数の更新などさまざまなオペレーションを実行できます。

以下の例では、For ループがインシデントのリストを反復処理し、1 週間以上経過したインシデントに対して Slack メッセージを送信します。

{{< img src="actions/workflows/actions/flow_control/iteration2.png" alt="For ループを含むワークフロー。このループはインシデントのリストを反復処理し、インシデントが 1 週間以上経過している場合に Slack チャンネルにメッセージを送信します。" style="width:100%;" >}}

ワークフローに For ループを追加するには、以下を実行します。
1. ワークフローキャンバスのプラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックし、アクションカタログを開きます。
1. {{< ui >}}For loop{{< /ui >}} ステップを検索し、選択します。
1. ループステップをクリックし、繰り返し実行するステップの {{< ui >}}Input list{{< /ui >}} を入力します。カスタムリストを入力するか、ワークフロー変数を使用できます。
1. ループフレーム内で、({{< ui >}}\+{{< /ui >}}) アイコンをクリックして、ループにステップを追加します。
1. ループするアクションを設定します。入力リスト内の現在の値にアクセスするには、`{{Current.Value}}` variable. To access the index of the current value, use `{{Current.Index}}` を使用します。
1. ループに必要な追加ステップを追加し、設定します。{{< ui >}}if statement{{< /ui >}} および {{< ui >}}break{{< /ui >}} を使用して、ループを早期に終了できます。
1. ワークフローを {{< ui >}}Save{{< /ui >}}および {{< ui >}}Publish{{< /ui >}}します。

実行が完了すると、ワークフローは {{< ui >}}Debug{{< /ui >}} モードに入ります。ループ内のステップを選択すると、そのステップの {{< ui >}}All{{< /ui >}}、{{< ui >}}Failed{{< /ui >}}、または {{< ui >}}Successful{{< /ui >}} 反復リストが表示されます。反復を選択しすると、出力またはエラーメッセージが表示されます。

## While ループ {#while-loop}

{{< ui >}}While loop{{< /ui >}} アクションを使用すると、一連の条件に基づいて一連のアクションを繰り返し実行できます。これは、繰り返しの回数が事前にわからない自動化パターンに推奨されます。While ループは最大 2000 回まで繰り返されます。While ループを使用すると、ページ区切り、進捗状況のポーリング、成功するまでの再試行など、さまざまなオペレーションを実行できます。

次の例では、While ループを使用してアプリの AWS S3 List Buckets API のページ区切りをしています。

{{< img src="actions/workflows/actions/flow_control/iteration3.png" alt="While ループを含むワークフロー。このワークフローでは、While ループを使用してアプリの AWS S3 List Buckets API のページ区切りをしています。" style="width:100%;" >}}

ワークフローに While ループを追加するには、以下を実行します。
1. ワークフローキャンバスのプラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックし、アクションカタログを開きます。
1. {{< ui >}}While loop{{< /ui >}} ステップを検索し、選択します。
1. ループステップをクリックし、各反復の前に While ループが評価する条件を定義します。条件が true の場合はループが継続し、false と評価されると停止します。
1. ループフレーム内で、プラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックして、ループにステップを追加します。
1. ループするアクションを設定します。現在の値のインデックスにアクセスするには、`{{Current.Index}}` を使用します。
1. ループに必要な追加ステップを追加し、設定します。{{< ui >}}if statement{{< /ui >}} および {{< ui >}}break{{< /ui >}} アクションを使用して、ループを早期に終了できます。
1. ワークフローを {{< ui >}}Save{{< /ui >}}および {{< ui >}}Publish{{< /ui >}}します。

実行が完了すると、ワークフローは {{< ui >}}Debug{{< /ui >}} モードに入ります。ループ内のステップを選択すると、そのステップの {{< ui >}}All{{< /ui >}}、{{< ui >}}Failed{{< /ui >}}、または {{< ui >}}Successful{{< /ui >}} 反復リストが表示されます。反復を選択しすると、出力またはエラーメッセージが表示されます。While ループステップと特定のインデックスを選択すると、そのインデックスで評価された条件が表示されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][2] の **#workflows** チャンネルにご参加ください。

[1]: https://app.datadoghq.com/workflow/action-catalog#logic//com.datadoghq.core.if
[2]: https://chat.datadoghq.com/