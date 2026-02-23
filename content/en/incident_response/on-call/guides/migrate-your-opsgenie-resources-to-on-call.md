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

Follow this migration workflow to rebuild your OpsGenie on-call structure in Datadog, team by team. Datadog uses your existing OpsGenie schedules and escalation policies as building blocks, and you can review, map, and customize each resource before it goes live.

By importing only current, relevant OpsGenie data, you avoid bringing outdated or unused configurations into Datadog and start with a concise, maintainable setup.

**Note**: This is not a bulk migration tool. You select and map individual teams, escalation policies, schedules, and users through a wizard-style workflow.

## Prerequisites

1. Configure the [OpsGenie integration][1] in Datadog and connect a valid account.
1. Confirm that your Datadog user account has `on_call_write` and `teams_manage` permissions.

## What gets migrated

The following table shows how OpsGenie resources map to Datadog On-Call resources:

| OpsGenie resource | Datadog resource | Notes |
|---|---|---|
| Teams | Teams | Teams are matched by name, or you can map them manually. |
| Users | Users | Users are matched automatically by email address. You can override individual matches manually. |
| Escalation Policies | Escalation Policies | Rules are converted to steps, and delays are converted from OpsGenie intervals to seconds. |
| Schedules | Schedules | Rotations become layers in reversed order. Time restrictions and time zones are preserved. |
| Rotation participants (user-type) | Schedule layer members | Only user-type participants are migrated. |
| Time restrictions | Layer restrictions | Both daily and weekday-and-time-of-day restriction types are migrated. |
| Repeat count | Policy retries | Repeat count maps directly to policy retries with no conversion. |
| Close alert after all | Resolve page on policy end | Close alert after all maps directly to resolve page on policy end with no conversion. |

## Migration steps

The migration follows a six-step wizard-style process in Datadog. Complete all steps in order within the same migration wizard.

### Step 1: Select team to migrate

1. Go to the [On-Call Teams list][2] and select **Add Team to On-Call** > **Import team from OpsGenie**.
1. If you have multiple regions configured, select your OpsGenie account's region from the dropdown. 
1. Datadog loads all your OpsGenie teams in a searchable, paginated list. Select the team to migrate, then select **Next**. A preview pane shows the team's members and settings.

{{< img src="service_management/oncall/import-opsgenie-team.png" alt="OpsGenie team list with a preview pane showing the selected team's members and settings" style="width:95%;" >}}

**Note**: If a team was previously imported, Datadog indicates this.

### Step 2: Map the team

1. Choose one of the following mapping options:

   - Map to the Datadog team with the same name.
   - Map to a different Datadog team that you select.
   - Create a new team. Enter a team name to create a Datadog team based on the structure and members of the OpsGenie team.

   {{< img src="service_management/oncall/map-opsgenie-team-to-datadog-team.png" alt="Mapping options for assigning an OpsGenie team to an existing or new Datadog team" style="width:95%;" >}}

1. When the mapping is correct, select **Next**.

### Step 3: Select escalation policy to migrate

1. Browse your OpsGenie escalation policies. You can filter policies by team.
1. Select an escalation policy to import. The wizard displays the full policy details, including rules, recipients, and schedules.

{{< img src="service_management/oncall/import-opsgenie-escalation-policy.png" alt="OpsGenie escalation policy list with policy details shown for the selected policy" style="width:95%;" >}}

### Step 4: Map users

Datadog automatically matches OpsGenie users to Datadog users by email address. For unmapped users, take one of the following actions:

- Map them to an existing Datadog user
- Invite them to Datadog (the migration wizard sends an email invitation)
- Exclude them if they no longer need access

**Note**: You cannot save the escalation policy until all users are mapped, invited, or explicitly excluded.

### Step 5: Review migrated schedules

If the escalation policy references OpsGenie schedules, Datadog automatically migrates them to Datadog On-Call. The migration includes:

- **Rotations**: Converted to Datadog schedule layers in reverse order.
- **Participants**: Automatically matched to Datadog users.
- **Time restrictions**: `time-of-day` and `weekday-and-time-of-day` restrictions are preserved.
- **Time zones**: Time zone configuration is preserved.

### Step 6: Review and save

1. Review the migrated escalation policy. You can modify the following fields:
   - Escalation step delays
   - Notification targets (users, teams, and schedules)
   - Retry behavior
   - Auto-resolution settings

1. When all fields are complete and all users, teams, and schedules are mapped, select **Save**. Datadog creates the escalation policy under your On-Call team.

## Known limitations

- **Escalation conditions**: Only `if-not-acked` escalation conditions are supported. The `if-not-closed` condition is not supported and is not migrated.
- **Rotation participants**: Only user-type rotation participants are supported. Team-type and escalation-type participants are not migrated.

## Validation and testing

Before relying on migrated resources for production incidents:

- **Verify schedule coverage**: Check that all migrated schedules have proper coverage with no gaps. Go to [On-Call Schedules][3] and review each schedule's timeline.
- **Test escalation policies**: Use the [Manual Page][4] feature to send a test page and verify that escalation policies escalate correctly and notify the right people.
- **Check user mappings**: Verify that all users are correctly mapped and can receive notifications through their preferred channels (email, SMS, push, voice).
- **Review team ownership**: Confirm that each escalation policy is owned by the correct Datadog team.
- **Validate time restrictions**: If your schedules use time restrictions, verify that they apply correctly by checking on-call coverage during restricted and unrestricted periods.

## Troubleshooting

### OpsGenie integration not appearing

If the OpsGenie import option does not appear during team setup:

1. Verify that the [OpsGenie integration][1] is configured in Datadog.
1. Verify that at least one account is configured in the integration tile.
1. Confirm you have the required `on_call_write` and `teams_manage` permissions.

### Users not matching automatically

If OpsGenie users are not automatically matched to Datadog users:

1. Verify that email addresses match exactly between OpsGenie and Datadog.
1. Confirm that the Datadog users are active.
1. If automatic matching still fails, add users manually or invite them to Datadog.

### Schedule rotations not matching

If migrated schedule rotations do not match your OpsGenie schedules:

1. Check that all rotation participants are user-type (not team-type or escalation-type).
1. Verify that time zones are correctly configured in both OpsGenie and Datadog.
1. Review time restrictions to confirm they were migrated correctly.

### Escalation policy not saving

If the escalation policy fails to save:

1. Confirm all users are mapped or excluded (no pending invites).
1. Verify all referenced schedules were created successfully.
1. Check that all escalation step delays meet the minimum requirement (one minute).
1. Confirm you have the `on_call_write` and `teams_manage` permissions.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/opsgenie
[2]: https://app.datadoghq.com/on-call/teams
[3]: https://app.datadoghq.com/on-call/schedules
[4]: https://app.datadoghq.com/on-call/manual-page
