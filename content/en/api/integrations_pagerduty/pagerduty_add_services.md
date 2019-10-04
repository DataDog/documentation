---
title: Add new services and schedules
type: apicontent
order: 18.3
external_redirect: /api/#add-new-services-and-schedules
---

## Add new services and schedules

Add new services and schedules to your Datadog-PagerDuty integration.

**ARGUMENTS**:

* **`services`** :
    The array of PagerDuty service objects. Learn how to configure your Datadog service with the [PagerDuty documentation][1]. A PagerDuty service object is composed by:

    * **`service_name`** [*required*]:
        Your Service name in PagerDuty.

    * **`service_key`** [*required*]:
        Your Service name associated service key in Pagerduty.

* **`schedules`** :
    The array of your schedule URLs:
     `["https://my-pd.pagerduty.com/schedules#PCPYT4M", "https://my-pd.pagerduty.com/schedules#PKTPB7P"]`

[1]: https://www.pagerduty.com/docs/guides/datadog-integration-guide
