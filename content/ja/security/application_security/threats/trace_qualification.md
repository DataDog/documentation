---
aliases: null
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog Application Security Management で脅威から守る
- link: /security/application_security/how-appsec-works//
  tag: ドキュメント
  text: Application Security Management の仕組み
title: トレースの適格性確認
---

## 概要

Application Security Management (ASM) は、アプリケーションレベルの攻撃に対する可観測性を提供し、各トレースが生成された状況を評価します。 ASM のトレース評価は、各攻撃を有害または安全としてラベル付けし、最も影響の大きい攻撃に対して適切な対応を取るための支援を行います。

判定結果を確認するには、ASM [トレースエクスプローラー][1]で **Qualification** ファセットでフィルタリングします。

{{< img src="security/application_security/threats/trace_qualification/trace-qualification-traces_2.png" alt="ASM トレースリストの評価ファセットに、可能性のある評価結果が表示されています。">}}

## 評価結果

ASM はすべてのトレースに対して評価ルール (クローズドソース) を実行します。評価結果には、ファセットメニューにリストされているように、以下の 4 つの可能性があります。

| 評価結果 | 説明 |
|------|-------------|
| Unknown | ASM はこの攻撃に対する評価ルールを持っていますが、評価を決定するための十分な情報がありませんでした。 |
| None successful | ASM はこのトレース内の攻撃が有害ではないと判断しました。 |
| Harmful | トレース内の少なくとも 1 つの攻撃が成功しました。 |
| No value | ASM にはこのタイプの攻撃に対する評価ルールがありません。 |

### トレースサイドパネル

評価結果は、個別のトレース詳細を表示する際にも確認できます。</br>
ASM が安全と評価したトレースの例:

{{< img src="security/application_security/threats/trace_qualification/trace-none-successful_3.png" alt="安全であると評価された ASM トレース">}}

ASM が有害と評価したトレースの例:

{{< img src="security/application_security/threats/trace_qualification/trace-harmful_2.png" alt="有害であると評価された ASM トレース">}}

[1]: https://app.datadoghq.com/security/appsec/traces
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}