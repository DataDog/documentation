---
aliases:
- /ja/app_builder/queries
- /ja/service_management/app_builder/queries
description: UI コンポーネントとバックエンドのアクションを接続するクエリを使用して、Datadog API およびインテグレーションからのデータをアプリに設定します。
disable_toc: false
further_reading:
- link: /actions/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
title: クエリ
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App Builder は、Datadog Government サイト US1-FED でプレビュー版として提供されています。
</div>
{{< /site-region >}}

クエリは、Datadog API またはサポートされているインテグレーションからのデータをアプリに設定するアクションです。クエリは他のクエリや UI コンポーネントから入力を受け取り、他のクエリや UI コンポーネントで使用するための出力を返します。

Datadog アプリ内の [Action Catalog][10] には、App Builder を使用してインフラストラクチャーやインテグレーションに対するクエリとして実行できるアクションが用意されています。クラウドプロバイダー、SaaS ツール、Datadog アカウントでタスクを実行するアクションを連携させることで、エンドツーエンドのプロセスを調整および自動化できます。

クエリを追加するには、[Data] (データ) ({{< ui >}}{&nbsp;}{{< /ui >}}) アイコンをクリックして [Data] タブを開きます。プラス ({{< ui >}}\+{{< /ui >}}) をクリックし、[{{< ui >}}Actions{{< /ui >}}] (アクション) を選択して「query」(クエリ) と検索し、アプリに追加するアクションを見つけます。追加したクエリアクションは、[{{< ui >}}Actions{{< /ui >}}] リストに表示されます。クエリを選択して構成します。

Bits AI を使用して、クエリの追加、構成、トリガーを行うこともできます。[{{< ui >}}Build with AI{{< /ui >}}] (AI で作成) アイコン (**<i class="icon-bits-ai"></i>**) をクリックして開始します。

クエリは、認証のために[接続][5]を利用します。App Builder は、[Workflow Automation][6] と接続を共有します。

## Run settings (実行設定) {#run-settings}

[{{< ui >}}Run Settings{{< /ui >}}] によって、クエリがいつ実行されるかが決まります。これには 2 つのオプションがあります。

- [{{< ui >}}Auto{{< /ui >}}] (自動): アプリの読み込み時、およびクエリの引数が変更されるたびにクエリが実行されます。
- [{{< ui >}}Manual{{< /ui >}}] (手動): アプリの別の部分によってトリガーされたときにクエリが実行されます。たとえば、ユーザーが UI ボタンコンポーネントをクリックしたときにのみクエリが実行されるようにする場合は、手動トリガーを使用します。イベントトリガーの詳細については、「[イベント][11]」を参照してください。

## 高度なクエリオプション {#advanced-query-options}

### デバウンス {#debounce}

デバウンスを設定すると、ユーザー入力ごとにクエリが 1 回のみトリガーされます。デフォルトでは、デバウンスは `0` ミリ秒 (ms) に設定されています。クエリが頻繁に呼び出されるのを防ぐには、デバウンスを増やしてください。クエリの [{{< ui >}}Advanced{{< /ui >}}] (高度) セクションでデバウンスを設定します。

### 条件付きクエリ {#conditional-queries}

クエリを実行する前に満たす必要がある条件を設定できます。クエリの条件を設定するには、クエリの [{{< ui >}}Advanced{{< /ui >}}] セクションにある [{{< ui >}}Condition{{< /ui >}}] (条件) フィールドに式を入力します。この条件が true と評価された場合にのみ、クエリを実行できます。たとえば、`select0` という名前の UI コンポーネントが存在し、かつ空ではない場合にのみ特定のクエリを実行する場合は、次の式を使用します。

{{< code-block lang="js" >}}${select0.value && select0.value.length > 0}{{< /code-block >}}

### クエリ後変換 {#post-query-transformation}

クエリ後変換を実行して、クエリの出力を簡素化または変換します。クエリの [{{< ui >}}Advanced{{< /ui >}}] セクションにクエリ後変換を追加します。

