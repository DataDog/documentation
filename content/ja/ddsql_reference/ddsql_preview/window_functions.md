---
aliases:
- /ja/dashboards/ddsql_editor/reference/window_functions/
- /ja/ddsql_editor/reference/window_functions/
private: true
title: DDSQL ウィンドウ関数 (プレビュー)
---

## 概要

ウィンドウ関数は、クエリで選択された行のサブセットに集計を適用します。選択された行は、ウィンドウ関数を使用しない集計のようにグループ化されて 1 つの行として出力されるのではなく、クエリの出力結果においても保持されます。

ウィンドウ関数の動作の詳細については、[ウィンドウ関数に関する Postgres ドキュメント][1]を参照してください。

## 構文

{{< code-block lang="sql" >}}
関数名 ([式 [, 式 ...]]) OVER (
  [ PARTITION BY 式 [, ...] ]
  [ ORDER BY 式 [ ASC | DESC ] [ NULLS { FIRST | LAST } ] [, ...] ]
  [ フレーム句 ]
)
{{< /code-block >}}

オプションの`フレーム句`の構文は次のとおりです。

{{< code-block lang="sql" >}}
{ RANGE | ROWS } フレームの開始点
| { RANGE | ROWS } BETWEEN フレームの開始点 AND フレームの終了点
{{< /code-block >}}

`フレームの開始点`と`フレームの終了点`の式は、以下のいずれかを使用できます。

- `UNBOUNDED PRECEDING`
- `offset PRECEDING`
- `CURRENT ROW`
- `offset FOLLOWING`
- `UNBOUNDED FOLLOWING`

## 関数

以下の関数は、[集計関数][2]とともに、ウィンドウ関数として使用できます。

### row_number
| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| row_number() | 整数 | パーティション内の現在の行の番号を 1 から数えて返します。 |

### rank
| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| rank() | 整数 | 現在の行の順位を欠番ありで返します (すなわち、同順位グループの最初の行の `row_number`)。 |

### dense_rank
| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| dense_rank() | 整数 | 現在の行の順位を欠番なしで返します。この関数は実質的に、同順位グループの数をカウントするものです。 |

### first_value
| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| first_value(値 *T*) | *T* | ウィンドウフレームの最初の行で評価された値を返します。 |

### last_value
| 名前 | 戻り値の型 | 説明 |
|------|-------------|-------------|
| last_value(値 *T*) | *T* | ウィンドウフレームの最後の行で評価された値を返します。 |

[1]: https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS
[2]: /ja/ddsql_reference/ddsql_preview/functions/#aggregation-functions