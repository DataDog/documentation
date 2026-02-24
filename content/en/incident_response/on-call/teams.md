---
title: Onboard a Team
aliases:
- /service_management/on-call/teams/
further_reading:
- link: '/incident_response/on-call/'
  tag: 'Documentation'
  text: 'Datadog On-Call'
---

Teams are the central organizational unit of [Datadog On-Call][2]. Pages are sent to a Team, and the Team's schedules or escalation policies route the Page to an appropriate Team member.

On-Call Teams are an extension of [Datadog Teams][1]. On-Call Teams are listed on the [Teams][3] overview page, alongside Teams that do not perform on-call duties. Datadog recommends that you use existing Teams for your On-Call configuration whenever possible, as this increases your On-Call Team's discoverability.

### Onboard a new or existing Team

1. Go to [**On-Call** > **Teams**][4] and select **Set Up Team**.
1. Create a new Team, select an existing Datadog Team, or import team configurations from PagerDuty.
  {{< tabs >}}
  {{% tab "New Team" %}}
  - **Team Name**: Enter a name for your Team. Datadog recommends that you do not use acronyms here, unless the acronym is already widely used in your organization.
  - **Handle**: The handle used to page the Team throughout the Datadog platform. You can change your Team's handle at any time.
  - **Members**: Add your Team's members, including those who do not perform on-call duties.
  - **Description**: Provide a description of your Team's responsibilities. For example: _Our team is responsible for [primary responsibility]. We ensure [key objectives or activities], operating [operational hours or conditions]._
  {{% /tab %}}
  {{% tab "Existing Team" %}}
  Select an existing Datadog Team from the drop-down menu.
  {{% /tab %}}
  {{< /tabs >}}
1. Add a default escalation policy. 
   {{< img src="service_management/oncall/escalation_policy_blank.png" alt="Setup view of a new escalation policy. Notifies three proposed schedules." style="width:80%;" >}}
   - Datadog automatically proposes _Interrupt Handler_, _Primary_, and _Secondary_ schedules for your Team. You can define these schedules in the next step. 
   - You can also notify an existing schedule owned by another Team. 

   See [Escalation Policies][5] for more details.
1. Define the schedules created in the previous step. 
   {{< img src="service_management/oncall/schedule_blank.png" alt="Setup view of a new schedule." style="width:80%;" >}}
   - **Schedule Time Zone**: Select the time zone you want to operate your schedule in. Other settings, such as handoff times, adhere to this selection.
   - **Schedule Rotations**: Add your desired rotations.
   See [Schedules][6] for more details.

### Next steps

Configure your monitors, incidents, or other resources to send Pages to your On-Call Team. See [Send a Page][7].

Ensure that your On-Call Team members have set up their [Profile Settings][8].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/teams/
[2]: /incident_response/on-call/
[3]: https://app.datadoghq.com/organization-settings/teams
[4]: https://app.datadoghq.com/on-call/
[5]: /incident_response/on-call/escalation_policies
[6]: /incident_response/on-call/schedules
[7]: /incident_response/on-call/triggering_pages/
[8]: /incident_response/on-call/profile_settings