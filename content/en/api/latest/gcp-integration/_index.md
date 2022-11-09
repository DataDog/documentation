---
title: GCP Integration
---
Configure your Datadog-Google Cloud Platform (GCP) integration directly
through the Datadog API. Read more about the [Datadog-Google Cloud Platform integration](https://docs.datadoghq.com/integrations/google_cloud_platform).

## Delete a GCP integration

Delete a given Datadog-GCP integration.

## List all GCP integrations

List all Datadog-GCP integrations configured in your Datadog account.

## Create a GCP integration

Create a Datadog-GCP integration.

## Update a GCP integration

Update a Datadog-GCP integrations host_filters and/or auto-mute.
Requires a `project_id` and `client_email`, however these fields cannot be updated.
If you need to update these fields, delete and use the create (`POST`) endpoint.
The unspecified fields will keep their original values.

