---
title: Using Integrations with Service Catalog
kind: documentation
further_reading:
- link: "/tracing/service_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Service Definition API"
---



## PagerDuty Integration
You can add PagerDuty metadata to Service Catalog to complete the Reliability view.


## Setup Steps

1. Set up PagerDuty integration by following the instructions here.
2. Add API Token and Get your API access key at https://support.pagerduty.com/docs/api-access-keys

You will find the instructions on page:

3. Link PagerDuty service to your Service Definition YAML

Example:

```
integrations:
  pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
```

You can connect any PagerDuty services in your PagerDuty Service Directory. Currently, you can map only one PagerDuty service for every service you have in Service Catalog.


