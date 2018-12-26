---
title: Integrations
type: apicontent
order: 14
external_redirect: /api/#integrations
---

## Integrations

Configure your Datadog integrations via Datadog API, current configurable integrations are:

* [AWS][1]
* [Azure][2]
* [Google Cloud Platform][3]
* [PagerDuty][4]
* [Slack][5]
* [Webhooks][6]

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
[2]: /api/#azure
[3]: /api/#google-cloud-platform
[4]: /api/#pagerduty
[5]: /api/#slack
[6]: /api/#webhooks
