このプロセッサを使用すると、ローカルファイルやデータベースなどの参照テーブルから情報を取得し、ログを補強できます。

エンリッチメントテーブルプロセッサを設定するには、次の手順を実行します。
1\.**フィルタークエリ**を定義します。指定された [ フィルタークエリ](#filter-query-syntax)に一致するログのみが処理されます。フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。
2\.ログのソース属性を入力します。ソース属性の値は、参照テーブルで検索する値です。
3\.ターゲット属性を入力します。参照テーブルで見つかった情報は JSON オブジェクトとしてターゲット属性に格納されます。
4\.使用する参照テーブルの種類として **File** または **GeoIP** を選択します。
   - **File** を選択した場合:
        1\.ファイルパスを入力します。<br>**注**:すべてのファイルパスは、デフォルトで `/var/lib/observability-pipelines-worker/config/` の構成データディレクトリを基準とする相対パスになります。詳細については、[高度なワーカー構成][10172]を参照してください。ファイルは `observability-pipelines-worker group` および `observability-pipelines-worker` ユーザーが所有している必要があり、少なくともグループまたはユーザーによって読み取り可能でなければなりません。
        1\.列名を入力します。エンリッチメントテーブル内でソース属性の値との照合に使用される列名です。詳細は[エンリッチメントファイルの例](#enrichment-file-example)を参照してください。
   **GeoIP** を選択した場合は、GeoIP のパスを入力します。

##### エンリッチメントファイルの例

この例では、`merchant_id` をソース属性、`merchant_info` をターゲット属性として使用します。

エンリッチメントプロセッサが使用する参照テーブルの例は次のとおりです。

| merch\_id | merchant\_name   | city      | state    |
| -------- | --------------- | --------- | -------- |
| 803      | Andy's Ottomans | Boise     | Idaho    |
| 536      | Cindy's Couches | Boulder   | Colorado |
| 235      | Debra's Benches | Las Vegas | Nevada   |

`merch_id` は、プロセッサがソース属性の値を見つけるために使用する列名として設定されています。**注**:ソース属性の値は、列名と一致する必要はありません。

`"merchant_id":"536"` を含むログをエンリッチメントプロセッサが受け取った場合:

- プロセッサは、参照テーブルの`merch_id` 列で値 `536` を探します。
- 値が見つかると、参照テーブルの行全体の情報を `merchant_info` 属性に JSON オブジェクトとして追加します。

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

[10172]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- 10172 link is used in multiple shortcodes, so if it is changed, make sure to update those shortcodes using find and replace -->