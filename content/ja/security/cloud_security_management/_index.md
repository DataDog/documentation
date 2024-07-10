---
algolia:
  tags:
  - 受信トレイ
aliases:
- /ja/security_platform/cloud_security_management/
cascade:
  algolia:
    subcategory: 検索構文
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
- link: https://www.datadoghq.com/blog/cloud-security-study-learnings/
  tag: ブログ
  text: State of Cloud Security 調査から得られたキーポイント
title: Cloud Security Management
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、Cloud Security Management Misconfigurations はサポートされていません。</div>
{{< /site-region >}}

Datadog Cloud Security Management (CSM) は、クラウドインフラストラクチャー全体にわたるリアルタイムの脅威検出と継続的な構成監査を、シームレスなコラボレーションと迅速な修復のための統合ビューで実現します。観測可能性データを活用することで、セキュリティチームは、攻撃フロー全体をトレースして脅威の影響を特定し、脆弱性がトリガーされたリソース所有者を特定することができます。

CSM は、Datadog Agent とプラットフォーム全体のクラウドインテグレーションを活用し、次の機能を備えています。

- [**Threats**][1]: 環境全体にわたるファイル、ネットワーク、プロセスのアクティビティを監視し、インフラストラクチャーに対するリアルタイムの脅威を検出します。
- [**Misconfigurations**][2]: 本番環境のセキュリティ衛生とコンプライアンスポスチャを追跡し、監査証拠の収集を自動化し、攻撃に対して脆弱な誤構成を修正することを可能にします。
- [**Identity Risks**][8]: 組織の AWS IAM リスクに対する詳細な可視性を提供し、継続的にアイデンティティリスクを検出して解決できるようにします。
- [**Vulnerabilities**][9]: インフラストラクチャーの観測可能性を活用して、組織のコンテナとホストの脆弱性を検出、優先順位付け、管理します。

{{< img src="security/csm/csm_overview_2.png" alt="Datadog の Cloud Security Management" width="100%">}}

## 組織の健全性の追跡

[CSM Misconfigurations][2] で利用可能な[セキュリティポスチャスコア][5]は、組織の全体的な健全性を追跡するのに役立ちます。このスコアは、すぐに使えるアクティブなクラウドおよびインフラストラクチャーコンプライアンスルールをすべて満たしている環境の割合を示します。

根本的な問題を解決するか、誤構成をミュートすることによって誤構成を修正し、組織のスコアを向上させます。

{{< img src="security/csm/health_scores.png" alt="CSM の概要ページに表示されるポスチャスコアは、組織の全体的な健全性を追跡します" width="100%">}}

## 問題の調査と対応

[Explorers][7] を利用して、組織のセキュリティ検出をレビューし、対応を行います。ガイドラインや修復ステップなど、検出に関する詳細情報を確認できます。環境で脅威が検出されると、[リアルタイム通知を送信][6]し、タグを使用して影響を受けるリソースの所有者を特定します。

{{< img src="security/csm/explorers_page.png" alt="CSM Explorers ページ" width="100%">}}

## リソースの調査

<div class="alert alert-info">Resource Catalog はベータ版です。</div>

[Resource Catalog][12] を使用すると、環境内のホストやリソースで報告された特定の誤構成や脅威を確認できます。詳細については、[Resource Catalog][13] を参照してください。

{{< img src="infrastructure/resource_catalog/resource_catalog_infra.png" alt="カテゴリーと誤構成ごとにグループ化されたホストとクラウドのリソースを表示する Resource Catalog マップビュー。" style="width:100%;" >}}

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
[7]: https://app.datadoghq.com/security/compliance
[8]: /ja/security/identity_risks/
[9]: /ja/security/vulnerabilities/
[10]: /ja/security/cloud_security_management/setup/
[11]: https://app.datadoghq.com/security/configuration/reports
[12]: https://app.datadoghq.com/infrastructure/catalog
[13]: /ja/infrastructure/resource_catalog