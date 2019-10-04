---
title: JSON を使用したグラフ作成
kind: documentation
disable_toc: true
aliases:
  - /ja/graphingjson/
  - /ja/graphing/miscellaneous/graphingjson
further_reading:
  - link: graphing/widgets
    tag: Documentation
    text: ウィジェット
  - link: graphing/graphing_json/request_json
    tag: Documentation
    text: リクエストの JSON スキーマ
---
[ダッシュボード API][2] を使用して [Datadog タイムボード][1]をクエリすると、結果は、以下のレイアウトの JSON オブジェクトになります。

```
DASHBOARD_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string"},
        "layout_type": {"enum": ["ordered", "free"]},
        "is_read_only": {"type": "boolean"},
        "template_variables": {"type": "array", "items": TEMPLATE_VARIABLE_SCHEMA},
        "notify_list": {"type": "array", "items": {"type": "string"}},
        "widgets": {
            "type": "array",
            "items": WIDGET_SCHEMA
        }
    },
    "required": ["title", "layout_type", "widgets"],
}
```

| パラメーター            | 型             | 説明                                                                                                                                                                         |
| ------               | -----            | --------                                                                                                                                                                            |
| `title`              | string           | ダッシュボードのタイトル。                                                                                                                                                            |
| `description`        | string           | ダッシュボードの説明。                                                                                                                                                       |
| `layout_type`        | enum             | ダッシュボードのレイアウトタイプ。使用可能な値: `ordered` (以前のタイムボード) または `free` (以前のスクリーンボードレイアウト)                                                                                                                    |
| `is_read_only`       | Boolean          | このダッシュボードが読み取り専用かどうか。`true` の場合は、ダッシュボードの作成者と管理者だけがダッシュボードに変更を加えることができます。                                                               |
| `template_variables` | オブジェクトの配列  | このダッシュボードのテンプレート変数のリスト。詳細は、[テンプレート変数スキーマ](#template-variable-schema)をご参照ください。                                            |
| `notify_list`        | 文字列の配列 | このダッシュボードに変更が加えられたときに通知するユーザーのハンドルのリスト。                                                                                                         |
| `widgets`            | オブジェクトの配列  | ダッシュボードに表示するウィジェットのリスト。`WIDGET_SCHEMA` の作成については、別途ドキュメントをご用意しています。[ウィジェットの JSON スキーマガイド][3]をご参照ください。 |

## テンプレート変数スキーマ

ダッシュボードテンプレート変数は、ダッシュボード上の 1 つ以上のグラフに新しいスコープを適用します。これにより、特定のタグではなく変数を使用することで、複数のタグセットにまたがってメトリクスを動的に調査することができます。ダッシュボード API で変数を設定するには、以下のレイアウトを使用します。

```
TEMPLATE_VARIABLE_SCHEMA = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "default": {"type": "string"},
        "prefix": {"type": "string"},
    },
    "additionalProperties": false,
    "required": ["name"]
}
```

| パラメーター | 型   | 説明                               |
| ------    | -----  | --------                                  |
| `name`    | string | テンプレート変数の名前。           |
| `default` | string | テンプレート変数のデフォルト値。 |
| `prefix`  | string | テンプレート変数のタググループ。     |

Datadog UI でテンプレート変数を使用する方法については、[こちらを参照してください][4]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/dashboards/timeboard
[2]: /ja/api/#dashboards
[3]: /ja/graphing/graphing_json/widget_json
[4]: /ja/graphing/dashboards/template_variables