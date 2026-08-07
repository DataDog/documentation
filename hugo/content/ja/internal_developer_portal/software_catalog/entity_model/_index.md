---
algolia:
  tags:
  - codeLocations
aliases:
- /ja/software_catalog/service_definitions/
- /ja/software_catalog/adding_metadata
- /ja/tracing/software_catalog/service_metadata_structure
- /ja/tracing/software_catalog/adding_metadata
- /ja/software_catalog/add_metadata
- /ja/service_catalog/adding_metadata
- /ja/tracing/service_catalog/service_metadata_structure
- /ja/tracing/service_catalog/adding_metadata
- /ja/service_catalog/add_metadata
- /ja/service_catalog/service_definitions
- /ja/service_catalog/service_definitions/v2-0
- /ja/software_catalog/service_definitions/v2-0
- /ja/service_catalog/service_definitions/v2-1
- /ja/software_catalog/service_definitions/v2-1
- /ja/service_catalog/service_definitions/v2-2
- /ja/software_catalog/service_definitions/v2-2
- /ja/service_catalog/service_definitions/v3-0
- /ja/software_catalog/service_definitions/v3-0
- /ja/software_catalog/apis
- /ja/tracing/faq/service_definition_api/
- /ja/tracing/software_catalog/service_definition_api
- /ja/software_catalog/service_definition_api
- /ja/tracing/service_catalog/service_definition_api
- /ja/service_catalog/service_definition_api
- /ja/tracing/api_catalog/api_catalog_api/
- /ja/api_catalog/api_catalog_api
- /ja/service_catalog/apis
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 外部サイト
  text: Terraform による定義の作成と管理
- link: /api/latest/service-definition/
  tag: API
  text: 定義 API について
- link: /integrations/github
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: ブログ
  text: Backstage の YAML ファイルを Datadog にインポートする
- link: https://www.datadoghq.com/blog/service-catalog-schema-v3/
  tag: ブログ
  text: Service Catalog のスキーマバージョン 3.0 で開発者体験とコラボレーションを向上させる
- link: https://www.datadoghq.com/blog/software-catalog-custom-entities/
  tag: ブログ
  text: Datadog Software Catalog でカスタムエンティティを使用してアーキテクチャをモデル化する
title: エンティティモデル
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">エンティティモデルスキーマ v3.0 は、選択されたサイトでは現在利用できません。</div>

{{< /site-region >}}

## 概要 {#overview}

Software Catalog は、エンティティに関する関連メタデータを保存および表示するために定義スキーマを使用します。スキーマには、有効な値のみが受け入れられることを保証するための組み込みの検証ルールがあります。選択したサービスについて、Software Catalog のサイドパネルの [**Definition**] (定義) タブで警告を確認できます。

{{< img src="/tracing/internal_developer_portal/entity-model-flow-chart.png" alt="Software Catalog のコンポーネントが互いに、そしてクラウド環境とどのように接続しているかを示すフローチャート " style="width:100%;" >}}

## サポートされるバージョン {#supported-versions}

Datadog は以下の 4 つの定義スキーマのバージョンをサポートしています。

- **v3.0**: 拡張されたデータモデル、マルチオーナーシップサポート、手動の依存関係宣言、複雑なインフラストラクチャー向けの拡張機能を備えた最新バージョン。
- **v2.2**: カスタムメタデータのためのユーザー注釈と、サービスをビルドプロセスに関連付けるための CI パイプライン連携をサポート。
- **v2.1**: サービスのグループ化による整理機能と、より包括的なサービス説明のための追加フィールドを導入。
- **v2**: 基本的なサービスメタデータとドキュメンテーション用の必須フィールドを提供する、最も初期のサポートバージョン。

各バージョンは前のバージョンを基に構築され、新しい機能を追加しながら後方互換性を維持しています。ニーズとインフラストラクチャーの複雑さに合わせて、最適なバージョンを選択してください。

## バージョン比較 {#version-comparison}

以下は各バージョンでサポートされる機能一覧です。

