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
- link: https://learn.datadoghq.com/courses/log-pipelines
  tag: ラーニングセンター
  text: ログパイプラインの構築と変更方法について
- link: /logs/log_configuration/processors
  tag: よくあるご質問
  text: ログの処理方法
- link: https://www.youtube.com/watch?v=AwW70AUmaaQ&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=3
  tag: ビデオ
  text: 'Datadog のヒントとコツ: Grok パースを使用してログからフィールドを抽出する'
- link: /logs/faq/how-to-investigate-a-log-parsing-issue/
  tag: よくあるご質問
  text: ログのパースに関する問題を調査する方法
- link: /logs/guide/log-parsing-best-practice/
  tag: よくあるご質問
  text: ログのパース - ベストプラクティス
- link: /logs/logging_without_limits/
  tag: よくあるご質問
  text: Datadog でインデックス化するログの量の制御
title: パース
---
{{< learning-center-callout header="学習センターで Grok パースを試す" btn_title="今すぐ登録" btn_url="https://learn.datadoghq.com/courses/log-pipelines">}}
  ログパイプラインの構築と修正を学び、Pipeline Scanner で管理し、一貫性を得られるよう処理されたログ全体で属性名を標準化します。
{{< /learning-center-callout >}}

概要

Datadog は自動的に JSON 形式のログをパースします。他の形式については、Datadog で Grok Parser の助けを借りてログを強化することができます。
Grok 構文により、純粋な正規表現よりも簡単にログをパースすることができます。Grok Parser を使用して、半構造化テキストメッセージから属性を抽出できます。

Grok に付属している再利用可能なパターンで、整数、IP アドレス、ホスト名などをパースできます。これらの値は文字列として grok パーサーに送られなければなりません。

`%{MATCHER:EXTRACT:FILTER}` 構文を使用してパースルールを記述できます：

**Matcher**: 期待する内容 (数値、単語、スペース以外など) を記述する規則 (または別のトークン規則への参照)

**Extract** (任意): *Matcher* と一致するテキストをキャプチャする対象を表す識別子。

**Filter** (任意): 一致したテキストを変換するためのポストプロセッサー。

典型的な非構造化ログの例:

```text
john connected on 11/08/2017
```

