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
   - **End time**: The date and time after which no more shifts will be scheduled for this layer.
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

### Export schedules

The Export Shifts feature allows you to easily integrate your on-call schedule into your preferred calendar app (e.g., Google Calendar, Apple Calendar, or Outlook) using a `.webcal` link. Whether you’re part of multiple rotations, need to plan personal time around shifts, or want to increase team visibility, this feature ensures your on-call responsibilities are seamlessly accessible and always up-to-date.

#### How to export and sync you schedules
1. **Generate a `.webcal` link**
    - Go to the [**On-Call** > **Schedules**][1] section in your account.
    - Select **Export My Shifts**. A link will be auto-generated for you. Hit **Copy Link** to proceed.
2. Once copied, use the. `.webcal` link your calendar app. For example:
    - Google Calendar: [Follow these instructions from Google (under "Use a link to add a public calendar").][3]
    - Outlook: [Microsoft’s guide to subscribing to internet calendars.][4]
    - Apple Calendar: [Learn how to subscribe to calendars on Mac or iPhone.][5]

If your on-call schedule changes, updates will automatically reflect in the linked calendar, ensuring you always have the most accurate view of your responsibilities. If needed, you can revoke access to a previously shared link by generating a new one, which invalidates the old URL.

Most calendar apps support notifications—enable reminders to get alerts before your shifts start, but you can also configure shift reminders via SMS, push notification, and email in your [Datadog On-Call profile settings][6].

#### Troubleshooting schedule exports

If you experience issues when exporting your On-Call schedule feeds to Google Calendar (e.g. "could not fetch URL) or Outlook ("Couldn't import calendar. Try again"), please test the following fixes when initially subscribing to the calendar via URL:

- Change webcal:// to http:// or https:// at the beginning of the URL.
  - For example, in place of `webcal://<your_personal_link>`, use `http://<your_personal_link>`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/schedules
[2]: https://app.datadoghq.com/on-call/schedules/create
[3]: https://support.google.com/calendar/answer/37100?hl=en&co=GENIE.Platform%3DDesktop
[4]: https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-or-outlook-on-the-web-cff1429c-5af6-41ec-a5b4-74f2c278e98c
[5]: https://support.apple.com/en-us/102301
[6]: /service_management/on-call/profile_settings/
