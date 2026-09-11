---
aliases:
- /ja/service_management/events/pipelines_and_processors/grok_parser/
description: カスタム Grok ルールを作成して、生イベントのメッセージ全体または特定の属性を構造化データにパースします。
title: Grok パーサー
---
## 概要 {#overview}

メッセージ全体や未加工のイベントの特定の属性をパースするためのカスタム Grok ルールを作成できます。ベストプラクティスとして、Grok プロセッサ内では最大 10 個のパースルールを使用することを推奨します。


{{< img src="service_management/events/grok-parser.png" alt="パースの例 1" style="width:80%;">}}


**Parse My Events** をクリックして、基盤となるパイプラインを流れるイベントに対する 3 つのパースルールセットの作成を開始します。そこから属性名を調整し、必要に応じて他の種類のイベント用に新しいルールを追加します。この機能を使用するには、対応するイベントがインデックスされ、実際に流入している必要があります。これを有効にするために、除外フィルターを一時的に無効にするか、サンプリングレートを下げることができます。

サンプルをクリックして選択すると、パースルールに対する評価が開始され、結果が画面の下に表示されます。

プロセッサーには最大 5 つのサンプルを保存でき、各サンプルは最大 5000 文字までの長さにできます。すべてのサンプルにはステータス (match または no match) が表示され、Grok パーサーのパース規則のいずれかがサンプルに一致するかどうかが強調表示されます。


### Grok 構文 {#grok-syntax}

Grok パーサーは、半構造化テキストメッセージから属性を抽出します。Grok には再利用可能なパターンが付属しており、整数、IP アドレス、ホスト名などをパースするために使用できます。これらの値は文字列として Grok パーサーに送信する必要があります。

パースルールは、`%{MATCHER:EXTRACT:FILTER}` の構文で記述できます。

* **Matcher**: 期待する内容 (数値、単語、スペース以外など) を記述する規則 (または別のトークン規則への参照)

* **Extract** (オプション): *マッチャー*と一致するテキストをキャプチャする対象を表す識別子

* **Filter** (オプション): 一致したテキストを変換するためのポストプロセッサー

典型的な非構造化イベントの例

```text
john connected on 11/08/2017
```

これに次のパース規則を使用します。

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

処理後は、次のような構造化イベントが生成されます。

{{< img src="logs/processing/processors/_parser.png" alt="パースの例 1" style="width:80%;">}}

**注**:

* 1 つの Grok パーサーに複数のパース規則がある場合:
  * 特定のイベントに一致するルールは 1 つだけです。上から下の順で最初に一致するルールが、パースを行うルールになります。
  * 各ルールは上記のリストに定義されたパースルールを参照します。
* 同一の Grok パーサー内では同じ規則名を複数使用できません。
* ルール名に含めることができるのは、英数字、`_`、および `.` だけです。英数字で始まる必要があります。
* 値がヌルまたは空欄のプロパティは表示されません。
* 正規表現マッチャーは、文字列の先頭に一致するように暗黙の `^` を適用し、文字列の末尾に一致するように `$` を適用します。
* 特定のイベントは大きな空白のギャップを生成することがあります。改行と空白には、それぞれ `\n` と `\s+` を使います。

### マッチャーとフィルター{#matcher-and-filter}

以下に、Datadog でネイティブに実装されるすべてのマッチャーとフィルターを示します。

{{< tabs >}}
{{% tab "マッチャー" %}}

