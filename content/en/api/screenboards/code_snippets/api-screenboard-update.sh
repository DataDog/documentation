api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>

curl -X PUT -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi test",
        "widgets": [
            {
              "type": "image",
              "height": 20,
              "width": 32,
              "y": 7,
              "x": 32,
              "url": "https://path/to/image.jpg"
            }
        ]
}' \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${api_key}&application_key=${app_key}"

