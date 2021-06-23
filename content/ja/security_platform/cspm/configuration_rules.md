---
title: デフォルトのコンフィギュレーションルール
kind: documentation
disable_toc: true
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

Datadog は潜在的なコンフィギュレーションミスを発見し、お客様のセキュリティポスチャを迅速に改善するために、デフォルトのコンフィギュレーションルールを提供しています。コンフィギュレーションルールはすべての Datadog セキュリティプラットフォームのルールと同じ[条件付きロジック][1]に従っています。

{{< img src="security_platform/cspm/configuration_rules/configuration_rule.png" alt="Datadog でのコンフィギュレーションルール" width="65%">}}

Datadog の CSPM は以下のルールタイプを使用して、お客様のクラウドインフラストラクチャーのコンフィギュレーションを検証しています:

- [クラウドコンフィギュレーション][2]: これらのルールはお使いのクラウド環境内におけるリソースのコンフィギュレーションを分析します。例えば、「[Cloudfront ディストリビューションが暗号化されていること][3]」についてのルールは、AWS Cloudfront ディストリビューションのコンフィギュレーションの暗号化状態を評価します。このルールではクラウドコンフィギュレーションクエリの直接カスタマイズはサポートされていませんが、各ルールについて環境がどのように[スキャン][4]されるかをカスタマイズできます。

- [インフラストラクチャーコンフィギュレーション][5]: これらのルールはコンテナと Kubernetes クラスターを分析し、よく使用される Docker および Kubernetes の CIS コンプライアンス指標定義に従ってコンフィギュレーションの問題を発見します。例えば、「[/etc/default/docker ファイルのアクセス許可が 644 以上に制限されていること][6]」についてのルールは、ホストで実行中の Docker ファイルのアクセス許可を評価します。

これらのルールは事前設定されたインテグレーションのコンフィギュレーションと連携し、[コンプライアンスフレームワークまたは業界のベンチマーク][5]内のコントロールにマップされます。新しいデフォルトのコンフィギュレーションルールが追加されると、新規ルールが自動でお使いのアカウントにインポートされます。

{{< whatsnext desc="まず始めに、お使いの環境に基づいてルールの種類を選びます:">}}
  {{< nextlink href="/security_platform/default_rules#cat-cloud-configuration">}}<u>クラウドコンフィギュレーション</u>: お使いのクラウド環境内におけるリソースのコンフィギュレーションを分析します。{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules#cat-infrastructure-configuration">}}<u>インフラストラクチャーコンフィギュレーション</u>: コンテナと Kubernetes クラスターを分析し、よく使用される Docker および Kubernetes の CIS コンプライアンス指標定義に従ってコンフィギュレーションの問題を発見します。{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /ja/security_platform/detection_rules/
[2]: /ja/security_platform/default_rules#cat-cloud-configuration
[3]: https://docs.datadoghq.com/ja/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /ja/security_platform/cspm/frameworks_and_benchmarks
[5]: /ja/security_platform/default_rules#cat-infrastructure-configuration
[6]: https://docs.datadoghq.com/ja/security_monitoring/default_rules/cis-docker-1.2.0-3.22/