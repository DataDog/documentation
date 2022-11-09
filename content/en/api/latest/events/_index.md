---
title: Events
---
The events service allows you to programmatically post events to the event stream
and fetch events from the event stream. Events are limited to 4000 characters.
If an event is sent out with a message containing more than 4000 characters, only the
first 4000 characters are displayed.

## Get a list of events

List endpoint returns events that match an events search query.
[Results are paginated similarly to logs](https://docs.datadoghq.com/logs/guide/collect-multiple-logs-with-pagination).

Use this endpoint to see your latest events.

## Search events

List endpoint returns events that match an events search query.
[Results are paginated similarly to logs](https://docs.datadoghq.com/logs/guide/collect-multiple-logs-with-pagination).

Use this endpoint to build complex events filtering and search.

