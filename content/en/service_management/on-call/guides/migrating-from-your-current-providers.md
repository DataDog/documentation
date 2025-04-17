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

Migrating your existing on-call management solution to [Datadog On-Call](https://www.datadoghq.com/product/on-call-management/) can significantly improve your operational efficiency, reduce costs, and streamline alerting and incident management. This guide outlines a structured approach to migrating smoothly and effectively. Typically, organizations begin this migration after successfully trialing Datadog On-Call with one or two teams, validating its capabilities and ensuring it aligns with their operational requirements.

By following this blueprint, you will understand the key stages involved in migration, including preparation, testing, and final deployment, and you'll have a clear idea of next steps.

**Who Should Use It**

This guide is intended for stakeholders directly involved in the migration process, including DevOps engineers, Site Reliability Engineers (SREs), team leads, and anyone responsible for configuring, maintaining, or managing your on-call processes.

## 2. Assess Your Current On-Call Setup
**Inventory Current Tools and Workflows**

Begin by creating a comprehensive list of all the tools currently paging your on-call team. This includes monitoring platforms (such as [Datadog](https://www.datadoghq.com)), ticketing systems, and internal or custom-developed tools. For each tool, document the current integration method—whether it's through native integrations, webhooks, email ingest, or other means.

This step is also an ideal opportunity to evaluate whether you wish to retain these integrations as they are or instead leverage one of [Datadog's 800+ integrations](https://docs.datadoghq.com/integrations/). Consolidating key telemetry into Datadog can streamline monitoring, reduce complexity, and help you achieve a unified operational view under a single pane of glass.

**Identify Gaps and Pain Points**
- Analyze which parts of the current vendor setup are inefficient or costly.
- Document any user feedback about slow response times, unclear escalations, or missing features.

## 3. Plan the Migration
**Project Scope and Timeline**

Effective planning is crucial for a successful migration. Break your migration plan into clear, manageable phases:

1. **Discovery**: Document current integrations, workflows, and user needs.
2. **Configuration**: Set up Datadog On-Call according to your documented requirements.
3. **Testing**: Thoroughly validate all workflows, alerts, and escalations before finalizing the migration.

Clearly assign responsibilities to specific owners for each phase, and set realistic deadlines. Communicate these timelines and responsibilities widely and clearly across your teams to ensure everyone is prepared and aligned. Establish direct communication channels, such as a dedicated Slack or Microsoft Teams space, where team members can ask questions, raise blockers, and stay up to date on progress. T

This phase is also an excellent time to prepare your organization for the transition—encourage all teams who will be impacted to proactively download and set up the [Datadog mobile app](https://docs.datadoghq.com/mobile/) to ensure they can receive critical push notifications without delay.

## 4. Prepare and Configure Datadog On-Call
**Familiarize with Datadog On-Call and Teams**

Before diving into configuration, spend some time becoming familiar with Datadog On-Call, particularly the ["Teams" concept](https://docs.datadoghq.com/on_call/teams/). Teams are foundational for structuring your on-call management in Datadog—they group users, schedules, and escalation policies, providing a clear and organized structure for managing incidents and responsibilities.

Consider how your current vendor's assets, such as schedules and escalation policies, map onto Datadog Teams. This mapping step is crucial and can greatly simplify the transition.

Datadog offers a [dedicated migration tool](https://docs.datadoghq.com/on_call/migration/) designed to streamline your transition by selectively migrating relevant schedules, escalation policies, and other critical components directly into Datadog On-Call. Rather than manually recreating your existing rotation schedules—whether daily, weekly, or other formats—you can leverage this tool to automate the migration process, significantly reducing manual effort. This selective migration approach also gives your organization the opportunity to leave behind accumulated toil, such as unused or outdated schedules, offering a fresh and optimized start. As part of the configuration, ensure to clearly map complex or specialized rules like follow-the-sun models or holiday-specific overrides, set up appropriate notification channels (email, SMS, Slack, and push notifications), and update Live Call Routing numbers in your internal documentation (wikis, SOPs, etc.) to prevent disruption.

## 5. Start Routing Alerts and Complete the Migration

With your Datadog On-Call setup fully configured, confidently route your alerts directly to Datadog. Utilize the [monitor migrator tool](https://docs.datadoghq.com/on_call/monitor-migration/) to effortlessly reroute your existing monitors from your previous system, immediately leveraging your newly established schedules and escalation policies in Datadog On-Call. Notifications will reliably reach your designated teams, ensuring timely responses and streamlined incident management.

Once you have confidence in your Datadog On-Call setup, proceed to fully decommission your previous on-call vendor. Depending on your organization's needs, choose between a phased migration or a complete "big-bang" cutover. Clearly define scope if performing a phased approach and have a rollback plan ready to address any critical blockers swiftly. Ensure your documentation, such as wikis and runbooks, is updated to reflect new on-call procedures and contact methods, including updated Live Call Routing numbers. Finally, decide how you will handle historical incident data—either migrating it to Datadog for reporting purposes or securely archiving it elsewhere.

**Deliverables:**
- Fully routed alerts to Datadog On-Call
- Decommissioned previous vendor
- Updated internal documentation
- Decision on historical data management

## 6. Resources and Next Steps

You've now completed the core migration process to Datadog On-Call. To ensure continued success and long-term maintainability of your on-call processes, there are a few final recommendations:

- **Explore Additional Documentation**: Dive deeper into Datadog's documentation on [incident management](https://docs.datadoghq.com/incidents/), [on-call scheduling](https://docs.datadoghq.com/on_call/), and [integrations](https://docs.datadoghq.com/integrations/).
- **Join the Community**: Engage with the [Datadog community](https://www.datadoghq.com/community/) for support, best practices, and product updates. Consider joining community Slack groups, forums, and live events.
- **Stay Informed**: Subscribe to [Datadog's product updates](https://www.datadoghq.com/blog/) and release notes to take advantage of new features as they roll out.
- **Enable Feedback Loops**: Regularly check in with on-call users to collect feedback and identify improvements to scheduling, escalation logic, or notification preferences.
- **Plan for Future Growth**: Establish a scalable process for onboarding new teams, services, and regions as your organization grows.

**Deliverables:**
- Shared access to Datadog documentation across your teams
- Defined post-migration support contacts and channels
- Feedback loop and continuous improvement plan
- Long-term onboarding and scaling strategy

# Appendix: Checklist
Here's a ready-to-use checklist you can copy-paste in your notes tool of your choice:

[ ] Datadog On-Call has been trialed with one or two teams and validated

[ ] Stakeholders for migration have been identified

[ ] All current alerting tools have been inventoried

[ ] Integration methods (webhooks, email ingest, etc.) for each tool are documented

[ ] Pain points and inefficiencies in the current on-call setup are documented

[ ] Migration phases (Discovery, Configuration, Testing) are clearly defined

[ ] Project owners and deadlines are assigned

[ ] Internal communication plan is shared across teams

[ ] Direct support channels (Slack, Microsoft Teams) are set up for Q&A

[ ] Datadog mobile app is recommended and set up by on-call users