| 機能                       | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| 基本的なメタデータ                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| サービスのグループ化             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| ユーザー注釈              | {{< X >}}   | {{< X >}} |           |           |
| CI パイプラインの連携      | {{< X >}}   | {{< X >}} |           |           |
| 拡張データモデル           | {{< X >}}   |           |           |           |
| 複数のオーナーシップ               | {{< X >}}   |           |           |           |
| 手動による依存関係宣言 | {{< X >}}   |           |           |           |

完全なスキーマや YAML ファイルの例など、各バージョンの詳細な情報については、[Supported versions](#supported-versions)の各バージョンのページを参照してください。

## バージョンの詳細 {#version-details}

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="最新バージョンの Software Catalog のプレビューにご参加ください。" >}}
{{< /callout >}}

{{< tabs >}}
{{% tab "v3.0" %}}

### 主な特徴 {#key-features}
- **拡張データモデル**: v3.0 は複数の種類のエンティティをサポートしています。システム、サービス、キュー、データストアなどのさまざまなコンポーネントを使用して、システムを整理できます。
- **複数のオーナーシップ**: v3.0 スキーマで定義された任意のオブジェクトに複数の所有者を割り当てて、複数の連絡先を指定できます。
- **強化された関係マッピング**: APM および USM データを使用して、コンポーネント間の依存関係を自動的に検出できます。v3.0 では、自動検出されたトポロジ―を補完するための手動による宣言が可能で、システム内でコンポーネントがどのように相互作用しているかを完全に把握できます。
- **システムメタデータの継承**: システム内のコンポーネントは、自動的にシステムのメタデータを継承します。v2.1 や v2.2 のように、関連するコンポーネントごとに個別でメタデータを宣言する必要はなくなりました。
- **正確なコードの場所**: サービスのコードが存在する場所をマッピングできます。v3.0 の `codeLocations` セクションでは、コードを含むリポジトリおよびその関連する `paths` と共に、コードの場所を指定します。`paths` 属性は、リポジトリ内のパスに一致する [globs][4] のリストです。
- **ログとイベントのフィルタリング**: `logs` および `events` セクションで `system` の保存済みログやイベントクエリを宣言でき、[System] (システム) ページで結果を確認できます。
- **カスタムエンティティ**: サービス、システム、データストア、キュー、API に加えて、カスタムのエンティティタイプを定義できます。スコープスコアカードやアクションを、特定のエンティティタイプに適用できます。
- **(今後対応予定) 統合機能**: サードパーティツール (GitHub のプルリクエスト、PagerDuty のインシデント、GitLab のパイプラインなど) と統合し、コンポーネントに関連するソース情報を動的に取得します。サードパーティソースに対してレポートを作成し、スコアカードルールを記述できます。
- **(今後対応予定) 製品やドメインごとのグループ化**: 製品ごとにコンポーネントを整理し、複数レイヤーの階層構造によるグループ化を可能にします。

### スキーマ構造 {#schema-structure}

[Github で完全なスキーマ定義][1] を確認できます。

V3.0 には v2.2 から次の変更が含まれています。
- `schema_version` は `apiVersion` に変更されました。
- `kind` フィールドが新しく追加され、コンポーネントのタイプ (サービス、キュー、データストア、システム、または API) を定義します。
- `dd-service` は`metadata.name` に変更されました。
- `team` は `owner` に変更され、複数のチームがいる場合は `additionalOwners` を使用します。
- `lifecycle`、`tier`、`languages`、および `type`は `spec` 配下に移動しました。
- `links`、`contacts`、`description`、および `tags` はメタデータ配下に移動しました。
- `application` は機能拡張され、`system` という独自した種類になりました。これにより、サービス上の個別のフィールドとしては存在しなくなりました。

### YAML ファイルの例 {#example-yaml-files}

{{% collapse-content title="次のコンポーネント:  <code>kind:system</code>" level="h4" expanded=false id="id-for-anchoring" %}}
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: myapp
  displayName: My App
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
integrations:
  pagerduty:
    serviceURL: https://www.pagerduty.com/service-directory/Pshopping-cart
  opsgenie:
    serviceURL: https://www.opsgenie.com/service/shopping-cart
    region: US
