---
aliases:
- /ja/data_observability/jobs_monitoring/dbtcore
- /ja/data_observability/jobs_monitoring/dbtcloud
description: ジョブ実行のメタデータとモデルリネージのために、dbt Cloud または dbt Core を Datadog に接続します。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability について
- link: https://www.datadoghq.com/blog/understanding-dbt/
  tag: ブログ
  text: 'dbt の理解: 基本とベストプラクティス'
title: dbt
---
## 概要 {#overview}

Datadog は、dbt Cloud または dbt Core のメタデータにアクセスして、ジョブ実行に関する情報 (実行時間、dbt によって生成されたモデル、モデル間のリネージ関係など) を抽出できます。Datadog は、ウェアハウス内のテーブルと dbt モデルを照合し、テーブル障害の原因と影響を特定します。

{{< tabs >}}
{{% tab "dbt Cloud" %}}

以下の手順に従って、dbt Cloud を Datadog に接続します。

## dbt Cloud で API トークンを生成する {#generate-an-api-token-in-dbt-cloud}

Datadog がアカウントのメタデータにアクセスできるように dbt Cloud でサービストークンを作成します。

1. dbt Cloud で、{{< ui >}}User Profile{{< /ui >}} > {{< ui >}}API Tokens{{< /ui >}} > {{< ui >}}Service Tokens{{< /ui >}} に移動します。
2. {{< ui >}}\+ Create Service Token{{< /ui >}} をクリックします。
3. トークンに名前を設定します。
4. トークンの権限を設定します。
   - dbt Cloud で Webhook を自分で作成する場合は、関連する dbt Cloud プロジェクトにスコープ設定された {{< ui >}}Stakeholder/Read-Only{{< /ui >}} 権限セットを使用します。
   - Datadog が Webhook を作成および管理する場合は、dbt Cloud Enterprise プランには {{< ui >}}Developer{{< /ui >}} 権限を、dbt Cloud Team プランには {{< ui >}}Account Admin{{< /ui >}} 権限を使用します。
5. {{< ui >}}Save{{< /ui >}} をクリックし、生成された API トークンをコピーします。

## dbt Cloud アカウントを Datadog に接続する {#connect-your-dbt-cloud-account-to-datadog}

API トークンを使用して、Data Observability で統合を構成します。

1. [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1] に移動します。
2. {{< ui >}}dbt Cloud{{< /ui >}} セクションで、{{< ui >}}Configure{{< /ui >}} をクリックします。
3. すでに dbt Cloud 統合アカウントを作成済みの場合は、前述の権限を持つ API トークンで更新されていることを確認してください。
4. まだ作成していない場合は、アカウントを作成します。{{< ui >}}Account Name{{< /ui >}}、{{< ui >}}Account Id{{< /ui >}}、{{< ui >}}Account Url{{< /ui >}}、および {{< ui >}}API Token{{< /ui >}} セクションに入力します。
5. {{< ui >}}Save{{< /ui >}} をクリックして設定を保存します。

## Webhook を構成する {#configure-webhooks}

Data Observability 設定で、dbt Cloud アカウントを展開し、Datadog が dbt Cloud ジョブ実行イベントを受信する方法を選択します。

### dbt Cloud で Webhook を自分で作成する {#create-the-webhook-in-dbt-cloud-yourself}

アーティファクトのインジェストに {{< ui >}}Stakeholder/Read-Only{{< /ui >}} サービストークンを使用する場合は、このオプションを使用します。

1. {{< ui >}}I'll manage the webhook in dbt Cloud myself{{< /ui >}} を選択します。
2. Datadog の Webhook URL をコピーします。
3. dbt Cloud で、{{< ui >}}Account Settings{{< /ui >}} > {{< ui >}}Webhooks{{< /ui >}} > {{< ui >}}Create New Webhook{{< /ui >}} に移動します。
4. Datadog の Webhook URL を Webhook URL フィールドに貼り付けます。
5. {{< ui >}}Job Run Started{{< /ui >}} および {{< ui >}}Job Run Completed{{< /ui >}} イベントを有効にします。インジェストを特定のジョブに限定するには、dbt Cloud の Webhook 設定でそれらのジョブを選択します。
6. dbt Cloud で Webhook を保存します。
7. dbt Cloud から HMAC シークレットをコピーし、Datadog の {{< ui >}}HMAC secret from dbt Cloud{{< /ui >}} フィールドに貼り付けて、{{< ui >}}Save{{< /ui >}} をクリックします。

**注**: 保存後、自分で作成した Webhook が dbt Cloud からのトラフィックを受け入れ始めるまでに最大 5 分かかる場合があります。

後で Datadog のユーザー管理 Webhook 設定を削除する場合は、dbt Cloud から手動で Webhook を削除してください。

### Datadog に Webhook を管理させる {#let-datadog-manage-the-webhook}

Datadog に dbt Cloud の Webhook を作成および管理させたい場合は、このオプションを使用します。

1. {{< ui >}}Datadog-managed{{< /ui >}} を選択します。
2. {{< ui >}}Save{{< /ui >}} をクリックします。

このモードでは、dbt Cloud Enterprise プランには {{< ui >}}Developer{{< /ui >}} 権限を、dbt Cloud Team プランには {{< ui >}}Account Admin{{< /ui >}} 権限を持つ dbt Cloud トークンが必要です。

## 次のステップ {#whats-next}

