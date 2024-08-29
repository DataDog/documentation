---
further_reading:
- link: /security/cloud_security_management/
  tag: Documentation
  text: クラウド セキュリティ マネジメント
- link: /infrastructure/resource_catalog/schema/
  tag: Documentation
  text: Cloud Resources Schema リファレンス
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: ブログ
  text: Datadog Workflows でエンドツーエンドプロセスを自動化する
- link: https://www.datadoghq.com/blog/csm-at-datadog/
  tag: ブログ
  text: Datadog CSM を使用してクラウドインフラストラクチャーのセキュリティポスチャを改善する方法
- link: https://www.datadoghq.com/blog/detecting-leaked-credentials/
  tag: ブログ
  text: 漏洩した Datadog 資格情報の検出とユーザーへの通知方法
- link: https://www.datadoghq.com/blog/security-posture-csm/
  tag: ブログ
  text: Cloud Security Management を使用してセキュリティポスチャの変更を報告する
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: セキュリティと脅威検出を高めるインタラクティブなセッションに参加できます
- link: https://securitylabs.datadoghq.com/
  tag: Security Labs
  text: Datadog のセキュリティリサーチ、レポート、ヒント、ビデオ
title: Cloud Security Management の概要
---

## 概要

[Datadog Cloud Security Management][1] (CSM) は、クラウドインフラストラクチャー全体にわたって、リアルタイムの脅威検出と継続的な構成監査を提供します。観測可能性データを活用した CSM には、[Misconfigurations][2] と [Threats][3] が含まれています。

このガイドでは、CSM の導入と運用のためのベストプラクティスを説明します。

## フェーズ 1: デプロイメント

1. [Datadog Agent (バージョン 7.46 以上)][4] をインストールします。
2. [クラウドリソースとインフラストラクチャーに対して、CSM を有効にします][5]。
    - **CSM Threats**: Kubernetes、Docker、ホストベースのインストール。
    - **CSM Misconfigurations**: AWS、Azure、GCP、Kubernetes、Docker の手順。
    - **CSM Identity Risks**: AWS リソース収集と Cloudtrail ログ転送を有効にします。
    - **CSM Vulnerabilities**: Kubernetes、ECS EC2 インスタンス、ホストベースのインストール向けのコンテナイメージスキャンおよびホストスキャンの手順。
3. [CSM ホームページ][13]をチェックして、組織のリスクと脅威の概要を把握します。
4. [すぐに使える 500 以上の Threats と Misconfigurations の検出ルール][14]を確認します。
5. [セキュリティシグナル][15]を探り、[CSM Misconfigurations の発見][16]を確認します。
6. [Identity Risks][29] ページで、[アイデンティティのリスク][28]を見直し、是正します。
7. コンテナの脆弱性は [Container Images][25] ページで、脆弱性の統合リストは [Infrastructure Vulnerability][30] ページで確認してください。
8. [通知ルール][17]を設定し、Slack、Jira、メールなどを使ってアラートを受け取ります。

## フェーズ 2: カスタマイズ

1. [CSM Threats 抑制ルール][18]を設定し、ノイズを低減します。
2. [CSM Misconfigurations][19] と [CSM Threats][20] のカスタム検出ルールを作成します。

## フェーズ 3: レポートとダッシュボード

1. [コンプライアンスレポート][21]を確認することで、組織の姿勢を評価します。
2. すぐに使えるダッシュボードや、[独自に作成][22]したダッシュボードを使って、調査、報告、監視を迅速に行うことができます。
3. 毎週の[セキュリティダイジェスト][31]レポートを購読して、過去 7 日間に発見された最も重要な新しいセキュリティ問題の調査と対処を開始してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/
[2]: /ja/security/cloud_security_management/misconfigurations/
[3]: /ja/security/threats/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /ja/security/cloud_security_management/setup
[13]: https://app.datadoghq.com/security/csm
[14]: /ja/security/default_rules/#cat-cloud-security-management
[15]: /ja/security/cloud_security_management/misconfigurations/signals_explorer/
[16]: /ja/security/cloud_security_management/misconfigurations/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /ja/security/cloud_security_management/guide/tuning-rules/
[19]: /ja/security/cloud_security_management/misconfigurations/custom_rules
[20]: /ja/security/threats/agent_expressions
[21]: /ja/security/cloud_security_management/misconfigurations/frameworks_and_benchmarks
[22]: /ja/dashboards/#overview
[25]: https://app.datadoghq.com/containers/images
[26]: /ja/integrations/amazon_web_services/?tab=roledelegation#cloud-security-posture-management
[27]: /ja/integrations/amazon_cloudtrail/#send-logs-to-datadog
[28]: /ja/security/cloud_security_management/identity_risks/
[29]: https://app.datadoghq.com/security/identities
[30]: https://app.datadoghq.com/security/infra-vulnerability
[31]: https://app.datadoghq.com/security/configuration/reports
