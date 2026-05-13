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
  text: Create and manage definitions with Terraform
- link: /api/latest/service-definition/
  tag: API
  text: Learn about the Definition API
- link: /integrations/github
  tag: よくあるご質問
  text: GitHub インテグレーションについて
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: ブログ
  text: Backstage の YAML ファイルを Datadog にインポート
- link: https://www.datadoghq.com/blog/service-catalog-schema-v3/
  tag: ブログ
  text: サービスカタログのスキーマバージョン 3.0 で、開発者の体験とコラボレーションを向上
- link: https://www.datadoghq.com/blog/software-catalog-custom-entities/
  tag: ブログ
  text: Datadog Software Catalogでカスタムエンティティを使用してアーキテクチャをモデル化する
title: エンティティ モデル
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">エンティティモデルスキーマ v3.0 は、現在選択されたサイトでは利用できません。</div>

{{< /site-region >}}

## 概要 {#overview}

Software Catalogは、エンティティに関する関連メタデータを保存および表示するために定義スキーマを使用します。スキーマには、有効な値のみが受け入れられることを保証するための組み込みの検証ルールがあります。選択したサービスに対して、Software Catalogのサイドパネルの **定義** タブで警告を表示できます。

{{< img src="/tracing/internal_developer_portal/entity-model-flow-chart.png" alt="Software Catalogのコンポーネントが互いにおよびクラウド環境とどのように接続されるかを示すフローチャート " style="width:100%;" >}}

## サポートされているバージョン {#supported-versions}

Datadog は以下の 4 つの定義スキーマバージョンをサポートしています。

- **v3.0**: 拡張されたデータモデル、マルチオーナーシップサポート、手動の依存関係宣言、複雑なインフラ向けの拡張機能を備えた最新バージョン。
- **v2.2**: カスタムメタデータ用のユーザー注釈と、サービスとそのビルドプロセスを関連付けるためのCIパイプライン関連付けをサポートします。
- **v2.1**: サービスのグルーピングをサポートし、より包括的なサービス記述のための追加フィールドを導入。
- **v2**: 基本的なサービスメタデータとドキュメンテーション用の必要最低限のフィールドを提供する、最も初期のサポートバージョン。

各バージョンは前のバージョンを基に構築され、新しい機能を追加しながら後方互換性を維持します。ニーズとインフラストラクチャーの複雑さに最も適したバージョンを選択してください。

## バージョン比較 {#version-comparison}

以下は各バージョンでサポートされる機能一覧です。

| 機能                       | v3.0  | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| 基本的なメタデータ                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| サービスグルーピング             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| ユーザー注釈              | {{< X >}}   | {{< X >}} |           |           |
| CI パイプライン関連付け      | {{< X >}}   | {{< X >}} |           |           |
| 拡張データモデル           | {{< X >}}   |           |           |           |
| マルチオーナーシップ               | {{< X >}}   |           |           |           |
| 手動での依存関係宣言 | {{< X >}}   |           |           |           |

各バージョンごとの完全なスキーマや YAML ファイルの例など、詳細な情報については[サポートされるバージョン](#supported-versions)の各バージョンページを参照してください。

## バージョンの詳細 {#version-details}

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="Software Catalogの最新バージョンのプレビューに参加してください。" >}}
{{< /callout >}}

{{< tabs >}}
{{% tab "v3.0" %}}