たとえば、Slack の [_List Channels_] (チャンネルの一覧表示) アクションは、各チャンネルの ID と名前を含む辞書の配列を返します。IDを破棄して名前の配列のみを返すには、次のクエリ変換を追加します。

{{< code-block lang="js" collapsible="false" >}}
// Use `outputs` to reference the query's unformatted output.
// TODO: Apply transformations to the raw query output
arr = []
object = outputs.channels
for (var item in object) {
    arr.push(object[item].name);
}

return arr
{{< /code-block >}}

### クエリ後フック {#post-query-hooks}

UI コンポーネントイベントと同様に、クエリの実行後にトリガーされる反応を設定できます。クエリ後フックを使用すると、UI コンポーネントの状態の設定、モーダルの開閉、別のクエリのトリガー、さらにはカスタム JavaScript の実行も行うことができます。たとえば、[ECS Task Balancer][7] ブループリントの `scaleService` クエリは、クエリ後フックを使用して、実行後に `describeService` クエリを再実行します。

クエリ後フックで[状態関数][12]を使用できます。

### エラー通知 {#error-notifications}

システムがエラーを返したときにトースト (短い通知メッセージ) をユーザーに表示するには、クエリの [{{< ui >}}Advanced{{< /ui >}}] セクションで [{{< ui >}}Show Toast on Errors{{< /ui >}}] (エラー発生時にトーストを表示する) をオンにします。

### 確認プロンプト {#confirmation-prompts}

クエリの実行前にユーザーに確認を求める場合は、クエリの [{{< ui >}}Advanced{{< /ui >}}] セクションで [{{< ui >}}Requires Confirmation{{< /ui >}}] (確認を要求する) オプションをオンにします。

### ポーリング間隔 {#polling-intervals}

ユーザーの画面でアプリが開いている間、設定した間隔でクエリを繰り返し実行するには、クエリの [{{< ui >}}Advanced{{< /ui >}}] セクションの [{{< ui >}}Polling interval{{< /ui >}}] (ポーリング間隔) に間隔をミリ秒 (ms) 単位で入力します。

**注**: クエリはバックグラウンドでは実行されません。アプリが開いているときにのみ実行されます。

## Mocked outputs (モック出力) {#mocked-outputs}

エディターでアプリを作成またはテストしているときに、実際のクエリを実行したくない場合や、同じクエリを繰り返し実行したくない場合があります。[{{< ui >}}Mocked outputs{{< /ui >}}] を有効にしてクエリを実行すると、App Builder はクエリアクションを実行する代わりに、モックデータを出力に取り込みます。

以前のクエリ実行からモック出力を生成することも、手動で提供することもできます。

### 以前の実行から出力を生成する {#generate-outputs-from-previous-run}

以前のクエリ実行からモック出力データを生成するには、次の手順を実行します。

1. クエリを追加し、クエリの残りのパラメーターを入力します。
1. [{{< ui >}}Run{{< /ui >}}] (実行) をクリックして、クエリを 1 回実行します。
1. クエリの [{{< ui >}}Mocked outputs{{< /ui >}}] セクションで、[{{< ui >}}Generate{{< /ui >}}] (生成) タブをクリックします。
1. [{{< ui >}}Generate from outputs{{< /ui >}}] (出力から生成) をクリックします。これにより、[{{< ui >}}Use Mocked Outputs{{< /ui >}}] が自動的にオンになります。<br>
    [{{< ui >}}Run{{< /ui >}}] ボタンが [{{< ui >}}Run (Mocked){{< /ui >}}] (実行 (モック)) に変わり、次にクエリを実行したときには出力にモックデータが取り込まれます。

### 手動で出力を提供する {#provide-outputs-manually}

モック出力を手動で提供するには、以下の手順を実行します。

