Use this processor to enrich your logs with information from a reference table, which could be a local file or database.

To set up the enrichment table processor:
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
2. Enter the source attribute of the log. The source attribute's value is what you want to find in the reference table.
3. Enter the target attribute. The target attribute's value stores, as a JSON object, the information found in the reference table.
4. Select the type of reference table you want to use, **File** or **GeoIP**.
   - For the **File** type:
        1. Enter the file path.
        1. Enter the column name. The column name in the enrichment table is used for matching the source attribute value. See the following Enrichment file example.
   - For the **GeoIP** type:
        1. Enter the GeoIP path.

##### Enrichment file example

For this example, `merchant_id` is used as the source attribute and `merchant_info` as the target attribute.

This is the example reference table that the enrichment processor uses:

| merch_id | merchant_name   | city      | state    |
| -------- | --------------- | --------- | -------- |
| 803      | Andy's Ottomans | Boise     | Idaho    |
| 536      | Cindy's Couches | Boulder   | Colorado |
| 235      | Debra's Benches | Las Vegas | Nevada   |

`merch_id` is set as the column name the processor uses to find the source attribute's value. 

If the enrichment processor receives a log with `”merchant_id”:”536”`:

- The processor looks for the value `536` in the reference table's `merch_id` column.
- After it finds the value, it adds the entire row of information from the reference table to the `merchant_info` attribute as a JSON object:

```
merchant_info {
	“merchant_name”:”Cindy’s Couches”,
	“city”:”Boulder”,
	“state”:”Colorado”
}
```

