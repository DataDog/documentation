---
title: Sensitive Data
description: Detect and classify sensitive data processed by your API endpoints.
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

[App and API Protection][1] matches known patterns for sensitive data in API requests and responses. If it finds a match, the endpoint is tagged with the category and type of sensitive data processed and displayed in [API Endpoints][2].

The matching occurs within your application, and none of the sensitive data is sent to Datadog.

## Supported data types

To see the supported data types (for example, `payment:card`), use the {{< ui >}}Schema Sensitive Data{{< /ui >}} facet. You can also see the data type used in the {{< ui >}}Sensitive Data{{< /ui >}} column.

## Create API data scanners

By default, App and API Protection scans for PII, credentials, and payment types. Sensitive Data Detection provides API data scanners to define custom scanner data patterns beyond the defaults. These scanners improve visibility into the sensitive data of your API traffic.

In an API data scanner, you define a scanner category and type to classify API endpoints processing sensitive data (for example, `health_info:patient_id`). Next, you define the JSON key or value conditions that trigger the scanner.

When the scanner detects sensitive data, it tags the API endpoint with the category and type and displays it in [API Endpoints][2].

To create an API data scanner and view its results, do the following:

1. In App and API Protection {{< ui >}}Policies{{< /ui >}}, go to [Sensitive Data Detection][3].
2. Click {{< ui >}}New Scanner{{< /ui >}}.
3. In {{< ui >}}Select your scanner tags{{< /ui >}}, define the category and type to classify the sensitive data. The scanner tags API endpoints with the format `category:type`.
4. In {{< ui >}}Define conditions on JSON keys and values{{< /ui >}}, define the JSON key or value conditions to trigger the scanner.
5. Click {{< ui >}}Save Scanner{{< /ui >}}. The scanner is enabled by default.
6. To view the results of the scanner, go to App and API Protection [API Endpoints][4].
7. In the {{< ui >}}Schema Sensitive Data{{< /ui >}} facet, the category and type of your custom scanner is listed in the format `category:type`. Custom scanner `category:type` tags are also visible in the {{< ui >}}Sensitive Data{{< /ui >}} column of the explorer.

[1]: /security/application_security/
[2]: /security/application_security/api_posture/api_inventory/api_endpoints/
[3]: https://app.datadoghq.com/security/appsec/policies/scanners
[4]: https://app.datadoghq.com/security/appsec/inventory/apis
