---
title: Collecting Test data using the Agentless mode
kind: documentation
further_reading:
  - link: "/continuous_integration/setup_tests/containers/"
    tag: "Documentation"
    text: "Forwarding Environment Variables for Tests in Containers"
  - link: "/continuous_integration/setup_tests/"
    tag: "Next step"
    text: "Instrumenting tests in your language"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">CI Visibility is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

If you are using a SaaS CI provider with no access to the underlying worker nodes, you can send the collected data by the Test instrumentation libraries using the Agentless mode.

To run the library using the Agentless mode, you need to configure the following environment variables:

`DD_CIVISIBILITY_AGENTLESS_ENABLED` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_API_KEY` (Required)
: The [Datadog API key][1] used to upload the test results.<br/>
**Default**: `(empty)`

Additionally, configure which [Datadog site][2] to which you want to send data. Your Datadog site is: {{< region-param key="dd_site" >}}.

`DD_SITE` (Required)
: The [Datadog site][2] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

### Compatibility

| Library         | Support type    | Version |
|-----------------|-----------------|---------|
| [.NET][3]       | Beta            | x.x.x   |
| [Java][4]       | Not supported   | x.x.x   |
| [JavaScript][5] | Beta            | x.x.x   |
| [Python][6]     | Not supported   | x.x.x   |
| [Ruby][7]       | Not supported   | x.x.x   |
| [Swift][8]      | Fully supported | x.x.x   |

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/
[3]: /continuous_integration/setup_tests/dotnet
[4]: /continuous_integration/setup_tests/java
[5]: /continuous_integration/setup_tests/javascript
[6]: /continuous_integration/setup_tests/python
[7]: /continuous_integration/setup_tests/ruby
[8]: /continuous_integration/setup_tests/swift
