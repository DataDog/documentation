api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
# comment_id=1382559936236196216

# Create a comment to delete. Use jq (http://stedolan.github.io/jq/download/) to get the comment id.
comment_id=$(curl -X POST -H "Content-type: application/json" \
			-d '{"message" : "This comment was submitted and will be deleted by the api."}' \
			"https://api.datadoghq.com/api/v1/comments?api_key=${api_key}&application_key=${app_key}" | jq -r '.comment.resource|ltrimstr("/api/v1/comments/")')
sleep 1
curl -X DELETE "https://api.datadoghq.com/api/v1/comments/${comment_id}?api_key=${api_key}&application_key=${app_key}"