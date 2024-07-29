---
aliases:
- /ja/security_platform/notifications/variables
further_reading:
- link: /security/detection_rules/
  tag: ドキュメント
  text: セキュリティ検出ルールについて
- link: /security/notifications/
  tag: ドキュメント
  text: セキュリティ通知について
title: 変数
---

## 概要

新しい検出ルールを作成したり、既存のルールを変更したりする場合][1]、[テンプレート変数](#template-variables) (属性やシグナルタグなど) と[条件変数](#conditional-variables)を使用して、ルールの通知メッセージをカスタマイズします。ルールからシグナルが生成されると、そのシグナルに関連する値が変数に入力されます。

## テンプレート変数

テンプレート変数を使用して、トリガーされたログやトレースから動的なコンテキストをセキュリティシグナルと関連する通知に直接注入することができます。

以下の変数が利用可能です。

| 変数              | 説明                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------- |
| `{{severity}}`        | トリガーとなるルールケースの重大度 (整数、0-4)。                                      |
| `{{timestamp}}`       | シグナルが作成された時間。例: `Mon Jan 01 00:00:00 UTC 1970`                     |
| `{{timestamp_epoch}}` | シグナルが作成された時間。1970 年 1 月 1 日午前 0 時からのミリ秒単位。                 |
| `{{first_seen}}`      | シグナルが最初に観測された時間。例: `Mon Jan 01 00:00:00 UTC 1970`                  |
| `{{first_seen_epoch}}`| シグナルが最初に観測された時間。1970 年 1 月 1 日午前 0 時からのミリ秒単位。              |
| `{{last_seen}}`       | シグナルが直近でトリガーされた時間。例: `Mon Jan 01 00:00:00 UTC 1970`     |
| `{{last_seen_epoch}}` | シグナルが直近でトリガーされた時間。1970 年 1 月 1 日午前 0 時からのミリ秒単位。|
| `{{rule_name}}`       | 関連するルールの名前。                                                                  |
| `{{case_name}}`       | トリガーとなるルールケースの名前。                                                             |

### ダイナミックリンク

テンプレート変数を使用して、調査のための関連リソースに動的にリンクします。

例えば、シグナルが疑わしいユーザーのログインを検出した場合、`{{@user.id}}` を使って別のリソースへのダイナミックリンクを作成します。

```
* [Investigate user in the authentication dashboard](https://app.datadoghq.com/example/integration/security-monitoring---authentication-events?tpl_var_username={{@usr.id}})
```

また、シグナルが特定のサービスとタグ付けされている場合、`{{@service}}` 変数を使用して動的なリンクを作成します。

```
* [Investigate service in the services dashboard](https://app.datadoghq.com/example/integration/application-security---service-events?tpl_var_service={{@service}})
```

### 数値の評価

数値を返すテンプレート変数では、数学的な演算を行ったり、値の形式を変更したりするために `eval` を使用します。より詳細な情報は、[テンプレート変数の評価][2]を参照してください。

### Epoch

Epoch テンプレート変数は、通知内で人間が読みやすい文字列や数学に適した数値を作成します。例えば、関数の中で `first_seen`、`last_seen`、`timestamp` (ミリ秒単位) などの値を使用すると、通知内で読みやすい文字列を受け取ることができます。例:

```
{{eval "first_seen_epoch-15*60*1000"}}
```

`eval` 関数の詳細については、[テンプレート変数の評価][2]を参照してください。

### ローカルタイム

`local_time` 関数を使うと、通知の中に好きなタイムゾーンで別の日付を追加することができます。この関数は、日付をローカルタイムに変換します: `{{local_time "time_variable" "timezone"}}`

例えば、東京のタイムゾーンで最後にトリガーされたシグナルの時刻を通知に追加するには、通知メッセージに次のように記述します。

```
{{local_time "last_triggered_at" "Asia/Tokyo"}}
```

結果は、ISO 8601 形式 `yyyy-MM-dd HH:mm:ss±HH:mm` で表示されます。例: `2021-05-31 23:43:27+09:00`。 利用可能なタイムゾーンの値については、[tz データベースのタイムゾーンリスト][3]、特に `TZ database name` の列をご参照ください。

## 属性変数

<div class="alert alert-warning">
HIPAA 対応 Datadog 組織がセキュリティ通知に関してアクセスできるのは<a href="#template-variables">テンプレート変数</a>のみです。属性変数はサポートされていません。
</div>

属性変数を使用して、トリガーされたシグナルに関する特定の情報を使用してシグナル通知をカスタマイズします。

シグナルのイベント属性のリストを表示するには、シグナルのサイドパネルの **Overview** タブの下部にある **JSON** をクリックします。ルール通知にこれらのイベント属性を追加するには、構文 `{{@attribute}}` を使用します。イベント属性の内部キーにアクセスするには、JSON のドット表記を使用します (例: `{{@attribute.inner_key}})`)。

以下は、セキュリティシグナルに関連するイベント属性を持つ JSON オブジェクトの例です。

{{< tabs >}}
{{% tab "Cloud SIEM" %}}

```json
{
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  },
  "usr": {
    "id": "user@domain.com"
  },
  "evt": {
    "category": "authentication",
    "outcome": "success"
  },
  "used_mfa": "false"
}
```

**Say what's happening** セクションで以下を使用した場合

```
{{@usr.id}} just logged in without MFA from {{@network.client.ip}}.
```
通知メッセージはこのようなものになります。

```
user@domain.com just logged in without MFA from 1.2.3.4.
```

{{< /tabs >}}

{{% tab "Application Security Management" %}}

```json
{
  "attributes":{
    "title":"Security scanner detected",
    "http":{
      "url":"http://www.example.com"
    },
    "rule":{
      "detectionMethod":"threshold",
      "name":"Your rule name"
    },
    "events_matched":2,
    "first_seen":"2022-01-26T13:23:33.000Z",
    "last_seen":"2022-01-27T04:01:57.000Z"
  },
  "groupByPaths":[
    "service"
  ]
}
```

Say What's Happening セクションで以下を使用した場合

```
Real routes targeted for {{@service}}.
```

通知には、以下のようにサービス名が表示されます。

```
Real routes targeted for your_service_name.
```

{{% /tab %}}
{{< /tabs >}}

### その他の例

シグナルに関連する IP アドレスを表示するには、`{{@network.client.ip}}` を使用します。

もしセキュリティルールが悪意のある IP アドレスからログインしたユーザーを検出したら、テンプレート変数 `{{@usr.id}}` と `{{@network.client.ip}}` を使って、どのユーザーと IP アドレスがシグナルを発生させたかを確認します。例:

```
The user {{@usr.id}} just successfully authenticated from {{@network.client.ip}} which is a known malicious IP address.
```
## タグ変数

ルールの通知メッセージにタグ変数を追加するには、構文 `{{tag_name}}` を使用します。

`key:value` の構文に従うタグには、変数 `{{key.name}}` を使用します。これは、キーに関連付けられた値を通知でレンダリングします。例えば、シグナルが `region` というタグキーを持っている場合、通知メッセージの中で `{{region.name}}` という変数を使用します。

タグの値にアクセスするために `@` を使用する必要はありません。

タグのキーにピリオドが含まれている場合、タグ変数を使用する際には完全なキーを括弧で囲んでください。例えば、タグが `dot.key.test:five` の場合、`{{[dot.key.test].name}}` を使用します。

### ダイナミックハンドル

タグ変数を使用して、通知ハンドルを動的に構築し、生成されたセキュリティシグナルに基づいて、通知を特定のチームまたはサービスにルーティングします。
例えば、シグナルに `service` タグがある場合、失敗したサービスに基づいて、通知を異なる Slack チャンネルにルーティングさせることができます。
```
@slack-{{service.name}} There is a security issue with {{service.name}}.
```

例えば、シグナルに `service:ad-server` が指定されている場合、`#ad-server` Slack チャンネルに以下の内容で通知が送信されます。

```
@slack-ad-server There is an ongoing issue with ad-server.
```

## 条件付き変数

条件変数は、if-else ロジックを使用して、シグナルがトリガーされた詳細に基づいてメッセージを表示します。これらの変数は、タイトルや通知メッセージで使用することができます。

以下の条件付き変数を使用できます。

| 変数              | 説明                                               |
| --------------------- | --------------------------------------------------------- |
| `{{#is_match}}`       | コンテキストが指定された部分文字列と一致する。               |
| `{{^is_match}}`       | コンテキストが指定された部分文字列と一致しない。        |
| `{{#is_exact_match}}` | コンテキストが指定された文字列と完全に一致する。          |
| `{{^is_exact_match}}` | コンテキストが指定された文字列と完全に一致しない。   |
| `{{#if}}`             | 属性が存在する。                                     |

条件付き変数には、テキストと @通知の間に開始と終了のペアが必要です。例:
```
{{#is_match "<tag_variable>.name" "<comparison_string>"}}
  This displays if <comparison_string> is included in <tag_variable>.
{{/is_match}}
```

### 例

if-else ロジックで属性が存在するかどうかを確認します。

```
{{#if @network.client.ip}}The attribute IP attribute exists.{{/if}}
```

if-else ロジックで属性が値と一致するかどうかを確認します。

```
{{#is_exact_match "@network.client.ip" "1.2.3.4"}}The ip matched.{{/is_exact_match}}
```

## 追加情報

### 未加工の形式

シグナル通知が二重中括弧、例えば `{{ <TEXT> }}` を送る必要がある場合は `{{{{raw}}}}` フォーマットを使用してください。例えば、以下の構文:

```
{{{{raw}}}}
{{ <TEXT_1> }} {{ <TEXT_2> }}
{{{{/raw}}}}
```

出力:

```
{{ <TEXT_1> }} {{ <TEXT_2> }}
```

条件付き変数で使用されている `^|#` ヘルパーは、`{{{{raw}}}}` 形式と共に使用できず、削除する必要があります。たとえば、`{{is_match}}` 条件付き変数を使用してテキストをそのまま出力するには、次のテンプレートを使用します。

```
{{{{is_match "host.name" "<HOST_NAME>"}}}}
{{ .matched }} ホスト名
{{{{/is_match}}}}
```

`host.name` が `<HOST_NAME>` と一致する場合、テンプレートは次を出力します。

```
{{ .matched }} ホスト名
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/detection_rules/#creating-and-managing-detection-rules
[2]: /ja/monitors/guide/template-variable-evaluation/
[3]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones