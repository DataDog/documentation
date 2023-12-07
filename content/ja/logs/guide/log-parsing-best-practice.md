---
aliases:
- /ja/logs/faq/log-parsing-best-practice
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: ログのパースに関する問題を調査する方法
kind: ガイド
title: ログのパース - ベストプラクティス
---

Datadog では、ログからすべての関連情報を抽出するためのパーサーを定義できます。パースの言語および機能の詳細については、[こちらのドキュメント][1]を参照してください。

この記事では、Datadog Agent のコレクターによるログをパースする方法について説明します。

```text
2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
```

1. **パースするログのサンプルをコメントとして必ず規則に追加する**。
    {{< img src="logs/faq/parsing_best_practice_1.png" alt="parsing_best_practice_1" >}}
    そうすれば、パース規則をサンプルログでテストすることができます。初めて規則を記述する際や、パーサーの問題を調査したり、新しいログ形式をサポートしたりする場合に、これが非常に役に立ちます。

2. **アスタリスクを利用して、属性を 1 つずつパースする**。
    最初からログ全体のパース規則を記述する必要はありません。1 つの属性ごとに規則をチェックしましょう。それには、規則の末尾に `.*` を使用して、後続の規則を無視してマッチさせることができます。
    たとえば、ここではまず、後続の属性を考慮せず、ログの日付をパースするとします。次の規則を作成します。
    {{< img src="logs/faq/parsing_best_practice_2.png" alt="parsing_best_practice_2" >}}
    日付が正しくパースされることを確認できました。では次の属性である重大度のパースに進みましょう。
    まず、パイプ (エスケープする必要がある特殊文字) をエスケープしてから、文字とのマッチを記述します。
    {{< img src="logs/faq/parsing_best_practice_3.png" alt="parsing_best_practice_3" >}}
    このログから目的の属性をすべて抽出するまで、この手順を続けます。

3. **適切なマッチャーを使用する**。
    規則はできるだけシンプルに作成しましょう。たとえば、基本の `notSpace` が機能するなら、多くの場合、特定のパターンに合わせて複雑な正規表現を定義する必要はありません。
    パース規則を記述する際には、次のマッチャーがよく使用されます。

    * notSpace: 次のスペースまでの文字列に一致します
    * data: すべてに一致します (「.*」と同等)
    * word: すべての英数字に一致します
    * integer: 10 進整数に一致し、それを整数としてパースします

    ほとんどの規則は、この 4 つのマッチャーを使用して記述できます。利用可能なマッチャーの完全なリストは[パースのドキュメント][2]で確認できます。

4. **KeyValue**。
   key-value フィルターがあり、これによりすべての属性を自動的に抽出できることに留意してください。
    詳細については、[いくつかの例][3]を参照してください。

5. **ログメッセージの中で、属性として抽出しない部分をスキップする**。
    先の例に戻ります。
    ```
    2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
    ```
    たとえば、dd.collector の情報は利用価値がなく、属性として抽出する必要がないと判断したとします。
    これをスキップするには、対応するセクションを規則から削除します。
    {{< img src="logs/faq/parsing_best_practice_4.png" alt="parsing_best_practice_4" >}}

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/parsing
[2]: /ja/logs/log_configuration/parsing/#matcher-and-filter
[3]: /ja/logs/log_configuration/parsing/#key-value-or-logfmt