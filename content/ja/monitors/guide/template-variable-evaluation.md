---
title: Template Variable Evaluation
---

モニター通知メッセージでは、`eval` 構文を使用してテンプレート変数の出力を変更できます。これにより、数値を持つテンプレート変数に対していくつかの異なる算術演算と関数を使用できます。

## 演算子

評価演算子を使用すると、数値テンプレート変数に対して基本的な算術演算を実行できます。構文は次の形式を使用します。**注**: 式は引用符（ `"`）で囲む必要があります。

```text
{{eval "テンプレート変数名+1-2*3/4"}}
```

次の演算子がサポートされています。

| 演算子 | 説明    |
|----------|----------------|
| +        | 加算       |
| -        | 減算    |
| *        | 乗算 |
| /        | 除算       |
| ^        | べき乗 |
| %        | 剰余         |

### 例

The `{{last_triggered_at_epoch}}` template variable returns the UTC time when a monitor last triggered in milliseconds epoch format. 

### Scope links to specific times

Evaluation operators can be used to subtract 15 minutes (15 * 60 * 1000 milliseconds) with the following:

```
{{eval "last_triggered_at_epoch-15*60*1000"}}
```

これは、Datadog または他のワークフローツールの他のページへのモニター通知メッセージに時間スコープのリンクを作成するのに役立ちます。たとえば、`{{last_triggered_at_epoch}}` の評価演算子を使用して、[Datadog ログエクスプローラー][1]への時間スコープのリンクを作成します。

```
https://app.datadoghq.com/logs?from_ts={{eval "last_triggered_at_epoch-15*60*1000"}}&to_ts={{last_triggered_at_epoch}}&live=false
```

### Routing notifications to different teams based on time of day

You can combine a modulo `%` evaluation of the `last_triggered_at_epoch` variable with `{{#is_match}}{{/is_match}}` to customize the routing of notifications based on time of day:
```
{{#is_match (eval "int(last_triggered_at_epoch / 3600000 % 24)") "14" "15" "16"}}  
Handle that should receive notification if time is between 2PM and 5PM
{{/is_match}}
```

## 関数

数値テンプレート変数の値を評価関数の入力として使用して、テンプレート変数のフォーマットを変更したり、値に対して算術演算を実行したりできます。構文は次の形式を使用します。**注**: 式は引用符（`"`）で囲む必要があります。

```text
{{eval "function(TEMPLATE_VARIABLE_NAME)"}}
```

次の関数は、数値テンプレート変数の値のフォーマット方法を変更します。

| 関数            | 説明|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| humanize_bytes(var) | 人間が読める形式の var バイトを返します|
| humanize_bits(var)  | 人間が読める形式の var ビットを返します|
| abs(var)            | var の絶対値を返します|
| int(var)            | var を床付き整数、つまり小数点以下の数値で返します。たとえば、var = 12.345 の場合、 `int(var)` は 12 を返します。|
| float(var)          | var を浮動小数点数として返します|
| trunc(var)          | var を整数として返します。これは int 関数のエイリアスです|
| dec(var)            | 小数点の右側の数値を返します。たとえば、var = 12.345 の場合、`dec(var)` は 0.345 を返します。|

次の関数は、数値テンプレート変数の値を数学関数への入力として使用します。

| 関数            | 説明|
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| round(var)          | 最も近い整数に丸められた var を返します|
| round(var, n)       | Returns var rounded to a specified number of digits (n).<br>For example: round(12.376, 2) = 12.38|
| ceil(var)           | var の上限を返します（var 以上の最小の整数）|
| floor(var)          | var の下限を返します（var 以下の最大の整数）|
| sgn(var)            | var で評価される符号関数の値を返します:<br>var > 0 の場合、sgn(var) = 1<br>var = 0 の場合、sgn(var) = 0<br>var < 0 の場合、sgn(var) = -1|
| to_bool(var)        | var = 1 の場合は true を返します<br>var = 0 の場合は false を返します|
| exp(var)            | var で累乗した e（自然対数の底）を返します|
| log10(var)          | var の 10 を底とする対数を返します|
| sin(var)            | var ラジアンの正弦を返します|
| sinh(var)           | var の双曲線正弦を返します|
| asin(var)           | var の逆正弦をラジアンで返します|
| asinh(var)          | var の逆双曲線正弦を返します|
| cos(var)            | var ラジアンの余弦を返します|
| cosh(var)           | var の双曲線余弦を返します|
| acos(var)           | var の逆余弦をラジアンで返します|
| acosh(var)          | var の逆双曲線余弦を返します|
| tan(var)            | var ラジアンの正接を返します|
| tanh(var)           | var の双曲線正接を返します|
| atan(var)           | var の逆正接をラジアンで返します|
| atan2(var1, var2)   | atan(var1 / var2) をラジアンで返します|
| atanh(var)          | var の逆双曲線正接を返します|

### 例

特定のユースケースで `{{value}}` テンプレート変数の小数点以下の桁数が不要な場合は、int 関数を使用して `{{value}}` を整数として評価し、読みやすさを向上させて小数点を削除します。

```
{{eval "int(value)"}}
```

`{{value}}` が多数のバイトまたはビットに評価される場合は、`humanize_bytes` または `humanize_bits` 関数を使用して、数値を GB や MB などの別のより高次のメモリユニットに変換して読みやすくします。

```
{{eval "humanize_bytes(value)"}}

{{eval "humanize_bits(value)"}}
```

[1]: /logs/explorer/
