---
description: Procédure complète pour créer, mettre à jour et supprimer une Reference
  Table basée sur un fichier CSV local à l'aide de la Datadog API.
further_reading:
- link: /reference_tables/
  tag: Documentation
  text: Reference Tables
- link: /api/latest/reference-tables/
  tag: Documentation
  text: API Reference Tables
title: Création, mise à jour et suppression d'une Reference Table avec l'API
---
Ce guide présente le workflow complet pour gérer une Reference Table basée sur un fichier CSV local avec l'[API Reference Tables][1]. Il crée un téléchargement, envoie les données CSV vers les URL renvoyées, crée la table, la met à jour avec de nouvelles données et la supprime.

Pour mettre à jour des lignes individuelles sans télécharger un autre fichier CSV, [modifiez les lignes dans l'interface utilisateur][4].

Remplacez `<DATADOG_API_KEY>` et `<DATADOG_APP_KEY>` par vos clés d'API et d'application Datadog.

1. Créez un téléchargement de Reference Table. Indiquez le `headers` CSV, le nombre de parties que vous prévoyez de télécharger dans `part_count`, et la taille maximale de chaque partie en octets dans `part_size`.

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

2. Téléchargez les données CSV (pas le fichier lui-même) vers l'URL de chaque partie avec une requête `PUT`. Par exemple, étant donné un fichier `products.csv` avec le contenu suivant :

   **Note** : Si vos données couvrent plusieurs parties, divisez les lignes CSV de manière égale et envoyez une requête `PUT` distincte pour chaque segment vers son URL correspondante dans `part_urls`.

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

3. Créez la Reference Table, en faisant référence au téléchargement `id` de l'étape 1 dans `file_metadata.upload_id`.

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
         "description": "Catalogue de produits téléchargé via un fichier local",
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

[1]: /fr/api/latest/reference-tables/
[2]: /fr/api/latest/reference-tables/#update-reference-table
[3]: /fr/api/latest/reference-tables/#delete-table
[4]: /fr/reference_tables/#edit-rows-in-the-ui