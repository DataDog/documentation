---
aliases:
- /ja/logs/s3/
- /ja/logs/gcs/
- /ja/logs/archives/s3/
- /ja/logs/archives/gcs/
- /ja/logs/archives/gcp/
- /ja/logs/archives/
description: 収集されたログをすべて長期的なストレージへ転送します。
further_reading:
- link: /logs/archives/rehydrating
  tag: よくあるご質問
  text: Datadog でアーカイブされたログコンテンツにアクセスする方法について
- link: /logs/explorer/
  tag: よくあるご質問
  text: ログエクスプローラーについて
- link: /logs/logging_without_limits/
  tag: よくあるご質問
  text: Logging without Limits* について
title: ログアーカイブ
---
## 概要{#overview}

Datadog アカウントを設定して、取り込まれたすべてのログ（[インデックス化された][1]ものも含む）を自分のクラウドストレージシステムに転送します。ログをストレージ最適化されたアーカイブに長期間保管し、コンプライアンス要件を満たしつつ、アドホック調査のための監査可能性を保持します。これは、[再水和][2]または[アーカイブ検索][16]を使用して行います。

{{< img src="/logs/archives/log_forwarding_archives_122024.png" alt="ログ転送ページのアーカイブタブ" style="width:100%;">}}

[**ログアーカイブと転送**ページ][3]に移動して、取り込んだログを自分のクラウドホストのストレージバケットに転送するためのアーカイブをセットアップします。

