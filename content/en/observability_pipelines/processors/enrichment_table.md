---
title: Enrichment Table Processor
disable_toc: false
products:
- name: Logs
  icon: logs
---

{{< product-availability >}}

## Overview

Use this processor to enrich your logs with information from a reference table, which could be a local file or database.

## Setup

To set up the enrichment table processor:

1. Click **Add enrichment**.
1. Define a **filter query**. Only logs that match the specified [filter query](#filter-query-syntax) are processed. All logs, regardless of whether they do or do not match the filter query, are sent to the next step in the pipeline.
1. In the **Set lookup mapping** section, select the type of reference table you want to use: **Reference Table**, **File** or **GeoIP**.
    - For **Reference Table**, select the reference table in the dropdown menu.
    - For **File**:
        1. Enter the file path.<br>- **Note**: All file paths are made relative to the configuration data directory, which is `/var/lib/observability-pipelines-worker/config/` by default. The file must be owned by the `observability-pipelines-worker group` and `observability-pipelines-worker` user, or at least readable by the group or user.<br>- See [Advanced Worker Configurations][1] for more information. 
        1. Enter the column name. The column name in the enrichment table is used for matching the source attribute value. See the [Enrichment file example](#enrichment-file-example).
    - For **GeoIP**, enter the GeoIP path.
1. Enter the source attribute of the log. The source attribute's value is what you want to find in the reference table.
1. Enter the target attribute. The target attribute's value stores, as a JSON object, the information found in the reference table.
1. Click **Save**.

##### Enrichment file example

For this example, `merchant_id` is used as the source attribute and `merchant_info` as the target attribute.

This is the example reference table that the enrichment processor uses:

| merch_id | merchant_name   | city      | state    |
| -------- | --------------- | --------- | -------- |
| 803      | Andy's Ottomans | Boise     | Idaho    |
| 536      | Cindy's Couches | Boulder   | Colorado |
| 235      | Debra's Benches | Las Vegas | Nevada   |

`merch_id` is set as the column name the processor uses to find the source attribute's value. **Note**: The source attribute's value does not have to match the column name.

If the enrichment processor receives a log with `"merchant_id":"536"`:

- The processor looks for the value `536` in the reference table's `merch_id` column.
- After it finds the value, it adds the entire row of information from the reference table to the `merchant_info` attribute as a JSON object:

```
merchant_info {
    "merchant_name":"Cindy's Couches",
    "city":"Boulder",
    "state":"Colorado"
}
```

{{% observability_pipelines/processors/filter_syntax %}}

[1]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/
