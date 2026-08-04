---
aliases:
- /ja/tracing/software_catalog/troubleshooting
- /ja/software_catalog/guides/troubleshooting
- /ja/tracing/service_catalog/troubleshooting
- /ja/service_catalog/guides/troubleshooting
- /ja/api_catalog/troubleshoot/
- /ja/service_catalog/troubleshooting
further_reading:
- link: /tracing/software_catalog/setup/
  tag: ドキュメント
  text: Software Catalog のセットアップ
title: Software Catalog のトラブルシューティング
---

Datadog Software Catalog で予期しない動作が発生した場合は、このガイドが問題の解決に役立つ可能性があります。引き続き問題が解決しない場合やお困りの場合は、[Datadog サポート][4]までお問い合わせください。

## サービス

### APM インスツルメンテーションサービスが表示されない

APM のインスツルメンテーションが行われていることが分かっているサービスが Software Catalog のリストに表示されない場合、選択した `env` (または任意のプライマリ タグ値)、あるいは[追加のプライマリ タグ][1]に対して、過去 1 時間にパフォーマンス データを送信していない可能性があります。確認するには、**Performance** タブでパフォーマンス メトリクスが表示されるはずの列にカーソルを合わせ、そのサービスがどの環境でアクティブかを示す情報を確認します。

{{< img src="tracing/software_catalog/svc_cat_troubleshooting_1.png" alt="過去 1 時間にパフォーマンス データが報告されていないことを示すホバー メッセージ" >}}

### セットアップガイダンスのセクションにリストされていない SLO

Software Catalog のセットアップ ガイダンス セクションのカウントは、`service` タグを持つ SLO の数を反映しています。SLO がリストに含まれていない場合は、SLO に `service` タグの値が指定されているかどうか、また APM や USM などの他の製品でのサービス名と一致しているかどうかを確認してください。

### サービスに追加テレメトリーが利用可能だが、リストに載っていない

Software Catalog は、特定のサービスに関する情報を収集するために、すべてのテレメトリ種別 (インフラストラクチャー メトリクス、ログ、Cloud Network Monitoring) で `DD_SERVICE` タグに依存しています。Software Catalog に期待するテレメトリ種別が表示されない場合は、[Unified Service Tagging][2] の手順に従って `DD_SERVICE` タグが正しく設定されていることを確認してください。

### RUM サービスのメタデータを追加できない

RUM サービスのメタデータを追加することはサポートされていません。

### 複数のサービスが同じメタデータを共有

同じメタデータを共有するサービスが多数ある場合、それぞれのサービスに対して別々の `service.datadog.yaml` ファイルは必要ありません。各サービスを `---` セパレータで区切ることで、1 つの `service.datadog.yaml` ファイルに複数のサービスを定義することができます。関連する dd-service エンティティの共有メタデータをコピーアンドペーストします。

### 関連モニターが Setup Guidance セクションに表示されない

Software Catalog は、モニターが service タグまたは [APM プライマリ タグ][3] でタグ付け、スコープ設定、またはグルーピングされている場合に、それらのモニターをサービスに関連付けます。

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

[1]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-additional-primary-tags-in-datadog
[2]: /ja/getting_started/tagging/unified_service_tagging
[3]: /ja/tracing/guide/setting_primary_tags_to_scope
[4]: /ja/help/
[5]: /ja/tracing/trace_pipeline/ingestion_controls/
[6]: /ja/api_catalog/add_metadata/
[7]: /ja/tracing/trace_collection/