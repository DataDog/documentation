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

* To create an integration or update its configuration in Datadog:  
    **`POST /api/v1/integration/<source_type_name>`**
    
* To override an integration configuration:  
    **`PUT /api/v1/integration/<source_type_name>`**

* To get an integration status:  
    **`GET /api/v1/integration/<source_type_name>`**

* To delete an integration from Datadog:  
    **`DELETE /api/v1/integration/<source_type_name>`**
