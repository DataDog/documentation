---
aliases:
- /ja/tracing/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
further_reading:
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: Datadog サービスカタログ
- link: /continuous_integration/search/?tab=pipelines
  tag: ドキュメント
  text: Datadog CI Pipeline Visibility
kind: ガイド
title: CI Visibility で開発ライフサイクルを効率化する
---

サービスカタログの Delivery ビューでは、サービスに関連付けられた CI パイプラインと静的分析の結果を表示できます。

デフォルトでは、サービスはリポジトリ URL を通じて [CI パイプライン][4]に関連付けられます。
[サービスメタデータ][5]の `ci-pipeline-fingerprints` フィールドを変更することで、各サービスに関連付けられたパイプラインを編集できます。

サービスに関連付けられたパイプラインを追加または削除するには、サービスページで `Edit Metadata` をクリックし、Software Delivery に進みます。これは [Service Catalog schema v2.2][7] でのみ利用可能です。

{{< img src="tracing/service_catalog/service_catalog_delivery_lens.png" alt="サービスカタログのデリバリービュー" >}}

関連付けられたパイプラインを追加または削除するには、2 つの方法があります。

1. 関連付けたいパイプラインを検索して選択します。
{{< img src="tracing/service_catalog/add_pipelines_to_service.png" alt="UI でパイプラインを編集または追加" >}}

2. パイプラインのフィンガープリントをサービスメタデータに直接追加します。[Pipelines][6] ページでパイプラインをクリックすることでパイプラインのフィンガープリントを見つけ、歯車のアイコンをクリックします。
{{< img src="tracing/service_catalog/pipeline-fingerprint-location.png" alt="パイプラインのフィンガープリントの位置。" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /ja/tracing/service_catalog/service_definition_api/
[3]: /ja/continious-integration/pipelines/
[4]: /ja/continuous_integration/
[5]: /ja/tracing/service_catalog/service_metadata_structure
[6]: https://app.datadoghq.com/ci/pipelines
[7]: /ja/tracing/service_catalog/adding_metadata/#metadata-structure-and-supported-versions