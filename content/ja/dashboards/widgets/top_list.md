---
title: トップリストウィジェット
kind: documentation
aliases:
  - /ja/graphing/widgets/top_list/
further_reading:
  - link: /dashboards/timeboards/
    tag: ドキュメント
    text: Timeboards
  - link: /dashboards/screenboards/
    tag: ドキュメント
    text: スクリーンボード
  - link: /dashboards/graphing_json/
    tag: ドキュメント
    text: JSON を使用したダッシュボードの構築
  - link: /notebooks/
    tag: ドキュメント
    text: ノートブック
---
トップリスト可視化機能を使用すると、`hostname`、`service` などのタグ値のリストを任意のメトリクス値の最大値または最小値と共に表示できます。たとえば、CPU を多く使用しているサービス、ディスクの空き容量が少ないホストなどをリストできます。

{{< img src="dashboards/widgets/toplist/toplist.png" alt="トップリスト" >}}

## セットアップ

{{< img src="dashboards/widgets/toplist/toplist_setup.png" alt="トップリスト"  style="width:80%;">}}

### コンフィギュレーション

1. グラフ化するデータを選択します。
    * Metric: メトリクスのクエリを構成するには、[クエリ作成][6]のドキュメントを参照してください。
    * Indexed Span : Indexed Span クエリの構成については、[トレース検索に関するドキュメント][2]を参照してください。
    * ログイベント: ログイベントクエリの構成については、[ログ検索に関するドキュメント][1]を参照してください。

2. オプション: エントリの値に応じて、条件付き書式を構成します。

### オプション

#### グローバルタイム

スクリーンボードとノートブックの場合にのみ、ウィジェットがカスタムタイムフレームを持つか、グローバルタイムフレームを使用するかを選択します。

#### タイトル

`Show a Title` チェックボックスをオンにして、ウィジェットのカスタムタイトルを表示します。

{{< img src="dashboards/widgets/options/title.png" alt="ウィジェットのタイトル"  style="width:80%;">}}

オプションで、サイズと配置を定義できます。

## API

トップリストウィジェットの[ウィジェット JSON スキーマ定義][3]は次のとおりです。

```text
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

| パラメーター  | 型             | 必須 | 説明                                                                                                                                                  |
|------------|------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `type`     | 文字列           | はい      | ウィジェットのタイプ。トップリストウィジェットには `toplist` を使用します。                                                                                                       |
| `requests` | オブジェクトの配列 | はい      | ウィジェットに表示する 1 つの `request` オブジェクトの配列。`REQUEST_SCHEMA` の作成方法については、[リクエスト JSON スキーマに関するドキュメント][4]を参照してください。 |
| `title`    | 文字列           | いいえ       | ウィジェットのタイトル。                                                                                                                                        |

`request` オブジェクトでは、以下のプロパティも使用できます。

```text
{
   "conditional_formats": CONDITIONAL_FORMATS_SCHEMA
}
```

| パラメーター             | 型   | 必須 | 説明                                                                                                                                                     |
|-----------------------|--------|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `conditional_formats` | object | いいえ       | 条件付き書式コントロールのオプション。`CONDITIONAL_FORMATS_SCHEMA` の作成方法については、[条件付き書式 JSON スキーマに関するドキュメント][5]を参照してください。 |

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/search_syntax/
[2]: /ja/tracing/app_analytics/search/#search-bar
[3]: /ja/dashboards/graphing_json/widget_json/
[4]: /ja/dashboards/graphing_json/request_json/
[5]: /ja/dashboards/graphing_json/widget_json/#conditional-format-schema
[6]: /ja/dashboards/querying/