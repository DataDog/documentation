---
disable_toc: false
further_reading:
- link: /logs/explorer/calculated_fields/expression_language
  tag: ドキュメント
  text: 計算フィールド式言語
- link: /logs/explorer/
  tag: ドキュメント
  text: ログエクスプローラー
- link: https://www.datadoghq.com/blog/calculated-fields-log-management-datadog/
  tag: ブログ
  text: 計算フィールドによるクエリ時のログの変換と強化
title: 計算されたフィールド
---


<div class="alert alert-info">構文、演算子、関数については、<a href="/logs/explorer/calculated_fields/expression_language">Expression Language</a> を参照してください</div>

## 概要

計算フィールドを使用して、クエリ実行時にログデータを変換および拡張します。 以下の操作を行うための[数式](#formula)を定義します。
- [テキストの操作][1]
- [算術演算][2]
- [条件ロジックの評価][3]

定義された計算フィールドは、検索、集計、視覚化、さらには他の計算フィールドの定義など、任意の[ログ属性][5]と同様に使用できます。

**注**:
- 一度に定義できる計算フィールドは最大 5 つです。
- 計算フィールドは一時的なものであり、指定した Log Explorer セッションを越えては保持されません。計算フィールドが繰り返し有用である可能性がある場合は、ログが取り込まれ処理される際に、[ログパイプライン][6]を更新してログ内の情報をエンコードしてください。

## 計算フィールドの作成

Log Explorer で計算フィールドを作成するには、**Add** メニューまたは特定のログイベントや属性内の 2 つのエントリーポイントがあります。
### 計算フィールドの開始ポイントを選択します

#### Add メニューから

1. [Log Explorer][7] に移動します。
1. 検索バーの隣にある ** Add** ボタンをクリックします。
1. **Calculated field** を選択します。

これは、対象のログの構造と内容にすでに精通している場合に、計算フィールドをすばやく作成する方法です。

#### 特定のログイベントまたは属性から

1. [Log Explorer][7] に移動します。
1. 対象のログイベントをクリックしてサイドパネルを開きます。
1. 特定の JSON 属性をクリックしてコンテキストメニューを開きます。
1. **Create calculated from...** を選択します。


{{< img src="logs/explorer/calculated_fields/create_field.png" alt="ログパネルの期間属性と、それに対応する計算フィールドを作成するオプション" style="width:80%;" >}}

この方法により、調査中に素早く適応したり、見慣れないログを調査したりすることができます。 例えば、2 つの値を乗算または結合し、その結果を単一のフィールドに格納してグラフを簡略化したり、特定の質問に回答したりすることができます。

### 計算フィールドの定義

{{< img src="logs/explorer/calculated_fields/define_a_calculated_field.png" alt="スループット用の計算フィールド。firstName 属性と lastName 属性を連結する式" style="width:70%;" >}}

#### 名前

計算フィールドの目的を明確に示すわかりやすい名前を設定します。例えば、ユーザーの姓と名を組み合わせて 1 つのフィールドにする場合、計算フィールドに `fullName` という名前を付けることができます。

`Pinkie Smith` という名前のユーザーのログを抽出するには、クエリに計算フィールド名 `#fullName:"Pinkie Smith"` を含めます。**注:** 検索、集計、または他の計算フィールド定義で計算フィールドを参照するには、`#` プレフィックスを使用する必要があります。

#### 計算式

計算式 (または式) は、各ログイベントに対して計算され、計算フィールドの値として格納される結果を決定します。 有効な構成には、ログ属性、他の計算フィールド、およびサポートされている関数と演算子のセットが含まれます。 関連するフィールド、関数、および演算子は、式を記述または編集する際に自動的に提案されます。

使用可能な関数と演算子については、[計算フィールド式言語][4]を参照してください。

## 計算フィールドの使用

計算フィールドの作成に成功すると、Log Explorer が更新され、以下のようになります。
- アクティブな計算フィールドが検索バーのすぐ下の新しい行に表示されます。
    - フィールドにカーソルを合わせると定義が表示され、クイックアクションを使用してフィールドの編集、フィルタリング、グループ化を行うことができます。
- 計算フィールド用の列を **[List][8]** の可視化に含めます。 タイトルには # プレフィックスが含まれます。
- ログサイドパネル内の別のセクションに計算フィールドを表示します。

計算フィールドはログ属性のように機能し、検索、集計、可視化、さらには他の計算フィールドの定義にも使用できます。計算フィールド名を参照する際は、`#` プレフィックスを忘れずに使用してください。

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="Log Explorer で結果をフィルタリングするために使用される request_duration という計算フィールド" style="width:100%;" >}}

### ユースケース

計算フィールドは、ログの取り込み時のパース、正規化、および拡張のためのログパイプラインやプロセッサの代替ではありません。 計算フィールドは、以下のシナリオで使用します。

- 長期的に再利用する必要のないフィールドを必要とする、単発の調査やアドホック分析を行う必要がある。
- 特定の質問に回答するために、インデックス化されたログを遡って更新する必要がある (パイプラインの変更は、パイプラインの更新後に取り込まれたログにのみ適用されます)。
- ログパイプラインをタイムリーに変更する権限 (または知識) が不足している。
  - 作成した計算フィールドは自分にのみ表示されるため、迅速な調査や安心して行える実験に最適です。

計算フィールドが長期的に価値を持つ可能性があると気づいた場合は、ログパイプラインを更新して、自分やチームの他のメンバーが自動処理のメリットを享受できるようにします。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/calculated_fields/expression_language/#string
[2]: /ja/logs/explorer/calculated_fields/expression_language/#arithmetic
[3]: /ja/logs/explorer/calculated_fields/expression_language/#logical
[4]: /ja/logs/explorer/calculated_fields/expression_language/
[5]: /ja/logs/log_configuration/attributes_naming_convention/
[6]: /ja/logs/log_configuration/pipelines/?tab=source
[7]: https://app.datadoghq.com/logs
[8]: /ja/logs/explorer/visualize/#lists