### 主な特徴 {#key-features}
- **拡張データモデル**: v3.0は複数の種類のエンティティをサポートしています。システム、サービス、キュー、Datastoreなどのさまざまなコンポーネントを使用してシステムを整理できます。
- **マルチオーナーシップ**: v3.0スキーマを通じて定義された任意のオブジェクトに複数の所有者を割り当てて、複数の連絡先を指定できます。
- **強化された関係マッピング**: APMおよびUSMデータを使用すると、コンポーネント間の依存関係を自動的に検出できます。v3.0は、コンポーネントがシステム内でどのように相互作用するかの完全な概要を確保するために、自動検出されたシステムトポロジ―を補完する手動宣言をサポートしています。
- **システムメタデータの継承**: システム内のコンポーネントは、自動的にシステムのメタデータを継承します。v2.1およびv2.2のように、関連するすべてのコンポーネントのメタデータを一つずつ宣言する必要はなくなりました。
- **正確なコードの場所**: サービスのコードの場所のマッピングを追加してください。v3.0の`codeLocations`セクションでは、コードを含むリポジトリとその関連する`paths`のコードの場所を指定します。`paths`属性は、リポジトリ内のパスに一致する[globs][4]の一覧です。
- **フィルタリングされたログとイベント**: `system`のために保存されたログとイベントクエリを`logs`および`events`セクションを通じて宣言し、システムページで結果を表示します。
- **カスタムエンティティ**: サービス、システム、Datastore、キュー、APIを超えるカスタムエンティティタイプを定義します。特定のエンティティタイプに、スコープされたスコアカードとアクションを適用します。
- **(今後の) 統合**: コンポーネントに関連する情報を動的に取得するために、サードパーティツールと統合します（例：GitHubのプルリクエスト、PagerDutyのインシデント、GitLabのパイプライン）。サードパーティソースに対してスコアカードルールを報告し、作成します。
- **(今後の) 製品またはドメインでグループ化**: 製品ごとにコンポーネントを整理し、階層的なグループ化の複数の層を可能にします。

### スキーマ構造 {#schema-structure}

[Githubでの完全なスキーマ定義を確認できます][1]。

V3.0はv2.2から以下の変更を含みます:
- `schema_version`は現在`apiVersion`です。
- `kind`フィールドは新しく、コンポーネントのタイプを定義します：サービス、キュー、Datastore、システム、またはAPI。
- `dd-service`は現在`metadata.name`になりました。
- `team`は現在`owner`であり、複数のチームがいる場合は`additionalOwners`です。
- `lifecycle`、`tier`、`languages`、および`type`は現在`spec`に含まれます。
- `links`、`contacts`、`description`、および`tags`は現在メタデータに含まれます。
- `application`は強化されて独自の種類である`system`になりました。それはもはやサービス上の個別のフィールドとして存在しません。

### 例となるYAMLファイル {#example-yaml-files}

{{% collapse-content title="のコンポーネント <code>kind:system</code>" level="h4" expanded=false id="id-for-anchoring" %}}
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

{{% collapse-content title="のコンポーネント <code>kind:library</code>" level="h4" expanded=false id="id-for-anchoring" %}}
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
単一のコンポーネントが複数のシステムの一部である場合、そのコンポーネントを各システムのYAMLに指定する必要があります。例えば、Datastore`orders-postgres`がPostgresフリートとWebアプリケーションの両方のコンポーネントである場合、2つのYAMLを指定します：

Postgresフリート（`managed-postgres`）の場合、`kind:system`の定義を指定します：
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

Webアプリケーション（`shopping-cart`）のために、`kind:system`の別の定義を宣言します：
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

### 明示的・暗黙的なメタデータの継承 {#explicit-and-implicit-metadata-inheritance}

#### 明示的継承 {#explicit-inheritance}

`inheritFrom`フィールドは、`<entity_kind>:<name>`で参照されるエンティティのメタデータを継承するように取り込みパイプラインに指示します。

{{< code-block lang="yaml" filename="entity.datadog.yaml" collapsible="true" >}}
inheritFrom:<entity_kind>:<name>
{{< /code-block >}}

#### 暗黙的継承 {#implicit-inheritance}
コンポーネント（`kind:service`、`kind:datastore`、`kind:queue`、`kind:ui`）は、以下の条件の下で所属するシステムからすべてのメタデータを継承します：
- YAMLファイルに定義されたシステムは1つだけです。
- YAMLファイルに`inheritFrom:<entity_kind>:<name>`の条項が存在しません。

### v3.0への移行 {#migrating-to-v30}
v3.0は、Github、API、Terraform、Backstage、ServiceNow、UIを含む以前のバージョンと同じメタデータ作成方法をサポートしています。ただし、v3.0には新しい[APIエンドポイント][5]と新しい[Terraformリソース][6]があります。

### APIリファレンスドキュメント {#api-reference-documentation}
エンドポイント、システム、Datastore、キューなどのすべてのエンティティタイプの定義を作成、取得、削除するには、[ソフトウェアカタログAPIリファレンス][8]を参照してください。

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
- 自動検出されたサービスタイプと言語を`type`と`languages`を使用して上書きする
- サービスにCIパイプラインを関連付けるには`ci-pipeline-fingerprints`を使用します。
- `contact.type`と`link.type`のための制限の少ない検証ロジック：

