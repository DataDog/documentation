---
categories:
- AWS
- クラウド
- notifications
custom_kind: integration
dependencies: []
description: AWS サービス、SaaS、アプリからのイベントをほぼリアルタイムに処理するサーバーレスイベントバス。
doc_link: https://docs.datadoghq.com/integrations/amazon_event_bridge/
draft: false
git_integration_title: amazon_event_bridge
has_logo: true
integration_id: ''
integration_title: Amazon EventBridge
integration_version: ''
is_public: true
manifest_version: '1.0'
name: amazon_event_bridge
public_title: Datadog-Amazon EventBridge インテグレーション
short_description: AWS サービス、SaaS、アプリからのイベントをほぼリアルタイムに処理するサーバーレスイベントバス。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog for Government サイトは、Amazon EventBridge をサポートしていません。</div>
{{< /site-region >}}

## 概要

Amazon EventBridge と Datadog のインテグレーションは、以下の機能を提供します。

- 複数の統合 AWS アカウントを対象にしてカスタムイベントバスを作成します。
- 選択したイベントバスに Datadog アラート通知イベントを送信します。
- AWS 内で、Kinesis、Lambda などのサービスを使用してイベントバスにトリガーをセットアップします。
- アラートイベント内の情報を使用して、自動修復パイプラインやランブックの実行、分析クエリの実行などを行います。
- このインテグレーションは GovCloud ではサポートされていません

{{< img src="integrations/amazon_event_bridge/eventbridge_monitor_notification.png" alt="EventBridge に送信されているモニター通知" >}}

## Setup

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### Installation

1. アラート通知を受信する AWS アカウントにそれぞれメイン [AWS インテグレーション][1]がインストールされていることを確認します。
2. Datadog AWS ロールの権限ポリシーに次の権限が含まれていることを確認します。
   `events:CreateEventBus` および `events:PutPartnerEvents`。
3. Amazon EventBridge はメイン AWS インテグレーションと共に自動的にインストールされます。

**注**: [API][2] または [Terraform][3] を使用して Amazon EventBridge ソースをセットアップすることもできます。

### Configuration

イベントバスにアラート通知を送信するには、`events:CreateEventBus` および `events:PutPartnerEvents` の権限が必要です。これらの権限が設定されていない場合は、さらなる構成を行う前に、[Datadog IAM 権限のドキュメント][4]を参照して、権限を有効にしてください。

1. [Datadog - Amazon EventBridge インテグレーション][5]タイルに移動し、Datadog に統合された AWS アカウントのリストを確認します。ここで、イベントブリッジを作成します。
2. Within the AWS account of choice, create a new event bus by providing a name and selecting the region where you want it to exist.
3. Within Datadog alerts, use the `@awseventbridge-<MY_EVENT_BUS>` syntax to send alert notifications to your event buses.
4. AWS 内で、イベントバスをターゲット (Lambda、Kinesis、[その他のサービス][6]) に接続して、イベント駆動型ワークフローを作成します。
    **注**: Datadog の使用例は、[AWS コンソール][7]の Datadog のパートナーページに掲載されています。
5. Datadog でイベントバスを設定した後、[Amazon EventBridge コンソール][8]に移動し、ナビゲーションペインで `Rules` を選択します。
6. Select `Create Rule` and add a name and description for your rule.
7. Under **Define Pattern**, select `Event Pattern`. Select `Predefined by service` as the **event matching pattern**. For **service provider**, select `Service partners`. For **service name**, select `Datadog`. This populates the event buses that are in Datadog. Add any additional information for your rule., then **Save** the rule.
8. To disconnect an event bus in Datadog, hover over the event bus of your choice and press the trash icon.
    **Note**: This action disconnects the event bus from AWS, but does not delete the event bus itself within AWS.

**Note**: EventBridge rules are not imported into Datadog unless the rule is active and has been triggered. 

### Automated actions

Set up new outbound notification channels for monitors and snapshots from Datadog with the Amazon EventBridge integration. With automated actions, you can configure your AWS resources to:

* [ライブプロセスモニタリング][9]用のプロセスが終了した場合、そのプロセスを再起動します
* Prompt EC2 reboots
* Prompt ECS Task (kick off another task when one task ends)
* Apply an Ansible Playbook (make any change on hosts)
* Run remote patches
* Run remote SSH scripts
* Run Windows Updates or install applications

ターゲットにできるリソースの完全なリストは、[AWS ウェブサイト][10]にあります。

Find below an example of how to send a snapshot to trigger this process. Once triggered, you can specify the actions receipt in AWS.

{{< wistia uezo3fh61j >}}

## Data Collected

### Metrics

The Amazon EventBridge integration does not include any metrics.

### Events

The Amazon EventBridge integration does not include any events.

### Service Checks

The Amazon EventBridge integration does not include any service checks.

## Troubleshooting

Need help? Contact [Datadog support][11].

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/ja/api/latest/aws-integration/#create-an-amazon-eventbridge-source
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws_event_bridge
[4]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#datadog-aws-iam-policy
[5]: https://app.datadoghq.com/integrations/amazon-event-bridge
[6]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html
[7]: https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview
[8]: https://console.aws.amazon.com/events/
[9]: https://docs.datadoghq.com/ja/monitors/monitor_types/process/
[10]: https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html
[11]: https://docs.datadoghq.com/ja/help/