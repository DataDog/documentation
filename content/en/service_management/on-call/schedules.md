---
title: Schedules
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

In Datadog On-Call, schedules define the specific times when team members are available to respond to Pages. Schedules organize and manage the availability of team members across different timezones and shifts.

### Concepts

On-Call schedules are structured in layers, where each layer covers different parts of the week or specific responsibilities.

Consider the following example schedule:

{{< img src="service_management/oncall/schedule.png" alt="A sample schedule, with multiple layers for JP, EU, and US business hours." style="width:100%;" >}}

There are four layers:
- **JP Business Hours**: A person named DM covers Japanese business hours, which begin (from a UTC perspective) each day. Repeats every day from Monday to Friday.
- **EU Business Hours**: Next, DB handles European business hours. Repeats every day from Monday to Friday.
- **US Business Hours**: Lastly, BS is on-call for US business hours, at the end (from a UTC perspective) of each day. Repeats every day from Monday to Friday.
- **Overrides**: Overrides are modifications made to the scheduled on-call shifts. They can accommodate changes such as temporary shift adjustments and holidays.

The **Final Schedule** is composed of all layers. Lower layers take precedence over higher layers.

### Create a schedule

1. Go to [**On-Call** > **Schedules**][1].
1. Select [**+ New Schedule**][2].
1. Provide a **Name** for your schedule, select a **Schedule Time Zone

[1]: https://app.datadoghq.com/on-call/schedules
[2]: https://app.datadoghq.com/on-call/schedules/create