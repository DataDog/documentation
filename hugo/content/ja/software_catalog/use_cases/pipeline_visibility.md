---
aliases:
- /ja/tracing/software_catalog/use_cases/pipeline_visibility
- /ja/service_catalog/use_cases/pipeline_visibility
- /ja/service_catalog/use_cases/streamlining-development-lifecycle-with-ci-visibility/
- /ja/tracing/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
- /ja/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
- /ja/tracing/service_catalog/use_cases/pipeline_visibility
- /ja/tracing/software_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
- /ja/software_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
- /ja/service_catalog/use_cases/ci_visibility
- /ja/software_catalog/use_cases/ci_visibility
further_reading:
- link: /security/code_security/static_analysis/
  tag: ドキュメント
  text: Static Analysis
- link: /dora_metrics/
  tag: ドキュメント
  text: DORA メトリクス
title: CI Visibility で開発ライフサイクルを効率化する
---


Software Catalog 内の Delivery タブでは、サービスにひも付く CI パイプラインや Static Analysis で検出された違反内容を可視化し、本番リリース前の状態を評価・最適化できます。

{{< img src="tracing/software_catalog/pipeline-visibility-software-delivery.png" alt="Software Catalog で本番前状態を監視するための Delivery タブ" style="width:100%;" >}}

Delivery を使うと、次のことが行えます:

- サービスに関連する CI パイプラインのパフォーマンスを監視できます。
- [Static Analysis][1] から、セキュリティやコード品質に関する問題を洗い出せます。
- 本番前環境で発生する遅延や失敗の原因をトラブルシューティングできます。
- [DORA メトリクス][2] と連携して、変更リードタイムを追跡できます。

デフォルトでは、サービスはリポジトリの URL を通じて CI パイプラインと関連付けられます。サービスに紐づくパイプラインを追加・削除するには、次の手順を実行します。

1. [Software Catalog][4] で対象のサービスをクリックしてサービスのサイド パネルを開き、Ownership タブをクリックして Entity Metadata の編集オプションを探します。

   **注**: この機能は、Software Catalog schema v2.2 以降でのみ利用できます。

   {{< img src="tracing/software_catalog/edit_metadata.png" alt="サービスの詳細なサイド パネル ビュー。メタデータの編集オプションが強調表示されている" style="width:100%;" >}}

2. パイプラインを追加または削除するには、サービス メタデータを編集します。

   - **Edit in UI**: Software Delivery セクションで、サービスに関連付けたいパイプラインを検索して選択します。

      {{< img src="tracing/software_catalog/pipeline-visibility-update-metadata.png" alt="サービス メタデータを更新するための設定ページ。関連パイプラインの追加・削除に使用する Software Delivery フィールドが表示されている" style="width:100%;" >}}

   - **Edit in GitHub**: サービス メタデータの YAML ファイル内で、`ci-pipeline-fingerprints` の下にパイプライン フィンガープリントを手動で追加します ( [この例][6] を参照)。パイプラインのフィンガープリントを確認するには、[Pipelines][5] ページで対象のパイプラインをクリックし、歯車アイコンを選択します。

      {{< img src="tracing/software_catalog/pipeline-visibility-pipeline-fingerprint.png" alt="パイプライン フィンガープリントの例" style="width:100%;" >}}

特定のサービスに関連付けられているパイプラインの CI ステータスや Static Analysis の違反内容をより詳しく確認するには、そのサービスをクリックし、**Delivery** タブに移動します。

{{< img src="tracing/software_catalog/delivery_tab.png" alt="サービスの Delivery タブ。成功率や最終実行日時などのパイプライン情報が表示されている" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/code_security/static_analysis/
[2]: /ja/dora_metrics/
[4]: https://app.datadoghq.com/software
[5]: https://app.datadoghq.com/ci/pipelines
[6]: /ja/software_catalog/service_definitions/v2-2/#example-yaml