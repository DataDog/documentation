---
aliases:
- /ja/continuous_integration/dora_metrics/setup/
- /ja/continuous_integration/dora_metrics/setup/deployments
- /ja/dora_metrics/setup/deployments
- /ja/dora_metrics/deployments/apm
- /ja/dora_metrics/deployments/deployment_api
- /ja/dora_metrics/deployments
- /ja/dora_metrics/setup/
description: APM デプロイ追跡、API、CLI など、DORA Metrics のデプロイイベントデータソースを設定します。
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: ドキュメント
  text: DORA Metrics について
- link: /delivery_performance/dora_metrics/calculation/
  tag: ドキュメント
  text: DORA Metrics の計算方法について
- link: /delivery_performance/dora_metrics/change_failure_detection/
  tag: ドキュメント
  text: 変更失敗検出について
- link: /internal_developer_portal/catalog/
  tag: ドキュメント
  text: カタログについて
- link: https://github.com/DataDog/datadog-ci
  tag: ソースコード
  text: datadog-ci CLI ツールについて
title: DORA Metrics のセットアップ
---
## 概要 {#overview}

DORA Metrics は、デプロイイベントを使用してソフトウェアデリバリーパフォーマンスを追跡および測定します。これらのイベントは、デプロイ頻度、変更リードタイム、変更障害率、復旧時間の 4 つの主要な DORA Metrics を支えています。

DORA Metrics の使用を開始するには、次の手順に従ってください。

