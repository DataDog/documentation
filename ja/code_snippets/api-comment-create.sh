api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl  -X POST -H "Content-type: application/json" \
-d '{
        "message" : "There is a problem with the database."
    }' \
"https://api.datadoghq.com/api/v1/comments?api_key=${api_key}&application_key=${app_key}"
