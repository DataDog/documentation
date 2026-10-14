---
algolia:
  tags:
  - csm
  - cloud security management
  - inbox
aliases:
- /ja/security_platform/cloud_security_management/
cascade:
  algolia:
    subcategory: Cloud Security
further_reading:
- link: /security/cloud_security_management/misconfigurations/
  tag: ドキュメント
  text: Cloud Security Misconfigurations で誤構成の追跡を開始
- link: /security/research_feed
  tag: ドキュメント
  text: Security Research Feed
- link: https://www.datadoghq.com/blog/cyber-attack-simulation-with-stratus-red-team/
  tag: ブログ
  text: Stratus Red Team で AWS の脅威検出を高度化する
- link: https://www.datadoghq.com/blog/kubernetes-security-best-practices/
  tag: ブログ
  text: Kubernetes アプリケーションを保護するためのベストプラクティス
- link: https://www.datadoghq.com/blog/workload-security-evaluator/
  tag: ブログ
  text: Datadog の Workload Security Evaluator を使用したコンテナ環境での Atomic Red Team 検出テストの実行
- link: https://www.datadoghq.com/blog/security-labs-ruleset-launch/
  tag: ブログ
  text: Datadog Security Labs Ruleset で一般的なクラウドセキュリティリスクを修正する
- link: https://www.datadoghq.com/blog/securing-cloud-native-applications/
  tag: ブログ
  text: クラウドネイティブ環境におけるアプリケーションのセキュリティ対策のベストプラクティス
- link: https://www.datadoghq.com/blog/building-security-coverage-for-cloud-environments/
  tag: ブログ
  text: クラウド環境に十分なセキュリティカバレッジを構築する
- link: https://www.datadoghq.com/blog/cloud-security-study-learnings-2024/
  tag: ブログ
  text: 2024 年版 Cloud Security 状況調査から得られた重要な学び
- link: https://www.datadoghq.com/blog/security-inbox-prioritization/
  tag: ブログ
  text: Datadog Security Inbox によるセキュリティリスクの優先順位付け方法
- link: https://www.datadoghq.com/blog/datadog-detection-as-code/
  tag: ブログ
  text: Datadog をコードとして検出に使用する方法
- link: https://www.datadoghq.com/blog/shared-responsibility-model/
  tag: ブログ
  text: '責任共有モデルを簡素化: クラウドセキュリティの義務を果たす方法'
- link: https://www.datadoghq.com/blog/detect-bedrock-misconfigurations-cloud-security
  tag: ブログ
  text: Datadog Cloud Security で Amazon Bedrock の誤構成を検出する
- link: https://www.datadoghq.com/blog/security-graph-attack-paths
  tag: ブログ
  text: Datadog Cloud Security でリソース間の露出経路をトレースする
- link: https://www.datadoghq.com/blog/datadog-cloud-security-compliance
  tag: ブログ
  text: Datadog Cloud Security でグローバルなフレームワーク全体にコンプライアンスを拡張
- link: https://www.datadoghq.com/blog/ec2-ami-risks
  tag: ブログ
  text: 'AWS AMI のセキュリティ: 誤構成されたパブリック AMI によってクラウドの攻撃対象領域がどのように拡大するか'
- link: https://www.datadoghq.com/blog/cloud-security-oci
  tag: ブログ
  text: Datadog Cloud Security で OCI リソースを保護する
