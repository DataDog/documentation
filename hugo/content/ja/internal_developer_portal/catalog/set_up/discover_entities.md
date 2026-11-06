---
aliases:
- /ja/software_catalog/set_up/existing_datadog_user
- /ja/software_catalog/import_entries_dd/
- /ja/software_catalog/enrich_default_catalog/import_entries_dd
- /ja/service_catalog/import_entries_dd/
- /ja/service_catalog/enrich_default_catalog/import_entries_dd
- /ja/service_catalog/customize/import_entries_dd
- /ja/software_catalog/customize/import_entries_dd
- /ja/internal_developer_portal/software_catalog/set_up/discover_entities
description: カタログが APM、USM、および RUM からエンティティを自動的に検出する方法と、インフラストラクチャーのメトリクスやログから追加のエンティティをインポートする方法について説明します。
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: ドキュメント
  text: ログ処理パイプライン
title: エンティティを検出
---
## 概要{#overview}

カタログは、Datadog APM (Application Performance Monitoring)、USM (Universal Service Monitoring)、および RUM (Real User Monitoring) からエンティティを自動的に検出します。また、インフラストラクチャーのメトリクスやログからエンティティをインポートするように構成することもできます。

## APM、USM、RUM による自動検出 {#automatic-discovery-with-apm-usm-and-rum}

Datadog カタログには、[APM][1]、[Universal Service Monitoring][2] の eBPF ベースのオートディスカバリーや RUM アプリケーションを通じて検出されたエントリが事前に登録されています。

自動的に検出されたすべてのエンティティは、カタログ内のコンポーネントセレクターに表示されます。

APM および USM は、次のエンティティタイプを自動的に検出します: `service`、`datastore`、`queue`、`external providers`、`inferred services`、および `endpoints`。Datadog SDK は、インスツルメンテーションされたサービスの依存関係を特定し、その依存関係が直接インスツルメンテーションされていない場合でも、それらをデータベース、キュー、またはサードパーティ API として分類します。カスタムインスツルメンテーションは、エンティティの検出方法や `service tag` の割り当て方法に影響を与える可能性があります。詳細については、「[APM 推論サービス][3]」を参照してください。

RUM は `frontend apps` エンティティの検出を担当します。

エンドポイントの検出に関する詳細については、「[APM からのエンドポイントの発見][5]」を参照してください。

**注**: エンティティの[パフォーマンスメトリクス][6]は、その[主要なオペレーション][7]に関連付けられています。サービスが USM によってのみ検出された場合、パフォーマンスビューには [USM メトリクス][9]が表示されます。エンティティが APM によってのみ検出された場合、または APM と USM の両方によって検出された場合、パフォーマンスビューには APM [トレースメトリクス][8]が表示されます。

### 自動命名されたサービスの管理 {#managing-automatically-named-services}

推論されたエンティティのカタログでの表示方法を調整するには、次のようにします。

- [名前変更ルールを作成][18]して、カスタム名でエンティティを識別します。
- タイプ (データベース、キュー、サードパーティ) で[エンティティをフィルター][3]します。
- カタログまたはマップから、`service:my-service-http-client` などの[サービスオーバーライドを削除][4]します。

### APM の相関要件 {#correlation-requirements-for-apm}

APM とカタログ間の適切な自動相関を確保するには、以下のベストプラクティスに従ってください。

- Datadog SDK および Datadog Agent のバージョンが[推論エンティティ][15]をサポートしていることを確認します。
- 恣意的な[サービスオーバーライド][16]を防ぎ、代わりに[推論エンティティ][15]を使用します。
  - 恣意的なサービスオーバーライドは、相関関係の信頼性を損ない、カタログを乱雑にする可能性があります。また、オーバーライド名に馴染みのないユーザーには、カタログが使いにくくなります。
- チームの命名規則に合わせて、データストアやキューなどの[推論エンティティの名前を変更][14]します。
- [unified service tagging][17] を使用して、サービス名、環境、バージョンが APM、インフラストラクチャー、カタログ定義全体で一致するようにします。
  - Datadog APM では、サービスとはトレースをグループ化し、メトリクスを集計するために使用される識別子であり、必ずしも論理的なサービスであるとは限りません。組織にとっての「サービス」を構成するものを定義し (例: Kubernetes の名前空間、デプロイメント、または個々の Pod)、この定義をすべてのテレメトリソースに一貫して適用します。


## インフラストラクチャーおよびログからエンティティをインポートする {#import-entities-from-infrastructure-and-logs}

`DD_SERVICE` [タグ][10]を含む他の Datadog テレメトリからサービスをインポートして、カタログにデータを取り込むことができます。Datadog のインフラストラクチャーのメトリクスまたはログを通じて `kind:service` エンティティを検出するには、カタログの [[**エンティティのインポート**タブ][11]に移動します。

{{< img src="tracing/software_catalog/import_entries.png" alt="カタログのセットアップおよび構成セクションにある [Import Entries] タブ" style="width:90%;" >}}

インポートされたエントリは [**Explore**] (調査) タブに表示されます。[API][12]、[GitHub インテグレーション][13]、または [GitLab インテグレーション][14]を使用して所有者や連絡先などのメタデータを追加しない場合、エントリは期限切れになる可能性があります。

デフォルトの [**Explore**] ビューからインポートされたサービスを削除するには、[**Import Entries** タブ][11]で [**Clear Previously Imported Services**] (以前にインポートされたサービスのクリア) をクリックします。これにより、メタデータを持たないサービス、または APM、USM (Universal Service Monitoring)、RUM (Real User Monitoring) テレメトリを持たないサービスがすべて削除されます。

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="カタログのセットアップおよび構成セクションで、以前にインポートされたサービスの削除を確認します" style="width:90%;" >}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/
[2]: /ja/universal_service_monitoring/
[3]: /ja/tracing/services/inferred_services/
[4]: /ja/tracing/guide/service_overrides/
[5]: /ja/internal_developer_portal/catalog/endpoints/
[6]: https://app.datadoghq.com/software?lens=performance
[7]: /ja/tracing/guide/configuring-primary-operation/
[8]: /ja/tracing/metrics/metrics_namespace/
[9]: /ja/universal_service_monitoring/guide/using_usm_metrics/#usm-metrics-vs-apm-metrics
[10]: /ja/getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/software/settings/get-started
[12]: /ja/internal_developer_portal/catalog/entity_model/
[13]: /ja/integrations/github/
[14]: /ja/integrations/gitlab-source-code/
[14]: /ja/tracing/services/renaming_rules/#step-3-name-your-rule-and-review
[15]: /ja/tracing/services/inferred_services/?tab=agentv7600#set-up-inferred-services
[16]: /ja/tracing/guide/service_overrides/#how-service-overrides-are-set
[17]: /ja/getting_started/tagging/unified_service_tagging/
[18]: /ja/tracing/services/renaming_rules/