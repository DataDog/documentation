---
title: Connections
kind: documentation
description: Workflow connections
aliases:
  - "/workflows/setup"
disable_toc: false
---

## Overview

Because workflow actions connect with external software systems, you may need to authenticate your Datadog account to the corresponding integration. A workflow can run successfully only if every workflow action that requires authentication can verify the identity of your Datadog account. When granting permissions to Datadog, ensure that you're following security best practice and only granting the permissions necessary for a workflow to run.

Workflow actions can be authenticated in two ways:
- Credentials and permissions configured in the integration tile
- Connection credentials

## Integration tile credentials

Credentials and account authentication that you set up in the following Datadog integration tiles automatically propagate to the corresponding actions in Workflows:
- Jira
- PagerDuty
- Slack
- GitHub

Configure the integration tiles by following instructions in [Datadog Integrations][6].

If the integration you need to set up is not listed above, set up connection credentials.

## Connection credentials

Workflow connections extend your installed integrations to give you control over workflow step authentication. Use connection credentials to authenticate a [generic action][8] or any action for which the integration tile does not offer authentication. For a list of integrations that use the integration tile for authentication, see the [Integration tile credentials](#integration-tile-credentials) section. Connection credentials are only available for use within the Workflows product.

Connections support the following example use cases:
- The integration you need is not available as a built-in connection.
- You wish to authenticate a custom action. For instance, you need to use the HTTP action with your own service.
- The permissions needed are not supported by the integration, such as write permissions on AWS.
- You want granular access control, for example restricting user access to certain workflows.

### Connection security considerations

Before you create a connection, think about the permissions needed to fulfill the required task and grant the connection only the necessary permissions to fulfill that task. In addition, the connection should be restricted to only the people who need to use it.

Where possible, use granular connections for different workflows. For example, if you have a workflow that writes to an AWS S3 bucket, and a workflow that terminates AWS EC2 instances, do not use the same connection for both workflows. Instead, create two respective connections, each corresponding to an IAM role with limited scope.

## Work with connections

### View connections

1. From the [Workflows list][2], click **Connections** in the upper right. The [connections list][3] opens.
1. Click on a single line to view connection details.

### Create a connection

Establishing a connection requires the following information:
- What to connect to (for example, product name, URL)
- How to authenticate (for example, API key, username/password, oauth)

To create a connection:
1. Navigate to the [connections list][3].
1. Click the **New Connection** button in the upper right. The **New Connection** dialog box appears.
1. Click on an icon to choose an integration schema.
1. Fill in the appropriate fields. Click **Create**.

Alternatively, add a connection from the workflow page:
1. Navigate to the [Workflows list][9].
1. Select the workflow containing the action to which you need to add a credential. The workflow builder appears.
1. In the workflow visualization, click the action to which you need to add a credential. The right side panel populates with the action details.
1. Under the **Configure** tab, look for the **Connection** dropdown and click the **+** icon.
1. In the **New Connection** dialog box, name the connection and enter the required authentication details.
1. Click **Save**.

The example below shows the **New Connection** dialog box for the AWS connection. Each connection requires different authentication information. The AWS connection requires a valid AWS IAM Account ID and Role Name.

{{< img src="workflows/new-connection.png" alt="The New Connection dialog box for the AWS connection" >}}

### Edit a connection

1. Navigate to the [connections list][3].
1. Hover over the connection you would like to edit. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the pencil (**Edit**) icon. A dialog box appears.
1. Update the fields you would like to change.
1. Click **Save**.

### Delete a connection

1. Navigate to the [connections list][3].
1. Hover over the connection you would like to delete. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the trash can (**Delete**) icon. "Are you sure?" text appears.
1. Select **Delete**.

### Restrict connection use

To learn how to restrict connection use, see [Access and Authentication][4].

## HTTP connection

To connect to an arbitrary service, use the HTTP connection type, and choose from two authentication options:
- Token-based authentication
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
[6]: /integrations/
[8]: /workflows/actions_catalog/generic_actions/
[9]: https://app.datadoghq.com/workflow
