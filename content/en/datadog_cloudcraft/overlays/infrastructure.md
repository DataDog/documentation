---
title: Infrastructure
description: "Use the Infrastructure overlay in Cloudcraft to view resources grouped by Account, Region, and VPC for architecture diagrams and troubleshooting."
further_reading:
- link: "/datadog_cloudcraft/overlays/observability/"
  tag: "Documentation"
  text: "Observability overlay"
- link: "/datadog_cloudcraft/overlays/security/"
  tag: "Documentation"
  text: "Security overlay"
- link: "/datadog_cloudcraft/overlays/ccm/"
  tag: "Documentation"
  text: "Cloud Cost Management overlay"
---

## Overview

The Infrastructure overlay provides a broad overview of your cloud environment, grouping resources by Account, Region, and VPC. This is the default view when opening a Cloudcraft diagram.

{{< img src="datadog_cloudcraft/infra_overlay_4.png" alt="Infrastructure overlay in Cloudcraft." style="width:100%;" >}}

## Use cases

The Infrastructure overlay is ideal for:

- Generating architecture diagrams for documentation or presentations
- Troubleshooting connectivity and resource relationships
- Conducting high-level architecture reviews
- Onboarding team members to your cloud environment

## Resource grouping

Resources are organized in a hierarchical structure:

- **Account**: Top-level grouping by AWS account
- **Region**: Resources grouped by geographic region within each account
- **VPC**: Resources grouped by Virtual Private Cloud within each region

This hierarchy helps you understand how resources are distributed across your cloud infrastructure.

## Interact with resources

Click any resource to open a side panel with additional details, including:

- Resource type and name
- Associated tags
- Links to related Datadog views

## Excluded components

To reduce visual clutter and highlight the most important parts of your architecture, the Infrastructure overlay excludes certain components by default:

- EBS volumes
- NAT Gateways
- Transit Gateways

These components are still part of your infrastructure but are hidden to keep the diagram focused on core resources.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
