---
title: Events Guides
kind: documentation
further_reading:
- link: "/events/"
  tag: "Documentation"
  text: "Datadog events stream"
- link: "/monitors/monitor_types/event/"
  tag: "Documentation"
  text: "Event monitors"
aliases:
    - /events/
---

Datadog classifies an _event_ as any notable changes relevant for managing IT operations such as code deployments, service health, configuration changes, or monitoring alerts. Datadog Events gives you a consolidated interface to search, analyze, and filter events from any source in one place. Use these guides to progamattically send events:

{{< whatsnext desc="Submit events to Datadog with:">}}
    {{< nextlink href="/events/guides/agent/" >}}Custom Agent Check{{< /nextlink >}}
    {{< nextlink href="/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/events/guides/email/" >}}Email{{< /nextlink >}}
    {{< nextlink href="/api/v1/events/#post-an-event" >}}Datadog API{{< /nextlink >}}
{{< /whatsnext >}}

Use this guide if you are migrating from the Events Stream to the Events Explorer:

{{< whatsnext >}}
    {{< nextlink href="/events/guides/migrating_from_stream_to_explorer/" >}}Migrating from the Events Stream to the Events Explorer{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
