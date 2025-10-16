---
title: Incident Response Billing
further_reading:
- link: "/service_management/incident_management/"
  tag: "Documentation"
  text: "Learn about Incident Management"
- link: "/service_management/on-call/"
  tag: "Documentation"
  text: "Learn about On-Call"
- link: "/status_pages/"
  tag: "Documentation"
  text: "Learn about Status Pages"
---

## Overview

Datadog's [Incident Management][1], [On-Call][2], and Incident Response SKUs use a seat-based billing model. 

An organization may have: 

- Incident Management and/or On-Call as separate SKUs, each billed individually, or
- The Incident Response bundle, which unifies billing for both products under a single SKU.

Each product bills by seat, meaning every user who performs qualifying actions occupies a seat license. For detailed pricing information, see the [Incident Response pricing page][3].

Seat usage for each product can be viewed and managed in the [Seat Management section of the Plan & Usage page][4] in Datadog. 

## What is a seat? 

A **Seat** is a license for a user to actively participate in the on-call or incident management process in Datadog. 

Any user can claim a seat for On-Call and Incident Management or Incident Response as they perform actions that require them. Billing admins can also assign seats ahead of time to simplify the process for their teams.

A user needs an On-Call seat if they:
- Are part of an [on-call schedule][5].
- Are included in an [escalation policy][6].
- Have set up [notification preferences][7] to receive pages.
Note that for On-Call only:
- Anyone can view existing pages, escalation policies, teams, and schedules without a seat. 


A user needs an Incident Management seat if they:
- Modify an incident (for example, update severity).
- Add a comment, graph, or link to an [incident timeline][8].
Note that for Incident Management only: 
- The actions above require a seat whether they are performed in the Datadog UI or through integrations such as Microsoft Teams or Slack. 
- Anyone can create incidents, view incidents, and join incident channels without a seat. 

If your organization has committed to the Incident Response SKU, any user who meets the On-Call or Incident Management criteria can claim or be assigned an Incident Response seat.

## Managing Seats

The [Seat Management page][1] gives billing admins visibility and control over users who occupy seats for Incident Management, On-Call, or the Incident Response bundle. 

### Navigating the Seat Management Page

The Seat Management page contains tabs for each product enabled in your organization. Depending on your contract, you'll see either: 

- Separate tabs for Incident Management and/or On-Call, or
- A single tab for Incident Response (if you use the bundle SKU)

Each tab includes: 

- A header showing the total seats in use and your committed seat count (for example, 130 of 180 seats in use)
- A table listing all users who currently occupy seats, including:
    - Name
    - Email
    - Upgraded date (when the user was assigned a seat)

You can also find users by searching by name, email, or team. 

### Assigning Seats

Billing admins, or users with the `billing_edit` permission, can manually assign seats so team members have access before they need it. 

**To assign a seat:**

1. Go to **Plan & Usage** → **Seat Management**.
2. Select the relevant product tab: **Incident Management**, **On-Call**, or **Incident Response**.
3. Click **Assign Seats**.
4. Search for users by name or email, and select them.
5. Click **Assign Seats**.

Assigned users immediately appear in the Seats table and can access the product's features. 

### Unassigning Seats

To remove users and free up seats: 

1. In the Seats table, check the box next to oneor more users. 
2. Click **Unassign Seats**.
3. Confirm your selection.

Once unassigned, the users lose access to features that require a seat but can still: 

- Create incidents
- View incidents
- Join incident channels

### Claiming a Seaet

If you try to perform an action that requires a seat such as joining an on-call schedule, updating an incident, or adding information to an incident tiemline, Datadog will prompt you to claim a seat. Claiming a seat requires the `billing_read`, `on_call_read`, or `incident_read` permission. 

Once you confirm: 

- You'll immediately gain access to the product features you need (for example, receiving pages or managing incidents).
- Your seat assignment is automatically reflected in the Seat Management page for your organization.

If your organization has committed seats available, you'll occupy one of them.  
If all committed seats are already in use, the new assignment still succeeds, but the additional seat will be counted as an on-demand seat. 

You only need to claim a seat once. After it's assigned, you'll continue to have access until a billing admin unassigns it. 

## Billing and Overages

### How Billing Works

Datadog bills for Incident Management, On-Call, and Incident Response based on the total number of seats in use during each billing period. 

Each billing period reflects the maximum number of concurrently assigned seats across your organization for that product. Your contract includes a committed number of seats, and any usage beyond that amount is billed at your on-demand rate. 

Example: 

If your contract includes 182 committed seats and your organization's peak usage during the month was 190 seats, 
- 182 seats are billed at your committed rate, and
- 8 seats are billed at your on-demand rate for that billing cycle.

You can add or remove seat licenses at any time.

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
