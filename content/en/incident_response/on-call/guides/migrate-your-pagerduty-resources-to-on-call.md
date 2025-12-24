---
title: Migrate PagerDuty resources to Datadog On-Call
aliases:
- /service_management/on-call/guides/migrate-your-pagerduty-resources-to-on-call/
further_reading:
- link: "/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
- link: "/integrations/pagerduty/"
  tag: "Documentation"
  text: "PagerDuty Integration"
---

## Overview 

Follow this migration workflow to rebuild your PagerDuty on-call structure in Datadog, team by team. It reuses your existing PagerDuty schedules and escalation policies as building blocks so you can review, tweak, or discard each resource before it goes live.

By rebuilding your on‑call setup from only current, relevant PagerDuty data, you avoid bringing legacy clutter into Datadog and start with a concise, maintainable configuration.

## Prerequisites

1. Configure the [PagerDuty integration][1] in Datadog.
1. Create a PagerDuty API key, if you don't have one already, that can read PagerDuty assets like schedules, escalation policies, and teams.
1. Confirm your user has `on_call_write` and `teams_manage` permissions.

## Migration steps

### Select team to migrate

1. Visit the [On-Call Teams list][2] and select **Add Team to On‑Call** > **Import team from PagerDuty**. Datadog loads all your teams from PagerDuty. 
1. Pick the team to migrate and choose **Next**. A preview pane shows the team's members and settings.

{{< img src="service_management/oncall/pagerduty_migration_import_team.png" alt="UI that lists PagerDuty teams and shows a preview of the selected team" style="width:95%;" >}}

### Map the team and its members

1. Select one of the following options:
   
   - **Map with another Datadog team**: Choose the appropriate Datadog team from the list.

   - **Create a new team**: Enter a team name when prompted. Datadog builds the team using the structure and members from your PagerDuty team.

   {{< img src="service_management/oncall/pagerduty_migration_map_users.png" alt="UI for mapping PagerDuty users to Datadog users or inviting new users" style="width:95%;" >}}

1. Handle unmapped users:
   
   Datadog matches users by email address. For unmapped users you can:
   - Invite them to Datadog (the UI sends an email invitation), or
   - Skip them if they no longer need access.

1. When the mapping looks correct, select **Import team**.

### Configure routing rules

Choose a template to define how alerts reach the team:

- **All alerts to escalation policy**: forward every alert to a designated escalation policy.
- **Business hours**: send alerts to the team only during specified hours and use chat channels as fallbacks.
- **Alert priority**: route alerts based on their priority and impact.
- **Start from scratch**: customize routing rules to fit your team's workflows.

{{< img src="service_management/oncall/pagerduty_migration_select_routing_rule_template.png" alt="UI with routing‑rule templates such as 'All alerts to escalation policy', 'Business hours', and 'Alert priority'" style="width:95%;" >}}

### Reuse escalation policies and schedules

When you edit routing rules, you can import existing PagerDuty escalation policies and schedules instead of recreating them.

{{< img src="service_management/oncall/pagerduty_migration_migrate_escalation_policies_and_schedules.png" alt="UI for selecting existing PagerDuty escalation policies and schedules" style="width:95%;" >}}

Datadog will automatically apply the imported configurations. You can change the policies and schedules at any time. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/integrations/pagerduty
[2]: https://app.datadoghq.com/on-call/teams
