---
further_reading:
- link: /logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
title: AWS アカウントレベルのログサブスクリプション
---

## 概要

アカウントレベルのログサブスクリプションを使用すると、AWS 環境の CloudWatch Logs をすべて自動で Datadog に転送できます。アカウントレベルのログサブスクリプションを利用すれば、新しいログソースを追加したときや AWS が新しいサービスをリリースしたときに、手動でログ転送を設定する必要がありません。また、転送対象となるログをより細かく制御するために、独自の選択条件やフィルタパターンを定義することも可能です。

## アカウントレベルのログサブスクリプションを作成する

アカウントレベルのログサブスクリプションを作成する方法は、[CloudFormation](#cloudformation-recommended) と [マニュアルでの設定](#manual) の 2 つがあります。最も簡単なセットアップ方法としては、CloudFormation を使って選択した各リージョンに Amazon Data Firehose と関連リソースを作成できます。

### CloudFormation (推奨)

1. CloudFormation テンプレートの URL をコピーします。

{{< code-block lang="bash" filename="" disable_copy="false" >}}
https://datadog-cloudformation-template.s3.amazonaws.com/aws_account_level_logs/main.yaml
{{< /code-block >}}

2. AWS コンソールで [CloudFormation][1] を開きます。
3. **Create stack** をクリックします。
    - `With new resources (standard)` を選択します。
4. **Choose an existing template** と **Amazon S3 URL** のオプションは既定のままにします。
5. **Amazon S3 URL** フィールドに、先ほどコピーした CloudFormation テンプレートの URL を貼り付けます。
6. **Next** をクリックします。
7. **Stack name** フィールドに、`datadog-account-level-logs-stack` のようなわかりやすい名前を入力します。
8. **ApiKey** フィールドに、有効な [Datadog API キー][4] を貼り付けます。
9. **Regions** フィールドに、アカウントレベルのログサブスクリプションを適用したい AWS リージョンコード (例: `us-east-1`) をカンマ区切りで入力します。
10. **DatadogHttpEndpointUrl** フィールドで、利用している [Datadog サイト][5] に対応する URL を選択します。
11. **Next** をクリックします。
12. 必要に応じて追加のスタックオプションを設定します。
13. **Next** をクリックします。
14. スタックオプションを確認し、`I acknowledge that AWS CloudFormation might create IAM resources with custom names` チェックボックスを選択します。
15. **Submit** をクリックします。

### 手動

{{< tabs >}}
{{% tab "Lambda Forwarder" %}}

1. まだ設定していない場合は、[Datadog Forwarder][101] Lambda 関数をセットアップします。
2. [AWS CLI][102] を使って、CloudWatch Logs に関数を実行する権限を付与します。
   - `<REGION>` は Datadog Forwarder Lambda 関数があるリージョンに置き換えてください。
   - `<ACCOUNT_ID>` はハイフンを除いた 12 桁の AWS アカウント ID に置き換えてください。

```bash
aws lambda add-permission \
  --region "<REGION>" \
    --function-name "forwarder-function" \
    --statement-id "forwarder-function" \
    --principal "logs.amazonaws.com" \
    --action "lambda:InvokeFunction" \
    --source-arn "arn:aws:logs:<REGION>:<ACCOUNT_ID>:log-group:*" \
    --source-account "<ACCOUNT_ID>"
```

3. アカウントレベルのサブスクリプションフィルタポリシーを作成します。以下の例では、`ERROR` という文字列を含むすべてのログイベントがストリーミングされますが、`LogGroupToExclude1` と `LogGroupToExclude2` というロググループは除外されます。
   - `FORWARDER_ARN` は Datadog Forwarder Lambda 関数の ARN に置き換えてください。

```bash
aws logs put-account-policy \
  --policy-name "ExamplePolicyLambda" \
  --policy-type "SUBSCRIPTION_FILTER_POLICY" \
  --policy-document '{"DestinationArn":"<FORWARDER_ARN>", "FilterPattern": "", "Distribution": "Random"}' \
  --scope "ALL"
```

**注**: 特定のロググループをログ転送の対象外にするには、[コマンドリファレンス][103]の説明にあるように `--selection-criteria` オプションを使用してください。

[101]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[102]: https://aws.amazon.com/cli/
[103]: https://docs.aws.amazon.com/cli/latest/reference/logs/put-account-policy.html
{{% /tab %}}
{{% tab "Amazon Data Firehose" %}}

#### Amazon Data Firehose 用の S3 バケットとロールを作成する

以下の手順では、バケットと IAM ロールの作成方法を案内します。このロールは Amazon Data Firehose が配信失敗時に Amazon S3 バケットにデータを保存できるよう権限を付与するロールです。

1. [AWS CLI][201] を使って S3 バケットを作成します。既存のバケットを使うことも可能です。
   - `<BUCKET_NAME>` は S3 バケットの名前に、
   - `<REGION>` はバケットを作成するリージョンに置き換えてください。

```
aws s3api create-bucket \
  --bucket MY-BUCKET \
  --create-bucket-configuration LocationConstraint=<REGION>
```

2. `TrustPolicyForFirehose.json` というファイルを作成し、以下のステートメントを含めます。

```bash
{
  "Statement": {
    "Effect": "Allow",
    "Principal": { "Service": "firehose.amazonaws.com" },
    "Action": "sts:AssumeRole"
    } 
}
```

3. IAM ロールを作成し、上記の信頼ポリシーファイルを指定します。
   **注**: ここで返される **Role.Arn** は後のステップで使用します。

```bash
aws iam create-role \
  --role-name FirehosetoS3Role \
  --assume-role-policy-document file://./TrustPolicyForFirehose.json
```

4. `PermissionsForFirehose.json` というファイルを作成し、以下のステートメントを含めます。
   - `<BUCKET_NAME>` は対象の S3 バケット名に置き換えてください。

```bash
{
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [ 
          "s3:AbortMultipartUpload", 
          "s3:GetBucketLocation", 
          "s3:GetObject", 
          "s3:ListBucket", 
          "s3:ListBucketMultipartUploads", 
          "s3:PutObject" ],
      "Resource": [ 
          "arn:aws:s3:::<BUCKET_NAME>", 
          "arn:aws:s3:::<BUCKET_NAME>/*" ]
    }
  ]
}
```
5. このロールに権限ポリシーを関連付けます。

```bash
aws iam put-role-policy \
  --role-name FirehosetoS3Role \
  --policy-name Permissions-Policy-For-Firehose \
  --policy-document file://./PermissionsForFirehose.json
```

#### Amazon Data Firehose 配信ストリームを作成する

以下の手順では、Amazon Data Firehose の配信ストリームを作成し、設定する方法を説明します。

1. AWS コンソールで [Amazon Data Firehose][202] を開きます。
2. **Create Firehose stream** をクリックします。
3. **Source** フィールドでログのソースを選択します。
   - ログソースが Kinesis Data Streams の場合は `Amazon Kinesis Data Streams` を選択します。
   - ログソースが CloudWatch Logs の場合は `Direct PUT` を選択します。
4. **Destination** フィールドで `Datadog` を選択します。
5. **Source** が `Amazon Kinesis Data Streams` の場合は、**Source settings** で使用する Kinesis データストリームを選択します。
6. 必要に応じて、配信ストリームにわかりやすい名前を付けることもできます。
7. **Destination settings** セクションで、お使いの [Datadog サイト][203]に対応する Datadog ログの HTTP エンドポイント URL を選択します。
8. **Authentication** には有効な [Datadog API キー][204]が必要です。以下のいずれかを選択できます。
     - **Use API key** を選び、**API key** フィールドにキーの値を貼り付ける
     - **Use AWS Secrets Manager** を選び、有効な Datadog API キーの値を含むシークレットを **Secret name** ドロップダウンで選択する
9. **Content encoding** には `GZIP` を選択します。
10. 任意で、**Retry duration**、バッファ設定、あるいは **Parameters** (ログのタグとして付与されます) を設定できます。
     **注**: ログが 1 行ごとのメッセージである場合、Datadog では **Buffer size** を `2` MiB に設定することを推奨しています。
11. **Backup settings** セクションでは、再試行期間を超えたイベントのバックアップ先となる S3 バケットを選択します。
     **注**: 配信ストリームによりログが転送できなかった場合でも Datadog に送信されるようにするには、この S3 バケットから[ログを転送するよう Datadog Forwarder Lambda 関数][205]を設定してください。
12. **Create Firehose stream** をクリックします。

#### CloudWatch Logs 用のロールを作成する

以下の手順では、CloudWatch Logs 用の IAM ロールを作成します。このロールにより、CloudWatch Logs に Firehose 配信ストリームへデータを送信する権限を付与します。

1. `./TrustPolicyForCWL.json` ファイルを作成し、以下のステートメントを記述します。
   - `<ACCOUNT_ID>` はハイフンを除いた 12 桁の AWS アカウント ID に、
   - `<REGION>` は CloudWatch Logs が存在するリージョンに置き換えてください。

```bash
{
  "Statement": {
    "Effect": "Allow",
    "Principal": { "Service": "logs.amazonaws.com" },
    "Action": "sts:AssumeRole",
    "Condition": { 
         "StringLike": { 
             "aws:SourceArn": "arn:aws:logs:<REGION>:<ACCOUNT_ID>:*"
         } 
     }
  }
}
```
2. IAM ロールを作成し、上記の信頼ポリシーファイルを指定します。

```bash
aws iam create-role \
  --role-name CWLtoKinesisFirehoseRole \
  --assume-role-policy-document file://./TrustPolicyForCWL.json
```
   **注**: ここで返される **Role.Arn** は後のステップで使用します。

3. `./PermissionsForCWL.json` ファイルを作成し、以下のステートメントを記述します。
   - `<REGION>` は Datadog Forwarder Lambda 関数が存在するリージョンに、
   - `<ACCOUNT_ID>` はハイフンを除いた 12 桁の AWS アカウント ID に、
   - `<DELIVERY_STREAM_NAME>` は作成した配信ストリームの名前に置き換えてください。

```bash
{
    "Statement":[
      {
        "Effect":"Allow",
        "Action":["firehose:PutRecord"],
        "Resource":[
            "arn:aws:firehose:<REGION>:<ACCOUNT_ID>:deliverystream/<DELIVERY_STREAM_NAME>"]
      }
    ]
}
```

4. このロールに権限ポリシーを関連付けます。

```bash
aws iam put-role-policy \
  --role-name CWLtoKinesisFirehoseRole \
  --policy-name Permissions-Policy-For-CWL \
  --policy-document file://./PermissionsForCWL.json
```

#### CloudWatch Logs アカウントレベルのサブスクリプションフィルタポリシーを作成する

この手順を完了する前に、Amazon Data Firehose の配信ストリームが `Active` 状態であることを確認してください。

1. CloudWatch Logs のアカウントレベルのサブスクリプションフィルタポリシーを作成します。これにより、指定したロググループから Amazon Data Firehose 配信ストリームへリアルタイムでログが転送され始めます。
   - `<POLICY_NAME>` をサブスクリプションフィルタポリシーの名前に、
   - `<CLOUDWATCH_LOGS_ROLE>` を作成した CloudWatch Logs ロールの ARN に、
   - `<DELIVERY_STREAM_ARN>` を Amazon Data Firehose 配信ストリームの ARN に置き換えてください。

```bash
aws logs put-account-policy \
    --policy-name "<POLICY_NAME>" \
    --policy-type "SUBSCRIPTION_FILTER_POLICY" \
    --policy-document '{"RoleArn":"<CLOUDWATCH_LOGS_ROLE>", "DestinationArn":"<DELIVERY_STREAM_ARN>", "FilterPattern": "", "Distribution": "Random"}' \
    --scope "ALL"
```

**注**: 特定のロググループを転送対象から除外するには、[コマンドリファレンス][206]にあるように `--selection-criteria` オプションを使用してください。

[201]: https://aws.amazon.com/cli/
[202]: https://console.aws.amazon.com/firehose/home
[203]: /ja/getting_started/site/
[204]: https://app.datadoghq.com/organization-settings/api-keys
[205]: /ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=automaticcloudformation#collecting-logs-from-s3-buckets
[206]: https://docs.aws.amazon.com/cli/latest/reference/logs/put-account-policy.html
{{% /tab %}}
{{< /tabs >}}

### 検証

[Log Explorer][2] に移動し、検索クエリ `@aws.firehose.arn:"<FIREHOSE_ARN>"` を入力すると、Amazon Data Firehose によって転送されたログを確認できます。
   - `<FIREHOSE_ARN>` はログストリーミング用の [Firehose][3] の ARN に置き換えてください。

## 参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://console.aws.amazon.com/cloudformation/home
[2]: https://app.datadoghq.com/logs
[3]: https://console.aws.amazon.com/firehose/home
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /ja/getting_started/site/