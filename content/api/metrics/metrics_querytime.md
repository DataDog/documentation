---
title: Query Time Series Points
type: apicontent
order: 5.3
---

## Query Time Series Points
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