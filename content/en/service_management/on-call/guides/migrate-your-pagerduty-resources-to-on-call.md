---
title: Migrate your PagerDuty resources to Datadog On-Call
further_reading:
- link: "https://docs.datadoghq.com/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call Documentation"
---

Here's a step-by-step guide to migrate your PagerDuty resources to Datadog On-Call. This migration tool isn't a "one-button" process; instead, it allows you to gradually build your Datadog On-Call teams step by step. By using existing resources from PagerDuty, such as schedules and escalation policies, as building blocks, users can tailor the migration to fit their needs and structure their on-call setup in Datadog more precisely.

The reason for this approach is to help you start with a clean slate in Datadog On-Call, rather than bringing over outdated or unnecessary configurations that may have accumulated in PagerDuty over the years. By rebuilding your teams step by step using only the essential resources, you can create a more streamlined and efficient on-call setup, free from legacy clutter.

## Prerequisites
Before starting the migration, make sure you have the [PagerDuty integration][1] configured in Datadog. This includes having a valid API key that can read all the necessary assets from PagerDuty, such as schedules, escalation policies, and on-call teams. Without this setup, you won't be able to pull the required resources for migration.

Also, make sure your user has the `on_call_write` and the `teams_manage` permissions.

## Onboard a team
Once all the prerequisites are met, the UI will display all your teams from PagerDuty, allowing you to select and migrate them to Datadog On-Call.

### Select team to migrate
To begin, select a team from the list displayed on the left side of the screen. Once selected, the right side will show a preview of your current PagerDuty team, including its members and settings. You can easily find a specific team by using the search bar at the top of the list to filter through your teams. Hit "Next" once you picked your team.

{{< img src="service_management/oncall/pagerduty_migration_import_team.png" alt="Import your PagerDuty Team into Datadog." style="width:95%;" >}}

### Team & Member mapping
Next, you’ll need to map your PagerDuty team to an existing Datadog team or create a new one. If you have a corresponding team in Datadog, simply select it from the list. Otherwise, you can choose to create a new team in Datadog to associate with your PagerDuty team. This step ensures that your on-call responsibilities are correctly aligned in Datadog.

If you choose to create a new Datadog team based on your selected PagerDuty team, you'll be prompted to enter a name for the new Datadog team. This new team will then be built using the structure and members from your PagerDuty team.

{{< img src="service_management/oncall/pagerduty_migration_map_users.png" alt="Map your PagerDuty users into Datadog. Invite or dismiss selectively." style="width:95%;" >}}

Datadog will automatically attempt to map your PagerDuty users to existing Datadog users based on their email addresses. If a match is found, those users will be added to the new Datadog team. However, if a PagerDuty user doesn't have a corresponding Datadog user, you’ll have the option to either not import those users at all or invite them to Datadog. If you choose to invite them, an invitation will be sent, allowing them to join the team in Datadog.

Hit "Import Team" once you are ready!

### Set up your Routing Rules
Next, you'll need to choose how you want to manage incoming alerts. Select one of the following templates to define how alerts are handled for your new Datadog team:

{{< img src="service_management/oncall/pagerduty_migration_select_routing_rule_template.png" alt="Select a Routing Rule template or start from scratch." style="width:95%;" >}}

- **All alerts to escalation policy**: Forward all alerts to a designated escalation policy for consistent handling.
- **Business hours**: Set routing rules based on specific time intervals, ensuring you only receive relevant alerts during business hours. Use chat integrations like Slack and Microsoft Teams as fallback channels.
- **Alert priority**: Organize and query alerts by priority and impact.
- **Start from scratch**: Customize routing rules to fit your team's specific workflows and processes.

Choose the template that best aligns with your team's needs, or start from scratch to tailor everything to your requirements.

### Selectively export escalation policies and schedules
Once you're editing your routing rules in Datadog, you can easily re-use your existing escalation policies and schedules from PagerDuty. You don’t have to recreate these elements from scratch – just choose the ones you want to bring over, and Datadog will automatically apply them to your new on-call setup.

{{< img src="service_management/oncall/pagerduty_migration_migrate_escalation_policies_and_schedules.png" alt="Selectively import escalation policies and schedules from PagerDuty into Datadog." style="width:95%;" >}}


Once imported, you can always make changes and add or configurations in your escalation policy and schedules.







[1]: https://app.datadoghq.com/integrations/pagerduty
