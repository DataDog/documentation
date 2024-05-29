---
title: Cloud SIEM Entities
---

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot of Entities Explorer page
</div>

## Overview

Cloud SIEM Entities consolidates multiple data sources, such as threats and vulnerabilities, into a profile representing a single security entity, such as a Cloudtrail session or IAM user.

With Cloud SIEM Entities, you can:

- Explore entities, sorting them by risk score or querying them (for example, by tag).
- View all data relevant to an entity, such as signals, misconfigurations, and identity risks.
- Triage relevant items in bulk, taking mitigation steps such as adding a global suppression or creating a global case for an entity.

## Explore Entities

On the [Entities Explorer page][], you can view all entities that have at least one signal. Click an entity to open the entity panel.

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot of the entity side panel
</div>

The entity panels for the top 4 suspicious entities are also accessible from the [Cloud SIEM Overview page][]:

<div style="border: 1px solid black; height: 400px; width: 100%; line-height: 400px; text-align: center; margin-bottom: 1em">
Screenshot of relevant section of Cloud SIEM Overview page
</div>

The top of the entity panel displays the count of related signals, identity risks, and so on, with links to the list view of each.

The **Entry Context** section displays entity's attributes, such as the entity type and the list of fired rules. 

Build additional context by scrolling the entry timeline, or by viewing related items, such as logs, IPs, and workflows.

## Risk scoring

An entity's risk score summarizes the entity's risk level over time. The risk score is calculated from the characteristics of the entity's associated signals, such as the severity level of the signal and how many times the signal has fired.

Only out-of-the-box signals from the past 14 days are included in the risk score calculation.

## Setup

For coverage of AWS resources, make sure [AWS is configured for Cloud SIEM][1].

Otherwise, no additional setup is required to use Cloud SIEM Entities.

[1]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/


