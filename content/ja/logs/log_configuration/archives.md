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
## 概要 {#overview}

Datadog アカウントを設定して、取り込まれたすべてのログ ([インデックス化済み][1] かどうかにかかわらず) を、お客様自身のクラウドストレージシステムへ転送します。[リハイドレート][2] や [アーカイブ検索][16] を利用することで、ログをストレージ効率に優れたアーカイブに長期間保存しながら、コンプライアンス要件を満たし、必要に応じた調査のための監査性も維持できます。

{{< img src="/logs/archives/log_forwarding_archives_122024.png" alt="[Log Forwarding] ページの [Archives] タブ" style="width:100%;">}}

[**Log Archiving & Forwarding** ページ][3] に移動して、取り込まれたログをお客様自身のクラウドホスト型ストレージバケットへ転送するためのアーカイブを設定します。

1. まだ設定していない場合は、お使いのクラウドプロバイダーについて、Datadog の[インテグレーション](#set-up-an-integration)を設定してください。
2. [ストレージバケット](#create-a-storage-bucket)を作成します。
3. そのアーカイブに対して、`read`および/または`write`の[権限](#set-permissions)を設定します。
そのアーカイブへの送信およびそのアーカイブからの取得のために、4. [ログをルーティング](#route-your-logs-to-a-bucket)します。
5. 暗号化、ストレージクラス、タグなどの[advanced settings](#advanced-settings)を構成します。
設定を6. [Validate](#validation)し、Datadog で検出される可能性のある構成ミスがないか確認します。

環境から直接ストレージに最適化されたアーカイブにログをルーティングしたい場合は、[Observability Pipelines でログをアーカイブする][4] 方法を参照してください。

次のメトリクスは、再試行後に正常に送信されたログなどの正常にアーカイブされたログについて報告します。

- datadog.archives.logs.bytes
- datadog.archives.logs.count


## アーカイブを構成する{#configure-an-archive}

### インテグレーションを設定する{#set-up-an-integration}

{{< tabs >}}
{{% tab "AWS S3" %}}

まだ構成されていない場合は、S3 バケットを保持する AWS アカウントの [AWS インテグレーション][1] を設定します。
   * 一般的なケースでは、これには、Datadog が AWS S3 との統合に使用できるロールの作成が含まれます。
   * 特に AWS China アカウントの場合は、ロール委任の代わりにアクセスキーを使用します。

[1]: /ja/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

まだ設定していない場合は、新しいストレージアカウントが属するサブスクリプション内で [Azure インテグレーション][1] を設定してください。これは、[Datadog が統合に使用できるアプリ登録の作成][2] を含みます。

**注:** Azure ChinaCloud および Azure GermanyCloud へのアーカイブはサポートされていません。Azure GovCloud へのアーカイブはプレビュー版でサポートされています。アクセスをリクエストするには、Datadog サポートにお問い合わせください。

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ja/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

まだ設定していない場合は、GCS ストレージバケットが属するプロジェクトで [Google Cloud インテグレーション][1] を設定してください。これは、[Datadog が統合に使用できる Google Cloud サービスアカウントの作成][2] を含みます。

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /ja/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### ストレージバケットを作成する{#create-a-storage-bucket}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">ログをアーカイブに送信することは Datadog GovCloud 環境の外で行われるため、Datadog の管理外となります。Datadog は、Datadog GovCloud 環境を離れたログについて一切の責任を負いません。これには、FedRAMP、DoD インパクトレベル、ITAR、輸出コンプライアンス、データ所在地、またはそれらのログに適用される同様の規制に関連してユーザーが負う義務や要件が含まれますが、これらに限定されません。</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

[AWS コンソール][1] にアクセスし、アーカイブを転送する [S3 バケットを作成][2] します。

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger"> Datadog アーカイブは、仮想ホスト形式のアドレッシングを使用する S3 FIPS エンドポイントと統合する場合、ドット (.) を含むバケット名をサポートしていません。AWS のドキュメントで詳細をご確認ください。<a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a> および <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWS バーチャルホスティング</a>。</div>
{{< /site-region >}}

**注:**

- バケットを公開読み取り可能にしないでください。
- [US1、US3、US5 サイト][3] については、[AWS 料金][4] を参照し、リージョン間データ転送料金およびクラウドストレージコストへの影響をご確認ください。リージョン間データ転送料金を管理するために、`us-east-1` にストレージバケットを作成することを検討してください。

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /ja/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

* [Azure ポータル][1] に移動し、アーカイブの送信先となる [ストレージアカウントを作成][2] してください。ストレージアカウントに名前を付け、標準パフォーマンスまたは **Block Blob** プレミアムアカウントタイプのいずれかを選択し、**hot**または**cool**アクセス層を選択してください。
* そのストレージアカウントに、**コンテナ**サービスを作成してください。コンテナ名をメモしておいてください。この後、Datadog アーカイブページに追加する必要があります。

**注:** まれに最後のデータを書き換える必要があるため、[不変性ポリシー][3] は設定しないでください (通常はタイムアウトが発生します)。

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

[Google Cloud アカウント][1] に移動し、アーカイブの送信先となる [GCS バケットを作成][2] してください。**オブジェクトへのアクセス制御方法を選択する**の下で、**オブジェクトレベルおよびバケットレベルの権限を設定する**を選択します。

**注:** まれに最後のデータを書き換える必要があるため、[保持ポリシー][3] を追加しないでください (通常はタイムアウト)。

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 権限を設定する{#set-permissions}

[`logs_write_archive`権限][5] を持つ Datadog ユーザーのみが、ログアーカイブ構成を作成、変更、または削除できます。

{{< tabs >}}
{{% tab "AWS S3" %}}

1. 次の権限ステートメントを持つ [ポリシーを作成][1] します。

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
3. オプションで、ログアーカイブを含むパスを指定します。
4. Datadog のインテグレーションロールに新しいポリシーをアタッチします。
   * AWS IAM コンソールで **Roles** に移動します。
   * Datadog インテグレーションで使用されているロールを特定します。デフォルトでは **DatadogIntegrationRole** という名前ですが、組織で名称が変更されている場合は異なる可能性があります。ロール名をクリックして、ロールのサマリーページを開きます。
   * **Add permissions**、**Attach policies** の順にクリックします。
   * 上記で作成したポリシーの名称を入力します。
   * **Attach policies** をクリックします。


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /ja/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Datadog アプリに、ストレージアカウントへの書き込みおよびリハイドレートを行うための権限を付与します。
2. [ストレージアカウントのページ][1] でストレージアカウントを選択し、**Access Control (IAM)** で **Add -> Add Role Assignment** を選択します。
3. Role に **Storage Blob Data Contributor** を入力し、Azure と統合するために作成した Datadog アプリを選択して、保存します。

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Storage Blob Data Contributor ロールを Datadog アプリに追加します。" style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Datadog Google Cloud サービスアカウントに、アーカイブをバケットに書き込むための権限を付与します。
2. [Google Cloud IAM Admin ページ][1] から Datadog の Google Cloud サービスアカウントのプリンシパルを選択し、**Edit principal** を選択します。
3. **ADD ANOTHER ROLE** をクリックし、**Storage Object Admin** ロールを選択し、保存します。

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Datadog の Google Cloud サービスアカウントに Storage Object Admin ロールを追加します。" style="width:75%;">}}

**Storage Object Admin** ロールは Datadog の推奨構成です。組織で最小権限のカスタムロールが必要な場合、アーカイブのアップロードには以下の個別権限が必要です。

- `storage.objects.create`
- `storage.objects.get`
- `storage.objects.list`
- `storage.objects.delete`

`storage.objects.delete`はアーカイブの書き込みリトライをサポートするために必要であり、その際 Datadog はバケット内の既存オブジェクトを上書きします。マルチパートアップロードの権限 (`storage.multipartUploads.*`) は必要ありません。

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### ログをバケットにルーティング{#route-your-logs-to-a-bucket}

[Log Archiving & Forwarding ページ][6] に移動し、**Archives** タブで **Add a new archive** を選択します。

**注:**
* [`logs_write_archive` 権限][5] のある Datadog ユーザーだけがこの手順と次の手順を完了させることができます。
* ログを Azure Blob Storage にアーカイブするには、アプリ登録が必要です。[Azure 統合ページ][7] の指示を参照し、ドキュメントページ右側の「site」を「US」に設定してください。アーカイブ目的で作成されたアプリ登録には、「Storage Blob Data Contributor」ロールのみが必要です。ストレージバケットが Datadog リソース経由で監視されているサブスクリプションにある場合、アプリ登録が冗長であるという警告が表示されます。この警告は無視できます。
* バケットのネットワークアクセスが特定の IP に制限されている場合は、 {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} に記載されている Webhook IP を許可リストに追加してください。
* **US1-FED および US2-FED サイト** については、Datadog を構成して Datadog GovCloud 環境外の送信先にログを送信できます。Datadog は、Datadog GovCloud 環境を離れたログについて一切の責任を負いません。さらに Datadog は、GovCloud 環境を離れた後のこれらのログに適用される FedRAMP、DoD インパクトレベル、ITAR、輸出コンプライアンス、データ所在地、または同様の規制に関して、ユーザーが負う義務や要件について一切の責任を負いません。

| サービス                  | ステップ                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - S3 バケットに適した AWS アカウントとロールの組み合わせを選択します。<br>- バケット名を入力します。<br>**オプション**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。|
| **Azure Storage**        | - **Azure Storage** アーカイブタイプを選択し、ストレージアカウントで Storage Blob Data Contributor ロールのある Datadog アプリ用の Azure テナントとクライアントを選択します。<br>- ストレージアカウント名とアーカイブのコンテナ名を入力します。<br>**オプション**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。|
| **Google Cloud Storage** | - **Google Cloud Storage** のアーカイブタイプを選択し、ストレージバケットに書き込む権限を持つ GCS サービスアカウントを選択します。<br>- バケット名を入力します。<br>**オプション**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。|

### 高度な設定 {#advanced-settings}

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="オプションのタグを追加し、最大スキャンサイズを設定するための詳細設定" style="width:100%;" >}}

#### Datadog タグ {#datadog-tags}

以下のためにこのオプションの構成ステップを使用します。

* アーカイブ内のすべてのログタグを含める (デフォルトでは、すべての新規アーカイブに有効化されています)。**注**: 結果のアーカイブサイズが増大します。
* リハイドレートされたログに、制限クエリポリシーに従ってタグを追加します。[`logs_read_data`][13] 権限を参照してください。

#### 最大スキャンサイズを定義する{#define-maximum-scan-size}

このオプションの構成ステップを使用して、ログアーカイブでリハイドレートのためにスキャンできるログデータの最大量 (GB 単位) を定義します。

最大スキャンサイズが定義されたアーカイブの場合、すべてのユーザーはリハイドレートを開始する前にスキャンサイズを見積もる必要があります。見積もったスキャンサイズがそのアーカイブで許可されているサイズを超える場合、ユーザーはリハイドレートの対象となる時間範囲を短縮する必要があります。時間範囲を短縮することでスキャンサイズが減少し、ユーザーはリハイドレートを開始できるようになります。

#### アーカイブパーティション属性 (プレビュー) {#archive-search-partition-attribute}

アーカイブされたログがストレージ内で物理的にどのように整理されるかを最適化し ([アーカイブ検索][16] の高速化のため)、Datadog アーカイブでパーティション属性を構成します。

* **パーティション属性**: 検索フィルターとして頻繁に使用する `service`、`source`、`env`、または `status` のような低カーディナリティ属性を追加します。
* **利点**: 同じパーティション属性値を共有するログは、ストレージ内で同じ場所に配置されます。検索時に、Datadog はクエリに一致しないすべてのパーティションをスキップでき、スキャンするデータ量を大幅に削減します。

#### アーカイブルックアップ属性 {#archive-lookup-attribute}

アーカイブ内の検索や調査を高速化するために ([アーカイブ検索][16] を使用)、Datadog アーカイブでルックアップ属性を構成します。

* **ルックアップ属性**: `trace_id`、`container_id`、または`customer_id` のような高カーディナリティ属性を追加します。
* **利点**: これにより、長期ストレージ内の特定のログをより迅速に特定でき、アドホック調査時のスキャン時間とデータ量を削減できます。

**パーティション属性とルックアップ属性の違い**

| | パーティション | ルックアップ |
|---|---|---|
| **カーディナリティ** | 低 (数十から数百の値) | 高 (数百万の値) |
| **典型的な属性** | `service`、`source`、`env`、`status` | `trace_id`、`container_id`、`user_id`、`transaction_id` |
| **どのように役立つか** | スキャン対象からパーティション全体を除外できる | アーカイブ内の個々のログエントリを特定できる |
| **最適な用途** | 環境やサービスによる広範なフィルタリング | 特定の識別子に対するアドホック調査 |

最大の検索パフォーマンスを得るために、両方を組み合わせて使用します。パーティション属性は検索スコープを関連するデータセグメントに絞り込み、ルックアップ属性はそれらのセグメント内の特定のログを瞬時に見つけることができます。

{{< site-region region="us3" >}}

#### ファイアウォールルール {#firewall-rules}

{{< tabs >}}
{{% tab "Azure Storage" %}}

ファイアウォールルールはサポートされていません。

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}

#### 圧縮 {#compression}

デフォルトでは、Datadog は **zstd** (Zstandard) 圧縮を使用してログをアーカイブします (`.json.zst`)、これは gzip と比較して、より高い圧縮率と高速な解凍速度を提供します。また、**gzip** 圧縮 (`.json.gz`) を設定することもできます。


圧縮を構成するには、[Log Archiving & Forwarding ページ][6] でアーカイブを作成または編集する際に、**Compression Type** を選択します。

- **zstd** (デフォルト): より高い圧縮率と高速な解凍速度。新しいアーカイブに推奨されます。特に、[アーカイブ検索][16] を使用する予定がある場合に適しています。
- **gzip**: 幅広くサポートされており、ほとんどのツールと互換性があります。

**注**: 既存のアーカイブの圧縮形式を変更しても、影響を受けるのは新しいアーカイブファイルのみです。すでにバケットに保存されているファイルは、元の形式のまま保持されます。

#### ストレージクラス {#storage-class}

{{< tabs >}}
{{% tab "AWS S3" %}}

アーカイブのストレージクラスを選択するか、[S3 バケットにライフサイクル設定を構成][1] して、ログアーカイブを最適なストレージクラスへ自動的に移行できます。

[リハイドレート][2] は、以下のストレージクラスのみをサポートします。

* S3 Standard
* S3 Standard-IA
* S3 One Zone-IA
* S3 Glacier Instant Retrieval
* S3 Intelligent-Tiering、[オプションの非同期アーカイブアクセス階層][3] が両方とも無効化されている場合のみ。

他のストレージクラスにあるアーカイブからリハイドレートする場合は、まず上記のサポートされているストレージクラスのいずれかに移動させる必要があります。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[2]: /ja/logs/archives/rehydrating/
[3]: https://aws.amazon.com/s3/storage-classes/intelligent-tiering/
{{% /tab %}}
{{% tab "Azure Storage" %}}

アーカイブと [リハイドレート][1] は、以下のアクセス層にのみ対応しています。

- ホットアクセス層
- クールアクセス層

他のアクセス層にあるアーカイブからリハイドレートする場合は、まず上記のサポートされている層のいずれかに移動させる必要があります。

[1]: /ja/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

アーカイブと [リハイドレート][1] では、以下のアクセス層がサポートされています。

- Standard
- Nearline
- Coldline
- Archive

[1]: /ja/logs/archives/rehydrating/
{{% /tab %}}

{{< /tabs >}}

#### S3 アーカイブのサーバー側暗号化 (SSE) {#server-side-encryption-sse-for-s3-archives}

Datadog で S3 アーカイブを作成または更新する際に、オプションで **Advanced Encryption** を設定できます。**Encryption Type** のドロップダウンには、3 つのオプションがあります。

- **Default S3 Bucket-Level Encryption** (デフォルト): Datadog は S3 バケットのデフォルト暗号化設定を上書きしません。
- **Amazon S3 managed keys**: S3 バケットのデフォルト暗号化に関係なく、[SSE-S3][17] を使用したサーバー側暗号化を強制します。
- **AWS Key Management Service**: S3 バケットのデフォルト暗号化に関係なく、[AWS KMS][18] の顧客管理キー (CMK) を使用したサーバー側暗号化を強制します。CMK ARN を指定する必要があります。

{{< tabs >}}
{{% tab "Default S3 Bucket-Level Encryption" %}}

このオプションを選択すると、Datadog はアップロードリクエストに暗号化ヘッダーを指定しません。S3 バケットのデフォルトの暗号化が適用されます。

S3 バケットの暗号化設定を設定または確認するには:

1. S3 バケットに移動します。
2. **Properties** タブをクリックします。
3. **Default Encryption** セクションで、暗号化タイプを設定または確認します。暗号化に [AWS KMS][1] を使用している場合は、有効な CMK と CMK ポリシーが CMK にアタッチされていることを確認してください。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{% tab "Amazon S3 managed keys" %}}

このオプションにより、すべてのアーカイブオブジェクトが [SSE_S3][1] を使用して、Amazon S3 managed keys でアップロードされます。これは S3 バケットのデフォルトの暗号化設定を上書きします。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingServerSideEncryption.html
{{% /tab %}}
{{% tab "AWS Key Management Service" %}}

このオプションにより、すべてのアーカイブオブジェクトが [AWS KMS][1] の顧客管理キー (CMK) を使用してアップロードされます。これは S3 バケットのデフォルトの暗号化設定を上書きします。

有効な CMK と CMK ポリシーを作成するために、以下の手順を完了していることを確認してください。次に、この暗号化タイプを正常に設定するために CMK ARN を指定します。

1. CMK を作成します。
2. 以下の内容で CMK に CMK ポリシーをアタッチし、AWS アカウント番号と Datadog IAM ロール名を適切な値に置き換えます。

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

3. Datadog で **Encryption Type** として **AWS Key Management Service** を選択した後、AWS KMS キー ARN を入力してください。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html

{{% /tab %}}
{{< /tabs >}}

### 検証 {#validation}

Datadog アカウントでアーカイブ設定が正常に構成された時点から、処理パイプラインは Datadog に取り込まれたすべてのログを加工し始めます。その後アーカイブに転送されます。

ただし、アーカイブ設定を作成または更新した後、次のアーカイブアップロードが試行されるまでに数分かかることがあります。アーカイブのアップロード頻度は異なる場合があります。**15 分後にストレージバケットを確認**し、Datadog アカウントからアーカイブが正常にアップロードされていることを確認してください。

その後、アーカイブがまだ保留状態の場合は、インクルージョンフィルターを確認し、クエリが有効であり、[Live Tail][14] のログイベントに一致していることを確認してください。設定や権限の意図しない変更により、Datadog が外部アーカイブへのログのアップロードに失敗すると、該当するログアーカイブが構成ページでハイライト表示されます。

{{< img src="logs/archives/archive_errors_details.png" alt="アーカイブが正しく設定されていることを確認してください" style="width:100%;">}}

アーカイブにカーソルを合わせると、エラーの詳細と問題を解決するための対処方法が表示されます。[Events Explorer][15] にもイベントが生成されます。これらのイベントに対してモニターを作成し、障害を迅速に検出して修正することができます。

## 複数のアーカイブ {#multiple-archives}

複数のアーカイブが定義されている場合、フィルターに基づき、最初のアーカイブにログが入力されます。

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="ログは、フィルターに一致する最初のアーカイブに保存されます。" style="width:100%;">}}

アーカイブの順序を慎重に設定することが重要です。たとえば、最初に `env:prod` タグで絞り込まれるアーカイブを作成し、次にフィルターなし (`*` と同等) でアーカイブを作成した場合、すべてのプロダクションログは一方のストレージバケットまたはパスに転送され、その他のログはもう一方のアーカイブに転送されます。

## アーカイブの形式 {#format-of-the-archives}

Datadog がストレージバケットに転送するログアーカイブは、圧縮された JSON 形式になっています。[圧縮設定](#compression)に応じて、アーカイブファイルは zstd (`.json.zst`、デフォルト) または gzip (`.json.gz`) 圧縮を使用します。指定したプレフィックス (ない場合は `/`) を使用して、以下のようなアーカイブファイルが生成された日時を示すディレクトリ構造でアーカイブファイルが保存されます。

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.02aafad5-f525-4592-905e-e962d1a5b2f7.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<UUID>.json.gz
```

このディレクトリ構造により、過去のログアーカイブを日付に基づいてクエリする処理が簡略化されます。

##  参考資料 {#further-reading}

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