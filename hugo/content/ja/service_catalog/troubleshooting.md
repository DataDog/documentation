---
aliases:
- /ja/tracing/service_catalog/troubleshooting
- /ja/service_catalog/guides/troubleshooting
- /ja/api_catalog/troubleshoot/
further_reading:
- link: /tracing/service_catalog/setup/
  tag: ドキュメント
  text: サービスカタログの設定
title: サービスカタログのトラブルシューティング
---

Datadog Service Catalog で予期しない動作が発生した場合は、このガイドが問題解決に役立つ可能性があります。引き続き解決しない場合は、 [Datadog サポート][4] までお問い合わせください。

## サービス

### APM インスツルメンテーションサービスが表示されない

APM のインスツルメンテーションが行われていることがわかっているサービスがサービスカタログのリストに表示されない場合、選択した `env` (または選択したプライマリタグの値) または[セカンダリプライマリタグ][1]に対して過去 1 時間にパフォーマンスデータを発信していないことが考えられます。確認するには、**Performance** タブで、パフォーマンスメトリクスが表示されると思われる列にカーソルを合わせると、サービスがどの環境でアクティブになっているかという情報が表示されます。

{{< img src="tracing/service_catalog/svc_cat_troubleshooting_1.png" alt="過去 1 時間にパフォーマンスデータが報告されていないことを示すホバーメッセージ" >}}

### セットアップガイダンスのセクションにリストされていない SLO

サービスカタログのセットアップガイダンスセクションのカウントは、`service` タグを持つ SLO の数を反映しています。SLO がリストにない場合は、SLO に `service` タグの値が指定されているか、APM や USM などの他の製品のサービス名と一致しているかどうかを確認してください。

### サービスに追加テレメトリーが利用可能だが、リストに載っていない

Service Catalog は、特定のサービスに関する情報を収集するために、すべてのテレメトリ種別 (インフラストラクチャー メトリクス、ログ、 Cloud Network Monitoring) で `DD_SERVICE` タグに依存しています。Service Catalog に期待したテレメトリ種別が表示されない場合は、 [Unified Service Tagging][2] の手順に従って `DD_SERVICE` タグを正しく設定していることを確認してください。

### RUM サービスのメタデータを追加できない

RUM サービスのメタデータを追加することはサポートされていません。

### 複数のサービスが同じメタデータを共有

同じメタデータを共有するサービスが多数ある場合、それぞれのサービスに対して別々の `service.datadog.yaml` ファイルは必要ありません。各サービスを `---` セパレータで区切ることで、1 つの `service.datadog.yaml` ファイルに複数のサービスを定義することができます。関連する dd-service エンティティの共有メタデータをコピーアンドペーストします。

### 関連モニターが Setup Guidance セクションに表示されない

Service Catalog は、モニターが service タグまたは [APM プライマリ タグ][3] でタグ付け、スコープ設定、またはグルーピングされている場合に、それらのモニターをサービスに関連付けます。

単一のサービスの **Setup Guidance** タブに表示される合計モニター数には、ミュートされたモニターやグループは含まれません。

## エンドポイント

### エンドポイントの欠落

Endpoints list は APM トレーシングに基づいているため、 [サービスのインスツルメンテーション][7] が行われていることを確認してください。

### 定義が一致するサービスが多すぎる

既定では、Endpoints list は、定義されたパスに合致するすべてのインスタンスに定義を一致させます。API 定義に [service パラメータ][6] を追加することで、特定のサービスにスコープを絞り込むことができます。

### OpenAPI ファイルのテレメトリーデータがない

Endpoints list は APM トレーシングに由来するため、当該エンドポイントでトレースが利用可能な場合にのみトラフィック情報が表示されます。OpenAPI ファイルをアップロードした後は、Datadog がそのエンドポイントのスパンを取り込むと、デプロイ データが表示されるようになります。

### 新しいモニターのデータがない

Endpoints list は APM トレーシングに依存しているため、当該エンドポイントでトレースが利用可能な場合にのみトラフィック情報が表示されます。モニター グラフにデータが表示されない場合は、次のいずれかが該当する可能性があります:
- OpenAPI で登録・アップロードして以来、そのエンドポイントにアクセスされていない。
- トレースが Agent 側でサンプリングされている。詳細は、 [Ingestion Controls][5] を参照してください。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/tracing/guide/setting_primary_tags_to_scope
[4]: /ja/help/
[5]: /ja/tracing/trace_pipeline/ingestion_controls/
[6]: /ja/api_catalog/add_metadata/
[7]: /ja/tracing/trace_collection/