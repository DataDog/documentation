---
title: Azure Integration
---
Configure your Datadog-Azure integration directly through the Datadog API.
For more information, see the [Datadog-Azure integration page](https://docs.datadoghq.com/integrations/azure).

## Delete an Azure integration

Delete a given Datadog-Azure integration from your Datadog account.

## List all Azure integrations

List all Datadog-Azure integrations configured in your Datadog account.

## Create an Azure integration

Create a Datadog-Azure integration.

Using the `POST` method updates your integration configuration by adding your new
configuration to the existing one in your Datadog organization.

Using the `PUT` method updates your integration configuration by replacing your
current configuration with the new one sent to your Datadog organization.

## Update an Azure integration

Update a Datadog-Azure integration. Requires an existing `tenant_name` and `client_id`.
Any other fields supplied will overwrite existing values. To overwrite `tenant_name` or `client_id`,
use `new_tenant_name` and `new_client_id`. To leave a field unchanged, do not supply that field in the payload.

## Update Azure integration host filters

Update the defined list of host filters for a given Datadog-Azure integration.

