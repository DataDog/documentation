---
title: Migrating from your current On-Call provider
further_reading:
- link: "https://docs.datadoghq.com/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
- link: "https://docs.datadoghq.com/service_management/incident_management/"
  tag: "Documentation"
  text: "Incident Management Documentation"
---

## 1. Introduction
**Purpose of This Guide**

Migrating your existing on-call management solution to [Datadog On-Call][1] can significantly improve your operational efficiency, reduce costs, and bring monitoring and incident response under one roof. This guide outlines a structured approach to migrating smoothly and effectively. Typically, organizations begin this migration after successfully trialing Datadog On-Call with one or two teams, validating its capabilities and ensuring it aligns with their operational requirements.

By following this blueprint, you will understand the key stages involved in migration, including preparation, testing, and final deployment, and you'll have a clear idea of next steps.

**Who Should Use It**

This guide is intended for stakeholders directly involved in the migration process, including DevOps engineers, Site Reliability Engineers (SREs), team leads, and anyone responsible for configuring, maintaining, or managing your on-call processes.

## 2. Assess Your Current On-Call Setup
**Inventory Current Tools and Workflows**

Begin by creating a list of all the tools currently paging your on-call team. This includes monitoring platforms (such as Datadog), ticketing systems, and internal or custom-developed tools. For each tool, document the current integration method—whether it's through native integrations, webhooks, email ingest, or other means.

This step is also an ideal opportunity to evaluate whether you wish to retain these integrations as they are or instead leverage one of [Datadog's 800+ integrations][2]. Consolidating key telemetry into Datadog can reduce complexity and help you achieve a unified operational view under a single pane of glass.

## 3. Plan the Migration
**Project Scope and Timeline**

Break your migration plan into clear, manageable phases:

1. **Discovery**: Document current integrations, workflows, and user needs.
2. **Configuration**: Set up Datadog On-Call according to your documented requirements.
3. **Testing**: Thoroughly validate all workflows, alerts, and escalations before finalizing the migration.

Clearly assign responsibilities to specific owners for each phase, and set realistic deadlines. Communicate these timelines and responsibilities widely and clearly across your teams to ensure everyone is prepared. Establish direct communication channels, such as a dedicated Slack or Microsoft Teams space, where team members can ask questions, raise blockers, and stay up to date on progress.

This phase is also an excellent time to prepare your organization for the transition—encourage all teams who will be impacted to proactively download and set up the [Datadog mobile app][3] to ensure they can receive critical push notifications without delay.

## 4. Prepare and Configure Datadog On-Call
**Familiarize with Datadog On-Call and Teams**

Before diving into configuration, spend some time becoming familiar with Datadog On-Call, particularly the ["Teams" concept][4]. Teams are foundational for structuring your on-call management in Datadog—they group users, schedules, and escalation policies, providing a clear and organized structure for managing incidents and responsibilities.

Consider how your current vendor's assets, such as schedules and escalation policies, map onto Datadog Teams. This mapping step is crucial and can greatly simplify the transition.

Datadog offers a dedicated migration tool (as of now for PagerDuty only) designed to easen your transition by selectively migrating relevant schedules, escalation policies, and other critical components directly into Datadog On-Call. Rather than manually recreating your existing rotation schedules—whether daily, weekly, or other formats—you can use this tool to automate the migration process, reducing manual effort. This selective migration approach also gives your organization the opportunity to leave behind accumulated toil, such as unused or outdated schedules, offering a fresh start.

## 5. Start Routing Alerts and Complete the Migration
With your Datadog On-Call setup fully configured, confidently route your alerts directly to Datadog. Utilize the [monitor migrator tool][5] to effortlessly reroute your existing monitors to your On-Call Teams. To reduce last-minute cutover complexity, some teams opt to temporarily route alerts to both Datadog On-Call and their existing provider. This allows teams to finalize their Datadog setup and cleanly phase out the old system without needing to rush or coordinate a high-stakes switch-over event. You can use the monitor bulk editor to append new on-call handles without removing your legacy routing until you're ready.

When your monitors are routing alerts to Datadog On-Call and your teams are fully onboarded, you can begin phasing out your previous on-call solution. Most teams choose to do this incrementally—retiring legacy configurations once they've confirmed that Datadog is reliably handling notifications and escalations. This is a good time to clean up outdated schedules, remove old routing paths, and update your documentation and runbooks to reflect the new source of truth, including any changes to Live Call Routing and team responsibilities.

## 6. Resources and Next Steps

You've now completed the core migration process to Datadog On-Call. To ensure continued success and long-term maintainability of your on-call processes, there are a few final recommendations:

- **Explore Additional Documentation**: Dive deeper into Datadog's documentation on [incident management][6], [On-Call Schedules][7], and [integrations][2].
- **Join our Datadog community**: The Slack Community program is a network built by Datadog users for Datadog users to help each other find answers to questions or to share product tips and tricks. [Join Slack Channel >][8]
- **Stay Informed**: Subscribe to [Incident Response product updates][9] to take advantage of new features as they roll out.

[1]: https://app.datadoghq.com/on-call/
[2]: /integrations/
[3]: /mobile/
[4]: /on_call/teams/
[5]: https://www.google.com
[6]: /service_management/incident_management
[7]: /service_management/on-call/schedules/
[8]: https://chat.datadoghq.com/
[9]: https://app.datadoghq.com/release-notes?category=Incident%20Response
