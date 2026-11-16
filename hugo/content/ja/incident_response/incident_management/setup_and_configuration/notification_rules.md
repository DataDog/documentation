---
aliases:
- /ja/service_management/incident_management/incident_settings/notification_rules/
- /ja/incident_response/incident_management/incident_settings/notification_rules/
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: ドキュメント
  text: メッセージテンプレートをカスタマイズ
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: ドキュメント
  text: インシデント変数リファレンス
title: 通知ルール
---
## 概要 {#overview}

自動通知ルールにより、定義した基準に基づいて、インシデントについて適切なステークホルダーに通知されるようにします。これにより、インシデント対応者の負担を軽減し、適切な関係者が迅速に関与できるようにすることで、解決プロセスを迅速化できます。たとえば、`service:web-store` および `application:purchasing` に対して SEV-1 または SEV-2 のインシデントが宣言されたときや、そのインシデントがさまざまな進行状態に移行したときに、チームのステークホルダーに自動通知する通知ルールを設定できます。

通知ルールを使用して以下を実現できます:
 - 主要なステークホルダーが高優先度インシデントを常に把握できるようにする
 - 特定のサービスまたはチームでインシデントが発生した際に、特定の対応者に通知する
 - [Webhooks][6] または [Datadog Workflows][5] を使用して自動化をトリガーする

## 通知ルールの作成 {#creating-a-notification-rule}

通知ルールを作成および変更するには、`Incident Notification Settings Write` 権限が必要です。

[Incident Settings Notification Rules][1] で通知ルールを管理できます。ここでは、ルールの検索、削除、コピー、切り替え、作成ができます。

### トリガーと条件 {#triggers-and-conditions}

**When an incident is...** で、トリガーを選択し、ルールの条件を定義します。

| 条件                              | ルールが通知を送信するタイミング                                                                                                                                                                                                                     |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Declared`                           | インシデントが宣言され、定義された条件を満たしたときに通知を送信します。条件が定義されていない場合は、すべてのインシデントの宣言時に通知を送信します。                                                                             |
| `Declared or attributes are updated` | インシデントが宣言されたとき、または条件を満たすように更新されたときに通知を送信します。また、**Renotify on updates to...** にリストされているフィールドのいずれかが変更され、インシデントがすでに条件を満たしている場合にも通知を送信します。条件は、フィールド間では `AND` で、各フィールド内では `OR` で結合されます。|




たとえば、条件 `severity:SEV-1`、`severity:SEV-2`、および `team:shopping` を持つルールを検討します。このルールは、`state` フィールドおよび `service` フィールドが変更された際にも再通知するように構成されています。このルールは、以下の場合に通知を送信します。

* `shopping` チームをインシデントの `teams` フィールドに追加する。
* インシデントの `severity` を、他の重大度から `SEV-1` または `SEV-2` に変更する。
* `state` フィールドを変更する (インシデントにすでにチーム `shopping` が割り当てられており、****かつ`SEV-1` または `SEV-2` である**場合**)。
* `service` フィールドを変更する (インシデントにすでにチーム `shopping` が割り当てられており、****かつ`SEV-1` または `SEV-2` である**場合**)。

### 通知受信者 {#notification-recipients}

通知ルールの受信者を定義する際、Datadog の[サポートされている通知インテグレーション][2]のいずれに対しても `@` ハンドルを使用できます。これにより、以下を含むさまざまな種類のターゲットに通知する通知ルールを定義できます。

| 通知タイプ      | ハンドル                         | 使用方法                                                                                                                                                                                                                                 |
|------------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **メール**             | `@<email>`                     | `@`の後に有効なメールアドレスを入力します。Datadog ユーザーのメールアドレスの場合、ルールが通知を送信すると、そのユーザーが自動的にレスポンダーとして追加されます。プライベートインシデントの場合、そのユーザーがアクセス権を取得します。                           |
| **モバイルデバイス**     | *(UI から選択)*           | **(モバイルプッシュ通知)** でユーザー名を選択します。このオプションを表示するには、ユーザーが [Datadog モバイルアプリ][3]で通知を有効にしている必要があります。                                                                                                     |
| **Slack チャンネル**     | `@slack-<channel>`<br>`@incident-slack-channel`            | `@slack-` ハンドルを使用します。インシデントの Slack チャンネルに通知するには、`@incident-slack-channel` を使用します。                                                                                                                                               |
| **On-Call Teams**      | `@oncall-<team>`               | `@oncall-` ハンドルを使用して、[Datadog On-Call team][7] を呼び出します。                                                                                                                                                                                           |
| **Microsoft Teams**    | `@teams-<channel>`             | `@teams-` ハンドルを使用して、Microsoft Teams チャンネルに通知します。Microsoft Teams には `@incident-slack-channel` に相当するものがないため、`@teams-` ハンドルでインシデントの自動作成チャンネルをターゲットにすることはできません。[Microsoft Teams 通知ターゲット][8]を参照してください。                                                                                                                                                                                |
| **Webhooks**           | `@webhook-<name>`              | `@webhook-` ハンドルを使用して [Webhook][6] をトリガーします。Webhook を **インシデント**ペイロードタイプで定義する必要があります。                                                                                                                         |
| **Workflows**          | `@workflows-<workflow_name>`   | `@workflows-` ハンドルを使用して [Datadog Workflow][5] をトリガーします。**インシデント**トリガータイプでワークフローを公開する必要があります。                                                                                                            |


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings#Rules
[2]: /ja/monitors/notifications/?tab=is_alert#configure-notifications-and-automations
[3]: /ja/mobile/
[4]: /ja/incident_response/on-call/
[5]: /ja/actions/workflows/
[6]: /ja/integrations/webhooks/
[7]: /ja/incident_response/on-call/
[8]: /ja/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#notification-targets