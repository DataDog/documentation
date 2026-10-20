---
description: Guía completa para crear, actualizar y eliminar una Reference Table respaldada
  por un archivo CSV local mediante la Datadog API.
further_reading:
- link: /reference_tables/
  tag: Documentación
  text: Tablas de referencia
- link: /api/latest/reference-tables/
  tag: Documentación
  text: Reference Tables API
title: Creación, actualización y eliminación de una Reference Table con la API
---
Esta guía muestra el flujo de trabajo completo para administrar una Reference Table respaldada por un archivo CSV local con la [Reference Tables API][1]. Crea una carga, envía los datos CSV a las URL devueltas, crea la tabla, la actualiza con nuevos datos y la elimina.

Para actualizar filas individuales sin cargar otro archivo CSV, [edite las filas en la UI][4].

Reemplace `<DATADOG_API_KEY>` y `<DATADOG_APP_KEY>` con sus claves de Datadog API y de aplicación.

1. Crear una carga de Reference Table. Proporcione el CSV `headers`, el número de partes que planea cargar en `part_count` y el tamaño máximo de cada parte en bytes en `part_size`.

   ```shell
   curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/v2/reference-tables/uploads" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <DATADOG_API_KEY>" \
   -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
   -d '{"
     \"data\": {"
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

2. Cargue los datos CSV (no el archivo en sí) en la URL de cada parte con una solicitud `PUT`. Por ejemplo, dado un archivo `products.csv` con el siguiente contenido:

   **Nota**: Si sus datos abarcan varias partes, divida las filas del CSV de manera uniforme y envíe una `PUT` solicitud por separado para cada fragmento a su URL correspondiente en `part_urls`.

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

3. Cree la Reference Table, haciendo referencia a la carga `id` del paso 1 en `file_metadata.upload_id`.

   ```shell
   curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/v2/reference-tables/tables" \
   -H "Content-Type: application/json" \
   -H "DD-API-KEY: <DATADOG_API_KEY>" \
   -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
   -d '{"
     \"data\": {"
       "type": "reference_table",
       "attributes": {
         "table_name": "my_products_table",
         "description": "Catálogo de productos cargado mediante archivo local",
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
   -d '{"
     \"data\": {"
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

[1]: /es/api/latest/reference-tables/
[2]: /es/api/latest/reference-tables/#update-reference-table
[3]: /es/api/latest/reference-tables/#delete-table
[4]: /es/reference_tables/#edit-rows-in-the-ui