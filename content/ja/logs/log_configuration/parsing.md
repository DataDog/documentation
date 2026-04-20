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
description: Grokプロセッサを使用してログを解析します。
further_reading:
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: Learning Center
  text: ログパイプラインの構築と修正方法を学びます。
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログを処理する方法を学びます。
- link: https://www.youtube.com/watch?v=AwW70AUmaaQ&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=3
  tag: Video
  text: Datadogのヒントとコツ：Grok解析を使用してログからフィールドを抽出します。
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: FAQ
  text: ログ解析の問題を調査するにはどうすればよいですか？
- link: /logs/guide/log-parsing-best-practice/
  tag: FAQ
  text: ログ解析 - ベストプラクティス
- link: /logs/logging_without_limits/
  tag: Documentation
  text: Datadogによってインデックスされたログの量を制御します。
title: 解析
---
{{< learning-center-callout header="学習センターでGrok解析を試してみてください。" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  ログパイプラインの構築と修正、パイプラインスキャナーによる管理、処理されたログ全体での属性名の標準化を学びます。
{{< /learning-center-callout >}}

## 概要 {#overview}

Datadogは自動的にJSON形式のログを解析します。他の形式については、DatadogはGrokパーサーの助けを借りてログを強化することを許可します。
Grok構文は、純粋な正規表現よりもログを解析するための簡単な方法を提供します。Grokパーサーは、半構造化テキストメッセージから属性を抽出することを可能にします。

Grokには、整数、IPアドレス、ホスト名などを解析するための再利用可能なパターンが付属しています。これらの値は、文字列としてgrokパーサーに送信する必要があります。

`%{MATCHER:EXTRACT:FILTER}` 構文を使用して解析ルールを書くことができます：

* **マッチャー**：期待されるもの（数、単語、空白でないものなど）を説明するルール（別のトークンルールへの参照の可能性があります）。

* **抽出**（オプション）：*マッチャー*によって一致したテキストのキャプチャ先を表す識別子。

* **フィルター**（オプション）：変換のための一致の後処理。

クラシックな非構造化ログの例：

```text
john connected on 11/08/2017
```

次の解析ルールを使用して：

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

処理後、次の構造化ログが生成されます：

```json
{
  "user": "john",
  "date": 1575590400000
}
```

**注意**：

* 1つのGrokパーサー内に複数の解析ルールがある場合：
  * 任意のログに対して一致するのは1つだけです。上から下に一致する最初のものが、解析を行うものです。
  * 各ルールは、リスト内で自分自身の上に定義された解析ルールを参照できます。
*同じGrokパーサー内でユニークなルール名を持つ必要があります。
*ルール名には、英数字、`_`、および`.`のみを含める必要があります。英数字で始める必要があります。
*nullまたは空の値を持つプロパティは表示されません。
*各ルールはログの最初から最後まで適用されるため、ログエントリ全体に一致するように解析ルールを定義する必要があります。
*特定のログは、大きな空白のギャップを生成することがあります。`\n`と`\s+`を使用して、改行と空白を考慮してください。

###マッチャーとフィルター {#matcher-and-filter}

<div class="alert alert-danger">Grok解析機能は、<em>クエリ時</em>（<a href="/logs/explorer/calculated_fields/">ログエクスプローラー</a>内）で利用可能で、限られたサブセットのマッチャー（<strong>データ</strong>、<strong>整数</strong>、<strong>空白でない</strong>、<strong>数</strong>、および<strong>単語</strong>）とフィルター（<strong>数</strong>および<strong>整数</strong>）をサポートします。<br><br>
次の完全なマッチャーとフィルターのセットは、<em>インジェスト時</em>の<a href="/logs/log_configuration/processors/?tab=ui#grok-parser">Grokパーサー</a>機能に特有です。</div>

Datadogによってネイティブに実装されたすべてのマッチャーとフィルターのリストは次のとおりです：

{{< tabs >}}
{{% tab "マッチャー" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])`
指定されたパターンに一致する日付をマッチさせ、Unixタイムスタンプを生成します。[日付マッチャーの例を参照してください](#parsing-dates)。

`regex("pattern")`
正規表現に一致します。[正規表現マッチャーの例を確認してください](#regex)。

`notSpace`
次のスペースまでの任意の文字列に一致します。

`boolean("truePattern", "falsePattern")`
真偽値をマッチさせ、オプションで真と偽のパターンを定義します（デフォルトは`true`と`false`で、大文字と小文字を区別しません）。

`numberStr`
小数点浮動小数点数に一致し、それを文字列として解析します。

`number`
小数点浮動小数点数に一致し、それを倍精度数として解析します。

`numberExtStr`
浮動小数点数に一致し（科学的表記のサポートあり）、それを文字列として解析します。

`numberExt`
浮動小数点数に一致し（科学的表記のサポートあり）、それを倍精度数として解析します。

`integerStr`
整数に一致し、それを文字列として解析します。

`integer`
整数に一致し、それを整数として解析します。

`integerExtStr`
整数に一致し（科学的表記のサポートあり）、それを文字列として解析します。

`integerExt`
整数に一致し（科学的表記のサポートあり）、それを整数として解析します。

`word`
_単語_に一致し、単語境界で始まり、a-z、A-Z、0-9の文字を含み、`_`（アンダースコア）文字を含み、単語境界で終わります。正規表現の`\b\w+\b`に相当します。

`doubleQuotedString`
ダブルクオートされた文字列に一致します。

`singleQuotedString`
シングルクオートされた文字列に一致します。

`quotedString`
ダブルクオートまたはシングルクオートされた文字列に一致します。

`uuid`
UUIDに一致します。

`mac`
MACアドレスに一致します。

`ipv4`
IPV4に一致します。

`ipv6`
IPV6に一致します。

`ip`
IP（v4またはv6）に一致します。

`hostname`
ホスト名に一致します。

`ipOrHost`
ホスト名またはIPに一致します。

`port`
ポート番号に一致します。

`data`
スペースや改行を含む任意の文字列に一致します。正規表現での`.*`に相当します。上記のパターンが適切でない場合に使用します。

{{% /tab %}}
{{% tab "フィルター" %}}

`number`
一致を倍精度数値として解析します。

`integer`
一致を整数として解析します。

`boolean`
'true'および'false'の文字列を大文字小文字を無視してブール値として解析します。

`nullIf("value")`
一致が提供された値と等しい場合はnullを返します。

`json`
適切にフォーマットされたJSONを解析します。

`rubyhash`
`{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`のような適切にフォーマットされたRubyハッシュを解析します。

`useragent([decodeuricomponent:true/false])`
ユーザーエージェントを解析し、デバイス、OS、およびエージェントによって表されるブラウザを含むJSONオブジェクトを返します。[ユーザーエージェントプロセッサを確認してください][1]。

`querystring`
一致するURLクエリ文字列内のすべてのキーと値のペアを抽出します（例えば、`?productId=superproduct&promotionCode=superpromo`）。

`decodeuricomponent`
URIコンポーネントをデコードします。例えば、`%2Fservice%2Ftest`を`/service/test`に変換します。

`lowercase`
小文字の文字列を返します。

`uppercase`
大文字の文字列を返します。

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
キー値パターンを抽出し、JSONオブジェクトを返します。[キー値フィルターの例](#key-value-or-logfmt)を参照してください。

`xml`
適切にフォーマットされたXMLを解析します。[XMLフィルターの例](#parsing-xml)を参照してください。

`csv(headers[, separator[, quotingcharacter]])`
適切にフォーマットされたCSVまたはTSV行を解析します。[CSVフィルターの例](#parsing-csv)を参照してください。

`scale(factor)`
期待される数値を指定された係数で乗算します。

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
トークンの文字列シーケンスを解析し、配列として返します。[リストから配列](#list-to-array)の例を参照してください。

`url`
URLを解析し、すべてのトークン化されたメンバー（ドメイン、クエリパラメータ、ポートなど）をJSONオブジェクトとして返します。[URLを解析する方法についての詳細][2]。

[1]: /ja/logs/log_configuration/processors/#user-agent-parser
[2]: /ja/logs/log_configuration/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## 高度な設定 {#advanced-settings}

Grokプロセッサの下部にある**高度な設定**セクションを使用して、デフォルトの`message`属性の代わりに特定の属性を解析するか、複数の解析ルールにわたって共通のパターンを再利用するヘルパールールを定義します。

###特定のテキスト属性を解析する{#parsing-a-specific-text-attribute}

**から抽出**フィールドを使用して、デフォルトの`message`属性の代わりに指定されたテキスト属性にGrokプロセッサを適用します。

例えば、キー値として解析されるべき`command.line`属性を含むログを考えてみてください。`command.line`から内容を抽出し、コマンドデータから構造化された属性を作成します。

{{< img src="/logs/processing/parsing/grok_advanced_settings_extract.png" alt="コマンドライン属性の例を用いた高度な設定" style="width:80%;">}}

### ヘルパールールを使用して共通のパターンを再利用する {#using-helper-rules-to-reuse-common-patterns}

**ヘルパールール**フィールドを使用して、パースルールのトークンを定義します。ヘルパールールを使用すると、パースルール全体で共通のGrokパターンを再利用できます。これは、同じGrokパーサー内に同じトークンを使用する複数のルールがある場合に便利です。

クラシックな非構造化ログの例：

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

次のパースルールを使用してください：

```text
MyParsingRule %{user} %{connection} %{server}
```

次のヘルパーを使用して：

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

## 例 {#examples}

パーサーの使用方法を示すいくつかの例：

* [キー値またはlogfmt](#key-value-or-logfmt)
* [日付のパース](#parsing-dates)
* [交互のパターン](#alternating-pattern)
* [オプションの属性](#optional-attribute)
* [ネストされたJSON](#nested-json)
* [Regex](#regex)
* [リストと配列](#list-to-array)
* [Glog形式](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### キー値またはlogfmt {#key-value-or-logfmt}

これはキー値コアフィルターです：`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` どこで：

* `separatorStr`：キーと値の間の区切り文字を定義します。デフォルトは `=` です。
* `characterAllowList`: デフォルトの `\\w.\\-_@` に加えて、エスケープされていない追加の値文字を定義します。非引用値のみに使用されます（例えば、`key=@valueStr`）。
* `quotingStr`: デフォルトの引用検出を置き換える引用を定義します: `<>`, `""`, `''`。
* `delimiter`: 異なるキー値ペアの間の区切り文字を定義します（例えば、`|` は `key1=value1|key2=value2` の区切り文字です）。デフォルトは ` `（通常のスペース）、`,` および `;` です。

フィルターを使用して、**keyvalue** のように、文字列をキー値または logfmt 形式の属性により簡単にマッピングします:

**ログ:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**ルール:**

```text
rule %{data::keyvalue}
```

パラメータの名前を指定する必要はありません。すでにログに含まれています。
ルールパターンに **extract** 属性 `my_attribute` を追加すると、次のようになります:

```json
{
  "my_attribute": {
    "user": "john",
    "id": 123,
    "action": "click"
  }
}
```

`=` がキーと値の間のデフォルトの区切り文字でない場合は、区切り文字を持つ解析ルールにパラメータを追加してください。

**ログ:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**ルール:**

```text
rule %{data::keyvalue(": ")}
```

ログに属性値の特殊文字が含まれている場合、例えば URL の `/` のように、解析ルールの許可リストに追加してください:

**ログ:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**ルール:**

```text
rule %{data::keyvalue("=","/:")}
```

他の例:

| **生文字列**               | **解析ルール**                                      | **結果**                            |
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
キーと値は、`quotingStr` に指定されている内容に関係なく、常に引用文字なしの入力と一致します。引用文字が使用される場合、`characterAllowList`は無視され、引用文字の間にあるすべての内容が抽出されます。

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

**注意**：

* 空の値 (`key=`) または `null` の値 (`key=null`) は出力JSONに表示されません。
*`data`オブジェクトに対して*キー値*フィルターを定義し、このフィルターが一致しない場合、空のJSON `{}`が返されます（例：入力: `key:=valueStr`、解析ルール: `rule_test %{data::keyvalue("=")}`、出力: `{}`）。
*`""`を`quotingStr`として定義すると、引用のデフォルト設定が保持されます。

###日付を解析する {#parsing-dates}

日付マッチャーは、あなたのタイムスタンプをEPOCH形式（単位は**ミリ秒**）に変換します。

| **生の文字列**                       | **解析ルール**                                          | **結果**              |
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

<sup>1</sup> 自分でローカライズを行い、タイムスタンプが_UTCではない_場合は、`timezone`パラメータを使用してください。
サポートされているタイムゾーンの形式は次のとおりです：

* `GMT`、`UTC`、`UT`または`Z`
* `+hh:mm`, `-hh:mm`, `+hhmm`, `-hhmm`.最大サポート範囲は+18:00から-18:00まで（両端を含む）です。
*`UTC+`、`UTC-`、`GMT+`、`GMT-`、`UT+`または`UT-`で始まるタイムゾーン。最大サポート範囲は+18:00から-18:00まで（両端を含む）です。
*TZデータベースから取得したタイムゾーンID。詳細については、[TZデータベース名][2]を参照してください。

**注意**: 日付を解析することは**その値をログの公式日付として設定しません**。このためには、後続のプロセッサで[ログ日付リマッパー][3]を使用してください。

###交互パターン {#alternating-pattern}

2つの可能な形式のログがあり、1つの属性だけが異なる場合は、`(<REGEX_1>|<REGEX_2>)`を使用して交互に単一のルールを設定してください。このルールはブールORに相当します。

**ログ**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**ルール**:
「id」は整数であり、文字列ではないことに注意してください。

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

オプションの属性 {#optional-attribute}

一部のログには、時々のみ現れる値が含まれています。この場合、`()?`を使用して属性抽出をオプションにしてください。

**ログ**:

```text
john 1234 connected on 11/08/2017
john connected on 11/08/2017
```

**ルール**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**注意**: オプションセクションの最初の単語の後にスペースを含めると、ルールは一致しません。

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

###ネストされたJSON {#nested-json}

生のテキストプレフィックスの後にネストされたJSONオブジェクトを解析するには、`json`フィルターを使用してください:

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

###正規表現 {#regex}

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

###リストを配列に {#list-to-array}

`array([[openCloseStr, ] separator][, subRuleOrFilter)`フィルターを使用して、単一の属性内のリストを配列に抽出します。`subRuleOrFilter`はオプションであり、これらの[フィルター][4]を受け入れます。

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

**ログ**：

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**ルール**:

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**ルールを使用して`subRuleOrFilter`**：

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

###Glogフォーマット{#glog-format}

Kubernetesコンポーネントは時々`glog`フォーマットでログを記録します。この例はパイプラインライブラリのKubeスケジューラー項目からのものです。

例のログ行：

```text
W0424 11:47:41.605188       1 authorization.go:47] Authorization is disabled
```

解析ルール：

```text
kube_scheduler %{regex("\\w"):level}%{date("MMdd HH:mm:ss.SSSSSS"):timestamp}\s+%{number:logger.thread_id} %{notSpace:logger.name}:%{number:logger.lineno}\] %{data:msg}
```

抽出されたJSON：

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

### XMLを解析する{#parsing-xml}

XMLパーサーはXML形式のメッセージをJSONに変換します。

**ログ：**

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

**ノート**：

* XMLに属性と2つのタグの間に文字列値の両方を持つタグが含まれている場合、`value`属性が生成されます。例えば：`<title lang="en">Harry Potter</title>`は`{"title": {"lang": "en", "value": "Harry Potter" } }`に変換されます。
*繰り返しタグは自動的に配列に変換されます。例えば：`<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>`は`{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }`に変換されます。

### CSVを解析する{#parsing-csv}

**CSV**フィルターを使用して、指定された文字（デフォルトでは`,`）で区切られた文字列を属性により簡単にマッピングします。

CSVフィルターは`csv(headers[, separator[, quotingcharacter]])`として定義されます。

* `headers`：`,`で区切られたキー名を定義します。キー名はアルファベット文字で始まり、`_`に加えて任意の英数字を含むことができます。
* `separator`: 異なる値を区切るために使用される区切り文字を定義します。1文字のみが受け入れられます。デフォルト: `,`。**注意**: TSVのタブ文字を表すために`tab`を使用してください。
* `quotingcharacter`: 引用文字を定義します。1文字のみが受け入れられます。デフォルト: `"`

**注意**:

* 区切り文字を含む値は引用符で囲む必要があります。
*引用された値に引用文字が含まれている場合は、引用文字でエスケープする必要があります。例えば、引用された値内の`""`は`"`を表します。
*ログに値の数がヘッダーのキーの数と同じでない場合、CSVパーサーは最初のものを一致させます。
*整数と倍精度浮動小数点数は、可能であれば自動的にキャストされます。

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

他の例:

| **生文字列**               | **解析ルール**                                                         | **結果**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"firstname": "John", "name":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"firstname": "John \"Da Man\"", "name":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"firstname": "John 'Da Man'", "name":"Doe"}    |
| <code>ジョン&#124;ドー</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {"firstname": "ジョン", "name":"ドー"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"key1": "value1", "key2":"value2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key2":"value2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key3":"value3"}             |
| <code>値1&nbsp;&nbsp;&nbsp;&nbsp;値2&nbsp;&nbsp;&nbsp;&nbsp;値3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {"key1": "value1", "key2": "value2", "key3":"value3"} |

### 不要なテキストを破棄するためにデータマッチャーを使用します {#use-data-matcher-to-discard-unneeded-text}

必要なものを解析した後、その後のテキストが破棄しても安全であることがわかるログがある場合、データマッチャーを使用してそれを行うことができます。次のログの例では、`data`マッチャーを使用して最後の`%`を破棄できます。

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

### ASCII制御文字 {#ascii-control-characters}

ログにASCII制御文字が含まれている場合、それらは取り込み時にシリアライズされます。これらは、grokパーサー内でシリアライズされた値を明示的にエスケープすることによって処理できます。

##さらに読む {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /ja/logs/log_configuration/processors/#log-date-remapper
[4]: /ja/logs/log_configuration/parsing/?tab=filters&tabs=filters#matcher-and-filter