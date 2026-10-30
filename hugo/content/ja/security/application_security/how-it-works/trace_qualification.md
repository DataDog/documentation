---
aliases:
- /ja/security/application_security/threats/trace_qualification
title: トレースの適格性確認
---
## 概要 {#overview}

App and API Protection (AAP) は、アプリケーションレベルの攻撃に対する可観測性を提供し、各トレースが生成された条件を評価します。AAP のトレース評価では、各攻撃を有害または安全として分類し、影響の大きい攻撃に対処できるようにします。

AAP [Traces Explorer][1] で **Qualification** ファセットを使ってフィルタリングし、可能な評価結果を表示します。


## 評価結果 {#qualification-outcomes}

AAP はすべてのトレースに対して (クローズドソースの) 評価ルールを実行します。ファセットメニューに記載されているように、評価結果には 4 つの可能な値があります。

| 評価結果 | 説明 |
|------|-------------|
| Unknown | AAP はこの攻撃に対する評価ルールを持っていますが、評価を判断するための十分な情報がありませんでした。|
| None successful | AAP はこのトレース内の攻撃が有害ではないと判断しました。|
| Harmful | トレース内の少なくとも 1 つの攻撃が成功しました。|
| No value | AAP にはこのタイプの攻撃に対する評価ルールがありません。|

### トレースサイドパネル {#trace-sidepanel}

評価結果は、個々のトレースの詳細を表示する際にも確認できます。


[1]: https://app.datadoghq.com/security/appsec/traces