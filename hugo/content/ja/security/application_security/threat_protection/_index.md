---
description: App and API Protection の Threat Protection を使用して、アプリケーションおよび API への攻撃をリアルタイムで検出、調査、ブロックします。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-exploit-prevention/
  tag: ブログ
  text: Datadog Exploit Prevention で、ゼロデイ攻撃からアプリケーションを保護する
title: Threat Protection
---
[App and API Protection][1] (AAP) の Threat Protection を使用して、アプリケーションおよび API への攻撃を検出し、調査を実行し、悪意のあるトラフィックをリアルタイムでブロックします。

開始するには、サービスで [AAP を設定][2]して、セキュリティトレースが報告されるようにしてください。AAP は、ライブアプリケーショントラフィックから脅威を検知し、それに対応できるようにします。

## Threat Protection の仕組み {#how-threat-protection-works}

Threat Protection は、ライブアプリケーショントラフィックデータに基づいて構築されたいくつかの機能を統合します。Threat Protection を使用すると、以下のことが可能です。

- [セキュリティシグナル][3]を使用して脅威を検出および調査します。Datadog は、検出ルールから脅威を検知するとセキュリティシグナルを作成するため、シグナルエクスプローラーで攻撃のトリアージ、フィルタリング、調査を行うことができます。
- [ポリシー][4]を使用して攻撃や攻撃者をブロックします。Datadog UI から手動または自動ルールを通じて、悪意のある IP アドレスやユーザーをリアルタイムでブロックします。
- [エクスプロイト防止][5]を使用してコード内のエクスプロイト試行を阻止します。実行中のアプリケーション内から、ゼロデイ攻撃を含む脆弱性を悪用しようとする試みを検出してブロックします。
- [WAF Integrations][6] を使用して保護を境界まで拡張します。アプリ内保護と AWS WAF などのエッジ防御を組み合わせ、多層防御アプローチを実現します。
- [アカウント乗っ取り保護][7]でユーザーアカウントを防御します。クレデンシャルスタッフィングなどのアカウント乗っ取り攻撃を検出および緩和し、侵害されたユーザーを無効にします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/
[2]: /ja/security/application_security/setup/
[3]: /ja/security/application_security/threat_protection/security_signals/
[4]: /ja/security/application_security/threat_protection/policies/
[5]: /ja/security/application_security/threat_protection/exploit-prevention/
[6]: /ja/security/application_security/threat_protection/waf-integration/
[7]: /ja/security/application_security/threat_protection/account_takeover_protection/