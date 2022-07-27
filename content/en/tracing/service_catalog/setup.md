---
title: Setting up Service Catalog
kind: documentation
further_reading:
- link: "/tracing/service_catalog/service_definition_api/"
  tag: "Documentation"
  text: "Service Definition API"
---

## Overview

On the Service Catalog page, if the **Registered** column has a green check mark, the corresponding service has been registered with the catalog, and you can use the API to [update the service definition][1]. 

## For services that already send APM data

Any service that sends tracing data to Datadog APM is automatically listed in the Service Catalog. Until you register it, it shows a gray check mark when you hover over it.

To register the service and add ownership information, related links such as runbooks, and links to source code repositories by [update the service definition][1].

Go to [Service Catalog > Get Started][2] to get help forming valid JSON to post with the API.

## For all other services you want to catalog

If the service, API, or custom library you are interested in is not listed on the catalog page:

1. Go to [Get Started][2].

2. The **Register Services** form helps you generate JSON that you can post to Service Catalog API endpoint. Provide a service name in the `dd-service` field. Fill in ownership, source, and other service information in the Service Definition schema presented. Refer to the [full JSON schema on GitHub][3] for complete details.

3. Click the **Copy** button to copy the generated JSON. Send this as the `body` of a `POST` API call with the [Service Definition API][1].


## Discover services being reported in other Datadog telemetry data

<div class="alert alert-warning">This feature is in beta.</div>

To discover other services through existing Datadog telemetry such as infrastructure metrics, go to the **Discover Services** tab and follow instructions there. Discovery uses the `DD_SERVICE` [Unified Service Tagging convention][4] to locate services sending data to your Datadog organization.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/service_catalog/service_definition_api/
[2]: https://app.datadoghq.com/services/setup
[3]: https://github.com/DataDog/schema/blob/main/service-catalog/v2/schema.json
[4]: /getting_started/tagging/unified_service_tagging
