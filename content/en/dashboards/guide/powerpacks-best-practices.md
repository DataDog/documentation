---
title: Scale Graphing Expertise with Powerpacks
further_reading:
- link: "/dashboards/widgets/powerpack"
  tag: "Documentation"
  text: Powerpack Widget
- link: "https://docs.datadoghq.com/getting_started/dashboards/#add-widgets-and-refine-what-they-show"
  tag: "Documentation"
  text: Add widgets and refine what they show
- link: "https://www.datadoghq.com/blog/standardize-dashboards-powerpacks-datadog/"
  tag: "Blog"
  text: "Save dashboard widgets in reusable groups with Powerpacks"
- link: "https://docs.datadoghq.com/dashboards/guide/maintain-relevant-dashboards/"
  tag: "Guide"
  text: Best practices for maintaining relevant dashboards
---

## Overview

Powerpacks are templated groups of widgets that scale graphing expertise as reusable dashboard building blocks. They provide a scalable way to capture domain knowledge or organization-specific standards and share them throughout an organization. Using Powerpacks, you can empower dashboard creators to incorporate knowledge across technology areas into their existing dashboards without additional training.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_powerpack.png" alt="The configure powerpack page in the Datadog application showing a section to configure values with tags or attributes, several graphs from an example powerpack, and a menu on the right to browse other packs" style="width:100%;" >}}

Powerpacks are either preset (created by Datadog) or custom (created by a user).

- Preset Powerpacks provide out-of-the-box views for common monitoring patterns like performance metrics or feature usage. They are often linked to a specific product or integration (like `RUM Page Views`) and are maintained by Datadog.
- Anyone with dashboard write permissions can create custom Powerpacks to help users share and standardize internal best practices. Updates to custom Powerpacks are synced to all its Powerpack instances, so you don't have to make individual updates across multiple dashboards.
 
This guide addresses best practices for creating and sharing custom Powerpacks.

## When do custom Powerpacks help?

As an organization grows, expertise and ownership easily become distributed across multiple teams. Powerpacks work best for organizations with:

- Teams who own a specific technology (for example, Postgres, Kafka, Node.js) or stakes (such as Compliance or Security) across the organization.
- Individual teams in charge of incorporating these technologies or stakes into full-stack and business-driven views.

This ownership model fosters standardization across your teams and provides a scalable way to promote organizational best practices for monitoring key components of a business. For both operational metrics and KPIs, distributing ownership along technology lines and team lines ensures key stakeholders like on-call engineers, SREs, and executives can access and interpret relevant views on dashboards across the business.

## Best practices for creating a Powerpack

A well-constructed Powerpack can speed up an organization's adoption of new monitoring patterns, like adding security observability to all existing application teams' dashboards. Build a clear, self-contained Powerpack to ensure dashboard owners get the most from your content while minimizing issues or questions. 

### Build self-explanatory content

The content in a Powerpack should be self-explanatory. When creating a Powerpack, include the context a dashboard viewer needs to interpret and understand the pack, even in the context of other groups on the dashboard. Some tools to achieve this include:

- Clear and short titles to describe what a graph displays.
- Note widgets with additional context.
- Horizontal markers to show expected and unexpected thresholds.

A note widget can give helpful context on how to interpret a graph. For example, the `RUM Page Views` Powerpack describes how to compare the current week's page views to the previous week's. Notes can also link to external resources, like in the `System Resource Utilization` pack.

{{< img src="dashboards/guide/powerpacks_best_practices/note_widget_example.png" alt="An example powerpack titled /checkout Page Views showing several graphs of real user monitoring data. In the top right is a notes widget with a message providing information about one of the graphs" style="width:100%;" >}}

On-graph markers, like horizontal markers and forecast functions, can provide context on what a value means. For example, the `Hosts Overview` pack shows Agent NTP offsets where they appear on a graph. Horizontal markers reduce the visual mapping a viewer has to do by clearly defining acceptable thresholds on a graph.

{{< img src="dashboards/guide/powerpacks_best_practices/horizontal_marker_example.png" alt="An example powerpack titled hosts overview showing a line graph titled Current Agent NTP offset. The graph is colored green between the values -1 and 1, and these thresholds are marked as offset -1s and offset +1s respectively. The graph is colored yellow between 1 and 3 and also between -1 and -3, and these thresholds are marked as offset -3s and offset +3s respectively. The graph is colored red beyond +3 and -3." style="width:100%;" >}}

