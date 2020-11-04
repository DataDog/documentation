---
title: ログアーカイブ
kind: documentation
description: 収集されたログをすべて長期的なストレージへ転送します。
aliases:
  - /ja/logs/s3/
  - /ja/logs/gcs/
  - /ja/logs/archives/s3/
  - /ja/logs/archives/gcs/
  - /ja/logs/archives/gcp/
further_reading:
  - link: /logs/explorer/
    tag: ドキュメント
    text: ログエクスプローラー
  - link: /logs/logging_without_limits/
    tag: ドキュメント
    text: Logging without Limits*
---
## アーカイブ

Datadog アカウントを構成して、クラウドストレージシステムへ収集されたすべてのログを転送します。ストレージに最適化されたアーカイブにログを長期間保管することで、コンプライアンス要件を満たすことができ、アドホック調査のための監査適合性を予算内に維持することができます。ログを長期保存用にアーカイブすると、予期せぬ出来事や遠い昔の出来事を調査する際に、[ログにアクセス][1]できます。

このガイドでは、クラウドホスト型ストレージバケットに収集したログを転送するためのアーカイブの設定方法を説明します。

**注:** 管理者ステータスの Datadog ユーザーだけがログアーカイブ構成を作成、変更、または削除できます。

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="アーカイブページ"  style="width:75%;">}}

## ストレージバケットの作成と構成

{{< tabs >}}
{{% tab "AWS S3" %}}


### S3 バケットを作成する

[AWS コンソール][1]にアクセスし、アーカイブを転送する [S3 バケットを作成][2]します。バケットを一般が閲覧できないように設定してください。


### ログアーカイブを構成する

#### AWS インテグレーションを設定する

まだ構成されていない場合は、S3 バケットを保持する AWS アカウントの [AWS インテグレーション][7]をセットアップします。

* 一般的なケースでは、これには、Datadog が AWS S3 との統合に使用できるロールの作成が含まれます。
* 特に AWS GovCloud または China アカウントの場合は、ロール委任の代わりにアクセスキーを使用します。

#### アーカイブを作成する

Datadog の[アーカイブページ][8]に移動し、下にある **Add a new archive** オプションを選択します。管理者ステータスの Datadog ユーザーだけがこの手順と次の手順を完了させることができます。

S3 バケットに適した AWS アカウントとロールの組み合わせを選択します。バケット名を入力します。オプションでログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。アーカイブを保存したら完了です。

 {{< img src="logs/archives/log_archives_s3_datadog_settings_role_delegation.png" alt="Datadog で S3 バケット情報を設定する"  style="width:75%;">}}

### アクセス許可を設定する

次の 2 つのアクセス許可ステートメントを IAM ポリシーに追加します。バケット名を編集し、必要に応じてログアーカイブを含むパスを指定します。`GetObject` および `ListBucket` アクセス許可は、[アーカイブからリハイドレート][4]を可能にします。アーカイブのアップロードには、`PutObject` アクセス許可で十分です。

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

### 高度な設定

#### ストレージクラス

[S3 バケットにライフサイクルコンフィギュレーションを設定][3]して、ログアーカイブを最適なストレージクラスに自動的に移行できます。

[リハイドレート][4]は、Glacier および Glacier Deep Archive を除くすべてのストレージクラスをサポートしています。Glacier または Glacier Deep Archive ストレージクラスのアーカイブからリハイドレートする場合は、まずそれらを別のストレージクラスに移動する必要があります。

#### サーバー側の暗号化 (SSE)

##### SSE-S3

サーバー側の暗号化を S3 ログアーカイブに追加するもっとも簡単な方法は、S3 のネイティブサーバーサイド暗号化 [SSE-S3][5] を利用することです。有効化するには S3 バケットの **Properties** タブに移動し、**Default Encryption** を選択します。`AES-256` オプションを選択して、**Save** を選択します。

{{< img src="logs/archives/log_archives_s3_encryption.png" alt="AES-256 オプションを選択し、保存します。"  style="width:75%;">}}

