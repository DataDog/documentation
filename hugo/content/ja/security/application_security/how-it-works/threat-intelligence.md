---
aliases:
- /ja/security/application_security/threats/threat-intelligence
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: ブログ
  text: 'Datadog Cloud SIEM: セキュリティ運用におけるイノベーションの推進'
title: 脅威インテリジェンス
---
## 概要{#overview}

このトピックでは、App and API Protection (AAP) の[脅威インテリジェンス][1]について説明します。

Datadog は、AAP 用の組み込みの脅威インテリジェンス[データセット][1]を提供しています。これにより、セキュリティアクティビティへの対応時に追加の証拠が得られ、一部のビジネスロジックの検出における検出しきい値が引き下げられます。

さらに、AAP は*独自の脅威インテリジェンスの持ち込み*をサポートしています。この機能により、ビジネス固有の脅威インテリジェンスで検知が強化されます。

## ベストプラクティス{#best-practices}

Datadog は、脅威インテリジェンスの活用方法として以下を推奨しています。

1. クレデンシャルスタッフィングなどのビジネスロジックの脅威に対する検知ルールのしきい値を引き下げる。ユーザーは、デフォルトの[クレデンシャルスタッフィング][6]ルールを複製し、ニーズに合わせて変更することができます。
2. セキュリティアクティビティにおいて、脅威インテリジェンスをレピュテーションの指標として活用する。

Datadog は、以下を_推奨しません_。
1. 対応するセキュリティ上のアクティビティを伴わないまま、脅威インテリジェンスに基づくトレースをブロックすること。1 つの IP アドレスの背後には、多数のホストが存在する可能性があるためです。レジデンシャルプロキシが検出された場合、その IP アドレスの背後にあるホストによって当該アクティビティが行われたことを意味します。しかし、マルウェアやプロキシを実行しているホストと、サービスと通信しているホストが同一であるとは限りません。
2. すべての脅威インテリジェンスカテゴリーに対してブロックを行うこと。これにより、企業の VPN からの良性のトラフィックや悪意のないトラフィックもブロックされる可能性があります。

## AAP における脅威インテリジェンスのフィルタリング{#filtering-on-threat-intelligence-in-aap}

ユーザーは、Signal Explorer と Traces Explorer 上でファセットや検索バーを使用して脅威インテリジェンスをフィルタリングできます。

特定のソースによってフラグ付けされたすべてのトレースを検索するには、次のクエリをソース名と共に使用します。

    @threat_intel.results.source.name:<SOURCE_NAME> 

任意のソースからの脅威インテリジェンスを含むすべてのトレースを検索するには、次のクエリを使用します。

    @appsec.threat_intel:true 

## 独自の脅威インテリジェンスの持ち込み{#bring-your-own-threat-intelligence}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">独自の脅威インテリジェンスの持ち込みは、 {{< region-param key="dd_site_name" >}}ではサポートされていません。</div>
{{< /site-region >}}

AAP は、Datadog リファレンステーブルに保存された脅威インテリジェンスの侵害指標を使用して、トレースのエンリッチメントや検索を行う機能をサポートしています。[リファレンステーブル][2]を使用すると、メタデータを Datadog 内の既存情報と組み合わせることができます。

詳細については、「[独自の脅威インテリジェンスの持ち込み][14]」ガイドを参照してください。


## ユーザーインターフェイスにおける脅威インテリジェンス{#threat-intelligence-in-the-user-interface}

AAP Traces Explorer でトレースを表示する際、`@appsec` 属性の下で脅威インテリジェンスデータを確認できます。この際、`category` 属性と `security_activity` 属性の両方が設定されます。

<!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="脅威インテリジェンスデータを含む appsec 属性の例">}} -->

`@threat_intel.results` の下には、どのソースからどのような情報が一致したかという詳細情報を常に確認できます。

 <!-- {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="脅威インテリジェンスデータを含む threat_intel 属性の例">}} -->

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/threat_intelligence/#threat-intelligence-sources
[2]: /ja/integrations/guide/reference-tables
[3]: /ja/security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/threat-intel
[6]: https://app.datadoghq.com/security/appsec/detection-rules?query=type%3Aapplication_security%20defaultRuleId%3Adef-000-yk4
[7]: /ja/security/threat_intelligence#threat-intelligence-categories
[8]: /ja/security/threat_intelligence#threat-intelligence-intents
[9]: https://app.datadoghq.com/security/appsec/traces
[10]: /ja/integrations/guide/reference-tables/?tab=manualupload#create-a-reference-table
[11]: /ja/integrations/guide/reference-tables/?tab=amazons3#create-a-reference-table
[12]: /ja/integrations/guide/reference-tables/?tab=azurestorage#create-a-reference-table
[13]: /ja/integrations/guide/reference-tables/?tab=googlecloudstorage#create-a-reference-table
[14]: /ja/security/guide/byoti_guide