---
description: RUM および Product Analytics のイベントを、ウェアハウスへの読み込みや長期保存のために、お客様自身のクラウドストレージへ転送します。
further_reading:
- link: /real_user_monitoring/explorer/
  tag: ドキュメント
  text: RUM エクスプローラーについて
- link: /real_user_monitoring/rum_without_limits/
  tag: ドキュメント
  text: RUM without Limits について学ぶ
- link: /product_analytics/
  tag: ドキュメント
  text: Product Analytics について学ぶ
private: true
title: Export Pipelines
---
{{< callout url="https://www.datadoghq.com/product-preview/export-pipelines/" btn_hidden="false" header="プレビューに参加しましょう。">}}
Export Pipelines はプレビュー版です。
{{< /callout >}}

## 概要{#overview}

Export Pipelines は、取り込まれた Real User Monitoring (RUM) および Product Analytics のイベントを、ご自分が所有するクラウドストレージバケット (Amazon S3、Azure Blob Storage、またはGoogle Cloud Storage) に JSON または Parquet 形式でストリーミングします。

{{< img src="real_user_monitoring/rum_export/rum-export-overview.png" alt="RUM アプリケーション設定ページ上の Export Pipelines リスト" style="width:100%;">}}

Export Pipelines を使用して、以下のことを行います。
- イベントデータを独自のデータウェアハウス (Snowflake、BigQuery、Databricks など) に読み込み、カスタム分析やレポート作成を行います。
- コンプライアンス要件を満たす、または長期アーカイブやアドホック調査のために生イベントを保持します。

Datadog は、お使いの Datadog アカウントからクラウドストレージシステムへのエクスポートのみを管理します。

## 仕組み{#how-it-works}

Export Pipelines は、[Real User Monitoring][4] と [Product Analytics][5] で共有される機能です。Pipelinesは、以下の 2 つのレベルで構成されます。

| スコープ | ソース | 最大パイプライン数 | 利用可能なプリセット |
|---|---|---|---|
| アプリケーションごと | RUM | 1 | *すべての RUM イベントタイプ*、または*セッション、ビュー、アクションのみ* |
| アプリケーションごと | Product Analytics | 1 | *すべての Product Analytics イベント* (セッション、ビュー、アクション、サーバーサイドイベント) |
| 組織ごと | Product Analytics | 1 | *ユーザーおよびアカウントプロファイル* |

*ユーザーおよびアカウントプロファイル*プリセットは、組織ごとに 1 つのパイプラインに制限されます。ユーザーデータとプロファイルデータはすべてのアプリケーションで共有されるため、アプリケーションごとに 1 つのパイプラインを作成すると、ストレージ内に重複したレコードが生成されます。

各パイプラインは、他のパイプラインとは独立して継続的にエクスポートを行います。

## 前提条件 {#prerequisites}

- アプリケーションでRUM (または Product Analytics、あるいはその両方) が有効になっていること。
- クラウドプロバイダーの Datadog インテグレーションがセットアップされていること: [Amazon Web Services][6]、[Azure][7]、または [Google Cloud][8]。
- Datadog ユーザーに `rum_write_archives` 権限があること。[ロールベースのアクセス制御][1]を参照してください。

## Export Pipelines をセットアップする {#set-up-an-export-pipeline}

### 1. クラウドインテグレーションをセットアップする {#1-set-up-your-cloud-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

まだ構成されていない場合は、S3 バケットを保持するアカウントの [AWS インテグレーション][1]をセットアップします。Export Pipelines はロールベース (STS) の AWS インテグレーションのみをサポートしており、アクセスキーインテグレーションはサポートしていません。

[1]: /ja/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

まだ設定していない場合は、ストレージアカウントが属するサブスクリプション内で [Azure インテグレーション][1]を設定してください。これには、[Datadog が使用できるアプリ登録の作成][2]が含まれます。

