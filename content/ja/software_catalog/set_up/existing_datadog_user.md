---
aliases:
- /ja/software_catalog/import_entries_dd/
- /ja/software_catalog/enrich_default_catalog/import_entries_dd
- /ja/service_catalog/import_entries_dd/
- /ja/service_catalog/enrich_default_catalog/import_entries_dd
- /ja/service_catalog/customize/import_entries_dd
- /ja/software_catalog/customize/import_entries_dd
further_reading:
- link: /tracing/software_catalog/setup/
  tag: ドキュメント
  text: Software Catalog のセットアップ
title: Software Catalog でコンポーネントを検出
---

Software Catalog が Datadog Application Performance Monitoring (APM)、Universal Service Monitoring (USM)、Real User Monitoring (RUM)、インフラストラクチャ メトリクス、ログからサービスを検出する仕組みを学びます。

## APM、USM、RUM による自動検出

Datadog Software Catalog には、[APM][5] によって検出されたエントリ、[Universal Service Monitoring][6] の eBPF ベースの自動検出、そして RUM アプリケーションで検出されたエントリがあらかじめ登録されています。

自動検出されたコンポーネントはすべて、Software Catalog 内の Component Selector に表示されます。

APM と USM は、次のコンポーネント タイプを自動検出します: `service`、`datastore`、`queue`、`external providers`、`inferred services`、`endpoints`。APM SDK は、インスツルメント済みサービスの依存関係を特定し、それらをデータベース、キュー、またはサードパーティ API として分類します。依存先が直接インスツルメントされていない場合でも同様です。カスタム インスツルメンテーションは、コンポーネントの自動検出方法や `service tag` の付与に影響することがあります。詳細は [APM 推論サービス][12] を参照してください。

RUM は `frontend apps` コンポーネントの検出を担います。

**自動命名されたサービスの管理:**
- [推論エンティティ][7] を有効化すると、タイプ (database、queue、third-party) でエンティティを除外できます。
- 必要に応じて、カタログやマップから `service:my-service-http-client` のような [service override を削除する][8] ことも可能です。

エンドポイントの検出については、[APM からエンドポイントを検出する][10] を参照してください。

## Infrastructure と Logs からコンポーネントをインポート

Software Catalog を充実させるために、他の Datadog テレメトリで `DD_SERVICE` [タグ][2] を含むサービスをインポートできます。Datadog のインフラストラクチャ メトリクスやログから `kind:service` コンポーネントを検出するには、Software Catalog の [**Import Entries** タブ][11] に移動します。

{{< img src="tracing/software_catalog/import_entries.png" alt="Software Catalog のセットアップ/設定セクションにある Import Entries タブ" style="width:90%;" >}}

インポート後、エントリは **Explore** タブに表示されます。所有者や連絡先などのメタデータを、[API を使用して追加する][3] または [GitHub インテグレーション][4] で付与しないと、エントリが期限切れになる場合があります。

既定の **Explore** ビューからインポート済みサービスを削除するには、[**Import Entries** タブ][11] で **Clear Previously Imported Services** をクリックします。これにより、メタデータがないサービスや、APM、Universal Service Monitoring (USM)、Real User Monitoring (RUM) のテレメトリを持たないサービスがすべて削除されます。

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="Software Catalog のセットアップ/設定セクションで、以前にインポートしたサービスの削除を確認する" style="width:90%;" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/software/settings/get-started
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/tracing/software_catalog/service_definition_api/
[4]: /ja/integrations/github/
[5]: /ja/tracing/
[6]: /ja/universal_service_monitoring/
[7]: /ja/tracing/services/inferred_services
[8]: /ja/tracing/guide/service_overrides/#remove-service-overrides
[9]: /ja/tracing/guide/service_overrides/
[10]: /ja/software_catalog/endpoints/
[11]: https://app.datadoghq.com/software/settings/get-started?currentTab=import
[12]: /ja/tracing/services/inferred_services