---
description: dbt モデルを変更するプルリクエストに対し、マージ前に下流への影響やデータのドリフトを自動的にチェックします。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability の概要
- link: /data_observability/data_catalog/
  tag: ドキュメント
  text: データカタログ
- link: /data_observability/lineage/
  tag: ドキュメント
  text: リネージ
- link: /data_observability/quality_monitoring/
  tag: ドキュメント
  text: Quality Monitoring
- link: /data_observability/jobs_monitoring/
  tag: ドキュメント
  text: Jobs Monitoring
title: CI/CD
---
## 概要 {#overview}

{{< img src="data_observability/cicd/cicd-overview.png" alt="CI/CD 機能レポートページ" style="width:100%;" >}}

dbt モデルを変更するプルリクエスト (PR) を開くと、Data Observability の CI/CD チェックが自動的に実行されます。これらのチェックにより、変更をマージしても安全かどうかを判断するために必要な情報が得られます。

Datadog は結果を PR へのコメントとして投稿し、新しい変更をプッシュするたびにそのコメントが更新されます。詳細なレポートも Datadog 上で確認でき、PR のコメント内にそのレポートへのリンクが記載されます。

## チェックの種類 {#check-types}

### Impact Lineage {#impact-lineage}

Impact Lineage は、変更された dbt モデルの下流にあるすべての要素を含むグラフを構築します。マージ前にこの機能を使用して、変更による影響範囲を評価できます。変更したモデルに依存しているテーブル、ダッシュボード、その他のコンシューマーを特定し、適切な所有者にレビューを依頼することができます。

Datadog によるリネージグラフの構築や操作方法の詳細については、[リネージ][1]を参照してください。

### Drift Detection{#drift-detection}

Drift Detection は、一連の統計的チェックを用いて、変更前後のモデルによって生成されるデータを比較します。この機能を使用することで、モデルの変更が期待どおりの出力を生成しているかを確認したり、行数の大幅な変動、NULL 率の変化、列の値のカーディナリティの変化といった意図しない副作用を検知したりできます。

## セットアップ {#setup}

### 1. ソース管理プロバイダーと dbt プロジェクトを接続する {#1-connect-your-source-control-provider-and-dbt-project}

1. [ソース管理プロバイダー][2]を接続します。CI/CD チェックは、GitHub、GitLab、Bitbucket Cloud、および Azure DevOps をサポートしています。
2. dbt モデルが実行される[サポートされているデータソースアカウント][3]を接続します。
3. [dbt Cloud][4] または [dbt Core][5] プロジェクトを Datadog に接続します。CI/CD チェックの設定中に dbt プロジェクトを接続することもできます。

### 2. dbt プロジェクトとリポジトリを選択する {#2-select-your-dbt-project-and-repository}

1. CI/CD 設定から、{{< ui >}}Add CI/CD Checks{{< /ui >}} をクリックします。
2. チェックを追加する dbt プロジェクトを選択します。
3. そのプロジェクトのメインのジョブを選択します。これは、dbt スキーマについて最も知識を持つジョブです。
4. Datadog がソース管理プロバイダーからリポジトリを自動的に推論できない場合は、手動で選択してください。

{{< img src="data_observability/cicd/cicd-connection.png" alt="CI/CD 機能作成ページ" style="width:100%;" >}}

#### 高度な設定 {#advanced-settings}

dbt プロジェクトがリポジトリのルートにない場合は、高度な設定で dbt プロジェクトへのパスを指定できます。

### 3. チェックを構成する {#3-configure-checks}

各チェックは個別に有効にできます。すべてのチェックを有効にすると、最も詳細なレポートが得られます。

#### Impact Lineage {#impact-lineage-1}

Impact lineage は、モデルの変更によって影響を受ける可能性のある下流のアセットのグラフを生成します。

##### 一般設定 {#general-settings}

| 設定                            | 説明                                                          |
| ---------------------------------- | -------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | ドラフトのプルリクエストまたはマージリクエストでチェックを実行するには、このオプションを有効にします。|

#### ドリフト検出 {#drift-detection-1}

