---
categories:
  - collaboration
  - notification
ddtype: crawler
dependencies: []
description: Datadog のアラートとグラフをチームの DingTalk Group に送信
doc_link: 'https://docs.datadoghq.com/integrations/dingtalk/'
draft: false
git_integration_title: dingtalk
has_logo: true
integration_id: dingtalk
integration_title: DingTalk
is_public: true
kind: integration
manifest_version: '1.0'
name: dingtalk
public_title: Datadog-DingTalk インテグレーション
short_description: Datadog のアラートとグラフをチームの DingTalk Group に送信
version: '1.0'
---
## 概要

DingTalk と統合して、以下のことができます。

-   DingTalk で Datadog アラートとイベントの通知を受けることができます。
-   メッセージやグラフを DingTalk グループと共有できます。

## インストール

DingTalk インテグレーションは、Datadog アプリケーション内の[インテグレーションタイル][1]を使用してインストールします。

## セットアップ

Datadog と DingTalk グループを統合するには、以下の手順に従ってください。

1. DingTalk アプリで _Messages_ に移動し、Datadog インテグレーションを追加するグループをクリックします。
2. 右上隅の _Group Settings_ アイコン (省略符に似たアイコン) をクリックし、_Group Robot_ を選択します。
3. Group Robot メニューで Datadog を選択し、`Add` をクリックします。
4. ロボットの名前を入力し、`Finished` をクリックします。これによって Webhook アドレスが返されます。
5. Webhook アドレスをコピーし、`Finished` をクリックします。
6. DingTalk [インテグレーションタイル][1]で、_Group Name_ フィールドに Datadog インテグレーションを追加した DingTalk グループを入力し、_Group Robot Webhook_ フィールドに Webhook アドレスを貼り付けます。グループ名には、文字、数字、およびアンダースコアを使用できます。
7. _Install Configuration_ (または _Update Configuration_) をクリックします。

インテグレーションをインストールまたは更新したら、DingTalk グループ名で [`@-notification` 機能][2]を使用できるようになります。

## 収集データ

### メトリクス

DingTalk インテグレーションは、メトリクスを提供しません。

### イベント

DingTalk インテグレーションには、イベントは含まれません。

### サービスのチェック

DingTalk インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/dingtalk
[2]: https://docs.datadoghq.com/ja/monitors/notifications/#notification
[3]: https://docs.datadoghq.com/ja/help/