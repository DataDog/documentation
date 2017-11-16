---
title: Usage Metering
type: apicontent
order: 20.2
---

## Get Hourly Usage For Custom Metrics.

Get Hourly Usage For [Custom Metrics](/getting_started/custom_metrics/).

##### Arguments
* `start_hr` [*required*]:  
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage beginning at this hour
* `end_hr` [*optional*, *default*=**1d+start_hr**]:  
    datetime in ISO-8601 format, UTC, precise to hour: [YYYY-MM-DDThh] for usage ending BEFORE this hour