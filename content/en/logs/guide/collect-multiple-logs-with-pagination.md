---
title: Collect multiple logs with Pagination
kind: guide
disable_toc: true
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Discover how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/live_tail"
  tag: "Documentation"
  text: "Datadog live tail functionality"
- link: "logs/explorer"
  tag: "Documentation"
  text: "See how to explore your logs"
- link: "logs/logging_without_limits"
  tag: "Documentation"
  text: "Logging without limit"
---

## Overview

To retrieve a log list longer than the maximum 1000 logs limit with the [Log List API][1] you must use the Pagination feature. Find below an example of how it works.

Let's build a query to retrieve all logs for a given day:

```bash
curl -X POST \
  'https://api.datadoghq.com/api/v1/logs-queries/list?api_key=<DATADOG_API_KEY>&application_key=<DATADOG_APPLICATION_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{
    "limit": 1000,
    "query": "*",
    "sort": "desc",
    "time": {
        "from": "2019-08-07T00:00:00Z",
        "to": "2019-08-06T00:00:00Z"
    }'
```

The result has the following shape:

```json
{
    "logs": [
        "(...)"
    ],
    "nextLogId": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
    "status": "done",
    "requestId": "cDdWYB0tAm1TYHFsQVZ2R05QWm9nQXx5cFM4aExkLVFPNlhZS21RTGxTUGZ3"
}
```

The `logs` parameter is an array of Log objects and at maximum it contains as many logs as defined with the `limit` parameter.
But if the amount of logs that matched your query is superior to the `limit` then the `nextLogId` parameter is available.

**The `nextLogId` parameters indicates that the query you entered matched more logs than Datadog can return at once**.

In order to retrieve all your logs you need to re-send your query but this time with the `startAt` parameter with the value of `nextLogId` from the previous call:

```bash
curl -X POST \
  'https://api.datadoghq.com/api/v1/logs-queries/list?api_key=<DATADOG_API_KEY>&application_key=<DATADOG_APPLICATION_KEY>' \
  -H 'Content-Type: application/json' \
  -d '{
    "limit": 1000,
    "query": "*",
    "startAt": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
    "sort": "desc",
    "time": {
        "from": "2019-08-07T00:00:00Z",
        "to": "2019-08-06T00:00:00Z"
    }'
```

Which produce the following results

```json
{
    "logs": [
        "(...)"
    ],
    "nextLogId": "EEEEEEEEEEEEEEEEFFFFFFFFFFFFFFGGGGGGGGGGHHHHHHHHHH",
    "status": "done",
    "requestId": "YVhETk5jQy1TQkDFSFjqU3fhQMh5QXx6M2pSUlA1ODhXNk5PT2NOSUVndThR"
}
```

And so on and so forth until the parameter `nextLogId` is not included within the JSON response which indicates that you retrieved all Logs associated to your query on your time frame.

**Notes**: For better control over pagination results, you should use an absolute `time` parameter - don't use the`now` keyword.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
[1]: /api/?lang=bash#get-a-list-of-logs
