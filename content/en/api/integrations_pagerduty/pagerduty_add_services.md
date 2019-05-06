---
title: Add new services and schedules
type: apicontent
order: 18.3
external_redirect: /api/#add-new-services-and-schedules
---

## Add new services and schedules

Add new services and schedules to your Datadog-PagerDuty integration.

##### Arguments

* **`services`** :
    Array of PagerDuty service objects. [Learn how to configure you Datadog service with PagerDuty documentation][1]. A PagerDuty service object is composed by:

    * **`service_name`** [*required*]:
        Your Service name in PagerDuty.

    * **`service_key`** [*required*]:
        Your Service name associated service key in Pagerduty.

* **`schedules`** :
    Array of your schedule URLs, e.g:
     `["https://my-pd.pagerduty.com/schedules#PCPYT4M", "https://my-pd.pagerduty.com/schedules#PKTPB7P"]`

[1]: https://www.pagerduty.com/docs/guides/datadog-integration-guide
