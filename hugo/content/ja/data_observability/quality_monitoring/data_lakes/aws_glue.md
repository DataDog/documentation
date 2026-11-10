---
description: AWS Glue を Datadog Data Observability に接続して、Iceberg テーブルのメタデータ、鮮度、品質を監視します。
further_reading:
- link: /data_observability/
  tag: ドキュメント
  text: Data Observability の概要
- link: /integrations/amazon-web-services/
  tag: ドキュメント
  text: AWS インテグレーション
- link: /monitors/types/data_observability/
  tag: ドキュメント
  text: Data Observability モニター
title: Iceberg テーブル (AWS Glue)
---
## 概要{#overview}

[AWS Glue で Iceberg フレームワークを使用している][5]場合は、[AWS Glue インテグレーション][6]を通じて Datadog で Iceberg テーブルのメタデータを確認できます。このデータを使用して、テーブルスキーマ、データの鮮度、行数、およびテーブルサイズを監視します。

## 前提条件{#prerequisites}

始める前に、以下があることを確認してください。

- 監視対象の Glue Iceberg テーブルを含む AWS アカウント。
- [Datadog に接続された AWS アカウント][1]。
  - Data Observability にログ転送は必要ありません。
- Datadog ロールのポリシーを変更するための IAM 権限。
- (オプション) テーブル権限の管理に AWS Lake Formation を使用している場合は、そのアクセス権。

## AWS アカウントを構成する{#configure-the-aws-account}

1. [[{{< ui >}}Datadog Data Observability{{< /ui >}}] > [{{< ui >}}Settings{{< /ui >}}]][2] に移動します。
2. AWS Glue の横にある [{{< ui >}}Configure{{< /ui >}}] をクリックします。

   {{< img src="data_observability/aws_glue/settings-configure-button.png" alt="Data Observability 設定ページの AWS Glue 構成オプション" style="width:100%;" >}}

3. Datadog にすでに接続されている既存の AWS アカウントを選択するか、新しいアカウントを追加します。新しいアカウントの追加に関するヘルプについては、[AWS インテグレーションのドキュメント][1]を参照してください。

   {{< img src="data_observability/aws_glue/account-selection.png" alt="構成フロー内の AWS アカウント選択ドロップダウン" style="width:100%;" >}}

## 必要な IAM 権限を追加する{#add-required-iam-permissions}

Data Observability クローラーが Glue Iceberg テーブルを監視するには、追加の権限が必要です。AWS インテグレーション用に構成された Datadog IAM ロールに、以下のポリシーをアタッチします。

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "glue:GetCatalog",
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetJobRun",
        "glue:GetJobRuns",
        "glue:GetJob",
        "glue:GetJobs",
        "glue:GetTable",
        "glue:GetTables",
        "glue:GetTags",
        "glue:ListJobs",
        "s3:ListBucket",
        "kms:Decrypt",
        "lakeformation:GetDataAccess"
      ],
      "Resource": ["*"]
    },
    {
      "Sid": "AllowIcebergMetadataOnly",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion"
      ],
      "Resource": [
        "arn:aws:s3:::*/metadata/*"
      ]
    }
  ]
}
```

### (オプション) 特定のデータベースおよびテーブルにアクセスを制限する{#optional-restrict-access-to-specific-databases-and-tables}

上記のポリシーは、すべての Glue リソースへのアクセスを許可します。特定のデータベースまたはテーブルのみを監視するには、上記のポリシー例の `Resource: ["*"]` を、監視対象のデータベースまたはテーブルの明示的な ARN に置き換えます。

AWS Glue の IAM 権限は階層構造になっています。テーブルにアクセスするには、ポリシーにカタログ、データベース、およびテーブルを含める必要があります。いずれかのレベルを省略すると、アクセス拒否エラーが発生します。

| リソース| ARN 形式| 例|
|----------|------------|---------|
| カタログ| `arn:aws:glue:<REGION>:<ACCOUNT_ID>:catalog` | `arn:aws:glue:us-east-1:123456789012:catalog` |
| データベース| `arn:aws:glue:<REGION>:<ACCOUNT_ID>:database/<DB_NAME>` | `arn:aws:glue:us-east-1:123456789012:database/analytics` |
| テーブル| `arn:aws:glue:<REGION>:<ACCOUNT_ID>:table/<DB_NAME>/<TABLE_NAME>` | `arn:aws:glue:us-east-1:123456789012:table/analytics/events` |

#### ポリシーの例{#example-policies}

{{< tabs >}}
{{% tab "特定のデータベース" %}}

特定のデータベース内のすべてのテーブルを監視するには、カタログ、各データベース、およびそのデータベース内のテーブルに対するワイルドカードを含めます。

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:database/analytics_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/*",
    "arn:aws:glue:us-east-1:123456789012:table/analytics_db/*"
  ]
}
```

