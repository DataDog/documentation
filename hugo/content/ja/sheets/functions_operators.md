---
description: Sheets の計算列およびシート数式で使用できる関数と演算子のリファレンスガイド。テキスト、日付、論理、数学、検索、統計、財務などの操作が含まれます。
title: 関数と演算子
---
## 概要 {#overview}

Sheets の関数と演算子を使用して、データを分析および変換します。関数は、次の 2 つのコンテキストで使用できます。

- **テーブルの計算列**: テーブル内の個々の行の値を変換または付加し、列レベルで適用される関数です。
- **Sheets**: [Sheets][1] タブに直接入力する関数で、他のシートやテーブルのタブを参照できます (該当する場合)。

## 演算子 {#operators}

| 演算子 | 名前                  | 例 |
| -------  | --------------------- | ------- |
| `+`      | 加算              | `=A1+B1` |
| `-`      | 減算           | `=A1-B1` |
| `*`      | 乗算        | `=A1*B1` |
| `/`      | 除算              | `=A1/B1` |
| `^`      | べき乗                 | `=2^10` |
| `&`      | 連結           | `="Hello "&A1` |
| `=`      | 等しい                 | `=A1=B1` |
| `<>`     | 等しくない             | `=A1<>0` |
| `>`      | より大きい          | `=A1>100` |
| `<`      | より小さい             | `=A1<100` |
| `>=`     | 以上 | `=A1>=100` |
| `<=`     | 以下    | `=A1<=100` |

## 関数 {#functions}

### テキスト {#text}

`REGEXMATCH(text_string, regular_expression)`
: テキスト文字列が正規表現に一致するかどうかを評価します。<br>**例**: `REGEXMATCH("ABC 123 def", "\\\\d+") => TRUE` <br>**利用できる場所:**: テーブル、シート

`REGEXEXTRACT(text_string, regular_expression)`
: 指定した正規表現パターンに一致する最初の部分文字列を抽出します。<br>**例**: `REGEXEXTRACT("ABC 123 def", "\\\\d+") => "123"` <br>**利用できる場所:**: テーブル、シート

`REGEXCOUNT(text_string, regular_expression)`
: テキスト文字列内で正規表現パターンが出現する回数をカウントします。<br>**例**: `REGEXCOUNT("abc 123 def", "\\\\d+") => 1` <br>**利用できる場所:**: テーブル、シート

`REGEXREPLACE(text_string, regular_expression, replacement)`
: 正規表現に一致するすべての部分文字列を置換文字列に置き換えます。<br>**例**: `REGEXREPLACE("abc 123 def", "\\\\d+", "NUM") => "abc NUM def"` <br>**利用できる場所:**: テーブル

`LEN(string)`
: 文字列の長さを返します。<br>**例**: `LEN("Hello World")` <br>**利用できる場所:**: テーブル、シート

`LOWER(string)`
: 文字列を小文字に変換して返します。<br>**例**: `LOWER("HELLO WORLD")` <br>**利用できる場所:**: テーブル、シート

`UPPER(string)`
: 文字列を大文字に変換して返します。<br>**例**: `UPPER("hello world")` <br>**利用できる場所:**: テーブル、シート

`LEFT(string, number_of_characters)`
: 指定された文字列の先頭から部分文字列を返します。<br>**例**: `LEFT("Datadog", 4)` <br>**利用できる場所:**: テーブル、シート

`RIGHT(string, number_of_characters)`
: 指定された文字列の末尾から部分文字列を返します。<br>**例**: `RIGHT("DATADOG", 3)` <br>**利用できる場所:**: テーブル、シート

`MID(text, start, length)`
: テキストの中間部分の文字を返します。<br>**例**: `MID("Hello World", 7, 5) => "World"` <br>**利用できる場所:**: シート

`CONCATENATE(string1, string2, ...)`
: 文字列を互いに結合します。`&` 演算子と同等です。<br>**例**: `CONCATENATE("data", "dog")` <br>**利用できる場所:**: テーブル、シート