spec:
  components:
    - service:myservice
    - service:otherservice
extensions:
  datadoghq.com/shopping-cart:
    customField: customValue
datadog:
  codeLocations:
    - repositoryURL: https://github.com/myorganization/myrepo.git
      paths:
        - path/to/service/code/**
  events:
    - name: "deployment events"
      query: "app:myapp AND type:github"
    - name: "event type B"
      query: "app:myapp AND type:github"
  logs:
    - name: "critical logs"
      query: "app:myapp AND type:github"
    - name: "ops logs"
      query: "app:myapp AND type:github"
  pipelines:
    fingerprints:
      - fp1
      - fp2
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="次のコンポーネント:  <code>kind:library</code>" level="h4" expanded=false id="id-for-anchoring" %}}
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: library
metadata:
  name: my-library
  displayName: My Library
  tags:
    - tag:value
  links:
    - name: shopping-cart runbook
      type: runbook
      url: https://runbook/shopping-cart
    - name: shopping-cart architecture
      provider: gdoc
      url: https://google.drive/shopping-cart-architecture
      type: doc
    - name: shopping-cart Wiki
      provider: wiki
      url: https://wiki/shopping-cart
      type: doc
    - name: shopping-cart source code
      provider: github
      url: http://github/shopping-cart
      type: repo
  contacts:
    - name: Support Email
      type: email
      contact: team@shopping.com
    - name: Support Slack
      type: slack
      contact: https://www.slack.com/archives/shopping-cart
  owner: myteam
  additionalOwners:
    - name: opsTeam
      type: operator
{{< /code-block >}}
{{% /collapse-content %}}

{{% collapse-content title="複数のシステムの一部であるコンポーネント" level="h4" expanded=false id="id-for-anchoring" %}}
単一のコンポーネントが複数のシステムの一部である場合、そのコンポーネントを各システムの YAML に指定する必要があります。たとえば、データストア `orders-postgres` が Postgres のフリートと Web アプリケーションの両方のコンポーネントである場合、2 つの YAML を指定します。

Postgres フリート (`managed-postgres`) については、`kind:system` の定義を指定します。
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
spec:
  components:
    - datastore:orders-postgres
    - datastore:foo-postgres
    - datastore:bar-postgres
metadata:
  name: managed-postgres
  owner: db-team
{{< /code-block >}}

Web アプリケーション (`shopping-cart`) については、`kind:system` の別の定義を宣言します。
{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}

apiVersion: v3
kind: system
spec:
  lifecycle: production
  tier: critical
  components:
    - service:shopping-cart-api
    - service:shopping-cart-processor
    - queue:orders-queue
    - datastore:orders-postgres
metadata:
  name: shopping-cart
  owner: shopping-team
  additionalOwners:
    - name: sre-team
      type: operator
---
apiVersion: v3
kind: datastore
metadata:
  name: orders-postgres
  additionalOwners:
    - name: db-team
      type: operator
---
apiVersion: v3
kind: service
metadata:
  name: shopping-cart-api
---
apiVersion: v3
kind: service
metadata:
  name: shopping-cart-processor
---
{{< /code-block >}}
{{% /collapse-content %}}

### 明示的/暗黙的なメタデータの継承 {#explicit-and-implicit-metadata-inheritance}

#### 明示的継承 {#explicit-inheritance}

`inheritFrom`フィールドは、取り込みパイプラインに、`<entity_kind>:<name>` で参照されるエンティティのメタデータを継承するよう指示します。

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
inheritFrom:<entity_kind>:<name>
{{< /code-block >}}

#### 暗黙的継承 {#implicit-inheritance}
コンポーネント (`kind:service`、`kind:datastore`、`kind:queue`、`kind:ui`) は、次の条件下で、所属するシステムからすべてのメタデータを継承します。
-  YAML ファイルに定義されたシステムが 1 つだけである。
- YAML ファイルに `inheritFrom:<entity_kind>:<name>` の指定が存在しない。

### v3.0 への移行 {#migrating-to-v30}
v3.0 は、これまでのバージョンと同様の方法で、Github、API、Terraform、Backstage、ServiceNow、UI などを利用してメタデータを作成できます。ただし、v3.0 には新しい [API エンドポイント][5] と新しい [Terraform リソース][6] があります。

### API リファレンスドキュメント {#api-reference-documentation}
エンドポイント、システム、データストア、キューなどのすべてのエンティティタイプの定義を作成、取得、削除する方法については、[Software Catalog API リファレンス][8] を参照してください。

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v3
[2]: https://github.com/DataDog/schema/tree/main/service-catalog
[3]: /ja/code_analysis/faq/#identifying-the-code-location-in-the-service-catalog
[4]: https://en.wikipedia.org/wiki/Glob_(programming)
[5]: /ja/api/latest/software-catalog/
[6]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[7]: software_catalog/customize/import_entries_backstage
[8]: /ja/api/latest/software-catalog/

{{% /tab %}}

{{% tab "v2.2" %}}

### 主な特徴 {#key-features-1}
- ユーザー注釈
- 自動検出されたサービスタイプと言語を、`type` と `languages` を使用して上書きできます。
- `ci-pipeline-fingerprints` を使用して、サービスに CI パイプラインを関連付けることができます。
- `contact.type`と`link.type`のため検証ロジックが緩和されました。

### スキーマ構造 {#schema-structure-1}

[完全なスキーマは GitHub で入手可能です][1]。

YAML の例:

```yaml
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
```

### API リファレンスドキュメント {#api-reference-documentation-1}

- サービス定義を作成、取得、削除する方法については、[サービス定義 API リファレンス][4] を参照してください。
- システム、データストア、キューなどの新しいコンポーネントタイプの定義を作成、取得、削除する方法については、[Software Catalog API リファレンス][3] を参照してください。
- サービススコアカードのルールと結果を作成および更新するには、[サービススコアカード API リファレンス][2] を参照してください。

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[2]: /ja/api/latest/service-scorecards/
[3]: /ja/api/latest/software-catalog/
[4]: /ja/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.1" %}}

### 主な特徴 {#key-features-2}
- サービスのグループ化や`application`、`tier`、`lifecycle` の各フィールドなど、新しい UI 要素が追加されました。
- `Application` および `Teams`は、Software Catalog でのグループ化変数として使用できます。
- `Lifecycle`フィールドは開発段階を示し、`production`、`experimental`、または `deprecated` のサービスを区別するために使われます。
- `Tier` フィールドはサービスの重要性を示し、インシデント対応時の優先順位付けに利用されます。

### スキーマ構造 {#schema-structure-2}

[完全なスキーマは GitHub で入手可能です][1]。

YAML の例:

```yaml
schema-version: v2.1
dd-service: delivery-state-machine
team: serverless
application: delivery-state-machine
tier: tier0
lifecycle: production
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist-serverless/tree/main/delivery-state-machine
    type: repo
  - name: Deployment
    provider: github
    url: https://github.com/DataDog/shopist-serverless/blob/main/delivery-state-machine/serverless.yml
    type: repo
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
    type: doc
tags:
  - "app:serverless-delivery"
  - "tier:3"
  - "business-unit:operations"
```

### API リファレンスドキュメント {#api-reference-documentation-2}

- サービス定義を作成、取得、削除する方法については、[サービス定義 API リファレンス][4] を参照してください。
- システム、データストア、キューなどの新しいコンポーネントタイプの定義を作成、取得、削除する方法については、[Software Catalog API リファレンス][3] を参照してください。
- サービススコアカードのルールと結果を作成および更新するには、[サービススコアカード API リファレンス][2] を参照してください。

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.1
[2]: /ja/api/latest/service-scorecards/
[3]: /ja/api/latest/software-catalog/
[4]: /ja/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.0" %}}

### 主な特徴 {#key-features-3}
- 基本的なサービスメタデータ
- チームの関連付け
- 連絡先情報
- 外部リンク

### スキーマ構造 {#schema-structure-3}

[完全なスキーマは GitHub で入手可能です][1]。

YAML の例:

```yaml
schema-version: v2
dd-service: delivery-api
team: distribution-management
contacts:
  - type: slack
    contact: https://datadogincidents.slack.com/archives/C01EWN6319S
links:
  - name: Demo Dashboard
    type: dashboard
    url: https://app.datadoghq.com/dashboard/krp-bq6-362
repos:
  - name: Source
    provider: github
    url: https://github.com/DataDog/shopist/tree/prod/rails-storefront
docs:
  - name: Datadog Doc
    provider: link
    url: https://docs.datadoghq.com/
tags: []
integrations:
  pagerduty: https://datadog.pagerduty.com/service-directory/PXZNFXP
```

### API リファレンスドキュメント {#api-reference-documentation-3}

- サービス定義を作成、取得、削除する方法については、[サービス定義 API リファレンス][4] を参照してください。
- システム、データストア、キューなどの新しいコンポーネントタイプの定義を作成、取得、削除する方法については、[Software Catalog API リファレンス][3] を参照してください。
- サービススコアカードのルールと結果を作成および更新するには、[サービススコアカード API リファレンス][2] を参照してください。

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2
[2]: /ja/api/latest/service-scorecards/
[3]: /ja/api/latest/software-catalog/
[4]: /ja/api/latest/service-definition/

{{% /tab %}}

{{< /tabs >}}


## カスタム拡張機能を構築する {#build-custom-extensions}

<div class="alert alert-info">カスタム拡張機能は、すべてのスキーマバージョンで限定的に利用可能です。</div>

カスタム拡張機能を使用すると、組織固有のメタデータをエンティティに追加でき、カスタムツールやワークフローのサポートが可能になります。たとえば、`extensions` フィールドを使用して、リリースノート、コンプライアンスタグ、または所有モデルをエンティティ定義に含めることができます。

Datadog は、特定の機能向けに専用の拡張キーもサポートしています。これには、次のものが含まれます。
- `datadoghq.com/dora-metrics`: [DORA メトリクス][21] の計算時に、Git コミットをフィルタリングするためのソースコードパスパターンを定義します。
- `datadoghq.com/cd-visibility`: [CD Visibility][22] において、デプロイの一部と見なされるコミットを制御します。

次の例では、複数環境にまたがるリリーススケジュールを管理するためのカスタム拡張を定義しています。
{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
apiVersion: v3
kind: system
metadata:
  name: payment-platform
  displayName: "Payment Platform"
  links:
    - name: Runbook
      type: runbook
      url: https://runbook/payment-platform
  contacts:
    - name: Payment Team
      type: team
      contact: https://www.slack.com/archives/payments
  owner: payments-team
  additionalOwners:
    - name: finance-team
      type: stakeholder
spec:
  components:
    - service:payment-api
    - queue:payment-requests
    - datastore:payment-db
extensions:
  shopist.com/release-scheduler:
    release-manager:
      slack: "release-train-shopist"
      schedule: "* * * * *"
      env:
        - name: "staging"
          ci_pipeline: "ci-tool://shopist/k8s/staging-deploy"
          branch: "main"
          schedule: "0 9 * * 1"
{{< /code-block >}}


## IDE プラグインによるスキーマ検証 {#schema-validation-through-ide-plugin}

Datadog は定義用の [JSON スキーマ][18] を提供しており、[対応する IDE][19] 上で定義を編集する際に、オートコンプリートや検証などの機能が利用できるようになっています。

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode で修正すべき問題を検出" style="width:100%;" >}}

[Datadog 定義用の JSON スキーマ][20] はオープンソースの [Schema Store][19] に登録されています。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://app.datadoghq.com/services
[6]: /ja/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /ja/tracing/software_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[16]: /ja/api/latest/software-catalog/#create-or-update-entities
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/software_catalog
[18]: http://json-schema.org/
[19]: https://www.schemastore.org
[20]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json
[21]: /ja/dora_metrics/setup/#handling-multiple-services-in-the-same-repository
[22]: /ja/continuous_delivery/features/code_changes_detection?tab=github#specify-service-file-path-patterns