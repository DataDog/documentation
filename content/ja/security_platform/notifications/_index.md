---
further_reading:
- link: /security_platform/notifications/rules/
  tag: ドキュメント
  text: 通知ルールの設定と構成
- link: /security_platform/notifications/variables/
  tag: ドキュメント
  text: 通知をカスタマイズするための通知変数について
- link: /security_platform/detection_rules/
  tag: ドキュメント
  text: セキュリティ検出ルールについて
kind: documentation
title: 通知
---

## 概要

Datadog Security Platform で脅威が検出されると、セキュリティシグナルが生成されます。これらのシグナルが生成されたときに、通知を送信してチームに情報を提供することができます。

通知は、特定の[検出ルール](#detection-rules-notifications)と、より広範な[通知ルール](#notification-rules)に設定することができます。シグナルの重大度や脅威に関する特定のコンテキストに基づいて通知をカスタマイズする方法については、[通知変数][1]を参照してください。

## 通知チャンネル

メール、Slack、Jira、PagerDuty、または Webhook で通知を送信します。

### Email

* `@<DD_USER_EMAIL_ADDRESS>` を使用して、Datadog のアクティブユーザーにメールで通知します。保留中の Datadog ユーザー招待または無効化されているユーザーに関連付けられているメールアドレスは非アクティブと見なされ、通知を受信しません。
* `@<メール>`を使用して、Datadog 以外のユーザーにメールで通知します。

### インテグレーション

`@<INTEGRATION_NAME>-<VALUES>` という形式を使用して、接続されたインテグレーションを通じてチームに通知します。

この表は、プレフィックスとリンク例の一覧です。

| インテグレーション    | プレフィックス       | 例       |
|----------------|--------------|----------------|
| [Jira][2]      | `@jira`      | [例][3]  |
| [PagerDuty][4] | `@pagerduty` | [例][5]  |
| [Slack][6]     | `@slack`     | [例][7]  |
| [Webhooks][8]  | `@webhook`   | [例][9] |

括弧 (`(`, `)`) を含むハンドルはサポートされていません。括弧を含むハンドルが使用される場合、ハンドルはパースされずアラートも作成されません。

## 検出ルールの通知

[新しい検出ルールを作成または変更する][10]際に、**Set rule case** と **Say what's happening** セクションを使用して、送信する通知を定義することができます。

### ルールケースを設定する

**Set rule case** セクションでは、検出ルールがいつセキュリティシグナルをトリガーするか、シグナルの重大度を決定するためのルールケースを追加します。**Notify** ドロップダウンを使用して、そのケースから生成されたシグナル通知を[選択された受信者](#notification-channels)に送信します。

### Say what's happening

シグナルが発生したときに送信する内容は、**Say what's happening** セクションを使用して決定します。

#### ルール名

検出ルールのルール名を追加します。ルール名は、シグナルのタイトルと同様に **Detection Rules** リストビューに表示されます。

#### メッセージ

標準的な Markdown と[通知変数][1]を使用して、そのタグとイベント属性を参照することによって、シグナルに関する特定の詳細を提供します。

#### タグ

シグナルに異なるタグを付けるには、**Tag resulting signals** ドロップダウンを使用します。例えば、`attack:sql-injection-attempt` のようになります。

## 通知ルール

通知ルールを使用すると、個々の検出ルールに通知設定を設定する必要がないように、一般的な警告の設定を行うことができます。例えば、`CRITICAL` または `HIGH` の重大度シグナルがトリガーされた場合に通知を送信するように通知ルールを設定することができます。セットアップと構成の詳細については、[通知ルール][11]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security_platform/notifications/variables/
[2]: /ja/integrations/jira/
[3]: /ja/integrations/jira/#usage
[4]: /ja/integrations/pagerduty/
[5]: /ja/integrations/pagerduty/#send-a-notification-to-a-specific-pagerduty-service
[6]: /ja/integrations/slack/
[7]: /ja/integrations/slack/#mentions-in-slack-from-monitor-alert
[8]: /ja/integrations/webhooks/
[9]: /ja/integrations/webhooks/#usage
[10]: /ja/security_platform/detection_rules/#creating-and-managing-detection-rules
[11]: /ja/security_platform/notifications/rules/