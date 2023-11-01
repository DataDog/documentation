---
algolia:
  tags:
  - 受信トレイ
aliases:
- /ja/security_platform/cloud_security_management/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Security%20%26%20Compliance
  tag: リリースノート
  text: Datadog セキュリティコンプライアンスの新機能を見る
- link: /security/misconfigurations/setup
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
kind: documentation
title: Cloud Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では Cloud Security Management はサポートされていません。</div>
{{< /site-region >}}

Datadog Cloud Security Management (CSM) は、クラウドインフラストラクチャー全体にわたるリアルタイムの脅威検出と継続的な構成監査を提供し、これらすべてを統一されたビューで表示することでシームレスなコラボレーションと迅速な対応を実現します。観測可能性データにより、セキュリティチームは、攻撃フローを完全にトレースすることで脅威の影響を判断し、脆弱性がトリガーされたリソース所有者を特定することができます。

CSM は、Datadog Agent とプラットフォーム全体のクラウドインテグレーションを活用し、以下を備えています。

- [**Threats**][1]: 環境全体のファイル、ネットワーク、プロセスのアクティビティを監視し、インフラストラクチャーへの脅威をリアルタイムで検出します。
- [**Misconfigurations**][2]: 本番環境のセキュリティ衛生およびコンプライアンスポスチャを追跡し、監査証拠の収集を自動化し、攻撃に対する脆弱性を残す誤構成を修正することができます。
- [**Identity Risks**][8]: 組織の AWS IAM リスクを詳細に視覚化し、アイデンティティリスクの継続的な検出と解決を可能にします。
- [**Vulnerabilities**][9]: インフラストラクチャーの観測可能性を活用し、組織のコンテナやホストの脆弱性を検出、優先順位付け、管理します。

{{< img src="security/csm/csm_overview.png" alt="Datadog の Cloud Security Management" width="100%">}}

## 重要なセキュリティ問題の優先順位付けと修正

[CSM 概要][4] の **Security Inbox** には、早急な対応が必要な優先度の高いセキュリティ問題のリストが表示されます。セキュリティ問題とは、他のセキュリティ検出とリソース属性を統合したものです (一般にアクセス可能である、特権ロールにアタッチされている、本番環境に存在するなど)。

セキュリティ問題の優先順位は、以下の基準に基づいています。

- 重大度の高い問題から先にリストアップされる
- 問題に脅威がアタッチされているかどうか
- 関連リスクの数 (一般アクセス、本番環境、誤構成、脆弱性)
- 影響を受けるリソースの数
- 発見日 (新しいものから先にリストアップされる)

セキュリティ問題を解決することで、組織のセキュリティを大幅に向上させることができます。**Security Inbox** を使用して、根本的な問題を修正するか、問題をミュートすることによって、解決すべきセキュリティ問題の優先順位を決定します。

{{< img src="security/csm/security_inbox.png" alt="CSM 概要の Security Inbox には、修正すべき優先される問題が表示されます" width="100%">}}

## 組織の健全性の追跡

[CSM Misconfigurations][2] で利用可能な[セキュリティポスチャスコア][5]は、組織全体の健全性を追跡するのに役立ちます。このスコアは、すぐに使えるアクティブなクラウドとインフラストラクチャーのコンプライアンスルールをすべて満たしている環境の割合を示します。

誤構成の修正によって、根本的な問題を解決するか、または誤構成をミュートすることで、組織のスコアを向上させます。

{{< img src="security/csm/health_scores.png" alt="CSM 概要ページに表示されるポスチャスコアは、組織の全体的な健全性を追跡します" width="100%">}}

## 問題の確認と修正

[Issues ページ][7]を使用して、組織のセキュリティ検出を確認し、修正します。ガイドラインや修正ステップなど、検出に関する詳細情報を表示します。環境で脅威が検出されると、[リアルタイムで通知を送信][6]し、タグを使用して影響を受けるリソースの所有者を特定します。

{{< img src="security/cws/threats_page.png" alt="CSM Threats ページ" width="100%">}}

## ウィークリーダイジェストレポートのサブスクライブ

過去 1 週間の Cloud Security Management アクティビティについて、直近 7 日間で発見された重要な新規セキュリティ問題を含むウィークリーサマリーを受け取ります。ウィークリーダイジェストレポートのサブスクリプションは、ユーザー単位で管理されます。[ウィークリーダイジェストレポートにサブスクライブする][11]には、`security_monitoring_signals_read` 権限が必要です。

## 次のステップ

CSM を開始するには、Datadog の [**Security** > **Setup**][3] セクションに移動し、CSM のセットアップと構成方法に関する詳細な手順を参照してください。詳しくは、[Cloud Security Management の設定][10]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/threats/
[2]: /ja/security/misconfigurations/
[3]: https://app.datadoghq.com/security/configuration
[4]: https://app.datadoghq.com/security/csm
[5]: /ja/glossary/#posture-score
[6]: /ja/security/notifications/
[7]: https://app.datadoghq.com/security?product=cws
[8]: /ja/security/identity_risks/
[9]: /ja/security/infrastructure_vulnerabilities/
[10]: /ja/security/cloud_security_management/setup/
[11]: https://app.datadoghq.com/security/configuration/reports