---
title: Get specific embed
type: apicontent
order: 10.3
external_redirect: /api/#get-specific-embed
---

## Get specific embed
Get the HTML fragment for a previously generated embed with embed_id.

Returns: A JSON object with 8 elements:

* embed_id: Token of the embed
* graph_title: Tile of the graph
* dash_name: Name of the dashboard the graph is on (null if none)
* dash_url: URL of the dashboard the graph is on (null if none)
* shared_by: ID of the use who shared the embed
* html: HTML fragment for the embed (iframe)
* revoked: Boolean flag for whther or not the embed is revoked

On failure, the return value is a JSON containing an error message {errors: [messages]}.

##### ARGUMENTS
* **`size`** [*optional*, *default*=**medium**]:  
    The size of the graph. Must be one:
    * **small**, 
    * **medium**, 
    * **large**, 
    * **xlarge**.
* **`legend`** [*optional*, *default*=**no**]:  
    The flag determining if the graph includes a legend. Must be one of **yes** or **no**.
* **`template_variables`** [*optional*, *default*=**None**]:  
    Replace template variables in queries with form $var. To replace $var with val, use var=val as a parameter for each template variable you wish to replace. If any template variables are missing values in the iframe source url, then (*) is used as the value.
