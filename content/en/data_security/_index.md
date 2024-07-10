---
title: Reducing Data Related Risks
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
- link: "/tracing/configure_data_security/"
  tag: "Documentation"
  text: "Tracing Data Security"
- link: "/data_security/real_user_monitoring/"
  tag: "Documentation"
  text: "RUM Data Security"
- link: "/real_user_monitoring/session_replay/browser/privacy_options"
  tag: "Documentation"
  text: "Session Replay Privacy Options"
- link: "/sensitive_data_scanner/"
  tag: "Documentation"
  text: "Sensitive Data Scanner"
cascade:
    algolia:
        rank: 70
---

<div class="alert alert-info">This page is about the tools and security for protecting data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security/" target="_blank">Security</a> section.</div>

In the normal course of using Datadog as intended, you send data to Datadog. Datadog works together with you to reduce data risk by providing you tools to appropriately limit the data you send and securing data during and after its transmission.

You may also wish to review the information available at [Datadog Security][1] and the terms of our [Privacy Policy][2].

## How data gets from you to Datadog

Datadog allows you to send data to Datadog in multiple ways, including from the Agent, [DogStatsD][3], the public API, and integrations. In addition, Real User Monitoring SDKs and tracing libraries generate data based on your application and services code and send it to Datadog. 

Data in motion through Datadog provided tools is protected with TLS and HSTS. Data stored by Datadog is protected by encryption, access controls, and authentication. For specifics, read more at [Datadog Security][1].

### The Datadog Agent

The Agent is the main channel for data getting from your systems to Datadog. [Read all about data security measures in the Agent][4]. 

To learn how to avoid storing secrets in plaintext in the Agent's configuration files, see [Secrets Management][5].

### Third party services integrations

The integrations for some third party services are configured directly in Datadog and might require you to provide credentials to allow Datadog to connect to the service on your behalf. The credentials you provide are encrypted and stored by Datadog in a secure credential datastore. 

All data through these integrations is encrypted when at-rest in Datadog's systems and encrypted in-transit. Access to the secure credential datastore is controlled and audited, and specific services or actions within the third party services are limited to only what is necessary. Anomalous behavior detection tools continuously monitor for unauthorized access. Datadog employee access for maintenance purposes is limited to a select subset of engineers.

### Cloud integrations

Due to their sensitive nature, additional security measures are implemented, where possible, when integrating with cloud providers, including the use of Datadog-dedicated credentials with limited permissions. For example:

* The [integration with Amazon Web Services][6] requires you to configure role delegation using AWS IAM, as per the [AWS IAM Best Practices guide][7], and to grant specific permissions with an AWS Policy.
* The integration with [Microsoft Azure][8] relies on you defining a tenant for Datadog, with access to a specific application granted only the "reader" role for the subscriptions you would like to monitor.
* The integration with [Google Cloud Platform][9] relies on you defining a service account for Datadog, and granting it only the "Compute Viewer" and "Monitoring Viewer" roles.

## Measures you can implement to reduce your data risk

Datadog's purpose is to gather observability information from many sources around your infrastructure and services and to bring it together in one place for you to analyze and investigate. This involves you sending a wide range of types of data content to Datadog's servers. Most of the data gathered for the intended use of the Datadog products has little chance of containing private or personal data. For the data that may contain unnecessary private or personal data, we provide instructions, tools, and recommendations to enable you to strip out, obfuscate, and otherwise reduce the inclusion of private or personal data in the data shared with Datadog.

### Sensitive Data Scanner

Sensitive Data Scanner is a stream-based, pattern matching service that you can use to identify, tag, and optionally redact or hash sensitive data. With implementation, your security and compliance teams can introduce a line of defense in preventing sensitive data from leaking outside your organization. For information about the scanner and setting it up, read [Sensitive Data Scanner][10].

### Logs Management

Logs are records produced by your systems and services and the activities that happen within them. Read about logs data security considerations, including information about how you can filter and obfuscate logs data in [Log Management Data Security][11]. 

Dive deep into controlling logs data with the [Controlling sensitive logs data][12] guide and [Agent Advanced Configuration for Logs][13].

A key approach to reducing risk around logs data security is access control. Read [How to set up RBAC for Logs][14] and [Logs RBAC Permissions][15] to learn how to do this in Datadog.

### Live processes and containers

