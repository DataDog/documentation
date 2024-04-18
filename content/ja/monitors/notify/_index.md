---
aliases:
- /ja/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
- /ja/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
- /ja/developers/faq/what-do-notifications-do-in-datadog
- /ja/monitors/notifications/
description: モニターがアラートをトリガーしたときにチームに通知を送信する
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターの管理
kind: documentation
title: 通知
---

## 概要

通知は、チームに問題を知らせ、トラブルシューティングをサポートするモニターの重要なコンポーネントです。[モニターを作成する][1]場合は、**何が起こっているかを伝える**セクションと**チームに通知する**セクションを追加します。

## Say what's happening

このセクションを使用して、チームに送信する通知を設定します。

### タイトル

モニターに一意のタイトルを追加します（必須）。マルチアラートモニターの場合、トリガースコープを識別するいくつかのタグが自動的に挿入されます。また、[タグ変数][2]を使用できます。

### メッセージ

メッセージフィールドでは、標準の[マークダウンフォーマット][3]と[変数][4]を使用できます。[@通知](#notifications)を使用して別の連絡先に送信される通知テキストを調整するには、[条件付き変数][5]を使用します。

モニターメッセージの一般的な使用例は、問題を解決するための段階的な方法を含めることです。次に例を示します。

```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

### タグ

モニターにタグを追加します。モニタータグは、メトリクスタグとは異なります。UI でモニターのグループ化と検索に使用されます。タグポリシーが構成されている場合、必要なタグとタグ値を追加する必要があります。詳しくは、[タグポリシー][6]を参照してください。

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="ポリシータグ構成の表示。'Policy tags' の下には、'Select value' のドロップダウンの横に、cost_center、product_id、env の 3 つのタグの例が示されています。" style="width:100%;" >}}

### 再通知

モニターの再通知（オプション）を有効にすると、問題の未解決をチームに知らせることができます。

  {{< img src="monitors/notifications/renotify_options.png" alt="再通知の有効化" style="width:90%;" >}}

再通知の間隔、再通知の対象となるモニターの状態 (`alert`、`no data`、`warn`) を構成し、オプションで再通知メッセージの送信数の制限を設定します。

例えば、`stop renotifying after 1 occurrence` (1 回発生したら再通知を停止する) ようにモニターを設定すると、メインの警告の後に 1 回のエスカレーションメッセージを受信することができます。
**注:** 再通知の[属性とタグの変数][7]には、再通知の期間中にモニターが利用できるデータが入力されます。

再通知が有効になっている場合、モニターが指定した時間、選択した状態のいずれかに留まっている場合に送信されるエスカレーションメッセージを含めるオプションが提供されます。


エスカレーションメッセージは次の方法で追加できます。

* 元の通知メッセージの `{{#is_renotify}}` ブロック (推奨)。
* `Say what's happening` セクションの *Renotification message* フィールド。
* API の `escalation_message` 属性。

`{{#is_renotify}}` ブロックを使用する場合、元の通知メッセージも再通知に含まれます。

1. `{{#is_renotify}}` ブロックには余分な詳細のみを含め、元のメッセージの詳細は繰り返さないでください。
2. グループのサブセットにエスカレーションメッセージを送信します。

[サンプルセクション][8]で、これらのユースケースに合わせてモニターを構成する方法を学びましょう。

### 優先度

モニターに関連付けられた優先度 (オプション) を追加します。値の範囲は P1 から P5 で、P1 が最高の優先度、P5 が最低の優先度です。通知メッセージでモニターの優先度を上書きするには、`{{override_priority 'Pi'}}` を使用し、`Pi` を P1 から P5 の間で設定します。

たとえば、`alert` および `warning` 通知を異なる優先度で設定できます。

```
{{#is_alert}}
{{override_priority 'P1'}}
 ...
{{/is_alert}}

{{#is_warning}}
{{override_priority 'P4'}}
...
{{/is_warning}}
```

## チームへの通知

電子メール、Slack、PagerDuty などを使用してチームに通知を送信するには、このセクションを使用してください。ドロップダウンボックスから、チームメンバーおよび接続済みのインテグレーションを検索できます。このセクションに `@notification` が追加されている場合、通知は自動的に[メッセージ](#message)フィールドに追加されます。

**注**: `@通知` は最後の行文字との間にスペースが必要です。次に例を示します。

```text
Disk space is low @ops-team@company.com
```

### 通知

`@通知`は以下に送信できます。

#### Email

{{% notifications-email %}}

#### インテグレーション

{{% notifications-integrations %}}

### 追加コンテンツのトグル

モニター通知には、モニターのクエリ、使用された @メンション、メトリクススナップショット (メトリクスモニターの場合)、Datadog の関連ページへのリンクなどのコンテンツが含まれます。個々のモニターの通知に含める、または除外するコンテンツを選択するオプションがあります。

<div class="alert alert-warning">パーセンタイルアグリゲーターを持つディストリビューションメトリクス (`p50`、`p75`、`p95`、`p99` など) は、通知でスナップショットグラフを生成しません。 </div>

{{< img src="monitors/notifications/monitor_notification_presets.png" alt="モニタープリセットを設定する" style="width:70%;" >}}

オプションは、以下の通りです。

- **Default**: コンテンツが隠れることはありません。
- **Hide Query**: 通知メッセージからモニターのクエリを削除します。
- **Hide Handles**: 通知メッセージで使用されている @メンションを削除します。
- **Hide All**: 通知メッセージには、クエリ、ハンドル、スナップショット (メトリクスモニター用)、フッターの追加リンクは含まれません。

**注**: インテグレーションによっては、デフォルトで表示されないコンテンツがあります。

### 変更

[イベント][9]は、モニターが作成、変更、無音、または削除されるたびに作成されます。`Notify` オプションを設定して、これらのイベントをチームメンバー、チャットサービス、モニター作成者に通知します。

### ヘルプ

すべてのユーザーは、関連するロールに関係なく、すべてのモニターを読むことができます。

デフォルトでは、[モニターの書き込み権限][10]を持つユーザーのみがモニターを編集できます。[Datadog Admin ロールおよび Datadog Standard ロール][11]には、デフォルトでモニターの書き込み権限があります。オーガニゼーションで[カスタムロール][12]を使用している場合、他のカスタムロールにモニターの書き込み権限が付与されていることがあります。

モニターの編集が許可される[ロール][13]のリストを指定することで、さらにモニターに制限を設定できます。モニターの作成者は、常にモニターを編集することが可能です。

  {{< img src="monitors/notifications/monitor_rbac_restricted.jpg" alt="RBAC 制限付きモニター" style="width:90%;" >}}

編集には、モニターのコンフィギュレーションの更新、モニターの削除、モニターのミュート（時間の長短を問わず）などが含まれます。

**注**: 制限は UI と API の両方に適用されます。

モニターの RBAC 設定や、モニターを固定設定からロール制限の使用へ移行する方法について、詳しくは[モニターに RBAC を設定する方法][14]をご参照ください。

## テスト通知

テスト通知は、ホスト、メトリクス、異常、外れ値、予測値、ログ、RUM、APM、インテグレーション（チェックのみ）、プロセス（チェックのみ）、ネットワーク（チェックのみ）、カスタムチェック、イベント、複合条件の[モニターの種類][15]でサポートされています。

### テストを実行する

1. モニターを定義したら、モニターページの右下にある **Test Notifications** ボタンを使用して通知をテストします。

2. テスト通知ポップアップから、テストするモニターケースを選択します。テストできるのは、アラート条件で指定されたしきい値について、モニターのコンフィギュレーションで使用可能な状態のみです。ただし、[回復しきい値][16]は例外です。これは、モニターがアラート状態でなくなったか、警告状態がなくなったときに、Datadog が回復通知を送信するためです。

    {{< img src="monitors/notifications/test-notif-select.png" alt="このモニターの通知をテストする" style="width:70%;" >}}

3. **Run Test** をクリックして、モニターにリストされている人とサービスに通知を送信します。

### ヘルプ

テスト通知は、イベントエクスプローラー内で検索できるイベントを生成します。テストを開始したユーザーをメッセージ本文で示し、通知のタイトルに `[TEST]` が付きます。

タグ変数は、Datadog 子イベントのテキストにのみ入力されます。親イベントは、集計サマリーのみを表示します。

### 変数 {#variables-test-notification}

メッセージ変数には、モニター定義のスコープに基づいて、ランダムに選択されたグループが自動挿入されます。例:

```text
{{#is_alert}}
{{host.name}} <-- これが入力されます
{{/is_alert}}
```
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/configuration
[2]: /ja/monitors/notify/variables/#tag-variables
[3]: http://daringfireball.net/projects/markdown/syntax
[4]: /ja/monitors/notify/variables/
[5]: /ja/monitors/notify/variables/#conditional-variables
[6]: /ja/monitors/settings/
[7]: /ja/monitors/notify/variables/?tabs=is_alert#attribute-and-tag-variables
[8]: /ja/monitors/notify/variables/?tab=is_renotify#examples
[9]: /ja/events/
[10]: /ja/account_management/rbac/permissions/#monitors
[11]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[12]: /ja/account_management/rbac/?tab=datadogapplication#custom-roles
[13]: /ja/account_management/rbac/?tab=datadogapplication
[14]: /ja/monitors/guide/how-to-set-up-rbac-for-monitors/
[15]: /ja/monitors/types
[16]: /ja/monitors/guide/recovery-thresholds/