**注:** Azure ChinaCloud および Azure GermanyCloud へのエクスポートはサポートされていません。Azure GovCloud へのエクスポートはプレビュー版でサポートされています。アクセスをリクエストするには Datadog サポートにお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ja/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

まだ設定していない場合は、GCS バケットが属するプロジェクトで STS 対応の [Google Cloud インテグレーション][1]をセットアップしてください。これには、[Datadog が使用できる Google Cloud サービスアカウントの作成][2]が含まれます。送信先には GCP プロジェクト ID も必要です。

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /ja/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### 2. ストレージバケットを作成する {#2-create-a-storage-bucket}

{{< tabs >}}
{{% tab "AWS S3" %}}

[AWS コンソール][1]で、エクスポート用の [S3 バケットを作成][2]します。

**注:**

- バケットを公開読み取り可能にしないでください。
- [US1、US3、および US5 サイト][3]のリージョン間データ転送料金については、[AWS 料金][4]を参照してください。転送コストを最小限に抑えるため、`us-east-1` にバケットを作成することを検討してください。

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /ja/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

- [Azure ポータル][1]で[ストレージアカウントを作成][2]します。**Standard** パフォーマンスまたは **Block blobs premium** を選択し、**hot** または **cool** アクセス層のいずれかを選択します。
- そのストレージアカウント内に **コンテナ** を作成します。コンテナ名を控えておきます。これはパイプラインを構成する際に参照します。

**注:** [保持ポリシー][3] は設定しないでください。一部のイベントは、再書き込みが必要になる場合があります (通常はタイムアウト後の再試行時)。

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

[Google Cloud コンソール][1]で、エクスポート用の [GCS バケットを作成][2]します。[**オブジェクトへのアクセス制御方法を選択する**] の下で、[**オブジェクトレベルおよびバケットレベルの権限を設定する**] を選択します。

