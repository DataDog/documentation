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

### Create a new escalation policy
1. Go to [**On-Call** > **Escalation Policies**][2].
1. Select [**+ New Escalation Policy**][3].
1. Enter a **Name** for your escalation policy. For example, _Checkout Operations - Primary_.
1. Select the **Teams** that own this escalation policy.
1. Decide the order of who should receive this Page. For each escalation step after **Page is triggered**, select who to notify. Each step can notify individual users and/or schedules.
   
   For example: After this Page is triggered, it is sent to two recipients: Daljeet, and whoever is on-call for the Checkout Operations - Primary schedule.
   {{< img src="service_management/oncall/escalation_policy_step1.png" alt="An escalation policy, showing two steps after 'Page is triggered'. Each step has a 'Notify' input box and 'If the page is not acknowledged after N minutes, escalate.' The first step is configured to notify a user named Daljeet and a schedule named Checkout Operations - Primary, and escalates if the page is not acknowledged after 5 minutes. The second step is configured to notify a schedule named Checkout Operations - Secondary." style="width:100%;" >}}
1. Configure how many minutes to wait for one of the recipients to acknowledge the Page. If no one acknowledges the Page within the timeframe, the Page is escalated. In the example, if neither Daljeet nor the Checkout Operations - Primary on-call person acknowledges the Page within five minutes, the Page is then sent to the Checkout Operations - Secondary on-call person.
1. Configure how many times these steps should be repeated if no one acknowledges the Page.
1. Select whether Datadog should automatically update the Page status to **Resolved** after executing all rules and repeats.

### Limitations

- Maximum escalation steps: 10
- Maximum number of notify targets (individual or schedule) per escalation step: 10
- Minimum time before escalation to the next step: one minute

[1]: /service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/escalation-policies
[3]: https://app.datadoghq.com/on-call/escalation-policies/create