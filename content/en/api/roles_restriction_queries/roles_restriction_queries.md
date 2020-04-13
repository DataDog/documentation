---
title: Roles restriction queries for logs
type: apicontent
order: 38
external_redirect: /api/#restriction-queries
---

## Roles restriction queries for logs

To grant read access on log data at all, you **must** grant the `logs_read_data` permission. From there you can limit what data a role grants read access to by associating a Restriction Query with that role.

A Restriction Query is a logs query that restricts which logs the `logs_read_data` permission grants read access to. For users whose roles have Restriction Queries, any log query they make only returns those log events that also match one of their Restriction Queries. This is true whether the user queries log events from any log-related feature, including the log explorer, live-tail, rehydration, or a dashboard widget.

Restriction Queries currently only support use of the following components of log events:

* Reserved Attributes
* The log message
* tags

The recommended way to manage restricted read access on log data for customers with large or complicated organizational structures is to add a "team" tag to log events to indicate which team(s) own(s) them, and then to scope Restriction Queries to the appropriate values of the "team" tag. Tags can be applied to log events in many ways, and a log event can have multiple tags with the same key (like "team") and different values -- in this way the same log event can be visible to roles whose restriction queries are scoped to different "team" values.
