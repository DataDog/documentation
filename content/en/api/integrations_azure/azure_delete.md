---
title: Delete an Azure integration
type: apicontent
order: 16.3
external_redirect: /api/#delete-an-azure-integration
---

## Delete an Azure integration

Delete a given Datadog-Azure integration.

**ARGUMENTS**:

Refer to the [Datadog-Azure integration installation instructions][1] to see how to obtain the following field values for your organization.

* **`tenant_name`** [*required*]:

    Your Azure Active Directory ID.

* **`client_id`** [*required*]:

    Your Azure web application ID.

* **`host_filters`** [*optional*, *default*=**None**]:

    Limit the Azure instances that are pulled into Datadog by using tags. Only hosts that match one of the defined tags are imported into Datadog.

[1]: /integrations/azure/#installation
