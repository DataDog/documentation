---
title: Create Jira Issues for Cloud Security Management Issues
kind: documentation
further_reading:
  - link: "/security/cloud_security_management"
    tag: "Documentation"
    text: Cloud Security Management
  - link: "/service_management/workflows/"
    tag: "Documentation"
    text: Workflow Automation
---

Use the [Jira integration][1] to create Jira issues for resources that are impacted by a Cloud Security Management (CSM) security issue. Jira for Cloud Security Management is available for [CSM Misconfigurations][3] and [CSM Identity Risks][4].

**Note**: To create Jira issues, you must have the `security_monitoring_findings_write` permission. See [Role Based Access Control][2] for more information about Datadog's default roles and granular role-based access control permissions available for CSM.

## Configure the Jira integration

To create Jira issues for CSM security issues, you must configure the [Jira integration][5]. For detailed instructions, see the [Jira][1] integration docs.

## Create a Jira issue for impacted resources

{{< tabs >}}

{{% tab "CSM Misconfigurations" %}}

To create a Jira issue for one or more resources impacted by a misconfiguration:

1. On the [Misconfigurations explorer][1], select a misconfiguration.
2. Under **Resources Impacted**, select one or more resources.
3. On the **Actions** dropdown menu, select **Create Jira Issue**.
4. Choose whether to create a single issue or multiple issues (one issue for each resource).
5. Select the Jira project you want to assign the issue to.
6. Select the issue type from the available options.
7. Click **Create Issue**.

You can also create a Jira issue from the standalone issue side panel.

1. On the [Misconfigurations explorer][1], set the Group By filter to **Resources**.
2. Select a resource.
3. On the **Misconfiguration** tab, select a misconfiguration.
4. Click **Create Jira Issue**.
5. Select the Jira project you want to assign the issue to.
6. Select the issue type from the available options.
7. Click **Create Issue**.

After you create the issue, a link to the Jira issue is displayed on the side panel. You can add additional Jira issues for the same security issue.

[1]: /agent/guide/agent-commands/

{{% /tab %}}

{{% tab "CSM Identity Risks" %}}

1. On the [Identity Risks explorer][1], select a misconfiguration.
2. Under **Resources Impacted**, select one or more resources.
3. On the **Actions** dropdown menu, select **Create Jira Issue**.
4. Choose whether to create a single issue or multiple issues (one issue for each resource).
5. Select the Jira project you want to assign the issue to.
6. Select the issue type from the available options.
7. Click **Create Issue**.

You can also create a Jira issue from the standalone issue side panel.

1. On the [Identity Risks explorer][1], set the Group By filter to **Resources**.
2. Select a resource.
3. On the **Misconfiguration** tab, select a misconfiguration.
4. Click **Create Jira Issue**.
5. Select the Jira project you want to assign the issue to.
6. Select the issue type from the available options.
7. Click **Create Issue**.

After you create the issue, a link to the Jira issue is displayed on the side panel. You can add additional Jira issues for the same security issue.

[1]: /agent/guide/agent-commands/

{{% /tab %}}

{{< /tabs >}}

[1]: /integrations/jira/
[2]: /account_management/rbac/permissions/#cloud-security-platform
[3]: /security/misconfigurations/
[4]: /security/identity_risks/
[5]: https://app.datadoghq.com/integrations/jira?search=jira