{{% collapse-content title="GUI の使用" level="p" %}}
1. クエリを追加し、クエリの残りのパラメーターを入力します。
1. クエリの [{{< ui >}}Mocked outputs{{< /ui >}}] セクションで、[{{< ui >}}GUI{{< /ui >}}] タブをクリックします。
1. GUI ビューに自動的に表示されるすべての必須フィールドに入力します。
1. 必要に応じて、フィールドを追加するには ({{< ui >}}\+{{< /ui >}}) をクリックします。ドロップダウンからキーを選択し、値を入力します。オブジェクトまたは配列である値を入力する場合は、[{{< ui >}}Enter value{{< /ui >}}] (値を入力) フィールドの後にそれぞれ [{{< ui >}}{}{{< /ui >}}] または [{{< ui >}}[]{{< /ui >}}] をクリックします。
{{% /collapse-content %}}

{{% collapse-content title="JSON の使用" level="p" %}}
1. クエリを追加し、クエリの残りのパラメーターを入力します。
1. クエリの [{{< ui >}}Mocked outputs{{< /ui >}}] セクションで、[{{< ui >}}JSON{{< /ui >}}] タブをクリックします。
1. クエリの期待される出力形式と一致する JSON を貼り付けます。<br>
    期待される出力形式が不明な場合は、クエリを一度実行し、クエリの [{{< ui >}}Inspect Data{{< /ui >}}] (データの調査) セクションにある `outputs` を参照してください。
{{% /collapse-content %}}


## 操作の順序 {#order-of-operations}

クエリを実行する際、App Builder は以下の手順を記載された順序で実行します。

1. クエリに [{{< ui >}}Condition{{< /ui >}}] (条件) 式があるかどうかを確認し、ある場合はその条件が満たされているかを確認します。条件が満たされていない場合、実行が停止します。
2. クエリの入力データを決定するために、[{{< ui >}}Inputs{{< /ui >}}] (入力) 内の式を評価します。
3. [{{< ui >}}Debounce{{< /ui >}}] (デバウンス) プロパティが設定されている場合、デバウンス値で定義された間隔だけ実行が遅延します。この時間内にクエリの入力やその依存関係が更新された場合、現在のクエリ実行が停止され、更新された入力を使用して新しい実行が初めから開始されます。<br>
   **注**: デバウンス間隔内に複数のクエリリクエストが発生した場合、最後の実行リクエストを除くすべてのリクエストがキャンセルされます。
4. クエリを実行します。
5. 生のクエリレスポンスを `query.rawOutputs` に保存します。
6. クエリ後変換を実行し、`query.outputs` をその結果と等しくなるように設定します。このプロセスによって、アプリデータのスナップショットが取得され、それがクエリ後変換に渡されます。<br>
   **注**: クエリ後変換は、副作用のない純粋関数である必要があります。たとえば、クエリ後変換でステート変数を更新してはなりません。
7. アプリで、クエリ出力からのデータを利用する式を計算します。
8. アプリの [{{< ui >}}Events{{< /ui >}}] (イベント) からすべての [{{< ui >}}Reactions{{< /ui >}}] (リアクション) を、UI で定義されている順序で実行します。この際、リアクションの実行全体で使用されるアプリのスナップショットが取得されます。各リアクションの実行前に新しいスナップショットが取得され、前のリアクションによって行われた変更が後続のリアクションでわかるようになります。
9. [{{< ui >}}Polling interval{{< /ui >}}] が設定されている場合、定義されているミリ秒後にクエリが再実行されるようにスケジュールします。


## サンプルアプリ {#example-apps}

### ワークフローの結果をアプリに返す {#return-workflow-results-to-an-app}
App Builder のクエリは、Workflow Automation のワークフローをトリガーできます。アプリは、それらのワークフローの結果を使用できます。

このアプリには、ワークフローをトリガーするボタンが用意されています。ワークフローは Slack チャンネルに投票を送信し、ユーザーに 2 つのオプションのいずれかを選択するよう求めます。ユーザーが選択したオプションに基づいて、ワークフローは 2 つの異なる HTTP GET リクエストのいずれかを発行し、アプリに表示されるデータを返します。

{{< img src="actions/app_builder/workflow-trigger-from-app.mp4" alt="[Trigger Workflow] (ワークフローをトリガー) をクリックすると、Slack で投票が行われ、猫または犬に関する知識がランダムに返されます。" video="true" width="70%">}}

