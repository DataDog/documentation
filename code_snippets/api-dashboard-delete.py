from dogapi import dog_http_api as api

api.api_key = 'apikey_2'
api.application_key = '01a39483d351f4f827571cb7091a39e82f86edcc'
api.api_host = 'https://app.datad0g.com'

dash_id = 1588
print api.delete_dashboard(dash_id)
