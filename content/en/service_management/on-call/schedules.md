---
title: Schedules
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">On-Call is not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

In Datadog On-Call, schedules define the specific times when team members are available to respond to Pages. Schedules organize and manage the availability of team members across different timezones and shifts.

### Concepts

On-Call schedules are structured in layers, where each layer covers different parts of the week or specific responsibilities.

Consider the following example schedule:

{{< img src="service_management/oncall/schedule.png" alt="A sample schedule, with multiple layers for JP, EU, and US business hours." style="width:100%;" >}}

There are four layers:
- **JP Business Hours**: A person named DM covers Japanese business hours, which begin (from a UTC perspective) each day. Repeats every day from Monday to Friday.
- **EU Business Hours**: Next, DB handles European business hours. Repeats every day from Monday to Friday.
- **US Business Hours**: Lastly, BS is on-call for US business hours, at the end (from a UTC perspective) of each day. Repeats every day from Monday to Friday.
- **Overrides**: Overrides accomodate schedule changes, such as temporary shift adjustments and holidays. See [Overrides](#overrides).

The **Final Schedule** is composed of all layers. Lower layers take precedence over higher layers.

### Create a schedule

1. Go to [**On-Call** > **Schedules**][1].
1. Select [**+ New Schedule**][2].
1. Provide a **Name** for your schedule, select a **Schedule Time Zone** to use, and select the **Teams** that own this schedule.
1. Add layers:
   - **Starts**: The date and time when the schedule becomes effective. Shifts do not appear before this date and time.
   - **Shift length**: The length of each shift; effectively, when the schedule repeats. Options include:
      - _One Day_ (24 hours)
      - _One Week_ (168 hours)
      - _Custom_
   - **Handoff Time**: The date and time when shifts are swapped to the next person.
   - **Conditions**: Time conditions applied to each shift. This enables you to restrict the timeframe of on-call shifts. For example, Monday to Friday from 9:00 AM to 5:00 PM.
   - **Members**: The list of individuals who perform on-call duties. These individuals take shifts in the order in which you add them to the list.
1. Select **Create**.

### Reference a schedule within an escalation policy
To send a Page to the on-call person for a given schedule, reference the schedule within an escalation policy. When you create or edit an escalation policy, use the escalation step's **Notify** drop-down menu to search for and select your desired schedule. The escalation policy sends a Page to the person who is on-call when the Page is triggered.

### Overrides {#overrides}
Overrides are modifications made to the scheduled on-call shifts. They can accommodate changes such as temporary shift adjustments and holidays.

{{< img src="service_management/oncall/schedule_override.png" alt="When editing a schedule, a shift is selected. A dialog appears with an Override button." style="width:100%;" >}}

To completely or partially override a shift, select the shift and click **Override**.

#### Request overrides in Slack or Microsoft Teams

If you are part of an On-Call rotation, and you know that you will be out of office during your shift, you can request an override in Slack or Microsoft Teams. Type `/dd override`, select the timeframe to be overridden, and add a description. This sends a request to the channel:

{{< img src="service_management/oncall/schedule_override_request.png" alt="In Slack, a message from Datadog Staging reads: '@Daljeet has an override request. Schedule: [Primary] Payments & Transactions (payments-transactions). Start: Today, 1:00PM. End: Today, 3:00 PM. Duration: 2h. Note: Doctor's appointment. Will offer cookies for override.' A button labeled 'Take it' appears at the end of the message." style="width:80%;" >}}

Other channel members can select **Take it** to schedule themselves to override your shift.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/schedules
[2]: https://app.datadoghq.com/on-call/schedules/create