---
algolia:
  tags:
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /ja/logs/parsing/
- /ja/logs/processing/parsing
description: Grok プロセッサーを使用したログのパース
further_reading:
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Learning Center
  text: ログパイプラインの構築と変更の方法
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: https://www.youtube.com/watch?v=AwW70AUmaaQ&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=3
  tag: Video
  text: 'Datadog のヒントとコツ: Grok パースを使用してログからフィールドを抽出する'
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: ログパースの問題を調査する方法
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: ログパース - ベストプラクティス
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Datadog によってインデックス化されるログのボリュームの制御
title: パース
---
{{< learning-center-callout header="ラーニングセンターで Grok パースを試す" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  ログパイプラインの構築と変更、パイプラインスキャナーによる管理、および一貫性を保つための処理済みログ全体での属性名の標準化について学びます。
{{< /learning-center-callout >}}

## 概要 {#overview}

Datadog は JSON 形式のログを自動的にパースします。その他の形式については、Datadog では Grok パーサーを使用してログを強化できます。
Grok 構文を使用すると、純粋な正規表現よりも簡単にログをパースできます。Grok パーサーを使用すると、半構造化テキストメッセージから属性を抽出できます。

Grok には、整数、IP アドレス、ホスト名などをパースするための再利用可能なパターンが用意されています。これらの値は、文字列として Grok パーサーに送信する必要があります。

次の `%{MATCHER:EXTRACT:FILTER}` 構文を使用してパースルールを記述できます。

* **Matcher**: 何を期待するか (数値、単語、空白以外など) を記述するルール (別のトークンルールへの参照の場合もあります)。

* **Extract** (オプション): *Matcher* によって一致したテキスト部分のキャプチャ先を表す識別子。

* **Filter** (オプション): 一致した内容を変換するためのポストプロセッサー。

典型的な非構造化ログの例:

```text
john connected on 11/08/2017
```

次のパースルールを使用します。

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

処理後、次の構造化ログが生成されます。

```json
{
  "user": "john",
  "date": 1575590400000
}
```

**注**:

* 1 つの Grok パーサー内に複数のパースルールがある場合:
  * 任意のログに一致できるのは 1 つのみです。上から下へ向かって最初に一致したルールによってパースが実行されます。
  * 各ルールは、リスト内でそのルールより上の行で定義されているパースルールを参照できます。
*同じ Grok パーサー内では、一意のルール名を使用する必要があります。
*ルール名に使用できるのは、英数字、`_`、および `.` のみです。先頭は英数字である必要があります。
*値が null または空のプロパティは表示されません。
*各ルールはログの最初から最後まで適用されるため、ログエントリ全体に一致するようにパースルールを定義する必要があります。
*特定のログでは、大きな空白が生じることがあります。改行と空白を考慮するには、`\n` と `\s+` を使用します。

###マッチャーとフィルター {#matcher-and-filter}

<div class="alert alert-danger"><em>クエリ時</em> (<a href="/logs/explorer/calculated_fields/">ログエクスプローラー</a>内) で利用可能な Grok パース機能は、マッチャー (<strong>data</strong>、<strong>integer</strong>、<strong>notSpace</strong>、<strong>number</strong>、および <strong>word</strong>) とフィルター (<strong>number</strong> および <strong>integer</strong>) の限定されたサブセットをサポートします。<br><br>
次のマッチャーとフィルターのフルセットは、<em>取り込み時</em>の <a href="/logs/log_configuration/processors/?tab=ui#grok-parser">Grok パーサー</a>機能に特有のものです。</div>

Datadog によってネイティブにインプリメントされているすべてのマッチャーとフィルターのリストは次のとおりです。

{{< tabs >}}
{{% tab "マッチャー" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])`
: 指定されたパターンで日付に一致し、パースして Unix タイムスタンプを生成します。[date マッチャーの例を参照してください](#parsing-dates)。

`regex("pattern")`
: 正規表現に一致します。[regex マッチャーの例を確認してください](#regex)。

`notSpace`
: 次のスペースまでの任意の文字列に一致します。

`boolean("truePattern", "falsePattern")`
: ブール値に一致してパースします。true と false のパターンをオプションで定義できます (デフォルトは `true` と `false`、大文字と小文字は区別されません)。

`numberStr`
: 10 進浮動小数点数に一致し、文字列としてパースします。

`number`
: 10 進浮動小数点数に一致し、倍精度数としてパースします。

`numberExtStr`
: 浮動小数点数 (指数表記をサポート) に一致し、文字列としてパースします。

`numberExt`
: 浮動小数点数 (指数表記をサポート) に一致し、倍精度数としてパースします。

`integerStr`
: 整数に一致し、文字列としてパースします。

`integer`
: 整数に一致し、整数としてパースします。

`integerExtStr`
: 整数 (指数表記をサポート) に一致し、文字列としてパースします。

`integerExt`
: 整数 (指数表記をサポート) に一致し、整数としてパースします。

`word`
: _単語_に一致します。これは単語の境界で始まり、a-z、A-Z、0-9、および `_` (アンダースコア) 文字を含み、単語の境界で終わります。正規表現の `\b\w+\b` に相当します。

`doubleQuotedString`
: 二重引用符で囲まれた文字列に一致します。

`singleQuotedString`
: 一重引用符で囲まれた文字列に一致します。

`quotedString`
: 二重引用符または一重引用符で囲まれた文字列に一致します。

`uuid`
: UUID に一致します。

`mac`
: MAC アドレスに一致します。

`ipv4`
: IPv4 に一致します。

`ipv6`
: IPv6 に一致します。

`ip`
: IP (v4 または v6) に一致します。

`hostname`
: ホスト名に一致します。

`ipOrHost`
: ホスト名または IP に一致します。

`port`
: ポート番号に一致します。

`data`
: スペースと改行を含む任意の文字列に一致します。正規表現の `.*` に相当します。上記のパターンのいずれも適切でない場合に使用します。

{{% /tab %}}
{{% tab "フィルター" %}}

`number`
: 一致した内容を倍精度数としてパースします。

`integer`
: 一致した内容を整数としてパースします。

`boolean`
: 大文字小文字を区別せず、'true' および 'false' 文字列をブール値としてパースします。

`nullIf("value")`
: 一致した内容が指定された値と等しい場合に null を返します。

`json`
: 正しくフォーマットされた JSON をパースします。

`rubyhash`
: `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}` のような、正しくフォーマットされた Ruby ハッシュをパースします。

`useragent([decodeuricomponent:true/false])`
: user-agent をパースし、そのエージェントが表すデバイス、OS、ブラウザを含む JSON オブジェクトを返します。[User Agent プロセッサーを確認してください][1]。

`querystring`
: 一致する URL クエリ文字列 (例: `?productId=superproduct&promotionCode=superpromo`) 内のすべてのキーと値のペアを抽出します。

`decodeuricomponent`
: URI コンポーネントをデコードします。たとえば、`%2Fservice%2Ftest` を `/service/test` に変換します。

`lowercase`
: 小文字に変換された文字列を返します。

`uppercase`
: 大文字に変換された文字列を返します。

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: キーと値のパターンを抽出し、JSON オブジェクトを返します。[キーと値のフィルターの例](#key-value-or-logfmt)を参照してください。

`xml`
: 正しくフォーマットされた XML をパースします。[XML フィルターの例](#parsing-xml)を参照してください。

`csv(headers[, separator[, quotingcharacter]])`
: 正しくフォーマットされた CSV または TSV の行をパースします。[CSV フィルターの例](#parsing-csv)を参照してください。

`scale(factor)`
: 期待される数値を指定された係数で乗算します。

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: トークンの文字列シーケンスをパースし、配列として返します。[リストから配列へ](#list-to-array)の例を参照してください。

`url`
: URL をパースし、トークン化されたすべてのメンバー (ドメイン、クエリパラメーター、ポートなど) を JSON オブジェクトで返します。[URL のパース方法に関する詳細][2]。

[1]: /ja/logs/log_configuration/processors/#user-agent-parser
[2]: /ja/logs/log_configuration/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## 高度な設定 {#advanced-settings}

Grok プロセッサーの下部にある [**Advanced Settings**] (高度な設定) セクションを使用すると、デフォルトの `message` 属性の代わりに特定の属性をパースしたり、複数のパースルールで共通のパターンを再利用するヘルパールールを定義したりできます。

###特定のテキスト属性のパース {#parsing-a-specific-text-attribute}

デフォルトの `message` 属性の代わりに、指定したテキスト属性に Grok プロセッサーを適用するには、**Extract from** フィールドを使用します。

たとえば、キーと値としてパースする必要がある `command.line` 属性を含むログを考えてみましょう。`command.line` から抽出してその内容をパースし、コマンドデータから構造化された属性を作成します。

{{< img src="/logs/processing/parsing/grok_advanced_settings_extract.png" alt="command.line 属性からの抽出を使用した高度な設定の例" style="width:80%;">}}

### 共通パターンを再利用するためのヘルパールールの使用 {#using-helper-rules-to-reuse-common-patterns}

パースルールのトークンを定義するには、**Helper Rules** フィールドを使用します。ヘルパールールを使用すると、パースルール全体で共通の Grok パターンを再利用できます。これは、同じ Grok パーサー内に同じトークンを使用するルールが複数ある場合に便利です。

典型的な非構造化ログの例:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

次のパースルールを使用します。

```text
MyParsingRule %{user} %{connection} %{server}
```

次のヘルパーを使用します。

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

## 例 {#examples}

パーサーの使用方法を示す例:

* [キーと値または logfmt](#key-value-or-logfmt)
* [日付のパース](#parsing-dates)
* [交互パターン](#alternating-pattern)
* [オプションの属性](#optional-attribute)
* [ネストされた JSON](#nested-json)
* [正規表現](#regex)
* [リストと配列](#list-to-array)
* [glog 形式](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### キーと値または logfmt {#key-value-or-logfmt}

これはキーと値のコアフィルター `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` です。次のように指定します。

* `separatorStr`: キーと値の間のセパレーターを定義します。デフォルトは `=` です。
* `characterAllowList`: デフォルトの `\\w.\\-_@` に加えて、エスケープされない追加の値を定義します。引用符で囲まれていない値 (たとえば `key=@valueStr`) にのみ使用されます。
* `quotingStr`: 引用符を定義し、デフォルトの引用符検出 (`<>`、`""`、`''`) を置き換えます。
* `delimiter`: 異なるキーと値のペアの間のセパレーターを定義します (たとえば、`key1=value1|key2=value2` では `|` が区切り文字です)。デフォルトは ` ` (通常のスペース)、`,`、および `;` です。

**keyvalue** などのフィルターを使用すると、キーと値または logfmt 形式の文字列を属性に簡単にマッピングできます。

**ログ:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**ルール:**

```text
rule %{data::keyvalue}
```

パラメーター名はすでにログに含まれているため、指定する必要はありません。
ルールパターンに **extract** 属性 `my_attribute` を追加すると、次のように表示されます。

```json
{
  "my_attribute": {
    "user": "john",
    "id": 123,
    "action": "click"
  }
}
```

`=` がキーと値の間のデフォルトのセパレーターではない場合は、セパレーターを指定してパースルールにパラメーターを追加します。

**ログ:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**ルール:**

```text
rule %{data::keyvalue(": ")}
```

ログの属性値に特殊文字 (たとえば URL 内の `/` など) が含まれている場合は、パースルールの許可リストに追加します。

**ログ:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**ルール:**

```text
rule %{data::keyvalue("=","/:")}
```

その他の例:

| **生の文字列**               | **パースルール**                                      | **結果**                            |
|:-----------------------------|:------------------------------------------------------|:--------------------------------------|
| key=valueStr                 | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key=\<valueStr>              | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| "key"="valueStr"             | `%{data::keyvalue}`                                   | {"key": "valueStr"}                   |
| key:valueStr                 | `%{data::keyvalue(":")}`                              | {"key": "valueStr"}                   |
| key:"/valueStr"              | `%{data::keyvalue(":", "/")}`                         | {"key": "/valueStr"}                  |
| /key:/valueStr               | `%{data::keyvalue(":", "/")}`                         | {"/key": "/valueStr"}                 |
| key:={valueStr}              | `%{data::keyvalue(":=", "", "{}")}`                   | {"key": "valueStr"}                   |
| key1=value1\|key2=value2     | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |
| key1="value1"\|key2="value2" | <code>%{data::keyvalue(&quot;=&quot;, &quot;&quot;, &quot;&quot;, &quot;&#124;&quot;)}</code> | {"key1": "value1", "key2": "value2"}  |

**複数の引用文字列の例**: 複数の引用文字列が定義されている場合、デフォルトの動作は定義された引用文字に置き換えられます。
キーと値は、`quotingStr` で指定されている内容に関わらず、引用文字のない入力に常に一致します。引用文字が使用されている場合、引用文字の間のすべてが抽出されるため、`characterAllowList` は無視されます。

**ログ:**

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

**ルール:**

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

**結果:**

  ```json
  {"key1": "valueStr", "key2": "/valueStr2"}
  ```

**注**:

* 空の値 (`key=`) または `null` 値 (`key=null`) は、出力 JSON に表示されません。
*`data` オブジェクトで *keyvalue* フィルターを定義し、このフィルターが一致しない場合、空の JSON `{}` が返されます (たとえば、入力: `key:=valueStr`、パースルール: `rule_test %{data::keyvalue("=")}`、出力: `{}`)。
*`""` を `quotingStr` として定義すると、引用に関するデフォルト設定が維持されます。

###日付のパース {#parsing-dates}

日付マッチャーは、タイムスタンプを EPOCH 形式 (測定単位: **ミリ秒**) に変換します。

| **生の文字列**                       | **パースルール**                                          | **結果**              |
|:-------------------------------------|:----------------------------------------------------------|:------------------------|
| 14:20:15                             | `%{date("HH:mm:ss"):date}`                                | {"date": 51615000}      |
| 02:20:15 PM                          | `%{date("hh:mm:ss a"):date}`                              | {"date": 51615000}      |
| 11/10/2014                           | `%{date("dd/MM/yyyy"):date}`                              | {"date": 1412978400000} |
| Thu Jun 16 08:29:03 2016             | `%{date("EEE MMM dd HH:mm:ss yyyy"):date}`                | {"date": 1466065743000} |
| Tue Nov 1 08:29:03 2016              | `%{date("EEE MMM d HH:mm:ss yyyy"):date}`                 | {"date": 1466065743000} |
| 06/Mar/2013:01:36:30 +0900           | `%{date("dd/MMM/yyyy:HH:mm:ss Z"):date}`                  | {"date": 1362501390000} |
| 2016-11-29T16:21:36.431+0000         | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZ"):date}`              | {"date": 1480436496431} |
| 2016-11-29T16:21:36.431+00:00        | `%{date("yyyy-MM-dd'T'HH:mm:ss.SSSZZ"):date}`             | {"date": 1480436496431} |
| 06/Feb/2009:12:14:14.655             | `%{date("dd/MMM/yyyy:HH:mm:ss.SSS"):date}`                | {"date": 1233922454655} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","UTC+5"):date}`        | {"date": 1466047743000} |
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","+3"):date}`           | {"date": 1466054943000} |

<sup>1</sup> 独自のローカライズを行い、タイムスタンプが UTC _ではない_場合は、`timezone` パラメーターを使用します。
サポートされているタイムゾーンの形式は次のとおりです。

* `GMT`、`UTC`、`UT`、または `Z`
* `+hh:mm`、`-hh:mm`、`+hhmm`、`-hhmm`。サポートされている最大範囲は、+18:00 から -18:00 まで (両端を含む) です。
*`UTC+`、`UTC-`、`GMT+`、`GMT-`、`UT+`、または `UT-` で始まるタイムゾーン。サポートされている最大範囲は、+18:00 から -18:00 まで (両端を含む) です。
*TZ データベースから取得されたタイムゾーン ID。詳細については、[TZ データベース名][2]を参照してください。

**注**: 日付をパースしても、その値がログの公式な日付として設定される**わけではありません**。これを行うには、後続のプロセッサーで [ログ日付リマッパー][3]を使用します。

###交互パターン {#alternating-pattern}

1 つの属性のみが異なる 2 つの形式の可能性があるログがある場合は、`(<REGEX_1>|<REGEX_2>)` を使用した交互設定で単一のルールを設定します。このルールは、ブール演算の OR に相当します。

**ログ**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**ルール**:
"id" は文字列ではなく整数であることに注意してください。

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**結果**:<br>
`%{integer:user.id}`

```json
{
  "user": {
    "id": 12345
  },
  "connect_date": 1510099200000
}
```
`%{word:user.firstname}`

```json
{
  "user": {
    "firstname": "john"
  },
  "connect_date": 1510099200000
}
```

### オプションの属性 {#optional-attribute}

ログによっては、一部の時間帯にのみ表示される値が含まれる場合があります。この場合、`()?` を使用して属性の抽出をオプションにします。

**ログ**:

```text
john 1234 connected on 11/08/2017
john connected on 11/08/2017
```

**ルール**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**注**: オプションセクションの最初の単語の後にスペースを入れると、ルールは一致しません。

**結果**:<br>
`(%{integer:user.id} )?`

```json
{
  "user": {
    "firstname": "john",
    "id": 1234
  },
  "connect_date": 1510099200000
}
```

`%{word:user.firstname} (%{integer:user.id} )?`

```json
{
  "user": {
    "firstname": "john",
  },
  "connect_date": 1510099200000
}
```

### ネストされた JSON {#nested-json}

生のテキストプレフィックスの後にネストされた JSON オブジェクトをパースするには、`json` フィルターを使用します。

**ログ**:

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**ルール**:

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

**結果**:

```json
{
  "timestamp": 1567761218000,
  "vm": "vagrant",
  "app": "program",
  "logger": {
    "thread_id": 123
  }
}
```

### 正規表現 {#regex}

**ログ**:

```text
john_1a2b3c4 connected on 11/08/2017
```

**ルール**:

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

**結果**:

```json
{
  "user": {
    "firstname": "john",
    "id": "1a2b3c4"
  }
}
```

### リストから配列へ {#list-to-array}

リストを単一の属性内の配列に抽出するには、`array([[openCloseStr, ] separator][, subRuleOrFilter)` フィルターを使用します。`subRuleOrFilter` はオプションであり、これらの [フィルター][4]を使用できます。

**ログ**:

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**ルール**:

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

**結果**:

```json
{
  "users": [
    "John",
    " Oliver",
    " Marc",
    " Tom"
  ]
}
```

**ログ**:

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**ルール**:

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**`subRuleOrFilter`** を使用したルール:

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

### glog 形式 {#glog-format}

Kubernetes コンポーネントは `glog` 形式でログを記録することがあります。この例は、パイプラインライブラリの Kube Scheduler アイテムのものです。

ログ行の例:

```text
W0424 11:47:41.605188       1 authorization.go:47] Authorization is disabled
```

パースルール:

```text
kube_scheduler %{regex("\\w"):level}%{date("MMdd HH:mm:ss.SSSSSS"):timestamp}\s+%{number:logger.thread_id} %{notSpace:logger.name}:%{number:logger.lineno}\] %{data:msg}
```

抽出された JSON:

```json
{
  "level": "W",
  "timestamp": 1587728861605,
  "logger": {
    "thread_id": 1,
    "name": "authorization.go"
  },
  "lineno": 47,
  "msg": "Authorization is disabled"
}
```

### XML のパース {#parsing-xml}

XML パーサーは、XML 形式のメッセージを JSON に変換します。

**ログ:**

```text
<book category="CHILDREN">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
</book>
```

**ルール:**

```text
rule %{data::xml}
```

**結果:**

  ```json
{
  "book": {
    "year": "2005",
    "author": "J K. Rowling",
    "category": "CHILDREN",
    "title": {
      "lang": "en",
      "value": "Harry Potter"
    }
  }
}
  ```

**注**:

* XML の 2 つのタグの間に属性と文字列値の両方を持つタグが含まれている場合、`value` 属性が生成されます。例: `<title lang="en">Harry Potter</title>` は `{"title": {"lang": "en", "value": "Harry Potter" } }` に変換されます。
* 繰り返されるタグは自動的に配列に変換されます。例: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` は `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }` に変換されます。

### CSV のパース {#parsing-csv}

**CSV** フィルターを使用すると、特定の文字 (デフォルトは `,`) で区切られている場合に、文字列を属性に簡単にマッピングできます。

CSV フィルターは `csv(headers[, separator[, quotingcharacter]])` として定義されます。次のように指定します。

* `headers`: `,` で区切られたキー名を定義します。キー名は英字で始まる必要があり、任意の英数字および `_` を含めることができます。
* `separator`: 異なる値を区切るために使用されるセパレーターを定義します。1 文字のみ使用できます。デフォルト: `,`。**注**: TSV のタブ文字を表すには、`separator` に `tab` を使用します。
* `quotingcharacter`: 引用符を定義します。1 文字のみ使用できます。デフォルト: `"`

