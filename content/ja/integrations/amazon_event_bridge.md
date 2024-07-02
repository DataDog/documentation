---
"categories":
- aws
- cloud
- notifications
"custom_kind": "インテグレーション"
"dependencies": []
"description": "A serverless event bus that processes events from AWS services, SaaS, and your apps in near real time."
"doc_link": "https://docs.datadoghq.com/integrations/amazon_event_bridge/"
"draft": false
"git_integration_title": "amazon_event_bridge"
"has_logo": true
"integration_id": ""
"integration_title": "Amazon EventBridge"
"integration_version": ""
"is_public": true
"manifest_version": "1.0"
"name": "amazon_event_bridge"
"public_title": "Datadog-Amazon EventBridge Integration"
"short_description": "A serverless event bus that processes events from AWS services, SaaS, and your apps in near real time."
"version": "1.0"
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog for Government site does not support Amazon EventBridge.</div>
{{< /site-region >}}

## Overview

Datadog’s integration with Amazon EventBridge offers the following features:

- Create custom event buses across your integrated AWS accounts
- Send Datadog alert notification events into the event buses of your choice
- Within AWS, set up triggers on your event buses with services like Kinesis, Lambda, and more
- Use the information within the alert event to execute auto-remediation pipelines and runbooks, run analytics queries, etc.
- This integration is not supported in GovCloud

{{< img src="integrations/amazon_event_bridge/eventbridge_monitor_notification.png" alt="A monitor notification being sent to EventBridge" >}}

## セットアップ

If you haven't already, set up the [Amazon Web Services integration][1] first.

### インストール

1. Ensure that the main [AWS integration][1] is installed for each AWS account that receives alert notifications.
2. Ensure the following permissions exist in the permissions policy for Datadog AWS Role(s):
   `events:CreateEventBus` and `events:PutPartnerEvents`.
3. The Amazon EventBridge integration is automatically installed with the main AWS integration.

**Note**: You can also use the [API][2] or [Terraform][3] to set up an Amazon EventBridge source. 

### 構成

`events:CreateEventBus` and `events:PutPartnerEvents` permissions are required to send alert notifications to your event buses. If you do not have these permissions set, read the [Datadog IAM permissions documentation][4] to enable permissions prior to further configuration.

1. Navigate to the [Datadog - Amazon EventBridge integration][5] tile to see a list of AWS accounts integrated in Datadog where you can create Event Bridges.
2. 選択した AWS アカウントで、イベントバスの名前を指定し、そのイベントバスを置くリージョンを選択して、新しいイベントバスを作成します。
3. Datadog アラートで、`@awseventbridge-<MY_EVENT_BUS>` 構文を使用して、イベントバスにアラート通知を送信します。
4. Within AWS, connect your event buses to targets such as Lambda, Kinesis, and [many other services][6] to create event-driven workflows.
    **Note**: Examples of Datadog use cases can be found on Datadog's partner page in the [AWS Console][7].
5. After setting up an event bus in Datadog, navigate to the [Amazon EventBridge console][8] and select `Rules` in the navigation pane.
6. `Create Rule` を選択し、ルールの名前と説明を追加します。
7. **Define Pattern** で `Event Pattern` を選択します。**イベントマッチングパターン**として `Predefined by service` を選択します。**サービスプロバイダー**では、`Service partners` を選択します。**サービス名**では、`Datadog` を選択します。これにより、Datadog にあるイベントバスが入力されます。ルールの追加情報を追加してから、ルールを**保存**します。
8. Datadog でイベントバスの接続を解除するには、該当するイベントバスの上にマウスポインターを合わせ、ゴミ箱アイコンをクリックします。
   **注**: このアクションにより イベントバスの接続が AWS から解除されますが、AWS 内でイベントバスそのものが削除されるわけではありません。

**注**: EventBridge ルールは、ルールがアクティブでトリガーされない限り、Datadog にインポートされません。

### 自動化されたアクション

Amazon EventBridge インテグレーションを使用して、Datadog のモニターやスナップショット用に新しいアウトバウンド通知チャネルをセットアップします。自動化されたアクションを使用して、AWS リソースを次のように構成できます。

* Restart a process if process ends for [live process monitoring][9]
* EC2 の再起動を促します
* ECS タスクを促します (1 つのタスクが終了したら別のタスクを開始する)
* Ansible Playbook を適用します (ホストで変更を加える)
* リモートパッチを実行します
* リモート SSH スクリプトを実行します
* Windows Update を実行するか、アプリケーションをインストールします

The full list of resources you can target is available on the [AWS website][10].

このプロセスをトリガーするためにスナップショットを送信する方法の例を以下に示します。トリガーされると、AWS でアクション受信を指定できます。

{{< wistia uezo3fh61j >}}

## 収集データ

### メトリクス

Amazon EventBridge インテグレーションには、メトリクスは含まれません。

### イベント

Amazon EventBridge インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon EventBridge インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/api/latest/aws-integration/#create-an-amazon-eventbridge-source
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_event_bridge
[4]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=allpermissions#datadog-aws-iam-policy
[5]: https://app.datadoghq.com/integrations/amazon-event-bridge
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html
[7]: https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview
[8]: https://console.aws.amazon.com/events/
[9]: https://docs.datadoghq.com/monitors/monitor_types/process/
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html
[11]: https://docs.datadoghq.com/help/

