---
title: Update an Azure integration
type: apicontent
order: 17.5
external_redirect: /api/#update-azure-integration
---

## Update an Azure integration

Update the Datadog-Azure integration.

**ARGUMENTS**:

Refer to the [Datadog-Azure integration installation instructions][1] to see how to obtain the following field values for your organization.

* **`tenant_name`** [*required*]:

    Your Existing Azure Active Directory ID.

* **`new_tenant_name`** [*optional*]:

    Your New Azure Active Directory ID.

* **`client_id`** [*required*]:

    Your Existing Azure web application ID.

* **`new_client_id`** [*optional*]:

    Your New Azure web application ID.

* **`client_secret`** [*required*]:

    Your Azure web application secret key.

* **`host_filters`** [*optional*, *default*=**None**]:

    Limit the Azure instances that are pulled into Datadog by using tags. Only hosts that match one of the defined tags are imported into Datadog.

[1]: /integrations/azure/#installation
