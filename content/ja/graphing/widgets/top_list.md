---
title: トップリストウィジェット
kind: documentation
further_reading:
  - link: graphing/dashboards/timeboard/
    tag: Documentation
    text: Timeboards
  - link: graphing/dashboards/screenboard/
    tag: Documentation
    text: Screenboard
  - link: graphing/graphing_json/
    tag: Documentation
    text: JSON を使用したダッシュボードの構築
---
トップリスト可視化機能を使用すると、`hostname`、`service` などのタグ値のリストを任意のメトリクス値の最大値または最小値と共に表示できます。たとえば、CPU を多く使用しているサービス、ディスクの空き容量が少ないホストなどをリストできます。

{{< img src="graphing/widgets/toplist/toplist.png" alt="Top List" >}}

## セットアップ

{{< img src="graphing/widgets/toplist/toplist_setup.png" alt="Top List"  style="width:80%;">}}

### コンフィグレーション

1. グラフ化するデータを選択します。
    * メトリクス:  メトリクスクエリの構成については、[グラフ作成方法に関するドキュメント][1]を参照してください。
    * APM イベント: APM イベントクエリの構成については、[トレース検索に関するドキュメント][2]を参照してください。
    * ログイベント: APM イベントクエリの構成については、[ログ検索に関するドキュメント][3]を参照してください。

2. オプション: エントリの値に応じて、条件付き書式を構成します。

### オプション
#### グローバルタイム

スクリーンボードの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、スクリーンボードのグローバルタイムフレームを持つかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="graphing/widgets/options/title.png" alt="Widget title"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

トップリストウィジェットの[ウィジェット JSON スキーマ定義][4]は次のとおりです。

```
TOPLIST_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {"enum": ["toplist"]},
        "requests": {
            "type":     "array",
            "items":    REQUEST_SCHEMA,
            "minItems": 1,
            "maxItems": 1
        },
        "title": {"type": "string"}
    },
    "required": ["type", "requests"],
    "additionalProperties": false
}
```

| パラメーター  | タイプ            | 必須 | 説明                                                                                                                                                  |
| ------     | -----           | -------- | -----                                                                                                                                                        |
| `type`     | string          | はい      | ウィジェットのタイプ。トップリストウィジェットには `toplist` を使用します。                                                                                                      |
| `requests` | オブジェクトの配列 | はい      | ウィジェットに表示する 1 つの `request` オブジェクトの配列。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][5]を参照してください。 |
| `title`    | string          | いいえ       | ウィジェットのタイトル。                                                                                                                                        |


`request` オブジェクトでは、以下のプロパティも使用できます。

```
{
   "conditional_formats": CONDITIONAL_FORMATS_SCHEMA
}
```

| パラメーター             | タイプ   | 必須 | 説明                                                                                                                                                     |
| ------                | -----  | ----     | -------                                                                                                                                                         |
| `conditional_formats` | object | いいえ       | 条件付き書式コントロールのオプション。`CONDITIONAL_FORMATS_SCHEMA` の作成方法については、[条件付き書式 JSON スキーマに関するドキュメント][6]を参照してください。 |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/graphing
[2]: /ja/tracing/search/#search-bar
[3]: https://docs.datadoghq.com/ja/logs/explorer/search/#search-syntax
[4]: /ja/graphing/graphing_json/widget_json
[5]: /ja/graphing/graphing_json/request_json
[6]: /ja/graphing/graphing_json/widget_json/#conditional-format-schema