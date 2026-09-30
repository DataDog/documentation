---
id: partition_attribute
title: partition attribute
core_product:
  - log management
related_terms:
  - lookup_attribute
  - archive_search
---
A partition attribute groups archived logs in storage by common field values (such as `service` or `env`). When running an [Archive Search](/logs/explorer/archive_search/), Datadog skips entire partitions that don't match the query, reducing the volume of data scanned. Use low-cardinality attributes as partition attributes. You can configure up to 2 partition attributes per archive.
