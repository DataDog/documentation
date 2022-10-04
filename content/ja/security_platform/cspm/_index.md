---
kind: documentation
title: クラウドセキュリティポスチャ管理
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

## 概要

Datadog クラウドセキュリティポスチャ管理 (CSPM) は、お使いのクラウド環境における現在および過去のセキュリティポスチャ (セキュリティ体制) のスムーズな評価と視覚化、監査エビデンス収集の自動化、攻撃に対するオーガニゼーションの脆弱性の原因となるコンフィギュレーションミスの検知などをサポートします。

{{< img src="security_platform/cspm/landing_page.png" alt="クラウドセキュリティポスチャ管理" width="100%">}}

セキュリティグループ、ストレージバケット、ロードバランサー、データベースといったクラウドリソースのコンフィギュレーションをコンフィギュレーションルールに基づき評価します。また、Datadog Agent を使用してサーバー、コンテナ、および Kubernetes クラスターからローカルのコンフィギュレーション情報を取得し、Datadog の OOTB ポスチャ管理[クラウド][1]および[インフラストラクチャー][2]検出ルールに照らしてレビューを行います。

[ポスチャ管理][3]ページでクラウドのセキュリティ体制を高レベルで閲覧し、診断結果の詳細を確認したり、[診断結果][4]で過去のコンフィギュレーションを分析したりすることができます。

## 用語集


セキュリティポスチャスコア
: アクティブな Datadog OOTB [クラウド][1]および[インフラストラクチャー][2]検出ルールをすべて満たす環境の割合。式: `(評価の数:合格の診断結果) / (診断結果の総数)`。次に、Datadog はこの式を重大度で重み付けします。重大度の低い検出ルールの重みは "1" で、重大度の重大な検出ルールの重みは "5" です。つまり、重大度の重大な検出ルールは、重大度の低い検出ルールの 5 倍スコアに影響を与え、セキュリティリスクが高い検出ルールほど重視されます。また、スコアは、すべてのリソースタイプとリソースボリュームを同じように扱うように正規化されます (たとえば、500 個の障害のあるコンテナは、計算されたスコアで 3 個の障害のある S3 バケットと同じように重み付けされます)。この正規化係数により、1 つのアカウントのコンテナ数が多い場合や、別のアカウントのストレージバケット数が少ない場合にスコアが大きく歪むリスクなしに、クラウドアカウント間でスコアを比較できます。

要件
:  _Access Management_ や _Networking_ など、単一の技術的または運用関連のトピックを表すコントロールのグループ。たとえば、規制フレームワークの PCI DSS には [12 の要件][5]があります。

コントロール
: テクノロジー、ユーザー、およびプロセスを管理すべき特定の方法を推奨するもの。通常は規制や業界標準に基づきます。

リソース
: 構成可能なエンティティ。継続的にスキャンして、1 つ以上のコントロールが適用されていることを確認する必要があります。たとえば、AWS インスタンスのリソースには、ホスト、コンテナ、セキュリティグループ、ユーザー、および顧客が管理する IAM ポリシーなどがあります。

  {{< img src="security_platform/cspm/getting_started/resource.png" alt="Datadog アプリのポスチャ管理リソース情報" style="width:65%;">}}

ルール
: ルールはリソースのコンフィギュレーションを評価し、1 つ以上のコントロールに関連する要素を検証します。ルールは複数のコントロール、要件、フレームワークにマップすることができます。

  {{< img src="security_platform/cspm/getting_started/rules.png" alt="クラウドセキュリティポスチャ管理の検出ルール一覧" style="width:65%;">}}

診断結果
: 診断結果は、リソースに対するルール評価の主要なプリミティブです。リソースがルールに対して評価されるたびに、合格または不合格のステータスで結果が生成されます。

フレームワーク
: 業界のベンチマークや規制標準にマップされる要件のコレクション。

  {{< img src="security_platform/cspm/getting_started/frameworks.png" alt="クラウドセキュリティポスチャ管理ランディングページのフレームワークの概要" style="width:100%;">}}

## はじめましょう

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cspm/getting_started">}}完全なセットアップとコンフィギュレーション{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-cloud">}}すぐに使えるポスチャ管理クラウドの検出ルール{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-infra">}}すぐに使えるポスチャ管理インフラストラクチャーの検出ルール{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/findings">}} クラウドセキュリティポスチャ管理の知見を学ぶ{{< /nextlink >}}
  {{< nextlink href="https://www.datadoghq.com/blog/cspm-for-azure-with-datadog/">}} Datadog で Azure 環境のセキュリティとコンプライアンスのポスチャを監視{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/security_platform/default_rules/#cat-posture-management-cloud
[2]: /ja/security_platform/default_rules/#cat-posture-management-infra
[3]: https://app.datadoghq.com/security/compliance/homepage
[4]: /ja/security_platform/cspm/findings
[5]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security