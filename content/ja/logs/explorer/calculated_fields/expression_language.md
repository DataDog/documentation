---
disable_toc: false
further_reading:
- link: /logs/explorer/calculated_fields/
  tag: ドキュメント
  text: 計算されたフィールド
title: 計算フィールド式言語
---

## 基本構文と言語構成要素

| 構成要素                                                                 | 構文・記法                                                                                                                  |
| --------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------ |
| `tag` という名前の予約属性またはタグ                                     | `tag` (プレフィックスは不要)                                                                                                           |
| `attr` という名前の属性                                                    | `@attr` (プレフィックス `@` を使用)                                                                                                          |
| `field` という名前の計算フィールド                                            | `#field` (プレフィックス `#` を使用)                                                                                                          |
| 文字列リテラル (引用)<br>例:  `text` または `Quoted "text"`         | `"text"`<br> `"Quoted \"text\""`<br>(<a href="https://docs.datadoghq.com/logs/explorer/search_syntax/">ログ検索構文</a>が適用されます)|
| 数値リテラル (数字)<br>例: `ten`                           | `10`                                                                                                                                 |
| `x` と `y` というパラメーターを持つ `func` という名前の関数　                         | `func(x, y)`                                                                                                                         |
| 演算子<br>例: `x` と `y` というオペランドを持つバイナリ演算子 `*` | `x*y`                                                                                                                                |

## 演算子

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
| `\|\|`, `OR` | 論理和 |

## 関数

