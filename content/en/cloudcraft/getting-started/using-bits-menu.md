---
title: Using the Bits menu
kind: documentation
---

## Overview

With Cloudcraft's Bits menu, you can easily navigate from any resource in Cloudcraft directly to the most relevant views in Datadog. This allows you to quickly access the most relevant information for the resource you're currently viewing, so accessing your logs, APM traces, or other information in Datadog from your diagram in Cloudcraft is just a click away.

<div class="alert alert-info">To access this features you need to log in to Cloudcraft using your Datadog account. If you're currently logging in using another login method, <a href="https://app.cloudcraft.co/app/support">contact our support team</a> and they'll assist you.</div>

## The Bits menu

Start by clicking on a [supported component](#supported-components) in your diagram. Once you've selected a component, you'll see the Bits menu appear on the right-hand side of the screen.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu.png" alt="Screenshot showing the Cloudcraft interface with a red arrow highlighting the Bits menu." responsive="true" style="width:100%;">}}

Click on the Bits menu to view the available options for the selected component.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu-clicked.png" alt="Screenshot of Cloudcraft with the Bits menu clicked showing several options, including Host dashboard, Database monitoring, Query metrics, and MySQL dashboard." responsive="true" style="width:100%;">}}

Click on any of the options to open the relevant view in Datadog.

## Supported components

The Bits menu is available for the following Cloudcraft components:

**From AWS:**

- EC2.
- RDS.
- ELB/ALB.
- Lambda.

**From Azure:**

- Virtual Machines.

Support for additional components is coming soon.

<div class="alert alert-info">To view telemetry in Datadog for a component, the component must have Datadog agents or other integrations installed and configured.</div>
