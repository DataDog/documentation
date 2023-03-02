---
aliases:
- /ja/integrations/hipchat/
categories:
- collaboration
- notification
dependencies: []
description: Datadog のアラートとグラフをチームの Slack チャンネルに送信。
doc_link: https://docs.datadoghq.com/integrations/slack/
draft: false
git_integration_title: slack
has_logo: true
integration_id: ''
integration_title: Slack
integration_version: ''
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: slack
public_title: Datadog-Slack インテグレーション
short_description: Datadog のアラートとグラフをチームの Slack チャンネルに送信。
version: '1.0'
---

## 概要

Slack を Datadog に接続し、次の方法でチームのコラボレーションを支援します。

- チームのプライベートチャンネルまたは公開チャンネルで、同僚とグラフを共有できます。
- Slack 内で Datadog からのアラートや通知を受けることができます。
- トリガーとなるモニターをミュートし、Datadog 内の Slack からインシデントを宣言できます。

## セットアップ

{{< tabs >}}

{{% tab "Slack アプリケーション" %}}

### APM に Datadog Agent を構成する

US1、US3、US5、EU1 の Datadog [サイト][1]をお使いの方は、Slack のワークスペースに Datadog for Slack をインストールします。

1. Datadog サイトで、「Integrations」の下にある Slack [インテグレーションタイル][1]へ移動し、タイル下部の **Connect Slack Account** ボタンをクリックします。

2. Slack と Datadog のアカウントが接続されたことを確認します。この変更を Datadog ワークスペースの管理者に承認してもらう必要がある場合があります（一度のみ）。

[Slack App ディレクトリでの Slack インテグレーション][3]は、US1、US3、US5、または EU1 Datadog [サイト][1]をご使用の場合のみ可能です。他のリージョンについては、[Slack Webhook][4] ドキュメントを参照してください。

## 使用方法

アプリがインストールされたら、Slack アプリをチャンネルに招待できます。

```
/invite @Datadog
```

以下を使用して、Slack で使用可能なすべてのコマンドを表示します。

```
/datadog help
```

<div class="alert alert-info">
`/dd` はすべての `/datadog` コマンドのエイリアスです。
</div>

あらゆるウィジェットを Datadog から Slack へコピーして貼り付けることも可能です（`CMD + C`、`CTRL + C` のショートカット、またはウィジェットの拡張アイコンをクリックして **Copy** を選択）。貼り付けると、チャンネルに送信されたウィジェットとして展開されるリンクが表示されます。

### モニターの接続

ボタンをクリックするだけで、Slack のトリガーモニターをミュートすることができます。

Slack アプリから送信されるようモニターを更新するには、以下の 2 つの方法があります。

**一括更新**: すべてのモニターが Slack アプリから送信されるように一括で更新することができます。また、コンフィギュレーションの上部にある "Upgrade" ボタンをクリックことで、Datadog のインテグレーションタイルにある各 Slack アカウントにミュートボタンを含められます。

**手動**: すべてのチームに展開する前にこの機能をテストしたい場合は、Slack インテグレーションのコンフィギュレーションで、手動でチャンネルを新しいアプリのアカウントコンフィギュレーションに追加することができます。同じチャンネルの重複参照を削除する必要がある場合があります。

### Datadog インシデントの使用

以下を使用して、Slack アプリから新しいインシデントを宣言します。

```
/datadog incident 
```

Datadog へのアクセス権の有無を問わず、Slack 組織内の誰でもインシデントを宣言できます。

新しいインシデントが作成されると、対応する Slack チャンネル `#incident-(unique number ID)` が作成され、新しいインシデントチャンネルの使用について伝えるメッセージがチャンネルに送信されます。チャンネルのトピックは、インシデントとともに変わります。

次を使用して、インシデントの状態（重大度など）を更新します。

```
/datadog incident update
```

次を使用してオープン（アクティブで安定している）インシデントをリスト表示します。