{{% collapse-content title="アプリを構築する" level="h4" %}}

##### ワークフローを作成する {#create-workflow}

1. 新しいワークフローキャンバスの [{{< ui >}}Datadog Triggers{{< /ui >}}] (Datadog トリガー) で、[{{< ui >}}App{{< /ui >}}] (アプリ) をクリックします。
1. [{{< ui >}}App{{< /ui >}}] トリガーステップで、プラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックし、「Make a decision」(決定する) と検索し、[{{< ui >}}Make a decision{{< /ui >}}] Slack アクションを選択します。
1. ワークスペースを選択し、投票を行うチャンネルを選択します。
1. プロンプトテキスト「Cat fact or dog fact?」(猫に関する知識と犬に関する知識どちらですか?) と入力します。また、ボタンの選択肢を「Cat fact」(猫に関する知識) と「Dog fact」(犬に関する知識) に変更します。
1. キャンバスの [{{< ui >}}Make a decision{{< /ui >}}] ステップで、[{{< ui >}}Cat fact{{< /ui >}}] の上にあるプラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックし、[{{< ui >}}Make request{{< /ui >}}] (リクエストを行う) HTTP アクションを追加します。
1. ステップ名を「Get cat fact」(猫に関する知識を取得) にします。[{{< ui >}}Inputs{{< /ui >}}] の下の [{{< ui >}}URL{{< /ui >}}] で、[{{< ui >}}GET{{< /ui >}}] を選択したままにし、`https://catfact.ninja/fact` という URL を入力します。
1. キャンバスの [{{< ui >}}Make a decision{{< /ui >}}] ステップで、[{{< ui >}}Dog fact{{< /ui >}}] の上にあるプラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックします。同じ手順に従って [{{< ui >}}Make request{{< /ui >}}] HTTP アクションを追加しますが、今回はステップ名を「Get dog fact」(犬に関する知識を取得) にし、以下のパラメーターを使用します。
    * {{< ui >}}URL{{< /ui >}}: `https://dogapi.dog/api/v2/facts`
    * {{< ui >}}Request Headers{{< /ui >}}: `application/json` の `Content-Type`
1. [Cat fact] ステップの下にあるプラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックします。「Function」(関数) と検索し、[{{< ui >}}Function{{< /ui >}}] データ変換ステップを選択します。
1. [Dog fact] ステップの下にあるプラス ({{< ui >}}\+{{< /ui >}}) アイコンをクリックして、[JS Function] (JS 関数) ステップの上に表示されるドットまでドラッグし、プラスアイコンをこの [{{< ui >}}JS Function{{< /ui >}}] ステップに接続します。
1. [JS Function] の [{{< ui >}}Configure{{< /ui >}}] (構成) で、[{{< ui >}}Script{{< /ui >}}] (スクリプト) に以下のコードスニペットを使用します。
    ```javascript
    const catFact = $.Steps.Get_cat_fact?.body?.fact;
    const dogFactRaw = $.Steps.Get_dog_fact?.body;

    let dogFact;

    try {
        const parsedDogFact = JSON.parse(dogFactRaw);
        dogFact = parsedDogFact.data?.[0]?.attributes?.body;
    } catch {
        // Do nothing
    }

    return catFact != null ? catFact : dogFact;
    ```
1. ワークフローの概要の [{{< ui >}}Output Parameters{{< /ui >}}] (出力パラメーター) で、名前が `output` で、値が `{{ Steps.Function.data }} であるパラメーターと ` and the Data Type `string` を追加します。
1. ワークフローに「My AB Workflow」という名前を付け、保存して公開します。

##### アプリを作成する {#create-app}

App Builder をワークフローに接続するには、次の手順を実行します。

