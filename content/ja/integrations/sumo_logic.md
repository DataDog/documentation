---
aliases:
- /ja/integrations/sumologic/
categories:
- notifications
dependencies: []
description: Sumo Logic から Datadog にログを送信。Datadog 通知を Sumo Logic に送信。
doc_link: https://docs.datadoghq.com/integrations/sumologic/
draft: false
git_integration_title: sumo_logic
has_logo: true
integration_id: ''
integration_title: Sumo Logic
integration_version: ''
is_public: true
manifest_version: '1.0'
name: sumo_logic
public_title: Datadog-Sumo Logic インテグレーション
short_description: Sumo Logic から Datadog にログを送信。Datadog 通知を Sumo Logic に送信。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 概要

Datadog と Sumo Logic は双方向に統合されます。Sumo Logic のログデータを Datadog のイベントストリームに転送することも、Sumo Logic を Datadog アラートおよびイベントの通知チャンネルとして使用することもできます。つまり、サービス間で相互に通知を行うことができます。

## 計画と使用

### インフラストラクチャーリスト

#### Datadog から Sumo Logic への送信

1. 管理者権限を持つユーザーとして Sumo Logic にログインします。
2. メインメニューで、**Manage** -> **Collection** の順に選択します。
3. 左上の **Add Collector** リンクをクリックします。{{< img src="integrations/summologic/integrations-sumo-hostedcollector.png" alt="ホスト済コレクション" popup="true">}}
4. **Hosted Collector** を選択します。
5. 名前を入力し、説明、カテゴリ、タイムゾーンを任意に入力します。**Save** をクリックします。
6. Cloud APIs 下の **HTTP** をクリックします。コレクターに関する情報をフォームに正しく入力します。**Save** をクリックします。
7. 次のダイアログで指定された URL をコピーします。
8. Datadog で [Sumo Logic インテグレーション設定][1]画面に移動します。
9. コレクターに割り当てる名前と、前の手順でコピーした URL を入力します。
10. 次回、Datadog から Sumo Logic にメッセージを送信する際は、**@sumologic-{YOUR COLLECTOR NAME}** を使用します。

#### Sumo Logic から Datadog への送信

1. 管理者権限を持つユーザーとして Sumo Logic にログインします。
2. メインメニューで、**Manage** -> **Connections** の順に選択します。
3. **Add** ボタンをクリックします。
4. **Datadog** ボタンをクリックします。{{< img src="integrations/summologic/integrations-sumo-connectiontype.png" alt="Datadog ボタンをクリック" popup="true">}}
5. 接続に名前を付け、説明を任意に入力します。URL には以下を入力します。

    ```text
    https://app.datadoghq.com/api/v1/events?api_key=<DATADOG_API_KEY>
    ```

6. 必要に応じて、ペイロードをカスタマイズします。使用可能な変数については、**Help** リンクをクリックしてください。
7. **Test Connection** をクリックします。イベントストリームに以下のような新しい項目が表示されます。{{< img src="integrations/summologic/integrations-sumo-event.png" alt="テストイベント" popup="true">}}
8. 正しい情報が表示されている場合は、**Save** をクリックします。
9. Sumo Logic で、検索を保存し、その検索のスケジュールを選択します。
10. **Alert Type** には Webhook を選択します。Webhook のリストから新しい Datadog 接続を選択します。ペイロードを任意にカスタマイズし、結果の数が 1 以上である場合にのみ通知が送信されるように、**Alert Condition** を変更します。 {{< img src="integrations/summologic/integrations-sumo-savesearch.png" alt="ホスト済コレクション" popup="true">}}

[1]: https://app.datadoghq.com/integrations/sumo_logic