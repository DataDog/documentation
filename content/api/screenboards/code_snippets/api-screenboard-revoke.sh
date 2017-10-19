api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
board_id=6334

# Create a screenboard to share
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
"https://app.datadoghq.com/api/v1/screen?api_key=${api_key}&application_key=${app_key}" | jq '.id')

# Share it
curl -X GET \
"https://app.datadoghq.com/api/v1/screen/share/${board_id}?api_key=${api_key}&application_key=${app_key}"

# Revoke the sharing
curl -X DELETE \
"https://app.datadoghq.com/api/v1/screen/share/${board_id}?api_key=${api_key}&application_key=${app_key}"
