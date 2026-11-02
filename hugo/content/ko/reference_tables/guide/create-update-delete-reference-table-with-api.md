---
description: Datadog API를 사용하여 로컬 CSV 파일 기반의 Reference Table을 생성, 업데이트 및 삭제하는 전체 과정을
  안내합니다.
further_reading:
- link: /reference_tables/
  tag: 문서
  text: Reference Tables
- link: /api/latest/reference-tables/
  tag: 문서
  text: Reference Tables API
title: API를 사용하여 Reference Table 생성, 업데이트 및 삭제
---
이 가이드는 [Reference Tables API][1]를 사용하여 로컬 CSV 파일 기반의 Reference Table을 관리하는 전체 워크플로를 보여줍니다. 이 워크플로에서는 업로드를 생성하고 CSV 데이터를 반환된 URL로 푸시한 다음 참조 테이블을 생성하고 새 데이터로 패치한 후 삭제합니다.

다른 CSV 파일을 업로드하지 않고 개별 행을 업데이트하려면 [UI에서 행을 편집][4]하세요.

`<DATADOG_API_KEY>` 및 `<DATADOG_APP_KEY>`를 Datadog API 및 애플리케이션 키로 바꿉니다.

1. 참조 테이블 업로드를 생성합니다. `part_size`에서 CSV `headers`, 업로드할 파트 수 `part_count`, 각 파트의 최대 크기(바이트)를 제공합니다.

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

2. `PUT` 요청을 사용하여 각 파트 URL에 CSV 데이터(파일 자체가 아님)를 업로드합니다. 예를 들어, 다음 내용을 포함하는 `products.csv` 파일이 있다고 가정합니다.

   **참고**: 데이터가 여러 파트에 걸쳐 있는 경우 CSV 행을 균등하게 분할하고 각 청크에 대해 별도의 `PUT` 요청을 `part_urls`의 해당 URL로 보냅니다.

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

3. 1단계에서 `file_metadata.upload_id`의 업로드 `id`를 참조하여 Reference Table을 생성합니다.

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

[1]: /ko/api/latest/reference-tables/
[2]: /ko/api/latest/reference-tables/#update-reference-table
[3]: /ko/api/latest/reference-tables/#delete-table
[4]: /ko/reference_tables/#edit-rows-in-the-ui