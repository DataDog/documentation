---
id: lookup_attribute
title: lookup attribute
core_product:
  - log management
related_terms:
  - partition_attribute
  - archive_search
---
A lookup attribute creates an index for high-cardinality fields (such as `trace_id` or `user_id`) in log archives. When running an [Archive Search](/logs/explorer/archive_search/), Datadog uses this index to pinpoint specific logs without scanning the full archive, speeding up targeted investigations. You can configure up to 2 lookup attributes per archive.
