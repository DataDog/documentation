---
title: Integrations
type: apicontent
order: 14
external_redirect: /api/#integrations
---

## Integrations

Configure your Datadog integrations via Datadog API, current configurable integrations are:

* [AWS][1]
* [PagerDuty][2]
* [Slack][3]
* [Webhooks][4]
* [Google Cloud Platform][5]

Available endpoints are:

* To **create** an integration or **append** its configuration in Datadog:  
    **`POST /api/v1/integration/<SOURCE_TYPE_NAME>`**
    
* To **replace** an integration configuration:  
    **`PUT /api/v1/integration/<SOURCE_TYPE_NAME>`**
    
     CAUTION: Using `PUT` will remove/replace existing configurations.

* To read an integration configuration:  
    **`GET /api/v1/integration/<SOURCE_TYPE_NAME>`**

* To delete an integration from Datadog:  
    **`DELETE /api/v1/integration/<SOURCE_TYPE_NAME>`**

[1]: /api/#aws
[2]: /api/#pagerduty
[3]: /api/#slack
[4]: /api/#webhooks
[5]: /api/#gcp
