---
title: Glossary
kind: Documentation
---

## Agent

The Agent is a small application that runs on hosts. It executes checks and manages the flow of information from the host to the Datadog platform. The Agent is open source and compiled binaries are made available for Windows, macOS, and many flavors of Linux.

See the [Agent documentation][1] for more information.

## API

Datadog provides an HTTP API in order to interact programmatically with the platform. Every feature, resource, and mechanism is accessible via the API. Interacting with the API manually is a great way to learn how Datadog works under the hood. In production however, you will use a purpose-built tool, library, or interface - such as the Datadog product itself - as an abstraction layer between you and the API.

See the [API documentation][2] for more information.

## Check

Checks are small Python programs run periodically by the Agent. A Check performs an action and then gathers the result, which the Agent then stores and reports to the Datadog platform. These programs are freeform and are generally used to collect metrics from custom environments or applications.

Note that the word "check" - when not capitalized - refers to the generic act of taking a measurement.

## Client library

There are a number of libraries in a variety of languages that help you instrument your applications with Datadog directly. Datadog provides official libraries for C#, Golang, Java, PHP, Python, and Ruby. Libraries in other languages have been contributed by the community, and are supported on a best-effort basis.

Libraries are designed to interact with either the API or DogStatsD, though a handful provide support for both.

See the [Libraries documentation][3] for more information.

## Dashboard

Dashboards are one of the primary ways to visualize your data. There are two types of dashboards: Screenboards and Timeboards.

[Screenboards][4] are dashboards with free-form layouts that can include a variety of objects, such as images, graphs, and logs. They are commonly used as status boards or storytelling views, and can either update in real-time, or represent one or more fixed points in the past.

[Timeboards][5] have automatic layouts, and represent a single point in time—either fixed or real-time—across the entire dashboard. They are commonly used for troubleshooting, correlation, and general data exploration.

## DogStatsD

DogStatsD refers to two related things: a protocol based on [StatsD][6], and an application for reporting metrics which implements that protocol. The DogStatsD protocol is an extension of the StatsD protocol, with some modifications that are specific to the Datadog platform. The DogStatsD application is a service that is bundled with the Agent, and is used as a lightweight mechanism for reporting metrics.

See the [DogStatsD documentation][7] for more information.

## Integration

An Integration is a way to get data from your systems into Datadog. Integrations gather data from a given source, ensure that those data are classified correctly, and provide some other assets to assist with configuration and usage. Data sources can be anything from daemons on a server, to cloud services, to third-party APIs, and more.

See the [Integrations documentation][8] for more information.

## Multiple-organization ("multi-org") accounts

Multi-org accounts allow a parent-organization to create multiple child-organizations. This is most often used with Managed Service Providers (MSPs) that have many customers. Each customer requires their own organization that is not accessible by other customers. All billing for multi-org accounts is performed on the parent-organization and usage reports for the parent-organization include usage information for all child-organizations.

## Tracer

Datadog supports distributed tracing via the APM Integration. This allows you to instrument your existing code and see requests as they pass through all your systems. It works across different languages, databases, and RPC frameworks. Many languages are [supported natively][9]; however, developers can add their own language support by creating a custom shipper.

See the [Tracing documentation][10] for more information.

[1]: /agent/
[2]: /api/
[3]: /developers/libraries/
[4]: /dashboards/screenboard/
[5]: /dashboards/timeboard/
[6]: https://www.datadoghq.com/blog/statsd
[7]: /developers/dogstatsd/
[8]: /developers/integrations/
[9]: /developers/libraries/#apm-distributed-tracing-client-libraries
[10]: /tracing/
