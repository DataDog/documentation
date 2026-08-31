---
categories:
- AWS
- クラウド
- notifications
custom_kind: インテグレーション
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
<div class="alert alert-danger">Datadog for Government サイトは、Amazon EventBridge をサポートしていません。</div>
{{< /site-region >}}

## 概要

Amazon EventBridge と Datadog のインテグレーションは、以下の機能を提供します。

- 複数の統合 AWS アカウントを対象にしてカスタムイベントバスを作成します。
- 選択したイベントバスに Datadog アラート通知イベントを送信します。
- AWS 内で、Kinesis、Lambda などのサービスを使用してイベントバスにトリガーをセットアップします。
- アラートイベント内の情報を使用して、自動修復パイプラインやランブックの実行、分析クエリの実行などを行います。
- このインテグレーションは GovCloud ではサポートされていません

{{< img src="integrations/amazon_event_bridge/eventbridge_monitor_notification.png" alt="EventBridge に送信されているモニター通知" >}}

## セットアップ

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### インストール

1. アラート通知を受信する AWS アカウントにそれぞれメイン [AWS インテグレーション][1]がインストールされていることを確認します。
2. Datadog AWS ロールの権限ポリシーに次の権限が含まれていることを確認します。
   `events:CreateEventBus` および `events:PutPartnerEvents`。
3. Amazon EventBridge はメイン AWS インテグレーションと共に自動的にインストールされます。

**注**: [API][2] または [Terraform][3] を使用して Amazon EventBridge ソースをセットアップすることもできます。

### 構成

イベントバスにアラート通知を送信するには、`events:CreateEventBus` および `events:PutPartnerEvents` の権限が必要です。これらの権限が設定されていない場合は、さらなる構成を行う前に、[Datadog IAM 権限のドキュメント][4]を参照して、権限を有効にしてください。

1. [Datadog - Amazon EventBridge インテグレーション][5]タイルに移動し、Datadog に統合された AWS アカウントのリストを確認します。ここで、イベントブリッジを作成します。
2. 選択した AWS アカウントで、イベントバスの名前を指定し、そのイベントバスを置くリージョンを選択して、新しいイベントバスを作成します。
3. Datadog アラートで、`@awseventbridge-<MY_EVENT_BUS>` 構文を使用して、イベントバスにアラート通知を送信します。
4. AWS 内で、イベントバスをターゲット (Lambda、Kinesis、[その他のサービス][6]) に接続して、イベント駆動型ワークフローを作成します。
    **注**: Datadog の使用例は、[AWS コンソール][7]の Datadog のパートナーページに掲載されています。
5. Datadog でイベントバスを設定した後、[Amazon EventBridge コンソール][8]に移動し、ナビゲーションペインで `Rules` を選択します。
6. `Create Rule` を選択し、ルールの名前と説明を追加します。
7. **Define Pattern** で `Event Pattern` を選択します。**イベントマッチングパターン**として `Predefined by service` を選択します。**サービスプロバイダー**では、`Service partners` を選択します。**サービス名**では、`Datadog` を選択します。これにより、Datadog にあるイベントバスが入力されます。ルールの追加情報を追加してから、ルールを**保存**します。
8. Datadog でイベントバスの接続を解除するには、該当するイベントバスの上にマウスポインターを合わせ、ゴミ箱アイコンをクリックします。
   **注**: このアクションにより イベントバスの接続が AWS から解除されますが、AWS 内でイベントバスそのものが削除されるわけではありません。

**注**: EventBridge ルールは、ルールがアクティブでトリガーされない限り、Datadog にインポートされません。

### 自動化されたアクション

Amazon EventBridge インテグレーションを使用して、Datadog のモニターやスナップショット用に新しいアウトバウンド通知チャネルをセットアップします。自動化されたアクションを使用して、AWS リソースを次のように構成できます。

* [ライブプロセスモニタリング][9]用のプロセスが終了した場合、そのプロセスを再起動します
* EC2 の再起動を促します
* ECS タスクを促します (1 つのタスクが終了したら別のタスクを開始する)
* Ansible Playbook を適用します (ホストで変更を加える)
* リモートパッチを実行します
* リモート SSH スクリプトを実行します
* Windows Update を実行するか、アプリケーションをインストールします

ターゲットにできるリソースの完全なリストは、[AWS ウェブサイト][10]にあります。

## 収集データ

### メトリクス

Amazon EventBridge インテグレーションには、メトリクスは含まれません。

### イベント

Amazon EventBridge インテグレーションには、イベントは含まれません。

### サービスチェック

Amazon EventBridge インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

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