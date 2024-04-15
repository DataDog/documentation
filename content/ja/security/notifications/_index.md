---
aliases:
- /ja/security_platform/notifications/
further_reading:
- link: /security/notifications/rules/
  tag: ドキュメント
  text: 通知ルールの設定と構成
- link: /security/notifications/variables/
  tag: ドキュメント
  text: 通知をカスタマイズするための通知変数について
- link: /security/detection_rules/
  tag: ドキュメント
  text: セキュリティ検出ルールについて

title: 通知
---

## 概要

Datadog Security で脅威が検出されると、セキュリティシグナルが生成されます。これらのシグナルが生成されたときに、通知を送信してチームに情報を提供することができます。

通知は、特定の[検出ルール](#detection-rule-notifications)と、より広範な[通知ルール](#notification-rules)に設定することができます。シグナルの重大度や脅威に関する特定のコンテキストに基づいて通知をカスタマイズする方法については、[通知変数][1]を参照してください。

## 通知チャンネル

メール、Slack、Jira、PagerDuty、または Webhook で通知を送信します。

### Email

{{% notifications-email %}}

### インテグレーション

{{% notifications-integrations %}}

## 検出ルールの通知

[新しい検出ルールを作成または変更する][2]際に、**Set rule case** と **Say what's happening** セクションを使用して、送信する通知を定義することができます。

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

通知ルールを使用すると、個々の検出ルールに通知設定を設定する必要がないように、一般的な警告の設定を行うことができます。例えば、`CRITICAL` または `HIGH` の重大度シグナルがトリガーされた場合に通知を送信するように通知ルールを設定することができます。セットアップと構成の詳細については、[通知ルール][3]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/notifications/variables/
[2]: /ja/security/detection_rules/#creating-and-managing-detection-rules
[3]: /ja/security/notifications/rules/
