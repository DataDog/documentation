---
title: Draft Monitors
further_reading:
- link: "monitors/"
  tag: "Documentation"
  text: "Monitors and Alerting Overview"
- link: "monitors/configuration/?tab=thresholdalert"
  tag: "Documentation"
  text: "Configure monitors"
- link: "monitors/manage/"
  tag: "Documentation"
  text: "Manage monitors"
---

## Overview

Draft Monitors let you safely create, refine, and test alerts without triggering notifications or impacting production. Whether you're experimenting with thresholds, iterating on complex queries, or collaborating with teammates, drafts give you a clean, isolated space to work—free from the noise of unfinished or test monitors. They help reduce alert fatigue during development and ensure only fully vetted monitors go live. Ideal for engineers and SREs managing alert workflows, Draft Monitors provide a clear, low-risk path from idea to reliable alert.

## Create a draft monitor

To create and store monitors in a draft state:

1. Navigate to [**Monitors > New Monitor**][1].  
2. [Configure the monitor][2] (add your query, specify conditions, set notifications). Notifications set in a draft are only used after the monitor is published.  
3. Click **Save as Draft**. No alerts are sent from this draft monitor.

{{< img src="/monitors/draft/save_as_draft.png" alt="Save as Draft button in the monitor creation interface" style="width:100%;" >}}

## Publish a draft monitor

When your monitor is ready:

1. Open the draft from [**Monitors List**][3] by using the draft status facet or filter by `status:draft`.  
2. Review the configuration.  
3. Click **Publish Monitor.**  
4. This publishes your monitor and begins alerting based on your conditions.

## Manage Draft monitors

<!-- TODO Add image of Monitors List filtered to view drafts, and final QA of instructions with UI-->

Find draft monitors from the [**Monitors List**][3] by using the draft status facet or filter by `draft_status:draft`. Drafts appear with a **Draft** label on the monitor status page and in the monitor list. Drafts expire after 6 months, but you can delete draft monitors at any time.

## Permissions

Anyone with edit permissions can update a draft monitor. You can use events to preview how often the monitor would have triggered without sending actual notifications.

## Best Practices

* **Use drafts for peer reviews:** Collaborate before pushing changes live.  
* **Avoid noise in production:** Test alert conditions safely in a draft first.  
* **Track your work:** Use clear names and tags for drafts during development.  
* **Limit stale drafts:** Review and clean up old drafts to reduce clutter.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: https://docs.datadoghq.com/monitors/configuration/?tab=thresholdalert
[3]: https://app.datadoghq.com/monitors/manage