---
title: APM & Distributed Tracing Security
kind: documentation
aliases:
    - /tracing/security/
further_reading:
- link: "/security/"
  tag: "Documentation"
  text: "Review the main categories of data submitted to Datadog"
---

This article is part of a [series on data security][1].

The APM product supports multiple libraries and includes extensible tooling that allows customers the flexibility to submit nearly any data point they choose. This article describes the main filtering controls available for customers to control what APM data they submit to Datadog.

## Filtering Baseline

Several filtering mechanisms are enforced as a baseline in an effort to provide sound defaults. In particular:

**Environment variables are not collected by the Agent**

**SQL variables are obfuscated by default, even when not using prepared statements**

For example, the following `sql.query` attribute:
`SELECT data FROM table WHERE key=123 LIMIT 10`
would have its variables obfuscated, to become the following Resource name:
`SELECT data FROM table WHERE key = ? LIMIT ?`

**Numbers in Resource names (e.g. in request urls) are obfuscated by default**

For example, the following `elasticsearch` attribute:
```
Elasticsearch : {
    method : GET,
    url : /user.0123456789/friends/_count
}
```
would have its number in the url obfuscated, to become the following Resource name:
`GET /user.?/friends/_count`

In addition to this baseline, customers need to review and configure their APM deployment, including all integrations and frameworks provided by [supported tracers][2], to appropriately control what data they submit to Datadog.

## Tag Filtering

For customers using release 6, the Agent can be configured to obfuscate Tags associated with Spans based on the Tag's name and pattern, and replace it with a user-defined string. To prevent the submission of specific Tags, use the `replace_tags` [setting][3]. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to redact sensitive data within your Tags.

## Resource Filtering

For customers using release 6, the Agent can be configured to exclude a specific Resource from Traces sent by the Agent to the Datadog application. To prevent the submission of specific Resources, use the `ignore_resources` [setting][3]. This setting enables the creation of a list containing one or more regular expressions, which instructs the Agent to filter out Traces based on their Resource name.

## Extending Tracers

The tracing libraries are designed to be extensible. Customers may consider writing a custom post-processor to intercept Spans then adjust or discard them accordingly (e.g. based on a regular expressions). For example, this could be achieved with the following constructs:

* Java | [TraceInterceptor interface][4]
* Ruby | [Processing Pipeline][5]
* Python | [Trace Filtering][6]

## Tailored Instrumentation

If a customer requires tailored instrumentation for a specific application, they should consider relying on the Agent-side tracing API to select individual Spans to include in Traces submitted to Datadog. See the [API documentation][7] for additional information.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security
[2]: /tracing/setup
[3]: https://github.com/DataDog/datadog-agent/blob/780caa2855a237fa731b78a1bb3ead5492f0e5c6/pkg/config/config_template.yaml#L472-L490
[4]: https://github.com/DataDog/dd-trace-java/blob/master/dd-trace-api/src/main/java/datadog/trace/api/interceptor/TraceInterceptor.java
[5]: http://gems.datadoghq.com/trace/docs/#Processing_Pipeline
[6]: http://pypi.datadoghq.com/trace/docs/advanced_usage.html#trace-filtering
[7]: /api/?lang=python#tracing
