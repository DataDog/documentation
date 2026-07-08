---
description: モニター通知をカスタマイズするには次の変数を使用します
further_reading:
- link: /monitors/guide/template-variable-evaluation/
  tag: ガイド
  text: テンプレート変数の評価による算術演算と関数の実行
- link: /monitors/
  tag: ドキュメント
  text: モニターの作成
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知
- link: /monitors/manage/
  tag: ドキュメント
  text: モニターの管理
- link: https://learn.datadoghq.com/courses/alert-monitor-notifications
  tag: ラーニングセンター
  text: アラートモニター通知をカスタマイズするコースを受講する
- link: https://www.datadoghq.com/blog/monitor-notification-rules/
  tag: ブログ
  text: Datadog モニター通知ルールでモニター アラートをルーティングする
title: 変数
---
通知メッセージ内で変数を使用すれば、[条件付き変数](#conditional-variables)を使用して条件付きメッセージを表示したり、通知をさまざまなチームにルーティングしたり、[属性とタグ変数](#attribute-and-tag-variables)および[テンプレート変数](#template-variables)を使用してそのコンテンツをリッチ化したりできます。

## 条件付き変数 {#conditional-variables}

条件付き変数は、`if-else` ロジックを使用して、モニターの状態やトリガーされた詳細に応じて異なるメッセージを表示します。これらの変数は、通知メッセージの件名や本文の中で使用できます。

以下の条件付き変数を使用できます。

| 条件付き変数       | テキストが表示される場合                                           |
|----------------------------|--------------------------------------------------------------------|
| `{{#is_alert}}`            | The monitor alerts                                                 |
| `{{^is_alert}}`            | The monitor does not alert                                         |
| `{{#is_match}}`            | The context matches the provided substring. If a numeric value is used, it is converted to a string.|
| `{{^is_match}}`            | The context does not match the provided substring                  |
| `{{#is_exact_match}}`      | The context exactly matches the provided string.<br> If a number is used, the numeric value is considered, regardless of its type. This means that as long as two numbers have the same value, they are considered equal by the function. |
| `{{^is_exact_match}}`      | The context does not exactly match the provided string             |
| `{{#is_no_data}}`          | The monitor is triggered for missing data                          |
| `{{^is_no_data}}`          | The monitor is not triggered for missing data                      |
| `{{#is_warning}}`          | The monitor warns                                                  |
| `{{^is_warning}}`          | The monitor does not warn                                          |
| `{{#is_recovery}}`         | The monitor recovers from `ALERT`, `WARNING`, `UNKNOWN`, or `NO DATA`         |
| `{{^is_recovery}}`         | The monitor does not recover from `ALERT`, `WARNING`, `UNKNOWN`, or `NO DATA` |
| `{{#is_warning_recovery}}` | The monitor recovers from `WARNING` to `OK`                        |
| `{{^is_warning_recovery}}` | The monitor does not recover from `WARNING` to `OK`                |
| `{{#is_alert_recovery}}`   | The monitor recovers from `ALERT` to `OK`                          |
| `{{^is_alert_recovery}}`   | The monitor does not recover from an ALERT to OK                   |
| `{{#is_alert_to_warning}}` | The monitor transitions from `ALERT` to `WARNING`                  |
| `{{^is_alert_to_warning}}` | The monitor does not transition from `ALERT` to `WARNING`          |
| `{{#is_no_data_recovery}}` | The monitor recovers from `NO DATA`                                |
| `{{^is_no_data_recovery}}` | The monitor does not recover from `NO DATA`                        |
| `{{#is_priority 'value'}}` | The monitor has priority `値`. Value ranges from `P1` to `P5`   |
| `{{#is_unknown}}`          | The monitor is in the unknown state                                |
| `{{^is_unknown}}`          | The monitor is not in the unknown state                            |
| `{{#is_renotify}}`         | The monitor is renotifying                                         |
| `{{^is_renotify}}`         | モニターは再通知していません。                                   |

### 例 {#examples}

条件付き変数には、テキストと **@-notifications** の間に開始と終了のペアが必要です。モニターの状態に基づく変数 (`is_alert`や`is_warning`など) には、それぞれ独自のメッセージブロックがなければなりません。モニターは同時に 1 つの状態にしか存在できないため、それらを組み合わせることはできません。ただし、属性に基づいて一致する条件をネストすることは可能です。`is_renotify` の例を参照してください。

{{< tabs >}}
{{% tab "is_alert" %}}

モニターがアラートしたときに通知メッセージを送信するには、次の形式を使用します。

```text
{{#is_alert}}
  <ALERT_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_alert}}
```

{{% /tab %}}
{{% tab "is_warning" %}}

モニターが警告したときに通知メッセージを送信するには、次の形式を使用します。

```text
{{#is_warning}}
  <WARNING_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_warning}}
```

{{% /tab %}}
{{% tab "is_recovery" %}}

モニターが回復したときに通知メッセージを送信するには、次の形式を使用します。

```text
{{#is_recovery}}
  <RECOVERY_MESSAGE_TEXT> <@-NOTIFICATION>
{{/is_recovery}}
```

{{% /tab %}}
{{% tab "is_match" %}}

次の形式で[タグ変数](#attribute-and-tag-variables)内の部分文字列を検索します。

```text
{{#is_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is included in <TAG_VARIABLE>.
{{/is_match}}
```

トリガーするホストのタグが `role:db_cassandra` または `role:db_postgres` である場合に DB チームに通知するには、以下を使用します。

```text
{{#is_match "host.role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{/is_match}}
```

`is_match` 条件は、複数の文字列の一致にも対応しています。

```text
{{#is_match "host.role.name" "db" "database"}}
  This displays if the host triggering the alert contains `db` or `database`
  in the role name. @db-team@company.com
{{/is_match}}
```

タグに `db` がない場合に異なる通知を送るには、条件の否認を以下の要領で用います。

```text
{{^is_match "host.role.name" "db"}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```

または、最初の例にある `{{else}}` パラメータを使用します。

```text
{{#is_match "host.role.name" "db"}}
  This displays if the host triggering the alert contains `db`
  in the role name. @db-team@company.com
{{else}}
  This displays if the role tag doesn't contain `db`.
  @slack-example
{{/is_match}}
```
**注**: `<TAG_VARIABLE>` が存在しないのか、あるいは空であるのかを確認するには、`is_exact_match` を使用します。詳細については、`is_exact_match` のタブを参照してください。

{{% /tab %}}
{{% tab "is_exact_match" %}}

次の形式で[タグ変数](#attribute-and-tag-variables)内の正確な文字列を検索します。

```text
{{#is_exact_match "<TAG_VARIABLE>.name" "<COMPARISON_STRING>"}}
  This displays if <COMPARISON_STRING> is exactly <TAG_VARIABLE>.
{{/is_exact_match}}
```

トリガーするホストの名前が `production` である場合に開発チームに通知するには、以下を使用します。

```text
{{#is_exact_match "host.name" "production"}}
  This displays if the host that triggered the alert is exactly
  named production. @dev-team@company.com
{{/is_exact_match}}
```

`is_exact_match` 条件は、複数の文字列の一致にも対応しています。

```text
{{#is_exact_match "host.name" "production" "staging"}}
  This displays if the host that triggered the alert is exactly
  named production or staging. @dev-team@company.com
{{/is_exact_match}}
```

`is_exact_match`条件付き変数は、[`{{value}}` テンプレート変数](#template-variables)もサポートします。

```text
{{#is_exact_match "value" "<VALUE>"}}
  This displays if the value that breached the threshold of the monitor is exactly <VALUE>.
{{/is_exact_match}}
```

モニターで設定したしきい値を超過した値が 5 (または 5.0 ) の場合に、開発チームへ通知するには、以下を使用してください。

```text
{{#is_exact_match "value" "5"}}
  This displays if the value that breached the threshold of the monitor is 5. @dev-team@company.com
{{/is_exact_match}}
```

`is_exact_match`条件付き変数は、属性またはタグが空であるか、存在しないかを確認するために、`<COMPARISON_STRING>` に空文字列もサポートしています。

```text
{{#is_exact_match "host.datacenter" ""}}
  This displays if the attribute or tag does not exist or if it's empty
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

元のメッセージの詳細を含まない別のエスカレーションメッセージを送信するには、`{{^is_renotify}}` and `{{#is_renotify}}` のブロックを組み合わせて使用します。

```text
{{^is_renotify}}
This monitor is alerting and sending a first message @dev-team@company.com

To solve this monitor follow the steps:
1. Go there
2. Do this
{{/is_renotify}}

This part is generic and sent both for the first trigger and the escalation message.

{{#is_renotify}}
  This is the escalation message @dev-team@company.com
{{/is_renotify}}

```

モニターの再通知で、ユーザーは次のエスカレーションメッセージを受け取ります。

```
This part is generic and sent both for the first trigger and the escalation message.

This is the escalation message @dev-team@company.com
```

{{% /tab %}}

{{< /tabs >}}

`alert` または `warning` の状態に遷移する条件ブロックを **@-notifications** ハンドルで構成した場合、Datadog では、そのハンドルに回復通知を送るために、対応する `recovery` 条件を構成することが推奨されます。

**注**: 構成されている条件付き変数の**外側**にあるテキストまたは通知ハンドルは、あらゆるモニター状態遷移で呼び出されます。構成されている条件付き変数の**内側**にあるテキストまたは通知ハンドルは、モニター状態遷移がその条件に一致する場合にのみ呼び出されます。

## 属性変数とタグ変数 {#attribute-and-tag-variables}

属性変数とタグ変数を使用して、カスタマイズされた、有益で、特定のアラートメッセージを表示して、アラートの性質を理解できるようにします。以下のセクションにある例と使用例を参照してください。
- [マルチアラート変数 ](#multi-alert-variables)
- [一致する属性/タグ変数 ](#matching-attributetag-variables)

タグ
: 自動的に添付される (ホスト名、コンテナ名、ログファイル名、サーバーレス関数名など) か、カスタムタグを通じて追加される (担当チーム、環境、アプリケーション、バージョンなど)。

属性
: ログの内容に基づいており、リファレンステーブルから解析または追加されたもの (geoip など)。

**注**: データがない状態 (例えば、クエリに一致するイベントがない状態) でモニターが回復するように構成されている場合、回復メッセージにはデータは含まれません。回復メッセージの情報を保持するには、{{tag.name}}` でアクセスできる追加のタグでグループ化します。

### マルチアラート変数 {#multi-alert-variables}

マルチアラートグループボックスで選択した次元に基づいて、[マルチアラートモニター][1]でマルチアラート変数を設定します。各アラートにおいて、グループの基準となる次元に関連付けられた値を動的に含めることにより、通知を充実させます。

**注**: 集約で `group_by` フィールドを使用する場合、モニターからの追加のタグやアラートが自動的に継承されることがあります。これは、監視対象のエンドポイントに設定されたアラートや構成が、集約結果の各グループに適用される可能性があることを意味します。

{{< tabs >}}
{{% tab "タグでグループ化" %}}

メトリクスが `key:value` の形式でタグ付けされており、モニタークエリがこのタグでグループ化されている場合は、変数を使用します。

```
{{ key.name }}
```

この変数は、`key` に関連付けられた `value` を各アラート通知に挿入します。たとえば、モニターが各 `env` に対してアラートをトリガーする場合、変数 `{{env.name}}` が通知メッセージで使用可能です。

グループが同じ `key` に関連付けられた複数の `values` でタグ付けされている場合、アラートメッセージは、辞書式順序ですべての値のコンマ区切りの文字列をレンダリングします。

#### ピリオドを含むタグキー {#tag-key-with-period}

タグのキーにピリオドが含まれている場合は、タグ変数を使用するときに、キー全体を角括弧で囲みます。たとえば、タグが `dot.key.test:five` で、モニターが `dot.key.test` によってグループ化されている場合は、次を使用します。

```text
{{[dot.key.test].name}}
```

{{% /tab %}}

{{% tab "ファセットでグループ化" %}}

ログモニター、トレース分析モニター、RUM モニター、イベントモニターは、モニターがファセットごとにグループ化されている場合、ファセットを変数として使用できます。ログモニターが `@facet_key` でグループ化されている場合は、変数を使用します。

```text
{{ @facet_key.name }}
```

**例**: `@machine_id` によってマルチアラートログモニターグループにグループ固有の情報を含めるには、次のようにします。

```text
This alert was triggered on {{ @machine_id.name }}
```

ファセットにピリオドが含まれている場合、ファセットを角括弧で囲みます。例、

```text
{{ [@network.client.ip].name }}
```

{{% /tab %}}
{{< /tabs >}}

#### 通知をグループごとにカスタマイズする {#customize-the-notification-based-on-the-group}

クエリが特定のディメンションでグループ化されている場合、そのグループに関連する動的メタデータを活用して通知を拡充できます。タグの選択に基づいてタグ変数のリストを表示するには、**通知と自動化の構成**セクションで **メッセージテンプレート変数を使用する**をクリックします。次の例をご覧ください。

{{% collapse-content title="ホストごとのクエリグループ" level="h5" %}}

モニターが各 `host` に対してアラートをトリガーする場合、タグ変数 `{{host.name}}` and `{{host.ip}}`、およびこのホストで利用可能なホストタグを使用できます。

特定のホストのメタデータ変数:

- Agent のバージョン: `{{host.metadata_agent_version}}`
- マシン: `{{host.metadata_machine}}`
- プラットフォーム: `{{host.metadata_platform}}`
- プロセッサー: `{{host.metadata_processor}}`
{{% /collapse-content %}}

{{% collapse-content title="クエリを kube_namespace および kube_cluster_name でグループ化する" level="h5" %}}
モニターが `kube_namespace` と `kube_cluster_name` ごとにアラートをトリガーする場合、ネームスペースの任意の属性にアクセスできます。

ネームスペースのメタデータ変数:

- クラスター名: `{{kube_namespace.cluster_name}}`
- ネームスペースの名前: `{{kube_namespace.display_name}}`
- ネームスペースの状態: `{{kube_namespace.status}}`
- ネームスペースのラベル: `{{kube_namespace.labels}}`

以下の表には、利用可能なすべての属性が含まれています。

| 変数構文   | 第一レベル属性 |
|-------------------|------------------------|
| `{{kube_namespace.key}}`     | `k8s_namespace_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `group_size`, `labels`, `name`, `namespace`, `status`, `uid`|
{{% /collapse-content %}}

{{% collapse-content title="クエリを pod_name、kube_namespace、kube_cluster_name でグループ化する" level="h5" %}}
モニターが `pod_name` および `kube_namespace` および `kube_cluster_name` ごとにアラートをトリガーする場合、Pod の任意の属性にアクセスできます。

Pod のメタデータ変数:
- クラスター名: `{{pod_name.cluster_name}}`
- Pod 名: `{{pod_name.name}}`
- Pod フェーズ: `{{pod_name.phase}}`

以下の表には、利用可能なすべての属性が含まれています。

| 変数構文   | 第一レベル属性 |
|-------------------|------------------------|
| `{{pod_name.key}}`     | `k8s_pod_key`, `tags`, `annotations`, `cluster_id`, `cluster_name`, `conditions`, `container_statuses`, `creation_timestamp`, `deletion_timestamp`, `display_name`, `external_id`, `finalizers`, `first_seen_at`, `host_id`, `host_key`, `hostname`, `init_container_statuses`, `ip`, `labels`, `name`, `namespace`, `node_name`, `nominated_node_name`, `phase`, `pod_scheduled_timestamp`, `priority_class_name`, `qosclass`, `resource_requirements`, `uid`|
{{% /collapse-content %}}


{{% collapse-content title="サービスでグループ化してクエリする" level="h5" %}}

モニターが各 `service` に対してアラートをトリガーする場合、[Software Catalog][10] で定義されているサービスのいくつかの属性にアクセスできます。

サービスのメタデータ変数:

- サービス名: `{{service.name}}`
- チーム名: `{{service.team}}`
- ドキュメント: `{{service.docs}}`
- リンク: `{{service.links}}`

ドキュメントとリンクについては、次の構文を使用して特定のアイテムにもアクセスできます `[<name>]`。たとえば、定義スキーマがこの[例][11]で定義されているサービスの場合、次の構文を使用して「Runbook」リンクにアクセスできます。

```text
{{service.links[Runbook]}}
```
{{% /collapse-content %}}

### 一致する属性/タグ変数 {#matching-attributetag-variables}

モニタークエリに一致するログ、トレーススパン、RUM イベント、CI パイプラインまたは CI テストイベントから任意の属性またはタグを含めることができます。次の表は、さまざまなモニタータイプから追加できる属性と変数の例を示しています。

<div class="alert alert-info">モニターで利用できる変数の完全なリストを表示するには、通知構成の下部で<strong>{{&nbsp;変数を追加</strong>をクリックし、拡張メニューオプションから選択してください。</div>

| モニタータイプ             | 変数構文                                         |
|--------------------------|--------------------------------------------------------|
| [監査証跡][16]        | `{{audit.attributes.key}}` or `{{audit.message}}`      |
| [CI Pipeline][17]        | `{{cipipeline.attributes.key}}`                        |
| [CI Test][18]            | `{{citest.attributes.key}}`                            |
| [Database Monitoring][19]| `{{databasemonitoring.attributes.key}}`                |
| [Error Tracking][14]     | `{{issue.attributes.key}}`                             |
| [Log][12]                | `{{log.attributes.key}}` or `{{log.tags.key}}`         |
| [RUM][15]                | `{{rum.attributes.key}}` or `{{rum.tags.key}}`         |
| [Synthetic Monitoring][20]| `{{synthetics.attributes.key}}`                       |
| [Trace Analytics][13]    | `{{span.attributes.key}}` or `{{span.tags.key}}`       |

{{% collapse-content title="構文の使用例" level="h4" %}}
- `key:value` ペアの場合、変数 `{{log.tags.key}}` renders `value` はアラートメッセージに value を表示します。
- すべての属性の前に付く `@` は含まれていません。たとえば、ログモニターが `@http.status_code` でグループ化されている場合、通知メッセージにエラーメッセージまたはインフラストラクチャータグを含めるには、次の変数を使用します。

  ```text
  {{ log.attributes.[error.message] }}
  {{ log.tags.env }}
  ...
  ```

  {{< img src="monitors/notifications/tag_attribute_variables.png" alt="一致する属性/タグ変数構文" style="width:90%;">}}
- メッセージは、**属性が存在する場合**、クエリに一致する選択されたログの `error.message` 属性を表示します。
- タグがイベントにある場合、次の構文を使用します。

  ```text
  {{ event.tags.[dot.key.test] }}
  ```

{{% /collapse-content %}}

#### 重要な注意事項 {#important-notes}

- 選択されたイベントに属性もタグキーも含まれていない場合、通知メッセージの中でその変数は空になります。通知が欠落しないようにするには、{{#is_match}}` のハンドルで通知をルーティングする目的でこれらの変数を使用しないようにしてください。
- クエリで数式と関数を使用するモニターの場合、値は最初のクエリから抽出されるイベントに基づいて解決されます。


#### 予約済み属性 {#reserved-attributes}

ログ、イベント管理、スパン、RUM、CI パイプライン、CI テストイベントには、次の構文の変数で使用できる一般的な予約済み属性があります。

| モニタータイプ    | 変数構文   | 第一レベル属性 |
|-----------------|-------------------|------------------------|
| ログ             | `{{log.key}}`     | `message`, `service`, `status`, `source`, `span_id`, `timestamp`, `trace_id`, `link`, `host` |
| Trace Analytics | `{{span.key}}`    | `env`, `operation_name`, `resource_name`, `service`, `status`, `span_id`, `timestamp`, `trace_id`, `type`, `link` |
| RUM             | `{{rum.key}}`     | `service`, `status`, `timestamp`, `link` |
| Event             | `{{event.key}}`     | `attributes`, `host.name`, `id`, `link`, `title`, `text`, `tags` |
| CI Pipeline             | `{{cipipeline.key}}`     | `service`, `env`, `resource_name`, `ci_level`, `trace_id`, `span_id`, `pipeline_fingerprint`, `operation_name`, `ci_partial_array`, `status`, `timestamp`, `link` |
| CI Test             | `{{citest.key}}`     | `service`, `env`, `resource_name`, `trace_id`, `span_id`, `operation_name`, `status`, `timestamp`, `link` |

一致するイベントの定義に属性が含まれていない場合、変数は空になります。

#### エクスプローラーリンク {#explorer-link}

`{{log.link}}`, `{{span.link}}`, `{{rum.link}}`, and `{{issue.link}}` を使用して、クエリに一致するイベントを対象としたログエクスプローラー、トレースエクスプローラー、RUM エクスプローラー、またはエラー追跡へのリンクで通知を充実させます。

### チェックモニター変数 {#check-monitor-variables}

チェックモニター変数 (カスタムチェックおよびインテグレーションチェック) には、変数 `{{check_message}}` が利用可能で、カスタムチェックまたはインテグレーションチェックで指定されたメッセージを表示します。

### 複合条件モニター変数 {#composite-monitor-variables}

複合条件モニターは、アラートがトリガーされたときにサブモニターに関連付けられた値とステータスにアクセスできます。

たとえば、複合条件モニターにサブモニター `a` がある場合、`a` の値を次で含めることができます。

```text
{{ a.value }}
```

サブモニター `a` のステータスを取得するには、以下を使用します。

```text
{{ a.status }}
```

ステータスとして可能な値は、`OK`、`Alert`、`Warn`、および `No Data` です。

複合条件モニターは、基底のモニターと同様の方法でタグ変数もサポートします。基底のモニターが同じタグ/ファセットでグループ化されていることを条件に、複合条件モニターは他のモニターと同様の形式に従います。

たとえば、複合条件モニターにサブモニター `a` があり、それがログモニターであるとします。この場合は、次の方法で `a` のタグまたはファセットの値を含めることができます。

```text
{{ a.log.message }} or {{ a.log.my_facet }}
```

### 文字エスケープ {#character-escape}

デフォルトの場合、変数の内容は HTML エンコードされます。生の内容を未エンコードで出力するには、二重波括弧の代わりに三重波括弧を使用します。

たとえば、変数の値にクエリパラメーターを含む URL がある場合、`&` は、使用されているのが二重波括弧かそれとも三重波括弧かに応じて異なる扱いになります。

| 構文 |  出力例 |
--------|----------------|
| `{{template_variable}}` (double braces) | `https://status.example.com/check?service=web&amp;region=us-east` |
| `{{{template_variable}}}` (triple braces) | `https://status.example.com/check?service=web&region=us-east` |

| 構文 |  出力 |
|--------|--------|
| `{{variable}}` | HTML-encoded (default) |
| `{{{variable}}}` | 生、未エンコード |

たとえば、HTML エンコーディングなしでチェックメッセージをレンダリングするには、次のようにします。

```text
{{{check_message}}}
```

これが特に重要になるのは、`{{check_message}}` contains auto-generated URLs with query parameters (for example, on HTTP Check monitors). The `&` characters in those URLs are HTML-encoded by default, which can break clickable links in notifications. Use `{{{check_message}}}` で URL をそのまま保持する場合です。

## テンプレート変数 {#template-variables}

テンプレート変数は、モニター通知をカスタマイズするために使用します組み込み変数には、次のものがあります。

| 変数                             | 説明                                                                   |
|-----------------------------------   |-------------------------------------------------------------------------------|
| `{{value}}`                          | The value that breached the alert for metric based query monitors.            |
| `{{threshold}}`                      | The value of the alert threshold set in the monitor's alert conditions.       |
| `{{warn_threshold}}`                 | The value of the warning threshold set in the monitor's alert conditions.     |
| `{{alert_recovery_threshold}}`       | The value that recovered the monitor from its `ALERT` state.                  |
| `{{warn_recovery_threshold}}`        | The value that recovered the monitor from its `WARN` state.                   |
| `{{ok_threshold}}`                   | The value that recovered the Service Check monitor.                           |
| `{{comparator}}`                     | The relational value set in the monitor's alert conditions.                   |
| `{{first_triggered_at}}`<br>*See section below*         | The UTC date and time when the monitor first triggered.                       |
| `{{first_triggered_at_epoch}}`<br>*See section below*   | The UTC date and time when the monitor first triggered in epoch milliseconds. |
| `{{last_triggered_at}}`<br>*See section below*          | The UTC date and time when the monitor last triggered.                        |
| `{{last_triggered_at_epoch}}`<br>*See section below*    | The UTC date and time when the monitor last triggered in epoch milliseconds.  |
| `{{triggered_duration_sec}}`         | モニターがトリガー状態になっている秒数。             |

### トリガーされた変数 {#triggered-variables}

 `{{first_triggered_at}}`, `{{first_triggered_at_epoch}}`, `{{last_triggered_at}}`, and `{{last_triggered_at_epoch}}` monitor template variables reflect the values when a monitor changes state, **NOT** when a new monitor event occurs. Renotification events show the same template variable if the monitor state has not changed. Use `{{triggered_duration_sec}}`。これらは、モニターイベントの時点での継続時間を表示するためのものです。

 `{{first_triggered_at}}` is set when the monitor group goes from `OK` to a non-`OK` state or when a new group appears in a non-`OK` state. `{{last_triggered_at}}` gets set when the monitor group goes to a non-`OK` state independently from its previous state (including `WARN` → `ALERT`, `ALERT` → `WARN`). Additionally, `{{last_triggered_at}}` is set when a new group appears in a non-`OK` state. The difference is that `{{last_triggered_at}}` はその前の状態とは独立しています。

 {{< img src="monitors/notifications/triggered_variables.png" alt="状態の遷移をタイムスタンプとともに 4 つ表示。A: 1419 OK to WARN, B: 1427 WARN to ALERT, C: 1445 ALERT to NO DATA, D: 1449 NO DATA to OK" style="width:90%;">}}

**例**: モニターが `OK` → `WARN` と遷移する場合、`{{first_triggered_at}}` and `{{last_triggered_at}}` の値のタイムスタンプはどちらも A になります。モニターが回復するまでの値を下表に示します。

| 遷移         | first_triggered_at     | last_triggered_at      | triggered_duration_sec           |
|------------------  |--------------------------------  |--------------------------------  |--------------------------------  |
| `OK` → `WARN`      | A                                | A                                | 0                                |
| `WARN` → `ALERT`   | A                                | B                                | B - A                            |
| `ALERT` → `NO DATA`| A                                | C                                | C - A                            |
| `NO DATA` → `OK`   | A                                | C                                | D - A                            |

### 評価 {#evaluation}

数値を返すテンプレート変数は、算術演算と関数をサポートしています。これにより、数値の算術演算や値のフォーマット変更を実行できます。詳細については、[テンプレート変数の評価][7]を参照してください。

### ローカルタイム {#local-time}

`local_time`使うと、通知の中に好きなタイムゾーンで別の日付を追加することができます。この関数は、日付をローカルタイムに変換します: `{{local_time 'time_variable' 'timezone'}}`。
例えば、東京のタイムゾーンで最後にトリガーされたモニターの時刻を通知に追加するには、通知メッセージに次のように記述します。

```
{{local_time 'last_triggered_at' 'Asia/Tokyo'}}
```

結果は ISO 8601 形式で表示されます: `yyyy-MM-dd HH:mm:ss±HH:mm`、たとえば `2021-05-31 23:43:27+09:00` のようになります。
利用可能なタイムゾーンの値については、[tz データベースのタイムゾーンリスト][8]で、TZ データベース名の列をご参照ください。

## 高度な {#advanced}

### ダイナミックハンドル {#dynamic-handles}

[タグ変数](#attribute-and-tag-variables)を使用して、通知ハンドルを動的に構築し、モニターが検出した問題の種類に基づいて、通知を適切なチームまたはサービスにルーティングします。

**例**: モニターがメトリクスをクエリし、`service` タグでグループ化すると、失敗したサービスに応じて異なる Slack チャンネルに通知をルーティングさせることができます。

```text
@slack-{{service.name}} There is an ongoing issue with {{service.name}}.
```

`service:ad-server` グループでモニターが失敗し始めると、`#ad-server` Slack チャンネルに以下の内容で通知が送信されます。

```text
@slack-ad-server There is an ongoing issue with ad-server.
```

常に存在するとは限らない属性を用いて動的ハンドルを構築する場合、通知の配信に問題が生じる可能性があります。属性が欠けている場合、その変数は通知メッセージ内で空としてレンダリングされ、無効なハンドルとなります。

これらの変数を用いた動的ハンドルで通知が失われないよう、フォールバックハンドルを必ず追加してください。

```text
{{#is_exact_match "kube_namespace.owner" ""}}
  @slack-example
  // This will notify @slack-example if the kube_namespace.owner variable is empty or does not exist.
{{/is_exact_match}}
```


### ダイナミックリンク {#dynamic-links}

[タグ変数](#attribute-and-tag-variables)を使用して、チームを適切なリソースにリンクする動的 URL 構築を有効にします。たとえば、ダッシュボード、ホストマップ、モニターなどの Datadog 内のページへのリンクを提供できます。

{{< tabs >}}
{{% tab "ダッシュボード" %}}

`{{host.name}}` [タグ変数](#attribute-and-tag-variables)を使用して、システムダッシュボードへのリンクを提供します。

```text
https://app.datadoghq.com/dash/integration/system_overview?tpl_var_scope=host:{{host.name}}
```

`{{host.name}}` [tag variable](#attribute-and-tag-variables) and an `<INTEGRATION_NAME>` を使用して、インテグレーションダッシュボードへのリンクを提供します。

```text
https://app.datadoghq.com/dash/integration/<INTEGRATION_NAME>?tpl_var_scope=host:{{host.name}}
```

`{{last_triggered_at_epoch}}` [template variable](#template-variables) as well as a `<DASHBOARD_ID>` and `<DASHBOARD_NAME>` を使って、警告の瞬間から相対時間範囲を持つダッシュボードにリンクします。

```text
https://app.datadoghq.com/dashboard/<DASHBOARD_ID>/<DASHBOARD_NAME>?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

{{% /tab %}}
{{% tab "ホストマップ" %}}

ホストマップへのリンクを提供するには、[タグ変数](#attribute-and-tag-variables)を使用します (`{{service.name}}` など)。

```text
https://app.datadoghq.com/infrastructure/map?filter=service:{{service.name}}
```

ホストマップリンクは、追加のパラメーターを使用してカスタマイズできます。最も一般的なものは次のとおりです。

| パラメーター | 定義               | 判別内容                           |
|-----------|----------------------------|--------------------------------------|
| `fillby`  | `fillby=avg:<METRIC_NAME>` | ホストの六角形の塗りつぶし色。|
| `groupby` | `groupby=<TAG_KEY>`        | ホストの六角形のグループ。       |
| `sizeby`  | `sizeby=avg:<METRIC_NAME>` | ホストの六角形のサイズ。       |

{{% /tab %}}
{{% tab "モニター" %}}

`{{host.name}}` [タグ変数](#attribute-and-tag-variables)を使用して、特定のホストに関連するすべてのモニターへのリンクを提供します。

```text
https://app.datadoghq.com/monitors/manage?q=scope:host:{{host.name}}
```

モニターリンクは、追加のパラメーターを使用してカスタマイズできます。最も一般的なものは次のとおりです。

| パラメーター | 例        | 表示                                                                        |
|-----------|----------------|---------------------------------------------------------------------------------|
| `status`  | `status:Alert` | アラート状態のモニター (追加のステータス: `WARN`、`NO DATA`、および `OK`)   |
| `muted`   | `muted: true`  | ミュートされたモニター (ミュートされていないモニターには `false` を使用)                             |
| `type`    | `type:log`     | ログモニター (他の[モニタータイプ][1]を参照)                                     |



[1]: /ja/monitors/types
{{% /tab %}}
{{% tab "ログ" %}}

`{{last_triggered_at_epoch}}` [テンプレート変数](#template-variables)を使用して、アラートの瞬間に発生しているすべてのログへのリンクを提供します。

```text
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-10*60*1000"}}&to_ts={{eval "last_triggered_at_epoch+10*60*1000"}}&live=false
```

ログリンクは、追加のパラメーターを使用してカスタマイズできます。最も一般的なものは次のとおりです。

| パラメーター | 定義               | 判別内容                           |
|-----------|----------------------------|----------------------------------------|
| `service` | `service=<SERVICE_NAME>`   | 特定のサービスのログをフィルタリングします。 |
| `host`    | `host=<HOST_NAME>`         | 特定のホストのログをフィルタリングします      |
| `status`  | `status=<STATUS>`          | ログステータス: Error、Warn、Info など。|


{{% /tab %}}
{{< /tabs >}}

### コメント {#comments}

モニターのメッセージにコメントを含めるには、次の構文を使用します。

```text
{{!-- this is a comment --}}
{{!-- this is a comment }}
```

### 未加工の形式 {#raw-format}

アラートメッセージで `{{ <TEXT> }}` などの二重中括弧を送信する必要がある場合は、`{{ <TEXT> }}`, use `{{`{{raw}}}}` の形式を使用します。たとえば、次のようになります。

```text
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

出力:

```text
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

[条件付き変数](#conditional-variables)で使用されている `^|#` ヘルパーは、{{{{raw}}}}` formatting and must be removed. For instance, to output raw text with the `形式と共に使用できず、削除する必要があります。たとえば、``{{is_match}}` 条件付き変数を使用してテキストをそのまま出力するには、次のテンプレートを使用します。

```text
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} the host name
{{{{/is_match}}}}
```

`host.name` が `<HOST_NAME>` と一致する場合、テンプレートは次を出力します。

```text
{{ .matched }} the host name
```

### URL Encode {#url-encode}

アラートメッセージに URL でエンコードする必要がある情報が含まれている場合 (たとえば、リダイレクトの場合)、`{{ urlencode "<variable>"}}` 構文を使います。

**例**: モニターメッセージに特定のサービスにフィルタリングされた Software Catalog への URL が含まれている場合、`service` [タグ変数](#attribute-and-tag-variables)を使い、URL に `{{ urlencode "<variable>"}}` 構文を追加します。

```
https://app.datadoghq.com/services/{{urlencode "service.name"}}
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/configuration/#alert-grouping
[2]: /ja/monitors/types/log/
[3]: /ja/monitors/types/apm/?tab=analytics
[4]: /ja/monitors/types/real_user_monitoring/
[5]: /ja/monitors/types/ci/
[6]: /ja/monitors/types/database_monitoring/
[7]: /ja/monitors/guide/template-variable-evaluation/
[8]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[9]: /ja/monitors/types/error_tracking/
[10]: /ja/software_catalog/service_definitions/
[11]: https://docs.datadoghq.com/ja/software_catalog/service_definitions/v2-2/#example-yaml
[12]: /ja/monitors/types/log/
[13]: /ja/monitors/types/apm/?tab=analytics
[14]: /ja/monitors/types/error_tracking/
[15]: /ja/monitors/types/real_user_monitoring/
[16]: /ja/monitors/types/audit_trail/
[17]: /ja/monitors/types/ci/?tab=tests
[18]: /ja/monitors/types/ci/?tab=pipelines
[19]: /ja/monitors/types/database_monitoring/
[20]: /ja/synthetics/notifications/template_variables/