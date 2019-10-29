api_key=<YOUR_API_KEY>
app_key=<YOUR_APP_KEY>
comment_id=<COMMENT_ID>

# Create a comment to edit. Use jq (http://stedolan.github.io/jq/download/) to get the comment id.
comment_id=$(curl -X POST -H "Content-type: application/json" -H "DD-API-KEY: ${api_key}" -H "DD-APPLICATION-KEY: ${app_key}" -d '{"message" : "This comment was submitted and will be edited by the api."}' "https://api.datadoghq.com/api/v1/comments}" | jq -r '.comment.resource|ltrimstr("/api/v1/comments/")')

curl -X PUT \
-H "Content-type: application/json" \
-H "DD-API-KEY: ${api_key}" \
-H "DD-APPLICATION-KEY: ${app_key}" \
-d '{
        "message" : "Actually, I am changing my mind."
}' \
"https://api.datadoghq.com/api/v1/comments/${comment_id}"
