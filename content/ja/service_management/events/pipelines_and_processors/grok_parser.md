---
title: Grok Parser

---


Create custom grok rules to parse the full message or a specific attribute of your raw event. As a best practice, it is recommended to use at most 10 parsing rules within a grok processor.


{{< img src="service_management/events/grok-parser.png" alt="Parsing example 1" style="width:80%;">}}


Click **Parse My Events** to kickstart a set of three parsing rules for the events flowing through the underlying pipeline. Refine attribute naming from there, and add new rules for other type of events if needed. This feature requires that the corresponding events are being indexed, and actually flowing in—you can temporarily deactivate or sample down exclusion filters to make this work for you.

サンプルをクリックして選択すると、パースルールに対する評価が開始され、結果が画面の下に表示されます。

Up to five samples can be saved with the processor, and each sample can be up to 5000 characters in length. All samples show a status (match or no match), which highlights if one of the parsing rules of the grok parser matches the sample.


### Grok Syntax

The Grok Parser extracts attributes from semi-structured text messages. Grok comes with reusable patterns to parse integers, IP addresses, hostnames, and more. These values must be sent into the grok parser as strings.

パース規則は、`%{MATCHER:EXTRACT:FILTER}` 構文を使用して記述できます。

* **Matcher**: 期待する内容 (数値、単語、スペース以外など) を記述する規則 (または別のトークン規則への参照)。

* **Extract** (任意): *Matcher* と一致するテキストをキャプチャする対象を表す識別子。

* **Filter** (任意): 一致したテキストを変換するためのポストプロセッサー。

Example for a classic unstructured event:

```text
john connected on 11/08/2017
```

これに次のパース規則を使用します。

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

After processing, the following structured event is generated:

{{< img src="logs/processing/processors/_parser.png" alt="パース例 1" style="width:80%;">}}

**注**:

* 1 つの Grok パーサーに複数のパース規則がある場合
  * Only one can match any given event. The first one that matches, from top to bottom, is the one that does the parsing.
  * 各規則は上記のリストに定義されたパースを参照します。
* 同一の Grok パーサー内では同じ規則名を複数使用できません。
* 規則名には英数字、アンダースコア (_)、ピリオド (.) のみ使用できます。最初の文字は英数字でなければなりません。
* 値が null または空欄のプロパティは表示されません。
* 正規表現マッチャーは、文字列の先頭に一致するように暗黙の `^` を適用し、文字列の末尾に一致するように `$` を適用します。
* Certain events can produce large gaps of whitespace. Use `\n` and `\s+` to account for newlines and whitespace.

### マッチャーとフィルター

以下に、Datadog でネイティブに実装されるすべてのマッチャーとフィルターを示します。