次回の dbt ジョブ実行後、以下に示すように、[Datadog Data Observability][2] でジョブ実行データとリネージデータの確認を開始できるはずです。

{{< img src="data_observability/data-obs-dbt-cloud-final.png" alt="Data Observability の概要では、dbt ジョブの実行が時系列の積み上げ棒グラフで表示され、接続されている dbt Cloud アカウントとそのステータスがテーブルで表示されます。" style="width:100%;" >}}

[1]: https://app.datadoghq.com/data-obs/settings/integrations
[2]: https://app.datadoghq.com/data-obs/catalog?integration=dbt

{{% /tab %}}

{{% tab "dbt Core" %}}

以下の手順に従って、dbt Core を Datadog に接続します。

**注**: 外部オーケストレーター (Airflow など) で dbt Core を実行しており、オーケストレーターのタスクと dbt の実行を関連付けたい場合は、まず [Airflow インテグレーションの手順][1] に従ってください。

## Datadog API キーを取得する {#retrieve-your-datadog-api-key}

1. [こちらの指示に従って][2]、Datadog API キーを作成または取得します。

## openlineage-dbt をインストールする {#install-openlineage-dbt}

1. `openlineage-dbt` パッケージをインストールします。このパッケージを仮想環境にセットアップするには、[Amazon MWAA で dbt を使用する][3] を参照してください。

   ```shell
   pip3 install openlineage-dbt>=1.39.0
   ```

## 環境変数を設定する {#set-the-environment-variables}

1. 以下の環境変数を設定します。`datadoghq.com` を組織の該当する [Datadog サイト][4] に置き換えます。定義済みの Datadog サイトの詳細については、[OpenLineage ドキュメント][5] を参照してください。

   ```shell
   export DD_SITE=datadoghq.com
   export DD_API_KEY=<YOUR_DATADOG_API_KEY>
   export OPENLINEAGE__TRANSPORT__TYPE=datadog

   # OPENLINEAGE_NAMESPACE determines the Datadog tag value for the environment (similar to how the service tag identifies the application).
   # Typical values are dev, staging, or prod, but you can over ride it with any custom value.
   export OPENLINEAGE_NAMESPACE=<YOUR_ENV>

   # Optional, for debugging purposes
   export OPENLINEAGE_CLIENT_LOGGING=DEBUG

   # Required for CI/CD Drift Detection (requires openlineage-dbt >= 1.46.0).
   # Attaches the sourceCodeLocation facet (repository URL, commit SHA, and pull
   # request number) so Datadog can associate the dbt run with a pull request.
   # Disabled by default; not required for job monitoring alone.
   export OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__DISABLED=false
   ```

   [CI/CD チェック][8] の場合、実行時に `GITHUB_REF` (プルリクエストによってトリガーされる GitHub Actions ワークフロー) または `CI_MERGE_REQUEST_IID` (GitLab マージリクエストパイプライン) が公開されると、プルリクエスト番号が自動的に検出されます。どちらの変数も存在しない場合は、プルリクエスト番号を明示的に設定します。

   ```shell
   export OPENLINEAGE__FACETS__SOURCE_CODE_LOCATION__PULL_REQUEST_NUMBER=<PR_NUMBER>
   ```

   CI ジョブがランナーの git コンテキストを継承しないコンテナ内で実行される場合 (例: コンテナを起動する GitHub Actions ワークフロー)、リポジトリ URL、コミット SHA、プルリクエスト番号は自動的に検出されないため、これら 3 つすべてを明示的に渡す必要があります。[コンテナ内での dbt Core CI ジョブを実行する](/data_observability/cicd/#running-your-dbt-core-ci-job-in-a-container)を参照してください。

## dbt 呼び出しを更新する {#update-the-dbt-invocation}

1. dbt 呼び出しを変更し、`dbt` を直接呼び出す代わりに OpenLineage ラッパー (`dbt-ol`) を使用します。これは、`run`、`build`、`test` など、Datadog で追跡したいすべての dbt コマンドに適用されます。利用可能なコマンドの全リストについては、[dbt ドキュメント][7] を参照してください。
2. `--consume-structured-logs` フラグを追加して、コマンドの実行中に dbt ジョブを表示します。

   ```shell
   # Run models
   dbt-ol run --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>

   # Run tests (required to see test failures in Datadog)
   dbt-ol test --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>

   # Run build (runs models, tests, seeds, and snapshots)
   dbt-ol build --consume-structured-logs --openlineage-dbt-job-name <YOUR_DBT_JOB_NAME>
   ```

## 次のステップ {#whats-next-1}

次回の dbt ジョブ実行後、以下に示すように、[Datadog Data Observability][6] でジョブ実行データとリネージデータの確認を開始できるはずです。

{{< img src="data_observability/data-obs-dbt-cloud-final.png" alt="dbt ジョブの実行とモデルリネージが表示された Data Observability の概要。" style="width:100%;" >}}

[1]: /ja/data_jobs/airflow/?tab=kubernetes
[2]: /ja/account_management/api-app-keys/#add-an-api-key-or-client-token
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[4]: /ja/getting_started/site/#access-the-datadog-site
[5]: https://openlineage.io/docs/client/python/#predefined-datadog-sites
[6]: https://app.datadoghq.com/data-obs/catalog?integration=dbt
[7]: https://docs.getdbt.com/docs/running-a-dbt-project/run-your-dbt-projects
[8]: /ja/data_observability/cicd/

{{% /tab %}}
{{< /tabs >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}