---
algolia:
  tags:
  - asm
  - App and API Protection
aliases:
- /ja/security_platform/application_security
- /ja/security/application_security/enabling/single_step
- /ja/security/application_security/enabling/compatibility
- /ja/security/application_security/enabling
- /ja/security/application_security/getting_started
- /ja/security/application_security/threats
description: 分散型トレースにより提供された実行コンテキストを利用して、実稼働システムをターゲットとした脅威を監視します。
further_reading:
- link: /security/application_security/how-it-works/
  tag: ドキュメント
  text: App and API Protection の仕組み
- link: https://www.datadoghq.com/product/security-platform/application-security-monitoring/
  tag: 製品ページ
  text: Datadog App and API Protection
- link: https://www.datadoghq.com/blog/apm-security-view/
  tag: ブログ
  text: APM セキュリティビューでリスク、脆弱性、攻撃を視覚化する
- link: https://www.datadoghq.com/blog/aws-waf-datadog/
  tag: ブログ
  text: Datadog を使用した AWS WAF のアクティビティの監視
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: ブログ
  text: Datadog Security Inbox によるセキュリティリスクの優先順位付け方法
- link: https://www.datadoghq.com/blog/understanding-your-waf/
  tag: ブログ
  text: 'WAF の理解: Web アプリケーションセキュリティにおける一般的なギャップへの対処方法'
- link: https://www.datadoghq.com/blog/mitigate-account-takeovers/
  tag: ブログ
  text: Datadog App and API Protection でアカウント乗っ取りを軽減
title: App and API Protection
---

{{< img src="/security/application_security/app-sec-landing-page.png" alt="攻撃フローとフレームグラフが表示された Datadog のセキュリティシグナルパネル" width="75%">}}

**App & API Protection (AAP)** provides unified visibility and security for your applications and APIs, helping you detect, investigate, and prevent threats across modern workloads.

Whether you're defending public-facing APIs, internal services, or user-facing applications, AAP equips your teams with realtime OOTB threat detection, posture assessment, and in-app protections.

<div class="alert alert-info">Formerly known as Application Security Monitoring (ASM), AAP now goes beyond runtime threat detection to include API discovery, posture management, and protection capabilities.</div>


## 主な機能

### API discovery and posture management

* Automatically detect all APIs exposed by your services.  
* Identify unprotected, undocumented, or overly permissive endpoints.  
* Get detailed, contextual findings tied to specific endpoints, misconfigurations, and observed behavior.  
* Evaluate API configurations against posture rules based on security best practices and compliance frameworks (e.g., OWASP API Top 10).

### Runtime threat detection and protection

* Detect real-time threats such as injection attacks, account takeover attempts, and application abuse.  
* Correlate multi-signal attack patterns into actionable insights.  
* Block malicious traffic with In-App WAF rules using attributes like IP, user agent, headers, and more.

## ユースケース

* Protect customer data in production APIs  
* Detect and block credential stuffing and ATO attacks  
* Maintain API posture compliance across teams and environments  
* Investigate incidents with correlated trace, log, and security data

## AAP implementation in Datadog

Datadog におけるアプリケーションセキュリティの実装方法について知りたい場合は、[App and API Protection の仕組み][3]をご覧ください。

## 環境を構成する

提供されている[標準ルール][4]を利用して、AAP は追加設定なしで脅威を検知します。すでに Datadog の [APM][1] が物理または仮想ホストで構成されている場合は、環境変数を 1 つ設定するだけで利用を開始できます。

AAP を使用して脅威を検知および防御するための環境設定を開始するには、それぞれの製品の有効化ドキュメントを参照してください。AAP が設定されると、[Security Signals Explorer][6] でセキュリティシグナルを調査・対処し始めることができます。

## セキュリティシグナルの調査と修復

[セキュリティシグナルエクスプローラー][6]でセキュリティシグナルをクリックすると、その概要と攻撃緩和の推奨手順を確認できます。同じパネル内で、その関連する攻撃フローがわかるトレースの表示や、さらにコンテキストを取得するための情報をリクエストすることができます。

## Exploit Prevention vs. In-App WAF

This section provides a summary of Exploit Prevention and how it differs from In-App Web Application Firewall (WAF) rules.

Datadog AAP includes the [Exploit Prevention][14] and [In-App WAF][15] features to protect your applications against exploits. Exploit Prevention is an extension of In-App WAF. Exploit Prevention leverages In-App WAF as the first line of defense and then blocks attacks missed by the WAF.

Exploit Prevention leverages Runtime Application Self-Protection (RASP) technology to determine if an application request interacts with a vulnerable code path, and then protects it from specific vulnerability types:

- SQL injection (SQLi)
- サーバーサイドリクエストフォージェリー (SSRF)
- Local File Inclusion (LFI)
- コマンドインジェクション

For library compatibility, see [Exploit Prevention][13].

In addition to detecting malicious patterns in the request, Exploit Prevention differs from In-App WAF by tracking the actions performed by the application (SQL query executed, files accessed, and so on). Exploit Prevention is able to determine if user input modified the SQL query or restricted a file detrimentally, and block it. 

For example, in a SQL injection attack, the goal of the attacker is to take control of the SQL query and change its meaning. Exploit Prevention parses the SQL query before execution and checks for any user parameter in the query. If one is present, Exploit Prevention checks if the SQL parser interpreted the parameter as multiple SQL tokens (changing the meaning of the SQL query). In that case, Exploit Prevention flags the query as injected.

## AAP を無効化

AAP またはその機能を無効化する方法については、以下を参照してください。

- [Disabling AAP][10]

## 次のステップ

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/agent/
[3]: /ja/security/application_security/how-it-works/
[4]: /ja/security/default_rules/?category=cat-application-security
[6]: https://app.datadoghq.com/security
[7]: https://dashcon.io/appsec
[8]: /ja/security/code_security/software_composition_analysis/
[9]: /ja/security/code_security/
[10]: /ja/security/application_security/troubleshooting/#disabling-aap
[11]: /ja/security/application_security/troubleshooting/#disabling-software-composition-analysis
[12]: /ja/security/application_security/troubleshooting/#disabling-code-security
[13]: /ja/security/application_security/exploit-prevention/#library-compatibility
[14]: /ja/security/application_security/exploit-prevention/
[15]: /ja/security/application_security/waf-integration/