---
title: I have a downtime scheduled on my monitor, why did it still alert?!
kind: faq
customnav: monitornav
---

When you [schedule a downtime](/monitors/downtimes) over a specific tag scope, the downtime will apply "AND" logic to those tags. So if you wanted to set up a downtime over `host:A` and `host:B`, then the downtime will silence only those monitors that alert on evaluation groups that contain both tags **`host:A` AND `host:B`** (and such a downtime would likely not silence any alerts).  

If you want to schedule a downtime over a subset of hosts, a good way to do so is to find a host-tag common to all those hosts and scope the downtime by that tag.  

One easy way you can take advantage of to create new host-tags directly in the Datadog UI from your [Infrastructure List](/graphing/infrastructure) and [Host Map](/graphing/infrastructure/hostmap) by selecting a host and hitting the **Edit Tags** button (shown below), or via [our API](/api/#tags-add). 

{{< img src="monitors/faq/edit_tag.png" alt="edit tag" responsive="true">}}
