---
title: Cloud Security Management Misconfigurations
aliases:
  - /security_platform/cspm/
  - "/security/cspm/#glossary"
  - /security/cspm/
  - /security/misconfigurations/
algolia:
  tags: [cspm]
---

Cloud Security Management Misconfigurations (CSM Misconfigurations) は、お使いのクラウドリソースにおける現在および過去のセキュリティポスチャ (セキュリティ体制) のスムーズな評価と視覚化、監査エビデンス収集の自動化、攻撃に対する組織の脆弱性の原因となる誤構成の修復などをサポートします。誤構成に起因するセキュリティ上の弱点を継続的に洗い出すことで、業界標準への準拠を確保しつつ、リスクを軽減することができます。

## クラウドリソース全体の誤構成の検出

Datadog の[すぐに使えるコンプライアンスルール](#manage-out-of-the-box-and-custom-compliance-rules)を使用して、すべてのクラウドリソースで誤構成を検出、優先順位付け、修正することにより、セキュリティ体制を強化し、継続的にコンプライアンスを実現します。

[Overview ページ][1]では、セキュリティ状況の概要を見ることができます。[Misconfigurations Explorer][2] で、誤構成の詳細や過去の構成を分析することができます。

CSM Misconfigurations のリソース評価は 15 分〜4 時間の間で行われます (タイプにより異なる)。Datadog はスキャンが終了するとすぐに新しい誤構成を生成し、過去 15 か月の完全な履歴を保存するため、調査や監査の際に利用できます。

{{< img src="security/csm/csm_overview_2.png" alt="The Security Inbox on the Cloud Security Management overview shows a list of prioritized security issues to remediate" width="100%">}}

## 業界のフレームワークやベンチマークへの準拠を維持する

CSM Misconfigurations には、セキュリティ専門家チームによって管理された 1,000 以上のすぐに使えるコンプライアンスルールが付属しています。これらのルールは、PCI や SOC2 などのコンプライアンス基準や業界ベンチマークに含まれる制御や要件に対応しています。

[コンプライアンスレポートを表示][3]すると、コンプライアンスフレームワークの各コントロールに対するコンプライアンスの遵守状況を確認できます。レポートには、最も誤構成の不合格が多いリソース、誤構成の合格・不合格のリソース数の詳細な内訳、重大度の高いルール違反の上位 3 つなどの詳細が記載されています。

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_2.png" alt="CSM Misconfigurations compliance frameworks" width="100%">}}

## すぐに使えるカスタムコンプライアンスルールの管理

[すぐに使えるコンプライアンスルール][4]は、最も重要なリスクを明らかにしてくれるため、すぐに対処することができます。Datadog は、常に新しいデフォルトルールを開発しており、これらは自動的にアカウントにインポートされます。各ルールがどのように環境をスキャンするかを定義することで[ルールをカスタマイズ][5]し、[カスタムルールを作成][6]し、[不合格の誤構成に対するリアルタイム通知を設定](#set-up-real-time-notifications)することが可能です。

{{< img src="security/cspm/compliance_rules.png" alt="CSM Misconfigurations コンプライアンスルール" width="100%">}}

## リアルタイム通知の設定

環境内で新たな誤構成が検出されると[リアルタイムで通知を送信][7]し、チームはリスクを軽減するためのアクションを起こすことができます。通知は、[Slack、メール、PagerDuty、Webhook など][8]に送ることができます。

テンプレート変数と Markdown を使用して、[通知メッセージをカスタマイズ][9]できます。既存の通知ルールの編集、無効化、削除、または新しいルールの作成、重大度やルールタイプに基づいた通知トリガー時のカスタムロジックの定義が可能です。

## 誤構成の確認と修正

[Misconfigurations Explorer][10] を使用して詳細を調査します。構成、リソースに適用されたコンプライアンスルール、リソースの所有者や環境内の場所に関する追加のコンテキストを提供するタグなど、リソースの詳細情報を表示します。誤構成がビジネスのユースケースに合致しない場合、または受け入れられたリスクである場合、[誤構成をミュート][13]して、無期限に設定することも可能です。

You can also [create a Jira issue][15] and assign it to a team, use Terraform remediation to generate a pull request in GitHub with code changes that fix the underlying misconfiguration, and leverage [Workflow Automation][14] to create automated workflows (with or without human involvement).

{{< img src="security/cspm/misconfigurations_explorer.png" alt="CSM Misconfigurations Explorer page" width="100%">}}

## 詳細はこちら

{{< learning-center-callout header="Try Detect, Prioritize, and Remediate Cloud Security Risks with Datadog CSM in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/csm-misconfigurations">}}
  The Datadog Learning Center is full of hands-on courses to help you learn about this topic. Enroll at no cost to learn how to secure your cloud environments with CSM misconfigurations.
{{< /learning-center-callout >}}

{{< whatsnext >}}
  {{< nextlink href="/security/cloud_security_management/setup">}}Complete setup and configuration{{< /nextlink >}}
  {{< nextlink href="/getting_started/cloud_security_management">}}Getting Started with Cloud Security Management{{< /nextlink >}}
  {{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}Datadog role permissions for CSM Misconfigurations{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-cloud">}}Out-of-the-box cloud detection rules for CSM Misconfigurations{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-infra">}}Out-of-the-box infrastructure detection rules for CSM Misconfigurations{{< /nextlink >}}
  {{< nextlink href="/security/cloud_security_management/misconfigurations/findings">}} Learn more about misconfigurations{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}} Monitor the security and compliance posture of your Azure environment{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/">}} Improve the compliance and security posture of your Google Cloud environment{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/csm
[2]: https://app.datadoghq.com/security/compliance
[3]: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[4]: /security/default_rules/#cat-posture-management-cloud
[5]: /security/cloud_security_management/misconfigurations/frameworks_and_benchmarks#view-your-compliance-posture
[6]: /security/cloud_security_management/misconfigurations/custom_rules
[7]: /security/notifications/
[8]: /security/notifications/#notification-channels
[9]: /security/notifications/#detection-rule-notifications
[10]: /security/cloud_security_management/misconfigurations/findings
[11]: /security/default_rules/#cat-posture-management-infra
[12]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
[13]: /security/cloud_security_management/mute_issues
[14]: /security/cloud_security_management/review_remediate/workflows/
[15]: /security/cloud_security_management/review_remediate/jira?tab=csmmisconfigurations