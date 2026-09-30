---
aliases:
- /ja/software_catalog/set_up/new_to_datadog
- /ja/tracing/software_catalog/setup
- /ja/software_catalog/setup
- /ja/tracing/service_catalog/setup
- /ja/service_catalog/setup
- /ja/software_catalog/create_entries/
- /ja/software_catalog/enrich_default_catalog/create_entries
- /ja/service_catalog/create_entries/
- /ja/service_catalog/enrich_default_catalog/create_entries
- /ja/api_catalog/add_entries
- /ja/service_catalog/customize/create_entries/
- /ja/software_catalog/customize/create_entries
disable_toc: false
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 外部サイト
  text: Terraform でサービス定義を作成・管理する
- link: /integrations/github
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: /api/latest/service-definition/
  tag: API
  text: Service Definition API について
- link: /api/latest/software-catalog/
  tag: API
  text: Software Catalog API について
title: エンティティを作成
---

## 概要

Software Catalog に [エンティティ定義][13] を追加する方法は次のとおりです:
- Datadog UI から手動で定義を作成する。
- 定義をコードで管理し、GitHub や Terraform などを使って Datadog API 経由のインポートを自動化する。

## Datadog UI から

Datadog UI でエンティティ定義を作成するには:

1. [Software Catalog Setup & Config][3] ページに移動します。
1. **Create a New Entry** をクリックします。
1. オーナー情報やドキュメントへのリンクなどのメタデータを含め、サービスの詳細を入力します。
1. (任意) **YAML** または **JSON** に切り替えると、生成されたコードと cURL コマンドを確認できます。コード エディターでは、Datadog が不正なデータを自動的に検出してハイライトします。

   {{< img src="tracing/software_catalog/software_catalog_definition_yaml.png" alt="サンプルのサービス定義を表示しているサービス メタデータ エディター。" >}}

1. **Save Entry** をクリックするか、提示された cURL コマンドを実行してメタデータを送信します。

   **注**: エントリーを保存するには [Software Catalog Write 権限][2] が必要です。


## 自動化で行う場合

GitHub や Terraform、Datadog Software Metadata Provider、または Datadog Service Definition API を使ってインポートを自動化するには:

### エンティティ定義を作成

1. エンティティを定義するために `service.datadog.yaml` または `entity.datadog.yaml` を作成します (Datadog はどちらのファイル名も受け付けます)。
1. エンティティ名は `dd-service` (スキーマ バージョン v2.2 以前) または `name` (スキーマ バージョン v3.0 以降) フィールドに指定します。

   例:

   {{< code-block lang="yaml" filename="service.datadog.yaml" collapsible="true" >}}
    schema-version: v2.2
    dd-service: my-unmonitored-cron-job
    team: e-commerce
    lifecycle: production
    application: shopping-app
    description: important cron job for shopist backend
    tier: "2"
    type: web
    contacts:
    - type: slack
    contact: https://datadogincidents.slack.com/archives/XXXXX
    links:
    - name: Common Operations
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    - name: Disabling Deployments
    type: runbook
    url: https://datadoghq.atlassian.net/wiki/
    tags: []
    integrations:
    pagerduty:
    service-url: https://datadog.pagerduty.com/service-directory/XXXXXXX
    External Resources (Optional)
   {{< /code-block >}}

1. (任意) 1 つの YAML ファイルに複数のサービスを登録する場合は、各定義を 3 つのダッシュ (`---`) で区切ります。

### 定義をインポート

定義は次のいずれかの方法でインポートします:

1. **Terraform**: [Terraform リソース][4] として定義を作成し、インポートします。

   **注**: 自動パイプライン経由で Software Catalog のサービスを作成・管理するには、[Datadog Provider][5] v3.16.0 以降が必要です。

1. **Datadog APIs**: [Service Definition API][7] (スキーマ v2.x 用) または [Software Catalog API][8] (スキーマ v3+ 用) を使って定義をインポートします。どちらもオープン ソースの GitHub Action ソリューションです。
1. **GitHub**: [Datadog GitHub integration](#github-integration) を設定して、定義の管理とインポートを行います。

#### GitHub インテグレーション

[GitHub インテグレーション][9] を設定すると、Software Catalog でサービスの定義を確認している場所から、GitHub 上の保存場所 (編集してコミットできる場所) へ直接リンクできます。Datadog は読み取り権限のある各リポジトリを対象に、`service.datadog.yaml` と `entity.datadog.yaml` ファイルをスキャンします。

GitHub インテグレーションをインストールするには:
1. [インテグレーション タイル][10] に移動します。
2. **Repo Configuration** タブで **Link GitHub Account** をクリックします。

定義に対して GitHub インテグレーションを設定すると、サービスの **Definition** タブに **Edit in GitHub** ボタンが表示され、変更をコミットするために GitHub へ移動できます。

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="Software Catalog のサービスの Definition タブに Edit in GitHub ボタンが表示される" style="width:90%;" >}}

リポジトリ内の YAML ファイルを更新すると、その変更は Software Catalog に反映されます。複数の YAML ドキュメントを 1 つの YAML ファイルに含めれば、複数サービスをまとめて登録できます。各ドキュメントは 3 つのダッシュ (`---`) で区切ってください。

意図しない上書きを防ぐため、定義ファイルの作成・更新は GitHub インテグレーションまたは [Definition API エンドポイント][11] のいずれかで行ってください。GitHub と API の両方から同じサービスを更新すると、予期せぬ上書きが発生する可能性があります。

##### インテグレーションの検証

Datadog の GitHub インテグレーションが取り込んだサービス定義を検証するには、サービス更新時やエラー発生時のイベントを確認します。検証エラーを [Event Management][12] で確認する場合は、`source:software_catalog` と `status:error` でフィルターし、必要に応じて期間を調整してください。

{{< img src="tracing/software_catalog/github_error_event.png" alt="サービス定義のエラー メッセージを表示する GitHub イベント。" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/internal_developer_portal/software_catalog/set_up#role-based-access-and-permissions
[3]: https://app.datadoghq.com/software/settings/get-started
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest
[7]: /ja/api/latest/service-definition/
[8]: /ja/api/latest/software-catalog/
[9]: /ja/integrations/github/
[10]: https://app.datadoghq.com/integrations/github
[11]: /ja/api/latest/software-catalog/#create-or-update-entities
[12]: https://app.datadoghq.com/event/explorer
[13]: /ja/internal_developer_portal/software_catalog/entity_model