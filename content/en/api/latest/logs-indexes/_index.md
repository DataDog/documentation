---
title: Logs Indexes
---
Manage configuration of [log indexes](https://docs.datadoghq.com/logs/indexes/).
You need an API and application key with Admin rights to interact with this endpoint.

## Get indexes order

Get the current order of your log indexes. This endpoint takes no JSON arguments.

## Update indexes order

This endpoint updates the index order of your organization.
It returns the index order object passed in the request body when the request is successful.

## Get all indexes

The Index object describes the configuration of a log index.
This endpoint returns an array of the `LogIndex` objects of your organization.

## Create an index

Creates a new index. Returns the Index object passed in the request body when the request is successful.

## Get an index

Get one log index from your organization. This endpoint takes no JSON arguments.

## Update an index

Update an index as identified by its name.
Returns the Index object passed in the request body when the request is successful.

Using the `PUT` method updates your index’s configuration by **replacing**
your current configuration with the new one sent to your Datadog organization.

