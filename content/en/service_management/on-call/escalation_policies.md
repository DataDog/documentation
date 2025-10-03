---
title: Escalation Policies
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

In Datadog On-Call, escalation policies ensure that Pages are promptly addressed. Pages are escalated through predefined steps, unless acknowledged within set timeframes.

Datadog creates a default escalation policy when you [onboard a Team to On-Call][1].

## Create a new escalation policy
{{< img src="service_management/oncall/escalation_policy_2.png" alt="A sample escalation policy." style="width:100%;" >}}

1. Go to [**On-Call** > **Escalation Policies**][2].
1. Select [**+ New Escalation Policy**][3].
1. Enter a **Name** for your escalation policy. For example, _Payment's Escalation Policy_.
1. Select the **Teams** that own this escalation policy.
1. For each escalation step:
	   1. Decide who should be notified. You can specify individual users, teams, or whoever is on-call in a schedule.
	   1. Select one of the following notification methods: `Notify All`, `Round Robin`. See [Escalation policy notification types](#escalation-policy-step-notification-types) for details.
	   1. Specify how many minutes the recipient has to acknowledge the page before it is escalated to the next tier.
   For example, the following will notify the current on-call user when a page is triggered. It will escalate to Jane Doe if John does not acknowledge the page within 5 minutes.
   {{< img src="service_management/oncall/escalation_policy_2_steps_v2.png" alt="An escalation policy configured to notify the scheduled on-call user and escalate to Jane Doe if the page is not acknowledged after 5 minutes." style="width:100%;" >}}
1. Set how many times to repeat the steps if no one acknowledges the page.
1. Select whether Datadog should automatically update the page status to **Resolved** after executing all rules and repeats. (This only applies if no one acknowledges; once acknowledged, escalation stops and the page won't auto-escalate or auto-resolve.)

## Escalation policy step notification types
In each step of an escalation policy, you can keep the standard `Notify All` behavior or opt-in for `Round Robin`.
{{< img src="service_management/oncall/escalation_policy_notification_type.png" alt="Notification type selector in Escalation Policy creation" style="width:100%;" >}}

### Notify all (default)
Notify all targets of the step at the same time.

For example, if a step includes an individual user, a team with three members, and a schedule, then five people will be notified: the individual user, each of the three team members, and the on-call user from the schedule.

### Round robin
Automatically distribute pages across multiple targets (users, schedules, teams) in a rotating order to ensure fair load balancing.

For example, if you have a 50-person support team, you can break up the team into five 10-person schedules and set up the following policy to evenly distribute load:
- Page A → Support Schedule Group 1
- Page B → Support Schedule Group 2
- Page C → Support Schedule Group 3
- Page D → Support Schedule Group 4
- Page E → Support Schedule Group 5
- Page F → Support Schedule Group 1
- Page G → Support Schedule Group 2

#### Escalation behavior
In round robin mode, if a page isn't acknowledged in time, it doesn't move to the next person in the round robin rotation. Instead, it escalates to the next step in the policy.

If you want the page to go to the next target in the round robin, use only one round robin step in your escalation policy and configure it to repeat at least as many times as there are targets.

## Escalation policy step targets
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

You can include specific users in an escalation policy to ensure key individuals are always notified in the event of a Page. Common use cases for directly paging a user are:

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
- Maximum number of notify targets (individuals, teams, or schedules) per escalation step: 10
- Minimum time before escalation to the next step: one minute

[1]: /service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/escalation-policies
[3]: https://app.datadoghq.com/on-call/escalation-policies/create
