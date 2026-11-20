---
aliases:
- /ja/software_catalog/manage_entries/
- /ja/software_catalog/enrich_default_catalog/
- /ja/service_catalog/manage_entries/
- /ja/service_catalog/enrich_default_catalog/
- /ja/service_catalog/customize/
- /ja/software_catalog/best-practices
- /ja/software_catalog/guides/best-practices
- /ja/service_catalog/guides/best-practices
- /ja/service_catalog/use_cases/best_practices
- /ja/software_catalog/use_cases/best_practices
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
title: ソフトウェアカタログをカスタマイズする
---

以下の機能を使って、Software Catalog におけるエンジニアリング チームの体験をカスタマイズできます。

## プレビュー中の Developer Homepage で、チーム専用のランディング ページを作成します。

"{{< callout url="https://forms.gle/nkAu2z4gc2dGWcGw5" d_target="#signupModal" btn_hidden="false" >}}
Developer Homepage は、優先度付きのタスクや Pull Request、Alert、インサイトなどに 1 か所からアクセスできる、開発者向けのパーソナライズされたダッシュボードです。<strong>アクセス リクエスト</strong> をクリックして、利用をリクエストしてください。
{{< /callout >}}"


## 自動検出されたサービスにメタデータを追加
サービスのオンコール情報、ソース コード、ドキュメントを指定するには、UI や API、または [その他の自動化][10] を使って、既存のサービスにメタデータを追加できます。v3 が推奨バージョンです。

### Entity Definition Schema (v3) (推奨)
エンティティ定義スキーマは、ソフトウェア コンポーネントに関する基本情報を保持するための構造です。

詳細については、[Definition Schema v3.0][3] を参照してください。

### Service Definition Schema (v2.2)

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

## Software Catalog アクションを探す
Software Catalog に関連するアクションを一覧で確認するには、[Datadog Action Catalog][6] を開きます。必要なアクションに絞り込むには、次の方法を使います。

1. **アクションカタログにアクセス**: Datadog Workflow Automation 環境内でアクションカタログを探します。
2. **Search Functionality**: search bar を使って "Software Catalog" のようなキーワードや、目的のアクションに関連するより具体的な用語 (例: "get service dependencies") を検索します。

### Available Software Catalog Actions

以下は、Datadog Workflow Automation で Software Catalog に対して利用できるアクションの一覧です。新しいアクションの追加に伴い、この一覧は今後変更される可能性があります。

- **サービス情報の取得**
  - "Get service definition" (サービス定義の取得) で単一のサービスの定義を取得します
  - "List service definitions" to get all definitions from Datadog Software Catalog
  - "Get service dependencies" (サービスの依存関係を取得) でサービスの直接の上流および下流のサービスを取得します
- **インシデントのトリアージ**
  - "Get service PagerDuty on call" (サービスの PagerDuty オンコールを取得)
  - 他のアクションと連携させることで、重大なイベントに基づいたワークフローをトリガーできます (例: ランブックの実行)。

## サービスの色を変更する
サービスの色は、トレースの視覚化に使用されます。サービスタイプのアイコンをクリックして変更できます。

{{< img src="tracing/software_catalog/change_service_color.png" alt="サービス アイコンをクリックして、別のアイコン色を選択します。" style="width:80%;" >}}

## サービスタイプと言語を更新する
[Software Catalog メタデータ スキーマ 2.2][5] を使うと、ユーザー定義のサービスについて、サービスの種類と使用言語を指定したり、計測済みサービスに対して自動検出された種類と使用言語を上書きしたりできます。サービスの種類と言語を正しくラベル付けすることで、他のチームがそのサービスの役割や連携方法をよりよく理解できるようになります。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/universal_service_monitoring/
[2]: /ja/tracing/
[3]: /ja/software_catalog/service_definitions/v3-0/
[4]: https://forms.gle/zbLfnJYhD5Ab4Wr18
[5]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[6]: /ja/actions/actions_catalog/
[7]: /ja/tracing/services/inferred_services
[8]: /ja/tracing/guide/service_overrides/#remove-service-overrides
[9]: /ja/tracing/guide/service_overrides/
[10]: /ja/software_catalog/service_definitions/#add-metadata-with-automation
[11]: /ja/software_catalog/endpoints/discover_endpoints/
[12]: /ja/integrations/github/