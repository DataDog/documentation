---
description: モニター通知をカスタマイズするには次の変数を使用します
further_reading:
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターの管理
kind: documentation
title: 変数
---

通知メッセージで変数を使用して、条件付きメッセージを表示し、[条件付き変数](#conditional-variables)を使用して通知をさまざまなチームにルーティングしたり、[属性とタグの変数](#attribute-and-tag-variables)および[テンプレート変数](#template-variables)を使用してコンテンツを充実させたりします。

## 条件付き変数

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
| `{{#is_priority 'value'}}` | モニターの優先度は `value` です。値の範囲は `P1` から `P5` です   |
| `{{#is_unknown}}`          | モニターは不明な状態です                                |
| `{{^is_unknown}}`          | モニターは不明な状態ではありません                            |
| `{{#is_renotify}}`         | モニターが再通知しています                                         |
| `{{^is_renotify}}`         | モニターは再通知していません。                                    |

### 例

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

次の形式で[タグ変数](#attribute-and-tag-variables)内の部分文字列を検索します。

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
{{^is_match "role.name" "db"}}
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

次の形式で[タグ変数](#attribute-and-tag-variables)内の正確な文字列を検索します。

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

`is_exact_match` 条件は、複数の文字列の一致にも対応しています。

```text
{{#is_exact_match "host.name" "production" "staging"}}
  これは、アラートをトリガーするホストの名前が
  正確に production または staging である場合に表示されます。
{{/is_exact_match}}
```

条件変数 `is_exact_match` は [`{{value}}` テンプレート変数](#template-variables)もサポートします。

```text
{{#is_exact_match "value" "<VALUE>"}}
  This displays if the value that breached the threshold of the monitor is exactly <VALUE>.
{{/is_exact_match}}
```

モニターのしきい値を突破した値が 5 であった場合に開発チームに通知するには、次のようにします。

```text
{{#is_exact_match "value" "5"}}
  This displays if the value that breached the threshold of the monitor is 5. @dev-team@company.com
{{/is_exact_match}}
```

{{% /tab %}}
{{% tab "is_renotify" %}}

`production` 環境専用の別の宛先にエスカレーションメッセージを送信するには、次のようにします。

```text
{{#is_renotify}}
{{#is_match "env" "production"}}
  This is an escalation message sent to @dev-team@company.com
{{/is_match}}
{{/is_renotify}}
```

元のメッセージの詳細を含まない別のエスカレーションメッセージを送信するには、`{{^is_renotify}}` ブロックと `{{#is_renotify}}` ブロックを組み合わせて使用します。

```text
{{^is_renotify}}
このモニターは警告を発し、最初のメッセージ @dev-team@company.com を送信しています

このモニターを解決するには、次の手順に従ってください。
1. そこに行く
2. これを行う
{{/is_renotify}}

この部分は一般的であり、最初のトリガーとエスカレーションメッセージの両方に送信されます。

{{#is_renotify}}
  これはエスカレーションメッセージ @dev-team@company.com です。
{{/is_renotify}}

```

モニターの再通知で、ユーザーは次のエスカレーションメッセージを受け取ります。

```
この部分は一般的であり、最初のトリガーとエスカレーションメッセージの両方に送信されます。

これはエスカレーションメッセージ @dev-team@company.com です。
```

{{% /tab %}}
{{< /tabs >}}

`alert` または `warning` の状態に遷移する条件ブロックを **@-notifications** ハンドルで構成した場合、そのハンドルに回復通知を送るために、対応する `recovery` 条件を構成することが推奨されます。

**注**: 構成された条件変数の**外側**に置かれたテキストまたは通知ハンドルは、モニターの状態遷移ごとに起動されます。構成された条件変数の**内側**に置かれたテキストまたは通知ハンドルは、モニター状態の遷移がその条件に一致する場合にのみ呼び出されます。

## 属性変数とタグ変数

属性変数とタグ変数を使用して、カスタマイズされた、有益で、特定のアラートメッセージをレンダリングして、アラートの性質をすばやく理解できるようにします。

### マルチアラート変数

マルチアラートグループボックスで選択したディメンションに基づいて、[マルチアラートモニター][1]でマルチアラート変数を構成します。通知を強化して、各アラートのディメンションごとのグループに関連付けられた値を動的に含めます。

{{< tabs >}}
{{% tab "タグでグループ化" %}}

メトリクスが `key:value` 構文に続くタグでタグ付けされており、モニタークエリがこのタグでグループ化されている場合は、変数を使用します。

```text
{{ key.name }}
```

これにより、各アラート通知の `key` に関連付けられた `value` がレンダリングされます。グループが同じ `key` に関連付けられた複数の `values` でタグ付けされている場合、アラートメッセージは、辞書式順序ですべての値のコンマ区切りの文字列をレンダリングします。

**例**: モニターが各 `env` に対してアラートをトリガーする場合、変数 `{{env.name}}` が通知メッセージで使用可能です。

{{< img src="monitors/notifications/multi_alert_variable.png" alt="マルチアラート変数の構文" style="width:90%;">}}

#### ホストごとのクエリグループ

モニターが各 `host` に対してアラートをトリガーする場合、タグ変数 `{{host.name}}` と `{{host.ip}}` 、およびこのホストで使用可能なホストタグを使用できます。タグの選択に基づいてタグ変数のリストを表示するには、**Say what's happening** セクションで **Use message template variables** をクリックします。

いくつかの特定のホストメタデータ変数が利用可能です。

- Agent Version: `{{host.metadata_agent_version}}`
- Machine: `{{host.metadata_machine}}`
- Platform: `{{host.metadata_platform}}`
- Processor: `{{host.metadata_processor}}`

#### ピリオドを含むタグキー

タグのキーにピリオドが含まれている場合は、タグ変数を使用するときに、キー全体を角括弧で囲みます。
たとえば、タグが `dot.key.test:five` で、モニターが `dot.key.test` によってグループ化されている場合は、次を使用します。

```text
{{[dot.key.test].name}}
```

イベントにタグがあり、イベントモニターを使用している場合は、以下を使用します。

```text
{{ event.tags.[dot.key.test] }}
```

{{< /tabs >}}

{{% tab "ファセットでグループ化" %}}

ログモニター、トレース分析モニター、RUM モニター、イベントモニターは、モニターがファセットごとにグループ化されている場合、ファセットを変数として使用できます。ログモニターが `@facet_key` でグループ化されている場合は、変数を使用します。

```text
{{ @facet_key.name }}
```

**例**: `@machine_id` によってマルチアラートログモニターグループにグループ固有の情報を含めるには

```text
This alert was triggered on {{ @machine_id.name }}
```

ファセットにピリオドが含まれている場合、ファセットを角括弧で囲みます。例、

```text
{{ [@network.client.ip].name }}
```

{{% /tab %}}
{{< /tabs >}}

### 一致する属性/タグ変数

_[ログモニター][2]、[トレース分析モニター][3] (APM)、[RUM モニター][4]、[CI モニター][5]で使用できます。_

モニタークエリに一致するログ、トレーススパン、RUM イベント、CI パイプラインまたは CI テストイベントから**任意の**属性またはタグを含めるには、次の変数を使用します。

| モニターの種類    | 変数構文                                  |
|-----------------|--------------------------------------------------|
| ログ             | `{{log.attributes.key}}` または `{{log.tags.key}}`   |
| トレース分析 | `{{span.attributes.key}}` または `{{span.tags.key}}` |
| エラー トラッキング  | `{{span.attributes.[error.message]}}`             |
| RUM             | `{{rum.attributes.key}}` または `{{rum.tags.key}}`   |
| CI Pipeline     | `{{cipipeline.attributes.key}}`                  |
| CI Test         | `{{citest.attributes.key}}`                      |

`key:value` ペアの場合、変数 `{{log.tags.key}}` はアラートメッセージに `value` をレンダリングします。

**例**: ログモニターが `@http.status_code` でグループ化されている場合、通知メッセージにエラーメッセージまたはインフラストラクチャータグを含めるには、次の変数を使用します。

```text
{{ log.attributes.[error.message] }}
{{ log.tags.env }}
...
```

{{< img src="monitors/notifications/tag_attribute_variables.png" alt="一致する属性変数の構文" style="width:90%;">}}

メッセージは、**属性が存在する場合**、クエリに一致する選択されたログの `error.message` 属性をレンダリングします。

<div class="alert alert-info"><strong>注</strong>: 選択したイベントに属性またはタグキーが含まれていない場合、変数は通知メッセージで空になります。通知の欠落を回避するには、<code>{{#is_match}}</code> ハンドルを使用して通知をルーティングするためにこれらの変数を使用しません。</div>

モニターがクエリで Formula & Functions を使用する場合、値は最初のクエリから抽出されるイベントで解決されます。

#### 予約済み属性

ログ、イベント管理、スパン、RUM、CI パイプライン、CI テストイベントには、次の構文の変数で使用できる一般的な予約済み属性があります。

| モニターの種類    | 変数構文   | 第 1 レベルの属性 |
|-----------------|-------------------|------------------------|
| ログ             | `{{log.key}}`     | `message`、`service`、`status`、`source`、`span_id`、`timestamp`、`trace_id`、`link` |
| トレース分析 | `{{span.key}}`    | `env`、`operation_name`、`resource_name`、`service`、`status`、`span_id`、`timestamp`、`trace_id`、`type`、`link` |
| RUM             | `{{rum.key}}`     | `service`、`status`、`timestamp`、`link` |
| イベント             | `{{event.key}}`     | `id`、`title`、`text`、`host.name`、`tags` |
| CI Pipeline             | `{{cipipeline.key}}`     | `service`、`env`、`resource_name`、`ci_level`、`trace_id`、`span_id`、`pipeline_fingerprint`、`operation_name`、`ci_partial_array`、`status`、`timestamp`、`link` |
| CI Test             | `{{citest.key}}`     | `service`、`env`、`resource_name`、`error.message`、`trace_id`、`span_id`、`operation_name`、`status`、`timestamp`、`link` |

一致するイベントの定義に属性が含まれていない場合、変数は空になります。

#### エクスプローラーリンク

`{{log.link}}`、`{{span.link}}`、`{{rum.link}}` を使用して、クエリに一致するイベントを対象としたログエクスプローラー、トレースエクスプローラー、または RUM エクスプローラーへのリンクで通知を充実させます。

### チェックモニター変数

チェックモニター変数（カスタムチェックおよびインテグレーションチェック）には、変数 `{{check_message}}` が利用可能で、カスタムチェックまたはインテグレーションチェックで指定されたメッセージをレンダリングします。

### 複合条件モニター変数

複合条件モニターは、アラートがトリガーされたときにサブモニターに関連付けられた値とステータスにアクセスできます。

たとえば、複合条件モニターにサブモニター `a` がある場合、`a` の値を次で含めることができます。

```text
{{ a.value }}
```

サブモニター `a` のステータスを取得するには、以下を使用します。

```text
{{ a.status }}
```

ステータスに指定できる値は、`OK`、`Alert`、`Warn`、および `No Data` です。

複合条件モニターは、基底のモニターと同様の方法でタグ変数もサポートします。基底のモニターが同じタグ/ファセットでグループ化されていることを条件に、複合条件モニターは他のモニターと同様の形式に従います。

### 文字エスケープ

変数の内容はデフォルトでエスケープされます。JSON やコードなどの内容がエスケープされないようにするには、たとえば `{{{event.text}}}` のように、二重中括弧の代わりに三重中括弧を使用します。

## テンプレート変数

テンプレート変数を使用して、モニター通知をカスタマイズします。組み込み変数は次のとおりです。

| 変数                       | 説明                                                                   |
|--------------------------------|-------------------------------------------------------------------------------|
| `{{value}}`                    | メトリクスベースのクエリモニターのアラートに違反した値。            |
| `{{threshold}}`                | モニターのアラート条件に設定されたアラートしきい値の値。       |
| `{{warn_threshold}}`           | モニターのアラート条件に設定された警告しきい値の値。     |
| `{{ok_threshold}}`             | サービスチェックモニターを回復した値。                            |
| `{{comparator}}`               | モニターのアラート条件に設定された関係値。                   |
| `{{first_triggered_at}}`       | モニターが最初にトリガーされた UTC 日時。                       |
| `{{first_triggered_at_epoch}}` | モニターが最初にトリガーされた UTC 日時（エポックミリ秒）。 |
| `{{last_triggered_at}}`        | モニターが最後にトリガーされた UTC 日時。                        |
| `{{last_triggered_at_epoch}}`  | モニターが最後にトリガーされた UTC 日時（エポックミリ秒）。  |
| `{{triggered_duration_sec}}`   | モニターがトリガー状態になっている秒数。              |

### 評価

数値を返すテンプレート変数は、算術演算と関数をサポートしています。これにより、数値の算術演算や値のフォーマット変更を実行できます。詳細については、[テンプレート変数の評価][6]を参照してください。

### ローカルタイム

`local_time` 関数を使用して、選択したタイムゾーンで通知に別の日付を追加します。この関数は、日付を現地時間に変換します: `{{local_time 'time_variable' 'timezone'}}`。
たとえば、通知にモニターの最終トリガー時刻を東京時間で追加するには、通知メッセージに以下を含めます。

```
{{local_time 'last_triggered_at' 'Asia/Tokyo'}}
```

結果は、ISO 8601 形式 `yyyy-MM-dd HH:mm:ss±HH:mm` で表示されます。例: `2021-05-31 23:43:27+09:00`。 
利用可能なタイムゾーンの値については、[tz データベースのタイムゾーンリスト][7]で、TZ データベース名の列をご参照ください。

## 高度な検索

### ダイナミックハンドル

[タグ変数](#attribute-and-tag-variables)を使用して、通知ハンドルを動的に構築し、モニターが検出した問題の種類に基づいて、通知を適切なチームまたはサービスにルーティングします。

**例**: モニターがメトリクスをクエリし、`service` タグでグループ化すると、失敗したサービスに応じて異なる Slack チャンネルに通知をルーティングさせることができます。

```text
@slack-{{service.name}} There is an ongoing issue with {{service.name}}.
```

`service:ad-server` グループでモニターが失敗し始めると、`#ad-server` Slack チャンネルに以下の内容で通知が送信されます。

```text
@slack-ad-server There is an ongoing issue with ad-server.
```

### ダイナミックリンク

[タグ変数](#attribute-and-tag-variables)を使用して、チームを適切なリソースにリンクする動的 URL 構築を有効にします。たとえば、ダッシュボード、ホストマップ、モニターなどの Datadog 内のページへのリンクを提供できます。

{{< tabs >}}
{{% tab "ダッシュボード" %}}

`{{host.name}}` [タグ変数](#attribute-and-tag-variables)を使用して、システムダッシュボードへのリンクを提供します。

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

`{{host.name}}` [タグ変数](#attribute-and-tag-variables)と `<インテグレーション名>` を使用して、インテグレーションダッシュボードへのリンクを提供します。

```text
https://app.datadoghq.com/dash/integration/<インテグレーション名>?tpl_var_scope=host:{{host.name}}
```

`{{last_triggered_at_epoch}}` [テンプレート変数](#template-variables)と `<DASHBOARD_ID>` と `<DASHBOARD_NAME>` を使って、警告の瞬間から相対時間範囲を持つダッシュボードにリンクします。

```text
https://app.datadoghq.com/dashboard/<DASHBOARD_ID>/<DASHBOARD_NAME>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

{{% /tab %}}
{{% tab "ホストマップ" %}}

ホストマップへのリンクを提供するには、`{{service.name}}` などの[タグ変数](#attribute-and-tag-variables)を使用します。

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

`{{host.name}}` [タグ変数](#attribute-and-tag-variables)を使用して、特定のホストに関連するすべてのモニターへのリンクを提供します。

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

モニターリンクは、追加のパラメーターを使用してカスタマイズできます。最も一般的なものは次のとおりです。

| パラメーター | 例        | 表示するもの                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | アラート状態のモニター（追加のステータス: `WARN`、`NO DATA`、`OK`）   |
| `muted`   | `muted: true`  | ミュートされたモニター（ミュートされていないモニターには `false` を使用）                             |
| `type`    | `type:log`     | ログモニター（他の[モニタータイプ][1]を参照）                                     |



[1]: /ja/monitors/types
{{% /tab %}}
{{% tab "Logs" %}}

`{{last_triggered_at_epoch}}` [テンプレート変数](#template-variables)を使って、警告の瞬間に起きている全てのログへのリンクを提供します。

```text
https://app.datadoghq.com/logs>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

ログリンクは、追加のパラメーターを使用してカスタマイズできます。最も一般的なものは次のとおりです。

| パラメーター | 次で定義               | 決定するもの                             |
|-----------|----------------------------|----------------------------------------|
| `service` | `service=<SERVICE_NAME>`   | 特定のサービスのログをフィルタリングします。  |
| `host`    | `host=<HOST_NAME>`         | 特定のホストのログをフィルタリングします      |
| `status`  | `status=<STATUS>`          | ログステータス: Error、Warn、Info など。 |


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

### URL エンコード

アラートメッセージに URL でエンコードする必要がある情報が含まれている場合 (例えば、リダイレクトの場合)、`{{ urlencode "<variable>"}}` 構文を使います。

**例**: モニターメッセージに特定のサービスにフィルタリングされた APM サービスページへの URL が含まれている場合、`service` [タグ変数](#attribute-and-tag-variables)を使い、URL に `{{ urlencode "<variable>"}}` 構文を追加します。

```
https://app.datadoghq.com/apm/services/{{urlencode "service.name"}}
```

[1]: /ja/monitors/configuration/#alert-grouping
[2]: /ja/monitors/types/log/
[3]: /ja/monitors/types/apm/?tab=analytics
[4]: /ja/monitors/types/real_user_monitoring/
[5]: /ja/monitors/types/ci/
[6]: /ja/monitors/guide/template-variable-evaluation/
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones