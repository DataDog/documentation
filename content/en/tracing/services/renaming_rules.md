---
title: Renaming rules for inferred entities
description: Create custom names for inferred entities like databases and queues using tags and regular expressions.
further_reading:
- link: "tracing/services/inferred_services"
  tag: "Documentation"
  text: "Inferred services"
---

## Overview

In Datadog, you can rename inferred entities, including datastores and queues, to make them easier to identify and manage. Renaming rules let you override the `peer.service` tag on spans with custom names, or generate names dynamically using tags and regular expressions. This functionality applies across all of APM, not only in the [Software Catalog][3]. After a rule is created, the updated names appear consistently in service maps, Trace Explorer, monitors, dashboards, and any other APM view.

Renaming is useful when:
- The default name does not match your preferences or conventions.  
- Services that you expect to appear as one are split into multiple inferred entities.  
- Multiple components are grouped under one name, but you want them represented separately.  

**Note**: Renaming applies only to [inferred entities][1], which are entities that Datadog identifies automatically.

## Prerequisites

You must have the `apm_service_renaming_write` permission to create renaming rules. See [Permissions][2] for details on Datadog role-based access control.  

## Create a renaming rule 

### Step 1: Select renaming action and entities to target

1. In Datadog, navigate to **APM > Software Catalog > Manage > Manage Renaming Rules** and click **+ Add Rule**. 

   Alternatively, navigate to **APM > Software Catalog** and click on a service to open the service side panel. From there, click **Service Page > Service Renaming**.

   {{< img src="tracing/services/renaming_rules/service-side-panel.png" alt="The side panel for a particular service, showing the Service Page dropdown menu with a Service Renaming option" style="width:100%;" >}}

1. Choose a renaming action you want to perform for your new renaming rule.
   
   You can select to split a single entity, rename an entity, merge multiple entities together, or rename several entities.

1. Use the search bar to select the entities you want to rename.
   - You can select one or more entities, but all must be of the same type (service, datastore, or queue).
   - As you select entities, a span query is built in the background. To edit the query, select **Build Advanced Query**.


### Step 2: Specify new entity name

1. In the text box, enter a unique name for the selected entity (or entities). Alternatively, use tag values with the `{{tagName}}` syntax to rename based on an entity's tags.
1. If tag values follow a pattern, apply a regular expression to extract only the portion you want in the name.  


### Step 3: Name your rule and review

1. Optionally, enter a descriptive name for the renaming rule so you can identify it later.
1. Review and save your renaming rule.

<div class="alert alert-info"><ul><li>Rules are processed at intake and applied to data as it comes in.</li><li>Changes affect only spans ingested while a rule is active, and past data is not updated retroactively.</li><li>Deleting or modifying a rule stops it from applying to new data, but does not revert names on previously ingested data.</li></ul></div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/inferred_services
[2]: /account_management/rbac/permissions
[3]: /internal_developer_portal/software_catalog/