**注:** [保持ポリシー][3]は追加しないでください。一部のイベントは、再書き込みが必要になる場合があります (通常はタイムアウト後の再試行時)。

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 3. Datadog にバケットへのアクセス権を付与する {#3-grant-datadog-access-to-the-bucket}

{{< tabs >}}
{{% tab "AWS S3" %}}

1. 次のステートメントで[ポリシーを作成][1]します。

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "DatadogExportPipelineFiles",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       }
     ]
   }
   ```

   * `PutObject` は、エクスポートファイルのアップロードに必要です。
   * `GetObject` は、**テスト構成**を実行するために必要です。これには、テストファイルの書き込みと読み戻しによるアクセス検証が含まれます。
   * リソース値は `/*` で終わる必要があります。これらの権限はバケット内のオブジェクトに適用されます。

2. バケット名を編集します。
3. オプションとして、ポリシーを特定のパスに制限します。
4. Datadog のインテグレーションロールにポリシーをアタッチします。
   * AWS IAM コンソールで [**Roles**] に移動し、Datadog インテグレーションで使用されるロールを開きます。デフォルトでは `DatadogIntegrationRole` という名前ですが、組織で名前を変更している場合は異なる可能性があります。
   * [**Add permissions**]、[**Attach policies**] の順にクリックします。
   * 作成したポリシーの名前を入力します。
   * [**Attach policies**] をクリックします。

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Datadog アプリに、ストレージアカウントへの書き込み権限を付与します。
2. [ストレージアカウントのページ][1]でストレージアカウントを選択し、**Access Control (IAM)** を開き、**Add → Add Role Assignment** を選択します。
3. Azure との統合時に作成した Datadog アプリに **Storage Blob Data Contributor** ロールを割り当ててから、保存します。

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Datadog Google Cloud サービスアカウントに、バケットへの書き込み権限を付与します。
2. [Google Cloud IAM 管理ページ][1]で、Datadog サービスアカウントのプリンシパルを選択し、[**プリンシパルを編集**] をクリックします。
3. [**ADD ANOTHER ROLE**] をクリックし、[**Storage Object Admin**] を選択して、保存します。

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

**注:** バケットで IP によるネットワークアクセス制限を行っている場合は、 {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} に記載されている Webhook IP 範囲を許可リストに追加してください。

### 4. Datadog でパイプラインを構成する {#4-configure-the-pipeline-in-datadog}

1. Datadog で **[Digital Experience] > [Real User Monitoring] > [Manage Applications]** に移動します。
2. アプリケーションを選択し、**[Routing] > [Export Pipelines]** に移動します。
3. [**New Export Pipeline**] をクリックします。
4. サイドパネルの各セクションに入力します。

   **エクスポートするデータの定義**

   エクスポートするデータを選択します。ソースとプリセットのオプションは、UI 上で明確にラベル付けされています。

   **ファイル形式**

   {{< img src="real_user_monitoring/rum_export/rum-export-data-format.png" alt="Export Pipelines 構成パネルのデータ選択およびファイル形式オプション" style="width:85%;">}}

   - **Parquet**: BigQuery、Snowflake、Databricks などのデータウェアハウスに直接読み込む場合に最適です。
   - **JSON**: 独自のパイプラインでデータを処理する場合に最適です。

   **ストレージタイプの選択とバケットの構成**

   | プロバイダー | フィールド |
   |---|---|
   | **Amazon S3** | AWS アカウントとロール (AWS インテグレーションから) **バケット** (必須) **パス** (オプションのプレフィックス) |
   | **Azure Blob Storage** | Azure テナントおよびクライアント (Azure インテグレーションから) **ストレージアカウント**(必須) **コンテナ**(必須) **パス** (オプションのプレフィックス) |
   | **Google Cloud Storage** | GCP サービスアカウント (Google Cloudインテグレーションから) **バケット**(必須) **パス** (オプションのプレフィックス) |

5. オプションで、[**テスト構成**] をクリックします。Datadog は小さなテストファイルをバケットに書き込み、それを読み戻してアクセスを確認します。報告された権限や名前の付け方の問題を修正してから保存してください。
6. パイプラインを開始するには、[**Add Export Pipeline**] をクリックします。

## パイプラインのステータス {#pipeline-statuses}

作成されると、パイプラインは [Export Pipelines] ページに次のいずれかの状態を表示します。

| ステータス   | 意味                                                                                                                        |
|----------|--------------------------------------------------------------------------------------------------------------------------------|
| Active   | Datadog はイベントを正常にエクスポートしています。                                                                                     |
| Pending  | パイプラインが作成または更新されたばかりです。最初のアップロードまで数分お待ちください。                                        |
| Error    | Datadog はバケットに書き込めませんでした。通常は権限または名前の付け方の問題です。パイプラインを開き、[**Test Configuration**] を実行して詳細を確認してください。|
| Paused   | パイプラインは無効になっています。イベントはエクスポートされません。                                                                             |

パイプラインが 15 分以上 **Pending** のままになる場合は、[**Test Configuration**] を実行して根本的な問題を明らかにしてください。

## ファイル形式 {#file-format}

ファイルは、日付ごとにアーカイブを簡単にクエリできるようにディレクトリ構造で整理されます。

```
/<path>/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.<ext>
```

| 形式  | 拡張子     | 注記                                                          |
|---------|---------------|----------------------------------------------------------------|
| JSON    | `.json.gz`    | Gzip-圧縮された改行区切りの JSON。                       |
| Parquet | `.parquet`    | ネイティブ Parquet エンコーディング (gzip ラッパーなし)。イベントごとに 1 行で、型指定された列が含まれます。前処理なしで Snowflake、BigQuery、Databricks に直接読み込み可能です。|

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/
[2]: https://app.datadoghq.com/rum/list
[3]: /ja/api/latest/rum/
[4]: /ja/real_user_monitoring/
[5]: /ja/product_analytics/
[6]: /ja/integrations/amazon-web-services/
[7]: /ja/integrations/azure/
[8]: /ja/integrations/google_cloud_platform/