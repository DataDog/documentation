api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

# retrieve all screenboards (dashboard with `free` layout)
query="dashboard_type:custom_screenboard"

# retrieve all timeboards (dashboard with `ordered` layout)
query="dashboard_type:custom_timeboard"

# retrieve all custom dashboards (dashboard with `free` or `ordered` layout)
query="dashboard_type:custom_screenboard,custom_timeboard"

curl "https://api.datadoghq.com/api/v1/dashboards?query=${query}?api_key=${api_key}&application_key=${app_key}"
