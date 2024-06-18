---
aliases:
- /ja/graphing/widgets/note/
description: ダッシュボードウィジェットにテキストを表示します。
further_reading:
- link: /ja/dashboards/graphing_json/
  tag: ドキュメント
  text: JSON を使用したダッシュボードの構築方法について
title: ノート &amp; リンクウィジェット
---

**Notes & Links** ウィジェットは、[フリーテキストウィジェット][1]と似ていますが、より多くのフォーマットと表示オプションが含まれています。

## セットアップ

1. 表示したいテキストを入力します。マークダウンがサポートされています。
2. プリセットのテンプレートを選択するか、表示オプションをカスタマイズします。
3. 文字サイズとウィジェットの背景色を選択します。
4. テキストの位置を調整するには、**Alignment** ボタンをクリックします。パディングを入れない場合は、**No Padding** をクリックします。
5. ポインターを含めるには、**Show Pointer** をクリックし、ドロップダウンメニューから位置を選択します。

{{< img src="dashboards/widgets/note/overview.png" alt="Notes & Links ウィジェットエディタの Markdown フィールドにテキストを追加する" style="width:90%;" >}}

ウィジェットを作成する準備ができたら、**Save** をクリックします。

このウィジェットはテンプレート変数をサポートしています。ウィジェットの内容を動的に更新するには `{TX-PL-LABEL}lt;VARIABLE_NAME>.value` 構文を使用します。

{{< img src="dashboards/widgets/note/template_variable.png" alt="Notes & Links ウィジェットエディタの Markdown フィールドでテンプレート変数を使用する" style="width:90%;" >}}

この例では、`$env.value` が選択された環境に対するリンクの値を更新します。

## API

このウィジェットは、**ダッシュボード API** とともに使用できます。詳しくは、[ダッシュボード API][2] ドキュメントをご参照ください。

ノートウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

{{< dashboards-widgets-api >}}



{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/widgets/free_text/
[2]: /ja/api/v1/dashboards/
[3]: /ja/dashboards/graphing_json/widget_json/