---
title: Embeddable Graphs
type: apicontent
order: 17
---
## Embeddable Graphs
You can interact with embeddable graphs through the API.

## Get All Embeds
Gets a list of previously created embeddable graphs.

Returns: A JSON list containing information on previously created embeds from both the UI and the API. Each JSON graph response is in the same format as returned by GET api/v1/graph/embed/:embed_id.

ARGUMENTS

This end point takes no JSON arguments.'

## Create Embed

Creates a new embeddable graph.

Returns: A JSON consisting of the same elements returned by GET api/v1/graph/embed/:embed_id. On failure, the return value will be a JSON containing an error message {errors: [messages]}.

Note: If an embed already exists for the exact same query in a given organization, the older embed will be returned instead of creating a new embed.

ARGUMENTS

graph_json [required]
The graph definition in JSON. Same format that is available on the JSON tab of the graph editor
timeframe [optional, default=1_hour]
The timegrame for the graph. Must be one of 1_hour, 4_hours, 1_day, 2_days, and 1_week.
size [optional, default=medium]
The size of the graph. Must be one of small, medium, large, and xlarge.
legend [optional, default=no]
The flag determining if the graph includes a legend. Must be one of yes or no.
title [optional, default=Embed created through API]
Determines graph title. Must be at least 1 character.

## Get Specific Embed
Get the HTML fragment for a previously generated embed with embed_id.

Returns: A JSON object with 8 elements:

embed_id: Token of the embed
graph_title: Tile of the graph
dash_name: Name of the dashboard the graph is on (null if none)
dash_url: URL of the dashboard the graph is on (null if none)
shared_by: ID of the use who shared the embed
html: HTML fragment for the embed (iframe)
revoked: Boolean flag for whther or not the embed is revoked
On failure, the return value will be a JSON containing an error message {errors: [messages]}.

ARGUMENTS

size [optional, default=medium]
The size of the graph. Must be one of small, medium, large, and xlarge.
legend [optional, default=no]
The flag determining if the graph includes a legend. Must be one of yes or no.
template_variables [optional, default=None]
Replace template variables in queries with form $var. To replace $var with val, use var=val as a parameter for each template variable you wish to replace. If any template variables are missing values in the iframe source url, then (*) will be used as the value.

## Enable Embed
Enable a specified embed.

Returns: A JSON containing the success message {success: [message]}. On failure, the return value will be a JSON containing an error message {errors: [messages]}.

ARGUMENTS

This end point takes no JSON arguments.'

## Revoke Embed
Revoke a specified embed.

Returns: A JSON containing the success message {success: [message]}. On failure, the return value will be a JSON containing an error message {errors: [messages]}.

ARGUMENTS

This end point takes no JSON arguments.'