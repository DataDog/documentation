---
"categories":
- "collaboration"
- "issue tracking"
- "notification"
"ddtype": "crawler"
"dependencies": []
"description": "このインテグレーションを使用して、Datadog でトリガーされたアラートからチケットを作成したり、既存のチケットを新しい情報で更新したりすることができます。Additionally, you can see JIRA ticket creations as events within Datadog to overlay with all of your metrics."
"doc_link": "https://docs.datadoghq.com/integrations/jira/"
"draft": false
"git_integration_title": "jira"
"has_logo": true
"integration_id": "jira"
"integration_title": "Jira"
"is_public": true
"kind": "インテグレーション"
"manifest_version": "1.0"
"name": "jira"
"public_title": "Datadog-Jira インテグレーション"
"short_description": "Datadog でアラートを自動生成し、その後 JIRA チケットを更新。"
"version": "1.0"
---

## 概要

JIRA は、ソフトウェアチームのための課題およびプロジェクト追跡システムです。このインテグレーションを使用すると、Datadog でトリガーされたアラートから課題を作成し、新しい情報が得られるたびに既存の課題を更新します。さらに、JIRA の課題の作成は、イベントとして Datadog に追加され、メトリクスに重ねて表示されます。

## セットアップ

### インストール

1. Jira アカウントに移動します。
2. 設定の歯車アイコン（画面右上）から **Products**をクリックします。
3. 左側のメニューで、INTEGRATIONS から **Application links** を選択します。
4. URL `https://app.datadoghq.com/` を入力し、**Create new link** をクリックします。**注**: _No response was received from the URL you entered_ という警告が表示されても、無視して **Continue** をクリックしてください。
5. 下記のようにフォームに入力し、**Continue** をクリックします。

    | フィールド                 | 入力                              |
    |-----------------------|------------------------------------|
    | Application Name      | 任意の名前 (識別に使用) |
    | Application Type      | 一般的なアプリケーション                |
    | Service Provider Name | `[leave blank]`                    |
    | Consumer key          | `[leave blank]`                    |
    | Shared secret         | `[leave blank]`                    |
    | Request Token URL     | `[leave blank]`                    |
    | Access token URL      | `[leave blank]`                    |
    | Authorize URL         | `[leave blank]`                    |
    | Create incoming link  | ボックスをチェック                      |

6.  次のフォームに [Datadog Jira インテグレーションタイル][1]の情報を入力し、**Continue** をクリックします。

    | フィールド         | 入力                                       |
    |---------------|---------------------------------------------|
    | Consumer Key  | datadog                                     |
    | Consumer Name | Datadog                                     |
    | Public Key    | [Datadog Jira インテグレーションタイル][1]を参照。 |

### コンフィギュレーション

1. [Datadog Jira インテグレーションタイル][1]の手順 2 で、Jira アカウントの URL を入力します。例:
    ```text
    https://your-jira.atlassian.net
    ```
2. 次に、**Setup OAuth1** ボタンをクリックします。

#### 課題の追加

JIRA インテグレーションをインストールしたら、Datadog でカスタム課題を作成します。

1. まず、**Add Issue** ボタンをクリックします。
2. 課題の Project key と Issue type を入力します。**注**: 各課題は、一意のプロジェクト ID – 課題タイプの組み合わせを持ちます。
3. オプションで、Datadog タグを `<KEY:VALUE>` 形式で追加します。
4. この課題の **Required fields** が表示されたら、これらのフィールドにすべて入力する必要があります。
5. Other fields はオプションです。
6. **Save** ボタンをクリックします。

{{< img src="integrations/jira/jira-issue.png" alt="Jira の課題" >}}

**注**: 上のように、必須のフィールド **Severity** がある場合、使用できる値は以下に制限されます。

- 1 - クリティカル
- 2 - メジャー
- 3 - マイナー

課題フィールドの入力には、値とアラートイベントに含まれる変数を使用できます。以下にすべての変数を示します。

| 変数           | 説明                                                                                                  |
|--------------------|--------------------------------------------------------------------------------------------------------------|
| \$ID               | イベントの ID _(例: 1234567)_                                                                              |
| \$EVENT_TITLE      | イベントのタイトル _(例: \[Triggered] \[Memory Alert])_                                                      |
| \$EVENT_MSG        | イベントのテキスト _(例: @webhook-url Sending to the webhook)_                                                |
| \$EVENT_TYPE       | イベントの種類 _(例: metric_alert_monitor)_                                                               |
| \$LAST_UPDATED     | イベントが最後に更新された日付                                                                         |
| \$DATE             | イベントが発生した日付 (Epoch) _(例: 1406662672000)_                                                  |
| \$AGGREG_KEY       | 所属が同じイベントを集約するための ID _(例: 9bd4ac313a4d1e8fae2482df7b77628)_                            |
| \$ORG_ID           | オーガニゼーションの ID _(例: 11023)_                                                                        |
| \$ORG_NAME         | オーガニゼーションの名前 _(例: Datadog)_                                                                    |
| \$USER             | Webhook をトリガーしたイベントをポストしたユーザー _(例: rudy)_                                               |
| \$SNAPSHOT         | イベントにスナップショットが含まれている場合は、そのイメージの URL _(例: `https://url.to.snpashot.com/`)_                     |
| \$LINK             | イベントの URL _(例: `https://app.datadoghq.com/event/jump_to?event_id=123456`)_                           |
| \$PRIORITY         | イベントの優先度 _(例: normal)_                                                                         |
| \$TAGS             | イベントタグのカンマ区切りリスト _(例: monitor, name:myService, role:computing-node)_                  |
| \$TEXT_ONLY_MSG    | マークダウン書式設定なしのイベントのテキスト                                                                |
| \$ALERT_ID         | アラートの ID _(例: 1234)_                                                                                     |
| \$ALERT_METRIC     | メトリクスがアラートの場合は、メトリクスの名前 _(例: system.load.1)_                                                    |
| \$ALERT_QUERY      | Webhook をトリガーしたモニターのクエリ                                                              |
| \$ALERT_STATUS     | アラートステータスのサマリー _(例: system.load.1 over host:my-host was > 0 at least once during the last 1m)_ |
| \$ALERT_TRANSITION | アラート通知の種類 _(例: Triggered)_                                                                 |
| \$HOSTNAME         | イベントに関連付けられたサーバーのホスト名 (ある場合)                                      |
| \$ALERT_CYCLE_KEY  | アラートがトリガーした時点から解決するまでイベントにリンクする ID                                         |
| \$LOGS_SAMPLE      | ログモニターアラートからのログサンプル                                                                         |

### ユースケース

#### Datadog アラートから自動的に課題を作成する

Datadog アラート内で自動的に JIRA の課題を作成するには、新しいモニター作成プロセスの "Say what's happening" セクションで `@jira-<PROJECT_NAME>-<ISSUE_TYPE>` コマンドを使用します。

このアラートがトリガーされると、新しい課題が作成されます。

`@jira-update` コマンドを使用して、既存の課題を更新できます。このコマンドは、`@jira-update` コマンドに続くテキストを使用して、JIRA 課題にコメントを追加します。

ヒント – `@jira` コマンドを #is_alert または #is_warning 変数内で使用すると便利です。

{{< img src="integrations/jira/JiraInstallation8.png" alt="モニターの設定" >}}

## 収集データ

### メトリクス

JIRA インテグレーションには、メトリクスは含まれません。

### イベント

作成されたすべての JIRA の課題は、Datadog 内にイベントとして表示されます。

### サービスのチェック

JIRA インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#integrations/jira
[2]: https://docs.datadoghq.com/help/

