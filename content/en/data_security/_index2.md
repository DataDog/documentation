---
title: Securing the Data Sent to Datadog
kind: documentation
aliases:
  - /security/
further_reading:
- link: "/data_security/tracing/"
  tag: "Documentation"
  text: "APM Security"
- link: "/data_security/logs/"
  tag: "Documentation"
  text: "Logs Security"
- link: "/data_security/agent/"
  tag: "Documentation"
  text: "Agent Security"
- link: "/data_security/synthetics/"
  tag: "Documentation"
  text: "Synthetic Monitoring Security"
- link: "/data_security/other/"
  tag: "Documentation"
  text: "Additional Security Considerations"
---

<div class="alert alert-info">This page is about the security of data sent to Datadog. If you're looking for cloud and application security products and features, see the <a href="/security_platform/" target="_blank">Security Platform</a> section.</div>

In the normal course of using Datadog as intended, you send data to Datadog. Datadog works together with you to reduce risk and help ensure that the data you send is appropriate, not a violation of someone's privacy, and secure during and after its transmission.

Additional important company information is available at [Datadog Security][] and [Privacy Policy][].

Much of the data you send to Datadog for intended use in the product is innocuous and not likely to contain private or personal information. However, it's important for you to know the kind of things that are sent, ways to strip out or obfuscate sensitive data before sending, or ways to prevent inserting sensitive data in the first place.

## How data gets from you to Datadog

Datadog allows you to send data in multiple ways, including from the [Agent][], [DogStatsD][], the [public API][2], and [integrations][3]. In addition, [RUM SDKs][] and [tracing libraries][] generate data based on your application and services code and sends it to Datadog. 

While data is in motion, Datadog protects it with Transport Layer Security (TLS) and HTTP Strict Transport Security (HSTS). Data stored by Datadog is protected by encryption, access controls, and authentication. For specifics, read more at [Datadog Security][].

## Kinds of data you send 

Datadog's purpose is to gather observability information from many sources around your infrastructure and services, and to bring it together in one place for you to analyze and investigate. This involves you sending a wide range of types of data content to Datadog's servers. Some of that data is structured and follow patterns that we can automatically check for and handle appropriately to protect privacy. Read about [using these automation and tools options](#datadog-automation-and-tools-for-protecting-data) next. 

However, a lot of the data is the names and descriptions of things, and you must consider whether the text you are sending represent private data for you or your customers, and if so avoid sending it. Consider the following types of data you send to Datadog during the intended use of the product:

Metadata and tags
: Metadata consists primarily of [tags][6] in the `key:value` format, for example, `env:prod`. Metadata is used by Datadog to filter and group data to help you derive meaningful information. 

Dashboards, notebooks, alerts, monitors, alerts, incidents, SLOs
: The text descriptions, titles, and names you give the things you create in Datadog are data. 

Metrics
: Metrics, including infrastructure metrics and metrics generated from integrations and other ingested data such as logs, traces, RUM, and synthetic tests, are timeseries used to populate graphs. They usually have associated tags.

APM data
: APM data includes services, resources, profiles, traces, and spans, along with associated tags. Read [the APM Glossary][7] for an explanation about each. 

Database query signatures
: Database monitoring data consists of metrics and samples, along with their associated tags, collected by the Agent and used to track historical performance of normalized queries. The granularity of this data is defined by its normalized query signature and unique host identifier. 

Logs
: Logs and their associated tags are collected [by the Agent or by integrations][9]. Logs record computer events about an operating system, application, or user activities, forming an audit trail that can help detect security violations, performance problems, and flaws in applications. Log messages can contain almost any form of data.

Process information
: [Processes][11] consist of metrics and data from the `proc` filesystem, which acts as an interface to internal data structures in the kernel. Process data may contain the process command (including its path and arguments), the associated username, the ID of the process and its parent, the process state, and the working directory. Process data usually also has tag metadata associated with it.

Events and comments
: [Events][14] data is aggregated from multiple sources into a consolidated view, including triggered monitors, events submitted by integrations, events submitted by the application itself, and comments sent by users or through the API. Events and comments usually have associated tags metadata.

Continuous Integration pipelines and tests
: ...

RUM, Synthetics, Security signals


## Datadog automation and tools for protecting data

- **Sensitive Data Scanner**: 
- **Database queries**: All query parameters are obfuscated and discarded from collected samples before being sent to Datadog.
- **Process arguments**: Values for the following keywords are obfuscated from process data:
`password` `passwd` `mysql_pwd` `access_token` `auth_token` `api_key` `apikey` `secret` `credentials` `stripetoken`. In addition, you can obfuscate sensitive sequences within process commands or arguments by using the [`custom_sensitive_words` setting][3] to provide an exclusion list of one or more regular expressions.
- Sensitive Data Scanner: /account_management/org_settings/sensitive_data_detection/


## Component-specific data security

### The Datadog Agent

The Agent is the main channel for data getting from your systems to Datadog. [Read all about data security measures in the Agent][/data_security/agent/].

### Third party services integrations

The Datadog integrations for some third party services are configured directly in the Datadog, and might require you to provide credentials that allow Datadog to connect to the service on your behalf. The credentials you provide are encrypted and stored by Datadog in a secure credential datastore, with strict security guarantees enforced. 

All data is encrypted at-rest and in-transit. Access to the secure credential datastore is controlled and audited, and specific services or actions within those services are limited to only what is necessary. Anomalous behavior detection continuously monitors for unauthorized access. Datadog employee access for maintenance purposes is limited to a select subset of engineers.

### Cloud integrations

Due to their sensitive nature, additional security guarantees are implemented where possible when integrating with cloud providers, including relying on Datadog-dedicated credentials with limited permissions. For example:

* The [integration with Amazon Web Services][5] requires you to configure role delegation using AWS IAM, as per the [AWS IAM Best Practices guide][6], and to grant specific permissions with an AWS Policy.
* The integration with [Microsoft Azure][7] relies on you defining a tenant for Datadog, with access to a specific application granted only the "reader" role for the subscriptions you would like to monitor.
* The integration with [Google Cloud Platform][8] relies on you defining a service account for Datadog, and granting it only the "Compute Viewer" and "Monitoring Viewer" roles.

### Logs Management

Logs are records produced by your systems and services and the activities that happen within them. [Read about security considerations and tools for logs management][/data_security/logs].

### APM and other tracing library based products

The Datadog tracing libraries are used to instrument your applications and services and send performance data through the Agent to Datadog. Trace and span data (along with much more) is generated for the following products to use:

- Application Performance Monitoring (APM)
- Continuous Profiler
- CI Visibility
- Application Security Monitoring

For detailed information about how tracing-library sourced data is managed, and the tools you can use to improve data security, read [Configuring Agent and Tracer for trace data security][].

### Synthetic Monitoring

Synthetic testing simulates requests and business transactions from testing locations around the world. Read about the encryption considerations for configurations, assets, results, and credentials, as well as how to use testing privacy options, in [Synthetic Monitoring Data Security][data_security/synthetics/].

### RUM and Session Replay

The RUM SDK ,,,, Session Replay ... 

### Database Monitoring

The Database Monitoring Agent obfuscates all query bind parameters sent to the Datadog intake. Thus passwords, PII (Personally identifiable information), and other potentially sensitive information stored in your database will not be viewable in query metrics, query samples, or explain plans. To read about mitigating risk for other types of data involved in database performance monitoring, read [Database Monitoring Data Collected][/database_monitoring/data_collected/#sensitive-information].

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}