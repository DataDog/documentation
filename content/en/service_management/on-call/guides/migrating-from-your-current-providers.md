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
Migrating your existing on-call management solution to [Datadog On-Call][1] can significantly improve your operational efficiency, reduce costs, and bring monitoring and incident response under one roof. This guide outlines a structured approach to migrating smoothly and effectively. Typically, organizations begin this migration after successfully trialing Datadog On-Call with one or two teams, validating its capabilities and ensuring it aligns with their operational requirements.

By following this blueprint, you will understand the key stages involved in migration—including preparation, testing, and final deployment—and you'll have a clear idea of next steps. You'll also benefit from technical safeguards, rollback guidance, and validation checks to ensure a safe and reliable transition.

**Who Should Use It**

This guide is intended for stakeholders directly involved in the migration process, including DevOps engineers, Site Reliability Engineers (SREs), team leads, and anyone responsible for configuring, maintaining, or managing your on-call processes.

## 2. Assess Your Current On-Call Setup
Start by creating an inventory of all tools currently paging your on-call team. This includes:

- Monitoring platforms (such as Datadog, CloudWatch, Prometheus)
- Ticketing systems (like Jira, Zendesk)
- Custom alerting or workflow tools

For each tool, document the current integration method—whether it's through native integrations, webhooks, email ingest, or custom scripts.

This is also the right time to:
- Audit escalation paths and alert severity mappings
- Identify stale schedules or unused services
- Decide what to keep, modify, or leave behind

Consolidating key telemetry and alert routing into Datadog can reduce complexity and offer a unified view under a single pane of glass.

## 3. Plan the Migration
Break your migration plan into clear, manageable phases:

1. **Discovery**: Document current workflows, integrations, alerting rules, and team needs.
2. **Configuration**: Set up Datadog On-Call based on your existing architecture and desired improvements.
3. **Validation & Testing**: Confirm that alerts are routed correctly and escalations behave as expected.
4. **Cutover**: Transition to Datadog On-Call, ideally with a dual-routing window.
5. **Cleanup**: Retire legacy systems, validate post-migration stability, and update runbooks.

**Assign responsibilities clearly** for each stage and ensure timelines are communicated across stakeholders. Create a shared channel (e.g. in Slack or Microsoft Teams) for open collaboration, support, and real-time updates.

### Consider a Dual-Routing Period
Many organizations opt to route alerts to both their existing provider and Datadog On-Call during a trial window. This approach allows teams to:
- Compare alerting behavior in real time
- Validate escalations across systems
- Reduce risk during the switchover

Use Datadog's monitor bulk editor[3] to append new on-call handles while maintaining existing ones. Cleanly phase out the old system once validation is complete.

## 4. Prepare and Configure Datadog On-Call
Before configuration, spend time reviewing the ["Teams" concept][4] in Datadog On-Call. Teams serve as the core building blocks for:

- Schedules
- Escalation policies
- Notification rules
- Incident ownership

### Map Existing Structures Thoughtfully
Carefully map your current provider's assets—like escalation paths, rotations, overrides, and fallback contacts—to the Datadog model. This is an ideal moment to simplify or modernize policies that have accumulated complexity over time.

Datadog offers a [dedicated migration tool][5] for PagerDuty customers that selectively migrates relevant schedules and policies. Use this to accelerate your setup, reduce manual work, and clean up unused artifacts.

Be sure to:
- Review permissions and team access control
- Define fallback and notification preferences
- Configure override windows and on-call handoff expectations

## 5. Validate Before You Cut Over
Before decommissioning your legacy system, perform comprehensive testing:

### Validation Checklist

- [ ] **Route Alerts from Critical Monitors**: Identify your highest-severity monitors and trigger test alerts to confirm they are routed to the appropriate Datadog On-Call team. Check for timely delivery and metadata correctness.

- [ ] **Verify Escalation Chains**: Simulate unacknowledged alerts to ensure that escalations follow the intended sequence. Include both time-based and fallback escalations. Validate receipt across all intended responders.

- [ ] **Check Notification Channels**: Ensure team members receive alerts via all configured methods—email, SMS, push notification, and voice. Have recipients confirm delivery and clarity of content.

- [ ] **Test Overrides and Handoffs**: Set a temporary override for a team member and validate that alerts correctly route during that period. Repeat with a handoff between two shifts to catch edge cases.

- [ ] **Slack/ChatOps Visibility**: Trigger a test alert and confirm that it appears in your Slack or Teams incident channels with the correct tags, ownership, and links to acknowledge or resolve.

- [ ] **Simulate Synthetic Incidents**: Manually trigger synthetic alerts or use dummy monitors to run full end-to-end incident response drills—including acknowledgment, escalation, and resolution workflows.

- [ ] **Audit Schedule Coverage**: Cross-check team schedules to ensure there are no uncovered hours or gaps. Include holiday and weekend scenarios.

- [ ] **Compare with Legacy Provider**: If in dual-routing mode, validate that both systems receive the same alerts and follow parallel escalation behavior. Log and resolve any discrepancies before final cutover.

### Monitor the Migration
Use Datadog dashboards to:
- Track alert volume by provider
- Measure acknowledgment and escalation latency
- Surface incidents lacking team ownership

## 6. Cutover and Cleanup
Once validation is complete and all teams are onboarded, begin phasing out your legacy provider. Most teams choose to do this incrementally:

- Retire low-severity or infrequent alerting paths first
- Remove deprecated schedules and routing keys
- Archive or document old configurations as reference

## 7. Resources and Next Steps
You’ve now completed the core migration to Datadog On-Call. To ensure long-term success and sustainable operations, we recommend the following:

- **Operationalize Ownership**: Establish clear, ongoing ownership of Datadog On-Call within your team—this includes maintenance of on-call schedules, onboarding new responders, and responding to feature updates.

- **Review Post-Mortems**: Incorporate incidents that occurred during or after the migration into your incident review process. Identify alerting or escalation issues missed during testing.

- **Monitor On-Call Health**: Use On-Call Analytics[8] to track alert volume per responder, MTTA/MTTR, notification fatigue, and recurring escalations.

- **Stay Informed**: Subscribe to [Incident Response product updates][9] to keep up with new features, improvements, and deprecations.

- **Explore Further**: Deepen your familiarity with key capabilities by reviewing docs on [Incident Management][6], [Schedules][7], and Datadog's 800+s [Integrations][2].

- **Join the Community**: Exchange ideas, tips, and feedback with peers and Datadog staff in the [Datadog Slack Community][10].

- **Schedule a Retrospective**: 30–60 days post-migration, hold a migration retrospective. Capture lessons learned and update documentation, test plans, and internal onboarding materials accordingly.

[1]: https://app.datadoghq.com/on-call/
[2]: /integrations/
[3]: /monitors/notify/#bulk-editing-monitor--handles
[4]: /on_call/teams/
[5]: https://www.google.com
[6]: /service_management/incident_management
[7]: /service_management/on-call/schedules/
[8]: https://app.datadoghq.com/on-call/analytics
[0]: https://app.datadoghq.com/release-notes?category=Incident%20Response
[10]: https://chat.datadoghq.com/
