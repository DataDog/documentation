---
title: Editing locked monitors
kind: guide
---

## Overview

Monitors ensure your teams get alerted in case of issues on your systems. Making sure only the right subset of users can edit the right subset of monitors is critical to **avoid accidental changes in your monitors' configurations**.

You can now manage your monitors more safely by **restricting edit permissions of each individual monitor to some specific roles** of your account:








## Overview

Previously, your monitors could be locked which meant that only its creator and admins would be able to edit it. 
This locked mechanism is deprecated and monitors now rely on a new role restriction option.

You might have a number of old monitors still leveraging locked under the hood. The locked parameter is still supported, which means that at the API/Terraform level, the migration from locked to restricted_roles can be done progressively.
In the UI, the migration to this new role restriction option is done automatically on save.

Below are some instructions on how to proceed in case your monitor is locked, depending on your permissions/roles.



## Locked monitors with Admin/creator permissions

You are editing your monitor and seeing the below warning.

<TO DO: ADD SCREENSHOT OF WARNING>

You have different ways to go about handling this warning depending on the changes you are willing to make on your monitor.

**1. You do not want to perform any particular action on your monitor permissions**

You can just save the monitor to have the migration from locked to restricted_roles be performed automatically, along with any other updates you might have done on your monitor (e.g. threshold update, message, etc.).

If you were just opening the edit page to see more details about your monitor configuration, you can also hit **Save**. That will also perform the migration for your monitor.

**2. You want to allow all users to edit this monitor**

Add a random role, remove it, click **Save**.

**3. You want to your monitor to be restricted to some roles, but not the exact equivalent of the previous locked option**

Select the roles you want this monitor to be restricted to. This will override the locked equivalent set of roles to only the ones you specify.

  
  
## Locked monitors with non Admin/creator permissions

You are editing your monitor and seeing the below warning.

<TO DO: ADD SCREENSHOT OF WARNING>

As mentioned in the warning, this monitor was locked in the previous system. You should consequently reach out to admin/creator of the monitor for them to update the monitor to include one of the roles you belong to. Your admin will have to follow guidelines in the above section (2. or 3.).

The discrepancy you are seeing between the warning and the below option is expected. The warning reflects the current state of the monitor that is still using the old lcoked parameter. The option reflects the new option that your monitor will be migrated to once an admin/its creator edits it. Restricted roles will only populate the dropdown after the migration.


[1]: link
