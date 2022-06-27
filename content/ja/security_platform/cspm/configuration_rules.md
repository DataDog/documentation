---
kind: documentation
title: OOTB ルール
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
クラウドセキュリティポスチャ管理は、現在このサイトでは利用できません。
</div>
{{< /site-region >}}

## 概要

Datadog は、潜在的な誤構成にフラグを立て、セキュリティポスチャを改善するために、[すぐに使える (OOTB) 検出ルール][1]を提供します。OOTB 検出ルールは、Datadog Security Platform の全ての検出ルールと同じ[条件付きロジック][2]に従っています。

{{< img src="security_platform/cspm/configuration_rules/configuration_rule.png" alt="Datadog でのコンフィギュレーションルール" width="65%">}}

Datadog の Cloud Security Posture Management (CSPM) は以下のルールタイプを使用して、お客様のクラウドインフラストラクチャーのコンフィギュレーションを検証しています:

- [クラウドコンフィギュレーション][1]: これらの検出ルールはお使いのクラウド環境内におけるリソースのコンフィギュレーションを分析します。例えば、「[Cloudfront ディストリビューションが暗号化されていること][3]」についてのルールは、AWS Cloudfront ディストリビューションのコンフィギュレーションの暗号化状態を評価します。このルールではクラウドコンフィギュレーションクエリの直接カスタマイズはサポートされていませんが、各ルールについて環境がどのように[スキャン][4]されるかをカスタマイズできます。

- [インフラストラクチャーコンフィギュレーション][5]: これらの検出ルールはコンテナと Kubernetes クラスターを分析し、よく使用される Docker および Kubernetes の CIS コンプライアンス指標定義に従ってコンフィギュレーションの問題を発見します。例えば、「[/etc/default/docker ファイルのアクセス許可が 644 以上に制限されていること][6]」についてのルールは、ホストで実行中の Docker ファイルのアクセス許可を評価します。

これらの検出ルールは事前設定されたインテグレーションのコンフィギュレーションと連携し、[コンプライアンスフレームワークまたは業界のベンチマーク][4]内のコントロールにマップされます。新しいデフォルトのコンフィギュレーション検出ルールが追加されると、新規ルールが自動でお使いのアカウントにインポートされます。

{{< whatsnext desc="まず、環境に応じてルールの種類を選択します。">}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-cloud">}}<u>クラウド構成</u>{{< /nextlink >}}
  {{< nextlink href="/security_platform/default_rules/#cat-posture-management-infra">}}<u>インフラストラクチャー構成</u>{{< /nextlink >}}
{{< /whatsnext >}}


[1]: /ja/security_platform/default_rules/#cat-posture-management-cloud
[2]: /ja/security_platform/detection_rules/
[3]: https://docs.datadoghq.com/ja/security_monitoring/default_rules/aws-cloudfront-distributions-encrypted/
[4]: /ja/security_platform/cspm/frameworks_and_benchmarks
[5]: /ja/security_platform/default_rules/#cat-posture-management-infra
[6]: https://docs.datadoghq.com/ja/security_monitoring/default_rules/cis-docker-1.2.0-3.22/