{{< tabs >}}
{{% tab "マッチャー" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])` 
: 指定されたパターンを持つ日付に一致してパースし、Unix タイムスタンプを生成します。[日付マッチャーの例を参照してください](#parsing-dates)。

`regex("pattern")`
: 正規表現に一致します。[正規表現マッチャーの例を参照してください](#regex)。

`notSpace`
: 次のスペースまでの文字列に一致します。

`boolean("truePattern", "falsePattern")`
: ブール値に一致してパースします。true と false のパターンをオプションで定義できます (デフォルトは 'true' と 'false'。大文字と小文字は区別されません)。

`numberStr`
: 10 進浮動小数点数に一致し、それを文字列としてパースします。

`number`
: 10 進浮動小数点数に一致し、それを倍精度数としてパースします。

`numberExtStr`
: (指数表記の) 浮動小数点数に一致し、それを文字列としてパースします。

`numberExt`
: (指数表記の) 浮動小数点数に一致し、それを倍精度数としてパースします。

`integerStr`
: 整数に一致し、それを文字列としてパースします。

`integer`
: 整数に一致し、それを整数としてパースします。

`integerExtStr`
: (指数表記の) 整数に一致し、それを文字列としてパースします。

`integerExt`
: (指数表記の) 整数に一致し、それを整数としてパースします。

`word`
: a から z、A から Z、0 から 9、および _ (アンダースコア) 文字からなる文字列に一致します。

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
: ホスト名または IP に一致します。

`port`
: ポート番号に一致します。

`data`
: スペースと改行を含め、任意の文字列に一致します。正規表現の `.*` と同じです。上記のいずれのパターンも適切でない場合に使用します。

{{% /tab %}}
{{% tab "フィルター" %}}

`number`
: 一致部分を倍精度数としてパースします。

`integer`
: 一致部分を整数としてパースします。

`boolean`
: 大文字と小文字を区別しないで、'true' および 'false' 文字列をブール値としてパースします。

`nullIf("value")`
: 一致部分が指定された値に等しい場合は null を返します。

`json`
: 適切な形式の JSON をパースします。

`rubyhash`
: 適切な形式の Ruby ハッシュをパースします (例: `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`)。

`useragent([decodeuricomponent:true/false])`
: User-Agent をパースして、Agent によって表されるデバイス、OS、ブラウザを含む JSON オブジェクトを返します。[ユーザーエージェントプロセッサーを参照してください][1]。

`querystring`
: 一致する URL クエリ文字列内のすべての key-value ペアを抽出します (例: `?productId=superproduct&promotionCode=superpromo`)。

`decodeuricomponent`
: URI コンポーネントをデコードします。たとえば、'%2Fservice%2Ftest' は '/service/test' に変換されます。

`lowercase`
: 小文字に変換した文字列を返します。

`uppercase`
: 大文字に変換した文字列を返します。

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: キー値のパターンを抽出し、JSON オブジェクトを返します。[キー値フィルターの例](#キー値またはlogfmt)を参照してください。

`xml`
: 適切にフォーマット化された XML をパースします。[XML フィルターの例](#parsing-xml)を参照してください。

`csv(headers[, separator[, quotingcharacter]])`
: 適切にフォーマット化された CSV または TSV の行をパースします。[CSV フィルターの例](#CSV をパースする)を参照してください。

`scale(factor)`
: 抽出された数値を指定された factor で乗算します。

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: 文字列トークンシーケンスをパースして配列として返します。[配列へのリスト](#list-to-array)の例を参照してください。

`url`
: Parses a URL and returns all the tokenized members (domain, query params, port, etc.) in a JSON object. 
{{% /tab %}}
{{< /tabs >}}

## 高度な設定

Grok プロセッサータイルの下部に、**Advanced Settings** セクションがあります。

{{< img src="logs/processing/parsing/advanced_settings.png" alt="詳細設定" style="width:80%;">}}

### 特定のテキスト属性をパース

**Extract from** フィールドを使用して、デフォルトの `message` 属性ではなく、指定されたテキスト属性に Grok プロセッサを適用します。

For example, consider an event containing a `command.line` attribute that should be parsed as a key-value. You could parse this event as follows:

{{< img src="logs/processing/parsing/parsing_attribute.png" alt="コマンドラインをパース" style="width:80%;">}}

### ヘルパー規則を使用して複数のパース規則を再利用する

パース規則に使用するトークンを定義するには、**Helper Rules** フィールドを使用します。Helper Rules を使用すると、Grok パターンを複数のパース規則で再利用でき、同じ Grok パーサーの複数の規則で同じトークンを使用する場合に便利です。

Example for a classic unstructured event:

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

次のパース規則を使用します。

```text
MyParsingRule %{user} %{connection} %{server}
```

次のヘルパーと組み合わせます。

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

{{< img src="logs/processing/parsing/helper_rules.png" alt="ヘルパー規則" style="width:80%;">}}

## 例

以下に、パーサーの具体的な使用例をいくつか挙げます。

* [キー値または logfmt](#key-value-or-logfmt)
* [日付のパース](#parsing-dates)
* [交互パターン](#alternating-pattern)
* [オプションの属性](#optional-attribute)
* [ネストされた JSON](#nested-json)
* [正規表現](#regex)
* [リストと配列](#list-to-array)
* [GLog 形式](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### キー値または logfmt

これは key-value コアフィルター `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` です。

* `separatorStr`: キーと値を区切るセパレーターを定義します。デフォルト `=`.
* `characterAllowList`: デフォルトの `\\w.\\-_@` に加え、追加の非エスケープ値文字を定義します。引用符で囲まれていない値 (例: `key=@valueStr`) にのみ使用します。
* `quotingStr`: 引用符を定義し、デフォルトの引用符検出（`<>`、`""`、`''`）を置き換えます。
* `delimiter`: 異なる key-value ペアのセパレーターを定義します（すなわち、`|` は `key1=value1|key2=value2`の区切り文字です）。デフォルトは ` ` (通常のスペース)、`,` および `;` です。

**keyvalue** などのフィルターを使用すると、keyvalue または logfmt 形式の属性に文字列をより簡単にマップできます。

**Event:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**例:**

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="パース例 2" style="width:80%;">}}

You don't need to specify the name of your parameters as they are already contained in the event.
If you add an **extract** attribute `my_attribute` in your rule pattern you will see:

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="パース例 2 bis" style="width:80%;">}}

キーと値を区切るデフォルトのセパレーターが `=` 以外の場合は、セパレーターとともにパラメーターをパース規則に追加します。

**Event:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**例:**

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="キー値パーサー" style="width:80%;" >}}

If event contain special characters in an attribute value, such as `/` in a url for instance, add it to the allowlist in the parsing rule:

**Event:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**例:**

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_allowlist.png" alt="キー値の許可リスト" style="width:80%;" >}}

その他の例

| **文字列の例**               | **パース規則**                                      | **結果**                            |
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

**Multiple QuotingString の例**: 複数の引用文字列が定義されると、デフォルトの挙動が定義された引用文字に置き換えられます。
`quotingStr` で指定されている値にかかわらず、キーと値は引用文字列が使用されていなくても常に入力と一致します。 引用文字列が使用されている場合、引用符内の文字列がすべて抽出されるため、`characterAllowList` は無視されます。

**Event:**

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

**例:**

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

**結果:**

  ```json
  {"key1": "valueStr", "key2": "/valueStr2"}
  ```

**注**:

* 値が空 (`key=`) または `null` (`key=null`) の場合、出力される JSON に表示されません。
* `data` オブジェクトで *keyvalue* フィルターを定義する場合で、このフィルターが一致しない時は、空の JSON `{}` が返されます (例: 入力: `key:=valueStr`、パース規則: `rule_test %{data::keyvalue("=")}`、出力: `{}`)。
* `""` を `quotingStr` と定義すると、引用符のデフォルト設定が保持されます。

### 日付のパース

日付マッチャーは、タイムスタンプを EPOCH 形式 (**millisecond** 計測単位) に変換します。

| **文字列の例**                       | **パース規則**                                          | **結果**              |
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

<sup>1</sup>  独自のローカライズを実行し、タイムスタンプが UTC _以外_の場合は、`timezone` パラメーターを使用します。
タイムゾーンとしてサポートされる形式は、以下になります。

* `GMT`、`UTC`、`UT`、`Z`
* `+h`、`+hh`、`+hh:mm`、`-hh:mm`、`+hhmm`、`-hhmm`、`+hh:mm:ss`、`-hh:mm:ss`、`+hhmmss`、`-hhmmss` 。対応する範囲は最大で +18:00 から -18:00 までです。
* `UTC+`、`UTC-`、`GMT+`、`GMT-`、`UT+`、`UT-` で始まるタイムゾーン。対応する範囲は最大で +18:00 から -18:00 までです。
* TZ データベースから取得されるタイムゾーン ID。詳細については、[TZ データベース名][2]を参照してください。

**Note**: Parsing a date **doesn't** set its value as the event official date. For this use the [Event Date Remapper][3] in a subsequent Processor.

### 交互パターン

If you have events with two possible formats which differ in only one attribute, set a single rule using alternating with `(<REGEX_1>|<REGEX_2>)`. This rule is equivalent to a Boolean OR.

**Event**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**規則**:
"id" は整数です。文字列ではないので注意してください。

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**結果**

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="パース例 4" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="パース例 4 bis" style="width:80%;" >}}

### オプションの属性

Some events contain values that only appear part of the time. In this case, make attribute extraction optional with `()?`.

**Event**:

```text
john 1234 connected on 11/08/2017
```

**規則の例**

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**注**: 任意のセクションで先頭の単語の後ろにスペースを含めると、規則は一致しません。

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="パース例 5" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="パース例 5 bis" style="width:80%;" >}}

### ネストされた JSON

未処理のテキストプレフィックスの後でネストされている JSON オブジェクトをパースするには、`json`  フィルターを使用します。

**Event**:

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**規則の例**

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="ネストされた JSON パースの例" style="width:80%;" >}}

### 正規表現

**Event**:

```text
john_1a2b3c4 connected on 11/08/2017
```

**規則の例**

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="パース例 6" responsive="true" style="width:80%;" >}}

### リストから配列へ

リストを 1 つの属性の配列に取り出すには `array([[openCloseStr, ] separator][, subRuleOrFilter)` フィルターを使用します。`subRuleOrFilter` はオプションで、これらの[フィルター][4]を受け入れることができます。

**Event**:

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**規則の例**

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

{{< img src="logs/processing/parsing/array_parsing.png" alt="パース例 6" style="width:80%;" >}}

**Event**:

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**規則の例**

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**`subRuleOrFilter` を使用したルール**:

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

### GLog 形式

Kubernetes コンポーネントは `glog` 形式でログを記録することがあります。下の例は、パイプラインライブラリの Kube Scheduler アイテムからのものです。

Example Event:

```text
W0424 11:47:41.605188       1 authorization.go:47] Authorization is disabled
```

パースの例、

```text
kube_scheduler %{regex("\\w"):level}%{date("MMdd HH:mm:ss.SSSSSS"):timestamp}\s+%{number:logger.thread_id} %{notSpace:logger.name}:%{number:logger.lineno}\] %{data:msg}
```

抽出された JSON、

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

### XML のパース 

XML パーサーは、XML 形式のメッセージを JSON に変換します。

**Event:**

```text
<book category="CHILDREN">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
</book>
```

**例:**

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

* XML に、前後のタグの間に属性と文字列値の両方が存在するタグが含まれている場合、`value` 属性が生成されます。例えば、`<title lang="en">Harry Potter</title>` は `{"title": {"lang": "en", "value": "Harry Potter" } }` に変換されます。
* 繰り返しタグは自動的に配列に変換されます。例えば、`<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` は `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }` に変換されます。

### CSV をパースする

**CSV** フィルターを使用して、文字列を属性に簡単にマップできます。対象のデータは任意の文字で区切る必要があります (デフォルトでは `,` ) 。

CSV フィルターは `csv(headers[, separator[, quotingcharacter]])` で定義されます。それぞれの内容は以下の通りです。

* `headers`: `,` で区切られたキーの名前を定義します。キー名にはアルファベットと `_` を使用できますが、冒頭の文字はアルファベットでなければなりません。
* `separator`: 異なる値の区切りに使用する区切り文字を定義します。1 文字のみ使用可能です。デフォルト: `,`。**注**: TSV のタブ文字を表すには、`separator` に `tab` を使用します。
* `quotingcharacter`: 引用符を定義します。許可されるのは 1 文字だけです。デフォルトは `"` 。

