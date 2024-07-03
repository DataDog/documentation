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
  tag: Release Notes
  text: Check out the latest Datadog Security releases! (App login required).
- link: https://www.datadoghq.com/guided-tour/security/
  tag: Guided Tour
  text: See a Product Guided Tour
- link: /getting_started/cloud_siem
  tag: Documentation
  text: Begin detecting threats with Cloud SIEM
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Start tracking misconfigurations with CSM Misconfigurations
- link: /security/threats/setup
  tag: Documentation
  text: Uncover kernel-level threats with CSM Threats
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Read about security-related topics on Datadog's Security Labs blog
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Join an interactive session to elevate your security and threat detection
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: Blog
  text: Elevate AWS threat detection with Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: Blog
  text: Best practices for securing Kubernetes applications
- link: https://www.datadoghq.com/blog/securing-cloud-native-infrastructure-network-perimeter/
  tag: Blog
  text: Best practices for network perimeter security in cloud-native environments
- link: https://www.datadoghq.com/blog/securing-data-in-cloud-native-infrastructure/
  tag: Blog
  text: Best practices for data security in cloud-native infrastructure
- link: https://www.datadoghq.com/blog/chaos-engineering-for-security/
  tag: Blog
  text: Security-focused chaos engineering experiments for the cloud
- link: https://www.datadoghq.com/blog/datadogs-approach-devsecops/
  tag: Blog
  text: Datadog's approach to DevSecOps
title: Datadog Security
---

## 概要

実稼働セキュリティ運用にスピードとスケールを。Datadog Security は、リアルタイムの脅威検出と、アプリケーション、ホスト、コンテナ、クラウドインフラストラクチャー全体にわたる継続的なコンフィギュレーション監査を提供します。Datadog の可観測性プラットフォームと組み合わせることで、Datadog Security は、組織の共有目標に沿ったセキュリティと運用の間にかつてないインテグレーションをもたらします。

Datadog Security には、[Application Security Management](#application-security-management)、[Cloud SIEM](#cloud-siem)、[Cloud Security Management](#cloud-security-management) があります。詳しくは、[30 秒製品ガイドツアー][14]をご覧ください。

## Application Security Management

[Application Security Management][1] (ASM) は、SSRF (Server-Side-Request-Forgery) や SQL インジェクション、Log4Shell、XSS (Reflected Cross-Site-Scripting) など、コードレベルの脆弱性を悪用しようとするアプリケーションレベルの攻撃に対する観測可能性を提供します。ASM は、Datadog [APM][2]、[Datadog Agent][3]、およびアプリ内検出ルールを活用して、アプリケーション環境における脅威を検出します。詳しくは製品[ガイドツアー](https://www.datadoghq.com/guided-tour/security/application-security-management/)をご確認ください。

{{< img src="/security/application_security/app-sec-landing-page.png" alt="攻撃フローとフレームグラフが表示された Datadog のセキュリティシグナルパネル" width="75%">}}

## Cloud SIEM

[Cloud SIEM][4] (Security Information and Event Management) は、標的型攻撃、脅威情報リストに一致する IP 通信、安全でない構成など、アプリケーションやインフラストラクチャーに対する脅威をリアルタイムに検出します。Cloud SIEM は、[Datadog ログ管理][5]を利用しています。これらを組み合わせることで、[Datadog Cloud SIEM で検出した脅威の対処を自動化][6]し、脅威対応のワークフローを加速させることができます。詳しくは専用の[ガイドツアー](https://www.datadoghq.com/guided-tour/security/cloud-siem/)をご確認ください。

{{< img src="security/security_monitoring/cloud_siem_overview_2.png" alt="The Cloud SIEM home page showing the Security Overview section with widgets for important signals, suspicious actors, impacted resources, threat intel, and signal trends" width="100%">}}

## Cloud Security Management

[Cloud Security Management (CSM)][10] は、クラウドインフラクチャー全体でリアルタイムの脅威検出と継続的な構成監査を実現し、統一ビューでシームレスなコラボレーションと迅速な修復を可能にします。 観測可能性データにより、セキュリティチームは、攻撃フローを完全にトレースすることで脅威の影響を判断し、脆弱性がトリガーされたリソース所有者を特定することができます。

CSM には、[Threats][12]、[Misconfigurations][11]、[Identity Risks][15]、[Vulnerabilities][16] が含まれます。詳細については、専用の[ガイドツアー][13]をご覧ください。

{{< img src="security/csm/csm_overview_2.png" alt="The Security Inbox on the Cloud Security Management overview shows a list of prioritized security issues" width="100%">}}

Datadog Security を使い始めるには、Datadog の [**Security** > **Setup**][9] ページに移動し、単一構成または複数構成の詳細情報を参照するか、以下のスタートアップセクションに従って、プラットフォームの各エリアの詳細について学びます。

## その他の参考資料

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