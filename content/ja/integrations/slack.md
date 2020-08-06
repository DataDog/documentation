---
aliases:
  - /ja/integrations/hipchat/
categories:
  - collaboration
  - notification
ddtype: crawler
dependencies: []
description: Datadog のアラートとグラフをチームの Slack チャンネルに送信。
doc_link: 'https://docs.datadoghq.com/integrations/slack/'
git_integration_title: slack
has_logo: true
integration_title: Slack
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: slack
public_title: Datadog-Slack インテグレーション
short_description: Datadog のアラートとグラフをチームの Slack チャンネルに送信。
version: '1.0'
---
## 概要

Slack を Datadog に接続すると、以下のことを可能にして、チームのコラボレーションを促進できます。

- チームのプライベートチャンネルまたは公開チャンネルで、同僚とグラフを共有できます。
- Slack 内で Datadog からのアラートや通知を受けることができます。

## セットアップ

### インストール

Slack インテグレーションは、Datadog アプリケーション内の[インテグレーションタイル][1]を使用してインストールします。

### コンフィグレーション

1. Slack アカウントで、[アプリケーションページ][2]に移動し、Datadog を検索します。
2. _Install_ --> _Add Integration_ の順に選択し、次に Slack の **Webhook URL** をコピーします。
3. [Datadog-Slack インテグレーションタイル][1]の Configuration タブに移動します。
4. _Add Account_ をクリックします。
5. 選択した **Slack アカウント名**を追加します。
6. **Slack Account Hook** フィールドに Webhook URL を貼り付けます。
7. _Save_ をクリックします。
8. Slack の**ポスト先のチャンネル**を追加します。
   {{< img src="integrations/slack/slack_configuration.png" alt="Slack コンフィギュレーション" >}}
9. グラフへのコメントごとに通知を受けるには、各チャンネルの **Transfer all user comments** チェックボックスをオンにします。このチェックボックスをオフのままにする場合、コメントが Slack にポストされるようにするには、`@slack-<ACCOUNT_NAME>-<CHANNEL_NAME>` 構文を使用する必要があります。アカウントを 1 つだけ使用する場合、または最初のアカウントのみを参照する場合は、`@slack-<CHANNEL_NAME>` も使用できます。

[モニター][3]と[イベントストリーム][4]から Slack にアラートを送信するように構成することもできます。

## モニターアラートからの Slack @ メンション

Slack インテグレーションをセットアップした後、通知メッセージに `@slack` を入力すると、通知の送信先として使用可能なチャンネルがリスト表示されます。

モニターメッセージテンプレートで `@username` を `< >` で囲み（例: `@slack-SLACK_CHANNEL <@USERNAME>）、Slack 通知内で定義されているユーザーに **@ 通知**します。

**注**: 通知の際に問題が発生した場合、Slack の表示名の代わりに `username` をお使いください。`username` は**ユーザー名**以下の [Slack account settings][5] にあります。

`<!here>` または `<!channel>` を使用して、それぞれ **@here** または **@channel** をメンションできます。

メッセージの送信時にチャンネル内のすべてのユーザーに通知するには、`<!subteam^GROUP_ID>` を使用します。

ユーザーグループには、`<!subteam^グループ_ID|Gグループ名>` を使用します。`グループ_ID` を見つけるには、[Slack の `usergroups.list` API エンドポイントをクエリ][6]します。たとえば、`testers` という名前のユーザーグループの場合、次の構文を使用します。

```text
<!subteam^12345|testers>
```

注: Slack @ 通知の場合、チャンネル名の後に特殊文字を付けることはサポートされていません。
`@----critical_alerts` は機能しますが、`@--critical_alerts--` は通知を受信しません。

### メッセージテンプレート変数を使用して動的に @ メンションを作成する

モニターメッセージ内でメッセージテンプレート変数を使用して、動的に **@ メンション**を作成できます。

たとえば、Slack インテグレーションで、次の変数がチャンネルとしてセットアップされている場合

- `@slack-{{owner.name}}` は、このモニターの所有者のチャンネルにメッセージを投稿します。

- `@slack-{{host.name}}` は、Slack 内の #host.name チャンネルに Slack メッセージを投稿します。

または、特定のメールに直接アクセスする **@メンション**を作成します。

- `@team-{{team.name}}@company.com` は、チームのメーリングリストにメールを送信します。

## 収集データ

### メトリクス

Slack インテグレーションは、メトリクスを提供しません。

### イベント

Slack インテグレーションには、イベントは含まれません。

### サービスのチェック

Slack インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/slack
[2]: https://slack.com/apps
[3]: https://docs.datadoghq.com/ja/monitors/notifications/?tab=slackintegration#notification
[4]: https://docs.datadoghq.com/ja/events/#notifications
[5]: http://slack.com/account/settings
[6]: https://api.slack.com/methods/usergroups.list
[7]: https://docs.datadoghq.com/ja/help/