### Make Powerpacks discoverable

Powerpacks appear in the dashboard widget tray and you can find them through keyword or tag searches. Powerpack title, description, and tags are all searchable fields and provide the easiest way for someone to find your Powerpack.

{{< img src="dashboards/guide/powerpacks_best_practices/powerpack_keyword_search.png" alt="An example search being done in the Add Widgets menu of a dashboard with the keyword resource" style="width:60%;" >}}

To ensure the right users find your Powerpack, include keywords your users might search (such as "performance") in the title or description, and tag key technologies.

Descriptions are limited to 80 characters. A good description provides a brief summary of what a pack is for and how someone can use it. For example, "View usage patterns for a UI action on a specific app page" for `RUM Feature Usage` describes what the Powerpack tracks, what it expects as an input (a specific app page), and includes keywords like "usage," "UI," and "app".

#### Tagging Powerpacks

Use tags to specify key technologies or search phrases for a specific pack (for example, `aws`, `k8s`, `app`). Use plain strings to describe the content of the packs; avoid putting `key:value` pairs in the tag field directly. Tags are limited to 80 characters.

To search Powerpacks by tag in the widget tray, use `tag:search_string` syntax. 

{{< img src="dashboards/guide/powerpacks_best_practices/powerpack_tag_search.png" alt="An example search being done in the Add Widgets menu of a dashboard with tag:security" style="width:60%;" >}}

### Make Powerpacks customizable

Powerpacks are most useful when they can be customized by each team into their relevant context. Set configuration variables to allow this.

The Powerpack creation modal suggests variables to add to your pack based on common filters that appear in queries. Hover over any suggested variable to see which graphs it affects. To add a variable that is not suggested, modify your graphs directly in the dashboard to use the desired variable as a filter or as a template variable.

Modify the names of variables to clarify how others should use them. In the example below, `@appsec.type` is renamed `AttackType` to clarify the expected input. 

{{< img src="dashboards/guide/powerpacks_best_practices/create_powerpack.png" alt="The Create Powerpack screen. Along the left, it shows Powerpack Title, and Group Title ,both entered as Application Security Overview, the Add Tags section configured with security and app, and several variables configured in the Add Variables section, including the attribute @appsec.type showing AttackType entered as its name. Below that is a section showing Add Common Filters as Variables, with several options shown and the @appsec.category:attack_attempt filter highlighted. There are several graphs along the right, and three of them are highlighted in the same color as the @appsec.category:attack_attempt filter on the left" style="width:100%;" >}}

Configuration variables serve two purposes. They can:
1. Help a team scope a Powerpack to their context once, before the pack gets added to their dashboard (such as selecting a `service` to ensure a security Powerpack is relevant to the correct service).
2. Allow users to filter a Powerpack after the pack gets added to a dashboard (such as viewing security signals in a Powerpack in both `prod` and `staging` environments).

Each Powerpack user decides whether to save a variable to their dashboard to allow dynamic filtering. In the example below, the user is able to change the value of `$Environment` on their dashboard through a template variable, but `$Service` is always set to `agent`.

{{< img src="dashboards/guide/powerpacks_best_practices/configure_variables.png" alt="A screen showing the option to configure values for tag or attribute variables, with a column for Tag or Attribute, Name, Value, and Use as Template Variable, which shows a checkbox providing the option to Add to dashboard. The Add to dashboard checkbox is checked for $Environment and unchecked for $Service." style="width:100%;" >}}

### Updating a Powerpack

Changes made to an existing custom Powerpack are reflected across all instances of the same Powerpack. This can simplify the process of updating duplicate content across several dashboards. Click **Edit Powerpack Layout** to edit synced Powerpack instances.

### Permissions
By default, edit permissions for Powerpacks are restricted to the author. Editing permission can be modified at any time through the kebab menu in the widget tray or in the header of a Powerpack instance.

### Spread the word

Once your Powerpack is created, let your organization know about it. Communicating about your pack both announces the pack and provides a channel for any questions. Share the name of your Powerpack with your organization through communication channels like email or messaging platforms, specify who the pack is intended for, and describe where you expect it to appear. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
