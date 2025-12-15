---
title: Incident Response Billing
further_reading:
- link: "/service_management/incident_management/"
  tag: "Documentation"
  text: "Incident Management"
- link: "/service_management/on-call/"
  tag: "Documentation"
  text: "On-Call"
- link: "/service_management/status_pages/"
  tag: "Documentation"
  text: "Status Pages"
---

## Overview

Datadog's [Incident Management][1], [On-Call][2], and Incident Response SKUs use a seat-based billing model. 

Organizations have two options for incident response billing:
- Incident Management or On-Call as separate SKUs, each billed individually
- The Incident Response bundle, which unifies billing for both Incident Management and On-Call under a single SKU

Each product bills by seat, so each user who performs qualifying actions requires a seat license. For detailed pricing information, see the [Incident Response pricing page][3].

View and manage seat usage for each product in the [Seat Management][4] section of the Plan & Usage page in Datadog.

## Allocate seats

A **seat** is a license for a user to actively participate in the on-call or incident management process in Datadog. 

Any user can claim a seat for On-Call, Incident Management, or Incident Response as they perform actions that require a seat. Billing admins can also assign seats ahead of time to simplify the process for their teams.

A user needs an **On-Call seat** if they perform any of the following:
- Participate in an [on-call schedule][5]
- Are included in an [escalation policy][6]
- Have set up [notification preferences][7] to receive pages

In the On-Call product, a user does not need a seat to view existing pages, escalation policies, teams, or schedules.

A user needs an **Incident Management seat** if they perform any of the following actions. These actions require a seat whether they are performed in the Datadog UI or through integrations such as Microsoft Teams or Slack.
- Modify an incident (for example, update severity)
- Add a comment, graph, or link to an incident timeline

In Incident Management, a user does not need a seat to create incidents, view incidents, or join incident channels. Commenting in Slack, including posting messages that sync to the incident timeline, also does not require a seat. Only actions taken through the Datadog app in Slack, such as using action buttons or interacting with @Datadog, trigger a seat requirement.

If your organization has committed to the Incident Response SKU, any user who meets the On-Call or Incident Management criteria can claim or be assigned an **Incident Response seat**.

### Status Pages usage

All paid Datadog customers can use Status Pages, with capabilities determined by whether the organization has an Incident Management or Incident Response seat:
- If your organization has at least one committed Incident Management or Incident Response seat, you receive full Status Pages functionality, including the ability to create unlimited pages and configure custom domains.
- If your organization does not have a committed Incident Management or Incident Response seat, you can create a single Status Page and cannot use custom domains.

## Manage seats

The [Seat Management page][1] gives billing admins visibility and control over users who occupy seats for Incident Management, On-Call, or the Incident Response bundle. 

The Seat Management page contains tabs for each product enabled in your organization. Depending on your contract, you may see one of the following:
- Separate tabs for Incident Management and On-Call
- A single tab for Incident Response (if you use the bundle SKU)

Each tab includes:
- A header showing the total seats in use and your committed seat count (for example, 130 of 180 seats in use)
- A table listing all users who occupy seats, including:
    - Name
    - Email
    - Upgraded date (when the user was assigned a seat)

You can also find users by searching by name, email, or team. 

On-Call admins can also use the [Notification Preferences settings page][9] to view which schedules or escalation policies a user belongs to and remove that user's notification preferences if needed. 

Removing a user's notification preferences does not unassign their seat. If a user should no longer occupy a seat, you must explicitly unassign the user from the Seat Management Page. 

### Assign seats

Billing admins, or users with the `billing_edit` permission, can manually assign seats so team members have access before they need it.

To assign a seat:
1. Go to **Plan & Usage** → **Seat Management**.
2. Select the relevant product tab: **Incident Management**, **On-Call**, or **Incident Response**.
3. Click **Assign Seats**.
4. Search for users by name or email, and select them.
5. Click **Assign Seats**.

Assigned users immediately appear in the Seats table and can access the product's features. 

### Unassign seats

To remove users and free up seats: 
1. In the Seats table, check the box next to one or more users.
2. Click **Unassign Seats**.
3. Confirm your selection.

After they are unassigned, the user loses access to features that require a seat. They can still perform the following actions:
- Create incidents
- View incidents
- Join incident channels

### Claim a seat

When you try to perform an action that requires a seat (such as joining an On-Call schedule, updating an incident, or adding information to an incident timeline) Datadog prompts you to claim a seat. Claiming a seat requires at least one of the following permissions: `billing_read`, `on_call_read`, or `incident_read`.

After you claim a seat, the following items change in Datadog:
- You immediately gain access to the product features you need (for example, receiving pages or managing incidents).
- The Seat Management page for your organization shows your seat assignment.

If your organization has committed seats available, you occupy one of them. If all committed seats are already in use, the new assignment succeeds, but the additional seat counts as an on-demand seat. 

You only need to claim a seat once. After a seat is assigned, you continue to have access until a billing admin unassigns it.

## Billing and overages

Datadog bills for On-Call, Incident Management, and Incident Response based on the total number of seats in use during each billing period. 

Each billing period reflects the maximum number of concurrently assigned seats across your organization for that product. Your contract includes a committed number of seats, and any usage beyond that amount is billed at your on-demand rate. 

After a user claims a seat, the seat remains active and is billed month-to-month until it is unassigned. If a user is removed during a given month, the seat remains billable for that month. In the following month's billing cycle, the seat will no longer appear.

You can add or remove seat licenses at any time. Removing a user before the end of a billing period prevents future charges for that seat.

### Example

- Your contract includes 182 committed seats.
- Your organization's peak usage during the month was 190 seats.

Your monthly bill contains the following:
- 182 seats are billed at your committed rate.
- 8 seats are billed at your on-demand rate for that billing cycle.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/incident_management/
[2]: /service_management/on-call/
[3]: https://www.datadoghq.com/pricing/?product=incident-response#products
[4]: https://app.datadoghq.com/billing/seats
[5]: /service_management/on-call/schedules/
[6]: /service_management/on-call/escalation_policies/
[7]: /service_management/on-call/profile_settings/#notification-preferences
[8]: /service_management/incident_management/investigate/timeline
[9]: https://app.datadoghq.com/on-call/settings/notifications-preferences-admin
