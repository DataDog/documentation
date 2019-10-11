#!/bin/sh
# Replace the API and APP keys below
# with the ones for your account

api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

query=<MANAGE_MONITOR_QUERY>
page=<PAGE_NUMBER>
per_page=<PER_PAGE>
sort=<SORT>

curl -X GET \
    "https://api.datadoghq.com/api/v1/monitor/groups/search?api_key=${api_key}&application_key=${app_key}&query=${query}&page=${page}&per_page=${per_page}&sort=${sort}"