##### SSE-KMS

また、Datadog は CMK を利用した [AWS KMS][6] からのサーバーサイド暗号化もサポートしています。有効化するには次の手順に従ってください。

1. CMK の作成
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



[1]: https://s3.console.aws.amazon.com/s3
[2]: https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html
[3]: https://docs.aws.amazon.com/AmazonS3/latest/dev/how-to-set-lifecycle-configuration-intro.html
[4]: /ja/logs/archives/rehydrating/
[5]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html
[6]: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingKMSEncryption.html
[7]: integrations/amazon_web_services/?tab=automaticcloudformation#setup
[8]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Azure Storage" %}}

1. [Azure ポータル][1]にアクセスし、アーカイブを転送する[ストレージアカウントを作成][2]します。ストレージアカウントの名前と種類を指定し、**hot** アクセス層を選択します。
2. 新しいストレージアカウントのあるサブスクリプション内で [Azure インテグレーション][3]をセットアップしていない場合、セットアップします。これには、[Datadog が統合に使用できるアプリ登録の作成][4]も含まれます。
3. 次に、Datadog アプリにストレージアカウントへの書き込みおよびアカウントからのリハイドレートに必要なアクセス許可を付与します。[ストレージアカウントページ][1]から使用するストレージアカウントを選択し、**Access Control (IAM)**から **Add -> Add Role Assignment** を選択します。ロール、**Storage Blob Data Contributor** を入力し、Azure との統合用に作成した Datadog アプリを選択して保存します。
  {{< img src="logs/archives/logs_azure_archive_permissions.png" alt="Storage Blob Data Contributor ロールを Datadog アプリに追加します。" style="width:75%;">}}
4. Datadog の[アーカイブページ][5]に移動し、下にある **Add a new archive** オプションを選択します。管理者ステータスの Datadog ユーザーだけがこの手順と次の手順を完了させることができます。
5. **Azure Storage** アーカイブタイプを選択し、ストレージアカウントで Storage Blob Data Contributor ロールのある Datadog アプリ用の Azure テナントとクライアントを選択します。ストレージアカウント名とアーカイブのコンテナ名を入力します。
6. **任意**: ログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力します。
7. アーカイブを保存します。

  {{< img src="logs/archives/logs_azure_archive_configs.png" alt="Datadog で Azure ストレージアカウント情報を設定"  style="width:75%;">}}

[1]: https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts
[2]: https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal
[3]: https://app.datadoghq.com/account/settings#integrations/azure
[4]: /ja/integrations/azure/?tab=azurecliv20#integrating-through-the-azure-portal
[5]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}

{{% tab "Google Cloud Storage" %}}

1. [GCP アカウント][1]にアクセスし、アーカイブを転送する [GCS バケットを作成][2]します。「Choose how to control access to objects」で、「Set object-level and bucket-level permissions」を選択します。
2. GCS ストレージバケットを持つプロジェクト用の [GCP インテグレーション][3]をセットアップしていない場合、セットアップします。これには [Datadog が統合に使用できる GCS サービスアカウントの作成][4] も含まれます。
3. 次に、アーカイブをバケットに書き込むために必要なアクセス許可を Datadog GCP サービスアカウントに付与します。新しいサービスアカウントを作成する場合は、[GCP Credentials ページ][5]で設定できます。既存のサービスアカウントを更新する場合は、[GCP IAM Admin ページ][6])で設定します。**Storage** の下に、**Storage Object Creator**（アーカイブ生成用）および**Storage Object Viewer**（アーカイブからのリハイドレート用）のロールを追加します。
  {{< img src="logs/archives/gcp_role_storage_object_creator.png" alt="Storage Object Creator ロールを Datadogh GCP サービスアカウントに追加します。" style="width:75%;">}}
