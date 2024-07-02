---
title: Setting up CloudTrail Logs for Cloud Security Management
---

Use the following instructions to enable CloudTrail Logs forwarding for Identity Risks (CIEM). When you enable CloudTrail logs forwarding, you get additional insights based on the actual usage (or non-usage) of resources in your infrastructure, for example, users and roles with significant gaps between provisioned and used permissions.

## Datadog AWS インテグレーションのセットアップ

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、セットアップします。

## Enable AWS CloudTrail logging

Enable AWS CloudTrail logging so that logs are sent to a S3 bucket.

1. Click **Create trail** on the [CloudTrail dashboard][2].
2. Enter a name for your trail.
3. Create an S3 bucket or use an existing S3 bucket to store the CloudTrail logs. 
4. Create an AWS KMS key or use an existing AWS KMS key. Click **Next**.
5. Leave the event type with the default management read and write events, or choose additional event types you want to send to Datadog. 
6. **Next** をクリックします。
7. 確認後、**Create trail** をクリックします。

## AWS CloudTrail のログを Datadog に送信する

Datadog Forwarder の Lambda 関数にトリガーを設定し、S3 バケットに保存されている CloudTrail ログを Datadog に送信してモニタリングします。

1. Go to the [Datadog Forwarder Lambda][3] that was created during the AWS integration set up.
2. **Add trigger** をクリックします。
3. トリガーに **S3** を選択します。
4. AWS CloudTrail のログを収集するために使用する S3 バケットを選択します。
5. イベントタイプで、**All object create events** を選択します。
6. **Add** をクリックします。
7. See CloudTrail logs in Datadog's [Log Explorer][4].

[1]: /integrations/amazon_web_services/
[2]: https://console.aws.amazon.com/cloudtrail/home
[3]: https://console.aws.amazon.com/lambda/home
[4]: https://app.datadoghq.com/logs?query=service%3Acloudtrail