`CONTAINS(string, substring)`
: 文字列に部分文字列が含まれている場合は TRUE を、それ以外の場合は FALSE を返します。<br>**例**: `CONTAINS("is the word string in this sentence?", "string")` <br>**利用できる場所:**: テーブル、シート

`SUBSTITUTE(text, old_text, new_text, [instance_num])`
: old_text の出現箇所を new_text に置き換えます。instance_num を省略した場合はすべての出現箇所が置換され、それ以外の場合は指定したインスタンスのみが置換されます。<br>**例**: `SUBSTITUTE("hello world", "world", "Datadog") => "hello Datadog"` <br>**利用できる場所:**: テーブル、シート

`TEXTJOIN(delimiter, ignore_empty, text1, [text2, ...])`
: 指定した区切り文字を使用して、複数の文字列のテキストを結合します。<br>**例**: `TEXTJOIN(" ", TRUE, "hello", "world")` <br>**利用できる場所:**: テーブル、シート

`FIND(search_for, text_to_search)`
: テキスト内のテキストの位置を検索します (大文字/小文字の区別あり)。見つからない場合はエラーを返します。<br>**例**: `FIND("World", "Hello World") => 7` <br>**利用できる場所:**: シート

`CHAR(number)`
: Unicode 文字セットに従って数値を文字に変換します。<br>**例**: `CHAR(65) => "A"` <br>**利用できる場所:**: シート

`CLEAN(text)`
: テキストから印刷できない文字を削除します。<br>**例**: `CLEAN(A1)` <br>**利用できる場所:**: シート

`TEXT(number, format)`
: 書式パターンを使用して、数値をテキストとして書式設定します。数値、日付、時刻の書式設定がサポートされています。<br>**例**: `TEXT(1234.5, "#,##0.00") => "1,234.50"` <br>**利用できる場所:**: シート

`TRIM(text)`
: テキストの先頭や末尾のスペースおよび余分なスペースを削除します。<br>**例**: `TRIM("  hello  ") => "hello"` <br>**利用できる場所:**: シート

`VALUE(text)`
: テキストを数値に変換します。<br>**例**: `VALUE("123") => 123` <br>**利用できる場所:**: シート

### 論理 {#logical}

`IF(logical_expression, value_if_true, value_if_false)`
: 論理式が TRUE の場合は一方の値を、FALSE の場合はもう一方の値を返します。<br>**例**: `IF(42>9, "all good", "something is wrong in the matrix")` <br>**利用できる場所:**: テーブル、シート

`IFS(logical_test1, value_if_true1, [logical_test2, value_if_true2], …)`
: 1 つ以上の条件と値のペアを評価し、最初に真となった条件に対応する値を返します。デフォルト値を定義するには、最後の条件として TRUE を使用します。<br>**例**: `IFS(A1>90, "A", A1>80, "B", TRUE, "C")` <br>**利用できる場所:**: テーブル、シート

`AND(logical_expression1, [logical_expression2, …])`
: 指定されたすべての引数が論理的に真である場合は TRUE を返し、指定されたいずれかの引数が論理的に偽である場合は FALSE を返します。<br>**例**: `AND(A1=1, A2=2)` <br>**利用できる場所:**: テーブル、シート

`OR(logical_expression1, [logical_expression2, …])`
: 指定された引数のいずれかが論理的に真である場合は TRUE を返し、指定されたすべての引数が論理的に偽である場合は FALSE を返します。<br>**例**: `OR(A1=1, A2=2)` <br>**利用できる場所:**: テーブル、シート

`NOT(logical_expression)`
: 論理値の反対を返します。<br>**例**: `NOT(TRUE)` <br>**利用できる場所:**: テーブル、シート

`TRUE()`
: 論理値 TRUE を返します。<br>**例**: `TRUE()` <br>**利用できる場所:**: テーブル、シート

