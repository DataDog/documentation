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
description: Catalog は、オブザーバビリティ、セキュリティ、およびコスト管理ツールを統合し、ソフトウェアエコシステムとインフラストラクチャーリソースを一元化された動的なビューで提供します。
further_reading:
- link: https://www.datadoghq.com/blog/datadog-forms
  tag: ブログ
  text: Datadog Forms を活用してエンジニアリング組織全体でフィードバックをアクションに変換する
- link: /internal_developer_portal/use_cases
  tag: ドキュメント
  text: Catalog のユースケースについて学ぶ
- link: https://learn.datadoghq.com/courses/managing-software-catalog
  tag: ラーニングセンター
  text: Catalog によるサービスの管理
title: Catalog
---
## 概要{#overview}

[Catalog][1] は、ソフトウェアエコシステムとインフラストラクチャーリソースを一元化された動的なビューで提供し、スタックのあらゆるレイヤーを把握するための単一の入り口となります。リアルタイムのテレメトリと自動化されたメタデータ収集に基づいて構築された Catalog は、オブザーバビリティ、セキュリティ、およびコスト管理ツールと統合しています。これにより、エンジニアリング、SRE、セキュリティ、およびプラットフォームの各チームは、可視性を維持し、運用を最適化し、大規模環境におけるサービスの信頼性を向上させることが可能になります。

{{< img src="tracing/internal_developer_portal/catalog/tour.mp4" video=true alt="IDP Catalog の操作方法" style="width:100%;" >}}

## Catalog でできること {#what-you-can-do-in-catalog}

Catalog では、エンティティの探索や管理に役立つ複数のビューが提供されています。必要な情報をすばやく見つけられるよう、[Saved Views] を使って、頻繁にアクセスするビューをピン留めしておくと便利です。

- [**オーナーシップ**][8]: チームの Slack、リポジトリ、またはオンコール情報にアクセスできます。
- **信頼性**: 最近のデプロイ、エラー率の上昇、未解決のインシデント、または監視の失敗などがあるエンティティを特定し、リスクに対処します。
- **パフォーマンス**: 環境ごとのレイテンシー、トラフィック、エラー率、および Apdex を比較できます。
- **セキュリティ**: 脆弱性のあるライブラリや進行中の攻撃を単一のリストで特定し、セキュリティ体制を強化します。
- **コスト**: コードやインフラストラクチャーの変更に関連する AWS コストを追跡し、クラウド支出を管理します。
- **ソフトウェアデリバリー**: CI パイプラインの健全性、静的解析の違反、DORA メトリクスを監視し、デリバリーサイクルを短縮します。
- **リレーションシップ**: サービスの依存関係グラフを表示し、サービスカードにカーソルを合わせると、そのサービスが実行されているインフラストラクチャーリソースを確認できます。
- **インフラストラクチャー**: Catalog 内の専用セクションで、クラウドインフラリソースを閲覧できます。インフラストラクチャーリソースは、それらで実行されるソフトウェアエンティティとリンクしています。依存関係グラフ内の任意のサービスをクリックすると、そのサービスが実行されているインフラストラクチャーに直接移動できます。

チームが Datadog Catalog を使用して知識を集約し、プロセスを効率化し、運用効率を向上させる方法などについては、[ユースケースのドキュメント][4]を参照してください。

## Catalog に表示される内容 {#what-appears-in-catalog}

Catalog には、次の場合にエンティティが含まれます。
- Datadog が[テレメトリから検出した場合][5]、
- [エンティティ定義で宣言した場合][6]、または
- Backstage や ServiceNow などの[サードパーティソースからインポートした場合][7]

[リソース収集を有効][9]にすると、インフラストラクチャーリソースを表示できます。リソース収集は、Infrastructure Monitoring をご利用のすべてのお客様が無料で利用できます。

エンティティタイプと、ニーズに合わせてそれらを構成する方法についての[詳細はこちら][3]。

**注**:
- レガシーの `type` フィルター (`span.type` 属性によるもの) よりも詳細なフィルタリングを行うには、エンティティタイプを使用してください。たとえば、特定のデータストア技術でフィルタリングする場合は、`datastore type` ファセットを使用します。
- スパンの概要、およびサービスとリソースの統計は、最大 30 日間保持されます。APM トレースメトリクスの詳細な分析を行うには、Metric Explorer を使用してください。[APM のデータ保持の詳細についてはこちら][2]。

{{< site-region region="gov,gov2" >}}
### サービスタイプ {#service-types}

監視対象のすべてのサービスには、タイプが関連付けられています。Datadog は、受信したスパンデータに付加された `span.type` 属性に基づいて、タイプを自動的に決定します。タイプは、Datadog Agent が統合されているアプリケーションまたはフレームワークの名前を指定します。

たとえば、公式の Flask 統合を使用する場合、`Type` は「Web」に設定されます。カスタムアプリケーションを監視している場合、`Type` は「Custom」と表示されます。

サービスタイプは、以下のいずれかになります。

*  キャッシュ
*  カスタム
*  DB
*  サーバーレス関数
*  Web

一部の統合は特定のタイプにエイリアスされます。たとえば、Postgres、MySQL、Cassandra は「DB」タイプにマッピングされます。Redis および Memcache 統合は「Cache」タイプにマッピングされます。

{{< /site-region >}}

## ダッシュボードで Catalog データをクエリする{#query-catalog-data-in-dashboards}

**Developer Portal**データソースを使用すると、Catalog データを [Dashboards][10] に直接取り込むことができます。サービス、キュー、フロントエンドアプリ、API、システム全体でエンティティをクエリし、所有権、ティア、ライフサイクル、定義バージョンなどのメタデータでグループ化またはフィルタリングできます。


データソースを使用するには、ダッシュボードにウィジェットを追加し、データソースとして [**Developer Portal**] を選択し、クエリするエンティティタイプを選択します。サポートされているウィジェットタイプは、Query Value、Top List、Table、Treemap、Pie、Bar です。

{{< img src="tracing/internal_developer_portal/catalog/catalog_datasource.png" alt="Dashboards での Catalog データのクエリ" style="width:100%;" >}}

## 関連資料{#further-reading}

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