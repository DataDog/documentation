---
categories:
  - コラボレーション
  - notification
ddtype: crawler
dependencies: []
description: Microsoft Teams で Datadog アラートとイベントの通知を受信
doc_link: 'https://docs.datadoghq.com/integrations/microsoft_teams/'
draft: false
git_integration_title: microsoft_teams
has_logo: true
integration_id: ''
integration_title: Microsoft Teams
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: microsoft_teams
public_title: Datadog-Microsoft Teams インテグレーション
short_description: Microsoft Teams で Datadog アラートとイベントの通知を受信
version: '1.0'
---
## 概要

Microsoft Teams と統合して、以下のことができます。

- Microsoft Teams で Datadog アラートとイベントの通知を受信
- メッセージやグラフを Microsoft Teams チームと共有できます。

## セットアップ

Datadog を Microsoft Teams チャンネルと統合するには、以下のようにします。

1. チャンネルのリストで、チャンネル名の横にある `...` ボタンを選択し、`コネクター` を選択します。

    {{< img src="integrations/microsoft_teams/microsoft_team_step_1.png" alt="Microsoft Teams 手順 1" >}}

2. Datadog を検索し、`構成` をクリックします。

    {{< img src="integrations/microsoft_teams/microsoft_team_step_2.png" alt="Microsoft Teams 手順 2" >}}

3. `Configure` ページで、webhook URL をコピーします。
4. Datadog アプリケーションで、[Integrations > Microsoft teams][1] の順に移動します。
5. Configuration タブで、**Add Channel** をクリックしてチャンネルに名前を付け、webhook URL を貼り付けます。
6. Microsoft `Configure` ページで、**Save** をクリックします。

これで、Microsoft チーム名で [`@-notification` 機能][2]を使用できます。

## 収集データ

### メトリクス

Microsoft Teams インテグレーションは、メトリクスを提供しません。

### イベント

Microsoft Teams インテグレーションには、イベントは含まれません。

### サービスのチェック

Microsoft Teams インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

### SSO の使用

次の手順を使用して、新しいチャンネルコネクターを設定します。

1. Datadog にログインし、セットアップ手順 1 および 2 を完了します。

2. セットアップ手順 3 で MS Teams ページから Datadog にリダイレクトされたら、新しいタブを開き、SSO で Datadog にログインします。次に、セットアップ手順 4 を個別に実行します。

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/microsoft-teams
[2]: https://docs.datadoghq.com/ja/monitors/notifications/#notification
[3]: https://docs.datadoghq.com/ja/help/