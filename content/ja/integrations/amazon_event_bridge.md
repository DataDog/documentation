---
categories:
  - クラウド
  - aws
ddtype: クローラー
dependencies: []
description: Amazon EventBridge のキーメトリクスを追跡
doc_link: 'https://docs.datadoghq.com/integrations/amazon_event_bridge/'
git_integration_title: amazon_event_bridge
has_logo: true
integration_title: Amazon EventBridge
is_public: true
kind: インテグレーション
manifest_version: 1
name: amazon_event_bridge
public_title: Datadog-Amazon EventBridge インテグレーション
short_description: Amazon EventBridge のキーメトリクスを追跡
version: 1
---
## 概要
Amazon EventBridge と Datadog のインテグレーションは、以下の機能を提供します。

* 複数の統合 AWS アカウントを対象にしてカスタムイベントバスを作成します。
* 選択したイベントバスに Datadog アラート通知イベントを送信します。
* AWS 内で、Kinesis、Lambda などのサービスを使用してイベントバスにトリガーをセットアップします。
* アラートイベント内の情報を使用して、自動修復パイプラインやランブックの実行、分析クエリの実行などを行います。

{{< img src="integrations/amazon_event_bridge/aws_event_bridge.png" alt="Amazon EventBridge" >}}

## セットアップ
[Amazon Web Services インテグレーション][1]をまだセットアップしていない場合は、最初にセットアップします。

### インストール
1. アラート通知を受信する AWS アカウントにそれぞれメイン [AWS インテグレーション][1]がインストールされていることを確認します。
2. Datadog – AWS ロールのアクセス許可ポリシーに次の項目が含まれることを確認します。
    `events:CreateEventBus`
3. AWS EventBridge はメイン AWS インテグレーションと共に自動的にインストールされます。

### コンフィグレーション
1. [Datadog - Amazon EventBridge インテグレーション][3]タイルに移動し、Datadog に統合された AWS アカウントのリストを確認します。ここで、イベントブリッジを作成します。
2. 選択した AWS アカウントで、イベントバスの名前を指定し、そのイベントバスを置くリージョンを選択して、新しいイベントバスを作成します。
3. Datadog アラートで、`@awseventbridge-<MY_EVENT_BUS>` 構文を使用して、イベントバスにアラート通知を送信します。
4. AWS で、イベントバスをターゲット (Lambda、Kinesis、[その他のサービス][4]) に接続して、イベント駆動型ワークフローを作成します。
5. Datadog の使用例は、[AWS コンソール][5]のパートナーページに掲載されています。
6. Datadog でイベントバスを削除するには、イベントバスの上にマウスを置き、ゴミ箱アイコンを押します。


## 収集データ
### メトリクス
Amazon EventBridge インテグレーションには、メトリクスは含まれません。

### イベント
Amazon EventBridge インテグレーションには、イベントは含まれません。

### サービスのチェック
Amazon EventBridge インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-event-bridge
[4]: https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/WhatIsCloudWatchEvents.html
[5]: https://console.aws.amazon.com/events/home#/partners/datadoghq.com?page=overview
[6]: https://docs.datadoghq.com/ja/help/


{{< get-dependencies >}}