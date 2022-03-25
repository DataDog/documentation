---
title: クラウドセキュリティポスチャ管理
kind: documentation
---
{{< site-region region="us,eu,us3,us5" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理 は、<a href="https://app.datadoghq.com/security/configuration">一般提供中</a>です。
</div>
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

## 概要

Datadog クラウドセキュリティポスチャ管理 (CSPM) は、お使いのクラウド環境における現在および過去のセキュリティポスチャ (セキュリティ体制) のスムーズな評価と視覚化、監査エビデンス収集の自動化、攻撃に対するオーガニゼーションの脆弱性の原因となるコンフィギュレーションミスの検知などをサポートします。

{{< img src="security_platform/cspm/landing_page.png" alt="クラウドセキュリティポスチャ管理" width="100%">}}

セキュリティグループ、ストレージバケット、ロードバランサー、データベースといったクラウドリソースのコンフィギュレーションを[コンフィギュレーションルール][1]に基づき評価します。また、Datadog Agent を使用してサーバー、コンテナ、および Kubernetes クラスターからローカルのコンフィギュレーション情報を取得し、[Datadog の OOTB セキュリティポスチャルール][2]に照らしてレビューを行います。

[ポスチャ管理][1]ページでクラウドのセキュリティ体制を高レベルで閲覧し、診断結果の詳細を確認したり、[診断結果][2]で過去のコンフィギュレーションを分析したりすることができます。

## 用語集

- **セキュリティポスチャスコア**: アクティブな [Datadog の OOTB ルール][3]をすべて満たす環境の割合。式: `(評価の数:合格の診断結果) / (診断結果の総数)`。次に、Datadog はこの式を重大度で重み付けします。重大度の低いルールの重みは "1" で、重大度の重大なルールの重みは "5" です。つまり、重大度の重大なルールは、重大度の低いルールの 5 倍スコアに影響を与え、セキュリティリスクが高いルールほど重視されます。また、スコアは、すべてのリソースタイプとリソースボリュームを同じように扱うように正規化されます (たとえば、500 個の障害のあるコンテナは、計算されたスコアで 3 個の障害のある S3 バケットと同じように重み付けされます)。この正規化係数により、1 つのアカウントのコンテナ数が多い場合や、別のアカウントのストレージバケット数が少ない場合にスコアが大きく歪むリスクなしに、クラウドアカウント間でスコアを比較できます。

- **要件**:  _Access Management_ や _Networking_ など、単一の技術的または運用関連のトピックを表すコントロールのグループ。たとえば、規制フレームワークの PCI DSS には [12 の要件][4]があります。

- **コントロール**: テクノロジー、ユーザー、およびプロセスを管理すべき特定の方法を推奨するもの。通常は規制や業界標準に基づきます。

- **リソース**: 構成可能なエンティティ。継続的にスキャンして、1 つ以上のコントロールが適用されていることを確認する必要があります。たとえば、AWS インスタンスのリソースには、ホスト、コンテナ、セキュリティグループ、ユーザー、および顧客が管理する IAM ポリシーなどがあります。

{{< img src="security_platform/cspm/getting_started/resource.png" alt="CSPM リソース" style="width:65%;">}}

- **ルール**: ルールはリソースのコンフィギュレーションを評価し、1 つ以上のコントロールに関連する要素を検証します。ルールは複数のコントロール、要件、フレームワークにマップすることができます。

{{< img src="security_platform/cspm/getting_started/rules.png" alt="ルールとフレームワーク" style="width:75%;">}}

- **診断結果**: 診断結果は、リソースに対するルール評価の主要なプリミティブです。リソースがルールに対して評価されるたびに、合格または不合格のステータスで結果が生成されます。

- **フレームワーク**: 業界のベンチマークや規制標準にマップされる要件のコレクション。

{{< img src="security_platform/cspm/getting_started/frameworks.png" alt="フレームワークの概要" style="width:100%;">}}

## はじめましょう

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cspm/getting_started">}}CSPM スキャン用のクラウド環境を構成します。{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/findings">}}検出結果を検索および調査して、コンフィギュレーションミスがあったリソースについての詳細とそれを修正するために必要な手順を確認します。{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/frameworks_and_benchmarks">}}Datadog の OOTB コンフィギュレーションルールについての詳細を確認し、お使いのコンフィギュレーションを適用可能な規制標準、コントロール、業界のベンチマークと比較します。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: https://app.datadoghq.com/security/compliance?time=now
[3]: /ja/security_platform/default_rules/#cat-cloud-configuration
[4]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security