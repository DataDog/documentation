---
title: Embed の作成
type: apicontent
order: 11.2
external_redirect: '/api/#create-embed'
---
## Embed の作成

埋め込み可能なグラフを新しく作成します。

戻り値: GET api/v1/graph/embed/<EMBED_ID> から返される応答と同じ要素で構成される JSON。失敗すると、戻り値は、エラーメッセージ {errors: [messages]} を含む JSON になります。

注: 指定されたオーガニゼーションにまったく同じクエリに対応する Embed が既に存在する場合、新しい Embed は作成されず、古い Embed が返されます。

テンプレート変数の使用に関心がある方は、[テンプレート変数を使用した埋め込み可能なグラフ][1]を参照してください。

**引数**:

* **`graph_json`** [*必須*]:
    JSON 形式のグラフ定義。グラフエディターの JSON タブで使用できる形式と同じです。
* **`timeframe`** [*オプション*、*デフォルト*=**1_hour**]:
    グラフのタイムフレーム。以下のいずれかでなければなりません。
    * **1_hour**
    * **4_hours**,
    * **1_day**,
    * **2_days**
    * **1_week**
* **`size`** [*オプション*、*デフォルト*=**medium**]:
    グラフのサイズ。以下のいずれかでなければなりません。
    * **small**,
    * **medium**,
    * **large**,
    * **xlarge**
* **`legend`** [*オプション*、*デフォルト*=**no**]:
    グラフに凡例を含めるかどうかを決定するフラグ。**yes** または **no** のいずれかでなければなりません。
* **`title`** [*オプション*、*デフォルト*=**Embed created through API**]:
    グラフのタイトルを指定します。
    1 文字以上でなければなりません。

[1]: /ja/dashboards/faq/embeddable-graphs-with-template-variables