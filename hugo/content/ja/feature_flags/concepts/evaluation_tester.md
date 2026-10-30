---
description: 本番データに影響を与えることなく、特定のターゲティングキーと属性に対して Feature Flag がどのように評価されるかをシミュレートします。
further_reading:
- link: /feature_flags/concepts/targeting_rules
  tag: ドキュメント
  text: ターゲティングルールおよびフィルター
- link: /feature_flags/concepts/saved_filters
  tag: ドキュメント
  text: 保存済みフィルター
- link: /feature_flags/concepts/environments
  tag: ドキュメント
  text: 環境
- link: /feature_flags/concepts/evaluation_results
  tag: ドキュメント
  text: フラグ評価結果
title: 評価テスター
---
## 概要{#overview}

評価テスターを使用すると、アプリケーションの SDK を呼び出すことなく、特定のターゲティングキーと属性のセットに対して Feature Flag がどのように評価されるかをシミュレートできます。「このユーザーにはどのバリアントが表示されるか」または「このターゲティングルールが一致しなかった理由は何か」といった質問の答えを変更をロールアウトする前に確認する場合に使用します。

評価テスターで実行される評価はドライランです。これらはエクスポージャーイベントを送信せず、評価メトリクスやグラフには含められず、実験統計に影響しません。

## 評価テスターを開く {#open-the-evaluation-tester}

1. [[{{< ui >}}Feature Flags{{< /ui >}}]][1] に移動し、フラグを選択します。
1. テスト対象の[環境][4]のタブを選択します (例: [{{< ui >}}Production{{< /ui >}}] (本番) や [{{< ui >}}Staging{{< /ui >}}] (ステージング))。
1. [{{< ui >}}Targeting rules{{< /ui >}}] (ターゲティングルール) カードで [{{< ui >}}Test Rule Evaluation{{< /ui >}}] (テストルール評価) をクリックし、[{{< ui >}}Evaluation tester{{< /ui >}}] (評価テスター) サイドパネルを開きます。

{{< img src="feature_flags/concepts/evaluation-tester-canvas.png" alt="フラグのターゲティングルールキャンバスにある [Test Rule Evaluation] ボタン。" style="width:100%;" >}}

## ターゲティングコンテキストを指定する {#provide-a-targeting-context}

評価テスターは、ターゲティングコンテキスト (ターゲティングキーと、オプションで[属性][2]のセット) に対してフラグの[ターゲティングルール][3]を評価します。

- ターゲティングキー (必須): 決定論的バケット分割に使用される識別子 (例: ユーザー ID)。ターゲティングキーを変更すると、ルールでパーセンテージベースのトラフィック分割を使用している場合に、割り当てられるバリアントが変わる可能性があります。
- 属性 (オプション): ターゲティングルールのフィルターを評価するために使用される値 (例: `country`、`email`、`tier`)。詳細については、「[ターゲティング属性][2]」を参照してください。

ターゲティングキーと属性の値は、次の 2 つの方法で指定できます。

- {{< ui >}}Form{{< /ui >}} (フォーム): Datadog は、選択した環境のターゲティングルールで参照されているターゲティングキーと各属性の入力フィールドを生成します。各属性フィールドには、それを参照するルールが示されます。環境内のどのターゲティングルールも属性を参照していない場合、フォームにはターゲティングキーのみが表示されます。
- {{< ui >}}JSON{{< /ui >}}: ターゲティングキーと属性の生の JSON オブジェクトを入力します。数値、ブール値、配列、ネストされたオブジェクトなど、文字列以外の属性値をテストする必要がある場合に JSON モードを使用します。

ターゲティングキーまたは属性を編集すると、[評価結果](#understand-the-result)が自動的に更新されます。

{{< img src="feature_flags/concepts/evaluation-tester-panel.png" alt="ターゲティングキー、属性、および結果が示されている評価テスターのサイドパネル。" style="width:60%;" >}}

## 結果を理解する {#understand-the-result}

[{{< ui >}}Result{{< /ui >}}] (結果) セクションには、提供された[ターゲティングコンテキスト](#provide-a-targeting-context)に対して割り当てられるバリアントと、一致したターゲティングルールの名前が表示されます。

[{{< ui >}}How did I get this result?{{< /ui >}}] (この結果が表示されている理由) を展開して、評価のルールごとの内訳を確認します。

- ルールは評価された順序で表示されます。
- 各ルールには、一致したか、一致せず通過したか (つまり、対象がルールのフィルターに一致しなかったため、評価が次のルールに移動した)、またはスキップされたか (つまり、前のルールの結果によりこのルールに到達しなかった) が示されます。
- フィルターのあるルールの場合は、一致した条件と一致しなかった条件 (例: `country matched US` または `browser did not match is one of Chrome, Safari`) が内訳で説明されます。

{{< img src="feature_flags/concepts/evaluation-tester-breakdown.png" alt="評価の内訳を展開すると、一致したルールとその理由が示されます。" style="width:60%;" >}}

一致したルールは [{{< ui >}}Targeting rules{{< /ui >}}] (ターゲティングルール) キャンバス上でも強調表示されるため、評価パスを視覚的に確認できます。

## 無効なフラグのテスト {#testing-a-disabled-flag}

選択した環境でフラグが無効になっている場合、評価テスターには、フラグが有効だった場合は対象が何を受け取るかが示されます。このシミュレーションは、ランタイム SDK の動作とは異なります。クライアント側およびサーバー側の SDK は、無効なフラグに対してアプリケーションが提供するデフォルト値を返します。詳細な評価では、`FLAG_NOT_FOUND` の `ERROR` を報告します。詳細については、「[フラグ評価結果][5]」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/feature-flags
[2]: /ja/feature_flags/concepts/targeting_attributes/
[3]: /ja/feature_flags/concepts/targeting_rules/
[4]: /ja/feature_flags/concepts/environments/
[5]: /ja/feature_flags/concepts/evaluation_results/