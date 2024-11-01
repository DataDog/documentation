---
algolia:
  tags:
  - cspm
aliases:
- /ja/security_platform/cspm/
- /ja/security/cspm/#glossary
- /ja/security/cspm/
- /ja/security/misconfigurations/
title: Cloud Security Management Misconfigurations
---

Cloud Security Management Misconfigurations (CSM Misconfigurations) は、お使いのクラウドリソースにおける現在および過去のセキュリティポスチャ (セキュリティ体制) のスムーズな評価と視覚化、監査エビデンス収集の自動化、攻撃に対する組織の脆弱性の原因となる誤構成の修復などをサポートします。誤構成に起因するセキュリティ上の弱点を継続的に洗い出すことで、業界標準への準拠を確保しつつ、リスクを軽減することができます。

## クラウドリソース全体の誤構成の検出

Datadog の[すぐに使えるコンプライアンスルール](#manage-out-of-the-box-and-custom-compliance-rules)を使用して、すべてのクラウドリソースで誤構成を検出、優先順位付け、修正することにより、セキュリティ体制を強化し、継続的にコンプライアンスを実現します。

[Overview ページ][1]では、セキュリティ状況の概要を見ることができます。[Misconfigurations Explorer][2] で、誤構成の詳細や過去の構成を分析することができます。

CSM Misconfigurations のリソース評価は 15 分〜4 時間の間で行われます (タイプにより異なる)。Datadog はスキャンが終了するとすぐに新しい誤構成を生成し、過去 15 か月の完全な履歴を保存するため、調査や監査の際に利用できます。

{{< img src="security/csm/csm_overview_2.png" alt="Cloud Security Management 概要の Security Inbox には、優先的に修復すべきセキュリティ問題のリストが表示されます" width="100%">}}

## 業界のフレームワークやベンチマークへの準拠を維持する

CSM Misconfigurations には、セキュリティ専門家チームによって管理された 1,000 以上のすぐに使えるコンプライアンスルールが付属しています。これらのルールは、PCI や SOC2 などのコンプライアンス基準や業界ベンチマークに含まれる制御や要件に対応しています。

[コンプライアンスレポートを表示][3]すると、コンプライアンスフレームワークの各コントロールに対するコンプライアンスの遵守状況を確認できます。レポートには、最も誤構成の不合格が多いリソース、誤構成の合格・不合格のリソース数の詳細な内訳、重大度の高いルール違反の上位 3 つなどの詳細が記載されています。

{{< img src="security/cspm/frameworks_and_benchmarks/compliance_reports_2.png" alt="CSM Misconfigurations のコンプライアンスフレームワーク" width="100%">}}

## すぐに使えるカスタムコンプライアンスルールの管理

[すぐに使えるコンプライアンスルール][4]は、最も重要なリスクを明らかにしてくれるため、すぐに対処することができます。Datadog は、常に新しいデフォルトルールを開発しており、これらは自動的にアカウントにインポートされます。各ルールがどのように環境をスキャンするかを定義することで[ルールをカスタマイズ][5]し、[カスタムルールを作成][6]し、[不合格の誤構成に対するリアルタイム通知を設定](#set-up-real-time-notifications)することが可能です。

{{< img src="security/cspm/compliance_rules.png" alt="CSM Misconfigurations コンプライアンスルール" width="100%">}}

## リアルタイム通知の設定

環境内で新たな誤構成が検出されると[リアルタイムで通知を送信][7]し、チームはリスクを軽減するためのアクションを起こすことができます。通知は、[Slack、メール、PagerDuty、Webhook など][8]に送ることができます。

テンプレート変数と Markdown を使用して、[通知メッセージをカスタマイズ][9]できます。既存の通知ルールの編集、無効化、削除、または新しいルールの作成、重大度やルールタイプに基づいた通知トリガー時のカスタムロジックの定義が可能です。

## 誤構成の確認と修正

[Misconfigurations Explorer][10] を使用して詳細を調査します。構成、リソースに適用されたコンプライアンスルール、リソースの所有者や環境内の場所に関する追加のコンテキストを提供するタグなど、リソースの詳細情報を表示します。誤構成がビジネスのユースケースに合致しない場合、または受け入れられたリスクである場合、[誤構成をミュート][13]して、無期限に設定することも可能です。

また、[Jira の課題を作成][15]してチームに割り当てたり、Terraform の修正を使用して基盤となる誤構成を修正するコード変更を含むプルリクエストを GitHub で生成したり、[Workflow Automation][14] を活用して (人間の関与の有無にかかわらず) 自動化されたワークフローを作成したりできます。

{{< img src="security/cspm/misconfigurations_explorer.png" alt="CSM Misconfigurations Explorer ページ" width="100%">}}

## はじめに

{{< learning-center-callout header="Learning Center で Datadog CSM を使用してクラウドセキュリティリスクを検出、優先順位付け、および修正する方法を試す" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/csm-misconfigurations">}}
Datadog Learning Center には、このトピックについて学ぶためのハンズオンコースが豊富に用意されています。無料で登録して、CSM Misconfigurations を使用してクラウド環境を保護する方法を学びましょう。
{{< /learning-center-callout >}}

{{< whatsnext >}}
{{< nextlink href="/security/cloud_security_management/setup">}}セットアップと構成を完了する{{< /nextlink >}}
{{< nextlink href="/getting_started/cloud_security_management">}}Cloud Security Management の開始{{< /nextlink >}}
{{< nextlink href="/account_management/rbac/permissions/#cloud-security-platform">}}CSM Misconfigurations の Datadog ロール権限{{< /nextlink >}}
{{< nextlink href="/security/default_rules/#cat-posture-management-cloud">}}CSM Misconfigurations のすぐに使えるクラウド検出ルール{{< /nextlink >}}
{{< nextlink href="/security/default_rules/#cat-posture-management-infra">}}CSM Misconfigurations のすぐに使えるインフラストラクチャー検出ルール{{< /nextlink >}}
{{< nextlink href="/security/cloud_security_management/misconfigurations/findings">}}誤構成について詳しく知る{{< /nextlink >}}
{{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}}Azure 環境のセキュリティとコンプライアンスの状態を監視する{{< /nextlink >}}
{{< nextlink href="https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/">}}Google Cloud 環境のコンプライアンスとセキュリティの状態を改善する{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/csm
[2]: https://app.datadoghq.com/security/compliance
[3]: /ja/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[4]: /ja/security/default_rules/#cat-posture-management-cloud
[5]: /ja/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks#view-your-compliance-posture
[6]: /ja/security/cloud_security_management/misconfigurations/custom_rules
[7]: /ja/security/notifications/
[8]: /ja/security/notifications/#notification-channels
[9]: /ja/security/notifications/#detection-rule-notifications
[10]: /ja/security/cloud_security_management/misconfigurations/findings
[11]: /ja/security/default_rules/#cat-posture-management-infra
[12]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
[13]: /ja/security/cloud_security_management/mute_issues
[14]: /ja/security/cloud_security_management/review_remediate/workflows/
[15]: /ja/security/cloud_security_management/review_remediate/jira?tab=csmmisconfigurations