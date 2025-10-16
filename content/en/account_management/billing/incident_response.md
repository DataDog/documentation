---
title: Incident Response Billing
further_reading:
- link: "/incident-management/"
  tag: "Documentation"
  text: "Learn about Incident Management"
- link: "/on-call/"
  tag: "Documentation"
  text: "Learn about On-Call"
- link: "/status_pagees/"
  tag: "Documentation"
  text: "Learn about Status Pages"
---

## Overview

Datadog's Incident Management, On-Call, and Incident Response SKUs use a seat-based billing model. 

An organization may have: 

- Incident Management and/or On-Call as separate SKUs, each billed individually, or
- The Incident Response bundle, which unifies billing for both products under a single SKU.

Each product bills by seat, meaning every user who performs qualifying actions occupies a seat license. 

Seat usage for each product can be viewed and managed in the Seat Management section of the Plan & Usage page in Datadog. 

## What is a seat? 

A **Seat** is a license for a user to actively participate in the on-call or incident management process in Datadog. 

Any user can claim a seat for On-Call and Incident Management or Incident Response as they perform actions that require them. Billing admins can also assign seats ahead of time to simplify the process for their teams.

A user needs an On-Call seat if they:
- Are part of an on-call schedule.
- Are included in an escalation policy.
- Have set up notification preferences to receive pages.

A user needs an Incident Management seat if they:
- Modify an incident (for example, update severity).
- Add a comment, graph, or link to an incident timeline.
Note that for Incident Management only: 
- The actions above require a seat whether they are performed in the Datadog UI or through integrations such as Microsoft Teams or Slack. 
- Anyone can create incidents, view incidents, and join incident channels without a seat. 

If your organization has committed to the Incident Response SKU, any user who meets the On-Call or Incident Management criteria can claim or be assigned an Incident Response seat.

## Managing Seats

The Seat Management page gives billing admins visibility and control over users who occupy seats for Incident Management, On-Call, or the Incident Response bundle. 

### Navigating the Seat Management Page

The Seat Management page contains tabs for each product enabled in your organization. Depending on your contract, you'll see either: 

- Separate tabs for Incident Management and/or On-Call, or
- A single tab for Incident Response (if you use the bundle SKU)

Each tab includes: 

- A header showing the total seats in use and your committed seat count (for example, 132 of 182 seats in use)
- A table listing all users who currently occupy seats, including:
    - Name
    - Email
    - Upgraded date (when the user was assigned a seat)

You can also find users by searching by name, email, or team. 

### Assigning Seats

Billing admins can manually assign seats so team members have access before they need it. 

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
