このプロセッサを使用して、ローカルファイルまたはデータベースである参照テーブルからの情報でログを強化します。

強化テーブルプロセッサを設定するには：
1.**フィルタークエリ**を定義します。指定された[フィルタークエリ](#filter-query-syntax)に一致するログのみが処理されます。フィルタークエリに一致するかどうかに関係なく、すべてのログがパイプラインの次のステップに送信されます。
2.ログのソース属性を入力します。ソース属性の値は、参照テーブルで見つけたいものです。
3.ターゲット属性を入力します。ターゲット属性の値は、参照テーブルで見つかった情報をJSONオブジェクトとして格納します。
4.使用したい参照テーブルのタイプを選択します。**ファイル**または**GeoIP**。
   - **ファイル**タイプの場合：
        1.ファイルパスを入力します。<br>**注意**：すべてのファイルパスは、デフォルトで`/var/lib/observability-pipelines-worker/config/`の構成データディレクトリに対して相対的に作成されます。詳細については、[高度なワーカー構成][10172]を参照してください。ファイルは`observability-pipelines-worker group`および`observability-pipelines-worker`ユーザーによって所有されている必要があり、少なくともグループまたはユーザーによって読み取り可能である必要があります。
        1.列名を入力します。強化テーブルの列名は、ソース属性値と一致させるために使用されます。[強化ファイルの例](#enrichment-file-example)を参照してください。
   - **GeoIP**タイプの場合、GeoIPパスを入力します。

##### エンリッチメントファイルの例

この例では、`merchant_id`がソース属性として、`merchant_info`がターゲット属性として使用されます。

これは、エンリッチメントプロセッサが使用する例の参照テーブルです：

| merch_id | merchant_name   | city      | state    |
| -------- | --------------- | --------- | -------- |
| 803      | アンディのオットマン | ボイジー     | アイダホ    |
| 536      | Cindy's Couches | Boulder   | Colorado |
| 235      | Debra's Benches | Las Vegas | Nevada   |

`merch_id`は、プロセッサがソース属性の値を見つけるために使用する列名として設定されています。**注**：ソース属性の値は、列名と一致する必要はありません。

エンリッチメントプロセッサが`"merchant_id":"536"`を含むログを受け取った場合：

- プロセッサは、参照テーブルの`merch_id`列で値`536`を探します。
- 値を見つけた後、参照テーブルからの情報の全行を`merchant_info`属性にJSONオブジェクトとして追加します：

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

[10172]: /ja/observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
<!-- 10172 link is used in multiple shortcodes, so if it is changed, make sure to update those shortcodes using find and replace -->