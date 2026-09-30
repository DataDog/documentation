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
## 概要{#overview}

{{< img src="data_observability/cicd/cicd-overview.png" alt="CI/CD 機能レポートページ" style="width:100%;" >}}

dbt モデルを変更するプルリクエスト (PR) を開くと、Data Observability の CI/CD チェックが自動的に実行されます。これらのチェックにより、変更をマージしても安全かどうかを判断するために必要な情報が得られます。

Datadog は結果を PR へのコメントとして投稿し、新しい変更をプッシュするたびにそのコメントが更新されます。詳細なレポートも Datadog 上で確認でき、PR のコメント内にそのレポートへのリンクが記載されます。

## チェックの種類{#check-types}

### Impact Lineage{#impact-lineage}

Impact Lineage は、変更された dbt モデルの下流にあるすべての要素を含むグラフを構築します。マージ前にこの機能を使用して、変更による影響範囲を評価できます。変更したモデルに依存しているテーブル、ダッシュボード、その他のコンシューマーを特定し、適切な所有者にレビューを依頼することができます。

Datadog によるリネージグラフの構築や操作方法の詳細については、「[リネージ][1]」を参照してください。

### Drift Detection{#drift-detection}

Drift Detection は、一連の統計的チェックを用いて、変更前後のモデルによって生成されるデータを比較します。この機能を使用することで、モデルの変更が期待どおりの出力を生成しているかを確認したり、行数の大幅な変動、NULL 率の変化、列の値のカーディナリティの変化といった意図しない副作用を検知したりできます。

## セットアップ{#setup}

### 1. ソース管理プロバイダーと dbt プロジェクトを接続する{#1-connect-your-source-control-provider-and-dbt-project}

1. [ソース管理プロバイダー][2]を接続します。CI/CD チェックは GitHub および GitLab をサポートしています。
2. dbt モデルが実行される[サポートされているデータソースアカウント][3]を接続します。
3. [dbt Cloud][4] または [dbt Core][5] プロジェクトを Datadog に接続します。CI/CD チェックの設定中に dbt プロジェクトを接続することもできます。

### 2. dbt プロジェクトとリポジトリを選択する{#2-select-your-dbt-project-and-repository}

1. CI/CD 設定から、[{{< ui >}}Add CI/CD Checks{{< /ui >}}] をクリックします。
2. チェックを追加する dbt プロジェクトを選択します。
3. そのプロジェクトのメインのジョブを選択します。これは、dbt スキーマについて最も知識を持つジョブです。
4. Datadog がソース管理プロバイダーからリポジトリを自動的に推論できない場合は、手動で選択してください。

{{< img src="data_observability/cicd/cicd-connection.png" alt="CI/CD 機能作成ページ" style="width:100%;" >}}

#### 高度な設定{#advanced-settings}

dbt プロジェクトがリポジトリのルートにない場合は、高度な設定で dbt プロジェクトへのパスを指定できます。

### 3. チェックの設定{#3-configure-checks}

各チェックは個別に有効にできます。すべてのチェックを有効にすると、最も詳細なレポートが得られます。

#### Impact Lineage{#impact-lineage-1}

Impact lineage は、モデルの変更によって影響を受ける可能性のある下流のアセットのグラフを生成します。

##### 一般設定{#general-settings}

| 設定                            | 説明                                                          |
| ---------------------------------- | -------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | ドラフトのプルリクエストまたはマージリクエストでチェックを実行するには、このオプションを有効にします。|

#### Drift Detection{#drift-detection-1}

