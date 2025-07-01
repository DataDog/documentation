---
title: Access and Authentication
description: Access and authentication for Datastores
further_reading:
- link: "/actions/connections"
  tag: "Documentation"
  text: "Connections"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Datastores are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Required Datadog role permissions

To interact with the Actions Datastore, your Datadog account must have the following [permissions][1], which are included in the Datadog Standard Role:

* `actions_datastore_read` - Allows read access to the data within the Actions Datastore.
* `actions_datastore_write` - Allows modification of data within the Actions Datastore, including adding, editing, and deleting records.

To use the [Actions Datastore UI][2], you also need the following permission, which is also included in the Datadog Standard Role:

* `actions_datastore_manage` - Allows management of the Actions Datastore, including creating, updating, and deleting the datastore itself.

## Action credentials

Datastores shares the Action Catalog and the connection credentials for integrations with [Datadog Workflow Automation][3] and [App Builder][4] products. For more information on configuring credentials, see [Connections][5].

## Datastore permissions

The following permissions are available for datastores:

Manager
: Read and write access to data and can edit the datastore schema.

Contributor
: Read and write access to the datastore.

Viewer
: Read access to the datastore.

None
: No access.

## Restrict access to a specific datastore

During the datastore creation process, you're asked to set the organization access level for the datastore. You can choose either `Contributor`, `Viewer`, or `None`. Contributor is the default access level.

To restrict access to an existing datastore for either an organization or individual:
1. Hover over the datastore on the [Datastore page][6] and click the padlock (**Permissions**) icon.
1. Use the drop-down menus to edit the permissions for a user or organization.
1. Click **Save**.

## Elevate access

The `user_access_manage` [permission][1] is required to elevate your access to datastores.

To elevate your access:
1. Hover over the datastore on the [Datastore page][6] and click the padlock (**Permissions**) icon.
1. Click **Elevate Access**.
1. Click **Save**.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/rbac/permissions/?tab=ui#app-builder--workflow-automation
[2]: https://app.datadoghq.com/app-builder/datastore
[3]: /actions/workflows
[4]: /actions/app_builder
[5]: /service_management/app_builder/connections/
[6]: https://app.datadoghq.com/app-builder/datastore