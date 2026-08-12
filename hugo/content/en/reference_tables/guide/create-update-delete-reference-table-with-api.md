---
title: Creating, updating, and deleting a Reference Table with the API
description: Complete walkthrough for creating, updating, and deleting a Reference Table backed by a local CSV file using the Datadog API.
further_reading:
- link: "/reference_tables/"
  tag: "Documentation"
  text: "Reference Tables"
- link: "/api/latest/reference-tables/"
  tag: "Documentation"
  text: "Reference Tables API"
---

This guide shows the complete workflow for managing a Reference Table backed by a local CSV file with the [Reference Tables API][1]. It creates an upload, pushes the CSV data to the returned URLs, creates the table, patches it with new data, and deletes it.

Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API and application keys.

1. Create a reference table upload. Provide the CSV `headers`, the number of parts you plan to upload in `part_count`, and the maximum size of each part in bytes in `part_size`.

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

2. Upload the CSV data (not the file itself) to each part URL with a `PUT` request. For example, given a `products.csv` file with the following content:

   **Note**: If your data spans multiple parts, split the CSV rows evenly and send a separate `PUT` request for each chunk to its corresponding URL in `part_urls`.

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

3. Create the Reference Table, referencing the upload `id` from step 1 in `file_metadata.upload_id`.

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

[1]: /api/latest/reference-tables/
[2]: /api/latest/reference-tables/#update-reference-table
[3]: /api/latest/reference-tables/#delete-table
