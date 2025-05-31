---
title: Bits SRE
---

## Overview

Bits SRE is an autonomous AI agent that investigates alerts and coordinates incident response. When a monitor triggers, Bits proactively generates multiple hypotheses, queries relevant telemetry, and reasons over the data to help on-call engineers quickly identify the root cause. If the alert escalates to an incident, Bits supports the response by managing stakeholder communications, surfacing relevant knowledge base content, highlighting related incidents, and accelerating the postmortem and incident follow-up process. By reducing manual effort, Bits ensures smoother and more efficient on-call operations.

## Setup

### Get started with alert investigations

Bits helps automate alert investigations so you can triage issues faster and reduce manual troubleshooting. Here's how to get started:

<!-- TKTK NOT BUILT YET; NEEDS TO BE VERIFIED -->

#### Enable Bits on monitors for automated investigations

There are two main ways to enable Bits for automated investigations: 
- **Option 1: Use the Bits-Optimized Monitors list**
  - Head to **Bits AI** > **Monitor Management** > **Bits-Optimized Monitors**. This list shows monitors that are most-optimized for investigations by Bits.
- **Option 2: Add the Bits AI tag to a monitor**
  1. Navigate to the **Monitor Edit** page. 
  1. Scroll to the **Configure notifications & automations** > **Metadata** section and add the `bitsai:enabled` tag. 
     - To do this in bulk, navigate to the Monitor List page. Use the checkboxes to select multiple monitors, click Edit Tags and add `bitsai:enabled`.  
     - You can also add the tag to your desired monitors using API or Terraform. 

#### Manually start an investigation

Alternatively, you can manually invoke Bits on an individual monitor event. 

- **Option 1: Monitor Status Page**
  - On the **monitor status page** or the **alert event**, click the **Investigate with Bits AI** button.
- **Option 2: Slack**
  - Under a monitor notification in Slack, type, `@Datadog Investigate this alert`.

<!-- TKTK ADD LINK BELOW -->
For best results, see Tips for optimizing monitors for Bits SRE below.