**注**:

* セパレーター文字を含む値は、引用符で囲む必要があります。
*引用符を含む引用値は、引用符でエスケープする必要があります。たとえば、引用値内の `""` は `"` を表します。
*ログに含まれる値の数がヘッダーのキーの数と一致しない場合、CSV パーサーは最初の値を照合します。
*整数と倍精度数は、可能な場合は自動的にキャストされます。

**ログ**:

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

**ルール**:

{{< code-block lang="text" >}}
myParsingRule %{data:user:csv("first_name,name,st_nb,st_name,city")}
{{< /code-block >}}

**結果:**

{{< code-block lang="json" >}}
{
  "user": {
    "first_name": "John",
    "name": "Doe",
    "st_nb": 120,
    "st_name": "Jefferson St.",
    "city": "Riverside"
  }
}
{{< /code-block >}}

その他の例:

| **生の文字列**               | **パースルール**                                                         | **結果**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"firstname": "John", "name":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"firstname": "John \"Da Man\"", "name":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"firstname": "John 'Da Man'", "name":"Doe"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {"firstname": "John", "name":"Doe"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"key1": "value1", "key2":"value2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key2":"value2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key3":"value3"}             |
| <code>Value1&nbsp;&nbsp;&nbsp;&nbsp;Value2&nbsp;&nbsp;&nbsp;&nbsp;Value3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {"key1": "value1", "key2": "value2", "key3":"value3"} |

### データマッチャーを使用して不要なテキストを破棄する {#use-data-matcher-to-discard-unneeded-text}

必要な部分をパースした後、それ以降のテキストを破棄しても安全であることがわかっているログがある場合は、データマッチャーを使用して破棄できます。次のログの例では、`data` マッチャーを使用して末尾の `%` を破棄できます。

**ログ**:

```
Usage: 24.3%
```

**ルール**:

```
MyParsingRule Usage\:\s+%{number:usage}%{data:ignore}
```

**結果**:

```
{
  "usage": 24.3,
  "ignore": "%"
}
```

### ASCII 制御文字 {#ascii-control-characters}

ログに ASCII 制御文字が含まれている場合、それらは取り込み時にシリアル化されます。これらは、grok パーサー内でシリアル化された値を明示的にエスケープすることで処理できます。

##その他の参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /ja/logs/log_configuration/processors/#log-date-remapper
[4]: /ja/logs/log_configuration/parsing/?tab=filters&tabs=filters#matcher-and-filter