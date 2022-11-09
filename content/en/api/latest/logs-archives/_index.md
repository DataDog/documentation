---
title: Logs Archives
---
Archives forward all the logs ingested to a cloud storage system.

See the [Archives Page](https://app.datadoghq.com/logs/pipelines/archives)
for a list of the archives currently configured in web UI.

## Get archive order

Get the current order of your archives.
This endpoint takes no JSON arguments.

## Update archive order

Update the order of your archives. Since logs are processed sequentially, reordering an archive may change
the structure and content of the data processed by other archives.

**Note**: Using the `PUT` method updates your archive's order by replacing the current order
with the new one.

## Get all archives

Get the list of configured logs archives with their definitions.

## Create an archive

Create an archive in your organization.

## Delete an archive

Delete a given archive from your organization.

## Get an archive

Get a specific archive from your organization.

## Update an archive

Update a given archive configuration.

**Note**: Using this method updates your archive configuration by **replacing**
your current configuration with the new one sent to your Datadog organization.

## Revoke role from an archive

Removes a role from an archive. ([Roles API](https://docs.datadoghq.com/api/v2/roles/))

## List read roles for an archive

Returns all read roles a given archive is restricted to.

## Grant role to an archive

Adds a read role to an archive. ([Roles API](https://docs.datadoghq.com/api/v2/roles/))

