---
title: flush interval
core_product:
  - datadog agent
  - metrics
related_terms:
  - variance
---
The Datadog Agent doesn’t make a separate request to Datadog’s servers for every single data point you send. 

Instead, it reports values collected over a flush time interval. For more information, <a href="/developers/dogstatsd/?tab=hostagent#how-it-works">see the documentation</a>.