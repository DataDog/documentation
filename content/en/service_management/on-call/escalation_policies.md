---
title: Escalation Policies
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">On-Call is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

In Datadog On-Call, escalation policies ensure that Pages are promptly addressed. Pages are escalated through predefined steps, unless acknowledged within set timeframes.

Datadog creates a default escalation policy when you [onboard a Team to On-Call][1].

## Create a new escalation policy
{{< img src="service_management/oncall/escalation_policy_2.png" alt="A sample escalation policy." style="width:100%;" >}}

1. Go to [**On-Call** > **Escalation Policies**][2].
1. Select [**+ New Escalation Policy**][3].
1. Enter a **Name** for your escalation policy. For example, _Payment's Escalation Policy_.
1. Select the **Teams** that own this escalation policy.
1. Now start building the policy out. Decide who or what should receive a Page when this escalation policy is invoked. For each escalation step after, select who to notify. Each step can notify individual users, entire teams, and/or whoever is on-call in a schedule.
   For example: After this Page is triggered, it is sent to whoever is currently on-call for the Primary schedule, in this cae John Doe.
   {{< img src="service_management/oncall/escalation_policy_2_steps.png" alt="An escalation policy, showing two steps after 'Page is triggered'. Each step has a 'Notify' input box and 'If the page is not acknowledged after N minutes, escalate.' The first step is configured to notify a schedule named Primary, and escalates if the page is not acknowledged after 5 minutes. The second step is configured to notify a user named Jane Doe." style="width:100%;" >}}
1. Configure how many minutes to wait for one of the recipients to acknowledge the Page. If no one acknowledges the Page within the time frame, the Page is escalated. In the example, if the Primary on-call person, John Doe, does not acknowledges the Page within five minutes, the Page is then sent to Jane Doe.
1. Configure how many times these steps should be repeated if no one acknowledges the Page.
1. Select whether Datadog should automatically update the Page status to **Resolved** after executing all rules and repeats.

## Escalation policy targets
In each step of an escalation policy, you can notify individual users, entire teams, or whoever is on-call in a schedule.

### Schedules
{{< img src="service_management/oncall/escalation_policy_notify_schedule.png" alt="A sample escalation policy step that notifies a schedule." style="width:100%;" >}}

Escalation policies can notify whoever is on-call according to a predefined schedule. The system checks the schedule and notifies the person or group that is actively on-call during the incident. Using schedules is beneficial for:

- Routing alerts to on-call responders across different time zones for 24/7 coverage.
- Handling tiered support, where different shifts handle different levels of urgency.
- Dynamic notifications for teams with rotating on-call responsibilities, ensuring the right person is always paged.

If no one is on-call for a given schedule, the escalation step gracefully skips and the process moves forward without delays or interruptions. The UI indicates a skipped escalation.

{{< img src="service_management/oncall/escalation_policy_schedule_skipped.png" alt="A sample escalation policy indicating a skipped escalation due to no one being on call." style="width:100%;" >}}

### Users
{{< img src="service_management/oncall/escalation_policy_notify_user.png" alt="A sample escalation policy that specifies a user in the escalation policy." style="width:100%;" >}}

You can directly include specific users in an escalation policy. This ensures that certain key individuals are always notified in the event of a Page. Common use cases for directly paging a user are:

- Notifying a senior engineer for high-severity incidents requiring specialized knowledge.
- Alerting a product manager or director in case of customer-facing incidents.
- Routing alerts to a backup responder if the primary contact is unavailable.

### Teams
{{< img src="service_management/oncall/escalation_policy_notify_team.png" alt="A sample escalation policy that notifies an entire Team." style="width:100%;" >}}

Common use cases for paging an entire Team are:

- Incidents affecting multiple systems where various team members may contribute to the solution.
- Escalating to a DevOps team for infrastructure-related incidents.
- Ensuring that all relevant members of an engineering or security team are alerted for critical outages.

## Limitations

- Maximum escalation steps: 10
- Maximum number of notify targets (individual or schedule) per escalation step: 10
- Minimum time before escalation to the next step: one minute

[1]: /service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/escalation-policies
[3]: https://app.datadoghq.com/on-call/escalation-policies/create
