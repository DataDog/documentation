---
algolia:
  tags:
  - inbox
aliases:
- /ja/security_platform/cloud_security_management/
cascade:
  algolia:
    subcategory: Cloud Security Management
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: Release Notes
  text: See What's New in Datadog Security Compliance
- link: /security/cloud_security_management/misconfigurations/
  tag: Documentation
  text: Start tracking misconfigurations with CSM Misconfigurations
- link: /security/threats/setup
  tag: Documentation
  text: Uncover kernel-level threats with CSM Threats
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: Blog
  text: Elevate AWS threat detection with Stratus Red Team
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: Blog
  text: Best practices for securing Kubernetes applications
- link: https://www.datadoghq.com/blog/workload-security-evaluator/
  tag: Blog
  text: Run Atomic Red Team detection tests in container environments with Datadog’s
    Workload Security Evaluator
- link: https://www.datadoghq.com/blog/security-context-with-datadog-cloud-security-management/
  tag: Blog
  text: Add security context to observability data with Datadog Cloud Security Management
- link: https://www.datadoghq.com/blog/security-labs-ruleset-launch/
  tag: Blog
  text: Fix common cloud security risks with the Datadog Security Labs Ruleset
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: Blog
  text: Best practices for application security in cloud-native environments
- link: https://www.datadoghq.com/blog/custom-detection-rules-with-datadog-cloud-security-management/
  tag: Blog
  text: Customize rules for detecting cloud misconfigurations with Datadog Cloud Security
    Management
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: Blog
  text: Build sufficient security coverage for your cloud environment
- link: https://www.datadoghq.com/blog/cloud-security-study-learnings/
  tag: Blog
  text: Key learnings from the State of Cloud Security study
- link: https://www.datadoghq.com/blog/cloud-security-malware-detection/
  tag: Blog
  text: Detect malware in your containers with Datadog Cloud Security Management
- link: https://www.datadoghq.com/blog/security-posture-csm/
  tag: Blog
  text: Report on changes to your security posture with Cloud Security Management
title: Cloud Security Management
---

Datadog Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation. Powered by observability data, security teams can determine the impact of a threat by tracing the full attack flow and identify the resource owner where a vulnerability was triggered.

CSM は、Datadog Agent とプラットフォーム全体のクラウドインテグレーションを活用し、以下を備えています。

- [**Threats**][1]: 環境全体のファイル、ネットワーク、プロセスのアクティビティを監視し、インフラストラクチャーへの脅威をリアルタイムで検出します。
- [**Misconfigurations**][2]: 本番環境のセキュリティ衛生およびコンプライアンスポスチャを追跡し、監査証拠の収集を自動化し、攻撃に対する脆弱性を残す誤構成を修正することができます。
- [**Identity Risks**][8]: 組織の AWS IAM リスクを詳細に視覚化し、アイデンティティリスクの継続的な検出と解決を可能にします。
- [**Vulnerabilities**][9]: インフラストラクチャーの観測可能性を活用し、組織のコンテナやホストの脆弱性を検出、優先順位付け、管理します。

{{< img src="security/csm/csm_overview_2.png" alt="Cloud Security Management in Datadog" width="100%">}}

## 組織の健全性の追跡

[CSM Misconfigurations][2] で利用可能な[セキュリティポスチャスコア][5]は、組織全体の健全性を追跡するのに役立ちます。このスコアは、すぐに使えるアクティブなクラウドとインフラストラクチャーのコンプライアンスルールをすべて満たしている環境の割合を示します。

誤構成の修正によって、根本的な問題を解決するか、または誤構成をミュートすることで、組織のスコアを向上させます。

{{< img src="security/csm/health_scores.png" alt="CSM 概要ページに表示されるポスチャスコアは、組織の全体的な健全性を追跡します" width="100%">}}

## 問題の確認と修正

Use the [Explorers][7] to review and remediate your organization's security detections. View detailed information about a detection, including guidelines and remediation steps. [Send real-time notifications][6] when a threat is detected in your environment, and use tags to identify the owner of an impacted resource.

{{< img src="security/csm/explorers_page.png" alt="CSM Explorers page" width="100%">}}

## Investigate resources

{{< site-region region="gov" >}}
<div class="alert alert-warning">Resource Catalog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">Resource Catalog is in beta.</div>

Use the [Resource Catalog][12] to view specific misconfigurations and threats that have been reported on the hosts and resources in your environments. See [Resource Catalog][13] for more information.

{{< img src="infrastructure/resource_catalog/resource_catalog_infra.png" alt="Resource Catalog map view displaying host and cloud resources grouped by category and misconfigurations." style="width:100%;" >}}

## Subscribe to weekly digest reports

Receive a weekly summary of Cloud Security Management activity over the past week, including important new security issues discovered in the last seven days. Subscriptions to the weekly digest report are managed on a per user basis. To [subscribe to the weekly digest report][11], you must have the `security_monitoring_signals_read` permission.

## 次のステップ

To get started with CSM, navigate to the [**Cloud Security Management Setup**][3] page in Datadog, which has detailed steps on how to set up and configure CSM. For more information, see [Setting Up Cloud Security Management][10].

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/threats/
[2]: /ja/security/cloud_security_management/misconfigurations/
[3]: https://app.datadoghq.com/security/configuration/csm/setup
[4]: https://app.datadoghq.com/security/csm
[5]: /ja/glossary/#posture-score
[6]: /ja/security/notifications/
[7]: https://app.datadoghq.com/security/compliance
[8]: /ja/security/cloud_security_management/identity_risks/
[9]: /ja/security/cloud_security_management/vulnerabilities/
[10]: /ja/security/cloud_security_management/setup/
[11]: https://app.datadoghq.com/security/configuration/reports
[12]: https://app.datadoghq.com/infrastructure/catalog
[13]: /ja/infrastructure/resource_catalog