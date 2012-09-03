api_key=9775a026f1ca7d1c6c5af9d94d9595a4
app_key=87ce4a24b5553d2e482ea8a8500e71b8ad4554ff
comment_id=1382557387240472966

curl -X PUT -H "Content-type: application/json" \
-d '{
        "message" : "Actually, I am changing my mind."
    }' \
"https://app.datadoghq.com/api/v1/comments/${comment_id}?api_key=${api_key}&application_key=${app_key}"
