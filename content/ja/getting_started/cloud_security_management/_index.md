---
further_reading:
- link: /security/cloud_security_management/
  tag: Documentation
  text: クラウド セキュリティ マネジメント
- link: /security/cspm/custom_rules/schema/
  tag: Documentation
  text: CSM Misconfigurations クラウドリソーススキーマ
- link: https://www.datadoghq.com/blog/automate-end-to-end-processes-with-datadog-workflows/
  tag: ブログ
  text: Datadog Workflows でエンドツーエンドプロセスを自動化する
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

1. [Datadog Agent (バージョン 7.44 以上)][4] をインストールします。
2. クラウドリソースとインフラストラクチャーに対して、CSM を有効にします。
    - **CSM Threats**: [Kubernetes][5]、[Docker][6]、[ホストベース][7]のインストール。
    - **CSM Misconfigurations**: [AWS][10]、[Azure][11]、[GCP][12]、[Kubernetes][8]、[Docker][9] の手順。
3. [CSM ホームページ][13]をチェックして、組織のリスクと脅威の概要を把握します。
4. [すぐに使える 500 以上の Threats と Misconfigurations の検出ルール][14]を確認します。
5. [セキュリティシグナル][15]を探り、[CSM Misconfigurations の発見][16]を確認します。
6. [通知ルール][17]を設定し、Slack、Jira、メールなどを使ってアラートを受け取ります。

## フェーズ 2: カスタマイズ

1. [CSM Threats 抑制ルール][18]を設定し、ノイズを低減します。
2. [CSM Misconfigurations][19] と [CSM Threats][20] のカスタム検出ルールを作成します。

## フェーズ 3: レポートとダッシュボード

1. [コンプライアンスレポート][21]を確認することで、組織の姿勢を評価します。
2. すぐに使えるダッシュボードや、[独自に作成][22]したダッシュボードを使って、調査、報告、監視を迅速に行うことができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_security_management/
[2]: /ja/security/cspm/
[3]: /ja/security/cloud_workload_security/
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: /ja/security/cloud_workload_security/setup/?tab=kubernetes
[6]: /ja/security/cloud_workload_security/setup/?tab=docker
[7]: /ja/security/cloud_workload_security/setup/?tab=hostothers
[8]: /ja/security/cspm/setup?tab=kubernetes
[9]: /ja/security/cspm/setup?tab=docker
[10]: /ja/security/cspm/setup?tab=aws
[11]: /ja/security/cspm/setup?tab=azure
[12]: /ja/security/cspm/setup?tab=gcp
[13]: https://app.datadoghq.com/security/csm
[14]: /ja/security/default_rules/#cat-cloud-security-management
[15]: /ja/security/cspm/signals_explorer/
[16]: /ja/security/cspm/findings/
[17]: https://app.datadoghq.com/security/configuration/notification-rules
[18]: /ja/security/cloud_security_management/guide/tuning-rules/
[19]: /ja/security/cspm/custom_rules
[20]: /ja/security/cloud_workload_security/agent_expressions
[21]: /ja/security/cspm/frameworks_and_benchmarks
[22]: /ja/dashboards/#overview