---
aliases:
- /ja/security_platform/cloud_workload_security/getting_started
- /ja/security/cloud_workload_security/getting_started
- /ja/security/cloud_workload_security/setup
- /ja/security/threats/setup
- /ja/security_platform/cspm/getting_started
- /ja/security/cspm/getting_started
- /ja/security/cspm/setup
- /ja/security/misconfigurations/setup
- /ja/security/vulnerabilities/setup
- /ja/security/infrastructure_vulnerabilities/setup/
- /ja/security/cloud_security_management/setup/csm_enterprise
- /ja/security/cloud_security_management/setup/csm_cloud_workload_security
- /ja/security/cloud_security_management/setup/csm_pro
further_reading:
- link: /security/cloud_security_management/setup/supported_deployment_types
  tag: ドキュメント
  text: サポートされるデプロイメントタイプ
- link: /security/guide/aws_fargate_config_guide
  tag: ドキュメント
  text: Datadog Security を使用するための AWS Fargate 構成ガイド
- link: /security/cloud_security_management/guide/agent_variables/
  tag: ガイド
  text: Cloud Security Management Agent 変数
title: Cloud Security Management の設定
---

## 概要

Cloud Security Management (CSM) を使い始めるには、以下を確認してください。

- [概要](#overview)
- [エージェントレススキャニングを有効化する](#enable-agentless-scanning)
- [追加のカバレッジのためにエージェントをデプロイする](#deploy-the-agent-for-additional-coverage)
- [追加機能を有効化する](#enable-additional-features)
  - [AWS CloudTrail ログ](#aws-cloudtrail-logs)
  - [IaC スキャニング](#iac-scanning)
  - [IaC リメディエーション](#iac-remediation)
  - [クラウドインテグレーション経由でのデプロイ](#deploy-via-cloud-integrations)
- [CSM を無効化する](#disable-csm)
- [参考文献](#further-reading)

## Agent レススキャンの有効化

最も簡単に Cloud Security Management を始める方法は、[エージェントレススキャニングの有効化][1]です。エージェントレススキャニングを使用すると、Datadog Agent をインストールすることなく、AWS ホスト、稼働中のコンテナ、Lambda 関数、および稼働中の Amazon Machine Images (AMI) 内に存在する脆弱性を可視化できます。

エージェントレススキャニングの詳細については、[Cloud Security Management Agentless Scanning][2] を参照してください。

## 追加のカバレッジのために Agent をデプロイする

より広範なカバレッジと追加機能を得るには、ホストに Datadog Agent をデプロイしてください。以下の表では、Agent ベースのデプロイによって提供される機能拡張を示しています。詳細については、[Agent での Cloud Security Management のセットアップ][3]を参照してください。

<table>
<thead>
<tr>
<th>機能</th>
<th>エージェントレス</th>
<th>エージェントレス + Agent ベースのデプロイ</th>
<th>Agent ベースのデプロイ</th>
</tr>
</thead>
<tr>
<td><strong><a href="/security/cloud_security_management/identity_risks">CSM Identity Risks</a></strong></td>
<td>{{< X >}}</td>
<td>{{< X >}}</td>
<td></td>
</tr>
<tr>
<td><strong><a href="/security/cloud_security_management/misconfigurations">CSM Misconfigurations</a></strong></td>
<td>{{< X >}}</td>
<td>{{< X >}}</td>
<td>{{< X >}}</td>
</tr>
<tr>
<td style="padding-left: 20px;"><a href="/security/default_rules/?search=host+benchmarks">ホストベンチマーク</a></td>
<td></td>
<td>{{< X >}}</td>
<td>{{< X >}}</td>
</tr>
<tr>
<td><strong><a href="/security/cloud_security_management/vulnerabilities">CSM Vulnerabilities</a></strong></td>
<td>{{< X >}}</td>
<td>{{< X >}}</td>
<td>{{< X >}}</td>
</tr>
<tr>
<td style="padding-left: 20px;">脆弱性の優先順位付け</td>
<td>{{< X >}}</td>
<td>{{< X >}}<br />ランタイムコンテキストを含む</td>
<td>{{< X >}}<br />ランタイムコンテキストを含む</td>
</tr>
<tr>
<td style="padding-left: 20px;">脆弱性の更新頻度</td>
<td>12 時間</td>
<td>リアルタイム</td>
<td>リアルタイム</td>
</tr>
<tr>
<td><strong><a href="/security/threats">CSM Threats</a></strong></td>
<td></td>
<td>{{< X >}}</td>
<td>{{< X >}}</td>
</tr>
<tr>
<td style="padding-left: 20px;">Threat detection</td>
<td></td>
<td>{{< X >}}</td>
<td>{{< X >}}</td>
</tr>
<tr>
<td><strong><a href="/security/security_inbox">Security Inbox</a></strong></td>
<td>{{< X >}}</td>
<td>{{< X >}}<br />より正確なインサイト付き</td>
<td>{{< X >}}<br />より正確なインサイト付き</td>
</tr>
</table>

## 追加機能を有効にする

### AWS CloudTrail ログ

AWS CloudTrail ログを活用して、[CSM Identity Risks][6] の利点を最大化しましょう。クラウドリソースの使用状況をより深く把握し、プロビジョニングされた権限と実際に使用されている権限の差が大きいユーザーやロールを特定できます。詳細については、[Cloud Security Management 向けの AWS CloudTrail ログの設定][4]をご覧ください。

### IaC スキャニング

Infrastructure as Code (IaC) スキャニングを GitHub と統合して、Terraform で定義されたクラウドリソースの誤構成を検出します。詳細については、[Cloud Security Management 向けの IaC スキャニングの設定][10]を参照してください。

### IaC リメディエーション

Terraform を用いた IaC リメディエーションを使うことで、GitHub 上でプルリクエストを作成し、誤構成を修正してアイデンティティリスクを軽減するコード変更を適用できます。詳細については、[Cloud Security Management 向けの IaC リメディエーションの設定][5]を参照してください。

### クラウドインテグレーション経由でのデプロイ

AWS、Azure、GCP 向けのリソーススキャニングを有効にすると、コンプライアンスセキュリティのカバレッジを監視し、IAM ベースの攻撃からクラウドインフラストラクチャーを保護できます。詳細については、[クラウドインテグレーションを介した Cloud Security Management のデプロイ][7]を参照してください。

## CSM の無効化

CSM の無効化については、以下のドキュメントを参照してください。

- [CSM Vulnerabilities を無効化する][8]
- [CSM Threats を無効化する][9]

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/setup/agentless_scanning
[2]: /ja/security/cloud_security_management/agentless_scanning
[3]: /ja/security/cloud_security_management/setup/agent
[4]: /ja/security/cloud_security_management/setup/cloudtrail_logs
[5]: /ja/security/cloud_security_management/setup/iac_remediation
[6]: /ja/security/cloud_security_management/identity_risks
[7]: /ja/security/cloud_security_management/setup/cloud_accounts
[8]: /ja/security/cloud_security_management/troubleshooting/vulnerabilities/#disable-csm-vulnerabilities
[9]: /ja/security/cloud_security_management/troubleshooting/threats/#disable-csm-threats
[10]: /ja/security/cloud_security_management/setup/iac_scanning