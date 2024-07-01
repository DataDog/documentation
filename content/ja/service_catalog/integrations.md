---
title: Use Integrations with Service Catalog
kind: documentation
aliases:
  - /tracing/service_catalog/integrations
further_reading:
- link: /tracing/service_catalog/service_definition_api/
  tag: Documentation
  text: Learn about the Service Definition API
- link: /integrations/opsgenie/
  tag: Documentation
  text: Learn about the OpsGenie integration
- link: /integrations/pagerduty/
  tag: Documentation
  text: Learn about the PagerDuty integration
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
PagerDuty and OpsGenie integrations for Service Catalog are not supported in the {{< region-param key=dd_datacenter code="true" >}} site.
</div>
{{% /site-region %}}

## Overview

When you configure a service account for a [Datadog integration][10], you can incorporate metadata from your integrations into service definitions in the [Service Catalog][9]. You can also use autocomplete and validation features when editing a service definition in an [integrated development environment (IDE)](#ide-integrations).

## PagerDuty integration

You can add PagerDuty metadata to a service so that the Service Catalog displays and links to information such as who is on-call and whether there are active PagerDuty incidents for the service. Because only one on-call can be displayed, Datadog selects the first user by escalation level, then alphabetically by email.

### Setup

You can connect any service in your [PagerDuty Service Directory][1]. You can map one PagerDuty service for each service in the Service Catalog.

1. If you have not already done so, set up the [Datadog PagerDuty integration][2].

2. Get your PagerDuty API access key as described in their [API Access Key][3] documentation.

3. Enter the API Access Key on [Pagerduty Integration Setup][4] to finish configuring it.

  {{< img src="tracing/service_catalog/pagerduty-token.png" alt="Copy and Paste the API Key to Pagerduty Setup." style="width:100%;" >}}

4. Update the service definition with the PagerDuty information. For example, pass in the following `integrations` configuration lines within the full [service definition][5]:

   ```
   ...
   integrations:
     pagerduty: https://www.pagerduty.com/service-directory/shopping-cart
   ...
   ```

## OpsGenie integration

You can add OpsGenie metadata to a service so that the Service Catalog displays and links to information such as who is on-call for the service.

### Setup

1. If you have not already done so, set up the [Datadog OpsGenie integration][12].
2. Get your OpsGenie API access key as described in their [API Key Management][13] documentation. This API key requires **configuration access** and **read** access rights.
3. Add an account in the **Accounts** section at the bottom of the [integration tile][14], paste your OpsGenie API access key, and select the region for your OpsGenie account.

   {{< img src="tracing/service_catalog/create_account1.png" alt="The Create New Account workflow in the OpsGenie integration tile" style="width:80%;" >}}
   {{< img src="tracing/service_catalog/create_account2.png" alt="The Create New Account workflow in the OpsGenie integration tile" style="width:80%;" >}}

4. Update the service definition with the OpsGenie information to link your OpsGenie service with your Datadog service. For example, pass in the following `integrations` configuration lines within the full [service definition][5]:

   ```yaml
   "integrations": {
     "opsgenie": {
           "service-url": "https://www.opsgenie.com/service/123e4567-x12y-1234-a456-123456789000",
           "region": "US"
     }
   }
   ```

Once you've completed these steps, an **On Call** information box appears in the **Ownership** tab of a service in the Service Catalog.

{{< img src="tracing/service_catalog/oncall_information.png" alt="On Call information box displaying information from OpsGenie in the Service Catalog" style="width:85%;" >}}

## IDE Plugins

Datadog provides a [JSON Schema][6] for service definitions so that when you are editing a service definition in a [supporting IDE][7], features such as autocomplete and validation are provided.

The [JSON schema for Datadog service definitions][8] is registered with the open source [Schema Store][7].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.pagerduty.com/docs/service-directory
[2]: /integrations/pagerduty/
[3]: https://support.pagerduty.com/docs/api-access-keys
[4]: https://app.datadoghq.com/integrations/pagerduty
[5]: /tracing/service_catalog/service_definition_api/
[6]: http://json-schema.org/
[7]: https://www.schemastore.org/json/
[8]: https://raw.githubusercontent.com/DataDog/schema/main/service-catalog/version.schema.json
[9]: /tracing/service_catalog/
[10]: /integrations/
[11]: https://app.datadoghq.com/services
[12]: /integrations/opsgenie
[13]: https://support.atlassian.com/opsgenie/docs/api-key-management/
[14]: https://app.datadoghq.com/integrations/opsgenie
