---
title: Getting Started with Change Tracking
description: "Set up Change Tracking for backend deployments with APM, confirm that changes are arriving, and investigate your first change."
further_reading:
- link: "/tracing/services/deployment_tracking/"
  tag: "Documentation"
  text: "Deployment Tracking"
- link: "/getting_started/tagging/unified_service_tagging/"
  tag: "Documentation"
  text: "Unified Service Tagging"
---

## Overview

Change Tracking collects data from Datadog products. Getting started is less about installing something new and more about confirming that the source you care about is configured and that its changes reach your services.

This guide walks you through how to track backend deployments with APM, confirm the changes are arriving, and investigate one. If deployments are not the change you want to start with, choose a different path in the next section. The shape of the work is the same.

## Choose what to track

Start with one change source rather than all of them. The most common starting point is backend code deployments, because most teams already send APM data.

| If you want to track | Start with | Setup lives in |
| --- | --- | --- |
| Backend code deployments | APM | [Deployments][1] |
| Frontend deployments and feature flag evaluations | RUM | [Deployments][1] and [Feature flags][2] |
| Feature flag changes | Datadog Feature Flags, LaunchDarkly, or the Events API | [Feature flags][2] |
| Cloud resource and Kubernetes changes | Infrastructure Monitoring and the Kubernetes integration | [Infrastructure changes][3] |
| Anything else | Events API | [Tracked Change Types][4] |

## Set up the APM path

This is the path the rest of this guide follows.

1. **Send APM data for your service.** If your service already appears in [APM][5], this step is done.
1. **Add a `version` tag to the service.** Change Tracking identifies a deployment by a change in the service's `version` tag, so a version must be available on the service. `version` is a reserved tag in [Unified Service Tagging][6], which is the canonical setup.

After your service is deploying with a `version` tag, its deployments are tracked. There is nothing to enable inside Change Tracking itself.

## Confirm changes are arriving

<!-- TODO: Confirm that documenting source:change_tracking is OK. -->

To confirm that Datadog is receiving changes for your service:

1. Open the [service page][7] for your service and find the changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section. Your recent deployments appear on the timeline.
1. In the [Event Explorer][8], search for `source:change_tracking`. The change events that appear here are the same changes that appear on change timelines.

For change types other than APM deployments, follow the setup instructions for that change type in [Tracked Change Types][4]. For example, to set up frontend change overlays, see [RUM deployment tracking][9].

## Investigate your first change

With deployments tracked, open the service page for your service and find the changes timeline in the {{< ui >}}Service Summary{{< /ui >}} section. This timeline is separate from the {{< ui >}}Deployments{{< /ui >}} tab further down the page, which is APM's version comparison view. Click a change to open the change side panel, where you can see what changed, compare it against the previous deployment, and jump to the commit or CI run behind it.

That is the smallest version of the investigation. In a real one, the change usually finds you instead. On a dashboard, a monitor status page, or the RUM Explorer, Datadog surfaces the changes most likely to explain what you are looking at.

For the full path, including Semantic Search and Bits AI, see [Investigate Relevant Changes][10].

## What's next

- [Tracked Change Types][4]: Every change type, the product it comes from, and how to enable it.
- [Investigate Relevant Changes][10]: The investigation path, end to end.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /change_tracking/change_types/#deployments
[2]: /change_tracking/change_types/#feature-flags
[3]: /change_tracking/change_types/#infrastructure-changes
[4]: /change_tracking/change_types/
[5]: /tracing/
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /tracing/services/service_page/
[8]: /events/explorer/
[9]: /real_user_monitoring/guide/setup-rum-deployment-tracking/
[10]: /change_tracking/investigate/
