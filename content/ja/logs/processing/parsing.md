---
title: パース
kind: documentation
description: Grok プロセッサーを使用してログをパースする
aliases:
  - /ja/logs/parsing/
further_reading:
  - link: logs/processing/processors
    tag: Documentation
    text: ログの処理方法
  - link: logs/faq/how-to-investigate-a-log-parsing-issue
    tag: FAQ
    text: ログのパースに関する問題を調査する方法
  - link: /logs/guide/log-parsing-best-practice/
    tag: FAQ
    text: ログのパース - ベストプラクティス
  - link: logs/logging_without_limits
    tag: Documentation
    text: Datadog でインデックス化するログの量を制御する
---
## 概要

Datadog は JSON 形式のログを自動的にパースしますが、その他の形式の場合は、Grok パーサーを利用してログを補完できます。
Grok 構文は、標準の正規表現より簡単にログをパースする方法を提供します。Grok パーサーにより、半構造化されたテキストメッセージから属性を抽出できます。

Grok には再利用可能なパターンが付属しており、整数、IP アドレス、ホスト名などをパースするために使用できます。

パース規則は、`%{MATCHER:EXTRACT:FILTER}` 構文を使用して記述できます。

* **Matcher**: 期待する内容 (数値、単語、スペース以外など) を記述する規則 (または別のトークン規則への参照)

* **Extract** (任意): *Matcher* と一致するテキストをキャプチャする対象を表す識別子。

* **Filter** (任意): 一致したテキストを変換するためのポストプロセッサー。

典型的な非構造化ログの例

```text
john connected on 11/08/2017
```

これに次のパース規則を使用します。

```text
MyParsingRule %{word:user} connected on %{date("MM/dd/yyyy"):connect_date}
```

処理後は、次のような構造化ログが生成されます。

{{< img src="logs/processing/parsing/parsing_example_1.png" alt="パース例 1" style="width:80%;">}}

**注**:

* 1 つの Grok パーサーに複数のパース規則がある場合
  * 特定のログに一致する規則は 1 つだけです。上から下へ参照し、最初に一致した規則がパースを行う規則になります。
  * 各規則は上記のリストに定義されたパースを参照します。
* 同一の Grok パーサー内では同じ規則名を複数使用できません。
* 規則名には英数字、アンダースコア (_)、ピリオド (.) のみ使用できます。最初の文字は英数字でなければなりません。
* 値が null または空欄のプロパティは表示されません。

### マッチャーとフィルター

以下に、Datadog でネイティブに実装されるすべてのマッチャーとフィルターを示します。

{{< tabs >}}
{{% tab "Matcher" %}}

