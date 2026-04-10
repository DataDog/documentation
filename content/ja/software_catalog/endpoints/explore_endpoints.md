---
aliases:
- /ja/tracing/api_catalog/explore_and_catalog_apis/
- /ja/api_catalog/explore_and_catalog_apis/
- /ja/tracing/api_catalog/explore_apis/
- /ja/api_catalog/explore_apis/
- /ja/service_catalog/endpoints/explore_endpoints/
further_reading:
- link: /tracing/software_catalog/
  tag: ドキュメント
  text: Datadog Software Catalog
title: エンドポイントの探索
---

{{< img src="tracing/software_catalog/endpoints-list.png" alt="Endpoints list in the Software Catalog, showing performance-related information for each endpoint." style="width:100%;" >}}

## 概要

[Endpoints list][1] は、Datadog 組織の環境全体を対象に、すべての HTTP エンドポイントを可視化します。各エンドポイントには、HTTP メソッド (例: `GET`)、URL パス (例: `/payment/{shop_id}/purchase`)、および関連するサービス名 (例: `Payments`) が表示されます。

<div class="alert alert-info"><strong>Endpoints</strong> list は HTTP エンドポイントのみをサポートしています。</div>

## エンドポイントパフォーマンスの探索

Endpoints リストには、選択した環境と時間枠に絞り込まれたパフォーマンス データが表示されます: 

- **列の並べ替え**: 列ヘッダーをクリックすると、メトリクスごとに並べ替えられます。たとえば、レイテンシーの 95 パーセンタイル値が高いエンドポイントを表示するには、**P95** をクリックします。
- **担当チームの確認**: **TEAM** 列で担当チームを確認できます。この情報は、[Software Catalog][2] の関連する API 定義から継承されます。API オーナーは、その API に接続されているすべてのエンドポイントのオーナーです。
- **フィルタリングと検索**: サービス、パス、または任意のプライマリ タグで検索したり、**Service** や **Team** などのファセットを使用してフィルタリングできます。
- **スコープの設定**: 環境、追加のプライマリ タグ (例: `cluster_name`)、および時間枠を指定します。

{{< img src="tracing/software_catalog/scope-data.png" alt="スコープの設定を変更することで Endpoints list に表示されるデータが変化する" >}}

## エンドポイントの詳細の表示

エンドポイントの詳細ページを使用して、パフォーマンスの低い API を検出し、最適化の機会を特定します。

エンドポイントの詳細ページにアクセスするには

1. Endpoints list のフィルタリング、ソート、検索のオプションを使用して、対象のエンドポイントを見つけます。
1. エンドポイントをクリックすると、その詳細ページが表示されます。

エンドポイントの詳細ページには、メタデータ、パフォーマンス メトリクス、エラー、依存関係、および Datadog の他の領域からの関連テレメトリーが表示されます。

{{< img src="tracing/software_catalog/endpoint-details.png" alt="エンドポイントをクリックすると、エンドポイントの詳細ページが開き、エラーや依存関係などの情報が表示される。" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /ja/software_catalog/service_definitions/v3-0/#system-and-api-pages-in-software-catalog