### スキーマ構造 {#schema-structure-1}

[完全なスキーマはGitHubで入手可能です][1]。

YAMLの例:

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

### APIリファレンスドキュメント {#api-reference-documentation-1}

- サービス定義を作成、取得、削除するには、[サービス定義APIリファレンス][4]を参照してください。
- システム、データストア、キューなどの新しいコンポーネントタイプの定義を作成、取得、削除するには、[Software Catalog APIリファレンス][3]を参照してください。
- サービスScorecardのルールと結果を作成および更新するには、[サービスScorecard APIリファレンス][2]を参照してください。

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2.2
[2]: /ja/api/latest/service-scorecards/
[3]: /ja/api/latest/software-catalog/
[4]: /ja/api/latest/service-definition/

{{% /tab %}}

{{% tab "v2.1" %}}

### 主な特徴 {#key-features-2}
- サービスのグループ化や`application`、`tier`、`lifecycle`のためのフィールドなどの新しいUI要素
- `Application`および`Teams`は、Software Catalogでのグループ化変数として使用できます。
- `Lifecycle`フィールドは、`production`、`experimental`、または`deprecated`サービスを区別するための開発ステージを示します。
- `Tier`フィールドは、インシデントトリアージ中の優先順位付けのためにサービスの重要性を示します。

### スキーマ構造 {#schema-structure-2}

[完全なスキーマはGitHubで入手可能です][1]。

YAMLの例:

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

### APIリファレンスドキュメント {#api-reference-documentation-2}

- サービス定義を作成、取得、削除するには、[サービス定義APIリファレンス][4]を参照してください。
- システム、データストア、キューなどの新しいコンポーネントタイプの定義を作成、取得、削除するには、[Software Catalog APIリファレンス][3]を参照してください。
- サービスScorecardのルールと結果を作成および更新するには、[サービスScorecard APIリファレンス][2]を参照してください。

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

[完全なスキーマはGitHubで入手可能です][1]。

YAMLの例:

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

### APIリファレンスドキュメント {#api-reference-documentation-3}

- サービス定義を作成、取得、削除するには、[サービス定義APIリファレンス][4]を参照してください。
- システム、データストア、キューなどの新しいコンポーネントタイプの定義を作成、取得、削除するには、[Software Catalog APIリファレンス][3]を参照してください。
- サービスScorecardのルールと結果を作成および更新するには、[サービスScorecard APIリファレンス][2]を参照してください。

[1]: https://github.com/DataDog/schema/tree/main/service-catalog/v2
[2]: /ja/api/latest/service-scorecards/
[3]: /ja/api/latest/software-catalog/
[4]: /ja/api/latest/service-definition/

{{% /tab %}}

{{< /tabs >}}


## カスタム拡張機能を構築する {#build-custom-extensions}

<div class="alert alert-info">カスタム拡張機能は、すべてのスキーマバージョンで限定的に利用可能です。</div>

カスタム拡張機能を使用すると、組織特有のメタデータをエンティティに添付でき、カスタムツールやワークフローのサポートが可能になります。例えば、`extensions`フィールドを使用して、エンティティ定義にリリースノート、コンプライアンスタグ、または所有モデルを含めることができます。

Datadogは、特定の機能のための特定の拡張キーもサポートしています。これには以下が含まれます:
- `datadoghq.com/dora-metrics`: Git コミットをフィルタリングするためのソースコードパスパターンを定義し、[DORA メトリクス][21] を計算します。
- `datadoghq.com/cd-visibility`: [CD Visibility][22] において、どのコミットがデプロイメントの一部と見なされるかを制御します。

以下の例は、環境間でのリリーススケジューリングを管理するために使用されるカスタム拡張を定義しています:
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

Datadog は定義向けに [JSON スキーマ][18] を提供しているため、[対応する IDE][19] 上で定義を編集する際、オートコンプリートや検証などの機能が利用できます。

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode が修正すべき問題を認識しています。" style="width:100%;" >}}

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