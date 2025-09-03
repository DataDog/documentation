---
title: Service renaming
further_reading:
- link: "tracing/services/inferred_services"
  tag: "Documentation"
  text: "Inferred services"
---

## Overview

You can rename inferred services, datastores, and queues in Datadog to make them easier to identify and manage. Renaming rules let you override the `peer.service` tag on spans with custom names, or generate names dynamically using tags and regular expressions.  

Renaming is useful when:
- A default name does not match your preferences or conventions.  
- Services that you expect to appear as one are split into multiple inferred entities.  
- Multiple components are grouped under one name, but you want them represented separately.  

**Note**: Renaming applies only to [inferred entities][1]. These are entities that Datadog identifies automatically.

## Create a renaming rule 

### Step 1: Select entities to rename

1. In Datadog, navigate to **APM > Settings > Service Renaming** and click **+ Add Rule**.
1. Use the search bar to select the entities you want to rename.
   1. You can select one or more entities, but all must be of the same type (service, datastore, or queue).
   1. As you select entities, a span query is built in the background. To edit the query, select the code icon to the right of the search bar.

### Step 2: Choose a rename method

Enter a custom name directly or use tags and regular expressions to generate names.  

1. In the text box, enter a new name for the selected entity (or entities). Alternatively, use tag values with the `{{tagName}}` syntax to rename based on an entity's tags.
1. If tag values follow a pattern, apply a regular expression to extract only the portion you want in the name.  

### Step 3: name your rule and review

1. Enter a descriptive name for the renaming rule so you can identify it later.
1. Review and save your renaming rule.

**Note:** Rules are processed at intake and applied to data as it comes in. As such, they are irreversible and should be created with caution. 

[1]: /tracing/services/inferred_services