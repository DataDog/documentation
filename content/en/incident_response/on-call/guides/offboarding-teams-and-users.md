---
title: Offboarding teams and users from Datadog On-Call
aliases:
- /service_management/on-call/guides/offboarding-teams-and-users/
further_reading:
- link: "/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call"
- link: "/service_management/on-call/teams/"
  tag: "Documentation"
  text: "Teams"
- link: "/service_management/on-call/schedules/"
  tag: "Documentation"
  text: "Schedules"
---

Datadog charges for users who are active in On-Call, specifically those who are in schedules, escalation policies, or have notification preferences configured. When team members leave your organization or no longer need On-Call access, you'll want to remove them to avoid unnecessary charges.

This guide shows you how to:

- Identify which users are being charged for On-Call
- Remove users from schedules and escalation policies
- Clean up notification preferences and team memberships
- Ensure coverage gaps don't disrupt your incident response

**Who should use this guide**

This guide is for administrators and team leads who manage Datadog On-Call billing and user access.

## Offboarding Teams

If you no longer need a Datadog Team in On-Call, you can quickly offboard it. The team will remain in Datadog, but it will no longer appear as a pageable entity in On-Call.

Go to On-Call, pick the team to offboard, and scroll to the *Danger Zone*. Confirm offboarding. The team and its assets (schedules, escalation policies) stay intact—they’re just removed from On-Call.

## Offboarding users

Datadog charges for users who are actively configured in On-Call. Before removing anyone, identify which users are currently being billed by checking if they have:

- **Schedule assignments**: Users assigned to any On-Call schedule
- **Escalation policy membership**: Users included in escalation policies (either directly or as team members)
- **Notification preferences**: Users with On-Call notification methods configured (SMS, voice, push notifications)

You can find this information in the On-Call settings for each team and by reviewing individual user profiles. This is also available in the Plan & Usage page, specifically under "Seat Management".

### Replace coverage before removing users

Before removing users from On-Call, make sure someone else can handle their responsibilities to avoid gaps in incident response.

### Update schedules

For each schedule where the departing user is assigned:

1. **Find replacement coverage**: Assign another team member to cover their shifts
2. **Update the schedule**: Replace the departing user with the new person
3. **Check for gaps**: Make sure all time slots are still covered

### Update escalation policies

If the departing user is in any escalation policies:

1. **Replace individual assignments**: Remove the user and add their replacement
2. **Use team-based escalation**: Consider escalating to teams instead of individuals
3. **Test the changes**: Make sure escalations still work properly

### Remove user notification preferences

If the user is still part of your organization you can ask them to remove their Notification Preferences in their On-Call profile by visiting **On-Call > Settings > My On-Call Profile**.

As an admin, you can also manage this yourself by navigating to **On-Call > Settings > Notification Preferences**. Find the appropriate user and remove their notification preferences as needed. You will need the "On-Call Admin" permission to perform this.

**Note**, Notification Preferences make a user pageable and therefore billable. Having only contact methods (for example, push notifications) defined is a non-billable action and won't incur charges.

[1]: /service_management/on-call/
[2]: /service_management/on-call/teams/
[3]: /service_management/on-call/schedules/
[4]: /service_management/on-call/escalation_policies/
[5]: /account_management/rbac/
