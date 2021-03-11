---
title: 通知
kind: documentation
description: モニター通知のセットアップ
aliases:
  - /ja/monitors/faq/how-do-i-add-custom-template-variables-to-my-monitor-message
  - /ja/monitors/faq/how-do-i-setup-conditional-contacts-and-messages-in-a-single-monitor
  - /ja/developers/faq/what-do-notifications-do-in-datadog
further_reading:
  - link: /monitors/monitor_types/
    tag: Documentation
    text: モニターの作成方法
  - link: /monitors/manage_monitor/
    tag: Documentation
    text: モニターの管理
  - link: /monitors/downtimes/
    tag: Documentation
    text: モニターのダウンタイムをスケジュールする
  - link: /monitors/monitor_status/
    tag: Documentation
    text: モニターステータスの参照
---
## 概要

通知は、チームに問題を知らせ、トラブルシューティングをサポートするモニターの重要なコンポーネントです。[モニターを作成する][1]場合は、**何が起こっているかを伝える**セクションと**チームに通知する**セクションを追加します。

## Say what's happening

このセクションを使用して、チームに送信する通知を設定します。

### タイトル

モニターに一意のタイトルを追加します（必須）。マルチアラートモニターの場合、トリガースコープを識別するいくつかのタグが自動的に挿入されます。また、[タグ変数](#tag-variables)を使用できます。

### メッセージ

メッセージフィールドでは、標準の[マークダウンフォーマット][2]と[変数](#variables)を使用できます。[@通知](#notification)を使用して別の連絡先に送信される通知テキストを調整するには、[条件付き変数](#conditional-variables)を使用します。

モニターメッセージの一般的な使用例は、問題を解決するための段階的な方法を含めることです。次に例を示します。

```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

### タグ

モニターにタグを追加します（オプション）。モニタータグは、メトリクスタグとは異なります。これは、モニターをグループ化して検索するために UI で使用されます。

### 再通知

モニターの再通知を有効にします（オプション）。これは、チームに対する問題が解決されていないことのリマインダーとして機能します。有効にすると、モニターが再通知するたびに送信されるエスカレーションメッセージを含めるオプションが提供されます。元の通知メッセージも含まれています。

### 優先度

モニターに関連付けられた優先度 (オプション) を追加します。値の範囲は P1 から P5 で、P1 が最高の優先度で、P5 が最低の優先度です。

## チームへの通知

電子メール、Slack、PagerDuty などを使用してチームに通知を送信するには、このセクションを使用してください。ドロップダウンボックスから、チームメンバーおよび接続済みのインテグレーションを検索できます。このセクションに `@通知` が追加されている場合、通知は自動的に[メッセージ](#message)フィールドに追加されます。

**注**: `@通知` は最後の行文字との間にスペースが必要です。次に例を示します。

```text
Disk space is low @ops-team@company.com
```

### @通知

`@通知`は以下に送信できます。

#### Email

* `@<DD_ユーザーメールアドレス>` を使用して、Datadog ユーザーにメールで通知します。**注**: 保留中の Datadog ユーザー招待に関連付けられているメールアドレスは非アクティブと見なされ、通知を受信しません。
* `@<メール>`を使用して、Datadog 以外のユーザーにメールで通知します。

#### インテグレーション

`@<インテグレーション名>-<値>` という形式を使用して、接続されたインテグレーションを通じてチームに通知します。以下は、プレフィックスのリストと例のリンクです。

| インテグレーション    | プレフィックス       | 例       |
|----------------|--------------|----------------|
| [Jira][3]      | `@jira`      | [例][4]  |
| [PagerDuty][5] | `@pagerduty` | [例][6]  |
| [Slack][7]     | `@slack`     | [例][8]  |
| [Webhooks][9]  | `@webhook`   | [例][10] |

チームへの通知に使用できる[インテグレーションのリスト][11]をご覧ください。

**注**: 括弧 (`(`, `)`) を含むハンドルはサポートされていません。括弧を含むハンドルが使用される場合、ハンドルはパースされずアラートも作成されません。

### 変更

[イベント][12]は、モニターが作成、変更、無音、または削除されるたびに作成されます。`Notify` オプションを設定して、これらのイベントをチームメンバーとチャットサービスに通知します。

### 制限の編集

変更が制限されている場合、モニターの作成者または管理者のみがモニターを変更できます。変更には、モニター定義の更新と任意の時間のミュートが含まれます。

**注**: 制限は UI と API の両方に適用されます。

## 変数

### テンプレート変数

テンプレート変数を使用して、モニター通知をカスタマイズします。組み込み変数は次のとおりです。

| 変数                      | 説明                                                                  |
|-------------------------------|------------------------------------------------------------------------------|
| `{{value}}`                   | メトリクスベースのクエリモニターのアラートに違反した値。           |
| `{{threshold}}`               | モニターのアラート条件に設定されたアラートしきい値の値。      |
| `{{warn_threshold}}`          | モニターのアラート条件に設定された警告しきい値の値。    |
| `{{ok_threshold}}`            | モニターを回復した値。                                        |
| `{{comparator}}`              | モニターのアラート条件に設定された関係値。                  |
| `{{last_triggered_at}}`       | モニターが最後にトリガーされた UTC 日時。                       |
| `{{last_triggered_at_epoch}}` | モニターが最後にトリガーされた UTC 日時（エポックミリ秒）。 |

#### 評価

数値を返すテンプレート変数は、算術演算と関数をサポートしています。これにより、数値の算術演算や値のフォーマット変更を実行できます。詳細については、[テンプレート変数の評価][13]を参照してください。

### タグ変数

タグ変数は、マルチアラートグループボックスで選択したタグに基づいて、マルチアラートモニターで使用できます。これは、`key:value` 構文に従うすべてのタグで機能します。

たとえば、モニターが各 `host` に対してアラートをトリガーする場合、タグ変数 `{{host.name}}` と `{{host.ip}}` を使用できます。タグの選択に基づいてタグ変数のリストを表示するには、**Say what's happening** セクションで **Use message template variables** をクリックします。

**注**:

* 変数の内容はデフォルトでエスケープされます。JSON やコードなどの内容がエスケープされないようにするには、たとえば `{{{event.text}}}` のように、二重中括弧の代わりに三重中括弧を使用します。
* タグ変数は、Datadog 子イベントのテキストにのみ入力されます。親イベントは、集計サマリーのみを表示します。

#### ピリオドを含むタグキー

タグのキーにピリオドが含まれている場合は、タグ変数を使用するときに、キー全体を角括弧で囲みます。
たとえば、タグが `dot.key.test:five` で、モニターが `dot.key.test` によってグループ化されている場合は、次を使用します。

```text
{{[dot.key.test].name}}
```

#### ログファセット変数

モニターがファセットによりグループ化されている場合、ログモニターはファセットを変数として使用できます。
たとえば、ログモニターが `facet` でグループ化されている場合、変数は次のようになります。

```text
{{ facet.name }}
```
**例**: `@machine_id` によってマルチアラートログモニターグループに情報を含めるには

```text
This alert was triggered on {{ @machine_id.name }}
```
ファセットにピリオドが含まれている場合、ファセットを角括弧で囲みます。例、

```text
{{ [@network.client.ip].name }}
```

#### 複合条件モニター変数

複合条件モニターは、アラートがトリガーされたときにサブモニターに関連付けられた値にアクセスできます。

たとえば、複合条件モニターにサブモニター `a` がある場合、`a` の値を次で含めることができます。

```text
{{ a.value }}
```

### 条件付き変数

条件付き変数は、`if-else` ロジックを使用して、モニターの状態とトリガーのされ方の詳細に応じて異なるメッセージを表示します。この変数は、通知メッセージの件名または本文内で使用できます。

以下の条件付き変数を使用できます。

| 条件付き変数       | テキストは次の場合に表示されます                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | モニターがアラートする                                                 |
| `{{^is_alert}}`            | モニターがアラートしない                                         |
| `{{#is_match}}`            | コンテキストが指定された部分文字列と一致する                         |
| `{{^is_match}}`            | コンテキストが指定された部分文字列と一致しない                  |
| `{{#is_exact_match}}`      | コンテキストが指定された文字列と完全に一致する                    |
| `{{^is_exact_match}}`      | コンテキストが指定された文字列と完全に一致しない             |
| `{{#is_no_data}}`          | 不足しているデータに対してモニターがトリガーされる                          |
| `{{^is_no_data}}`          | 不足しているデータに対してモニターがトリガーされない                      |
| `{{#is_warning}}`          | モニターが警告する                                                  |
| `{{^is_warning}}`          | モニターが警告しない                                          |
| `{{#is_recovery}}`         | `ALERT`、`WARNING`、または `NO DATA` からモニターが回復する         |
| `{{^is_recovery}}`         | `ALERT`、`WARNING`、または `NO DATA` からモニターが回復しない |
| `{{#is_warning_recovery}}` | モニターが `WARNING` から `OK` に回復する                        |
| `{{^is_warning_recovery}}` | モニターが `WARNING` から `OK` に回復しない                |
| `{{#is_alert_recovery}}`   | モニターが `ALERT` から `OK` に回復する                          |
| `{{^is_alert_recovery}}`   | モニターが ALERT から OK に回復しない                   |
| `{{#is_alert_to_warning}}` | モニターが `ALERT` から `WARNING` に移行する                  |
| `{{^is_alert_to_warning}}` | モニターが `ALERT` から `WARNING` に移行しない          |
| `{{#is_no_data_recovery}}` | モニターが `NO DATA` から回復する                                |
| `{{^is_no_data_recovery}}` | モニターが `NO DATA` から回復しない                        |
| `{{#is_priority 'value'}}`  | モニターの優先度は `value` です。値の範囲は `P1` から `P5` です   |

#### 例

条件付き変数には、テキストと **@通知**の間に開始と終了のペアが必要です。

{{< tabs >}}
{{% tab "is_alert" %}}

モニターがアラートしたときに通知メッセージを送信するには、次の形式を使用します。

```text
{{#is_alert}}
  <アラートメッセージテキスト> <@通知>
{{/is_alert}}
```

{{% /tab %}}
{{% tab "is_warning" %}}

モニターが警告したときに通知メッセージを送信するには、次の形式を使用します。

```text
{{#is_warning}}
  <警告メッセージテキスト> <@通知>
{{/is_warning}}
```

{{% /tab %}}
{{% tab "is_recovery" %}}

モニターが回復したときに通知メッセージを送信するには、次の形式を使用します。

```text
{{#is_recovery}}
  <回復メッセージテキスト> <@通知>
{{/is_recovery}}
```

{{% /tab %}}
{{% tab "is_match" %}}

次の形式でタグ変数内の部分文字列を検索します。

```text
{{#is_match "<タグ変数>.name" "<比較文字列>"}}
  これは、<比較文字列> が <タグ変数> に含まれている場合に表示されます。
{{/is_match}}
```

トリガーするホストにタグ `role:db_cassandra` または `role:db_postgres` がある場合に DB チームに通知する場合は、以下を使用します。

```text
{{#is_match "role.name" "db"}}
  これは、アラートをトリガーするホストのロール名に `db` が含まれている場合に表示されます。@db-team@company.com
{{/is_match}}
```

`is_match` 条件は、複数の文字列の一致にも対応しています。

```text
{{#is_match "role.name" "db" "database"}}
  アラートをトリガーしているホストのロール名に `db` または `database` が
  含まれている場合に表示されます。@db-team@company.com
{{/is_match}}
```

タグに `db` が含まれない場合に異なる通知を送信するには、以下のように条件の否認を使用します。

```text
{{^#is_match "role.name" "db"}}
  ロールタグに `db` が含まれない場合に表示されます。
  @slack-example
{{/is_match}}
```

または、最初の例にある `{{else}}` パラメータを使用します。

```text
{{#is_match "role.name" "db"}}
  アラートをトリガーしているホストのロール名に `db` が
  含まれている場合に表示されます。@db-team@company.com
{{else}}
  ロールタグに `db` が含まれない場合に表示されます。
  @slack-example
{{/is_match}}
```

**注**: `<タグ変数>` が空では**ない**かどうかを確認するには、`<比較文字列>` に空の文字列を使用します。

{{% /tab %}}
{{% tab "is_exact_match" %}}

次の形式でタグ変数内の正確な文字列を検索します。

```text
{{#is_exact_match "<タグ変数>.name" "<比較文字列>"}}
  これは、<比較文字列> が正確に <タグ変数> である場合に表示されます。
{{/is_exact_match}}
```

トリガーするホストの名前が `production` である場合に開発チームに通知するには、以下を使用します。

```text
{{#is_exact_match "host.name" "production"}}
  これは、アラートをトリガーするホストの名前が正確に production である場合に表示されます。@dev-team@company.com
{{/is_exact_match}}
```

{{% /tab %}}
{{< /tabs >}}

## テスト通知

テスト通知は、ホスト、メトリクス、異常、外れ値、予測、インテグレーション（チェックのみ）、プロセス（チェックのみ）、ネットワーク（チェックのみ）、カスタムチェック、イベント、複合条件の[モニタータイプ][1]でサポートされています。

### テストを実行する

1. モニターを定義したら、モニターページの右下にある **Test Notifications** ボタンを使用して通知をテストします。

2. テスト通知ポップアップから、テストするモニターケースを選択します。テストできるのは、アラート条件で指定されたしきい値について、モニターの構成で使用可能な状態のみです。ただし、[回復しきい値][14]は例外です。これは、モニターがアラート状態でなくなったか、警告状態がなくなったときに、Datadog が回復通知を送信するためです。

    {{< img src="monitors/notifications/test-notif-select.png" alt="このモニターの通知をテストする"  style="width:70%;" >}}

3. **Run Test** をクリックして、モニターにリストされている人とサービスに通知を送信します。

### イベント

テスト通知は、イベントストリーム内で検索できるイベントを生成します。テストを開始したユーザーをメッセージ本文で示し、通知のタイトルに `[TEST]` が付きます。

### 変数 {#variables-test-notification}

メッセージ変数には、モニター定義のスコープに基づいて、ランダムに選択されたグループが自動挿入されます。例:

```text
{{#is_alert}}
{{host.name}} <-- これが入力されます
{{/is_alert}}
```

## 高度な検索

### ダイナミックリンク

[タグ変数](#tag-variables)を使用して、チームを適切なリソースにリンクする動的 URL 構築を有効にします。たとえば、ダッシュボード、ホストマップ、モニターなどの Datadog 内のページへのリンクを提供できます。

{{< tabs >}}
{{% tab "ダッシュボード" %}}

`{{host.name}}` [タグ変数](#tag-variables)を使用して、システムダッシュボードへのリンクを提供します。

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

`{{host.name}}` [タグ変数](#tag-variables)と `<インテグレーション名>` を使用して、インテグレーションダッシュボードへのリンクを提供します。

```text
https://app.datadoghq.com/dash/integration/<インテグレーション名>?tpl_var_scope=host:{{host.name}}
```

{{% /tab %}}
{{% tab "ホストマップ" %}}

ホストマップへのリンクを提供するには、`{{service.name}}` などの[タグ変数](#tag-variables)を使用します。

```text
https://app.datadoghq.com/infrastructure/map?filter=service:{{service.name}}
```

ホストマップリンクは、追加のパラメーターを使用してカスタマイズできます。最も一般的なものは次のとおりです。

| パラメーター | 次で定義               | 決定するもの                           |
|-----------|----------------------------|--------------------------------------|
| `fillby`  | `fillby=avg:<メトリクス名>` | ホストの六角形の塗りつぶし色。 |
| `groupby` | `groupby=<タグキー>`        | ホストの六角形のグループ。        |
| `sizeby`  | `sizeby=avg:<メトリクス名>` | ホストの六角形のサイズ。       |

{{% /tab %}}
{{% tab "Monitors" %}}

`{{host.name}}` [タグ変数](#tag-variables)を使用して、特定のホストに関連するすべてのモニターへのリンクを提供します。

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

モニターリンクは、追加のパラメーターを使用してカスタマイズできます。最も一般的なものは次のとおりです。

| パラメーター | 例        | 表示するもの                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | アラート状態のモニター（追加のステータス: `WARN`、`NO DATA`、`OK`）   |
| `muted`   | `muted: true`  | ミュートされたモニター（ミュートされていないモニターには `false` を使用）                             |
| `type`    | `type:log`     | ログモニター（他の[モニタータイプ][1]を参照）                                     |

[1]: /ja/monitors/monitor_types/
{{% /tab %}}
{{< /tabs >}}

### コメント

モニター編集画面にのみ表示されるモニターメッセージにコメントを含めるには、次の構文を使用します。

```text
{{!-- これはコメントです --}}
```

### 未加工の形式

アラートメッセージで `{{ <TEXT> }}` などの二重中括弧を送信する必要がある場合は、`{{{{raw}}}}` 形式を使用します。たとえば、次のとおりです。

```text
{{{{raw}}}}
{{ <テキスト_1> }} {{ <テキスト_2> }}
{{{{/raw}}}}
```

出力:

```text
{{ <テキスト_1> }} {{ <テキスト_2> }}
```

[条件付き変数](#conditional-variables)で使用されている `^|#` ヘルパーは、`{{{{raw}}}}` 形式と共に使用できず、削除する必要があります。たとえば、`{{is_match}}` 条件付き変数を使用してテキストをそのまま出力するには、次のテンプレートを使用します。

```text
{{{{is_match "host.name" "<ホスト名>"}}}}
{{ .matched }} ホスト名
{{{{/is_match}}}}
```

`host.name` が `<HOST_NAME>` と一致する場合、テンプレートは次を出力します。

```text
{{ .matched }} ホスト名
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/monitor_types/
[2]: http://daringfireball.net/projects/markdown/syntax
[3]: /ja/integrations/jira/
[4]: /ja/integrations/jira/#use-cases
[5]: /ja/integrations/pagerduty/
[6]: /ja/integrations/pagerduty/#troubleshooting
[7]: /ja/integrations/slack/
[8]: /ja/integrations/slack/#mentions-in-slack-from-monitor-alert
[9]: /ja/integrations/webhooks/
[10]: /ja/integrations/webhooks/#usage
[11]: https://docs.datadoghq.com/ja/integrations/#cat-collaboration
[12]: /ja/events/
[13]: /ja/monitors/guide/template-variable-evaluation/
[14]: /ja/monitors/faq/what-are-recovery-thresholds/