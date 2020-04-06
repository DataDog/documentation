{
    "name": <WEBHOOK_NAME>,
    "url": <WEBHOOK_URL>,
    "payload": '{"body": "$EVENT_MSG", "last_updated": "$LAST_UPDATED", "event_type": "$EVENT_TYPE", "title": "$EVENT_TITLE", "date": "$DATE", "org": {"id": "$ORG_ID", "name": "$ORG_NAME"}, "id": "$ID"}',
    "custom_headers": null,
    "encode_as": "json",
}
