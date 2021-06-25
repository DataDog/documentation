---
title: クラウドセキュリティポスチャ管理
kind: documentation
---
{{< site-region region="us" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理 は、現在<a href="https://app.datadoghq.com/security/configuration">公開ベータ版</a>です。
</div>
{{< /site-region >}}

{{< site-region region="us3,gov,eu" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在 US1-FED、US3、EU では利用できません。
</div>
{{< /site-region >}}

## 概要

Datadog クラウドセキュリティポスチャ管理 (CSPM) は、お使いのクラウド環境における現在および過去のセキュリティポスチャ (セキュリティ体制) のスムーズな評価と視覚化、監査エビデンス収集の自動化、攻撃に対するオーガニゼーションの脆弱性の原因となるコンフィギュレーションミスの検知などをサポートします。

{{< img src="security_platform/cspm/landing_page.png" alt="クラウドセキュリティポスチャ管理" width="100%">}}

セキュリティグループ、ストレージバケット、ロードバランサー、データベースといったクラウドリソースのコンフィギュレーションを[コンフィギュレーションルール][1]に基づき評価します。また、Datadog Agent を使用してサーバー、コンテナ、および Kubernetes クラスターからローカルのコンフィギュレーション情報を取得し、[Datadog の OOTB セキュリティポスチャルール][2]に照らしてレビューを行います。

[ポスチャ管理][1]ページでクラウドのセキュリティ体制を高レベルで閲覧し、診断結果の詳細を確認したり、[ポスチャ診断結果][2]で過去のコンフィギュレーションを分析したりすることができます。

## 用語集

- **平均セキュリティコンフィギュレーションスコア**: お使いの環境のうち、すべてのアクティブな[Datadog の OOTB ルール][3]を満たす割合。公式: `(# of resources with 0 findings) / (total # of resources scanned)`

- **要件**:  _Access Management_ や _Networking_ など、単一の技術的または運用関連のトピックを表すコントロールのグループ。たとえば、規制フレームワークの PCI DSS には [12 の要件][4]があります。

- **コントロール**: テクノロジー、ユーザー、およびプロセスを管理すべき特定の方法を推奨するもの。通常は規制や業界標準に基づきます。

- **リソース**: 構成可能なエンティティ。継続的にスキャンして、1 つ以上のコントロールが適用されていることを確認する必要があります。たとえば、AWS インスタンスのリソースには、ホスト、コンテナ、セキュリティグループ、ユーザー、および顧客が管理する IAM ポリシーなどがあります。

{{< img src="security_platform/cspm/getting_started/resource.png" alt="CSPM リソース" style="width:65%;">}}

- **ルール**: ルールはリソースのコンフィギュレーションを評価し、1 つ以上のコントロールに関連する要素を検証します。ルールは複数のコントロール、要件、フレームワークにマップすることができます。

{{< img src="security_platform/cspm/getting_started/rules.png" alt="ルールとフレームワーク" style="width:75%;">}}

- **フレームワーク**: 業界のベンチマークや規制標準にマップされる要件のコレクション。

{{< img src="security_platform/cspm/getting_started/frameworks.png" alt="フレームワークの概要" style="width:100%;">}}

## 開始する

{{< whatsnext >}}
  {{< nextlink href="/security_platform/cspm/getting_started">}}CSPM スキャン用のクラウド環境を構成します。{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/findings">}}検出結果を検索および調査して、コンフィギュレーションミスがあったリソースについての詳細とそれを修正するために必要な手順を確認します。{{< /nextlink >}}
  {{< nextlink href="/security_platform/cspm/frameworks_and_benchmarks">}}Datadog の OOTB コンフィギュレーションルールについての詳細を確認し、お使いのコンフィギュレーションを適用可能な規制標準、コントロール、業界のベンチマークと比較します。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/security/compliance/homepage
[2]: https://app.datadoghq.com/security/compliance?time=now
[3]: /ja/security_platform/default_rules/#cat-cloud-configuration
[4]: https://www.pcisecuritystandards.org/pci_security/maintaining_payment_security