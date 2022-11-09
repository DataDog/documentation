---
title: Logs Restriction Queries
---
**Note: This endpoint is in public beta. If you have any feedback, contact [Datadog support](https://docs.datadoghq.com/help/).**

To grant read access on log data at all, you must grant the `logs_read_data` permission.
From there you can limit what data a role grants read access to by associating a Restriction Query with that role.

A Restriction Query is a logs query that restricts which logs the `logs_read_data` permission grants read access to.
For users whose roles have Restriction Queries, any log query they make only returns those log events that also match
one of their Restriction Queries. This is true whether the user queries log events from any log-related feature, including
the log explorer, Live Tail, re-hydration, or a dashboard widget.

Restriction Queries currently only support use of the following components of log events:

- Reserved attributes
- The log message
- Tags

The recommended way to manage restricted read access on log data for customers with large or complicated organizational structures
is to add a team tag to log events to indicate which team(s) own(s) them, and then to scope Restriction Queries to the appropriate
values of the team tag. Tags can be applied to log events in many ways, and a log event can have multiple tags with the same key (like team)
and different values—in this way the same log event can be visible to roles whose restriction queries are scoped to different team values.

You need an API and application key with Admin rights to interact with this endpoint.

## List restriction queries

Returns all restriction queries, including their names and IDs.

## Create a restriction query

Create a new restriction query for your organization.

## Get restriction query for a given role

Get restriction query for a given role.

## Get all restriction queries for a given user

Get all restriction queries for a given user.

## Delete a restriction query

Deletes a restriction query.

## Get a restriction query

Get a restriction query in the organization specified by the restriction query's `restriction_query_id`.

## Update a restriction query

Edit a restriction query.

## Revoke role from a restriction query

Removes a role from a restriction query.

## List roles for a restriction query

Returns all roles that have a given restriction query.

## Grant role to a restriction query

Adds a role to a restriction query.

