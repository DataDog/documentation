---
title: Enable profiles collection in Datadog
kind: Documentation
aliases:
  - /agent/apm/
further_reading:
- link: "tracing/troubleshooting/"
  tag: "Documentation"
  text: "APM metrics sent by the Datadog Agent"
---

To use profiling, start by [sending your traces][1] to Datadog, and then [activate profiling](#activate-profiling). You can send profiles from any supported runtime.

## Activate profiling

Profiling libraries are shipped within each language library.

### Language setup

<!-- Replace with thumbnails like https://docs.datadoghq.com/tracing/setup/ -->
* [Java][4]

## Search and view profiles

You can search for profiles sent by your applications on [Datadog UI][2]. Each line represents a profile for a process on which Datadog profiling was running for a short amount of time. Depending on the language, these processes are profiled between 15s and 60s.
You can filter according to infrastructure tags or application tags set up from your [environment tracing configuration][6].
Click on one line to view a profile.

## Troubleshooting

Datadog profiling is in beta. It will not work with some configurations or environments:
* Datadog profiling does not work with serverless.
* Datadog profiling does not work with complex proxy configuration. Profiles are sent directly from the application to Datadog.

In case you have done all the necessary configuration steps and do not see profiles on the [profile search page](#search-profiles), please turn on [debug mode][3] and open a support ticket with debug files and following information:
* OS type and version (e.g Linux Ubuntu 14.04.3)
* Runtime type, version and vendor (e.g Java OpenJDK 11 AdoptOpenJDK)

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/send_traces/
[2]: https://app.datadoghq.com/profiling
[3]: /tracing/troubleshooting/#tracer-debug-mode
[4]: /tracing/profiling/java
[5]: /tracing/profiling/python
[6]: /tracing/send_traces/#configure-your-environment
