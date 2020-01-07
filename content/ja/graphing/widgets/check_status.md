---
title: チェックステータスウィジェット
kind: documentation
description: 実行されたチェックの現在のステータスまたは結果の数をグラフ化する
further_reading:
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
チェックステータスは、実行されたチェックの現在のステータスまたは結果の数を表示します。

{{< img src="graphing/widgets/check_status/check_status.png" alt="Check status widget" >}}

## セットアップ

{{< img src="graphing/widgets/check_status/check_status_setup.png" alt="Check status widget setup"  style="width:80%;">}}

### コンフィグレーション

1. これまでに作成したサービスチェックの 1 つを選択します。
2. 報告対象のタイムフレームを選択します。
  * グローバルタイム
  * 過去 10 分間
  * 過去 30 分間
  * 過去 1 時間
  * 過去 4 時間
  * 過去 1 日
3. スコープを選択します。
    * **A single check**: チェックステータスウィジェットが特定の要素 (1 つの `host:<HOSTNAME>`、1 つの `service:<SERVICE_NAME>` など) のみを対象とする場合は、このオプションを選択します。
    * **A cluster of checks**: チェックステータスウィジェットが一定の範囲の要素 (すべての `host`、すべての `service` など) を対象とする場合は、このオプションを選択します。

4. スコープを選択したら、**Reported by** フィールドで、チェックステータスウィジェットのコンテキストを定義します。
5. オプション: チェック結果をカスタムタグキーによってグループ化します。

### オプション
#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。


## API

チェックステータスウィジェット専用の[ウィジェット JSON スキーマ定義][1]は次のとおりです。

```
CHECK_STATUS_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["check_status"]},
        "check": {"type": "string"},
        "grouping": {"enum": ["check", "cluster"]},
        "group": {"type": "string"},
        "tags":  {"type": "array", "items": {"type": "string"}},
        "group_by":  {"type": "array", "items": {"type": "string"}},
        "title": {"type": "string"}
    },
    "required": ["type", "check", "grouping"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -----    | -----                                                                                                                                                        |
| `type`     | string          | はい      | ウィジェットのタイプ。チェックステータスウィジェットには `check_status` を使用します。|
| `check`     | string          | はい      | ウィジェットで使用するチェックの名前|
| `grouping`| string| はい| 使用するグループ化の種類 (単一チェックまたはチェッククラスター)。有効な値は `check` または `cluster` です。|
| `group`| string| いいえ| 単一チェックを報告するグループ|
| `tags`| 文字列の配列| いいえ| クラスターチェックを報告するグループのフィルター処理に使用されるタグのリスト|
| `group_by`| 文字列の配列| いいえ| クラスターチェックの場合に、グループ化の基準にするタグプレフィックスのリスト|
|`title`|string|いいえ|ウィジェットのタイトル|

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing/graphing_json/widget_json