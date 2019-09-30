#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

query=<SLO_LIST_QUERY>
offset=<OFFSET>
limit=<LIMIT>

curl -X GET \
    "https://api.datadoghq.com/api/v1/slo?api_key=${api_key}&application_key=${app_key}&query=${query}&offset=${page}&limit=${per_page}"
