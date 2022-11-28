---
title: Events Guides
kind: documentation
private: true
disable_toc: true
further_reading:
- link: "/events/explorer/"
  tag: "Documentation"
  text: "Datadog Events Explorer"
- link: "/monitors/create/types/event/"
  tag: "Documentation"
  text: "Event Monitors"
aliases:
    - /developers/events/
cascade:
    algolia:
        rank: 20
        tags: ["guide"]
        category: Guide
        subcategory: Events Guides
---

An event represents any record of activity noteworthy for engineers (devs, ops, and security). 

{{< whatsnext desc="Send your custom events to Datadog:">}}
    {{< nextlink href="/events/guides/agent/" >}}Custom Agent Check{{< /nextlink >}}
    {{< nextlink href="/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/events/guides/email/" >}}Email{{< /nextlink >}}
    {{< nextlink href="/api/v1/events/#post-an-event" >}}Datadog API{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Ensure your events are tagged:">}}
{{< nextlink href="/events/guides/recommended_event_tags/" >}}Best Practices for Tagging Events{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Other guides:">}}
    {{< nextlink href="/events/guides/migrating_to_new_events_features/" >}}Migrating to the New Events Features{{< /nextlink >}}
{{< /whatsnext >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
