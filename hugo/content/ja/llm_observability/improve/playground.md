---
aliases:
- /ja/llm_observability/playground/
description: Agent Observability Playground を使用して、接続されている任意のモデルプロバイダーに対してプロンプトを対話的にテストし、ブラウザベースのインターフェイスから評価器を使用して実験を実行します。
further_reading:
- link: /llm_observability/improve/experiments
  tag: ドキュメント
  text: Agent Observability 実験
- link: /llm_observability/improve/datasets
  tag: ドキュメント
  text: データセット
- link: /llm_observability/improve/experiments/analyzing_results
  tag: ドキュメント
  text: 実験結果の分析
title: Playground
---
[Playground][1] は、LLM プロンプトをテストおよび評価するためのブラウザベースのインターフェイスです。コードを記述することなく、任意の入力を使用して接続されているモデルプロバイダーに対してプロンプトをテストすることや、データセットの読み込み、評価器の追加、結果のプレビュー、再現可能な実験としての構成の保存を行うことができます。

Playground では、次の 2 つのフローがサポートされます。
- **[任意の入力でプロンプトをテストする](#test-a-prompt-with-arbitrary-input)**: カスタム入力値を使用して単一のプロンプトを送信し、モデルの応答を調べます。
- **[Playground から実験を実行する](#run-an-experiment-from-the-playground)**: データセット全体に対してプロンプトを実行し、評価器で各行をスコアリングして、その結果を[実験][2]として保存します。

## 前提条件 {#prerequisites}

Playground を使用する前に、[[{{< ui >}}AI Observability{{< /ui >}}] (監視可能性) > [{{< ui >}}Settings{{< /ui >}}] (設定) > [{{< ui >}}Integrations{{< /ui >}}] (インテグレーション)][3] で少なくとも 1 つのモデルプロバイダーインテグレーションを接続してください。

サポートされているプロバイダーは、以下のとおりです。
- OpenAI
- Anthropic
- Azure OpenAI
- Amazon Bedrock
- Vertex AI
- カスタムプロバイダー

## 任意の入力でプロンプトをテストする {#test-a-prompt-with-arbitrary-input}

{{< img src="llm_observability/playground/playground-arbitrary-input.png" alt="{{category}} および {{approach}} 変数プレースホルダーを含むユーザーメッセージが示され、出力パネルにモデル応答が表示されている Agent Observability Playground" style="width:100%;" >}}

プロンプトモードを使用して、固定の入力セットでプロンプトを反復処理します。

1. [{{< ui >}}AI Observability{{< /ui >}}] > [{{< ui >}}Playground{{< /ui >}}][1] に移動します。
1. メッセージエディターでシステムプロンプトとユーザープロンプトを作成します。入力をパラメーター化するには、メッセージで `{{variable_name}}`を使用します。
1. 上部バーを使用して [{{< ui >}}Model configuration{{< /ui >}}] (モデル構成) パネルを開きます。
1. 構成パネルで、[{{< ui >}}Provider{{< /ui >}}] (プロバイダー)、[{{< ui >}}Account{{< /ui >}}] (アカウント)、および [{{< ui >}}Model{{< /ui >}}] (モデル) を選択します。
1. (オプション) [{{< ui >}}Edit Response Structure{{< /ui >}}] (レスポンス構造の編集) をクリックして、モデルから構造化された出力を要求します。
1. (オプション) [{{< ui >}}Model Parameters{{< /ui >}}] (モデルパラメーター) をクリックして、モデルのパラメーターを指定します。
1. (オプション) [{{< ui >}}Tools{{< /ui >}}] (ツール) の横にある [{{< ui >}}Add New{{< /ui >}}] (新規追加) をクリックして、JSON 関数スキーマ形式でツール定義を追加します。提供されている例 (天気、Web 検索、メール、株価) を開始点として使用します。
1. [{{< ui >}}Variables{{< /ui >}}] (変数) セクションで各変数の値を入力して、ユーザープロンプトおよびシステムプロンプトで定義したパラメーターを置き換えることができます。
1. [{{< ui >}}Done{{< /ui >}}] (完了) をクリックして構成を保存し、モーダルを閉じます。
1. [{{< ui >}}Run{{< /ui >}}] (実行) をクリックしてプロンプトを送信し、モデルの応答を表示します。

メッセージ、変数値、またはモデル設定を編集し、[{{< ui >}}Run{{< /ui >}}] を再度クリックして繰り返します。

## Playground から実験を実行する {#run-an-experiment-from-the-playground}

{{< img src="llm_observability/playground/playground-experiment-preview.png" alt="すべてのステップが完了し、[Save and Run as experiment] (保存して実験として実行) がアクティブになっている、実験モードの Agent Observability Playground。[Experiment Preview] (実験プレビュー) テーブルには、OUTPUT、EVAL_EXPECTED_OUTPUT、INPUT、EXPECTEDOUTPUT の各列と、各行に [PASS] (合格) および [FAIL] (不合格) バッジが表示されており、さらに [6 of 20 records passed.] (6/20 件のレコードが合格しました。) と書かれた概要バナーが表示されています。" style="width:100%;" >}}

実験モードを使用して、データセット全体でプロンプトをテストし、評価器で結果をスコアリングし、構成を再現可能な実験として保存します。

### プロンプトを構成する {#configure-your-prompt}

`{{variable_name}} プレースホルダーを使用してプロンプトを作成します。` placeholders where dataset values will be substituted. Use dot notation to reference nested dataset fields—for example, `{{input.question}}` to reference a field named `question` in the input section of a record.

### 1. データセットを追加する {#1-add-a-dataset}

プロジェクトからデータセットを選択します。データセットは、Playground がプロンプトを実行する対象となるレコードを提供します。

データセットの作成については、「[データセット][4]」を参照してください。

### 2. 変数を追加する {#2-add-variables}

データセット列をプロンプトで使用可能なセクションにマッピングします。

| セクション | 説明 |
|---------|-------------|
| {{< ui >}}Input{{< /ui >}} (入力) | 各レコードの入力セクションからの列。`{{input.*}} 変数に入力するために使用されます。` variables. If the input value is a JSON object, its top-level keys are exposed as individual variables (for example, `{{input.question}}` and `{{input.category}}`). If the input value is a plain string or number, the whole field is available as `{{input}}`. |
| {{< ui >}}Expected Output{{< /ui >}} (予期される出力) | 評価器がモデルの出力をスコアリングするために使用するグラウンドトゥルース値。値が JSON オブジェクトの場合、最上位のキーが個別に公開されます (例: `{{expected_output.answer}}`). Available as `{{expected_output}}` for plain values. |
| {{< ui >}}Metadata{{< /ui >}} (メタデータ) | 追加のコンテキスト列。JSON オブジェクトの最上位キーは `{{metadata.*}}` 変数として利用可能です。|

[{{< ui >}}Use this dataset{{< /ui >}}] (このデータセットを使用) をクリックしてプレビューステージに進みます。

<div class="alert alert-warning">変数がデータセット内に存在しないパスを参照している場合 (たとえば、<code>{{question}}</code> を <code>{{input.question}}</code>の代わりに参照している場合)、モデルはリテラルのテンプレート文字列を受け取ります。プロンプトに戻り、前述の表に示されている列と一致するように変数パスを修正してください。</div>

### 3. 評価器を追加する {#3-add-evaluators}

評価器は、プレビュー実行後に各行をスコアリングします。ツールバーの [{{< ui >}}Add Evaluators{{< /ui >}}] (評価器の追加) をクリックして、評価器構成モーダルを開きます。

Playground では、[{{< ui >}}String Check{{< /ui >}}] (文字列チェック) 評価器がサポートされます。複数の評価器を追加して、1 回の実行で出力のさまざまな要素をスコアリングしてください。

{{% collapse-content title="文字列チェック評価器のオプション" level="h4" expanded=false %}}

| フィールド | 説明 |
|-------|-------------|
| [{{< ui >}}Operator{{< /ui >}}] (演算子) | 適用する比較: `equals`、`not equals`、または `contains` です。|
| [{{< ui >}}Case sensitive{{< /ui >}}] (大文字と小文字を区別) | 有効にすると、比較で大文字と小文字が区別されます。|
| [{{< ui >}}Strip whitespace{{< /ui >}}] (空白を削除) | 有効にすると、比較の前に先頭と末尾の空白がトリミングされます。|
| [{{< ui >}}Left operand{{< /ui >}}] (左オペランド) | 評価する値。デフォルトはモデルの出力 (`output`) です。|
| [{{< ui >}}Right operand{{< /ui >}}] (右オペランド) | 比較対象の値。デフォルトは期待される出力です。ネストされたフィールドのドット表記がサポートされます。|
| [{{< ui >}}Name{{< /ui >}}] (名前) | 結果テーブルの列ヘッダーとして表示されるエイリアス。|

{{% /collapse-content %}}

### 4. プレビューを実行する {#4-run-a-preview}

[{{< ui >}}Run Preview{{< /ui >}}] (プレビューを実行) をクリックして、最大 20 件のデータセットレコードに対してプロンプトを実行します。

プレビューが完了すると、次のようになります。
- 各行に、各評価器の [{{< ui >}}PASS{{< /ui >}}] (合格) または [{{< ui >}}FAIL{{< /ui >}}] (不合格) バッジが表示されます。
- 列ヘッダーには、合格および不合格の合計数が表示されます。
- 概要バナーに総合的な結果が表示されます。

[{{< ui >}}FAIL{{< /ui >}}] バッジをクリックしてポップオーバーを展開し、実際の出力、演算子、期待される値、およびコンテキストヒントを表示します。たとえば、出力に期待される値が部分文字列として含まれているために、`equals` チェックするが失敗した場合、ポップオーバーでは `contains` に変更するよう提案されます。

### プロンプトと評価器の設定を反復する {#iterate-on-prompt-and-evaluator-configuration}

{{< img src="llm_observability/playground/playground-stale-preview.png" alt="プロンプト編集後に古いプレビュー状態が表示されている Agent Observability Playground。警告バナーには、[Prompt or settings changed since the last preview.Run the preview again before running the full dataset.] (前回のプレビュー後にプロンプトまたは設定が変更されました。完全なデータセットを実行する前に、プレビューを再度実行してください。) と示され、[Re-run Preview] (プレビューの再実行) ボタンが表示されています。結果テーブルには、前回実行時の [PASS] および [FAIL] バッジが表示されています。" style="width:100%;" >}}

結果を確認したら、プロンプトまたは評価器の設定を編集してスコアを改善します。編集を行うと、プレビュー結果は古い結果としてマークされます。[{{< ui >}}Re-run Preview{{< /ui >}}] (プレビューの再実行) をクリックして、更新された設定で再実行します。

一般的な反復パターンは、以下のとおりです。
- ほとんどの行が `equals` で不合格になる場合は、`contains` または大文字と小文字を区別しない比較でタスクがより正確に反映されるようになるかを確認します。
- 変数値が出力でリテラルとして表示される場合は (例: `{{input.question}}`)、プロンプトの変数パスを修正します。
- プロンプトの文言を調整し、再実行して合格率への影響を確認します。

### 5. 実験を保存する {#5-save-the-experiment}

期待どおりのプレビュー結果が得られたら、上部のツールバーにある [{{< ui >}}Save & Run as experiment{{< /ui >}}] (保存して実験として実行) をクリックして、完全なデータセットに対して実行します。

ダイアログで、次の操作を行います。

1. [{{< ui >}}Experiment name{{< /ui >}}] (実験名) を入力します。
1. [{{< ui >}}Project{{< /ui >}}] (プロジェクト) を選択します。
1. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

実験は、20 件のレコードのプレビューサンプルだけでなく、データセット内のすべてのレコードに対して実行されます。完了したら、[[{{< ui >}}AI Observability{{< /ui >}}] (AI の監視可能性) > [{{< ui >}}Experiments{{< /ui >}}] (実験)][2] で結果を確認します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/playground
[2]: https://app.datadoghq.com/llm/testing/experiments
[3]: https://app.datadoghq.com/llm/settings/integrations
[4]: /ja/llm_observability/improve/datasets