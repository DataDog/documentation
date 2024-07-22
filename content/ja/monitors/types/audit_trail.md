---
aliases:
- /ja/monitors/create/types/audit_logs/
- /ja/monitors/create/types/audit_trail/
description: 指定した種類の監査証跡イベントが検出されたとき、またはしきい値を超えたときにアラートを発します。
further_reading:
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: 監査証跡について
- link: /monitors/notifications/
  tag: ドキュメント
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: ドキュメント
  text: モニターをミュートするダウンタイムのスケジュール
title: 監査証跡モニター
---

## 概要

監査証跡モニターは、指定された種類の監査イベントが、ユーザー定義のしきい値を一定時間超えた場合にアラートを生成します。

## モニターの作成

Datadog で[監査証跡モニター][1]を作成するには、メインナビゲーションで *Monitors --> New Monitor --> Audit Trail* の順に進みます。

### 検索クエリを定義する

監査イベントの検索クエリを定義します。検索クエリは、ログエクスプローラーと同じ[検索構文][2]に従います。

例えば、特定の API キーが一定数のリクエストを行った際にアラートを出したい場合、`count by` にその API キー ID である `@metadata.api_key.id` を設定します。その後、特定のユーザーID、`@usr.id` やユーザーのメールアドレス、`@usr.email` でグループ化し、どのユーザーがリクエストしているのかを指定した通知を受け取ることができます。

### アラートの条件を設定する

アラートさせたい値にアラート閾値を設定します。例えば、API リクエスト数が 15 以上になったときにアラートを出したい場合は、API リクエスト数のアラート閾値を `Alert threshold > 15` に設定します。警告閾値を 15 より前の任意の数値に設定すると、閾値に達する前に警告を受け取ることができます。

また、トリガーされた状態からイベントを解決しない、または自動的に解決することを選択することができます。`[Never]` (デフォルト) と `After 24 Hours` の間で値を設定します。

### Say what's happening

通知名を作成します。例えば、`API requests threshold met for {{[@usr.id].name}}` といった具合です。[変数][3]を使用して、タイトルにユーザー名、メールなどを自動的に入力し、どのアカウントまたはユーザーがアラートをトリガーしているかをすばやく把握することができます。

モニターメッセージを作成します。これには、インシデントが発生している場合に、チームメンバーが解決するために必要なステップを含めることができます。

そして、`[Never]` から `Every 24 Hours` までの値を選択し、モニターが解決されなかった場合に再通知することが可能です。また、タグや優先順位を設定することで、インシデント発生時のデータの関連付けをより適切に行うことができます。

### チームへの通知

通知するサービスやチームメンバーを選択します。例えば、PagerDuty でオンコールのコンプライアンスチームに警告したり、Slack やメールでチームに警告して、警告の評価を開始することができます。

また、アラートが変更されたときにサービスやチームに通知するかどうかを、`Do Not Notify` ドロップダウンオプションで選択することができます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/audit
[2]: /ja/logs/explorer/search_syntax/
[3]: /ja/monitors/notify/variables/