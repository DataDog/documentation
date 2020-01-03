---
aliases:
  - /ja/integrations/hipchat/
categories:
  - collaboration
  - notification
ddtype: クローラー
dependencies: []
description: Datadog のアラートとグラフをチームの Slack チャンネルに送信
doc_link: 'https://docs.datadoghq.com/integrations/slack/'
git_integration_title: slack
has_logo: true
integration_title: Slack
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: slack
public_title: Datadog-Slack インテグレーション
short_description: Datadog のアラートとグラフをチームの Slack チャンネルに送信
version: '1.0'
---
## 概要

Slack を Datadog に接続すると、以下のことを可能にして、チームのコラボレーションを促進できます。

* チームのプライベートチャンネルまたは公開チャンネルで、同僚とグラフを共有できます。
* Slack 内で Datadog からのアラートや通知を受けることができます。

## セットアップ
### インストール

Slack インテグレーションは、Datadog アプリケーション内の[インテグレーションタイル][1]を使用してインストールします。

### コンフィグレーション

1. Slack アカウントで、[アプリケーションページ][2]に移動し、Datadog を検索します。
2. Install --> Add Integration をクリックし、次に Slack の **Webhook URL** をコピーします。
3. [Datadog-Slack インテグレーションタイル][3]の Configuration タブに移動します。
4. Add Account をクリックします。
5. 選択した **Slack アカウント名**を追加します。
6. **Slack Account Hook** フィールドに Webhook URL を貼り付けます。
7. Save をクリックします。
8. Slack の**ポスト先のチャンネル**を追加します。
    {{< img src="integrations/slack/slack_configuration.png" alt="Slack configuration" >}}
9. グラフへのコメントごとに通知を受けるには、各チャンネルの **Transfer all user comments** チェックボックスをオンにします。このチェックボックスをオフのままにする場合、コメントが Slack にポストされるようにするには、`@slack-<ACCOUNT_NAME>-<CHANNEL_NAME>` 構文を使用する必要があります。アカウントを 1 つだけ使用する場合、または最初のアカウントのみを参照する場合は、`@slack-<CHANNEL_NAME>` も使用できます。

[モニター][4]と[イベントストリーム][5]から Slack にアラートを送信するように構成することもできます。

## 収集データ
### メトリクス

Slack インテグレーションは、メトリクスを提供しません。

### イベント

Slack インテグレーションには、イベントは含まれません。

### サービスのチェック
Slack インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/slack
[2]: https://slack.com/apps
[3]: https://app.datadoghq.com/account/settings#integrations/slack
[4]: https://docs.datadoghq.com/ja/monitors/notifications/?tab=slackintegration#notification
[5]: https://docs.datadoghq.com/ja/graphing/event_stream/#notifications
[6]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}