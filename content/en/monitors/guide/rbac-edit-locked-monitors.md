---
title: Editing locked monitors
kind: guide
---

## Overview

Previously, your monitors could be locked which meant that only its creator and admins would be able to edit it. 
This locked mechanism is deprecated and monitors now rely on a new role restriction option.

You might have a number of old monitors still leveraging locked under the hood. The locked parameter is still supported, which means that at the API/Terraform level, the migration from locked to restricted_roles can be done progressively.
In the UI, the migration to this new role restriction option is done automatically on save.

Below are some instructions on how to proceed in case your monitor is locked.

## How to proceed

You are editing your monitor and seeing the below warning.

<TO DO: ADD SCREENSHOT OF WARNING>

You have different ways to go about handling this warning depending on the changes you are willing to make on your monitor.

**1. You do not want to perform any particular action on your monitor permissions **

You can just save the monitor to have the migration from locked to restricted_roles be performed automatically, along with any other updates you might have done on your monitor (e.g. threshold update, message, etc.).

If you were just opening the edit page to see more details about your monitor configuration, you can also hit **Save**. That will also perform the migration for your monitor.

**2. You want to allow all users to edit this monitor**

Add a random role, remove it, click **Save**.

**3. You want to your monitor to be restricted to some roles, but not the exact equivalent of the previous locked option**

Select the roles you want this monitor to be restricted to. This will override the locked equivalent set of roles to only the ones you specify.


[1]: link
