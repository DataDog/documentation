---
title: Category Processor
processor_name: category-processor
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Use the category processor to add a new attribute (without spaces or special characters in the new attribute name) to a log matching a provided search query. Then, use categories to create groups for an analytical view (for example, URL groups, machine groups, environments, and response time buckets).

**Notes**:

* The syntax of the query is the one in the [Log Explorer][6] search bar. This query can be done on any log attribute or tag, whether it is a facet or not. Wildcards can also be used inside your query.
* Once the log has matched one of the processor queries, it stops. Make sure they are properly ordered in case a log could match several queries.
* The names of the categories must be unique.
* Once defined in the category processor, you can map categories to log status using the log status remapper.

## Use Cases

## API

{{< log-processor-api >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[6]: /logs/search_syntax/

