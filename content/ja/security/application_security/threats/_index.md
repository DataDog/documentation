---
title: Application Threat Management
further_reading:
- link: /security/application_security/threats/add-user-info/
  tag: Documentation
  text: Tracking User Activity
- link: /security/application_security/threats/library_configuration/
  tag: Documentation
  text: Configuring your ASM setup
- link: /security/application_security/software_composition_analysis/
  tag: Documentation
  text: Software Composition Analysis
- link: /security/application_security/how-appsec-works/
  tag: Documentation
  text: How ASM Works
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Application Security Management はサポートされていません。</div>
{{< /site-region >}}

ASM Threat Management uses trace telemetry from your APM-instrumented applications to identify threats and attacks on your running services by comparing the observed behavior against known attack patterns, or by identifying business logic abuse.

Threat Monitoring によって提起されたセキュリティシグナルは要約され、サービスの健全性とパフォーマンスを監視するために通常アクセスしているビューに表示されます。[サービスカタログ][1]と APM の個々のサービスページは、アプリケーションの脅威シグナルに関する洞察を提供し、脆弱性の調査、攻撃者のブロック、攻撃の露出のレビューを可能にします。

{{< img src="security/application_security/threats/threats-on-svc-cat_3.png" alt="Service Catalog with services showing threat signals" style="width:100%;" >}}

For additional information about how Threat Management works, read [How ASM Works][4].


## 脅威シグナルを探る

サービスの脅威データが Datadog に入力されると、[ASM Overview][7] に発生内容の概要が表示されます。ここでは、脆弱性検出の有効化、攻撃のレビュー、アラートとレポートのカスタマイズ、サービスの ASM の有効化を行うことができます。疑わしいアクティビティのシグナルを調査するには、サービスの **Review** リンクをクリックします。

[シグナルエクスプローラー][2]では、属性やファセットでフィルターをかけて重要な脅威を見つけます。シグナルをクリックすると、ユーザー情報や IP アドレス、トリガーしたルール、攻撃フロー、関連するトレースやその他のセキュリティシグナルなど、シグナルの詳細を確認できます。このページから、クリックしてケースを作成し、インシデントを宣言することもできます。詳しくは[セキュリティシグナルの調査][8]を参照してください。

{{< img src="security/application_security/threats/appsec-threat-overview.png" alt="シグナルエクスプローラーでの脅威の調査の概要">}}


## 攻撃パターンを特定するための In-App WAF ルールの作成

You can [create In-App WAF rules][5] that define what suspicious behavior looks like in your application, augmenting the default rules that come with ASM. Then [specify custom rules][6] to generate security signals from the attack attempts triggered from these rules, raising them in the Threat Monitoring views for your investigation.

## ASM Protect で攻撃と攻撃者の速度を落とす

{{% asm-protect %}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?lens=Security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Application%20Security%22&column=time&order=desc&product=appsec&viz=stream&start=1694726477747&end=1695331277747&paused=false
[4]: /security/application_security/how-appsec-works/
[5]: /security/application_security/threats/inapp_waf_rules/
[6]: /security/application_security/threats/custom_rules/
[7]: https://app.datadoghq.com/security/appsec?
[8]: /security/application_security/threats/security_signals/