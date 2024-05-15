---
categories:
- AWS
- クラウド
- notifications
dependencies: []
description: Amazon EventBridge のキーメトリクスを追跡
doc_link: https://docs.datadoghq.com/integrations/amazon_event_bridge/
draft: false
git_integration_title: amazon_event_bridge
has_logo: true
integration_id: ''
integration_title: Amazon EventBridge
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: amazon_event_bridge
public_title: Datadog-Amazon EventBridge インテグレーション
short_description: Amazon EventBridge のキーメトリクスを追跡
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

## 計画と使用

[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### インフラストラクチャーリスト

1. アラート通知を受信する AWS アカウントにそれぞれメイン [AWS インテグレーション][1]がインストールされていることを確認します。
2. Datadog AWS ロールのアクセス許可ポリシーに次の項目が含まれていることを確認します。
   `events:CreateEventBus`
3. Amazon EventBridge はメイン AWS インテグレーションと共に自動的にインストールされます。

### ブラウザトラブルシューティング

イベントバスにアラート通知を送信するには、`events:CreateEventBus` と `events:PutPartnerEvents` のアクセス許可が必要です。このアクセス許可が設定されていない場合は、[Datadog IAM アクセス許可のドキュメント][2]を参照して、さらに構成を行う前にアクセス許可を有効にしてください。

1. [Datadog - Amazon EventBridge インテグレーション][3]タイルに移動し、Datadog に統合された AWS アカウントのリストを確認します。ここで、イベントブリッジを作成します。
2. 選択した AWS アカウントで、イベントバスの名前を指定し、そのイベントバスを置くリージョンを選択して、新しいイベントバスを作成します。
3. Datadog アラートで、`@awseventbridge-<MY_EVENT_BUS>` 構文を使用して、イベントバスにアラート通知を送信します。
4. AWS で、イベントバスをターゲット (Lambda、Kinesis、[その他のサービス][4]) に接続して、イベント駆動型ワークフローを作成します。
    **注**: Datadog の使用例は、[AWS コンソール][5]の Datadog のパートナーページに掲載されています。
5. Datadog でイベントバスを設定した後、[Amazon EventBridge コンソール][6]に移動し、ナビゲーションペインで `Rules` を選択します。
6. `Create Rule` を選択し、ルールの名前と説明を追加します。
7. **Define Pattern** で `Event Pattern` を選択します。**イベントマッチングパターン**として `Predefined by service` を選択します。**サービスプロバイダー**では、`Service partners` を選択します。**サービス名**では、`Datadog` を選択します。これにより、Datadog にあるイベントバスが入力されます。ルールの追加情報を追加してから、ルールを**保存**します。
8. Datadog でイベントバスの接続を解除するには、該当するイベントバスの上にマウスポインターを合わせ、ゴミ箱アイコンをクリックします。
   **注**: このアクションにより イベントバスの接続が AWS から解除されますが、AWS 内でイベントバスそのものが削除されるわけではありません。

**注**: EventBridge ルールは、ルールがアクティブでトリガーされない限り、Datadog にインポートされません。

### 自動化されたアクション

Amazon EventBridge インテグレーションを使用して、Datadog のモニターやスナップショット用に新しいアウトバウンド通知チャネルをセットアップします。自動化されたアクションを使用して、AWS リソースを次のように構成できます。

* [ライブプロセスモニタリング][7]のプロセスが終了した場合、プロセスを再起動します
* EC2 の再起動を促します
* ECS タスクを促します (1 つのタスクが終了したら別のタスクを開始する)
* Ansible Playbook を適用します (ホストで変更を加える)
* リモートパッチを実行します
* リモート SSH スクリプトを実行します
* Windows Update を実行するか、アプリケーションをインストールします

ターゲットにできるリソースの完全なリストは、[AWS ウェブサイト][8]にあります。

このプロセスをトリガーするためにスナップショットを送信する方法の例を以下に示します。トリガーされると、AWS でアクション受信を指定できます。

{{< wistia uezo3fh61j >}}

## リアルユーザーモニタリング

### データセキュリティ

Amazon EventBridge インテグレーションには、メトリクスは含まれません。

### イベント

Amazon EventBridge インテグレーションには、イベントは含まれません。

### サービスのチェック

Amazon EventBridge インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/?tab=allpermissions#datadog-aws-iam-policy
[3]: https://app.datadoghq.com/integrations/amazon-event-bridge
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html
[5]: https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview
[6]: https://console.aws.amazon.com/events/
[7]: https://docs.datadoghq.com/ja/monitors/monitor_types/process/
[8]: https://docs.aws.amazon.com/eventbridge/latest/userguide/what-is-amazon-eventbridge.html
[9]: https://docs.datadoghq.com/ja/help/