これに次のパースルールを使用します。

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):date}
```

処理後は、次のような構造化ログが生成されます。

```json
{
  "user": "john",
  "date": 1575590400000
}
```

**注**:

1 つの Grok パーサーに複数のパース規則がある場合
  * 特定のログに一致するルールは 1 つだけです。上から下の順で最初に一致するルールが、パースを行うルールになります。
  各規則は上記のリストに定義されたパースを参照します。
同一の Grok パーサー内では同じ規則名を複数使用できません。
* ルール名には、英数字、`_`、および`.` のみを含める必要があります。英数字で始まる必要があります。
値がヌルまたは空欄のプロパティは表示されません。
パーシング ルールはログ エントリ全体にマッチするよう定義する必要があります。各ルールはログの先頭から末尾まで適用されるためです。
* 特定のログは大きな空白のギャップを生成することがあります。`\n` と `\s+` を使用して、改行と空白を考慮してください。

マッチャーとフィルター

<div class="alert alert-danger">Grok パース機能は <em>クエリタイム</em> ( <a href="/logs/explorer/calculated_fields/">エクスプローラー</a>内) で利用可能で、限られたサブセットのマッチャー (<strong>データ</strong>、 <strong>整数</strong>、 <strong>notSpace</strong>、 <strong>数値</strong>、および <strong>単語</strong>) とフィルター (<strong>数値</strong> と <strong>整数</strong>) をサポートしています。<br><br>
次のフルセットのマッチャーとフィルターは、<em>インジェストタイム</em> <a href="/logs/log_configuration/processors/?tab=ui#grok-parser">Grok Parser</a> 機能に固有のものです。</div>

下記に、Datadog によりネイティブ実装されるすべてのマッチャーとフィルターをリストします。

{{< tabs >}}
{{% tab "マッチャー" %}}

**クエリタイムおよびインジェストタイムのマッチャー：**

次のマッチャーは、クエリタイムパース (エクスプローラー) とインジェストタイムパース (Grok Parser) の両方で利用可能です：

`word`
: 単語_に一致します。単語境界で始まり、a-z、A-Z、0-9 の文字と `_` (アンダースコア) 文字を含み、単語境界で終わります。正規表現では `.*` に相当します。

`notSpace`
次のスペースまでの文字列に一致します。

`number`
10 進浮動小数点数に一致し、それを倍精度数としてパースします。

`integer`
整数に一致し、それを整数としてパースします。

`data`
: スペースと改行を含め、任意の文字列に一致します。正規表現では `.*` に相当します。上記のパターンがどれも該当しない場合に使用します。

**インジェストタイム専用のマッチャー：**

次のマッチャーは、Grok Parser プロセッサを使用したインジェストタイムパース専用で、エクスプローラーでは使用できません：

`date("pattern"[, "timezoneId"[, "localeId"]])`
: 指定されたパターンの日付に一致し、Unix タイムスタンプを生成するようにパースします。[日付マッチャーの例を参照してください](#parsing-dates)。

`regex("pattern")`
: 正規表現に一致します。[正規表現マッチャーの例をチェックしてください](#regex)。

`boolean("truePattern", "falsePattern")`
: ブール値に一致してパースします。true と false のパターンをオプションで定義できます (デフォルトは `true` と `false`、大文字と小文字は区別されません)。

`numberStr`
10 進浮動小数点数に一致し、それを文字列としてパースします。

`numberExtStr`
(指数表記の) 浮動小数点数に一致し、それを文字列としてパースします。

`numberExt`
(指数表記の) 浮動小数点数に一致し、それを倍精度数としてパースします。

`integerStr`
整数に一致し、それを文字列としてパースします。

`integerExtStr`
(指数表記の) 整数に一致し、それを文字列としてパースします。

`integerExt`
(指数表記の) 整数に一致し、それを整数としてパースします。

`doubleQuotedString`
二重引用符で囲まれた文字列に一致します。

`singleQuotedString`
単一引用符で囲まれた文字列に一致します。

`quotedString`
二重引用符または単一引用符で囲まれた文字列に一致します。

`uuid`
UUID に一致します。

`mac`
MAC アドレスに一致します。

`ipv4`
IPV4 に一致します。

`ipv6`
IPV6 に一致します。

`ip`
IP (v4 または v6) に一致します。

`hostname`
ホスト名に一致します。

`ipOrHost`
ホスト名または IP に一致します。

`port`
ポート番号に一致します。

{{% /tab %}}
{{% tab "フィルター" %}}

**クエリタイムおよびインジェストタイムのフィルター：**

次のフィルターは、クエリタイムパース (ログエクスプローラー) とインジェストタイムパース (Grok Parser) の両方で利用可能です：

`number`
一致部分を倍精度数としてパースします。

`integer`
一致部分を整数としてパースします。

**インジェストタイム専用のフィルター：**

次のフィルターは、Grok Parser プロセッサを使用したインジェストタイムパース専用で、エクスプローラーでは使用できません：

`boolean`
大文字と小文字を区別しないで、'true' および 'false' 文字列をブール値としてパースします。

`nullIf("value")`
一致部分が指定された値に等しい場合は null を返します。

`json`
適切な形式の JSON をパースします。

`rubyhash`
: 適切にフォーマットされた Ruby ハッシュをパースします。例えば、`{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`。

`useragent([decodeuricomponent:true/false])`
: User-Agent をパースして、エージェントによって表されるデバイス、OS、ブラウザを含む JSON オブジェクトを返します。[User Agent プロセッサーをチェックしてください][1]。

`querystring`
: 一致する URL クエリ文字列内のすべてのキー値ペアを抽出します (例: `?productId=superproduct&promotionCode=superpromo`)。

`decodeuricomponent`
: URI コンポーネントをデコードします。例えば、`%2Fservice%2Ftest` を `/service/test` に変換します。

`lowercase`
小文字に変換した文字列を返します。

`uppercase`
大文字に変換した文字列を返します。

`keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])`
: key-value パターンを抽出して JSON オブジェクトを返します。[キー値フィルターの例](#key-value-or-logfmt)を参照してください。

`xml`
: 適切にフォーマットされた XML をパースします。[XML フィルターの例](#parsing-xml)を参照してください。

`csv(headers[, separator[, quotingcharacter]])`
: 適切にフォーマットされた CSV または TSV 行をパースします。[CSV フィルターの例](#parsing-csv)を参照してください。

`scale(factor)`
抽出された数値を指定された factor で乗算します。

`array([[openCloseStr, ] separator][, subRuleOrFilter)`
文字列トークンシーケンスをパースして配列として返します。[リストから配列への](#list-to-array)例を参照してください。

`url`
: URL をパースし、トークン化されたすべてのメンバー (ドメイン、クエリパラメーター、ポートなど) を 1 つの JSON オブジェクトとして返します。[URL のパース方法を参照してください][2]。

[1]: /ja/logs/log_configuration/processors/#user-agent-parser
[2]: /ja/logs/log_configuration/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

高度な設定

Grok プロセッサの下部にある **高度な設定** セクションを使用して、デフォルトの `message` 属性ではなく特定の属性をパースするか、複数のパースルールで共通のパターンを再利用するヘルパールールを定義します。

特定のテキスト属性をパース

**Extract from** フィールドを使用して、デフォルトの `message` 属性ではなく、指定されたテキスト属性に Grok プロセッサを適用します。

例えば、キー値としてパースする `command.line` 属性を含むログを考慮します。`command.line` から抽出して、その内容をパースし、そのコマンドデータから構造化された属性を作成します。

{{< img src="/logs/processing/parsing/grok_advanced_settings_extract.png" alt="command.line 属性から抽出する高度な設定の例" style="width:80%;">}}

### ######  共通パターンを再利用するためのヘルパールールの使用

[**Helper Rules**] フィールドを使用して、パースルールのトークンを定義します。ヘルパールールを使用すると、パースルール全体で共通する Grok パターンを再利用できます。これは、同じ Grok パーサー内にある複数のルールが同じトークンを使用する場合に便利です。

典型的な非構造化ログの例:

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

**例**:

下記に、パーサーの具体的な使用例をいくつか挙げます。

キー値または logfmt
日付のパース
交互パターン
オプションの属性
ネストされた JSON
正規表現
List and Arrays
GLog 形式
* [XML](#parsing-xml)
* [CSV](#parsing-csv)

キー値または logfmt

これがキー値コアフィルターです: `keyvalue([separatorStr[, characterAllowList[, quotingStr[, delimiter]]]])` で、

* `separatorStr`: キーと値の間のセパレーターを定義します。デフォルトは `=` です。
* `characterAllowList`: デフォルトの `\\w.\\-_@` に加えて、エスケープされていない追加の値文字を定義します。引用符のない値のみに使用されます (例: `key=@valueStr`)。
* `quotingStr`: 引用符を定義し、デフォルトの引用符検出 `<>`、`""`、`''` を置き換えます。
* `delimiter`: 異なるキー値ペアのセパレーターを定義します (例: `|` は `key1=value1|key2=value2` の区切り文字です)。デフォルトは ` ` (通常のスペース)、`,` および `;` です。

**keyvalue** などのフィルターを使用すると、keyvalue または logfmt 形式の属性に文字列をより簡単にマップできます:

Log

```text
user=john connect_date=11/08/2017 id=123 action=click
```

rule: |

```text
rule %{data::keyvalue}
```

パラメーター名を指定する必要はありません。すでにログに含まれています。
ルールパターンに **extract** 属性 `my_attribute` を追加すると、次のように表示されます:

```json
{
  "my_attribute": {
    "user": "john",
    "id": 123,
    "action": "click"
  }
}
```

キーと値を区切るデフォルトのセパレーターが `=` でない場合は、セパレーターとともにパラメーターをパース規則に追加します。

Log

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

rule: |

```text
rule %{data::keyvalue(": ")}
```

ログの属性値に、URL の `/` などの特殊文字が含まれる場合は、それをパース規則の許可リストに追加します。

Log

```text
url=https://app.datadoghq.com/event/stream user=john
```

rule: |

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

**複数の引用文字列の例**: 複数の引用文字列が定義されている場合、デフォルトの動作は定義されている引用符文字に置き換えられます。
キー値は、`quotingStr` に指定された内容に関係なく、引用符文字がない入力と常に一致します。引用符文字が使用されている場合、`characterAllowList` は無視され、引用符文字の間にあるすべてが抽出されます。

Log

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

rule: |

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

**結果**

  ```json
  {"key1": "valueStr", "key2": "/valueStr2"}
  ```

**注**:

* 空の値 (`key=`) または `null` の値 (`key=null`) は出力 JSON に表示されません。
*  `data` オブジェクトで *keyvalue* フィルターを定義し、このフィルターが一致しない場合、空の JSON `{}` が返されます (例: 入力: `key:=valueStr`、パースルール: `rule_test %{data::keyvalue("=")}`、出力: `{}`)。
*  `""` を `quotingStr` に定義すると、引用符のデフォルト設定が保持されます。

日付のパース

日付マッチャーは、タイムスタンプを EPOCH 形式  ( **millisecond** 計測単位) に変換します。

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

<sup>1</sup> 独自のローカライズを実行し、タイムスタンプが _ UTC で_ない場合は、`timezone` パラメーターを使用してください。
サポートされているタイムゾーンの形式は次のとおりです。

`, `OR`
最大サポート範囲は +18:00 から 18:00 まで (両端を含む) です。
* タイムゾーン（`UTC+`、`UTC-`、`GMT+`、`GMT-`、`UT+`、または `UT-` で始まる）。最大サポート範囲は +18:00 から 18:00 まで (両端を含む) です。
* TZ データベースから取得したタイムゾーン ID。詳細については、[TZ データベース名][2]を参照してください。

**注**: 日付をパースしても、その値がログの公式日付として設定されることは**ありません**。公式日付にするには、後続のプロセッサで[ログ日付リマッパー][3]を使用してください。

交互パターン

ログの形式が 2 通りあり、1 つの属性だけで異なる場合は、交互に `(|)` を使用して 1 つのルールを設定します。このルールは、ブール OR に相当します。

Log

```text
john connected on 11/08/2017
12345 connected on 11/08/2017
```

rule: |
"id" は整数であり、文字列ではないことに注意してください。

```text
MyParsingRule (%{integer:user.id}|%{word:user.firstname}) connected on %{date("MM/dd/yyyy"):connect_date}
```

結果
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

オプションの属性

一部のログには、常には表示されない値が含まれています。この場合、`()?` を使用して属性抽出をオプションにします。

Log

```text
john 1234 connected on 11/08/2017
john connected on 11/08/2017
```

rule: |

```text
MyParsingRule %{word:user.firstname} (%{integer:user.id} )?connected on %{date("MM/dd/yyyy"):connect_date}
```

**注**: 任意のセクションで先頭の単語の後ろにスペースを含めると、規則は一致しません。

**結果**
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

ネストされた JSON

生のテキストプレフィックスの後にネストされた JSON オブジェクトをパースするには、`json` フィルターを使用します:

Log

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

rule: |

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

**結果**

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

正規表現

Log

```text
john_1a2b3c4 connected on 11/08/2017
```

rule: |

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

**結果**

```json
{
  "user": {
    "firstname": "john",
    "id": "1a2b3c4"
  }
}
```

リストから配列へ

`array([[openCloseStr, ] separator][, subRuleOrFilter)` フィルターを使用して、リストを 1 つの属性の配列に抽出します。`subRuleOrFilter` はオプションで、これらの [フィルター][4] を受け入れます。

Log

```text
Users [John, Oliver, Marc, Tom] have been added to the database
```

rule: |

```text
myParsingRule Users %{data:users:array("[]",",")} have been added to the database
```

**結果**

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

Log

```text
Users {John-Oliver-Marc-Tom} have been added to the database
```

rule: |

```text
myParsingRule Users %{data:users:array("{}","-")} have been added to the database
```

**`subRuleOrFilter`** を使用したルール:

```text
myParsingRule Users %{data:users:array("{}","-", uppercase)} have been added to the database
```

GLog 形式

Kubernetes コンポーネントは時々 `glog` 形式でログを記録します。この例は、パイプラインライブラリの Kube Scheduler アイテムからのものです。

ログラインの例、

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

パース XML

XML パーサーは、XML 形式のメッセージを JSON に変換します。

Log

```text
<book category="CHILDREN">
  <title lang="en">Harry Potter</title>
  <author>J K. Rowling</author>
  <year>2005</year>
</book>
```

rule: |

```text
rule %{data::xml}
```

**結果**

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

*  XML に、2 つのタグの間に属性と文字列値の両方を持つタグが含まれている場合、`value` 属性が生成されます。例えば: `<title lang="en">Harry Potter</title>` は `{"title": {"lang": "en", "value": "Harry Potter" } }` に変換されます。
* 繰り返しタグは自動的に配列に変換されます。例えば: `<bookstore><book>Harry Potter</book><book>Everyday Italian</book></bookstore>` は `{ "bookstore": { "book": [ "Harry Potter", "Everyday Italian" ] } }` に変換されます。

CSV をパースする

**CSV** フィルターを使用して、文字列を属性に簡単にマップできます。対象のデータは任意の文字で区切る必要があります (デフォルトでは `,` ) 。

CSV フィルターは `csv(headers[, separator[, quotingcharacter]])` として定義され、次のようになります:

* `headers`: `,` で区切られたキーの名前を定義します。キー名はアルファベットで始まり、`_` に加えて任意の英数字を含むことができます。
* `separator`: 異なる値を区切るために使用される区切り文字を定義します。1 文字のみが受け入れられます。既定値:**注**: TSV のタブ文字を表す `tab` を `separator` として使用します。
* `quotingcharacter`: 引用符文字を定義します。1 文字のみが受け入れられます。既定値:

**注**:

区切り文字を含む値は引用符で囲む必要があります。
* 引用符文字を含む引用された値は、引用符文字でエスケープする必要があります。たとえば、引用された値内にある `""` は `"` を表します。
ヘッダーに含まれるキー数と同じ個数の値がログに含まれていない場合、CSV パーサーは最初に出現する値とのマッチングを行います。
* 整数と浮動小数点数は、可能な場合、自動的にキャストされます。

Log

{{< code-block lang="text" >}}
John,Doe,120,Jefferson St.,Riverside
{{< /code-block >}}

rule: |

{{< code-block lang="text" >}}
myParsingRule %{data:user:csv("first_name,name,st_nb,st_name,city")}
{{< /code-block >}}

**結果**

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

data matcher を使用して、不要なテキストを破棄する

ログに必要な部分を解析した後、その後のテキストが破棄しても安全であることがわかっている場合、データマッチャーを使用して破棄することができます。次のログの例では、`data` マッチャーを使用して、末尾の `%` を破棄することができます。

Log

```
Usage: 24.3%
```

rule: |

```
MyParsingRule Usage\:\s+%{number:usage}%{data:ignore}
```

**結果**

```
{
  "usage": 24.3,
  "ignore": "%"
}
```

ASCII 制御文字

ログに ASCII 制御文字が含まれている場合、それらは取り込み時にシリアライズされます。これらは、grok パーサー内でシリアライズされた値を明示的にエスケープすることで処理できます。

参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/google/re2/wiki/Syntax
[2]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[3]: /ja/logs/log_configuration/processors/#log-date-remapper
[4]: /ja/logs/log_configuration/parsing/?tab=filters&tabs=filters#matcher-and-filter