1. アプリで、[Data] ({{< ui >}}{&nbsp;}{{< /ui >}}) アイコンをクリックし、プラス ({{< ui >}}\+{{< /ui >}}) をクリックして、[{{< ui >}}Query{{< /ui >}}] (クエリ) を選択します。
1. 「Trigger Workflow」と検索し、[{{< ui >}}Trigger Workflow{{< /ui >}}] Datadog Workflow Automation アイテムを選択します。
1. [{{< ui >}}Run Settings{{< /ui >}}] を [Manual] に設定し、クエリに `triggerWorkflow0` という名前を付けます。
1. [{{< ui >}}Inputs{{< /ui >}}] で、[{{< ui >}}App Workflow{{< /ui >}}] (アプリのワークフロー) に対して [{{< ui >}}My AB Workflow{{< /ui >}}] (自分の AB ワークフロー) を選択します。
1. [{{< ui >}}Run{{< /ui >}}] をクリックしてワークフローを実行し、Slack チャンネルに移動して投票の質問に回答します。これにより、App Builder に表示するサンプルデータが提供されます。
1. テキストコンポーネントを追加します。[{{< ui >}}Content{{< /ui >}}] (コンテンツ) で、`${triggerWorkflow0?.outputs?.workflowOutputs?.output}` という式を入力します。
1. ボタンコンポーネントを追加します。次の値を使用します。
    * [{{< ui >}}Label{{< /ui >}}] (ラベル): "Trigger Workflow"
    * [{{< ui >}}Is Loading{{< /ui >}}] (ロード中): `${triggerWorkflow0.isLoading}` (式を入力するには {{< ui >}}</>{{< /ui >}} をクリックします)
1. ボタンの [{{< ui >}}Events{{< /ui >}}] で、プラス ({{< ui >}}\+{{< /ui >}}) をクリックしてイベントを追加します。次の値を使用します。
    * [{{< ui >}}Event{{< /ui >}}]: クリック
    * [{{< ui >}}Reaction{{< /ui >}}]: クエリをトリガー
    * [{{< ui >}}Query{{< /ui >}}]: `triggerWorkflow0`
1. アプリを保存します。

##### アプリをテストする {#test-app}

1. アプリで、[{{< ui >}}Preview{{< /ui >}}] (プレビュー) をクリックします。
1. [{{< ui >}}Trigger Workflow{{< /ui >}}] ボタンをクリックします。
1. 選択した Slack チャンネルで、投票の質問に回答します。<br>
    アプリに、選択したオプションに関する結果が表示されます。
{{% /collapse-content %}}

### クエリの出力データを結合および変換する {#combine-and-transform-query-output-data}
App Builder でクエリからデータを取得したら、データ変換機能を使用してそのデータを結合および変換できます。

このアプリには、API から 2 つの数値に関する事実を取得するためのボタンが用意されています。アプリはデータ変換機能を使用して、2 つの数値の合計を計算して表示します。

{{< img src="actions/app_builder/data-transformer.mp4" alt="各ボタンをクリックすると新しい数値の事実が取得され、2 つの数値の合計が事実とともに更新されます。" video="true" width="70%">}}

{{% collapse-content title="アプリを構築する" level="h4" %}}

##### クエリを作成する {#create-queries}

1. 新しいアプリで、[Data] ({{< ui >}}{&nbsp;}{{< /ui >}}) アイコンをクリックして [Data] タブを開きます。
1. プラス ({{< ui >}}\+{{< /ui >}}) をクリックし、[{{< ui >}}Query{{< /ui >}}] を選択します。「Make request」と検索し、[{{< ui >}}HTTP Make request{{< /ui >}}] (HTTP リクエストを行う) アクションを選択します。
1. 次の値を使用します。
    * [{{< ui >}}Name{{< /ui >}}] (名前): `mathFact1`
    * [{{< ui >}}Inputs{{< /ui >}}] の [{{< ui >}}URL{{< /ui >}}]: GET `http://numbersapi.com/random/trivia`
1. ({{< ui >}}\+{{< /ui >}}) をクリックして、別の [{{< ui >}}HTTP Make request{{< /ui >}}] クエリを追加します。次の値を使用します。
    * [{{< ui >}}Name{{< /ui >}}]: `mathFact2`
    * [{{< ui >}}Inputs{{< /ui >}}] の [{{< ui >}}URL{{< /ui >}}]: GET `http://numbersapi.com/random/trivia`

