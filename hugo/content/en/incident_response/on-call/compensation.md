---
title: Compensation
further_reading:
- link: '/incident_response/on-call/schedules/'
  tag: 'Documentation'
  text: 'On-Call Schedules'
- link: '/incident_response/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

{{< callout url="#" btn_hidden="true" header="Join the Preview">}}
On-Call Compensation is in Preview. To request access, contact [Datadog Support](/help/).
{{< /callout >}}

On-Call Compensation calculates how much to pay responders for the time they spend on call. Define a compensation plan with your business hours and hourly rates, then generate a report that aggregates on-call shifts across one or more [schedules][1] and applies the plan's rates to each user's hours.

## Prerequisites

You need the **On-Call Admin** (`on_call_admin`) permission to access On-Call Compensation. Users without this permission don't see the **Compensation** tab.

## Compensation plans

A compensation plan defines when on-call time counts as business hours and how much to pay for on-call time outside of business hours. Plans are shared across your organization, so you can reuse the same plan for reports on different schedules.

### Create a compensation plan

1. In Datadog, go to [**On-Call** > **Compensation**][2] and select the **Compensation Plans** tab.
1. Click **Create Plan**.
1. Configure the plan:

   {{< img src="incident_response/on-call/compensation/create_plan.png" alt="The New Compensation Plan form, with business days set to Monday through Friday, the Europe/Paris time zone, business hours from 09:00 to 18:00, the EUR currency, and a rate outside business hours of 4 euros per hour." style="width:70%;" >}}

   | Field | Description |
   |-------|-------------|
   | **Plan name** | A name to identify the plan when you generate a report. |
   | **Business days** | The days of the week that count as business days. Defaults to Monday through Friday. |
   | **Timezone** | The time zone in which business hours and the report time window are evaluated. Defaults to your time zone. |
   | **Business hours start** and **Business hours end** | The start and end of business hours on business days. Defaults to 09:00–18:00. The end time must be after the start time. |
   | **Currency** | The currency for all rates in the plan: EUR, USD, GBP, CHF, or CAD. |
   | **Rate outside business hours** | The hourly rate for on-call time outside of business hours. Required. |
   | **Saturday rate** and **Sunday rate** | Optional hourly rates for on-call time on Saturdays and Sundays. If you leave a rate blank, that day uses the rate outside business hours. |

1. Click **Create Plan**.

You can also create a plan while you generate a report. Your report selections are kept while you create the plan.

### Edit or delete a compensation plan

On the **Compensation Plans** tab, click a plan to edit it, or hover over a plan and click the edit or delete icon. Deleting a plan cannot be undone.

## How compensation is calculated

Compensation is calculated for each hour a user is on call, based on the day and time in the plan's time zone:

| On-call time | Rate |
|--------------|------|
| Saturday, when the plan has a Saturday rate | Saturday rate |
| Sunday, when the plan has a Sunday rate | Sunday rate |
| Business day, inside business hours | Not paid |
| Business day, outside business hours | Rate outside business hours |
| Any day that is not a business day | Rate outside business hours |

The Saturday and Sunday rates apply to the entire day, even if you mark Saturday or Sunday as a business day.

If a user is on call for more than one selected schedule at the same time, the overlapping hours are counted once.

### Example

A plan has business days of Monday through Friday, business hours of 09:00–18:00, a rate outside business hours of €5, a Saturday rate of €10, and no Sunday rate. A user is on call from Friday 00:00 to Sunday 24:00:

| Day | On-call hours | Compensation |
|-----|---------------|--------------|
| Friday | 9 hours inside business hours, 15 hours outside business hours | 9 × €0 + 15 × €5 = €75 |
| Saturday | 24 hours | 24 × €10 = €240 |
| Sunday | 24 hours | 24 × €5 = €120 |
| **Total** | **72 hours** | **€435** |

## Generate a compensation report

1. In Datadog, go to [**On-Call** > **Compensation**][2] and select the **Reports** tab.
1. Under **Compensation plan**, select a plan, or click **Create new plan**. A summary of the plan's business hours and rates appears.
1. Under **Time window**, select the date range for the report. The time window uses the plan's time zone. Any shift that overlaps the time window is included. The time window can start up to 90 days in the past and cannot extend into the future.
1. Under **Scope**, select up to 20 schedules to include. Search for schedules by name, or filter by team or tag. You can include deleted schedules.
1. Click **Generate Report**.

{{< img src="incident_response/on-call/compensation/generate_report.png" alt="The Generate Compensation Report form, with a compensation plan selected, a time window from October 1 to October 31, and one schedule selected in the Scope section." style="width:100%;" >}}

## Review a compensation report

The report lists each user who was on call during the time window, with the following columns:

- **Business Hours**: On-call hours inside business hours, which are not paid
- **Outside Hours**: On-call hours outside business hours
- **Saturday Hours** and **Sunday Hours**: On-call hours on Saturdays and Sundays
- **Total Hours**: The sum of all on-call hours
- **Compensation**: The total amount to pay the user

{{< img src="incident_response/on-call/compensation/report.png" alt="An On-Call Compensation Report for October, listing three users with their business hours, outside hours, Saturday hours, Sunday hours, total hours, and compensation, followed by a totals row. One user's row is expanded to show their hours and compensation for each schedule." style="width:100%;" >}}

The last row shows the totals for all users. Click a user's row to see a breakdown of their hours and compensation for each schedule.

To change the plan's rates or business hours, click the plan name at the top of the report. After you save your changes, Datadog regenerates the report with the same time window and schedules. To keep the time window accurate, you can't change the plan's time zone from the report. To change it, edit the plan from the **Compensation Plans** tab.

To generate a report with different settings, click **Start Over**.

### Export a compensation report

Click **Export CSV** and select what to export:

- **Plan details**: The plan's name, currency, time zone, business hours, and rates
- **Report table**: The hours and compensation for each user
- **All**: The plan details, the report period and generation time, and the report table

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /incident_response/on-call/schedules/
[2]: https://app.datadoghq.com/on-call/compensation
