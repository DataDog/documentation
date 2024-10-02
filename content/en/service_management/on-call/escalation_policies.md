---
title: Escalation Policies
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

In Datadog On-Call, escalation policies ensure that Pages are promptly addressed. Pages are escalated through predefined steps, unless acknowledged within set timeframes.

Datadog creates a default escalation policy when you [onboard a Team to On-Call][1].

### Create a new escalation policy
{{< img src="service_management/oncall/escalation_policy.png" alt="A sample escalation policy." style="width:100%;" >}}

1. Go to [**On-Call** > **Escalation Policies**][2].
1. Select [**+ New Escalation Policy**][3].
1. Enter a **Name** for your escalation policy. For example, _Checkout Operations - Primary_.
1. Select the **Teams** that own this escalation policy.
1. Decide the order of who should receive this Page. For each escalation step after **Page is triggered**, select who to notify. Each step can notify individual users, entire teams, and/or whoever is currently on-call in a schedule.
1. Configure how many minutes to wait for one of the recipients to acknowledge the Page. If no one acknowledges the Page within the timeframe, the Page is escalated. In the example, if neither Daljeet nor the Checkout Operations - Primary on-call person acknowledges the Page within five minutes, the Page is then sent to the Checkout Operations - Secondary on-call person.
1. Configure how many times these steps should be repeated if no one acknowledges the Page.
1. Select whether Datadog should automatically update the Page status to **Resolved** after executing all rules and repeats.

### Escalation Policy Targets

Within each step of an Escalation Policy, you can notify individual users, entire teams, and/or whoever is currently on-call in a schedule.

#### Schedules
{{< img src="service_management/oncall/escalation_policy_notify_schedule.png" alt="A sample escalation policy." style="width:100%;" >}}

Escalation Policies can notify whoever is on-call according to a predefined schedule. This means that the system checks the schedule and notifies the person or group that is actively on-call during the incident.

- Routing alerts to on-call responders across different time zones to ensure 24/7 coverage.
- Handling tiered support, where different shifts handle different levels of urgency.
- Dynamic notifications for teams with rotating on-call responsibilities, ensuring the right person is always paged.

Should no one be on-call for a given schedule, the escalation step is gracefully skipped, ensuring that the process moves forward without delays or interruptions. The UI will indicate it as well:

{{< img src="service_management/oncall/escalation_policy_schedule_skipped.png" alt="A sample escalation policy." style="width:100%;" >}}

#### Users
{{< img src="service_management/oncall/escalation_policy_notify_user.png" alt="A sample escalation policy." style="width:100%;" >}}

You can directly include specific users in an Escalation Policy. This ensures that certain key individuals are always notified in the event of a Page. Common use cases for directly paging a user are:

- Notifying a senior engineer for high-severity incidents requiring specialized knowledge.
- Alerting a product manager or director in case of customer-facing incidents.
- Routing alerts to a backup responder if the primary contact is unavailable.

#### Teams
{{< img src="service_management/oncall/escalation_policy_notify_team.png" alt="A sample escalation policy." style="width:100%;" >}}

Common use cases for paging an entire Team are:

- Incidents affecting multiple systems where various team members may contribute to the solution.
- Escalating to a DevOps team for infrastructure-related incidents.
- Ensuring that all relevant members of an engineering or security team are alerted for critical outages.


### Limitations

- Maximum escalation steps: 10
- Maximum number of notify targets (individuals, teams or schedules) per escalation step: 10
- Minimum time before escalation to the next step: one minute

[1]: /service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/escalation-policies
[3]: https://app.datadoghq.com/on-call/escalation-policies/create
