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
draft: false
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

{{< tabs >}}

{{% tab "Slack Application - US" %}}

### インストール

US リージョンの Datadog アプリをご使用の場合は、Slack ワークスペースで Datadog Slack アプリをインストールします。

1. Datadog アプリで、「Integrations」の下にある Slack [インテグレーションタイル][1]へ移動し、タイル下部の **Connect Slack Account** ボタンをクリックします。

2. Slack と Datadog のアカウントが接続されたことを確認します。**注**: この変更を Datadog ワークスペースの管理者に承認してもらう必要がある場合があります（一度のみ）。

**注**: [Slack App ディレクトリでの Slack インテグレーション][2]は、US リージョンの Datadog アプリケーションをご使用の場合のみ可能です。他のリージョンについては、[Slack Webhook][3] ドキュメントを参照してください。

## Slack アプリの使用

アプリがインストールされたら、Slack アプリをチャンネルに招待できます。

```
/invite @Datadog
```

次に、Datadog アカウントを Slack アカウントに接続します。

```
/datadog accounts
```

追加機能により、Datadog の一部をコマンド 1 つで Slack で利用することができます。

```
/datadog dashboard
/datadog slo
```

あらゆるウィジェットを Datadog から Slack へコピーして貼り付けることも可能です（`CMD + C`、`CTRL + C` のショートカット、またはウィジェットの拡張アイコンをクリックして "copy" を選択）。貼り付けるとリンクが表示され、チャンネルに送信されたらウィジェットとして開きます。

### モニターの接続

ボタンをクリックするだけで、Slack のトリガーモニターをミュートすることができます。

Slack アプリから送信されるようモニターを更新するには、以下の 2 つの方法があります。

**一括更新**: すべてのモニターが Slack アプリから送信されるように一括で更新することができます。また、コンフィギュレーションの上部にある "Upgrade" ボタンをクリックことで、Datadog のインテグレーションタイルにある各 Slack アカウントにミュートボタンを含められます。

**手動**: すべてのチームに展開する前にこの機能をテストしたい場合は、Slack インテグレーションのコンフィギュレーションで、手動でチャンネルを新しいアプリのアカウントコンフィギュレーションに追加することができます。
**注**: 同じチャンネルの重複参照を削除する必要がある場合があります。

### Datadog インシデントの使用

以下を使用して、Slack アプリから新しいインシデントを宣言します。

```
/datadog incident 
```

**注**: Datadog へのアクセス権の有無を問わず、Slack 組織内の誰でもインシデントを宣言できます。

新しいインシデントが作成されると、対応する Slack チャンネル `#incident-(unique number ID)` が作成され、新しいインシデントチャンネルの使用について伝えるメッセージがチャンネルに送信されます。チャンネルのトピックは、インシデントとともに変わります。

次を使用して、インシデントの状態（重大度）を更新します。

```
/datadog incident update
```

次を使用してオープン（アクティブで安定している）インシデントをリスト表示します。

```
/datadog incident lists
```

メッセージのアクションコマンド (#incident チャンネルで送信されたメッセージにカーソルを合わせると右の方に表示される3点リーダー) を使用して、Incident App Timeline にメッセージを送信します。

{{< img src="integrations/slack/incidents2.png" alt="Slack コンフィギュレーション" style="width:80%;">}}


[1]: https://app.datadoghq.com/account/settings#integrations/slack
[2]: https://www.datadoghq.com/blog/datadog-slack-app/
[3]: https://docs.datadoghq.com/ja/integrations/slack/?tab=slackwebhookeu
{{% /tab %}}

{{% tab "Slack Webhook - EU" %}}

US リージョン以外の Datadog アプリケーションをご使用の場合は、Slack Webhook をご利用ください。

### インストール

Slack インテグレーションは、Datadog アプリケーション内の[インテグレーションタイル][1]を使用してインストールします。

### コンフィギュレーション

1. Slack アカウントで、[アプリケーションページ][2]に移動し、Datadog（レガシー）を検索します。
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

**注**: US 以外の Datadog アプリをご使用で、[Slack App ディレクトリ インテグレーション][5]へのアクセスの追加をご希望の場合は、[サポートチームまでご連絡ください][6]！


[1]: https://app.datadoghq.com/account/settings#integrations/slack
[2]: https://slack.com/apps
[3]: https://docs.datadoghq.com/ja/monitors/notifications/?tab=slackintegration#notification
[4]: https://docs.datadoghq.com/ja/events/#notifications
[5]: https://www.datadoghq.com/blog/datadog-slack-app/
[6]: https://docs.datadoghq.com/ja/help/
{{% /tab %}}

{{< /tabs >}}

## モニターアラートからの Slack @ メンション

Slack インテグレーションをセットアップした後、通知メッセージに `@slack` を入力すると、通知の送信先として使用可能なチャンネルがリスト表示されます。

モニターメッセージテンプレートで `@username` を `< >` で囲み（例: `@slack-SLACK_CHANNEL <@USERNAME>）、Slack 通知内で定義されているユーザーに **@ 通知**します。

**注**: 通知の際に問題が発生した場合、Slackの表示名の代わりに `username` をお使いください。 `username` は **ユーザー名** 以下の  [Slack account settings][1] にあります。

`<!here>` または `<!channel>` を使用して、それぞれ **@here** または **@channel** をメンションできます。

ユーザーグループには、`<!subteam^GROUP_ID>` を使用します。`GROUP_ID` は、[Slack の `usergroups.list` API エンドポイント][2]を検索して見つけられます。たとえば、`12345` という ID を持つユーザーグループでは、次の構文を使用します。

```text
<!subteam^12345>
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

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

[1]: http://slack.com/account/settings
[2]: https://api.slack.com/methods/usergroups.list
[3]: https://docs.datadoghq.com/ja/help/