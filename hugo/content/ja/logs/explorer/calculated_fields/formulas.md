---
aliases:
- /ja/logs/explorer/calculated_fields/expression_language
disable_toc: false
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: ドキュメント
  text: 計算フィールド
title: 数式
---
## 概要 {#overview}

数式 (または式) は、各ログイベントの計算フィールドの値を定義します。ログ属性、他の計算フィールド、およびサポートされている関数や演算子を参照できます。数式を記述または編集すると、エディターが関連するフィールド、関数、演算子を自動的に提案します。

## 基本構文と言語構成要素 {#basic-syntax-and-language-constructs}

| 構成要素                                                                 | 構文と表記法                                                                                                                  |
| --------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------ |
| 予約済みの属性またはタグ名 `tag`                                     | `tag` (プレフィックスは不要)<br>ダッシュを含むタグの場合は、バックスラッシュでエスケープしてください。<br>例: `ci\-job\-id`                    |
| `attr`                                                    | `@attr` という名前の属性 (`@` プレフィックスを使用)                                                                                                          |
| `field`                                            | `#field` という名前の計算フィールド (`#` プレフィックスを使用)                                                                                                          |
| 文字列リテラル (引用符)<br>例: `text` または `Quoted "text"`。        | `"text"`<br> `"Quoted \"text\""`<br>(<a href="https://docs.datadoghq.com/logs/explorer/search_syntax/">ログ検索構文</a>が適用されます)|
| 数値リテラル (数字)<br>例: `ten`。                          | `10`                                                                                                                                 |
| パラメーター `x` および `y`                         | `func(x, y)`                                                                                                                         | を持つ `func` という名前の関数
| 演算子<br>例: `x` と `y` というオペランドを持つバイナリ演算子 `*`。| `x*y`                                                                                                                                |

## 演算子 {#operators}

利用可能な演算子 (優先順)

| 演算子 | 説明 |
|----------|-------------|
| `()` | グループ化または関数の呼び出し |
| `!`、`NOT`、`-` | 論理否定または算術否定 |
| `^`、`%` | べき乗、剰余|
| `*`、`/` | 乗算、除算|
| `+`、`-` | 加算、減算 |
| `<`、`<=`、`>`、`>=` | 未満、以下、超、以上 |
| `==`、`!=` | 一致、不一致 |
| `&&`、`AND` | 論理積 |
| `\|\|`、`OR` | 論理和 |

## 関数 {#functions}

