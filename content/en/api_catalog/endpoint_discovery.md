---
title: Discovering Endpoints from APM
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/api_catalog/"
  tag: "Documentation"
  text: "Datadog API Catalog"
aliases:
    - /tracing/api_catalog/endpoint_discovery/
---

## Overview
If a service has a supported tracer installed, the API Catalog will automatically be filled by all endpoints discovered from this service. 

In order to check compatibility, you can visit the ‘troubleshoot’ page on the app by pressing the ‘learn more’ button
{{< img src="tracing/api_catalog/api-catalog-discovery-learn-more.png" alt="ALT TEXT" style="width:30%;text-align: left;" >}}

## Providing endpoint path manually
Add the `datadog.api_catalog.route` tag to force endpoint discovery by the API Catalog.
This tag should contain the matched route, that is, the path template in the format used by the respective server framework.

Note: API Catalog will still filter out spans that do not contain the following tags:
* `http.method`
* `http.status_code`

## Example
Example of adding a custom tag for each span in Go and Ruby:

**Go**\
{{< code-block lang="go" disable_copy="true" >}}
span.SetTag("datadog.api_catalog.route", "/products/:id")
{{< /code-block >}}
**Ruby**\
{{< code-block lang="ruby" disable_copy="true" >}}
Datadog::Tracing.active_trace.set_tag('datadog.api_catalog.route', '/products/:id')
{{< /code-block >}}

Once you set this tag, you should expect to see this tag in spans:
{{< img src="tracing/api_catalog/api-catalog-discovery-span.png" alt="ALT TEXT" style="width:100%;" >}}

Which will lead to the creation of the following endpoint in the API Catalog:
{{< img src="tracing/api_catalog/api-catalog-discovery-result.png" alt="ALT TEXT" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: /api/latest/api-management