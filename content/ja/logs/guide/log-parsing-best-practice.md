---
title: ログのパース - ベストプラクティス
kind: ガイド
aliases:
  - /ja/logs/faq/log-parsing-best-practice
disable_toc: true
further_reading:
  - link: logs/processing
    tag: Documentation
    text: ログの処理方法
  - link: logs/processing/parsing
    tag: Documentation
    text: パースの詳細
  - link: logs/faq/how-to-investigate-a-log-parsing-issue
    tag: FAQ
    text: ログのパースに関する問題を調査する方法
---
Datadog では、ログからすべての関連情報を抽出するためのパーサーを定義できます。パースの言語および機能の詳細については、[こちらのドキュメント][1]を参照してください。

パース規則の記述は、一見すると複雑に感じるかもしれません。しかし、いくつかのポイントをマスターしてしまえば、非常に簡単です。
ここでは、Datadog Agent のコレクターログから取得された次のログをパースする手順を説明します。

```
2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
```

1. **パースするログのサンプルをコメントとして必ず規則に追加する**。
    {{< img src="logs/faq/parsing_best_practice_1.png" alt="parsing_best_practice_1"  >}}
    サンプルログで、パース規則をテストすることができます。サンプルログは、初めて規則を記述する際にとても役立つと同時に、将来、パーサーまで戻って問題を調べたり、新しいログ形式をサポートする場合にも、たいへん重要になります。

2. **アスタリスクを利用して、属性を 1 つずつパースする**。
    最初からログ全体のパース規則を記述することは求められていません。一度に 1 つ、属性ごとに規則をチェックするために、規則の末尾に `.*` を使用します。これで、この規則の後に何が続いても一致します。
    たとえば、ここではまず、次に何が続くかに関係なく、ログの日付をパースします。そこで、次の規則を作成します。
    {{< img src="logs/faq/parsing_best_practice_2.png" alt="parsing_best_practice_2"  >}}
    日付が正しくパースされることを確認できました。これで、次の属性、重大度の処理に進むことができます。
    まず、パイプ (エスケープする必要がある特殊文字) をエスケープする必要があります。次に、単語と一致させます。
    {{< img src="logs/faq/parsing_best_practice_3.png" alt="parsing_best_practice_3"  >}}
    このログから目的の属性をすべて抽出するまで、この手順を続けます。

3. **適切なマッチャーを使用する**。
    できるだけシンプルな規則をお勧めします。たとえば、従来の notSpace が機能するなら、特定のパターンに合わせて複雑な正規表現を定義する必要はほとんどありません。
    パース規則を記述する際は、次のマッチャーがあることに留意してください。

    * notSpace: 次のスペースまでのすべてに一致します。
    * data: すべてに一致します (「.*」と同等)。
    * word: すべての英数字に一致します。
    * integer

    ほとんどの規則は、この 4 つのマッチャーを使用して記述できます。すべてのマッチャーのリストはこちらで確認できます。

4. **KeyValue**。
    すべての属性を自動的に抽出できる keyvalue フィルターがあることに留意してください。
    詳細については、[こちらの例][2]を参照してください。

5. **属性として抽出する必要がない一部のログメッセージをスキップする**。
    前の例に戻ります。
    ```
    2017-10-12 08:54:44 UTC | INFO | dd.collector | checks.collector(collector.py:530) | Finished run #1780. Collection time: 4.06s. Emit time: 0.01s
    ```
    たとえば、dd.collector の情報は利用価値がなく、属性として抽出する必要がないとします。
    この情報を抽出しないようにするには、対応する抽出セクションを規則から削除します。
    {{< img src="logs/faq/parsing_best_practice_4.png" alt="parsing_best_practice_4"  >}}

## その他の参考資料


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/parsing
[2]: /ja/logs/processing/parsing/#key-value