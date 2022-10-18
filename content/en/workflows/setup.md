---
title: Authentication
kind: documentation
disable_toc: false
is_beta: true
further_reading:
- link: "/integrations/"
  tag: "Documentation"
  text: "Learn about integrations"
- link: "/workflows/actions_catalog"
  tag: "Documentation"
  text: "See the list of workflow actions"
---

{{< beta-callout url="https://forms.gle/VEjerYVQ2QJhauZ57" >}}
  Workflows are in public beta. If you have any feedback or questions, contact <a href="/help">Datadog support</a>.
{{< /beta-callout >}}

Because workflow [actions][1] connect with external software systems, you may need to authenticate your Datadog account to the corresponding integration or integrations. A workflow can run successfully only if every workflow action that requires authentication can verify the identity of your Datadog account.

Workflow actions can be authenticated in two ways:
- Credentials and permissions configured in the integration tile
- Custom connection credentials

## Integration tile credentials

Credentials and account authentication that you set up in Datadog integration tiles automatically propagate to the corresponding actions in Workflows. Configure the integration tiles by following instructions in [Datadog Integrations][2].

## Custom connection credentials

You can create custom credentials within Workflows. These custom connection credentials are only available for use within the Workflows product. 

Using custom connection credentials allow you to authenticate a workflow action using one of the following options:
- Token based authentication
- A username and password combination

Use custom connections to authenticate [generic actions][3] or any action for which the integration tile does not offer authentication.

### Create custom connection

1. In the left navigation, go to **Integrations** -> **Workflows** to access the [Workflows list][3].
1. Click **Connections** in the upper right.
1. Select **New Connection**. A dialog box appears.
1. Choose an integration schema. The **Custom** option allows you to authenticate using a token or username/password combination. The other options use authentication schemas associated with the integration.
1. Fill in the remaining information required by the integration schema.
1. Click **Create** to save your custom connection.

## Working with connections

### Restrict connection use

You can set permissions on each connection to limit modifications or restrict their use. The granular permissions include **Viewer**, **Resolver**, and **Editor**.

Viewer
: Can view

Resolver
: Can resolve and view

Editor
: Can edit, resolve, and view

1. Navigate to the [Workflows list][3].
1. Click **Connections** in the upper right. A list of connections appears.
1. Hover over the connection on which you would like to set granular permissions. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the padlock (**Permissions**) icon.
1. Select **Restrict Access**.
1. Select a role from the dropdown. Click **Add**. The role you selected populates into the bottom of the dialog box.
1. Next to the role name, select your desired permission from the dropdown.
1. If you would like to remove access from a role, click the trash can icon to the right of the role name.
1. Click **Save**.

### Edit connection

1. Navigate to the [Workflows list][3].
1. Click **Connections** in the upper right. A list of connections appears.
1. Hover over the connection you would like to edit. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the pencil (**Edit**) icon. A dialog box appears.
1. Update the fields you would like to change.
1. Click **Save**.

### Delete connection

1. Navigate to the [Workflows list][3].
1. Click **Connections** in the upper right. A list of connections appears.
1. Hover over the connection you would like to delete. **Edit**, **Permissions**, and **Delete** icons appear on the right.
1. Click the trash can (**Delete**) icon. "Are you sure?" text appears.
1. Select **Delete**.

### Add credentials to an action

Whether you configured credentials in the integration tile or created a custom connection, Workflows makes your credentials available for each workflow action. To add credentials to an action, follow the steps below:

1. Navigate to the [Workflows list][3].
1. Select the workflow containing the action to which you need to add a credential. The workflow builder appears.
1. In the workflow visualization, click the action to which you need to add a credential.
1. The right side panel populates with the action details.
1. Under the **Configure** tab, look for the **Authentication** dropdown. Choose your desired credential from the dropdown. Or, click **Add New** to create a new credential.
1. Click **Save**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /workflows/actions_catalog/
[2]: /integrations/
[3]: https://app.datadoghq.com/workflow
