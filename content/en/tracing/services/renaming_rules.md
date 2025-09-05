---
title: Renaming rules for inferred entities
further_reading:
- link: "tracing/services/inferred_services"
  tag: "Documentation"
  text: "Inferred services"
---

{{< callout url="https://docs.google.com/forms/d/1Qt03IHB-oHF_BmYQxDiENPksjXzxsfD0kGpTSHd81Hw/edit" d_toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger" btn_hidden="false" header="Join the preview for renaming rules for inferred entities!">}}
{{< /callout >}}

## Overview

In Datadog, you can rename inferred entities, including datastores and queues, to make them easier to identify and manage. Renaming rules let you override the `peer.service` tag on spans with custom names, or generate names dynamically using tags and regular expressions.  

Renaming is useful when:
- The default name does not match your preferences or conventions.  
- Services that you expect to appear as one are split into multiple inferred entities.  
- Multiple components are grouped under one name, but you want them represented separately.  

**Note**: Renaming applies only to [inferred entities][1], which are entities that Datadog identifies automatically.

## Create a renaming rule 

### Step 1: Select entities to rename

1. In Datadog, navigate to **APM > Settings > Service Renaming** and click **+ Add Rule**.
1. Use the search bar to select the entities you want to rename.
   1. You can select one or more entities, but all must be of the same type (service, datastore, or queue).
   1. As you select entities, a span query is built in the background. To edit the query, select the code icon to the right of the search bar.

### Step 2: Choose a rename method

1. In the text box, enter a unique name for the selected entity (or entities). Alternatively, use tag values with the `{{tagName}}` syntax to rename based on an entity's tags.
1. If tag values follow a pattern, apply a regular expression to extract only the portion you want in the name.  

### Step 3: Name your rule and review

1. Enter a descriptive name for the renaming rule so you can identify it later.
1. Review and save your renaming rule.

**Note:** Rules are processed at intake and applied to data as it comes in. Therefore, they are irreversible and should be created with caution. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/services/inferred_services