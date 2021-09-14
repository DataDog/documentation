---
title: Events Guides
kind: documentation
further_reading:
- link: "/events/explorer/"
  tag: "Documentation"
  text: "Datadog events explorer"
- link: "/monitors/monitor_types/event/"
  tag: "Documentation"
  text: "Event monitors"
aliases:
    - /developers/events/
---

## Send your custom events to Datadog

An event represents any record of activity noteworthy for engineers (devs, ops, and security). Use these guides to programmatically send events:

{{< whatsnext desc="Submit events to Datadog with:">}}
    {{< nextlink href="/events/guides/agent/" >}}Custom Agent Check{{< /nextlink >}}
    {{< nextlink href="/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/events/guides/email/" >}}Email{{< /nextlink >}}
    {{< nextlink href="/api/v1/events/#post-an-event" >}}Datadog API{{< /nextlink >}}
{{< /whatsnext >}}

<!---(Use this guide if you are migrating from the Event Stream to the Events Explorer:)

{{< whatsnext >}}
    {{< nextlink href="/events/guides/migrating_from_stream_to_explorer/" >}}Migrating from the Event Stream to the Events Explorer{{< /nextlink >}}
{{< /whatsnext >}}
--->
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
