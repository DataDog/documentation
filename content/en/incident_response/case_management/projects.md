---
title: Projects
aliases:
- /service_management/case_management/projects/
disable_toc: false
further_reading:
- link: "service_management/case_management/create_case"
  tag: "Documentation"
  text: "Create a case"
---

## Overview

A project is a container object that holds a set of cases. Organize your work around the groups that make sense to your organization, whether that's teams, services, or initiatives. Cases in each project are isolated from one another, helping you to focus on what's relevant.

## Create a project

{{< img src="service_management/case_management/projects/projects_create_a_project_cropped.png" alt="Create a new project page under Case management Settings" style="width:100%;" >}}

To create a project:
1. Select **New Project** on the Projects view or click on the **+** icon next to *Your Projects* in the left navigation bar.
1. Enter a project name and key. Project keys must be between one and 10 characters long. Case ID numbers are prefixed with a combination of letters, for example, `NOC-123`. Project keys are immutable.
1. Click **Create Project**.

## Delete a project

<div class="alert alert-danger">Deleted cases cannot be recovered.</div>

You can delete a project from a project's Settings page.

Deleting a project also deletes all the cases within it. If you want to keep cases, Datadog recommends moving cases to another project before deleting.

Deleting a project automatically disables any event correlation patterns tied to the project. Other automation, such as case creation through Datadog Workflows or monitor `@case` mentions, also break when you delete the linked project.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