1. まだの場合は、お使いのクラウドプロバイダーと Datadog [インテグレーション](#set-up-an-integration)を設定してください。
2. ストレージバケットを[作成します](#create-a-storage-bucket)
3. そのアーカイブに対して[権限](#set-permissions)を`read`および/または`write`設定します。
4. [そのアーカイブへの送信およびそこからの受信のルーティングを行います](#route-your-logs-to-a-bucket)
5. 暗号化、ストレージクラス、タグなどの[詳細設定](#advanced-settings)を構成します。
6. [設定を](#validation)検証し、Datadog が検出できる可能性のある構成ミスがないか確認します。

環境から直接ストレージに最適化されたアーカイブにログをルーティングしたい場合は、[Observability Pipelines でログをアーカイブする][4]方法を参照してください。

次のメトリクスは、再試行後に正常に送信されたログを含む、正常にアーカイブされたログについて報告します。

- datadog.archives.logs.bytes
- datadog.archives.logs.count


## アーカイブを構成します {#configure-an-archive}

### インテグレーションを設定します {#set-up-an-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

まだ構成されていない場合は、S3 バケットを保持する AWS アカウントの [AWS インテグレーション][1]をセットアップします。
   * 一般的なケースでは、Datadog が AWS S3 との統合に使用できるロールを作成することが含まれます。
   * 特に AWS China アカウントの場合は、ロール委任の代わりにアクセスキーを使用します。

[1]: /ja/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

まだの場合は、新しいストレージアカウントを保持しているサブスクリプション内で[Azure インテグレーション][1]を設定します。これは、Datadog が統合に使用できる[アプリ登録を作成すること][2]を含みます。

**注:** Azure ChinaCloud および Azure GermanyCloud へのアーカイブはサポートされていません。Azure GovCloudへのアーカイブはプレビューでサポートされています。アクセスをリクエストするには、Datadog サポートに連絡してください。

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ja/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

まだ行っていない場合は、GCSストレージバケットを保持するプロジェクトのために[Google Cloud 統合][1]を設定してください。これは、Datadogが統合に使用できる[Google Cloudサービスアカウントを作成すること][2]を含みます。

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /ja/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### ストレージバケットを作成します{#create-a-storage-bucket}

{{< site-region region="gov" >}}
<div class="alert alert-danger">ログをアーカイブに送信することは、Datadog GovCloud 環境の外部であり、Datadog の管理下にはありません。Datadogは、Datadog GovCloud環境を離れたログに対して責任を負いません。これには、FedRAMP、DoDインパクトレベル、ITAR、輸出コンプライアンス、データ居住地、またはそのようなログに適用される類似の規制に関連するユーザーの義務や要件が含まれますが、これに限定されません。</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

[AWS コンソール][1]にアクセスし、アーカイブを転送する [S3 バケットを作成][2]します。

{{< site-region region="gov" >}}
<div class="alert alert-danger">Datadogアーカイブは、バーチャルホストスタイルのアドレッシングに依存するS3 FIPSエンドポイントと統合される際、ドット（.）を含むバケット名をサポートしていません。AWS ドキュメントから詳細を確認してください。<a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a>および<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWSバーチャルホスティング</a></div>
{{< /site-region >}}

**注:**

- バケットを公開可読にしないでください。
- [US1、US3、US5サイト][3]については、[AWS料金][4]を参照して、リージョン間データ転送料金とクラウドストレージコストへの影響を確認してください。`us-east-1`でストレージバケットを作成して、リージョン間データ転送料金を管理することを検討してください。

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /ja/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

* [Azureポータル][1]に移動し、[ストレージアカウントを作成][2]してアーカイブを送信します。ストレージアカウントに名前を付け、標準パフォーマンスまたは**ブロックBlob**プレミアムアカウントタイプのいずれかを選択し、**ホット**または**クール**アクセスティアを選択します。
* そのストレージアカウントに**コンテナ**サービスを作成します。コンテナ名をメモしておいてください。Datadogアーカイブページに追加する必要があります。

**注:** まれに最後のデータを書き換える必要があるため、[不変性ポリシー][3]を設定しないでください（通常はタイムアウト）。

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

[Google Cloudアカウント][1]に移動し、[GCSバケットを作成][2]してアーカイブを送信します。**オブジェクトへのアクセス制御方法を選択する**の下で、**オブジェクトレベルおよびバケットレベルの権限を設定する**を選択します。

**注:** まれに最後のデータを書き換える必要があるため、[保持ポリシー][3]を追加しないでください (通常はタイムアウト)。

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 権限を設定する{#set-permissions}

[`logs_write_archive`権限][5]のある Datadog ユーザーだけがログアーカイブ構成を作成、変更、または削除できます。

{{< tabs >}}
{{% tab "AWS S3" %}}

1. 次の権限ステートメントを含む[ポリシーを作成][1]します。

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "DatadogUploadAndRehydrateLogArchives",
         "Effect": "Allow",
         "Action": ["s3:PutObject", "s3:GetObject"],
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*",
           "arn:aws:s3:::<MY_BUCKET_NAME_2_/_MY_OPTIONAL_BUCKET_PATH_2>/*"
         ]
       },
       {
         "Sid": "DatadogRehydrateLogArchivesListBucket",
         "Effect": "Allow",
         "Action": "s3:ListBucket",
         "Resource": [
           "arn:aws:s3:::<MY_BUCKET_NAME_1>",
           "arn:aws:s3:::<MY_BUCKET_NAME_2>"
         ]
       }
     ]
   }
   ```
     * The `GetObject` and `ListBucket` permissions allow for [rehydrating from archives][2].
     * The `PutObject` permission is sufficient for uploading archives.
     * Ensure that the resource value under the `s3:PutObject` and `s3:GetObject` actions ends with `/*` because these permissions are applied to objects within the buckets.

2. バケット名を編集します。
3. 必要に応じて、ログアーカイブを含むパスを指定します。
4. 新しいポリシーを Datadog の統合ロールにアタッチします。
   * AWS IAM コンソールの**Roles**に移動します。
   * Datadog インテグレーションで使用されるロールを見つけます。デフォルトでは、**DatadogIntegrationRole**という名前ですが、組織が名前を変更している場合は異なる場合があります。ロール名をクリックして、ロールの概要ページを開きます。
   * **Add permissions**をクリックし、次に**Attach policies**をクリックします。
   * 上記で作成したポリシーの名前を入力します。
   * **Attach policies**をクリックします。


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /ja/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Datadog アプリに、ストレージアカウントへの書き込みおよび再水和のための権限を付与します。
2. [ストレージアカウントのページ][1]からストレージアカウントを選択し、**アクセス制御 (IAM)**に移動し、**追加 -> 役割の割り当てを追加**を選択します。
3. ロールとして**Storage Blob Data Contributor**を入力し、Azure と統合するために作成した Datadog アプリを選択して、保存します。

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Storage Blob Data Contributor ロールを Datadog アプリに追加します。" style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Datadog Google Cloud サービスアカウントに、アーカイブをバケットに書き込むための権限を付与します。
2. [Google Cloud IAM Admin ページ][1]から Datadog の Google Cloud サービスアカウントのプリンシパルを選択し、**Edit principal** を選択します。
3. ADD ANOTHER ROLE**をクリックし、**Storage Object Admin**ロールを選択して保存します。

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Datadog Google Cloud サービスアカウントに Storage Object Admin ロールを追加します。" style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### ログをバケットにルーティングします。{#route-your-logs-to-a-bucket}

[Log Archiving & Forwarding ページ][6]に移動し、**Add a new archive** を **Archives** タブで選択します。

**注意:**
* [`logs_write_archive`権限][5]のある Datadog ユーザーだけがこの手順と次の手順を完了させることができます。
* ログを Azure Blob Storage にアーカイブするには、アプリ登録が必要です。[Azure 統合ページ][7]の手順を参照し、ドキュメントページの右側にある "site" を "US" に設定してください。アーカイブ目的で作成されたアプリ登録には、"Storage Blob Data Contributor" ロールのみが必要です。ストレージバケットが Datadog リソースを通じて監視されているサブスクリプションにある場合、アプリ登録が冗長であるという警告が表示されます。この警告は無視できます。
* バケットでネットワークアクセスを特定の IP に制限している場合は、Webhook の IP を追加してください。 {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} 許可リストに追加してください。
* **US1-FED サイト**について、Datadog を構成して Datadog GovCloud 環境の外部にログを送信できます。Datadog は、Datadog GovCloud 環境を離れるログについて責任を負いません。さらに、Datadog は、GovCloud 環境を離れた後のこれらのログに関して、FedRAMP、DoD インパクトレベル、ITAR、輸出コンプライアンス、データ居住地、または類似の規制に関する義務や要件について責任を負いません。

| サービス                  | 手順                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - S3 バケットに適した AWS アカウントとロールの組み合わせを選択します。<br>- バケット名を入力します。<br>**オプション**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。|
| **Azure Storage**        | - **Azure Storage** アーカイブタイプを選択し、ストレージアカウントで Storage Blob Data Contributor ロールのある Datadog アプリ用の Azure テナントとクライアントを選択します。<br>- ストレージアカウント名とアーカイブのコンテナ名を入力します。<br>**オプション**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。|
| **Google Cloud Storage** | - **Google Cloud Storage** のアーカイブタイプを選択し、ストレージバケットに書き込む権限を持つ GCS サービスアカウントを選択します。<br>- バケット名を入力します。<br>**オプション**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。|

### 高度な設定 {#advanced-settings}

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="オプションのタグを追加し、最大スキャンサイズを定義するための高度な設定" style="width:100%;" >}}

#### Datadog タグ {#datadog-tags}

以下のためにこのオプションの構成ステップを使用します。

* アーカイブにすべてのログタグを含めます（すべての新しいアーカイブでデフォルトで有効）。**注意**: これにより、結果として得られるアーカイブのサイズが増加します。
* 制限クエリポリシーに従って、再水和ログにタグを追加します。[`logs_read_data`][13] の権限を参照してください。

#### 最大スキャンサイズを定義する {#define-maximum-scan-size}

このオプションの構成ステップを使用して、ログアーカイブでリハイドレートのためにスキャンできるログデータの最大量 (GB 単位) を定義します。

最大スキャンサイズが定義されたアーカイブの場合、すべてのユーザーは再水和を開始する前にスキャンサイズを見積もる必要があります。見積もったスキャンサイズがそのアーカイブで許可されているサイズを超える場合、ユーザーは再水和をリクエストする時間範囲を短縮する必要があります。時間範囲を短縮することでスキャンサイズが減少し、ユーザーは再水和を開始できるようになります。

#### アーカイブパーティション属性（プレビュー） {#archive-search-partition-attribute}

{{< callout url="https://www.datadoghq.com/product-preview/flex-frozen-archive-search/" btn_hidden="false" header="プレビューに参加してください！" >}}
アーカイブ検索はプレビュー中です。リアルタイムでアーカイブされたログを検索するためのアクセスをリクエストしてください。再水和なし、遅延なし。必要なときに数年分のデータに即座にアクセスできます。
{{< /callout >}}

アーカイブされたログがストレージ内で物理的にどのように整理されるかを最適化するために（および [アーカイブ検索][16] を加速するために）、Datadog アーカイブでパーティション属性を構成してください。

* **パーティション属性**: 検索フィルターとして頻繁に使用する `service`、`source`、`env`、または `status` のような低カーディナリティ属性を追加します。
* **利点**: 同じパーティション属性値を共有するログは、ストレージ内でまとめて保存されます。検索時、Datadogはクエリに一致しない全てのパーティションをスキップできるため、スキャンされるデータ量が大幅に削減されます。

#### アーカイブ検索属性（プレビュー）{#archive-search-lookup-attribute}

{{< callout url="https://www.datadoghq.com/product-preview/flex-frozen-archive-search/" btn_hidden="false" header="プレビューに参加してください！" >}}
アーカイブ検索はプレビュー中です。リアルタイムでアーカイブされたログを検索するためのアクセスをリクエストしてください。再水和なし、遅延なし。必要なときに数年分のデータに即座にアクセスできます。
{{< /callout >}}

アーカイブ内の検索や調査を加速するために（[アーカイブ検索][16]を使用）、Datadogアーカイブに検索属性を設定してください。

* **検索属性**: `trace_id`、`container_id`、または`customer_id`のような高カーディナリティ属性を追加します。
* **利点**: これにより、長期ストレージ内の特定のログをより迅速に特定でき、アドホック調査中のスキャン時間とデータ量を削減できます。

**パーティションと検索属性**

| | パーティション | 検索 |
|---|---|---|
| **カーディナリティ** | 低（数十から数百の値） | 高（数百万の値） |
| **典型的な属性** | `service`、`source`、`env`、`status` | `trace_id`、`container_id`、`user_id`、`transaction_id` |
| **どのように役立つか** | スキャン時にパーティション全体をスキップする | アーカイブ内の個々のログエントリを特定する |
| **主な用途** | 環境やサービスによる広範なフィルタリング | 特定の識別子に関するアドホック調査 |

最大の検索パフォーマンスを得るために、両方を組み合わせてください：パーティション属性は関連するデータセグメントに検索スコープを絞り、検索属性はそれらのセグメント内の特定のログを瞬時に見つけることができます。

{{< site-region region="us3" >}}

#### ファイアウォールルール {#firewall-rules}

{{< tabs >}}
{{% tab "Azure ストレージ" %}}

ファイアウォールルールはサポートされていません。

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}
#### ストレージクラス {#storage-class}

{{< tabs >}}
{{% tab "AWS S3" %}}

アーカイブのストレージクラスを選択するか、[S3 バケットにライフサイクルコンフィギュレーションを設定][1]して、ログアーカイブを最適なストレージクラスに自動的に移行できます。

[リハイドレート][2]は、以下のストレージクラスのみをサポートします。

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval
* S3 Intelligent-Tiering、[オプションの非同期アーカイブアクセス階層][3]が両方とも無効化されている場合のみ。

他のストレージクラスにあるアーカイブからリハイドレートする場合は、まず上記のサポートされているストレージクラスのいずれかに移動させる必要があります。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /ja/logs/archives/rehydrating/
[3]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
{{% /tab %}}
{{% tab "Azure Storage" %}}

アーカイブと[リハイドレート][1]は、以下のアクセス層にのみ対応しています。

- ホットアクセス層
- クールアクセス層

他のアクセス層にあるアーカイブからリハイドレートする場合は、まず上記のサポートされている層のいずれかに移動させる必要があります。

[1]: /ja/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

アーカイブと[リハイドレート][1]は、以下のアクセス層に対応しています：

- 標準
- ニアライン
- コールドライン
- アーカイブ

[1]: /ja/logs/archives/rehydrating/
{{% /tab %}}

{{< /tabs >}}

#### S3アーカイブのサーバーサイド暗号化（SSE） {#server-side-encryption-sse-for-s3-archives}

DatadogでS3アーカイブを作成または更新する際に、オプションで**高度な暗号化**を設定できます。**暗号化タイプ**のドロップダウンには、3つのオプションがあります：

- **デフォルトのS3バケットレベルの暗号化**（デフォルト）：Datadogは、S3バケットのデフォルトの暗号化設定を上書きしません。
- **Amazon S3管理キー**：S3バケットのデフォルトの暗号化に関係なく、Amazon S3管理キー（[SSE-S3][17]）を使用してサーバーサイド暗号化を強制します。
- **AWSキー管理サービス**：S3バケットのデフォルトの暗号化に関係なく、[AWS KMS][18]からの顧客管理キー（CMK）を使用してサーバーサイド暗号化を強制します。CMK ARNを提供する必要があります。

{{< tabs >}}
{{% tab "デフォルトのS3バケットレベルの暗号化" %}}

このオプションが選択されると、Datadogはアップロードリクエストに暗号化ヘッダーを指定しません。S3バケットのデフォルトの暗号化が適用されます。

S3バケットの暗号化設定を設定または確認するには：

1. S3 バケットに移動します。
2. **Properties** タブをクリックします。
3. **Default Encryption** セクションで、暗号化タイプを設定または確認します。暗号化に [AWS KMS][1] を使用している場合は、有効な CMK と CMK ポリシーが CMK に添付されていることを確認してください。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{% tab "Amazon S3 管理キー" %}}

このオプションは、すべてのアーカイブオブジェクトが [SSE_S3][1] を使用して、Amazon S3 管理キーでアップロードされることを保証します。これは S3 バケットのデフォルトの暗号化設定を上書きします。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
{{% /tab %}}
{{% tab "AWS Key Management Service" %}}

このオプションは、すべてのアーカイブオブジェクトが [AWS KMS][1] からの顧客管理キー (CMK) を使用してアップロードされることを保証します。これは S3 バケットのデフォルトの暗号化設定を上書きします。

有効な CMK と CMK ポリシーを作成するための以下の手順を完了していることを確認してください。次に、CMK ARN を提供して、この暗号化タイプを正常に構成します。

1. CMK を作成します。
2. CMK に以下の内容の CMK ポリシーをアタッチし、AWS アカウント番号と Datadog IAM ロール名を適切なものに置き換えます。

```
{
    "Id": "key-consolepolicy-3",
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow attachment of persistent resources",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<MY_AWS_ACCOUNT_NUMBER>:role/<MY_DATADOG_IAM_ROLE_NAME>"
            },
            "Action": [
                "kms:CreateGrant",
                "kms:ListGrants",
                "kms:RevokeGrant"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "kms:GrantIsForAWSResource": "true"
                }
            }
        }
    ]
}
```

3. Datadog で暗号化タイプとして **AWS Key Management Service****** を選択した後、AWS KMS キー ARN を入力します。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{< /tabs >}}

### 検証 {#validation}

Datadog アカウントでアーカイブ設定が正常に構成されると、処理パイプラインは Datadog に取り込まれたすべてのログに追加情報を付加し始めます。これらのログはその後アーカイブに転送されます。

ただし、アーカイブ設定を作成または更新した後、次のアーカイブアップロードが試行されるまでに数分かかることがあります。アーカイブがアップロードされる頻度は異なる場合があります。**15分後にストレージバケットを再度確認し、Datadog アカウントからアーカイブが正常にアップロードされていることを確かめてください**

その後、アーカイブがまだ保留状態の場合は、クエリが有効であり、[Live Tail][14] のログイベントに一致していることを確認するために、インクルージョンフィルターを確認してください。Datadogが設定や権限の意図しない変更により外部アーカイブにログをアップロードできない場合、該当するログアーカイブが設定ページで強調表示されます。

{{< img src="logs/archives/archive_errors_details.png" alt="アーカイブが正しく設定されていることを確認してください。" style="width:100%;">}}

アーカイブにカーソルを合わせると、エラーの詳細と問題を解決するためのアクションが表示されます。[イベントエクスプローラー][15] にもイベントが生成されます。これらのイベントのモニターを作成することで、障害を迅速に検出し、対応することができます。

## 複数のアーカイブ{#multiple-archives}

複数のアーカイブが定義されている場合、フィルターに基づき、最初のアーカイブにログが入力されます。

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="ログは、フィルターに一致する最初のアーカイブに保存されます。" style="width:100%;">}}

アーカイブの順序を慎重に決めることが重要です。例えば、最初に`env:prod`タグでフィルターされたアーカイブを作成し、次にフィルターなし（`*`に相当）でアーカイブを作成した場合、すべてのプロダクションログは一方のストレージバケットまたはパスに送られ、残りはもう一方に送られることになります。

## アーカイブの形式{#format-of-the-archives}

Datadogがストレージバケットに転送するログは、圧縮されたJSON形式（`.json.gz`）です。指定したプレフィックス（またはプレフィックスがない場合は`/`）を使用して、アーカイブはアーカイブファイルが生成された日付と時刻を示すディレクトリ構造に保存されます。以下のようになります：

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.02aafad5-f525-4592-905e-e962d1a5b2f7.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.json.gz
```

このディレクトリ構造により、過去のログアーカイブを日付に基づいてクエリする処理が簡略化されます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>

*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/indexes/#exclusion-filters
[2]: /ja/logs/archives/rehydrating/
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[4]: /ja/observability_pipelines/configuration/explore_templates/?tab=logs#archive-logs
[5]: /ja/account_management/rbac/permissions/?tab=ui#logs_write_archives
[6]: https://app.datadoghq.com/logs/pipelines/archives
[7]: /ja/integrations/azure/
[8]: https://ip-ranges.datadoghq.com/
[9]: /ja/account_management/rbac/permissions#logs_write_archives
[10]: /ja/account_management/rbac/permissions#logs_read_archives
[11]: /ja/account_management/rbac/permissions#logs_write_historical_view
[12]: /ja/account_management/rbac/permissions#logs_read_index_data
[13]: /ja/account_management/rbac/permissions#logs_read_data
[14]: /ja/logs/explorer/live_tail/
[15]: /ja/events/explorer/
[16]: /ja/logs/log_configuration/archive_search/?tab=amazons3
[17]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
[18]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html