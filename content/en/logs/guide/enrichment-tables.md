---
title: Add Custom Metadata to Logs with Enrichment Tables
kind: guide
beta: true
further_reading:
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "/logs/processing/parsing/"
  tag: "Documentation"
  text: "Learn more about parsing"
---

<div class="alert alert-warning">
The Enrichment Tables feature is currently in private beta. For more information, contact <a href="https://docs.datadoghq.com/help/">Datadog support</a>.
</div>

## Overview

Define new entities in Datadog like customer details, service names and information, or IP addresses by uploading a CSV file containing a table of information. This is represented by a primary key in an Enrichment Table and the associated metadata. This data can be applied as tags to logs at ingest time in the [Lookup Processor][1].

{{< img src="logs/guide/enrichment-tables/overview.png" alt="Enrichment Tables" style="width:100%;">}}

## Create an Enrichment Table

Create an Enrichment Table by uploading a CSV file, naming all the appropriate columns, and defining the primary key, on which all lookups will happen.

{{< img src="logs/guide/enrichment-tables/configure-enrichment-table.png" alt="Create an Enrichment Table" style="width:100%;">}}

This Enrichment Table can now be used to add additional attributes to logs with the [Lookup Processor][1].

## Modify an Enrichment Table

In order to modify an existing Enrichment Table with new data, click the **Update Data +** button in the top right corner. The CSV that is selected will be upserted into the table, meaning that all existing rows with the same primary key will be updated, and all new rows will be added. Once the table is saved, the upserted rows will be processed asynchronously and will be updated in the preview. It may take up to 10 minutes for the updated rows to appear in affected logs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/processors/?tab=ui#lookup-processor
