---
title: PagerDuty
type: apicontent
order: 14.3
external_redirect: /api/#pagerduty
---

## PagerDuty

Configure your Datadog-PagerDuty integration directly through the Datadog API.
[Read more about Datadog-PagerDuty integration][1]

**Note**:

* Using the `POST` method updates your integration configuration by **adding** your new configuration to the existing one in your Datadog organization.
* Using the `PUT` method updates your integration configuration by **replacing** your current configuration with the new one sent to your Datadog organization.
* **All arguments are required when creating (`PUT`) a new PagerDuty configuration.**

##### ARGUMENTS

* **`services`** :
    Array of PagerDuty service objects. [Learn how to configure you Datadog service with PagerDuty documentation][2]. A PagerDuty service object is composed by:

    * **`service_name`** [*required*]:
        Your Service name in PagerDuty.

    * **`service_key`** [*required*]:
        Your Service name associated service key in Pagerduty.

* **`subdomain`** :
    Your PagerDuty account's personalized subdomain name.

* **`schedules`** :
    Array of your schedule URLs, e.g:
     `["https://my-pd.pagerduty.com/schedules#PCPYT4M", "https://my-pd.pagerduty.com/schedules#PKTPB7P"]`

* **`api_token`** :
    Your PagerDuty API token.

[1]: /integrations/pagerduty
[2]: https://www.pagerduty.com/docs/guides/datadog-integration-guide