ドリフト検出は、ブランチ上のデータの現在の状態をベースラインと比較し、差異があればフラグを立てます。Datadog は、CI パイプラインからの dbt 実行をドリフト検出チェックのトリガーとして使用します。**dbt Core** の場合、Datadog がこれらの実行を受信できるように、CI ジョブから OpenLineage イベントを送信する必要があります。[OpenLineage のセットアップドキュメント][6]を参照してください。**dbt Cloud** の場合、[dbt Cloud](#dbt-cloud) セクションの `CI Job URL` 設定で、プルリクエスト時に実行される CI ジョブを構成します。

比較を行うには、Datadog が CI ジョブによって作成されたテーブルを読み取れる必要があります。Snowflake のセットアップ時に作成したロール (デフォルトでは `DATADOG_ROLE`) には、CI ジョブがモデルをマテリアライズするデータベースに対する `USAGE` および `SELECT` 権限が必要です。Datadog の Snowflake インテグレーション設定には `grant_database_access` プロシージャが含まれており、これにより対象データベース内のすべてのスキーマにある現在および将来のすべてのテーブルとビューに対して、これらの権限が付与されます。CI ジョブが書き込みを行うデータベースに対して、このプロシージャを実行します。

```sql
CALL grant_database_access('["<CI_DATABASE>"]', '<ROLE_NAME>');
```

CI がプルリクエストごとに一時的なデータベースを作成する場合は、新しいデータベースが読み取り可能になるように、そのプロビジョニングステップの一部として当該プロシージャを呼び出してください。プロシージャの定義については、[Snowflake セットアップ][8]を参照してください。このアクセス権がない場合、Datadog は CI 実行を受信しても CI テーブルをクエリできず、ドリフト検出は失敗します。

**dbt Core** の場合、ドリフト検出には、`sourceCodeLocation` ファセットを通じて OpenLineage イベントにプルリクエスト番号を付加することも必要です。これには、`openlineage-dbt` バージョン 1.46.0 以降と `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false` 環境変数が必要です。[環境変数を設定する][7]を参照してください。dbt Core CI ジョブがコンテナ内で実行される場合は、追加の設定が必要です。[コンテナ内で dbt Core CI ジョブを実行する](#running-your-dbt-core-ci-job-in-a-container)セクションを参照してください。

##### 一般設定 {#general-settings-1}

| 設定                            | 説明                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | ドラフトのプルリクエストまたはマージリクエストでチェックを実行するには、このオプションを有効にします。                                                                                         |
| `Threshold`                        | ドリフト検出のしきい値 (例: 10% のドリフトは `0.1`)。メトリクスがこのしきい値を超えると、チェック結果に警告として表示されます。     |
| `Downstream Checks`                | dbt モデルが変更されると、そのモデルおよび下流のすべての dbt モデルに対してドリフト検出チェックが生成されます。この設定は、チェックを実行する下流の範囲を制御します。|

##### dbt Cloud {#dbt-cloud}

| 設定      | 説明                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job URL` | プルリクエストによってトリガーされ、CI 用に dbt モデルをマテリアライズする dbt Cloud CI ジョブのロケーター。Datadog は、dbt Cloud インテグレーションを通じてこのジョブの実行イベントを受信します。これらは通常、`https://cloud.getdbt.com/...` のように表示されます。|

**Bitbucket Cloud および Azure DevOps**

Azure DevOps リポジトリで dbt Cloud のネイティブ Azure DevOps 統合 (Enterprise プラン) を使用している場合、CI ジョブは自動的に開始されます。このセクションはスキップしてください。

それ以外の場合は、[dbt Cloud Administrative API][9] を使用してパイプラインから CI ジョブを開始します。まず、CI プロバイダーの例にあるこれらのプレースホルダーを置き換えます。

| プレースホルダー | 値 |
| ----------- | ----- |
| `<DBT_CLOUD_HOST>` | dbt Cloud ホスト名 (例: `cloud.getdbt.com`)。|
| `<ACCOUNT_ID>` | dbt Cloud CI ジョブ URL のアカウント ID。|
| `<CI_JOB_ID>` | 同じ URL の CI ジョブ ID。|

{{< tabs >}}
{{% tab "Bitbucket Pipelines" %}}

1. ジョブを実行できる dbt Cloud API トークンを作成します。
2. Bitbucket で、トークンを `DBT_API_KEY` という名前の保護されたリポジトリ変数として保存します。
3. `bitbucket-pipelines.yml` に次のステップを追加します。ファイルにすでに `pipelines` が含まれている場合は、`pipelines > pull-requests > '**'` の下にこのステップを追加します。

```yaml
pipelines:
  pull-requests:
    '**':
      - step:
          name: Trigger dbt Cloud CI job
          script:
            - |
              curl --fail -X POST "https://<DBT_CLOUD_HOST>/api/v2/accounts/<ACCOUNT_ID>/jobs/<CI_JOB_ID>/run/" \
                -H "Authorization: Token $DBT_API_KEY" \
                -H "Content-Type: application/json" \
                -d "{\"cause\": \"Bitbucket PR #$BITBUCKET_PR_ID\",
                     \"git_sha\": \"$BITBUCKET_COMMIT\",
                     \"non_native_pull_request_id\": $BITBUCKET_PR_ID,
                     \"schema_override\": \"dbt_cloud_pr_<CI_JOB_ID>_$BITBUCKET_PR_ID\"}"
```

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

Azure Repos のリポジトリの場合:

1. ジョブを実行できる dbt Cloud API トークンを作成します。
2. トークンを `DBT_API_KEY` という名前のシークレット Azure Pipelines 変数として保存します。
3. ターゲットブランチに[ビルド検証ブランチポリシー][10]を追加して、プルリクエストのパイプラインを実行します。
4. パイプラインの `steps` セクションにこの Bash ステップを追加します。`env` ブロックはシークレットとプルリクエストの値をスクリプトに渡し、`condition` はプルリクエスト用ではないビルドでそのステップをスキップします。

```yaml
steps:
  - bash: |
      curl --fail -X POST "https://<DBT_CLOUD_HOST>/api/v2/accounts/<ACCOUNT_ID>/jobs/<CI_JOB_ID>/run/" \
        -H "Authorization: Token $DBT_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"cause\": \"Azure DevOps PR #$PR_NUMBER\",
             \"git_sha\": \"$HEAD_SHA\",
             \"non_native_pull_request_id\": $PR_NUMBER,
             \"schema_override\": \"dbt_cloud_pr_<CI_JOB_ID>_$PR_NUMBER\"}"
    displayName: Trigger dbt Cloud CI job
    condition: eq(variables['Build.Reason'], 'PullRequest')
    env:
      DBT_API_KEY: $(DBT_API_KEY)
      PR_NUMBER: $(System.PullRequest.PullRequestId)
      HEAD_SHA: $(System.PullRequest.SourceCommitId)
```

{{% /tab %}}
{{< /tabs >}}

**注**:
- `non_native_pull_request_id` と `git_sha` の両方を含めて、`git_sha` をプルリクエストのヘッドコミットに設定します。Datadog は両方を使用して、実行とプルリクエストを照合します。
- `schema_override`は CI テーブルを本番環境のスキーマから除外します。ジョブ ID を含めることで、2 つの CI ジョブが同じスキーマに書き込むことを防ぎます。
- dbt Cloud は、API によってトリガーされた実行に対してこれらのスキーマを削除しません。スケジュールでクリーンアップしてください。

##### dbt Core {#dbt-core}

| 設定            | 説明                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job Name`      | プルリクエストによってトリガーされ、CI 用に dbt モデルをマテリアライズし、OpenLineage イベントを Datadog に送信するジョブの名前。                                                                                                                  |
| `CI Job Namespace` | 上記で指定されたジョブから OpenLineage イベントを送信する際に指定される OPENLINEAGE_NAMESPACE 変数。[環境変数を設定する][7]を参照してください。OpenLineage イベントの送信時にこの変数を設定しない場合は、ここで指定する必要はありません。|

**Bitbucket Cloud および Azure DevOps**

まず、[環境変数の設定][7]でセットアップを完了します。次に、`dbt-ol` を実行するステップで、これら 2 つの変数を CI プロバイダーの値に設定します。

- `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER`
- `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__VERSION`

| CI プロバイダー | `PULL_REQUEST_NUMBER` | `VERSION` |
| ----------- | --------------------- | --------- |
| Bitbucket Pipelines | `$BITBUCKET_PR_ID` | `$BITBUCKET_COMMIT` |
| Azure Repos を使用した Azure Pipelines | `$(System.PullRequest.PullRequestId)` | `$(System.PullRequest.SourceCommitId)` |
| GitHub リポジトリを使用した Azure Pipelines | `$(System.PullRequest.PullRequestNumber)` | `$(System.PullRequest.SourceCommitId)` |

`VERSION` を明示的に設定します。これらのプロバイダーでは、プルリクエストのビルドはマージコミットをチェックアウトするため、git から検出されたコミットはプルリクエストのヘッドコミットではなく、実行はプルリクエストと一致しません。

Azure Repos の場合は、ターゲットブランチに[ビルド検証ブランチポリシー][10]を追加して、プルリクエストのコンテキストでパイプラインを実行できるようにします。

#### コンテナ内で dbt Core CI ジョブを実行する {#running-your-dbt-core-ci-job-in-a-container}

CI ランナーが `docker run` で dbt Core を起動する場合は、リポジトリ URL、プルリクエストのヘッドコミット SHA、およびプルリクエスト番号をコンテナに渡します。コンテナは、ランナーの git コンテキストを自動的に継承しません。

Datadog が実行とプルリクエストを照合してドリフト結果を表示するには、`sourceCodeLocation` ファセットでこれら 3 つの値すべてが必要です。

**GitHub Actions** の場合は、ランナーで値を読み取り、それらをコンテナに渡します。

```shell
# On the CI runner, before launching the container:
PR_NUMBER=$(jq -r '.pull_request.number'  "$GITHUB_EVENT_PATH")
HEAD_SHA=$(jq -r '.pull_request.head.sha' "$GITHUB_EVENT_PATH")   # the pull request's head commit, not the merge commit
REPO_URL="${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}"

docker run \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__REPO_URL="$REPO_URL" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER="$PR_NUMBER" \
  -e OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__VERSION="$HEAD_SHA" \
  <YOUR_IMAGE> <YOUR_DBT_OL_COMMAND>
```

ワークフローは、プルリクエストが開かれたとき、または更新されたときに実行される必要があります。

```yaml
on:
  pull_request:
    types: [opened, synchronize, reopened]
```

他の CI プロバイダーの場合は、上記の例で `PR_NUMBER`、`HEAD_SHA`、および `REPO_URL` に割り当てられている値を置き換えます。プルリクエストパイプライン (GitLab のマージリクエストパイプライン、Bitbucket `pull-requests` パイプライン、またはビルド検証ポリシーによって開始された Azure Pipelines ビルド) としてジョブを実行します。それ以外の場合、これらの値は空になります。

{{< tabs >}}
{{% tab "GitLab CI" %}}

```shell
PR_NUMBER="$CI_MERGE_REQUEST_IID"
# In merged results pipelines, use $CI_MERGE_REQUEST_SOURCE_BRANCH_SHA instead.
HEAD_SHA="$CI_COMMIT_SHA"
REPO_URL="$CI_PROJECT_URL"
```

{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

```shell
PR_NUMBER="$BITBUCKET_PR_ID"
HEAD_SHA="$BITBUCKET_COMMIT"
REPO_URL="https://bitbucket.org/$BITBUCKET_REPO_FULL_NAME"
```

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

```shell
# For a GitHub repository, use $SYSTEM_PULLREQUEST_PULLREQUESTNUMBER instead.
PR_NUMBER="$SYSTEM_PULLREQUEST_PULLREQUESTID"
HEAD_SHA="$SYSTEM_PULLREQUEST_SOURCECOMMITID"
REPO_URL="$SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI"
```

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_observability/lineage/
[2]: /ja/integrations/#cat-source-control
[3]: /ja/data_observability/quality_monitoring/#supported-data-sources
[4]: /ja/data_observability/jobs_monitoring/dbt/?tab=dbtcloud
[5]: /ja/data_observability/jobs_monitoring/dbt/?tab=dbtcore
[6]: /ja/data_observability/jobs_monitoring/openlineage/
[7]: /ja/data_observability/jobs_monitoring/dbt/?tab=dbtcore#set-the-environment-variables
[8]: /ja/data_observability/quality_monitoring/data_warehouses/snowflake/
[9]: https://docs.getdbt.com/docs/deploy/ci-jobs#trigger-a-ci-job-with-the-api-
[10]: https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies#build-validation