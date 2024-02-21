---
title: Endpoint Discovery from APM
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/api_catalog/"
  tag: "Documentation"
  text: "Datadog API Catalog"
aliases:
    - /tracing/api_catalog/api_catalog_api/
---

## Overview
If a service has a supported tracer install, the API Catalog will automatically be filled by all endpoints discovered from this service. 

In order to check compatibility, you can visit the ‘troubleshoot’ page on the app by pressing the ‘learn more’ button
[[TODO:add image]]

## Providing endpoint path manually
Add the `datadog.api_catalog.route` tag to force endpoint discovery by the API Catalog.

Note: API Catalog will still filter out spans that do not contain the following tags:
* http.method
* http.status_code

## Example
Example of adding a custom tag for each span in Go and Ruby:\
**Go**
[[TODO - add image]]\
**Ruby**
[[TODO - add image]]

Once you set this tag, you should expect to see this tag in spans:
[[TODO: add image]]

Which will lead to the creation of the following endpoint in the API Catalog
[[TODO: add image]]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[8]: /api/latest/api-management