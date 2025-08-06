---
aliases:
- /ja/service_catalog/import_entries_integrations/
- /ja/service_catalog/enrich_default_catalog/import_entries_integrations
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 外部サイト
  text: Terraform によるサービス定義の作成と管理
- link: /api/latest/service-definition/
  tag: API
  text: サービス定義 API について
- link: /integrations/github
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: https://www.datadoghq.com/blog/servicenow-cmdb-it-management-datadog/#get-cmdb-metadata-in-the-datadog-service-catalog
  tag: ブログ
  text: ServiceNow CMDB と Datadog を使用してインフラストラクチャーを管理する
title: Import Entries from ServiceNow
---

ServiceNow CMDB からサービスを Datadog Service Catalog に取り込むには、[Datadog-ServiceNow インテグレーション][2] の Service Ingestion 機能を使用します。

{{< img src="integrations/servicenow/service-metadata.jpg" alt="ServiceNow から入力されたメタデータを示す Service Configuration パネルのスクリーンショット" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/integrations/servicenow/#service-ingestion
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: /ja/getting_started/tagging/unified_service_tagging
[5]: /ja/tracing/service_catalog/service_definition_api/
[6]: /ja/integrations/github/