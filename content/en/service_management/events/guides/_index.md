---
title: Events Guides
kind: documentation
private: true
disable_toc: true
aliases:
- /developers/events/
- /event/guides/
further_reading:
- link: "/service_management/events/explorer/"
  tag: "Documentation"
  text: "Datadog Events Explorer"
- link: "/monitors/types/event/"
  tag: "Documentation"
  text: "Event Monitors"
cascade:
    algolia:
        rank: 20
        category: Guide
        subcategory: Events Guides
---

An event represents any record of activity noteworthy for engineers (devs, ops, and security). 

{{< whatsnext desc="Send your custom events to Datadog:">}}
    {{< nextlink href="/service_management/events/guides/agent/" >}}Custom Agent Check{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/dogstatsd/" >}}DogStatsD{{< /nextlink >}}
    {{< nextlink href="/service_management/events/guides/email/" >}}Email{{< /nextlink >}}
    {{< nextlink href="/api/v1/events/#post-an-event" >}}Datadog API{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Ensure your events are tagged:">}}
{{< nextlink href="/service_management/events/guides/recommended_event_tags/" >}}Best Practices for Tagging Events{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Other guides:">}}
    {{< nextlink href="/service_management/events/guides/migrating_to_new_events_features/" >}}Migrating to the New Events Features{{< /nextlink >}}
{{< /whatsnext >}}


## Event Management
Event correlation feature is in private beta. For access, [contact the Datadog support team][1] or sign up using [this form][2].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: https://docs.google.com/forms/d/e/1FAIpQLSeYkh0jFy_wMCLGKZ5019H0DpFvq0fILvyJEt_gRyeGgvRymA/viewform