##### データ変換機能を追加する {#add-data-transformer}

1. [{{< ui >}}Σ{{< /ui >}}] (シグマ) をクリックして、[{{< ui >}}Transformers{{< /ui >}}] (変換機能) パネルを開きます。
1. [{{< ui >}}\+ Create Transformer{{< /ui >}}] (変換機能を作成) をクリックします。
1. 変換機能に `numberTransformer` という名前を付けます。[{{< ui >}}Inputs{{< /ui >}}] の下の [{{< ui >}}function () {{{< /ui >}}] (関数 ()) に次のように入力します。
    ```javascript
    // get both random facts
    const fact1 = mathFact1.outputs.body;
    const fact2 = mathFact2.outputs.body;

    // parse the facts to get the first number that appears in them
    const num1 = fact1.match(/\d+/)[0];
    const num2 = fact2.match(/\d+/)[0];

    // complete arithmetic on the numbers to find the sum
    const numSum = Number(num1) + Number(num2)

    return numSum
    ```

##### アプリキャンバスコンポーネントを作成する {#create-app-canvas-components}

1. アプリキャンバスで、ボタンを追加し、ラベルに「Generate fact 1」(事実 1 を生成) と入力します。
1. ボタンの [{{< ui >}}Events{{< /ui >}}] で、以下の値を使用します。
    * [{{< ui >}}Event{{< /ui >}}]: クリック
    * [{{< ui >}}Reaction{{< /ui >}}]: クエリをトリガー
    * [{{< ui >}}Query{{< /ui >}}]: mathFact1
1. 別のボタンを追加し、ラベルに「Generate fact 2」(事実 2 を生成) と入力します。
1. ボタンの [{{< ui >}}Events{{< /ui >}}] で、以下の値を使用します。
    * [{{< ui >}}Event{{< /ui >}}]: クリック
    * [{{< ui >}}Reaction{{< /ui >}}]: クエリをトリガー
    * [{{< ui >}}Query{{< /ui >}}]: mathFact2
1. 最初のボタンの下にテキスト要素を追加します。その [{{< ui >}}Content{{< /ui >}}] (コンテンツ) プロパティで、[{{< ui >}}</>{{< /ui >}}] をクリックし、`${mathFact1.outputs.body}` という式を入力します。
1. 2 番目のボタンの下にテキスト要素を追加します。その [{{< ui >}}Content{{< /ui >}}] プロパティで、[{{< ui >}}</>{{< /ui >}}] をクリックし、`${mathFact2.outputs.body}` という式を入力します。
1. [{{< ui >}}Content{{< /ui >}}] の値が「Sum of numbers」(数値の合計) であるテキスト要素を追加します。
1. その横にテキスト要素を追加します。その [{{< ui >}}Content{{< /ui >}}] プロパティで、[{{< ui >}}</>{{< /ui >}}] をクリックし、`${numberTransformer.outputs}` という式を使用します。


##### アプリをテストする {#test-app-1}

1. アプリで、[{{< ui >}}Preview{{< /ui >}}] (プレビュー) をクリックします。
1. [{{< ui >}}Generate fact 1{{< /ui >}}]、[{{< ui >}}Generate fact 2{{< /ui >}}] の順にクリックします。<br>
    各ボタンをクリックすると、アプリによって数値の事実と数値の合計が更新されます。

{{% /collapse-content %}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>ご質問やフィードバックがある場合は、[Datadog Community Slack][8] の {{< ui >}}#app-builder{{< /ui >}} チャンネルにご参加ください。

[5]: /ja/actions/connections
[6]: /ja/actions/workflows
[7]: https://app.datadoghq.com/app-builder/apps/edit?viewMode=edit&template=ecs_task_manager
[8]: https://chat.datadoghq.com/
[10]: https://app.datadoghq.com/actions/action-catalog/
[11]: /ja/actions/app_builder/events
[12]: /ja/actions/app_builder/events/#state-functions