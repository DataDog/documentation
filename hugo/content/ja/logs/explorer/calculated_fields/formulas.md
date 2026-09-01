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

数式 (または式) は、各ログイベントの計算フィールドの値を定義します。ログ属性、他の計算フィールド、およびサポートされている関数や演算子を参照できます。数式を作成または編集すると、エディターが関連するフィールド、関数、演算子を自動的に提案します。

## 基本的な構文と言語構成要素 {#basic-syntax-and-language-constructs}

| 構成要素                                                                 | 構文と表記                                                                                                                  |
| --------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------ |
| 予約済みの属性またはタグ `tag`                                     | `tag` (プレフィックスは不要)<br>ダッシュを含むタグについては、バックスラッシュでエスケープします。<br>例: `ci\-job\-id`                    |
| 属性 `attr`                                                    | `@attr` (`@` プレフィックスを使用)                                                                                                          |
| `field`                                            | `#field` (`#` プレフィックスを使用)                                                                                                          |
| 文字列リテラル (引用符)<br>例: `text`、`Quoted "text"`。        | `"text"`<br> `"Quoted \"text\""`<br>(<a href="https://docs.datadoghq.com/logs/explorer/search_syntax/">ログ検索構文</a>が適用されます)|
| 数値リテラル (数値)<br>例: `ten`。                          | `10`                                                                                                                                 |
| 関数 `func` 使用するパラメーター `x` および `y`                         | `func(x, y)`                                                                                                                         |
| 演算子<br>例: オペランド `x` および `y` を使用した任意の演算子 `*`。| `x*y`                                                                                                                                |

## 演算子 {#operators}

利用可能な演算子 (優先順位順):

| 演算子 | 説明 |
|----------|-------------|
| `()` | グループ化または関数呼び出し |
| `!`、`NOT`、`-` | 論理否定または算術否定 |
| `^`、`%` | べき乗、剰余|
| `*`、`/` | 乗算、除算|
| `+`、`-` | 加算、減算 |
| `<`、`<=`、`>`、`>=` | より小さい、以下、より大きい、以上 |
| `==`、`!=` | 一致、不一致 |
| `&&`、`AND` | 論理 AND |
| `\|\|`、`OR` | 論理 OR |

## 関数 {#functions}

利用可能な関数は次のように分類されます。
- [算術](#arithmetic)
- [文字列](#string)
- [論理](#logical)


### 算術 {#arithmetic}

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

数値を最も近い整数に切り捨てます。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@value` = 9.99 | `#rounded_down = floor(@value)` | `#rounded_down` = 9 |

{{% /collapse-content %}}


<h4>max(<i>num</i> value, [ <i>num</i> value, …])</h4>

数値のセットの中から最大値を見つけます。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#highest_temp = max(@CPU_temperatures)` | `#highest_temp` = 5 |

{{% /collapse-content %}}


<h4>min(<i>num</i> value, [<i>num</i> value, …])</h4>

数値のセットの中から最小値を見つけます。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#lowest_temp = min(@CPU_temperatures)` | `#lowest_temp` = -1 |

{{% /collapse-content %}}


<h4>round(<i>num</i> value, <i>int</i> precision)</h4>

数値を四捨五入します。オプションで、保持する小数点以下の桁数を指定できます。

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

文字列の先頭からテキスト部分を抽出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@price` = "USD10.50" | `#currency = left(@price, 3)` | `#currency` = "USD" |

{{% /collapse-content %}}


<h4>proper(<i>str</i> string)</h4>

文字列を適切な大文字小文字の形式に変換します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@address` = "123 main st" | `#formatted_address = proper(@address)` | `#formatted_address` = "123 Main St" |

{{% /collapse-content %}}


<h4>split_before(<i>str</i> string, <i>str</i> separator, <i>int</i> occurrence)</h4>

文字列内の特定のパターンの前に先行するテキスト部分を抽出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

<table>
  <tr>
    <th>例</th>
    <th>数式</th>
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

文字列内の特定のパターンの後に続くテキスト部分を抽出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

<table>
  <tr>
    <th>例</th>
    <th>数式</th>
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

文字列の中間からテキスト部分を抽出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@price` = "USD10.50" | `#dollar_value = substring(@price, 2, 2)` | `#dollar_value` = "10" |

{{% /collapse-content %}}


<h4>right(<i>str</i> string, <i>int</i> num_chars)</h4>

文字列の末尾からテキスト部分を抽出します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br>`@price` = "USD10.50" | `#cent_value = right(@price, 2)` | `#cent_value` = "50" |

{{% /collapse-content %}}


<h4>textjoin(<i>str</i> delimiter, <i>bool</i> ignore_empty, <i>str</i> string [<i>str</i> string, <i>expr</i> value, …])</h4>

複数の値を、区切り文字を挟んで 1 つの文字列に結合します。

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

### 論理 {#logical}

<h4>if(<i>expr</i> condition, <i>expr</i> if_true, <i>expr</i> if_false)</h4>

条件を評価し、それに応じて値を返します。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br> - `@location` = \"Paris, France\" <br> - `@home` = \"New York, USA\" | `#abroad = if(@location == @home, "false", "true")` | `#abroad` = \"true\" |

{{% /collapse-content %}}


<h4>is_null(<i>expr</i> value)</h4>

属性または式が null かどうかをチェックします。

{{% collapse-content title="例" level="h5" expanded=false %}}

| 例  | 数式 | 結果 |
|----------|-------------|---------|
| ログイベントには次の属性があります。<br> - `@users_online` = 5 <br> - `@max_capacity` = 0 | `is_null(@users_online / @max_capacity)` | \"true\" |

{{% /collapse-content %}}


## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}