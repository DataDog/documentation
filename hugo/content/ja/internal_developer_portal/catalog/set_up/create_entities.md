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
- /ja/internal_developer_portal/software_catalog/set_up/create_entities
description: Datadog UI を使用するか、GitHub、GitLab、Terraform、または Datadog API を使用したインポートを自動化することで、Catalog
  にエンティティ定義を追加します。
disable_toc: false
further_reading:
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
  tag: 外部サイト
  text: Terraform によるサービス定義の作成と管理
- link: /integrations/github
  tag: ドキュメント
  text: GitHub インテグレーションについて
- link: /integrations/gitlab-source-code/
  tag: ドキュメント
  text: GitLab インテグレーションについて
- link: /api/latest/service-definition/
  tag: API
  text: サービス定義 API について
- link: /api/latest/software-catalog/
  tag: API
  text: Catalog API について
title: エンティティを作成
---
## 概要{#overview}

[エンティティ定義][13]を Catalog に追加するには、次の方法があります。
- Datadog UI を使用して手動で定義を作成します。
- コードで定義を管理し、GitHub、GitLab、Terraform、または Datadog API を使用してインポートを自動化します。

## Datadog UI 経由 {#through-the-datadog-ui}

Catalog は、エンティティ定義を作成するためのガイド付きワークフローを提供します。**Kind** ドロップダウンからエンティティタイプ (Service、API、System など) を選択すると、そのタイプに固有のメタデータフィールドとオプションがフォームに表示されます。たとえば、**API** を選択すると OpenAPI または gRPC 仕様をアップロードするためのフィールドが表示され、**Service** を選択するとサービスタイプとライフサイクルを定義するためのフィールドが表示されます。

エンティティ定義を作成するには、

1. [Catalog Setup & Config][3] ページに移動します。
1. **Create a New Entry** をクリックします。
1. **Kind** ドロップダウンからエンティティタイプを選択します。
1. 所有権や参照リンクなどのメタデータフィールドに入力します。
1. (オプション) **YAML** または **JSON** に切り替えて、生成されたコードと cURL コマンドを確認します。コードエディターでは、Datadog が無効なデータを自動的に検出してフラグを立てます。

   {{< img src="tracing/software_catalog/software_catalog_definition_editor.png" alt="サンプルサービス定義を表示するサービスメタデータエディター。" >}}

1. **Save Entry** をクリックするか、提供された cURL コマンドを実行してメタデータを送信します。

   **注**: エントリを保存するには、[Service Catalog Write permission][2] が必要です。


## 自動化経由 {#through-automation}

GitHub、GitLab、Terraform、Datadog Software Metadata Provider、または Datadog Service Definition API を使用したインポートを自動化するには、

### エンティティ定義を作成する {#create-the-entity-definition}

1. `service.datadog.yaml` または `entity.datadog.yaml` を作成してエンティティを定義します (Datadog は両方のファイル名を受け入れます)。
1. エンティティの名前を `dd-service` (スキーマバージョン v2.2 以前) または `name` (スキーマバージョン v3.0 以降) フィールドで指定します。

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

1. (オプション) 3 つのダッシュ (`---`) で各定義を区切ることで、1 つの YAML ファイルに複数のサービスを登録できます。

### 定義をインポートする {#import-the-definition}

次のいずれかの方法で定義をインポートします。

1. **Terraform**: [Terraform resource][4] として定義を作成およびインポートします。
   
   **注**: 自動化パイプラインを通じて Catalog 内でサービスの作成および管理を行うには、[Datadog Provider][5] v3.16.0 以降が必要です。

1. **Datadog API**: [Service Definition API][7] (スキーマ v2.x 用) または [Catalog API][8] (スキーマ v3+ 用) を使用して定義をインポートします。これらはどちらもオープンソースの GitHub Action ソリューションです。
1. **GitHub または GitLab**: 定義を管理およびインポートするには、[GitHub インテグレーション][9]または [GitLab インテグレーション][14]を構成します。

#### GitHub および GitLab のインテグレーション {#github-and-gitlab-integrations}

リポジトリからエンティティ定義をインポートするには、[GitHub インテグレーション][9]または [GitLab インテグレーション][14]を構成します。Datadog は、読み取り権限を持つ各リポジトリ全体の `service.datadog.yaml` および `entity.datadog.yaml` ファイルをスキャンします。

リポジトリの YAML ファイルを更新すると、変更内容が Catalog に反映されます。複数の YAML ドキュメントを作成することで、1 つの YAML ファイルに複数のサービスを登録できます。各ドキュメントは 3 つのダッシュ (`---`) で区切ります。

誤った上書きを防ぐため、定義ファイルはソースコードインテグレーション (GitHub または GitLab) または [Definition API endpoints][11] を使用して作成および変更します。同じサービスをソースコードインテグレーションと API の両方で更新すると、意図しない上書きが発生する可能性があります。

##### GitHub インテグレーション {#github-integration}

GitHub インテグレーションをインストールするには
1. [インテグレーションタイル][10]に移動します。
2. **Repo Configuration** タブで **Link GitHub Account** をクリックします。

定義に対して GitHub インテグレーションが設定されると、サービスの **Definition** タブに **Edit in GitHub** ボタンが表示され、変更をコミットするために GitHub へ移動できるようになります。

{{< img src="tracing/software_catalog/svc_cat_contextual_link.png" alt="Catalog 内のサービスの Definition タブに Edit in GitHub ボタンが表示されます。" style="width:90%;" >}}

##### GitLab インテグレーション {#gitlab-integration}

GitLab リポジトリを接続するには、[GitLab インテグレーションタイル][15]で利用可能な [GitLab インテグレーション][14]のセットアップ手順に従います。`service.datadog.yaml` または `entity.datadog.yaml` ファイルを、Datadog が読み取り権限を持つリポジトリに保存します。

##### インテグレーションの検証 {#integration-validation}

Datadog の GitHub インテグレーションによって取り込まれたサービス定義を検証するには、サービスが更新されたときやエラーが発生したときにイベントを表示します。[Event Management][12] で検証エラーを表示するには、`source:software_catalog` と `status:error` でフィルタリングします。必要に応じて期間を調整します。

{{< img src="tracing/software_catalog/github_error_event.png" alt="サービス定義からのエラーメッセージを示す GitHub イベント。" >}}

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ja/internal_developer_portal/catalog/set_up#configure-role-based-access-and-permissions
[3]: https://app.datadoghq.com/software/settings/get-started
[4]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/service_definition_yaml
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest
[7]: /ja/api/latest/service-definition/
[8]: /ja/api/latest/software-catalog/
[9]: /ja/integrations/github/
[10]: https://app.datadoghq.com/integrations/github
[11]: /ja/api/latest/software-catalog/#create-or-update-entities
[12]: https://app.datadoghq.com/event/explorer
[13]: /ja/internal_developer_portal/catalog/entity_model
[14]: /ja/integrations/gitlab-source-code/
[15]: https://app.datadoghq.com/integrations/gitlab-source-code/