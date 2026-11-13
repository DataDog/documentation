---
aliases:
- /ja/tracing/api_catalog/get_started
- /ja/tracing/api_catalog/
- /ja/api_catalog/
- /ja/api_catalog/endpoint_discovery/
- /ja/software_catalog/endpoints/discover_endpoints
- /ja/service_catalog/endpoints/discover_endpoints
- /ja/service_catalog/endpoints/
- /ja/software_catalog/endpoints
- /ja/internal_developer_portal/software_catalog/endpoints
description: パフォーマンスメトリクス、オーナーシップの追跡、アラート、テストカバレッジを使用して、HTTP API エンドポイントを単一ビューで監視および管理します。
further_reading:
- link: https://www.datadoghq.com/blog/monitor-apis-datadog-api-catalog/
  tag: ブログ
  text: Datadog API カタログで API のパフォーマンス、セキュリティ、所有権を管理する
- link: /internal_developer_portal/catalog/
  tag: ドキュメント
  text: Datadog カタログ
- link: /synthetics/api_tests/http_tests/
  tag: ドキュメント
  text: Synthetic API テスト
- link: /security/application_security/how-it-works/#api-security
  tag: ドキュメント
  text: AAP API セキュリティ
- link: https://www.datadoghq.com/blog/primary-risks-to-api-security/
  tag: ブログ
  text: API セキュリティの主なリスクを軽減
title: エンドポイント監視可能性
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
 選択した <a href="/getting_started/site">Datadog サイト</a> ({{< region-param key="dd_site_name" >}}) では、エンドポイントの監視可能性はサポートされていません。
</div>
{{% /site-region %}}

{{< img src="tracing/software_catalog/endpoints-list.png" alt="カタログ内のエンドポイントの一覧表示。各エンドポイントのパフォーマンス関連情報が表示されます。" style="width:100%;" >}}

## 概要{#overview}

カタログの [Endpoints 一覧表示][12] には、API エンドポイントについて知っておくべきすべての情報が集約されています。社内チーム向けか外部ユーザー向けかを問わず、すべての API にわたるパフォーマンス、信頼性、オーナーシップの包括的な表示を提供します。これにより、あなたとあなたのチームは、ミッションクリティカルな API 主導の機能を効果的に監視し、パフォーマンスの期待値を確実に達成することができます。

## ユースケース{#use-cases}

エンドポイント一覧表示は、Datadog 全体のデータを組み合わせて、推奨されるワークフローを提供します。以下のアクションを行うことができます。

- **API を自動的に検出**: エンドポイントごとに整理された、パブリック、プライベート、およびパートナー API の完全なインベントリを維持します。
- **相関データを表示**: エンドポイントから、さまざまな Datadog ソースのトレース、ログ、メトリクスに移動します。
- **パフォーマンスの問題を特定**: *Last Seen*、*Requests*、*Latency*、*Errors* などのメトリクスを使用して、API の健全性を追跡します。
- **アラートを受信**: アラートをトリガーするパフォーマンスの期待値としきい値を定義します。
- **オーナーシップ情報を割り当てる**: エラーが発生したときに誰に連絡すべきかがわかるように、チーム、オンコール、各エンドポイントへの通信チャネルの情報を設定します。
- **包括的なカバレッジを確保する**: API モニター、Synthetic テスト、セキュリティシグナルのステータスを追跡し、調査のための詳細情報への直接リンクを提供します。

## はじめに{#getting-started}

[Datadog APM][8] を使用して HTTP サービスを監視している場合、エンドポイントはエンドポイント一覧表示に自動的に追加されます。

### エンドポイントの探索 {#exploring-endpoints}

エンドポイントに関連するプロパティとメトリクスを参照およびクエリします。

詳細については、「[エンドポイントの探索][11]」をお読みください。

### エンドポイントの監視 {#monitoring-endpoints}

API とエンドポイントを管理および監視して、以下のことを行います。

- パフォーマンスの低いエンドポイントを見つけて修正します。
- 標準や目標に対する信頼性を追跡します。
- 異常がないか監視します。
- エラーを調査します。
- テストの網羅性を確保します。
- セキュリティ上の脆弱性を解消します。

詳細は、[エンドポイントの監視][7]を参照してください。

### エンドポイントへの所有者の割り当て {#assigning-owners-to-endpoints}

調査やチーム間のコミュニケーションを効率化するために、エンドポイントに所有者情報を追加します。

詳細は、[所有者の割り当て][6]を参照してください。

### エンドポイントの一覧表示への追加 {#adding-endpoints-to-the-list}

自動検出されたエンドポイントを API グループに割り当てることで、中央から使用状況の追跡、所有者の定義、監視ポリシーの構成を行えます。または、OpenAPI ファイルや Swagger ファイルをアップロードして、エンドポイント一覧表示の全機能を利用できるようにします。

詳細は、[エントリの追加][9]を参照してください。

### API へのメタデータの追加 {#adding-metadata-to-apis}

Datadog の UI または API を使用して、または GitHub インテグレーション、GitLab インテグレーション、または Terraform を通じて自動化されたパイプラインを使用して API にメタデータを追加できます。

詳しくは、[API へのメタデータの追加][10]を参照してください。

## 重要な用語{#key-terminology}

| 用語         | 定義                                                                                                                                                                                                                    |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API          | 2 つのアプリケーションが通信できるようにするためのプロトコルとツールのセット。                                                                                                                                                     |
| API エンドポイント | API で定義されたルールを実装するサーバーまたはサービスの特定のリソースのアドレス (URL)。多くの場合、HTTP インターフェースまたは RESTful インターフェースを介して実装されます。API エンドポイントは、リクエストを処理し、対応するレスポンスを提供します。|
| 公開 API | インターネットからアクセス可能な顧客向け API エンドポイント。                                                                                                                                                         |
| プライベートAPI | *内部 API* とも呼ばれます。これらは組織内での使用専用に設計されており、主にバックエンドサービスの通信に使用されます。これらは最も一般的なタイプの API です。                                                  |
| パートナーAPI | *サードパーティ API* とも呼ばれます。これらは、他の組織 (Stripe、Google、Facebook など) によって提供される公開エンドポイントで、貴社が自社サービスを提供するために利用します。                                            |

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[3]: /ja/api_catalog/explore_apis/
[6]: /ja/internal_developer_portal/catalog/set_up/
[7]: /ja/internal_developer_portal/catalog/endpoints/monitor_endpoints/
[8]: /ja/tracing/trace_collection/
[9]: /ja/internal_developer_portal/catalog/set_up/create_entities/
[10]: /ja/internal_developer_portal/catalog/entity_model/
[11]: /ja/internal_developer_portal/catalog/endpoints/explore_endpoints/
[12]: https://app.datadoghq.com/services?selectedComponent=endpoint