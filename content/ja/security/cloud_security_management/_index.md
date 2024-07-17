---
algolia:
  tags:
  - 受信トレイ
aliases:
- /ja/security_platform/cloud_security_management/
cascade:
  algolia:
    subcategory: Cloud Security Management
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: リリースノート
  text: Datadog セキュリティコンプライアンスの新機能を見る
- link: /security/cloud_security_management/misconfigurations/
  tag: ドキュメント
  text: CSM Misconfigurations で誤構成の追跡を開始
- link: /security/threats/setup
  tag: ドキュメント
  text: CSM Threats でカーネルレベルの脅威を解明する
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: GitHub
  text: Stratus Red Team で AWS の脅威検出を高度化する
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: GitHub
  text: Kubernetes アプリケーションを保護するためのベストプラクティス
- link: https://www.datadoghq.com/blog/workload-security-evaluator/
  tag: GitHub
  text: Datadog の Workload Security Evaluator を使用したコンテナ環境での Atomic Red Team 検出テストの実行
- link: https://www.datadoghq.com/blog/security-context-with-datadog-cloud-security-management/
  tag: GitHub
  text: Datadog Cloud Security Management による観測可能性データへのセキュリティコンテキストの追加
- link: https://www.datadoghq.com/blog/security-labs-ruleset-launch/
  tag: GitHub
  text: Datadog Security Labs Ruleset で一般的なクラウドセキュリティリスクを修正する
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: ブログ
  text: クラウドネイティブ環境におけるアプリケーションセキュリティのベストプラクティス
- link: https://www.datadoghq.com/blog/custom-detection-rules-with-datadog-cloud-security-management/
  tag: ブログ
  text: Datadog Cloud Security Management でクラウドの誤構成を検出するルールをカスタマイズする
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: ブログ
  text: クラウド環境に対する十分なセキュリティカバレッジの構築
- link: https://www.datadoghq.com/blog/cloud-security-study-learnings/
  tag: ブログ
  text: State of Cloud Security 調査から得られたキーポイント
- link: https://www.datadoghq.com/blog/cloud-security-malware-detection/
  tag: ブログ
  text: Detect malware in your containers with Datadog Cloud Security Management
- link: https://www.datadoghq.com/blog/security-posture-csm/
  tag: ブログ
  text: Report on changes to your security posture with Cloud Security Management
title: Cloud Security Management
---

Datadog Cloud Security Management (CSM) delivers real-time threat detection and continuous configuration audits across your entire cloud infrastructure, all in a unified view for seamless collaboration and faster remediation. Powered by observability data, security teams can determine the impact of a threat by tracing the full attack flow and identify the resource owner where a vulnerability was triggered.

CSM leverages the Datadog Agent and platform-wide cloud integrations and includes:

- [**Threats**][1]: Monitors file, network, and process activity across your environment to detect real-time threats to your infrastructure.
- [**Misconfigurations**][2]: Tracks the security hygiene and compliance posture of your production environment, automates audit evidence collection, and enables you to remediate misconfigurations that leave your organization vulnerable to attacks.
- [**Identity Risks**][8]: Provides in-depth visibility into your organization's AWS IAM risks and enables you to detect and resolve identity risks on an ongoing basis.
- [**Vulnerabilities**][9]: Leverages infrastructure observability to detect, prioritize, and manage vulnerabilities in your organization's containers and hosts.

{{< img src="security/csm/csm_overview_2.png" alt="Cloud Security Management in Datadog" width="100%">}}

## Track your organization's health

Available for [CSM Misconfigurations][2], the [security posture score][5] helps you track your organization's overall health. The score represents the percentage of your environment that satisfies all of your active out-of-the-box cloud and infrastructure compliance rules.

Improve your organization's score by remediating misconfigurations, either by resolving the underlying issue or by muting the misconfiguration.

{{< img src="security/csm/health_scores.png" alt="The posture score on the CSM overview page tracks your organization's overall health" width="100%">}}

## Explore and remediate issues

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

## Next steps

To get started with CSM, navigate to the [**Cloud Security Management Setup**][3] page in Datadog, which has detailed steps on how to set up and configure CSM. For more information, see [Setting Up Cloud Security Management][10].

## Further reading

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