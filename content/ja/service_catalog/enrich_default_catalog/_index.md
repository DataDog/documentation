---
aliases:
- /ja/service_catalog/manage_entries/
further_reading:
- link: /tracing/service_catalog/adding_metadata
  tag: ドキュメント
  text: メタデータの追加
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
title: デフォルトカタログを強化
---

## 自動発見

Datadog サービスカタログには、[APM][2]、[ユニバーサルサービスモニタリング][1]の eBPF ベースのオートディスカバリーや RUM アプリケーションを通じて検出されたエントリが事前に登録されています。

APM を使用すると、Datadog はインスツルメンテーションされたサービスに対する依存関係、例えばデータベース、キュー、サードパーティ API などを、たとえその依存関係がインスツルメンテーションされていなくても自動的に発見できます。これらの未インスツルメンテーションの依存関係は、個別の*サービス*として分類されます。新しい[推論エンティティ機能][7]を使用すると、データベース、キュー、サードパーティ API などのエンティティタイプごとにサービスカタログのエントリをフィルタリングできます。

## 自動検出されたサービスにメタデータを追加
サービスにオンコール、ソースコード、またはドキュメントを指定するには、UI や API、その他の自動化ツールを通じて、既存のサービスにメタデータを追加できます。推奨バージョンは 2.2 です。実験的な機能を試すには、[リクエストを送信][4]し、[スキーマ 3.0][3] のベータプログラムに参加できます。

{{< callout url="https://forms.gle/L5zXVkKr5bAzbdMD9" d_target="#signupModal" btn_hidden="false" header="メタデータスキーマ v3.0 の非公開ベータ版にオプトインしましょう！" >}}
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
[3]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[4]: https://forms.gle/zbLfnJYhD5Ab4Wr18
[5]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[6]: /ja/service_management/workflows/actions_catalog/
[7]: /ja/tracing/guide/inferred-service-opt-in/?tab=java#global-default-service-naming-migration