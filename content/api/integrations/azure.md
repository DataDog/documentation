---
title: Azure
type: apicontent
order: 14.2
external_redirect: /api/#azure
---

## Azure

Configure your Datadog-Azure integration directly through the Datadog API.  
[Read more about Datadog-Azure integration][1].

**Note**: 

* Using the `POST` method updates your integration configuration by **adding** your new configuration to the existing one in your Datadog organization.
* Using the `PUT` method updates your integration configuration by **replacing** your current configuration with the new one sent to your Datadog organization.

##### ARGUMENTS

Refer to the [Datadog-Azure integration installation instructions][2] to see how to obtain the following field values for your organization.

* **`tenant_name`** [*required*]:

    Your Azure Active Directory ID.

* **`client_id`** [*required*]:

    Your Azure web application ID.

* **`client_secret`** [*required*]:

    Your Azure web application secret key.

* **`host_filters`** [*optional*, *default*=**None**]:

    Limit the Azure instances that are pulled into Datadog by using tags. Only hosts that match one of the defined tags are imported into Datadog.


[1]: /integrations/azure
[2]: /integrations/azure/#installation