`FALSE()`
: 論理値 FALSE を返します。<br>**例**: `FALSE()` <br>**利用できる場所:**: テーブル、シート

`IFERROR(value, value_if_error)`
: 数式がエラーと評価された場合に指定した値を返し、それ以外の場合は数式の結果を返します。<br>**例**: `IFERROR(1/0, "Division Error")` <br>**利用できる場所:**: シート

`IFNA(value, value_if_na)`
: 数式が #N/A と評価された場合に指定した値を返し、それ以外の場合は数式の結果を返します。<br>**例**: `IFNA(VLOOKUP("x", A1:B10, 2, FALSE), "Not found")` <br>**利用できる場所:**: シート

`SWITCH(expression, case1, value1, ..., [default])`
: 式をケースと比較し、対応する値を返します。<br>**例**: `SWITCH(A1, 1, "One", 2, "Two", "Other")` <br>**利用できる場所:**: シート

`XOR(logical_expression1, [logical_expression2, …])`
: 引数のうち TRUE の数が奇数の場合に TRUE を返します。<br>**例**: `XOR(TRUE, FALSE)` <br>**利用できる場所:**: シート

### 数学 {#math}

`ABS(number)`
: 数値の絶対値を返します。<br>**例**: `ABS(26.34)` <br>**利用できる場所:**: テーブル、シート

`CEILING(number, factor)`
: 指定した係数の整数倍のうち、最も近い上方向の値に切り上げます。<br>**例**: `CEILING(826.645, 10)` <br>**利用できる場所**: テーブル、シート

`FLOOR(number, factor)`
: 指定した係数の整数倍のうち、最も近い下方向の値に切り下げます。<br>**例**: `FLOOR(826.645, 10)` <br>**利用できる場所**: テーブル、シート

`MOD(number1, number2)`
: 除算の結果である剰余 (モジュロ演算の結果) を返します。<br>**例**: `MOD(5, 2)` <br>**利用できる場所**: テーブル、シート

`POWER(number, power)`
: 数値をべき乗した結果を返します。<br>**例**: `POWER(2, 3)` <br>**利用できる場所**: テーブル、シート

`ROUND(number, places)`
: 数値を指定した小数点以下の桁数に丸めます。<br>**例**: `ROUND(826.645, 1)` <br>**利用できる場所**: テーブル、シート

`COUNT(value1, [value2, ...])`
: 範囲内の数値の個数をカウントします。<br>**例**: `COUNT(A1:A10)` <br>**利用できる場所**: シート

`COUNTA(value1, [value2, ...])`
: 範囲内の空白ではない値の個数をカウントします。<br>**例**: `COUNTA('Logs'#"service")` <br>**利用できる場所**: シート

`COUNTBLANK(range)`
: 範囲内の空白セルの個数をカウントします。<br>**例**: `COUNTBLANK(A1:A10)` <br>**利用できる場所**: シート

`COUNTIF(range, criteria)`
: 指定した条件を満たす範囲内のセルの個数をカウントします。<br>**例**: `COUNTIF('Logs'#"status", "error")` <br>**利用できる場所**: シート

`COUNTIFS(range1, criteria1, [range2, criteria2, ...])`
: 複数の条件を満たす範囲内のセルの個数をカウントします。<br>**例**: `COUNTIFS('Logs'#"status", "error", 'Logs'#"env", "prod")` <br>**利用できる場所**: シート

`COUNTUNIQUE(value1, [value2, ...])`
: 範囲内の一意の値の個数をカウントします。<br>**例**: `COUNTUNIQUE('Logs'#"service")` <br>**利用できる場所**: シート

`MAX(value1, [value2, ...])`
: 値の集合から最大値を返します。<br>**例**: `MAX('APM'#"duration")` <br>**利用できる場所**: シート

