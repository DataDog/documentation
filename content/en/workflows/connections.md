---
title: Connections
kind: documentation
description: Workflow connections
disable_toc: false
is_beta: true
---

{{< beta-callout url="https://forms.gle/VEjerYVQ2QJhauZ57" >}}
  Workflows are in public beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.
{{< /beta-callout >}}

## Overview

A connection is a link between Datadog and a third party through which data flows and actions can be performed. 

Establishing a connection requires the following information:
- What to connect to (for example, product name, URL) 
- How to authenticate (for example, API key, username/password, oauth)

Workflow connections extend your installed integrations to give you control over workflow step authentication. Use a custom connection to authenticate a [generic action][1] or any action for which the integration tile does not offer authentication. These custom connection credentials are only available for use within the Workflows product.

Custom connections support the following example use cases:
- The integration you need is not available as a built-in connection.
- You wish to authenticate a custom action. For instance, you need to use the HTTP action with your own service.
- The permissions needed are not supported by the integration, such as write permissions on AWS.
- You want granular access control, for example restricting user access to certain workflows.

## Work with connections

### View connections

1. From the [Workflows list][2], click **Connections** in the upper right. The [connections list][3] opens.
1. Click on a single line to view connection details.

### Create connection

1. Navigate to the [connections list][3].
1. Click the **New Connection** button in the upper right. The **New Connection** dialog box appears.
1. Click on an icon to choose an integration schema.
1. Fill in the appropriate fields. Click **Create**.

### Edit connection

1. Navigate to the [connections list][3].
1. Hover over the connection you would like to edit. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the pencil (**Edit**) icon. A dialog box appears.
1. Update the fields you would like to change.
1. Click **Save**.

### Delete connection

1. Navigate to the [connections list][3].
1. Hover over the connection you would like to delete. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the trash can (**Delete**) icon. "Are you sure?" text appears.
1. Select **Delete**.

### Restrict connection use
 
To learn how to restrict connection use, see [Access and Authentication][4].

## HTTP connection

To connect to an arbitrary service, use the HTTP connection type, and choose from two authentication options:
- Token based authentication
- A username and password combination

### Create HTTP connection

1. Navigate to the [connections list][3].
1. Select **New Connection**. A dialog box appears.
1. Select **HTTP Connection**. The dialog box updates to show the HTTP connection parameters.
1. Enter the **Base URL**.
1. If appropriate, use the **Add +** buttons to add headers or URL parameters.
1. Choose an connection type: **Token Auth** or **Basic Auth**. Enter the appropriate parameters.
1. Click **Create** to save your HTTP connection.

[1]: /workflows/actions_catalog/generic_actions/
[2]: https://app.datadoghq.com/workflow
[3]: https://app.datadoghq.com/workflow/connections
[4]: /workflows/access/#restrict-connection-use
