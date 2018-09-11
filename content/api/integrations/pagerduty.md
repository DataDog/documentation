---
title: PagerDuty
type: apicontent
order: 14.2
external_redirect: /api/#pagerduty
---

## PagerDuty

Configure your Datadog-PagerDuty integration directly through Datadog API.  
[Read more about Datadog-PagerDuty integration][1]

**ARGUMENTS**:

* **`services`** [*required*]:    
    Array of PagerDuty service objects. [Learn how to configure you Datadog service with PagerDuty documentation][2]. A PagerDuty service object is composed by:  
    
    * **`service_name`** [*required*]:  
        Your Service name in PagerDuty.

    * **`service_key`** [*required*]:  
        Your Service name associated service key in Pagerduty.

* **`subdomain`** [*required*]:  
    Your PagerDuty accounts personalized sub-domain name.
  
* **`schedules`** [*required*]:
    Array of your schedule URLs e.g:  
     `["https://my-pd.pagerduty.com/schedules#PCPYT4M", "https://my-pd.pagerduty.com/schedules#PKTPB7P"]`
  
* **`api_token`** [*required*]:  
    Your PagerDuty API token.

[1]: /integrations/pagerduty
[2]: https://www.pagerduty.com/docs/guides/datadog-integration-guide/