4. Datadog の[アーカイブページ][7]に移動し、下にある **Add a new archive** オプションを選択します。管理者ステータスの Datadog ユーザーだけがこの手順と次の手順を完了させることができます。
5. GCS のアーカイブタイプを選択し、ストレージバケットに書き込む権限を持つ GCS サービスアカウントを選択します。バケット名を入力します。オプションでログアーカイブのすべてのコンテンツにプレフィックスディレクトリを入力できます。アーカイブを保存します。

  {{< img src="logs/archives/archive_select_gcs.png" alt="Datadog で GCP バケット情報を設定する"  style="width:75%;">}}

[1]: https://console.cloud.google.com/storage
[2]: https://cloud.google.com/storage/docs/quickstart-console
[3]: https://app.datadoghq.com/account/settings#integrations/google-cloud-platform
[4]: /ja/integrations/google_cloud_platform/?tab=datadogussite#setup
[5]: https://console.cloud.google.com/apis/credentials
[6]: https://console.cloud.google.com/iam-admin/iam
[7]: https://app.datadoghq.com/logs/pipelines/archives
{{% /tab %}}
{{< /tabs >}}

## 検証

Datadog アカウントでアーカイブ設定が正常に構成された時点から、処理パイプラインは Datadog が収集したすべてのログを加工し始めます。その後アーカイブに転送されます。

ただし、アーカイブ構成を作成または更新してから次にアーカイブのアップロードが試行されるまで、数分かかることがあります。ログは15分ごとにアーカイブにアップロードされるので、**15 分待ってストレージバケットをチェックし**、Datadog アカウントからアーカイブが正常にアップロードされたことを確認してください。

## アーカイブの形式

Datadog がストレージバケットに転送するログアーカイブは、圧縮 JSON 形式（`.json.gz`）になっています。アーカイブは、次のように指定したプレフィックスの下の (指定しなかった場合は `/`)、アーカイブファイルが生成された日時を示すディレクトリ構造に保存されます。

```
/my/bucket/prefix/dt=20180515/hour=14/archive_143201.1234.7dq1a9mnSya3bFotoErfxl.json.gz
/my/bucket/prefix/dt=<YYYYMMDD>/hour=<HH>/archive_<HHmmss.SSSS>.<DATADOG_ID>.json.gz
```

このディレクトリ構造により、過去のログアーカイブを日付に基づいてクエリする処理が簡略化されます。

圧縮 JSON ファイル内の各イベントは、以下の形式で内容が表されます。

```text
{
    "_id": "123456789abcdefg",
    "date": "2018-05-15T14:31:16.003Z",
    "host": "i-12345abced6789efg",
    "source": "source_name",
    "service": "service_name",
    "status": "status_level",
    "message": " ... log message content ... ",
    "attributes": { ... log attributes content ... }
}
```

**注**: アーカイブには、ログイベントのメッセージ、カスタム属性、予約済み属性から成るログコンテンツのみが含まれます。ログタグ（ログデータを関連するメトリクスやトレースに繋げるメタデータ）は含まれません。

## 複数のアーカイブ

アーカイブの filter フィールドにクエリを追加することで、特定のログをアーカイブに転送できます。ログは、フィルターに一致する最初のアーカイブに保存されるため、アーカイブの順番は慎重に決定する必要があります。

たとえば、最初に `env:prod` タグで絞り込まれるアーカイブを作成し、次にフィルターなし (`*` と同等) でアーカイブを作成した場合、すべてのプロダクションログは一方のストレージバケット/パスに転送され、その他のログはもう一方のアーカイブに転送されます。

ログは、フィルターに一致する最初のアーカイブに保存されます。

{{< img src="logs/archives/log_archives_s3_multiple.png" alt="ログは、フィルターに一致する最初のアーカイブに保存されます。"  style="width:75%;">}}

{{< whatsnext desc="次に、Datadog からアーカイブされたログコンテンツにアクセスする方法を説明します。" >}}
    {{< nextlink href="/logs/archives/rehydrating" >}}<u>アーカイブからリハイドレート</u>: ログイベントをアーカイブから取得し、Datadog の Log Explorer に戻します。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/archives/rehydrating/