---
title: Integrations
type: apicontent
order: 14
external_redirect: /api/#integrations
---

## Integrations

Configure your Datadog integrations via Datadog API, current configurable integrations are:

* [AWS](/api/#aws)
* [PagerDuty](/api/#pagerduty)
* [Slack](/api/#slack)
* [Webhooks](/api/#webhooks)

Available endpoints are:

* To **create** an integration or **append** its configuration in Datadog:  
    **`POST /api/v1/integration/<source_type_name>`**
    
* To **replace** an integration configuration: 
    **`PUT /api/v1/integration/<source_type_name>`**
  *  CAUTION: Using `PUT` will remove/replace existing configurations.

* To read an integration configuration:  
    **`GET /api/v1/integration/<source_type_name>`**

* To delete an integration from Datadog:  
    **`DELETE /api/v1/integration/<source_type_name>`**
