---
title: (LEGACY) Ingest Amazon S3 Logs with the Observability Pipelines Worker
aliases:
  - /observability_pipelines/guide/ingest_aws_s3_logs_with_the_observability_pipelines_worker/
further_reading:
  - link: /observability_pipelines/legacy/working_with_data/
    tag: Documentation
    text: Working with data using Observability Pipelines
  - link: /observability_pipelines/legacy/configurations/
    tag: Documentation
    text: Learn more about Observability Pipelines configurations
---

## 概要

The [Observability Pipelines Worker][1] can ingest logs from many different sources. If you have an Amazon S3 bucket that is receiving logs from an external system, such as AWS CloudTrail or CloudWatch, you can configure the Worker to ingest those logs. The setup uses Observability Pipelines Worker's Amazon S3 source, which requires configuring an Amazon SQS queue to receive event notifications from the S3 bucket. The event notification then informs the Worker to collect the new log events in the S3 bucket. 

このガイドでは、以下の手順で説明します。

1. [S3 イベント通知を受け取るための Amazon SQS トピックを作成する](#create-an-amazon-sqs-topic-to-receive-s3-notifications)
2. [S3 バケットでイベント通知を有効にする](#enable-event-notifications-on-the-s3-bucket)
3. [ワーカーに必要な権限のみを与える IAM ロールを作成する](#create-an-iam-role-for-the-worker)
4. [SQS キューから通知を受け取り、S3 バケットからログを収集するようにワーカーを構成する](#configure-the-worker-to-receive-notifications-from-the-sqs-queue)
5. [バッチされた S3 ログイベントを分離するようにワーカーを構成する](#configure-the-worker-to-separate-out-batched-aws-s3-log-events)

## 前提条件
- 観測可能性パイプラインワーカーを[インストール][2]、[構成][3]し、ソースからデータを収集し、宛先にルーティングしている。
- [観測可能性パイプラインの構成の基本][3]に精通している。

## S3 通知を受け取るための Amazon SQS トピックを作成する

In the Amazon SQS console, provision a new queue specific to this configuration. This keeps any changes you make to it separate from any other log analysis tools that you are using.

1. [Amazon SQS コンソール][4]に移動します。
2. この構成に固有の新しいキューをプロビジョニングするために、**Create queue** をクリックします。
3. キューの名前を入力します。
4. **Access policy** セクションで、**Advanced** ボタンをクリックします。
5. 以下の例の JSON オブジェクトをコピーして、高度なアクセスポリシーセクションに貼り付けます。キューを構成し、S3 バケットにイベント通知を送信できるようにするものです。`${REGION}`、`${AWS_ACCOUNT_ID}`、`${QUEUE_NAME}`、`${BUCKET_NAME}` を、先ほど入力した該当の AWS アカウント情報、キュー名、バケット名に置き換えます。
{{< code-block lang="json">}}
  {
  "Version": "2008-10-17",
  "Id": "__default_policy_ID",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Action": "SQS:SendMessage",
      "Resource": "arn:aws:sqs:${REGION}:${AWS_ACCOUNT_ID}:${QUEUE_NAME}",
      "Condition": {
        "StringEquals": {
          "aws:SourceAccount": "${AWS_ACCOUNT_ID}"
        },
        "StringLike": {
          "aws:SourceArn": "arn:aws:s3:*:*:${BUCKET_NAME}"
        }
      }
    }
  ]
  }
{{< /code-block >}}
6. 他のキューオプションはデフォルトのままにしておきます。
7. **Create queue** をクリックします。

## S3 バケットでイベント通知を有効にする

1. In the [Amazon S3 console][5], go to the S3 bucket that is collecting the logs that you want the Worker to ingest.
2. **Properties** タブをクリックします。
3. **Event notifications** セクションに移動し、**Create event notification** をクリックします。
4. イベントの名前を入力します。
5. **Event types** セクションで、**All object create events** をクリックします。ワーカーはオブジェクト作成イベントにのみ応答するので、サブスクライブする必要があるのはこれらのイベントだけです。
6. **Destination** セクションで、**SQS queue** を選択し、先ほど作成した SQS キューを選択します。
7. **Save changes** をクリックします。

SQS キューは、ワーカーが処理するためのメッセージを受信するようになっているはずです。

"Unable to validate the following destination configurations" (以下の宛先構成を検証することができません) エラーが発生した場合は、SQS のアクセスポリシーが正しく設定されているか確認してください。

## ワーカーの IAM ロールを作成する

必要な権限だけが与えられるように、ワーカーのために別の IAM ロールを作成します。

1. [AWS IAM コンソール][6]に移動します。
2. ナビゲーションペインで、**Roles** をクリックします。
3. **Create role** をクリックします。
4. ロールがアタッチされている信頼されたエンティティタイプを選択します。
5. **Next** をクリックします。
6. **Create policy** をクリックします。
7. **JSON** タブをクリックします。ロールにアタッチする必要がある最小限の権限をコピーして貼り付けます。
    ```json
    {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "sqs:DeleteMessage",
                  "s3:GetObject",
                  "sqs:ReceiveMessage",
                  "s3:ListBucket"
              ],
              "Resource": [
                  "arn:aws:s3:::${BUCKET_NAME}/*",
                  "arn:aws:s3:::${BUCKET_NAME}",
                  "arn:aws:sqs:${REGION}:${ACCOUNT_ID}:${QUEUE_NAME}"
              ]
          }
      ]
    }
    ```
8. `${REGION`}、`${AWS_ACCOUNT_ID}`、`${QUEUE_NAME}`、`${BUCKET_NAME}` を、該当する AWS アカウント情報、使用するキュー名とバケット名に置き換えます。ロールを EC2 インスタンスにアタッチしたり、ユーザーから引き受けたりしたい場合は、さらにロールの権限を変更する必要があります。
9. **Next: Tags** をクリックします。オプションで、タグを追加します。
10. **Next: Review** をクリックします。
11. ポリシーの名前を入力します。
12. **Create policy** をクリックします。

実行中の観測可能性パイプラインのプロセスにロールを適用します。EC2 インスタンスにロールをアタッチするか、指定されたユーザープロファイルからロールを引き受けることでこれを行うことができます。

## SQS キューから通知を受け取るようにワーカーを構成する

1. 以下のソース構成例を参考に、ワーカーを設定して、
      a. SQS のイベント通知を受信します。
      b. S3 バケット内の関連ログを読み取ります。 
      c. コンソールにログを発行します。
    ```yaml
        sources:
          cloudtrail:
            type: aws_s3
            region: ${REGION}
            sqs:
              queue_url: ${SQS_URL}
      ```
2. `${REGION}` は AWS アカウントのリージョンに置き換えてください。`${SQS_URL}` をコンソールの SQS キューの **Details** セクションに記載されている HTTP URL に置き換えます。

See [Amazon S3 source documentation][7] for more options.

With the Amazon S3 source set up, you can now add [transforms][8] to manipulate the data and [sinks][9] to output the logs to destinations based on your use case. See [Configurations][3] for more information on sources, transforms, and sinks. 

## Configure the Worker to separate batched Amazon S3 log events


ほとんどのサービス (例えば CloudTrail) は S3 にログをバッチで送信するので、ワーカーが受け取る各イベントは複数のログで構成されていることになります。以下の例では、`Records` はバッチされた 3 つのログイベントの配列です。

```json
{
  "Records": [
    {
      "log event 1": "xxxx"
    },
    {
      "log event 2": "xxxx"
    },
    {
      "log event 3": "xxxx"
    }
  ]
}
```

以下の `explode` と `map` 変換を追加して、バッチされたログイベントを個々のイベントに分離し、シンクで正しく処理できるようにします。

```json
transforms:
 explode:
   type: remap
   inputs:
     - cloudtrail
   source: |-
     .message = parse_json!(.message)
     . = unnest!(.message.Records)

 map:
   type: remap
   inputs:
     - explode
   source: |-
     merge!(., .message.Records)
     del(.message)
```

この例では、`parse_json` 関数が文字列を JSON にパースしています。

`unnest` 関数は、バッチされたログイベントを個々のログイベントの配列に分離します。

```
[
   {"Records": {"log event 1": "xxx"}},
   {"Records": {"log event 2": "xxx"}},
   {"Records": {"log event 3": "xxx"}}
]
```

次に、`merge` 関数が `.Records` のデータをトップレベルに折り畳み、各ログイベントが個々のログ行になるようにします。`del` 関数は、余計なフィールドを削除します。

```
{"log event 1": "xxx"}
```
```
{"log event 2": "xxx"}
```
```
{"log event 3": "xxx"}
```

### 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/legacy/#observability-pipelines-worker
[2]: /observability_pipelines/legacy/setup/
[3]: /observability_pipelines/legacy/configurations/
[4]: https://console.aws.amazon.com/sqs/home
[5]: https://console.aws.amazon.com/s3/
[6]: https://console.aws.amazon.com/iam/
[7]: /observability_pipelines/legacy/reference/sources/#awss3
[8]: /observability_pipelines/legacy/reference/transforms/
[9]: /observability_pipelines/legacy/reference/sinks/
