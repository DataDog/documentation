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

If you are using a SaaS CI provider without access to the underlying worker nodes, you can send the collected data by the Test instrumentation using the Agentless mode.

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
| [.NET][4]       | Beta            | 2.5.1   |
| [Java][5]       | Beta            | 0.101.0 |
| [JavaScript][6] | Beta            | 2.5.0   |
| [Python][7]     | Not supported   | N/A     |
| [Ruby][8]       | Not supported   | N/A     |

For other languages like [Swift][9] or other ways of reporting test data such as [JUnit Report Upload][10], there is nothing additional to do as the only supported mode for them is agentless.

[1]: /continuous_integration/setup_tests/agent
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
[4]: /continuous_integration/setup_tests/dotnet
[5]: /continuous_integration/setup_tests/java
[6]: /continuous_integration/setup_tests/javascript
[7]: /continuous_integration/setup_tests/python
[8]: /continuous_integration/setup_tests/ruby
[9]: /continuous_integration/setup_tests/swift
[10]: /continuous_integration/setup_tests/junit_upload
