---
related_terms:
- collection interval
title: minimum resolution
---
Minimum resolution is the shortest interval between datapoints for which Datadog can retain unique records. For example, if the minimum resolution is 1 second, only one value per unique combination of tags and metrics can be stored within each 1-second window. Any subsequent value sent within the same second overwrites the previous value. 

While minimum resolution defines the minimum time granularity Datadog *can* support, the <a href="/glossary/#collection-interval">collection interval</a> defines the *default* frequency at which Datadog reports datapoints.