{{% /tab %}}
{{% tab "特定のテーブル" %}}

特定のテーブルのみを監視するには、各テーブルを明示的にリストします。ワイルドカードを使用して、テーブル名のパターンに一致させることもできます。

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/orders",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/customers",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/events_*"
  ]
}
```

ワイルドカード `events_*` は、`events_clicks`、`events_purchases`、および `events_` で始まるその他のテーブルと一致します。

{{% /tab %}}
{{< /tabs >}}

詳細については、「[AWS Glue アイデンティティベースのポリシー例][4]」を参照してください。

## (オプション) Lake Formation アクセスの構成{#optional-configure-lake-formation-access}

AWS Lake Formation を使用して Glue カタログテーブルへのアクセスを管理している場合は、監視するデータベースとテーブルへのアクセス権を Datadog ロールに付与してください。

{{< tabs >}}
{{% tab "AWS CLI" %}}

プレースホルダーの値を実際の AWS アカウント ID、ロール名、データベース名、および S3 バケットに置き換えて、以下のコマンドを使用します。

```bash
PRINCIPAL=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<YOUR_DATADOG_ROLE_NAME>

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"Database":{"Name":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"TableWildcard":{"DatabaseName":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"DataLocation":{"ResourceArn":"arn:aws:s3:::<YOUR_S3_BUCKET_NAME>"}}' \
  --permissions DATA_LOCATION_ACCESS
```

{{% /tab %}}
{{% tab "AWS コンソール" %}}

1. AWSコンソールで [{{< ui >}}Lake Formation{{< /ui >}}] > [{{< ui >}}Data lake permissions{{< /ui >}}] (データレイク権限) に移動します。
2. [{{< ui >}}Grant{{< /ui >}}] (付与) をクリックします。
3. [{{< ui >}}Principals{{< /ui >}}] (プリンシパル) の下で [{{< ui >}}IAM users and roles{{< /ui >}}] (IAM ユーザーとロール) を選択し、Datadog ロールを選択します。
4. [{{< ui >}}LF-Tags or catalog resources{{< /ui >}}] (LF タグまたはカタログリソース) の下で、監視するデータベースとテーブルを選択します。
5. [{{< ui >}}Permissions{{< /ui >}}] の下で、[{{< ui >}}DESCRIBE{{< /ui >}}] と [{{< ui >}}SELECT{{< /ui >}}] を選択します。
6. [{{< ui >}}Grant{{< /ui >}}] をクリックします。

{{< img src="data_observability/aws_glue/lakeformation-permissions.png" alt="AWS コンソールの Lake Formation 権限付与ダイアログ" style="width:90%;" >}}

{{% /tab %}}
{{< /tabs >}}

## クローラーを構成する{#configure-the-crawler}

1. Glue Iceberg テーブルが存在する AWS リージョンを選択します。
2. [{{< ui >}}Quality Monitoring for Apache Iceberg{{< /ui >}}] (Apache Iceberg の品質監視) のトグルをオンにします。
3. (オプション) Glue ジョブの正常性とパフォーマンスも監視する場合は、[{{< ui >}}Job Monitoring{{< /ui >}}] (ジョブ監視) のトグルをオンにします。
4. 同期頻度を選択します。

   {{< img src="data_observability/aws_glue/crawler-configuration.png" alt="リージョン選択と同期頻度オプションを示すクローラー構成" style="width:100%;" >}}

5. [{{< ui >}}Save{{< /ui >}}] をクリックします。

## 次のステップ{#next-steps}

セットアップが完了すると、Datadog はバックグラウンドで Glue Iceberg テーブルメタデータの同期を開始します。初期同期には、カタログ内のテーブル数に応じて最大 1 時間かかる場合があります。

同期が完了すると、テーブルが[データカタログ][3]に表示されます。[Data Observability モニター][7]を作成して、鮮度と行数に関するアラートを開始することもできます。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon-web-services/
[2]: https://app.datadoghq.com/data-obs/settings/integrations
[3]: https://app.datadoghq.com/data-obs/catalog?integration=awsglue%2Fdatabase_account
[4]: https://docs.aws.amazon.com/glue/latest/dg/security_iam_id-based-policy-examples.html
[5]: https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-format-iceberg.html
[6]: /ja/integrations/amazon-glue/
[7]: /ja/monitors/types/data_observability/