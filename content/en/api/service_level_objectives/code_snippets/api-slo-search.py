from datadog import initialize, api

options = {
    'api_key': '<YOUR_API_KEY>',
    'app_key': '<YOUR_APP_KEY>'
}

initialize(**options)


# search with a list of IDs
slo_ids = ["<YOUR_SLO_ID>", "<YOUR_SLO_ID>"]

api.ServiceLevelObjective.get_all(ids=slo_ids, offset=0)

# search with a query
query = "tags:app:frontend"
api.ServiceLevelObjective.get_all(query=query, offset=0)
