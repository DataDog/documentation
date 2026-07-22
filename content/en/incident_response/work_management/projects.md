---
title: Projects
aliases:
- /service_management/case_management/projects/
- /incident_response/case_management/projects/
disable_toc: false
further_reading:
- link: "incident_response/work_management/create_work_item"
  tag: "Documentation"
  text: "Create a work item"
---

## Overview

A project is a container object that holds a set of work items. Organize your work around the groups that make sense to your organization, whether that's teams, services, or initiatives. Work items in each project are isolated from one another, helping you to focus on what's relevant.

## Create a project

To create a project:
1. Select **New Project** on the Projects view or click on the **+** icon next to *Your Projects* in the left navigation bar.
1. Enter a project name and key. Project keys must be between one and 10 characters long. Work item ID numbers are prefixed with a combination of letters, for example, `NOC-123`. Project keys are immutable.
1. Click **Create Project**.

## Delete a project

<div class="alert alert-danger">Deleted work items cannot be recovered.</div>

You can delete a project from a project's Settings page.

Deleting a project also deletes all the work items within it. If you want to keep work items, Datadog recommends moving work items to another project before deleting.

Deleting a project automatically disables any event correlation patterns tied to the project. Other automation, such as work item creation through Datadog Workflows or monitor `@case` mentions, also break when you delete the linked project.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