title: Cloud Security
---
{{< learning-center-callout header="イネーブルメントウェビナーセッションに参加する" hide_image="true" btn_title="サインアップ" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Security">}}
  Datadog Cloud SIEM と Cloud Security が、動的なクラウドスケール環境における組織の脅威検出と調査をどのように向上させるかをご覧ください。
{{< /learning-center-callout >}}

Datadog Cloud Security は、クラウドインフラストラクチャー全体にわたって、詳細な可視性、継続的な構成監査、アイデンティティリスク評価、脆弱性検出、リアルタイムの脅威検出を提供します。これらすべてを、シームレスなコラボレーションと迅速な対処を実現する統合プラットフォームで提供します。

セキュリティチームと DevOps チームは、オブザーバビリティデータとセキュリティデータの共有コンテキストに基づいて行動し、問題の優先順位付けと対処を迅速に行えます。

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Agentless Scanning は、選択したサイト ({{< region-param key="dd_site_name" >}})。</div>
{{< /site-region >}}

Cloud Security は、Datadog Agent と Agentless の両方を活用します。組織のセキュリティのさまざまな側面を管理するために有効にできる、さまざまな機能が含まれています。

- [{{< ui >}}Misconfigurations{{< /ui >}}][2]: 本番環境のセキュリティ衛生およびコンプライアンスポスチャを追跡し、監査証拠の収集を自動化し、攻撃に対する脆弱性を残す誤構成を修正することができます。
- [{{< ui >}}Identity Risks{{< /ui >}}][8]: 組織の AWS IAM、Azure、GCP のリスクを詳細に可視化し、アイデンティティリスクを継続的に検出して解決できます。
- [{{< ui >}}Vulnerabilities{{< /ui >}}][9]: インフラストラクチャーで実行されているコンテナイメージ、ホストイメージ、およびホストの悪用可能な脆弱性を継続的に検出し、優先順位を付け、対処します。

Cloud Security には、以下を含む Datadog Security 機能へのアクセスも含まれています。
- [Detection Rules][18]
- [Notifications][6]
- [Automation Pipelines][19]
- [Security Inbox][14]
- [Audit Trail][20]
- [Security Research Feed][16]

{{< img src="security/csm/csm_overview_5.png" alt="Datadog における Cloud Security の概要" width="100%">}}

{{< partial name="security-platform/CSW-billing-note.html" >}}

## 組織の健全性を追跡 {#track-your-organizations-health}

### ホームページダッシュボードを管理 {#manage-homepage-dashboards}

Cloud Security ホームページから直接アクセスできるダッシュボードをカスタマイズできます。これには、ダッシュボードをデフォルトのホームページビューとして設定することも含まれます。ダッシュボードを使用して、対処作業の優先順位付け、レポートのスケジュール設定、セキュリティデータとオブザーバビリティデータやコストデータの並列表示、レポートビューから直接開始できるアプリやワークフローの埋め込みを行えます。

[Cloud Security ホームページ][4] の {{< ui >}}Dashboards{{< /ui >}} セクションでは、Identity Risks、Misconfigurations、または Vulnerabilities のダッシュボードに直接移動できます。既存のダッシュボードを追加したり、ダッシュボードを作成して Cloud Security ホームページのサイドバーに保持したりすることで、簡単にアクセスできるようにすることもできます。

さらに、{{< ui >}}More Options{{< /ui >}} アイコンをクリックして {{< img src="icons/kebab.png" inline="true" style="height:1em" >}} ピン留めしたダッシュボードを管理できます。これには、ダッシュボードの 1 つを Cloud Security ホームページのデフォルトビューとして設定することも含まれます。Datadog ナビゲーションバーの {{< ui >}}Cloud Security{{< /ui >}} または Cloud Security ナビゲーションバーの {{< ui >}}Summary{{< /ui >}} をクリックすると、ピン留めしたダッシュボードに直接移動できます。

詳細については、[ダッシュボード][23] を参照してください。

### セキュリティ態勢スコアを追跡 {#track-your-security-posture-score}

[Cloud Security Misconfigurations][2] で利用可能な [セキュリティ態勢スコア][5] は、組織の全体的な健全性を追跡するのに役立ちます。このスコアは、有効なすべての標準クラウドおよびインフラストラクチャーコンプライアンスルールを満たしている環境の割合を表します。

誤構成の修正によって、根本的な問題を解決するか、または誤構成をミュートすることで、組織のスコアを向上させます。

{{< img src="security/csm/health_scores.png" alt="Cloud Security 概要ページの態勢スコアは、組織の全体的な健全性を追跡します。" width="100%">}}

## 問題を確認して修正 {#explore-and-remediate-issues}

Cloud Security、Code Security、App and API Protection、および Workload Protection 全体にわたるセキュリティの検出結果を重要度順に確認するには、[Security Inbox][14] を使用してください。

詳細を確認するには、[検出結果][7] を使用して、組織の誤構成、脆弱性、アイデンティティリスクに関するセキュリティの検出結果を確認して修正します。ガイドラインや修正手順など、検出結果に関する詳細情報を表示します。[リアルタイム通知を送信][6] して、環境内で脅威が検出されたときに通知し、タグを使用して影響を受けたリソースの所有者を特定します。

{{< img src="security/csm/findings_page_2.png" alt="Cloud Security Findings ページ" width="100%">}}

## リソースを調査 {#investigate-resources}

- [Security Graph][17] を使用してクラウド環境をリレーションシップグラフとしてモデル化し、クラウドリソース間の接続を可視化してクエリを実行できるようにします。クエリを作成して、機密データを含む S3 バケットにアクセスできるパブリックアクセス可能な EC2 インスタンスなど、リソース間の特定の関係を検索し、それらのインフラストラクチャーリスクを事前に軽減できます。
  {{< img src="security/csm/security_graph.png" alt="EC2 インスタンスの例を表示する Security Graph" width="100%">}}
- [Resource Catalog][12] を使用して、環境内のホストやリソースで報告された特定の誤設定や脅威を表示します。詳細については、[Resource Catalog][13] のドキュメントを参照してください。
  {{< site-region region="gov,gov2" >}}
  <div class="alert alert-danger">Resource Catalog は、選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) ではサポートされていません。</div>
  {{< /site-region >}}
  {{< img src="infrastructure/resource_catalog/resource_catalog_infra_3.png" alt="カテゴリおよび誤構成ごとにグループ化されたホストとクラウドリソースを表示する Resource Catalog のマップビュー。" style="width:100%;" >}}
- [Cloudcraft Security Map][21] を使用して、リソースとそれに関連する誤構成、脆弱性、アイデンティティリスク、または機密データを可視化します。これらのオーバーレイの詳細については、[Cloudcraft オーバーレイ][22] のドキュメントを参照してください。

## 週次ダイジェストレポートを購読 {#subscribe-to-weekly-digest-reports}

過去 7 日間に発見された重要な新しいセキュリティ問題など、過去 1 週間の Cloud Security のアクティビティの概要を毎週受け取ります。週次ダイジェストレポートの購読は、ユーザーごとに管理されます。[週次ダイジェストレポートを購読][11] するには、`security_monitoring_signals_read` 権限が必要です。

## 新たな脅威と脆弱性について学ぶ {#learn-about-emerging-threats-and-vulnerabilities}

[Security Research Feed][15] を使用して、Datadog の Security Research チームおよび Detection Engineering チームが管理するコンテンツを通じて、最新のセキュリティ動向を把握してください。詳細については、[Security Research Feed][16] のドキュメントを参照してください。

## 次のステップ {#next-steps}

Cloud Security を開始するには、Datadog の [{{< ui >}}Cloud Security Setup{{< /ui >}}][3] ページに移動し、Cloud Security のセットアップおよび構成方法に関する詳細な手順を確認してください。詳細については、[Cloud Security の設定][10] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/workload_protection/
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
[14]: /ja/security/security_inbox
[15]: https://app.datadoghq.com/security/feed
[16]: /ja/security/research_feed
[17]: /ja/security/cloud_security_management/security_graph
[18]: /ja/security/detection_rules/
[19]: /ja/security/automation_pipelines/
[20]: /ja/security/audit_trail/
[21]: https://app.datadoghq.com/security/map
[22]: /ja/datadog_cloudcraft/overlays/#security
[23]: /ja/dashboards/