---
aliases: null
further_reading:
- link: /security/application_security/
  tag: Documentation
  text: Protect against threats with Datadog Application Security Management
- link: /security/application_security/how-appsec-works//
  tag: Documentation
  text: How Application Security Management Works
title: トレースの適格性確認
---

## 概要

Application Security Management (ASM) provides observability into application-level attacks, and evaluates the conditions in which each trace was generated. ASM trace qualification then labels each attack as harmful or safe to help you take action on the most impactful attacks.

判定結果を確認するには、ASM [トレースエクスプローラー][1]で **Qualification** ファセットでフィルタリングします。

{{< img src="security/application_security/threats/trace_qualification/trace-qualification-traces_2.png" alt="ASM trace list with the qualification facet showing the possible qualification results">}}

## Qualification outcomes

ASM runs qualification rules (closed-source) on every trace. There are four possible qualification outcomes, as listed in the facet menu:

| Qualification result | 説明 |
|------|-------------|
| Unknown | ASM has qualification rules for this attack, but did not have enough information to make a qualification decision. |
| None successful | ASM determined that attacks in this trace were not harmful. |
| Harmful | At least one attack in the trace was successful. |
| No value | ASM does not have qualification rules for this type of attack. |

### トレースサイドパネル

The qualification result can also be seen when viewing the details of an individual trace. </br>
Example of a trace that ASM has qualified as safe:

{{< img src="security/application_security/threats/trace_qualification/trace-none-successful_3.png" alt="ASM trace qualified as safe">}}

Example of a trace that ASM has qualified as harmful:

{{< img src="security/application_security/threats/trace_qualification/trace-harmful_2.png" alt="ASM trace qualified as harmful">}}

[1]: https://app.datadoghq.com/security/appsec/traces
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}