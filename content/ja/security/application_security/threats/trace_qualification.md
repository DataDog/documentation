---
aliases: null
further_reading:
- link: /security/application_security/
  tag: ドキュメント
  text: Datadog Application Security Management で脅威から守る
- link: /security/application_security/how-appsec-works//
  tag: ドキュメント
  text: Application Security Management の仕組み
title: トレースの判定
---

## 概要

Application Security Management (ASM) は、アプリケーションレベルの攻撃に対する観測可能性を提供し、各トレースが生成された条件を評価します。次に、ASM のトレース判定機能により、各攻撃が有害または安全としてラベル付けされ、最も影響の大きい攻撃に対して対策を講じるのに役立ちます。

判定結果を確認するには、ASM [トレースエクスプローラー][1]で **Qualification** ファセットでフィルタリングします。

{{< img src="security/application_security/threats/trace_qualification/trace-qualification-traces_2.png" alt="ASM トレースリストの qualification ファセットに判定結果が表示されている様子">}}

## 判定結果

ASMは、すべてのトレースに対して判定ルール（クローズドソース）を実行します。ファセットメニューに記載されているとおり、判定結果としては 4 つの可能性があります。

| 判定結果 | 説明 |
|------|-------------|
| Unknown | ASM にはこの攻撃を判定するためのルールが設定されているが、判定を下すのに十分な情報がなかった。 |
| None successful | ASM がこのトレース内の攻撃は有害ではないと判断した。 |
| Harmful | トレース内の攻撃が少なくとも 1 つは成功した。 |
| No value | ASM にこの種の攻撃に対する判定ルールが設定されていない。 |

### トレースサイドパネル

個々のトレースの詳細を表示すると、判定結果も確認できます。</br>
ASMが安全と判定したトレースの例:

{{< img src="security/application_security/threats/trace_qualification/trace-none-successful_3.png" alt="安全と判定された ASM トレース">}}

ASM が有害と判定したトレースの例:

{{< img src="security/application_security/threats/trace_qualification/trace-harmful_2.png" alt="有害と判定された ASM トレース">}}

[1]: https://app.datadoghq.com/security/appsec/traces
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}