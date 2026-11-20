---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/ai-powered-log-parsing
  tag: ブログ
  text: AI を活用したログパースで調査を加速
- link: /logs/explorer/calculated_fields/formulas
  tag: ドキュメント
  text: 計算フィールドの数式
- link: /logs/explorer/calculated_fields/extractions
  tag: ドキュメント
  text: 抽出 Grok パース
- link: /logs/explorer/
  tag: ドキュメント
  text: ログエクスプローラー
- link: https://www.datadoghq.com/blog/calculated-fields-log-management-datadog/
  tag: ブログ
  text: 計算フィールドによるクエリ時のログの変換と強化
- link: https://learn.datadoghq.com/courses/enhance-log-querying
  tag: ラーニングセンター
  text: 参照テーブル、サブクエリ、計算フィールドを使用してログのクエリと分析を強化する
title: 計算フィールド
---
<div class="alert alert-info">構文、演算子、関数については、<a href="/logs/explorer/calculated_fields/formulas">数式</a></div>を参照してください。

## 概要 {#overview}

計算フィールドを使用すると、**クエリ実行時**にログデータを変換および強化できます。これは他の[ログ属性][1]と同様に機能し、検索、集計、視覚化、さらには追加の計算フィールドの定義にも使用できます。

計算フィールドには、**抽出**と**数式**の 2 種類があります。どちらにも以下のプロパティがあります。

- これらは**一時的**であり、Log Explorer のセッション終了後も保持されません。
- これらは**ユーザー単位**であり、自分にのみ表示されます。
- これらは、すでにインデックス化されたログに適用できるため、**遡及的な分析**に最適です。
- クエリ、集計、または他の計算フィールドで使用する場合は、`#` プレフィックスを付けて参照する必要があります。
- 一度に定義できる計算フィールドは最大 **5** つです。

## 計算フィールドを使用するタイミング{#when-to-use-calculated-fields}

計算フィールドは、次のようなシナリオで使用します。

- 短期的な調査や分析のために一時的なフィールドが必要な場合。
- インデックス化されたログを遡及的に分析する必要がある場合 (パイプラインの変更は、更新後に取り込まれたログにのみ影響します)。
- ログパイプラインを迅速に変更するための権限や専門知識がない場合。
- 自分のみに表示される計算フィールドが必要な場合。迅速な探索やリスクの低い実験に役立ちます。

計算フィールドに長期的な価値があると判断した場合は、[ログパイプライン][2]を更新して、チームが自動処理のメリットを享受できるようにしてください。

## 計算フィールドの作成 {#create-a-calculated-field}

Log Explorer で計算フィールドを作成するには、{{< ui >}}Add{{< /ui >}} メニューから、または特定のログイベントや属性内からの 2 つのエントリポイントがあります。

### Add メニューから {#from-the-add-menu}

1. [Log Explorer][5] に移動します。
1. 検索バーの隣にある {{< ui >}}Add{{< /ui >}} ボタンをクリックします。
1. {{< ui >}}Calculated field{{< /ui >}} を選択します。

これは、ログの構造と内容をすでに把握しており、計算式やパースルールをすばやく定義したい場合に便利です。

### 特定のログイベントまたは属性から {#from-a-specific-log-event-or-attribute}

1. [Log Explorer][5] に移動します。
1. ログイベントをクリックしてサイドパネルを開きます。
1. JSON 属性を選択してコンテキストメニューを開きます。
1. {{< ui >}}Create calculated from...{{< /ui >}} を選択します。

{{< img src="/logs/explorer/calculated_fields/add_calculated_field_side_panel.png" alt="Log Explorer のログサイドパネルから計算フィールドを作成する" style="width:70%;" >}}

このアプローチは、パースルールを構築するための具体的なログサンプルを提供するため、抽出に役立ちます。

## 計算フィールドの種類 {#types-of-calculated-fields}

### 数式 {#formula}

数式フィールドは、計算フィールドの数式を使用して、既存の属性から新しい値を算出します。以下が可能です。
- テキスト値を操作します。
- 数値属性に対して算術演算を実行します。
- 条件ロジックを評価します。

例:

```
#latency_gap = @client_latency - @server_latency
```

サポートされている構文、演算子、および関数の完全なリストについては、[数式][3]を参照してください。

### 抽出 {#extraction}

抽出は、Grok パターンまたは正規表現パターンを使用して、生のログメッセージや属性から値をキャプチャします。[Tap to Parse] を使用して自動的に生成するか、独自の Grok パターンまたは正規表現を手動で定義できます。抽出を使用して、以下の操作を行います。
- 生のログメッセージから値をキャプチャする。
- パイプラインを編集することなく、すでにインデックス作成済みのログから属性を遡及的に抽出する。
- サンプルログに対してテストする。

たとえば、メッセージの最初の 3 単語を個別のフィールドに抽出できます。

```
%{word:first} %{word:second} %{word:third}
```

抽出ルールは、セッション内のすべてのログ全体でグローバルに評価されます。詳細および構文の例については、[抽出][4]を参照してください。

## 計算フィールドの使用 {#using-calculated-fields}

計算フィールドを作成すると、Log Explorer が即座に更新され、新しいデータが表示されるとともに、そのデータを操作するためのツールが提供されます。計算フィールドはログ属性のように機能し、検索、集計、可視化、さらには他の計算フィールドの定義にも使用できます。計算フィールドを参照する場合は、常に `#` プレフィックスを使用してください。

- **ヘッダー行**: 検索バーの下に新しい行が表示され、すべてのアクティブな計算フィールドが表示されます。カーソルを合わせると定義全体が表示され、クイックアクションを使用してフィールドの編集、フィルタリング、またはグループ化を行うことができます。
- **リスト表示**: [リスト][6]表示では、計算フィールドの列が自動的に追加されます。
- **ログサイドパネル**: ログを調査する際、計算フィールドは専用のセクションにグループ化されます。

{{< img src="logs/explorer/calculated_fields/calculated_field.png" alt="ログエクスプローラーで結果をフィルタリングするために使用される request_duration という計算フィールド" style="width:100%;" >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/attributes_naming_convention/
[2]: /ja/logs/log_configuration/pipelines/?tab=source
[3]: /ja/logs/explorer/calculated_fields/formulas/
[4]: /ja/logs/explorer/calculated_fields/extractions
[5]: https://app.datadoghq.com/logs
[6]: /ja/logs/explorer/visualize/#lists