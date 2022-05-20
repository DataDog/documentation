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

For On-Premises CI providers, Datadog recommends sending data through the [Datadog Agent][1].

To run the library using the Agentless mode, you need to configure the following environment variables:

`DD_CIVISIBILITY_AGENTLESS_ENABLED` (Required)
: Enables or disables Agentless mode.<br/>
**Default**: `false`

`DD_API_KEY` (Required)
: The [Datadog API key][2] used to upload the test results.<br/>
**Default**: `(empty)`

Additionally, configure which [Datadog site][3] to which you want to send data. Your Datadog site is: {{< region-param key="dd_site" >}}.

`DD_SITE` (Required)
: The [Datadog site][3] to upload results to.<br/>
**Default**: `datadoghq.com`<br/>
**Selected site**: {{< region-param key="dd_site" code="true" >}}

### Compatibility

| Library         | Support type    | Version |
|-----------------|-----------------|---------|
| [.NET][4]       | Beta            | x.x.x   |
| [Java][5]       | Not supported   | x.x.x   |
| [JavaScript][6] | Beta            | 2.5.0   |
| [Python][7]     | Not supported   | x.x.x   |
| [Ruby][8]       | Not supported   | x.x.x   |
| [Swift][9]      | Fully supported | x.x.x   |

[1]: /continuous_integration/setup_tests/agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
[4]: /continuous_integration/setup_tests/dotnet
[5]: /continuous_integration/setup_tests/java
[6]: /continuous_integration/setup_tests/javascript
[7]: /continuous_integration/setup_tests/python
[8]: /continuous_integration/setup_tests/ruby
[9]: /continuous_integration/setup_tests/swift
