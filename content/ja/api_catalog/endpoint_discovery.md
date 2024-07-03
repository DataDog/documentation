---
aliases:
- /ja/tracing/api_catalog/endpoint_discovery/
further_reading:
- link: /tracing/api_catalog/
  tag: Documentation
  text: Datadog API Catalog
is_beta: true
title: Discovering Endpoints from APM
---

## 概要
If a service has a supported tracer installed, the API Catalog is automatically populated with all endpoints discovered from this service. 

To check for compatibility issues, click **Learn More** in the app, then select **Troubleshoot**.
{{< img src="tracing/api_catalog/api-catalog-discovery-learn-more.png" alt="ALT TEXT" style="width:30%;text-align: left;" >}}

## Providing endpoint paths manually
Add the `datadog.api_catalog.route` tag to force endpoint discovery by the API Catalog.
This tag should contain the matched route, that is, the path template in the format used by the respective server framework.

<div class="alert alert-info">API Catalog filters out spans that do not contain the following tags:<ul>
<li> <code>http.method</code>
<li> <code>http.status_code</code></ul>
</div>

## 例
The following examples demonstrate adding a custom tag for each span in Go and Ruby:

**Go**\
{{< code-block lang="go" disable_copy="true" >}}
span.SetTag("datadog.api_catalog.route", "/products/:id")
{{< /code-block >}}
**Ruby**\
{{< code-block lang="ruby" disable_copy="true" >}}
Datadog::Tracing.active_trace.set_tag('datadog.api_catalog.route', '/products/:id')
{{< /code-block >}}

After you set this tag, you should see this tag in spans:
{{< img src="tracing/api_catalog/api-catalog-discovery-span.png" alt="ALT TEXT" style="width:100%;" >}}

This leads to the endpoint displaying in the API Catalog:
{{< img src="tracing/api_catalog/api-catalog-discovery-result.png" alt="ALT TEXT" style="width:100%;" >}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[8]: /ja/api/latest/api-management