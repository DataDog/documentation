---
description: Datadog API を使用して、ローカル CSV ファイルに裏打ちされた Reference Table を作成、更新、削除するための完全なウォークスルーです。
further_reading:
- link: /reference_tables/
  tag: ドキュメント
  text: リファレンステーブル
- link: /api/latest/reference-tables/
  tag: ドキュメント
  text: Reference Tables API
title: API を使用した Reference Table の作成、更新、削除
---
このガイドでは、[Reference Tables API][1] を使用して、ローカル CSV ファイルに裏打ちされた Reference Table を管理するための完全なワークフローを紹介します。アップロードを作成し、CSV データを返された URL にプッシュし、テーブルを作成し、新しいデータでパッチを適用し、それを削除します。

別の CSV ファイルをアップロードせずに個々の行を更新するには、[UI で行を編集][4] してください。

`<DATADOG_API_KEY>` と `<DATADOG_APP_KEY>` を、お使いの Datadog API キーとアプリケーションキーに置き換えます。

1. Reference Table のアップロードを作成します。CSV `headers`、アップロードを予定しているパート数を `part_count`、各パートの最大サイズ（バイト単位）を `part_size` に指定します。

   ```shell
   curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/v2/reference-tables/uploads" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <DATADOG_API_KEY>" \
   -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
   -d '{
     "data": {
       "type": "upload",
       "attributes": {
         "table_name": "my_products_table",
         "headers": ["product_id", "product_name", "price"],
         "part_count": 1,
         "part_size": 10000000
       }
     }
   }'
   ```

   The response contains an upload `id` and a `part_urls` array with one URL for each part:

   ```json
   {
     "data": {
       "id": "00000000-0000-0000-0000-000000000000",
       "type": "upload",
       "attributes": {
         "part_urls": ["https://example.com/upload-part-1"]
       }
     }
   }
   ```

2. CSV データ（ファイルそのものではありません）を、`PUT` リクエストを使用して各パートの URL にアップロードします。例えば、以下の内容を持つ `products.csv` ファイルの場合：

   **注**: データが複数のパートにまたがる場合は、CSV 行を均等に分割し、各チャンクに対して個別の `PUT` リクエストを `part_urls` 内の対応する URL に送信してください。

   ```csv
   product_id,product_name,price
   1,Widget,9.99
   2,Gadget,19.99
   ```

   ```shell
   curl -X PUT "https://example.com/upload-part-1" \
   -H "Content-Type: text/csv" \
   --data-binary @products.csv
   ```

3. ステップ 1 のアップロード `id` を `file_metadata.upload_id` で参照して、Reference Table を作成します。

   ```shell
   curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/v2/reference-tables/tables" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <DATADOG_API_KEY>" \
   -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
   -d '{
     "data": {
       "type": "reference_table",
       "attributes": {
         "table_name": "my_products_table",
         "description": "Product catalog uploaded via local file",
         "source": "LOCAL_FILE",
         "file_metadata": {
           "upload_id": "00000000-0000-0000-0000-000000000000"
         },
         "schema": {
           "fields": [
             {"name": "product_id", "type": "STRING"},
             {"name": "product_name", "type": "STRING"},
             {"name": "price", "type": "STRING"}
           ],
           "primary_keys": ["product_id"]
         },
         "tags": ["team:ecommerce"]
       }
     }
   }'
   ```

   The response contains the new table's `id`, which you use in the following steps.

4. To update the table's data, repeat steps 1 and 2 to upload a new CSV file, then call the [Update Reference Table endpoint][2] with the new `upload_id`.

   **Note**: The upserted CSV replaces matching rows, adds new rows, and removes rows no longer present in the file.

   ```shell
   curl -X PATCH "https://api.{{< region-param key="dd_site" >}}/api/v2/reference-tables/tables/<TABLE_ID>" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <DATADOG_API_KEY>" \
   -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
   -d '{
     "data": {
       "type": "reference_table",
       "attributes": {
         "file_metadata": {
           "upload_id": "11111111-1111-1111-1111-111111111111"
         },
         "schema": {
           "fields": [
             {"name": "product_id", "type": "STRING"},
             {"name": "product_name", "type": "STRING"},
             {"name": "price", "type": "STRING"}
           ],
           "primary_keys": ["product_id"]
         }
       }
     }
   }'
   ```

5. To delete the table, call the [Delete Reference Table endpoint][3] with the table's `id`.

   ```shell
   curl -X DELETE "https://api.{{< region-param key="dd_site" >}}/api/v2/reference-tables/tables/<TABLE_ID>" \
   -H "DD-API-KEY: <DATADOG_API_KEY>" \
   -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
   ```

[1]: /ja/api/latest/reference-tables/
[2]: /ja/api/latest/reference-tables/#update-reference-table
[3]: /ja/api/latest/reference-tables/#delete-table
[4]: /ja/reference_tables/#edit-rows-in-the-ui