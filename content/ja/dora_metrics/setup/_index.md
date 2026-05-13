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
description: DORAメトリクスには、APMデプロイメントトラッキング、API、CLI、およびインシデント管理を含むデプロイメントおよび障害イベントデータソースを設定します。
further_reading:
- link: /dora_metrics/
  tag: よくあるご質問
  text: DORA Metrics について
- link: /dora_metrics/calculation
  tag: よくあるご質問
  text: DORAメトリクスがどのように計算されるかを学びます。
- link: /dora_metrics/change-failure-detection
  tag: よくあるご質問
  text: 変更失敗検出について学びます。
- link: /tracing/software_catalog
  tag: よくあるご質問
  text: Software Catalogについて学びます。
- link: https://github.com/DataDog/datadog-ci
  tag: ソースコード
  text: datadog-ci CLIツールについて学びます。
title: DORA メトリクスのセットアップ
---
## 概要 {#overview}

DORAメトリクスは、デプロイメントイベントを使用してソフトウェアデリバリーパフォーマンスを追跡および測定します。これらのイベントは、デプロイメント頻度、変更リードタイム、変更失敗率、復旧時間の4つの主要なDORAメトリクスを支えています。

DORAメトリクスを使用するには、次の手順に従ってください：

1. **[デプロイメントデータソースを設定する](#configure-a-deployment-data-source)**：APMデプロイメントトラッキングまたはDORAメトリクスAPI/CLIを通じて、デプロイメントイベントをDatadogに送信する方法を選択します。

2. **[コミット情報でデプロイメントを強化する](#enrich-deployments-with-commit-information)**：デプロイメントイベントにGitメタデータ（リポジトリURLとコミットSHA）を追加し、変更リードタイム計算を有効にするためにリポジトリをDatadogに同期します。

3. **[変更失敗検出をカスタマイズする](#customize-change-failure-detection)**：DORAメトリクスは、ロールバック（以前のバージョンを再デプロイする）を通じて失敗したデプロイメントを自動的に検出し、リバートPRやホットフィックスラベルなどの一般的なロールフォワードパターンに対するデフォルトルールを含みます。これらのルールをカスタマイズして、チームの特定のワークフローや修正パターンに合わせることができます。

4. **[(オプション) インシデントトラッキングを設定する](#optional-set-up-incidents-tracking)**：インシデントデータを統合して、検出された変更失敗と本番インシデントを相関させ、デプロイメントがサービスの健康にどのように影響するかの完全なビューを提供します。

設定されると、デプロイメントイベントは自動的にあなたの[DORAメトリクスダッシュボード][1]に、チーム、サービス、環境、および[カスタムタグ](#custom-tags)でフィルタリングされたパフォーマンスデータを入力します。

### 制限事項 {#limitations}

- データソースオプション（APMデプロイメントトラッキングなど）を最初に選択すると、DORAメトリクスはその時点からデータを入力し始めます。ソースAからソースBに切り替え、再びソースAに戻ると、ソースAの履歴データは最初に選択された時点からのみ利用可能です。
- 同じサービスに対するデプロイメントは、同じ秒には発生できません。

## デプロイメントデータソースを設定する {#configure-a-deployment-data-source}

DORA Metrics は、デプロイメントイベントのために以下のデータソースをサポートしています:

{{< tabs >}}
{{% tab "APM デプロイの追跡" %}}

[APM Deployment Tracking][1] は、DORA Metrics のデプロイメントのデータソースとして構成できます。

### 要件 {#requirements}

- {{< ui >}}APM Deployment Tracking{{< /ui >}} は、[DORA 設定][2] において {{< ui >}}Deployments{{< /ui >}} イベントデータソースとして有効になっています。
- サービスには、Software Catalogで定義された [メタデータ][3] があります。
- サービスには、[unified service tagging][4] が有効になっています。デプロイメントは `version` タグを使用して識別されます。

APM によって追跡されるサービスデプロイメントが変更リードタイムに寄与することを確実にするための詳細については、[コミット情報でデプロイメントを強化する](#enrich-deployments-with-commit-information) を参照してください。

[1]: /ja/tracing/services/deployment_tracking
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: /ja/software_catalog/adding_metadata
[4]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes

{{% /tab %}}
{{% tab "API または CLI" %}}

独自のデプロイメントイベントを送信するには、[DORA Metrics API][1] または [`datadog-ci dora deployment`][2] コマンドを使用してください。

### 要件 {#requirements-1}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} は、[DORA 設定][3] において {{< ui >}}Deployments{{< /ui >}} イベントデータソースとして有効になっています。
- 以下の属性が必須です:
  - `started_at`: デプロイメントが開始された時間。
  - `finished_at`: デプロイメントが終了した時間。
  - `service`: デプロイされたサービス。提供されたサービスが [Software Catalog][4] にメタデータが設定された状態で登録されている場合（[メタデータの追加][5] を参照）、サービスの `team` が自動的に取得され、すべてのメトリクスに関連付けられます。

オプションで以下の属性をデプロイメントイベントに追加できます:

- `repository_url`: サービスのソースコードリポジトリ。変更リードタイムを計算するために必要です。
- `commit_sha`: デプロイメントに関連付けられた HEAD コミットの SHA です。変更リードタイムを計算するために必要です。
- `team`: サービスに対して自動的に見つかったものとは異なる `team` にデプロイメントを関連付けます。
- `env`: [DORA Metrics][6] ページで環境ごとに DORA メトリクスをフィルタリングします。
- `id`: デプロイメントを特定します。この属性はユーザー生成のものであり、提供されない場合、エンドポイントは Datadog 生成の UUID を返します。
- `version`: デプロイメントのバージョンです。
- `custom_tags`: [DORA Metrics][6] ページでイベントをフィルタリングするために使用できる `key:value` 形式のタグです。


### API (cURL) の例 {#api-curl-example}

完全な仕様および追加のコードサンプルについては、[DORA Metrics API リファレンスドキュメント][1]をご覧ください。

次の例では、URL の `<DD_SITE>` を置き換えます。 {{< region-param key="dd_site" code="true" >}} および `${DD_API_KEY}` をあなたの [Datadog API キー][7] に置き換えます:

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

[`datadog-ci`][2] CLI ツールは、継続的インテグレーション環境内でデプロイメントイベントを送信するためのショートカットを提供します。

次の例では、`DD_SITE` 環境変数を設定します。 {{< region-param key="dd_site" code="true" >}} および `DD_API_KEY` 環境変数をあなたの [Datadog API キー][7] に設定します:

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

デプロイメントの終了時間は、`--finished-at` が提供されない場合、自動的に現在の時刻に設定されます。

デプロイメント CI ジョブがデプロイされている正確な Git リビジョンで実行されている場合、`git-repository-url` と `git-commit-sha` は省略可能であり、CI コンテキストから自動的に推測されます。

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

デプロイメントに関連付けられたサービスがメタデータが設定された [Software Catalog][2] に登録されている場合（[メタデータの追加][3] を参照）、サービスの `languages` と任意の `tags` が自動的に取得され、イベントに関連付けられます。

## デプロイメントにコミット情報を追加する {#enrich-deployments-with-commit-information}

変更リードタイムの計算を有効にするには、デプロイメントのためにGit情報を設定し、リポジトリのメタデータをDatadogと同期させてください。これにより、DORA Metricsはコミットが作成されてからデプロイメントまでの時間を追跡できます。

### デプロイメントにGit情報を添付する {#attach-git-information-to-deployments}

Datadogは、デプロイメントのヘッドコミットSHAのGit情報（リポジトリURLとコミットSHA）へのアクセスが必要です。要件は、デプロイメントデータソースによって異なります：

{{< tabs >}}
{{% tab "APM デプロイの追跡" %}}

APMデプロイメントトラッキングを通じて特定されたデプロイメントの場合、アプリケーションのテレメトリにGit情報がタグ付けされていることを確認してください：

- APMでGitタグ付けを有効にする[こちら][1]、または[ソースコード統合のドキュメント][2]を参照してください。

**注意**：APMで追跡されたデプロイメントの場合、変更リードタイムはコミット作成からコミットが新しいバージョンで初めて確認されるまでの期間として計算されます。`Deploy Time`メトリクスは利用できません。

[1]: https://app.datadoghq.com/source-code/setup/apm
[2]: /ja/integrations/guide/source-code-integration/?tab=go#tag-your-telemetry-with-git-information

{{% /tab %}}
{{% tab "API または CLI" %}}

DORA Metrics API または`datadog-ci dora deployment`コマンドで追跡されたデプロイメントの場合、次を確認してください：

- 属性`repository_url`と`commit_sha`がデプロイメントイベントのペイロードに含まれています。

{{% /tab %}}
{{< /tabs >}}

### リポジトリのメタデータをDatadogに同期する {#synchronize-repository-metadata-to-datadog}

Datadogは、1つのデプロイメントと前のデプロイメントの間にデプロイされたすべてのコミットを取得するために、リポジトリのメタデータ（コミット、ファイルパス）へのアクセスが必要です。Gitプロバイダーに基づいて同期方法を選択してください：

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-danger">
<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request">で実行されているGitHubワークフロー<code>pull_request</code> トリガー</a>は、現在GitHub統合でサポートされていません。
使用している場合は、 <code>pull_request</code> トリガーの代替方法を使用してください。
</div>

[GitHub インテグレーション][1]がまだインストールされていない場合は、[GitHub インテグレーションタイル][2]にインストールしてください。

GitHub アプリケーションの構成時:
1. に対して、少なくとも{{< ui >}}Read{{< /ui >}}のリポジトリ権限として、{{< ui >}}Contents{{< /ui >}}と{{< ui >}}Pull Requests{{< /ui >}}を選択してください。
2. 少なくとも {{< ui >}}Push{{< /ui >}}、{{< ui >}}PullRequest{{< /ui >}}、および {{< ui >}}PullRequestReview{{< /ui >}} イベントに登録してください。

セットアップが有効であることを確認するには、[GitHub インテグレーションタイル][2]で GitHub アプリケーションを選択し、{{< ui >}}Datadog Features{{< /ui >}} テーブルが {{< ui >}}Pull Request Information{{< /ui >}} のすべての要件を満たしていることを確認してください。

[1]: /ja/integrations/github/
[2]: https://app.datadoghq.com/integrations/github/
{{% /tab %}}

{{% tab "GitLab" %}}
[GitLab ソースコードインテグレーション][1] がまだインストールされていない場合は、[GitLab ソースコードインテグレーションタイル][2] にインストールしてください。

**注意**: サービスアカウントの個人アクセストークンのスコープは、少なくとも `read_api` である必要があります。

### GitLab グループおよびサブグループの取り扱い {#handling-gitlab-groups-and-subgroups}

リポジトリが [**GitLab グループまたはサブグループ**][3] の下に整理されている場合（例えば、
`https://gitlab.com/my-org/group(/subgroup)/repo`),
自動サービスパス検出は、GitLab のネストされたグループ構造のために正しく解決されない可能性があります。

DORA メトリクスがサービスのソースコードパスを正しく処理することを確認するために、
サービス定義に次の構成を使用できます:

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
統合が 2026 年 3 月 10 日以前にインストールされていた場合は、<a href="https://github.com/DataDog/azdevops-sci-hooks">Webhook インストールセットアップスクリプト</a>を再度実行して、すべての DORA メトリクスが正しく計算されるようにしてください。エラーが発生した場合は、サポートに連絡する前にスクリプトを再実行してください。
</div>

[Azure DevOps ソースコードインテグレーション][1] がまだインストールされていない場合は、[Azure DevOps ソースコードインテグレーションタイル][2] にインストールしてください。

統合を設定するには:

1. Datadog の [Azure DevOps ソースコードインテグレーションタイル][2] を開きます。

2.  {{< ui >}}Configuration{{< /ui >}} タブを選択し、{{< ui >}}Connect Microsoft Entra App{{< /ui >}} をクリックします。

3. セットアップ手順に従ってください。

4. {{< ui >}}Add Organizations{{< /ui >}}をクリックします。

5. リポジトリのインストール手順に従い、[**セットアップスクリプトを実行する**][3]。スクリプトが実行されない場合、プルリクエストが作成される前に行われたコミットは、そのプルリクエストに関連付けられません。

6. スクリプトが完了した後、タイル上で統合ステータスを確認してください。接続されたリポジトリとプロジェクトがリストに表示されます。

[1]: https://docs.datadoghq.com/ja/integrations/azure-devops-source-code/#connect-microsoft-entra-app
[2]: https://app.datadoghq.com/integrations?search=azure%20devops&integrationId=azure-devops-source-code&subPath=configuration
[3]: https://github.com/DataDog/azdevops-sci-hooks

{{% /tab %}}

{{% tab "その他の Git プロバイダー" %}}

[`datadog-ci git-metadata upload`][1] コマンドを使用して、Git リポジトリのメタデータをアップロードできます。
このコマンドが実行されると、Datadog はリポジトリの URL、現在のブランチのコミット SHA、および追跡されているファイルパスのリストを受け取ります。

新しいコミットごとに CI でこのコマンドを実行してください。特定のコミット SHA に対してデプロイメントが実行される場合、`datadog-ci git-metadata upload` コマンドがそのコミットに対して実行され、**** のデプロイメントイベントが送信される前に完了していることを確認してください。

<div class="alert alert-danger">
提供しないでください <code>--no-gitsync</code> オプションを <code>datadog-ci git-metadata upload</code> コマンドに。
そのオプションが含まれている場合、コミット情報は Datadog に送信されず、変更リードタイムメトリックは計算されません。
</div>

コマンドの正しいセットアップは、コマンド出力を確認することで検証できます。正しい出力の例は次のとおりです：

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

サービスに影響を与えるコミットのみを計測するために、[サービス定義][4]でソースコードの glob ファイルパスパターンを指定してください。

サービス定義にアプリケーションフォルダへの**完全な** GitHub または GitLab URL が含まれている場合、単一のパスパターンが自動的に使用されます。リンクタイプは **repo** でなければならず、リンク名は「Source」またはサービスの名前（以下の例では `shopist`）でなければなりません。

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

DORA メトリクスは `shopist` サービスの Git コミットのうち、`src/apps/shopist/**` 内の変更を含むもののみを考慮します。フィルタリングのより詳細な制御を`extensions[datadoghq.com/dora-metrics]`で設定できます。**例 (スキーマバージョン v2.2):**

```yaml
extensions:
  datadoghq.com/dora-metrics:
    source_patterns:
      - src/apps/shopist/**
      - src/libs/utils/**
```

DORA メトリクスは `shopist` サービスの Git コミットのうち、`src/apps/shopist/**`または`src/libs/utils/**`内の変更を含むもののみを考慮します。

サービスに対して2つのメタデータエントリが定義されている場合、コミットをフィルタリングするために考慮されるのは`extensions[datadoghq.com/dora-metrics]`のみです。

## 変更失敗検出のカスタマイズ{#customize-change-failure-detection}

DORAメトリクスは、変更失敗率と失敗したデプロイの回復時間を計算するために、失敗したデプロイを自動的に特定します。

### 仕組み{#how-it-works}

[変更失敗検出][5]は、修正デプロイを特定し、それらを修正している特定のデプロイにリンクすることで、すぐに使用できる状態で動作します。

**自動検出（設定不要）**:
- **ロールバック**: 以前にデプロイされたバージョンが再デプロイされたときに自動的に検出されます。

**カスタムルール（カスタマイズ可能）**:
- **ロールフォワード**: リバートPRやホットフィックスラベルのような一般的なパターンに一致するデフォルトルールを通じて検出されます。これらのルールは、[DORA設定][6]でカスタマイズして、チームの特定のワークフローや修正パターンに合わせることができます。

検出の仕組みやルールのカスタマイズ方法についての詳細情報は、[変更失敗検出のドキュメント][5]を参照してください。

## (オプション) インシデント追跡の設定{#optional-set-up-incidents-tracking}

インシデントデータを統合することで、デプロイ活動がサービスの健康に与える影響の包括的なビューを得ることができます。自動的に検出された変更失敗と並行してインシデントを追跡することで、デリバリーパフォーマンスと実際の運用影響を相関させ、ソフトウェアデリバリーがサービスの信頼性に与える影響の全体像を理解できます。

DORAメトリクスは、インシデント追跡のための以下のオプションをサポートしています:

{{< tabs >}}
{{% tab "Datadog インシデント" %}}
DORAメトリクスは、[Datadog Incidents][1]を通じて失敗を自動的に特定し、追跡できます。インシデントが宣言された後、DORAはそれらを使用して変更失敗率と復旧時間を測定します。

**注意**: 復旧時間は、インシデントが`active`状態にある合計時間として測定されます。`active` → `stable` → `active` → `stable`のようなケースでは、すべての`active`期間が含まれます。復旧時間は、インシデントが`stable`または`resolved`状態にあるときのみ表示されます。`resolved`インシデントが再アクティブ化されると、メトリクスは再び`resolved`されるまで非表示になります。


### 要件 {#requirements-2}

- {{< ui >}}Incidents{{< /ui >}}は、[DORA設定][2]で{{< ui >}}Failures{{< /ui >}}イベントデータソースとして有効になっています。

ラベルのない障害を避けるために、Datadogはインシデントに次の属性を追加することを強く推奨します:
  - {{< ui >}}Teams{{< /ui >}}
  - {{< ui >}}Services{{< /ui >}}
  - {{< ui >}}Envs{{< /ui >}}: {{< ui >}}Envs{{< /ui >}}属性は、[インシデント設定][3]で既に存在しない場合に追加できます。

インシデントが提供されると、`Severity`タグが障害イベントに追加されます。

**推奨**: [インシデント設定][3]で、属性フィールド{{< ui >}}Prompted{{< /ui >}}を{{< ui >}}At Resolution{{< /ui >}}に設定して、インシデントにこれらの属性を追加するのを忘れないようにします。

### 過去のインシデントを含める {#include-historical-incidents}

[DORA設定][2]で{{< ui >}}Backfill Data{{< /ui >}}を選択することで、過去2年間のインシデントを遡って含めることができ、これによりそれらのインシデントから障害が作成されます。データのバックフィリングには最大1時間かかる場合があります。

[1]: /ja/incident_response/incident_management/
[2]: https://app.datadoghq.com/ci/settings/dora
[3]: https://app.datadoghq.com/incidents/settings?section=property-fields


{{% /tab %}}
{{% tab "PagerDuty" %}}
[PagerDuty][1]は、ITチームにインシデントの即時可視性を提供し、運用上の安定性と回復力を維持するための積極的かつ効果的な対応を可能にするインシデント管理プラットフォームです。

PagerDutyアカウントをDORA Metricsに統合するには:

1.  [DORA設定][2]で{{< ui >}}PagerDuty{{< /ui >}}を{{< ui >}}Failures{{< /ui >}}イベントデータソースとして有効にします。

1. PagerDutyの{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Developer Tools{{< /ui >}}に移動し、{{< ui >}}Generic Webhooks (v3){{< /ui >}}をクリックします。

1. をクリックし、次の詳細を入力します:

     <table>
      <thead>
        <tr>
          <th>変数</th>
          <th>説明</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Webhook URL</td>
          <td>追加 <code>https://webhook-intake.{{< region-param key="dd_site" >}}/api/v2/webhook/</code>.</td>
        </tr>
        <tr>
          <td>スコープタイプ</td>
          <td>送信したいインシデントのスコープを選択してください。特定の{{< ui >}}Service{{< /ui >}}または{{< ui >}}Team{{< /ui >}}、または{{< ui >}}Account{{< /ui >}}内のすべてのPagerDutyサービスのインシデントを送信できます。環境やアクセスレベルによっては、一部のスコープタイプが利用できない場合があります。</td>
        </tr>
        <tr>
          <td>説明</td>
          <td>説明はWebhookを区別するのに役立ちます。次のようなものを追加してください <code>Datadog DORA Metrics integration</code>.</td>
        </tr>
        <tr>
          <td>イベントサブスクリプション</td>
          <td>次のイベントを選択してください：<br>-<code>incident.acknowledged</code><br>-<code>incident.annotated</code><br>-<code>incident.custom_field_values.updated</code><br>-<code>incident.delegated</code><br>-<code>incident.escalated</code><br>-<code>incident.priority_updated</code><br>-<code>incident.reassigned</code><br>-<code>incident.reopened</code><br>-<code>incident.resolved</code><br>-<code>incident.triggered</code><br>-<code>incident.unacknowledged</code></td>
        </tr>
        <tr>
          <td>カスタムヘッダー</td>
          <td>クリックして{{< ui >}}Add custom header{{< /ui >}}、入力してください <code>DD-API-KEY</code> 名前として、<a href="https://docs.datadoghq.com/api/latest/authentication/#api-keys">Datadog API キー</a>を値として入力します。<br><br>オプションで、Webhookから送信されるすべてのPagerDutyインシデントに環境を追加するには、名前を指定した追加のカスタムヘッダーを作成できます。 <code>dd_env</code> および希望する環境を値として入力します。</td>
        </tr>
      </tbody>
    </table>

1. Webhookを保存するには、{{< ui >}}Add Webhook{{< /ui >}}をクリックしてください。

DORA Metrics製品における障害の重大度は、PagerDutyの[インシデント優先度][3]に基づいています。

**注意：**Webhook作成時に新しいシークレットが作成され、すべてのWebhookペイロードに署名するために使用されます。そのシークレットは統合が機能するためには必要ありません。認証は代わりにAPI キーを使用して行われます。

### PagerDutyサービスをDatadogサービスにマッピングする {#mapping-pagerduty-services-to-datadog-services}

特定の[PagerDutyサービス][4]に対してインシデントイベントが受信されると、Datadogはトリガーされた[Datadogモニター][5]および[Software Catalog][6]から関連するDatadogサービスとチームを取得しようとします。

一致するアルゴリズムは、以下のステップで機能します:

1. インシデントイベントが [Datadog モニターからトリガーされた][5] 場合:
   - モニターが [マルチアラートモード][7] の場合、インシデントメトリクスとイベントは、アラートを受けたグループからの `env`、`service`、および `team` と共に発行されます。
   - モニターに `env`、`service`、または `team` の [タグ][8] がある場合:
     - `env`: モニターに単一の `env` タグがある場合、インシデントメトリクスとイベントは環境と共に発行されます。
     - `service`: モニターに1つ以上の `service` タグがある場合、インシデントメトリクスとイベントは提供されたサービスと共に発行されます。
     - `team`: モニターに単一の `team` タグがある場合、インシデントメトリクスとイベントはチームと共に発行されます。

2. インシデントのサービス URL がSoftware Catalog内の任意のサービスの PagerDuty サービス URL と一致する場合:
   - 単一の Datadog サービスが一致する場合、インシデントメトリクスとイベントはサービスとチームと共に発行されます。
   - 複数の Datadog サービスが一致する場合、インシデントメトリクスとイベントはチームと共に発行されます。

   Datadog サービス用の PagerDuty サービス URL の設定に関する詳細は、[Software Catalog とのインテグレーションを利用する][9]を参照してください。

3. インシデントの PagerDuty サービス名がソフトウェアカタログ内のサービス名と一致する場合、インシデントメトリクスとイベントはサービスとチームと共に発行されます。
4. インシデントの PagerDuty チーム名がソフトウェアカタログ内のチーム名と一致する場合、インシデントメトリクスとイベントはチームと共に発行されます。
5. インシデントの PagerDuty サービス名がソフトウェアカタログ内のチーム名と一致する場合、インシデントメトリクスとイベントはチームと共に発行されます。
6. ここまでに一致がなかった場合、インシデントに提供された PagerDuty サービスと PagerDuty チームと共にインシデントメトリクスとイベントが発行されます。

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

独自の障害イベントを送信するには、[DORA メトリクス API][1] を使用してください。障害イベントは、変更失敗率と復旧時間を計算するために使用されます。

障害イベントに `finished_at` 属性を含めて、障害が解決されたことを示します。障害の開始時と解決後にイベントを送信できます。障害イベントは `env`、`service`、および `started_at` 属性によって一致します。

### 要件 {#requirements-3}

- {{< ui >}}datadog-ci CLI / API{{< /ui >}} は [DORA 設定][2] の {{< ui >}}Failures{{< /ui >}} イベントデータソースとして有効です。
- 次の属性が必須です:
  - `services` または `team` (少なくとも1つは存在する必要があります)
  - `started_at`

オプションで以下の属性を障害イベントに追加できます:
- `finished_at` * 解決された障害*のため。***復旧までの時間を計算するために必要です***
- `id`障害を特定するため。この属性はユーザー生成のものであり、提供されない場合、エンドポイントは Datadog 生成の UUID を返します。
- `name`障害を説明するため。
- `severity`
- `env`[{{< ui >}}DORA Metrics{{< /ui >}}ページ][3]で環境ごとにDORAメトリクスをフィルタリングするために使用します。
- `repository_url`
- `commit_sha`
- `version`
- `custom_tags`: イベントを[{{< ui >}}DORA Metrics{{< /ui >}}ページ][3]でフィルタリングするために使用できる`key:value`形式のタグ。

完全な仕様および追加のコードサンプルについては、[DORA Metrics API リファレンスドキュメント][1]をご覧ください。

### API (cURL) の例 {#api-curl-example-1}

次の構成では、`<DD_SITE>` を置き換えてください。 {{< region-param key="dd_site" >}}:

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