`date("pattern"[, "timezoneId"[, "localeId"]])`
: たパターンの日付に一致し、Unix タイムスタンプを生成するようにパースします。[日付マッチャーの例を参照してください](#parsing-dates)。

`regex("pattern")`
: 正規表現に一致します。[正規表現マッチャーの例をチェックしてください](#regex)。

`notSpace`
: 次のスペースまでの文字列に一致します。

`boolean("truePattern", "falsePattern")`
: ブール値に一致してパースします。オプションとして、true と false のパターンを定義できます (デフォルトは `true` と `false`、大文字と小文字は区別されません)。

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
: スペースと改行を含め、任意の文字列に一致します。正規表現では `.*` に相当します。上記のパターンがどれも該当しない場合に使用します。

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
: 適切にフォーマットされた JSON をパースします。

`rubyhash`
: `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`など、適切な形式の Ruby ハッシュをパースします。

`useragent([decodeuricomponent:true/false])`
: user-agent をパースし、Agent によって表されるデバイス、OS、およびブラウザを含む JSON オブジェクトを返します。[User Agent プロセッサーをチェックしてください][1]。

`querystring`
: 一致する URL クエリ文字列内に含まれる、キーと値のペアすべてを抽出します (`?productId=superproduct&promotionCode=superpromo` など)。

`decodeuricomponent`
: URI コンポーネントをデコードします。たとえば、`%2Fservice%2Ftest` を `/service/test` に変換します。

`lowercase`
: 小文字に変換した文字列を返します。

`uppercase`
: 大文字に変換した文字列を返します。

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: キーと値のパターンを抽出して JSON オブジェクトを返します。[キーと値のフィルターの例](#key-value-or-logfmt) を参照してください。

`xml`
: 適切な形式の XML をパースします。[XML フィルターの例](#parsing-xml) を参照してください。

`csv(headers[, separator[, quotingcharacter]])`
: 適切にフォーマットされた CSV または TSV 行をパースします。[CSV フィルターの例](#parsing-csv) を参照してください。

`scale(factor)`
: 抽出された数値を指定された係数で乗算します。

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
: トークンの文字列シーケンスをパースして、配列として返します。[リストを配列に](#list-to-array) の例を参照してください。

`url`
: URL をパースし、トークン化されたすべてのメンバー (ドメイン、クエリパラメーター、ポートなど) を 1 つの JSON オブジェクトとして返します。
{{% /tab %}}
{{< /tabs >}}

## 高度な設定 {#advanced-settings}

Grok プロセッサータイルの下部に、**Advanced Settings** セクションがあります。

{{< img src="logs/processing/parsing/advanced_settings.png" alt="高度な設定" style="width:80%;">}}

### 特定のテキスト属性をパース {#parsing-a-specific-text-attribute}

**Extract from** フィールドを使用して、デフォルトの `message` 属性ではなく、指定されたテキスト属性に Grok プロセッサを適用します。

たとえば、キー-値としてパースする `command.line` 属性を含むイベントを考慮します。このイベントは次のようにパースできます。

{{< img src="logs/processing/parsing/parsing_attribute.png" alt="コマンドラインのパース" style="width:80%;">}}

### ヘルパールールを使用して複数のパースルールを再利用する {#using-helper-rules-to-factorize-multiple-parsing-rules}

**Helper Rules** フィールドを使用して、パースルールのトークンを定義します。ヘルパールールは、パースルール全体で Grok パターンを再利用できるようにします。これは、同じ Grok パーサー内にある複数のルールが同じトークンを使用する場合に便利です。

典型的な非構造化イベントの例

```text
john id:12345 connected on 11/08/2017 on server XYZ in production
```

次のパースルールを使用します。

```text
MyParsingRule %{user} %{connection} %{server}
```

次のヘルパーと組み合わせます。

```text
user %{word:user.name} id:%{integer:user.id}
connection connected on %{date("MM/dd/yyyy"):connect_date}
server on server %{notSpace:server.name} in %{notSpace:server.env}
```

{{< img src="logs/processing/parsing/helper_rules.png" alt="ヘルパールール" style="width:80%;">}}

## 例 {#examples}

以下に、パーサーの具体的な使用例をいくつか挙げます。

* [キー値または logfmt](#key-value-or-logfmt)
* [日付のパース](#parsing-dates)
* [交互パターン](#alternating-pattern)
* [オプションの属性](#optional-attribute)
* [ネストされた JSON](#nested-json)
* [正規表現](#regex)
* [リストと配列](#list-to-array)
* [Glog 形式](#glog-format)
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

### キー値または logfmt {#key-value-or-logfmt}

これはキー-値コアフィルターです: `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`。ここで:

* `separatorStr`: キーと値を区切るセパレーターを定義します。デフォルトは `=` です。
* `characterAllowList`: デフォルトの `\\w.\\-_@` に加えて、エスケープされない値の文字を追加で定義します。非引用符の値のみに使用されます (例: `key=@valueStr`)。
* `quotingStr`: 引用符を定義し、デフォルトの引用符検出 `<>`、`""`、`''` を置き換えます。
* `delimiter`: 異なるキー値ペアのセパレーターを定義します (例: `|` は `key1=value1|key2=value2` の区切り文字)。デフォルトは ` ` (通常のスペース)、`,` および `;` です。

**keyvalue** などのフィルターを使用すると、keyvalue または logfmt 形式の属性に文字列をより簡単にマップできます。

**イベント:**

```text
user=john connect_date=11/08/2017 id=123 action=click
```

**ルール:**

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="パースの例 2" style="width:80%;">}}

パラメーター名を指定する必要はありません。すでにイベントに含まれています。
ルールパターンに **extract** の属性 `my_attribute` を追加すると、次のように表示されます。

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="パースの例 2 (追加)" style="width:80%;">}}

`=` がキーと値の間のデフォルトのセパレーターでない場合は、セパレーターを指定してパースルールにパラメーターを追加してください。

**イベント:**

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

**ルール:**

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="キー値パーサー" style="width:80%;" >}}

イベントの属性値に、URL の `/` などの特殊文字が含まれる場合は、それをパース規則の許可リストに追加します。

**イベント:**

```text
url=https://app.datadoghq.com/event/stream user=john
```

**ルール:**

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_allowlist.png" alt="キー値許可リスト" style="width:80%;" >}}

その他の例:

| **生文字列**               | **パースルール**                                      | **結果**                            |
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

**複数の引用文字列の例**: 複数の引用文字列が定義されている場合、デフォルトの動作は定義されている引用符文字に置き換えられます。
キー値は、`quotingStr` に指定された内容に関係なく、引用符文字がない入力と常に一致します。引用符文字が使用されている場合、`characterAllowList` は無視され、引用符文字の間にあるすべてが抽出されます。

**イベント:**

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
* `data` オブジェクトで *keyvalue* フィルターを定義する場合にこのフィルターが一致しないなら、空の JSON `{}` が返されます (例: 入力: `key:=valueStr`、パースルール: `rule_test %{data::keyvalue("=")}`、出力: `{}`)。
* `""` を `quotingStr` と定義すると、引用符のデフォルト設定が保持されます。

### 日付のパース{#parsing-dates}

日付マッチャーは、タイムスタンプを EPOCH 形式 (**ミリ秒**計測単位) に変換します。

| **生文字列**                       | **パースルール**                                          | **結果**              |
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

<sup>1</sup> 独自のローカライズを実行し、タイムスタンプが UTC で_ない_場合は、`timezone` パラメーターを使用してください。
サポートされているタイムゾーンの形式は次のとおりです。

* `GMT`、`UTC`、`UT`、または`Z`
* `+h`、`+hh`、`+hh:mm`、`-hh:mm`、`+hhmm`、`-hhmm`、`+hh:mm:ss`、`-hh:mm:ss`、`+hhmmss` または `-hhmmss`。最大サポート範囲は +18:00 から 18:00 まで (両端を含む) です。
* `UTC+`、`UTC-`、`GMT+`、`GMT-`、`UT+`、または `UT-` で始まるタイムゾーン。最大サポート範囲は +18:00 から 18:00 まで (両端を含む) です。
* TZ データベースから取得したタイムゾーン ID。詳細については、[TZ データベース名][2]を参照してください。

**注**: 日付をパースしても、その値がイベントの公式日付として設定されることは**ありません**。公式日付にするには、後続のプロセッサで[イベント日付リマッパー][3]を使用してください。

### 交互パターン {#alternating-pattern}

イベントの形式が 2 通りあり、1 つの属性だけで異なる場合は、交互に `(<REGEX_1>|<REGEX_2>)` を使用して 1 つのルールを設定します。このルールは、ブール OR に相当します。

**イベント**:

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

**ルール**:
"id" は整数であり、文字列ではないことに注意してください。

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

**結果**:

{{< img src="logs/processing/parsing/parsing_example_4.png" alt="パースの例 4" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_4_bis.png" alt="パースの例 4 (追加)" style="width:80%;" >}}

### オプションの属性 {#optional-attribute}

一部のイベントには、常には表示されない値が含まれています。この場合、`()?` を使用して属性抽出をオプションにします。

**イベント**:

```text
john 1234 connected on 11/08/2017
```

**ルール**:

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**注**: 任意のセクションで先頭の単語の後ろにスペースを含めると、ルールは一致しません。

{{< img src="logs/processing/parsing/parsing_example_5.png" alt="パースの例 5" style="width:80%;" >}}

{{< img src="logs/processing/parsing/parsing_example_5_bis.png" alt="パースの例 5 (追加)" style="width:80%;" >}}

### ネストされた JSON {#nested-json}

生のテキストプレフィックスの後でネストされている JSON オブジェクトをパースするには、`json` フィルターを使用します。

**イベント**:

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**ルール**:

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="ネストされた JSON パースの例" style="width:80%;" >}}

### 正規表現 {#regex}

**イベント**:

```text
john_1a2b3c4 connected on 11/08/2017
```

**ルール**:

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="パースの例 6" style="width:80%;" >}}

### リストから配列へ {#list-to-array}

`array([[openCloseStr, ] separator][, subRuleOrFilter)` フィルターを使い、リストを 1 つの属性の配列形式でリストを取り出します。`subRuleOrFilter` はオプションであり、これらの[フィルター][4]を受け入れます。

**イベント**:

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

**ルール**:

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

{{< img src="logs/processing/parsing/array_parsing.png" alt="パースの例 6" style="width:80%;" >}}

**イベント**:

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

**ルール**:

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**ルールで使用するもの`subRuleOrFilter`**:

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

### Glog 形式 {#glog-format}

Kubernetes コンポーネントは時々 `glog` 形式でログを記録します。この例は、パイプラインライブラリの Kube Scheduler アイテムからのものです。

イベント例:

```text
W0424 11:47:41.605188       1 authorization.go:47] Authorization is disabled
```

パースの例:

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

**イベント:**

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

* XML の 2 つのタグの間に属性と文字列値の両方を持つタグが含まれている場合、`value` 属性が生成されます。たとえば、`<title lang="en">Harry Potter</title>` は `{"title": {"lang": "en", "value": "Harry Potter" } }` に変換されます。
* 繰り返しタグは自動的に配列に変換されます。たとえば、`<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` は `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }` に変換されます。

### CSV のパース {#parsing-csv}

**CSV** フィルターを使用して、文字列を属性に簡単にマップできます。対象のデータは任意の文字で区切る必要があります (デフォルトでは `,`)。

CSV フィルターは `csv(headers[, separator[, quotingcharacter]])` として定義されています。ここで、

* `headers`: キーの名前を `,` で区切って定義します。キー名はアルファベットで始まり、`_` に加えて任意の英数字を含むことができます。
* `separator`: 異なる値を区切るために使用される区切り文字を定義します。1 文字のみが受け入れられます。デフォルト: `,`。**注**: TSV のタブ文字を表す `tab` を `separator` として使用します。
* `quotingcharacter`: 引用符文字を定義します。1 文字のみが受け入れられます。デフォルト: `"`

**注**:

* 区切り文字を含む値は引用符で囲む必要があります。
* 引用符文字を含む引用された値は、引用符文字でエスケープする必要があります。たとえば、引用された値内にある `""` は `"` を表します。
* ヘッダーに含まれるキー数と同じ個数の値がイベントに含まれていない場合、CSV パーサーは最初に出現する値とのマッチングを行います。
* 整数と浮動小数点数は、可能な場合自動でキャストされます。

**イベント**:

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

| **生文字列**               | **パースルール**                                                         | **結果**                                      |
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

必要な部分を解析した後、その後のテキストが破棄しても安全であることがわかっているイベントがある場合、データマッチャーを使用して破棄することができます。次のイベントの例では、`data` マッチャーを使用して、末尾の `%` を削除することができます。

**イベント**:

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

イベントに ASCII 制御文字が含まれている場合、それらは取り込み時にシリアライズされます。これらは、grok パーサー内でシリアライズされた値を明示的にエスケープすることで処理できます。


[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /ja/events/pipelines_and_processors/date_remapper
[4]: /ja/events/pipelines_and_processors/grok_parser/?tab=filters&tabs=filters#matcher-and-filter