1. **[Configure a deployment data source](#configure-a-deployment-data-source)**: デプロイイベントを Datadog に送信する方法を選択します。APM デプロイ追跡または DORA Metrics API/CLI を介して送信します。

2. **[Enrich deployments with commit information](#enrich-deployments-with-commit-information)**: デプロイイベントに Git メタデータ (リポジトリ URL とコミット SHA) を追加します。また、リポジトリを Datadog に同期して、変更リードタイム計算を有効化します。

3. **[Customize Change Failure Detection](#customize-change-failure-detection)**: DORA Metrics は、ロールバック (以前のバージョンを再デプロイする) を通じて失敗したデプロイを自動的に検出し、リバート PR やホットフィックスラベルなどの一般的なロールフォワードパターン用のデフォルトルールを備えています。これらのルールをカスタマイズして、ユーザーのチームの特定のワークフローや修復パターンに合わせることができます。

構成されると、デプロイイベントは、チーム、サービス、環境、および [custom tags](#custom-tags) でフィルタリングされたパフォーマンスデータを、自動的にユーザーの [DORA Metrics ダッシュボード][1] に反映します。

### 制限事項 {#limitations}

- データソースオプション (APM デプロイ追跡など) を最初に選択すると、DORA Metrics はその時点からデータを反映し始めます。ソース A からソース B に切り替え、再びソース A に戻ると、ソース A の履歴データは最初に選択された時点以降のもののみ利用可能です。
-  同じサービスに対するデプロイは、同じ秒には発生しません。

##  デプロイデータソースを構成する {#configure-a-deployment-data-source}

DORA Metrics は、デプロイイベントのために以下のデータソースをサポートします。

{{< tabs >}}
{{% tab "APM デプロイの追跡" %}}

[APM デプロイ追跡][1] は、DORA Metrics のデプロイのデータソースとして構成できます。

### 要件 {#requirements}

- {{< ui >}}APM Deployment Tracking{{< /ui >}} が [DORA 設定][2] の {{< ui >}}Deployments{{< /ui >}} イベントデータソースとして有効になっていること。
- サービスに[メタデータ][3]がカタログで定義されています。
- サービスの [unified service tagging][4] が有効になっていること。デプロイは `version` タグを使用して識別されます。

APM によって追跡されるサービスデプロイが変更リードタイムに確実に寄与するための詳細については、[Enrich deployments with commit information](#enrich-deployments-with-commit-information) を参照してください。

[1]: /ja/tracing/services/deployment_tracking
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: /ja/internal_developer_portal/catalog/entity_model/
[4]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes

{{% /tab %}}
{{% tab "API または CLI" %}}

独自のデプロイイベントを送信するには、[DORA Metrics API][1] または [`datadog-ci dora deployment`][2] コマンドを使用します。

### 要件 {#requirements-1}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} は、[DORA 設定][3] において {{< ui >}}Deployments{{< /ui >}} イベントデータソースとして有効になっていること。
- 必須の属性は以下のとおりです。
  - `started_at`: デプロイの開始時刻
  - `finished_at`: デプロイの終了時刻
  - `service`: デプロイされたサービス提供されたサービスが、[カタログ][4]にメタデータがセットアップ ([メタデータの追加][5]を参照) されて登録されている場合、サービスの `team` が自動的に取得され、すべてのメトリクスに関連付けられます。

オプションで以下の属性をデプロイイベントに追加できます。

- `repository_url`: サービスのソースコードリポジトリ変更リードタイムを計算するために必要です。
- `commit_sha`: デプロイに関連付けられた HEAD コミットの SHA です。変更リードタイムを計算するために必要です。
- `team`: サービスに自動的に見つかったものとは異なる `team` にデプロイを関連付けます。
- `env`: [DORA Metrics][6] ページで環境ごとに DORA Metrics をフィルタリングします。
- `id`: デプロイを特定します。この属性はユーザーが生成するもので、指定しない場合は、Datadog が生成する UUID がエンドポイントによって返されます。
- `version`: デプロイのバージョンです。
- `custom_tags`: [DORA Metrics][6] ページでイベントをフィルタリングする際に使用可能な `key:value` 形式のタグです。


### API (cURL) の例 {#api-curl-example}

完全な仕様および追加のコードサンプルについては、[DORA Metrics API リファレンスドキュメント][1] をご覧ください。

次の例では、URL の `<DD_SITE>` を以下に置き換えます。 {{< region-param key="dd_site" code="true" >}} また `${DD_API_KEY}` をユーザーの [Datadog API キー][7] に置き換えます。

```shell
  curl -X POST "https://api.<DD_SITE>/api/v2/dora/deployment" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "service": "shopist",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "team": "backend",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

### CLI の例 {#cli-example}

[`datadog-ci`][2] CLI ツールは、ユーザーの Continuous Integration 環境内でデプロイイベントを送信するためのショートカットを提供します。

次の例では、`DD_SITE` 環境変数を以下に設定します。 {{< region-param key="dd_site" code="true" >}} また `DD_API_KEY` 環境変数をユーザーの [Datadog API キー][7] に設定します。

```shell
export DD_SITE="<DD_SITE>"
export DD_API_KEY="<DD_API_KEY>"

export deploy_start=`date +%s`
./your-deploy-script.sh
datadog-ci dora deployment --service shopist --env prod \
    --started-at $deploy_start --finished-at `date +%s` \
    --version v1.12.07 --custom-tags department:engineering \
    --custom-tags app_type:backend \
    --git-repository-url "https://github.com/organization/example-repository" \
    --git-commit-sha 66adc9350f2cc9b250b69abddab733dd55e1a588
```

デプロイの終了時刻は、`--finished-at` で指定されない場合、自動的に現在の時刻に設定されます。

デプロイ CI ジョブがデプロイされている正確に同じ Git リビジョンで実行されている場合、`git-repository-url` と `git-commit-sha` は省略可能であり、CI コンテキストから自動的に推測されます。

`--skip-git` オプションを提供することで、リポジトリの URL とコミット SHA の送信を無効にできます。このオプションが追加されると、変更リードタイムメトリクスは利用できなくなります。

[1]: /ja/api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://github.com/DataDog/datadog-ci?tab=readme-ov-file#how-to-install-the-cli
[3]: https://app.datadoghq.com/ci/settings/dora
[4]: /ja/internal_developer_portal/catalog/
[5]: /ja/internal_developer_portal/catalog/entity_model/
[6]: https://app.datadoghq.com/ci/dora
[7]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

### カスタムタグ {#custom-tags}

デプロイに関連付けられたサービスが [カタログ][2]にメタデータがセットアップ ([メタデータの追加][3]を参照) されて登録されている場合、サービスの `languages` と任意の `tags` が自動的に取得され、イベントに関連付けられます。

## コミット情報でデプロイを強化する {#enrich-deployments-with-commit-information}

変更リードタイムの計算を有効化するには、デプロイのために Git 情報を構成し、リポジトリのメタデータを Datadog と同期させます。こうすることにより、DORA Metrics はコミットが作成されてからデプロイされるまでに要する時間を追跡できます。

### デプロイに Git 情報を添付する {#attach-git-information-to-deployments}

Datadog は、デプロイのヘッドコミット SHA の Git 情報 (リポジトリ URL とコミット SHA) へのアクセスを必要とします。要件は、デプロイデータソースによって異なります。

{{< tabs >}}
{{% tab "APM デプロイの追跡" %}}

APM デプロイ追跡を通じて特定されたデプロイの場合、トレース形式のアプリケーションテレメトリに Git 情報がタグ付けされていることを確認してください。

- [APM で][1] Git のタグ付けを有効化します。または、[ソースコード統合のドキュメント][2] を参照してください。

**注**: APM で追跡されたデプロイの場合、変更リードタイムはコミットの作成から新しいバージョンでコミットが最初に観測されるまでの時間として計算されます。`Deploy Time` メトリクスは利用できません。

[1]: https://app.datadoghq.com/source-code/setup/apm
[2]: /ja/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information

{{% /tab %}}
{{% tab "API または CLI" %}}

DORA Metrics API または `datadog-ci dora deployment` コマンドで追跡されたデプロイの場合、次のことを確認してください：

- 属性 `repository_url` と `commit_sha` が、デプロイイベントのペイロードに含まれています。

{{% /tab %}}
{{< /tabs >}}

### リポジトリのメタデータを Datadog と同期する {#synchronize-repository-metadata-to-datadog}

Datadog は、あるデプロイとその前のデプロイの間にデプロイされたすべてのコミットを取得するために、リポジトリのメタデータ (コミット、ファイルパス) へのアクセスを必要とします。ユーザーの Git プロバイダーに基づいて同期方法を選択してください。

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request"> で実行されている GitHub ワークフロー<code>pull_request</code> トリガー </a> は、現在 GitHub 統合ではサポート対象外です。
このトリガーを使用している場合は、 <code>pull_request</code> の代替方法を使用してください。
</div>

[GitHub インテグレーション][1] がまだインストールされていない場合は、[GitHub インテグレーションタイル][2] にインストールしてください。

GitHub アプリケーションの構成時:
1. {{< ui >}}Contents{{< /ui >}} と {{< ui >}}Pull Requests{{< /ui >}} に対して、少なくとも {{< ui >}}Read{{< /ui >}} リポジトリ権限を選択してください。
2. 少なくとも {{< ui >}}Push{{< /ui >}}、{{< ui >}}PullRequest{{< /ui >}}、および {{< ui >}}PullRequestReview{{< /ui >}} の各イベントに登録してください。

セットアップが有効であることを確認するには、[GitHub インテグレーションタイル][2] で GitHub アプリケーションを選択し、{{< ui >}}Datadog Features{{< /ui >}} テーブルが {{< ui >}}Pull Request Information{{< /ui >}} のすべての要件を満たしていることを確認してください。

[1]: /ja/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
[GitLab ソースコードインテグレーション][1] がまだインストールされていない場合は、[GitLab ソースコードインテグレーションタイル][2] にインストールしてください。

**注**: サービスアカウントの個人アクセストークンのスコープは、少なくとも`read_api` である必要があります。

### GitLab グループおよびサブグループの取り扱い {#handling-gitlab-groups-and-subgroups}

リポジトリが [**GitLab グループまたはサブグループ**][3] の下に整理されている場合 (たとえば、
`https://gitlab.com/my-org/group(/subgroup)/repo`)、
自動サービスパス検出は、GitLab のネストされたグループ構造が原因で正しく解決されない可能性があります。

DORA Metrics がサービスのソースコードパスを確実に正しく処理するように、
サービス定義に次の構成を使用できます。

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      # All paths relative to the repository URL provided with the deployment
      - **
      # or specific paths related to this service (for monorepos)
      - src/apps/shopist/**
      - src/libs/utils/**
```

[1]: /ja/integrations/gitlab-source-code/
[2]: https://app.datadoghq.com/integrations/gitlab-source-code?subPath=configuration
[3]: https://docs.gitlab.com/user/group/

{{% /tab %}}

{{% tab "Azure DevOps" %}}

<div class="alert alert-danger">
統合が 2026 年 3 月 10 日以前にインストールされている場合は、<a href="https://github.com/DataDog/azdevops-sci-hooks">Webhook インストールセットアップスクリプト</a>を再度実行して、すべての DORA Metrics が正しく計算されるようにしてください。エラーが発生した場合は、サポートに問い合わせる前にスクリプトを再実行してください。
</div>

[Azure DevOps ソースコードインテグレーション][1] がまだインストールされていない場合は、[Azure DevOps ソースコードインテグレーションタイル][2] にインストールしてください。

統合を設定するには:

1. Datadog で [Azure DevOps ソースコードインテグレーションタイル][2] を開きます。

2. {{< ui >}}Configuration{{< /ui >}} タブを選択し、{{< ui >}}Connect Microsoft Entra App{{< /ui >}} をクリックします。

3. セットアップ手順に従います。

4. {{< ui >}}Add Organizations{{< /ui >}} をクリックします。

5. リポジトリのインストール手順に従い、[**セットアップスクリプトを実行**][3] してください。スクリプトが実行されない場合、プルリクエストが作成される前に行われたコミットが、そのプルリクエストに関連付けられることはありません。

6. スクリプトの完了後、タイル上で統合ステータスを確認してください。接続されたリポジトリとプロジェクトがリストに表示されます。

[1]: https://docs.datadoghq.com/ja/integrations/azure-devops-source-code/#connect-microsoft-entra-app
[2]: https://app.datadoghq.com/integrations?search=azure%20devops&integrationId=azure-devops-source-code&subPath=configuration
[3]: https://github.com/DataDog/azdevops-sci-hooks

{{% /tab %}}

{{% tab "Bitbucket" %}}

<div class="alert alert-warning">
Bitbucket Cloud Premium のみがサポートされています。Bitbucket Data Center および Bitbucket Server は<strong>サポートされていません</strong>。
</div>

[Bitbucket Cloud Source Code integration][1] がまだインストールされていない場合は、[Bitbucket Cloud Source Code integration のタイル][2]からインストールしてください。

[セットアップ][3]中にワークスペースアクセストークンを作成する際は、少なくとも以下のスコープを付与してください。

- {{< ui >}}Repositories{{< /ui >}}: {{< ui >}}Read{{< /ui >}}, {{< ui >}}Write{{< /ui >}}
- {{< ui >}}Pull requests{{< /ui >}}: {{< ui >}}Read{{< /ui >}}, {{< ui >}}Write{{< /ui >}}
- {{< ui >}}Webhooks{{< /ui >}}: {{< ui >}}Read and write{{< /ui >}}

[1]: /ja/integrations/bitbucket-source-code/
[2]: https://app.datadoghq.com/integrations/bitbucket-source-code/
[3]: /ja/integrations/bitbucket-source-code/#setup

{{% /tab %}}

{{% tab "その他の Git プロバイダー" %}}

[`datadog-ci git-metadata upload`][1] コマンドを使用して、Git リポジトリのメタデータをアップロードできます。
このコマンドが実行されると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、および追跡したファイルのパスのリストを受け取ります。

新しいコミットごとに CI でこのコマンドを実行してください。特定のコミット SHA に対してデプロイが実行される場合、必ずデプロイイベントが送信される**前**に、そのコミットに対して `datadog-ci git-metadata upload` コマンドを実行してください。

<div class="alert alert-danger">
コマンドに対して <code>--no-gitsync</code> このオプションを <code>datadog-ci git-metadata upload</code> コマンドに追記します。
そのオプションが含まれている場合、コミット情報は Datadog に送信されず、変更リードタイムメトリックは計算されません。
</div>

コマンドの正しいセットアップは、コマンド出力を確認することで検証できます。正しい出力の例を以下に示します。

```
Reporting commit 007f7f466e035b052415134600ea899693e7bb34 from repository git@github.com:organization/example-repository.git.
180 tracked file paths will be reported.
✅  Handled in 0.077 seconds.
```

[1]: https://github.com/DataDog/datadog-ci/tree/master/packages/base/src/commands/git-metadata
{{% /tab %}}
{{< /tabs >}}

### 同じリポジトリで複数のサービスを処理する場合 {#handling-multiple-services-in-the-same-repository}

複数のサービスのソースコードが同じリポジトリに存在する場合、デプロイされる特定のサービスに影響するコミットのみを考慮して変更リードタイムが計算されるようにするには、追加の設定が必要です。

サービスに影響を与えるコミットのみを計測するためにフィルタリングするためには、[サービス定義][4] でソースコードの glob ファイルパスパターンを指定します。

サービス定義にアプリケーションフォルダーへの**完全な** GitHub または GitLab URL が含まれている場合、単一のパスパターンが自動的に使用されます。リンクタイプは **repo** でなければならず、リンク名は "Source" またはサービスの名前 (以下の例では `shopist`) でなければなりません。

**例 (スキーマバージョン v2.2):**
{{< tabs >}}
{{% tab "GitHub" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: github
    url: https://github.com/organization/example-repository/tree/main/src/apps/shopist
```
{{% /tab %}}
{{% tab "GitLab" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: gitlab
    url: https://gitlab.com/organization/example-repository/-/tree/main/src/apps/shopist?ref_type=heads
```
{{% /tab %}}
{{% tab "Azure DevOps" %}}

```yaml
links:
  - name: shopist
    type: repo
    provider: azure
    url: https://dev.azure.com/organization/project/_git/example-repository?path=/src/apps/shopist
```
{{% /tab %}}
{{< /tabs >}}

`shopist` サービスの DORA Metrics は、`src/apps/shopist/**` 内の変更を含む Git コミットのみを考慮します。`extensions[datadoghq.com/dora-metrics]` を使用して、より細かくフィルタリングをコントロールできます。**例 (スキーマバージョン v2.2):**

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

サービス `shopist` の DORA Metrics は、`src/apps/shopist/**` または `src/libs/utils/**` 内の変更を含む Git コミットのみを考慮します。

サービスに対して 2 つのメタデータエントリーが定義されている場合、コミットをフィルタリングするために考慮されるのは `extensions[datadoghq.com/dora-metrics]` のみです。

## 変更障害検出のカスタマイズ {#customize-change-failure-detection}

DORA Metrics は、障害が発生したデプロイを自動的に識別して、変更障害率と失敗したデプロイの復旧時間を計算します。

### 仕組み {#how-it-works}

[変更障害検出][5] は、修復デプロイを特定し、それを修復中の特定のデプロイにリンクして、すぐに使用できるようにします。

**自動検出 (構成不要)**:
- **ロールバック**: 以前にデプロイされたバージョンが再デプロイされたときに自動的に検出されます。

**カスタムルール (カスタマイズ可能)**:
- **ロールフォワード**: リバート PR やホットフィックスラベルのような一般的なパターンに一致するデフォルトルールを通じて検出されます。これらのルールは、[DORA 設定][6] でカスタマイズして、チームの特定のワークフローや修復パターンに合わせることができます。

検出の仕組みやルールのカスタマイズ方法についての詳細情報は、[変更障害検出のドキュメント][5] を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora
[2]: /ja/internal_developer_portal/catalog/
[3]: /ja/internal_developer_portal/catalog/entity_model/
[4]: /ja/internal_developer_portal/catalog/entity_model/
[5]: /ja/delivery_performance/dora_metrics/change_failure_detection/
[6]: https://app.datadoghq.com/ci/settings/dora