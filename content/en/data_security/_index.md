---
title: Securing the Data Sent to Datadog
kind: documentation
aliases:
  - /security/
  - /security/other/
further_reading:
- link: "/data_security/logs/"
  tag: "Documentation"
  text: "Logs Data Security"
- link: "/data_security/agent/"
  tag: "Documentation"
  text: "Agent Data Security"
- link: "/data_security/synthetics/"
  tag: "Documentation"
  text: "Synthetic Monitoring Data Security"
- link: "/tracing/setup_overview/configure_data_security/"
  tag: "Documentation"
  text: "Tracing Data Security"
- link: "/real_user_monitoring/browser/modifying_data_and_context/"
  tag: "Documentation"
  text: "RUM Data Security"
- link: "/real_user_monitoring/session_replay/privacy_options"
  tag: "Documentation"
  text: "Session Replay Privacy Options"
- link: "/account_management/org_settings/sensitive_data_detection/"
  tag: "Documentation"
  text: "Sensitive Data Scanner"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security_platform/" target="_blank">Security Platform</a> section.</div>

In the normal course of using Datadog as intended, you send data to Datadog. Datadog works together with you to reduce risk and help ensure that the data you send is appropriate, not a violation of someone's privacy, and secure during and after its transmission.

Additional important company information is available at [Datadog Security][1] and [Privacy Policy][2].

## How data gets from you to Datadog

Datadog allows you to send data in multiple ways, including from the Agent, [DogStatsD][3], the public API, and integrations. In addition, Real User Monitoring SDKs and tracing libraries generate data based on your application and services code and sends it to Datadog. 

While data is in motion, Datadog protects it with Transport Layer Security (TLS) and HTTP Strict Transport Security (HSTS). Data stored by Datadog is protected by encryption, access controls, and authentication. For specifics, read more at [Datadog Security][1].

### The Datadog Agent

The Agent is the main channel for data getting from your systems to Datadog. [Read all about data security measures in the Agent][4].

### Third party services integrations

The [Datadog integrations][5] for some third party services are configured directly in the Datadog, and might require you to provide credentials that allow Datadog to connect to the service on your behalf. The credentials you provide are encrypted and stored by Datadog in a secure credential datastore, with strict security guarantees enforced. 

All data is encrypted at-rest and in-transit. Access to the secure credential datastore is controlled and audited, and specific services or actions within those services are limited to only what is necessary. Anomalous behavior detection continuously monitors for unauthorized access. Datadog employee access for maintenance purposes is limited to a select subset of engineers.

### Cloud integrations

Due to their sensitive nature, additional security guarantees are implemented where possible when integrating with cloud providers, including relying on Datadog-dedicated credentials with limited permissions. For example:

* The [integration with Amazon Web Services][6] requires you to configure role delegation using AWS IAM, as per the [AWS IAM Best Practices guide][7], and to grant specific permissions with an AWS Policy.
* The integration with [Microsoft Azure][8] relies on you defining a tenant for Datadog, with access to a specific application granted only the "reader" role for the subscriptions you would like to monitor.
* The integration with [Google Cloud Platform][9] relies on you defining a service account for Datadog, and granting it only the "Compute Viewer" and "Monitoring Viewer" roles.

## Get started with securing your data

Datadog's purpose is to gather observability information from many sources around your infrastructure and services, and to bring it together in one place for you to analyze and investigate. This involves you sending a wide range of types of data content to Datadog's servers. Some of that data is structured and follow patterns that we can automatically check for and handle appropriately to protect privacy. 

Much of the data you send to Datadog for intended use in the product is innocuous and not likely to contain private or personal information. However, it's important for you to know the kind of things that are sent, ways to strip out or obfuscate sensitive data before sending, or ways to prevent inserting sensitive data in the first place.

### Sensitive Data Scanner

Sensitive Data Scanner is a stream-based, pattern matching service that you can use to identify, tag, and optionally redact or hash sensitive data. With implementation, your security and compliance teams can introduce a line of defense in preventing sensitive data from leaking outside your organization. For information about the scanner and setting it up, read [Sensitive Data Scanner][10].

### Logs Management

Logs are records produced by your systems and services and the activities that happen within them. Read about logs data security considerations, including information about how you can filter and obfuscate logs data in [Log Management Data Security][11].

### Process arguments

Values for the following keywords are obfuscated from process data: `password` `passwd` `mysql_pwd` `access_token` `auth_token` `api_key` `apikey` `secret` `credentials` `stripetoken`. In addition, you can obfuscate sensitive sequences within process commands or arguments by using the [`custom_sensitive_words` setting][12] to provide an exclusion list of one or more regular expressions.

