---
title: Migrate OpsGenie resources to Datadog On-Call
aliases:
- /service_management/on-call/guides/migrate-your-opsgenie-resources-to-on-call/
further_reading:
- link: "/incident_response/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
- link: "/integrations/opsgenie/"
  tag: "Documentation"
  text: "OpsGenie Integration"
---

## Overview

Follow this migration workflow to rebuild your OpsGenie on-call structure in Datadog, team by team. This interactive, human-in-the-loop migration tool reuses your existing OpsGenie schedules and escalation policies as building blocks, allowing you to review, map, and customize each resource before it goes live.

By selectively importing only current, relevant OpsGenie data, you avoid bringing legacy clutter into Datadog and start with a concise, maintainable configuration.

**Note**: This is not a bulk migration tool. You select and map individual teams, escalation policies, schedules, and users through a wizard-style UI workflow.

## Prerequisites

1. Configure the [OpsGenie integration][1] in Datadog with a valid account connected.
1. Confirm your user has `on_call_write` and `teams_manage` permissions.

## Migration steps

The migration follows a six-step wizard-style process in the Datadog web UI.

### Select team to migrate

1. Visit the [On-Call Teams list][2] and select **Add Team to On-Call** > **Import team from OpsGenie**.
1. Select your OpsGenie account's region from the dropdown (if you have multiple regions configured).
1. Datadog loads all teams from OpsGenie with search and pagination support.
1. Pick the team to migrate and choose **Next**. A preview pane shows the team's members and settings.

{{< img src="service_management/oncall/import-opsgenie-team.png" alt="UI that lists OpsGenie teams and shows a preview of the selected team" style="width:95%;" >}}

**Note**: If a team was previously imported, the UI indicates this.

### Map the team

1. The system checks if a Datadog team with the same name already exists. Select one of the following options:

   - **Use the matching team**: Map to the existing Datadog team with the same handle.
   - **Map with another Datadog team**: Choose a different Datadog team from the list.
   - **Create a new team**: Enter a team name when prompted. Datadog builds the team using the structure and members from your OpsGenie team.

{{< img src="service_management/oncall/map-opsgenie-team-to-datadog-team.png" alt="UI for mapping OpsGenie team to an existing or new Datadog team" style="width:95%;" >}}

1. When the mapping looks correct, select **Next**.

### Select escalation policy to migrate

1. Within the migration modal, browse your OpsGenie escalation policies. You can filter policies by team.
1. Select an escalation policy to import. The system fetches the full policy details (rules, recipients, schedules) from OpsGenie.
1. The migration wizard transforms the OpsGenie escalation policy model into Datadog On-Call's escalation policy model.

{{< img src="service_management/oncall/import-opsgenie-escalation-policy.png" alt="UI for selecting an OpsGenie escalation policy to migrate" style="width:95%;" >}}

### Map users

Datadog automatically attempts to match OpsGenie users to Datadog users by email address (auto-mapping). For unmapped users:

1. Review the list of unmapped users.
1. For each unmapped user, you can:
   - Manually map them to an existing Datadog user
   - Invite them to Datadog (the migration wizard sends an email invitation)
   - Mark them as excluded if they no longer need access

**Note**: You cannot proceed to save the escalation policy until all users are either mapped to Datadog users or explicitly excluded.

### Migrate referenced schedules

If the escalation policy references OpsGenie schedules, those schedules are automatically migrated and created in Datadog On-Call. The migration includes:

- **Rotations**: Converted to Datadog schedule layers (in reversed order)
- **Participants**: User participants are mapped through the hint system
- **Time restrictions**: Both `time-of-day` and `weekday-and-time-of-day` restrictions are preserved
- **Timezones**: Timezone configuration is preserved

**Note**: Only user-type rotation participants are supported. Team-type and escalation-type participants are silently dropped.

### Review and save

1. Review the migrated escalation policy in an editable form. You can modify:
   - Escalation step delays
   - Notification targets (users, teams, schedules)
   - Retry behavior
   - Auto-resolution settings

1. The escalation policy form validates that all required fields are complete and all users/teams/schedules are properly mapped.

1. When ready, select **Save**. The escalation policy is created under your Datadog On-Call team.

## What gets migrated

The following table shows how OpsGenie resources map to Datadog On-Call resources:

| OpsGenie Resource | Datadog Resource | Notes |
|---|---|---|
| Teams | Teams | Name-based matching or manual mapping |
| Users | Users | Email-based auto-mapping with manual override |
| Escalation Policies | Escalation Policies | Rules are converted to steps; delays are converted from OpsGenie intervals to seconds |
| Schedules | Schedules | Rotations become layers (reversed order); time restrictions and timezones are preserved |
| Rotation participants (user-type) | Schedule layer members | Only user-type participants are supported |
| Time restrictions | Layer restrictions | Both daily and weekday-and-time-of-day types are supported |
| Repeat count | Policy retries | Direct mapping |
| Close alert after all | Resolve page on policy end | Direct mapping |


## Known limitations

- **Escalation conditions**: Only `if-not-acked` escalation conditions are supported. The `if-not-closed` condition is not supported and is silently dropped.
- **Rotation participants**: Only user-type rotation participants are supported. Team-type and escalation-type participants are silently dropped.
- **No bulk migration**: Each team, escalation policy, and schedule must be migrated individually through the UI wizard.

## Validation and testing

Before relying on migrated resources for production incidents:

1. **Verify schedule coverage**: Check that all migrated schedules have proper coverage with no gaps. Navigate to [On-Call Schedules][3] and review each schedule's timeline.

1. **Test escalation policies**: Trigger test pages to verify that escalation policies escalate correctly and notify the right people. You can use the [Manual Page][4] feature to send test pages.

1. **Check user mappings**: Ensure all users are correctly mapped and can receive notifications through their preferred channels (email, SMS, push, voice).

1. **Review team ownership**: Confirm that each escalation policy is owned by the correct Datadog team.

1. **Validate time restrictions**: If your schedules use time restrictions, verify that they apply correctly by checking on-call coverage during restricted and unrestricted periods.

## Troubleshooting

### OpsGenie integration not appearing

If the OpsGenie import option does not appear in the team onboarding flow:

1. Verify the [OpsGenie integration][1] is configured in Datadog.
1. Verify that you have at least one Account configured within the integration tile (scroll to the bottom).
1. Ensure you have the required `on_call_write` and `teams_manage` permissions.

### Users not auto-mapping

If OpsGenie users are not automatically mapping to Datadog users:

1. Verify the email addresses in OpsGenie match the email addresses in Datadog exactly.
1. Ensure the Datadog users are active and not deactivated.
1. If auto-mapping fails, manually map users or invite them to Datadog.

### Schedule rotations not matching

If migrated schedule rotations do not match your OpsGenie schedules:

1. Check that all rotation participants are user-type (not team-type or escalation-type).
1. Verify timezones are correctly configured in both OpsGenie and Datadog.
1. Review time restrictions to ensure they were migrated correctly.

### Escalation policy not saving

If the escalation policy fails to save:

1. Ensure all users are mapped or excluded (no pending invites).
1. Verify all referenced schedules were created successfully.
1. Check that all escalation step delays meet the minimum requirement (one minute).
1. Confirm you have the `on_call_write` permission.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/opsgenie
[2]: https://app.datadoghq.com/on-call/teams
[3]: https://app.datadoghq.com/on-call/schedules
[4]: https://app.datadoghq.com/on-call/manual-page
