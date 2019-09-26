---
title: Update an Azure integration host filters
type: apicontent
order: 16.4
external_redirect: /api/#update-an azure-integration-host-filters
---

## Update an Azure integration host filters

Update the defined list of host filters for a given Datadog-Azure integration.

**ARGUMENTS**:

Refer to the [Datadog-Azure integration installation instructions][1] to see how to obtain the following field values for your organization.

* **`tenant_name`** [*required*]:

    Your Azure Active Directory ID.

* **`client_id`** [*required*]:

    Your Azure web application ID.

* **`client_secret`** [*required*]:

    Your Azure web application secret key.

* **`host_filters`** [*optional*, *default*=**None**]:

    Limit the Azure instances that are pulled into Datadog by using tags. Only hosts that match one of the defined tags are imported into Datadog.

[1]: /integrations/azure/#installation
