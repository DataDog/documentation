---
title: Renaming rules for inferred entities
description: Create custom names for inferred entities like databases and queues using tags and regular expressions.
further_reading:
- link: "tracing/services/inferred_services"
  tag: "Documentation"
  text: "Inferred services"
---

{{< callout url="https://www.datadoghq.com/product-preview/renaming-rules-for-inferred-entities" d_target="#signupModal" btn_hidden="false" header="Join the preview for renaming rules for inferred entities!" >}}
{{< /callout >}}

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

### Step 1: Select entities to rename

1. In Datadog, navigate to **APM > Settings > Service Renaming** and click **+ Add Rule**. 

   Alternatively, navigate to **APM > Software Catalog** and click on a service to open the service side panel. From there, click **Service Page > Service Renaming**.

   {{< img src="tracing/services/renaming_rules/service-side-panel.png" alt="The side panel for a particular service, showing the Service Page dropdown menu with a Service Renaming option" style="width:100%;" >}}

1. Use the search bar to select the entities you want to rename.
   1. You can select one or more entities, but all must be of the same type (service, datastore, or queue).
   1. As you select entities, a span query is built in the background. To edit the query, select the code icon to the right of the search bar.

   {{< img src="tracing/services/renaming_rules/create-service-rename-rule-search.png" alt="Step 1 in the Create Service Rename Rule UI, prompting the user to filter and select the entities to rename" style="width:100%;" >}}

### Step 2: Choose a rename method

1. In the text box, enter a unique name for the selected entity (or entities). Alternatively, use tag values with the `{{tagName}}` syntax to rename based on an entity's tags.
1. If tag values follow a pattern, apply a regular expression to extract only the portion you want in the name.  

{{< img src="tracing/services/renaming_rules/create-service-rename-rule-tags.png" alt="Step 2 in the Create Service Rename Rule UI, prompting the user to choose how to rename the selected entities" style="width:100%;" >}}


### Step 3: Name your rule and review

1. Enter a descriptive name for the renaming rule so you can identify it later.
1. Review and save your renaming rule.

**Note:** Rules are processed at intake and applied to data as it comes in. Changes affect only spans ingested while a rule is active, and past data is not updated retroactively. Deleting or modifying a rule stops it from applying to new data, but does not revert names on previously ingested data.

{{< img src="tracing/services/renaming_rules/create-service-rename-rule-reviewandsave.png" alt="The final step of the Create Service Rename Rule UI, prompting the user to review and save their renaming rule" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/inferred_services
[2]: /account_management/rbac/permissions
[3]: /internal_developer_portal/software_catalog/
