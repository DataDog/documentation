---
title: Configure Permissions
description: "Use granular access controls to limit which roles can edit a RUM application's configuration."
further_reading:
- link: "/account_management/rbac/"
  tag: "Documentation"
  text: "Role Based Access Control"
---

## Overview

By default, all users can change an application's RUM configuration.

Use granular access controls to limit the [roles][1] that may edit a particular application's RUM configuration:
1. While viewing an application's RUM configuration, click on the {{< ui >}}Edit application{{< /ui >}} button at the top of the screen. A dropdown appears.
1. Select {{< ui >}}Manage App Permissions{{< /ui >}}.
1. Click {{< ui >}}Restrict Access{{< /ui >}}.
1. The dialog box updates to show that members of your organization have {{< ui >}}Viewer{{< /ui >}} access by default.
1. Use the dropdown to select one or more roles, teams, or users that may edit the notebook.
1. Click {{< ui >}}Add{{< /ui >}}.
1. The dialog box updates to show that the role you selected has the {{< ui >}}Editor{{< /ui >}} permission.
1. Click {{< ui >}}Save{{< /ui >}}.

**Note:** To maintain your edit access to the application, the system requires you to include at least one role that you are a member of before saving.

You must have edit access to restore general access to a restricted application. Complete the following steps:
1. While viewing an application's RUM configuration, click on the {{< ui >}}Edit application{{< /ui >}} button at the top of the screen. A dropdown appears.
1. Select {{< ui >}}Manage App Permissions{{< /ui >}}.
1. Click {{< ui >}}Restore Full Access{{< /ui >}}.
1. Click {{< ui >}}Save{{< /ui >}}.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/
