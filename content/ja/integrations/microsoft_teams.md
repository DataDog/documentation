---
categories:
  - コラボレーション
ddtype: クローラー
dependencies: []
description: Microsoft Teams で Datadog アラートとイベントの通知を受信
doc_link: 'https://docs.datadoghq.com/integrations/microsoft_teams/'
git_integration_title: microsoft_teams
has_logo: true
integration_title: Microsoft Teams
is_public: true
kind: インテグレーション
manifest_version: 1
name: microsoft_teams
public_title: Datadog-Microsoft Teams インテグレーション
short_description: Microsoft Teams で Datadog アラートとイベントの通知を受信
version: 1
---
## 概要

Microsoft Teams と統合して、以下のことができます。

* Microsoft Teams で Datadog アラートとイベントの通知を受けることができます。
* メッセージやグラフを Microsoft Teams チームと共有できます。

## セットアップ
Datadog を Microsoft Teams チャンネルと統合するには、以下のようにします。

1. チャンネルのリストで、チャンネル名の横にある `...` ボタンを選択し、`コネクター` を選択します。

    {{< img src="integrations/microsoft_teams/microsoft_team_step_1.png" alt="Microsoft Teams step 1" responsive="true">}}

2. Datadog を検索し、`構成` をクリックします。

    {{< img src="integrations/microsoft_teams/microsoft_team_step_2.png" alt="Microsoft Teams step 2" responsive="true">}}

3. サブドメインがある場合は、アカウントのサブドメインを入力します。ない場合は、`app` と入力します。**サイトにアクセスしてインストール** をクリックします。これで、Datadog にリダイレクトして戻ります。

    {{< img src="integrations/microsoft_teams/microsoft_team_step_3.png" alt="Microsoft Teams step 3" responsive="true">}}

4. Microsoft Teams インテグレーションタイルの Configuration タブで、`Connect to Office 365` ボタンをクリックすると、インストールが完了します。

    {{< img src="integrations/microsoft_teams/microsoft_team_step_4.png" alt="Microsoft Teams step 4" responsive="true">}}

5. 自動生成されたチーム名を任意の名前に置き換えます。

    {{< img src="integrations/microsoft_teams/microsoft_team_step_5.png" alt="Microsoft Teams step 5" responsive="true">}}

これで、Microsoft チーム名で [`@-notification` 機能][1]を使用できるようになりました。

## 収集データ
### メトリクス

Microsoft Teams インテグレーションは、メトリクスを提供しません。

### イベント

Microsoft Teams インテグレーションには、イベントは含まれません。

### サービスのチェック
Microsoft Teams インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://docs.datadoghq.com/ja/monitors/notifications/#notification
[2]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}