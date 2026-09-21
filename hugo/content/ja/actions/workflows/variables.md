---
algolia:
  tags:
  - workflow variables
  - variables
  - mutable
aliases:
- /ja/service_management/workflows/actions/set_variables/
- /ja/service_management/workflows/variables
description: コンテキスト変数、入力パラメータ、出力パラメータ、およびカスタム変数を使用して、ワークフローのステップ間でデータを渡します。
disable_toc: false
further_reading:
- link: /actions/workflows/actions/flow_control#for-loop
  tag: ドキュメント
  text: for ループを使用してアクションを繰り返し実行する
title: 変数とパラメーター
---
ワークフローでは、以下の変数とパラメーターを利用できます。
- [コンテキスト変数](#context-variables): コンテキスト変数は、ワークフローに関するコンテキスト情報を格納する、またはトリガーとなるイベントやワークフロー内のステップからワークフローに渡されるデータを含む、変更できない変数の総称です。
- [入力パラメーター](#input-parameters): 入力パラメーターは、実行時にワークフローにデータを渡すために利用可能な、変更できないキーと値のペアです。
- [出力パラメーター](#output-parameters): 出力パラメーターを使用すると、ワークフローの結果を別のワークフローに渡すことができます。
- [カスタム変数](#custom-variables): カスタム変数は変更可能です。これを使用すると、ワークフロー全体で変数を宣言、更新、およびアクセスできます。

## コンテキスト変数 {#context-variables}

有用なワークフローを作成する際に、あるステップから別のステップへデータを渡したり、ワークフローのトリガーソースからのデータに基づいて動作するステップを構成したりする必要が生じることがあります。このようなデータ補間には、コンテキスト変数を使用できます。

- **ワークフロー変数**は、現在のワークフローに関する情報を提供します。
    - `WorkflowName`: ワークフローの名前。
    - `WorkflowId`: ワークフローの ID。
    - `InstanceId`: ワークフローの実行インスタンスの ID。
- 一部のステップには組み込みの**ステップ出力変数**があり、そのステップからワークフロー内の後続のステップにデータを渡すことができます。
- **トリガー変数**は、トリガーとなるイベントによってワークフローに渡されます。
- **ソースオブジェクト変数**は、トリガーとなるイベントによってワークフローに渡されます。

各ステップの [{{< ui >}}Context Variables{{< /ui >}}] (コンテキスト変数) タブには、そのステップで利用可能なすべてのコンテキスト変数のマップが表示されます。

{{< img src="actions/workflows/variables/context-variables5.png" alt="[Context Variables] タブ" >}}

ステップ内でコンテキスト変数にアクセスするには、二重中括弧 (`{{`) で囲みます。コンテキスト変数内のフィールドにアクセスするには、[Handlebars 式構文][4] を使用します。

### ステップ出力変数 {#step-output-variables}

一部のステップでは、ワークフロー内の後続のステップで使用可能な出力が生成されます。`Steps.<step_name>.<variable>` という構文でステップ変数にアクセスします。たとえば、GitHub のプルリクエストステータスステップ (`state`) からプルリクエストのステータス変数 (`Get_pull_request_status`) を取得するには、次のコンテキスト変数を使用します。

```
{{ Steps.Get_pull_request_status.state }}
```

目的の変数が不明な場合、入力中に Datadog が既存のステップ出力を候補として表示します。または、[{{< ui >}}Context Variables{{< /ui >}}] タブで利用可能な変数のリストを確認することもできます。

{{< img src="actions/workflows/variables/step-outputs2.png" alt="入力中に、Datadog が既存のステップ出力の候補を表示します。" style="width:100%;" >}}

### ソースオブジェクト変数 {#source-object-variables}

ソースオブジェクト変数は、実行時に解決される、トリガーとなったイベントのプロパティです。ワークフローで使用可能な変数は、ワークフローインスタンスを開始したトリガーのタイプによって異なります。たとえば、ワークフローインスタンスがモニターによってトリガーされる場合、モニター ID の変数を次で利用できます: `{{Source.monitor.id}}`. If the workflow is triggered by a security signal detection or notification rule, the signal ID is available using `{{Source.securitySignal.id}}` で利用できます。

ソースオブジェクトのすべての変数が [{{< ui >}}Context Variables{{< /ui >}}] タブに表示されます。

{{< img src="actions/workflows/variables/context-variables-tab-source-object-variables2.png" alt="[Context Variables] タブ内のソースオブジェクト変数" style="width:60%;">}}

## 入力パラメーター {#input-parameters}

入力パラメーターは、ワークフローにデータを渡すために利用可能な、変更できないキーと値のペアです。入力パラメーターは、次のようなワークフローで使用できます。
- Dashboard などから手動でトリガーされるワークフロー。
- モニターやセキュリティシグナル通知ルールなど、メンショントリガーを使用するワークフロー。

入力パラメーターを追加するには、次のようにします。
1. ワークフローキャンバスをクリックします。
1. [{{< ui >}}Input Parameters{{< /ui >}}] の横にある {{< ui >}}\+{{< /ui >}} アイコンをクリックします。
1. パラメーターの名前、データ型、および説明を追加します。表示名は、パラメーター名から自動的に生成されます。カスタマイズするには、[{{< ui >}}Use custom display name{{< /ui >}}] (表示名をカスタマイズ) ボックスにチェックを入れます。表示名は人間が読み取れるパラメーター名です。パラメーター名は、ワークフローのステップでパラメータを参照するために使用されます。
1. 必要に応じて、パラメーターのデフォルト値を追加します。デフォルト値を追加した場合、実行時にそのパラメータの入力は任意になります。

ステップで入力パラメーターを参照するには、次の構文を使用します: `{{ Trigger.<parameter name>}}`. For example, to reference an input parameter named `user`, use `{{Trigger.user}}` と記述します。

[{{< ui >}}Input Parameters{{< /ui >}}] セクションには、既存のすべての入力パラメーターの名前とカウンターが表示されます。カウンターにカーソルを合わせると、どのステップでそのパラメーターが使用されているかを確認できます。

{{< img src="actions/workflows/variables/input-parameter3.png" alt="カウンターにカーソルを合わせると、どのステップでそのパラメーターが使用されているかを確認できます。" style="width:60%;">}}

ワークフローステップで、`{{ Trigger.<parameter name> }}` という構文を使って入力パラメータを記述すると、暗黙的な入力パラメーター (ワークフローにまだ存在しないパラメーター) を追加できます。次回ワークフローを保存する際にダイアログが表示され、そのパラメーターを明示的なパラメーターに変換できるす。ワークフローのトリガーについては、「[ワークフローをトリガーする][5]」を参照してください。

既存の入力パラメーターを探している場合は、`{{ Trigger.` と入力し始めると、候補として表示されるかどうかを確認できます。または、[{{< ui >}}Context Variables{{< /ui >}}] タブを参照して、利用可能なパラメーターのリストを確認してください。

## 出力パラメーター {#output-parameters}

出力パラメーターを使用すると、ワークフローの結果にアクセスできます。これは、ワークフローの結果を別のワークフローや App Builder アプリに渡す場合に便利です。

出力パラメーターを追加するには、次のようにします。
1. ワークフローキャンバスをクリックします。
1. [{{< ui >}}Output Parameters{{< /ui >}}] (出力パラメーター) の横にある {{< ui >}}\+{{< /ui >}} アイコンをクリックします。
1. パラメーターの名前、値、およびデータ型を追加します。
1. 必要に応じて、パラメーターのデフォルト値を追加します。デフォルト値を追加した場合、実行時にそのパラメータの入力は任意になります。

[{{< ui >}}Output Parameters{{< /ui >}}] セクションには、既存のすべての出力パラメーターの名前とカウンターが表示されます。

ワークフロー間でデータを渡す方法の詳細については、「[子ワークフローの結果にアクセスする][7]」を参照してください。

ワークフローと App Builder 間で情報を渡すために出力パラメーターを使用する例については、「[アプリにワークフローの結果を返す][6]」を参照してください。

## カスタム変数 {#custom-variables}

変更可能なワークフロー変数を設定するには、[Set variable][1] アクションを使用します。このアクションを使用すると、ワークフロー全体でカスタム変数を宣言、更新、および取得できるため、より複雑なワークフロー処理を実行できます。例:
- _API のページネーションの処理_: API リクエストでは、ページトークンやオフセットを追跡する必要がある場合があります。
- _リストの処理_: 変数を使用して配列を初期化し、マップやリデュースなどのアクションを実行できます。
- _反復処理_: 変数を使用すると、[for ループ][2] 内でデータを操作および保存できます。そのデータは、ワークフローの残りの部分で使用できます。

### カスタム変数を設定する {#set-a-custom-variable}

カスタム変数を設定するには、次のようにします。
1. ワークフローキャンバスのプラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックし、アクションカタログを開きます。
1. [{{< ui >}}Set variable{{< /ui >}}] (変数の設定) ステップを検索して、選択します。
1. [{{< ui >}}Set variable{{< /ui >}}] ステップをクリックし、{{< ui >}}Step name{{< /ui >}} (ステップ名) を入力します。
1. {{< ui >}}variable name{{< /ui >}} (変数名) を入力します。変数名は文字で始まる必要があり、英数字とアンダースコアのみを使用できます。
1.  変数の値を入力します。
   ワークフローのコンテキスト変数を使用する場合は、- `{{`` と入力します。
   - オブジェクトを作成するには、{{< ui >}}Create object{{< /ui >}} <i class="icon-api"></i> (オブジェクトの作成) ボタンをクリックします。
   - 配列を作成するには、{{< ui >}}Create array{{< /ui >}} <span id="icon-array">[ ]</span> (配列の作成) ボタンをクリックします。

設定後にカスタム変数の値を変更する必要がある場合は、追加の [{{< ui >}}Set variable{{< /ui >}}] (変数の設定) ステップを追加し、変数を再割り当てするか、新しい変数を作成する必要があります。

[{{< ui >}}Set variable{{< /ui >}}] ステップを示すワークフローの例を次に示します。

1. ワークフローで、まず [{{< ui >}}Set variable{{< /ui >}}] ステップを追加し、`intList` という変数を宣言して、値 `[1,2,3,4]` を指定します。
1. 2 番目の [{{< ui >}}Set variable{{< /ui >}}] ステップを追加し、`evenList` という名前の変数を宣言して値 `${Variables.intList.filter(number => number % 2 === 0)}` を指定します。これは、奇数を除外する [インライン JavaScript 式][8] です。
1. [{{< ui >}}Echo{{< /ui >}}] (エコー) ステップを追加し、`evenList` の値 (`2,4`) を出力します。

{{< img src="actions/workflows/variables/set-variable-updated.png" alt="このワークフローは、数値のリストを保持する変数を設定し、インライン式を使用してリスト内の奇数を除外する 2 番目の変数を宣言し、その 2 番目の変数の値を出力します。" style="width:100%;" >}}

### カスタム変数にアクセスする {#access-a-custom-variable}

ワークフローでカスタム変数にアクセスするには、次を使用します: `{{ Variables.variableName }}`. For example, to access a custom variable named `DashboardList`, use `{{ Variables.DashboardList }}` を使用します。

### 反復処理{#iteration}

[{{< ui >}}For loop{{< /ui >}}] (For ループ) または [{{< ui >}}While loop{{< /ui >}}] (While ループ) 内でカスタム変数を設定すると、ループの外で使用するデータを保存できます。たとえば、[{{< ui >}}For loop{{< /ui >}}] 内で複数の API リクエストを行う場合、カスタム変数を設定し、各反復処理で必要なデータをその変数に追加していくことができます。ループの外で、そのカスタム変数にアクセスして、収集したデータを処理できます。

未定義の変数による型エラーを回避するため、ループ内で使用する前にカスタム変数を割り当ててください。以下の例では、カスタム変数 `evenList` をループ内で使用する前に、空の配列として設定しています。

{{< img src="actions/workflows/variables/loop.png" alt="このワークフローは、ループ内で使用される前に変数を設定します。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][3] の **#workflows** チャネルにご参加ください。

[1]: https://app.datadoghq.com/workflow/action-catalog#/com.datadoghq.core/com.datadoghq.core.setVariable
[2]: /ja/actions/workflows/actions/flow_control#for-loop
[3]: https://chat.datadoghq.com/
[4]: https://handlebarsjs.com/guide/expressions.html#expressions
[5]: /ja/actions/workflows/trigger
[6]: /ja/actions/app_builder/queries/#return-workflow-results-to-an-app
[7]: /ja/actions/workflows/trigger/#access-the-result-of-a-child-workflow
[8]: /ja/actions/workflows/expressions/#inline-javascript-expressions