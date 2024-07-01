---
title: Adding Entries to API Catalog
is_beta: true
further_reading:
- link: /tracing/service_catalog/
  tag: Documentation
  text: Datadog Service Catalog
- link: /tracing/api_catalog/explore_apis/
  tag: Documentation
  text: Exploring APIs
- link: /tracing/api_catalog/monitor_apis/
  tag: Documentation
  text: Monitoring APIs
aliases:
    - /tracing/api_catalog/add_entries
---

{{< site-region region="gov,ap1" >}}
<div class="alert alert-warning">API Catalog is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

API Catalog uses APM instrumentation for distributed tracing to automatically discover endpoints in your Datadog organization. For instrumented services with supported libraries, endpoints are automatically populated into API Catalog.

Register automatically detected endpoints, or upload an OpenAPI file to benefit from the full value of API Catalog.

## Register automatically detected endpoints

Group automatically detected endpoints into APIs to track their usage, set ownership, and set monitoring policies from a centralized location.

To register endpoints:

1. From the **Explorer** page, select the endpoints to register.
2. Click **Register Endpoints**.
3. Select the API(s) you want to group the endpoints into.
4. Click **Apply**.

{{< img src="tracing/api_catalog/api-catalog-register.png" alt="Select endpoints in API Catalog and click Register Endpoints button." style="width:65%;" >}}

After endpoints are registered, Datadog starts collecting a new endpoint metric for better [monitoring capabilities][6].

Autodiscovery is not available for some frameworks. Check compatibility status by clicking the **Learn More** button in Datadog. If you still cannot find your endpoints, try uploading a definition file containing them. Datadog automatically starts collecting data on those endpoint definitions after they are uploaded.

## Import OpenAPI/Swagger file

Import API definitions that you already own to see which endpoints are receiving traffic, and get performance and deployment information on top of your API definitions.

Supported formats are OpenAPI 2 and 3.

To import an OpenAPI/Swagger file:

1. Go to the **Catalog** page.
2. Click **Add API**.
3. Select **Import an API**.
4. Choose the OpenAPI file to import from your device.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/setup
[2]: /tracing/service_catalog/
[3]: /tracing/trace_collection/
[4]: https://app.datadoghq.com/apis/catalog-page
[5]: https://app.datadoghq.com/apis/catalog
[6]: /tracing/api_catalog/monitor_apis/