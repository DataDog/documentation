---
title: Catalog Health
description: Assess IDP Catalog completeness across entity types, lifecycle, tier, definition version, and ownership.
further_reading:
- link: "/internal_developer_portal/catalog"
  tag: "Documentation"
  text: "IDP Catalog"
- link: "/internal_developer_portal/catalog/set_up/"
  tag: "Documentation"
  text: "Set Up the IDP Catalog"
- link: "/internal_developer_portal/catalog/entity_model?tab=v30"
  tag: "Documentation"
  text: "IDP Catalog Entity Model"
- link: "/dashboards"
  tag: "Documentation"
  text: "Datadog Dashboards" 
---

## Overview

The Catalog Health report provides an out-of-the-box view of how complete your [IDP Catalog][1] is. Use it to find where catalog metadata is missing and which entities have no owner, so you can prioritize catalog cleanup. 

With this report, you can: 
- See how many entities are in your catalog, broken down by type: services, queues, systems, frontend apps, and APIs.
- Assess metadata coverage across lifecycle, tier, and definition version, including the entities that are missing each field.
- Identify entities without owners across every entity type.
- Filter by owner, lifecycle, tier, and definition version to focus on a subset of the catalog.

Access the Catalog Health report by navigating to **Reports** in your Internal Developer Portal and selecting **Catalog Health** in the left-hand menu. 

{{< img src="tracing/eng_reports/catalog-health-landing.png" alt="Default view of the Catalog Health report, showing the summary information section" style="width:100%;" >}} 

## Interact with your Catalog Health report 

### Adjust your view

Use the filters at the top of the report to scope the data by owner, lifecycle, tier, and definition version. 

### Schedule reports

Set up scheduled reports for your stakeholders that are delivered as PDFs through email, Slack, or Microsoft Teams on a recurring basis. 

To schedule reports, click **Schedule Report** in the top-right corner (or **Manage Reports** if you have already set up reports). For more information, see [Dashboards Scheduled Reports][2].

[1]:/internal_developer_portal/catalog
[2]:/dashboards/sharing/scheduled_reports
