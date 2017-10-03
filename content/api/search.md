## Search
This end point allows you to search for entities from the last 24 hours in Datadog. The currently searchable entities are:

hosts
metrics
ARGUMENTS

q [required]
The query string
QUERY LANGUAGE

Search queries allow for limited faceting. Available facets are:

hosts
metrics
Faceting your search limits your results to only matches of the specified type. Un-faceted queries return results for all possible types.

Un-faceted queries are of the form:

query_string
Faceted queries are of the form:

facet:query_string