ドリフト検出は、ブランチ上のデータの現在の状態をベースラインと比較し、差異があればフラグを立てます。Datadog は、CI パイプラインからの dbt 実行をドリフト検出チェックのトリガーとして使用します。**dbt Core** の場合、Datadog がこれらの実行を受信できるように、CI ジョブから OpenLineage イベントを送信する必要があります。「[OpenLineage のセットアップドキュメント][6]」を参照してください。**dbt Cloud** の場合、[[dbt Cloud](#dbt-cloud)] セクションの [`CI Job URL`] 設定で、プルリクエスト時に実行される CI ジョブを構成します。

比較を行うには、Datadog が CI ジョブによって作成されたテーブルを読み取れる必要があります。Snowflake のセットアップ時に作成したロール (デフォルトでは `DATADOG_ROLE`) には、CI ジョブがモデルをマテリアライズするデータベースに対する `USAGE` および `SELECT` 権限が必要です。Datadog の Snowflake インテグレーション設定には `grant_database_access` プロシージャが含まれており、これにより対象データベース内のすべてのスキーマにある現在および将来のすべてのテーブルとビューに対して、これらの権限が付与されます。CI ジョブが書き込みを行うデータベースに対して、このプロシージャを実行します。

```sql
CALL grant_database_access('["<CI_DATABASE>"]', '<ROLE_NAME>');
```

CI がプルリクエストごとに一時的なデータベースを作成する場合は、新しいデータベースが読み取り可能になるように、そのプロビジョニングステップの一部として当該プロシージャを呼び出してください。プロシージャの定義については、「[Snowflake セットアップ][8]」を参照してください。このアクセス権がない場合、Datadog は CI 実行を受信しても CI テーブルをクエリできず、ドリフト検出は失敗します。

**dbt Core** の場合、ドリフト検出には、`sourceCodeLocation` ファセットを通じて OpenLineage イベントにプルリクエスト番号を付加することも必要です。これには、`openlineage-dbt` バージョン 1.46.0 以降と `OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false` 環境変数が必要です。「[環境変数の設定][7]」を参照してください。dbt Core CI ジョブがコンテナ内で実行される場合は、追加の設定が必要です。「[コンテナ内で dbt Core CI ジョブを実行する](#running-your-dbt-core-ci-job-in-a-container)」セクションを参照してください。

##### 一般設定{#general-settings-1}

| 設定                            | 説明                                                                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Run on Draft Pull/Merge Requests` | ドラフトのプルリクエストまたはマージリクエストでチェックを実行するには、このオプションを有効にします。                                                                                         |
| `Threshold`                        | ドリフト検出のしきい値 (例: 10% のドリフトは `0.1`)。メトリクスがこのしきい値を超えると、チェック結果に警告として表示されます。     |
| `Downstream Checks`                | dbt モデルが変更されると、そのモデルおよび下流のすべての dbt モデルに対してドリフト検出チェックが生成されます。この設定は、チェックを実行する下流の範囲を制御します。|

##### dbt Cloud{#dbt-cloud}

| 設定      | 説明                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job URL` | プルリクエストによってトリガーされ、CI 用に dbt モデルをマテリアライズする dbt Cloud CI ジョブのロケーター。Datadog は、dbt Cloud インテグレーションを通じてこのジョブの実行イベントを受信します。これらは通常、`https://cloud.getdbt.com/...` のように表示されます。|

##### dbt Core{#dbt-core}

| 設定            | 説明                                                                                                                                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CI Job Name`      | プルリクエストによってトリガーされ、CI 用に dbt モデルをマテリアライズし、OpenLineage イベントを Datadog に送信するジョブの名前。                                                                                                                  |
| `CI Job Namespace` | 上記で指定されたジョブから OpenLineage イベントを送信する際に指定される OPENLINEAGE_NAMESPACE 変数。「[環境変数の設定][7]」を参照してください。OpenLineage イベントの送信時にこの変数を設定しない場合は、ここで指定する必要はありません。|

#### コンテナ内で dbt Core CI ジョブを実行する{#running-your-dbt-core-ci-job-in-a-container}

dbt Core CI ジョブが CI ランナーによって起動されるコンテナ内で実行される場合 (例: `docker run` を使用してジョブを実行する GitHub Actions ワークフローなど)、コンテナは CI ランナーから git コンテキストを継承しません。その結果、リポジトリ URL、コミット SHA、プルリクエスト番号が自動的に検出されず、それらの情報が含まれない状態で `sourceCodeLocation` ファセットが送信されます。Datadog はこれらの値を使用して、実行と作成または更新したプルリクエストを照合するため、これらの値がないとプルリクエストにドリフト結果が表示されません。

以下の例では GitHub Actions を使用しています。他の CI プロバイダーでは環境変数名は異なりますが、アプローチは同じです。CI ランナー上で値を読み取り、それらをコンテナに明示的に渡します。

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

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/data_observability/lineage/
[2]: /ja/integrations/#cat-source-control
[3]: /ja/data_observability/quality_monitoring/#supported-data-sources
[4]: /ja/data_observability/jobs_monitoring/dbt/?tab=dbtcloud
[5]: /ja/data_observability/jobs_monitoring/dbt/?tab=dbtcore
[6]: /ja/data_observability/jobs_monitoring/openlineage/
[7]: /ja/data_observability/jobs_monitoring/dbt/?tab=dbtcore#set-the-environment-variables
[8]: /ja/data_observability/quality_monitoring/data_warehouses/snowflake/