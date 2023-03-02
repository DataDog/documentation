---
aliases:
- /ja/security_platform/cspm/
kind: documentation
title: クラウドセキュリティポスチャ管理
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

Datadog Cloud Security Posture Management (CSPM) は、お使いのクラウドリソースにおける現在および過去のセキュリティポスチャ (セキュリティ体制) のスムーズな評価と視覚化、監査エビデンス収集の自動化、攻撃に対するオーガニゼーションの脆弱性の原因となるコンフィギュレーションミスの修復などをサポートします。誤構成に起因するセキュリティ上の弱点を継続的に洗い出すことで、業界標準への準拠を確保しつつ、リスクを軽減することができます。

## クラウドリソース全体の誤構成の検出

Datadog の[すぐに使える検出ルール](#manage-out-of-the-box and-custom-detection-rules)を使用して、すべてのクラウドリソースで誤構成を検出、優先順位付け、修正することにより、セキュリティ体制を強化し、継続的にコンプライアンスを実現します。

[Overview ページ][1]では、セキュリティ状況の概要を見ることができます。[Security Findings Explorer][2] で、発見内容の詳細や過去の構成を分析することができます。

{{< img src="security/cspm/overview_page.png" alt="Cloud Security Posture Management 概要ページ" width="100%">}}

## 業界のフレームワークやベンチマークへの準拠を維持する

CSPM には、セキュリティ専門家チームによって管理された 400 以上のすぐに使える検出ルールが付属しています。これらのルールは、PCI や SOC2 などのコンプライアンス基準や業界ベンチマークに含まれる制御や要件に対応しています。

[コンプライアンスレポートを表示][3]すると、コンプライアンスフレームワークの各コントロールに対して、どの程度の成果を上げているかを確認することができます。レポートには、最も多くの不合格の所見を得たリソース、合格/不合格の所見を得たリソース数の包括的な内訳、重大度の高いルール違反の上位 3 つなどの詳細が記載されています。

{{< img src="security/cspm/compliance_frameworks.png" alt="Cloud Security Posture Management のコンプライアンスフレームワーク" width="100%">}}

## すぐに使えるカスタム検出ルールの管理

[すぐに使える検出ルール][4]は、最も重要なリスクを表面化させ、すぐに修正するための措置を講じることができます。Datadog は、常に新しいデフォルトルールを開発しており、それらは自動的にお客様のアカウントにインポートされます。各ルールがどのように環境をスキャンするかを定義することで[ルールをカスタマイズ][5]し、[カスタムルールを作成][6]し、[不合格の所見に対するリアルタイム通知を設定](#set-up-real-time-notifications)することが可能です。

{{< img src="security/cspm/detection_rules.png" alt="Cloud Security Posture Management の検出ルール" width="100%">}}

## リアルタイム通知の設定

環境内で新たな誤構成が検出されると[リアルタイムで通知を送信][7]し、チームはリスクを軽減するためのアクションを起こすことができます。通知は、[Slack、メール、PagerDuty、Webhook など][8]に送ることができます。

テンプレート変数と Markdown を使用して、[通知メッセージをカスタマイズ][9]できます。既存の通知ルールの編集、無効化、削除、または新しいルールの作成、重大度やルールタイプに基づいた通知トリガー時のカスタムロジックの定義が可能です。

{{< img src="security/cspm/rule_notification_setup.png" alt="Cloud Security Posture Management のルール通知設定ページ" width="100%">}}

## 所見の確認と修正

[Security Findings Explorer][10] を使用して詳細を調査します。構成、リソースに適用された検出ルール、リソースの所有者や環境内の場所に関する追加のコンテキストを提供するタグなど、リソースの詳細情報を表示します。発見がビジネスユースケースに一致しない場合、または受け入れられたリスクである場合、最大で無期限に[発見をミュート][13]することが可能です。

{{< img src="security/cspm/security_findings_explorer.png" alt="Cloud Security Posture Management Security Findings Explorer" width="100%">}}

## 用語集

セキュリティポスチャスコア
: アクティブな Datadog OOTB [クラウド][4]および[インフラストラクチャー][11]検出ルールをすべて満たす環境の割合。式: `(評価の数:合格の診断結果) / (診断結果の総数)`。次に、Datadog はこの式を重大度で重み付けします。重大度の低い検出ルールの重みは "1" で、重大度の重大な検出ルールの重みは "5" です。つまり、重大度の重大な検出ルールは、重大度の低い検出ルールの 5 倍スコアに影響を与え、セキュリティリスクが高い検出ルールほど重視されます。また、スコアは、すべてのリソースタイプとリソースボリュームを同じように扱うように正規化されます (たとえば、500 個の障害のあるコンテナは、計算されたスコアで 3 個の障害のある S3 バケットと同じように重み付けされます)。この正規化係数により、1 つのアカウントのコンテナ数が多い場合や、別のアカウントのストレージバケット数が少ない場合にスコアが大きく歪むリスクなしに、クラウドアカウント間でスコアを比較できます。

要件
:  _Access Management_ や _Networking_ など、単一の技術的または運用関連のトピックを表すコントロールのグループ。たとえば、規制フレームワークの PCI DSS には [12 の要件][12]があります。

コントロール
: テクノロジー、ユーザー、およびプロセスを管理すべき特定の方法を推奨するもの。通常は規制や業界標準に基づきます。

リソース
: 構成可能なエンティティ。継続的にスキャンして、1 つ以上のコントロールが適用されていることを確認する必要があります。たとえば、AWS インスタンスのリソースには、ホスト、コンテナ、セキュリティグループ、ユーザー、および顧客が管理する IAM ポリシーなどがあります。

ルール
: ルールはリソースのコンフィギュレーションを評価し、1 つ以上のコントロールに関連する要素を検証します。ルールは複数のコントロール、要件、フレームワークにマップすることができます。

診断結果
: 診断結果は、リソースに対するルール評価の主要なプリミティブです。リソースがルールに対して評価されるたびに、合格または不合格のステータスで結果が生成されます。

フレームワーク
: 業界のベンチマークや規制標準にマップされる要件のコレクション。

## 詳細はこちら

{{< whatsnext >}}
  {{< nextlink href="/security/cspm/getting_started">}}完全なセットアップとコンフィギュレーション{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-cloud">}}すぐに使えるポスチャ管理クラウドの検出ルール{{< /nextlink >}}
  {{< nextlink href="/security/default_rules/#cat-posture-management-infra">}}すぐに使えるポスチャ管理インフラストラクチャーの検出ルール{{< /nextlink >}}
  {{< nextlink href="/security/cspm/findings">}} クラウドセキュリティポスチャ管理の知見を学ぶ{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}} Azure 環境のセキュリティとコンプライアンスのポスチャを監視{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-gcp-with-datadog/">}} Google Cloud 環境のコンプライアンスとセキュリティポスチャの向上{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: https://app.datadoghq.com/security/compliance
[3]: /ja/security/cspm/frameworks_and_benchmarks
[4]: /ja/security/default_rules/#cat-posture-management-cloud
[5]: /ja/security/cspm/frameworks_and_benchmarks#customize-how-your-environment-is-scanned-by-each-rule
[6]: /ja/security/cspm/custom_rules
[7]: /ja/security/cspm/frameworks_and_benchmarks#set-notification-targets-for-detection-rules
[8]: /ja/security/notifications/
[9]: /ja/security/notifications/#detection-rule-notifications
[10]: /ja/security/cspm/findings
[11]: /ja/security/default_rules/#cat-posture-management-infra
[12]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security
[13]: /ja/security/cspm/findings#mute-findings