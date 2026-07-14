---
aliases:
- /ja/continuous_integration/dora_metrics/setup/
- /ja/continuous_integration/dora_metrics/setup/deployments
- /ja/continuous_integration/dora_metrics/setup/incidents
- /ja/dora_metrics/setup/incidents
- /ja/dora_metrics/setup/deployments
- /ja/dora_metrics/setup/failures/
- /ja/dora_metrics/deployments/apm
- /ja/dora_metrics/deployments/deployment_api
- /ja/dora_metrics/deployments
- /ja/dora_metrics/failures/incident_api
- /ja/dora_metrics/failures/pagerduty
- /ja/dora_metrics/failures/
description: DORA Metrics に、APM デプロイの追跡、API、CLI、およびインシデント管理を含むデプロイおよび障害イベントデータソースを設定します。
further_reading:
- link: /dora_metrics/
  tag: よくあるご質問
  text: DORA Metrics について
- link: /dora_metrics/calculation
  tag: よくあるご質問
  text: DORA Metrics の計算方法について
- link: /dora_metrics/change-failure-detection
  tag: よくあるご質問
  text: 変更失敗検出について
- link: /tracing/software_catalog
  tag: よくあるご質問
  text: Software Catalog について
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

4. **[(Optional) Set up incidents tracking](#optional-set-up-incidents-tracking)**: インシデントデータを統合して、検出された変更障害と本番インシデントを互いに関係付け、デプロイがサービスの健全性に及ぼす影響を完全に把握します。

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
- サービスの [メタデータ][3] が Software Catalog で定義されていること。
- サービスの [unified service tagging][4] が有効になっていること。デプロイは `version` タグを使用して識別されます。

APM によって追跡されるサービスデプロイが変更リードタイムに確実に寄与するための詳細については、[Enrich deployments with commit information](#enrich-deployments-with-commit-information) を参照してください。

[1]: /ja/tracing/services/deployment_tracking
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: /ja/software_catalog/adding_metadata
[4]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes

{{% /tab %}}
{{% tab "API または CLI" %}}

独自のデプロイイベントを送信するには、[DORA Metrics API][1] または [`datadog-ci dora deployment`][2] コマンドを使用します。

### 要件 {#requirements-1}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} は、[DORA 設定][3] において {{< ui >}}Deployments{{< /ui >}} イベントデータソースとして有効になっていること。
- 必須の属性は以下のとおりです。
  - `started_at`: デプロイの開始時刻
  - `finished_at`: デプロイの終了時刻
  - `service`: デプロイされたサービス提供されたサービスが、[Software Catalog][4] にメタデータがセットアップ ([メタデータの追加][5] を参照) されて登録されている場合、サービスの `team` が自動的に取得され、すべてのメトリクスに関連付けられます。

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
[4]: /ja/tracing/software_catalog
[5]: /ja/tracing/software_catalog/adding_metadata
[6]: https://app.datadoghq.com/ci/dora
[7]: https://app.datadoghq.com/organization-settings/api-keys

{{% /tab %}}
{{< /tabs >}}

### カスタムタグ {#custom-tags}

デプロイに関連付けられたサービスが [Software Catalog][2] にメタデータがセットアップ ([メタデータの追加][3] を参照) されて登録されている場合、サービスの `languages` と任意の `tags` が自動的に取得され、イベントに関連付けられます。

## コミット情報でデプロイを強化する {#enrich-deployments-with-commit-information}

変更リードタイムの計算を有効化するには、デプロイのために Git 情報を構成し、リポジトリのメタデータを Datadog と同期させます。こうすることにより、DORA Metrics はコミットが作成されてからデプロイされるまでに要する時間を追跡できます。

### デプロイに Git 情報を添付する {#attach-git-information-to-deployments}

Datadog は、デプロイのヘッドコミット SHA の Git 情報 (リポジトリ URL とコミット SHA) へのアクセスを必要とします。要件は、デプロイデータソースによって異なります。

{{< tabs >}}
{{% tab "APM デプロイの追跡" %}}

APM デプロイ追跡を通じて特定されたデプロイの場合、ユーザーのアプリケーションのテレメトリに Git 情報がタグ付けされていることを確認してください。

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

{{% tab "その他の Git プロバイダー" %}}

[`datadog-ci git-metadata upload`][1] コマンドを使用して、Git リポジトリのメタデータをアップロードできます。
このコマンドが実行されると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、および追跡したファイルのパスのリストを受け取ります。

新しいコミットごとに CI でこのコマンドを実行してください。特定のコミット SHA に対してデプロイが実行される場合、必ずデプロイイベントが送信される**前**に、そのコミットに対して `datadog-ci git-metadata upload` コマンドを実行してください。

<div class="alert alert-danger">
コマンドに対して <code>--no-gitsync</code> このオプションを <code>datadog-ci git-metadata upload</code> 指定しないでください。
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

サービスに対して 2 つのメタデータエントリが定義されている場合、コミットをフィルタリングするために考慮されるのは `extensions[datadoghq.com/dora-metrics]` のみです。

## 変更障害検出のカスタマイズ {#customize-change-failure-detection}

DORA Metrics は、障害が発生したデプロイを自動的に識別して、変更障害率と失敗したデプロイの復旧時間を計算します。

### 仕組み {#how-it-works}

[変更障害検出][5] は、修復デプロイを特定し、それを修復中の特定のデプロイにリンクして、すぐに使用できるようにします。

**自動検出 (構成不要)**:
- **ロールバック**: 以前にデプロイされたバージョンが再デプロイされたときに自動的に検出されます。

**カスタムルール (カスタマイズ可能)**:
- **ロールフォワード**: リバート PR やホットフィックスラベルのような一般的なパターンに一致するデフォルトルールを通じて検出されます。これらのルールは、[DORA 設定][6] でカスタマイズして、チームの特定のワークフローや修復パターンに合わせることができます。

検出の仕組みやルールのカスタマイズ方法についての詳細情報は、[変更障害検出のドキュメント][5] を参照してください。

## (オプション) インシデント追跡のセットアップ {#optional-set-up-incidents-tracking}

インシデントデータを統合することで、デプロイ活動がサービスの健全性に及ぼす影響を包括的に把握できます。自動的に検出された変更障害と並行してインシデントを追跡することで、デリバリーパフォーマンスと実際の運用影響を互いに関連付け、ソフトウェアデリバリーがサービスの信頼性に及ぼす影響の全体像を理解できます。

DORA Metrics は、インシデント追跡のための以下のオプションをサポートしています。

{{< tabs >}}
{{% tab "Datadog インシデント" %}}
DORA Metrics は、[Datadog インシデント][1] を通じて障害を自動的に特定し、追跡することができます。インシデントが宣言された後、DORA はそれらを使用して変更障害率と復旧時間を測定します。

**注**: 復旧時間は、インシデントが`active` 状態にある合計時間として測定されます。`active` → `stable` → `active` → `stable` のようなケースでは、すべての `active` 期間が含まれます。復旧時間は、インシデントが `stable` または `resolved` 状態にあるときにのみ表示されます。`resolved` インシデントが再びアクティブ化されると、メトリクスは再び `resolved` になるまで非表示になります。


### 要件 {#requirements-2}

- {{< ui >}}Incidents{{< /ui >}} が [DORA 設定][2] の {{< ui >}}Failures{{< /ui >}} イベントデータソースとして有効になっていること。

ラベルのない障害を避けるために、Datadog はインシデントに次の属性を追加することを強く推奨します。
  - {{< ui >}}Teams{{< /ui >}}
  - {{< ui >}}Services{{< /ui >}}
  - {{< ui >}}Envs{{< /ui >}}: {{< ui >}}Envs{{< /ui >}} 属性は、[インシデント設定][3] ですでに存在しない場合に追加できます。

インシデントが提供されると、`Severity` タグが障害イベントに追加されます。

**推奨**: [インシデント設定][3] で、属性フィールド {{< ui >}}Prompted{{< /ui >}} を {{< ui >}}At Resolution{{< /ui >}} に設定して、ユーザーのインシデントにこれらの属性を追加するのを決して忘れないようにしてください。

### 過去のインシデントを含める {#include-historical-incidents}

[DORA 設定][2] で {{< ui >}}Backfill Data{{< /ui >}} を選択することで、過去 2 年間のインシデントをさかのぼって含めることができ、こうするとそれらのインシデントから障害が作成されます。データのバックフィリングには、最大 1 時間かかる場合があります。

[1]: /ja/incident_response/incident_management/
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://app.datadoghq.com/incidents/settings?section=property-fields


{{% /tab %}}
{{% tab "PagerDuty" %}}
[PagerDuty][1] は、IT チームにインシデントの即時可視性を提供し、運用上の安定性と回復力を維持するための積極的かつ効果的な対応を可能にするインシデント管理プラットフォームです。

PagerDuty アカウントを DORA Metrics に統合するには:

1.  [DORA 設定][2] で {{< ui >}}PagerDuty{{< /ui >}} を {{< ui >}}Failures{{< /ui >}} イベントデータソースとして有効にします。

1.  PagerDuty で、{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Developer Tools{{< /ui >}} に移動し、{{< ui >}}Generic Webhooks (v3){{< /ui >}} をクリックします。

1. {{< ui >}}+ New Webhook{{< /ui >}} をクリックし、次の詳細を入力します。

     <table>
      <thead>
        <tr>
          <th>変数</th>
          <th>説明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Webhook の URL</td>
          <td>追加 <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>.</td>
        </tr>
        <tr>
          <td>スコープタイプ</td>
          <td>送信したいインシデントのスコープを選択してください。特定の {{< ui >}}Service{{< /ui >}} または {{< ui >}}Team{{< /ui >}}、またはユーザーの {{< ui >}}Account{{< /ui >}} 内のすべての PagerDuty サービスのインシデントを送信できます。環境やアクセスレベルによっては、一部のスコープタイプが利用できない場合があります。</td>
        </tr>
        <tr>
          <td>説明</td>
          <td>説明は Webhook を区別する上で役立ちます。次のようなものを追加します <code>Datadog DORA Metrics integration</code>.</td>
        </tr>
        <tr>
          <td>イベントサブスクリプション</td>
          <td>次のイベントを選択してください。<br>-<code>incident.acknowledged</code><br>-<code>incident.annotated</code><br>-<code>incident.custom_field_values.updated</code><br>-<code>incident.delegated</code><br>-<code>incident.escalated</code><br>-<code>incident.priority_updated</code><br>-<code>incident.reassigned</code><br>-<code>incident.reopened</code><br>-<code>incident.resolved</code><br>-<code>incident.triggered</code><br>-<code>incident.unacknowledged</code></td>
        </tr>
        <tr>
          <td>カスタムヘッダー</td>
          <td>{{< ui >}}Add custom header{{< /ui >}} をクリックして、以下を名前として入力してください。 <code>DD-API-KEY</code> 値に <a href="https://docs.datadoghq.com/api/latest/authentication/#api-keys">Datadog API キー</a>を入力します。<br><br>オプションとして、Webhook から送信されたすべての PagerDuty インシデントに環境を追加するには、以下の名前の追加のカスタムヘッダーを作成できます。 <code>dd_env</code> さらに希望する環境を値として入力します。</td>
        </tr>
      </tbody>
    </table>

1. Webhook を保存するには、{{< ui >}}Add Webhook{{< /ui >}} をクリックします。

DORA Metrics 製品における障害の重大度は、PagerDuty の [インシデント優先度][3] に基づきます。

**注:**Webhook 作成時に新しいシークレットが作成され、すべての Webhook ペイロードに署名するために使用されます。そのシークレットは統合が機能するために必要ではなく、認証は代わりに API キーを使用して行われます。

### PagerDuty サービスを Datadog サービスにマッピングする {#mapping-pagerduty-services-to-datadog-services}

特定の [PagerDuty サービス][4] に対してインシデントイベントが受信されると、Datadog はトリガーされた [Datadog モニター][5] および [Software Catalog][6] から関連する Datadog サービスとチームを取得しようと試みます。

一致するアルゴリズムは、以下のステップで機能します。

1. PagerDuty インシデントイベントが [Datadog モニターからトリガーされた][5] 場合:
   - モニターが [マルチアラートモード][7] の場合、インシデントメトリクスとイベントは、アラートが発生したグループからの `env`、`service`、および `team` と共に発行されます。
   - モニターに `env`、`service`、または `team` の [タグ][8] がある場合:
     - `env`: モニターに単一の `env` タグがある場合、インシデントメトリクスとイベントは環境と共に発行されます。
     - `service`: モニターに 1 つ以上の `service` タグがある場合、インシデントメトリクスとイベントは提供されたサービスと共に発行されます。
     - `team`: モニターに単一の `team` タグがある場合、インシデントメトリクスとイベントはチームと共に発行されます。

2. インシデントのサービス URL が Software Catalog 内の任意のサービスの PagerDuty サービス URL と一致する場合:
   - 単一の Datadog サービスが一致する場合、インシデントメトリクスとイベントはサービスとチームと共に発行されます。
   - 複数の Datadog サービスが一致する場合、インシデントメトリクスとイベントはチームと共に発行されます。

   Datadog サービス用の PagerDuty サービス URL の設定に関する詳細は、[Software Catalog とのインテグレーションを利用する][9] を参照してください。

3. インシデントの PagerDuty サービス名が Software Catalog 内のサービス名と一致する場合、インシデントメトリクスとイベントはサービスとチームと共に発行されます。
4. インシデントの PagerDuty チーム名が Software Catalog 内のチーム名と一致する場合、インシデントメトリクスとイベントはチームと共に発行されます。
5. インシデントの PagerDuty サービス名が Software Catalog 内のチーム名と一致する場合、インシデントメトリクスとイベントはチームと共に発行されます。
6. ここまでに一致がなかった場合、インシデントメトリクスとイベントはインシデントで提供された PagerDuty サービスと PagerDuty チームと共に発行されます。

<div class="alert alert-danger">
インシデントがモニター通知ではなく PagerDuty で手動で解決された場合、インシデント解決イベントにはモニター情報が含まれず、一致アルゴリズムの最初のステップはスキップされます。
</div>

[1]: /ja/integrations/pagerduty/
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://support.pagerduty.com/main/docs/incident-priority
[4]: https://support.pagerduty.com/docs/services-and-integrations
[5]: /ja/integrations/pagerduty/#troubleshooting
[6]: /ja/software_catalog/
[7]: /ja/monitors/configuration/#multi-alert
[8]: /ja/monitors/manage/#monitor-tags
[9]: /ja/software_catalog/integrations/#pagerduty-integration


{{% /tab %}}
{{% tab "API" %}}

独自の障害イベントを送信するには、[DORA Metrics API][1] を使用します。障害イベントは、変更障害率と復旧時間を計算するために使用されます。

障害イベントに `finished_at` 属性を含められると、障害が解決されたことを示します。障害の開始時と解決後にイベントが送信されます。障害イベントは、`env`、`service`、および `started_at` 属性に基づいて照合されます。

### 要件 {#requirements-3}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} が [DORA 設定][2] の {{< ui >}}Failures{{< /ui >}} イベントデータソースとして有効になっていること。
- 必須の属性は以下のとおりです。
  - `services` または `team` (少なくとも 1 つは存在する必要があります)
  - `started_at`

オプションで以下の属性を障害イベントに追加できます。
- `finished_at`*解決された障害*用***復旧までの時間を計算するために必要となります***
- `id` 障害の特定用この属性はユーザーが生成するもので、指定しない場合は、Datadog が生成する UUID がエンドポイントによって返されます。
- `name`障害を説明するために使用します。
- `severity`
- `env`[{{< ui >}}DORA Metrics{{< /ui >}} ページ][3] で環境ごとに DORA Metrics をフィルタリングするために使用します。
- `repository_url`
- `commit_sha`
- `version`
- `custom_tags`: `key:value` の形式のタグで、[{{< ui >}}DORA Metrics{{< /ui >}} ページ][3] でイベントをフィルタリングするために使用できます。

完全な仕様および追加のコードサンプルについては、[DORA Metrics API リファレンスドキュメント][1] をご覧ください。

### API (cURL) の例 {#api-curl-example-1}

下記の構成については、`<DD_SITE>` を以下に置き換えてください {{< region-param key="dd_site" >}}:

```shell
curl -X POST "https://api.<DD_SITE>/api/v2/dora/failure" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: ${DD_API_KEY}" \
  -d @- << EOF
  {
    "data": {
      "attributes": {
        "services": ["shopist"],
        "team": "shopist-devs",
        "started_at": 1693491974000000000,
        "finished_at": 1693491984000000000,
        "git": {
          "commit_sha": "66adc9350f2cc9b250b69abddab733dd55e1a588",
          "repository_url": "https://github.com/organization/example-repository"
        },
        "env": "prod",
        "name": "Web server is down failing all requests",
        "severity": "High",
        "version": "v1.12.07",
        "custom_tags": ["department:engineering", "app_type:backend"]
      }
    }
  }
EOF
```

[1]: /ja/api/latest/dora-metrics/#send-a-failure-event-for-dora-metrics
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://app.datadoghq.com/ci/dora


{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora
[2]: /ja/tracing/software_catalog
[3]: /ja/tracing/software_catalog/adding_metadata
[4]: /ja/tracing/software_catalog/adding_metadata
[5]: /ja/dora_metrics/change_failure_detection/
[6]: https://app.datadoghq.com/ci/settings/dora