**注**:

* 区切り文字を含む値は引用符で囲む必要があります。
* 引用符で囲まれた (引用符を含む) 値は引用符でエスケープする必要があります。たとえば、引用符を含む値における `""` は `"` を意味します。
* If the event doesn't contain the same number of value as the number of keys in the header, the CSV parser will match the first ones.
* 整数と浮動小数点数は、可能な場合自動でキャストされます。

**Event**:

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

**規則の例**

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

その他の例

| **文字列の例**               | **パース規則**                                                         | **結果**                                      |
|:-----------------------------|:-------------------------------------------------------------------------|:------------------------------------------------|
| `John,Doe`                   | `%{data::csv("firstname,name")}`                                         | {"firstname": "John", "name":"Doe"}             |
| `"John ""Da Man""",Doe`      | `%{data::csv("firstname,name")}`                                         | {"firstname": "John \"Da Man\"", "name":"Doe"}  |
| `'John ''Da Man''',Doe`      | `%{data::csv("firstname,name",",","'")}`                                 | {"firstname": "John 'Da Man'", "name":"Doe"}    |
| <code>John&#124;Doe</code>   | <code>%{data::csv(&quot;firstname,name&quot;,&quot;&#124;&quot;)}</code> | {"firstname": "John", "name":"Doe"}             |
| `value1,value2,value3`       | `%{data::csv("key1,key2")}`                                              | {"key1": "value1", "key2":"value2"}             |
| `value1,value2`              | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key2":"value2"}             |
| `value1,,value3`             | `%{data::csv("key1,key2,key3")}`                                         | {"key1": "value1", "key3":"value3"}             |
| <code>Value1&nbsp;&nbsp;&nbsp;&nbsp;Value2&nbsp;&nbsp;&nbsp;&nbsp;Value3</code> (TSV)      | `%{data::csv("key1,key2,key3","tab")}` | {"key1": "value1", "key2": "value2", "key3":"value3"} |

### data matcher を使用して、不要なテキストを破棄する

If you have an event where after you have parsed what is needed and know that the text after that point is safe to discard, you can use the data matcher to do so. For the following event example, you can use the `data` matcher to discard the `%` at the end.

**Event**:

```
Usage: 24.3%
```

**規則の例**

```
MyParsingRule Usage\:\s+%{number:usage}%{data:ignore}
```

**Result**:

```
{
  "usage": 24.3,
  "ignore": "%"
}
```

### ASCII 制御文字

If your events contain ASCII control characters, they are serialized upon ingestion. These can be handled by explicitly escaping the serialized value within your grok parser.


[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /service_management/events/pipelines_and_processors/date_remapper
[4]: /service_management/events/pipelines_and_processors/grok_parser/?tab=filters&tabs=filters#matcher-and-filter
