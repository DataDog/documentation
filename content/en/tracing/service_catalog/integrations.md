---
title: Using Integrations with Service Catalog
kind: documentation
further_reading:
- link: "/tracing/service_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Service Definition API"
---

## PagerDuty integration
You can add PagerDuty metadata to a service so that Service Catalog it displays and links to information such as who is on-call and whether there are active PagerDuty incidents for the service.

### Setup

You can connect any service in your [PagerDuty Service Directory][1]. You can map one PagerDuty service for each service in Service Catalog.

1. If you have not already done so, set up the [Datadog PagerDuty integration][2].

2. Get your PagerDuty API access key as described at [https://support.pagerduty.com/docs/api-access-keys][3].

3. Follow the [integration configuration instructions][4] to finish configuring it.

4. Update the service definition with the PagerDuty information. For example, pass in the following `integrations` configuration lines within the full [service definition][5]:

   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

## IDE integrations


[1]: https://support.pagerduty.com/docs/service-directory
[2]: /integrations/pagerduty/
[3]: https://support.pagerduty.com/docs/api-access-keys
[4]: https://app.datadoghq.com/integrations/pagerduty
[5]: /tracing/service_catalog/service_definition_api/
