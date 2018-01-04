---
title: Query time series points
type: apicontent
order: 5.3
external_redirect: /api/#query-time-series-points
---

## Query time series points
This end point allows you to query for metrics from any time period.

##### ARGUMENTS
* `from` [*required*]:  
    Seconds from the unix epoch
* `to` [*required*]:  
    Seconds to the unix epoch
* `start` [*optional*, *default*=**None**]:  
    Seconds since the unix epoch
* `end` [*optional*, *default*=**None**]:  
    Seconds since the unix epoch
* `query` [*required*]:  
    The query strong