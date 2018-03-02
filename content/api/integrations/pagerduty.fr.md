---
title: PagerDuty
type: apicontent
order: 13.2
external_redirect: /api/#pagerduty
---

## PagerDuty

Configure your Datadog-PagerDuty integration directly through Datadog API.  
[Read more about Datadog-PagerDuty integration](/integrations/pagerduty)

##### ARGUMENTS

* `services` [*required*]:    
    Array of PagerDuty service objects. [Learn how to configure you Datadog service with PagerDuty documentation](https://www.pagerduty.com/docs/guides/datadog-integration-guide/). A PagerDuty service object is composed by:  

    * `service_name` [*required*]:  
        Your Service name in PagerDuty.

    * `service_key` [*required*]:  
        Your Service name associated service key in Pagerduty.

* `subdomain` [*required*]:  
    Your PagerDuty accounts personalized sub-domain name.

* `schedules` [*required*]:
    Array of your schedule URLs e.g:  
     `["https://my-pd.pagerduty.com/schedules#PCPYT4M", "https://my-pd.pagerduty.com/schedules#PKTPB7P"]`

* `api_token` [*required*]:  
    Your PagerDuty API token.

* `run_check` [*optional*, *default*=**false**]:  
    Determines if the integration install check is run before returning a response.

    * If **true**:

        - The install check is run
        - If there’s an error in the configuration the error is returned
        - If there’s no error, *204 No Content* response code is returned

    * If **false**:

        - We return a *202 accepted*
        - Install check is run after returning a response