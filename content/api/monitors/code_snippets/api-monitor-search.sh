api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

query=<MANAGE_MONITOR_QUERY>
page=<PAGE_NUMBER>
per_page=<PER_PAGE>
sort=<SORT>

curl -X GET -H "Content-type: application/json" -d \
    "https://api.datadoghq.com/api/v1/monitor/search?api_key=${api_key}&application_key=${app_key}&query=${query}&page=${page}&pre_page=${per_page}&sort=${sort}"