利用可能な関数は以下のカテゴリーに分類されています。
- [算術演算](#arithmetic)
- [文字列](#string)
- [論理関数](#logical)
- [正規表現](#regex)


### 算術演算 {#arithmetic}

<h4>abs(<i>num</i> value)</h4>

数値の絶対値を返します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br> - `@client_latency` = 2 <br> - `@server_latency` = 3 | `#discrepancy = abs(@client_latency - @server_latency)` | `#discrepancy` = 1 |

{{% /collapse-content %}}


<h4>ceil(<i>num</i> value)</h4>

数値を最も近い整数に切り上げます。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@value` = 2.2 | `#rounded_up = ceil(@value)` | `#rounded_up` = 3 |

{{% /collapse-content %}}


<h4>floor(<i>num</i> value)</h4>

数値を最も近い整数に切り下げます。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@value` = 9.99 | `#rounded_down = floor(@value)` | `#rounded_down` = 9 |

{{% /collapse-content %}}


<h4>max(<i>num</i> value, [ <i>num</i> value, …])</h4>

数値の集合から最大値を見つけます。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#highest_temp = max(@CPU_temperatures)` | `#highest_temp` = 5 |

{{% /collapse-content %}}


<h4>min(<i>num</i> value, [<i>num</i> value, …])</h4>

数値の集合から最小値を見つけます。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#lowest_temp = min(@CPU_temperatures)` | `#lowest_temp` = -1 |

{{% /collapse-content %}}


<h4>round(<i>数値</i> value, <i>整数</i> precision)</h4>

数値を丸めます。オプションで、小数点以下の桁数を指定することもできます。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@value` = -1234.01 | `#rounded_to_tens = round(@value, -1)` | `#rounded_to_tens` = -1230 |

{{% /collapse-content %}}

---

### 文字列 {#string}

<h4>concat(<i>str</i> string [<i>str</i> string, <i>expr</i> value, …])</h4>

複数の値を 1 つの文字列に結合します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = concat(@city, ", ", @country)` | `#region` = "Paris, France" |

{{% /collapse-content %}}


<h4>lower(<i>str</i> string)</h4>

文字列を小文字に変換します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@first_name` = "Bob" | `#lower_name = lower(@first_name)` | `#lower_name` = "bob" |

{{% /collapse-content %}}


<h4>left(<i>str</i> string, <i>int</i> num_chars)</h4>

文字列の先頭からテキストの一部を取り出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@price` = "USD10.50" | `#currency = left(@price, 3)` | `#currency` = "USD" |

{{% /collapse-content %}}


<h4>proper(<i>str</i> string)</h4>

文字列を単語の先頭だけ大文字にし、それ以外を小文字に変換します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@address` = "123 main st" | `#formatted_address = proper(@address)` | `#formatted_address` = "123 Main St" |

{{% /collapse-content %}}


<h4>split_before(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

文字列中の特定のパターンより前の部分のテキストを取り出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

<table>
  <tr>
    <th>例</th>
    <th>計算式</th>
    <th>結果</th>
  </tr>
  <tr>
    <td rowspan ="2">ログイベントには次の属性があります。<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_before(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_before(@url, "/", 2)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path/to"</td>
  </tr>
</table>

{{% /collapse-content %}}


<h4>split_after(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

文字列中の特定のパターンより後の部分のテキストを取り出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

<table>
  <tr>
    <th>例</th>
    <th>計算式</th>
    <th>結果</th>
  </tr>
  <tr>
    <td rowspan ="2">ログイベントには次の属性があります。<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_after(@url, "/", 0)</code></td>
    <td><code>#url_extraction</code> = "path/to/split"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_after(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "to/split"
</table>

{{% /collapse-content %}}


<h4>substring(<i>str</i> string, <i>int</i> start, <i>int</i> length)</h4>

文字列の途中からテキストの一部を取り出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@price` = "USD10.50" | `#dollar_value = substring(@price, 2, 2)` | `#dollar_value` = "10" |

{{% /collapse-content %}}


<h4>right(<i>str</i> string, <i>int</i> num_chars)</h4>

文字列の末尾からテキストの一部を取り出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@price` = "USD10.50" | `#cent_value = right(@price, 2)` | `#cent_value` = "50" |

{{% /collapse-content %}}


<h4>textjoin(<i>str</i> delimiter, <i>bool</i> ignore_empty, <i>str</i> string [<i>str</i> string, <i>expr</i> value, …])</h4>

複数の値を、区切り文字を挟みながら 1 つの文字列に結合します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = textjoin(", ", "false", @city, @country)` | `#region` = "Paris, France" |

{{% /collapse-content %}}


<h4>upper(<i>str</i> string)</h4>

文字列を大文字に変換します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。`@first_name` = "Bob" | `#upper_name = upper(@first_name)` | `#upper_name` = "BOB" |

{{% /collapse-content %}}

---

### 論理関数 {#logical}

<h4>if(<i>expr</i> condition, <i>expr</i> if_true, <i>expr</i> if_false)</h4>

条件を評価し、それに応じた値を返します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br> - `@location` = "Paris, France" <br> - `@home` = "New York, USA" | `#abroad = if(@location == @home, "false", "true")` | `#abroad` = "true" |

{{% /collapse-content %}}


<h4>is_null(<i>expr</i> value)</h4>

属性または式が null かどうかを調べます。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br> - `@users_online` = 5 <br> - `@max_capacity` = 0 | `is_null(@users_online / @max_capacity)` | "true" |

{{% /collapse-content %}}

---

### 正規表現 {#regex}

正規表現関数は、正規表現 (regex) を使用して値を照合または変換します。パターンでは、リテラル、文字クラス、量指定子など、[正規表現の抽出][1] と同じ正規表現構文がサポートされます。エスケープ方法は異なります。抽出パターンはそのままのフィールドですが、ここでのパターンは二重引用符で囲まれた文字列引数です。抽出とは異なり、ここでのキャプチャグループには名前を付ける必要はありません。`regexp_replace` では `$1` から `$9` を使用して、名前のないグループを位置で参照できます。同じ [パターンパフォーマンス][2] のガイダンスが適用されます。

<h4>regexp_like(<i>str</i> value, <i>str</i> pattern)</h4>

パターンが値のいずれかの部分に一致する場合は `true` を返し、それ以外の場合は `false` を返します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`message` = "connection timeout after 30s" | `#is_timeout = regexp_like(message, "timeout\|deadline exceeded")` | `#is_timeout` = "true" |

{{% /collapse-content %}}


<h4>regexp_replace(<i>str</i> input, <i>str</i> pattern, <i>str</i> replacement, [<i>int</i> start, <i>int</i> N])</h4>

一致したテキストを置換した `input` を返します。`replacement` で `$1` から `$9` を使用すると、キャプチャグループに一致したテキストを挿入できます。名前付きグループの場合は `${name}` を使用します。数式の引数は二重引用符で囲まれた文字列リテラルなので、バックスラッシュをエスケープする必要があります。たとえば、`pattern` では、省略形の文字クラスに `"\d"` ではなく `"\\d"` と記述します。`$` にリテラルの `replacement` を挿入するには、その特殊な意味を `\$` でエスケープし、さらに文字列リテラル用にそのバックスラッシュをエスケープして `"\\$"` とします。

| 引数 | 意味 |
|---|---|
| `input` | 変換するテキスト |
| `pattern` | 一致させる正規表現パターン |
| `replacement` | 正規表現変換パターン (多くの場合、キャプチャグループを使用) |
| `start` | オプション。照合を開始するゼロベースの文字インデックス。デフォルトは `0` | です。
| `N` | オプション。置換する一致の最大数。デフォルトは `1` です。`0` はすべての一致を置換します。|

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@path` = "/api/v1/orders" | `#resource = regexp_replace(@path, "^/api/v[0-9]+/(.*)$", "$1")` | `#resource` = "orders" |

{{% /collapse-content %}}


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/calculated_fields/extractions/#regex
[2]: /ja/logs/explorer/calculated_fields/extractions/#pattern-performance