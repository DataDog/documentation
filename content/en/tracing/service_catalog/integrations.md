---
title: Using Integrations with Service Catalog
kind: documentation
further_reading:
- link: "/tracing/service_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Service Definition API"
---

## PagerDuty integration
You can add PagerDuty metadata to a service so that Service Catalog displays and links to information such as who is on-call and whether there are active PagerDuty incidents for the service.

### Setup

You can connect any service in your [PagerDuty Service Directory][1]. You can map one PagerDuty service for each service in Service Catalog.

1. If you have not already done so, set up the [Datadog PagerDuty integration][2].

2. Get your PagerDuty API access key as described in their [API Access Key][3] documentation.

3. Follow the [integration configuration instructions][4] to finish configuring it.

4. Update the service definition with the PagerDuty information. For example, pass in the following `integrations` configuration lines within the full [service definition][5]:

   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

## IDE integrations

Datadog provides a [JSON Schema][6] for service definitions so that when you are editing a service definition in a [supporting IDE][7], features such as autocomplete and validation are provided.

The [JSON schema for Datadog service definitions][8] is registered with the open source [Schema Store][7].


[1]: https://support.pagerduty.com/docs/service-directory
[2]: /integrations/pagerduty/
[3]: https://support.pagerduty.com/docs/api-access-keys
[4]: https://app.datadoghq.com/integrations/pagerduty
[5]: /tracing/service_catalog/service_definition_api/
[6]: http://json-schema.org/
[7]: https://www.schemastore.org/json/
[8]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
