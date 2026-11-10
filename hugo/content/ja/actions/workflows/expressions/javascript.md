---
code_lang: javascript
code_lang_weight: 10
description: App Builder における JavaScript 式の機能と制限
title: JavaScript 式
type: multi-code-lang
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">選択した Datadog サイト ({{< region-param key=dd_site_name >}}) で、Workflow Automation はプレビュー版です。</div>
{{< /site-region >}}

JavaScript (JS) は、インライン式を使用するか、専用の JS {{< ui >}}Function{{< /ui >}} および {{< ui >}}Expression{{< /ui >}} アクションを通じてワークフローで使用できます。

## インライン JavaScript 式{#inline-javascript-expressions}

JS 式をワークフローのステップで直接使用することで、専用の JS ステップを含めることなく、幅広いデータ変換を実行できます。

ワークフローでインライン式を使用するには、式を `${}` で囲みます。たとえば、文字列 ID (`Trigger.stringId`) を整数に変換するには、`${ parseInt(Trigger.stringId) }` を使用します。

[Lodash][1] ユーティリティライブラリは、インライン式で使用できます。Lodash のアンダースコアプレフィックス (`_`) は省略可能です。たとえば、`${ _.toNumber("1") }` と `${ toNumber("1") }` はどちらも有効なインライン式です。

### 例 {#examples}

#### タイムスタンプを取得する{#retrieve-a-timestamp}

次の例では、Lodash の `now()` 関数を {{< ui >}}Get hosts total{{< /ui >}} ステップ内で使用して、過去 1 分間のホスト数を取得します。

このアクションは、{{< ui >}}From{{< /ui >}} フィールドで次のインライン式を使用します。

```js
${ Math.floor(now() / 1000) - 60 }
```

{{< img src="/actions/workflows/expressions/javascript/timestamp.png" alt="now() lodash 関数を使用したインライン式" style="width:90%;" >}}

#### 値をインクリメントする{#increment-a-value}

次の例では、{{< ui >}}Set desired capacity{{< /ui >}} ステップ内の希望する容量を 1 ずつインクリメントします。

このアクションは、{{< ui >}}Desired capacity{{< /ui >}} フィールドで次のインライン式を使用します。

```js
${ Steps.Describe_auto_scaling_group.autoScalingGroup.DesiredCapacity + 1 }
```

{{< img src="/actions/workflows/expressions/javascript/increment.png" alt="希望する容量を 1 ずつインクリメントするインライン式" style="width:90%;" >}}

## JavaScript 式アクション{#javascript-expression-actions}

[式](#expression-step)アクションと[関数](#function-step)アクションは、JavaScript を使用してワークフロー内でカスタムデータ変換を実行します。ワークフロー内で利用可能なコンテキスト変数の値を、`$.Steps.<step_name>.<variable>` という構文で JavaScript の式や関数の入力として使用します。

これらのアクションによって返されるデータは、ワークフローのその後のステップで参照することができます。

アンダースコア (`_`) を使用すると、式や関数ステップで [Lodash][1] を利用できます。たとえば、HTTP リクエストステップ (`Make_request`) の HTTP リクエストステータス変数 (`status`) を参照するには、次のコンテキスト変数を使用します。

```
$.Steps.Make_request.status
```

また、`Array_function` によって返された配列に `Bits` という名前が含まれているかどうかを判断するには、次の構文で `_.includes` Lodash 関数を適用します。

```
_.includes($.Steps.Array_function.data, "Bits")
```
### 関数ステップ {#function-step}

関数アクションを使用すると、複数の式を必要とする変数代入や複雑なデータ変換が可能になります。

関数アクションを追加するには、次の手順で行います。
- 新しいワークフローで [{{< ui >}}Add step{{< /ui >}}] をクリックし、`function` を検索します。[{{< ui >}}Function{{< /ui >}}] アクションを選択してワークフローに追加します。
- 既存のワークフローで [{{< ui >}}\+{{< /ui >}}] をクリックし、`function` を検索します。[{{< ui >}}Function{{< /ui >}}] アクションを選択してワークフローに追加します。

#### AI を使用して関数ステップを作成する{#write-function-steps-with-ai}

Bits AI を使用すると、{{< ui >}}Function{{< /ui >}} ステップの JavaScript 作成に役立ちます。この機能を使用するには、以下の手順を実行します。

1. ワークフローに {{< ui >}}Function{{< /ui >}} ステップを追加します。
1. [{{< ui >}}General{{< /ui >}}] の [{{< ui >}}Script{{< /ui >}}] フィールドで、[{{< ui >}}<i class="icon-bits-ai"></i> Write with Bits AI{{< /ui >}}] をクリックします。
1. [{{< ui >}}Describe your transformation script{{< /ui >}}] フィールドに、スクリプトで実行したい内容の説明を入力します。上矢印 ({{< ui >}}↑{{< /ui >}}) をクリックして説明を送信します。
1. [{{< ui >}}Replace script{{< /ui >}}]、[{{< ui >}}Insert in script{{< /ui >}}]、または [{{< ui >}}Copy to clipboard{{< /ui >}}] のいずれかのオプションを選択します。
1. スクリプトをチェックし、必要に応じてニーズに合わせて変更してください。

### 式ステップ {#expression-step}

ほとんどの場合、専用の式ステップではなくインライン式を使用してください。式アクションは、1 行のコードを受け入れます。たとえば、`[1, 2, 3].filter(x => x < 3)` です。式では変数への代入は使用できません。

式アクションを追加するには、以下の手順を実行します。
- 新しいワークフローで [{{< ui >}}Add step{{< /ui >}}] をクリックし、`expression` を検索します。[{{< ui >}}Expression{{< /ui >}}] アクションを選択してワークフローに追加します。
- 既存のワークフローで [{{< ui >}}\+{{< /ui >}}] をクリックし、`expression` を検索します。[{{< ui >}}Expression{{< /ui >}}] アクションを選択してワークフローに追加します。

式ステップでは、実行時に利用可能なすべての変数の_コピー_が使用されます。ステップ内で変数を変更しても、ステップ外の変数の値には影響しません。式の計算結果を変数に割り当てる方法については、「[変数とパラメーター][2]」を参照してください。

## 式と関数のテスト{#test-expressions-and-functions}

テストおよびデバッグのページで、[ワークフローステップのテスト][3]方法を確認してください。

[1]: https://lodash.com/
[2]: /ja/actions/workflows/variables/
[3]: /ja/actions/workflows/test_and_debug/#test-a-step