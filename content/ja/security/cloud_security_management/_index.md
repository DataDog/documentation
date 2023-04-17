---
aliases:
- /ja/security_platform/cloud_security_management/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: リリースノート
  text: Datadog セキュリティコンプライアンスの新機能を見る
- link: /security/cspm/setup
  tag: ドキュメント
  text: Cloud Security Posture Management で構成ミスの追跡を開始
- link: /security/cloud_workload_security/setup
  tag: ドキュメント
  text: Cloud Workload Security でカーネルレベルの脅威を解明する
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: GitHub
  text: Stratus Red Team で AWS の脅威検出を高度化する
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: GitHub
  text: Kubernetes アプリケーションを保護するためのベストプラクティス
- link: https://www.datadoghq.com/blog/security-context-with-datadog-cloud-security-management/
  tag: GitHub
  text: Datadog Cloud Security Management による観測可能性データへのセキュリティコンテキストの追加
- link: https://www.datadoghq.com/blog/security-labs-ruleset-launch/
  tag: GitHub
  text: Datadog Security Labs Ruleset で一般的なクラウドセキュリティリスクを修正する
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: GitHub
  text: クラウドネイティブ環境におけるアプリケーションのセキュリティ対策のベストプラクティス
kind: documentation
title: Cloud Security Management
---

## 概要

Datadog Cloud Security Management は、クラウドインフラクチャー全体でリアルタイムの脅威検出と継続的な構成監査を実現し、統一ビューでシームレスなコラボレーションと迅速な修復を可能にします。 観測可能性データにより、セキュリティチームは、攻撃フローを完全にトレースすることで脅威の影響を迅速に判断し、脆弱性がトリガーされたリソース所有者を特定することができます。エンジニアは、既存のワークフローにセキュリティメトリクスを組み込むことで、セキュリティリスクを積極的に監視することができるようになります。

Cloud Security Management には、[Cloud Security Posture Management (CSPM)](#cloud-security-posture-management)、および[クラウドワークロードセキュリティ (CWS)](#cloud-workload-security) を含んでいます。

{{< img src="security/csm_overview.png" alt="Datadog の Cloud Security Management" width="100%">}}


## クラウドセキュリティポスチャ管理

[Cloud Security Posture Management (CSPM)][1] は、本番環境のセキュリティ衛生とコンプライアンス状況を追跡し、監査証拠の収集を自動化し、組織が攻撃に対して脆弱な状態にある構成ミスを検出することができます。インフラストラクチャー全体のセキュリティポスチャーのスコアを確認し、各スコアを該当するベンチマークまたはフレームワークの基準にまで遡ることができます。

{{< img src="security/cspm_overview.png" alt="Datadog の Cloud Security Posture Management スコア" width="100%">}}

## クラウドワークロードセキュリティ

[Cloud Workload Security (CWS)][2] は、環境全体のファイルやプロセスの活動を監視し、AWS EC2 インスタンスなどのインフラストラクチャーや Kubernetes クラスターなどのワークロードに対する脅威を、カーネルレベルでリアルタイムに検出します。Cloud Workload Security は、統合された Datadog Agent を使用するため、すでに Datadog を使用して環境を監視している場合、追加のリソースをプロビジョニングする必要はありません。

{{< img src="security/cws_overview.png" alt="Datadog における Cloud Workload Security のカバレッジビュー" width="100%">}}

Datadog Security を使い始めるには、Datadog の [Setup & Configuration][3] セクションに移動し、単一構成または複数構成の詳細情報を参照するか、スタートアップセクションに従って、プラットフォームの各エリアの詳細について学びます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cspm/
[2]: /ja/security/cloud_workload_security/
[3]: https://app.datadoghq.com/security/configuration