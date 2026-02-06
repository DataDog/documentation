---
title: Schedules
aliases:
- /service_management/on-call/schedules/
further_reading:
- link: '/service_management/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

In Datadog On-Call, schedules define the specific times when team members are available to respond to Pages. Schedules organize and manage the availability of team members across different timezones and shifts.

### Concepts

On-Call schedules are structured in layers, where each layer covers different parts of the week or specific responsibilities.

Consider the following example schedule:

{{< img src="incident_response/on-call/schedule.png" alt="A sample schedule, with multiple layers for JP, EU, and US business hours." style="width:100%;" >}}

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
   - **End time**: The date and time after which no more shifts are scheduled for this layer.
   - **Conditions**: Time conditions applied to each shift. This enables you to restrict the timeframe of on-call shifts. For example, Monday to Friday from 9:00 AM to 5:00 PM.
   - **Members**: The list of individuals who perform on-call duties. These individuals take shifts in the order in which you add them to the list.
1. Select **Create**.

### Reference a schedule within an escalation policy
To send a Page to the on-call person for a given schedule, reference the schedule within an escalation policy. When you create or edit an escalation policy, use the escalation step's **Notify** drop-down menu to search for and select your desired schedule. The escalation policy sends a Page to the person who is on-call when the Page is triggered.

### Overrides {#overrides}
Overrides are modifications made to the scheduled on-call shifts. They can accommodate changes such as temporary shift adjustments and holidays.

{{< img src="incident_response/on-call/schedule_override.png" alt="When editing a schedule, a shift is selected. A dialog appears with an Override button." style="width:100%;" >}}

To completely or partially override a shift, select the shift and click **Override**.

#### Request overrides in Slack or Microsoft Teams

If you are part of an On-Call rotation, and you know that you will be out of office during your shift, you can request an override in Slack or Microsoft Teams. Type `/dd override`, select the timeframe to be overridden, and add a description. This sends a request to the channel:

{{< img src="incident_response/on-call/schedule_override_request.png" alt="In Slack, a message from Datadog Staging reads: '@Daljeet has an override request. Schedule: [Primary] Payments & Transactions (payments-transactions). Start: Today, 1:00PM. End: Today, 3:00 PM. Duration: 2h. Note: Doctor's appointment. Will offer cookies for override.' A button labeled 'Take it' appears at the end of the message." style="width:80%;" >}}

Other channel members can select **Take it** to schedule themselves to override your shift.

### Export schedules

The Export Shifts feature allows you to integrate your on-call schedule into your preferred calendar app (for example, Google Calendar, Apple Calendar, or Outlook) using a `.webcal` link. Choose whether you want to sync **only your shifts** or **the entire schedule**.

---

##### 📆 Export *My* Shifts

1. Go to the [**On-Call** > **Schedules**][1] section in your account.
2. Select **Export My Shifts**. A personal `.webcal` link is generated automatically.
3. Click **Copy Link**.
4. Paste the link into your calendar app. For example:
    - **Google Calendar**: [Use a link to add a public calendar][3].
    - **Outlook**: [Subscribe to internet calendars][4].
    - **Apple Calendar**: [Subscribe on Mac or iPhone][5].

Your calendar is automatically updated if your on-call shifts change. To revoke access to a previously shared link, generate a new one. This disables the previous link.

---

##### 🌐 Export *Entire* Schedule

1. Go to the [**On-Call** > **Schedules**][1] section in your account.
2. Open the schedule you want to export.
3. Select **Export Schedule**. A `.webcal` link is generated for the full schedule, including all participants and shifts.
4. Click **Copy Link**.
5. Paste the link into your calendar app:
    - **Google Calendar**: [Use a link to add a public calendar.][3]
    - **Outlook**: [Subscribe to internet calendars.][4]
    - **Apple Calendar**: [Subscribe on Mac or iPhone.][5]

---

##### 🔔 Get Notified

Enable reminders for upcoming shifts in your calendar app. You can also configure custom shift notifications through SMS, push, or email in your [Datadog On-Call profile settings][6].


#### Troubleshooting schedule exports

If you encounter issues when exporting your On-Call schedule feeds to Google Calendar (such as "could not fetch URL) or Outlook ("Couldn't import calendar. Try again"), try the following fixes when initially subscribing to the calendar through URL:

- Change `webcal://` to `http://` or `https://` at the beginning of the URL. For example, change `webcal://<your_personal_link>` to `http://<your_personal_link>`.

### Managing user departures

When team members leave your organisation, they are not automatically removed from On-Call schedules:

- **Schedule membership**: Departed users remain in On-Call schedules until manually removed. You must update schedules to remove former team members and reassign their shifts.
- **Notifications**: If a user's Datadog account is deactivated, they no longer receive On-Call notifications (such as SMS, email, and push notifications), even if still assigned to scheduled shifts.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/on-call/schedules
[2]: https://app.datadoghq.com/on-call/schedules/create
[3]: https://support.google.com/calendar/answer/37100?hl=en&co=GENIE.Platform%3DDesktop
[4]: https://support.microsoft.com/en-us/office/import-or-subscribe-to-a-calendar-in-outlook-com-or-outlook-on-the-web-cff1429c-5af6-41ec-a5b4-74f2c278e98c
[5]: https://support.apple.com/en-us/102301
[6]: /incident_response/on-call/profile_settings/
