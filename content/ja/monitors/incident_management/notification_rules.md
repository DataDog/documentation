---
title: 通知ルール
kind: documentation
description: インシデントの自動通知を構成
---
<div class="alert alert-warning">
この機能はオープンベータ版です。この機能へのアクセスリクエストやフィードバックは、<a href="mailto:support@datadoghq.com">support@datadoghq.com</a> までメールでお寄せください。
</div>

# 概要

通知ルールを使用すると、インシデントについて特定のステークホルダーが必ず自動的に通知されるシナリオを構成することができます。通知ルールにより、重要なステークホルダーに優先度の高いインシデントを知らせたり、新規インシデントが宣言または更新されたことを外部システムに知らせたりすることが可能になります。

## コンフィギュレーション

新しい通知ルールを構成するには

1. [インシデント設定][1]の *Notification Rules* セクションにアクセスします。
2. **New Rule** をクリックします
3. 通知の受信者を選択します。通知は、Datadog に存在するあらゆる[通知インテグレーション][2]に送信できます。
4. 通知を送信するインシデントの重大度を選択します。デフォルトでは、あらゆる重大度のインシデントが受信者に通知されるルールになっています。
5. インシデントのステータスが変わった時に受信者に再通知をするかどうかを選択します。
6. **Save** をクリックします。

**例:** SEV-1 のインシデントが宣言されたとき、およびそのインシデントが別のステータスに移行したときに役員に自動通知する通知ルールを設定します。

{{< img src="monitors/incidents/notification_rules_config.jpeg" alt="通知ルールコンフィグ"  style="width:80%;">}}

## 管理

[インシデント設定][1]の *Notification Rules* セクションで以下の操作を実行することで、通知ルールを管理できます。

- *Search* - 通知ルールのリストを受信者で絞り込みます
- *Toggle* - リストの該当するルールの列でボタンを切り替えて、個々の通知ルールを有効/無効にします
- *Copy* - 該当する通知ルールの上にカーソルを合わせ、ルールのトグルボタンの隣にある **Copy** アイコンをクリックします
- *Delete* - 該当する通知ルールの上にカーソルを合わせ、ルールのトグルボタンの隣にある **Delete** アイコンをクリックします

{{< img src="monitors/incidents/notification_rules_list.jpeg" alt="通知ルールリスト"  style="width:80%;">}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /ja/monitors/notifications/?tab=is_alert#notify-your-team