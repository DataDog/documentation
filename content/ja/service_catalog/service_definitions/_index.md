---
aliases:
- /ja/service_catalog/adding_metadata
- /ja/tracing/service_catalog/service_metadata_structure
- /ja/tracing/service_catalog/adding_metadata
- /ja/service_catalog/add_metadata
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
title: 定義およびサポートされるバージョン
---

## メタデータ構造およびサポートされるバージョン

Service Catalog はサービスに関する関連メタデータを保存・表示するため、定義スキーマを使用します。これらのスキーマには、妥当な値のみ受け入れるための検証ルールが組み込まれています。選択したサービスに対して、Service Catalog のサイドパネル内にある **Definition** タブで警告を確認できます。

## サポートされるバージョン

Datadog は以下の 4 つの定義スキーマバージョンをサポートしています。

- [v3.0 (プレビュー版)][1]: 拡張されたデータモデル、マルチオーナーシップサポート、手動の依存関係宣言、複雑なインフラ向けの拡張機能を備えた最新バージョン
- [v2.2][2]: カスタムメタデータ用のユーザー注釈、およびサービスをビルドプロセスと関連付ける CI パイプラインサポートを提供
- [v2.1][3]: サービスのグルーピングをサポートし、より包括的なサービス記述のための追加フィールドを導入
- [v2][4]: 基本的なサービスメタデータとドキュメンテーション用の必要最低限のフィールドを提供する、最も初期のサポートバージョン

各バージョンは前のバージョンを拡張し、新機能を追加しながら後方互換性を維持しています。自分のニーズやインフラの複雑さに応じて、最適なバージョンを選択してください。

## バージョン比較

以下は各バージョンでサポートされる機能一覧です。

| 機能                       | v3.0 (プレビュー) | v2.2      | v2.1      | v2.0        |
|-------------------------------|-------------|-----------|-----------|-----------|
| 基本的なメタデータ                | {{< X >}}   | {{< X >}} | {{< X >}} | {{< X >}} |
| サービスグルーピング             | {{< X >}}   | {{< X >}} | {{< X >}} |           |
| ユーザー注釈              | {{< X >}}   | {{< X >}} |           |           |
| CI パイプライン関連付け      | {{< X >}}   | {{< X >}} |           |           |
| 拡張データモデル           | {{< X >}}   |           |           |           |
| マルチオーナーシップ               | {{< X >}}   |           |           |           |
| 手動での依存関係宣言 | {{< X >}}   |           |           |           |

各バージョンごとの完全なスキーマや YAML ファイルの例など、詳細な情報については[サポートされるバージョン](#supported-versions)の各バージョンページを参照してください。

## Service Catalog にメタデータを追加する

### Datadog UI からメタデータを追加する

1. [Service Catalog][5] ページで **Setup & Config** をクリックします。
2. **Create New Entry** をクリックします。
3. メタデータを追加するサービスを指定します。
4. Team、On-call、Contacts、Documentation、Code repo、Other links の詳細を入力します。
5. **YAML** または **JSON** に切り替えて、生成されたコードと cURL コマンドを確認します。
6. [Service Catalog Write][12] 権限がある場合、**Save Entry** をクリックするか、提供される cURL コマンドを実行してメタデータを送信できます。

### 自動化によるメタデータ追加

#### GitHub に定義を保存・編集

[GitHub integration][6] を構成すると、Service Catalog 上で表示するサービス定義から、それが保管・編集されている GitHub リポジトリへ直接リンクできます。Datadog は読み取り権限を有するリポジトリのルートにある `service.datadog.yaml` ファイルをスキャンします。

GitHub インテグレーションをインストールするには
1. [インテグレーションタイル][7]に移動します。
2. **Repo Configuration** タブで **Link GitHub Account** をクリックします。

GitHub インテグレーションが定義に適用されると、サービスの **Definition** タブに **Edit in GitHub** ボタンが表示され、クリックすると GitHub 上で変更をコミットする画面へ移動します。

{{< img src="tracing/service_catalog/svc_cat_contextual_link.png" alt="Service Catalog の Definition タブに表示される Edit in GitHub ボタン" style="width:90%;" >}}

リポジトリの YAML ファイルを更新すると、変更は Service Catalog に反映されます。1 つの YAML ファイルで複数のサービスを登録する場合は、複数の YAML ドキュメントを作成し、`---` で区切ってください。

誤った上書きを防ぐため、定義ファイルを作成・変更する際は GitHub インテグレーションまたは [Definition API エンドポイント][11]のいずれか片方を使用してください。GitHub と API の両方で同一サービスを更新すると、意図しない上書きが発生する可能性があります。

#### Terraform による定義更新の自動化

Service Catalog は定義を [Terraform resource][8] として提供します。自動化パイプラインを通じて Service Catalog 上でサービスを作成・管理するには、[Datadog Provider][9] v3.16.0 以上が必要です。

#### オープンソースのメタデータプロバイダー

GitHub インテグレーションや Terraform の代替手段として、[Datadog Service Catalog Metadata Provider][10] と呼ばれるオープンソースの GitHub Action ソリューションを利用できます。

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

{{< img src="tracing/service_catalog/ide_plugin.png" alt="VSCode が修正箇所を認識する様子" style="width:100%;" >}}

[Datadog definitions 用の JSON スキーマ][15]はオープンソースの [Schema Store][14] に登録されています。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/service_catalog/service_definitions/v3-0
[2]: /ja/service_catalog/service_definitions/v2-2
[3]: /ja/service_catalog/service_definitions/v2-1
[4]: /ja/service_catalog/service_definitions/v2-0
[5]: https://app.datadoghq.com/services
[6]: /ja/integrations/github/
[7]: https://app.datadoghq.com/integrations/github
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/
[10]: https://github.com/marketplace/actions/datadog-service-catalog-metadata-provider
[11]: /ja/tracing/service_catalog/service_definition_api/
[12]: https://app.datadoghq.com/personal-settings/profile
[13]: http://json-schema.org/
[14]: https://www.schemastore.org/json/
[15]: https://raw.githubusercontent.com/DataDog/schema/refs/heads/main/service-catalog/service.schema.json