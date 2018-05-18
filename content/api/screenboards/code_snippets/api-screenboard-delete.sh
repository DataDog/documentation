api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
board_id=2471

# Create a screenboard to delete
board_id=$(curl -X POST -H "Content-type: application/json" \
-d '{
        "width": 1024,
        "height": 768,
        "board_title": "dogapi tests",
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
"https://api.datadoghq.com/api/v1/screen?api_key=${api_key}&application_key=${app_key}" | jq '.id')

curl -X DELETE \
"https://api.datadoghq.com/api/v1/screen/${board_id}?api_key=${api_key}&application_key=${app_key}"