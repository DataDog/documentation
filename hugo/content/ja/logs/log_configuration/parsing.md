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
description: Grok プロセッサーを使用してログをパースする
further_reading:
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法を学ぶ
- link: /logs/logging_without_limits/
  tag: ドキュメント
  text: Datadog によってインデックスされるログの量を制御する
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: ログパースの問題を調査する方法
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: ログパース – ベストプラクティス
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: ラーニングセンター
  text: ログパイプラインの構築と変更方法を学ぶ
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: ラーニングセンター
  text: ログパイプラインのデバッグ
- link: https://www.datadoghq.com/blog/detect-http2-abuse-apache-web-server-logs/
  tag: ブログ
  text: Apache Web サーバーのログで HTTP/2 の不正利用を検出する方法
- link: https://www.youtube.com/watch?v=AwW70AUmaaQ&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=3
  tag: 動画
  text: 'Datadog のヒントとテクニック: Grok パースを使用してログからフィールドを抽出する'
title: パース
---
{{< learning-center-callout header="ラーニングセンターで Grok パースを試す" btn_title="今すぐ登録する" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  ログパイプラインの構築や変更方法、Pipeline Scanner による管理方法、そして処理済みログ全体で属性名を標準化して整合性を確保する方法を学びます。
{{< /learning-center-callout >}}

## 概要{#overview}

Datadog は JSON 形式のログを自動的にパースします。他の形式の場合、Datadog では Grok Parser を使用してログをエンリッチできます。
Grok 構文は、純粋な正規表現よりも簡単にログをパースする方法を提供します。Grok Parser を使用すると、半構造化テキストメッセージから属性を抽出することが可能です。

Grok には、整数、IP アドレス、ホスト名などを解析するための再利用可能なパターンが用意されています。これらの値は、文字列として Grok Parser に送信する必要があります。

パースルールは、`%{MATCHER:EXTRACT:FILTER}` という構文で記述できます。

* **Matcher**: 期待される内容 (数値、単語、notSpace など) を定義するルール (他のトークンルールへの参照を含む場合があります)。

* **Extract** (オプション): *Matcher* によって一致したテキスト部分のキャプチャ先を表す識別子。

* **Filter** (オプション): 一致した内容を変換するためのポストプロセッサー。

典型的な非構造化ログの例:

```text
john connected on 11/08/2017
```

以下のパースルールを使用する場合:

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

処理後、以下の構造化ログが生成されます。

```json
{
  "user": "john",
  "date": 1575590400000
}
```

**注**:

* 1 つの Grok Parser 内に複数のパースルールがある場合:
  * 特定のログに対して一致するのは 1 つのルールのみです。上から順に確認し、最初に一致したルールがパースを行います。
  * 各ルールは、リスト内でそれより上に定義されたパースルールを参照できます。
* 同じ Grok Parser 内では、ルール名を一意にする必要があります。
* ルール名には、英数字、`_`、`.` のみを使用できます。ルール名は英数字で始める必要があります。
* 値が null または空のプロパティは表示されません。
* 各ルールはログの先頭から末尾まで適用されるため、ログエントリ全体に一致するようにパースルールを定義する必要があります。
* ログによっては、大きな空白が含まれる場合があります。改行や空白を適切に処理するには、`\n` と `\s+` を使用してください。

### マッチャーとフィルター{#matcher-and-filter}

<div class="alert alert-danger">Grok パース機能は、<em>query-time</em> (<a href="/logs/explorer/calculated_fields/">Log Explorer</a> 内) で利用可能で、限られたサブセットのマッチャー (<strong>data</strong>、<strong>integer</strong>、<strong>notSpace</strong>、<strong>number</strong>、および <strong>word</strong>) とフィルター (<strong>number</strong> および <strong>integer</strong>) をサポートしています。<br><br>
以下のマッチャーとフィルターの完全なセットは、<em>ingest-time</em> の <a href="/logs/log_configuration/processors/grok_parser/">Grok パーサー</a>機能に固有のものです。</div>

Datadog でネイティブに実装されているすべてのマッチャーとフィルターのリストは以下のとおりです。

{{< tabs >}}
{{% tab "マッチャー" %}}

**query-time および ingest-time のマッチャー:**

query-time のパース (Log Explorer) と ingest-time のパース (Grok Parser) の両方で、以下のマッチャーが利用可能です。

`word`
: 単語の境界で始まり、a-z、A-Z、0-9、および`_` (アンダースコア) 文字を含み、単語の境界で終わる_単語_に一致します。正規表現の `\b\w+\b` に相当します。

`notSpace`
: 次のスペースまでの任意の文字列に一致します。

`number`
: 10 進浮動小数点数に一致し、倍精度浮動小数点数としてパースします。

`integer`
: 整数に一致し、整数としてパースします。

`data`
: スペースや改行を含む任意の文字列に一致します。正規表現の `.*` に相当します。上記のパターンがいずれも適切でない場合に使用します。

**ingest-time にのみ使用可能なマッチャー:**

以下のマッチャーは、Grok Parser プロセッサーを使用した ingest-time のパースでのみ利用可能であり、Log Explorer では使用できません。

`date("pattern"[, "timezoneId"[, "localeId"]])`
: 指定されたパターンの日付に一致し、パースして Unix タイムスタンプを生成します。[date マッチャーの例を参照してください](#parsing-dates)。

`regex("pattern")`
: 正規表現に一致します。[regex マッチャーの例をチェックしてください](#regex)。

`boolean("truePattern", "falsePattern")`
: ブール値に一致してパースします。オプションで true と false のパターンを定義できます (デフォルトは `true` と `false` で、大文字と小文字は区別されません)。

`numberStr`
: 10 進浮動小数点数に一致し、文字列としてパースします。

`numberExtStr`
: 浮動小数点数 (指数表記を含む) に一致し、文字列としてパースします。

`numberExt`
: 浮動小数点数 (指数表記を含む) に一致し、倍精度浮動小数点数としてパースします。

`integerStr`
: 整数に一致し、文字列としてパースします。

`integerExtStr`
: 整数 (指数表記を含む) に一致し、文字列としてパースします。

`integerExt`
: 整数 (指数表記を含む) に一致し、整数としてパースします。

`doubleQuotedString`
: 二重引用符で囲まれた文字列に一致します。

`singleQuotedString`
: 単一引用符で囲まれた文字列に一致します。

`quotedString`
: 二重引用符または単一引用符で囲まれた文字列に一致します。

`uuid`
: UUID に一致します。

`mac`
: MAC アドレスに一致します。

`ipv4`
: IPV4 に一致します。

`ipv6`
: IPV6 に一致します。

`ip`
: IP (v4 または v6) に一致します。

`hostname`
: ホスト名に一致します。

`ipOrHost`
: ホスト名または IP アドレスにします。

`port`
: ポート番号に一致します。

{{% /tab %}}
{{% tab "フィルター" %}}

**query-time および ingest-time のフィルター:**

以下のフィルターは、query-time パース (Log Explorer) と ingest-time パース (Grok Parser) の両方で使用できます。

`number`
: 一致するものを倍精度浮動小数点数としてパースします。

`integer`
: 一致するものを整数としてパースします。

**ingest-time のみのフィルター:**

以下のフィルターは、Grok Parser を使用した ingest-time のパースでのみ利用可能で、Log Explorer では使用できません。

`boolean`
: 大文字と小文字を区別せずに、「true」および「false」文字列をブール値としてパースします。

`nullIf("value")`
: 一致する値が指定された値と等しい場合、null を返します。

`json`
: 適切にフォーマットされた JSON をパースします。

`rubyhash`
: 適切にフォーマットされた Ruby ハッシュ (`{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}` など) をパースします。

`useragent([decodeuricomponent:true/false])`
: ユーザーエージェントをパースし、Agent によって表されるデバイス、OS、およびブラウザを含む JSON オブジェクトを返します。[ユーザーエージェントをチェックする][1]。

`querystring`
: 一致する URL クエリ文字列内のすべてのキーと値のペアを抽出します (例: `?productId=superproduct&promotionCode=superpromo`)。

`decodeuricomponent`
: URI コンポーネントをデコードします。たとえば、`%2Fservice%2Ftest` を`/service/test` に変換します。

`lowercase`
: 小文字の文字列を返します。

`uppercase`
: 大文字の文字列を返します。

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: キーと値のパターンを抽出し、JSON オブジェクトを返します。「[キーと値のフィルターの例](#key-value-or-logfmt)」を参照してください。

`xml`
: 適切にフォーマットされた XML をパースします。「[XML フィルターの例](#parsing-xml)」を参照してください。

`csv(headers[, separator[, quotingcharacter]])`
: 適切にフォーマットされた CSV または TSV 行をパースします。「[CSV フィルターの例](#parsing-csv)」を参照してください。

`scale(factor)`
: 期待される数値に指定された係数を掛けます。

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: トークンの文字列シーケンスをパースし、配列として返します。「[リストから配列への変換](#list-to-array)」の例を参照してください。

`url`
: URL をパースし、トークン化された各要素 (ドメイン、クエリパラメーター、ポートなど) を JSON オブジェクトとして返します。[URL のパース方法に関する詳細情報][2]。

[1]: /ja/logs/log_configuration/processors/user_agent_parser/
[2]: /ja/logs/log_configuration/processors/url_parser/
{{% /tab %}}
{{< /tabs >}}

## 詳細設定{#advanced-settings}

Grok プロセッサーの下部にある [{{< ui >}}Advanced Settings{{< /ui >}}] セクションを使用して、デフォルトの `message` 属性の代わりに特定の属性をパースしたり、複数のパースルール間で共通のパターンを再利用するためのヘルパールールを定義したりできます。

### 特定のテキスト属性のパース{#parsing-a-specific-text-attribute}

[{{< ui >}}Extract from{{< /ui >}}] フィールドを使用して、デフォルトの `message` 属性の代わりに、指定したテキスト属性に対して Grok プロセッサーを適用できます。

たとえば、`command.line` 属性を含み、その内容をキーと値としてパースする必要があるログを考えてみましょう。`command.line` から抽出してその内容をパースし、コマンドデータから構造化された属性を作成することが可能になります。

{{< img src="/logs/processing/parsing/grok_advanced_settings_extract.png" alt="command.line 属性からの抽出を含む詳細設定の例" style="width:80%;">}}

### ヘルパールールを使用して共通パターンを再利用する{#using-helper-rules-to-reuse-common-patterns}

[{{< ui >}}Helper Rules{{< /ui >}}] フィールドを使用して、パースルールのトークンを定義します。ヘルパールールを使用すると、共通の Grok パターンをパースルール全体で再利用できます。これは、同じ Grok パーサー内に同じトークンを使用するルールが複数ある場合に便利です。

典型的な非構造化ログの例:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

次のパースルールを使用します。

```text
MyParsingRule %{user} %{connection} %{server}
```

ヘルパールールは以下のとおりです。

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

## 例{#examples}

パーサーの使用方法を示すいくつかの例:

* [キーと値または logfmt](#key-value-or-logfmt)
* [日付のパース](#parsing-dates)
* [交互に現れるパターン](#alternating-pattern)
* [オプションの属性](#optional-attribute)
* [ネストされた JSON](#nested-json)
* [正規表現](#regex)
* [リストと配列](#list-to-array)
* [Glog 形式](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### キーと値または logfmt{#key-value-or-logfmt}

これはキーと値形式のコアフィルターで、その詳細を以下に示します: `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`

* `separatorStr`: キーと値の間の区切り文字を定義します。デフォルトは `=` です。
* `characterAllowList`: デフォルトの `\\w.\\-_@` に加えて、エスケープせずに使用できる値の文字を定義します。引用符で囲まれていない値に対してのみ使用されます (例: `key=@valueStr`)。
* `quotingStr`: 引用符を定義し、デフォルトの引用符検出である `<>`、`""`、`''` を置き換えます。
* `delimiter`: 異なるキーと値のペア間の区切り文字を定義します (例: `key1=value1|key2=value2` の区切り文字は `|` です)。デフォルトは ` ` (通常のスペース)、`,`、および `;` です。

`keyvalue` のようなフィルターを使用すると、keyvalue 形式や logfmt 形式の文字列を属性に簡単にマッピングできます。

**ログ:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**ルール:**

```text
rule %{data::keyvalue}
```

パラメーター名はすでにログに含まれているため、名前を指定する必要はありません。
ルールパターンに **抽出** 属性の `my_attribute` を追加すると、次のように表示されます。

```json
{
  "my_attribute": {
    "user": "john",
    "id": 123,
    "action": "click"
  }
}
```

`=` がキーと値の間のデフォルトの区切り文字ではない場合は、パースルールに区切り文字を含むパラメーターを追加してください。

**ログ:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**ルール:**

```text
rule %{data::keyvalue(": ")}
```

ログの属性値に、たとえば URL 内の `/` のような特殊文字が含まれている場合は、パースルールの許可リストに追加してください。

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

**複数の QuotingString の例**: 複数の QuotingString が定義されている場合、デフォルトの動作が、定義された引用文字を使用する動作に置き換わります。
キーと値は、`quotingStr` で何が指定されているかに関係なく、引用文字を含まない入力と常に一致します。引用文字が使用されている場合、引用文字で囲まれた部分がすべて抽出されるため、`characterAllowList` は無視されます。

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

* 空の値 (`key=`) または`null` 値 (`key=null`) は、出力 JSON には表示されません。
* `data` オブジェクトに対して *keyvalue* フィルターを定義し、このフィルターに一致しなかった場合、空の JSON `{}` が返されます (例: 入力: `key:=valueStr`、パースルール: `rule_test %{data::keyvalue("=")}`、出力: `{}`)。
* `""` を`quotingStr` として定義すると、引用のデフォルト設定が維持されます。

### 日付のパース{#parsing-dates}

日付マッチャーは、タイムスタンプを EPOCH 形式 (単位は**ミリ秒**) に変換します。

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

<sup>1</sup> 独自のローカライズを実行しており、かつタイムスタンプが UTC では_ない_場合は、`timezone` パラメーターを使用します。
サポートされているタイムゾーンの形式は次のとおりです。

* `GMT`、`UTC`、`UT` または `Z`
* `+hh:mm`、`-hh:mm`、`+hhmm`、`-hhmm`。サポートされている最大範囲は、+18:00 から -18:00 まで (両端を含む) です。
* タイムゾーンは`UTC+`、`UTC-`、`GMT+`、`GMT-`、`UT+` または `UT-` で始まります。サポートされている最大範囲は、+18:00 から -18:00 まで (両端を含む) です。
* TZ データベースから取得されたタイムゾーン ID。詳細については、「[TZ データベース名][2]」を参照してください。

**注**: 日付をパースしても、その値がログの公式な日付として**設定されるわけではありません**。これを行うには、後続のプロセッサーで[Log Date Remapper][3]を使用してください。

### 交互に現れるパターン{#alternating-pattern}

1 つの属性のみが異なる 2 種類の形式を持つログがある場合は、`(<REGEX_1>|<REGEX_2>)` を使用した交互パターンで単一のルールを設定します。このルールは、ブール演算の OR と同等です。

**ログ**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**ルール**:
「id」は文字列ではなく整数であることに注意してください。

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

### オプションの属性{#optional-attribute}

一部のログには、常に存在するわけではない値が含まれていることがあります。そのような場合は、`()?` を使用して属性抽出をオプションにします。

**ログ**:

```text
john 1234 connected on 11/08/2017
john connected on 11/08/2017
```

**ルール**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**注**: オプションのセクションにある最初の単語の後にスペースを含めると、ルールは一致しません。

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

### ネストされた JSON{#nested-json}

`json` フィルターを使用して、生のテキストのプレフィックスの後にネストされた JSON オブジェクトをパースします。

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
  },
  "server": "server.1",
  "method": "GET",
  "status_code": 200,
  "url": "https://app.datadoghq.com/logs/pipelines",
  "duration": 123456
}
```

### 正規表現{#regex}

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

### リストから配列への変換{#list-to-array}

`array([[openCloseStr, ] separator][, subRuleOrFilter)` フィルターを使用して、リストを単一の属性内の配列として抽出します。`subRuleOrFilter` はオプションであり、以下の[フィルター][4]を指定できます。

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

**`subRuleOrFilter`**を使用したルール:

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

### Glog 形式{#glog-format}

Kubernetes コンポーネントは、`glog` 形式でログを出力することがあります。この例は、パイプラインライブラリの Kube Scheduler 項目からのものです。

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

### XML のパース{#parsing-xml}

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

* XML に属性と文字列値の両方を持つタグが含まれている場合、`value` 属性が生成されます。例: `<title lang="en">Harry Potter</title>` は `{"title": {"lang": "en", "value": "Harry Potter" } }` に変換されます。
* 繰り返しタグは自動的に配列に変換されます。例: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` は `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }` に変換されます。

### CSV のパース{#parsing-csv}

`csv` フィルターを使用すると、特定の文字 (デフォルトは `,`) で区切られた文字列を属性に簡単にマッピングできます。

CSV フィルターは `csv(headers[, separator[, quotingcharacter]])` として定義され、その内容は以下のとおりです。

* `headers`: `,` で区切られたキー名を定義します。キー名は英字で始まる必要があり、英数字に加えて `_` を含めることができます。
* `separator`: 各値を区切るための区切り文字を定義します。指定できる文字は 1 文字のみです。デフォルトは `,` です。**注**: TSV 形式のようにタブ文字を区切り文字として使用する場合は、`tab` に `separator` を使用してください。
* `quotingcharacter`: 引用符を定義します。指定できる文字は 1 文字のみです。デフォルトは `"` です。

**注**:

* 区切り文字を含む値は、引用符で囲む必要があります。
* 引用符で囲まれた値の中に引用符自体が含まれる場合は、その引用符を引用符文字でエスケープする必要があります。たとえば、引用符で囲まれた値の中にある `""` は `"` を表します。
* ログに含まれる値の数がヘッダー内のキーの数と一致しない場合、CSV パーサーは先頭から順に値を対応付けます。
* 整数および倍精度浮動小数点数は、可能な場合に自動的にキャストされます。

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

### データマッチャーを使用して不要なテキストを破棄する{#use-data-matcher-to-discard-unneeded-text}

必要な情報のパースが完了し、それ以降のテキストを破棄しても問題ないと判断できるログがある場合、データマッチャーを使用してその部分を破棄することができます。以下のログの例では、`data` マッチャーを使用して末尾の `%` を破棄することが可能です。

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

### ASCII 制御文字{#ascii-control-characters}

ログに ASCII 制御文字が含まれている場合、それらは取り込み時にシリアル化されます。これらの文字は、Grok Parser 内でシリアル化された値を明示的にエスケープすることで処理できます。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /ja/logs/log_configuration/processors/log_date_remapper/
[4]: /ja/logs/log_configuration/parsing/?tab=filters&tabs=filters#matcher-and-filter