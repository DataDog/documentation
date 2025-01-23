---
title: RUM Usage Attribution

description: Guide for defining attribution tags to internal teams.
further_reading:
- link: '/real_user_monitoring/'
  tag: 'Documentation'
  text: 'Real User Monitoring'
---

{{< callout url="#" btn_hidden="true" header="false">}}
  RUM Usage Attribution is in Preview. To request access, contact <a href="https://docs.datadoghq.com/help/"> Datadog Support</a>.
{{< /callout >}}

## Overview

Defining attribution tags allow administrators to understand where their Datadog budget is being spent. The tags are used to analyze your usage data and attribute usage to internal teams (or any dimension you would like to use).

- You can define up to 3 usage attribution tags.
- You can enforce usage attribution tags at the organization level (recommended).
- Tags can be set and managed directly from the UI at the RUM application level.

## Enforce tags to be set at the org level

You can require that a usage attribution tag gets added to an application so that you can understand how its usage contributes to your Datadog bill. When this setting is active, usage attribution tags are required upon creating a new or updating an existing application on Datadog.

1. Ensure you have the RUM Settings Write permission.
2. Navigate to [**Digital Experience** > **Real User Monitoring** > **Manage Applications** > **Enforce Usage Attribution**][1].
3. Click the toggle to **Enforce tags for usage attribution on all applications**.

## Define a usage attribution tag

To define a usage attribution tag:

1. Go to the [RUM Application Management][2] page.
2. When creating a new application or updating one, 


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/enforce-usage-attribution-tags
[2]: 