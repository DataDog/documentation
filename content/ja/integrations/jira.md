---
categories:
  - Collaboration
  - issue tracking
ddtype: クローラー
dependencies: []
description: 'このインテグレーションは、トリガーされたアラートからチケットを作成できるようにします。 Datadog, and update existing tickets with new information as it arises. Additionally, you can see JIRA ticket creations as events within Datadog to overlay with all of your metrics.'
doc_link: 'https://docs.datadoghq.com/integrations/jira/'
git_integration_title: jira
has_logo: true
integration_title: Jira
is_public: true
kind: インテグレーション
manifest_version: '1.0'
name: jira
public_title: Datadog-Jira インテグレーション
short_description: Datadog でアラートを自動生成し、その後 JIRA チケットを更新
version: '1.0'
---
{{< img src="integrations/jira/JiraInstallation9.png" alt="Jira Events" responsive="true">}}

## 概要

JIRA は、ソフトウェアチームのための課題およびプロジェクト追跡システムです。このインテグレーションを使用すると、Datadog でトリガーされたアラートから課題を作成し、新しい情報が得られるたびに既存の課題を更新します。さらに、JIRA の課題の作成は、イベントとして Datadog に追加され、メトリクスに重ねて表示されます。

## セットアップ
### インストール

1. Jira アカウントに移動します。

2. 設定 (歯車アイコン) –> **Products** に移動します。

    {{< img src="integrations/jira/JiraInstallation2.png" alt="Jira Navigation" responsive="true" style="width:25%">}}

3. 左メニューの **INTEGRATIONS** の下にある、**Application links** を選択します。

    {{< img src="integrations/jira/JiraInstallation3.png" alt="Jira Navigation" responsive="true" style="width:25%">}}

4. URL として `https://app.datadoghq.com/` を入力し、**Create new link** をクリックします。**注**: "No response was received from the URL you entered." という警告が表示される場合があります。無視して Continue を押してください。

    {{< img src="integrations/jira/JiraInstallation4.png" alt="Configure App Links" responsive="true" style="width:75%">}}

5. **Application Name** に任意の名前を入力します (識別に使用)。

6. **Generic Application** はオンのままにしておきます。

7. **Create incoming link** をオンにします。

8. **Continue** をクリックします。

    {{< img src="integrations/jira/JiraInstallation5.png" alt="Link Applications" responsive="true" style="width:50%">}}

9. 次に表示されるボックスで、Consumer Key、Consumer Name、および Public Key を [Datadog Jira インテグレーションタイル][1]から取得します。

10. **Continue** をクリックします。

    {{< img src="integrations/jira/JiraInstallation6.png" alt="Link Applications" responsive="true" style="width:50%">}}

### コンフィグレーション

1. [Datadog Jira インテグレーションタイル][1]の手順 2 で、Jira アカウントの URL を入力します。

2. **Setup OAuth1** ボタンをクリックします。

    {{< img src="integrations/jira/JiraInstallation7.png" alt="Setup Jira Account" responsive="true" style="width:50%">}}

#### 課題の追加

JIRA インテグレーションをインストールしたら、Datadog でカスタム課題を作成します。

1. まず、**Add Issue** ボタンをクリックします。
2. 課題の Project key と Issue type を入力します。**注**: 各課題は、一意のプロジェクト ID – 課題タイプの組み合わせを持ちます。
3. オプションで、Datadog タグを `<KEY:VALUE>` 形式で追加します。
4. この課題の **Required fields** が表示されたら、これらのフィールドにすべて入力する必要があります。
6. Other fields はオプションです。
7. **Save** ボタンをクリックします。

{{< img src="integrations/jira/jira-issue.png" alt="Jira Issue" responsive="true">}}

**注**: 上のように、必須のフィールド **Severity** がある場合、使用できる値は以下に制限されます。
```
1 - Critical
2 - Major
3 - Minor
```

課題フィールドの入力には、値とアラートイベントに含まれる変数を使用できます。以下にすべての変数を示します。

| 変数          | 説明                                                                                                  |
|-------------------|--------------------------------------------------------------------------------------------------------------|
| $ID               | イベントの ID (例: 1234567)                                                                              |
| $EVENT_TITLE      | イベントのタイトル (例: \[Triggered] \[Memory Alert])                                                      |
| $EVENT_MSG        | イベントのテキスト (例: @webhook-url Sending to the webhook)                                                |
| $EVENT_TYPE       | イベントの種類 (例: metric_alert_monitor)                                                               |
| $LAST_UPDATED     | イベントが最後に更新された日付                                                                         |
| $DATE             | イベントが発生した日付 (Epoch) (例: 1406662672000)                                                  |
| $AGGREG_KEY       | 所属が同じイベントを集約するための ID (例: 9bd4ac313a4d1e8fae2482df7b77628)                            |
| $ORG_ID           | オーガニゼーションの ID (例: 11023)                                                                        |
| $ORG_NAME         | オーガニゼーションの名前 (例: Datadog)                                                                    |
| $USER             | Webhook をトリガーしたイベントをポストしたユーザー (例: rudy)                                               |
| $SNAPSHOT         | イベントにスナップショットが含まれている場合は、そのイメージの URL (例: https://url.to.snpashot.com/)                       |
| $LINK             | イベントの URL (例: https://app.datadoghq.com/event/jump_to?event_id=123456)                             |
| $PRIORITY         | イベントの優先度 (例: normal)                                                                         |
| $TAGS             | イベントタグのカンマ区切りリスト (例: monitor, name:myService, role:computing-node)                  |
| $TEXT_ONLY_MSG    | マークダウン書式設定なしのイベントのテキスト                                                                |
| $ALERT_ID         | アラートの ID (例: 1234)                                                                                     |
| $ALERT_METRIC     | メトリクスがアラートの場合は、メトリクスの名前 (例: system.load.1)                                                    |
| $ALERT_QUERY      | Webhook をトリガーしたモニターのクエリ                                                              |
| $ALERT_STATUS     | アラートステータスのサマリー (例: system.load.1 over host:my-host was >  0 at least once during the last 1m) |
| $ALERT_TRANSITION | アラート通知の種類 (例: Triggered)                                                                 |
| $HOSTNAME         | イベントに関連付けられたサーバーのホスト名 (ある場合)                                      |
| $ALERT_CYCLE_KEY  | アラートがトリガーした時点から解決するまでイベントにリンクする ID                                         |
| $LOGS_SAMPLE      | ログモニターアラートからのログサンプル                                                                         |

### ユースケース
#### Datadog アラートから自動的に課題を作成する

Datadog アラート内で自動的に JIRA の課題を作成するには、新しいモニター作成プロセスの "Say what's happening" セクションで `@jira-<PROJECT_NAME>-<ISSUE_TYPE>` コマンドを使用します。

このアラートがトリガーされると、新しい課題が作成されます。

`@jira-update` コマンドを使用して、既存の課題を更新できます。このコマンドは、`@jira-update` コマンドに続くテキストを使用して、JIRA 課題にコメントを追加します。

ヒント – `@jira` コマンドを #is_alert または #is_warning 変数内で使用すると便利です。

{{< img src="integrations/jira/JiraInstallation8.png" alt="Monitor Settings" responsive="true">}}

## 収集データ
### メトリクス

JIRA インテグレーションには、メトリクスは含まれません。

### イベント

すべての JIRA の課題の作成は、Datadog 内にイベントとして表示されます。

### サービスのチェック
JIRA インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][2]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#integrations/jira
[2]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}