`MAXIFS(max_range, range1, criteria1, ...)`
: 複数の条件を満たす範囲内の最大値を返します。<br>**例**: `MAXIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**利用できる場所**: シート

`MIN(value1, [value2, ...])`
: 値の集合から最小値を返します。<br>**例**: `MIN('APM'#"duration")` <br>**利用できる場所**: シート

`MINIFS(min_range, range1, criteria1, ...)`
: 複数の条件を満たす範囲内の最小値を返します。<br>**例**: `MINIFS('APM'#"duration", 'APM'#"env", "prod")` <br>**利用できる場所**: シート

`PI()`
: 円周率 π の値を 15 桁の精度で返します。<br>**例**: `PI()` <br>**利用できる場所**: シート

`RAND()`
: 0 から 1 の間の乱数を返します。<br>**例**: `RAND()` <br>**利用できる場所**: シート

`SQRT(number)`
: 数値の正の平方根を返します。<br>**例**: `SQRT(16) => 4` <br>**利用できる場所**: シート

`SUM(value1, [value2, ...])`
: 一連の数値またはセル (あるいはその両方) の合計を返します。<br>**例**: `SUM('Cloud Cost'#"cost")` <br>**利用できる場所**: シート

`SUMIF(range, criteria, sum_range)`
: 指定した条件を満たす範囲内の値を合計します。<br>**例**: `SUMIF('Cloud Cost'#"service", "ec2", 'Cloud Cost'#"cost")` <br>**利用できる場所**: シート

`SUMIFS(sum_range, range1, criteria1, ...)`
: 複数の条件を満たす範囲内の値を合計します。<br>**例**: `SUMIFS('Cloud Cost'#"cost", 'Cloud Cost'#"service", "ec2", 'Cloud Cost'#"env", "prod")` <br>**利用できる場所**: シート

### 日付と時刻 {#date-and-time}

`DATE(year, month, day)`
: 指定した年、月、日を日付に変換します。<br>**例**: `DATE(2021, 10, 31)` <br>**利用できる場所**: テーブル、シート

`DATEDIF(start_date, end_date, unit)`
: 2 つの日付の間の日数、月数、または年数を計算します。<br>**例**: `DATEDIF("10/17/1979", "8/22/2019", "Y") => 39` <br>**利用できる場所**: テーブル、シート

`TODAY()`
: 現在の日付を返します。<br>**例**: `TODAY()` <br>**利用できる場所**: シート

`NOW()`
: 現在の日付と時刻を返します。<br>**例**: `NOW()` <br>**利用できる場所**: テーブル、シート

`TIME(hour, minute, second)`
: 指定された時、分、秒を時刻に変換します。<br>**例**: `TIME(11, 40, 59)` <br>**利用できる場所**: シート

`YEAR(date)`
: 日付値から年コンポーネントを抽出します。<br>**例**: `YEAR(DATE(2025, 12, 31))` <br>**利用できる場所**: テーブル、シート

`MONTH(date)`
: 日付値から月コンポーネントを抽出します。<br>**例**: `MONTH("2023-07-15")` <br>**利用できる場所**: テーブル、シート

`DAY(date)`
: 日付値から日コンポーネントを抽出します。<br>**例**: `DAY(DATE(2023, 12, 25))` <br>**利用できる場所**: テーブル、シート

`HOUR(datetime)`
: 日時値から時間コンポーネント (0～23) を抽出します。<br>**例**: `HOUR("14:30:45")` <br>**利用できる場所**: テーブル、シート

`MINUTE(datetime)`
: 日時値から分コンポーネント (0～59) を抽出します。<br>**例**: `MINUTE("14:30:45")` <br>**利用できる場所**: テーブル、シート

`SECOND(datetime)`
: 日時値から秒コンポーネント (0～59) を抽出します。<br>**例**: `SECOND("14:30:45")` <br>**利用できる場所**: テーブル、シート

`DATEVALUE(date_string)`
: 日付文字列を日付値に変換します。<br>**例**: `DATEVALUE("07/23/2024")` <br>**利用できる場所**: テーブル、シート

`EPOCHTODATE(timestamp, [unit])`
: Unix エポックタイムスタンプを日付に変換します。`unit`のデフォルトは `1` (秒) です。ミリ秒の場合は `2` を、マイクロ秒の場合は `3` を使用してください。<br>**例**: `EPOCHTODATE(#"Timestamp", 2)` <br>**利用できる場所**: テーブル、シート

`EDATE(start_date, months)`
: 開始日から指定した月数だけ前後に移動した日付を返します。<br>**例**: `EDATE("2023-01-15", 6)` <br>**利用できる場所**: シート

`EOMONTH(start_date, months)`
: 指定した日付から指定した月数だけ前後に移動した月の最終日を返します。<br>**例**: `EOMONTH(DATE(2023, 12, 12), 0)` <br>**利用できる場所**: シート

`WEEKDAY(date, [type])`
: 曜日を数値で返します。タイプ 1 (デフォルト) = 日～土 (1～7)、タイプ 2 = 月～日 (1～7)、タイプ 3 = 月～日 (0～6)。<br>**例**: `WEEKDAY(DATE(2023, 12, 12))` <br>**利用できる場所**: テーブル、シート

`WEEKNUM(date, [type])`
: 年内の特定の日付の週番号を返します。<br>**例**: `WEEKNUM("2023-01-15")` <br>**利用できる場所**: テーブル、シート

### 検索と参照 {#lookup-and-reference}

`VLOOKUP(search_key, range, index, [is_sorted])`
: 範囲の先頭列で指定した値を検索し、同じ行の指定列の値を返します。<br>**例**: `VLOOKUP("Apple", A1:C10, 2, FALSE)` <br>**利用できる場所**: シート

`HLOOKUP(search_key, range, index, [is_sorted])`
: 範囲の先頭行で指定した値を検索し、同じ列の指定行の値を返します。<br>**例**: `HLOOKUP("Apple", A1:D3, 2, FALSE)` <br>**利用できる場所**: シート

`INDEX(reference, row, [column])`
: 行番号と列番号に基づいて、テーブル内の要素の値を返します。<br>**例**: `INDEX(A1:D3, 2, 3)` <br>**利用できる場所**: シート

`MATCH(search_key, range, [search_type])`
: 指定した値と一致する配列内の項目の相対的な位置を返します。<br>**例**: `MATCH("Apple", A1:A4, 0)` <br>**利用できる場所**: シート

`CHOOSE(index, value1, value2, ...)`
: インデックスに基づいてリストから値を返します。<br>**例**: `CHOOSE(2, "A", "B", "C")` <br>**利用できる場所**: シート

`ROW([reference])`
: 参照の行番号を返します。<br>**例**: `ROW(A5) => 5` <br>**利用できる場所**: シート

`COLUMN([reference])`
: 参照の列番号を返します。<br>**例**: `COLUMN(C1) => 3` <br>**利用できる場所**: シート

### 統計 {#statistical}

`AVERAGE(value1, [value2, ...])`
: テキストを無視して、データセット内の数値の平均値を返します。<br>**例**: `AVERAGE('APM'#"duration")` <br>**利用できる場所**: シート

`AVERAGEIF(range, criteria, [average_range])`
: 指定した条件を満たすセルの平均値を返します。<br>**例**: `AVERAGEIF('APM'#"env", "prod", 'APM'#"duration")` <br>**利用できる場所**: シート

`AVERAGEIFS(average_range, range1, criteria1, ...)`
: 複数の条件を満たすセルの平均値を返します。<br>**例**: `AVERAGEIFS('APM'#"duration", 'APM'#"env", "prod", 'APM'#"service", "web")` <br>**利用できる場所**: シート

`MEDIAN(value1, [value2, ...])`
: データセットの中央値 (中間の値) を返します。データセットの値の個数が偶数の場合、2 つの中央値の平均を返します。<br>**例**: `MEDIAN('APM'#"duration")` <br>**利用できる場所**: シート

`MODE(value1, [value2, ...])`
: データセット内で最も頻繁に出現する値を返します。<br>**例**: `MODE('Logs'#"status_code")` <br>**利用できる場所**: シート

`PERCENTILE(data, percentile)`
: 線形補間を使用して、データセットの指定したパーセンタイルに位置する値を返します。<br>**例**: `PERCENTILE('APM'#"duration", 0.95)` <br>**利用できる場所**: シート

`STDEV(value1, [value2, ...])`
: サンプルデータセットの標準偏差を計算します。<br>**例**: `STDEV('APM'#"duration")` <br>**利用できる場所**: シート

`VAR(value1, [value2, ...])`
: データセットの標本分散を計算します。<br>**例**: `VAR('APM'#"duration")` <br>**利用できる場所**: シート

`FORECAST(x, data_y, data_x)`
: 既存の値と線形回帰を使用して将来の値を予測します。<br>**例**: `FORECAST(5, {1,2,3,4}, {10,20,30,40})` <br>**利用できる場所**: シート

`SUMPRODUCT(array1, [array2, ...])`
: 配列内の対応する要素を乗算し、それらの積の合計を返します。<br>**例**: `SUMPRODUCT({1,2,3}, {4,5,6}) => 32` <br>**利用できる場所**: シート

### 財務 {#financial}

`PMT(rate, number_of_periods, present_value, [future_value], [end_or_beginning])`
: 一定の支払額と一定の利率に基づき、ローンの返済額を計算します。<br>**例**: `PMT(0.05/12, 60, 20000)` <br>**利用できる場所**: シート

`PV(rate, number_of_periods, payment_amount, [future_value], [end_or_beginning])`
: 投資の現在価値を計算します。<br>**例**: `PV(0.05/12, 60, -377.42)` <br>**利用できる場所**: シート

`FV(rate, number_of_periods, payment_amount, [present_value], [end_or_beginning])`
: 定期的な一定の支払額と一定の利率に基づいて、投資の将来価値を計算します。<br>**例**: `FV(0.06/12, 240, -500)` <br>**利用できる場所**: シート

`NPV(discount, cashflow1, [cashflow2, ...])`
: 割引率と将来のキャッシュフローの系列に基づいて、投資の正味現在価値を計算します。<br>**例**: `NPV(0.10, -50000, 8000, 9200, 10400)` <br>**利用できる場所**: シート

`IRR(cashflow_amounts, [rate_guess])`
: キャッシュフローの系列をもとに、内部利益率を計算します。<br>**例**: `IRR({-50000, 8000, 9200, 10400, 11600, 12800})` <br>**利用できる場所**: シート

`NPER(rate, payment_amount, present_value, [future_value], [end_or_beginning])`
: 投資またはローンの期間を計算します。<br>**例**: `NPER(0.05/12, -377.42, 20000)` <br>**利用できる場所**: シート

`RATE(number_of_periods, payment_amount, present_value, [future_value], [end_or_beginning], [guess])`
: 年金の期間ごとの利率を計算します。<br>**例**: `RATE(48, -200, 8000)` <br>**利用できる場所**: シート

`RRI(number_of_periods, present_value, future_value)`
: 投資の成長に対する等価利率を計算します。<br>**例**: `RRI(10, 100, 200)` <br>**利用できる場所**: シート

### 情報 {#info}

`ISBLANK(value)`
: セルが空白かどうかをテストします。<br>**例**: `ISBLANK(A1)` <br>**利用できる場所**: シート

`ISNUMBER(value)`
: 値が数値であるかどうかをテストします。<br>**例**: `ISNUMBER(123)` <br>**利用できる場所**: シート

`TYPE(value)`
: 値のデータタイプを数値として返します (1 = 数値、2 = テキスト、4 = 論理値、16 = エラー)。<br>**例**: `TYPE(123) => 1` <br>**利用できる場所**: シート

[1]: /ja/sheets/#sheet-preview