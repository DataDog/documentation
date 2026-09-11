---
aliases:
- /ja/software_catalog/adding_metadata
- /ja/tracing/software_catalog/service_metadata_structure
- /ja/tracing/software_catalog/adding_metadata
- /ja/software_catalog/add_metadata
- /ja/service_catalog/adding_metadata
- /ja/tracing/service_catalog/service_metadata_structure
- /ja/tracing/service_catalog/adding_metadata
- /ja/service_catalog/add_metadata
- /ja/service_catalog/service_definitions
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 外部サイト
  text: Terraform を用いた定義の作成および管理
- link: /api/latest/service-definition/
  tag: API
  text: Definition API について
- link: /integrations/github
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: https://www.datadoghq.com/blog/service-catalog-backstage-yaml/
  tag: ブログ
  text: Backstage の YAML ファイルを Datadog にインポート
- link: https://www.datadoghq.com/blog/software-catalog/
  tag: ブログ
  text: Software Catalog で開発者体験とコラボレーションを向上させる
title: 定義およびサポートされるバージョン
---

## メタデータ構造およびサポートされるバージョン

Software Catalog は、サービスに関する関連メタ データを保存・表示するために定義スキーマを使用します。これらのスキーマには、有効な値のみが受け入れられるように検証ルールが組み込まれています。選択したサービスの Software Catalog サイド パネルの **Definition** タブで、警告を確認できます。

{{< callout url="https://forms.gle/fwzarcSww6By7tn39" d_target="#signupModal" btn_hidden="false" header="Opt in to the Preview for the latest version of Software Catalog." >}}
{{< /callout >}}

## サポートされるバージョン

Datadog は以下の 4 つの定義スキーマバージョンをサポートしています。

- [v3.0][1]: 拡張されたデータ モデル、マルチ オーナーシップのサポート、依存関係の手動宣言、複雑なインフラ向けに強化された機能を備えた最新バージョン
- [v2.2][2]: カスタムメタデータ用のユーザー注釈、およびサービスをビルドプロセスと関連付ける CI パイプラインサポートを提供
- [v2.1][3]: サービスのグルーピングをサポートし、より包括的なサービス記述のための追加フィールドを導入
- [v2][4]: 基本的なサービスメタデータとドキュメンテーション用の必要最低限のフィールドを提供する、最も初期のサポートバージョン

各バージョンは前のバージョンを拡張し、新機能を追加しながら後方互換性を維持しています。自分のニーズやインフラの複雑さに応じて、最適なバージョンを選択してください。

## バージョン比較

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

## Software Catalog にメタ データを追加する

### Datadog UI からメタデータを追加する

1. [Software Catalog][5] ページで **Setup & Config** をクリックします。
2. **Create New Entry** をクリックします。
3. メタデータを追加するサービスを指定します。
4. Team、On-call、Contacts、Documentation、Code repo、Other links の詳細を入力します。
5. **YAML** または **JSON** に切り替えて、生成されたコードと cURL コマンドを確認します。
6. [Software Catalog Write][12] 権限がある場合、**Save Entry** をクリックするか、提供されている cURL コマンドを実行してメタ データを送信できます。

### 自動化によるメタデータ追加

#### GitHub に定義を保存・編集

[GitHub integration][6] を構成すると、Software Catalog 上で表示しているサービス定義から、保存・編集されている GitHub リポジトリへ直接リンクできます。Datadog は読み取り権限のある各リポジトリ内の `service.datadog.yaml` と `entity.datadog.yaml` をスキャンします。

GitHub インテグレーションをインストールするには
1. [インテグレーションタイル][7]に移動します。
2. **Repo Configuration** タブで **Link GitHub Account** をクリックします。

GitHub インテグレーションが定義に適用されると、サービスの **Definition** タブに **Edit in GitHub** ボタンが表示され、クリックすると GitHub 上で変更をコミットする画面へ移動します。

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="Software Catalog 内のサービスの Definition タブに表示される Edit in GitHub ボタン" style="width:90%;" >}}

リポジトリの YAML ファイルを更新すると、変更が Software Catalog に反映されます。1 つの YAML ファイルで複数のサービスを登録する場合は、複数の YAML ドキュメントを作成し、`---` で区切ってください。

誤った上書きを防ぐため、定義ファイルを作成・変更する際は GitHub インテグレーションまたは [Definition API エンドポイント][11]のいずれか片方を使用してください。GitHub と API の両方で同一サービスを更新すると、意図しない上書きが発生する可能性があります。

#### Terraform による定義更新の自動化

Software Catalog の定義は [Terraform resource][8] として提供されます。自動化パイプライン経由で Software Catalog 上のサービスを作成・管理するには、[Datadog Provider][9] v3.16.0 以降が必要です。

#### オープンソースのメタデータプロバイダー

GitHub インテグレーションや Terraform の代替手段として、[Datadog Software Catalog Metadata Provider][10] というオープン ソースの GitHub アクションを利用できます。

### エンドポイントにメタ データを追加する

Datadog の UI または [API][16] から API にメタ データを追加できます。あるいは、[GitHub インテグレーション](#store-and-edit-definitions-in-github) や [Terraform][17] を用いた自動化パイプラインでも追加できます。

`kind: api` を設定し、`owner` フィールドを指定すると、[メタ データ スキーマ v3.0][1] を OpenAPI 定義と組み合わせられます。

```yaml
apiVersion: v3
kind: api
metadata:
  name: API Name
  description: API Description 
  displayName: API Name
  owner: dd-team
spec:
  type: openapi
  interface:
    definition:
      info:
        title: API Name
      openapi: 3.0.2
      paths:
        /api/v2/customers/{id}:
          get:
            summary: get customer information
            operationId: getCustomerInfo
            tags:
              - public
              - important
            parameters:
              - in: path
                name: id
            responses:
              '200':
                description: Successful operation
                content:
                  application/vnd.api+json:
                    schema:
                      type: object
                      properties:
                        data:
                          type: array
                          description: Contains customer information
              '400':
                description: Invalid arguments
              '401':
                description: Unauthorized operation
              '500':
                description: Internal server error
```

## カスタム拡張機能を構築する

<div class="alert alert-info">カスタム拡張機能は Limited Availability です。</div>

`extensions` フィールドは v2.0 を含むすべてのバージョンでサポートされています。このカスタムフィールドを導入プロセスに組み込み、ベストプラクティスを標準化・コード化することが可能です。

{{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
schema-version: v2.2
dd-service: web-store
team: shopist
...
extensions:
  shopist.com/release-scheduler:
    release-manager:
      slack: "release-train-shopist"
      schedule: "* * * * *"
      env:
        - name: "staging"
          ci_pipeline: "//domains/examples/apps/hello-joe/config/k8s:release-staging"
          branch: "hello-joe/staging"
          schedule: "* * * * 1"
{{< /code-block >}}

## IDE プラグイン

Datadog は定義向けに [JSON Schema][13] を提供しているため、[対応する IDE][14] 上で定義を編集する際、オートコンプリートや検証などの機能が利用できます。

{{< img src="tracing/software_catalog/ide_plugin.png" alt="VSCode が修正が必要な問題を認識している様子" style="width:100%;" >}}

[Datadog definitions 用の JSON スキーマ][15]はオープンソースの [Schema Store][14] に登録されています。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/software_catalog/service_definitions/v3-0
[2]: /ja/software_catalog/service_definitions/v2-2
[3]: /ja/software_catalog/service_definitions/v2-1
[4]: /ja/software_catalog/service_definitions/v2-0
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