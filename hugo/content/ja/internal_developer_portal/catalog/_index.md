---
algolia:
  tags:
  - software catalog
  - catalog
aliases:
- /ja/tracing/faq/software_catalog/
- /ja/tracing/services/services_list/
- /ja/tracing/visualization/services_list/
- /ja/tracing/software_catalog/
- /ja/tracing/faq/service_catalog/
- /ja/tracing/service_catalog/
- /ja/service_catalog/
- /ja/software_catalog/
- /ja/internal_developer_portal/software_catalog/
description: Catalog は、ソフトウェアエコシステムとインフラストラクチャーリソースの一元的かつ動的なビューを提供し、可観測性、セキュリティ、コスト管理のツールを統合します。
further_reading:
- link: /internal_developer_portal/use_cases
  tag: ドキュメント
  text: Catalog のユースケースについて学ぶ
- link: https://learn.datadoghq.com/courses/managing-software-catalog
  tag: ラーニングセンター
  text: Catalog によるサービスの管理
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: ブログ
  text: Datadog Forms を使用して、エンジニアリング組織全体でフィードバックを行動に変える
title: カタログ
---
## 概要{#overview}

[Catalog][1] は、ソフトウェアエコシステムとインフラストラクチャーリソースの一元的かつ動的なビューを提供し、スタックのあらゆるレイヤーを理解するための単一の入り口となります。リアルタイムのテレメトリと自動化されたメタデータ収集に基づき、Catalog は可観測性、セキュリティ、コスト管理のツールと統合します。これにより、エンジニアリング、SRE、セキュリティ、プラットフォームの各チームは、可視性を維持し、運用を最適化し、規模を問わずサービスの信頼性を高めることができます。

{{< img src="tracing/internal_developer_portal/catalog/tour.mp4" video=true alt="IDP Catalog のナビゲーション" style="width:100%;" >}}

## Catalog でできること {#what-you-can-do-in-catalog}

Catalog は、エンティティの探索と管理に役立つ複数のビューを提供します。最も必要なものをすぐに見つけられるように、Saved Views を使用して、頻繁にアクセスするビューをピン留めします。

- [**Ownership**][8]: チームの Slack、リポジトリ、またはオンコール情報にアクセスします。
- **Reliability**: 最近のデプロイ、エラー率の上昇、未解決のインシデント、または異常を検知しているモニターがあるエンティティを可視化し、リスクに対処します。
- **Performance**: 環境ごとのレイテンシー、トラフィック、エラー率、および Apdex を比較します。
- **Security**: 脆弱なライブラリや進行中の攻撃を単一のリストから見つけ、セキュリティ態勢を強化します。
- **Costs**: クラウド支出を管理するために、コードとインフラストラクチャーの変更に関連する AWS コストを追跡します。
- **Software Delivery**: デリバリーサイクルを短縮するために、CI パイプラインの健全性、静的解析違反、DORA メトリクスを監視します。
- **Relationships**: サービスの依存関係グラフを表示し、サービスカードにカーソルを合わせると、そのサービスが稼働するインフラストラクチャーリソースを確認できます。
- **Infrastructure**: Catalog の専用セクションで、クラウドインフラストラクチャーリソースを閲覧します。インフラストラクチャーリソースは、それらで実行されるソフトウェアエンティティにリンクしています。依存関係グラフ内の任意のサービスをクリックすると、そのサービスが実行されているインフラストラクチャーに直接移動できます。

チームが Datadog Catalog を使用して知識を一元化し、プロセスを効率化し、運用効率を向上させる方法などについては、[ユースケースのドキュメント][4]を参照してください。

## Catalog に表示される内容 {#what-appears-in-catalog}

Catalog には、以下の場合にエンティティが含まれます。
- Datadog が[テレメトリから検出した場合][5]、
- [エンティティ定義で宣言した場合][6]、または
- Backstage や ServiceNow などの[サードパーティソースからインポートした場合][7]。

[リソース収集を有効にする][9]と、インフラストラクチャーリソースを表示できます。リソース収集は、Infrastructure Monitoring をご利用のすべてのお客様が無料で利用できます。

エンティティタイプと、ニーズに合わせてそれらを構成する方法について[詳しくはこちら][3]。

**注**:
- 従来の `type` フィルター (`span.type` 属性の) よりも正確なフィルタリングを行うには、エンティティタイプを使用します。たとえば、`datastore type` ファセットを使用して、特定のデータストアテクノロジーでフィルタリングします。
- スパンのサマリーと、サービスおよびリソースの統計は、最大 30 日間保持されます。APM トレースメトリクスの詳細な分析には、Metric Explorer を使用してください。[APM のデータ保持の詳細][2]をご覧ください。

{{< site-region region="gov,gov2" >}}
### サービスタイプ {#service-types}

監視対象のすべてのサービスには、タイプが関連付けられています。Datadog は、受信したスパンデータにアタッチされた `span.type` 属性に基づいて、タイプを自動的に判別します。このタイプは、Datadog Agent が統合されているアプリケーションまたはフレームワークの名前を指定します。

たとえば、公式の Flask インテグレーションを使用している場合、`Type` は [Web] に設定されます。カスタムアプリケーションを監視している場合、`Type` は [Custom] と表示されます。

サービスタイプは、以下のいずれかになります。

*  Cache
*  Custom
*  DB
*  Serverless function
*  Web

一部のインテグレーションは特定のタイプにエイリアスされます。たとえば、Postgres、MySQL、Cassandra は [DB] タイプにマッピングされます。Redis および Memcache インテグレーションは [Cache] タイプにマッピングされます。

{{< /site-region >}}

## ダッシュボードでの Catalog データのクエリ {#query-catalog-data-in-dashboards}

**Developer Portal** データソースを使用して、Catalog データを [Dashboards][10] に直接取り込みます。サービス、キュー、フロントエンドアプリ、API、システム全体でエンティティをクエリし、所有権、ティア、ライフサイクル、定義バージョンなどのメタデータでグループ化またはフィルタリングできます。


データソースを使用するには、ダッシュボードにウィジェットを追加し、データソースとして [**Developer Portal**] を選択して、クエリするエンティティタイプを選択します。[Query Value]、[Top List]、[Table]、[Treemap]、[Pie]、[Bar] ウィジェットタイプがサポートされています。

{{< img src="tracing/internal_developer_portal/catalog/catalog_datasource.png" alt="Dashboards での Catalog データのクエリ" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /ja/data_security/data_retention_periods/
[3]: /ja/internal_developer_portal/catalog/entity_model/native_entities/
[4]: /ja/internal_developer_portal/use_cases
[5]: /ja/internal_developer_portal/catalog/set_up/discover_entities
[6]: /ja/internal_developer_portal/catalog/set_up/create_entities
[7]: /ja/internal_developer_portal/catalog/set_up/import_entities
[8]: /ja/internal_developer_portal/catalog/set_up/ownership
[9]: /ja/infrastructure/
[10]: /ja/dashboards/