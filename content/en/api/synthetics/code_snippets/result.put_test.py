{
    "status": "live",
    "public_id": "aaa-bbb-ccc",
    "tags": ["foo:bar"],
    "locations": ["aws:us-east-2", "aws:eu-central-1", "aws:ca-central-1", "aws:eu-west-2", "aws:ap-northeast-1", "aws:us-west-2", "aws:ap-southeast-2"],
    "message": "test-edited",
    "deleted_at": null,
    "name": "Test",
    "type": "api",
    "created_at": "2019-04-12T12:29:34.379537+00:00",
    "modified_at": "2019-04-12T12:29:34.379537+00:00",
    "config": {
        "request": {"url": "https://datadoghq.com", "headers": {"sdf": "fds", "Cookie": "qds"}, "body": "fs", "method": "GET", "timeout": 30},
        "assertions": [
            {"operator": "is", "type": "statusCode", "target": 403},
            {"operator": "is", "property": "content-type", "type": "header", "target": "text/html"},
            {"operator": "lessThan", "type": "responseTime", "target": 2000}
        ]
    },
    "options": {"follow_redirects": true, "min_failure_duration": 0, "tick_every": 60, "min_location_failed": 1}
}