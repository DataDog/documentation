---
aliases:
- /ja/getting_started/cloud_security_management
description: Datadog Cloud Security をデプロイし、インフラストラクチャー全体で統一された可視性を実現します。脅威検知、構成ミス、アイデンティティリスク、脆弱性を構成します。
further_reading:
- link: /security/cloud_security_management/
  tag: ドキュメント
  text: Cloud Security
- link: /infrastructure/resource_catalog/schema/
  tag: ドキュメント
  text: Cloud Resources Schema リファレンス
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: ブログ
  text: Datadog Workflows でエンドツーエンドプロセスを自動化する
- link: https://www.datadoghq.com/blog/detecting-leaked-credentials/
  tag: ブログ
  text: 漏洩した Datadog 資格情報の検出とユーザーへの通知方法
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: セキュリティと脅威検出を高めるインタラクティブなセッションに参加できます
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Datadog のセキュリティリサーチ、レポート、ヒント、ビデオ
- link: https://learn.datadoghq.com/courses/csm-misconfigurations
  tag: ラーニングセンター
  text: Cloud Security Misconfigurations を使用して、脆弱なクラウドリソースを特定し、対処します。
title: Cloud Security のはじめ方
---
## 概要 {#overview}

[Datadog Cloud Security][1] は、クラウドインフラストラクチャー全体にわたって、詳細な可視性、継続的な構成監査、アイデンティティリスク評価、脆弱性検知、リアルタイムの脅威検知を提供します。これらすべてを、シームレスなコラボレーションと迅速な対処を実現する統合プラットフォームで提供します。

Cloud Security を使用することで、セキュリティチームと DevOps チームはオブザーバビリティデータとセキュリティデータの共有コンテキストに基づいて行動し、問題の優先順位付けと対処を迅速に行うことができます。このガイドでは、チームによる Cloud Security の導入と運用をスムーズに進めるためのベストプラクティスについて説明します。

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Agentless Scanning は、選択したサイト ({{< region-param key="dd_site_name" >}}) では利用できません。</div>
{{< /site-region >}}

## フェーズ 1: デプロイメント {#phase-1-deployment}

1. [Agentless][34] および/または [Datadog Agent (バージョン 7.46 以上)][4] を使用して、[クラウドリソースとインフラストラクチャーで Cloud Security を有効にします][5]。
    - **[Threats][3]**: Kubernetes、Docker、およびホストベースのインストール。
    - **[Misconfigurations][2]**: AWS、Azure、GCP、OCI、Kubernetes、および Docker の手順。
    - **[Identity Risks][28]**: AWS リソースの収集と CloudTrail ログの転送を有効にします。
    - **[Vulnerabilities][6]**: AWS、Azure、Kubernetes、ECS EC2 インスタンス、およびホストベースのインストール向けのコンテナイメージスキャンとホストスキャンの手順。
1.  [Cloud Security のホームページ][13]を確認して、組織のリスクと脅威の概要を把握します。
1. [すぐに使える 500 以上の Threats と Misconfigurations の検出ルール][14]を確認します。
1. [Cloud Security Misconfigurations の検出結果][16]を確認します。
1. [{{< ui >}}Identity Risks{{< /ui >}}][29] ページでアイデンティティリスクを確認し、対処します。
1. [{{< ui >}}Container Images{{< /ui >}}][25] ページでコンテナの脆弱性を確認し、[{{< ui >}}Infrastructure Vulnerability{{< /ui >}}][30] ページで統合された脆弱性の一覧を確認します。
1. [通知ルール][17]を設定し、Slack、Jira、メールなどを使ってアラートを受け取ります。

## フェーズ 2: カスタマイズ {#phase-2-customization}

1. [Workload Protection の抑制ルール][18]を設定して、ノイズを削減します。
2. [Cloud Security Misconfigurations][19] および [Workload Protection][20] のカスタム検知ルールを作成します。

## フェーズ 3: レポートとダッシュボード {#phase-3-reports-and-dashboards}

1. [コンプライアンスレポート][21]を確認することで、組織の姿勢を評価します。
2. すぐに使えるダッシュボードや、[独自に作成][22]したダッシュボードを使って、調査、報告、監視を迅速に行うことができます。
3. 毎週の[セキュリティダイジェスト][31]レポートを購読して、過去 7 日間に発見された最も重要な新しいセキュリティ問題の調査と対処を開始してください。

## Cloud Security を無効にする {#disable-cloud-security}

Cloud Security を無効にする方法については、以下を参照してください。

- [Cloud Security Vulnerabilities を無効にする][32]
- [Workload Protection を無効にする][33]

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/
[2]: /ja/security/cloud_security_management/misconfigurations/
[3]: /ja/security/threats/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /ja/security/cloud_security_management/setup
[6]: /ja/security/cloud_security_management/vulnerabilities/
[13]: https://app.datadoghq.com/security/csm
[14]: /ja/security/default_rules/#cat-cloud-security-management
[16]: /ja/security/cloud_security_management/misconfigurations/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /ja/security/cloud_security_management/guide/tuning-rules/
[19]: /ja/security/cloud_security_management/misconfigurations/custom_rules
[20]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules/#create-a-custom-detection-rule
[21]: /ja/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[22]: /ja/dashboards/#overview
[25]: https://app.datadoghq.com/containers/images
[26]: /ja/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[27]: /ja/integrations/amazon_cloudtrail/#send-logs-to-datadog
[28]: /ja/security/cloud_security_management/identity_risks/
[29]: https://app.datadoghq.com/security/identities
[30]: https://app.datadoghq.com/security/infra-vulnerability
[31]: https://app.datadoghq.com/security/configuration/reports
[32]: /ja/security/cloud_security_management/troubleshooting/vulnerabilities/#disable-cloud-security-vulnerabilities
[33]: /ja/security/workload_protection/troubleshooting/threats/#disable-csm-threats
[34]: /ja/security/cloud_security_management/setup/cloud_integrations