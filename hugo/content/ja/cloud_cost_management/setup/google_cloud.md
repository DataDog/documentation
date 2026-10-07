---
aliases:
- /ja/cloud_cost_management/google_cloud/
disable_toc: false
further_reading:
- link: /cloud_cost_management/
  tag: ドキュメント
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/aws
  tag: ドキュメント
  text: AWS の請求に関する情報を得る
- link: /cloud_cost_management/azure
  tag: ドキュメント
  text: Azure の請求に関する情報を得る
- link: /cloud_cost_management/oracle
  tag: ドキュメント
  text: Oracle の請求に関する情報を得る
title: Google Cloud
---
## 概要 {#overview}

Datadog で Google Cloud Cost Management を使用するには、以下の手順に従います。
1. [Google Cloud Platform インテグレーション][12]を構成する
2. 必要なアクセス許可 (Google サービス API、エクスポートプロジェクトアクセス、BigQuery データセットアクセス) を持つ[詳細使用量コストエクスポート][13]を設定する
3. 必要なアクセス許可 (バケットアクセス) を持つ [Google Cloud Storage バケット][15]を作成または選択する

## セットアップ {#setup}

[API][18]、[Terraform][19]、または以下の手順に従って Datadog で直接セットアップできます。

### Google Cloud Platform インテグレーションを構成する {#configure-the-google-cloud-platform-integration}
[セットアップと構成][3]に移動し、Google Cloud Platform アカウントを追加し、[Google Cloud Platform インテグレーション]を構成する手順に従います。

<div class="alert alert-danger">
Datadog Google Cloud Platform インテグレーションでは、このサービスアカウントがアクセスできるすべてのプロジェクトの Cloud Cost を自動的にモニターできます。
これらのプロジェクトのインフラストラクチャーモニタリングホストを制限するには、ホストにタグを適用します。次に、インテグレーションページの {{< ui >}}Limit Metric Collection Filters{{< /ui >}} セクションで、タグをモニタリングに含めるか除外するかを定義します。
</div>

{{< img src="cloud_cost/gcp_integration_limit_metric_collection.png" alt="Google Cloud Platform インテグレーションページで構成されたメトリクス収集フィルターの制限セクション" >}}

### 詳細使用量コストエクスポートを有効にする {#enable-detailed-usage-cost-export}
<div class="alert alert-info">
<a href="https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage">詳細使用量コストデータ</a>には、標準使用量コストデータに含まれるすべての情報に加えて、リソースレベルの詳細なコストデータを提供する追加フィールドが含まれます。
</div>

 1. Google Cloud コンソールの *Billing* の下にある[請求エクスポート][1]に移動します。
 2. [詳細使用量コスト][2]エクスポートを有効にします (プロジェクトと BigQuery データセットを選択または作成)。
 3. エクスポートが構成された請求アカウントの {{< ui >}}Billing Account ID{{< /ui >}} を文書化し、エクスポート {{< ui >}}Project ID{{< /ui >}} と {{< ui >}}Dataset Name{{< /ui >}} も文書化します。

{{< img src="cloud_cost/billing_export.png" alt="強調表示された Google Cloud プロジェクトとデータセット情報" >}}

_新しく作成された BigQuery 請求エクスポートデータセットには、最新の 2 か月分のデータのみが含まれます。このデータが BigQuery にバックフィルされるまでには 1 ～ 2 日かかる場合があります。_

#### Google サービス API を有効にする {#enable-google-service-apis}
以下のアクセス許可により、Datadog はスケジュールされた BigQuery クエリを使用して請求エクスポートにアクセスし、ストレージバケットに転送することができます。

- [BigQuery API][5] を有効にします。
  1. Google Cloud コンソールで、プロジェクトセレクターページに移動し、Google Cloud プロジェクトを選択します。
  2. すべての転送に対してプロジェクトで請求を有効にします。

- [BigQuery データ転送サービス][5]を有効にします。
  1. API ライブラリで BigQuery データ転送 API ページを開きます。
  2. ドロップダウンメニューから、サービスアカウントを含むプロジェクトを選択します。
  3. {{< ui >}}ENABLE{{< /ui >}} ボタンをクリックします。

  **注:** BigQuery データ転送 API は、サービスアカウントを含む Google プロジェクトで有効にする必要があります。