```
/datadog incident lists
```

メッセージのアクションコマンド (#incident チャンネルで送信されたメッセージにカーソルを合わせると右の方に表示される3点リーダー) を使用して、Incident App Timeline にメッセージを送信します。

{{< img src="integrations/slack/incidents2.png" alt="Slack コンフィギュレーション" style="width:80%;">}}

#### インシデントの更新チャンネル
インシデントの更新チャンネルを使用すると、チームは Slack ワークスペースから、組織全体にすべてのインシデントのステータスを直接公開することができます。ワークスペースで、更新を投稿するチャンネルを選択すると、チャンネルでは以下の投稿を受信します。

1. 新しく宣言されたインシデント。
2. 重要度、ステータスの移行、インシデントコマンダーへの変更点。
3. アプリ内の[インシデント][5]の概要ページへのリンク。
4. 該当するインシデントの Slack チャンネルへの参加リンク。

Slack アプリを[インストール][6]したら、Incident [Settings][7] ページに移動します。*Incident Updates Channel* セクションまでスクロールして、セットアップの手順を開始します。

Slack アプリに入ったら、インシデント更新のためのチャンネルを設定します。

**このチャンネルのセットアップ方法**:
1. インシデント設定にアクセスします。
2. *Incident Updates Channel* セクションに移動します。
3. インシデント更新のための Slack ワークスペースと特定の Slack チャンネルを定義します。

{{< img src="integrations/slack/incident_updates_channel.png" alt="インシデントの更新チャンネル" style="width:80%;">}}

#### インシデントタスクの管理

Slack アクションおよび `/datadog` Slack コマンドを使用することで、Slack から直接インシデントタスクを作成・管理できます。インシデントタスクのコマンドはインシデントチャンネルで使用する必要があります。

**Slack アクション**: 
Slack アクションを使用して、インシデントチャンネルで送信されたメッセージにマウスオーバーすることでタスクを作成できます。カーソルを合わせると、メッセージの右側に 3 点ドットが表示され、そこから「タスクをインシデントに追加」することができます。

**利用可能なコマンド**:

* `/datadog task` はインシデントのタスクを作成します。表示されるモーダル画面でタスクの説明の入力、チームメイトの割り当て、期限の設定を行うことができます。
* `/datadog task list` はあるインシデントについて作成されたすべてのタスクのリストを表示します。このリストを利用してタスクを完了としてマークしたり、再開したりすることができます。

作成されたすべてのタスクは、[インシデント UI][5]の **Incident Tasks** の **Remediation** タブで管理することができます。詳しくは、[インシデント管理ドキュメント][8]を参照してください。

[1]: https://docs.datadoghq.com/ja/getting_started/site/
[2]: https://app.datadoghq.com/account/settings#integrations/slack
[3]: https://www.datadoghq.com/blog/datadog-slack-app/
[4]: https://docs.datadoghq.com/ja/integrations/slack/?tab=slackwebhooklegacy
[5]: https://app.datadoghq.com/incidents
[6]: https://docs.datadoghq.com/ja/integrations/slack/?tab=slackapplicationus#installation
[7]: https://app.datadoghq.com/incidents/settings
[8]: https://docs.datadoghq.com/ja/monitors/incident_management/#follow-up-and-learn-from-the-incident
{{< /tabs >}}

{{% tab "Slack Webhook (レガシー)" %}}

US5 または US1-FED Datadog [サイト][1]を使用している場合は、Slack Webhook を使用します。

### APM に Datadog Agent を構成する

Slack インテグレーションは、Datadog サイトの[インテグレーションタイル][2]を使用してインストールします。

### コンフィギュレーション

1. Slack アカウントで、[Datadog (レガシー) アプリ][3]にアクセスします。
2. _Install_ --> _Add Integration_ の順に選択し、次に Slack の **Webhook URL** をコピーします。
3. [Datadog-Slack インテグレーションタイル][2]の Configuration タブに移動します。
4. _Add Account_ をクリックします。
5. 選択した **Slack アカウント名**を追加します。
6. **Slack Account Hook** フィールドに Webhook URL を貼り付けます。
7. _Save_ をクリックします。
8. Slack の**ポスト先のチャンネル**を追加します。
  {{< img src="integrations/slack/slack_configuration.png" alt="Slack コンフィギュレーション" >}}
9. グラフへのコメントごとに通知を受けるには、各チャンネルの **Transfer all user comments** チェックボックスをオンにします。このチェックボックスをオフのままにする場合、コメントが Slack にポストされるようにするには、`@slack-<ACCOUNT_NAME>-<CHANNEL_NAME>` 構文を使用する必要があります。アカウントを 1 つだけ使用する場合、または最初のアカウントのみを参照する場合は、`@slack-<CHANNEL_NAME>` も使用できます。

[モニター][4]と[イベントストリーム][5]から Slack にアラートを送信するように構成することもできます。


[1]: https://docs.datadoghq.com/ja/getting_started/site/
[2]: https://app.datadoghq.com/account/settings#integrations/slack
[3]: https://slack.com/apps/A0F7XDT7F-datadog-legacy
[4]: https://docs.datadoghq.com/ja/monitors/notifications/?tab=slackintegration#notification
[5]: https://docs.datadoghq.com/ja/events/#notifications
{{% /tab %}}
{{< /tabs >}}

## モニターアラートからの Slack `@-mentions`

Slack インテグレーションをセットアップしたら、通知メッセージに `@slack` を入力すると、通知の送信先として使用可能なチャンネルがリストされます。

モニターのメッセージテンプレートで `@username` を `< >` で囲み（例: `@slack-SLACK_CHANNEL <@USERNAME>` または `@slack-SLACK_ACCOUNT-SLACK_CHANNEL <@USERNAME>`）、Slack 通知内で定義されているユーザーに **@ 通知**します。

通知の際に問題が発生した場合、Slackの表示名の代わりに `username` をお使いください。 `username` は **ユーザー名** 以下の  [Slack account settings][1] にあります。

`<!here>` または `<!channel>` を使用して、それぞれ **@here** または **@channel** をメンションできます。

ユーザーグループには、`<!subteam^GROUP_ID>` を使用します。`GROUP_ID` は、[Slack の `usergroups.list` API エンドポイント][2]を検索して見つけられます。たとえば、`12345` という ID を持つユーザーグループでは、次の構文を使用します。

```text
<!subteam^12345>
```

標準の Datadog [通知][3]と同じルール、テンプレート変数、タグ、条件を使用します。たとえば、この通知は、再通知時に、`infrastructure` と呼ばれる Slack チャネルのサブチームに ping を送信します。

```
CPU usage has exceeded {{warn_threshold}} on {{ @machine_id.name }}.
{{#is_renotify}}
Notifying @slack-infrastructure <!subteam^12345>
{{/is_renotify}}
```

Slack @ 通知の場合、チャンネル名の後に特殊文字を付けることはサポートされていません。
たとえば、`@----critical_alerts` は機能しますが、`@--critical_alerts--` は通知を受信しません。

### メッセージテンプレート変数を使用して動的に @ メンションを作成する

モニターメッセージ内でメッセージテンプレート変数を使用して、動的に **@ メンション**を作成できます。

たとえば、Slack インテグレーションで、次の変数がチャンネルとしてセットアップされている場合

- `@slack-{{owner.name}}` は、このモニターの所有者のチャンネルにメッセージを投稿します。

- `@slack-{{host.name}}` は、#host.name チャンネルに Slack メッセージを投稿します。

または、特定のメールに直接アクセスする **@メンション**を作成します。

- `@team-{{team.name}}@company.com` は、チームのメーリングリストにメールを送信します。

### Slack の通知内容を完全に制御する

Slack チャンネルのモニターアラートは、いくつかのフィールドを含んでいます。
* **メッセージ**
* モニターのトリガーとなったクエリの**スナップショット** (グラフ)
* 関連する**タグ**
* 誰が**通知**されたのか 

Slack インテグレーションタイルで、各フィールドのオン/オフを切り替えることができます。各チャンネルで、通知に含めたい各フィールドの横にあるチェックボックスを選択します。その他のチェックボックスはチェックを外したままにしてください。

{{< img src="integrations/slack/slack_notifications_config.png" alt="Slack 通知構成" style="width:80%;">}}

## 収集データ

### メトリクス

Slack インテグレーションは、メトリクスを提供しません。

### イベント

Slack インテグレーションには、イベントは含まれません。

### サービスのチェック

Slack インテグレーションには、サービスのチェック機能は含まれません。

## アクセス許可

Datadog for Slack は、以下の OAuth Scope を必要とします。詳しくは、[Slack の権限スコープに関するドキュメント][4]を参照してください。

### ボットトークンのスコープ

| スコープ                   | リクエスト理由                                                                                                 |
|--------------------------|----------------------------------------------------------------------------------------------------------------|
| `channels:join`          | Datadog の Slack インテグレーションタイルで構成された公開チャンネルに自動で参加します。                        |
| `channels:manage`        | Datadog Incident Management を使用して、インシデントを管理および修復するチャンネルを作成します。                           |
| `channels:read`          | Datadog の Slack インテグレーションタイルにチャンネル名のオートコンプリートの提案を提供します。                      |
| `chat:write`             | 承認されたチャンネルや会話で Datadog のアラートと通知を受け取ります。                               |
| `commands`               | Datadog のアクションを実行するために、/datadog コマンドとそのエイリアスである /dd を有効化します。                                |
| `groups:read`            | Datadog の Slack インテグレーションタイルの非公開チャンネルにチャンネル名のオートコンプリートの提案を提供します。 |
| `im:history`             | Datadog が Messages タブで、オンボーディングの指示などのメッセージを送信できるようにします。              |
| `im:read`                | ダイレクトメッセージから Datadog のアクションを実行するために、/datadog コマンドとエイリアスである /dd を有効化します。               |
| `im:write`               | Datadog アカウントに関連する Datadog ボットからのメッセージ、プロンプト、エラーを受信します。                    |
| `links:read`             | グラフやログサンプルなどの追加情報とともに、会話中の Datadog のリンクを展開します。                |
| `links:write`            | グラフやログサンプルなどの追加情報とともに、会話中の Datadog のリンクを展開します。                |
| `mpim:read`              | グループダイレクトメッセージから Datadog のアクションを実行するために、/datadog コマンドとエイリアスである /dd を有効化します。         |
| `reactions:write`        | インシデントタイムラインに追加されたメッセージに、ショートカットで絵文字のリアクションを追加します。                   |
| `team:read`              | Datadog の Slack インテグレーションタイルで、ワークスペースの状態を常に最新に保つことができます。                        |
| `users:read`             | タイムゾーンに合わせた応答を提供します。                                                                |
| `users:read.email`       | Datadog の Slack 以外で作成されたインシデントのメッセージングとユーザーを追加します。                                  |
| `workflow.steps:execute` | Slack Workflow Step から Datadog のダッシュボードウィジェットを使ってメッセージを自動送信します。                         |

### ユーザトークンのスコープ

| スコープ           | リクエスト理由                                                            |
|------------------|---------------------------------------------------------------------------|
| `identity.basic` | Datadog のアカウントと接続することで、Slack から Datadog のアクションを実行します。 |

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: http://slack.com/account/settings
[2]: https://api.slack.com/methods/usergroups.list
[3]: https://docs.datadoghq.com/ja/monitors/notifications/
[4]: https://api.slack.com/scopes
[5]: https://docs.datadoghq.com/ja/help/