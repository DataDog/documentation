---
aliases:
- /ja/compliance_monitoring
- /ja/cloud_siem
- /ja/security_platform
- /ja/security/security_monitoring
- /ja/security_monitoring/explorer/
- /ja/cloud_siem/explorer/
- /ja/security_platform/explorer
- /ja/security/explorer
- /ja/security_platform/security_signal_management
- /ja/security/security_signal_management
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: リリースノート
  text: Datadog Security の最新リリースをチェック！ (アプリログインが必要です)。
- link: https://www.datadoghq.com/guided-tour/security/
  tag: ガイドツアー
  text: 製品ガイドツアーを見る
- link: /getting_started/cloud_siem
  tag: ドキュメント
  text: Cloud SIEM で脅威の検出を開始
- link: /security/cloud_security_management/misconfigurations/
  tag: ドキュメント
  text: CSM Misconfigurations で誤構成の追跡を開始
- link: /security/threats/setup
  tag: Documentation
  text: CSM Threats でカーネルレベルの脅威を解明する
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Datadog の Security Labs ブログでセキュリティ関連のトピックを読む
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: セキュリティと脅威検出を高めるインタラクティブなセッションに参加できます
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: ブログ
  text: Stratus Red Team で AWS の脅威検出を高度化する
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: ブログ
  text: Kubernetes アプリケーションを保護するためのベストプラクティス
- link: https://www.datadoghq.com/blog/securing-cloud-native-infrastructure-network-perimeter/
  tag: ブログ
  text: クラウドネイティブ環境におけるネットワーク境界セキュリティのベストプラクティス
- link: https://www.datadoghq.com/blog/securing-data-in-cloud-native-infrastructure/
  tag: ブログ
  text: クラウドネイティブインフラストラクチャーにおけるデータセキュリティのベストプラクティス
- link: https://www.datadoghq.com/blog/chaos-engineering-for-security/
  tag: ブログ
  text: クラウドのためのセキュリティ重視のカオスエンジニアリング実験
- link: https://www.datadoghq.com/blog/datadogs-approach-devsecops/
  tag: ブログ
  text: Datadog の DevSecOps へのアプローチ
title: Datadog Security
---

## Overview

Bring speed and scale to your production security operations. Datadog Security delivers real-time threat detection, and continuous configuration audits across applications, hosts, containers, and cloud infrastructure. Coupled with the greater Datadog observability platform, Datadog Security brings unprecedented integration between security and operations aligned to your organizations shared goals.

Datadog Security includes [Application Security Management](#application-security-management), [Cloud SIEM](#cloud-siem), and [Cloud Security Management](#cloud-security-management). To learn more, check out the [30-second Product Guided Tour][14].

## Application Security Management

[Application Security Management][1] (ASM) provides observability into application-level attacks that aim to exploit code-level vulnerabilities, such as Server-Side-Request-Forgery (SSRF), SQL injection, Log4Shell, and Reflected Cross-Site-Scripting (XSS). ASM leverages [Datadog APM][2], the [Datadog Agent][3], and in-app detection rules to detect threats in your application environment. Check out the product [Guided Tour](https://www.datadoghq.com/guided-tour/security/application-security-management/) to see more.

{{< img src="/security/application_security/app-sec-landing-page.png" alt="A security signal panel in Datadog, which displays attack flows and flame graphs" width="75%">}}

## Cloud SIEM

[Cloud SIEM][4] (Security Information and Event Management) detects real-time threats to your application and infrastructure, like a targeted attack, an IP communicating with your systems which matches a threat intel list, or an insecure configuration. Cloud SIEM is powered by [Datadog Log Management][5]. With these areas combined, you can [automate remediation of threats detected by Datadog Cloud SIEM][6] to speed up your threat-response workflow. Check out the dedicated [Guided Tour](https://www.datadoghq.com/guided-tour/security/cloud-siem/) to see more.

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="Cloud SIEM のホームページには、重要なシグナル、疑わしいアクター、影響を受けるリソース、脅威インテル、シグナルの傾向などのウィジェットを備えた Security Overview セクションが表示されています" width="100%">}}

## Cloud Security Management

[Cloud Security Management (CSM)][10] delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation. Powered by observability data, security teams can determine the impact of a threat by tracing the full attack flow and identify the resource owner where a vulnerability was triggered.

CSM includes [Threats][12], [Misconfigurations][11], [Identity Risks][15], and [Vulnerabilities][16]. To learn more, check out the dedicated [Guided Tour][13].

{{< img src="security/csm/csm_overview_2.png" alt="Cloud Security Management 概要の Security Inbox には、優先すべきセキュリティ問題のリストが表示されます" width="100%">}}

To get started with Datadog Security, navigate to the [**Security** > **Setup**][9] page in Datadog, which has detailed information for single or multi-configuration, or follow the getting started sections below to learn more about each area of the platform.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/application_security/
[2]: /ja/tracing/
[3]: /ja/agent/
[4]: /ja/security/cloud_siem
[5]: /ja/logs/
[6]: https://www.datadoghq.com/blog/automated-vulnerability-remediation-datadog/
[9]: https://app.datadoghq.com/security/configuration
[10]: /ja/security/cloud_security_management/
[11]: /ja/security/cloud_security_management/misconfigurations/
[12]: /ja/security/threats/
[13]: https://www.datadoghq.com/guided-tour/security/cloud-security-management/
[14]: https://www.datadoghq.com/guided-tour/security/
[15]: /ja/security/cloud_security_management/identity_risks/
[16]: /ja/security/cloud_security_management/vulnerabilities/