---
title: Migrating from your current on-call provider
aliases:
- /service_management/on-call/guides/migrating-from-your-current-providers/
further_reading:
- link: "/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call"
- link: "/incident_response/incident_management/"
  tag: "Documentation"
  text: "Incident Management"
---

Migrating from your current on-call provider to [Datadog On-Call][1] allows teams to centralize monitoring and incident response, reduce alerting complexity, and unify monitoring and incident response. This guide provides a phased approach to help you plan, test, and complete a successful migration.

Many organizations begin by piloting Datadog On-Call with a small number of teams to validate functionality and assess operational fit. Building on that foundation, this guide walks you through the key steps for moving from evaluation to full production adoption.

You'll learn how to:

- Inventory and evaluate your current on-call setup
- Configure Datadog On-Call based on your team structure and escalation paths
- Validate alert routing and escalation workflows
- Cut over from your legacy provider safely
- Monitor, maintain, and scale your new on-call processes

The guide also includes validation checklists, rollback strategies, and safeguards to ensure a reliable and low-risk transition.

**Who should use this guide**

This guide is intended for engineers and stakeholders involved in on-call migration, including Site Reliability Engineers (SREs), DevOps engineers, team leads, and others responsible for configuring or managing incident response workflows.

## Inventory and map your current setup

Start by creating an inventory of all tools currently paging your on-call team. This includes:

- Monitoring platforms (such as Datadog, CloudWatch, and Prometheus)
- Ticketing systems (such as Jira and Zendesk)
- Custom alerting or workflow tools

For each tool, document the current integration method, whether it's through native integrations, webhooks, email ingestion, or custom scripts.

As you assess your current on-call setup, begin identifying how its components (such as schedules, escalation paths, overrides, and responder groups) will translate into Datadog On-Call's configuration model. This is also a good opportunity to simplify complex or outdated escalation logic and standardize policies across teams. Avoid migrating unused or legacy configurations unless there is a clear operational need to retain them.

To support a smooth configuration phase, be sure to capture:

- Team access controls and permissions
- Fallback responder assignments and notification preferences
- Override windows and handoff expectations

A unified alerting model in Datadog can help reduce operational overhead and improve visibility, but only if your inputs are clearly defined and thoughtfully mapped from the start.

## Design your migration strategy

A successful migration depends on a clear, phased plan that aligns stakeholders, reduces risk, and keeps communication open. Break your migration into manageable stages:

1. **Discovery**: Document current workflows, integrations, alerting rules, and team requirements.
2. **Configuration**: Set up Datadog On-Call based on your existing setup and desired improvements.
3. **Validation and testing**: Confirm that alerts route correctly and that escalation logic behaves as expected.
4. **Cutover**: Transition alerting responsibility to Datadog On-Call, typically using a dual-routing window.
5. **Cleanup**: Decommission legacy systems, verify stability, and update documentation and runbooks.

Assign clear owners to each phase and communicate timelines early. Use a shared channel (such as Slack or Microsoft Teams) to coordinate tasks, share updates, and surface blockers in real time.

## Configure Datadog On-Call

Before you start configuring Datadog On-Call, review the concept of [Teams][4]. Teams serve as the foundation for your on-call structure and are used to define:

- Schedules
- Escalation policies
- Notification rules
- Incident ownership

After reviewing the team model and mapping your existing assets, you're ready to configure Datadog On-Call to reflect your desired structure.

<div class="alert alert-info">If you're migrating from PagerDuty, Datadog provides a <a href="/incident_response/on-call/guides/migrate-your-pagerduty-resources-to-on-call">dedicated migration tool</a> that can help you selectively import schedules and escalation policies. Use it during setup to reduce manual effort and avoid migrating unused configurations.</div>

During setup, be sure to:

- Review team permissions and access control
- Define fallback responders and notification preferences
- Configure override windows and on-call handoff expectations

Thoughtful configuration ensures a smooth cutover and helps teams respond effectively from day one.

## Validate and monitor the migration

Before decommissioning your legacy system, perform comprehensive testing to confirm that Datadog On-Call is routing, escalating, and notifying correctly across all teams and alert scenarios.

### Validation checklist