利用可能な関数は以下のカテゴリーに分類されています。
- [算術関数](#arithmetic)
- [文字列関数](#string)
- [論理関数](#logical)


### 算術演算

<h4>abs(<i>num</i> 数値)</h4>

数値の絶対値を返します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合: <br> - `@client_latency` = 2 <br> - `@server_latency` = 3 | `#discrepancy = abs(@client_latency - @server_latency)` | `#discrepancy` = 1 |

</details>


<h4>ceil(<i>num</i> 数値)</h4>

数値を最も近い整数に切り上げます。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@value` = 2.2 | `#rounded_up = ceil(@value)` | `#rounded_up` = 3 |

</details>


<h4>floor(<i>num</i> 数値)</h4>

数値を最も近い整数に切り下げます。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@value` = 9.99 | `#rounded_down = floor(@value)` | `#rounded_down` = 9 |

</details>


<h4>max(<i>num</i> 数値, [ <i>num</i> 数値, ...])</h4>

数値の集合から最大値を見つけます。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#highest_temp = max(@CPU_temperatures)` | `#highest_temp` = 5 |

</details>


<h4>min(<i>num</i> 数値, [<i>num</i> 数値, ...])</h4>

数値の集合から最小値を見つけます。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@CPU_temperatures` = [-1, 1, 5, 5] | `#lowest_temp = min(@CPU_temperatures)` | `#lowest_temp` = -1 |

</details>


<h4>round(<i>num</i> 数値, <i>int</i> 四捨五入する桁数)</h4>

数値を丸めます。オプションで、小数点以下の桁数を指定することもできます。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@value` = -1234.01 | `#rounded_to_tens = round(@value, -1)` | `#rounded_to_tens` = -1230 |

</details>

---

### 文字列

<h4>concat(<i>str</i> 文字列 [<i>str</i> 文字列, <i>expr</i> 値, ...])</h4>

複数の値を 1 つの文字列に結合します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合: <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = concat(@city, ", ", @country)` | `#region` = "Paris, France" |

</details>


<h4>lower(<i>str</i> 文字列)</h4>

文字列を小文字に変換します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@first_name` = "Bob" | `#lower_name = lower(@first_name)` | `#lower_name` = "bob" |

</details>


<h4>left(<i>str</i> 文字列, <i>int</i> 文字数)</h4>

文字列の先頭からテキストの一部を取り出します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@price` = "USD10.50" | `#currency = left(@price, 3)` | `#currency` = "USD" |

</details>


<h4>proper(<i>str</i> 文字列)</h4>

文字列を単語の先頭だけ大文字にし、それ以外を小文字に変換します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@address` = "123 main st" | `#formatted_address = proper(@address)` | `#formatted_address` = "123 Main St" |

</details>


<h4>split_before(<i>str</i> 文字列, <i>str</i> 区切り文字, <i>int</i> 区切り文字の出現回数)</h4>

文字列中の特定のパターンより前の部分のテキストを取り出します。

<details>
<summary>例</summary>

<table>
  <tr>
    <th>例</th>
    <th>計算式</th>
    <th>結果</th>
  </tr>
  <tr>
    <td rowspan ="2">あるログイベントが次の属性を持つ場合:<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_before(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_before(@url, "/", 2)</code></td>
    <td><code>#url_extraction</code> = "www.example.com/path/to"</td>
  </tr>
</table>

</details>


<h4>split_after(<i>str</i> 文字列, <i>str</i> 区切り文字, <i>int</i> 区切り文字の出現回数)</h4>

文字列中の特定のパターンより後の部分のテキストを取り出します。

<details>
<summary>例</summary>

<table>
  <tr>
    <th>例</th>
    <th>計算式</th>
    <th>結果</th>
  </tr>
  <tr>
    <td rowspan ="2">あるログイベントが次の属性を持つ場合:<br><code>@url</code> = "www.example.com/path/to/split"</td>
    <td><code>#url_extraction = split_after(@url, "/", 0)</code></td>
    <td><code>#url_extraction</code> = "path/to/split"</td>
  </tr>
  <tr>
    <td><code>#url_extraction = split_after(@url, "/", 1)</code></td>
    <td><code>#url_extraction</code> = "to/split"
</table>

</details>


<h4>substring(<i>str</i> 文字列, <i>int</i> 開始位置, <i>int</i> 取り出す長さ)</h4>

文字列の途中からテキストの一部を取り出します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@price` = "USD10.50" | `#dollar_value = substring(@price, 2, 2)` | `#dollar_value` = "10" |


</details>


<h4>right(<i>str</i> 文字列, <i>int</i> 文字数)</h4>

文字列の末尾からテキストの一部を取り出します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合:<br>`@price` = "USD10.50" | `#cent_value = right(@price, 2)` | `#cent_value` = "50" |

</details>


<h4>textjoin(<i>str</i> 区切り文字, <i>bool</i> 空の文字列を無視するかどうか, <i>str</i> 文字列 [<i>str</i> 文字列, <i>expr</i> 値, ...])</h4>

複数の値を、区切り文字を挟みながら 1 つの文字列に結合します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合: <br> - `@city` = "Paris" <br> - `@country` = "France" | `#region = textjoin(", ", "false", @city, @country)` | `#region` = "Paris, France" |

</details>


<h4>upper(<i>str</i> 文字列)</h4>

文字列を大文字に変換します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合: `@first_name` = "Bob" | `#upper_name = upper(@first_name)` | `#upper_name` = "BOB" |

</details>

---

### 論理関数

<h4>if(<i>expr</i> 条件, <i>expr</i> 真の場合, <i>expr</i> 偽の場合)</h4>

条件を評価し、それに応じた値を返します。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合: <br> - `@location` = "Paris, France" <br> - `@home` = "New York, USA" | `#abroad = if(@location == @home, "false", "true")` | `#abroad` = "true" |

</details>


<h4>is_null(<i>expr</i> 値)</h4>

属性または式が null かどうかを調べます。

<details>
<summary>例</summary>

| 例  | 計算式 | 結果 |
|----------|-------------|---------|
| あるログイベントが次の属性を持つ場合: <br> - `@users_online` = 5 <br> - `@max_capacity` = 0 | `is_null(@users_online / @max_capacity)` | "true" |

</details>


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}