### APM and other tracing library based products

The Datadog tracing libraries are used to instrument your applications, services, tests, and pipelines, and send performance data through the Agent to Datadog. Trace and span data (along with much more) is generated for the following products to use:

- Application Performance Monitoring (APM)
- Continuous Profiler
- CI Visibility
- Application Security Monitoring

For detailed information about how tracing-library sourced data is managed, default basic security settings, and custom obfuscating, scrubbing, excluding, and modifying of trace-related elements, read [Configuring Agent and Tracer for trace data security][13].

### Serverless distributed tracing

You can use Datadog to collect and visualize the JSON request and response payloads of AWS Lambda functions. To prevent any sensitive data within request or response JSON objects from being sent to Datadog (like account IDs or addresses), you can to scrub specific parameters from being sent to Datadog. Read [Obfuscating AWS Lambda payload contents][14] for more information.

### Synthetic Monitoring

Synthetic testing simulates requests and business transactions from testing locations around the world. Read about the encryption considerations for configurations, assets, results, and credentials, as well as how to use testing privacy options, in [Synthetic Monitoring Data Security][15].

### RUM & Session Replay

You can modify the data collected by Real User Monitoring in the browser to protect personally identifiable information and to sample the RUM data you’re collecting. Read [Modifying RUM Data and Context][16] for details.
 
Session Replay privacy options default to protecting end user privacy and preventing sensitive organizational information from being collected. Read about masking, overriding, and hiding elements from a session replay in [Session Replay Privacy Options][17].

### Database Monitoring

The Database Monitoring Agent obfuscates all query bind parameters sent to the Datadog intake. Thus passwords, PII (Personally identifiable information), and other potentially sensitive information stored in your database will not be viewable in query metrics, query samples, or explain plans. To read about mitigating risk for other types of data involved in database performance monitoring, read [Database Monitoring Data Collected][18].

## Other sources of potentially sensitive data 

In addition to the sensitive data that you can automatically scrub, obfuscate, and otherwise avoid collecting, a lot of the data collected by Datadog is the names and descriptions of things, and you must consider whether the text you are sending represent private data for you or your customers, and if so avoid sending it. Consider the following (non-exhaustive) list of types of data you send to Datadog during the intended use of the product:

Metadata and tags
: Metadata consists primarily of [tags][19] in the `key:value` format, for example, `env:prod`. Metadata is used by Datadog to filter and group data to help you derive meaningful information. 

Dashboards, notebooks, alerts, monitors, alerts, incidents, SLOs
: The text descriptions, titles, and names you give the things you create in Datadog are data. 

Metrics
: Metrics, including infrastructure metrics and metrics generated from integrations and other ingested data such as logs, traces, RUM, and synthetic tests, are timeseries used to populate graphs. They usually have associated tags.

APM data
: APM data includes services, resources, profiles, traces, and spans, along with associated tags. Read [the APM Glossary][20] for an explanation about each. 

Database query signatures
: Database monitoring data consists of metrics and samples, along with their associated tags, collected by the Agent and used to track historical performance of normalized queries. The granularity of this data is defined by its normalized query signature and unique host identifier. All query parameters are obfuscated and discarded from collected samples before being sent to Datadog.

Process information
: Processes consist of metrics and data from the `proc` filesystem, which acts as an interface to internal data structures in the kernel. Process data may contain the process command (including its path and arguments), the associated username, the ID of the process and its parent, the process state, and the working directory. Process data usually also has tag metadata associated with it.

Events and comments
: Events data is aggregated from multiple sources into a consolidated view, including triggered monitors, events submitted by integrations, events submitted by the application itself, and comments sent by users or through the API. Events and comments usually have associated tags metadata.

Continuous Integration pipelines and tests
: The names of branches, pipelines, tests, and test suites are all data sent to Datadog.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://www.datadoghq.com/security/
[2]: https://www.datadoghq.com/legal/privacy/
[3]: /developers/dogstatsd/
[4]: /data_security/agent/
[5]: /integrations/
[6]: /integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /integrations/azure/
[9]: /integrations/google_cloud_platform/
[10]: /account_management/org_settings/sensitive_data_detection/
[11]: /data_security/logs/
[12]: /infrastructure/process/#process-arguments-scrubbing
[13]: /tracing/setup_overview/configure_data_security/
[14]: /serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[15]: /data_security/synthetics/
[16]: /real_user_monitoring/browser/modifying_data_and_context/
[17]: /real_user_monitoring/session_replay/privacy_options
[18]: /database_monitoring/data_collected/#sensitive-information
[19]: /getting_started/tagging/
[20]: /tracing/visualization/