- **Route alerts from critical monitors**: Identify your highest-severity monitors and trigger test alerts to confirm they are routed to the appropriate Datadog On-Call team. Check for timely delivery and metadata correctness.
- **Verify escalation chains**: Simulate unacknowledged alerts to ensure escalations follow the intended sequence. Include both time-based and fallback escalations. Validate receipt across all intended responders.
- **Check notification channels**: Ensure team members receive alerts through all configured methods, including email, SMS, push notifications, and voice. Ask recipients to confirm delivery and clarity of the content.
- **Test overrides and handoffs**: Set a temporary override for a team member and validate that alerts correctly route during that period. Repeat with a handoff between shifts to catch edge cases.
- **Validate Slack or Teams visibility**: Trigger a test alert and confirm that it appears in the correct Slack or Teams incident channels with accurate tags, ownership, and links to acknowledge or resolve.
- **Simulate synthetic incidents**: Manually trigger synthetic alerts or use dummy monitors to test full incident workflows, including acknowledgment, escalation, and resolution.
- **Audit schedule coverage**: Cross-check team schedules to ensure there are no uncovered hours, including holidays and weekends.
- **Compare with legacy provider**: If using dual-routing, verify that both systems receive alerts and follow similar escalation behavior. Log and resolve any discrepancies before cutover.

### Dual-routing in practice

Many organizations choose to run dual-routing during validation, sending alerts to both their legacy provider and Datadog On-Call in parallel. This allows teams to:

- Compare alert routing and escalation behavior in real time
- Confirm no gaps exist between systems
- Reduce risk during the switchover period

Use Datadog's [monitor bulk editor][3] to add Datadog On-Call handles alongside existing destinations. After you've validated performance and coverage, you can remove legacy alert routes and finalize the cutover.

### Monitor the migration

Use Datadog dashboards to observe migration performance in real time. Watch for:

- Alert volume by provider
- Acknowledgment and escalation latency
- Incidents lacking team ownership

These signals help validate readiness, detect misconfigurations, and surface issues early before the full cutover.

## Cut over and retire legacy systems

After validation is complete and all teams are actively using Datadog On-Call, begin phasing out your legacy provider. To minimize disruption, most teams approach this incrementally:

- Retire low-severity or infrequent alerting paths first
- Remove deprecated schedules, escalation policies, and routing keys
- Archive legacy configurations or export them as documentation for reference

Double-check that all monitors point exclusively to Datadog On-Call and that legacy integrations are no longer in use. If your dual-routing period revealed any inconsistencies or gaps, address those before finalizing the cutover.

Completing this step ensures a clean transition and eliminates the risk of confusion or missed alerts during incident response.

## Sustain and scale your on-call practice

With your core migration to Datadog On-Call complete, shift focus to long-term operations and continuous improvement. Use the following practices to keep your on-call processes healthy, maintain team readiness, and evolve your setup as your needs grow.

- **Establish ongoing ownership**: Assign clear ownership for Datadog On-Call within your team. This includes maintaining schedules, onboarding new responders, and adapting to feature changes over time.
- **Incorporate post-mortems**: Review incidents that occurred during or after the migration to identify any missed escalation or alerting issues. Feed those lessons back into your testing and runbook documentation.
- **Track on-call health**: Use [On-Call Analytics][8] to monitor alert volume per responder, MTTA/MTTR trends, notification fatigue, and recurring escalations.
- **Stay current**: Subscribe to [Incident Response product updates][9] to keep up with new features, improvements, and deprecations.
- **Deepen your product knowledge**: Explore Datadog's documentation on [Incident Management][6], [Schedules][7], and [Integrations][2] to expand your use of the platform.
- **Join the community**: Connect with peers and Datadog engineers in the [Datadog Slack Community][10] to share best practices, get advice, and give feedback.
- **Schedule a retrospective**: Within 30-60 days post-migration, hold a retrospective to capture lessons learned and update your documentation, internal guides, and test plans.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/
[2]: /integrations/
[3]: /monitors/notify/#bulk-editing-monitor--handles
[4]: /incident_response/on-call/teams/
[6]: /incident_response/incident_management
[7]: /incident_response/on-call/schedules/
[8]: https://app.datadoghq.com/on-call/analytics
[9]: https://app.datadoghq.com/release-notes?category=Incident%20Response
[10]: https://chat.datadoghq.com/