|                                                 |                                                                                                                                    |
|:------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------|
| **パターン**                                     | **使用方法**                                                                                                                          |
| `date("pattern"[, "timezoneId"[, "localeId"]])` | 指定されたパターンを持つ日付に一致してパースし、Unix タイムスタンプを生成します。[日付マッチャーの例を参照してください](#parsing-dates)。 |
| `regex("pattern")`                              | 正規表現に一致します。[正規表現マッチャーの例を参照してください](#regex)。                                                                       |
| `data`                                          | スペースと改行を含め、任意の文字列に一致します。`.*` と同じです。                                                              |
| `notSpace`                                      | 次のスペースまでの文字列に一致します。                                                                                           |
| `boolean("truePattern", "falsePattern")`        | ブール値に一致してパースします。true と false のパターンをオプションで定義できます (デフォルトは 'true' と 'false'。大文字と小文字は区別されません)。     |
| `numberStr`                                     | 10 進浮動小数点数に一致し、それを文字列としてパースします。                                                                 |
| `number`                                        | 10 進浮動小数点数に一致し、それを倍精度数としてパースします。                                                |
| `numberExtStr`                                  | (指数表記の) 浮動小数点数に一致し、それを文字列としてパースします。                                      |
| `numberExt`                                     | (指数表記の) 浮動小数点数に一致し、それを倍精度数としてパースします。                     |
| `integerStr`                                    | 整数に一致し、それを文字列としてパースします。                                                                               |
| `integer`                                       | 整数に一致し、それを整数としてパースします。                                                                      |
| `integerExtStr`                                 | (指数表記の) 整数に一致し、それを文字列としてパースします。                                            |
| `integerExt`                                    | (指数表記の) 整数に一致し、それを整数としてパースします。                                   |
| `word`                                          | a から z、A から Z、0 から 9、および _ (アンダースコア) 文字からなる文字列に一致します。                                                     |
| `doubleQuotedString`                            | 二重引用符で囲まれた文字列に一致します。                                                                                                    |
| `singleQuotedString`                            | 単一引用符で囲まれた文字列に一致します。                                                                                                    |
| `quotedString`                                  | 二重引用符または単一引用符で囲まれた文字列に一致します。                                                                                   |
| `uuid`                                          | UUID に一致します。                                                                                                                    |
| `mac`                                           | MAC アドレスに一致します。                                                                                                             |
| `ipv4`                                          | IPV4 に一致します。                                                                                                                   |
| `ipv6`                                          | IPV6 に一致します。                                                                                                                   |
| `ip`                                            | IP (v4 または v6) に一致します。                                                                                                          |
| `hostname`                                      | ホスト名に一致します。                                                                                                                |
| `ipOrHost`                                      | ホスト名または IP に一致します。                                                                                                          |
| `port`                                          | ポート番号に一致します。                                                                                                             |

{{% /tab %}}
{{% tab "Filter" %}}

|                                                                |                                                                                                                                                            |
|:---------------------------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **パターン**                                                    | **使用方法**                                                                                                                                                  |
| `number`                                                       | 一致部分を倍精度数としてパースします。                                                                                                                 |
| `integer`                                                      | 一致部分を整数としてパースします。                                                                                                                       |
| `boolean`                                                      | 大文字と小文字を区別しないで、'true' および 'false' 文字列をブール値としてパースします。                                                                                               |
| `nullIf("value")`                                              | 一致部分が指定された値に等しい場合は null を返します。                                                                                                  |
| `json`                                                         | 適切な形式の JSON をパースします。                                                                                                                            |
| `rubyhash`                                                     | 適切な形式の Ruby ハッシュをパースします (例: `{name => "John", "job" => {"company" => "Big Company", "title" => "CTO"}}`)。                                    |
| `useragent([decodeuricomponent:true/false])`                   | User-Agent をパースして、Agent によって表されるデバイス、OS、ブラウザを含む JSON オブジェクトを返します。[ユーザーエージェントプロセッサーを参照してください][1]。 |
| `querystring`                                                  | 一致する URL クエリ文字列内のすべての key-value ペアを抽出します (例: `?productId=superproduct&amp;promotionCode=superpromo`)。                                 |
| `decodeuricomponent`                                           | URI コンポーネントをデコードします。たとえば、'%2Fservice%2Ftest' は '/service/test' に変換されます。                                                              |
| `lowercase`                                                    | 小文字に変換した文字列を返します。                                                                                                                            |
| `uppercase`                                                    | 大文字に変換した文字列を返します。                                                                                                                            |
| `keyvalue([separatorStr[, characterWhiteList[, quotingStr]]])` | key-value パターンを抽出し、JSON オブジェクトを返します。[key-value フィルターの例](#key-value)を参照してください。                                                         |
| `scale(factor)`                                                | 抽出された数値を指定された factor で乗算します。                                                                                            |
| `array([[openCloseStr, ] separator][, subRuleOrFilter)`        | 文字列トークンシーケンスをパースして配列として返します。                                                                                             |
| `url`                                                          | URL をパースし、トークン化されたすべてのメンバー (ドメイン、クエリパラメーター、ポートなど) を 1 つの JSON オブジェクトとして返します。[URL のパース方法を参照してください][2]。               |

[1]: /ja/logs/processing/processors/#user-agent-parser
[2]: /ja/logs/processing/processors/#url-parser
{{% /tab %}}
{{< /tabs >}}

## 高度な設定

Grok プロセッサータイルの下部に、Advanced Settings セクションがあります。

{{< img src="logs/processing/parsing/advanced_settings.png" alt="詳細設定" style="width:80%;">}}

* **Extract from** フィールドを使用して、デフォルトの `message` 属性ではなく、指定されたテキスト属性に Grok プロセッサを適用します。

* パース規則に使用するトークンを定義するには、**Helper Rules** フィールドを使用します。Helper Rules を使用すると、Grok パターンを複数のパース規則で再利用でき、同じ Grok パーサーの複数の規則で同じトークンを使用する場合に便利です。

典型的な非構造化ログの例

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
* [条件付きパターン](#conditional-pattern)
* [オプションの属性](#optional-attribute)
* [ネストされた JSON](#nested-json)
* [正規表現](#regex)

### キー値または logfmt

これは key-value コアフィルター `keyvalue([separatorStr[, characterWhiteList[, quotingStr]]])` です。

* `separatorStr`: セパレーターを定義します。デフォルト `=`.
* `characterWhiteList`: デフォルトの `\\w.\\-_@` に加え、追加の非エスケープ値文字を定義します。引用符で囲まれていない値 (例: `key=@valueStr`) にのみ使用します。
* `quotingStr`: 引用符を定義し、デフォルトの引用符検出（`<>`、`""`、`''`）を置き換えます。

**keyvalue** などのフィルターを使用すると、keyvalue または logfmt 形式の属性に文字列をより簡単にマップできます。

ログ:

```text
user=john connect_date=11/08/2017 id=123 action=click
```

規則の例

```text
rule %{data::keyvalue}
```

{{< img src="logs/processing/parsing/parsing_example_2.png" alt="パース例 2" style="width:80%;">}}

パラメーターの名前はログに既に含まれているため、指定する必要はありません。
**extract** 属性 `my_attribute` を規則パターンに追加すると、次のようになります。

{{< img src="logs/processing/parsing/parsing_example_2_bis.png" alt="パース例 2 bis" style="width:80%;">}}

キーと値を区切るデフォルトのセパレーターが `=` 以外の場合は、セパレーターとともにパラメーターをパース規則に追加します。

ログ:

```text
user: john connect_date: 11/08/2017 id: 123 action: click
```

規則の例

```text
rule %{data::keyvalue(": ")}
```

{{< img src="logs/processing/parsing/key_value_parser.png" alt="キー値パーサー" style="width:80%;" >}}

ログの属性値に、URL の `/` などの特殊文字が含まれる場合は、それをパース規則のホワイトリストに追加します。

ログ:

```text
url=https://app.datadoghq.com/event/stream user=john
```

規則の例

```text
rule %{data::keyvalue("=","/:")}
```

{{< img src="logs/processing/parsing/key_value_whitelist.png" alt="キー値のホワイトリスト" style="width:80%;" >}}

その他の例

| **文字列の例**  | **パース規則**                    | **結果**           |
|:----------------|:------------------------------------|:---------------------|
| key=valueStr    | `%{data::keyvalue}`                 | {"key": "valueStr}   |
| key=\<valueStr> | `%{data::keyvalue}`                 | {"key": "valueStr"}  |
| key:valueStr    | `%{data::keyvalue(":")}`            | {"key": "valueStr"}  |
| key:"/valueStr" | `%{data::keyvalue(":", "/")}`       | {"key": "/valueStr"} |
| key:={valueStr} | `%{data::keyvalue(":=", "", "{}")}` | {"key": "valueStr"}  |

**Multiple QuotingString の例**: 複数の引用文字列が定義されると、デフォルトの挙動が定義された引用文字に置き換えられます。
`quotingStr` で指定されている値にかかわらず、キーと値は引用文字列が使用されていなくても常に入力と一致します。 引用文字列が使用されている場合、引用符内の文字列がすべて抽出されるため、`characterWhiteList` は無視されます。

ログ:

  ```text
  key1:=valueStr key2:=</valueStr2> key3:="valueStr3"
  ```

規則の例

  ```text
  rule %{data::keyvalue(":=","","<>")}
  ```

結果:

  ```json
  {
    "key1": "valueStr",
    "key2": "/valueStr2"
  }
  ```

**注**:

* 値が空 (`key=`) または `null` (`key=null`) の場合、出力される JSON に表示されません。
* `data` オブジェクトで *keyvalue* フィルターを定義する場合で、このフィルターが一致しない時は、空の JSON `{}` が返されます (例: 入力: `key:=valueStr`、パース規則: `rule_test %{data::keyvalue("=")}`、出力: `{}`)。

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
| Thu Jun 16 08:29:03 2016<sup>1</sup> | `%{date("EEE MMM dd HH:mm:ss yyyy","Europe/Paris"):date}` | {"date": 1466058543000} |
| 2007-08-31 19:22:22.427 ADT          | `%{date("yyyy-MM-dd HH:mm:ss.SSS z"):date}`               | {"date": 1188598942427} |

<sup>1</sup> 独自のローカライズを実行し、タイムスタンプが UTC _以外_の場合は、このフォーマットを使用します。タイムゾーン ID は TZ データベースから取得されます。詳細については、[TZ データベース名][1] を参照してください。

**注**: 日付をパースしても、その値は公式のログ日付として設定**されません**。設定するには、後続のプロセッサーで [ログ日付リマッパー][2] を使用してください。

### 条件付きパターン

ログの形式が 2 通りあり、そのうち 1 つの属性だけが異なる場合は、`(<REGEX_1>|<REGEX_2>)` による条件分岐を使用して 1 つの規則を設定します。

**ログの例**

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

必ずしも表示されない値がログに含まれることがあります。その場合は、`()?` を使用して属性抽出を任意にします。

**ログの例**

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

**ログの例**

```text
Sep 06 09:13:38 vagrant program[123]: server.1 {"method":"GET", "status_code":200, "url":"https://app.datadoghq.com/logs/pipelines", "duration":123456}
```

**規則の例**

```text
parsing_rule %{date("MMM dd HH:mm:ss"):timestamp} %{word:vm} %{word:app}\[%{number:logger.thread_id}\]: %{notSpace:server} %{data::json}
```

{{< img src="logs/processing/parsing/nested_json.png" alt="ネストされた JSON パースの例" style="width:80%;" >}}

### 正規表現

ログメッセージの部分文字列を見つけるには、正規表現マッチャーを使用します。

**ログの例**

```text
john_1a2b3c4 connected on 11/08/2017
```

**規則の例**

```text
MyParsingRule %{regex("[a-z]*"):user.firstname}_%{regex("[a-zA-Z0-9]*"):user.id} .*
```

{{< img src="logs/processing/parsing/regex_parsing.png" alt="パース例 6" responsive="true" style="width:80%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[2]: /ja/logs/processing/processors/#log-date-remapper