---
aliases:
- /ja/service_catalog/manage_entries/
- /ja/service_catalog/enrich_default_catalog/
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
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: ブログ
  text: Backstage の YAML ファイルを Datadog にインポート
title: Customize the Service Catalog
---

Service Catalog で、エンジニアリング チームのランディング エクスペリエンスをカスタマイズできます。Developer Home はベータ版の新しいパーソナライズド ダッシュボード エクスペリエンスで、開発者が優先度の高いタスク、プル リクエスト、アラート、インサイトに 1 か所でアクセスできるように設計されています。

{{< callout url="https://forms.gle/nkAu2z4gc2dGWcGw5" d_target="#signupModal" btn_hidden="false" header="Developer Homepage エクスペリエンスのプライベート ベータにオプトインしてください!" >}}
{{< /callout >}}

## 自動発見

Datadog サービスカタログには、[APM][2]、[ユニバーサルサービスモニタリング][1]の eBPF ベースのオートディスカバリーや RUM アプリケーションを通じて検出されたエントリが事前に登録されています。

APM を使用すると、Datadog は、データベース、キュー、サードパーティ依存関係など、インスツルメント済みサービスの依存関係を、その依存関係がまだインスツルメントされていない場合でも自動的に検出できます。これらの未インスツルメントの依存関係は、個別の *サービス* として分類されます。Datadog は、インスツルメント済みサービスの依存関係を表すように、クライアント スパン (span.kind:client) の service 名を変更しました。例えば、サービス auth-dotnet から PostgreSQL データベースへのクライアント コールを表すスパンには、service:auth-dotnet-postgres というタグが付与されます。

APM を使用していて、Service Catalog や Service Map から自動命名された *サービス* を削除したい場合は、新しい [推論済みエンティティ エクスペリエンス][7] にオプトインできます。これにより、データベース、キュー、サードパーティ依存関係などのエンティティ タイプで Service Catalog のエントリをフィルタリングできます。必要に応じて、service:my-service-http-client のような [サービス オーバーライド][9] を [削除][8] して、Service Catalog や Service Map から除外することもできます。

エンドポイントの検出については、[APM でエンドポイントを検出する][11] を参照してください。

## 自動検出されたサービスにメタデータを追加
サービスのオンコール、ソース コード、またはドキュメントを指定するには、UI、APIs、または [その他の自動化][10] を使用して、既存の任意のサービスにメタデータを追加できます。推奨バージョンは 2.2 です。拡張されたリレーションシップ マッピングや正確なコード位置などの実験的機能を試すには、[リクエストの送信][4] により [スキーマ 3.0][3] のベータ プログラムにオプトインしてください。

{{< callout url="https://forms.gle/L5zXVkKr5bAzbdMD9" d_target="#signupModal" btn_hidden="false" header="メタデータ スキーマ v3.0 のプレビューにオプトインしてください!" >}}
{{< /callout >}}

### サービス定義スキーマ (v2.2) (推奨)

Service Definition Schema は、サービスの基本情報を格納する構造体です。[GitHub にあるフルスキーマ][5]を参照してください。

#### 例
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: shopping-cart
team: e-commerce
application: shopping-app
tier: "1"
type: web
languages:
  - go
  - python
contacts:
  - type: slack
    contact: https://yourorg.slack.com/archives/e-commerce
  - type: email
    contact: ecommerce@example.com
  - type: microsoft-teams
    contact: https://teams.microsoft.com/example
links:
  - name: Runbook
    type: runbook
    url: http://runbook/shopping-cart
  - name: Source
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Deployment
    type: repo
    provider: github
    url: https://github.com/shopping-cart
  - name: Config
    type: repo
    provider: github
    url: https://github.com/consul-config/shopping-cart
  - name: E-Commerce Team
    type: doc
    provider: wiki
    url: https://wiki/ecommerce
  - name: Shopping Cart Architecture
    type: doc
    provider: wiki
    url: https://wiki/ecommerce/shopping-cart
  - name: Shopping Cart RFC
    type: doc
    provider: google doc
    url: https://doc.google.com/shopping-cart
tags:
  - business-unit:retail
  - cost-center:engineering
integrations:
  pagerduty:
    service-url: https://www.pagerduty.com/service-directory/PSHOPPINGCART
  opsgenie:
    service-url: "https://www.opsgenie.com/service/uuid"
    region: "US"
ci-pipeline-fingerprints:
  - id1
  - id2
extensions:
  additionalProperties:
    customField1: customValue1
    customField2: customValue2
{{< /code-block >}}

## サービスカタログのアクションを検索
サービスカタログに特化したすべてのアクションを確認するには、[Datadog アクションカタログ][6]に移動します。そこで、必要なアクションをフィルタリングしてください。

1. **アクションカタログにアクセス**: Datadog Workflow Automation 環境内でアクションカタログを探します。
2. **検索機能**: 検索バーを使って、"Service Catalog" (サービスカタログ) や "get service dependencies" (サービス依存関係を取得) など、特定のアクションに関連するキーワードを検索します。

### 利用可能なサービスカタログアクション

以下は、Datadog Workflow Automation のサービスカタログで利用可能なアクションの包括的リストです。このリストは、新しいアクションが追加されることで更新される可能性があります。

- **サービス情報の取得**
  - "Get service definition" (サービス定義の取得) で単一のサービスの定義を取得します
  - "List service definitions" (サービス定義の一覧) で Datadog サービスカタログからすべての定義を取得します
  - "Get service dependencies" (サービスの依存関係を取得) でサービスの直接の上流および下流のサービスを取得します
- **インシデントのトリアージ**
  - "Get service PagerDuty on call" (サービスの PagerDuty オンコールを取得)
  - 他のアクションと連携させることで、重大なイベントに基づいたワークフローをトリガーできます (例: ランブックの実行)。

## サービスの色を変更する
サービスの色は、トレースの視覚化に使用されます。サービスタイプのアイコンをクリックして変更できます。

{{< img src="tracing/service_catalog/change_service_color.png" alt="サービスアイコンをクリックして、別のアイコンカラーを選択します。" style="width:80%;" >}}

## サービスタイプと言語を更新する
[サービスカタログメタデータスキーマ 2.2][5] を使用すると、ユーザー定義のサービスのタイプと言語を指定したり、インスツルメンテーションされたサービスの自動検出されたタイプと言語を上書きしたりできます。正確にラベル付けすることで、他のチームがそのサービスの機能や操作方法をより理解できるようになります。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/universal_service_monitoring/
[2]: /ja/tracing/
[3]: /ja/service_catalog/service_definitions/v3-0/
[4]: https://forms.gle/zbLfnJYhD5Ab4Wr18
[5]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[6]: /ja/actions/actions_catalog/
[7]: /ja/tracing/services/inferred_services
[8]: /ja/tracing/guide/service_overrides/#remove-service-overrides
[9]: /ja/tracing/guide/service_overrides/
[10]: /ja/service_catalog/service_definitions/#add-metadata-with-automation
[11]: /ja/service_catalog/endpoints/discover_endpoints/
[12]: /ja/integrations/github/