---
title: Hosts
---
Get information about your live hosts in Datadog.

## Mute a host

Mute a host.

## Unmute a host

Unmutes a host. This endpoint takes no JSON arguments.

## Get all hosts for your organization

This endpoint allows searching for hosts by name, alias, or tag.
Hosts live within the past 3 hours are included by default.
Retention is 7 days.
Results are paginated with a max of 1000 results at a time.

## Get the total number of active hosts

This endpoint returns the total number of active and up hosts in your Datadog account.
Active means the host has reported in the past hour, and up means it has reported in the past two hours.