{{< tabs >}}

{{% tab "Terraform" %}}

{{< img src="cloud_cost/setup/gcp_terraform_setup.png" alt="Terraform モードの Cloud Cost Management セットアップフォーム" style="width:100%" >}}

### 構成の詳細を定義する {#define-configuration-details}

構成のために以下の詳細を入力します。

* **GCP ストレージバケット**: ストレージバケットを作成するには **Yes** を選択し、既存のバケットを使用するには **No** を選択します。

    **注**: 既存のバケットを使用する場合、バケットが BigQuery エクスポートデータセットと同じ場所にあることを確認します。

* **バケット名**: 新しいまたは既存の GCP ストレージバケットの名前。
* **リージョン**: バケットの GCP リージョン。例: `northamerica-northeast1`。
* **請求アカウント ID**: 使用量コストエクスポートがコストを報告する請求アカウントの ID。
* **エクスポートプロジェクト名および ID**: エクスポートプロジェクトの名前と ID。
* **エクスポートデータセット名および ID**: エクスポートデータセットの名前と ID。

### コストエクスポートを作成し、Google サービス API を有効にする {#create-cost-export-and-enable-google-service-apis}

上記の[詳細使用量コストエクスポートを有効にする](#enable-detailed-usage-cost-export)および [Google Service API を有効にする](#enable-google-service-apis)ステップを完了し、CCM に戻ります。

### 生成された Terraform HCL をコピーし、変更を適用する {#copy-generated-terraform-hcl-and-apply-changes}

CCM Terraform セットアップ UI で、**Apply Terraform Configuration** ステップの指示に従ってください。CCM に戻ってアカウント作成を確認する前に、`terraform plan` または `terraform apply` を実行中に表示される問題を解決します。

{{% /tab %}}

{{% tab "手動" %}}

{{< img src="cloud_cost/setup/gcp_manual_setup.png" alt="手動モードの Cloud Cost Management セットアップフォーム" style="width:100%" >}}

#### エクスポートプロジェクトアクセスを構成する {#configure-export-project-access}
[エクスポートデータセットプロジェクトリソースにサービスアカウントをプリンシパルとして追加する][7]:
1. Google Cloud コンソールの IAM ページに移動し、エクスポートデータセットプロジェクトを選択します。
2. サービスアカウントをプリンシパルとして選択します。
3. ドロップダウンリストから次の権限を持つロールを選択します。
  * `bigquery.jobs.create`
  * `bigquery.transfers.get`
  * `bigquery.transfers.update`

  **注:** これはカスタムロールである可能性があります。または、既存の Google Cloud ロール `roles/bigquery.admin` を使用できます。

#### エクスポート BigQuery データセットアクセスを構成する {#configure-export-bigquery-dataset-access}
[エクスポート BigQuery データセットリソースにサービスアカウントをプリンシパルとして追加する][8]:
1. BigQuery ページのエクスプローラーペインで、プロジェクトを展開してエクスポート BigQuery データセットを選択します。
2. {{< ui >}}Sharing{{< /ui >}} > {{< ui >}}Permissions{{< /ui >}} の順にクリックし、その後 {{< ui >}}add principal{{< /ui >}} をクリックします。
3. 新しいプリンシパルフィールドにサービスアカウントを入力します。
4. ロールリストの選択を使用して、次の権限を持つロールを割り当てます。
  * `bigquery.datasets.get`
  * `bigquery.tables.create`
  * `bigquery.tables.delete`
  * `bigquery.tables.export`
  * `bigquery.tables.get`
  * `bigquery.tables.getData`
  * `bigquery.tables.list`
  * `bigquery.tables.update`
  * `bigquery.tables.updateData`

  **注:** これはカスタムロールである可能性があります。または、既存の Google Cloud ロール `roles/bigquery.dataEditor` を使用できます。

#### バケットアクセスを構成する {#configure-bucket-access}
[GCS バケットリソースにサービスアカウントをプリンシパルとして追加する][6]:
1. Google Cloud コンソールの Cloud Storage Buckets ページに移動し、バケットを選択します。
2. 権限タブを選択し、{{< ui >}}grant access{{< /ui >}} ボタンをクリックします。
3. 新しいプリンシパルフィールドにサービスアカウントを入力します。
4. 次の権限を持つロールを割り当てます。
   * `storage.buckets.get`
   * `storage.objects.create`
   * `storage.objects.delete`
   * `storage.objects.get`
   * `storage.objects.list`

  **注:** これはカスタムロールである可能性があります。または、既存の Google Cloud ロール `roles/storage.legacyObjectReader` および `roles/storage.legacyBucketWriter` を使用できます。

[6]: https://cloud.google.com/storage/docs/access-control/using-iam-permissions#bucket-add
[7]: https://cloud.google.com/iam/docs/granting-changing-revoking-access#grant-single-role
[8]: https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset

{{% /tab %}}

{{< /tabs >}}

### Google Cloud Storage バケットを作成または選択する {#create-or-select-a-google-cloud-storage-bucket}
Cloud Cost Management は、詳細な使用コストの BigQuery データセットから抽出されたデータを受け取るために GCP ストレージバケットを使用します (`datadog_cloud_cost_detailed_usage_export` のプレフィックス付き)。新しいバケットを作成するか、既存のものを使用できます。

**注:** バケットは BigQuery エクスポートデータセットと共に[配置されている必要があります][9]。

### (オプション) クロスプロジェクトサービス認証を構成する: {#optional-configure-cross-project-service-authorization}
統合されたサービスアカウントが請求エクスポートデータセットとは異なる Google Cloud Platform プロジェクトに存在する場合、[クロスプロジェクトサービスアカウント認証を付与する][10]必要があります。

1. [公式ドキュメント][11]に従い、以下の値を使用してサービスエージェントの作成をトリガーします。
   * ENDPOINT: `bigquerydatatransfer.googleapis.com`
   * RESOURCE_TYPE: `project`
   * RESOURCE_ID: エクスポートデータセットプロジェクト<br><br>

     これにより、`service-<billing project number>@gcp-sa-bigquerydatatransfer.iam.gserviceaccount.com` のような新しいサービスエージェントが作成されます。


2. トリガーによって作成された BigQuery データ転送サービスアカウントロールをサービスアカウントのプリンシパルとして追加します
3. それに `roles/iam.serviceAccountTokenCreator` ロールを割り当てます。

### Cloud Cost を構成する {#configure-cloud-cost}
[セットアップと構成][3]に示された手順に引き続き従います。

**注:** Datadog でデータが安定するまでに、セットアップ後 48～72 時間かかることがあります。

### 履歴データの取得 {#getting-historical-data}

新しく作成された BigQuery 請求エクスポートデータセットには、最新の 2 か月分のデータのみが含まれます。このデータが BigQuery にバックフィルされるまでには 1 ～ 2 日かかる場合があります。Datadog は、BigQuery テーブルに表示されたら最大 15 か月分の利用可能な履歴コストデータを自動的に取り込みます。

Google Cloud は、BigQuery エクスポートが最初に作成される際に自動的に含まれる 2 か月を超える追加の履歴データをバックフィルするプロセスを提供していません。

## コストタイプ {#cost-types}
インジェストしたデータは、以下のコストタイプで可視化することができます。

| コストタイプ                                       | 説明 |
|-------------------------------------------------| ----------------------------------|
| `gcp.cost.amortized`                            | 期間中、使用時に割り当てられたリソースの総コスト。コストには、プロモーションクレジットやコミットされた使用量割引クレジットが含まれます。|
| `gcp.cost.amortized.shared.resources.allocated` | Google Cloud Platform の減価償却コストすべてと、コンテナワークロードのための追加の内訳とインサイト。[コンテナコスト割り当て][14]が必要です。|
| `gcp.cost.ondemand`                             | パブリックおよびプライベートの割引が適用される前の、リソースの総パブリックオンデマンドコスト。|

### すぐに使えるタグ {#out-of-the-box-tags}

Datadog は、複数のソースからのタグで Google Cloud コストデータを自動的に強化します。コストデータにタグがどのように適用されるかの包括的な概要については、[タグ][17]を参照してください。

以下のすぐに使えるタグは、[詳細使用量コストレポート][16]から派生しており、コストデータの発見と理解を容易にします。

| タグ名                         | タグの説明       |
| ---------------------------- | ----------------- |
| `google_product`             | 請求されている Google サービス。|
| `google_cost_type`           | この項目でカバーされる課金の種類 (例: 通常、税金、調整、または丸め誤差)。|
| `google_usage_type`          | 項目の使用量の詳細 (例: Standard Storage US)。|
| `google_location`            | マルチリージョン、国、リージョン、またはゾーンのレベルで項目に関連する場所。|
| `google_region`              | 項目に関連するリージョン。|
| `google_zone`                | 項目に関連する Availability Zone。|
| `google_pricing_usage_unit`  | 使用量コストを計算するために使用される料金単位 (例: ジビバイト、テビバイト、または年)。|
| `google_is_unused_reservation`| 使用が予約されていたものの使用されなかったかどうか。|
| `service_description` | Google Cloud サービス (例: Compute Engine または BigQuery)。|
| `project_id` | Cloud Billing データを生成した Google Cloud プロジェクトの ID。|
| `project_name` | Cloud Billing データを生成した Google Cloud プロジェクトの名前。|
| `cost_type` | この行項目が表すコストの種類: `regular`、`tax`、`adjustment`、または `rounding error`。|
| `sku_description` | リソースの使用量の詳細を説明する、使用されたリソースタイプの説明。|
| `resource_name` | お客様がリソースに追加する名前。これはすべてのリソースに該当するとは限りません。|
| `global_resource_name` | Google Cloud によって生成されたグローバルに一意なリソース識別子。|

#### コストと監視可能性の相関 {#cost-and-observability-correlation}

監視可能性データの文脈でコストを確認することは、インフラストラクチャーの変更がコストにどのように影響するかを理解し、コストが変動する理由を特定し、コストとパフォーマンスの両方のインフラストラクチャーを最適化するために重要です。Datadog は、監視可能性とコストメトリクスの相関を簡素化するため、主要な Google 製品のコストデータにおけるリソース識別タグを更新します。

例えば、各 Cloud SQL データベースのコストと使用状況を表示するには、`gcp.cost.amortized`、`gcp.cloudsql.database.cpu.utilization`、および `gcp.cloudsql.database.memory.utilization` (または他の Cloud SQL メトリック) を使ってテーブルを作成し、`database_id` でグループ化できます。または、Cloud Function の使用状況とコストを並べて表示するには、`gcp.cloudfunctions.function.execution_count` および `gcp.cost.amortized` を `function_name` でグループ化してグラフ化できます。

以下のすぐに使えるタグが利用可能です。
| Google 製品     | タグ                        |
| -------------------| ----------------------------- |
| Compute Engine     | `instance_id`, `instance-type`|
| Cloud Functions    | `function_name`               |
| Cloud Run          | `job_name`, `service_name`    |
| Cloud SQL          | `database_id`                 |
| Cloud Spanner      | `instance_id`                 |
| App Engine         | `module_id`                   |
| BigQuery           | `project_id`, `dataset_id`    |
| Kubernetes Engine  | `cluster_name`                |

### コンテナ割り当て {#container-allocation}
**コンテナ割り当て**メトリクスには、Google Cloud Platform メトリクスと同じコストがすべて含まれていますが、コンテナワークロードのための追加の内訳とインサイトも含まれています。詳細は[コンテナコスト割り当て][14]を参照してください。

## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.cloud.google.com/billing/export/
[2]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup
[3]: https://app.datadoghq.com/cost/setup
[4]: https://app.datadoghq.com/integrations/google-cloud-platform
[5]: https://cloud.google.com/bigquery/docs/enable-transfer-service
[9]: https://cloud.google.com/bigquery/docs/exporting-data#data-locations
[10]: https://cloud.google.com/bigquery/docs/enable-transfer-service#cross-project_service_account_authorization
[11]: https://cloud.google.com/iam/docs/create-service-agents#create
[12]: /ja/integrations/google_cloud_platform/
[13]: /ja/cloud_cost_management/setup/google_cloud/#enable-detailed-usage-cost-export
[14]: /ja/cloud_cost_management/container_cost_allocation/
[15]: /ja/cloud_cost_management/setup/google_cloud/#create-or-select-a-google-cloud-storage-bucket
[16]: https://cloud.google.com/billing/docs/how-to/export-data-bigquery-tables/detailed-usage
[17]: /ja/cloud_cost_management/tags
[18]: /ja/api/latest/cloud-cost-management/#create-google-cloud-usage-cost-config
[19]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/gcp_uc_config