---
title: Get Specific Embed
type: apicontent
order: 18.3
---

## Get Specific Embed
Get the HTML fragment for a previously generated embed with embed_id.

Returns: A JSON object with 8 elements:

* embed_id: Token of the embed
* graph_title: Tile of the graph
* dash_name: Name of the dashboard the graph is on (null if none)
* dash_url: URL of the dashboard the graph is on (null if none)
* shared_by: ID of the use who shared the embed
* html: HTML fragment for the embed (iframe)
* revoked: Boolean flag for whther or not the embed is revoked

On failure, the return value will be a JSON containing an error message {errors: [messages]}.

##### ARGUMENTS
<ul class="arguments">
    {{< argument name="size" description="The size of the graph. Must be one of small, medium, large, and xlarge." default="medium" >}}
    {{< argument name="legend" description="The flag determining if the graph includes a legend. Must be one of yes or no." default="no" >}}
    {{< argument name="template_variables" description="Replace template variables in queries with form $var. To replace $var with val, use var=val as a parameter for each template variable you wish to replace. If any template variables are missing values in the iframe source url, then (*) will be used as the value." default="None" >}}
</ul>

