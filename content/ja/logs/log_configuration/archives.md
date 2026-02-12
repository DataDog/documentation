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
  tag: ドキュメント
  text: Datadog でアーカイブされたログコンテンツにアクセスする方法について
- link: /logs/explorer/
  tag: ドキュメント
  text: ログエクスプローラーについて
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Logging without Limits* について
title: ログアーカイブ
---

## 概要

Datadog アカウントを構成して、独自のクラウドストレージシステムへ収集されたすべてのログ ([インデックス化][1]の有無にかかわらず) を転送します。ストレージに最適化されたアーカイブにログを長期間保管し、コンプライアンス要件を満たすことができると同時に、アドホック調査のための監査適合性を[リハイドレート][2]で維持できます。

{{< img src="logs/archives/log_forwarding_archives_122024.png" alt="Log Forwarding ページの Archives タブ" style="width:100%;">}}

[**Log Forwarding** ページ][3]に移動して、取り込んだログを自分のクラウドホストのストレージバケットに転送するためのアーカイブをセットアップします。

1. まだの場合は、お使いのクラウドプロバイダーと Datadogの[インテグレーション](#set-up-an-integration)を設定してください。
2. [ストレージバケット](#create-a-storage-bucket)を作成します。
3. そのアーカイブへの `read` および `write` [権限](#set-permissions)を設定します。
4. アーカイブへ、およびアーカイブから[ログをルーティング](#route-your-logs-to-a-bucket)します。
5. 暗号化、ストレージクラス、タグなどの[詳細設定](#advanced-settings)を構成します。
6. 設定を[検証](#validation)し、Datadog で検出される可能性のある構成ミスがないか確認します。

環境から直接ストレージに最適化されたアーカイブにログをルーティングしたい場合は、[Observability Pipelines でログをアーカイブする][4]方法を参照してください。

## ログアーカイブを構成します

### インテグレーションを設定します

{{< tabs >}}
{{% tab "AWS S3" %}}

まだ構成されていない場合は、S3 バケットを保持する AWS アカウントの [AWS インテグレーション][1]をセットアップします。
   * 一般的なケースでは、これには、Datadog が AWS S3 との統合に使用できるロールの作成が含まれます。
   * 特に AWS China アカウントの場合は、ロール委任の代わりにアクセスキーを使用します。

[1]: /ja/integrations/amazon_web_services/?tab=automaticcloudformation#setup
{{% /tab %}}
{{% tab "Azure Storage" %}}

新しいストレージアカウントのあるサブスクリプション内で [Azure インテグレーション][1]をセットアップしていない場合、セットアップします。これには、[Datadog が統合に使用できるアプリ登録の作成][2]も含まれます。

**注:** Azure ChinaCloud、GermanyCloud、GovCloud へのアーカイブはサポートされていません。

[1]: https://app.datadoghq.com/account/settings#integrations/azure
[2]: /ja/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

GCS ストレージバケットを持つプロジェクト用の [Google Cloud インテグレーション][1]をセットアップしていない場合、セットアップします。これには [Datadog が統合に使用できる Google Cloud サービスアカウントの作成][2] も含まれます。

[1]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[2]: /ja/integrations/google_cloud_platform/?tab=datadogussite#setup
{{% /tab %}}
{{< /tabs >}}

### ストレージバケットを作成

{{< site-region region="gov" >}}
<div class="alert alert-danger">アーカイブへのログの送信は、Datadog GovCloud 環境の外部であり、Datadog の管理外です。Datadog は、Datadog GovCloud 環境から出たログについて、FedRAMP、DoD Impact Levels、ITAR、輸出コンプライアンス、データレジデンシー、または当該ログに適用される類似の規制に関連するユーザーの義務または要件を含むが、これらに限定されることなく、一切の責任を負わないものとします。</div>
{{< /site-region >}}

{{< tabs >}}
{{% tab "AWS S3" %}}

[AWS コンソール][1]にアクセスし、アーカイブを転送する [S3 バケットを作成][2]します。

{{< site-region region="gov" >}}
<div class="alert alert-danger"> Datadog アーカイブは、仮想ホスト型アドレッシングに依存する S3 FIPS エンドポイントとの統合時、バケット名にドット (.) を含む場合はサポートされません。詳細は AWS のドキュメント、<a href="https://aws.amazon.com/compliance/fips/">AWS FIPS</a> および <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html">AWS バーチャルホスティング</a>をご参照ください。</div>
{{< /site-region >}}

**注:**

- バケットを公開読み取り可能にしないでください。
- [US1、US3、US5 サイト][3]については、地域間データ転送料とクラウドストレージコストへの影響について、[AWS Pricing][4] を参照してください。地域間のデータ転送料を管理するために、ストレージバケットを `us-east-1` に作成することを検討してください。

[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: /ja/getting_started/site/
[4]: https://aws.amazon.com/s3/pricing/
{{% /tab %}}

{{% tab "Azure Storage" %}}

* [Azure ポータル][1]にアクセスし、アーカイブを転送する[ストレージアカウントを作成][2]します。標準パフォーマンスまたは **Block blobs** プレミアムアカウントタイプを選択し、**hot** または **cool** アクセス層を選択します。
* そのストレージアカウントに **container** サービスを作成します。Datadog アーカイブページに追加する必要があるため、コンテナ名をメモしてください。

**注:** まれに最後のデータを書き換える必要があるため、[不変性ポリシー][3]を設定しないでください (通常はタイムアウト)。

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-immutability-policies-manage
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

[Google Cloud アカウント][1]にアクセスし、アーカイブを転送するための [GCS バケットを作成][2]します。**Choose how to control access to objects** セクションで、**Set object-level and bucket-level permissions** を選択してください。

**注:** まれに最後のデータを書き換える必要があるため、[保持ポリシー][3]を追加しないでください (通常はタイムアウト)。

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://cloud.google.com/storage/docs/bucket-lock
{{% /tab %}}
{{< /tabs >}}

### 権限を設定する

[`logs_write_archive` 権限][5]のある Datadog ユーザーだけがログアーカイブ構成を作成、変更、または削除できます。

{{< tabs >}}
{{% tab "AWS S3" %}}

1. 次の権限ステートメントを持つ[ポリシーを作成][1]します。

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
     * `GetObject` および `ListBucket` の権限を設定すると、[アーカイブからのリハイドレート][2]が可能になります。
     * アーカイブをアップロードするには、`PutObject` 権限で十分です。
     * `s3:PutObject` と `s3:GetObject` アクションのリソース値は `/*` で終わっていることを確認してください。これらの権限はバケット内のオブジェクトに適用されるからです。

2. バケット名を編集します。
3. オプションで、ログアーカイブを含むパスを指定します。
4. Datadog のインテグレーションロールに新しいポリシーをアタッチします。
   * AWS IAM コンソールで **Roles** に移動します。
   * Datadog インテグレーションで使用されるロールを見つけます。デフォルトでは、 **DatadogIntegrationRole** という名前になっていますが、組織で名前を変更した場合は、名前が異なる場合があります。ロール名をクリックすると、ロールのサマリーページが表示されます。
   * **Add permissions**、**Attach policies** の順にクリックします。
   * 上記で作成したポリシーの名称を入力します。
   * **Attach policies** をクリックします。


[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create-console.html
[2]: /ja/logs/archives/rehydrating/
{{% /tab %}}
{{% tab "Azure Storage" %}}

1. Datadog アプリに、ストレージアカウントへの書き込みおよびリハイドレートを行うための権限を付与します。
2. [ストレージアカウントのページ][1]でストレージアカウントを選択し、**Access Control (IAM)** で **Add -> Add Role Assignment** を選択します。
3. Role に **Storage Blob Data Contributor** を入力し、Azure と統合するために作成した Datadog アプリを選択して、保存します。

{{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Storage Blob Data Contributor ロールを Datadog アプリに追加します。" style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
{{% /tab %}}
{{% tab "Google Cloud Storage" %}}

1. Datadog Google Cloud サービスアカウントに、アーカイブをバケットに書き込むための権限を付与します。
2. [Google Cloud IAM Admin ページ][1]から Datadog の Google Cloud サービスアカウントのプリンシパルを選択し、**Edit principal** を選択します。
3. **ADD ANOTHER ROLE** をクリックし、**Storage Object Admin** ロールを選択し、保存します。

   {{< img src="logs/archives/gcp_role_storage_object_admin-2.png" alt="Datadog Google Cloud サービスアカウントに Storage Object Admin ロールを追加。" style="width:75%;">}}

[1]: https://console.cloud.google.com/iam-admin/iam
{{% /tab %}}
{{< /tabs >}}

### ログをバケットにルーティング

[Log Forwarding ページ][6]に移動し、**Archives** タブで **Add a new archive** を選択します。

**注:**
* [`logs_write_archive` 権限][5]のある Datadog ユーザーだけがこの手順と次の手順を完了させることができます。
* Azure Blob Storage へのログのアーカイブには、App Registration が必要です。[Azure インテグレーションページ][7]の手順を参照し、ドキュメントページの右側にある「サイト」を「US」に設定してください。アーカイブ目的で作成された App Registration は、"Storage Blob Data Contributor" ロールのみが必要です。ストレージバケットが Datadog Resource を通じて監視されているサブスクリプションにある場合、App Registration が冗長である旨の警告が表示されます。この警告は無視することができます。
* バケットでネットワークアクセスを特定の IP に制限している場合は、{{< region-param key="ip_ranges_url" link="true" text="IP 範囲リスト">}}から Webhook の IP を許可リストに追加してください。
* **US1-FED サイト**の場合、Datadog を構成して、ログを Datadog GovCloud 環境外の宛先に送信することができます。Datadog は、Datadog GovCloud 環境を離れたログに対して一切の責任を負いません。また、これらのログが GovCloud 環境を離れた後に適用される FedRAMP、DoD 影響レベル、ITAR、輸出コンプライアンス、データ居住地、またはそれに類する規制に関する義務や要件についても、Datadog は一切の責任を負いません。

| サービス                  | ステップ                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Amazon S3**               | - S3 バケットに適した AWS アカウントとロールの組み合わせを選択します。<br>- バケット名を入力します。<br>**オプション**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。 |
| **Azure Storage**        | - **Azure Storage** アーカイブタイプを選択し、ストレージアカウントで Storage Blob Data Contributor ロールのある Datadog アプリ用の Azure テナントとクライアントを選択します。<br>- ストレージアカウント名とアーカイブのコンテナ名を入力します。<br>**オプション**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。 |
| **Google Cloud Storage** | - **Google Cloud Storage** のアーカイブタイプを選択し、ストレージバケットに書き込む権限を持つ GCS サービスアカウントを選択します。<br>- バケット名を入力します。<br>**オプション**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。 |

### 高度な設定

{{< img src="/logs/archives/log_archives_advanced_settings.png" alt="オプションのタグを追加し、最大スキャンサイズを定義するための高度な設定" style="width:100%;" >}}

#### Datadog タグ

以下のためにこのオプションの構成ステップを使用します。

* アーカイブ内のすべてのログタグを含める (デフォルトでは、すべての新規アーカイブに有効化されています)。**注**: 結果のアーカイブサイズが増大します。
* リハイドレートされたログに、制限クエリポリシーに従ってタグを追加します。[`logs_read_data`][13] 権限を参照してください。

#### 最大スキャンサイズを定義する

このオプションの構成ステップを使用して、ログアーカイブでリハイドレートのためにスキャンできるログデータの最大量 (GB 単位) を定義します。

最大スキャンサイズが定義されているアーカイブの場合、すべてのユーザーは、リハイドレートを開始する前にスキャンサイズを推定する必要があります。推定されたスキャンサイズがそのアーカイブで許可されているものより大きい場合、ユーザーはリハイドレートを要求する時間範囲を狭めなければなりません。時間範囲を減らすと、スキャンサイズが小さくなり、ユーザーがリハイドレートを開始できるようになります。

{{< site-region region="us3" >}}
#### ファイアウォールルール

{{< tabs >}}
{{% tab "Azure ストレージ" %}}

ファイアウォールルールはサポートされていません。

{{% /tab %}}
{{< /tabs >}}

{{< /site-region >}}
#### ストレージクラス

{{< tabs >}}
{{% tab "AWS S3" %}}

[S3 バケットにライフサイクルコンフィギュレーションを設定][1]して、ログアーカイブを最適なストレージクラスに自動的に移行できます。

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
{{< /tabs >}}

#### サーバー側の暗号化 (SSE)

{{< tabs >}}
{{% tab "AWS S3" %}}

##### SSE-S3

Amazon S3 バケットのデフォルトの暗号化は、Amazon S3 管理キー ([SSE-S3][1]) によるサーバーサイド暗号化です。

S3 バケットが SSE-S3 で暗号化されていることを確認するには

1. S3 バケットに移動します。
1. **Properties** タブをクリックします。
1. **Default Encryption** セクションで、**Encryption key type** が **Amazon S3 managed keys (SSE-S3)** であることを確認します。

##### SSE-KMS

また、Datadog は CMK を利用した [AWS KMS][2] からのサーバーサイド暗号化もサポートしています。有効化するには次の手順に従ってください。

1. CMK を作成します。
2. CMK に付随する CMK ポリシーに以下のコンテンツを添加して、AWS アカウント番号と Datadog IAM ロール名を適切なものに置き換えます。

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

3. S3 バケットの **Properties** タブに移動し、**Default Encryption** を選択します。"AWS-KMS" オプション、CMK ARN の順に選択して保存します。

既存の KMS キーに変更を加える場合は、[Datadog サポート][3]にお問い合わせください。

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html
[2]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
[3]: /ja/help/
{{% /tab %}}

{{< /tabs >}}

### 検証

Datadog アカウントでアーカイブ設定が正常に構成された時点から、処理パイプラインは Datadog に取り込まれたすべてのログを加工し始めます。その後アーカイブに転送されます。

ただし、アーカイブの構成を作成または更新した後、次のアーカイブのアップロードが試行されるまでに数分かかることがあります。アーカイブがアップロードされる頻度は、さまざまです。アーカイブが Datadog アカウントから正常にアップロードされていることを確認するために、**15 分後にストレージバケットを再確認**してください。

その後、アーカイブがまだ保留状態である場合、包含フィルターを確認して、クエリが有効で、[Live Tail][14] のログイベントに一致することを確認します。設定や権限の意図しない変更により、Datadog が外部アーカイブへのログのアップロードに失敗した場合、構成ページで該当する Log Archive がハイライトされます。

{{< img src="logs/archives/archive_errors_details.png" alt="アーカイブが正しく設定されているか確認する" style="width:100%;">}}

アーカイブにカーソルを合わせると、エラーの詳細と問題を解決するためのアクションが表示されます。また、[イベントエクスプローラー][15]にイベントが生成されます。これらのイベントに対するモニターを作成することで、障害を迅速に検出し、修復することができます。

## 複数のアーカイブ

複数のアーカイブが定義されている場合、フィルターに基づき、最初のアーカイブにログが入力されます。

{{< img src="logs/archives/log_forwarding_archives_multiple.png" alt="ログは、フィルターにマッチした最初のアーカイブに入ります。" style="width:100%;">}}

アーカイブの順序を慎重に決めることが重要です。例えば、`env:prod` タグでフィルターされた最初のアーカイブと、フィルターなしの 2 番目のアーカイブ (`*` に相当) を作成すると、すべてのプロダクションログは一方のストレージバケットまたはパスに送られ、残りはもう一方に送られることになるでしょう。

## アーカイブの形式

Datadog がストレージバケットに転送するログアーカイブは、圧縮 JSON 形式 (`.json.gz`) です。指定したプレフィックス (ない場合は `/`) を使用して、以下のようなアーカイブファイルが生成された日時を示すディレクトリ構造でアーカイブファイルが保存されます。

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<DATADOG_ID>.json.gz
```

このディレクトリ構造により、過去のログアーカイブを日付に基づいてクエリする処理が簡略化されます。

圧縮 JSON ファイル内の各イベントは、以下の形式で内容が表されます。

```json
{
    "_id": "123456789abcdefg",
    "date": "2018-05-15T14:31:16.003Z",
    "host": "i-12345abced6789efg",
    "source": "source_name",
    "service": "service_name",
    "status": "status_level",
    "message": "2018-05-15T14:31:16.003Z INFO rid='acb-123' status=403 method=PUT",
    "attributes": { "rid": "abc-123", "http": { "status_code": 403, "method": "PUT" } },
    "tags": [ "env:prod", "team:acme" ]
}
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>

*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/indexes/#exclusion-filters
[2]: /ja/logs/archives/rehydrating/
[3]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[4]: /ja/observability_pipelines/archive_logs/
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
[15]: /ja/service_management/events/explorer/
