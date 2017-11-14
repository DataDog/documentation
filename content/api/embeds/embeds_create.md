---
title: Create Embed
type: apicontent
order: 18.2
---

## Create Embed

Creates a new embeddable graph.

Returns: A JSON consisting of the same elements returned by GET api/v1/graph/embed/:embed_id. On failure, the return value will be a JSON containing an error message {errors: [messages]}.

Note: If an embed already exists for the exact same query in a given organization, the older embed will be returned instead of creating a new embed.

##### ARGUMENTS
* `graph_json` [*required*]:  
    The graph definition in JSON. Same format that is available on the JSON tab of the graph editor
* `timeframe` [*optional*, *default*=**1_hour**]:  
    The timegrame for the graph. Must be one of:
    * **1_hour**,
    * **4_hours**, 
    * **1_day**, 
    * **2_days**,
    * **1_week**.
* `size` [*optional*, *default*=**medium**]:  
    The size of the graph. Must be one:
    * **small**, 
    * **medium**, 
    * **large**, 
    * **xlarge**.
* `legend` [*optional*, *default*=**no**]:  
    The flag determining if the graph includes a legend. Must be one of **yes** or **no**.
* `title` [*optional*, *default*=**Embed created through API**]:  
    Determines graph title.  
    *Must be at least 1 character.*