To prevent leaking sensitive data when you're monitoring live processes and live containers, Datadog provides some default sensitive keyword scrubbing in process arguments and in Helm charts. You can obfuscate additional sensitive sequences within process commands or arguments by using the [`custom_sensitive_words` setting][16], and add to the container scrubbing word list by using the [`DD_ORCHESTRATOR_EXPLORER_CUSTOM_SENSITIVE_WORDS` environment variable][17].

### APM and other tracing library based products

The Datadog tracing libraries are used to instrument your applications, services, tests, and pipelines, and send performance data through the Agent to Datadog. Trace and span data (along with much more) is generated for the following products to use:

- Application Performance Monitoring (APM)
- Continuous Profiler
- CI Visibility
- Application Security Management

For detailed information about how tracing-library sourced data is managed, default basic security settings, and custom obfuscating, scrubbing, excluding, and modifying of trace-related elements, read [Configuring Agent and Tracer for trace data security][18].

### Serverless distributed tracing

You can use Datadog to collect and visualize the JSON request and response payloads of AWS Lambda functions. To prevent any sensitive data within request or response JSON objects from being sent to Datadog (like account IDs or addresses), you can scrub specific parameters from being sent to Datadog. Read [Obfuscating AWS Lambda payload contents][19] for more information.

### Synthetic Monitoring

Synthetic testing simulates requests and business transactions from testing locations around the world. Read about the encryption considerations for configurations, assets, results, and credentials, as well as how to use testing privacy options, in [Synthetic Monitoring Data Security][20].

### RUM & Session Replay

You can modify the data collected by Real User Monitoring in the browser to protect personally identifiable information and to sample the RUM data you're collecting. Read [Modifying RUM Data and Context][21] for details.
 
Session Replay privacy options default to protecting end-user privacy and preventing sensitive organizational information from being collected. Read about masking, overriding, and hiding elements from a session replay in [Session Replay Privacy Options][22].

### Database Monitoring

The Database Monitoring Agent obfuscates all query bind parameters sent to the Datadog intake. Thus passwords, PII (Personally identifiable information), and other potentially sensitive information stored in your database will not be viewable in query metrics, query samples, or explain plans. To read about mitigating risk for other types of data involved in database performance monitoring, read [Database Monitoring Data Collected][23].

## Other sources of potentially sensitive data 

In addition to the sensitive data that you can automatically scrub, obfuscate, and otherwise avoid collecting, a lot of the data collected by Datadog is the names and descriptions of things. We recommend not including private or personal information in the text you are sending. Consider the following (non-exhaustive) list of text data you send to Datadog in the intended use of the product:

Metadata and tags
: Metadata consists primarily of [tags][24] in the `key:value` format, for example, `env:prod`. Metadata is used by Datadog to filter and group data to help you derive meaningful information. 

Dashboards, notebooks, alerts, monitors, alerts, incidents, SLOs
: The text descriptions, titles, and names you give the things you create in Datadog are data. 

Metrics
: Metrics, including infrastructure metrics and metrics generated from integrations and other ingested data such as logs, traces, RUM, and synthetic tests, are timeseries used to populate graphs. They usually have associated tags.

APM data
: APM data includes services, resources, profiles, traces, and spans, along with associated tags. Read [the APM Glossary][25] for an explanation about each. 

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
[5]: /agent/configuration/secrets-management/
[6]: /integrations/amazon_web_services/
[7]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles
[8]: /integrations/azure/
[9]: /integrations/google_cloud_platform/
[10]: /sensitive_data_scanner/
[11]: /data_security/logs/
[12]: /logs/guide/control-sensitive-logs-data/
[13]: /agent/logs/advanced_log_collection
[14]: /logs/guide/logs-rbac
[15]: /logs/guide/logs-rbac-permissions
[16]: /infrastructure/process/#process-arguments-scrubbing
[17]: /infrastructure/livecontainers/configuration/#scrubbing-sensitive-information
[18]: /tracing/configure_data_security/
[19]: /serverless/distributed_tracing/collect_lambda_payloads#obfuscating-payload-contents
[20]: /data_security/synthetics/
[21]: /real_user_monitoring/browser/advanced_configuration/
[22]: /real_user_monitoring/session_replay/browser/privacy_options
[23]: /database_monitoring/data_collected/#sensitive-information
[24]: /getting_started/tagging/
[25]: /tracing/glossary/
