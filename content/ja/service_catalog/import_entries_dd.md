---
further_reading:
- link: /tracing/service_catalog/adding_metadata
  tag: ドキュメント
  text: メタデータの追加
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: External Site
  text: Terraform によるサービス定義の作成と管理
- link: /api/latest/service-definition/
  tag: API
  text: サービス定義 API について
- link: /integrations/github
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: ブログ
  text: Backstage の YAML ファイルを Datadog にインポート
kind: ドキュメント
title: Import Entries from Datadog Telemetries
---

## Manual Service Discovery through other Datadog telemetries

To discover additional services through existing Datadog telemetry such as infrastructure metrics, navigate to the [**Setup & Config** tab][3] on the top of the page and click on the **Import Entries** tab. You can import services from other Datadog telemetry containing the `DD_SERVICE` [tag][5].

{{< img src="tracing/service_catalog/import_entries.png" alt="サービスカタログのセットアップと構成セクションのインポートエントリータブ" style="width:90%;" >}}

After you have imported some entries, they appear in the **Explore** tab. Entries may expire unless you add metadata such as the owner or contacts by [using the API][1] or the [GitHub integration][6].

インポートしたサービスをデフォルトの **Explore** ビューから削除するには、**Clear Previously Imported Services** をクリックします。これにより、メタデータを持たないサービスや、APM、ユニバーサルサービスモニタリング (USM)、リアルユーザーモニタリング (RUM) のテレメトリーを持たないサービスがすべて削除されます。

{{< img src="tracing/service_catalog/clear_imported_services.png" alt="サービスカタログのセットアップと構成セクションで、以前にインポートしたサービスの削除を確認します" style="width:90%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/service_catalog/service_definition_api/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[3]: https://app.datadoghq.com/services/settings/get-started
[4]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[5]: /ja/getting_started/tagging/unified_service_tagging
[6]: /ja/integrations/github/
[15]: https://backstage.io/docs/features/software-catalog/descriptor-format/
[16]: https://docs.datadoghq.com/ja/integrations/servicenow/#service-ingestion
[17]: https://docs.datadoghq.com/ja/universal_service_monitoring/
[18]: https://docs.datadoghq.com/ja/tracing/